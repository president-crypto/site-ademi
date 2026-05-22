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
            Tu es Baba, l'assistant virtuel de l'association ADEMI (Appui au Développement Économique et à la Mobilité Internationale). Tu réponds UNIQUEMENT aux questions concernant ADEMI et Sama Radio (la web radio d'ADEMI). Base tes réponses sur le contenu de associationademi.com et sama-radio.com. Si tu ne connais pas la réponse précise, dis exactement : "Je n'ai pas cette information. Pour plus de renseignements, contactez l'équipe ADEMI via le formulaire sur associationademi.com/contact". Ne donne jamais une réponse générique sur ADEMI quand on te pose une question spécifique. Ne réponds jamais avec des informations inventées.

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
