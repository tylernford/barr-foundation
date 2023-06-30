<?php

namespace modules\controlpanel\fields;
use craft\fields\Dropdown;

class FirestarterDropdown extends Dropdown
{

	protected function setFirestarterDropdown(): void
	{	
		
        $dropdown = [
            'flame'=>'Flame',  
            'campfire'=>'Campfire',  
            'bonfire'=>'Bonfire',
		];

		$this->options = [
			[
				'label' => 'Select a Fire',
				'value' => '',
				'disabled' => true,
			]
		];

		foreach ($dropdown as $value => $label) {
           
			$this->options[] = [
				'label' => $label,
				'value' => $value
			];
            
		}

	}

    public function init(): void
	{	
		$this->setFirestarterDropdown();
		parent::init();
	}
    
    public static function displayName(): string
	{
		return "Firestarter Dropdown";
	}

	public function getSettingsHtml(): string
	{
		return "";
	}

}