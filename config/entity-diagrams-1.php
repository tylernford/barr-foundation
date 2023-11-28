<?php
/**
 * entity-diagrams.php
 *
 * Optional manual config to create custom groupings of sections/category groups/globals/user groups/tag groups/asset volumes/products
 * to create entity diagrams of related parts of the system
 */

use craft\helpers\App;

return [
    'docGroups' => [ // Create predefined groups of elements to show in a diagram, 'name' => config array
        'Primary Site' => [
            'sections' => [ // list all section handles to include
                'homepage',
                'programAreas',
            ],
            'globals' => [ // list all global handles to include
                'siteSettings',
            ],
            'customNodes' => [ // add any custom nodes not handled automatically by Craft, e.g. custom database tables.
            ],
            'customLinks' => [ // add any custom links not handled automatically by Craft, e.g. linking to a matrix block id in a field. Format: "section.handle|categoryGroup.handle|userGroup.handle[:field.handle] -> section.handle|categoryGroup.handle|userGroup.handle"
            ],
            'options' => [
                'includeFields' => 1,
                'includeOnlyRelationFields' => 0,
                'expandMatrixBlocks' => 1,
                'includeAuthor' => 1,
                'includeCustomNodes' => 0,
                'includeCustomLinks' => 1,
            ],
        ],
    ],
    'options' => [ // default options, overridden by docGroups and UI
        'includeFields' => 1,
        'includeOnlyRelationFields' => 0,
        'expandMatrixBlocks' => 1,
        'includeAuthor' => 0,
        'includeCustomNodes' => 0,
        'includeCustomLinks' => 0,
    ],
    'dotOptions' => [
        'rankDir' => 'LR',
        'splines' => 'splines',
        'title' => 'Site Diagram',
    ],
];