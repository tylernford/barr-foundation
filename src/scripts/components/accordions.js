// accordions
/* 
Simple accordion pattern based on W3 WAI practices.
Resource: https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html

Accordion markup should adhere to the class and data-attribute naming conventions.

Example initialization (self-inits): 

const faqAccordion = new accordions({
    _id: 'faqAccordion',
    _toggle: true,
    _multiple: true
});

*/
class accordions {

    constructor(options) {

        this.options = options || null;
        
        this._id       = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null; 
        this._toggle   = this.options._toggle !== 'undefined' && this.options._toggle !== null ? this.options._toggle : true; 
        this._multiple = this.options._multiple !== 'undefined' && this.options._multiple !== null ? this.options._multiple : true; 

        this._container = `[data-accordion-container="${this._id}"]`;
        this._accordion = '[data-accordion-item]';
        this._trigger   = '[data-accordion-trigger]';
        this._expanded  = '[aria-expanded="true"]';

        this._active  = '_is-active';
        this._sliding = '_is-sliding';

        this.bind();
    
    }

    bind() {
       
        let self = this;

        self.parent = document.querySelector(self._container);

        if ( self.parent !== null ) {

            self.init();
            
        }
    }
    
    expandAccordion(trigger,accordion) {

        let self = this;

        let panelId = trigger.getAttribute('aria-controls'),
            panel   = accordion.querySelector(`#${panelId}`)
        
        // Reset expanded state
        trigger.setAttribute('aria-expanded','true');
        
        // Display accordion panel based on active trigger aria-controls value
        panel.classList.add(self._sliding); 
        panel.removeAttribute('hidden');

        setTimeout(() => {
            panel.classList.remove(self._sliding);
        }, '200')

        // If toggling disabled, reset disabled state
        if ( !self._toggle ) {
            trigger.setAttribute('aria-disabled',true);
        }
        
        accordion.classList.add(self._active);

    }

    collapseAccordion(trigger,accordion) {

        let self = this;

        let panelId = trigger.getAttribute('aria-controls'),
            panel   = accordion.querySelector(`#${panelId}`);

        // Reset expanded state
        trigger.setAttribute('aria-expanded', 'false');

        panel.classList.add(self._sliding);

        setTimeout(() => {
            panel.classList.remove(self._sliding);
            // Hide accordion panel based on trigger aria-controls value
            panel.setAttribute('hidden', '');

        }, '500')
        
        // If toggling disallowed, reset disabled state
        if ( !self._toggle ) {
            trigger.removeAttribute('aria-disabled');
        }

        accordion.classList.remove(self._active);

    }

    init() {

        let self = this;

        let allAccordions = self.parent.querySelectorAll(self._accordion);

        allAccordions.forEach((accordion) => {

            let allTriggers = accordion.querySelectorAll(self._trigger);

            allTriggers.forEach((trigger) => {

                trigger.addEventListener('focus', () => {
                    accordion.classList.add('_is-focused');
                });

                trigger.addEventListener('blur', () => {
                    accordion.classList.remove('_is-focused');
                });

                trigger.addEventListener('click', (e) => {

                    let targetTrigger   = e.target,
                        targetAccordion = targetTrigger.closest(self._accordion),
                        targetId        = targetTrigger.getAttribute('aria-controls'),
                        targetPanel     = self.parent.querySelector(`#${targetId}`);

                    if ( targetTrigger.hasAttribute('href') || !targetPanel ) {
                        // Follow any anchors || ignore irrelevant clicks
                        return;
                    }

                    e.preventDefault();

                    let isExpanded      = (targetTrigger.getAttribute('aria-expanded') === 'true'),
                        activeTrigger   = self.parent.querySelector(self._expanded);
                        
                    // If multiple open panels is disallowed, collapse active accordion
                    if ( !self._multiple && activeTrigger && (activeTrigger !== targetTrigger) ) {
                        let activeAccordion = activeTrigger.closest(self._accordion);
                        self.collapseAccordion(activeTrigger,activeAccordion);                
                    }
                    // If target accordion is not yet expanded
                    if ( !isExpanded ) {
                        self.expandAccordion(targetTrigger,targetAccordion);
                    }
                    else if ( self._toggle && isExpanded ) {
                        self.collapseAccordion(targetTrigger,targetAccordion);  
                    }
                
                });
            
            });

            // Keyboard behavior
            accordion.addEventListener('keydown', (e) => {
                
                let keyTrigger = e.target,
                    activeKey  = e.which.toString(),
                    isExpanded = (keyTrigger.getAttribute('aria-expanded') === 'true');
                
                // 33 = Page Up, 34 = Page Down
                let ctrlModifier = (e.ctrlKey && activeKey.match(/33|34/));
                // If accordion trigger...
                // Fix this
                if ( keyTrigger === allTriggers ) {
                    // do stuff
                }
                // TO DO:
                // remaining key behavior
            });

            // If toggle is disallowed, disable close functionality on any open accordions
            if ( !self._toggle ) {
                // Define expanded accordion
                let expandedAccordion = accordion.querySelector(self._expanded);
                // If an expanded/ active accordion is found, disable
                if ( expandedAccordion ) {
                    expandedAccordion.setAttribute('aria-disabled', 'true');
                }
            }

        });        

    }

}

export default accordions