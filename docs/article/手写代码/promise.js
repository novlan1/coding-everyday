const STATUS_MAP = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

class MyPromise {
  constructor(executor) {
    this.status = STATUS_MAP.PENDING;
    this.value = undefined;
    this.reason = undefined;

    // Step 2
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = []

    const resolve = (value) =>{
      if (this.status === STATUS_MAP.PENDING) {
        this.status = STATUS_MAP.FULFILLED
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === STATUS_MAP.PENDING) {
        this.status = STATUS_MAP.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    console.log('status', this.status)
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === STATUS_MAP.FULFILLED) {
        onFulfilled?.(this.value)
      }
      if (this.status === STATUS_MAP.REJECTED) {
        onRejected?.(this.reason)
      }

      if (this.status === STATUS_MAP.PENDING) {
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  console.log('1111')
  resolve(111)
})
p.then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})

const asyncP = new MyPromise((resolve, reject) => {
  console.log('222')
  setTimeout(() => {
    resolve(222)
  },1000)
})

asyncP.then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})