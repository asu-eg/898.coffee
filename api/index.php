<?php
define('API_ENTRY', true);

require __DIR__ . '/core/autoloader.php';
Autoloader::register(__DIR__);

Env::load(dirname(__DIR__) . '/.env');
$config = require __DIR__ . '/appsettings.php';

HttpContext::applySecurityHeaders();
CorsMiddleware::handle($config);

Router::dispatch($config);