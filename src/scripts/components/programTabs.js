const blockOpener = document.querySelector(`.blockOpener`);
const blockTabs = document.querySelector(`.blockTabs`)
const programAreaTriggers = document.querySelectorAll(`.blockTabs__item`);

// ---------------------------------------------------------------------------
// Reveal sub menus on trigger click
programAreaTriggers.forEach(programAreaTrigger => {
  programAreaTrigger.addEventListener(`mouseenter`, function(){
    const color = programAreaTrigger.getAttribute('data-theme-color');

    blockOpener.setAttribute(`data-theme-color`, color);
    blockTabs.setAttribute(`data-theme-color`, color);
  });

  programAreaTrigger.addEventListener(`mouseleave`, function(){
    blockOpener.setAttribute(`data-theme-color`, `teal`);
    blockTabs.setAttribute(`data-theme-color`, `teal`);
  });
});