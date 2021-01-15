const {
  getFileName,
  genSidebar
} = require('./utils');

const path = require('path');
const rootPath = path.dirname(__dirname);

const res = genSidebar('css', '/docs/Computer-Base',false);
console.log(JSON.stringify(res));
