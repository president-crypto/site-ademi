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

$payload = [
    'model' => $input['model'] ?? 'meta-llama/llama-3.3-70b-instruct:free',
    'max_tokens' => $input['max_tokens'] ?? 512,
    'temperature' => $input['temperature'] ?? 0.7,
    'messages' => $input['messages'] ?? []
];

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $api_key,
    'HTTP-Referer: https://associationademi.com',
    'X-Title: Assistant Baba — ADEMI'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => ['message' => 'Curl error: ' . curl_error($ch)]]);
} else {
    http_response_code($http_code);
    echo $response;
}

curl_close($ch);
?>
