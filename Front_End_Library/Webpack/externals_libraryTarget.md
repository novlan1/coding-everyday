- [externals 和 libraryTarget](#externals-和-librarytarget)
  - [外部扩展(externals)](#外部扩展externals)
  - [libraryTarget](#librarytarget)
  - [externals 和 libraryTarget 的关系](#externals-和-librarytarget-的关系)


## externals 和 libraryTarget
### 外部扩展(externals)

`externals` 配置选项提供了「**从输出的 bundle 中排除依赖**」的方法。相反，所创建的 `bundle` 依赖于那些存在于用户环境(`consumer's environment`)中的依赖。此功能通常对 `library` 开发人员来说是最有用的。(写类库)

防止将某些 `import` 的包(`package`)打包到 `bundle` 中，而是在**运行时(runtime)**再去从外部获取这些扩展依赖(`external dependencies`)。

例如，从 `CDN` 引入 `jQuery`，而不是把它打包：

**index.html**

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```
**webpack.config.js**

```js
externals: {
  jquery: 'jQuery'
}
```
这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：
```js
import $ from 'jquery';

$('.my-element').animate(...);
```

具有外部依赖(`external dependency`)的 `bundle` 可以在各种模块上下文(`module context`)中使用，例如 `CommonJS`, `AMD`, 全局变量和 `ES2015` 模块。外部 `library` 可能是以下任何一种形式：

- `root`：可以通过一个全局变量访问 `library`（例如，通过 script 标签）。
- `commonjs`：可以将 `library` 作为一个 CommonJS 模块访问。
- `commonjs2`：和上面的类似，但导出的是 `module.exports.default`.
- `amd`：类似于 `commonjs` ，但使用 AMD 模块系统。

可以接受各种语法，如 `string` 、object、array、function、reg，比如：

```js
// 数组形式
externals: {
  subtract: ['./math', 'subtract']
}

// 对象形式
externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // 指向全局变量
  }
}
```




### libraryTarget

配置如何暴露 `library` 。可以使用下面的选项中的任意一个。注意，此选项与分配给 `output.library` 的值一同使用。

默认值： "var"

1. 暴露为一个变量

这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名。

（1）`libraryTarget: "var" `- （默认值）当 library 加载完成，入口起点的返回值将分配给一个变量：
```js
var MyLibrary = _entry_return_;

// 在一个单独的 script……
MyLibrary.doSomething();
```

> 当使用此选项时，将 `output.library` 设置为空，会因为没有变量导致无法赋值。



（2）`libraryTarget: "assign"` - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。.

```js
MyLibrary = _entry_return_;
```
注意，如果 MyLibrary 在作用域中未在前面代码进行定义，则你的 library 将被设置在全局作用域内。

> 当使用此选项时，将 `output.library` 设置为空，将产生一个破损的输出 bundle。



2. 通过在对象上赋值暴露

这些选项将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 `output.library` 定义）下。

如果 `output.library` 未赋值为一个非空字符串，则默认行为是，将入口起点返回的所有属性都赋值给一个对象（此对象由 `output.libraryTarget` 特定），通过如下代码片段：

```js
(function(e, a) { for(var i in a) e[i] = a[i]; }(${output.libraryTarget}, _entry_return_)
```

注意，不设置 output.library 将导致由入口起点返回的所有属性，都会被赋值给给定的对象；这里并不会检查现有的属性名是否存在。

> libraryTarget 对应的属性值有 "this"、"window"、"global"、"commonjs"。

其中 commonjs 属性，入口起点的返回值将使用 output.library 中定义的值，分配给 `exports` 对象。
```js
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```

3. 模块定义系统

这些选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。

libraryTarget: "commonjs2" - 入口起点的返回值将分配给 `module.exports` 对象。这个名称也意味着模块用于 CommonJS 环境：
```js
module.exports = _entry_return_;

require("MyLibrary").doSomething();
```
> 此外，还可以设置为 amd、umd、jsonp。



### externals 和 libraryTarget 的关系

- libraryTarget 配置**如何暴露 library**。如果不设置 library，那这个 library 就不暴露。就相当于一个**自执行函数**
- `externals` 是决定的是以哪种模式去加载所引入的额外的包
- `libraryTarget` 决定了你的 `library` 运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，`externals` 应该和 `libraryTarget` 保持一致。`library` 运行在浏览器中的，你设置 `externals` 的模式为 `commonjs`，那代码肯定就运行不了了。
- 如果是应用程序开发，一般是运行在浏览器环境 `libraryTarget` 可以不设置，`externals` 默认的模式是 `global`，也就是以全局变量的模式加载所引入外部的库。



参考资料：
1. [wepack externals 文档](https://www.webpackjs.com/configuration/externals/)
2. [wepack libraryTarget 文档](https://www.webpackjs.com/configuration/output/#output-librarytarget)
3. [webpack externals 深入理解](https://segmentfault.com/a/1190000012113011?utm_source=tag-newest)



