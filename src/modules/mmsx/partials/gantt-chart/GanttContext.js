import { createContext } from 'react'

const GanttContext = createContext({})
export const GanttChartProvider = ({
  children,
  maintenancePlanId,
  datePlan,
  maintenancePlanDetail,
}) => {
  const value = {
    maintenancePlanId,
    datePlan,
    maintenancePlanDetail,
  }
  return <GanttContext.Provider value={value}>{children}</GanttContext.Provider>
}

export default GanttContext
