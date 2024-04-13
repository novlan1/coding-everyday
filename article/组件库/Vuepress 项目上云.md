### 文档上云

需要指定 `Vuepress` 配置项 `webpackConfig.output.publicPath`，同时 `base` 维持原状。

```ts
module.exports = {
  base: process.env.PUBLISH_PATH || '/press-ui/',
  configureWebpack: {
    output: {
      publicPath: 'https://image-1251917893.file.myqcloud.com/', 
      // 部署应用包时的基本URL，必须加最后的斜杠
      // 不上云时，需要 `./`，而不是 `/`
    },
  },
}
```

### 示例上云

需要动态修改 `manifest.json`，指定 `h5.publicPath`。
