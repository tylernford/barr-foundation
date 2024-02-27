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
            /////////////////////////////////
            // GRANTS BY ORGANIZATION
            // Adds & Updates Grant section entries; 
            // Creates Grantee (aka Organization) if do not exist
            '2' => [
                'name' => 'Grants By Organization',
            ],
            // GRANTS BY GEONAME
            // Updates Grant section entries with Geo Region 
            '3' => [
                'name' => 'Grants By Geoname',
            ],
            // GRANTS BY ORGANIZATION DETAILS
            // Updates Grantee entries with organization details (e.g. website, social links) 
            '4' => [
                'name' => 'Grants By Organization Details',
            ],
            // Directory
            '5' => [
                'name' => 'Directory',
            ]
        ]
    ]
];