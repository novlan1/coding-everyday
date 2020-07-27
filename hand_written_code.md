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