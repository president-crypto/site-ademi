
export const getClaudeResponse = async (userMessage, context) => {
    const isDev = import.meta.env.DEV;
    const endpoint = isDev ? '/api/anthropic' : '/api/anthropic.php';
    const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    try {
        if (isDev && !API_KEY) {
            throw new Error("Clé API Anthropic manquante.");
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        if (isDev) {
            headers['x-api-key'] = API_KEY;
            headers['anthropic-version'] = '2023-06-01';
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 1024,
                messages: [
                    {
                        role: "user",
                        content: `
                            Tu es Baba, l'assistant virtuel officiel et chaleureux d'ADEMI (Appui au Développement Économique et à la Mobilité Internationale).
                            Ton rôle est d'incarner l'esprit de l'association : bienveillant, dynamique, professionnel et résolument tourné vers l'avenir.
                            
                            ADEMI accompagne les jeunes (JAMO : 0-25 ans) et les adultes (VAMO : +25 ans) en difficulté vers l'entreprenariat et l'emploi.
                            
                            Voici ta base de connaissances (données prioritaires) :
                            ${JSON.stringify(context, null, 2)}

                            CONSIGNES DE PERSONNALITÉ :
                            1. ACCUEIL : Sois très accueillant, comme un mentor qui croit au potentiel de chacun.
                            2. ADN ADEMI : Rappelle subtilement que chez ADEMI, "chaque parcours compte".
                            3. STYLE : Utilise un langage clair, sans jargon technique inutile.
                            4. PROACTIVITÉ : Si l'utilisateur pose une question sur un projet (comme Sama Radio), montre de l'enthousiasme.
                            5. LIMITES : Si tu ne sais pas, oriente poliment vers la page de contact ou propose de laisser un message pour l'équipe de Monsieur Baba Badji (le Président).
                            
                            L'utilisateur dit : "${userMessage}"
                        `
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.content[0].text;
    } catch (error) {
        console.error("Erreur Claude:", error);
        if (error.message?.toLowerCase().includes("quota") || error.message?.toLowerCase().includes("limit")) {
            return "L'assistant Claude a atteint sa limite temporaire. Veuillez réessayer dans quelques instants !";
        }
        return "Désolé, je rencontre une petite difficulté avec mon moteur Claude. Souhaitez-vous contacter notre équipe ?";
    }
};
