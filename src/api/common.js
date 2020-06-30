import request from '@/utils/request'

export const querySmsCode = (params) => request.post('/sms/code/send', params)

export const login = (params) => request.post('/sms/code/check', params)

export const userRegister = (params) => request.post('/user/userRegister', params)

export const queryBanner = () => request.post('/banner/showBanner')

export const queryAreaList = (params) => request.post('/area/queryAreaList', params)

export const uploadImg = (params) => request.post('/user/uploadHeadImg', params)

export const unreadPrompt = (params) => request.post('/letter/unreadPrompt', params)
