`uni-simple-router` 是 `uni-app` 下路由三方库，可以像 `vue-router` 一样进行路由跳转、路由守卫等。

通过打包产物分析发现，这个库有 `43K` 这么大，小程序下"寸k存金"，考虑如何减小它的体积。

查看源码发现了几个优化点：

1. 打包了一份 `path-to-regexp`，这个可以通过 `externals` 排除，因为业务库本身也会引入
2. 多平台代码共存，非小程序下的代码也会打包进来

对于第一点，解决方法已经给出了，配置 `externals`：

```js
module.exports = {
  externals: {
    '@tencent/t-comm/lib/router/path-to-regexp': 'commonjs @tencent/t-comm/lib/router/path-to-regexp'
  },
}
```

对于第二点，可以利用条件编译。对于非小程序会用到的代码，直接用条件编译包裹起来，打包时去掉。还好我之前已经封装了一个 `loader`，拿来用即可。

```js
const { LOADER_MAP } = require('@tencent/plugin-light/lib/loader');


module.export = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: LOADER_MAP.ifdef,
            options: {
              context: { 
                'MP-WEIXIN': true,
                MP: true,
               },
              type: ['css', 'js', 'html'],
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
```

没用到的代码用条件编译包裹，示例如下：

```ts
// #ifndef MP
if (router.options.platform === 'h5') {
    proxyH5Mount(router);
    addKeepAliveInclude(router);
}
// #endif
```

通过这几步的减包，效果如下，减少了 `9K`。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_862fac8fe0d40c7c45.png" width="600">

