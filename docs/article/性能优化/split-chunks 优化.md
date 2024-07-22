
`uni-app` 源码中，`packages/vue-cli-plugin-uni/lib/h5/index.js` 可以看到 `uni-app` 给出的 `chunk` 配置。

```js
const vueConfig = {
  pages: {
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  }
}
```

`pages.chunks` 取自 `webpack` 插件 `html-webpack-plugin` 里面的 `chunks` 属性，在打包的时候会被插入到入口文件 `index.html` 里面。

这里的 `pages` 配置会传给 `html-webpack-plugin`，转化成的 `webpack` 配置如下：

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial'
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true
      }
    }
  }
}
```

通过分析打包产物，可以看出 `chunk-vendors` 内部有很多稳定的包，可以把它们拆出来。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_04720f5e5f3126597a.png" width="800">


结合自身项目，进行如下拆分：

```js
pages: {
  index: {
    entry: path.resolve(process.env.UNI_INPUT_DIR!, getMainEntry()),
    // 模板来源
    template,
    filename: 'index.html',
    title,
    publicPath,
    chunks: [
      'uni-h5',
      'core-js',
      'chunk-vendors',
      'index',
    ],
  },
},
chainWebpack(config: any) {
  config.optimization.splitChunks({
    minChunks: 1,
    maxInitialRequests: 10,

    cacheGroups: {
      tim_js_sdk: {
        name: 'tim-js-sdk',
        test: /[\\/]node_modules[\\/]_?tim-js-sdk(.*)/,
        priority: 15,
        chunks: 'all',
        // minSize: 0,
        reuseExistingChunk: true,
      },
      uni_h5: {
        name: 'uni-h5',
        test: /uni-h5[\\/]_?dist[\\/]_?index\.umd\.min\.js/,
        chunks: 'initial',
        priority: 5,
        reuseExistingChunk: true,
      },
      core_js: {
        name: 'core-js',
        test: /[\\/]node_modules[\\/]_??core-js(.*)/,
        chunks: 'initial',
        priority: 30,
        reuseExistingChunk: true,
      },
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial',
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  });
},
```


几个心得：

1. `vendors` 的 `chunks` 不能设置为 `all`，否则会把非入口页面的三方库一起打包了。比如其他页面都是异步加载，它们的 `js` 应该单独打包，而不是都放在入口的 `vendors` 中。


```js
 vendors: {
  name: 'chunk-vendors',
  test: /[\\/]node_modules[\\/]/,
  priority: -10,
  chunks: 'initial',
  reuseExistingChunk: true,
},
```

2. `maxInitialRequests` 表示入口的最大并行请求数，它应该设置较大的数值，默认是3，当你拆出来的 `chunks` 比较多，这个数字根本不够用，造成的结果就是设置的 `cacheGroups` 不生效。


效果：

通过 `splitCHunks` 的拆分，一些内容不变的包的 `hash` 不会变，从而充分利用了缓存。不过这一点并不能通过 `lighthouse` 得分进行量化，还需要结合实际观察。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_6762ea38e9be77e2d7.png" width="600" />

参考：

1. [webpack中的optimization配置详解（splitChunks）](https://juejin.cn/post/7052882701187022856)
2. [浅析 Webpack SplitChunks](https://juejin.cn/post/7324384460136022026)
3. [关于Vue-cli3.0 的配置。pages.chunks的参数的意义](https://segmentfault.com/q/1010000016925412)
4. [html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)
5. [Webpack SpiltChunks 文档](https://v4.webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
6. [记一次 vue-cli chunkname 问题排查](https://gemicat.github.io/webpack/2019/08/18/vue_cli_chunkname-webpack/)
7. [webpack中hash，chunkhash，contenthash有什么区别](https://zhuanlan.zhihu.com/p/416294253)
8. [webpack 中，filename 和 chunkFilename 的区别是什么？](https://blog.csdn.net/yexudengzhidao/article/details/123331759)
