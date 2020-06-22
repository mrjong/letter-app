import axios from 'axios'
const env = process.env.NODE_ENV

const host = {
  development: '',
  production: ''
}

const instance = axios.create({
  baseURL: host[env],
  withCredentials: env !== 'local',
  timeout: 8000
})

instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response) {
      // console.dir(error,999)
      switch (error.response.status) {
        case 401:
        case 403:
        case 404:
          break
        default:
      }
      return Promise.reject(error.response)
    } else {
      //超时timeout
    }
  }
)

export default instance
