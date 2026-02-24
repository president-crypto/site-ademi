import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (userMessage, context) => {
    try {
        if (!API_KEY) {
            throw new Error("Clé API Gemini manquante.");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Tu es Baba, l'assistant virtuel d'ADEMI (Appui au Développement Économique et à la Mobilité Internationale).
            ADEMI est une association qui accompagne les jeunes et adultes ayant moins d'opportunités (JAMO et VAMO) dans l'entreprenariat et l'insertion professionnelle.
            
            Voici quelques informations clés sur ADEMI pour t'aider à répondre :
            ${JSON.stringify(context, null, 2)}

            Instructions :
            1. Sois amical, professionnel et encourageant.
            2. Réponds en français.
            3. Si tu ne connais pas la réponse, suggère de contacter l'équipe via la page de contact.
            4. Garde tes réponses concises et pertinentes.
            
            L'utilisateur dit : "${userMessage}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erreur Gemini:", error);
        return "Désolé, je rencontre une petite difficulté technique. Puis-je vous aider avec autre chose ou souhaitez-vous contacter notre équipe ?";
    }
};
