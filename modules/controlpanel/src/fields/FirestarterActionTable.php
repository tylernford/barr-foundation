<?php

namespace modules\controlpanel\fields;
use craft\fields\Table;
use modules\controlpanel\fields\FirestarterActionData;

class FirestarterActionTable extends Table
{

	protected function setTable($actionDropdown,$variantDropdown): void
	{	
		
		$this->columns = [
		    'col1' => [ 'heading' => 'Label', 'handle' => 'fieldLabel', 'type' => 'singleline', ],
            'col2' => [ 'heading' => 'URL', 'handle' => 'fieldURL', 'type' => 'singleline', ],
            'col3' => [ 'heading' => 'Type', 'handle' => 'fieldType', 'type' => 'select', ],
            'col4' => [ 'heading' => 'Variant', 'handle' => 'fieldVariant', 'type' => 'select', ]
		];

		$this->columns['col3']['options'] = $actionDropdown;
		$this->columns['col4']['options'] = $variantDropdown;

        $this->addRowLabel = 'Add an action';

	}

    public function init(): void
	{	

		$actionData = new FirestarterActionData();
		$actionDropdown = $actionData->actionTypes();
		$variantDropdown = $actionData->actionVariants();

		$this->setTable($actionDropdown,$variantDropdown);
		parent::init();
	}

	public static function handle(): string
	{
		return "actionTable";
	}
    
    public static function displayName(): string
	{
		return "Action Table";
	}

	public function getSettingsHtml(): string
	{
		return "";
	}

}