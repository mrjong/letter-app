const initialState = {
  modalShow: false,
  modalType: ''
}

//types
const MODAL_SHOW = 'MODAL_SHOW'
const MODAL_HIDE = 'MODAL_HIDE'
const COUNTDOWN_TIMES = 'COUNTDOWN_TIMES'

//reducers
export const common = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, ...action.payload }
    case MODAL_HIDE:
      return { ...state, ...action.payload }
    case COUNTDOWN_TIMES:
      return { ...state, smsCodeTimes: action.payload.smsCodeTimes }
    default:
      return state
  }
}

//actions
//处理全局弹窗显示/隐藏
export const handleModalShow = (params) => {
  console.log(params,'action')
  return {
    type: MODAL_SHOW,
    payload: {
      modalShow: true,
      modalType: params.type
    }
  }
}

export const handleModalHide = (params) => {
  return {
    type: MODAL_HIDE,
    payload: {
      modalShow: false,
    }
  }
}
