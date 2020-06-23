import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InputItem, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { getFirstError } from '@/utils'
import { handleGetSmsCode } from '../../redux/user.redux'
import './style.less'

@createForm()
@connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  {
    handleGetSmsCode
  }
)
class Login extends Component {
  // constructor(props) {
  //   super(props)
  // }
  // 获得手机验证码
  handleSmsCodeClick = () => {
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
  handleLogin = () => {}
  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <InputItem
          {...getFieldProps('mobileNo', {
            rules: [{ required: true, message: '请输入正确手机号' }, { validator: this.validatePhone }]
          })}
          maxLength="11"
          type="number"
          placeholder="请输入您的手机号"
          clear
        />
        <InputItem
          {...getFieldProps('smsCode', {
            rules: [{ required: true, message: '请输入正确验证码' }, { validator: this.validatePhone }]
          })}
          maxLength="6"
          type="number"
          placeholder="请输入短信验证码"
          clear
        />
        <Button type="primary" onClick={this.handleSmsCodeClick}>
          验证码
        </Button>
        <Button type="primary" onClick={this.handleLogin}>
          登录
        </Button>
      </div>
    )
  }
}

export default Login
