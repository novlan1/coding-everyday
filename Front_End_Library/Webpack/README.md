- [1. webpack 简介](#1-webpack-简介)
  - [1.1. webpack 打包方式](#11-webpack-打包方式)
  - [1.2. `webpack-dev-server`](#12-webpack-dev-server)
    - [1.2.1. 配置文件](#121-配置文件)
  - [1.3. `HMR` (`Hot Module Replacement`)](#13-hmr-hot-module-replacement)
    - [1.3.1. 关于 babel](#131-关于-babel)
  - [1.4. Tree shaking](#14-tree-shaking)
  - [1.5. `production` 和 `development`模式的区分打包](#15-production-和-development模式的区分打包)
  - [1.6. code splitting](#16-code-splitting)
  - [1.7. `SplitChunksPlugin`配置参数](#17-splitchunksplugin配置参数)
  - [1.8. CSS文件的代码分割`mini-css-extract-plugin / OptimizeCSSAssetsPlugin`](#18-css文件的代码分割mini-css-extract-plugin--optimizecssassetsplugin)
  - [1.9. `Shimming`](#19-shimming)
  - [1.10. webpack性能优化](#110-webpack性能优化)
  - [1.11. Vue 和 React 中的 Webpack 区别](#111-vue-和-react-中的-webpack-区别)
  - [1.12. webpack工作流程](#112-webpack工作流程)
  - [1.13. Tree Shaking 原理以及和 dead code elimination（DCE）的区别](#113-tree-shaking-原理以及和-dead-code-eliminationdce的区别)
    - [1.13.1. Dead Code 一般具有以下几个特征](#1131-dead-code-一般具有以下几个特征)
    - [1.13.2. Tree Shaking](#1132-tree-shaking)
  - [1.14. `module`, `chunk`, `bundle` 之间的关系](#114-module-chunk-bundle-之间的关系)
  - [1.15. webpack 流程](#115-webpack-流程)
  - [如何利用webpack来优化前端性能？（提高性能和体验）](#如何利用webpack来优化前端性能提高性能和体验)
  - [如何提高webpack的构建速度？](#如何提高webpack的构建速度)
  - [怎么配置单页应用？怎么配置多页应用？](#怎么配置单页应用怎么配置多页应用)

## 1. webpack 简介

`webpack`是一个前端模块化打包工具，最开始它只能打包 JS 文件，但是随着 webpack 的发展，他还能打包如 CSS、图片等文件。主要由入口，出口，loader，plugins 四个部分。


### 1.1. webpack 打包方式
用`webpack`打包有三种方式：
1. `global`，全局安装了`webpack`，命令行输入`webpack index.js`
2. `local`  命令：`npx webpack index.js`
3. 配置脚本`scripts`：`webpack`命令: `npm run build webpack`


### 1.2. `webpack-dev-server`
```
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```

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

#### 1.2.1. 配置文件

`Webpack.config.js`中添加`devServer`配置项：

- `contentBase` 告诉服务器从哪里提供内容，最好是绝对路径；
- `proxy`添加跨域代理；
- `open: true`,自动打开浏览器；
- `port`端口；
- `hotOnly`即使浏览器`HMR`不生效，也不自动刷新的功能；
- `hot: true`，开启`HMR`

`hot` 和 `hotOnly` 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败。


可以自己写一个`server.js`, 用`webpackDevMiddleware`等做个`webpack-dev-server`。


### 1.3. `HMR` (`Hot Module Replacement`)

块热替换(`HMR` - `Hot Module Replacement`)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。

配置：

1. 在 `Webpack` 的 `devServer` 配置中设置了 `hot` 为 `true`
2. 并且在 `Webpack` 的 plugin 中添加了 `new webpack.HotModuleReplacementPlugin()` 这个插件


Vue 和 React 内置了热更新，并且有`module.hot.accept`功能。

`module.hot.accept`：接受(`accept`)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应。

#### 1.3.1. 关于 babel

- `babel-preset-env`将`es6`语法转为`es5`，`babel-loader`只是打通了`babel`和`webpack`
- `babel-transform-runtime`不会污染全局环境


### 1.4. Tree shaking
- 移除 JavaScript 上下文中的未引用代码(`dead-code`)。
- 只支持`ES module`，即`import`（静态），不支持`require.js`


配置： `webpack.config.js`中添加 `optimization:{ usedExports: true }`，开发环境才需要配置，生产环境无需配置。

- `Package.json`中加上`sideEffects: false`, 用来说明任何模块都可以`tree-shaking`, 这个属性还可以设置数组形式的属性值，数组内的`js`不用`tree-shaking`。
- 一般所有`css`文件都会忽略`tree shaking`，所以可以设置成`”*.css”`


### 1.5. `production` 和 `development`模式的区分打包
安装`webpack-merge`

```
merge(baseConfig, devConfig)
```
先分后合
- 把`production`配置文件和`development`配置文件中的公共部分拿出来，然后`merge`输出。

### 1.6. code splitting
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

### 1.7. `SplitChunksPlugin`配置参数

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

### 1.8. CSS文件的代码分割`mini-css-extract-plugin / OptimizeCSSAssetsPlugin`

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

### 1.9. `Shimming`

一些第三方的库(`library`)可能会引用一些全局依赖（例如`jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是`shimming`发挥作用的地方

使用`webpack.ProvidePlugin({})`

```js
plugins: [
  new webpack.ProvidePlugin({
    _: 'lodash'
  })
]
```

### 1.10. webpack性能优化
1. `plugin`尽可能精简并确保可靠
2. `loader`少用

### 1.11. Vue 和 React 中的 Webpack 区别
- Vue-cli 脚手架自己封装了 webpack 的API，通过改`vue.config.js`配置项间接改 webpack 的配置
- React 脚手架用的是原封不动的 webpack



### 1.12. webpack工作流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译。利用babel转为Ast->遍历Ast->调用ImportDeclaration。找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### 1.13. Tree Shaking 原理以及和 dead code elimination（DCE）的区别

#### 1.13.1. Dead Code 一般具有以下几个特征

- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

传统的编译型语言都是由编译器去除掉DC，而js是通过uglify插件去除

#### 1.13.2. Tree Shaking

es6模块特点

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的

ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。

所谓静态分析就是不执行代码，从字面量上对代码进行分析，**ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化**。

正是基于这个基础上，才使得 tree-shaking 成为可能，这也是为什么 rollup 和 webpack 2 都要用 ES6 module syntax 才能 tree-shaking。

- `rollup` 只处理函数和顶层的 `import/export` 变量，不能把没用到的类的方法消除掉
- `javascript` 动态语言的特性使得静态分析比较困难

参考资料：
1. [面试准备](https://segmentfault.com/a/1190000022037771/)

### 1.14. `module`, `chunk`, `bundle` 之间的关系
1. `module` 模块：代码模块，由 `import`, `require` 等模块规范导出的代码片段。
2. `chunk` 代码块：由多个 `module` 组成，通常情况下 `bundle` 是由 `chunk` 对应生成。
3. `bundle`：由多个 `module` 组成，通常跟 `chunk` 对应，包含已经过加载和编译的最终生成的源文件。

### 1.15. webpack 流程

从启动构建到输出结果一系列过程：

1. 初始化参数：解析`webpack`配置参数，合并`shell`传入和`webpack.config.js`文件配置的参数，形成最后的配置结果。

2. 开始编译：上一步得到的参数初始化`compiler`对象，注册所有配置的插件，插件监听`webpack`构建生命周期的事件节点，做出相应的反应，执行对象的 `run` 方法开始执行编译。
3. 确定入口：从配置的`entry`入口，开始解析文件构建AST语法树，找出依赖，递归下去。
4. 编译模块：递归中根据文件类型和`loader`配置，调用所有配置的`loader`对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据`entry`配置生成代码块`chunk`。
6. 输出完成：输出所有的`chunk`到文件系统。

注意：在构建生命周期中有一系列插件在做合适的时机做合适事情，比如UglifyPlugin会在loader转换递归完对结果使用UglifyJs压缩覆盖之前的结果。


### 如何利用webpack来优化前端性能？（提高性能和体验）

用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

1. 压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用`webpack`的`UglifyJsPlugin`和`ParallelUglifyPlugin`来压缩JS文件， 利用`cssnano`（`css-loader?minimize`）来压缩`css`。使用`webpack4`，打包项目使用`production`模式，会自动开启代码压缩。

2. 利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用`webpack`对于`output`参数和各`loader`的`publicPath`参数来修改资源路径

3. 删除死代码（`Tree Shaking`）。将代码中永远不会走到的片段删除掉。可以通过在启动`webpack`时追加参数`--optimize-minimize`来实现或者使用`es6`模块开启删除死代码。

4. 优化图片，对于小图可以使用 `base64` 的方式写入文件中

5. 按照路由拆分代码，实现按需加载，提取公共代码。

6. 给打包出来的文件名添加哈希，实现浏览器缓存文件

 

### 如何提高webpack的构建速度？

（1）多入口的情况下，使用`commonsChunkPlugin`来提取公共代码；

（2）通过`externals`配置来提取常用库；

（3）使用`happypack`实现多线程加速编译；

（4）使用`webpack-uglify-parallel`来提升`uglifyPlugin`的压缩速度。原理上`webpack-uglify-parallel`采用多核并行压缩来提升压缩速度；

（5）使用`tree-shaking`和`scope hoisting`来剔除多余代码。

 

### 怎么配置单页应用？怎么配置多页应用？

1. 单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可。

2. 多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。

 参考资料：[浅析webpack的原理](https://www.cnblogs.com/chengxs/p/11022842.html)