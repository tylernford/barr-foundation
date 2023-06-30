// popupDialog

// Example init
// const newsletterPopup = new popupDialog({
//     _id: 'newsletter'
// });
class popupDialog {

    constructor(options) {

        this.options = options || null;
        this._id     = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null; 

        this._delay = 2000;
        this._closed = false;

        this.bind();

    }

    bind() {

        let self = this;

        self.init();

    }

    isElementInView(el) {

        let self = this;

        let bounding = el.getBoundingClientRect(),
            elTop    = bounding.top,
            elBtm    = bounding.bottom;

        return ( elTop < window.innerHeight && elBtm >= 0 );

    }

    trapFocus(el) {

        let self = this;

        const focusableElements     = 'h1, [tabindex]:not([tabindex="-1"]), button',
              firstFocusableElement = el.querySelectorAll(focusableElements)[0], 
              focusableContent      = el.querySelectorAll(focusableElements),
              lastFocusableElement  = focusableContent[focusableContent.length - 1]; 

        document.addEventListener('keydown', function(e) {

            let isTabPressed = e.key === 'Tab' || e.keyCode === 9,
                isEscPressed = e.key === 'Escape' || e.keyCode === 27;
            
            if ( isEscPressed ) {
                let closeButton = el.querySelector('#close_dialog');
                // Programmatically close dialog on ESC
                closeButton.click();
            }
            
            if ( !isTabPressed ) {
                return;
            }
            
            // If shift key pressed for shift + tab combination
            if ( e.shiftKey ) { 
                if ( document.activeElement === firstFocusableElement ) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            // If tab key is pressed
            } else { 
                // If focused has reached to last focusable element 
                // then focus first focusable element after pressing tab
                if ( document.activeElement === lastFocusableElement ) { 
                    // Add focus for the first focusable element
                    firstFocusableElement.focus(); 
                    e.preventDefault();
                }
            }

        });
            
        firstFocusableElement.focus();

    }

    showPopup(popupId,currentY) {

        let self = this;

        // Elements whose positioning prompts the popup toggle
        const popupShow = document.querySelector(`[data-popup-show="${popupId}"]`),
              popupHide = document.querySelector(`[data-popup-hide="${popupId}"]`);

        const popupShowY      = popupShow.offsetHeight,
              popupHideInView = self.isElementInView(popupHide);
        
        return ( !self._closed && (currentY >= popupShowY && !popupHideInView) );
        
    }

    togglePopup(showPopup) {

        let self = this;

        self.popup.setAttribute('aria-hidden', !showPopup);
       
    }

    init() {

        let self = this;

        const popupId = self._id;
        
        self.popup = document.getElementById(`${popupId}_dialog`);

        if ( self.popup ) {

            self.close = self.popup.querySelectorAll(`[data-popup-close="${popupId}"]`);
            self.submit = self.popup.querySelector(`[data-popup-submit="${popupId}"]`);
            
            let currentY  = window.pageYOffset,
                showPopup = self.showPopup(popupId,currentY);

            self.togglePopup(showPopup);

            document.addEventListener('scroll', (e) => {

                // Throttle scroll
                window.requestAnimationFrame(() => {

                    currentY  = window.pageYOffset;
                    showPopup = self.showPopup(popupId,currentY);

                    self.togglePopup(showPopup);
                
                });
            });

            // User manually closes popup
            self.close.forEach((el) => {
                el.addEventListener('click', () => {
                    self._closed = true;
                    self.togglePopup(false);
                });
            });

        }

    }

}
  
export default popupDialog