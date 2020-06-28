import request from '@/utils/request'

export const uploadImg = (params) => request.post('/user/uploadHeadImg', params)

export const queryAreaList = (params) => request.post('/area/queryAreaList', params)

export const userRegister = (params) => request.post('/user/userRegister', params)

export const userRecommend = () => request.post('/user/userRecommend')

export const unreadPrompt = (params) => request.post('/letter/unreadPrompt', params)

export const followUser = (params) => request.post('/fans/followUser', params)

export const fansUserList = (params) => request.post('/fans/fansUserList', params)

export const cancelFollowUser = (params) => request.post('/fans/cancelFollowUser', params)

export const queryUserInfo = (params) => request.post('/user/userDetail', params)

