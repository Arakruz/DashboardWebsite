import React from 'react'
import LineChart from '../../charts/LineChart.jsx'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'
import { Link } from 'react-router-dom'
import EditMenu from '../../components/DropdownEditMenu.jsx'

function HistoricalCard ({
  data,
  title,
}) {

  const chartData = {
    labels: [
      '12-01-2020',
      '01-01-2021',
      '02-01-2021',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
      '01-01-2023',
      '02-01-2023',
      '03-01-2023',
      '04-01-2023',
      '05-01-2023',
      '06-01-2023',
      '07-01-2023',
      '08-01-2023',
      '09-01-2023',
      '10-01-2023',
      '11-01-2023',
      '12-01-2023',
      '01-01-2024',
    ],
    datasets: [
      // Indigo line
      {
        label: title,
        data: data,
        borderColor: tailwindConfig().theme.colors.amber[500],
        fill: false,
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
      className="flex flex-col col-span-full sm:col-span-4 bg-white dark:bg-zinc-800 shadow-lg rounded-sm border border-zinc-200 dark:border-zinc-700">
      <header className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-700 flex items-center justify-between">
        <h2 className="font-semibold text-zinc-800 dark:text-amber-300">{title}</h2>
        <EditMenu align="right" className="relative inline-flex">
          <li>
            <Link
              className="font-medium text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-200 flex py-1 px-3"
              to="#0">
              Further options
            </Link>
          </li>
        </EditMenu>

      </header>
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} latest={data.slice(-1)}/>
    </div>
  )
}

export default HistoricalCard
