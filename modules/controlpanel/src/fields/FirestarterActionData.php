<?php

namespace modules\controlpanel\fields;

class FirestarterActionData 
{

    private static $types;
    private static $variants;

    public function actionTypes() {

        self::$types = [
            ''=>'Select an action type',
            'download'=>'Download',
            'email'=>'Email',
            'external'=>'External',  
            'internal'=>'Internal',  
            'apple'=>'Apple',  
            'facebook'=>'Facebook',
            'instagram'=>'Instagram',  
            'linkedin'=>'LinkedIn',
            'twitter'=>'Twitter',
            'snapchat'=>'Snapchat',
            'spotify'=>'Spotify',  
            'youtube'=>'YouTube'
        ];

        return self::$types;

    }

    public function actionVariants() {

		self::$variants = [
            'button'=>'Button',
            'link'=>'Link'
		];

		return self::$variants;

	}

}
