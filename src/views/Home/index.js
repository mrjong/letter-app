import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { queryBanner } from '../../redux/mail.redux'
import { queryUserRecommend, queryUnreadPrompt } from '../../redux/user.redux'

@createForm()
@connect((state) => state.mail, {
  queryBanner,
  queryUserRecommend,
  queryUnreadPrompt
})
class Home extends Component {
  state = {
    imgHeight: 50
  }
  componentDidMount() {
    this.props.queryBanner()
    this.props.queryUserRecommend()
    this.props.queryUnreadPrompt()
  }
  render() {
    const { bannerList } = this.props
    return (
      <div>
        {bannerList && bannerList.length > 0 && (
          <Carousel
            autoplay={true}
            infinite
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            // afterChange={(index) => console.log('slide to', index)}
          >
            {bannerList.map((item) => (
              <a
                key={item.id}
                href={item.bannerUrlAdrs}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={item.bannerImgAdrs}
                  alt="轮播图"
                  style={{ width: '100%', verticalAlign: 'top', height: '200px' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'))
                    this.setState({ imgHeight: 'auto' })
                  }}
                />
              </a>
            ))}
          </Carousel>
        )}
      </div>
    )
  }
}

export default Home
