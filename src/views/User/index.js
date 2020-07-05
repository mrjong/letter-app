import React, { Component } from 'react'
import { Modal, Toast, ImagePicker } from 'antd-mobile'
import { connect } from 'react-redux'
import { queryUserInfo, modifyUserInfo, modifyAvatar } from '../../redux/user.redux'
import nan from '../../assets/images/common/nan.png'
import nv from '../../assets/images/common/nv.png'
import './style.less'

const prompt = Modal.prompt

const renderSubTitle = ({ index, address, addressDetail, letterPaperCount }) => {
  switch (index) {
    case 1:
      return <span className="subTitle">(可使用{letterPaperCount}张)</span>
    case 2:
      return (
        <span className="subTitle address">
          {address} <span style={{ color: '#999' }}>{addressDetail || '未填写明细地址'}</span>
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
  // {
  //   icon: require('../../assets/images/user/me_icon3.png'),
  //   title: '通知',
  //   subTitle: '',
  //   path: '',
  //   extra: ''
  // },
  {
    icon: require('../../assets/images/user/me_icon4.png'),
    title: '关于信友阁',
    subTitle: '',
    path: '/about',
    extra: ''
  }
]

@connect((state) => state.user, {
  queryUserInfo,
  modifyUserInfo,
  modifyAvatar
})
class User extends Component {
  state = {
    files: []
  }

  componentDidMount() {
    this.props.queryUserInfo()
  }

  navigateTo = (path) => {
    if (!path) return
    this.props.history.push(path)
  }

  onFileChange = (files, type, index) => {
    let formData = new FormData()
    formData.append('headImg', files[0].file)
    this.props.modifyAvatar(formData)
  }

  editAutograph = (value) => {
    prompt(
      '修改签名',
      '',
      [
        { text: '取消' },
        {
          text: '修改',
          onPress: (value) => {
            if (value.length > 20) {
              Toast.info('签名仅支持20个字喔')
              return
            }
            this.props.modifyUserInfo({
              autograph: value
            })
          }
        }
      ],
      'default',
      `${value}`
    )
  }

  editAddress = () => {
    const {
      userInfo: { addressDetail }
    } = this.props
    prompt(
      '修改地址',
      '',
      [
        { text: '取消' },
        {
          text: '修改',
          onPress: (value) =>
            this.props.modifyUserInfo({
              address: value
            })
        }
      ],
      'default',
      `${addressDetail || '未填写明细地址'}`
    )
  }

  onSubTitleClick = (index) => {
    if (index === 2) {
      this.editAddress()
    }
  }

  render() {
    const {
      userInfo: {
        address,
        autograph,
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
                <div className="avatar-upload">
                  <img
                    src={headImgPath || require('../../assets/images/common/avatar_default.jpeg')}
                    className="avatar"
                    alt="头像"
                  />
                  <ImagePicker
                    // files={files}
                    onChange={this.onFileChange}
                    selectable={this.state.files.length < 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    multiple={false}
                    disableDelete
                  />
                </div>

                <div>
                  <span className="name">{penName}</span>
                  <div>
                    <img src={sex === 1 ? nan : nv} alt="" className="sex" />
                    <span className="city">{address}</span>
                  </div>
                </div>
              </div>
              <p className="total">
                粉丝 {fansCount} 丨 收信 {receiveCount} 丨 写信 {sendCount}
              </p>
              <p
                className="nickname"
                onClick={() => {
                  this.editAutograph(autograph)
                }}
              >
                {autograph}
              </p>
            </div>
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
                    <span
                      onClick={() => {
                        this.onSubTitleClick(index)
                      }}
                    >
                      {item.subTitle && item.subTitle({ index, address, addressDetail, letterPaperCount })}
                    </span>
                  </div>
                  <div className="value">
                    {item.extra && (
                      <span className="extra" onClick={this.editAddress}>
                        {item.extra}
                      </span>
                    )}
                  </div>
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
