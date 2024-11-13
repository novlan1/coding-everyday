
H5（Vue3）

1. uni-app 内部也是用的 `vue-router`，能找到 `createRouter` API的调用
2. `createRouter` 中 `routes` 参数使用的是 `__uniRoutes`，这是 uni-app 内部变量，有 `path/alias/meta/loader/component` 几个属性。直接在控制台打印 `window.__uniRoutes` 就能看到
3. `createRouter` 源码路径：`packages/uni-h5-vite/src/plugins/pagesJson.ts`，或搜索 `generatePagesRoute`
4. `__uniRoutes` 都没有 `name` 属性，自然无法通过 `name` 跳转，即 `$router.push({ name: 'xxx' })` 不可行，只能通过 `path` 跳转

H5（Vue2）

1. Vue2 中 `__uniRoutes` 的生成逻辑源码在：`packages/webpack-uni-pages-loader/lib/platforms/h5.js`，或搜索 `genPageRoutes`
2. 

非 H5

1. uni-app 在非H5端没有提供 `$router`，推荐直接使用 `uni.navigateTo` 等原生语法

路由有3种形式

1. 动态路由，比如 `/match/match-detail/52973147`
2. `aliasPath + query`，`aliasPath` 就是路径别名，比如 `/match-list?siteId=2066002`
3. `fullPath + query`，`fullPath` 就是全部路径，`views/match-list/match-list?siteId=2066002`

非 uni-app 项目我更倾向于用1，参数精炼。uni-app 项目我更倾向于用3，好处有：

1. 多端统一，无需额外兼容、转化
2. 所见即所得，无心智负担

路由有两种模式，`hash` 和 `history`，结合上面提到的3种形式，总共有 `2 * 3 = 6` 种类型。

非跨端转跨端，以及 vue2 升级 vue3，都会遇到映射路由表的问题。当前实现了：

1. hash + dynamic => history + aliasPath query
2. history + aliasPath query => history + fullPath query

是 `uni-simple-router` 支持的动态路由，`uni-app`框架本身不支持，具体是在初始化的时候，在 `routes` 中定义了 `aliasPath`。

uni-app 使用 `vue-router` 时，传入的还是 `path`，即页面路径，这种无法支持动态路由。这一点可以通过打印 `window.__uniRoutes` 看出。引入 `uni-simple-router` 后，再打印 `window.__uniRoutes`，会发现 `path` 变成了 动态路由，比如 `/match/match-detail/:childid`，这是 `uni-simple-router` 中 `src/H5/buildRouter.ts` 做的，将 `aliasPath` 赋值给了 `path`。
