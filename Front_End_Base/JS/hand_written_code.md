- [1. JS 为数字添加千位分隔符](#1-js-为数字添加千位分隔符)
- [2. 单例模式](#2-单例模式)
- [3. 观察者模式](#3-观察者模式)
- [4. 发布订阅模式](#4-发布订阅模式)
- [5. 函数柯里化](#5-函数柯里化)
- [6. 实现一个add方法，使结果满足如下预期](#6-实现一个add方法使结果满足如下预期)
- [7. 实现 call、apply 方法](#7-实现-callapply-方法)
- [8. 实现 bind 方法](#8-实现-bind-方法)
- [9. 实现 instanceof 方法](#9-实现-instanceof-方法)
- [10. new 的本质](#10-new-的本质)
- [11. Object.create 的基本实现原理](#11-objectcreate-的基本实现原理)
- [12. 实现防抖和节流](#12-实现防抖和节流)
- [13. 用 for 和 reduce 实现 map 和 filter](#13-用-for-和-reduce-实现-map-和-filter)
- [14. 使用 for 循环打印1-10，每个数字间隔 100ms](#14-使用-for-循环打印1-10每个数字间隔-100ms)
- [15. 使用 setTimeout 模拟 setInterval](#15-使用-settimeout-模拟-setinterval)
- [16. ES5 实现继承](#16-es5-实现继承)
- [17. 实现 compose](#17-实现-compose)
- [18. 实现深拷贝](#18-实现深拷贝)
- [19. 实现 Promise](#19-实现-promise)
- [20. 实现 Promise.all、Promise.race、Promise.allSettled](#20-实现-promiseallpromiseracepromiseallsettled)
  - [20.1. Promise.all](#201-promiseall)
  - [20.2. Promise.race](#202-promiserace)
  - [20.3. Promise.allSettled](#203-promiseallsettled)
- [21. 双向数据绑定](#21-双向数据绑定)

### 1. JS 为数字添加千位分隔符
```js
function milliFormat(num) {
    return num && num.toString()
        .replace(/\d+/, function(s){
             return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
         })
}
```

### 2. 单例模式
```js
class Single{
  constructor(...args) {
    console.log(...args)
  }
}

Single.getInstance = (function() {
  let instance 
  return function(...args) {
    if (!instance) {
      instance = new Single(...args)
    }
    return instance
  }
})()


// 测试
const a = Single.getInstance('yang', 18)
const b = Single.getInstance('mike', 'male')

a === b //true
```
```
1. getInstance是类的静态方法，不能使用new SingleObject()
2. 创建出来的实例全等
```

### 3. 观察者模式
```js
// 目标对象
class Subject{
  constructor() {
    this.subs = []
  }
  addSub = (sub) => {
    this.subs.push(sub)
  }
  notify = (...args) => {
    this.subs.map(sub => {
      sub.update(...args)
    })
  }
}


// 观察者
class Observer{
  update(...args) {
    console.log(...args)
  }
}


// 测试
const subject = new Subject()
const observer = new Observer()
subject.addSub(observer)
subject.notify('a', 'b', 'c')
```
```
首先是目标的构造函数，他有个数组，用于添加观察者。
还有个广播方法notify，遍历观察者数组后调用观察者们的update方法。
```
### 4. 发布订阅模式
```js
class EventEmitter{
  constructor() {
    this._eventpool = {}
  }
  on(event, cb) {
    this._eventpool[event] 
    ? this._eventpool[event].push(cb)
    : this._eventpool[event] = [cb]
  }
  emit(event, ...args) {
    if (this._eventpool[event]) {
      this._eventpool[event].map(cb => {
        cb(...args)
      })
    }
  }
  off(event) {
    delete this._eventpool[event]
  }
  once(event, cb) {
    this.on(event, (...args) => {
      cb(...args)
      this.off(event)
    })
  }
}


// 测试
const emitter = new EventEmitter()
const cb = (...args) => {
   console.log(...args)
}
emitter.on('a', cb)
emitter.emit('a', 'y', 'g', 'w')
emitter.emit('a', 'y', 'g', 'w')

emitter.once('b', cb)
emitter.emit('b', 'y', 'g', 'w')
emitter.emit('b', 'y', 'g', 'w')
```

```
基于一个主题/事件通道，订阅者subscriber通过自定义事件订阅主题，发布者publisher通过发布主题事件的方式发布。
```
![观察者模式和发布订阅模式区别](../../imgs/event_emitter.png)
```
观察者模式和发布订阅模式区别：

1. 在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。
2. 发布订阅模式相比观察者模式多了个主题/事件通道，订阅者和发布者不是直接关联的。
3. 观察者模式两个对象之间有很强的依赖关系；发布/订阅模式两个对象之间的耦合度低。
```

### 5. 函数柯里化
```
当我们没有重新定义 toString 与 valueOf 时，函数的隐式转换会调用默认的 toString 方法，它会将函数的定义内容作为字符串返回。

而当我们主动定义了 toString/vauleOf 方法时，那么隐式转换的返回结果则由我们自己控制了。其中 valueOf的优先级会比 toString 高一点。

柯里化好处：参数复用、延迟运行（返回函数，想什么时候运行什么时候运行）
```

```js
function currying() {
  const [fn, ...args] = [...arguments]
  const cb = function() {
    if (!arguments.length) {
      return fn.apply(this, args)
    }
    args.push(...arguments)
    return cb
  }
  
  // 视情况添加
  cb.toString = () => {
    return fn.apply(this, args)
  }
  return cb
}

function add() {
  return [...arguments].reduce((sum, item) => sum + item, 0)
}

// 测试柯里化
const a = currying(add, 12, 24, 36)
a()
a(123)(123)(123)
```
### 6. 实现一个add方法，使结果满足如下预期
```
add(1)(2)(3) = 6; 
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```

```js
function add() {
  const args = [...arguments]
  const cb = function() {
    args.push(...arguments)
    return cb
  }
  
  cb.toString = () => {
    return args.reduce((sum, item)=> sum + item)
  }
  return cb
}
```

### 7. 实现 call、apply 方法
```js
Function.prototype.myCall = function() {
  let [context, ...args] = [...arguments]
  if(!context) context = window
  
  context.fn = this
  const res = context.fn(...args)
  
  delete context.fn
  return res
}


Function.prototype.myApply = function() {
  let [context, args] = [...arguments] // 和call的不同点在于没有...，因为只有一个参数（数组）
  if (!context) context = window
  
  context.fn = this
  let res
  
  if (args) {
    res = context.fn(...args)
  } else {
    res = context.fn()
  }
  
  delete context.fn
  return res
}
```
### 8. 实现 bind 方法
```js
Function.prototype.myBind = function() {
  const [context, ...args] = [...arguments]
  const fn = this
  
  return function() {
    return fn.apply(context, args.concat(...arguments))
  }
}
```
### 9. 实现 instanceof 方法

`instanceof`运算符用来验证，一个对象是否为指定的构造函数的实例。`obj instanceof Object`返回`true`，就表示`obj`对象是`Object`的实例。
`instanceof`的原理是检查右边构造函数的`prototype`属性，是否在左边对象的原型链上。

```js
// 思路：右边变量的原型存在于左边变量的原型链中。
function myInstanceof(left, right) {
  let leftVal = left.__proto__
  let rightVal = right.prototype
  
  while(true) {
    if (leftVal === null) return false
    if (leftVal === rightVal) return true
    leftVal = leftVal.__proto__
  }
}
```
### 10. new 的本质
```
1. 创建一个新对象且将其隐式原型指向构造函数原型
2. 执行构造函数
3. 返回该对象
```
```js
function myNew() {
  const [fn, ...args] = [...arguments]
  const obj = {
    __proto__: fn.prototype
  }
  fn.call(obj, ...args)
  return obj
}
```

### 11. Object.create 的基本实现原理
```
1. 创建一个空的构造函数
2. 将传入的对象作为其原型
3. 用该构造函数创建新的对象，并返回
```
```js
function myCreate(obj) {
  function F(){}
  F.prototype = obj
  return new F()
}
```

生成实例对象的常用方法是，使用`new`命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？

JavaScript 提供了`Object.create`方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。

```javascript
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
```

上面代码中，`Object.create`方法以`A`对象为原型，生成了`B`对象。`B`继承了`A`的所有属性和方法。

### 12. 实现防抖和节流

```
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。

区别：
(1) 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，
    而函数防抖只是在最后一次事件后才触发一次函数。
(2) 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，
    而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

应用： 进行窗口的resize、scroll，输入框内容校验或请求ajax时
```

```js
function debounce(fn, time) {
  let timeout
  
  return function() {
    const _this = this
    const args = [...arguments]
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(_this, args)
    }, time)
  }
}


function throttle(tn, time) {
  let timeout 
  
  return function() {
    const _this = this
    const args = [...arguments]
    if (!timeout) {
      setTimeout(() => {
        timeout = null // 注意，一定要先置为null，再执行fn
        fn.apply(_this, args)
      }, time)
    }
  }
}


// 测试
function count() {
 console.log('xxxxx')
}
window.onscroll = debounce(count, 500)
window.onscroll = throttle(count, 500)
```
### 13. 用 for 和 reduce 实现 map 和 filter

```js
// for 实现 map
Array.prototype.myMap = function() {
  const arr = this
  const [fn, thisArg] = [...arguments]
  const res = []
  
  for (let i = 0; i < arr.length; i++) {
    res.push(fn.call(thisArg, arr[i], i, arr))
  }
  return res
}

// for 实现 filter
Array.prototype.myFilter = function() {
  const arr = this
  const [fn, thisArg] = [...arguments]
  const res = []
  
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArg, arr[i], i, arr)) {
      res.push(arr[i])
    }
  }
  return res
}

// reduce 实现 map
Array.prototype.myMap = function() {
  const arr = this
  const [fn, thisArg] = [...arguments]
  
  return arr.reduce((acc, item, index) => {
    acc.push(fn.call(thisArg, item, index, arr))
    return acc
  }, [])
}

// reduce 实现 filter
Array.prototype.myFilter = function() {
  const arr = this
  const [fn, thisArg] = [...arguments]
  
  return arr.reduce((acc, item, index) => {
    if (fn.call(thisArg, item, index, arr)) {
      acc.push(item)
    }
    return acc
  }, [])
}
```
### 14. 使用 for 循环打印1-10，每个数字间隔 100ms

```js
// 使用 let
for (let i = 1; i < 11; i++) {
  setTimeout(() => {
    console.log(i)
  }, 500 * i)
}

/**
 * 使用闭包
 * 整个 for 循环内部是一个闭包，注意将i传进去
 */ 
for (var i = 1; i < 11; i++) {
  (function(i){
    setTimeout(()=> {
      console.log(i)
    }, 500 * i)
  })(i)
}

// 错误做法
for (var i = 0; i < 11; i++) {
  setTimeout(() => {
    console.log(i)
  }, 500 * i)
}
```

### 15. 使用 setTimeout 模拟 setInterval
```js
const time = 500 

function fn() {
  console.log('xxx')
}
setTimeout(function f() {
  fn()
  setTimeout(f, time)
}, time)
```

`setInterval`有两个缺点：
- 使用`setInterval`时，某些间隔会被跳过
- 可能多个定时器会连续执行

setInterval 的回调函数并不是到时后立即执行，而是**等系统计算资源空闲下来后才会执行**。而下一次触发时间则是在 setInterval 回调函数执行完毕之后才开始计时，所以如果 setInterval 内执行的计算过于耗时，或者有其他耗时任务在执行，setInterval 的计时会越来越不准，延迟很厉害。

```js
var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
    var i = 0;
    while(i++ < 100000000);
}, 0);
setInterval(function(){
    count++;
    console.log(new Date().getTime() - (startTime + count * 1000));
}, 1000);
```
代码里输出了setInterval触发时间和应该正确触发时间的延迟毫秒数
```
176
340
495
652
807
961
1114
1268
1425
1579
1734
1888
2048
2201
2357
2521
2679
2834
2996
......
```

`setTimeout`模拟`setInterval`好处：
- 在前一个定时器执行完前，不会向队列插入新的定时器（解决缺点一）
- 保证定时器间隔（解决缺点二）



参考资料：[解决 setInterval 计时器不准的问题](https://www.cnblogs.com/flash3d/archive/2014/05/08/3715600.html)

### 16. ES5 实现继承
```js
function Parent() {
}
function Child() {
  Parent.call(this)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Parent
```
这种方法称为寄生组合式继承。
- 寄生式继承的思路：在创建对象的函数中直接吸收其他对象的功能，然后对其进行扩展并返回。
- 构造函数的目的是为了复制属性，`Parent.call(this, name)`肯定不能少
- `Child.prototype =new Parent()`的目的是为了获取到父类原型对象(`prototype`)上的方法，基于这个目的，有没有别的方法可以做到 在**不需要实例化父类构造函数**的情况下，也能**得到父类原型对象上的方法**呢？ 当然可以，我们可以采用寄生式继承来得到父类原型对象上的方法。
- 那么使用`Object.create`的原型链是什么样的呢？其实很简单：
  `SubType.prototype.__ proto __ = SuperType.protype`
  也就是说，**子类的原型相当于是父类原型的一个实例**，这不就是实现了两者的链接了吗？


其他方式的不足

```js
function Parent() {
  this.name = 'parent'
}
Parent.prototype.say = function() {}
function Child() {
  Parent.call(this)
  this.type = 'child'
}
console.log(new Child().say())
```
构造函数中的继承：
只用`Parent.call(this)`的缺点是，**原型链上的属性并没被继承**。

```js
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}
function Child() {
  this.type = 'child'
}
Child.prototype = new Parent()

const s1 = new Child()
const s2 = new Child()

console.log(s1.play, s2.play)
s1.play.push(4)
console.log(s1.play, s2.play)
```
单纯的原型链继承：
使用`Child.prototype = new Parent()`的缺点是，**子类实例的引用类型是公用的**，修改一个实例会引起另一个实例的改变。

```js
function Parent(){
  console.log('____')
  this.play = [1, 2, 3]
}
function Child() {
  Parent.call(this)
}

Child.prototype = new Parent()
const s1 = new Child()
const s2 = new Child()
console.log(s1.play, s2.play)
s1.play.push(4)
console.log(s1.play, s2.play)
```
简单的组合方式是，上述两种的相加。缺点是**父级构造函数执行了两次**。
```js
function Parent() {
  
}
function Child() {
  Parent.call(this)
}

Child.prototype = Parent.prototype

const s = new Child()
console.log(s.constructor)
```
`Child.prototype = Parent.prototype`的缺点是，无法区分一个实例是哪个原型对象创建的。若强行使用过`Child.prototype.constructor=Child`，会使得父类对象的`contructor`属性也是`Child`，显然错误。
并且，当我们想要在子对象原型中扩展一些属性以便之后继续继承的话，父对象的原型也会被改写，因为这里的原型对象实例始终只有一个，这也是这种继承方式的缺点。




### 17. 实现 compose
```js
/**
 * 实现以下功能：compose([a, b, c])('参数') => a(b(c('参数')))
 */
function compose(funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 另一种
function compose(funcs) {
  let index = funcs.length - 1
  
  return function() {
    let res = funcs[index].call(null, ...arguments)
    while (--index >= 0) {
      res = funcs[index].call(null, res)
    }
    return res
  }
}


// 测试
const a = x => x * 2
const b = x => x + 5
const c = x => x * 3
compose([a, b, c])(123)
```
### 18. 实现深拷贝
```
1. 使用JSON.stringify和JSON.parse实现深拷贝：JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成
   新的对象；

   缺陷：它会抛弃对象的constructor，深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object；
   这种方法能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，也就是说，只有可以转成JSON格式的
   对象才可以这样用，像function没办法转成JSON；

2. slice是否为深拷贝
   slice()和concat()都并非深拷贝，而是只拷贝第一层。
```
```js
function getEmpty(obj) {
  const type = {}.toString.call(obj)
  if (type === '[object Object]') {
    retur {}
  }
  if (type === '[object Array]') {
    return []
  }
  return obj
}


/** 
 * 宽度优先遍历
 * 换成栈，每次弹出最后的，就是深度优先遍历了
 */
function deepCopyBFS(origin) {
  let queue = []
  let map = new Map() // 记录出现过的对象，用于处理环
  
  let target = getEmpty(origin)
  if (target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }
  
  while (queue.length) {
    let [ori, tar] = queue.shift()
    
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }
      
      tar[key] = getEmpty(ori[key])
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }
  return target
}
```
参考资料：[深拷贝, 简书](https://www.jianshu.com/p/cf1e9d7e94fb)

### 19. 实现 Promise
```js
class MyPromise{
  constructor(process) {
    this.status = 'pending'
    this.msg = ''
    process(this.resolve.bind(this), this.reject.bind(this))
    return this
  }

  resolve(val) {
    this.status = 'fulfilled' 
    this.msg = val
  }

  reject(val) {
    this.status = 'rejected'
    this.msg = val
  }

  then(fulfilled, reject) {
    if (this.status === 'fulfilled') {
      fulfilled(this.msg)
    }
    if (this.status === 'rejected'){
      reject(this.msg)
    }   
  }
}

// 测试
const mm = new MyPromise((resolve, reject) => {
  resolve('123')
})

mm.then(res => {
  console.log(res, 'success')
})
```
```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
  const _this = this
  
  // 初始化状态
  this.state = PENDING
  
  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null
  
  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = []
  
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = []
  
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    
    setTimeout(() => {
      if (_this.state === PENDING) {
        _this.state = RESOLVED
        _this.value = value
        
        _this.resolvedCallbacks.map(callback => {
          callback(value)
        })
      }
    }, 0)
  }
  
  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (_this.state === PENDING) {
        // 修改状态
        _this.state = REJECTED
        
        // 设置传入的值
        _this.value = value
        
        // 执行回调函数
        _this.rejectedCallbacks.map(callback => {
          callback(value)
        })
      }
    }, 0)
  }
  
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject)
  } catch(e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e)
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved = 
    typeof onResolved === 'function' 
    ? onResolved 
    : function(value){
      return value
    }
    
  onRejected = 
    typeof onRejected === 'function'
    ? onRejected
    : function(error) {
      throw(error)
    }
   
  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }
  
  // 如果状态已经凝固，则直接执行对应状态的函数
  if (this.state === RESOLVED) {
    onResolved(this.value)
  }
  
  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}
```

参考资料：[segmentfault](https://segmentfault.com/a/1190000016550260)

### 20. 实现 Promise.all、Promise.race、Promise.allSettled
#### 20.1. Promise.all
```
Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 
promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；
如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
```
```js
Promise.newAll = function (promiseArr) {
  let results = [];
  return new Promise((resolve, reject) => {
    let i = 0, n = 0;
      
    // 执行所有的 Promise 对象
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        results.push(res);
        i++;
          
        if (i === promiseArr.length) {
          // 当所有 Promise 都 resolve 之后，统一 resolve
          resolve(results);
        }
          
      }).catch(err => {
        // 只要有任何 Promise 出现 reject， Promise.newAll 就直接 reject
        reject(err);
      });
      n++;
    }
  })
}

```
#### 20.2. Promise.race
```
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，
返回的 promise 就会解决或拒绝。
```
```js
Promise.newRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let i = 0, n = 0;
      
    // 执行所有 Promise
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        // 出现第一个被 resolve 的直接 resolve
        resolve(res);
          
      }).catch(err => {
        // 出现第一个被 reject 的直接 reject
        reject(err);
      });
      n++;
    }
  })
};
```

#### 20.3. Promise.allSettled
```
Promise.allSettled() 方法返回一个在所有给定的 promise 已被决议或被拒绝后决议的 promise，
并带有一个对象数组，每个对象表示对应的promise 结果。
```
```js
Promise.newAllSettled = function (promiseArr) {
  let results = [];
    
  return new Promise((resolve, reject) => {
    let i = 0, n = 0;
      
    // 运行所有的 Promise 
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        // 当有 Promise 被 resolve 之后，记录 resolve 值和状态，已决 Promise 计数加一
        results.push({value: res, status: 'fulfilled'});
        i++;
          
        // 全部 Promise 已决，resolve
        if (i === promiseArr.length) {
          resolve(results);
        }
          
      }).catch(err => {
        // 当有 Promise 被 reject 后，记录 reject 值和状态，并且已决的 Promise 计数加一
        results.push({value: err, status: 'rejected'});
        i++;
          
        if (i === promiseArr.length) {
          resolve(results);
        }
      });
      n++;
    }
  })
};
```

### 21. 双向数据绑定
```html
<input id="input"/>
```
```js
const data = {};
const input = document.getElementById('input');

Object.defineProperty(data, 'text', {
  set(value) {
    input.value = value;
    this.value = value;
  }
});

input.onchange = function(e) {
  data.text = e.target.value;
}
```
`onkeyup`事件更明显

- 单向绑定非常简单，就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新。
- 有单向绑定，就有双向绑定。如果用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。
- 什么情况下用户可以更新View呢？填写表单就是一个最直接的例子。当用户填写表单时，View的状态就被更新了，如果此时MVVM框架可以自动更新Model的状态，那就相当于我们把Model和View做了双向绑定
- 双向绑定最大的好处是我们不再需要用jQuery去查询表单的状态，而是直接获得了用JavaScript对象表示的Model。

当用户提交表单时，传统的做法是响应onsubmit事件，用jQuery获取表单内容，检查输入是否有效，最后提交表单，或者用AJAX提交表单。

现在，获取表单内容已经不需要了，因为双向绑定直接让我们获得了表单内容，并且获得了合适的数据类型。

vue 双向数据绑定的原理：
1. vue 双向数据绑定是通过 数据劫持 结合 发布订阅模式的方式来实现的， 也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变；

2. 核心：关于VUE双向数据绑定，其核心是 `Object.defineProperty()`方法；

3. 介绍一下`Object.defineProperty()`方法
（1）`Object.defineProperty(obj, prop, descriptor)`，这个语法内有三个参数，分别为： `obj`（要定义其上属性的对象），`prop` （要定义或修改的属性），`descriptor` （具体的改变方法）。
（2）简单地说，就是用这个方法来定义一个值。当调用时我们使用了它里面的get方法，当我们给这个属性赋值时，又用到了它里面的set方法。

```js
let obj = {}
Object.defineProperty(obj, 'hello', {
  set: function(val) {
    console.log('setting')
    obj['hello'] = val
  },
  get: function() {
    console.log('getting')
    return obj['hello']
  }
})
obj.hello;
obj.hello = 'hi'
```


![MVVM](../../imgs/vue_mvvm.png)

