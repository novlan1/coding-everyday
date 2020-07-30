### 单例模式
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

### 观察者模式
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
### 发布订阅模式
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
基于一个主题/事件通道，订阅者subscriber通过自定义事件订阅主题，发布者publisher通过发布主题事件的方式发布。

#### 观察者模式和发布订阅模式区别

1. 在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。
2. 发布订阅模式相比观察者模式多了个主题/事件通道，订阅者和发布者不是直接关联的。
3. 观察者模式两个对象之间有很强的依赖关系；发布/订阅模式两个对象之间的耦合度低。

### 函数柯里化
当我们没有重新定义toString与valueOf时，函数的隐式转换会调用默认的toString方法，它会将函数的定义内容作为字符串返回。

而当我们主动定义了toString/vauleOf方法时，那么隐式转换的返回结果则由我们自己控制了。其中valueOf的优先级会toString高一点。

柯里化好处：参数复用、延迟运行（返回函数，想什么时候运行什么时候运行）

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
### 实现一个add方法，使结果满足如下预期
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

### 实现 call、apply 方法
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
### 实现bind
```js
Function.prototype.myBind = function() {
  const [context, ...args] = [...arguments]
  
  return 
}


```


### 实现Promise.all、Promise.race、Promise.allSettled
#### Promise.all
Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

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
#### Promise.race
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

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

#### Promise.allSettled
Promise.allSettled() 方法返回一个在所有给定的 promise 已被决议或被拒绝后决议的 promise，并带有一个对象数组，每个对象表示对应的promise 结果。

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

### 实现Promise
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

