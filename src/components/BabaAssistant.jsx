import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Calendar, ExternalLink } from 'lucide-react';
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

    const knowledgeBase = [
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
            keywords: ['président', 'baba badji', 'dirigeant', 'équipe', 'membre', 'qui travaille', 'responsable'],
            response: "L'équipe d'ADEMI est dirigée par Monsieur BADJI Baba (Président). Elle comprend aussi Doudou DJIBA (Vice-Président), Mouhidine MADI SIDI (Relations Internationales), Carine MEDERER (Secrétaire Générale), Ndèye Yacine CAMARA (Projets), Bourama DIEDHIOU (Diaspora), Mohamed KOTE (Paris) et Seynabou DIAGNE (Trésorière).",
        },
        {
            keywords: ['radio', 'sama radio', 'culture'],
            response: "Sama Radio est notre projet d'inclusion par la communication. C'est un pont culturel qui aide à l'intégration sociale et préserve le patrimoine linguistique.",
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

        try {
            // Tentative d'obtention d'une réponse de Gemini
            const botResponseText = await getGeminiResponse(userMessageText, knowledgeBase);

            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: botResponseText,
                time: getSafeTime()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Erreur lors de la récupération de la réponse:", error);

            // Fallback sur la base de connaissances locale en cas d'erreur
            let fallbackResponse = "Je ne suis pas sûr de bien comprendre votre demande. Souhaitez-vous discuter directement avec l'un de nos conseillers ?";
            let link = '/contact';
            let linkText = 'Prendre rendez-vous avec l\'équipe';

            const currentInputLower = userMessageText.toLowerCase();
            for (const item of knowledgeBase) {
                if (item.keywords.some(k => currentInputLower.includes(k))) {
                    fallbackResponse = item.response;
                    link = item.link || null;
                    linkText = item.linkText || null;
                    break;
                }
            }

            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: fallbackResponse,
                link: link,
                linkText: linkText,
                time: getSafeTime()
            };

            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
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
                                                className="mt-3 flex items-center gap-2 text-xs font-black p-2 bg-primary/5 rounded-lg text-primary hover:bg-primary/10 transition-all border border-primary/10"
                                            >
                                                <Calendar size={14} /> {msg.linkText} <ExternalLink size={12} />
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
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-primary rotate-90 border border-gray-100' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
                    </span>
                )}
            </button>
        </div>
    );
};

export default BabaAssistant;
