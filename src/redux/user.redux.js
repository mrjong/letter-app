import api from '../service'

const initialState = {
  avatar: '',
  gender: '',
  nickname: '',
  provinces: [],
  citys: [],
  provName: '',
  selectedArea: [],
  userRecommends: []
}

//types
const UPLOADIMG_SUCCESS = 'UPLOADIMG_SUCCESS'
const QUERY_PROVINCELIST = 'QUERY_PROVINCELIST'
const QUERY_CITYLIST = 'QUERY_CITYLIST'
const SELECT_CITY = 'SELECT_CITY'
const USER_RECOMMEND = 'USER_RECOMMEND'

//reducers
export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPLOADIMG_SUCCESS:
      return { ...state, avatar: action.payload.avatar, headImg: action.payload.headImg }
    case QUERY_PROVINCELIST:
      return { ...state, provinces: action.payload.provinces }
    case QUERY_CITYLIST:
      return { ...state, ...action.payload }
    case SELECT_CITY:
      return { ...state, selectedArea: action.payload.selectedArea }
    case USER_RECOMMEND:
      return { ...state, userRecommends: action.payload.userRecommends }
    default:
      return state
  }
}

//actions
//上传头像
export const handleUploadAvatar = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.uploadImg(params)
      const { headImg = '', headPath = '' } = res
      dispatch({
        type: UPLOADIMG_SUCCESS,
        payload: {
          avatar: headPath + headImg,
          headImg
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//初始化查询地区信息
export const handleInitQueryAreaList = (params) => {
  return async (dispatch, getState) => {
    try {
      const provRes = await api.queryAreaList(params)
      const { areaList: provinces } = provRes
      dispatch({
        type: QUERY_PROVINCELIST,
        payload: {
          provinces
        }
      })
      const cityRes = await api.queryAreaList({ parentId: provinces[0].areaId })
      const { areaList: citys = [] } = cityRes
      dispatch({
        type: QUERY_CITYLIST,
        payload: {
          citys,
          provName: provinces[0].areaName
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//查询城市列表
export const handleQueryCityList = (params) => {
  return async (dispatch, getState) => {
    try {
      const cityRes = await api.queryAreaList({
        parentId: params.areaId
      })
      const { areaList: citys = [] } = cityRes
      dispatch({
        type: QUERY_CITYLIST,
        payload: {
          citys,
          provName: params.areaName
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//选择城市
export const handleSelectCity = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SELECT_CITY,
      payload: {
        selectedArea: [getState().user.provName, params.areaName]
      }
    })
  }
}

//用户注册
export const handleUserRegister = ({ nickname, gender, history }) => {
  return async (dispatch, getState) => {
    const { selectedArea, headImg } = getState().user
    const mobileNo = localStorage.getItem('mobileNo')
    try {
      const res = await api.userRegister({
        penName: nickname,
        sex: gender,
        addressProvince: selectedArea[0],
        addressCity: selectedArea[1],
        headImg,
        mobileNo
      })
      const { businessCode = '', tokenId = '' } = res
      if (businessCode === '0002') {
        localStorage.setItem('tokenId', tokenId)
        history.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//查询信友推荐
export const queryUserRecommend = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.userRecommend()
      const { userRecommendList = [] } = res
      dispatch({
        type: USER_RECOMMEND,
        payload: {
          userRecommends: userRecommendList
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//未读提示
export const queryUnreadPrompt = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.unreadPrompt()
      // const { areaList: citys = [] } = cityRes
      // dispatch({
      //   type: USER_RECOMMEND,
      //   payload: {
      //     userRecommends
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}

//关注用户
export const followUser = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.followUser()
      // const { areaList: citys = [] } = cityRes
      // dispatch({
      //   type: USER_RECOMMEND,
      //   payload: {
      //     userRecommends
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}

//关注列表查询
export const fansUserList = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.fansUserList()
      // const { areaList: citys = [] } = cityRes
      // dispatch({
      //   type: USER_RECOMMEND,
      //   payload: {
      //     userRecommends
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}

//取消关注
export const cancelFollowUser = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.cancelFollowUser()
      // const { areaList: citys = [] } = cityRes
      // dispatch({
      //   type: USER_RECOMMEND,
      //   payload: {
      //     userRecommends
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
}
