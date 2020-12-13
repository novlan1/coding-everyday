## npm-run-all 

npm-run-all 提供了多种运行多个命令的方式，常用的有以下几个：

```js
--parallel: 并行运行多个命令，例如：npm-run-all --parallel lint build
--serial: 多个命令按排列顺序执行，例如：npm-run-all --serial clean lint build:**
--continue-on-error: 是否忽略错误，添加此参数 npm-run-all 会自动退出出错的命令，继续运行正常的
--race: 添加此参数之后，只要有一个命令运行出错，那么 npm-run-all 就会结束掉全部的命令
```

例子：
`package.json`中的`scripts`：
```json{
"scripts": {
    "clean": "rimraf dist",
    "lint":  "eslint src",
    "build": "babel src -o lib"
}
```
等价于：
```
npm-run-all clean lint build
```

又如：
```json
"scripts": {
  "all:install": "npx npm-run-all --serial install:*",
  "all:start": "npm-run-all --parallel start:*",
  "install:main": "cd main-project && npm i",
  "start:main": "cd main-project && npm start",
  "install:manage": "cd manage-project && npm i",
  "start:manage": "cd manage-project && npm start",
  "install:release": "cd release-project && npm i",
  "start:release": "cd release-project && npm start",
}
```




参考资料：https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md