import React, { useState } from 'react'
import Sidebar from '../partials/Sidebar.jsx'
import Header from '../partials/Header'
import Datepicker from '../components/Datepicker'
import MetricsSummaryCard from '../partials/dashboard/MetricsSummaryCard.jsx'
import HistoricalCard from '../partials/dashboard/HistoricalCard.jsx'
import RealTimeCard from '../partials/dashboard/RealTimeCard.jsx'
import { getAirflow, getCO2, getHappiness, getHumidity, getPower, getTemperature } from '../utils/Sensor.jsx'

{/* This component can be changed to use inheritance later if needed */}

function MainDashboard () {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Datepicker built with flatpickr */}
                <Datepicker/>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <RealTimeCard title={'Cow Happiness Levels'} data={getHappiness(false)}/>

              <MetricsSummaryCard data={{
                happy: getHappiness(true).slice(-1),
                co2: getCO2(true).slice(-1),
                humidity: getHumidity(true).slice(-1),
                temperature: getTemperature(true).slice(-1),
                airflow: getAirflow(true).slice(-1),
                power: getPower(true).slice(-1),
              }}/>

              <HistoricalCard title={'Temperature (°C)'} data={getTemperature(true)}/>
              <HistoricalCard title={'CO2 Levels (ppm)'} data={getCO2(true)}/>
              <HistoricalCard title={'Humidity (%)'} data={getHumidity(true)}/>
              <HistoricalCard title={'Airflow (L/s)'} data={getAirflow(true)}/>
              <HistoricalCard title={'Power Consumption (kW/h)'} data={getPower(true)}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainDashboard