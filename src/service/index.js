import http from './axios'

export const getSmsCode = (params) => {
  return http
    .post('/sms/code/send', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

// export const login = (params) => {
//   return http
//     .post('/login', {
//       username: '123',
//       password: 123,
//       data:params
//     })
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
