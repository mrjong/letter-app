import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { queryBanner } from '../../redux/mail.redux'
import { queryUserRecommend, queryUnreadPrompt } from '../../redux/user.redux'
import { handleModalShow } from '../../redux/common.redux'
import './style.less'
import refreshIcon from '../../assets/images/home/shuaxin.png'
import nanIcon from '../../assets/images/common/nan.png'
import nvIcon from '../../assets/images/common/nv.png'

const featureList = [
  {
    icon: 'index_icon',
    title: '收件箱',
    en: 'inbox',
    path: '/inbox'
  },
  {
    icon: 'index_icon',
    title: '写信',
    en: 'write',
    path: '/post_confirm?userType=0'
    // path:'/write_letter'
  },
  {
    icon: 'index_icon',
    title: '关注',
    en: 'attention',
    path: '/follow_list'
  },
  {
    icon: 'index_icon',
    title: '草稿箱',
    en: 'drafts',
    path: '/draftbox'
  },
  {
    icon: 'index_icon',
    title: '发件箱',
    en: 'outbox',
    path: '/outbox'
  }
]

@createForm()
@connect(
  (state) => ({
    mail: state.mail,
    user: state.user,
    common: state.common
  }),
  {
    queryBanner,
    queryUserRecommend,
    queryUnreadPrompt,
    handleModalShow
  }
)
class Home extends Component {
  state = {
    imgHeight: 50,
    rotate: false
  }
  componentDidMount() {
    this.props.queryBanner()
    this.props.queryUserRecommend()
    this.props.queryUnreadPrompt()
  }

  navigateTo(path) {
    this.props.history.push(path)
  }

  reloadRecommendList = () => {
    this.setState(
      {
        rotate: true
      },
      () => {
        let timer = setTimeout(() => {
          this.setState({
            rotate: false
          })
          clearTimeout(timer)
        }, 1000)
      }
    )

    this.props.queryUserRecommend()
  }

  render() {
    const {
      mail: { bannerList },
      user: { userRecommends, unreadTip }
    } = this.props
    const { rotate } = this.state
    return (
      <div className='home'>
        {bannerList && bannerList.length > 0 && (
          <Carousel autoplay={false} infinite>
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
        <div className="home__feature">
          {featureList.map((item, index) => {
            return (
              <div
                className="home__feature--item"
                key={item.en}
                onClick={() => {
                  this.navigateTo(item.path)
                }}
              >
                <div className="home__feature--item-inner">
                  {item.title === '收件箱' && unreadTip === 'Y' && (
                    <div className="home__feature--item-tip">新的来信</div>
                  )}
                  <img
                    src={require(`../../assets/images/home/index_icon${index + 1}.png`)}
                    alt=""
                    className="home__feature--item-icon"
                  />
                  <span className="home__feature--item-title">{item.title}</span>
                  <span className="home__feature--item-en">{item.en.toLocaleUpperCase()}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="home__recommend">
          <div className="home__recommend--bar">
            <span className="home__recommend--bar-title">推荐信友</span>
            <span className="home__recommend--bar-text" onClick={this.reloadRecommendList}>
              <img
                src={refreshIcon}
                alt=""
                className={`home__recommend--bar-icon ${rotate && 'home__recommend--bar-iconRotate'}`}
              />
              <span>换一换</span>
            </span>
          </div>
          <div className="home__recommend--list">
            {userRecommends &&
              userRecommends.length > 0 &&
              userRecommends.map((item, index) => {
                return (
                  <div className="home__recommend--item" key={index}>
                    <div className="home__recommend--item-avatarWrap">
                      <img src={item.headImg} alt="" className="home__recommend--item-avatar" />
                    </div>
                    <img src={item.sex === 0 ? nvIcon : nanIcon} alt="" className="home__recommend--item-gender" />
                    <span className="home__recommend--item-name">{item.penName}</span>
                    <span className="home__recommend--item-desc">{item.autograph}</span>
                    <button className="home__recommend--item-button">写信</button>
                    <span className="home__recommend--item-city">
                      {item.addressProvince}·{item.addressCity}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
