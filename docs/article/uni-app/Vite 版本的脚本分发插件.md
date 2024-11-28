[TOC]
## 1. 开始

遇到一个比较大的项目从 `Vue2` 的 `uni-app` 迁移到 `Vue3`，主包大小又超了，在组件分发的基础上，做了脚本分发，这里简单记录下。

脚本分发就是把只有分包使用的`js/ts`等放到对应的分包，而不是基于目录位置。

## 2. 实现

### 2.1. 默认打包策略

`uni-app` `Vue3` 版本默认打包策略如下:

1. `assets` 文件，比如 `png/pdf/ttf` 等文件，放到 `common/assets`
2. 项目内 `js/ts`，但不是 `page/component` 对应的文件，**放到相对目录位置**
3. 项目外 `js/ts` 放到 `common/vendor`
4. `isVueJs` 文件，放到 `common/vendor`
5. `node_modules` 下非 `js/ts/css` 文件，并且是入口文件（`getModuleInfo(id).isEntry` 为 `true`），放到 `common/vendor`

源码位置：`packages/uni-mp-vite/src/plugin/build.ts`。

```ts
function createMoveToVendorChunkFn(): GetManualChunk {
  const cache = new Map<string, boolean>()
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  return (id, { getModuleInfo }) => {
    const normalizedId = normalizePath(id)
    const filename = normalizedId.split('?')[0]
    // 处理资源文件
    if (DEFAULT_ASSETS_RE.test(filename)) {
      return 'common/assets'
    }
    // 处理项目内的js,ts文件
    if (EXTNAME_JS_RE.test(filename)) {
      if (filename.startsWith(inputDir) && !filename.includes('node_modules')) {
        const chunkFileName = removeExt(
          normalizePath(path.relative(inputDir, filename))
        )
        if (
          !chunkFileNameBlackList.includes(chunkFileName) &&
          !hasJsonFile(chunkFileName) // 无同名的page,component
        ) {
          return chunkFileName
        }
        return
      }
      // 非项目内的 js 资源，均打包到 vendor
      return 'common/vendor'
    }
    if (
      isVueJs(normalizedId) ||
      (normalizedId.includes('node_modules') &&
        !isCSSRequest(normalizedId) &&
        // 使用原始路径，格式化的可能找不到模块信息 https://github.com/dcloudio/uni-app/issues/3425
        staticImportedByEntry(id, getModuleInfo, cache))
    ) {
      return 'common/vendor'
    }
  }
}
```

相比于 `Vue2` 版本，有几个不同：

1. 基于目录位置进行打包
2. 不存在分包的 `common/vendor`
3. 公共目录下的文件，即使只有1个子包使用，也是放到主包中，即 `common/vendor`

`Vue2` 版本的[分包优化](https://zh.uniapp.dcloud.io/collocation/manifest.html#%E5%85%B3%E4%BA%8E%E5%88%86%E5%8C%85%E4%BC%98%E5%8C%96%E7%9A%84%E8%AF%B4%E6%98%8E)说明。

### 2.2. 项目遗留问题

调试发现上面代码里的 `process.env.UNI_INPUT_DIR` 也就是 `inputDir` ，在我们项目中是相对路径，比如 `src/project/user`，而插件内的 `filename` 是绝对路径，导致 `filename.startsWith(inputDir)` 一定为 `false`，从而让所有文件都放到 `common-vendor` 中。

而 `uni-app` 官方 `demo` 中 `process.env.UNI_INPUT_DIR` 其实是绝对路径，我们项目是 `monorepo`，所以是覆盖了这个变量。

另外，项目中有大量依赖混乱的问题：

- 主包引用子包
- 子包引用其他子包

如果强行改成绝对路径，会导致引用错误。比如 `src/project/user/views/sche/logic/reset-sche.js`，按照上面的规则，是打包到 `views/sche/logic/reset-sche.js` 位置。但是它又被主包的JS引用，形成了循坏依赖。

1. 主包JS打包成 `common/vendor`，依赖 `views/sche/logic/reset-sche.js`
2. `views/sche/logic/reset-sche.js` 打包成 `views/sche/logic/reset-sche.js`，引用主包内其他JS，即依赖 `common/vendor`

报错信息：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/
own_mike_d0f6532827b3cd18db.png" width="500">

common/vendor 相关内容：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_c02d488b4f5347989d.png" width="500">

`views/sche/logic/reset-sche.js` 相关内容：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_a9299e602389d6fbb3.png" width="500">

### 2.3. 最佳出路

**修改 `process.env.UNI_INPUT_DIR` 为绝对路径，并梳理项目代码，杜绝错误依赖问题，是减包的最佳出路**。

但今天不介绍这个，介绍的是脚本分发。我们想下，即使我们的依赖梳理很清楚了，一些模块依然不得不放到公共路径，比如它可能是第三方依赖，`node_modules`下的内容。如何将它打到分包中呢？

### 2.4. 脚本分发

脚本分发插件主要工作都在 `build.rollupOptions.output.manualChunks` 配置中进行。

1. 根据 `id/getModuleInfo` 等获取依赖关系
2. 判断最终使用者只有一个分包，就打到分包中

如何获取依赖关系：

1. 涉及两个核心概念，`importers` 和 `dynamicImporters`，前者是引用者，后者是动态引用者
2. 小程序中并没有真正的动态引用，可以认为是 `uni-app` 巧妙了利用这个字段记录了组件的依赖关系
3. `getModuleInfo` 会返回 `importers` 和 `dynamicImporters`，向上递归就能获取到完整的依赖关系

与组件分发中收集依赖的差别：

1. 组件分发中能拿到整个`bundle`，脚本分发中只能拿到自己以及父节点
2. 可以认为**组件分发能拿到整棵树，脚本分发只能拿到一个树枝**

`uni-app` 对组件有特殊处理：

1. 特殊处理指的是将组件在`load`和`transform`时进行了**虚拟化**
2. 推测是为了简化打包处理，比如不用考虑打到`vendor`，断开与JS的引用关系。
3. **虚拟组件以 `uniComponent://` 开头，虚拟页面以 `uniPage://` 开头，并都进行了 `base64` 编码**
4. 用 `base64` 编码的好处是，可以无损解码

`uni-app` 中组件的引用关系：

1. `importers` 关系: JS => [组件A, 其他] => [虚拟组件A]
2. **`dynamicImporters` 关系: 虚拟组件A => [组件B, 其他]**
3. **`importers` 关系: 组件B => [虚拟组件B]**
4. `dynamicImporters` 关系: 虚拟组件B => [组件C, 其他]
5. `importers` 关系: ...

从上面可以看到，涉及到组件的，就会转为虚拟组件，**要找组件的引用关系，就是找对应虚拟组件的 `dynamicImporters`**。

递归寻找引用者时需要注意：

1. 缓存节点，避免重复寻找
2. 注意循环引用，**遇到循环引用的一律当成主包内容**，不处理，避免出错

基本上找到这个树枝，就完成大部分工作了，剩下的是寻找分包：

1. 被 `main.ts/App.vue` 使用了，返回主包
2. 被主包页面使用了，返回主包
3. 被分包页面使用了，返回分包
4. **被分包组件使用了，也返回分包**

全部分析完后，就能筛选出哪些需要分发了，返回一个合成的子包路径即可。

```ts
const targetName = `${subPackages[0]}/${dispatchDir}/${dispatchChunkFileName}`;
```


## 3. 效果

使用后能减少 `130KB`。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_649de2fcc66b512bb3.png" width="500">


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_c0afad5ba87391b28d.png" width="500">


## 4. 感悟

> 你如果深刻理解它，你就会把代码写的又简单、又直接、又没有bug、性能又好，你如果不理解它，你就会把代码写的又臭又长，bug又多，又难维护、难理解。
>
> 有时候，越快完成，写得越好，越慢完成，写得越差


## 5. 参考

1. https://juejin.cn/post/7135671174893142030
2. https://github.com/sanyuan0704/vite-plugin-chunk-split/blob/master/README-CN.md
