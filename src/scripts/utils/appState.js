class appState {

    constructor(options) {

        this.currentViewport = '';

        this.init();

    }

    isElementInView(el) {

        let self = this;

        let bounding = el.getBoundingClientRect(),
            elTop    = bounding.top,
            elBtm    = bounding.bottom;

        return ( elTop < window.innerHeight && elBtm >= 0 );

    }

    updateViewport() {

        let self = this;

        self.currentViewport = window.getComputedStyle( document.querySelector('#viewport'), '::before' ).getPropertyValue('content').replace(/['"]+/g, '');

    }

    init() {

        let self = this;

        // Handle viewport
        document.addEventListener('DOMContentLoaded', self.updateViewport);
        window.addEventListener('resize', self.updateViewport);
        self.updateViewport();

    }

}
  
export default appState