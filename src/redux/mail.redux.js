import api from '../service'

const initialState = {
  bannerList: []
}

//types
const BANNER = 'BANNER'
const SMSCODE_COUNTDOWN = 'SMSCODE_COUNTDOWN'
const COUNTDOWN_TIMES = 'COUNTDOWN_TIMES'

//reducers
export const mail = (state = initialState, action) => {
  switch (action.type) {
    case BANNER:
      return { ...state, bannerList: action.payload.bannerList }
    case SMSCODE_COUNTDOWN:
      return { ...state, bannerList: action.payload.bannerList }
    case COUNTDOWN_TIMES:
      return { ...state, smsCodeTimes: action.payload.smsCodeTimes }
    default:
      return state
  }
}

//actions
export const queryBanner = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryBanner()
      const { bannerList = [] } = res
      dispatch({
        type: BANNER,
        payload: {
          bannerList
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
