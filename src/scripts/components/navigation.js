const body = document.body;
const siteHeader = document.querySelector(`.siteHeader`);
const siteMenuTrigger = document.querySelector(`.siteHeader__trigger`);
const siteMenu = document.querySelector(`.siteHeader__mobile-menu`);
const subMenuTriggers = document.querySelectorAll(`.submenu__trigger`);

// ---------------------------------------------------------------------------
// Reveal navigation on menu trigger click
function triggerMenu(){
  if (siteMenuTrigger.getAttribute(`aria-expanded`) == `true` ) {
    body.style.removeProperty(`overflow`);
    siteMenuTrigger.setAttribute(`aria-expanded`, `false`);
    siteMenu.classList.toggle(`-is-active`);

    siteHeader.classList.remove(`-is-active`);
    setTimeout(() => {
      siteMenu.classList.add(`-is-hidden`);
    }, 500);
  } else {
    body.style.overflow = `hidden`;
    siteHeader.classList.add(`-is-active`);
    siteMenuTrigger.setAttribute(`aria-expanded`, `true`);
    siteMenu.classList.remove(`-is-hidden`);
    siteMenu.classList.toggle(`-is-active`);
  }
};

siteMenuTrigger.addEventListener(`click`, function(){
  triggerMenu();
});

// ---------------------------------------------------------------------------
// Reveal sub menus on trigger click
subMenuTriggers.forEach(subMenuTrigger => {
  subMenuTrigger.addEventListener(`click`, function(){
    subMenuTrigger.classList.toggle(`-is-active`);
    subMenuTrigger.nextElementSibling.classList.toggle(`-is-active`);

    if (subMenuTrigger.classList.contains(`-is-active`)) {
      subMenuTrigger.setAttribute(`aria-expanded`, `true`);
    } else {
      subMenuTrigger.setAttribute(`aria-expanded`, `false`);
    }
  });
});