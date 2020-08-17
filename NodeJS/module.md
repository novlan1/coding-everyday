- [1. 模块机制](#1-模块机制)
  - [1.1. CommonJS 模块规范](#11-commonjs-模块规范)
    - [1.1.1. CommonJS 用法](#111-commonjs-用法)
    - [1.1.2. exports 和 module.exports 的区别](#112-exports-和-moduleexports-的区别)
  - [1.2. Node 的模块实现](#12-node-的模块实现)
    - [1.2.1. 优先从缓存加载](#121-优先从缓存加载)
    - [1.2.2. 路径分析和文件定位](#122-路径分析和文件定位)
    - [1.2.3. 模块编译](#123-模块编译)
      - [1.2.3.1. js 模块的编译](#1231-js-模块的编译)
      - [1.2.3.2. C/C++ 模块的编译](#1232-cc-模块的编译)
  - [1.3. 核心模块](#13-核心模块)
  - [1.4. 前后端公用模块](#14-前后端公用模块)
    - [1.4.1. 模块侧重点](#141-模块侧重点)
    - [1.4.2. AMD](#142-amd)
    - [1.4.3. CMD](#143-cmd)


# 1. 模块机制

## 1.1. CommonJS 模块规范

模块引用

```js
var math = require("math");
```

模块定义 上下文提供 exports 对象用于导出当前模块的方法和变量，并且他是唯一的导出出口

exports 实际上是 module.exports，而 module.exports 就是以一个暴露给外部的对象。

- exports.some 就是给这个对象上添加属性
- 直接使用 module.exports = {...} 则可以让外部直接获取到这个对象，相当与为 exports 换了一个引用，如果在这之前使用 exports.some 会把之前的覆盖

### 1.1.1. CommonJS 用法

```js
// a.js
module.exports = {
  a: 1,
};
// or
exports.a = 1;

// b.js
var module = require("./a.js");
module.a; // -> log 1
```

原理

```js
var module = require("./a.js");
module.a;
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，
// 重要的是 module 这里，module 是 Node 独有的一个变量
module.exports = {
  a: 1,
};

// module 基本实现
var module = {
  id: "xxxx", // 我总得知道怎么去找到他吧
  exports: {}, // exports 就是个空对象
};
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports;

var load = function (module) {
  // 导出的东西
  var a = 1;
  module.exports = a;
  return module.exports;
};

// 然后当我 require 的时候去找到独特的
// id，然后将要使用的东西用立即执行函数包装下，over
```

### 1.1.2. exports 和 module.exports 的区别

- module.exports 默认值为{}
- exports 是 module.exports 的引用，在模块被导出之前exports被赋值为module.exports
- exports 默认指向 module.exports 的内存空间
- require() 返回的是 module.exports 而不是 exports
- 若对 exports 重新赋值，则断开了 exports 对 module.exports 的指向


比如，你想导出一个类。

```js
class Boy{
    constructor(age) {
        this.age = age
    }
    say() {
    }
}

// 导出Boy
exports = Boy // 报错，不能重写exports
// 正确做法
module.exports = Boy 
```

总结：
1. exports只是module.exports的引用
2. 如果你想要使用exports导出模块，千万不能给它赋值！
3. 稳一点的做法是使用module.exports，虽然exports用起来是挺爽的


## 1.2. Node 的模块实现

在 Node 中引入模块，需要经历 3 个步骤

- 路径分析
- 文件定位
- 编译执行

在 node 中，模块分为两类：一类是 node 提供的模块称为**核心模块**，一类是用户编写的成为**文件模块**。

- 核心模块在编译中编译成了二进制文件。在 Node 进程启动时，部分核心模块就被直接加载入内存。所以这部分核心模块引入时就**省了文件定位和编译执行**这两个步骤，并且在路径分析中优先判断，它的加载速度是最快的。
- 文件模块是运行时动态加载。需要完整的路径分析、文件定位、编译执行

### 1.2.1. 优先从缓存加载

Node 对引入的模块都回进行缓存，而且缓存的是编译执行后的对象。

不管是核心模块还是文件模块，require()都一律采用缓存优先的方式。

### 1.2.2. 路径分析和文件定位

模块标识符分析

- 核心模块
- 路径形式的文件模块
- 自定义模块
  - node_modules 下
  - 查找最费时

文件定位

- 文件拓展名分析
  - 如果省略拓展名，回按 .js .node .json 的次序依次尝试
  - 如果.node .json 的话，加上拓展名会加快一点速度
  - 同步配合缓存，可大幅缓解单线程中阻塞式调用的缺陷
- 目录分析和包
  - 如果没有文件名，会将 Index 当作默认文件名

### 1.2.3. 模块编译

- .js 文件
  - 通过 fs 同步读取后编译执行
- .node
  - 这是用 C/C++编写的拓展文件，通过 dlopen()方法加载最后编译生成的文件
- .json
  - 用 JSON.parse()解析返回结果
- 其余拓展名
  - 当作.js 文件处理

每一个编译成功的模块都会将其文件路径索引缓存在 Module._cache 对象上，以提高二次引入性能

#### 1.2.3.1. js 模块的编译

在编译的过程中，Node 对获取的 JS 文件进行了头尾包装。这也是每个模块都能访问到 require、exports、module、**filename、**dirname 的原因

```js
(funciton(exports, require, module, __filename, __dirname) {

  /* 自己写的代码  */

});
```

这样使得模块文件间都进行了作用域隔离，不用担心变量污染全局。

为 moudle.exports 赋值，exports 对象是通过形参的方式传入，直接赋值形参会改变形参的引用，但并不能改变作用域外的值。

```js
exports = function () {
  // my class
};

var change = function (a) {
  a = 100;
};

var a = 10;
change(a);
console.log(a); // => 10
```

如果要达到 require 引入一个类的效果，请赋值给 module.exports 对象。这个迂回的方案不改变形参的引用。

#### 1.2.3.2. C/C++ 模块的编译

Node 调用 process.dlopen()方法进行加载和执行。

实际上 .node 模块并不需要编译，因为它是编写 C/C++模块之后编译生成的，所以这里只有加载和执行的过程。在执行的过程中，模块 exports 对象与.node 模块产生练习，然后返回给调用者。

## 1.3. 核心模块

Node 的核心模块在编译成可执行文件的过程中被编译进了二进制文件。核心模块其实分为 C/C++编写的和 Javascript 编写的两部分，其中 C/C++文件存放在 Node 项目的 src 目录下，Javascript 文件存放在 lib 目录下。

## 1.4. 前后端公用模块

### 1.4.1. 模块侧重点

前端瓶颈在于带宽，后端瓶颈在于 CPU 和内存等资源。前端需要通过网络加载代码，后端则从磁盘加载，二者加载速度不再同一量级上。

node 的模块引入几乎都是同步的，但前端模块若是也采用同步方式来引入必会在用户体验上造成很大的问题，即 UI 初始化实际过长

### 1.4.2. AMD

- 全称：`Asynchronous Moudle Definition`， 异步模块定义”
- AMD 需要在声明的时候指定所有的依赖，通过形参传递依赖到模块内容中。
- AMD是`RequireJs`在推广过程中对模块定义的规范化产出
- 通过`define`定义，**依赖前置**，把依赖的把放在数组里，通过回调函数接收`lib`参数，得到`lib`里的一些方法，通过`return`输出。（**异步加载**）

```js
// 定义模块
define(['package/lib'], function(lib){
  function foo(){
    lib.log('XXXXX')
  }
  
  return {
   foo: foo
  };
});
    
// 加载模块
require(['mymodule'], function(my){
  my.foo()
}
```
```
require()函数接受两个参数：
1. 第一个参数是一个数组，表示所依赖的模块；
2. 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。

加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
```
### 1.4.3. CMD

- CMD 是`SeaJs`在推广过程中对模块定义的规范化产出
- 与 AMD 主要区别在于定于模块与依赖引入部分。
- 淘宝团队提出，**同步加载**，**依赖就近**，什么地方使用，什么地方引入（动态引入）。

```js
define(funtion(require, exports, moudle) {
  // The module code goes here
})
```

```js
// 所有模块都通过define定义
define(function(require, exports, module){
  // 通过require引入依赖
  var $ = require('jquery')
  var spining = require('spining')
})

// 加载模块
seajs.use(['myModule.js'], function(my){
});
```



