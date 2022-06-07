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

