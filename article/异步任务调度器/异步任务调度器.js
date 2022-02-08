class Scheduler {
  constructor() {
    this.promises = [];
    this.doingJobs = 0;
  }

  add(promiseCreater) {
    return new Promise((resolve, reject) => {
      promiseCreater.resolve = resolve;
      promiseCreater.reject = reject;

      this.promises.push(promiseCreater);
      this.run();
    });
  }

  run() {
    if (this.doingJobs < 2 && this.promises.length) {
      this.doingJobs += 1;
      const promise = this.promises.shift();

      promise().then((res) => {
        promise.resolve(res);
      })
        .catch((err) => {
          promise.reject(err);
        })
        .finally(() => {
          this.doingJobs -= 1;
          this.run();
        });
    }
  }
}


const scheduler = new Scheduler();
const timeout = time => new Promise(resolve => setTimeout(resolve, time));
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

// 打印顺序为 2 3 1 4
