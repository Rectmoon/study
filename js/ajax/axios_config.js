import axios from 'axios'
const CancelToken = axios.CancelToken

export default {
  // 请求地址
  url: '/user',
  // 请求类型
  method: 'get',
  // 请根路径
  baseURL: 'http://www.abc.com/api',
  // 请求前的数据处理
  transformRequest: [function(data) {}],
  // 请求后的数据处理
  transformResponse: [function(data) {}],
  // 自定义的请求头
  headers: {
    'x-Requested-With': 'XMLHttpRequest'
  },
  // URL查询对象
  params: { uin: '1426890675' },
  // 查询对象序列化函数
  paramsSerializer: function(params) {},
  // request body
  data: { key: 'aa' },
  // 超时设置s
  timeout: 1000,
  // 跨域是否带Token
  withCredentials: false,
  // 自定义请求处理
  adapter: function(resolve, reject, config) {},
  // 身份验证信息
  auth: { uname: '', pwd: '12' },
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json',
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // 下传和下载进度回调
  onUploadProgress: function(progressEvent) {
    Math.round(
      (progressEvent.loaded * 100) /
        progressEvent.total
    )
  },
  onDownloadProgress: function(progressEvent) {},

  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: function(status) {
    return status >= 200 && status < 300
  },
  // 用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({
    keepAlive: true
  }),
  // 用于设置跨域请求代理
  proxy: {
    host: '127.0.0.1',
    port: 8080,
    auth: {
      username: 'ying',
      password: '7726'
    }
  },
  // 用于取消请求
  cancelToken: new CancelToken(function(
    cancel
  ) {})
}
