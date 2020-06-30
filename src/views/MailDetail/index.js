import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.less'
@connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  {
    // setUserInfo
  }
)
class MailDetail extends Component {
  render() {
    return <div></div>
  }
}

export default MailDetail
