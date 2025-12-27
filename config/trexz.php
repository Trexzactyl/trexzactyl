<?php

return [
    /*
    |--------------------------------------------------------------------------
    | CDN Configuration
    |--------------------------------------------------------------------------
    |
    | This value is the URL to the CDN that will be used to fetch version
    | information. This is used to check for updates to the panel and wings.
    | 
    | For GitHub releases, use: https://api.github.com/repos/OWNER/REPO/releases/latest
    |
    */

    'cdn' => [
        'cache_time' => 60,
        'url' => env('CDN_URL', 'https://api.github.com/repos/TrexzGamePanel/trexz/releases/latest'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Default GitHub Repository
    |--------------------------------------------------------------------------
    |
    | The GitHub repository to check for updates
    |
    */
    
    'github' => [
        'owner' => env('GITHUB_OWNER', 'TrexzGamePanel'),
        'repo' => env('GITHUB_REPO', 'trexz'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Hashing Settings
    |--------------------------------------------------------------------------
    |
    | Settings for the server hash generation and usage.
    |
    */

    'guzzle' => [
        'timeout' => env('GUZZLE_TIMEOUT', 5),
        'connect_timeout' => env('GUZZLE_CONNECT_TIMEOUT', 3),
    ],

    'hashing' => [
        'algorithm' => env('HASH_ALGO', 'sha256'),
    ],

    'assets' => [
        'use_hash' => env('ASSET_USE_HASH', false),
    ],

    'client_features' => [
        'schedules' => [
            'per_page' => 50,
        ],
    ],
];
