[toc]

## 1. 开始

介绍一款基于 `uni-app` 的跨端组件库——[press-ui](https://mobile.woa.com/press-ui/)，也可用于普通H5项目。API 与 `vant` 一致，可以看作是 `uni-app` 版本的 vant。



为什么不用`uni-ui`或者`uview`等组件库呢？有两个原因：

1. 我们项目是从H5项目转成`uni-app`项目的，项目比较大，改动成本高。
2. `uni-ui`、`uview`这些库的API易用性较差，与`vant`相比差距大。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-demo-screenshot.png" width="300" >


## 2. 介绍

### 2.1. 基础介绍

1. 50+ 基础组件
2. 支持H5、微信小程序、QQ小程序
3. 零外部依赖，不依赖三方 npm 包
4. 丰富的文档和示例
5. 支持主题定制
6. 支持国际化


三端Demo体验地址：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/press-ui-demo-qrcode-3.png" width="700">

文档地址：

[https://mobile.woa.com/press-ui/](https://mobile.woa.com/press-ui/)

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-doc-screenshot.png" width="800" >


### 2.2. 解决痛点


`press-ui`主要解决了以下痛点：

1. 可支持包含`vant`的H5项目平滑迁移至`uni-app`项目，只需要改下引用地址和组件名称。
2. 丰富的组件类型，以及易用的API，让`uni-app`开发变得简单。
3. 支持国际化、主题定制等，组件灵活性更强




### 2.3. 应用场景

`press-ui`可应用于`uni-app`项目，或者普通的H5项目，目前已应用在王者赛宝、HoK Club、赛宝pro等项目中。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/pvp-esports-screenshort.png" width="300">


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/hok-club-screenshot.png" width="300">


## 3. 如何使用

### 3.1. 用于uni-app项目


1. 安装npm包


```bash
npm i @tencent/press-ui
```


2. 在页面中正常引入并使用

比如 `message-detail` 组件：

```html
<template>
  <PressMessageDetail />
</template>
```

```ts
<script>
import PressMessageDetail from '@tencent/press-ui/press-message-detail/press-message-detail.vue'

export default {
  components: {
    PressMessageDetail, 
  }
}
</script>
```

3. 配置`vue.config.js`

注意，需要在`vue.config.js`中配置下 `transpileDependencies`：

```js
module.exports = {
  transpileDependencies: ['@tencent/press-ui'],
}
```

### 3.2. 用于普通H5项目


`press-ui` 比普通的组件只是多了条件编译，所以加一个支持条件编译的`loader`就可以解决了，`loader`代码地址在[这里](https://git.woa.com/pmd-mobile/support/uni-plugin-light/tree/master/loader/ifdef-loader)。


`loader`使用方法如下：

1. 安装 npm 包：

```bash
npm i @tencent/uni-plugin-light -D
```

2. 在 `vue.config.js` 中添加如下设置：

```js
const LOADER_IFDEF = '@tencent/uni-plugin-light/lib/loader/ifdef-loader';

module.export = {
  chainWebpack(config) {
    config.module
      .rule('ifdef-loader')
      // 根据项目实际配置文件类型
      .test(/@tencent\/press-ui.*(\.vue|\.ts|\.js|\.css|\.scss)$/)
      .use(LOADER_IFDEF)
      .loader(LOADER_IFDEF)
      .options({
        context: { H5: true },
        type: ['css', 'js', 'html'],
      })
      .end();
  }
}
```

## 4. 共建

`press-ui` 项目地址在[这里](https://git.woa.com/pmd-mobile/support/press-ui)，文档在[这里](https://mobile.woa.com/press-ui/)。


### 4.1. 后续规划

`press-ui`后续规划包括：

- 支持`Android`、`iOS`
- 优化构建流程和开发体验
- 减小`npm`包大小
- 样式梳理，提取变量并减少不必要样式引入
- 接入`swiper`、`list`等组件
- 对外开源


### 4.2. 共建


欢迎体验、试用、共建，可以加入群聊，二维码过期可以私聊加入。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-chat-group-new.png" width="300">
