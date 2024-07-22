class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    this.promiseState = MyPromise.PENDING;
    this.promiseResult = null;
    this.onFulfilledCallbacks = []; // 解决resolve异步，也就是先走到then，收集回调，然后判断状态执行相应的回调
    this.onRejectedCallbacks = [];

    try {
      func(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (result) => {
    if (this.promiseState == MyPromise.PENDING) {
      // resolve 和 reject 是要在 事件循环末尾 执行
      setTimeout(() => {
        this.promiseState = MyPromise.FULFILLED;
        this.promiseResult = result;

        this.onFulfilledCallbacks.map((cb) => {
          cb(result);
        });
      });
    }
  }
  reject = (reason) => {
    if (this.promiseState == MyPromise.PENDING) {
      setTimeout(() => {
        this.promiseState = MyPromise.REJECTED;
        this.promiseResult = reason;

        this.onRejectedCallbacks.map((cb) => {
          cb(reason);
        });
      });
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : a => a;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
      throw reason;
    };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.promiseState === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }

      if (this.promiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.promiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  console.log('=', promise2, x, resolve, reject);
}


// const promise1 = new MyPromise((resolve, reject) => {
//   resolve('这次一定');
// });
// console.log(promise1);
// // MyPromise {promiseState: 'fulfilled', PromiseResult: '这次一定'}
// const promise2 = new MyPromise((resolve, reject) => {
//   reject('下次一定');
// });
// console.log(promise2);
// // MyPromise {promiseState: 'rejected', PromiseResult: '下次一定'}


// const promise = new MyPromise((resolve, reject) => {
//   throw new Error('白嫖不成功');
// });

// promise.then(
//   (result) => {
//     console.log('fulfiiled:', result);
//   },
//   (reason) => {
//     console.log('rejected:', reason);
//   }
// );


const promise2 = new MyPromise((resolve,) => {
  resolve('这次一定');
});
promise2.then(
  undefined,
  (reason) => {
    console.log('rejected:', reason);
  }
);


// console.log(1);
// const promise1 = new MyPromise((resolve, reject) => {
//   console.log(2);
//   setTimeout(() => {
//     console.log('A', promise1.promiseState);
//     resolve('这次一定');
//     console.log('B', promise1.promiseState);
//     console.log(4);
//   });
// });
// promise1.then(
//   (result) => {
//     console.log('C', promise1.promiseState);
//     console.log('fulfilled:', result);
//   },
//   (reason) => {
//     console.log('rejected:', reason);
//   }
// );
// console.log(3);


// 测试代码
const promise6 = new MyPromise((resolve,) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});
promise6.then((value) => {
  console.log(1);
  console.log('resolve', value);
});
promise6.then((value) => {
  console.log(2);
  console.log('resolve', value);
});
promise6.then((value) => {
  console.log(3);
  console.log('resolve', value);
});

