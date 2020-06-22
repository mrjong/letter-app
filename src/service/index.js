import http from './axios'

export const login = (params) => {
  return http
    .post('/login', {
      username: '123',
      password: 123
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
