## husky + lint-staged

利用 `husky` 进行代码提交前的格式检查，`lint-staged` 可以只检查本次暂存的，不改动之前的代码。

安装
```
npm install husky lint-staged --save-dev
```

`package.json`中：


```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
  }
},
"lint-staged": {
  "*.js": [ "eslint --fix"],
  "*.vue":[ "eslint --fix"]
}
```

