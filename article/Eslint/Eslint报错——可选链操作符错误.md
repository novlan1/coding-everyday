## 可选链操作符错误

使用js的可选链接符的时候，eslint总会有报错和红杠。

parsing error： unexpected token .

其实升级`eslint`就可以了。

`eslint@^7.5`现在支持可选链接。

`.eslintrc` 文件中配置

```js
{
  "parserOptions": {
    "ecmaVersion": 2020
  }
}
```


## parserOptions.project 错误

报错信息如下：

```
error  Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: test/weather/parse.test.ts.
The file must be included in at least one of the projects provided
```

原因可能是：

1. 一个文件夹下同时存在同名的js和ts文件，比如 index.js 和 index.ts
2. 一些ts文件，tsconfig.json 的 include 配置将它们排除在外，但是没被.eslintignore 排除，导致 eslint 不知道用哪种解析方式解析。




需要在 .eslintrc 中加上 parserOptions.project 配置：

```js
module.exports = {
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
```

tsconfig.eslint.json 内容如下：

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "resolveJsonModule": true,
  },
  "include": [
    "**/*.ts",
    "**/*.js"
  ]
}
```



参考：
1. https://www.jianshu.com/p/f95d54ec6994
2. https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject
3. https://github.com/typescript-eslint/typescript-eslint/issues/955



