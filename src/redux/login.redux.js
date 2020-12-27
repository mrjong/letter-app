import api from '../api'
import { handleModalHide } from './common.redux'

const initialState = {
  mobileNo: '',
  smsCode: '',
  smsCodeTimes: 59,
  smsCodeCountDownSts: false
}

//types
const LOGOUT = 'LOGOUT'
const SMSCODE_COUNTDOWN = 'SMSCODE_COUNTDOWN'
const COUNTDOWN_TIMES = 'COUNTDOWN_TIMES'

//reducers
export const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state }
    case SMSCODE_COUNTDOWN:
      return { ...state, ...action.payload }
    case COUNTDOWN_TIMES:
      return { ...state, smsCodeTimes: action.payload.smsCodeTimes }
    default:
      return state
  }
}

//actions
//获取验证码
export const handleGetSmsCode = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.querySmsCode(params)
      const { sendNo = '' } = res
      dispatch({
        type: SMSCODE_COUNTDOWN,
        payload: {
          smsCodeCountDownSts: true,
          smsCodeNo: sendNo
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//登录校验
export const handleGetLogin = (smsCode) => {
  return (dispatch, getState) => {
    const smsCodeNo = getState().login.smsCodeNo
    api
      .login({
        id: smsCodeNo,
        code: smsCode
      })
      .then((res) => {
        const { businessCode = '', mobileNo = '', tokenId = '' } = res
        if (businessCode === '0001') {
          localStorage.setItem('mobileNo', mobileNo)
          window.ReactRouterHistory.push('/improve_profile')
        } else if (businessCode === '0002') {
          localStorage.setItem('tokenId', tokenId)
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3576204e0d02bf51&redirect_uri=${location.origin}/wx_auth&response_type=code&scope=snsapi_base&state=#wechat_redirect`
          // window.ReactRouterHistory.push('/home')
        }
      })
      .catch((err) => {})
  }
}

//设置验证码倒计时
export const setCountDownTimes = (num) => {
  return {
    type: COUNTDOWN_TIMES,
    payload: {
      smsCodeTimes: num
    }
  }
}

//验证码倒计时结束
export const smsCodeCountDownEnd = () => {
  return {
    type: SMSCODE_COUNTDOWN,
    payload: {
      smsCodeCountDownSts: false,
      smsCodeNo: '',
      smsCodeTimes: 59
    }
  }
}

//退出app
export const logoutApp = () => {
  return (dispatch, getState) => {
    localStorage.clear()
    dispatch(handleModalHide())
    let timer = setTimeout(() => {
      window.ReactRouterHistory.replace('/login')
      clearTimeout(timer)
    }, 300)
  }
}
