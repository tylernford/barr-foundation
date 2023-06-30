// mobileMenu

// Example init:
// const currentState = new appState();
// const menu = new mobileMenu({
//     _id: 'mobile',
//     _state: currentState
// });

class mobileMenu {

    constructor(options) {

        this.options  = options || null;
        this._id      = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null;  
        this._state   = this.options._state !== 'undefined' && this.options._state !== null ? this.options._state : null; 

        this._viewport     = this._state.currentViewport;
        this._disabledSizes = ['lg','xl','xxl'];     

        this.bind();

    }

    resetBody() {

        let self = this;

        // Overflow specs 
        if ( self.trigger.checked ) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.removeAttribute('style');
        }
    
    }
    
    init() {

        let self = this;

        self.trigger.addEventListener('click', (e) => {

            self.resetBody();
            
            // Disable mobile menu trigger in large viewports
            if ( self._disabledSizes.includes(self._viewport) ) {
                e.preventDefault();
            }
        });

        window.addEventListener('resize', (e) => {

            self._state.updateViewport();
            self._viewport = self._state.currentViewport;

            // If resized to larger viewports, ensure the trigger is unchecked
            // to apply closed menu state
            if ( self._disabledSizes.includes(self._viewport) ) {
                self.trigger.checked = false;
            }

        });

    }

    bind() {

        let self = this;

        self.trigger = document.querySelector(`[data-mobile-menu=${self._id}]`);
        
        if ( self.trigger !== null ) {
            self.init();
        }

    }

}

export default mobileMenu;