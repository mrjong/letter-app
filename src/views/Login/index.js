import React, { Component } from 'react'
import './style.less'
import { login } from '../../service'

class Login extends Component {
  login = () => {
    login()
  }
  render() {
    return (
      <div>
        <span className="Login__text--color" onClick={this.login}>
          login
        </span>
      </div>
    )
  }
}

export default Login
