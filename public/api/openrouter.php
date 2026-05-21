<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$api_key = '%%OPENROUTER_API_KEY%%';

if ($api_key === '%%' . 'OPENROUTER_API_KEY' . '%%') {
    $api_key = getenv('OPENROUTER_API_KEY') ?: '';
}

if (empty($api_key)) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'OpenRouter API key is missing.']]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$models = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'deepseek/deepseek-chat:free',
    'mistralai/mistral-7b-instruct:free'
];

$max_tokens = $input['max_tokens'] ?? 512;
$temperature = $input['temperature'] ?? 0.7;
$messages = $input['messages'] ?? [];
$last_error = null;

foreach ($models as $model) {
    $payload = [
        'model' => $model,
        'max_tokens' => $max_tokens,
        'temperature' => $temperature,
        'messages' => $messages
    ];

    $ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $api_key,
        'HTTP-Referer: https://associationademi.com',
        'X-Title: Assistant Baba — ADEMI'
    ]);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        $last_error = 'Curl error: ' . $curl_error;
        continue;
    }

    if ($http_code === 429) {
        $last_error = 'Rate limited';
        continue;
    }

    if ($http_code === 404) {
        $last_error = 'Model not found';
        continue;
    }

    if ($http_code !== 200) {
        $last_error = 'HTTP ' . $http_code;
        continue;
    }

    $data = json_decode($response, true);
    if (!$data || isset($data['error'])) {
        $last_error = $data['error']['message'] ?? 'Unknown error';
        continue;
    }

    http_response_code(200);
    echo $response;
    exit;
}

http_response_code(503);
echo json_encode(['error' => ['message' => $last_error ?: 'All models unavailable']]);
