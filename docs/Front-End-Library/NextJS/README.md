- [1. Next 中常见文件的作用](#1-next-中常见文件的作用)
- [2. Next 路由传递参数](#2-next-路由传递参数)
- [3. 自定义APP作用](#3-自定义app作用)
- [4. 自定义 Document](#4-自定义-document)
- [5. 异步组件的加载, 等到了调到它的地方再加载](#5-异步组件的加载-等到了调到它的地方再加载)
- [6. Next 集成 redux 需要考虑](#6-next-集成-redux-需要考虑)
- [7. Next 流程](#7-next-流程)
- [8. Next 集成redux](#8-next-集成redux)
- [9. `withRouter`](#9-withrouter)
- [10. `next_data`属性](#10-next_data属性)
- [11. 关于`getInitialProps`方法](#11-关于getinitialprops方法)
  - [11.1. 那么，`getInitialProps` 什么时候会在浏览器端调用呢？](#111-那么getinitialprops-什么时候会在浏览器端调用呢)
- [12. getInitialProps入参对象的属性如下：](#12-getinitialprops入参对象的属性如下)
- [13. SSR项目引入组件，提示`window`未定义](#13-ssr项目引入组件提示window未定义)

### 1. Next 中常见文件的作用

- `next.config.js`：`next.js`的配置文件
- `_app.js`：覆盖`next`的`app.js`
- `@zeit/next-css`：`next`中加载`css`


### 2. Next 路由传递参数
Next路由传递参数，只能通过`query`(`b?id=1`)，不能`params`(`/b/id/1`)，但是可以通过路由映射，`as='/b/1'`，使URL好看


### 3. 自定义APP作用
1. 固定`layout`
2. 保持一些公用的状态
3. 给页面传入一些自定义数据
4. 自定义错误处理


注意：自定义`App`，必须重写APP的`getIntialProps`方法


### 4. 自定义 Document
- 只有在服务端渲染的时候才会执行
- 用来修改服务端渲染的文档内容
- 一般用来配合第三方`css-in-js`方案使用

- 要么不覆盖`Document`的`getInitialProps`，要么至少将`Document`的`getInitialProps`结果返回出去，不要忘了传参`ctx`。
- 对于`render`函数也一样，要么不覆盖，要么就要写出`Html`、`Head`、`body`、`Main`、`NextScript`结构，否则缺失。


不推荐在`_document.js`中定义`title`，应该在`pages`每个页面引入`Head`，然后定义`title`

`babel-plugin-styled-components，ssr：true`：客户端和服务端生成的`css`名字一样

### 5. 异步组件的加载, 等到了调到它的地方再加载
```
import dynamic from 'next/dynamic'

const Comp = dynamic(import('components/test'))
```

异步模块加载的意思是，等到进入某个页面再加载js，而不是一上来全都加载了。

比如在`getInitialProps`方法中，`const moment = await import('moment')`，然后`moment.default...`


### 6. Next 集成 redux 需要考虑
- 服务端如何写入数据到`store`
- 如何同步服务端的数据到客户端


### 7. Next 流程
![Next 流程](/imgs/nextjs_process.jpg)


### 8. Next 集成redux
1. 主要在于`lib/with-redux-store.js`和`_app.js`
2. `withRedux`包裹 App，其本身也有`getInitialProps`法，在此方法中`getOrCreateStore`，注意 `server`端和`client`端不一样的逻辑，服务端每次都`initializeStore`，防止不同用户共用数据，客户端需要看之前有没有

### 9. `withRouter`
- 用`withRouter`包裹，就可以在组件中获得`router`对象，其上有`pathnane`、`query`等属性
- `withRouter`包裹在`connect`外面，否则与`withRouter`的`shouldComponentUpdate`冲突，引起错误。

### 10. `next_data`属性
`next`服务端渲染的时候，`getInitialProps`把数据放在`html`的`next_data`属性中，在客户端第一次渲染的时候不会重新请求，从而保证数据同步


### 11. 关于`getInitialProps`方法
Next.js 在做服务器端渲染的时候，页面对应的 React 组件的 `getInitialProps` 函数被调用，异步结果就是“脱水”数据的重要部分，**除了传给页面 React 组件完成渲染，还放在内嵌 `script` 的 `__NEXT_DATA__` 中**。

**在浏览器端渲染的时候，不会去调用 `getInitialProps`** ，直接通过 `__NEXT_DATA__` 中的“脱水”数据来启动页面 React 组件的渲染。这样一来，如果 `getInitialProps` 中有调用 API 的异步操作，只在服务器端做一次，浏览器端就不用做了。

#### 11.1. 那么，`getInitialProps` 什么时候会在浏览器端调用呢？

当在单页应用中做页面切换的时候，比如从 `Home` 页切换到 `Product` 页，这时候完全和服务器端没关系，只能靠浏览器端自己了，`Product`页面的 `getInitialProps` 函数就会在浏览器端被调用，得到的数据用来开启页面的 React 原生生命周期过程。


### 12. getInitialProps入参对象的属性如下：
```js
pathname   // URL 的 path 部分
query   // URL 的 query 部分，并被解析成对象
asPath   // 显示在浏览器中的实际路径（包含查询部分），为String类型
req   // HTTP 请求对象 (只有服务器端有)
res   // HTTP 返回对象 (只有服务器端有)
jsonPageRes   // 获取数据响应对象 (只有客户端有)
err   // 渲染过程中的任何错误
```

### 13. SSR项目引入组件，提示`window`未定义
1. 用动态导入，`nextjs`的`dynaimic`
2. 先定义变量，判断`window`存在的时候才引入。实践证明，这种方法好用，比如`braft-editor`

