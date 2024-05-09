记录一个问题，`ts`文件中对`import`语句的条件编译不生效。`debug` 的时候会发现 `ts` 文件内部 `import` 的部分已经换成了 `require`，以及引入了一些 `polyfill`。



问题原因在于使用 chainWebpack 时候使用了一个错误的 rule 名称

```ts
config.module
  .rule('js')
  .test(/\.[jt]s$/)
  .use(LOADER_MAP.crossPlatformProd)
  .loader(LOADER_MAP.crossPlatformProd)
  .end();
```

上面的代码对 `js/ts` 文件，使用了一个替换关键词的 `loader`，本来是没问题的，但是 `.rule('js')` 这个名字不对，`vue-cli` 内部应该已经注册有了，会和以前的合并，导致对 `ts` 文件执行所有的 js` 配置，比如一些转化编译。

如何解决？改成一个无关的名字就可以，比如 `cross-platform-prod`。
