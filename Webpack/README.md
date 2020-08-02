### webpack-dev-server 

`npm run dev`即：

```
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
````


`webpack-dev-server`是`webpack`官方提供的一个小型`Express`服务器。使用它可以为`webpack`打包生成的资源文件提供web服务

`webpack-dev-server` 主要提供两个功能：
1. 为静态文件提供服务
2. 自动刷新和热替换(HMR)

参数含义：
- `--inline` 热更新实现的方式，此方式会将`webpack-dev-server`客户端加入到webpack入口文件的配置中。还有一个 `--iframe` 不推荐的方式。
- `--progress` 是否显示在编译时候的进度条，一般都会有，看着编译的进度，体验好一些。
- `--config XXXX.js` 通过这个参数指定一个新的配置文件。这里指定了 `build/webpack.dev.conf.js`


### 热替换
- 当我们使用`webpack-dev-server`的自动刷新功能时，浏览器会整页刷新。
- 而热替换的区别就在于，当前端代码变动时，无需刷新整个页面，只把变化的部分替换掉。
- 配置的关键在于将`webpack/hot/dev-server`文件加入到`webpack`所有入口文件中。


打包文件`webpack <name1> <name2>`，如`webpack hello.js hello.bundle.js` 
webpack跟要打包的文件的名称，再跟打包完以后的文件的名称


### 把webpack指令写入脚本中
```
"webpack": "webpack --config webpack.config.js  --progress --display-modules --colors --display-reason"
```
```
--progress 显示过程 
--colors 有颜色的  
--display modules 显示模块 
--display reason显示原因
```

Webpack可以解析任何模块导入导出语法：`es6、require.js、AMD 、CMD`

`node`和`webpack`版本越新，打包速度越快




`npx webpack index.js` 命令
`index.js`是打包入口文件，`npx` 会从当前node包目录下找`webpack`，而不是全局


在`package.json`中的`scripts`添加`webapck`命令时，不需要加`npx`，因为它会现在工程中找`webpack`，找不到才再全局找。

```
webpack --config webpack.config.js
```
`webpack.config.js`默认名字改了的话 用`—config`指定


### webpack打包方式
用`webpack`打包有三种方式：
1. `global`，全局安装了`webpack`，命令行输入`webpack index.js`
2. `local`  命令：`npx webpack index.js`
3. 配置脚本`scripts`：`webpack`命令: `npm run build-> webpack`


安装`webpack-cli`作用是可以使用户在命令行中使用`webpack`命令




### `File-loader`和`url-loader`

`loader`让 `webpack` 能够去处理那些非`JavaScript`文件（`webpack` 自身只理解 `JavaScript`）。


- `file-loader`底层原理：将图片文件移动到dist打包目录中，然后返回新的地址和名称
- `File-loader`中添加`options`对象，`name`属性可设置`[name]_[hash].[ext]`，表示以原始文件名`_hash`值命名，默认是`hash`值
- 还可以设置`outputPath`属性，指定文件地址，如`’images/’`，将图片放到文件夹中


`url-loader`，图片以`base64`形式打包到js中
- 好处是省了一次`http`请求
- 问题是如果图片特别大，打包生成的js文件就会特别大，白屏时间太长
- 最佳实践是只用它打包小的图片，比如`1kb`、`2kb`的。具体设置是在`options`中加`limit`属性，属性值可以为`2048(2kb)`



### `css-loader`/ `style-loader` / `sass-loader` / `postcss-loader`

- 加载 css 文件需要2个 loader，`css-loader`和`style-loader`
- `css-loader`分析几个 css 文件之间的关系，比如用`import`联系，并将这些 css 文件合并成一个 css 文件，`style-loader`将 css 挂载到页面的 `head` 的 `style` 标签中
- 如果是 sass 文件，需要安装`sass-loader`和`node-sass` 两个包，并在 css 的 use 中添加`sass-loader`
- `loader`的执行顺序是**从下到上、从右到左**，所以先用`sass-loader`解析 sass 文件，再给到`css-loader`合并，再给`style-loader`挂载到`head`的`style`中


### 自动添加厂商前缀(如`webkit`)的`loader`，`postcss-loader`，需要安装`autoprefixer`插件

打包`svg/eot/ttf`等字体文件等，比如用`iconfont`字体文件，需要`file-loader`


- `css-loader`中的`options`添加属性`importLoaders`，属性值为`2`，保证在`scss`文件中引入的`scss`文件也会从下面`postcss-loader`和`sass-loader`依次执行，而不会直接走`css-loader`
- 为`css-loader`的`options`中再添加属性`modules`，属性值为`true`，说明是开启 css 的模块化打包。




### `Plugins(HtmlWebpackPlugin / cleanWebpackPlugin)`

- `plugins`很像生命周期函数，可以在`webpack`运行到某个时刻的时候，帮你做一些事情。
- 使用方法：`plugins: [new HtmlwebpackPlugin()]`
- 插件需要实例化一下



- `HtmlWebpackPlugin`可以在dist目录中自动生成`index.html`, 并自动引用打包生成的`bundle.js`
- `HtmlWebpackPlugin`可以使用模板，`template:’src/index.html’`



- `cleanWebpackPlugin`帮助我们在打包时删除上一次打包的所有文件，使用方法是`new CleanWebpackPlugin( [‘dist’])`，`dist`是打包目录
- `cleanWebpackplugin`会在打包之前运行，`htmlWebpackPlugin`会在打包之后运行


现在已经这么用了：
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
```


### `Entry`和`Output`

- 入口起点(`entry point`)指示`webpack` 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
- `output`属性告诉 `webpack`在哪里输出它所创建的 `bundles`，以及如何命名这些文件，默认值为`./dist`


如果配置创建了多个单独的 `"chunk"`（例如，使用多个入口起点），则应该在出口文件`filename`中使用占位符(`substitutions`)来确保每个文件具有唯一的名称。如`filename: [name].js`

- `Output`添加配置项`outputPath`，可以添加`cdn`前缀等，如`publickPath: ‘http://cdn.com.cn/[hash]’`


### sourceMap

`sourceMap`是一个映射关系，打包文件对应的原始文件的位置，作用是`debug`时查看出错的原始文件位置，而不是打包后的文件


配置方法：在`webpack.config.js`中添加`devtool: ‘source-map’`，会生成`map`映射文件

- `Inline-source-map`，不会生成map文件，而是以`base64`形式在`main.js`中添加映射关系。
- `Cheap-source-map`， 只映射行数，不映射列数，提高打包速度。
- `Cheap-module-source-map`，不仅管业务代码，还管第三方模块、loader代码是否错误。
- `Eval`，每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会非常快地构建。不能正确显示行数（大文件）


最佳实践：
- 开发环境：`cheap-module-eval-source-map`，提示错误比较全，打包速度比较快
- 生产环境：`cheap-module-source-map`, 一般不设置



### `Webpack-dev-server`
`webpack--watch` 监听打包的文件，只要打包的文件发生变化，就会重新打包


借助`webpack-dev-server`发送`ajax`请求的原因，`ajax`只能通过`http`协议，直接打开`html`是`file`协议。 开启一个web服务器就可以了，`localhost:8080`是一个网址，可以发送`ajax`请求

`Webpack.config.js`中添加`devServer`配置项，`contentBase` 告诉服务器从哪里提供内容，最好是绝对路径, `proxy`添加跨域代理, `open: true`,自动打开浏览器，`port`端口，`hotOnly`即使浏览器`HMR`不生效，也不自动刷新的功能，`hot: true`，开启`HMR`

`hot` 和 `hotOnly` 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败


可以自己写一个`server.js`, 用`webpackDevMiddleware`等做个`webpack-dev-server`，


两种使用webpack的方式：
1. 在node中直接使用webpack
2. 在命令行里使用webpack


`Webpack-dev-server`打包不会产生`dist`目录，而是把dist目录里的东西放到内存里，这样打包速度更快



`HMR Hot Module Replacement`

块热替换(`HMR` - `Hot Module Replacement`)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。

配置：
在 `Webpack` 的 `devServer` 配置中设置了 `hot` 为 `true`，而且在 `Webpack` 的 plugin 中添加了 `new webpack.HotModuleReplacementPlugin()` 这个插件



Vue 和 React 内置了热更新，并且有`module.hot.accept`功能，`css-loader`里面也写了


`module.hot.accept`
- 接受(`accept`)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应。


`Babel-preset-env`将`es6`语法转为`es5`，`babel-loader`只是打通了`babel`和`webpack`
`Babel-transform-runtime`不会污染全局环境


### Tree shaking
- 移除 JavaScript 上下文中的未引用代码(`dead-code`)。
- 只支持`ES module`，即`import`（静态），不支持`require.js`


配置： `webpack.config.js`中添加 `optimization:{ usedExports: true }`，开发环境才需要配置，生产环境无需配置。

`Package.json`中加上`sideEffects: false`, 用来说明任何模块都可以`tree-shaking`, 这个属性还可以设置数组形式的属性值，数组内的`js`不用`tree-shaking`，一般所有`css`文件都会忽略`tree shaking`，所以可以设置成`”*.css”`



`Production`和`development`模式的区分打包
安装`Webpack-merge`

```
Merge(baseConfig, devConfig)
```
先分后合
- 把`production`配置文件和`development`配置文件中的公共部分拿出来，然后`merge`输出



### Code splitting
- 能够把代码分离到不同的 `bundle` 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级。
- 拆分业务代码和非业务代码，当页面业务逻辑发生变化时，只要加载`main.js`即可


`Webpack`中实现代码分割的两种方式
1. 同步代码：只需要在`webpack.base.js`中做`optimization`的配置即可
2. 异步代码(`import`)：无需任何配置，会自动进行代码分割，放置到新的文件中。
```
optimization:{
  splitChunks:{
    chunks: 'all'
  }
},
```


`SplitChunksPlugin`配置参数
官网默认配置：
```
import(/* webpackChunkName: "lodash" */ 'lodash').then()
```
参数：
chunks: async 只有异步代码可以实现代码分割，all为异步、同步都代码分割（但是需要cacheGroups的vendors配置好），initial对同步代码进行代码分割


```
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

### 懒加载

- 按需加载，在路由中用处广
- `Chunk`就是打包后的一个个`js`文件


打包分析，`Preloading`， `prefetching`


`Analyse`在`github`地址：`https://github.com/webpack/analyse`
分析`stats.json`文件


`Ctrl+Shift+P`搜`coverage`查看代码利用率

多写异步加载逻辑代码，能够减少首屏时间，因此`webpack`默认`splitChunks`的`chunks`是`async`，而不是all，即异步代码能提高性能，而同步代码只能增加缓存（第二次访问）

懒加载可能会损害用户体验，因此使用`Prefetch`在空余时间加载懒加载模块

- `Prefetch`等到核心业务代码加载完之后再加载可能用到的
- `Preload`核心业务代码和异步代码一起加载
- 缓存提高的性能十分有限，更多的考虑这种懒加载与预加载


CSS文件的代码分割`mini-css-extract-plugin / OptimizeCSSAssetsPlugin`

代码分割：`mini-css-extract-plugin`
- 将线上css单独拿出来，而不是放在js中


一个包（`css`或`js`）如果被页面直接引用，就会走`filename`，否则会走`chunkFilename`


合并压缩css： `OptimizeCSSAssetsPlugin`


Caching 缓存 (`contenthash`)
`contenthash` 文件内容不变，`contenthash`就不变，作为文件名，可以缓存，用在生产环境中

 


### `Shimming`
一些第三方的库(`library`)可能会引用一些全局依赖（例如`jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是`shimming`发挥作用的地方

使用`webpack.ProvidePlugin({})`


让每一个模块中的`this`，不再指向模块，而是`window`，可以用一个`loader: imports-loader`

 

环境变量
原来的package.json


用了环境变量，在webpack.base.js中作判断逻辑，而不是在每个文件中分别merge



现在的webpack.base.js：


现在的package.json：


Library打包

 

发布库的时候，在`package.json`中把`main`改成打包后的文件

1. 先在`npm`官网注册用户
2. `npm adduser` 填写账号 密码
3. `npm publish`

`PWA`的打包配置
安装`Workboxplugin ( workbox-webpack-plugin)`


`Webpack.prod.js`中调用一下，使用下它的`generateSW`方法

业务代码（这是最简单的例子）：




### TypeScript的打包配置

```
npm install ts-loader typescript –save
```
再额外创建一个`tsconfig.json`文件：


在`typescript中`使用`lodash`，安装`@types/lodash`库（同理，使用`jquery`，安装`@types/jquery`）
引入的时候不能`import _ from lodash`
而是`import * as _ from lodash`
这样就会智能提示错误（类型检查）



解决单页面应用路由问题
- 使用`react-router-dom`的时候访问`/list`应该去找前端的组件，而不是找后端的`list`，这样设置： 
- `historyApiFallback: true`（在`devServer`中），设置成`true`其实就是`from: /\*/`
除了将其设置为`true`外，还可以设置的更具体





`Eslint`在webpack中的配置
```
npm install eslint –save-dev
npx eslint –init
```
- 这一种是命令行提示代码有问题，另一种是在编辑器中安装eslint插件，会结合配置文件(`.eslintrc.js`)，直接在代码文件中提示。
- 还有一种是将`eslint`和`webpack`结合起来，安装`eslint-loader`


`devServer`中配置`overlay: true`, 会弹出错误（包括`eslint`的错误）


### webpack性能优化
1. `plugin`尽可能精简并确保可靠
2. `loader`少用
3. `resolve`参数合理配置：
- resolve: { extensions: [‘.js’, ‘jsx’]}  和entry同级，作用：导入的时候省略后缀名的话，会自动寻找js和jsx结尾的文件。不建议加上.css或者.jpg，因为寻找这些文件耗费性能。
- mainfiles: [‘index’, ‘child’], 引入的时候只写文件夹名字，不写文件名字的话，会先尝试找index文件，再查找child文件。
```
- alias: {
child: path.resolve(__dirname, ‘../src/a/b/c/child’) }
```
  引入的时候只写child，会去后面的路径中找，child为别名。


使用`Dllplugin`提高性能
- 新建`webpack.dll.js`对第三方模块单独进行打包

在`webpack.comon.js`中的plugins加上：
```
webpack.dllreferenceplugin({
	manifest: path.resolve(__dirname, ‘../dll/vendors.manifest.json’)
})
```
多页面打包配置

两个入口，

