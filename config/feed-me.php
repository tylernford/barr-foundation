<?php

use craft\helpers\App;

return [
    '*' => [
        'parseTwig' => true,
        'runGcBeforeFeed' => true,
        'dataDelimiter' => ' | ',
        'feedOptions' => [
            // WP Blog Post Import
            '1' => [
                'name' => 'Blog Posts',
            ], 
            // Salesforce DB: Grants Import
            '2' => [
                'name' => 'Grants By Organization',
            ],
            '3' => [
                'name' => 'Grants By Geoname',
            ]
        ]
    ]
];