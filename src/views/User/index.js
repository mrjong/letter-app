import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryUserInfo } from '../../redux/user.redux'
import './style.less'

const renderSubTitle = ({ index, addressDetail, letterPaperCount }) => {
  switch (index) {
    case 0:
      return <span className="subTitle">(可使用{letterPaperCount}张)</span>
    case 1:
      return (
        <span className="subTitle address">
          北京·昌平· <span style={{ color: '#999' }}>{addressDetail || '未填写明细地址'}</span>
        </span>
      )
    default:
      break
  }
}

const navList = [
  {
    icon: require('../../assets/images/user/me_icon5.png'),
    title: '我的动态',
    subTitle: '',
    path: '/my_dynamic',
    extra: ''
  },
  {
    icon: require('../../assets/images/user/me_icon1.png'),
    title: '信纸',
    subTitle: renderSubTitle,
    path: '/letter_paper',
    extra: ''
  },
  {
    icon: require('../../assets/images/user/me_icon2.png'),
    title: '收信地址',
    subTitle: renderSubTitle,
    path: '',
    extra: '编辑'
  },
  {
    icon: require('../../assets/images/user/me_icon3.png'),
    title: '通知',
    subTitle: '',
    path: '',
    extra: ''
  },
  {
    icon: require('../../assets/images/user/me_icon4.png'),
    title: '关于信友阁',
    subTitle: '',
    path: '',
    extra: ''
  }
]

@connect((state) => state.user, {
  queryUserInfo
})
class User extends Component {
  componentDidMount() {
    this.props.queryUserInfo()
  }
  navigateTo = (path) => {
    if (!path) return
    this.props.history.push(path)
  }

  render() {
    const {
      userInfo: {
        address,
        autograph,
        birthday,
        fansCount,
        headImgPath,
        letterPaperCount,
        penName,
        receiveCount,
        sendCount,
        sex,
        addressDetail
      }
    } = this.props
    return (
      <div>
        <div className="user__header--title">
          <span>个人中心</span>
        </div>
        <div className="user__info--pannel">
          <div className="user__info--pannel-brief">
            <div>
              <div className="avatar-wrap">
                <img
                  src={headImgPath || require('../../assets/images/common/avatar_default.jpeg')}
                  className="avatar"
                  alt="头像"
                />
                <div>
                  <span className="name">{penName}</span>
                  <div>
                    <span className={`age ${sex === 1 ? 'nan' : 'nv'}`}>{birthday}</span>
                    <span className="city">{address}</span>
                  </div>
                </div>
              </div>
              <p className="total">
                粉丝 {fansCount} 丨 收信 {sendCount} 丨 写信 {receiveCount}
              </p>
              <p className="nickname">{autograph}</p>
            </div>
            <span className="edit">个人信息修改</span>
          </div>
          <div className="user__info--pannel-list">
            {navList.map((item, index) => {
              return (
                <div
                  className="item"
                  key={index}
                  onClick={() => {
                    this.navigateTo(item.path)
                  }}
                >
                  <div className="label">
                    <img src={item.icon} className="icon" alt="icon" />
                    <span>{item.title}</span>
                    {item.subTitle && item.subTitle({ index, addressDetail, letterPaperCount })}
                  </div>
                  <div className="value">{item.extra && <span className="extra">{item.extra}</span>}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default User
