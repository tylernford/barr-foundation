<?php

namespace modules\controlpanel\fields;
use craft\fields\Dropdown;
use modules\controlpanel\fields\FirestarterActionData;

class FirestarterActionDropdown extends Dropdown
{

	protected function setDropdown($dropdown): void
	{	

		$this->options = [];

		foreach ($dropdown as $value => $label) {
           
			$this->options[] = [
				'label' => $label,
				'value' => $value
			];
            
		}

	}

    public function init(): void
	{	
		
		$actionData = new FirestarterActionData();
		$dropdown = $actionData->actionTypes();

		$this->setDropdown($dropdown);
		parent::init();

	}

	public static function handle(): string
	{
		return "actionDropdown";
	}

    
    public static function displayName(): string
	{
		return "Action Dropdown";
	}

	public function getSettingsHtml(): string
	{
		return "";
	}

}