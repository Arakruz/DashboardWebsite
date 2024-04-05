import React from 'react'

function MetricsSummaryCard ({ data }) {
  return (
    <div
      className="col-span-full xl:col-span-4 bg-white dark:bg-zinc-800 shadow-lg rounded-sm border border-zinc-200 dark:border-zinc-700">
      <header className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-700">
        <h2 className="font-semibold text-zinc-800 dark:text-amber-300">Average Metrics Summary</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-zinc-300">
            {/* Table header */}
            <thead
              className="uppercase text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-left">Metric</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-center">Value</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-center">Unit</div>
              </th>
            </tr>
            </thead>

            {/* Can be broken into its own jsx file if needed */}
            {/* Table body */}
            <tbody className="font-medium divide-y divide-zinc-100 dark:divide-zinc-700">
            {/* Happiness */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">Happiness Levels</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.happy}</div>
              </td>
              <td className="p-2">
                <div className="text-center">CHL</div>
              </td>
            </tr>
            {/* CO2 */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">CO2 Levels</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.co2}</div>
              </td>
              <td className="p-2">
                <div className="text-center">ppm</div>
              </td>
            </tr>
            {/* Humidity */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">Humidity</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.humidity}</div>
              </td>
              <td className="p-2">
                <div className="text-center">%</div>
              </td>
            </tr>
            {/* Temperature */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">Temperature</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.temperature}</div>
              </td>
              <td className="p-2">
                <div className="text-center">°C</div>
              </td>
            </tr>
            {/* Airflow */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">Airflow</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.airflow}</div>
              </td>
              <td className="p-2">
                <div className="text-center">L/s</div>
              </td>
            </tr>
            {/* Power Consumption */}
            <tr>
              <td className="p-2">
                <div className="text-zinc-800 dark:text-zinc-100">Power Consumption</div>
              </td>
              <td className="p-2">
                <div className="text-center">{data.power}</div>
              </td>
              <td className="p-2">
                <div className="text-center">kW/h</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MetricsSummaryCard
