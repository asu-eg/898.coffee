<?php
if (php_sapi_name() !== 'cli') {
    die("Error: This script can only be run from the command line.\n");
}

define('API_ENTRY', true);

require __DIR__ . '/../core/autoloader.php';
Autoloader::register(dirname(__DIR__));

Env::load(dirname(__DIR__, 2) . '/.env');
$config  = require __DIR__ . '/../appsettings.php';
$authCfg = $config['features']['auth'];

if ($argc < 2) {
    die("Usage: php create-admin.php <username>\n");
}

$username = strtolower(trim($argv[1]));

if (!preg_match($authCfg['username_pattern'], $username)) {
    die("Error: Invalid username format. Must be 3-50 characters (a-z, 0-9, ., _, -)\n");
}

echo "Enter password for '$username': ";
$password = trim(fgets(STDIN));

if (strlen($password) < $authCfg['password']['min']) {
    die("Error: Password must be at least {$authCfg['password']['min']} characters.\n");
}

// Fixed: added max length check (bcrypt silently truncates at 72 bytes)
if (strlen($password) > $authCfg['password']['max']) {
    die("Error: Password must be at most {$authCfg['password']['max']} characters.\n");
}

if (strtolower($password) === $username) {
    die("Error: Password cannot be the same as the username.\n");
}

try {
    $db   = DbContext::connect($config['db']);
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare("INSERT INTO {$authCfg['table']} (username, password_hash) VALUES (?, ?)");
    $stmt->execute([$username, $hash]);

    echo "\nSuccess! Admin user '$username' created.\n";

} catch (PDOException $error) {
    if (in_array((string) $error->getCode(), ['23505', '23000'], true)) {
        die("\nError: Username '$username' already exists.\n");
    }
    die("\nDatabase error: " . $error->getMessage() . "\n");
}