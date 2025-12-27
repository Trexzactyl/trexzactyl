<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Theme Configuration
    |--------------------------------------------------------------------------
    |
    | These settings allow you to set custom hex values for the Panel's theme.
    | This can be configured in the admin pages, and can also be edited here
    | for ease of use.
    |
    */
    'colors' => [
        'primary' => env('THEME_COLORS_PRIMARY', '#3b82f6'),      // Brighter blue
        'secondary' => env('THEME_COLORS_SECONDARY', '#1f2937'),   // Darker gray

        'background' => env('THEME_COLORS_BACKGROUND', '#111827'), // Darker background
        'headers' => env('THEME_COLORS_HEADERS', '#1f2937'),       // Gray headers
        'sidebar' => env('THEME_COLORS_SIDEBAR', '#1f2937'),       // Gray sidebar
    ],
];
