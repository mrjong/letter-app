import request from '@/utils/request'

export const queryBanner = () => request.post('/banner/showBanner')

export const queryMails = (params) => request.post('/content/queryContent', params)

export const writeLettersCheck = (params) => request.post('/letter/writeLettersCheck', params)

export const queryPostAddress = (params) => request.post('/user/queryUserAddress', params)
