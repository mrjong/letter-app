import request from '@/utils/request'

export const userRecommend = () => request.post('/user/userRecommend')

export const followUser = (params) => request.post('/fans/followUser', params)

export const fansUserList = (params) => request.post('/fans/fansUserList', params)

export const cancelFollowUser = (params) => request.post('/fans/cancelFollowUser', params)

export const queryUserInfo = (params) => request.post('/user/userDetail', params)

export const queryFriends = (params) => request.post('/user/userFriend', params)

export const queryFriendDetail = (params) => request.post('/user/userDetailContent', params)

export const commentDynamic = (params) => request.post('/content/contentComment', params)

export const modifyUserInfo = (params) => request.post('/user/modifyUserInfo', params)

export const modifyAvatar = (params) => request.post('/user/modifyHeadImg', params)
