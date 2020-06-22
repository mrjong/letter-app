import React, { Component } from 'react'
class Home extends Component {
  render() {
    const { route, children } = this.props
    return (
      <div>
        Home
        {children}
      </div>
    )
  }
}

export default Home
