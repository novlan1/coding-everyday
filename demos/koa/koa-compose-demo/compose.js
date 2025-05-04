const app = require('./app.js');

// 1、同步的实现
app.compose = function () {
  // 递归函数
  function dispatch(index) {
      // 如果所有中间件都执行完跳出
      if (index === app.middlewares.length) return;

      // 取出第 index 个中间件并执行
      const route = app.middlewares[index];
      console.log('index', index, route);
      return route(() => dispatch(index + 1));
  }

  // 取出第一个中间件函数执行
  dispatch(0);
};

// 2 升级为支持异步

app.compose2 = function () {
  // 递归函数
  function dispatch(index) {
      // 如果所有中间件都执行完跳出，并返回一个 Promise
      if (index === app.middlewares.length) return Promise.resolve();

      // 取出第 index 个中间件并执行
      const route = app.middlewares[index];

      // 执行后返回成功态的 Promise
      return Promise.resolve(route(() => dispatch(index + 1)));
  }

  // 取出第一个中间件函数执行
  dispatch(0);
};


// Redux 旧版本 compose 的实现方式
app.compose3 = function () {
  return app.middlewares.reduceRight((a, b) => () => b(a), () => {})();
};

// 2、升级为支持异步
app.compose4 = function () {
  return Promise.resolve(
      app.middlewares.reduceRight(
          (a, b) => () => Promise.resolve(b(a)),
          () => Promise.resolve()
      )()
  );
};


// Redux 新版本 compose 的实现方式
app.compose5 = function () {
  return app.middlewares.reduce((a, b) => arg => a(() => b(arg)))(() => {});
};
/**
 *
 */

// 2、升级为支持异步
app.compose6 = function () {
  return Promise.resolve(
      app.middlewares.reduce((a, b) => arg =>
          Promise.resolve(a(() => b(arg)))
      )(() => Promise.resolve())
  );
};

// 使用 async 函数实现
app.compose7 = function () {
  // 自执行 async 函数返回 Promise
  return (async function () {
      // 定义默认的 next，最后一个中间件内执行的 next
      let next = async () => Promise.resolve();

      // middleware 为每一个中间件函数，oldNext 为每个中间件函数中的 next
      // 函数返回一个 async 作为新的 next，async 执行返回 Promise，解决异步问题
      function createNext(middleware, oldNext) {
          return async () => {
              await middleware(oldNext);
          };
      }

      // 反向遍历中间件数组，先把 next 传给最后一个中间件函数
      // 将新的中间件函数存入 next 变量
      // 调用下一个中间件函数，将新生成的 next 传入
      for (let i = app.middlewares.length - 1; i >= 0; i--) {
          next = createNext(app.middlewares[i], next);
      }

      await next();
  }());
};


module.exports = app;
