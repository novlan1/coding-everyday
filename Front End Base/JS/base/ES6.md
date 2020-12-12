- [1. var、let 及 const 区别？](#1-varlet-及-const-区别)
- [2. ES6 中箭头函数与普通函数的区别？](#2-es6-中箭头函数与普通函数的区别)
  - [2.1. 代码分析题](#21-代码分析题)
- [3. Generator 生成器](#3-generator-生成器)
  - [3.1. yield 表达式](#31-yield-表达式)
  - [3.2. next 方法的参数](#32-next-方法的参数)
  - [3.3. Generator 与上下文 （原理）](#33-generator-与上下文-原理)
- [4. 最快合并两个数组](#4-最快合并两个数组)
- [5. 简述js中 `for in` 与 `for of` 区别](#5-简述js中-for-in-与-for-of-区别)
- [6. 对比`forEach`、`for in`、`for of`](#6-对比foreachfor-infor-of)
  - [6.1. `forEach`](#61-foreach)
  - [6.2. `for in`](#62-for-in)
  - [6.3. `for of`](#63-for-of)
- [7. 实现promise时需要注意的点](#7-实现promise时需要注意的点)
- [8. ES6 中的 class 的 this 指向](#8-es6-中的-class-的-this-指向)
- [9. `Promise.resolve([123])`，借用promise的形式，统一代码](#9-promiseresolve123借用promise的形式统一代码)
- [10. 如果两个方法处理错误的方式相同，如何用Promise封装？](#10-如果两个方法处理错误的方式相同如何用promise封装)

### 1. var、let 及 const 区别？

- 全局声明的 var 变量会挂载在 window 上，而 let 和 const 不会
- 同一作用域下，let 和 const 不允许重复声明同一个变量，而 var 可以
- let、const 的作用范围是块级作用域，而 var 的作用范围是函数和全局作用域
- var 声明变量存在变量提升，let 和 const 不会
- 同一作用域下，在 let 和 const 声明前使用会存在暂时性死区
- const
  - 一旦声明必须赋值
  - 声明后不能再修改
  - 如果声明的是引用类型数据，可以修改其属性


### 2. ES6 中箭头函数与普通函数的区别？

- 普通 function 的声明在变量提升中是最高的，箭头函数没有函数提升
- 箭头函数没有属于自己的 this，箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 箭头函数没有`arguments`
- 箭头函数不能作为构造函数，不能被 new，没有 property
- 箭头函数没有**原型属性**
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
- 不可以使用 new 命令，因为：
  - 没有自己的 this，无法调用 call，apply
  - 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`
- 普通函数的this指向调用它的那个对象


#### 2.1. 代码分析题

```js
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
```

答案： 输出耗时： 1 秒多一点点。 原因： 3 个 wait 函数在赋值的时候就已经开始执行了。

稍微改造一下就可以得到 3 * 1000 ms 以上的结果

```js
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function main() {
  console.time();
  const x = await wait();
  const y = await wait();
  const z = await wait();
  console.timeEnd();
}

main();
```
### 3. Generator 生成器

#### 3.1. yield 表达式
Generator 函数返回一个**遍历器对象**，只有调用next方法才会遍历下一个内部状态，遍历器对象的next方法的运行逻辑如下。
1. 遇到`yield`表达式，就暂停执行后面的操作，并将**紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值**。
2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。
3. 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

注意，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
#### 3.2. next 方法的参数

**`yield`表达式本身没有返回值**，或者说总是返回undefined。**next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值**。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

上面代码中：
- 第一次调用a的next方法时，返回x+1的值6；
- 第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。
- 第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

下面代码中，由于向next方法提供了参数，返回结果就完全不一样了。
- 第一次调用b的next方法时，返回x+1的值6；
- 第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
- 第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

注意：由于next方法的参数表示上一个yield表达式的返回值，所以在**第一次使用next方法时，传递参数是无效的**。


#### 3.3. Generator 与上下文 （原理）
JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到**`yield`**命令，就会**暂时退出堆栈**，但是**并不消失**，**里面的所有变量和对象会冻结在当前状态**。等到对它执行**`next`**命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
```js
function* gen() {
  yield 1;
  return 2;
}

let g = gen();

console.log(
  g.next().value,
  g.next().value,
);
```
上面代码中，第一次执行`g.next()`时，`Generator` 函数`gen`的上下文会加入堆栈，即开始运行`gen`内部的代码。**等遇到`yield 1`时，`gen`上下文退出堆栈，内部状态冻结**。第二次执行`g.next()`时，`gen`上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

### 4. 最快合并两个数组
```js
let arr1=[1,3]
let arr2=[4,6]
arr1.concat(arr2) // [1, 3, 4, 6] 


// ES6
[...arr1, ...arr2] // [1, 3, 4, 6]
```


### 5. 简述js中 `for in` 与 `for of` 区别
1. for in是ES5标准，**遍历key**，并且可以遍历**继承的可枚举的属性**，常用于**对象**的遍历。
2. for of是**ES6**标准，**遍历value**，常用于**数组**的遍历。


### 6. 对比`forEach`、`for in`、`for of`

#### 6.1. `forEach`
1. 不能终止循环，`break`，`continue`不能使用。
2. 不适应于 字符串，Object。

#### 6.2. `for in`
1. `index`索引为字符串型数字，不能直接进行几何运算。
2. 遍历顺序有可能不是按照实际数组的内部顺序。
3. 使用`for in`会遍历数组所有的**可枚举属性**，包括原型。

所以`for in`更适合遍历对象，不要使用`for in`遍历数组

#### 6.3. `for of`
1.	`for..of`适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象，因为没有迭代器对象。
2.	与`forEach()`不同的是，它可以**正确响应`break`、`continue`和`return`语句**。
3.	`for-of`循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用`for-in`循环（这也是它的本职工作）或内建的`Object.keys()`方法。



### 7. 实现promise时需要注意的点

1. `New promise`时接收一个`executor函数`作为参数，该函数立即执行，该函数有两个参数`resolve`和`reject`，它俩也是函数。
2. 状态流转，只能从`pending`转为`fulfilled`或者`rejected`，并且不可逆。
3. `Promise`拥有一个`then`方法，接收两个参数`onFulfilled`和`onRejected`，分别作为`promise`成功和失败的回调。所以在`then`方法中对`state`进行判断，如果为`fulfilled`执行`onFulfilled(value)`，如果为`rejected`，执行`onRejected(reason)`。
4. 由于成功值`value`和失败原因`reason`是用户在`executor`通过`resolve(value)`和`reject(reason)`传入的，所以设置初始的`value`和`reason`为全局变量。
5. 如果是异步调用`resolve()`，比如放到`setTimeout`中，需要添加回调函数数组`onFulfilledCallbacks`和`onRejectedCallbacks`，并且在`then`方法中将`pending`状态的回调放到两个回调数组中(用来存储`then()`传入的成功和失败的回调)。当用户调用`resolve()`或`reject()`的时候，修改`state`状态时，并从相应的回调数组中取出回调执行。


### 8. ES6 中的 class 的 this 指向
```js
class Logger{
    printName(name = 'there'){
        this.print(`hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}
 
const logger = new Logger();    //实例化

const {printName } = logger;    //printName
printName(); // 报错    VM77:3 Uncaught TypeError: Cannot read property 'print' of undefined

logger.printName(); // 不报错  hello there
```

`printName`方法中的`this` ，默认指向`Logger`类的实例化对象，但如上单独使用的时候，`this`会指向该方法运行时指向的环境。ES6的class内部默认是严格模式，`this`指向`undifined`。


解决方案：
1. 在构造方法中绑定this，这样实例化时 this就会指向当前实例
```js
class Logger{
    constructor(){
        this.printName = this.printName.bind(this);
    }
 
//...
}
```
2. 使用箭头函数

```js
class Logger{
    constructor(){
        this.printName = (name = 'there') => {
            this.print(name);
        }
    }
}
```
3.使用 Proxy， 获取方法的时候，自动绑定this


### 9. `Promise.resolve([123])`，借用promise的形式，统一代码
`()=>{resolve()}`，其实就等于`resolve`，又比如`writer.on('error', reject)`

### 10. 如果两个方法处理错误的方式相同，如何用Promise封装？
高阶函数，接收 `resove` 和 `reject` 两个参数，返回一个函数，函数的参数是`err、body、statuCode`三个参数。
调用的时候就只用传两个参数了，否则还要传5个参数。代码清爽
```js
_handleCallBack(resolve, reject) {
  return (err, body, statusCode) {
    if (err)  { reject(err) }
    else { resolve( {code: statusCode, body } ) }
  }
}
```



参考资料：
1. [CommonJS模块与ES6模块的区别](https://www.cnblogs.com/unclekeith/p/7679503.html)
2. [ES6入门](https://uwayfly.com/static/docs/index.html#es6/module-loader#CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)
3. [module.exports与exports，export与export default之间的关系和区别](https://www.cnblogs.com/fayin/p/6831071.html)
