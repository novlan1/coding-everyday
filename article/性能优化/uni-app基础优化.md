`manifest.json` 中可以设置 `h5.optimization.treeShaking.enable` 为 `true`，这是 `uni-app` 自带的优化。

`babel.config.js` 中在 `h5` 下设置 `modules` 为 `auto`，不要都是 `commonjs`。

```js
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // 不要设置成 modules: 'commonjs',
        modules: process.env.UNI_PLATFORM === 'h5' ? 'auto' : 'commonjs',
        useBuiltIns: process.env.UNI_PLATFORM === 'h5' ? 'usage' : 'entry',
      },
    ],
  ],
  plugins,
};
```

如果不设置成 `auto` 的话，`() => import('')` 这种动态加载的包会被打包到首包中。

之前的 `chunk-vendors` 大小 `279.41kb`，光 `vant` 就有 `40.67kb`。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_1516149616dcabf6be.png" width="600"/>

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_2260a3ed5f00bc8e90.png" width="600"/>

`babel-config.js` 的 `modules` 配置改成 `auto` 后，`chunk-vendors` 大小降为 `163.75kb`。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_5b5f07cdfcd857dfe5.png" width="600"/>
