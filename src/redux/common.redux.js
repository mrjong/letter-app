import api from '../api'
const initialState = {
  modalShow: false,
  modalType: '',
  bannerList: []
}

//types
const MODAL_SHOW = 'MODAL_SHOW'
const MODAL_HIDE = 'MODAL_HIDE'
const BANNER = 'BANNER'

//reducers
export const common = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, modalShow: action.payload.modalShow, modalType: action.payload.modalType }
    case MODAL_HIDE:
      return { ...state, modalShow: action.payload.modalShow }
    case BANNER:
      return { ...state, bannerList: action.payload.bannerList }
    default:
      return state
  }
}

//actions
//处理全局弹窗显示/隐藏
export const handleModalShow = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: MODAL_SHOW,
      payload: {
        modalShow: true,
        modalType: params.type
      }
    })
  }
}

export const handleModalHide = (params) => {
  return {
    type: MODAL_HIDE,
    payload: {
      modalShow: false
    }
  }
}

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
