const utilB = require('./js/utilB');
console.log(utilB);
// 异步加载文件，类似于 import()
const utilC = () => require.ensure(['./js/utilC'], function (require) {
  console.log(require('./js/utilC'));
});
utilC();
