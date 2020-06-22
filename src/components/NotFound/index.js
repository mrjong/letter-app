import React, { Component } from 'react'

class NotFound extends Component {
  reloadHandler = () => {
    window.location.reload()
  }
  render() {
    return (
      <div>
        <p>对不起，您找的页面走丢了～</p>
        <button onClick={this.reloadHandler}>重新加载</button>
      </div>
    )
  }
}

export default NotFound
