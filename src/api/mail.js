import request from '@/utils/request'

export const queryMailList = (params) => request.post('/content/queryContent', params)

export const writeLettersCheck = (params) => request.post('/letter/writeLettersCheck', params)

export const queryPostAddress = (params) => request.post('/user/queryUserAddress', params)

export const lettersSave = (params) => request.post('/letter/lettersSave', params)

export const lettersDelete = (params) => request.post('/letter/lettersDelete', params)

export const queryLetterPapers = () => request.post('/user/paper/queryUserLetterPaper')

export const letterPaperPurchase = (params) => request.post('/user/paper/letterPaperPurchase', params)

export const queryOutboxList = (params) => request.post('/letter/outBox', params)

export const queryInboxList = (params) => request.post('/letter/inbox', params)

export const queryDraftboxList = (params) => request.post('/letter/drafts', params)

export const letterSendOut = (params) => request.post('/letter/sendOut', params)

export const wxPay = (params) => request.post('/wxpay/toPay', params)

export const queryDynamicDetail = (params) => request.post('/content/contentDetail', params)

export const dynamicEditCheck = (params) => request.post('/content/writeContent', params)

export const publishDynamic = (params) => request.post('/content/saveContent', params)

export const giveAgree = (params) => request.post('content/contentAgree', params)

export const readLetter = (params) => request.post('/letter/readLetter', params)
