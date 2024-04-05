import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './css/style.css'
import './charts/ChartjsConfig'
// Import pages
import MainDashboard from './pages/MainDashboard.jsx'
import CurrentMetrics from './pages/CurrentMetrics.jsx'
import SystemControl from './pages/SystemControl.jsx'
import { SystemContext } from './utils/SystemContext.js'
import EnvironmentDashboard from './pages/Environment.jsx'

function App () {

  const location = useLocation()

  //Keeps track of the system status, used to update the frontend
  const [status, setStatus] = useState({
    heating: true,
    ventilation: true,
    warning: false,
  })

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]) // triggered on route change

  return (
    <>
      <SystemContext.Provider value={status}>
        <Routes>
          <Route exact path="/" element={<MainDashboard/>}/>
          <Route exact path="/system-control" element={<SystemControl status={status} setStatus={setStatus}/>}/>
          <Route exact path="/current-metrics" element={<CurrentMetrics/>}/>
          <Route exact path="/environment" element={<EnvironmentDashboard/>}/>
        </Routes>
      </SystemContext.Provider>
    </>
  )
}

export default App
