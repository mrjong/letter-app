import React from 'react'
import AppRouter from '../routers'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Loadable from 'react-loadable'

// const Login = Loadable({
//   loader: () => import('./Login'),
//   loading: Loading,
//   delay: 300
// })

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    )
  }
}

export default App
