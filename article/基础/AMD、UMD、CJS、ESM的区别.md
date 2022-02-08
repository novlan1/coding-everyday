
## 不同打包模式的区别
### 1. CJS

`CJS` 是 `CommonJS` 的缩写。经常我们这么使用：

```js
// importing 
const doSomething = require('./doSomething.js'); 

// exporting
module.exports = function doSomething(n) {
  // do something
}
```

- 很多人可以从 Node 中立刻认出 `CJS` 的语法。这是因为 `Node` 就是使用 `CJS` 模块的
- `CJS` 是同步导入模块
- 你可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件 。如 `const myLocalModule = require('./some/local/file.js')` 或者 `var React = require('react');` ，都可以起作用
- 当 `CJS` 导入时，它会给你一个导入对象的副本
- `CJS` 不能在浏览器中工作。它必须经过转换和打包


### 2. AMD

AMD 代表异步模块定义。下面是一个示例代码

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```
或者

```js
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

- `AMD` 是异步(`asynchronously`)导入模块的(因此得名)
- 一开始被提议的时候，`AMD` 是为前端而做的(而 `CJS` 是后端)
- `AMD` 的语法不如 `CJS` 直观。我认为 `AMD` 和 `CJS` 完全相反


### 3. UMD

`UMD` 代表通用模块定义（`Universal Module Definition`）。下面是它可能的样子

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```

- 在前端和后端都适用（“通用”因此得名）
- 与 `CJS` 或 `AMD` 不同，`UMD` 更像是一种配置多个模块系统的模式。这里可以找到更多的模式
- 当使用 `Rollup/Webpack` 之类的打包器时，`UMD` 通常用作备用模块

### 4. ESM

`ESM` 代表 `ES` 模块。这是 `Javascript` 提出的实现一个标准模块系统的方案。我相信你们很多人都看到过这个:

```js
import React from 'react';
// 或者
import {foo, bar} from './myLib';

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
```

- 在很多现代浏览器可以使用
- 它兼具两方面的优点：具有 `CJS` 的简单语法和 `AMD` 的异步
- 得益于 `ES6` 的静态模块结构，可以进行  `Tree Shaking`
- `ESM` 允许像 `Rollup` 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载
- 可以在 `HTML` 中调用，只要如下

```html
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```

但是不是所有的浏览器都支持


## 总结

- 由于 `ESM` 具有简单的语法，异步特性和`tree-shaking`特性，因此它是最好的模块化方案
- `UMD` 随处可见，通常在 ESM 不起作用的情况下用作备用
- `CJS` 是同步的，适合后端
- `AMD` 是异步的，适合前端


## 相关资料

- [What are CJS, AMD, UMD, and ESM in Javascript?](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
- [【面试说】Javascript 中的 CJS, AMD, UMD 和 ESM是什么？](https://juejin.cn/post/6935973925004247077)
- [聊聊 package.json 文件中的 module 字段](https://juejin.cn/post/6844903569150197774)

