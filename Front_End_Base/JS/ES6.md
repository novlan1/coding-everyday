### var、let 及 const 区别？

- 全局声明的 var 变量会挂载在 window 上，而 let 和 const 不会
- 同一作用域下，let 和 const 不允许重复声明同一个变量，而 var 可以
- let、const 的作用范围是块级作用域，而 var 的作用范围是函数和全局作用域
- var 声明变量存在变量提升，let 和 const 不会
- 同一作用域下，在 let 和 const 声明前使用会存在暂时性死区
- const
  - 一旦声明必须赋值
  - 声明后不能再修改
  - 如果声明的是引用类型数据，可以修改其属性

### Proxy

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
Vue3.0 中通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。

```js
let p = new Proxy(target, handler);
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    },
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`);
  }
);
p.a = 2; // 控制台输出：监听到属性a改变
p.a; // 'a' = 2
```

自定义 set 和 get 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。

### map

map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后返回一个新数组，原数组不发生改变。

map 的回调函数接受三个参数，分别是**当前索引元素，索引，原数组**。

```js
var arr = [1, 2, 3];
var arr2 = arr.map((item) => item + 1);
arr; //[ 1, 2, 3 ]
arr2; // [ 2, 3, 4 ]
```
```js
['1', '2', '3'].map(parseInt);
// -> [ 1, NaN, NaN ]
```

- 第一个 parseInt('1', 0) -> 1
- 第二个 parseInt('2', 1) -> NaN
- 第三个 parseInt('3', 2) -> NaN

### filter

filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素

filter 的回调函数接受三个参数，分别是当前索引元素，索引，原数组

### reduce

reduce 可以将数组中的元素通过回调函数最终转换为一个值。 如果我们想实现一个功能将函数里的元素全部相加得到一个值，可能会这样写代码

```js
const arr = [1, 2, 3];
let total = 0;
for (let i = 0; i < arr.length; i++) {
  total += arr[i];
}
console.log(total); //6
```

但是如果我们使用 reduce 的话就可以将遍历部分的代码优化为一行代码

```js
const arr = [1, 2, 3];
const sum = arr.reduce((acc, current) => acc + current, 0);
console.log(sum);
```

对于 reduce 来说，它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 reduce 的过程

- 首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入
- 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
- 在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入
- 所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 6。



### ES6 中箭头函数与普通函数的区别？

- 普通 function 的声明在变量提升中是最高的，箭头函数没有函数提升
- 箭头函数没有属于自己的 this，箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 箭头函数没有`arguments`
- 箭头函数不能作为构造函数，不能被 new，没有 property
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
- 不可以使用 new 命令，因为：
  - 没有自己的 this，无法调用 call，apply
  - 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`

### Promise

`Promise` 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了。

- 等待中（pending）
- 完成了（resolved）
- 拒绝了（rejected）

当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的。

```js
new Promise((resolve, reject) => {
  console.log('new Promise');
  resolve('success');
});
console.log('finifsh');

// 先打印new Promise， 再打印 finifsh
```

Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 `Promise.resolve()` 包装。

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res); // => 1
    return 2; // 包装成 Promise.resolve(2)
  })
  .then((res) => {
    console.log(res); // => 2
  });
```

当然了，Promise 也很好地解决了回调地狱的问题

```js
ajax(url)
  .then((res) => {
    console.log(res);
    return ajax(url1);
  })
  .then((res) => {
    console.log(res);
    return ajax(url2);
  })
  .then((res) => console.log(res));
```

其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

### async 和 await

一个函数如果加上 async ，那么该函数就会返回一个 Promise

```js
async function test() {
  return '1';
}
console.log(test());
// -> Promise {<resolved>: "1"}
```

async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样，并且 await 只能配套 async 使用。

```js
async function test() {
  let value = await sleep();
}
```

async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，并且也能优雅地解决回调地狱问题。

当然也存在一些缺点，因为 **await 将异步代码改造成了同步代码**，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url);
  await fetch(url1);
  await fetch(url2);
}
```

看一个使用 await 的例子：

```js
let a = 0;
let b = async () => {
  a = a + (await 10);
  console.log('2', a);
};
b();
a++;
console.log('1', a);

//先输出  ‘1’, 1
//在输出  ‘2’, 10
```

- 首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
- 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
- 同步代码 a++ 与打印 a 执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10

上述解释中提到了 await 内部实现了 generator，其实 **await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator**。

#### 代码分析题

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
### Generator 生成器

#### yield 表达式
Generator 函数返回一个**遍历器对象**，只有调用next方法才会遍历下一个内部状态，遍历器对象的next方法的运行逻辑如下。
1. 遇到`yield`表达式，就暂停执行后面的操作，并将**紧跟在`yield`后面的那个表达式的值**，作为返回的对象的`value`属性值。
2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。
3. 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

注意，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
#### next 方法的参数

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
- 第一次调用b的next方法时，返回x+1的值6；
- 第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。
- 第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

下面代码中，由于向next方法提供了参数，返回结果就完全不一样了。
- 第一次调用b的next方法时，返回x+1的值6；
- 第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
- 第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

注意：由于next方法的参数表示上一个yield表达式的返回值，所以在**第一次使用next方法时，传递参数是无效的**。




#### Generator 与上下文 （原理）
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
上面代码中，第一次执行`g.next()`时，`Generator` 函数`gen`的上下文会加入堆栈，即开始运行`gen`内部的代码。等遇到`yield 1`时，`gen`上下文退出堆栈，内部状态冻结。第二次执行`g.next()`时，`gen`上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

### CommonJS 模块与 ES6 模块的区别
#### CommonJS

1. 对于基本数据类型，属于**复制**。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
2. 对于复杂数据类型，属于**浅拷贝**。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
3. 当使用require命令加载某个模块时，就会**运行整个模块的代码**。
4. 当使用require命令加载同一个模块时，不会再执行该模块，而是**取到缓存之中的值**。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
5. 循环加载时，属于**加载时执行**。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就**只输出已经执行的部分**，还未执行的部分不会输出。

#### ES6模块

1. ES6模块中的值属于【**动态只读引用**】。
2. 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
3. 对于动态来说，**原始值发生变化，import加载的值也会发生变化**。不论是基本数据类型还是复杂数据类型。
4. 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。

小结：
1. CommonJS 模块输出的是一个**值的拷贝**，ES6 模块输出的是**值的引用**。
2. CommonJS 模块是**运行时加载**，ES6 模块是**编译时输出接口**。


#### CommonJS 模块的加载原理

CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在**内存**生成一个对象。
```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```
上面代码就是 Node 内部加载模块后生成的一个对象。该对象的`id`属性是模块名，`exports`属性是模块输出的各个接口，`loaded`属性是一个布尔值，表示**该模块的脚本是否执行完毕**。

以后需要用到这个模块的时候，就会**到`exports`属性上面取值**。即使再次执行`require`命令，也不会再次执行该模块，而是到**缓存**之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。



#### CommonJS 循环引用的例子

```javascript
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');


// b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');


// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```
`node main.js`执行结果：

```
在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

- `a.js`脚本先输出一个`done`变量，然后加载另一个脚本文件`b.js`。此时`a.js`代码就停在这里，等待`b.js`执行完毕，再往下执行。
- `b.js`执行到第二行，就会去加载`a.js`，这时，就发生了“循环加载”。系统会去`a.js`模块对应对象的`exports`属性取值，可是因为`a.js`还没有执行完，从`exports`属性只能取回已经执行的部分，而不是最后的值。而`a.js`已经执行的部分，只有一行。 `exports.done = false;`因此，对于`b.js`来说，它从`a.js`只输入一个变量`done`，值为`false`。
- 然后，`b.js`接着往下执行，等到全部执行完毕，再把执行权交还给`a.js`。于是，`a.js`接着往下执行，直到执行完毕。

可以看出：
1. 在`b.js`之中，`a.js`没有执行完毕，只执行了第一行。
2. `main.js`执行到第二行时，不会再次执行`b.js`，而是输出缓存的`b.js`的执行结果，即它的第四行。`exports.done = true;`

### ES6 循环引用的例子

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
```

- 首先，执行`a.mjs`以后，引擎发现它加载了`b.mjs`，因此会优先执行`b.mjs`，然后再执行`a.mjs`。

- 接着，执行`b.mjs`的时候，已知它从`a.mjs`输入了`foo`接口，这时不会去执行`a.mjs`，而是认为这个接口已经存在了，继续往下执行。执行到第三行`console.log(foo)`的时候，才发现这个接口根本没定义，因此报错。

解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将`foo`写成函数来解决。这是因为函数具有**提升**作用，在执行`import {bar} from './b'`时，函数foo就已经有定义了，所以`b.mjs`加载的时候不会报错。这也意味着，如果把函数foo改写成函数表达式，也会报错。



#### 为什么 ES 模块比 CommonJS 更好？

由于 ES6 模块是**编译时加载**（静态加载），使得**静态分析**成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。


#### ES6 的 export default 

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。

```javascript
// 正确
export default 42;

// 报错
export 42;
```

上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为`default`。




参考资料：[CommonJS模块与ES6模块的区别](https://www.cnblogs.com/unclekeith/p/7679503.html)，[阮一峰](https://uwayfly.com/static/docs/index.html#es6/module-loader#CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)，[module.exports与exports，export与export default之间的关系和区别](https://www.cnblogs.com/fayin/p/6831071.html)



