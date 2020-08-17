## plugins

使用`plugins`让打包变的便捷，可以在 webpack 打包的某时刻帮做一些事情，他很像一个生命周期函数

### 1. html-webpack-plugin

html-webpack-plugin 会在打包结束后，自动生成一个 html 文件,并把打包生成的 js 自动引入到 HTML 中。 可以给这个 html 制定一个模板

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 插件
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
],
```

### 2. [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

帮助打包时先清空 dist 目录

### 3. CommonsChunkPlugin

提取 chunks 之间共享的通用模块

### 4. DllPlugin

为了极大减少构建时间，进行分离打包


## 自定义 plugin

`webpack` 插件由以下组成：

1. 一个 `JavaScript` 命名函数。
2. 在插件函数的 `prototype` 上定义一个 apply 方法。
3. 指定一个绑定到 `webpack` 自身的事件钩子。
4. 处理 `webpack` 内部实例的特定数据。
5. 功能完成后调用 `webpack` 提供的回调。


### 插件的执行过程

1. 执行 `new BasicPlugin(options)` 初始化一个 `BasicPlugin` 获得其实例。
2. 初始化 `compiler` 对象后，再调用 `basicPlugin.apply(compiler)` 给插件实例传入 `compiler` 对象
3. 获取到 `compiler` 对象后，就可以通过 `compiler.plugin(事件名称, 回调函数)` 监听到 `Webpack` 广播出来的事件，并且可以通过 `compiler` 对象去操作 `Webpack`。

一个简单的插件结构如下：
```js
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;
```

然后，要安装这个插件，只需要在你的 webpack 配置的 plugin 数组中添加一个实例：
```js
var HelloWorldPlugin = require('hello-world');

var webpackConfig = {
  // ... 这里是其他配置 ...
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
};
```

### `Compiler` 和 `Compilation`
在开发 `Plugin` 时最常用的两个对象就是 `Compiler` 和 `Compilation`，它们是 `Plugin` 和 `Webpack` 之间的桥梁。 `Compiler` 和 `Compilation` 的含义如下：

1. `Compiler` 对象包含了 `Webpack` 环境所有的的配置信息，包含 `options`，`loaders`，`plugins` 这些信息，这个对象在 `Webpack` 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
2. `Compilation` 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 `Compilation` 将被创建。`Compilation` 对象也提供了很多事件回调供插件做扩展。通过 `Compilation` 也能读取到 `Compiler` 对象。

`Compiler` 和 `Compilation` 的区别在于：`Compiler `代表了整个 `Webpack` 从启动到关闭的生命周期，而 `Compilation` 只是代表了一次新的编译。

参考资料：
1. [webpack原理（二）自定义plugin](https://blog.csdn.net/qq_36228442/article/details/100037165)
2. [编写一个插件](https://www.webpackjs.com/contribute/writing-a-plugin/#%E5%88%9B%E5%BB%BA%E6%8F%92%E4%BB%B6)