import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InputItem, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { getFirstError, validatePhone, validateSmsCode } from '@/utils/validate'
import { handleGetSmsCode, smsCodeCountDownEnd, setCountDownTimes, handleGetLogin } from '../../redux/login.redux'
import './style.less'
import logo from '../../assets/images/common/logo.png'

let timer = null
@createForm()
@connect((state) => state.login, {
  handleGetSmsCode,
  handleGetLogin,
  smsCodeCountDownEnd,
  setCountDownTimes
})
class Login extends Component {
  componentDidMount() {
    localStorage.clear()
  }
  componentDidUpdate(prevProps) {
    const { smsCodeCountDownSts } = this.props
    if (smsCodeCountDownSts && smsCodeCountDownSts !== prevProps.smsCodeCountDownSts) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    let { smsCodeTimes } = this.props
    timer = setInterval(() => {
      if (smsCodeTimes < 1) {
        this.stopTimer()
      } else {
        this.props.setCountDownTimes(--smsCodeTimes)
      }
    }, 1000)
  }

  stopTimer = () => {
    this.props.smsCodeCountDownEnd()
    clearInterval(timer)
  }

  // 获得手机验证码
  onSmsCodeClick = () => {
    this.props.form.validateFields((err, values) => {
      if (err && err.smsCode) {
        delete err.smsCode
      }
      if (!err || JSON.stringify(err) === '{}') {
        this.props.handleGetSmsCode({
          mobileNo: values.mobileNo
        })
      } else {
        Toast.info(getFirstError(err))
      }
    })
  }
  onLoginClick = () => {
    if (!this.props.smsCodeNo) {
      Toast.info('请先获取验证码')
      return
    }
    this.props.form.validateFields((err, values) => {
      if (!err || JSON.stringify(err) === '{}') {
        this.props.handleGetLogin(values.smsCode)
      } else {
        Toast.info(getFirstError(err))
      }
    })
  }
  render() {
    const {
      form: { getFieldProps },
      smsCodeCountDownSts,
      smsCodeTimes
    } = this.props
    return (
      <div className="login">
        <img src={logo} alt="logo" className="logo-img" />
        <div className="login__input_wrap">
          <InputItem
            {...getFieldProps('mobileNo', {
              rules: [{ validator: validatePhone }]
            })}
            maxLength="11"
            type="number"
            placeholder="请输入您的手机号"
            clear
          />
        </div>
        <span className="account-tip">*未注册手机号将自动创建账户</span>
        <div className="login__input_wrap smsCode">
          <InputItem
            {...getFieldProps('smsCode', {
              rules: [{ validator: validateSmsCode }]
            })}
            maxLength="4"
            type="number"
            placeholder="请输入短信验证码"
            clear
          />
          <Button
            type="primary"
            onClick={this.onSmsCodeClick}
            disabled={smsCodeCountDownSts}
            style={{ width: '2.8rem', borderRadius: '0px', flexShrink: '0' }}
          >
            {smsCodeCountDownSts ? `${smsCodeTimes}"` : '验证码'}
          </Button>
        </div>

        <Button
          type="primary"
          onClick={this.onLoginClick}
          style={{ width: '6.6rem', marginTop: '1rem', borderRadius: '5rem' }}
        >
          登录
        </Button>
      </div>
    )
  }
}

export default Login
