`startApp` 流程

H5 部分

1. `recordHistory`，`router.beforeEach` 钩子函数中设置 `history` 本地存储，维护历史记录栈
2. `beforeEachFn`，`router.afterEach` 钩子
   - 营地设置右上角分享
   - 判断是否非延迟状态，并加载 `vConsole`
3. `afterEachFn`，`router.afterEach` 钩子
   - 加载 `vConsole`
   - `checkLogin`，检查登录状态
   - `reportAegisEvent`，上报当前页面路由
   - 修复 QQ 下的复制链接
4. initReportTK，存储 `reporttk`


通用部分

1. `initMixin`包括默认的 `projectMixins`，以及传入的 `options.projectMixins`
   - 默认的有 commonMixin, tcssReportMixin, lifecycleMixin 等
2. `initNetwork`，初始化网络框架
3. `initConfig`，设置以下内容
   - `app.config.devtools`
   - `app.config.productionTip`
   - `app.config.errorHandler`
   - `app.config.ignoredElements`
4. `initPlugin`，包括
   - `VueLazyLoad`，H5 独有，指令
   - `ebusV2`
   - `treport`，H5 独有，指令
5. `initReport`，包括
   - `initReportAegis`
   - `initPromiseCatchErrorReport`，监听 `promise error`
6. `initRouter`，使用 `Vue.use(Router)`，或者 `SimpleVueRouter`
7. `initStore`，使用 `new Vuex.Store`
8. `initApp`，使用 `new Vue({ el: '#app' })`，注册 `window.app = app`
9.  `initGlobalAppData`，设置一些全局变量，比如 `window.app.firstChannel`
10. `initXss`，注册 `Vue.prototype.xss`
11. `pmdInitConfig`，注册传入的 `config`


改动或优化点：

`initRouter` 中，`SimpleVueRouter(options)` 方法中, `getRoutes` 会不再使用 `ROUTES`，而是先尝试使用设置的，然后使用 `ROUTES`，也就是如果传入了 `routerMap`，就会用 `routerMap`。

另外，`initRouter` 大致逻辑如下，如果是小程序，或者设置了 `options.SimpleVueRouter` 为 `true`，则使用 `uni-simple-router`，否则使用 `vue-router`。如果你是非 uni-app 项目的话，则要使用 `vue-router`，就必须传入 `routerMap` 了。


加了 `routerInterCeptor` 方法的执行，跳转的时候 H5 加了 `type`，小程序的时候 `params、query` 混合。

```ts
if (options.SimpleVueRouter && app.$router) {
  routerInterCeptor(app.$router);
}
```
