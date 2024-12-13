## 1. 开始

介绍下 Page Animation 的原理、效果。

## 2. 原理

核心原理是借助了 `router` 的 `beforeEach` 和 `afterEach` 钩子，在路由跳转前后改变顶层类名，进而增加动画。

`beforeEach` 负责添加 `xxx-out` 类名，`afterEach` 负责添加 `xxx-in` 类名。这两钩子中是拿不到路由是前进还是后退的，所以需要 `hook` 路由跳转方法，记录跳转类型。

以最常用的 `slide-in-right` 举例，最核心的样式是 `translateX`，其作用的元素是 `uni-app`，它是 `body > #app` 的下个元素。

### 2.1. 页面跳转

前进时，动画从右往左。

```scss
.page-slide-in-right--out {
  uni-page {
    // 前进，1
    animation: page-left-out var(--redirect-duration, 300ms) ease;
  }
}

.page-slide-in-right--in {
  uni-page {
    // 前进，2
    animation: page-right-in var(--redirect-duration, 300ms) ease;
  }
}
```

`left-out` 内容：

```scss
@keyframes page-left-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-90%);
  }
}
```

`right-in` 内容：

```scss
@keyframes page-right-in {
  0% {
    opacity: 0;
    transform: translateX(90%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_716cf8a6eab5168bb9.png" width="300">

页面表现：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_da779c6987d6ce72fa.gif" width="260">

### 2.2. 页面返回

返回时，动画从左往右。

```scss
.page-slide-in-right--out {
  &.back uni-page {
    // 返回，1
    animation: page-right-out var(--redirect-duration, 300ms) ease;
  }
}

.page-slide-in-right--in {
  &.back uni-page {
    // 返回，2
    animation: page-left-in var(--redirect-duration, 300ms) ease;
  }
}
```

`right-out` 内容：

```scss
@keyframes page-right-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(90%);
  }
}
```

`left-in` 内容：

```scss
@keyframes page-left-in {
  0% {
    opacity: 0;
    transform: translateX(-90%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_d1e5f789f8ce463b57.png" width="300">

页面表现：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_7f289563c77d92f439.gif" width="260">

## 3. 效果

左边是使用之前，右边是使用之后。使用后有切换动画，流畅感有提升。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_2f9613b04c19a3c50f.gif" width="200">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_1726c8e1bea10c9ff3.gif" width="200">

## 4. 接入方式

在 `App.vue` 中 `onLaunch` 方法中增加拦截。

```ts
// #ifdef H5
import { pageAnimation } from 'press-plus/common/page-animation/index';
import { hookVueRouter } from 'press-plus/common/page-animation/hook-vue-router';
// #endif


onLaunch(() => {
  // #ifdef H5
  pageAnimation({ router: this.$router });
  hookVueRouter(this.$router, {
    log: process.env.NODE_ENV === 'development',
  });
  // #endif
})
```
