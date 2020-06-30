import api from '../api'

const initialState = {
  avatar: '',
  gender: '',
  nickname: '',
  provinces: [],
  citys: [],
  provName: '',
  selectedArea: [],
  userRecommends: [],
  unreadTip: false,
  userInfo: {}
}

//types
const UPLOADIMG_SUCCESS = 'UPLOADIMG_SUCCESS'
const QUERY_PROVINCELIST = 'QUERY_PROVINCELIST'
const QUERY_CITYLIST = 'QUERY_CITYLIST'
const SELECT_CITY = 'SELECT_CITY'
const USER_RECOMMEND = 'USER_RECOMMEND'
const UNREAD_TIP = 'UNREAD_TIP'
const USER_INFO = 'USER_INFO'
const QUERY_FRIENDS = 'QUERY_FRIENDS'

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
    case UNREAD_TIP:
      return { ...state, unreadTip: action.payload.unreadTip }
    case USER_INFO:
      return { ...state, userInfo: action.payload.userInfo }
    case QUERY_FRIENDS:
      return { ...state, friends: action.payload.friends }
    default:
      return state
  }
}

//actions
//上传头像
export const uploadAvatar = (params) => {
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
export const initQueryAreaList = (params) => {
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
export const queryCityList = (params) => {
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
export const selectCity = (params) => {
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
export const userRegister = ({ nickname, gender }) => {
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
        window.ReactRouterHistory.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//查询用户信息
export const queryUserInfo = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryUserInfo()
      dispatch({
        type: USER_INFO,
        payload: {
          userInfo: res
        }
      })
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
      const { flag } = res
      dispatch({
        type: UNREAD_TIP,
        payload: {
          unreadTip: flag
        }
      })
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

//查询好友列表
export const queryFriends = (pageIndex, callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.queryFriends({
        page: pageIndex + ''
      })
      dispatch({
        type: QUERY_FRIENDS,
        payload: {
          friends: res.userList
        }
      })
      callback && callback()
    } catch (error) {
      console.log(error)
    }
  }
}
