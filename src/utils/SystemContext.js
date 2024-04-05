import { createContext } from 'react'

export const SystemContext = createContext({
  ventilation: true,
  heating: true,
  warning: false,
})
