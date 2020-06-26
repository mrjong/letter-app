import request from '@/utils/request'

export const queryBanner = () => request.post('/banner/showBanner')
