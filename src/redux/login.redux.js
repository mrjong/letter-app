import api from '../service'

const initialState = {
  mobileNo: '',
  smsCode: '',
  smsCodeTimes: 59,
  smsCodeCountDownSts: false
}

//types
const LOGIN = 'LOGIN'
const SMSCODE_COUNTDOWN = 'SMSCODE_COUNTDOWN'
const COUNTDOWN_TIMES = 'COUNTDOWN_TIMES'

//reducers
export const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
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
    // dispatch({
    //   type: SMSCODE_COUNTDOWN,
    //   payload: {
    //     smsCodeCountDownSts: true,
    //     smsCodeNo: '123'
    //   }
    // })
    try {
      const res = await api.getSmsCode(params)
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

export const handleGetLogin = (smsCode) => {
  return (dispatch, getState) => {
    const smsCodeNo = getState().login.smsCodeNo
    api
      .login({
        id: '54',
        code: '4762'
      })
      .then((res) => {
        const { sendNo = '' } = res
        console.log(res)
        // dispatch({
        //   type: LOGIN,
        //   payload: {
        //     smsCodeCountDownSts: true,
        //     smsCodeNo: sendNo
        //   }
        // })
      })
      .catch((err) => {})
  }
}

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
