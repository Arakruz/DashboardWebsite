import React, { useContext, useState } from 'react'

import Sidebar from '../partials/Sidebar.jsx'
import Header from '../partials/Header'
import Datepicker from '../components/Datepicker'
import HistoricalCard from '../partials/dashboard/HistoricalCard.jsx'
import RealTimeCard from '../partials/dashboard/RealTimeCard.jsx'
import { SystemContext } from '../utils/SystemContext.js'
import { getAirflow, getHappiness, getPower } from '../utils/Sensor.jsx'

function SystemControl ({ status, setStatus }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const systemStatus = useContext(SystemContext)

  // Updates state/context to reflect user choice, with a real backend a call should be made
  function toggleVentilation () {
    setStatus({
      heating: status.heating,
      ventilation: !status.ventilation,
      warning: !(status.heating || !status.ventilation),
    })
  }

  function toggleHeating () {
    setStatus({
      heating: !status.heating,
      ventilation: status.ventilation,
      warning: !(!status.heating || status.ventilation),
    })
  }

  const getHeatingButtonColor = () => {
    return status.heating ? 'bg-green-600 hover:bg-green-700' : 'bg-rose-600 hover:bg-rose-700'
  }

  const getVentilationButtonColor = () => {
    return status.ventilation
      ? 'bg-green-600 hover:bg-green-700 text-white'
      : 'bg-rose-600 hover:bg-rose-700 text-white'
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <SystemContext.Provider value={status}>
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </SystemContext.Provider>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Datepicker built with flatpickr */}
                <Datepicker/>
                {/* Add view button */}
                <button onClick={toggleVentilation} className={`btn ${getVentilationButtonColor()} text-white`}>
                  <span className="hidden xs:block">Toggle Ventilation</span>
                </button>
                <button onClick={toggleHeating} className={`btn ${getHeatingButtonColor()} text-white`}>
                  <span className="hidden xs:block">Toggle Heater</span>
                </button>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <RealTimeCard title={'Airflow Levels'} data={getAirflow(false)}/>
              <HistoricalCard title={'Historical Airflow Levels'} data={getAirflow(true)}/>
              <RealTimeCard title={'Power Consumptions'} data={getPower(false)}/>
              <HistoricalCard title={'Historical Power Consumptions'} data={getPower(true)}/>
              <RealTimeCard title={'Cow Happiness'} data={getHappiness(false)}/>
              <HistoricalCard title={'Cor Happiness'} data={getHappiness(true)}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SystemControl