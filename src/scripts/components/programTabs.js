const programTabs = document.querySelector(`.program-tabs`)


function triggerProgramTabs(){
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const blockOpener = document.querySelector(`.blockOpener`);
  const programAreaTriggers = document.querySelectorAll(`.program-tabs__item`);
  const programAreaCards = document.querySelectorAll(`.program-tabs__card`);
  const tabsIntro = document.querySelector(`.program-tabs__intro`);

  if (viewportWidth > 767) {
    tabsIntro.classList.remove(`_is-hidden`);

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
    programAreaTriggers.forEach(programAreaTrigger => {
      programAreaTrigger.addEventListener(`click`, function(){
        const color = programAreaTrigger.getAttribute(`data-theme-color`);
        const target = programAreaTrigger.getAttribute(`data-target`);
        const targetCardAttr = `[data-card="` + target + `"]`;
        const targetCard = document.querySelector(targetCardAttr);
    
        blockOpener.setAttribute(`data-theme-color`, color);
        programTabs.setAttribute(`data-theme-color`, color);

        tabsIntro.classList.add(`_is-hidden`);
    
        programAreaCards.forEach(programAreaCard => {
          programAreaCard.classList.remove(`_is-active`);
        });
    
        targetCard.classList.add(`_is-active`);
      });
    });
  }
}

if (programTabs) {
  triggerProgramTabs();
  
  window.addEventListener(`resize`, function () {
    triggerProgramTabs();
  }, false);
}