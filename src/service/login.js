import request from '@/utils/request'

export const getSmsCode = (params) => request.post('/sms/code/send', params)

export const getLogin = (params) => request.post('/sms/code/check', params)
