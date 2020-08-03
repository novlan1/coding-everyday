## webpack 简介

`webpack`是一个前端模块化打包工具，最开始它只能打包 JS 文件，但是随着 webpack 的发展，他还能打包如 CSS、图片等文件。主要由入口，出口，loader，plugins 四个部分。


### webpack 打包方式
用`webpack`打包有三种方式：
1. `global`，全局安装了`webpack`，命令行输入`webpack index.js`
2. `local`  命令：`npx webpack index.js`
3. 配置脚本`scripts`：`webpack`命令: `npm run build webpack`


### `webpack-dev-server`
```
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
````

`webpack-dev-server`是`webpack`官方提供的一个小型`Express`服务器。使用它可以为`webpack`打包生成的资源文件提供web服务

`webpack-dev-server` 主要提供两个功能：
1. 为静态文件提供服务
2. 自动刷新和热替换(HMR)

`webpack--watch` 监听打包的文件，只要打包的文件发生变化，就会重新打包。

`Webpack-dev-server`打包不会产生`dist`目录，而是把dist目录里的东西放到内存里，这样打包速度更快。

借助`webpack-dev-server`发送`ajax`请求的原因，`ajax`只能通过`http`协议，直接打开`html`是`file`协议。 开启一个web服务器就可以了，`localhost:8080`是一个网址，可以发送`ajax`请求。

参数含义：
- `--inline` 热更新实现的方式，此方式会将`webpack-dev-server`客户端加入到webpack入口文件的配置中。还有一个 `--iframe` 不推荐的方式。
- `--progress` 是否显示在编译时候的进度条，一般都会有，看着编译的进度，体验好一些。
- `--config XXXX.js` 通过这个参数指定一个新的配置文件。这里指定了 `build/webpack.dev.conf.js`

##### 配置文件

`Webpack.config.js`中添加`devServer`配置项：

- `contentBase` 告诉服务器从哪里提供内容，最好是绝对路径；
- `proxy`添加跨域代理；
- `open: true`,自动打开浏览器；
- `port`端口；
- `hotOnly`即使浏览器`HMR`不生效，也不自动刷新的功能；
- `hot: true`，开启`HMR`

`hot` 和 `hotOnly` 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败。


可以自己写一个`server.js`, 用`webpackDevMiddleware`等做个`webpack-dev-server`。


### `HMR` (`Hot Module Replacement`)

块热替换(`HMR` - `Hot Module Replacement`)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。

配置：

1. 在 `Webpack` 的 `devServer` 配置中设置了 `hot` 为 `true`
2. 并且在 `Webpack` 的 plugin 中添加了 `new webpack.HotModuleReplacementPlugin()` 这个插件


Vue 和 React 内置了热更新，并且有`module.hot.accept`功能。

`module.hot.accept`：接受(`accept`)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应。

##### 关于 babel

- `babel-preset-env`将`es6`语法转为`es5`，`babel-loader`只是打通了`babel`和`webpack`
- `babel-transform-runtime`不会污染全局环境


### Tree shaking
- 移除 JavaScript 上下文中的未引用代码(`dead-code`)。
- 只支持`ES module`，即`import`（静态），不支持`require.js`


配置： `webpack.config.js`中添加 `optimization:{ usedExports: true }`，开发环境才需要配置，生产环境无需配置。

- `Package.json`中加上`sideEffects: false`, 用来说明任何模块都可以`tree-shaking`, 这个属性还可以设置数组形式的属性值，数组内的`js`不用`tree-shaking`。
- 一般所有`css`文件都会忽略`tree shaking`，所以可以设置成`”*.css”`


### `production` 和 `development`模式的区分打包
安装`webpack-merge`

```
merge(baseConfig, devConfig)
```
先分后合
- 把`production`配置文件和`development`配置文件中的公共部分拿出来，然后`merge`输出。

### code splitting
- 能够把代码分离到不同的 `bundle` 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级。
- 拆分业务代码和非业务代码，当页面业务逻辑发生变化时，只要加载`main.js`即可

`Webpack`中实现代码分割的两种方式

1. 同步代码：只需要在`webpack.base.js`中做`optimization`的配置即可
2. 异步代码(`import`)：无需任何配置，会自动进行代码分割，放置到新的文件中。

```js
optimization:{
  splitChunks:{
    chunks: 'all'
  }
},
```

### `SplitChunksPlugin`配置参数

参数：
```
chunks: async 只有异步代码可以实现代码分割，all为异步、同步都代码分割（但是需要cacheGroups
        的vendors配置好），initial对同步代码进行代码分割
minSize   包大小超过某值时，才对其进行打包
maxSize   包大小超过某值时，尝试对其二次分割
minChunks: 1,   打包以后的chunk对一个模块使用多少次时才对其进行代码分割，默认1
maxAsyncRequests: 5,   超过5个不再进行代码分割
maxIntialRequests: 3,   入口文件引入其他库，超过3个时不再进行代码分割
automaticNameDelimiter: ‘~’,   波浪线连接
name:true,   让cacheGroups的名字有效
cacheGroups  决定分割出来的代码放到哪个文件里去
priority   优先级，决定打包后的文件起什么名字、放到哪
```

### CSS文件的代码分割`mini-css-extract-plugin / OptimizeCSSAssetsPlugin`

1. 代码分割：`mini-css-extract-plugin`
将线上css单独拿出来，而不是放在js中
```js
output: {
  filename: '[name].js',
  chunkFileName: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, '../bundle')
}
```

一个包（`css`或`js`）如果被页面直接引用，就会走`filename`，否则会走`chunkFilename`

2. 合并压缩css： `OptimizeCSSAssetsPlugin`

### `Shimming`

一些第三方的库(`library`)可能会引用一些全局依赖（例如`jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是`shimming`发挥作用的地方

使用`webpack.ProvidePlugin({})`

```js
plugins: [
  new webpack.ProvidePlugin({
    _: 'lodash'
  })
]
```

### webpack性能优化
1. `plugin`尽可能精简并确保可靠
2. `loader`少用

### Vue 和 React 中的 Webpack 区别
- Vue-cli 脚手架自己封装了 webpack 的API，通过改`vue.config.js`配置项间接改 webpack 的配置
- React 脚手架用的是原封不动的 webpack



