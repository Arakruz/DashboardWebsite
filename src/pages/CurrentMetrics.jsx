import React, { useState } from 'react'

import Sidebar from '../partials/Sidebar.jsx'
import Header from '../partials/Header'
import Datepicker from '../components/Datepicker'
import { getAirflow, getCO2, getHumidity, getPower, getTemperature } from '../utils/Sensor.jsx'
import RealTimeCard from '../partials/dashboard/RealTimeCard.jsx'

function CurrentMetrics () {

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
              <RealTimeCard title={'Temperature'} data={getTemperature()} small={true}/>
              <RealTimeCard title={'CO2 Levels'} data={getCO2()} small={true}/>
              <RealTimeCard title={'Humidity'} data={getHumidity()} small={true}/>
              <RealTimeCard title={'Airflow'} data={getAirflow()} small={true}/>
              <RealTimeCard title={'Power Consumption'} data={getPower()} small={true}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CurrentMetrics