const doughnutCharts = document.querySelectorAll(`.doughnut-chart`)


doughnutCharts.forEach(doughnutChart => {
  const slices        = doughnutChart.querySelectorAll(`.description__item`)
  const sliceTriggers = doughnutChart.querySelectorAll(`.controls__button`)

  sliceTriggers.forEach(sliceTrigger => {
    const triggerTargetHandle = sliceTrigger.getAttribute(`data-slice`)
    const triggerTarget       = doughnutChart.querySelector(`[data-slice=` + triggerTargetHandle + `]`)
    
    sliceTrigger.addEventListener(`click`, function(){
      slices.forEach(slice => {
        slice.setAttribute(`data-is-active`, `false`)
      });

      triggerTarget.setAttribute(`data-is-active`, `true`)
      // blockOpener.setAttribute(`data-theme-color`, color)
      // programTabs.setAttribute(`data-theme-color`, color)

      // tabsIntro.classList.add(`_is-hidden`)
      
      // programAreaCards.forEach(programAreaCard => {
      //   programAreaCard.classList.remove(`_is-active`)
      // });
      
      // targetCard.classList.add(`_is-active`)

      // setTimeout(() => {
      //   tabsScrollAnchor.scrollIntoView();
      // }, "500ms")
    })
  })
})