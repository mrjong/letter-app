import api from '../api'
import { handleModalHide } from './common.redux'

const initialState = {
  mailList: [],
  letterId: '',
  writeLetterContent: '',
  selectedPaper: {},
  letterPapers: [],
  receiveAddress: {}
}

//types
const MAILS_LIST = 'MAILS_LIST'
const CREATE_LETTER_ID = 'CREATE_LETTER_ID'
const SAVE_WRITELETTER_CONTENT = 'SAVE_WRITELETTER_CONTENT'
const SAVE_SELECTED_PAPER = 'SAVE_SELECTED_PAPER'
const QUERY_LETTER_PAPERS = 'QUERY_LETTER_PAPERS'
const QUERY_OUTBOX_LIST = 'QUERY_OUTBOX_LIST'
const QUERY_INBOX_LIST = 'QUERY_INBOX_LIST'
const QUERY_DRAFTBOX_LIST = 'QUERY_DRAFTBOX_LIST'
const QUERY_DYNAMIC_DETAIL = 'QUERY_DYNAMIC_DETAIL'
const UPLOAD_SHARE_IMG_SUCCESS = 'UPLOAD_SHARE_IMG_SUCCESS'
const DYNAMIC_EDIT_ID = 'DYNAMIC_EDIT_ID'
const QUERY_RECEIVE_ADDRESS = 'QUERY_RECEIVE_ADDRESS'

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
    case QUERY_OUTBOX_LIST:
      return { ...state, outboxList: action.payload.outboxList }
    case QUERY_INBOX_LIST:
      return { ...state, inboxList: action.payload.inboxList }
    case QUERY_DRAFTBOX_LIST:
      return { ...state, draftboxList: action.payload.draftboxList }
    case QUERY_DYNAMIC_DETAIL:
      return { ...state, dynamicDetail: action.payload.dynamicDetail }
    case UPLOAD_SHARE_IMG_SUCCESS:
      return { ...state, dynamicShareImg: action.payload.dynamicShareImg }
    case DYNAMIC_EDIT_ID:
      return { ...state, dynamicShareId: action.payload.dynamicShareId }
    case QUERY_RECEIVE_ADDRESS:
      return { ...state, receiveAddress: action.payload.receiveAddress }
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
export const queryPostAddress = (id, type) => {
  return async (dispatch, getState) => {
    try {
      let params
      if (type) {
        params = {
          letterId: id
        }
      } else {
        params = {
          userId: id
        }
      }
      const res = await api.queryPostAddress(params)
      const { mobileHid, penName, receiveUserAddress, receiveUserId } = res
      dispatch({
        type: QUERY_RECEIVE_ADDRESS,
        payload: {
          receiveAddress: {
            mobileHid,
            penName,
            receiveUserAddress,
            receiveUserId
          }
        }
      })
      window.ReactRouterHistory.push('/post_confirm?userType=1')
    } catch (error) {
      console.log(error)
    }
  }
}

//写信校验接口(创建写信id)
export const writeLettersCheck = (params, callback) => {
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
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//更新信件id
export const updateLetterId = (id) => {
  return {
    type: CREATE_LETTER_ID,
    payload: {
      letterId: id
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
export const letterPaperPurchase = (id, callback) => {
  return async (dispatch, getState) => {
    try {
      await api.letterPaperPurchase({
        letterPaperId: id + ''
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//信件内容提交后台保存
export const lettersSave = (callback) => {
  return async (dispatch, getState) => {
    const { writeLetterContent, letterId, selectedPaper } = getState().mail
    try {
      await api.lettersSave({
        sendContent: writeLetterContent,
        letterPaperId: selectedPaper.letterPaperId,
        letterId
      })
      dispatch(handleModalHide())
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//删除信件
export const lettersDelete = (id, callback) => {
  return async (dispatch, getState) => {
    try {
      await api.lettersDelete({
        letterId: id
      })
      dispatch(handleModalHide())
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//查询发件箱列表
export const queryOutboxList = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryOutboxList()
      dispatch({
        type: QUERY_OUTBOX_LIST,
        payload: {
          outboxList: res.letterList
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//查询收件箱列表
export const queryInboxList = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryInboxList()
      dispatch({
        type: QUERY_INBOX_LIST,
        payload: {
          inboxList: res.letterList
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//查询草稿箱列表
export const queryDraftboxList = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryDraftboxList()
      dispatch({
        type: QUERY_DRAFTBOX_LIST,
        payload: {
          draftboxList: res.letterList
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//信件寄出
export const letterSendOut = (callback) => {
  return async (dispatch, getState) => {
    try {
      await api.letterSendOut({
        letterId: getState().mail.letterId
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//查询动态详情
export const queryDynamicDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryDynamicDetail({
        contentId: id
      })
      dispatch({
        type: QUERY_DYNAMIC_DETAIL,
        payload: {
          dynamicDetail: {
            ...res.content,
            commentList: res.contentCommentList
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//评论动态
export const commentDynamic = (id, comment, callback) => {
  return async (dispatch, getState) => {
    try {
      await api.commentDynamic({
        contentId: id,
        comment
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//编辑动态校验
export const dynamicEditCheck = (callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.dynamicEditCheck()
      dispatch({
        type: DYNAMIC_EDIT_ID,
        payload: {
          dynamicShareId: res.contentId
        }
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//分享配图
export const uploadContentImg = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.uploadContentImg(params)
      dispatch({
        type: UPLOAD_SHARE_IMG_SUCCESS,
        payload: {
          dynamicShareImg: res.contentImgPath
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const clearUploadContentImg = () => {
  return {
    type: UPLOAD_SHARE_IMG_SUCCESS,
    payload: {
      dynamicShareImg: ''
    }
  }
}

//发表动态
export const publishDynamic = (params, callback) => {
  return async (dispatch, getState) => {
    try {
      await api.publishDynamic(params)
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//点赞
export const giveAgree = (id, callback) => {
  return async (dispatch, getState) => {
    try {
      await api.giveAgree({
        contentId: id
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}

//阅读信件明细
export const readLetter = (id, callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.readLetter({
        letterId: id
      })
      window.ReactRouterHistory.push({
        pathname: '/preview',
        state: {
          content: res.content,
          letterPaperUrlPath: res.letterPaperUrlPath
        }
      })
      // callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}
