### `@babel/preset-env`

`@babel/preset-env`这个包官方说是智能预设，怎么智能了，你**只要给出一个浏览器的版本号，就知道哪些语法要转，哪些语法不要转**。可以有效的**避免把不需要转换的语法也转换了，浪费性能**，浏览器都有这个语法，再加个转换就没必要了。

**`.babelrc`文件**

```js
{
  "presets": ["@babel/preset-env"],
  {
    "targets": {
      "chrome": "58",
      "ie": "11"
    }
  }
}
```

所以官方不建议以这种方式使用预设环境，因为它没有利用针对特定浏览器的功能。

```js
{
  "presets": ["@babel/preset-env"]
}
```

你以为这样就完了吗，然后并不是，重要的是要注意，`@babel/preset-env`不支持`stage-x`插件。与之相比，`stage-x`直接被删了。这是因为 babel 团队认为为这些 “不稳定的草案” 花费精力去更新 preset 相当浪费。



### `@babel/polyfill `

@babel/polyfill 是对 core-js 的封装，引用了 core-js 的内容和生成器（regenerator-runtime)。 v7.4 之后，这个仓库就被废弃了，希望用户自己选择使用哪个兼容库。

换言之，以前：

```javascript
import "@babel/polyfill";
```

需要被替换成

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

不过我不建议这么做。对于绝大部分情况，使用 `@babel/preset-env` + `useBuiltIns: 'usage'` 仍然是最好的选择。



参考资料：[babel 官方文档](https://www.babeljs.cn/docs/babel-preset-env)，[babel需要这样配置](https://www.cnblogs.com/wuxianqiang/p/11339462.html)，[最近折腾 @babel/preset-env 的一些小心得](https://blog.meathill.com/js/some-tips-of-babel-preset-env-config.html)

