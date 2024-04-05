import React, { useEffect, useState } from 'react'
import Tooltip from '../../components/Tooltip'
import RealtimeChart from '../../charts/RealtimeChart'

// Import utilities
import { hexToRGB, tailwindConfig } from '../../utils/Utils'

function RealTimeCard ({
  title,
  data,
  small,
}) {

  // Fake real-time data
  const [counter, setCounter] = useState(0)
  const [increment, setIncrement] = useState(0)
  const [range, setRange] = useState(35)

  const [slicedData, setSlicedData] = useState(data.slice(0, range))

  const getSize = () => {
    return small ? 'sm:col-span-6' : 'sm:col-span-8'
  }

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date()
    const dates = []
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000))
    })
    return dates
  }

  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse())

  // Fake update every 2 seconds, this would need to be completely different with a real backend, something closer
  // to an observation pattern to reduce queries
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [counter])

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1)
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]])
    } else {
      setIncrement(0)
      setRange(0)
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()])
    return () => setIncrement(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Amber line (just add more of these to create other lines)
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.amber[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.amber[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.amber[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.amber[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  }

  return (
    <div
      className={`flex flex-col col-span-full ${getSize()} bg-white dark:bg-zinc-800 shadow-lg rounded-sm border border-zinc-200 dark:border-zinc-700`}>
      <header className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-700 flex items-center">
        <h2 className="font-semibold text-zinc-800 dark:text-amber-300">{title}</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Further information</div>
        </Tooltip>
      </header>
      {/* Change the height attribute to adjust the chart height */}
      <RealtimeChart data={chartData} width={595} height={322}/>
    </div>
  )
}

export default RealTimeCard
