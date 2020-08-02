## KOA

浏览器发送请求才会触发中间件函数

koa只会帮你自动执行第一个中间件，剩下的都要由开发者自己来调用
```js
const koa = require('koa')
const app = new Koa()

function test() {
  console.log('__')
}

app.use(test) // 浏览器发送请求才会触发test函数
app.use(() => {
  console.log('haha')
  // koa只会帮你自动执行第一个中间件，剩下的都要由开发者自己来调用
})

app.listen(3000)
```
想要调用下一个中间件函数，在前一个中间件函数中调用`next()`（中间函数有两个参数`ctx`和`next`，其中`ctx`就是上下文，`next`就是下一个中间件函数）
```js
app.use((ctx, next) => {
  // ctx：上下文，next：下一个中间件函数
  console.log('haha')
  next() // 在第一个中间件函数中调用下一个中间件函数
})
```

### 洋葱模型

中间件打印顺序：1 3 4 2
```js
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})

app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})
```
![洋葱模型](../../imgs/koa_onion_model.png)
中间件只在应用程序启动时初始化一次，`validator`不容易做出中间件

### async 和 await

中间件要加上 `async`和`await`，异步模型，如果不加上`async`和`await`很难保证所有的中间件函数都按照洋葱模型来执行（万无一失）。
```js
app.use(async (ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})
```
`next()`方法返回的是 `Promise`
```js
app.use((ctx, next) => {
  const a = next()
  console.log(a)  // Promise { 'abc' }
})

app.use((ctx, next) => {
  next()
  return 'abc'
})
```

想要获取具体的值，而不是Promise，可以用`then`方法
```js
app.use((ctx, next) => {
  const a = next()
  console.log(a)      // Promise { 'abc' }
  a.then(res => {
    console.log(res)  // 'abc'
  })
})

app.use((ctx, next) => {
  next()
  return 'abc'
})
```
也可以用`async`和`await`，`await`对返回的`Promise`进行**求值**
```js
app.use(async (ctx, next) => {
  const a = await next()
  console.log(a)      // 'abc'
})

app.use((ctx, next) => {
  next()
  return 'abc'
})
```


`await`不仅仅可以求`Promise`的值，也可以拿到表达式的值
```js
app.use(async (ctx, next) => {
  const a = await 100 * 100
  console.log(a)      // 10000
})
```


资源的操作都是异步的（包括读取文件），以及发送 http 请求、操作数据库

`await`会**阻塞线程，等待异步结果的返回**，把异步代码变成同步的，因为当前代码被阻塞住了，必须等待结果返回后才能继续
```js
app.use(async (ctx, next) => {
  const start = Date.now()
  await axios.get('http://www.baidu.com')
  const end = Date.now()
  console.log(end - start) // 不加 async 和 await 时接近于0，说明没有阻塞
})
```
### `await`的两个作用：

1. 表达式或`Proimse`求值

2. 阻塞线程，等待异步结果返回（切换线程，去做异步任务）


### `async`意义：函数返回值都是`Promise`（返回值包装为`Promise`）
```js
async function fn() {
  return 'abc'
}
console.log(fn()) // Promise { 'abc' }
```
Koa内部处理了，中间件不加`async`依然会返回`Promise`，这里加上`async`主要是因为里面使用了`await`，不加`async`的话会报错。（面试）


加上`async`和`await`是为了保证洋葱模型，比如下面第一个中间件没加`async`和`await`，打印顺序为`1324`
```js
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await axios.get('http://www.baidu.com')
  next()
  console.log(4)
})
```

### 为什么一定要保证洋葱模型？

有些功能需要让下面的中间件执行完才能进行，比如计时功能，写在`next()`后面，当`next`执行完，说明下面的代码都执行完了。


### 为什么要调用`await next()`？

原因是koa把很多`async`函数组成一个处理链，每个`async`函数都可以做一些自己的事情，然后用`await next()`来调用下一个async函数。我们把每个`async`函数称为`middleware`，这些`middleware`可以组合起来，完成很多有用的功能。


### 中间件传递参数
中间件传递参数可以利用`ctx`, 挂载在`ctx`上面，一定要加上`async`和`await`，以及写在`next()`后面保证后面代码执行完。
```js
app.use(async (ctx, next) => {
  await next()
  const res = ctx.res // 传递来的参数
  console.log(res)
})

app.use(async (ctx, next) => {
  const res = await axios.get('http://www.baidu.com')
  ctx.res = res
  await next()
})
```

### 路由

`ctx.path`和`request.path`等效，以及`ctx.method`
```js
app.use(async (ctx, next) => {
  if (ctx.path === '/1234' && ctx.method === 'GET') { // 不能是小写的 get
    return 'ccc' // 直接返回不行
    ctx.body = { key: 'ccc' }  // 需要写在 ctx.body 上
  }
})
```
- 不能是小写的`get`
- 不能直接`return`返回，需写在`ctx.body`上
- Koa自动将对象形式转为JSON返回


### 使用`koa-router`
```js
const Router = require('koa-router')
const router = new Router()

router.get('/home', (ctx, next) => {
  ctx.body = { cc: 'happy' } 
})
router.post('/home', (ctx, next) => {
  // ...
})
app.use(router.routes())
app.listen(3000)
```

REST中`get`代表查询，`post`代表新增，`put`代表更新，`delete`代表删除

### 版本号

- 版本号可以放在**路径**中、**查询参数**中或者**`header`**中
- 最好的方法是在api文件夹下分别新建`v1`和`v2`等文件夹，放置不同版本的api文件。
- 不能用`if`、`if`，**对扩展开放**，**对修改关闭**，所以不能新增功能就修改原来的代码


全局可以有很多个`router`实例，所以`book.js`中：
```js
const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})

module.exports = router
```
调用的时候，`app.js`：
```js
const book = require('./api/v1/book')
const classic = require('./api/v1/classic')

const app = new Koa()

app.use(book.routes())
app.use(classic.routes())

app.listen(3000)
```

注意：上层调用下层，下层调用上层可能会导致循环引用。


CommonJS 导出可以加大括号，也可以不加，加的话导入的时候也要加，不加的话导入的时候不要加（本质上是ES6的解构赋值）。
```js
module.exports = { router }
const { router } = require('router')

// 或者
module.exports = router
const router = require('router')
```

### `nodemon`
全局安装 `nodemon`，`npm install nodemon -g` ，不加`-g`需要`npx nodemon`来启动`nodemon`，因为是在命令行中输入`nodemon`来调用，所以要么写在`package.json`脚本里，要么`npx nodemon`，要么就全局安装


### `require-directory`
`requireDirectory`实现路由自动，每当`requireDirectory`导入一个模块，就执行这个函数，检测导出的是否是`router`，是的话就`app.use()`
```js
const requireDirectory = require('require-directory')

requireDirectory(module, './api', { visit: whenLoadModule })

function whenLoadModule(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes())
  }
}
```
### 获取参数

传参有四种方式，下面两种加上`header`和`body`

```js
/v1/book/{param}/latest?param=
```
使用`koa-bodyparse`解析`body`参数
```js
const parser = require('koa-bodyparser')
app.use(parser())
```
```js
router.get('/v1/:id/book/latest', (ctx, next) => {
  const path = ctx.params  // 取到url里的id
  const query = ctx.request.query  // ?param=
  const header = ctx.request.header  // 类似token
  const body = ctx.request.body  // 需要引入 koa-bodyparser
})
```
注意：
`url`和问号`?params=1`传递的参数都是字符串，而`body`里`json`可以记录数据类型。

### body-parser
`bodyparser` 用来解析`post`的请求取代了原生的 `req.on` 的方式 但是只能取到`ajax`和表单的数据 ，取不到上传的文件类型。


对请求体的四种解析方式:
1. `bodyParser.json(options)`: 解析json数据
2. `bodyParser.raw(options)`: 解析二进制格式(Buffer流数据)
3. `bodyParser.text(options)`: 解析文本数据
4. `bodyParser.urlencoded(options)`: 解析UTF-8的编码的数据(表单)。


##### `bodyParser` 解析json数据
`var bodyParser = require('body-parser')`
`bodyParser`变量是对中间件的引用。请求体解析后，解析值都会被放到`req.body`属性，内容为空时是一个`{}`空对象。

### koa-body作用

- 不使用的话，`this.request.body`是`undefined`;
- 使用的话，`this.request.body`是`{}`。

### koa-body上传文件注意事项

- `file`在`ctx.request.files.file`中，不在`ctx.request.body`中
- 请求头`Content—Type`，为`multipart/form-data`

### 异常处理

异常处理应该`throw`，而不是`return null`，让调用它的函数能捕捉到，让用户或开发者知道错误。

单纯的`try catch`捕捉不到异步错误，需要用`async`和`await`，`await`等待异步结果，所以能捕获异常，前提是调用的函数返回的是`Promise` :
```js
function f1() {
  f2()
}

async function f2() {
  try {
    await f3()
  } catch (e) {
    console.log('error')
  }
}

function f3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = Math.random()
      if (res < 0.999) {
        reject('err') // 产生异步异常
      } else{
        resolve(res)
      }
    }, 1000)
  })
}

f1()
```
一旦`throw Error`就不会继续向下执行了。

### 全局异常处理中间件
1. 监听错误
2. 返回有意义的信息
3. 然后在`app.js`中使用这个中间件`app.use(catchError)`

```js
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    ctx.body = 'error'
  }
}

module.exports = catchError
```

### KOA数据流
用户 => API => Model => MySQL => KOA => 用户

### `koa-static`
Koa静态资源使用`koa-static`中间件
然后在浏览器中`http://localhost:3000/1.jpg`就能显示出来了

#### 静态资源存储方案（如图片、js、css、html，特点是消耗流量）
1. 网站目录，缺点污染`api`
2. 专门的静态资源服务器，或者微服务，带宽足够
3. 云服务， `OSS` 贵、 （ECS、RDS、OSS、 CDN
4. `github gitpage`

 

