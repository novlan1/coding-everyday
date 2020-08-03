## React-router
### `BrowserRouter`和`HashRouter`
- `<BrowserRouter>`使用HTML5提供的`history API` (`pushState`,`replaceState`和 `popstate` 事件) 来保持 UI 和 URL 的同步。

- `<HashRouter>`使用 URL 的hash部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。

一般就这两种，用它包裹住`<Route/>`


`Switch`当第一个路由匹配成功后，就不再往下走了

### 混合组件化

就是路由当组件使用。

- 3.0版本是`<Router history=''>`
- 4.0是`<HashRouter></HashRouter>`

注意：
- 一个`HashRouter`**只能有一个子节点**，不能有多个。
- `<Route/>`标签中的`component`一定是小写。
- 根标签必须是`Router`(`BrowserRouter`或`HashRouter`)，否则没法跳转。
- 路由匹配不到有两种处理方式，一是404，二是跳转到默认的首页。


### 实现404
必须使用`switch`，写一个**不带path**的`Route`放在所有`Route`的最后，`component`就是404页面
```jsx
<Switch>
    <Route path='/about' component={About} />
    <Route path='/main' component={Main} />
    <Route component={notMatch} />
</Switch>
```