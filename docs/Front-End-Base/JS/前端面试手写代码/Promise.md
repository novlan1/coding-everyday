- [1. 实现 Promise](#1-实现-promise)
- [2. 实现 `Promise.all`](#2-实现-promiseall)
- [3. 实现 `Promise.race`](#3-实现-promiserace)
- [4. 实现 `Promise.allSettled`](#4-实现-promiseallsettled)
- [5. 实现 `Promise.finally`](#5-实现-promisefinally)

### 1. 实现 Promise


```js
// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
    resolve(100)
}).then(res => 2 * res, err => console.log(err))
    .then(res => console.log(res), err => console.log(err))

// 链式调用 输出300
const p4 = new Promise((resolve, reject) => {
    resolve(100)
}).then(res => new Promise((resolve, reject) => resolve(3 * res)), err => console.log(err))
    .then(res => console.log(res), err => console.log(err))
```

- 1、then方法本身会返回一个新的Promise对象
- 2、如果返回值是promise对象，返回值为成功，新promise就是成功
- 3、如果返回值是promise对象，返回值为失败，新promise就是失败
- 4、如果返回值非promise对象，新promise对象就是成功，值为此返回值



```js
function resolvePromise(promise2, x, resolve, reject) {
  // 判断x是不是promise
  // 规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
  if (promise2 === x) { // 不能自己等待自己完成
    return reject(new TypeError('循环引用'));
  };
  // x是除了null以外的对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    let called;// 防止成功后调用失败
    try { // 防止取then是出现异常  object.defineProperty
      const { then } = x;// 取x的then方法 {then:{}}
      if (typeof then === 'function') { // 如果then是函数就认为他是promise
        // call第一个参数是this，后面的是成功的回调和失败的回调
        then.call(x, (y) => { // 如果Y是promise就继续递归promise
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => { // 只要失败了就失败了
          if (called) return;
          called = true;
          reject(r);
        });
      } else { // then是一个普通对象，就直接成功即可
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else { // x = 123 x就是一个普通值 作为下个then成功的参数
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    // 默认状态是等待状态
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];
    const resolve = (data) => { // this指的是实例
      if (this.status === 'pending') {
        this.value = data;
        this.status = 'resolved';
        // while(this.onResolvedCallbacks.length) {
        //   this.onRejectedCallbacks.shift()(this.value)
        // }
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        // while (this.onRejectedCallbacks.length) {
        //   this.onRejectedCallbacks.shift()(this.reason)
        // }
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try { // 执行时可能会发生异常
      executor(resolve, reject);
    } catch (e) {
      reject(e);// promise失败了
    }
  }
  then(onFuiFilled, onRejected) {
    // 防止值得穿透
    onFuiFilled = typeof onFuiFilled === 'function' ? onFuiFilled : y => y;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
      throw err;
    };
    let promise2;// 作为下一次then方法的promise

    if (this.status === 'resolved') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            // 成功的逻辑 失败的逻辑
            const x = onFuiFilled(this.value);
            // 看x是不是promise 如果是promise取他的结果 作为promise2成功的的结果
            // 如果返回一个普通值，作为promise2成功的结果
            // resolvePromise可以解析x和promise2之间的关系
            // 在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            // 在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
    // 当前既没有完成也没有失败
    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        // 把成功的函数一个个存放到成功回调函数数组中
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFuiFilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        // 把失败的函数一个个存放到失败回调函数数组中
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      });
    }
    return promise2;// 调用then后返回一个新的promise
  }
  catch(onRejected) {
    // catch 方法就是then方法没有成功的简写
    return this.then(null, onRejected);
  }
}

MyPromise.all = function (promises) {
  // promises是一个promise的数组
  return new MyPromise((resolve, reject) => {
    const arr = []; // arr是最终返回值的结果
    let i = 0; // 表示成功了多少次
    function processData(index, data) {
      arr[index] = data;
      if (++i === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};

// 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

// 生成一个成功的promise
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => resolve(value));
};

// 生成一个失败的promise
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

MyPromise.defer = MyPromise.deferred = function () {
  const dfd = {};
  dfd.MyPromise = new MyPromise((resolve, reject) =>  {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};


// 测试
const p = new MyPromise((resolve) => {
  console.log('1');
  resolve(2);
});

const a = p.then((res) => {
  console.log('3', res);
  return res * 2;
});

console.log('a', a);


a.then((res) => {
  console.log('resresres', res);
});
```

参考：
1. [Promise不会？？看这里！！！史上最通俗易懂的Promise！！！](https://juejin.cn/post/6844903607968481287)
2. [看了就会，手写Promise原理，最通俗易懂的版本！！](https://juejin.cn/post/6994594642280857630)



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


参考：

1. [手把手一行一行代码教你“手写Promise“，完美通过 Promises/A+ 官方872个测试用例](https://juejin.cn/post/7043758954496655397)