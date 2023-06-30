<?php

return [

    // Components
    // JPEG fallback image
    'accordionImage' => [
        'displayName' => 'Accordion Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 1440],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 1,
            'jpegQuality' => 80
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],
    // WEBP image
    'accordionImage-webp' => [
        'displayName' => 'Accordion Image',
        'transforms' => [
            ['width' => 375],
            ['width' => 1440],
        ],
        'defaults' => [
            'mode' => 'crop',
            'ratio' => 1,
            'format' => 'webp'
        ],
        'configOverrides' => [
            'fillTransforms' => true,
            'fillInterval' => 200,
        ]
    ],
];