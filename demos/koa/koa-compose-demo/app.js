// 模拟 Koa 创建的实例
const app = {
  middlewares: []
};

// 创建 use 方法
app.use = function(fn) {
  app.middlewares.push(fn);
};

// app.compose.....




module.exports = app;
