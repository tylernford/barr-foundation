// modalDialog
// Source: https://a11y-dialog.netlify.app/
import A11yDialog from 'a11y-dialog';

class modalDialog {

    constructor(options) {

        this.options  = options || null;
        this._id      = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null; 
        this._hash    = this.options._hash !== 'undefined' && this.options._hash !== null ? this.options._hash : null;

        this.bind();

    }

    bind() {

        let self = this;

        self.init();

    }

    trapFocus(targetDialog) {

        let self = this;

        const focusableElements = 'h1, [tabindex]:not([tabindex="-1"]), button',
              firstFocusableElement = targetDialog.querySelectorAll(focusableElements)[0], 
              focusableContent      = targetDialog.querySelectorAll(focusableElements),
              lastFocusableElement  = focusableContent[focusableContent.length - 1]; 

        document.addEventListener('keydown', function(e) {

            let isTabPressed = e.key === 'Tab' || e.keyCode === 9,
                isEscPressed = e.key === 'Escape' || e.keyCode === 27;
            
            if ( isEscPressed ) {
                let closeButton = targetDialog.querySelector('#close_dialog');
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

    init() {

        let self = this;

        const dialogId        = self._id,
              dialogHook      = `${dialogId}_dialog`,
              dialogContainer = document.querySelector(`#${dialogHook}`);
        
        const hash = self._hash;

        if ( dialogContainer ) {
  
            const dialogModal = new A11yDialog(dialogContainer);
            
            // Handle hot hash
            if ( hash ) {
                
                let queryString = window.location.search,
                    urlParams   = new URLSearchParams(queryString);
                
                // Programmatically trigger modal if hot hash
                if ( urlParams.has(hash) ) {

                    let slug    = urlParams.get(hash),
                        trigger = document.querySelector(`#modal_trigger_${slug}`);
                    
                    if ( trigger ) {
                        
                        trigger.click();

                        let html = document.documentElement;

                        html.style.overflowY = 'hidden';
                    
                    }

                }
            
            }

            // Enable Dialog and Sprig friendliness
            // htmx.on('htmx:afterSwap',(element,event) => {
            // });
            
        }

    }

}
  
export default modalDialog