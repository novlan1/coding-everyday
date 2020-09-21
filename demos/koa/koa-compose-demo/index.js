const middleware = function (ctx, next) {
  console.log(1)
  next().then(() => {
    console.log(6)
    console.log('return:', res)
  })
  return 1
}

const middleware2 = function (ctx, next) {
  console.log(2)
  next().then((res) => {
    console.log(5)
    console.log('return:', res)
  })
  return 2
}

const middleware3 = function (ctx, next) {
  console.log(3)
  next().then((res) => {
    console.log(4)
  })
  return 3
}

const middlewares = [middleware, middleware2, middleware3]

function compose(middleware) {
  return function (context, next) {
    return dispatch(0)

    function dispatch(i) {
      let fn = middleware[i]
      if (i === middleware.length) fn = next // 拿掉这句，似乎并没有什么影响
      // console.log(i, next)
      if (!fn) return Promise.resolve()  // 所有中间件的 next 前的逻辑都执行完了，这时候最后一个中间件可以调用.then方法了
      // console.log('--')
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

function compose2(middleware) {
  return function (context, next) {
    return middleware.reduce((a, b) => args => b(a(args)), () =>{})
  }
}
const res = compose(middlewares)()
// console.log(res)