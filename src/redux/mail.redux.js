import api from '../api'

const initialState = {
  bannerList: [],
  mails: []
}

//types
const BANNER = 'BANNER'
const MAILS_LIST = 'MAILS_LIST'

//reducers
export const mail = (state = initialState, action) => {
  switch (action.type) {
    case BANNER:
      return { ...state, bannerList: action.payload.bannerList }
    case MAILS_LIST:
      return { ...state, mails: action.payload.mails }
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

export const queryMails = (pageIndex, callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryMails({
        page: pageIndex + ''
      })
      const { contentList = [] } = res
      dispatch({
        type: MAILS_LIST,
        payload: {
          mails: contentList
        }
      })
      callback()
    } catch (error) {
      console.log(error)
    }
  }
}
