`tim-js-sdk` 被打包了很多份，导致很多页面都要重新加载，具体看下图：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_872d9c8596f2065736.png" width="600"/>

这里用 `split-chunks` 优化下：

```js
cacheGroups: [
  {
    tim_js_sdk: {
      name: 'tim-js-sdk',
      test: /[\\/]node_modules[\\/]_?tim-js-sdk(.*)/,
      priority: 15,
      chunks: 'all',
      reuseExistingChunk: true,
    },
  }
  // ...
]
```

此外 `tim-wx-sdk` 也被打包了进来，具体看下图：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_4a50a773f82f8cece9.png" width="600"/>


看了一下，应该是某些地方没用条件编译，且 tree-shaking 没有生效。这里我封装了下，统一用 press-ui 的：

```ts
import { TIM } from '@tencent/press-ui/common/im/helper/tim';
```


同时，`press-ui` 里的 `TIM` 兼容文件不能用 `typescript`，否则 `import` 部分的条件编译不生效。这里用了 `javascript` + `ts-check` 的方式，既让条件编译生效，又可以拥有类型提示。

```js
// @ts-check
/**
 * @typedef {import("tim-js-sdk").default} TIM_TYPE
 */


// #ifdef H5
import TIM_WEB from 'tim-js-sdk';
// #endif
// #ifndef H5
import TIM_MP from 'tim-wx-sdk';
// #endif
/**
 * @type {TIM_TYPE}
 */
let TIM;

// #ifdef H5
TIM = TIM_WEB;
// #endif

// #ifndef H5
TIM = TIM_MP;
// #endif

export {
  TIM,
};
```

最终效果如下图：


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_0e01e3afb98ee7f80d.png" width="600"/>

