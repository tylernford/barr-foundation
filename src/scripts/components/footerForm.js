const footerFormTrigger = document.querySelector(`.form__trigger`);
const footerFormWrapper = footerFormTrigger.nextElementSibling;

footerFormTrigger.addEventListener(`click`, function() {
  footerFormTrigger.classList.toggle(`-is-active`);
  footerFormWrapper.classList.toggle(`-is-active`);

  if (footerFormTrigger.getAttribute(`aria-expanded`) == `false` ) {
    footerFormTrigger.setAttribute(`aria-expanded`, `true`);
  } else {
    footerFormTrigger.setAttribute(`aria-expanded`, `false`);
  }
});