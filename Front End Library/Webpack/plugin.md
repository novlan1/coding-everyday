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

#### `Compiler`

1. `Compiler` 继承 `Tapable` 对象，可以广播和监听 `webpack` 事件。
2. `Compiler` 对象是 `webpack` 的编译器，`webpack` 周期中只存在一个 `Compiler` 对象。
3. `Compiler` 对象在 `webpack` 启动时创建实例，`compiler` 实例中包含 `webpack` 的完整配置，包括 `loaders`, `plugins` 信息。


#### `Compilation`

1. `Compilation` 继承 `Tapable` 对象，可以广播和监听 `webpack` 事件。
2. `Compilation` 实例仅代表一次 `webpack` 构建和生成编译资源的的过程。
3. `webpack` 开发模式开启 `watch` 选项，每次检测到入口文件模块变化时，会创建一次新的编译: 生成一次新的编译资源和新的 `compilation` 对象，这个 `compilation` 对象包含了当前编译的`模块资源 module`, `编译生成的资源`，`变化的文件`, `依赖的的状态`



`Compiler` 和 `Compilation` 的区别在于：`Compiler `代表了整个 `Webpack` 从启动到关闭的生命周期，而 `Compilation` 只是代表了一次新的编译。


`Compiler`事件钩子:
|事件|发生时机|传入参数|类型|使用时机|
|---|---|---|---|---|
|run|webpack启动编译流程时|compiler:此时只能获取 compiler.options内容,也就是构建webpack传入的options; callback|异步,异步就是执行后要使用 `callback` 执行一下|
|compilation|生成好了compilation 对象, 可以操作这个compilation对象啦|compilation|同步|此时是一个编译过程，可以编辑|
|make|从entry开始递归分析模块及其依赖的模块，compilation创建这些模块对象,准备对每个模块进行build|compilation|并行||
|emit|把内存里面assets编译好的东西写到磁盘之前|||此时可以添加assets属性来添加写入文件,或者增加修改写入文件的内容|
|done|完成所有编译过程|status|同步|
|failed|编译失败|error|同步|


`Compilation`事件钩子:
|事件 | 发生时机 | 回调参数 |使用 |
| --- |---|---|---|
|normal-module-loader|加载所有模块，还没有依赖被创建| loaderContext, module|可以拿到所有的没有依赖的单独的module|
|seal|编译封闭阶段优化|没有参数||
|optimize-modules|优化编译阶段|modules ,这里拿到module进行处理|插件优化都是基于这里的事件|
|optimize-chunks|chunk优化阶段||可以拿到模块的依赖, loader进行相应的处理|
|additional-assets||callback|异步,可以为compilation对象创建额外的assets ,加入自定义资源|
|optimize-chunk-assets|||优化chunk的assets的事件钩子,这个优化阶段可以改变chunk的assets以达到重新改变资源内容的目。assets 被存储在this.assets中,但是它们并不都是chunk的assets。一个chunk有一个files属性指出这个chunk创建的所有文件。附加的assets被存储在this.additionalChunkAssets中。比如UglifyJsPlugin插件就是在这个钩子里写逻辑|
|optimize-assets|||优化所有的assets的异步事件钩子,在这个阶段可以直接通过this.assets拿到所有的assets ,并进行自定义操作。类似optimize-chunk -assets ,但是这个事件钩子的回调是拿不到chunks的。|


      

      

参考资料：
1. [webpack原理（二）自定义plugin](https://blog.csdn.net/qq_36228442/article/details/100037165)
2. [编写一个插件](https://www.webpackjs.com/contribute/writing-a-plugin/#%E5%88%9B%E5%BB%BA%E6%8F%92%E4%BB%B6)