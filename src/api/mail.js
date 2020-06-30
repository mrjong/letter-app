import request from '@/utils/request'

export const queryMailList = (params) => request.post('/content/queryContent', params)

export const writeLettersCheck = (params) => request.post('/letter/writeLettersCheck', params)

export const queryPostAddress = (params) => request.post('/user/queryUserAddress', params)

export const lettersSave = (params) => request.post('/letter/lettersSave', params)

export const lettersDelete = (params) => request.post('/letter/lettersDelete', params)

export const queryLetterPapers = () => request.post('/user/paper/queryUserLetterPaper')

export const letterPaperPurchase = (params) => request.post('/user/paper/letterPaperPurchase', params)
