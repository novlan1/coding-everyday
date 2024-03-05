### 现状

目前性能比较差，lighthouse 得分只有63。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_eb8b3c6b49e47273e1.png" width="500">

### SplitChunks 优化

uni-app 源码中，`packages/vue-cli-plugin-uni/lib/h5/index.js`可以看到`uni-app`给出的`chunk`配置。

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


优化完 `index.html` 的 `chunks`，`lightHouse` 的性能得分从 `63` 上升到 `70` 分。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_cebfda6d0b7f4391f5.png" width="500">

参考：

1. [webpack中的optimization配置详解（splitChunks）](https://juejin.cn/post/7052882701187022856)
2. [浅析 Webpack SplitChunks](https://juejin.cn/post/7324384460136022026)
3. [关于Vue-cli3.0 的配置。pages.chunks的参数的意义](https://segmentfault.com/q/1010000016925412)
4. [html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)
5. [Webpack SpiltChunks 文档](https://v4.webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)

### FCP 优化

> First Contentful Paint 标记了绘制出首个文本或首张图片的时间。


项目 FCP 耗时长，之前为 `4.5` 秒左右。可以通过在 `index.html` 中加个 `loading`，并在 `DOMContentLoaded` 事件发生时，去掉此`DOM`。

大致代码如下：

```js
<script>
  !function () {
    var i = document.createElement("div");
    i.innerHTML = '<style>.pre-loading{}</style><div class="pre-loading"></div>';
    document.body.appendChild(i);
    document.addEventListener("DOMContentLoaded", (function () {
      setTimeout((function () {
        document.body.removeChild(i)
      }))
    }))
  }()
</script>
```

有几个注意点：

1. 不要放到所有非异步脚本的后面，否则会等前面的脚本加载完才执行，太慢了
2. 不要用 `loading` 图片，因为图片加载也需要时间，可以直接用样式控制

### LCP 优化

可优化的点比较多，这里用了“消除资源加载延迟”，也就是让 LCP 的资源与网页的第一个资源同时启动。


参考：

[https://web.dev](https://web.dev/articles/optimize-lcp?hl=zh-cn#understand-lcp)