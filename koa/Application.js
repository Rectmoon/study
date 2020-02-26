const EventEmitter = require('events')
const http = require('http')
const Stream = require('stream')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter {
  constructor() {
    super()
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }

  use(fn) {
    this.middlewares.push(fn)
  }

  createContext(req, res) {
    const ctx = this.context
    // 请求
    ctx.request = this.request
    ctx.req = ctx.request.req = req
    // 响应
    ctx.response = this.response
    ctx.res = ctx.response.res = res
    return ctx
  }

  compose(middlewares, ctx) {
    let flag = -1
    function dispatch(index) {
      // 3）flag记录已经运行的中间件下标
      // 3.1）若一个中间件调用两次next那么index会小于flag
      if (index <= flag) return Promise.reject(new Error('next() called multiple times'))
      flag = index
      // 2）迭代终止条件：取完中间件
      // 2.1）然后返回成功的promise
      if (index === middlewares.length) return Promise.resolve()
      // 1）让第一个函数执行完，如果有异步的话，需要看看有没有await
      // 1.1）必须返回一个promise
      const middleware = middlewares[index]
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
    }

    return dispatch(0)
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res)
    res.statusCode = 404
    const result = this.compose(this.middlewares, ctx)
    result
      .then(() => {
        if (!ctx.body) {
          // 没设置body
          res.end(`Not Found`)
        } else if (ctx.body instanceof Stream) {
          // 流
          res.setHeader('Content-Type', 'text/html;charset=utf-8')
          ctx.body.pipe(res)
        } else if (typeof ctx.body === 'object') {
          // 对象
          res.setHeader('Content-Type', 'text/josn;charset=utf-8')
          res.end(JSON.stringify(ctx.body))
        } else {
          // 字符串
          res.setHeader('Content-Type', 'text/html;charset=utf-8')
          res.end(ctx.body)
        }
      })
      .catch(err => {
        this.emit('error', err)
      })
    return ctx
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

module.exports = Application
