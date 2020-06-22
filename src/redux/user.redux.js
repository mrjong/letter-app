import { login } from '../service'

const initialState = {
  username: '123',
  password: 123
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

export const setUserInfo = () => {
  return (dispatch, getState) => {
    login()
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
