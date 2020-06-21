import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { PrivateRoute, Loading } from '../components'

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
  delay: 300
})

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            {/* <PrivateRoute path="/user" component={User} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/search" component={Search} />
            <Route path="/search_result" component={SearchResult} />
            <PrivateRoute path="/purchase/:id" component={Purchase} />
            <Route path="/" component={Home} exact /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
