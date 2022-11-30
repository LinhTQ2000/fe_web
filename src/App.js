import { GlobalStyles, ThemeProvider } from '@mui/material'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import { AppProvinder } from './contexts/appContext'
import { SocketProvinder } from './contexts/socketContext'
import NotFound from './modules/public/not-found'
import { appRouter } from './router'
import history from './sevices/history'
import store from './store'
import theme, { globalStyles } from './themes'
import i18n from './utils/i18n'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles(theme)} />
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <AppProvinder>
            <SocketProvinder>
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
            </SocketProvinder>
          </AppProvinder>
        </ReduxProvider>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default App
