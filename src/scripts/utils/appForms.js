// appForms

// Example inits
// const contactForm = new appForms({
//     _id: 'contact',
//     targetHook: '[data-contact-field]'
// });

// const newsletterForm = new appForms({
//     _id: 'newsletter',
//     targetHook: '[data-newsletter-field]'
// });

import axios from 'axios';
const axiosInstance = axios.create();

class appForms {

    constructor(options) {

        this.options    = options || null;
        this._id        = this.options._id !== 'undefined' && this.options._id !== null ? this.options._id : null; 
        this.targetHook = this.options.targetHook !== 'undefined' && this.options.targetHook !== null ? this.options.targetHook : null;
        
        this._off   = '_is-off';
        this._on    = '_is-on';
        this._error = '_is-error';
        this._valid = '_is-valid';
        this._value = '_has-value';
        this._focus = '_is-focused';

        this.successMessage = 'Thank you for messaging. We\'ll be in touch with you soon.';
                                
        this.bind();

    }

    bind() {

        let self = this;

        self.init();

    }

    handleNewsletterError(el) {

        let self = this;

        let fieldItems = el.querySelectorAll(`[data-${self._id}-field]`);

        // Generic error message
        let errorsHook   = `[data-${self._id}-errors]`,
            errorsList   = el.querySelector(errorsHook),
            errorMessage = 'Something went wrong! Please try again.';

        // Fade in
        if ( !errorsList.classList.contains(self._on) ) {
            errorsList.append(errorMessage);
            errorsList.classList.add(self._on);
            errorsList.classList.remove(self._off);
        }

        function clearErrorMessage(el) {

            errorsList.innerHTML = '';
            errorsList.classList.add(self._off);
            errorsList.classList.remove(self._on);

        }

        // Remove error styles and messaging on keydown
        fieldItems.forEach((item) => {

            let field = item.querySelector('input,textarea,select');

            field.addEventListener('change', (e) => {

                clearErrorMessage(el);
                
            });

            field.addEventListener('keydown', (e) => {

                clearErrorMessage(el);

            });

        });


    }

    handleErrors(el,errorObj) {

        let self = this;

        let fieldItems = el.querySelectorAll(`[data-${self._id}-field]`);

        // Generic error message
        let errorsHook   = `[data-${self._id}-errors]`,
            errorsList   = el.querySelector(errorsHook),
            errorMessage = '* Some required information is either blank or incorrect!',
            errorMap     = {};

        for (let [key, value] of Object.entries(errorObj)) {

            //console.log(`${key}: ${value}`);
            
            errorMap[key] = value;

            let fieldHook = `[data-${self._id}-field="${key}"]`;
            
            // Uncomment for granular error messaging
            // errorItem  = document.createElement('li');
            // errorItem.setAttribute('id',`error-${key}`);
            // errorItem.append(value);
            // errorsList.append(errorItem);

            // Style the error fields
            el.querySelector(fieldHook).classList.remove(self._value);
            el.querySelector(fieldHook).classList.add(self._error);

        }        

        // Fade in
        if ( !errorsList.classList.contains(self._on) ) {
            errorsList.append(errorMessage);
            errorsList.classList.add(self._on);
            errorsList.classList.remove(self._off);
        }

        function clearErrorMessage(el,item) {

            let errorFields = el.querySelectorAll(`.${self._error}`);

            item.classList.remove(self._error);  

            if ( errorFields.length === 0 ) {
                errorsList.innerHTML = '';
                errorsList.classList.add(self._off);
                errorsList.classList.remove(self._on);
            }

            // Uncomment for granular error messaging 
            // let itemName = item.dataset.contactField,
            //     errorItem = el.querySelector(`#error-${itemName}`);

            // if ( errorItem != null ) {
            //     errorItem.remove();
            // }

        }

        // Remove error styles and messaging on keydown
        fieldItems.forEach((item) => {

            if ( item.classList.contains(self._error) ) {

                let field = item.querySelector('input,textarea,select');

                field.addEventListener('change', (e) => {

                    clearErrorMessage(el,item);
                    
                });

                field.addEventListener('keydown', (e) => {

                    clearErrorMessage(el,item);

                });
                    
            }

        });

    }

    handleSuccess(el, successMessage = this.successMessage) {

        let self = this;

        let fieldItems = el.querySelectorAll(`[data-${self._id}-field]`);

        let successHook    = `[data-${self._id}-success]`,
            successEl      = el.querySelector(successHook);
        
        successMessage = self._id === 'newsletter' ? 'Thank you for your subscription!' : successMessage;

        // Fade In
        successEl.append(successMessage);
        successEl.classList.add(self._on);
        successEl.classList.remove(self._off);
        
        setTimeout(resetForm, 2000);

        function resetForm() {

            successEl.classList.add(self._off);
            successEl.classList.remove(self._on);

            setTimeout(() => {
                successEl.innerHTML = '';

                // Handle Newsletter Popup
                // Trigger popup close on submit, if popup and trigger exist
                if ( el.hasAttribute('data-popup-form') ) {

                    const popupId = el.getAttribute('data-popup-form'),
                            popup = document.getElementById(`${popupId}_dialog`);

                    if ( typeof(popup) != 'undefined' && popup != null ) {
                        const popupClose = popup.querySelector(`[data-popup-close="${popupId}"]`);
                        popupClose.click();
                    }

                }

            },  3000)

            fieldItems.forEach((item) => {
                let field = item.querySelector('input,textarea,select');
                field.value = '';
                item.classList.remove(self._value);
            });

        }

    }

    emailValidation(emailInput) {

        // currently handling server-side

        let self = this;

        const emailRegexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i);
        
        console.log('invalid email');

        return emailRegexp.test(emailInput);

    }

    handleValidation(el) {

        let self = this;

        let isValid = true,
            inputItems = el.querySelectorAll(`[data-${self._id}-input="required"]`);

        let errorObj = new Object();

        inputItems.forEach((item) => {

            let name = item.getAttribute('id'),
                val  = item.value.trim();

            if ( val === '' ) {                
                errorObj[name] = ['Cannot be blank'];
                isValid = false;
            }

            // let type = item.getAttribute('type'),
            // if ( type === 'email' && !self.emailValidation(val) ) {
            //     errorObj[name] = ['Incorrectly formatted'];
            //     isValid = false;
            // }
        
        });

        if ( !isValid && errorObj ) {
            self.handleErrors(el,errorObj);
        }

        return isValid;

    }

    handleNewsletterForm() {

        let self = this;

        self.newsletterForm.addEventListener('submit', (e) => {
            
            e.preventDefault();

            let form      = e.target,
                kajabiUrl = form.getAttribute('action');

            let config = {
                url: kajabiUrl,
                withCredentials: false,
                method: 'post',
                data: new FormData(form),
                validateStatus: () => true
            };
    
            axiosInstance(config)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    
                    // Hack to prevent Kajabi Thank You redirect from throwing an Axios Redirect error
                    let statusCode = error.name === 'AxiosError' ? 302 : '';

                    let result = {
                        status: statusCode === 302 ? 'success' : 'error',
                        statusCode: statusCode
                    };
                    return result;
                })
                .then(result => {

                    if ( result.status === 'error' ) {
                        self.handleNewsletterError(form);
                    }
                    else {
                        self.handleSuccess(form);
                    }

                    return result;

                });



        });
    
    }

    handleContactForm(contactForm) {

        let self = this;

        contactForm.addEventListener('submit', (e) => {
            
            e.preventDefault();

            let form    = e.target,
                isValid = self.handleValidation(form);

            if ( !isValid ) {
                return false;
            }
            
            let config = {
                url: '/',
                method: 'post',
                data: new FormData(form)
            };
    
            axiosInstance(config)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    console.log('catch',error);
        
                    let result = {
                        status: 'error',
                        statusCode: '', 
                        data: {errors: error.response.data}
                    };
                    return result;
                })
                .then(result => {

                    if ( result.data.errors ) {

                        console.log('error');

                        let errorObj = result.data.errors.errors;
                            
                        self.handleErrors(form,errorObj);

                    }
                    // Display thank you message, reset form
                    else if ( result.data.submission ) {

                        console.log('success');

                        let contactMessage;

                        if ( form.dataset.contactForm === 'mycontactform' ) {
                            contactMessage = 'Thank you for reaching out to My Contact Form!';
                        }

                        self.handleSuccess(form,contactMessage);

                    }

                    return result;

                });
        
        });
    
    }

    handleInputs() {

        let self = this;

        self.inputFields = document.querySelectorAll(`[data-${self._id}-input]`);

        if ( self.inputFields.length ) {
            
            self.inputFields.forEach((el) => {

                el.addEventListener('keyup', (e) => {

                    let fieldTarget = self.targetHook !== null ? el.closest(self.targetHook) : e.target,
                        inputValue  = e.target.value;

                    if ( inputValue.trim() !== '') {
                        fieldTarget.classList.add(self._value);
                    }
                    else {
                        fieldTarget.classList.remove(self._value);
                    }

                });

                el.addEventListener('change', (e) => {

                    let fieldTarget = self.targetHook !== null ? el.closest(self.targetHook) : e.target;
                    
                    fieldTarget.classList.add(self._value);
                    
                });

                el.addEventListener('focus', (e) => {

                    let fieldTarget = self.targetHook !== null ? el.closest(self.targetHook) : e.target;

                    fieldTarget.classList.add(self._focus);
                    fieldTarget.classList.remove(self._error);

                });

                el.addEventListener('blur', (e) => {

                    let fieldTarget = self.targetHook !== null ? el.closest(self.targetHook) : e.target;

                    fieldTarget.classList.remove(self._focus);

                });

            });

        }

    }

    init() {
         
        let self = this;

        if ( self._id ) {

            // Newsletter Registration Form
            self.newsletterForm = document.querySelector(`[data-${self._id}-form="register"]`);
            // Contact Form
            self.contactForm = document.querySelector(`[data-${self._id}-form="mycontactform"]`);
            
            if ( self.newsletterForm !== null ) {
                self.handleNewsletterForm();
            }

            if ( self.contactForm !== null ) {
                self.handleContactForm(self.contactForm);
            }

            self.handleInputs();

        }
    
    }

}

export default appForms