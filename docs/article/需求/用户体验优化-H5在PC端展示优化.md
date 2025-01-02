## 1. 开始

介绍下 H5 项目在 PC 端打开的优化。背景是 H5 用电脑浏览器打开时，会变形，宽高都会被拉长。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_17d782ed948ba4b524.png" width="500">

## 2. 原理

优化思路是模拟浏览器的手机调试，具体就是在 PC 端打开一个 `iframe`，其宽高是手机的尺寸，其路径是想要打开的页面路径。

当发现是在PC打开，且不在白名单内时，就跳转到 `/web-container?path=xxx` 的路由，`xxx` 就是之前的 `window.location.href`。

`web-container` 页面内是一个 `iframe`，会拿到页面的 `query.path`，将其作为 `iframe` 的 `src`。

当子应用页面跳转时，调用 `window.parent.history.replaceState`，更新 `query.path`，这样刷新页面，不会跳转到其他地方。

当发现是手机浏览器打开时，且当前是 `web-container` 模式，就 `router.replace` 到真正的页面，即去掉子应用。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_6908e2b6ef5ea73567.png" width="500">

## 3. 效果

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_4d49d0193a52d02293.png" width="500">


## 4. 接入方式

先根据自身业务，进行二次封装，如：

```ts
import { redirectToWebContainerInPC } from 'press-plus/common/web-container/index';


const pathWhiteList = ['web-container', 'third-plat-login', 'ai-room-pc'];
const disableWebContainerList = ['ai-room-pc'];
const corePath = '/pvpesport.next.user';


export function redirectToWebContainer(options) {
  return redirectToWebContainerInPC({
    pathWhiteList,
    disableWebContainerList,
    corePath,

    router: options?.router,
    log: true,
    tag: options?.tag,
  });
}
```

在 `App.vue` 中 `onLaunch` 方法中增加以下方法。

```ts
onLaunch(() => {
  // #ifdef H5
  redirectToWebContainer({ router: this.$router, tag: 'onLaunch' });

  window.addEventListener('resize', () => {
    redirectToWebContainer({ router: this.$router, tag: 'resize' });
  });

  this.$router.afterEach(() => {
    redirectToWebContainer({ router: this.$router, tag: 'afterEach' });
  });
  // #endif
})
```
