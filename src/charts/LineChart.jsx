import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '../utils/ThemeContext'

import { chartColors } from './ChartjsConfig'
import { Chart, Filler, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js'
import 'chartjs-adapter-moment'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip)

function LineChart ({
  data,
  width,
  height,
  latest,
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null)
  const legend = useRef(null)
  const { currentTheme } = useThemeProvider()
  const darkMode = currentTheme === 'dark'
  const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors

  useEffect(() => {
    const ctx = canvas.current
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 5,
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    })
    setChart(newChart)
    return () => newChart.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!chart) return

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark
      chart.options.scales.y.ticks.color = textColor.dark
      chart.options.scales.y.grid.color = gridColor.dark
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark
    } else {
      chart.options.scales.x.ticks.color = textColor.light
      chart.options.scales.y.ticks.color = textColor.light
      chart.options.scales.y.grid.color = gridColor.light
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light
    }
    chart.update('none')
  }, [currentTheme])

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between items-end">
          <div className="flex items-start">
            <div className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mr-2">{latest}</div>
          </div>
          <div className="grow ml-2 mb-1">
            <ul ref={legend} className="flex flex-wrap justify-end"></ul>
          </div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  )
}

export default LineChart