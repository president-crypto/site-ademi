import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (userMessage, context) => {
    try {
        if (!API_KEY) {
            throw new Error("Clé API Gemini manquante.");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            Tu es Baba, l'assistant virtuel de l'association ADEMI. Tu dois TOUJOURS répondre à la question exacte qui t'est posée. Analyse bien la question avant de répondre. Si quelqu'un demande si ADEMI peut l'aider, explique comment ADEMI accompagne les jeunes dans leurs projets (entrepreneuriat, mobilité internationale, insertion professionnelle). Ne parle de dons que si on te demande explicitement comment soutenir ou financer ADEMI. Si tu n'as pas l'information précise, dis : "Pour cette question, je vous invite à contacter directement l'équipe ADEMI via associationademi.com/contact"

            Voici la base de connaissances :
            ${JSON.stringify(context, null, 2)}

            L'utilisateur dit : "${userMessage}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erreur Gemini Détails:", error.message, error.status);
        
        if (error.message?.includes("Clé API Gemini manquante")) {
            return "Configuration de l'assistant incomplète (clé API manquante). Veuillez contacter l'administrateur.";
        }
        
        const errorMessage = error.message?.toLowerCase().includes("quota") 
            ? "L'assistant a atteint sa limite de messages (quota) pour le moment. Veuillez réessayer plus tard !"
            : "Désolé, je rencontre une petite difficulté technique. Puis-je vous aider avec autre chose ou souhaitez-vous contacter notre équipe ?";
        return errorMessage;
    }
};
