import { createContext } from 'react'

const PageContext = createContext({})

export const PageProvider = ({ children, visibleCharts, setVisibleCharts }) => {
  const value = {
    visibleCharts,
    setVisibleCharts,
  }
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export default PageContext
