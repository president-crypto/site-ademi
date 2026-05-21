/**
 * Service OpenRouter — Assistant Baba ADEMI
 * Modèle principal : meta-llama/llama-3.1-8b-instruct:free (gratuit)
 * Fallback automatique vers Gemini si erreur
 */

export const getOpenRouterResponse = async (userMessage, context) => {
    const isDev = import.meta.env.DEV;
    const endpoint = isDev ? '/api/openrouter' : '/api/openrouter.php';
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (isDev && !API_KEY) {
        throw new Error("Clé API OpenRouter manquante.");
    }

    const systemPrompt = `Tu es Baba, l'assistant virtuel officiel et chaleureux d'ADEMI (Appui au Développement Économique et à la Mobilité Internationale).
Ton rôle est d'incarner l'esprit de l'association : bienveillant, dynamique, professionnel et résolument tourné vers l'avenir.

ADEMI accompagne les jeunes (JAMO : 0-25 ans) et les adultes (VAMO : +25 ans) en difficulté vers l'entreprenariat et l'emploi.

Voici ta base de connaissances (données prioritaires) :
${JSON.stringify(context, null, 2)}

CONSIGNES DE PERSONNALITÉ :
1. ACCUEIL : Sois très accueillant, comme un mentor qui croit au potentiel de chacun.
2. ADN ADEMI : Rappelle subtilement que chez ADEMI, "chaque parcours compte".
3. STYLE : Utilise un langage clair, sans jargon technique inutile. Réponds de manière concise.
4. PROACTIVITÉ : Si l'utilisateur pose une question sur un projet (comme Sama Radio), montre de l'enthousiasme.
5. LIMITES : Si tu ne sais pas, oriente poliment vers la page de contact ou propose de laisser un message pour l'équipe de Monsieur Baba Badji (le Président).
6. LANGUE : Réponds TOUJOURS en français, même si la question est posée dans une autre langue.`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (isDev) {
        headers['Authorization'] = `Bearer ${API_KEY}`;
        headers['HTTP-Referer'] = 'https://associationademi.com';
        headers['X-Title'] = 'Assistant Baba — ADEMI';
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            max_tokens: 512,
            temperature: 0.7,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userMessage
                }
            ]
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Erreur HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error("Réponse vide de OpenRouter");
    }

    return text;
};
