const app = require("./compose");

app.use(next => {
    console.log(1);
    next();
    console.log('next', next)
    console.log(2);
});

app.use(next => {
    console.log(3);
    next();
    console.log(4);
});

app.use(next => {
    console.log(5);
    next();
    console.log(6);
});

app.compose();
// app.compose2();
// app.compose3();
// app.compose4();
// app.compose5();
// app.compose6();
// app.compose7();



// 参考资料：[KOA2 compose 串联中间件实现洋葱模型](https://juejin.im/post/6844903688985657357)