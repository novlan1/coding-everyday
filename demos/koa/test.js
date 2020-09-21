const MiniKoa = require('./mock-application')
const app = new MiniKoa()

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

app.use(async (ctx, next) => {
  ctx.body = '(fn1) '
  await next()
  ctx.body += '(end fn1) '
})
app.use(async (ctx, next) => {
  ctx.body += '(fn2) '
  await delay()
  await next()
  ctx.body += '(end fn2) '
})

app.use(async (ctx, next) => {
  ctx.body += '(fn3) '
})

app.listen(3000, () => {
  console.log('server running on port 3000')
})

// 浏览器输出：(fn1) (fn2) (fn3) (end fn2) (end fn1) 

// 参考资料：Koa2框架原理及实现(https://www.jianshu.com/p/f095263dcd12)