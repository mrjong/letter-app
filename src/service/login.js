import request from '@/utils/request'

export const querySmsCode = (params) => request.post('/sms/code/send', params)

export const login = (params) => request.post('/sms/code/check', params)
