startApp 流程

H5 部分

1. `initMixin`，包括默认的 `projectMixins`，以及传入的 `options.projectMixins`
2. `recordHistory`，`router.beforeEach` 钩子函数中设置 `history` 本地存储，维护历史记录栈
3. `beforeEachFn`，`router.afterEach` 钩子
   - 营地设置右上角分享
   - 判断是否非延迟状态，并加载 `vConsole`
4. `afterEachFn`，`router.afterEach` 钩子
   - 加载 `vConsole`
   - `checkLogin`，检查登录状态
   - `reportAegisEvent`，上报当前页面路由
   - 修复 QQ 下的复制链接
5. initReportTK，存储 `reporttk`


通用部分

1. `initNetwork`，初始化网络框架
2. `initConfig`，设置以下内容
   - `app.config.devtools`
   - `app.config.productionTip`
   - `app.config.errorHandler`
   - `app.config.ignoredElements`
3. `initPlugin`，包括
   - `VueLazyLoad`
   - `ebusV2`
   - `treport`
4. `initReport`，包括
   - `initReportAegis`
   - `initPromiseCatchErrorReport`，监听 `promise error`
5. `initRouter`，使用 `Vue.use(Router)`，或者 `SimpleVueRouter`
6. `initStore`，使用 `new Vuex.Store`
7. `initApp`，使用 `new Vue({ el: '#app' })`，注册 `window.app = app`
8. `initGlobalAppData`，设置一些全局变量，比如 `window.app.firstChannel`
9. `initXss`，注册 `Vue.prototype.xss`
10. `pmdInitConfig`，注册传入的 `config`
