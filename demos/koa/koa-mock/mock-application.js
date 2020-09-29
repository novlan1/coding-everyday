const http = require('http')

let request = {
  get url() {
    return this.req.url
  }
}

let response = {
  get body() {
    return this._body
  },
  set body(val) {
    this._body = val
  }
}

let context = {
  get url() {
    return this.request.url
  },
  get body() {
    return this.response.body
  },
  set body(val) {
    this.response.body = val
  }
}

class Application {
  constructor() {
    this.context = context
    this.request = request
    this.response = response
    this.middleware = []
  }
  use(callback) {
    // 创建一个 middleware 数组，通过 push 传入多个 callback
    // 然后通过 compose 控制整个 middleware 执行的顺序
    // 每个 callback 回调函数给两个参数 第一个是 context 第二个是 next
    this.middleware.push(callback)
    // this.callback = callback
  }

  // 直接把 compose 移植过来
  compose(middleware) {
    // 每个中间件需要一个 context
    return function (context) {
      return dispatch(0)

      function dispatch(i) {
        let fn = middleware[i]
        if (!fn) {
          return Promise.resolve()
        }
        // 中间件第一个参数是一个 context，第二个参数是 next()
        return Promise.resolve(fn(context, function next() {
          return dispatch(i + 1)
        }))
      }
    }
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      let ctx = this.createCtx(req, res)
      // await this.callback(ctx)
      // 这里不能直接执行 callback 而是先获取经过 compose 处理后的中间件集合
      const fn = this.compose(this.middleware)
      await fn(ctx)
      ctx.res.end(ctx.body)
    })
    server.listen(...args)
  }
  
  createCtx(req, res) {
    let ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }
}

module.exports = Application