import { createContext } from 'react'

const AppContext = createContext({})
export const AppProvinder = ({ children }) => {
  const value = {}
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
