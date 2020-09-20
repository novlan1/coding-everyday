- [1. 模块的写法](#1-模块的写法)
  - [1.1. 模块的原始写法](#11-模块的原始写法)
  - [1.2. 模块的对象写法](#12-模块的对象写法)
  - [1.3. 立即执行函数写法](#13-立即执行函数写法)
  - [1.4. 放大模式](#14-放大模式)
  - [1.5. 宽放大模式（`Loose augmentation`）](#15-宽放大模式loose-augmentation)
  - [1.6. 输入全局变量](#16-输入全局变量)
- [2. AMD规范](#2-amd规范)
  - [2.1. CommonJS](#21-commonjs)
  - [2.2. 浏览器环境](#22-浏览器环境)
  - [2.3. AMD](#23-amd)

## 1. 模块的写法

### 1.1. 模块的原始写法

只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。
```js
function m1(){
　　//...
}

function m2(){
　　//...
}
```

缺点：污染了全局变量，有可能会发生命名冲突

### 1.2. 模块的对象写法


```js
var module1 = new Object({

　　_count : 0,

　　m1 : function (){
　　　　//...
　　},

　　m2 : function (){
　　　　//...
　　}

　　});
```

缺点：会暴露所有的模块成员，内部状态可以被外部改写。


### 1.3. 立即执行函数写法

使用"立即执行函数"（`Immediately-Invoked Function Expression，IIFE`），可以达到不暴露私有成员的目的。
```js
var module1 = (function(){

　　var _count = 0;

　　var m1 = function(){
　　　　//...
　　};

　　var m2 = function(){
　　　　//...
　　};

　　return {
　　　　m1 : m1,
　　　　m2 : m2
　　};

})();
```
使用上面的写法，外部代码无法读取内部的_count变量。
```js
console.info(module1._count); //undefined
```
module1就是Javascript模块的基本写法。下面，再对这种写法进行加工。


### 1.4. 放大模式

如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（`augmentation`）。
```js
var module1 = (function (mod){

　　mod.m3 = function () {
　　　　//...
　　};

　　return mod;

})(module1);
```
上面的代码为`module1`模块添加了一个新方法`m3()`，然后返回新的`module1`模块。

### 1.5. 宽放大模式（`Loose augmentation`）

在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。
```js
var module1 = ( function (mod){

　　//...

　　return mod;

})(window.module1 || {});
```
与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

### 1.6. 输入全局变量

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
```js
var module1 = (function ($, YAHOO) {

　　//...

})(jQuery, YAHOO);
```
上面的module1模块需要使用`jQuery`库和`YUI`库，就把这两个库（其实是两个模块）当作参数输入`module1`。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。


## 2. AMD规范

### 2.1. CommonJS


在CommonJS中，有一个全局性方法`require()`，用于加载模块。假定有一个数学模块`math.js`，就可以像下面这样加载。
```js
var math = require('math');
```

然后，就可以调用模块提供的方法：
```js
var math = require('math');

math.add(2,3); // 5
```


### 2.2. 浏览器环境

上面的代码，第二行`math.add(2, 3)`，在第一行`require('math')`之后运行，因此必须等`math.js`加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（`synchronous`），只能采用"异步加载"（`asynchronous`）。这就是AMD规范诞生的背景。


### 2.3. AMD

AMD是"`Asynchronous Module Definition`"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD也采用`require()`语句加载模块，但是不同于CommonJS，它要求两个参数：
```js
require([module], callback);
```
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数`callback`，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：
```js
require(['math'], function (math) {

　　math.add(2, 3);

});
```


