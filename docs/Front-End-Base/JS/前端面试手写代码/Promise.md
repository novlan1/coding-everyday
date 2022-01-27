- [1. 实现 Promise](#1-实现-promise)
- [2. 实现 `Promise.all`](#2-实现-promiseall)
- [3. 实现 `Promise.race`](#3-实现-promiserace)
- [4. 实现 `Promise.allSettled`](#4-实现-promiseallsettled)
- [5. 实现 `Promise.finally`](#5-实现-promisefinally)

### 1. 实现 Promise
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

### 2. 实现 `Promise.all`
```
Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 
promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；
如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
```
```js
Promise.myAll = function (arr) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;

    if (!arr.length) {
      return Promise.resolve([]);
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i].then((res) => {
        results[i] = res;
        count += 1;

        if (count == arr.length - 1) {
          resolve(results);
        }
      }).catch((err) => {
        reject(err);
      });
    }
  });
};
```

```js
const promise1 = new Promise((resolve) => {
  console.log('1')
  setTimeout(() => {
    resolve(1)

  }, 100)
})

const promise2 = new Promise((resolve) => {
  resolve(2)
})


Promise.myAll([promise1, promise2]).then(res => {
  console.log('res', res)
})
```

### 3. 实现 `Promise.race`
```
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，
返回的 promise 就会解决或拒绝。
```
```js
Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i =0; i< arr.length;i++) {
      arr[i].then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
```

测试：

```js
const promise1 = new Promise((resolve) => {
  console.log('1')
  setTimeout(() => {
    resolve(1)

  }, 100)
})

const promise2 = new Promise((resolve) => {
  resolve(2)
})


Promise.myRace([promise1, promise2]).then(res => {
  console.log('resR', res)
})
```

### 4. 实现 `Promise.allSettled`
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


### 5. 实现 `Promise.finally`


- 接收一个回调函数，但无参数接收
- 无论成功失败状态，都会执行finally

```js
Promise.prototype.finally = function(callback) {
  return this.then(res => {
    callback()
    return res
  }, err => {
    callback()
    throw err
  })
}
```
