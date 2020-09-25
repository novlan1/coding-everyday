- [1. history 模式和 hash 模式](#1-history-模式和-hash-模式)
  - [1.1. hash 模式](#11-hash-模式)
  - [1.2. history 模式](#12-history-模式)

## 1. history 模式和 hash 模式

SPA中，前端路由主要实现了两个功能（使用ajax更新页面状态的情况下）：

1. 记录当前页面的状态（保存或分享当前页的url，再次打开该url时，网页还是保存（分享）时的状态）；
2. 可以使用浏览器的前进后退功能（如点击后退按钮，可以使页面回到使用ajax更新页面之前的状态，url也回到之前的状态）；

作为开发者，要实现这两个功能，我们需要做到：

- 改变url且不让浏览器向服务器发出请求；
- 监测 url 的变化；
- 截获 url 地址，并解析出需要的信息来匹配路由规则。
我们路由常用的hash模式和history模式实际上就是实现了上面的功能。

### 1.1. hash 模式
这里的 hash 就是指 url 尾巴后的 # 号以及后面的字符。这里的 # 和 css 里的 # 是一个意思。hash 也 称作 锚点，本身是用来做页面定位的，她可以使对应 id 的元素显示在可视区域内。

由于 hash 值变化不会导致浏览器向服务器发出请求，而且 hash 改变会触发 hashchange 事件，浏览器的进后退也能对其进行控制，所以人们在 html5 的 history 出现前，基本都是使用 hash 来实现前端路由的。

使用到的api：
```js
window.location.hash = 'qq' // 设置 url 的 hash，会在当前url后加上 '#qq'

var hash = window.location.hash // '#qq'  

window.addEventListener('hashchange', function(){ 
    // 监听hash变化，点击浏览器的前进后退会触发
})
```

### 1.2. history 模式
已经有 `hash` 模式了，而且 `hash` 能兼容到`IE8`， `history` 只能兼容到 `IE10`，为什么还要搞个 `history` 呢？
首先，**`hash` 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了**。其次，`hash` 的传参是基于 `url` 的，如果要传递复杂的数据，会有**体积的限制**，而 `history` 模式不仅可以在`url`里放参数，还可以将数据存放在一个特定的对象中。
最重要的一点：
>如果不想要很丑的 `hash`，我们可以用路由的 `history` 模式




相关API：
```js
window.history.pushState(state, title, url) 
// state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
// title：标题，基本没用，一般传 null
// url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是一樣的，否则会抛出错误。url可以是绝对路径，也可以是相对路径。

//如 当前url是 https://www.baidu.com/a/, 执行 history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state, title, url)
// 与 pushState 基本相同，但她是修改当前历史记录，而 pushState 是创建新的历史记录

window.addEventListener("popstate", function() {
	// 监听浏览器前进后退事件，pushState 与 replaceState 方法不会触发				
});

window.history.back() // 后退
window.history.forward() // 前进
window.history.go(1) // 前进一步，-2为后退两步
window.history.length  // 可以查看当前历史堆栈中页面的数量
```

`pushState` 这个方法，页面不会变化，只是浏览器地址栏会发生更新，且浏览器的回退按钮变成了可点击状态！

history 模式改变 url 的方式会导致浏览器向服务器发送请求，这不是我们想看到的，我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个 html 页面。

`vue-router` 的 `push` 方法的页面跳转流程：
1. `vue-router`调用 `push` 方法首先会**使用 `pushstate` 变换页面 url**（仅仅变化 url，页面不变）
2. 紧接着**根据 `push` 方法中传入的 `params` 找到对应的组件**【页面】
3. **载入对应页面组件**，跳转完毕

【划重点】`vue-router`的 `push` 跳转或者`replace`跳转是不需要请求服务器的！
但是我们如果使用 `window.location.href` 来做这个页面跳转，就基本上和 `web1.0` 没什么区别，一定会先请求到服务器，再由服务器下发资源，导致页面刷新~



参考资料：
1. [History, MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History)，
2. [History API, MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)，
3. [前端路由的两种模式： hash 模式和 history 模式](https://www.cnblogs.com/JRliu/p/adff)，
4. [vue-router history模式的实现原理](https://www.jianshu.com/p/557f2ba86892)





