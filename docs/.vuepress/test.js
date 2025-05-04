const {
  // getFileName,
  genSidebar,
} = require('./utils');

// const path = require('path');
// const rootPath = path.dirname(__dirname);

const res = genSidebar('css', '/docs/计算机基础', false);
console.log(JSON.stringify(res));
