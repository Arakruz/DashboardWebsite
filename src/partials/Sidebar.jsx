import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SystemContext } from '../utils/SystemContext.js'

function Sidebar ({ sidebarOpen, setSidebarOpen }) {
  const systemStatus = useContext(SystemContext)
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded ===
      'true')

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // toggle sidebar
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Get warning icon, if needed
  function getIcon () {
    if (systemStatus.warning) {
      return (<div className="w-5 h-5 flex items-center justify-center rounded-full mr-4 mt-1">
        <span className="sr-only">Warning</span>
        <svg fill="#d11f1f" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 554.2 554.199" xml:space="preserve"
             stroke="#d11f1f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g> <path
            d="M538.5,386.199L356.5,70.8c-16.4-28.4-46.7-45.9-79.501-45.9c-32.8,0-63.1,17.5-79.5,45.9L12.3,391.6 c-16.4,28.4-16.4,63.4,0,91.8C28.7,511.8,59,529.3,91.8,529.3H462.2c0.101,0,0.2,0,0.2,0c50.7,0,91.8-41.101,91.8-91.8 C554.2,418.5,548.4,400.8,538.5,386.199z M316.3,416.899c0,21.7-16.7,38.3-39.2,38.3s-39.2-16.6-39.2-38.3V416 c0-21.601,16.7-38.301,39.2-38.301S316.3,394.3,316.3,416V416.899z M317.2,158.7L297.8,328.1c-1.3,12.2-9.4,19.8-20.7,19.8 s-19.4-7.7-20.7-19.8L237,158.6c-1.3-13.1,5.801-23,18-23H299.1C311.3,135.7,318.5,145.6,317.2,158.7z"></path> </g> </g></svg>
      </div>)
    }
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-zinc-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-zinc-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-zinc-500 hover:text-zinc-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="flex items-center justify-between ">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect fill="#f59e0b" width="32" height="32" rx="16"/>
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#f59e0b"/>
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="#fbbf24"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="#d97706"
              />
            </svg>
            <h1 className="text-amber-300 hover:text-zinc-400 ml-4"> Atlas Farms</h1>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-amber-300 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
              <span
                className="lg:hidden lg:sidebar-expanded:block 2xl:block">Dashboards</span>
            </h3>
            <ul className="mt-3">
              {/* Home */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(
                  'home') && 'bg-zinc-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-zinc-200 truncate transition duration-150 ${
                    pathname.includes('home')
                      ? 'hover:text-zinc-200'
                      : 'hover:text-white'
                  }`}
                >
                    <span
                      className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Home
                    </span>
                </NavLink>
              </li>
              {/* Current Metrics */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(
                  'current-metrics') && 'bg-zinc-900'}`}>
                <NavLink
                  end
                  to="/current-metrics"
                  className={`block text-zinc-200 truncate transition duration-150 ${
                    pathname.includes('current-metrics')
                      ? 'hover:text-zinc-200'
                      : 'hover:text-white'
                  }`}
                >
                      <span
                        className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Current Metrics
                      </span>
                </NavLink>
              </li>
              {/* Environment */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(
                  'environment') && 'bg-zinc-900'}`}>
                <NavLink
                  end
                  to="/environment"
                  className={`block text-zinc-200 truncate transition duration-150 ${
                    pathname.includes('environment')
                      ? 'hover:text-zinc-200'
                      : 'hover:text-white'
                  }`}
                >
                  <span
                    className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Environment</span>
                </NavLink>
              </li>
              {/* System Control */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(
                  'system-control') && 'bg-zinc-900'}`}>
                <NavLink
                  end
                  to="/system-control"
                  className={`block text-zinc-200 truncate transition duration-150 ${
                    pathname.includes('system-control')
                      ? 'hover:text-zinc-200'
                      : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      System Control
                    </span>
                    {/* Warning icon */}
                    <div className="flex flex-shrink-0 ml-2">
                      {getIcon()}
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
