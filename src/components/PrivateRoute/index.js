import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isLogin } = this.props
    return (
      <Route
        render={(props) => {
          return isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }}
      ></Route>
    )
  }
}

export default PrivateRoute
