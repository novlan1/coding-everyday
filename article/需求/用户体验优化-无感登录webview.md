登录 webView 时，用的是 sso code，就是一个临时 token，后台拿到后，校验并返回对应的登录态信息。

值得注意的有下面几点：

1. 这个 code 只能用一次，用完即失效
2. 后台优先使用 url 中的登录态，也就是即使你登录成功，存在有效的 cookie，也必须把 url 中的 code 去掉
3. 携带有效 code 的请求，只会换取登录态，不再返回 CGI 业务信息

由于我们的页面大部分都是并发请求，所以即使第一个接口获取到登录态后，其他接口请求也会报错。

之前的前端解决方案是，用 code 获取到登录态之后，就刷新页面，这样就可以防止后面的接口报错。

这样的弊端就是用户体验差，有明显的刷新页面，而且换取登录态的接口的速度越慢，体验越差。如何优化呢？

1. 可以借助 `history.replaceState` 这个API，达到更新 url，但不刷新页面
2. 网络框架增加异步任务调度，支持将接口请求由并发，改成串行，其实就是控制并发数量为 1
3. 网络层支持重放，也就是修改参数后重新请求

使用前：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/4/own_mike_36f38141915087097a.gif" width="300" />


使用后：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/4/own_mike_986e8b3535b0e1ef4a.gif"  width="300" />
