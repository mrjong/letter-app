import request from '@/utils/request'

export const queryBanner = () => request.post('/banner/showBanner')

export const queryMails = (params) => request.post('/content/queryContent', params)
