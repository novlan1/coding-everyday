
通过 defineWebpackPlugin 注入的变量无法识别怎么办？

```
 ReferenceError: ROUTES is not defined
```

只需要在 jest.config.js 下增加：


```ts
module.exports = {
  globals: {
    ROUTES: '',
  },
}
```

