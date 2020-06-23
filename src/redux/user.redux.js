import { login, getSmsCode } from '../service'

const initialState = {
  mobileNo: '',
  smsCode: ''
}

const LOGIN = 'LOGIN'

export const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isFetching: true }
    default:
      return state
  }
}

export const handleGetSmsCode = (params) => {
  return (dispatch, getState) => {
    getSmsCode(params)
      .then((res) => {
        // const userid = getState().user._id
        if (res.status === 200 && res.data && res.data.code === 0) {
          dispatch({
            type: LOGIN,
            payload: '123'
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN,
          payload: '123'
        })
      })
  }
}
