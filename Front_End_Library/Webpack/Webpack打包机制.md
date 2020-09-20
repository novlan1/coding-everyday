下面是一个例子，先是几个文件：

```js
// /src/single/index.js
var index2 = require('./index2');
var util = require('./util');
console.log(index2);
console.log(util);

// /src/single/index2.js
var util = require('./util');
console.log(util);
module.exports = "index 2";

// /src/single/util.js
module.exports = "Hello World";
/config/webpack.config.single.js

// /config/webpack.config.single.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, '../src/single/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  }
};
```


运行`webpack`命令
```
webpack --config ./config/webpack.config.single.js
```

得到的单个打包文件`/dist/index.35dff1f1.js`
```js
(function(modules) { // webpackBootstrap
     // The module cache已经加载过的模块
    var installedModules = {};

    // The require function模块加载函数
    function __webpack_require__(moduleId) {

        // Check if module is in cache判断模块是否已经加载过，若加载过直接返回加载的模块
        if(installedModules[moduleId]) {
             return installedModules[moduleId].exports;
        }
         // Create a new module (and put it into the cache)
         var module = installedModules[moduleId] = {
             i: moduleId,
             l: false,
            exports: {}
         };

         // Execute the module function执行加载函数
         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

         // Flag the module as loaded标记该模块已经加载
        module.l = true;

        // Return the exports of the module
         return module.exports;
     }


    // expose the modules object (__webpack_modules__)
     __webpack_require__.m = modules;

     // expose the module cache
    __webpack_require__.c = installedModules;

     // define getter function for harmony exports
     __webpack_require__.d = function(exports, name, getter) {
         if(!__webpack_require__.o(exports, name)) {
             Object.defineProperty(exports, name, {
                 configurable: false,
                 enumerable: true,
                 get: getter
            });
         }
     };

     // getDefaultExport function for compatibility with non-harmony modules
     __webpack_require__.n = function(module) {
         var getter = module && module.__esModule ?
             function getDefault() { return module['default']; } :
             function getModuleExports() { return module; };
         __webpack_require__.d(getter, 'a', getter);
         return getter;
    };

     // Object.prototype.hasOwnProperty.call
     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

     // __webpack_public_path__
     __webpack_require__.p = "";

     // Load entry module and return exports
     return __webpack_require__(__webpack_require__.s = 1);
 })([
/* 0 */
 (function(module, exports) {

module.exports = "Hello World";

 }),
/* 1 */
(function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


 }),
/* 2 */
(function(module, exports, __webpack_require__) {

var index2 = __webpack_require__(3);
var util = __webpack_require__(0);

console.log(index2);
console.log(util);

}),
/* 3 */
(function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);
console.log(util);
module.exports = "index 2";

 }) ]);
```


说明：
1. 首先 `webpack` 将所有模块(可以简单理解成文件)包裹于一个函数中，并传入默认参数，这里有三个文件再加上一个入口模块一共四个模块，将它们放入一个数组中，取名为 `modules`，并通过数组的下标来作为 `moduleId`。
2. 将 `modules` 传入一个自执行函数中，自执行函数中包含一个 `installedModules` 已经加载过的模块和一个模块加载函数，最后加载入口模块并返回。
3. `__webpack_require__` 模块加载，先判断 `installedModules` 是否已加载，加载过了就直接返回 `exports` 数据，没有加载过该模块就通过 `modules[moduleId].call(module.exports, module, module.exports, __webpack_require__) `执行模块并且将 `module.exports` 给返回。


上述过程还是比较简单的，但有些点需要注意：

1. 每个模块只会加载一次，所以重复加载的模块只会执行一次，加载过的模块会放到 `installedModules`，下次需要需要该模块的值就直接从里面拿了。

2. 模块的 `id` 直接通过数组下标去一一对应的，这样能保证简单且唯一，通过其它方式比如文件名或文件路径的方式就比较麻烦，因为文件名可能出现重名，不唯一，文件路径则会增大文件体积，并且将路径暴露给前端，不够安全。

3. `modules[moduleId].call(module.exports, module, module.exports, __webpack_require__) `保证了模块加载时 `this` 的指向` module.exports` 并且传入默认参数