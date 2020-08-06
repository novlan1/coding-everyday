### 1. babel工作流

```rust
输入字符串 -> @babel/parser parser -> AST -> transformer[s] -> AST -> @babel/generator -> 输出字符串
```

**AST**

```csharp
抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。
和抽象语法树相对的是具体语法树（concrete syntaxtree），通常称作分析树（parse tree）。
一般的，在源代码的翻译和编译过程中，语法分析器创建出分析树。一旦AST被创建出来，在后续的处理过程中，比如语义分析阶段，会添加一些信息。
```

[AST示例](http://esprima.org/demo/parse.html)


Babel 大概分为三大部分:

1. 解析: 将代码(其实就是字符串)转换成 AST( 抽象语法树)
2. 转换: 访问 AST 的节点进行变换操作生成新的 AST
3. 生成: 以新的 AST 为基础生成代码


文本 ---> AST 的过程中有两个关键步骤:

1. 词法分析: 将代码(字符串)分割为 token 流，即语法单元成的数组
2. 语法分析: 分析 token 流(上面生成的数组)并生成 AST


**词法分析(Tokenizer -- 词法分析器)**
要做词法分析,首先我们需要明白在 JavaScript 中哪些属于语法单元

- 数字：JavaScript 中的科学记数法以及普通数组都属于语法单元.
- 括号：`()`只要出现,不管任何意义都算是语法单元
- 标识符：连续字符,常见的有变量,常量(例如: null true)，关键字(if break)等等
- 运算符：`+、-、*、/`等等
- 当然还有注释,中括号等
>在我们 parser 的过程中,应该换一个角度看待代码,我们平时工作用的代码.本质是就是字符串或者一段文本,它没有任何意义,是 JavaScript 引擎赋予了它意义,所以我们在解析过程中代码只是一段字符串.


**语法分析**
语法分析要比词法分析复杂得多

**如何转换代码?**
在 Babel 中我们使用者最常使用的地方就是代码转换，大家常用的 Babel 插件就是定义代码转换规则而生的，而代码解析和生成这一头一尾都主要是 Babel 负责。


前端可以利用编译原理相关的东西还有很多，除了我们常见的es6转换工具 babel，代码检测的 eslint等等。

### 2. Toolings

1. `@babel/parser` 将源代码解析成 AST。
2. `@babel/generator` 将AST解码生 js代码。
3. `@babel/core` 包括了整个babel工作流，也就是说在@babel/core里面我们会使用到`@babel/parser`、`transformer[s]`、以及`@babel/generator`。
4. `@babel/code-frame` 用于生成错误信息并且打印出错误原因和错误行数。（其实就是个console工具类）
5. `@babel/helpers` 也是工具类，提供了一些内置的函数实现，主要用于babel插件的开发。
6. `@babel/runtime` 也是工具类，但是是为了babel编译时提供一些基础工具库。作用于`transformer[s]`阶段，当然这是一个工具库，如果要使用这个工具库，还需要引入`@babel/plugin-transform-runtime`，它才是`transformer[s]`阶段里面的主角。
7. `@babel/template` 也是工具类，主要用途是为`parser`提供模板引擎，更加快速的转化成AST
8. `@babel/traverse` 也是工具类，主要用途是来便利AST树，也就是在`@babel/generator`过程中生效。
9. `@babel/types` 也是工具类，主要用途是在创建AST的过程中判断各种语法的类型。

通过了解这每一个工具的用途 我们对前面简略的工作流坐下填充。

```dart
@babel/code-frame 为全局错误捕获工具类

@babel/core
├── 输入字符串
├── @babel/parser
│   └── @babel/template
│       └── @babel/types
├── AST
├── transformer[s]
│   └── @babel/helpers
├── AST
├── @babel/generator
│   └── @babel/traverse
```

### 3. Plugins

每一个Plugin处理自己的一种AST Type语法。
 重点讲一下`@babel/plugin-transform-runtime`
 用来解析`@babel/runtime`工具类内的函数
 **core-js**

```json
{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": false, //是否启用corejs https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
      "helpers": true, // 各种辅助函数
      "regenerator": true, // 启用generator 支持async await
      "useESModules": false
    }]
  ]
}
```

[Plugins List](https://babeljs.io/docs/en/plugins)

### 4. Presets

而Presets可能理解起来更为简单，翻译过来是预设的意思，他几乎就是一个`Plugins`数组和配置的集合。

`@babel/preset-env` 重点讲一下，他是以前es2015、es2016和es2017的集合。需要注意的是`@babel/preset-env`不支持所有在stage-x的plugin。[browserslist](https://github.com/browserslist/browserslist) 会和`caniuse`数据结合来判断当前语法是否需要转换。target属性完全按照 browserslist 规则实现。

```js
{
  "presets": [
    [
      "env",
      {
        "targets": { // 目标环境
          "browsers": [ // 浏览器
            "last 2 versions",
            "ie >= 10"
          ],
          "node": "current" // node
        },
        "modules": true,  // 是否转译module syntax，默认是 commonjs
        "debug": true, // 是否输出启用的plugins列表
        "spec": false, // 是否允许more spec compliant，但可能转译出的代码更慢https://babeljs.io/docs/en/babel-preset-env#spec
        "loose": false, // 是否允许生成更简单es5的代码，但可能不那么完全符合ES6语义
        "useBuiltIns": false, // 怎么运用 polyfill"usage" | "entry" | false 测试了一下 usage的包最小
        "include": [], // 总是启用的 plugins
        "exclude": [],  // 强制不启用的 plugins
        "forceAllTransforms": false, // 强制使用所有的plugins，用于只能支持ES5的uglify可以正确压缩代码
        "configPath": string //browserslist的路径
        "ignoreBrowserslistConfig": boolean //是否忽略browserslist的配置
      }
    ]
  ],
}
```

useBuiltIns: 'usage' 实验性

```jsx
/// input
var a = new Promise(); // a.js
var b = new Map(); // b.js
/// output
// a.js
import "core-js/modules/es6.promise";
var a = new Promise();
// b.js
import "core-js/modules/es6.map";
var b = new Map();
```

useBuiltIns: 'entry'

```js
// input
import "@babel/polyfill";
// output
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
```

useBuiltIns: false
 解释为不使用polyfill。
 其他presets列表

```js
stage-0
stage-1
stage-2
stage-3
flow
react
typescript
minify  //比较鸡肋的压缩preset 我也不知道为什么放在presets里面 我觉得他更应该是一个plugin。当然看名字也看的出来babel-preset-minify 这么模块并没有在这次升级中被移到@babel的私有域下。
```
### 5. Polyfills

`@babel/polyfill`和`runtime`的差别

`runtime`提供的其实是一个工具类合集，例如 _extend，是为了减少编译时产生的冗余代码，它不包括所有新的es API比如Set Map Promise等。

而polyfill则是用来提供上述的新的ES API，其中也包括了Array.form Object.assign等新增的原型方法。

使用方法
 https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack

### 6. babel7做的更新

1. babel7的npm包正式更名为@babel/core、@babel/cli等。
2. babel7不在支持Node.js 0.10, 0.12, 4 和 5版本。
3. babel7移除了`@babel/polyfill`内的`polyfills`支持，现在`@babel/polyfill`几乎只是core-js v2的映射。
    https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js
4. babylon现在被重命名为@babel/parser
5. 去除包名上的年份。
6. 将react和flow预设分离。

core-js（https://github.com/zloirock/core-js）



### babel将`ECMAScript 2015+` 版本的代码分为了两种情况处理：

- **语法层**： let、const、class、箭头函数等，这些需要在**构建时进行转译**，是指在语法层面上的转译
- **api方法层**：Promise、includes、map等，这些是在全局或者Object、Array等的原型上新增的方法，它们可以由相应es5的方式重新定义


参考资料：[babel入门到精通](https://www.jianshu.com/p/9aaa99762a52)，[面试官: 聊一聊Babel](https://www.cnblogs.com/duxinyi/p/11576583.html)，[用了babel还需要polyfill吗？](https://segmentfault.com/a/1190000023077637)

