import axios from 'axios'
import { Toast } from 'antd-mobile'
const env = process.env.NODE_ENV

// const host = {
//   development: '/api',
//   production: 'http://xinyouge.email/api'
// }
const instance = axios.create({
  baseURL: '/api',
  withCredentials: env !== 'local',
  timeout: 8000
})

// 设置请求默认属性
// instance.defaults.timeout = 20000;
// instance.defaults.headers['Access-Control-Allow-Origin'] = '*';
// instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// instance.defaults.responseType = 'json';

// 数据序列化
// instance.defaults.transformRequest = [
//   (data, header) => {
//     if (header['Content-Type'] && header['Content-Type'].indexOf('json') > -1) {
//       return JSON.stringify(data);
//     }
//     return qs.stringify(data, { arrayFormat: 'repeat' });
//   },
// ];

const { CancelToken } = axios
let pending = []

const ignoreUrlList = ['/api/label/is-unique/label-code/']

let cancelPending = (config) => {
  // 过滤某些需要同时发多次的请求
  const isIgnoreUrl = ignoreUrlList.filter((item) => config.url.indexOf(item) > -1).length > 0
  pending.forEach((item, index) => {
    if (!isIgnoreUrl) {
      if (config) {
        if (item.UrlPath === config.url) {
          item.Cancel() // 取消请求
          pending.splice(index, 1) // 移除当前请求记录
        }
      } else {
        item.Cancel() // 取消请求
        pending.splice(index, 1) // 移除当前请求记录
      }
    }
  })
}

//校验后台状态code
function checkBackendCode(response) {
  if (response && (response.status === 200 || response.status === 304) && response.data) {
    switch (response.data.code) {
      case '0':
        return response.data.data
      case '0003':
        localStorage.clear()
        Toast.info('登录超时，请重新登录')
        let timer = setTimeout(() => {
          window.ReactRouterHistory.replace('/login')
          clearTimeout(timer)
        }, 2000)
        break
      default:
        return Promise.reject({
          ...response.data,
          hideError: true
        })
    }
  }
}

instance.interceptors.request.use(
  (config) => {
    // Toast.loading('加载中...', 1)
    // 发起请求时，取消掉当前正在进行的相同请求
    cancelPending(config)

    config.cancelToken = new CancelToken((res) => {
      pending.push({ UrlPath: config.url, Cancel: res })
    })

    config.headers['tokenId'] = localStorage.getItem('tokenId') || ''

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    cancelPending(response.config)
    return response
  },
  (error) => {
    if (error.response) {
      return Promise.reject({
        code: 'fail',
        msg: '系统开小差了'
      })
    } else {
      //超时timeout
      if (error && error.message && error.message.includes('timeout')) {
        return Promise.reject({
          code: 'timeout',
          msg: '请求超时，请稍后重试！'
        })
      }
      return Promise.reject({
        code: 'cancel',
        msg: '可能重复请求，取消上次请求'
      })
    }
  }
)

export default {
  get(url, params, options) {
    return instance({
      method: 'get',
      url,
      params // get 请求时带的参数 叫 'params'
      // customHeaders: { ...options }
    })
      .then((response) => checkBackendCode(response))
      .catch((err) => {
        if (err.hideError) {
          Toast.hide()
          Toast.info(err.msg)
        } else {
          Toast.hide()
          Toast.fail(err.msg)
        }
        return Promise.reject(err)
      })
  },
  post(url, data, options) {
    return instance({
      method: 'post',
      url,
      data // post 请求时带的参数 叫 'data'
      // customHeaders: { ...options }
    })
      .then((response) => checkBackendCode(response))
      .catch((err) => {
        if (err.hideError) {
          Toast.hide()
          Toast.info(err.msg)
        } else {
          Toast.hide()
          Toast.fail(err.msg)
        }
        return Promise.reject(err)
      })
  }
}
