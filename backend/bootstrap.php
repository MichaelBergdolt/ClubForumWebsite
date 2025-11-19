<?php
require __DIR__ . '/vendor/autoload.php';

// === ENV Setup ===
$appEnv = 'production';
$envFile = __DIR__ . '/.env';

if (file_exists($envFile)) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $appEnv = $_ENV['APP_ENV'] ?? 'development';
}

// === Error Handling ===
if ($appEnv === 'development') {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    ini_set('display_startup_errors', 0);
    error_reporting(0);
}

// === CORS Setup ===
$allowedOrigins = [
    "https://preview.club-forum-bb.de",
    "https://club-forum-bb.de",
];

if ($appEnv === 'development') {
    $allowedOrigins[] = "http://localhost:5173";
    $allowedOrigins[] = "http://localhost:8080";
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
