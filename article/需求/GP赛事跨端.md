### 登录态

前提是我们的小程序要合入对方的小程序，然而，对方不给小程序密钥。

观察发现他们小程序有返回 MSDK 登录态，申请转换关系权限后，就可以直接拿到登录我们的页面了。简单高效，也算是一个 hack 的方法吧。

### 独立分包路由拦截

小程序内采用的是独立分包，H5不需要，所以需要 hook 路由，找到对应的分包，然后修改跳转路径。

### 查看地图

QQ小程序在 iOS 下不支持 openLocation，而 webview 的方式又没法添加域名校验。

采用的方法是，打开一个自己的 webview 页面，就是有权限加校验文件，内部嵌套地图 `apis.map.qq.com` 的地址。

也就是 `A webview `打开 `B url`，`B url` 是空壳子，装的是 `C url`。

注意几点，B 不能加登录态校验，且注意 `html title`，因为 `webview` 会网页 `title` 当作 `navigationTitle`。

### 独立分包白屏

能引起这个问题的原因挺多，这里的原因是引入了一个比较深的工具方法。

```ts
import { NUMBER_CHI_MAP } from '@xxx/t-comm/lib/base/number/number';
```

推测是由于路径深，打包没找到。uni-app 比较迷，不清楚具体机制，还是排除法发现的。

这个 `case` 的解决办法是，自己写 `NUMBER_CHI_MAP`。

