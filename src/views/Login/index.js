import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUserInfo } from '../../redux/user.redux'
import './style.less'

@connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  {
    setUserInfo
  }
)
class Login extends Component {
  handleLogin = () => {
    this.props.setUserInfo()
  }
  render() {
    return (
      <div>
        <span className="Login__text--color" onClick={this.handleLogin}>
          login
        </span>
      </div>
    )
  }
}

export default Login
