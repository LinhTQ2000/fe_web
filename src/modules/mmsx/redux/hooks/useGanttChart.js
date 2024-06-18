import { useContext } from 'react'

import GanttContext from '../../partials/gantt-chart/GanttContext'

export const useGanttChart = () => useContext(GanttContext)
