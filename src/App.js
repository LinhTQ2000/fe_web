import { Provider as ReduxProvider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import NotFound from './modules/public/not-found'
import { appRouter } from './router'
import history from './sevices/history'
import store from './store'

function App() {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  )
}

export default App
