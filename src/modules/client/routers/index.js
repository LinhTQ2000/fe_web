import Home from '../features/home'
import Private from '../features/private'
import { ROUTE } from './config'

export const routes = [
  {
    name: ROUTE.HOME.TITLE,
    path: ROUTE.HOME.PATH,
    isInSidebar: true,
    icon: 'add',
    component: Home,
  },
  {
    name: ROUTE.PRIVATE.TITLE,
    path: ROUTE.PRIVATE.PATH,
    icon: 'add',
    isInSidebar: true,
    component: Private,
  },
  {
    name: ROUTE.CHART.TITLE,
    path: ROUTE.CHART.PATH,
    icon: 'add',
    isInSidebar: true,
    component: Home,
  },
  {
    name: ROUTE.RADIO.TITLE,
    path: ROUTE.RADIO.PATH,
    icon: 'add',
    isInSidebar: true,
    component: Home,
  },
  {
    name: ROUTE.FOLLOW.TITLE,
    path: ROUTE.FOLLOW.PATH,
    icon: 'add',
    isInSidebar: true,
    component: Home,
  },
]
