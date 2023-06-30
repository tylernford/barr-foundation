// flyoutContent
// Add these data-attrs to the relevant flyout nav elements:
// 1. Parent element: contains trigger and content
// data-flyout-target={str} | {str} flyout namespace
// 2. Trigger element(s): el(s) that trigger the flyout action
// data-flyout-trigger
// 3. Target element: el to which flyout action is applied
// data-flyout-content 

// See templates/partials/_nav.html for example markup
// See src/styles/components/_flyout-content.scss for sample styles

class flyoutContent {

    constructor(options) {

        this.options  = options || null;
        this._id      = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null; 
        this._state   = this.options._state !== 'undefined' && this.options._state !== null ? this.options._state : null; 

        this._viewport     = this._state.currentViewport;
        this._enabledSizes = ['xs','sm','md'];

        this.isOpen   = false;
        this.target   = null;
        this.triggers = null;
        this.content  = null;

        this._open = '_is-open';
        this._close = '_is-closing';        

        this.bind();

    }

    showMenu() {
        
        let self = this;
       
        self.target.classList.add(self._open);

        return true;
    }

    hideMenu() {

        let self = this;

        self.target.classList.remove(self._open);
        // On close, ensure a nice transition by adding this hook
        self.target.classList.add(self._close);
        
        return false;

    }

    resetContent() {

        let self = this;

        // Overflow specs helps w vw-scrollbar issues
        if ( self.isOpen ) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.removeAttribute('style');
        }
        self.content.removeAttribute('style');

    }

    handleMenu(e) {

        let self = this;

        e.preventDefault();

        let action = e.target.dataset.flyoutTrigger;

        self.isOpen = (action === 'close' || action === 'anchor') ? self.hideMenu() : self.showMenu();
        
        if ( self.content ) {
            // Ensure self maintains z-index precedent over content beneath
            self.content.ontransitionrun = () => {
                self.content.style.zIndex = 100;
            };
            self.content.ontransitionend = () => {
                
                self.resetContent();

                // On close, remove transition hook
                if ( !self.isOpen ) {

                    self.target.classList.remove(self._close);

                    // If an anchor it clicked, follow it
                    if ( action === 'anchor' ) {

                        let destination = e.target.getAttribute('href'),
                            hashValue   = destination.split('#'),
                            path        = hashValue[0].trim();

                        // Handle error pages
                        if ( path !== '' ) {
                            window.location = destination;
                        }
                        else {
                            let targetSection = document.querySelector(destination);
                            targetSection.scrollIntoView();
                        }
                    }
                }
            };
        }

    }

    // deactivate()
    // when viewport is resized larger, deactivate flyout
    deactivate() {

        let self = this;

        self.isOpen = false;
        self.target.classList.remove(self._open);
        self.target.classList.remove(self._close);

        self.resetContent();

    }
    
    init() {

        let self = this;

        self.triggers.forEach((trigger) => {

            trigger.addEventListener('click', (e) => {
            
                if ( self._enabledSizes.includes(self._viewport) ) {
                    self.handleMenu(e);
                }
            
            });
        
        });

    }

    bind() {

        let self = this;

        self.target = document.querySelector(`[data-flyout-target=${self._id}]`);
        
        if ( self.target !== null ) {

            self.triggers = self.target.querySelectorAll('[data-flyout-trigger]');
            self.content  = self.target.querySelector('[data-flyout-content]');

            self.init();

            window.addEventListener('resize', (e) => {

                self._state.updateViewport();
                self._viewport = self._state.currentViewport;

                self.init();

                if ( !self._enabledSizes.includes(self._viewport) ) {
                    self.deactivate();
                }
            
            });
        
        }

    }

}

export default flyoutContent;