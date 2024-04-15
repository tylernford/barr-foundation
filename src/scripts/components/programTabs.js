const blockOpener = document.querySelector(`.blockOpener`);
const programTabs = document.querySelector(`.program-tabs`)
const programAreaTriggers = document.querySelectorAll(`.program-tabs__item`);
const programAreaCards = document.querySelectorAll(`.program-tabs__card`);


function triggerProgramTabs(){
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  if (viewportWidth > 1280) {
    programAreaTriggers.forEach(programAreaTrigger => {
      programAreaTrigger.addEventListener(`mouseenter`, function(){
        const color = programAreaTrigger.getAttribute(`data-theme-color`);
        const target = programAreaTrigger.getAttribute(`data-target`);
        const targetCardAttr = `[data-card="` + target + `"]`;
        const targetCard = document.querySelector(targetCardAttr);
    
        blockOpener.setAttribute(`data-theme-color`, color);
        programTabs.setAttribute(`data-theme-color`, color);
      });
    
      programAreaTrigger.addEventListener(`mouseleave`, function(){
        blockOpener.setAttribute(`data-theme-color`, `teal`);
        programTabs.setAttribute(`data-theme-color`, `teal`);
      });
    });
  } else {
    console.log(`mobile`);
    programAreaTriggers.forEach(programAreaTrigger => {
      programAreaTrigger.addEventListener(`click`, function(){
        const color = programAreaTrigger.getAttribute(`data-theme-color`);
        const target = programAreaTrigger.getAttribute(`data-target`);
        const targetCardAttr = `[data-card="` + target + `"]`;
        const targetCard = document.querySelector(targetCardAttr);
    
        blockOpener.setAttribute(`data-theme-color`, color);
        programTabs.setAttribute(`data-theme-color`, color);
    
        programAreaCards.forEach(programAreaCard => {
          programAreaCard.classList.remove(`_is-active`);
        });
    
        targetCard.classList.add(`_is-active`);
      });
    });
  }
}

triggerProgramTabs();

window.addEventListener(`resize`, function () {
  triggerProgramTabs();
}, false);