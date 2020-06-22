import React, { Suspense } from 'react'
import { Loading, PrivateRoute } from '@/components'
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
        //是否需要登录权限
        return route.auth ? (
          <PrivateRoute
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            route={route}
            renderChildRoutes={renderRoutes(route.childRoutes)}
          />
        ) : (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              const renderChildRoutes = renderRoutes(route.childRoutes)
              if (route.component) {
                return (
                  <Suspense fallback={<Loading />}>
                    <route.component route={route}>{renderChildRoutes}</route.component>
                  </Suspense>
                )
              }
              return renderChildRoutes
            }}
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
