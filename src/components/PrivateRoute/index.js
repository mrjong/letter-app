import React, { Component, Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loading } from '@/components'

function MyComponent(props) {
  if (props.route.component) {
    return (
      <Suspense fallback={<Loading />}>
        <props.route.component route={props.route}>{props.renderChildRoutes}</props.route.component>
      </Suspense>
    )
  }
  return props.renderChildRoutes
}

@connect((state) => state)
class PrivateRoute extends Component {
  render() {
    const { isLogin } = this.props
    return (
      <Route
        render={(props) => {
          return isLogin ? (
            <MyComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }}
      />
    )
  }
}

export default PrivateRoute
