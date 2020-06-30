import api from '../api'
import { handleModalHide } from './common.redux'

const initialState = {
  mailList: [],
  letterId: '',
  writeLetterContent: '',
  selectedPaper: {},
  letterPapers: []
}

//types
const MAILS_LIST = 'MAILS_LIST'
const CREATE_LETTER_ID = 'CREATE_LETTER_ID'
const SAVE_WRITELETTER_CONTENT = 'SAVE_WRITELETTER_CONTENT'
const SAVE_SELECTED_PAPER = 'SAVE_SELECTED_PAPER'
const QUERY_LETTER_PAPERS = 'QUERY_LETTER_PAPERS'

//reducers
export const mail = (state = initialState, action) => {
  switch (action.type) {
    case MAILS_LIST:
      return { ...state, mailList: action.payload.mailList }
    case CREATE_LETTER_ID:
      return { ...state, letterId: action.payload.letterId }
    case SAVE_WRITELETTER_CONTENT:
      return { ...state, writeLetterContent: action.payload.writeLetterContent }
    case SAVE_SELECTED_PAPER:
      return { ...state, selectedPaper: action.payload.selectedPaper }
    case QUERY_LETTER_PAPERS:
      return { ...state, letterPapers: action.payload.letterPapers }
    default:
      return state
  }
}

//actions
export const queryMailList = (pageIndex, callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryMailList({
        page: pageIndex + ''
      })
      const { contentList = [] } = res
      dispatch({
        type: MAILS_LIST,
        payload: {
          mailList: contentList
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
      //     mailList: contentList
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}

//写信校验接口(创建写信id)
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

//保存写信内容
export const saveWriteLetterContent = (content) => {
  return {
    type: SAVE_WRITELETTER_CONTENT,
    payload: {
      writeLetterContent: content
    }
  }
}

//设置选中的信纸(包含首次默认的)
export const saveSelectedPaper = (item) => {
  return {
    type: SAVE_SELECTED_PAPER,
    payload: {
      selectedPaper: item
    }
  }
}

//查询用户拥有的信纸
export const queryLetterPapers = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryLetterPapers()
      dispatch({
        type: QUERY_LETTER_PAPERS,
        payload: {
          letterPapers: res.letterPaperList
        }
      })
      dispatch(saveSelectedPaper(res.letterPaperList[0]))
    } catch (error) {
      console.log(error)
    }
  }
}

//信纸购买
export const letterPaperPurchase = (id) => {
  return async (dispatch, getState) => {
    try {
      await api.letterPaperPurchase({
        letterPaperId: id + ''
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//信件内容提交后台保存
export const lettersSave = () => {
  return async (dispatch, getState) => {
    const { writeLetterContent, letterId, selectedPaper } = getState().mail
    try {
      await api.lettersSave({
        sendContent: writeLetterContent,
        letterPaperId: selectedPaper.letterPaperId,
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
