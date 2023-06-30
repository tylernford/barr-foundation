<?php

namespace modules\controlpanel;

/** If you want to install:
* 
* Update config/app.php
*
* 'modules' => [
*    'controlpanel' => [
*       'class' => \modules\controlpanel\ControlPanelModule::class
*    ],
* ],
* 'bootstrap' => ['controlpanel'],
* ];

* Update composer.json
* 
* "autoload": {
*    "psr-4": {
*      "modules\\controlpanel\\": "modules/controlpanel/src/"
*    },
* }
*
*/

use Craft;
use modules\controlpanel\fields\FirestarterDropdown;
use modules\controlpanel\fields\FirestarterActionDropdown;
use modules\controlpanel\fields\FirestarterActionTable;

use Yii\base\Event;
use Yii\base\Module;

use craft\services\Fields;
use craft\events\RegisterComponentTypesEvent;

class ControlPanelModule extends Module
{
    private function _registerCustomFieldTypes()
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = FirestarterDropdown::class;
                $event->types[] = FirestarterActionDropdown::class;
                $event->types[] = FirestarterActionTable::class;
            }
        );
    }

    public function init()
    {
        $this->_registerCustomFieldTypes();
    }
}
