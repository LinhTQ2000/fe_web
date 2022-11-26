import { Route, Router, Switch } from 'react-router-dom'

import NotFound from './modules/public/not-found'
import { appRouter } from './router'
import history from './sevices/history'

function App() {
  return (
    <Router history={history}>
      <Switch>
        {appRouter.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
