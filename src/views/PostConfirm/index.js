import React, { Component } from 'react'
import { Tabs, Toast } from 'antd-mobile'
import qs from 'qs'
import PostForm from './components/PostForm'
import './style.less'
import onlinePic from '@/assets/images/mails/xiexin_1.png'
import offlinePic from '@/assets/images/mails/xiexin_2.png'
import { writeLettersCheck } from '../../redux/mail.redux'
import { connect } from 'react-redux'

const tabs = [{ title: '纸质信件' }, { title: '电子信件' }]

@connect((state) => state, {
  writeLettersCheck
})
class PostConfirm extends Component {
  state = {
    online: {
      postMan: '',
      postPhone: '',
      postAddress: ''
    },
    offline: {
      postMan: '',
      postPhone: '',
      postAddress: ''
    },
    postType: 'offline'
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
    this.props.writeLettersCheck({
      letterType: this.getLetterType(),
      receivePenName: postMan,
      receiveMobileNo: postPhone,
      receiveAddress: postAddress
    })
  }

  getLetterType = () => {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const { postType } = this.state
    let str = ''
    if (query.userType === '0') {
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
          onChange={(tab, index) => {
            this.setState({
              postType: index === 0 ? 'offline' : 'online'
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
              {...offline}
              disabled={false}
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
          <div className="postConfirm__content">
            <PostForm
              onPostMan={this.onPostManChange}
              onPostPhone={this.onPostPhoneChange}
              onPostAddress={this.onPostAddressChange}
              hide
              {...online}
              disabled={false}
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
        </Tabs>

        <div className="bottom-fixed-button" onClick={this.goWriteLetter}>
          去写信
        </div>
      </div>
    )
  }
}

export default PostConfirm
