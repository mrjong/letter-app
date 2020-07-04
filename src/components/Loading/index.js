import React, { Component } from 'react'
import { ActivityIndicator } from 'antd-mobile'
import './style.less'
class Loading extends Component {
  render() {
    return (
      <div className="loading-page">
        <ActivityIndicator size="large" text="正在加载" />
      </div>
    )
  }
}

export default Loading
