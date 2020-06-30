import api from '../api'
import { handleModalHide } from './common.redux'

const initialState = {
  bannerList: [],
  mails: [],
  letterId: '',
  mailContent: '',
  paperId: ''
}

//types
const BANNER = 'BANNER'
const MAILS_LIST = 'MAILS_LIST'
const CREATE_LETTER_ID = 'CREATE_LETTER_ID'
const SAVE_MAIL_CONTENT = 'SAVE_MAIL_CONTENT'
const SAVE_PAPER_ID = 'SAVE_PAPER_ID'

//reducers
export const mail = (state = initialState, action) => {
  switch (action.type) {
    case BANNER:
      return { ...state, bannerList: action.payload.bannerList }
    case MAILS_LIST:
      return { ...state, mails: action.payload.mails }
    case CREATE_LETTER_ID:
      return { ...state, letterId: action.payload.letterId }
    case SAVE_MAIL_CONTENT:
      return { ...state, mailContent: action.payload.mailContent }
    case SAVE_PAPER_ID:
      return { ...state, paperId: action.payload.paperId }
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
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//查询收信地址
export const queryPostAddress = (pageIndex) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryPostAddress()
      const { contentList = [] } = res
      // dispatch({
      //   type: MAILS_LIST,
      //   payload: {
      //     mails: contentList
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}

//写信校验接口
export const writeLettersCheck = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.writeLettersCheck(params)
      const { letterId = '' } = res
      dispatch({
        type: CREATE_LETTER_ID,
        payload: {
          letterId
        }
      })
      window.ReactRouterHistory.push('/write_letter')
    } catch (error) {
      console.log(error)
    }
  }
}

export const saveMailContent = (content) => {
  return {
    type: SAVE_MAIL_CONTENT,
    payload: {
      mailContent: content
    }
  }
}

export const savePaperId = (id) => {
  return {
    type: SAVE_PAPER_ID,
    payload: {
      paperId: id
    }
  }
}

//信件内容保存
export const lettersSave = () => {
  return async (dispatch, getState) => {
    const { mailContent, letterId, paperId } = getState().mail
    try {
      await api.lettersSave({
        sendContent: mailContent,
        letterPaperId: paperId,
        letterId
      })
      dispatch(handleModalHide())
      window.ReactRouterHistory.push('/home')
    } catch (error) {
      console.log(error)
    }
  }
}

//删除信件
export const lettersDelete = () => {
  return async (dispatch, getState) => {
    const { letterId } = getState().mail
    try {
      await api.lettersDelete({
        letterId
      })
      dispatch(handleModalHide())
      window.ReactRouterHistory.push('/home')
    } catch (error) {
      console.log(error)
    }
  }
}
