- [1. 前端监控分类](#1-前端监控分类)
  - [1.1. 数据监控](#11-数据监控)
  - [1.2. 性能监控](#12-性能监控)
  - [1.3. 异常监控](#13-异常监控)
- [2. 错误监控](#2-错误监控)
  - [2.1. 脚本错误监控](#21-脚本错误监控)
    - [2.1.1. 常规脚本错误](#211-常规脚本错误)
    - [2.1.2. Promise 错误](#212-promise-错误)
    - [2.1.3. 跨域脚本错误捕获](#213-跨域脚本错误捕获)
    - [2.1.4. 框架错误](#214-框架错误)
  - [2.2. 请求错误监控](#22-请求错误监控)
  - [2.3. 资源错误监控](#23-资源错误监控)
    - [2.3.1. `object.onerror`](#231-objectonerror)
    - [`performance.getEntries()`](#performancegetentries)
    - [2.3.2. `window` 对象上通过事件捕获 `Error` 事件](#232-window-对象上通过事件捕获-error-事件)
  - [2.4. 上报错误信息](#24-上报错误信息)

### 1. 前端监控分类
前端监控可以分为三类：数据监控、性能监控和异常监控。

#### 1.1. 数据监控
数据监控，顾名思义就是监听用户的行为。常见的数据监控包括：

- PV/UV:PV(page view)，即页面浏览量或点击量。UV:指访问某个站点或点击某条新闻的不同IP地址的人数
- 用户在每一个页面的停留时间
- 用户通过什么入口来访问该网页
- 用户在相应的页面中触发的行为

统计这些数据是有意义的，比如我们知道了用户来源的渠道，可以促进产品的推广，知道用户在每一个页面停留的时间，可以针对停留较长的页面，增加广告推送等等。
#### 1.2. 性能监控
性能监控指的是监听前端的性能，主要包括监听网页或者说产品在用户端的体验。常见的性能监控数据包括：

- 不同用户，不同机型和不同系统下的首屏加载时间
- 白屏时间
- http等请求的响应时间
- 静态资源整体下载时间
- 页面渲染时间
- 页面交互动画完成时间

这些性能监控的结果，可以展示前端性能的好坏，根据性能监测的结果可以进一步的去优化前端性能，比如兼容低版本浏览器的动画效果，加快首屏加载等等。

#### 1.3. 异常监控
此外，产品的前端代码在执行过程中也会发生异常，因此需要引入异常监控。及时的上报异常情况，可以避免线上故障的发上。虽然大部分异常可以通过`try catch`的方式捕获，但是比如内存泄漏以及其他偶现的异常难以捕获。常见的需要监控的异常包括：

- Javascript的异常监控
- 样式丢失的异常监控


### 2. 错误监控
错误监控可以分为：脚本错误监控、请求错误监控以及资源错误监控。


#### 2.1. 脚本错误监控
脚本错误大体可以分为两种：编译时错误以及运行时错误。其中，编译时错误一般在开发阶段就会发现，配合 `lint` 工具比如 `eslint`、`tslint` 等以及 `git` 提交插件比如 `husky` 等，基本可以保证线上代码不出现低级的编译时错误。

在编写 `JavaScript` 时，我们为了防止出现错误阻塞程序，我们会通过 `try catch` 捕获错误，对于错误捕获，这是最简单也是最通用的方案。

但是，`try catch` 捕获错误是侵入式的，需要在开发代码时即提前进行处理，而作为一个监控系统，无法做到在所有可能产生错误的代码片段中都嵌入 `try catch`。所以，我们需要全局捕获脚本错误。


##### 2.1.1. 常规脚本错误

当页面出现脚本错误时，就会产生 `onerror` 事件，我们只需捕获该事件即可。
```js
/**
 * @description window.onerror 全局捕获错误
 * @param event 错误信息，如果是
 * @param source 错误源文件URL
 * @param lineno 行号
 * @param colno 列号
 * @param error Error对象
 */
window.onerror = function (event, source, lineno, colno, error) {
  // 上报错误
  // 如果不想在控制台抛出错误，只需返回 true 即可
};
```

`window.onerror` 有两个缺点：

1. 只能绑定一个回调函数，如果想在不同文件中想绑定不同的回调函数，`window.onerror` 显然无法完成；同时，不同回调函数直接容易造成互相覆盖。
2. 回调函数的参数过于离散，使用不方便


所以，一般情况下，我们使用 `addEventListener` 来代替。

```js
/**
 * @param event 事件名
 * @param function 回调函数
 * @param useCapture 回调函数是否在捕获阶段执行，默认是false，在冒泡阶段执行
 */
window.addEventListener('error', (event) => {
  // addEventListener 回调函数的离散参数全部聚合在 error 对象中
  // 上报错误
}, true)
```

在一些特殊情况下，我们依然需要使用 `window.onerror`。比如，**不期望在控制台抛出错误时**，因为只有 `window.onerror` 才能阻止抛出错误到控制台

##### 2.1.2. Promise 错误

和常规脚本错误的捕获一样，我们只需捕获 `Promise` 对应的错误事件即可。而 `Promise` 错误事件有两种，`unhandledrejection` 以及 `rejectionhandled`。

当 `Promise` 被 `reject` 且没有 `reject` 处理器的时候，会触发 `unhandledrejection` 事件。

当 `Promise` 被 `reject` 且有 `reject` 处理器的时候，会触发 `rejectionhandled` 事件。

```js
// unhandledrejection 推荐处理方案
window.addEventListener('unhandledrejection', (event) => {
  console.log(event)
}, true);

// unhandledrejection 备选处理方案
window.onunhandledrejection = function (error) {
  console.log(error)
}

// rejectionhandled 推荐处理方案
window.addEventListener('rejectionhandled', (event) => {
  console.log(event)
}, true);

// rejectionhandled 备选处理方案
window.onrejectionhandled = function (error) {
  console.log(error)
}
```
##### 2.1.3. 跨域脚本错误捕获

在 `script` 标签中，添加 `crossorigin` 属性（推荐使用 `webpack` 插件自动添加）；同时，配置 CDN 服务器，为跨域脚本配上 `CORS`。

该方案有一个隐藏的坑，即兼容性问题，`crossorigin` 属性对于 IE 以及 Safari 支持程度不高。

##### 2.1.4. 框架错误 
框架错误指的不是框架层面的错误，而是指框架提供了 API 来捕获全局错误。

在 Vue 中，框架提供了 `errorHandler` 这个 API 来捕获并处理错误。

```js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```

#### 2.2. 请求错误监控
一般来说，前端请求有两种方案，使用 `ajax` 或者 `fetch` ，所以只需重写两种方法，进行代理，即可实现请求错误监控。

代理的核心在于使用 `apply` 重新执行原有方法，并且在执行原有方法之前进行监听操作。在请求错误监控中，我们关心三种错误事件：`abort`，`error` 以及 `timeout`，所以，只需在代理中对这三种事件进行统一处理即可。

tips：如果能够统一使用一种请求工具，如 `axios` 等，那么不需要重写 `ajax` 或者 `fetch` 只需在请求拦截器以及响应拦截器进行处理上报即可


#### 2.3. 资源错误监控

##### 2.3.1. `object.onerror`
`image` `标签、script` 标签上都可以加 `onerror` 事件

##### `performance.getEntries()`

获取所有已经加载资源的获取时长

##### 2.3.2. `window` 对象上通过事件捕获 `Error` 事件

资源错误监控本质上和常规脚本错误监控一样，都是监控错误事件实现错误捕获。

那么如果区分脚本错误还是资源错误呢？我们可以通过 `instanceof` 区分，脚本错误参数对象 `instanceof ErrorEvent`，而资源错误的参数对象 `instanceof Event`。

值得一提的是，由于 `ErrorEvent` 继承于 `Event` ，所以不管是脚本错误还是资源错误的参数对象，它们都 `instanceof Event`，所以，需要先判断脚本错误。

此外，两个参数对象之间有一些细微的不同，比如，脚本错误的参数对象中包含 `message` ，而资源错误没有，这些都可以作为判断资源错误或者脚本错误的依据。

```js
/**
 * @param event 事件名
 * @param function 回调函数
 * @param useCapture 回调函数是否在捕获阶段执行，默认是false，在冒泡阶段执行
 */
window.addEventListener('error', (event) => {
  if (event instanceof ErrorEvent) {
    console.log('脚本错误')
  } else if (event instanceof Event) {
    console.log('资源错误')
  }
}, true);
```

tips：使用 `addEventListener` 捕获资源错误时，一定要将 `useCapture` 即第三个选项设为 `true`，因为资源错误没有冒泡，所以只能在捕获阶段捕获。同理，由于 `window.onerror` 是通过在冒泡阶段捕获错误，所以无法捕获资源错误。

#### 2.4. 上报错误信息

1. 采用 `Ajax` 通信上报
2. 利用 `image` 对象的 `src` 属性上报