// Get all accordions
const accordions = document.querySelectorAll(`.accordion`);

// For each accordion
for (let accordion of accordions) {
  // Get accordion panels
  const panels = accordion.querySelectorAll(`.accordion-panel`);
  
  // For each panel
  for (let panel of panels) {
    // Get panel trigger and panel body
    const panelTrigger = panel.querySelector(`.accordion-panel__trigger`);
    const panelBody = panel.querySelector(`.accordion-panel__body`);

    // On panel trigger click
    panelTrigger.addEventListener(`click`, event => {
      // Prevent default browser behaviour
      event.preventDefault();

      // If targeted panel is not open
      if(!panel.open) {
        // Get expanded panel, trigger, and body
        const expandedPanel = accordion.querySelector(`details[open]`);
        const expandedPanelTrigger = expandedPanel.querySelector(`.accordion-panel__trigger`);
        const expandedPanelBody = expandedPanel.querySelector(`.accordion-panel__body`);
        
        // Close expanded panel
        closePanel(expandedPanel, expandedPanelTrigger, expandedPanelBody);

        // Trigger targeted panel expansion
        triggerPanelExpand(panel, panelTrigger, panelBody);
      }
    });
  }
}


// Trigger accordion panel expand
function triggerPanelExpand(panel, panelTrigger, panelBody) {
  // Set fixed height on panel
  panel.style.height = panelTriggerHeight(panel);

  // Wait for the next frame to call the expand function
  window.requestAnimationFrame(() => expandPanel(panel, panelTrigger, panelBody));
}


// Expand accordion panel
function expandPanel(panel, panelTrigger, panelBody) {
  // Set [open] attribute and
  // '_is-open' class on panel
  panel.open = true;
  panel.classList.add(`_is-open`);

  // Animate panel height
  panel.animation = panel.animate({
    height: [panelTriggerHeight(panel), fullPanelHeight(panelTrigger, panelBody)]
  }, {
    duration: 400, easing: `ease-out`
  });

  // Animate panel body opacity and transform
  panelBody.animation = panelBody.animate({
    opacity: [0, 1], transform: ['translateY(var(--neg-base-4))', 'translateY(0)'],
  }, {
    duration: 400, easing: `ease-out`
  });

  // On animation finish
  // remove the fixed height
  panel.animation.onfinish = () => {
    panel.style.height = ``;
  }
}


// Close accordion panel
function closePanel(panel, panelTrigger, panelBody) {
  // Animate panel height
  panel.animation = panel.animate({
    height: [fullPanelHeight(panelTrigger, panelBody), panelTriggerHeight(panelTrigger)]
  }, {
    duration: 400, easing: `ease-out`
  });

  // Animate panel body opacity and transform
  panelBody.animation = panelBody.animate({
    opacity: [1, 0], transform: ['translateY(0)', 'translateY(var(--neg-base-4))'],
  }, {
    duration: 400, easing: `ease-out`
  });

  // Remove the '_is-open' class from panel
  panel.classList.remove(`_is-open`);

  // When the animation is finished
  // remove the [open] attribute and
  // fixed height
  panel.animation.onfinish = () => {
    panel.open = false;
    panel.style.height = ``;
  }
}


// Calculate panel trigger height
function panelTriggerHeight(panelTrigger) {
  return `${panelTrigger.offsetHeight}px`
}

// Calculate expanded panel height
function fullPanelHeight(panelTrigger, panelBody) {
  return `${panelTrigger.offsetHeight + panelBody.offsetHeight}px`
}