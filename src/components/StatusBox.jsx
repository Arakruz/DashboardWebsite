import React, { useContext } from 'react'
import { SystemContext } from '../utils/SystemContext.js'

function StatusBox () {
  const systemStatus = useContext(SystemContext)

  // Functions used to update the system icons of the header
  function getWarningIcon () {
    if (systemStatus.warning) {
      return <h2 className="text-rose-500 ml-4">Warning: Check System Controls</h2>
    }
    return <h2 className="text-green-600 dark:text-green-500 ml-4">Normal</h2>
  }

  function getVentilationIcon () {
    return getIcon(systemStatus.ventilation)
  }

  function getHeatingIcon () {
    return getIcon(systemStatus.heating)
  }

  function getIcon (status) {
    if (status) {
      return (<div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 mr-4 mt-1">
        <span className="sr-only">ON</span>
      </div>)
    }
    return (<div className="w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 mr-4 mt-1">
      <span className="sr-only">OFF</span>
    </div>)
  }

  return (
    <div className="relative inline-flex">
      <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-2">
        <h2>System Status:</h2>
        {getWarningIcon()}
      </div>
      <h2
        className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-4 ml-3">Ventilation
        Status:</h2>
      {getVentilationIcon()}
      <h2 className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-4">Heating
        Status:</h2>
      {getHeatingIcon()}
      {/*  Divider */}
      <hr className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 border-none"/>
    </div>
  )
}

export default StatusBox