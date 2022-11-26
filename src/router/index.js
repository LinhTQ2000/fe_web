import { routers as module1Router } from 'src/modules/module1/routers'
import { routers as module2Router } from 'src/modules/module2/routers'

// @TODO: add router
export const appRouter = [...module1Router, ...module2Router]
