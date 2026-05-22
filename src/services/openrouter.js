const MODELS = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'deepseek/deepseek-v4-flash:free',
    'openrouter/free'
];

const isDev = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const buildSystemPrompt = (context) => `Tu es Baba, l'assistant virtuel de l'association ADEMI (Appui au Développement Économique et à la Mobilité Internationale). Tu réponds UNIQUEMENT aux questions concernant ADEMI et Sama Radio (la web radio d'ADEMI). Base tes réponses sur le contenu de associationademi.com et sama-radio.com. Si tu ne connais pas la réponse précise, dis exactement : "Je n'ai pas cette information. Pour plus de renseignements, contactez l'équipe ADEMI via le formulaire sur associationademi.com/contact". Ne donne jamais une réponse générique sur ADEMI quand on te pose une question spécifique. Ne réponds jamais avec des informations inventées.

Voici ta base de connaissances :
${JSON.stringify(context, null, 2)}`;

const callOpenRouter = async (model, messages, signal) => {
    const endpoint = isDev ? '/api/openrouter' : '/api/openrouter.php';
    const headers = { 'Content-Type': 'application/json' };

    if (isDev) {
        if (!API_KEY) throw new Error("Clé API OpenRouter manquante.");
        headers['Authorization'] = `Bearer ${API_KEY}`;
        headers['HTTP-Referer'] = 'https://associationademi.com';
        headers['X-Title'] = 'Assistant Baba — ADEMI';
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        signal,
        body: JSON.stringify({ model, max_tokens: 512, temperature: 0.7, messages })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Réponse vide");
    return text;
};

const callOpenRouterDirect = async (model, messages, signal) => {
    if (!API_KEY) throw new Error("Clé API OpenRouter manquante.");

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': 'https://associationademi.com',
            'X-Title': 'Assistant Baba — ADEMI'
        },
        signal,
        body: JSON.stringify({ model, max_tokens: 512, temperature: 0.7, messages })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Réponse vide");
    return text;
};

const tryModels = async (models, messages, fetcher) => {
    let lastError;

    for (const model of models) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);
        try {
            const result = await fetcher(model, messages, controller.signal);
            return result;
        } catch (e) {
            lastError = e;
        } finally {
            clearTimeout(timer);
        }
    }

    throw lastError || new Error("All models unavailable");
};

export const getOpenRouterResponse = async (userMessage, context) => {
    if (isDev && !API_KEY) {
        throw new Error("Clé API OpenRouter manquante.");
    }

    const systemPrompt = buildSystemPrompt(context);
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
    ];

    try {
        return await tryModels(MODELS, messages, callOpenRouter);
    } catch {
        return await tryModels(MODELS, messages, callOpenRouterDirect);
    }
};
