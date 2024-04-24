const doughnutCharts = document.querySelectorAll(`.doughnut-chart`)


doughnutCharts.forEach(doughnutChart => {
  const panels        = doughnutChart.querySelectorAll(`.description__panel`)
  const panelTriggers = doughnutChart.querySelectorAll(`.controls__button`)

  panelTriggers.forEach(panelTrigger => {
    const triggerTargetHandle = panelTrigger.getAttribute(`data-slice`)
    const triggerTarget       = doughnutChart.querySelector(`[data-slice=` + triggerTargetHandle + `]`)
    
    panelTrigger.addEventListener(`click`, function(){
      panels.forEach(panel => {
        panel.setAttribute(`data-is-active`, `false`)
      });

      triggerTarget.setAttribute(`data-is-active`, `true`)
    })
  })
})