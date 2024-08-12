## 路径修复

uni-app 运行时生成的引用路径错误，查看源码发现是 `packages/uni-cli-shared/src/utils.ts` 中的问题，

```ts
export function normalizeMiniProgramFilename(
  filename: string,
  inputDir?: string
) {
  if (!inputDir || !path.isAbsolute(filename)) {
    return normalizeNodeModules(filename)
  }
  return normalizeNodeModules(path.relative(inputDir, filename))
}
```

这里举个例子，`filename` 为 `/Users/yang/Documents/git-woa/guandan-match/node_modules/@tencent/press-ui/press-info/press-info.vue`，`inputDir` 为 `./src/project/guandan-match` 时，`path.relative` 生成的路径就会带上 `../`，这里背后的逻辑是 `inputDir` 和 `node_modules` 必须是同一级。


uni-app 社区也有其他人遇到了相同问题，参见：

- https://ask.dcloud.net.cn/question/152306
- https://github.com/dcloudio/uni-app/issues/3049

如何解决呢？

尝试了覆盖 rollupOptions，发现不生效，采用的是脚本改源码。

