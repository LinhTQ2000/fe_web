import Feature1 from '../features/feature1'
import Feature2 from '../features/feature2'
import ROUTE from './config'

export const routers = [
  {
    name: ROUTE.ROUTE1.TITLE,
    path: ROUTE.ROUTE1.PATH,
    component: Feature1,
  },
  {
    name: ROUTE.ROUTE2.TITLE,
    path: ROUTE.ROUTE2.PATH,
    component: Feature2,
  },
]
