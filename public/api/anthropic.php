<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, x-api-key, anthropic-version');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// The API key will be injected here during deployment, or read from env if available
$api_key = '%%ANTHROPIC_API_KEY%%';

// Fallback for local development or if environment variable is set
if ($api_key === '%%' . 'ANTHROPIC_API_KEY' . '%%') {
    $api_key = getenv('ANTHROPIC_API_KEY') ?: (isset($_SERVER['HTTP_X_API_KEY']) ? $_SERVER['HTTP_X_API_KEY'] : '');
}

if (empty($api_key)) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'API Key is missing.']]);
    exit;
}

$input = file_get_contents('php://input');

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ' . $api_key,
    'anthropic-version: 2023-06-01'
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
