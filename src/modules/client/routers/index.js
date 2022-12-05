import Home from '../features/home'
import { ROUTE } from './config'

export const routes = [
  {
    name: ROUTE.HOME.TITLE,
    path: ROUTE.HOME.PATH,
    icon: 'add',
    component: Home,
  },
  {
    name: ROUTE.PRIVATE.TITLE,
    path: ROUTE.PRIVATE.PATH,
    icon: 'add',
    component: Home,
  },
  {
    name: ROUTE.CHART.TITLE,
    path: ROUTE.CHART.PATH,
    icon: 'add',
    component: Home,
  },
  {
    name: ROUTE.RADIO.TITLE,
    path: ROUTE.RADIO.PATH,
    icon: 'add',
    component: Home,
  },
  {
    name: ROUTE.FOLLOW.TITLE,
    path: ROUTE.FOLLOW.PATH,
    icon: 'add',
    component: Home,
  },
]
