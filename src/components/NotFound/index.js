import React, { Component } from 'react'
import bg_404 from '../../assets/images/common/404.png'
import './style.less'
class NotFound extends Component {
  backHome = () => {
    window.ReactRouterHistory.replace('/home')
  }
  render() {
    return (
      <div className="not-found">
        <img src={bg_404} alt="头像" className="background-image" />
        <p className='tip-text'>对不起，您找的页面走丢了～</p>
        <button onClick={this.backHome} className='back-button'>返回首页</button>
      </div>
    )
  }
}

export default NotFound
