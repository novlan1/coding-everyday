// -----------------mock一些请求
const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  });
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  });

/**
 * 实现一个 scheduler 函数，满足以下要求：
 * 接收一个参数 max 控制最大并发请求量
 * 执行以下代码依次输出：2、3、1、4
 */

const addRequest = scheduler(2);
addRequest(request1).then(res => {
  console.log('A', res);
});
addRequest(request2).then(res => {
  console.log('B', res);
});
addRequest(request3).then(res => {
  console.log('C', res);
});
addRequest(request4).then(res => {
  console.log('D', res);
});


// 解答
function scheduler(max) {
  const requestList = [];
  let requesting = 0;

  return function (request) {
    const runTask = () => {
      while (requestList.length && requesting < max) {
        const currentRequest = requestList.shift();

        requesting += 1;

        currentRequest().then((result) => {
          requesting -= 1;
          currentRequest.resolve(result);
          runTask();
        });
      }
    };

    return new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
      requestList.push(request);
      runTask();
    });
  };
}
