<?php
namespace feeds;

use craft\feedme\events\FeedProcessEvent;
use craft\feedme\services\Process;
use craft\feedme\events\ElementEvent;
use craft\helpers\ElementHelper;
use craft\elements\Entry;

use yii\base\Event;
use Yii\base\Module;
use Craft;

class GrantIngestModule extends Module
{

    /**
     * Simple helper to debug to the console
     *
     * @param $data object, array, string $data
     * @param $context string  Optional a description.
     *
     * @return string
     */
    function debug_to_console($data, $context = 'Debug in Console') {

        // Buffering 
        ob_start();

        //$output  = 'console.info(\'' . $context . ':\');';
        $output = 'console.log(' . json_encode($data) . ');';
        $output = sprintf('<script>%s</script>', $output);

        print $output;
    }

    /**
     * Clean imported program area titles as needed
     * 
     * @param $title string
     * @return string
    */
    function get_clean_imported_program_area($title) {

        $map = [
            'Racial Wealth Equity-Special Initiatives' => 'Racial Wealth Equity',
            'Waterfront-Special Initiatives' => 'Boston Waterfront',
            'Arts and Creativity' => 'Arts & Creativity'
        ];

        return isset($map[$title]) ? $map[$title] : null;
        
    }

    /**
     * List program area entries by level and return the target entry:
     * If program area exists, extract and save the target entry.
     * If program area does not exist, check against map
     * 
     * @param $title string
     * @param $level int
     * @return $entry object
    */
    function getEntry($title,$level) {

        $maybe_entry = null;
        $entry = null;

        $section = Entry::find()->section('programAreas')->level($level);
        $entries = $section
                    ->select(['title'])
                    ->asArray()
                    ->all();
        
        if ( in_array($title, $entries) ) {
            $maybe_entry = $section->title($title)->one();
        }
        else {
            $clean_title = $this->get_clean_imported_program_area($title);
            if ( $clean_title ) {
                $maybe_entry = $section->title($clean_title)->one();
            }
        }

        if ( $maybe_entry ) {
            $entry = $maybe_entry;
        }

        return $entry;

    }

    /**
     * Initializes the module.
     */
    public function init()
    {

        
        // Event::on(Process::class, Process::EVENT_STEP_BEFORE_ELEMENT_SAVE, function(FeedProcessEvent $event) {


        //     switch($event->feed['name']) {

        //         case 'Grants By Organization':
        //             $element = $event->element;
        //             // Save the budget/strategy/portfolio arr
        //             $deptStr = $element->departmentImport;

        //             $varType = gettype($deptStr);
                    
        //             $this->debug_to_console("testing " . $varType);
                    

                    // $deptArr    = explode(' | ', $deptStr);
                    // $deptLength = count($deptArr);

                    // if ( $deptLength === 1 ) {

                    //     $programTitle = $deptArr[0];
                    //     $programEntry = $this->getEntry($programTitle,1);

                    //     if ( $programEntry ) {
                    //         $element->tagsProgramAreas = $programEntry;
                    //     }
                    // }

                    // if ( $deptLength === 2 ) {
                    //     $strategy = $deptArr[1];
                    //     if ( $deptLength === 3 ) {
                    //         $portfolio = $deptArr[2];
                    //         $element->tagsStrategies = [$strategy,$portfolio];
                    //     }
                    //     else {
                    //         $element->tagsStrategies = $strategy;
                    //     }
                    // }
                    
        //             break;
        //     }
        // });
    }

}
