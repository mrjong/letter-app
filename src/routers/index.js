import React from 'react'
import { RouterGuard } from '@/components'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import config from './config'

export const renderRoutes = (routes) => {
  if (!Array.isArray(routes)) return null

  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          )
        }

        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => <RouterGuard route={route} {...props} />}
          />
        )
      })}
    </Switch>
  )
}

const AppRouter = () => {
  return <Router>{renderRoutes(config)}</Router>
}

export default AppRouter
