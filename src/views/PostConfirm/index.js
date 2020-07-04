import React, { Component } from 'react'
import { Tabs, Toast } from 'antd-mobile'
import qs from 'qs'
import PostForm from './components/PostForm'
import './style.less'
import onlinePic from '@/assets/images/mails/xiexin_1.png'
import offlinePic from '@/assets/images/mails/xiexin_2.png'
import { writeLettersCheck } from '../../redux/mail.redux'
import { connect } from 'react-redux'

const SYSTEM_USER = '1' //系统用户
const NOT_SYSTEM_USER = '0' //非系统用户
const tabs = [{ title: '电子信件' }, { title: '纸质信件' }]
let query

@connect((state) => state.mail, {
  writeLettersCheck
})
class PostConfirm extends Component {
  constructor(props) {
    super(props)
    query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const { mobileHid, penName, receiveUserAddress } = query.userType === SYSTEM_USER ? props.receiveAddress : {}
    this.state = {
      online: {
        postMan: penName,
        postPhone: mobileHid,
        postAddress: receiveUserAddress
      },
      offline: {
        postMan: penName,
        postPhone: mobileHid,
        postAddress: receiveUserAddress
      },
      postType: 'online'
    }
  }
  onPostManChange = (value) => {
    const { postType } = this.state
    this.setState({
      [postType]: {
        ...this.state[postType],
        postMan: value
      }
    })
  }

  onPostPhoneChange = (value) => {
    if (value.length > 11) return
    const { postType } = this.state
    this.setState({
      [postType]: {
        ...this.state[postType],
        postPhone: value
      }
    })
  }

  onPostAddressChange = (value) => {
    const { postType } = this.state
    this.setState({
      [postType]: {
        ...this.state[postType],
        postAddress: value
      }
    })
  }

  goWriteLetter = () => {
    const { postType } = this.state
    const { postMan, postPhone, postAddress } = this.state[postType]
    if (!postMan) {
      Toast.info('请填写收信人')
      return
    }
    if (!postPhone) {
      Toast.info('请填写收信人电话')
      return
    }
    if (postType === 'offline' && !postAddress) {
      Toast.info('请填写收信人地址')
      return
    }
    let params = {
      letterType: this.getLetterType()
    }
    if (query.userType === SYSTEM_USER) {
      params = {
        ...params,
        receiveUserId: this.props.receiveAddress.receiveUserId
      }
    } else {
      params = {
        ...params,
        receivePenName: postMan,
        receiveMobileNo: postPhone,
        receiveAddress: postAddress
      }
    }
    this.props.writeLettersCheck(params, () => {
      this.props.history.push(`/write_letter?postType=${this.state.postType}`)
    })
  }

  getLetterType = () => {
    const { postType } = this.state
    let str = ''
    if (query.userType === NOT_SYSTEM_USER) {
      str = postType === 'offline' ? '33' : '22'
    } else {
      str = postType === 'offline' ? '11' : '00'
    }
    return str
  }

  render() {
    const { online, offline } = this.state
    return (
      <div className="postConfirm">
        <Tabs
          tabs={tabs}
          initialPage={0}
          swipeable={false}
          onChange={(tab, index) => {
            this.setState({
              postType: index === 0 ? 'online' : 'offline'
            })
          }}
          tabBarUnderlineStyle={{
            border: '1px #595E4A solid'
          }}
          tabBarBackgroundColor="#ebe8da"
          tabBarActiveTextColor="#595E4A"
          tabBarInactiveTextColor="#B8BCAC"
        >
          <div className="postConfirm__content">
            <PostForm
              onPostMan={this.onPostManChange}
              onPostPhone={this.onPostPhoneChange}
              onPostAddress={this.onPostAddressChange}
              hide
              {...online}
              disabled={query.userType === SYSTEM_USER}
            />
            <div className="example-pic" style={{ height: '5.54rem' }}>
              <div className="inner" style={{ height: '5.2rem' }}>
                <div className="img-wrap" style={{ height: '5rem' }}>
                  <img src={onlinePic} alt="" />
                  <ul className="bottom-tip">
                    <li className="bottom-tip-item">温馨提示:</li>
                    <li className="bottom-tip-item">
                      线上信件平台会根据寄信人和收信人之间的距离计算 派送时长喔,例：重庆->成都 约3小时
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="postConfirm__content">
            <PostForm
              onPostMan={this.onPostManChange}
              onPostPhone={this.onPostPhoneChange}
              onPostAddress={this.onPostAddressChange}
              {...offline}
              disabled={query.userType === SYSTEM_USER}
            />
            <div className="example-pic">
              <div className="inner">
                <div className="img-wrap">
                  <img src={offlinePic} alt="" />
                  <ul className="bottom-tip">
                    <li className="bottom-tip-item">温馨提示:</li>
                    <li className="bottom-tip-item">1.平台将会采用写信时选择的信纸进行书写.</li>
                    <li className="bottom-tip-item">2.书信内容由纸笔真实书写，非系统打印.</li>
                    <li className="bottom-tip-item">3.信件由平台从北京寄出，非写信人地址.</li>
                    <li className="bottom-tip-item">4.线下寄信平台将收取制作费用及运输费用.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tabs>

        <div className="bottom-fixed-button" onClick={this.goWriteLetter}>
          去写信
        </div>
      </div>
    )
  }
}

export default PostConfirm
