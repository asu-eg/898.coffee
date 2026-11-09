<?php

return [
    'name' => 'menu',

    'routes' => [
        'GET /menu' => [MenuController::class, 'get'],
    ],
];
