- [koa中间件的实现原理](#koa中间件的实现原理)
  - [一、问题分析](#一问题分析)
  - [二、实现](#二实现)
  - [三、总结](#三总结)

## koa中间件的实现原理

koa中间件的实现原理如何？先来看一个例子。

koa的执行顺序是这样的：

```js
const middleware = async function (ctx, next) {
  console.log(1)
  await next()
  console.log(6)
}

const middleware2 = async function (ctx, next) {
  console.log(2)
  await next()
  console.log(5)
}

const middleware3 = async function (ctx, next) {
  console.log(3)
  await next()
  console.log(4)
} 
```

会依次打印 1，2，3，4，5，6

问题是koa中间件实现原理，也就是洋葱模型的实现原理是什么？

### 一、问题分析

async await是promise的语法糖，await后面跟一个promise，所以上面的代码可以写成：

```js
const middleware = function (ctx, next) {
  console.log(1)
  next().then(() => {
    console.log(6)
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
    console.log('return:', res)
  })
  return 3
}
```
```
1 
2 
3 
4 
5 
return 3 
return 2
```
改成这样更好理解一些，所以流程控制的核心在于next的实现。

next要求调用队列中下一个middleware，当达到最后一个的时候resolve。这样最后面的promise先resolve，一直到第一个，这样就是洋葱模型的顺序了。

### 二、实现

koa-compose的实现是这样的：

```js
function compose(middleware) {
  return function (context, next) {
    return dispatch(0)

    function dispatch(i) {
      let fn = middleware[i]
      if (i === middleware.length) fn = next // 拿掉这句，似乎并没有什么影响
      console.log(i, next)
      if (!fn) return Promise.resolve()  // 所有中间件的 next 前的逻辑都执行完了，这时候最后一个中间件可以调用.then方法了
      console.log('--')
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

我们把一些参数检查的非核心逻辑去掉了，实现代码就上面那些。**每次传入的next都是调用下一个middleware**，这样是一个递归的过程，结束条件是最后一个middleware的next是用户传入的。
【如果在`dispatch`中打印下 `next`，会发现其都是`undefined`，也就是说它只是个标志，`koa-compose`内部把它转成了`Promise.resolve()`，从而可以调用`then`方法。】
【三个中间件，`dipatch`方法只调用的4次】

这里面有一些亮点：

1. 这是一种尾递归的形式，尾递归的特点是最后返回的值是一个递归的函数调用，这样执行完就会在调用栈中销毁，不会占据调用栈.
2. 返回的是一个Promise.resolve包装之后的调用，而不是同步的调用，所以这是一个异步递归，异步递归比同步递归的好处是可以被打断，如果中间有一些优先级更高的微任务，那么可以先执行别的微任务
3. compose是函数复合，把n个middleware复合成一个，参数依然是context和next，这种复合之后依然是一个middleware，还可以继续进行复合。

### 三、总结

Koa 中间件的实现原理，也就是洋葱模型的实现原理，核心在于next的实现。next需要依次调用下一个middleware，当到最后一个的时候结束，这样后面middleware的promise先resolve，然后直到第一个，这样的流程也就是洋葱模型的流程了。

实现的时候还有一些细节，一个是递归最好做成尾递归的形式，而是用异步递归而不是同步递归，第三就是形式上用函数复合的形式，这样复合之后的中间件还可以继续复合。



参考资料：[浅谈koa中间件的实现原理](https://zhuanlan.zhihu.com/p/141890366)，[koa-compose, github](https://github.com/koajs/compose/blob/master/index.js)