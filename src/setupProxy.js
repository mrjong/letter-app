const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://xinyouge.email', //配置你要请求的服务器地址
      changeOrigin: true
    })
  )
}
