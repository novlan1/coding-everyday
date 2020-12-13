- [koa-compose实现原理](#koa-compose实现原理)
  - [1. 洋葱模型案例](#1-洋葱模型案例)
  - [2. 准备工作](#2-准备工作)
  - [3. Koa 中 compose 的实现方式](#3-koa-中-compose-的实现方式)
    - [3.1. 同步的实现](#31-同步的实现)
    - [3.2. 2、升级为支持异步](#32-2升级为支持异步)
  - [4. Redux 旧版本 compose 的实现方式](#4-redux-旧版本-compose-的实现方式)
    - [4.1. 1、同步的实现](#41-1同步的实现)
    - [4.2. 2、升级为支持异步](#42-2升级为支持异步)
  - [5. Redux 新版本 compose 的实现方式](#5-redux-新版本-compose-的实现方式)
    - [5.1. 1、同步的实现](#51-1同步的实现)
    - [5.2. 2、升级为支持异步](#52-2升级为支持异步)
  - [6. 使用 `async` 函数实现](#6-使用-async-函数实现)

## koa-compose实现原理

### 1. 洋葱模型案例
如果你已经使用过 Koa，那么对 “洋葱模型” 这个词一定不陌生，它就是 Koa 中间件的一种串行机制，并且是支持异步的，下面是一个表达 “洋葱模型” 的经典案例。

```js
const Koa = require("koa");

const app = new Koa();

app.use(asycn (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});

app.use(asycn (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});

app.use(asycn (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});

app.listen(3000);

// 1
// 3
// 5
// 6
// 4
// 2
```
上面的写法我们按照官方推荐，使用了 `async/await`，但如果是同步代码不使用也没有关系。

这里简单的分析一下执行机制，第一个中间件函数中如果执行了 `next`，则下一个中间件会被执行，依次类推，就有了我们上面的结果，而在 Koa 源码中，这一功能是靠一个 `compose` 方法实现的。本文实现了几种不同的 `compose`，并附带对应的案例来验证。

### 2. 准备工作
在真正创建 `compose` 方法之前应该先做些准备工作，比如创建一个 `app` 对象来顶替 Koa 创建出的实例对象，并添加 `use` 方法和管理中间件的数组 `middlewares`。

文件： app.js
```js
// 模拟 Koa 创建的实例
const app = {
    middlewares: []
};

// 创建 use 方法
app.use = function(fn) {
    app.middlewares.push(fn);
};

// app.compose.....

module.exports = app;
```
上面的模块中导出了 `app` 对象，并创建了存储中间件函数的 `middlewares` 和添加中间件的 use 方法，因为无论用哪种方式实现 `compose` 这些都是需要的，只是 `compose` 逻辑的不同，所以后面的代码块中会只写 `compose` 方法。

### 3. Koa 中 compose 的实现方式

首先介绍的是 Koa 源码中的实现方式，在 Koa 源码中其实是通过 `koa-compose` 中间件来实现的，我们在这里将这个模块的核心逻辑抽取出来，用我们自己的方式实现，由于重点在于分析 `compose` 的原理，所以 `ctx` 参数就被去掉了，因为我们不会使用它，重点是 `next` 参数。

#### 3.1. 同步的实现

```js
app.compose = function() {
    // 递归函数
    function dispatch(index) {
        // 如果所有中间件都执行完跳出
        if (index === app.middlewares.length) return;

        // 取出第 index 个中间件并执行
        const route = app.middlewares[index];
        return route(() => dispatch(index + 1));
    }

    // 取出第一个中间件函数执行
    dispatch(0);
};
```
上面是同步的实现，通过递归函数 `dispatch` 的执行取出了数组中的第一个中间件函数并执行，在执行时传入了一个函数，并递归执行了 `dispatch`，传入的参数 `+1`，这样就执行了下一个中间件函数，依次类推，直到所有中间件都执行完毕，不满足中间件执行条件时，会跳出，这样就按照上面案例中 `1 3 5 6 4 2` 的情况执行。

#### 3.2. 2、升级为支持异步

```js
app.compose = function() {
    // 递归函数
    function dispatch(index) {
        // 如果所有中间件都执行完跳出，并返回一个 Promise
        if (index === app.middlewares.length) return Promise.resolve();

        // 取出第 index 个中间件并执行
        const route = app.middlewares[index];

        // 执行后返回成功态的 Promise
        return Promise.resolve(route(() => dispatch(index + 1)));
    }

    // 取出第一个中间件函数执行
    dispatch(0);
};
```

我们知道 `async` 函数中 `await` 后面执行的异步代码要实现等待，带异步执行后继续向下执行，需要等待 `Promise`，所以我们将每一个中间件函数在调用时最后都返回了一个成功态的` Promise`。

### 4. Redux 旧版本 compose 的实现方式

#### 4.1. 1、同步的实现

```js
app.compose = function() {
    return app.middlewares.reduceRight((a, b) => () => b(a), () => {})();
};
```
上面的代码看起来不太好理解，我们不妨根据案例把这段代码拆解开，假设 `middlewares` 中存储的三个中间件函数分别为 `fn1`、`fn2` 和 `fn3`，由于使用的是 `reduceRight` 方法，所以是逆序归并，第一次 `a` 代表初始值（空函数），`b` 代表 `fn3`，而执行 `fn3` 返回了一个函数，这个函数再作为下一次归并的 `a`，而 `fn2` 作为 `b`，依次类推，过程如下。
```js
// 第 1 次 reduceRight 的返回值，下一次将作为 a
() => fn3(() => {});

// 第 2 次 reduceRight 的返回值，下一次将作为 a
() => fn2(() => fn3(() => {}));

// 第 3 次 reduceRight 的返回值，下一次将作为 a
() => fn1(() => fn2(() => fn3(() => {})));
```
由上面的拆解过程可以看出，如果我们调用了这个函数会先执行 `fn1`，如果调用 `next` 则会执行 `fn2`，如果同样调用 `next` 则会执行 `fn3`，`fn3` 已经是最后一个中间件函数了，再次调 `next` 会执行我们最初传入的空函数，这也是为什么要将 `reduceRight` 的初始值设置成一个空函数，就是防止最后一个中间件调用 `next` 而报错。

#### 4.2. 2、升级为支持异步

```js
app.compose = function() {
    return Promise.resolve(
        app.middlewares.reduceRight(
            (a, b) => () => Promise.resolve(b(a)),
            () => Promise.resolve();
        )()
    );
};
```
### 5. Redux 新版本 compose 的实现方式
#### 5.1. 1、同步的实现

```js
app.compose = function() {
    return app.middlewares.reduce((a, b) => arg => a(() => b(arg)))(() => {});
};
```
Redux 新版本中将 `compose` 的逻辑做了些改动，将原本的 `reduceRight` 换成 `reduce`，也就是说将逆序归并改为了正序，我们不一定和 `Redux` 源码完全相同，是根据相同的思路来实现串行中间件的需求。

个人觉得改成正序归并后更难理解，所以还是将上面代码结合案例进行拆分，中间件依然是 `fn1`、`fn2` 和 `fn3`，由于 `reduce` 并没有传入初始值，所以此时 `a` 为 `fn1`，`b` 为 `fn2`。
```js
// 第 1 次 reduce 的返回值，下一次将作为 a
arg => fn1(() => fn2(arg));

// 第 2 次 reduce 的返回值，下一次将作为 a
arg => (arg => fn1(() => fn2(arg)))(() => fn3(arg));

// 等价于...
arg => fn1(() => fn2(() => fn3(arg)));

// 执行最后返回的函数连接中间件，返回值等价于...
fn1(() => fn2(() => fn3(() => {})));
```
所以在调用 `reduce` 最后返回的函数时，传入了一个空函数作为参数，其实这个参数最后传递给了 `fn3`，也就是第三个中间件，这样保证了在最后一个中间件调用 `next` 时不会报错。

#### 5.2. 2、升级为支持异步

```js
app.compose = function() {
    return Promise.resolve(
        app.middlewares.reduce((a, b) => arg =>
            Promise.resolve(a(() => b(arg)))
        )(() => Promise.resolve())
    );
};
```
### 6. 使用 `async` 函数实现

由于是利用 `async` 函数实现的，所以默认就是支持异步的，因为 `async` 函数会返回一个 `Promise`。
```js
app.compose = function() {
    // 自执行 async 函数返回 Promise
    return (async function () {
        // 定义默认的 next，最后一个中间件内执行的 next
        let next = async () => Promise.resolve();

        // middleware 为每一个中间件函数，oldNext 为每个中间件函数中的 next
        // 函数返回一个 async 作为新的 next，async 执行返回 Promise，解决异步问题
        function createNext(middleware, oldNext) {
            return async () => {
                await middleware(oldNext);
            }
        }

        // 反向遍历中间件数组，先把 next 传给最后一个中间件函数
        // 将新的中间件函数存入 next 变量
        // 调用下一个中间件函数，将新生成的 next 传入
        for (let i = app.middlewares.length - 1; i >= 0; i--) {
            next = createNext(app.middlewares[i], next);
        }

        await next();
    })();
};
```
上面代码中的 `next` 是一个只返回成功态 `Promise` 的函数，可以理解为其他实现方式中最后一个中间件调用的 `next`，而数组 `middlewares` 刚好是反向遍历的，取到的第一个值就是最后一个中间件，而调用 `createNext`作用是返回一个新的可以执行数组中最后一个中间件的 `async` 函数，并传入了初始的 `next`，这个返回的 `async` 函数作为新的 `next`，再取到倒数第二个中间件，调用 `createNext`，又返回了一个 `async` 函数，函数内依然是倒数第二个中间件的执行，传入的 `next` 就是上次新生成的 `next`，这样依次类推到第一个中间件。

因此执行第一个中间件返回的 `next` 则会执行传入的上一个生成的 `next` 函数，就会执行第二个中间件，就会执行第二个中间件中的 `next`，就这样直到执行完最初定义的的 `next`，通过案例的验证，执行结果与洋葱模型完全相同。

至于异步的问题，每次执行的 `next` 都是 `async` 函数，执行后返回的都是 `Promise`，而最外层的自执行 `async` 函数返回的也是 `Promise`，也就是说 `compose` 最后返回的是 `Promise`，因此完全支持异步。

原文地址：https://juejin.im/post/6844903688985657357

