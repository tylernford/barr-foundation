<?php

return [

    // JPEG fallback image
    'defaultImage' => [
        'displayName' => 'Default Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 1200],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 8/5,
            'jpegQuality' => 80
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],
    // WEBP image
    'defaultImage-webp' => [
        'displayName' => 'Default Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 1200],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 8/5,
            'format' => 'webp'
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],

    // Components
    // JPEG fallback image
    'mediaImage' => [
        'displayName' => 'Media Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 800],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 8/5,
            'jpegQuality' => 80
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],
    // WEBP image
    'mediaImage-webp' => [
        'displayName' => 'Media Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 800],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 8/5,
            'format' => 'webp'
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],
];