import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Calendar, ExternalLink } from 'lucide-react';
import { getOpenRouterResponse } from '../services/openrouter';
import { getGeminiResponse } from '../services/gemini';

const BabaAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const getSafeTime = () => {
        try {
            return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return new Date().getHours() + ":" + new Date().getMinutes();
        }
    };

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Bonjour ! Je suis Baba, l'assistant virtuel d'ADEMI. Comment puis-je vous aider aujourd'hui ?",
            time: getSafeTime()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const suggestions = [
        "Qui est ADEMI ?",
        "C'est quoi Sama Radio ?",
        "Mobilité Internationale ?",
        "Comment vous aider ?"
    ];

    const knowledgeBase = [
        {
            keywords: ['radio', 'sama radio', 'culture', 'slogan', 'mission', 'podcast', 'écouter', 'fréquence', 'samaradio'],
            response: "Sama Radio est la web radio du projet ADEMI. Son slogan est « Le bonheur d'être ensemble ». Sa mission est d'optimiser la communication pour une meilleure inclusion, notamment pour les diasporas et les communautés immigrées. Elle sert de facilitateur pour créer des espaces de dialogue interculturel, maintenir les liens avec les pays d'origine et mieux expliquer les enjeux de la migration. Elle propose des podcasts, émissions et ateliers radio. On peut l'écouter sur www.sama-radio.com. Contact : samaradio86@gmail.com — 30 rue Henri Dunant, 86000 Poitiers.",
            link: 'https://www.sama-radio.com',
            linkText: 'Écouter Sama Radio'
        },
        {
            keywords: ['qui est ademi', 'définition', 'sigle', 'c\'est quoi'],
            response: "ADEMI signifie Appui au Développement Économique et à la Mobilité Internationale. C'est une association qui accompagne les jeunes et adultes ayant moins d'opportunités (JAMO et VAMO) dans l'entreprenariat et l'insertion professionnelle.",
        },
        {
            keywords: ['jamo', 'jeune'],
            response: "Les JAMO (Jeunes Ayant Moins d'Opportunités) sont des jeunes de 0 à 25 ans que nous accompagnons dans la création d'entreprise et l'insertion.",
        },
        {
            keywords: ['vamo', 'vieux', 'adulte', 'plus de 25'],
            response: "Les VAMO (Vieux Ayant Moins d'Opportunités) sont les personnes de plus de 25 ans que nous soutenons dans leur insertion socio-professionnelle.",
        },
        {
            keywords: ['président', 'baba badji', 'dirigeant', 'équipe', 'qui travaille', 'responsable', 'bureau'],
            response: "L'équipe d'ADEMI est dirigée par Monsieur BADJI Baba (Président). Elle comprend aussi Doudou DJIBA (Vice-Président), Mouhidine MADI SIDI (Relations Internationales), Carine MEDERER (Secrétaire Générale), Ndèye Yacine CAMARA (Projets), Bourama DIEDHIOU (Diaspora), Mohamed KOTE (Paris) et Seynabou DIAGNE (Trésorière).",
        },
        {
            keywords: ['cité éducative', 'quartier', 'couronneries', 'poitiers'],
            response: "La Cité Éducative est un programme à Poitiers (quartier des Couronneries) en partenariat avec KURIOZ et la Mairie, pour valoriser le potentiel de la jeunesse locale.",
        },
        {
            keywords: ['dap', 'accompagnement personnalisé', 'méthode'],
            response: "Le DAP (Dispositif d'Accompagnement Personnalisé) est notre méthode phare pour aider les JAMO à structurer leurs idées et réussir leur création d'entreprise.",
        },
        {
            keywords: ['erasmus', 'international', 'mobilité', 'étranger', 'voyage'],
            response: "ADEMI facilite la mobilité internationale, notamment via Erasmus+, pour offrir des expériences professionnelles et culturelles uniques aux jeunes.",
        },
        {
            keywords: ['formation', 'cours', 'apprendre', 'leadership', 'numérique'],
            response: "Nous proposons des formations en Leadership & Entrepreneuriat (cycle de 5 jours), en Mobilité Internationale et en Inclusion par le Numérique.",
        },
        {
            keywords: ['devenir membre', 'être membre', 'adhérer', 'adhésion', 'inscription', 'rejoindre', 'comment faire pour'],
            response: "Pour devenir membre d'ADEMI et nous rejoindre, rien de plus simple ! Il vous suffit de nous contacter via notre page de contact ou de nous rendre visite directement. Nous vous guiderons sur les démarches d'adhésion et vous pourrez participer activement à nos actions d'insertion et de mobilité internationale pour les jeunes et les adultes. Toute personne partageant nos valeurs est la bienvenue !",
            link: '/contact',
            linkText: 'Nous contacter pour adhérer'
        },
        {
            keywords: ['don', 'soutenir', 'aider', 'argent', 'financement'],
            response: "Votre soutien est précieux ! Pour faire un don ou soutenir nos projets d'insertion JAMO/VAMO, vous pouvez nous contacter directement. Nous vous expliquerons les modalités.",
            link: '/contact',
            linkText: 'Nous soutenir'
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessageText = input;
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: userMessageText,
            time: getSafeTime()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const currentInputLower = userMessageText.toLowerCase();

        // Step 1: Check local knowledge base first
        let localResponse = null;
        let localLink = null;
        let localLinkText = null;

        for (const item of knowledgeBase) {
            if (item.keywords.some(k => currentInputLower.includes(k))) {
                localResponse = item.response;
                localLink = item.link || null;
                localLinkText = item.linkText || null;
                break;
            }
        }

        if (localResponse) {
            // Found in knowledge base — respond immediately without API call
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: localResponse,
                link: localLink,
                linkText: localLinkText,
                time: getSafeTime()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
            return;
        }

        // Step 2: Question not in knowledge base — try OpenRouter first, then Gemini as fallback
        try {
            let botResponseText;
            try {
                // Primary: OpenRouter (Llama 3.1 - gratuit)
                botResponseText = await getOpenRouterResponse(userMessageText, knowledgeBase);
            } catch (openRouterError) {
                console.warn("OpenRouter indisponible, bascule sur Gemini:", openRouterError.message);
                // Fallback: Gemini
                botResponseText = await getGeminiResponse(userMessageText, knowledgeBase);
            }
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: botResponseText,
                time: getSafeTime()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Tous les moteurs IA ont échoué:", error);

            // Step 3: All APIs failed — show helpful fallback
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: "Je rencontre une difficulté technique momentanée. N'hésitez pas à contacter directement notre équipe qui sera ravie de vous aider !",
                link: '/contact',
                linkText: "Contacter l'équipe ADEMI",
                time: getSafeTime()
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsTyping(false);
            if (showSuggestions) setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (text) => {
        setInput(text);
        // We use a small timeout to let the state update before sending
        setTimeout(() => handleSend(), 0);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] md:w-[400px] h-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(26,54,93,0.15)] border border-white/20 flex flex-col overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="p-6 bg-primary text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold font-heading">Assistant Baba</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs text-blue-100">En ligne</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-4 rounded-2xl ${msg.type === 'user'
                                        ? 'bg-secondary text-white rounded-tr-none shadow-md shadow-secondary/10'
                                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        {msg.link && (
                                            <a
                                                href={msg.link}
                                                className="mt-3 flex items-center justify-center gap-2 text-xs font-bold p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 group"
                                            >
                                                <Calendar size={14} className="group-hover:scale-110 transition-transform" /> {msg.linkText} <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions Area */}
                    {showSuggestions && messages.length <= 1 && (
                        <div className="px-6 py-2 flex flex-wrap gap-2 animate-fade-in">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(s)}
                                    className="text-xs bg-white border border-primary/20 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-2 pl-4 border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Posez votre question ici..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 py-2"
                            />
                            <button
                                onClick={handleSend}
                                className={`p-2 rounded-xl transition-all ${input.trim()
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(26,54,93,0.3)] transition-all duration-500 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-primary rotate-180 border border-gray-100' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={32} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-secondary flex items-center justify-center text-[10px] text-white font-bold">1</span>
                    </span>
                )}
            </button>
        </div>
    );
};

export default BabaAssistant;
