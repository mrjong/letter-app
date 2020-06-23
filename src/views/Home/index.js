import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
class Home extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 50
  }
  render() {
    const { route, children } = this.props
    return (
      <div>
        Home
        {children}
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={(index) => console.log('slide to', index)}
        >
          {this.state.data.map((val) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: '200px' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    )
  }
}

export default Home
