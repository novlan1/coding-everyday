## 1. 工程适配

介绍下基于 uni-app 的小程序插件的设计思想、使用方法、适配工作、性能优化等。

### 1.1. 设计原则

简单易用，一套代码既能独立发布，又能当小程序插件。独立发布包含了 uni-app 支持的所有端，包括 H5、微信小程序、QQ 小程序等。所以目标是 n+1 端，额外的 1 就是小程序插件。

### 1.2. 使用方法

在环境变量 `.env.local` 中新增 `VUE_APP_MP_PLUGIN = pluginRoot`。`pluginRoot` 会被当作插件目录名称。

启动命令如下：

```bash
# 开发
npm run dev:mp-plugin 
# 发布
npm run build:mp-plugin
```

然后在小程序开发者工具打开 `dist/dev/mp-weixin` 或者 `dist/build/mp-weixin` 进行调试、预览、上传等。

### 1.3. 适配工作

包含以下几部分

1. 命令兼容
2. playground 自动生成
3. 路径修复

#### 1.3.1. 命令兼容

默认 uni-app 脚手架不提供小程序插件编译命令，但提供了[相关文档](https://zh.uniapp.dcloud.io/tutorial/mp-weixin-plugin-dev.html)。

在结合我们项目过程中，踩了一些坑，这里记录下。主要是业务库为 monorepo 模式，由环境变量决定启动哪个子工程。为了启动小程序插件，以及兼容使用 npm，修改了 env.js 的逻辑，增加了环境变量中是否有小程序插件名称的判断，如果有则将其附在命令后面。


```js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { spawnSync } = require('child_process');
const os = require('os');
const platform = os.platform();
const myEnv = dotenv.config({ path: '.env.local' });
dotenvExpand.expand(myEnv);

// 执行真实的命令
const realArgv = process.argv.slice(2);
let command = 'npm';
if (platform === 'win32') {
  command = 'npm.cmd';
}
const otherArgv = ['run', ...realArgv]

// 根据环境变量中是否有 VUE_APP_MP_PLUGIN 插件名称以及命令关键词，决定是否添加插件参数
if (process.env.VUE_APP_MP_PLUGIN && realArgv[1] === 'mp-wx-plugin') {
  otherArgv.push(...['--', '--plugin', process.env.VUE_APP_MP_PLUGIN])
}

spawnSync(command, otherArgv, { stdio: 'inherit' });
```

注意 `--plugin` 前面必须有 `--`。


`package.json` 增加命令如下：

```json
"dev:mp-plugin": "npm run env dev:custom mp-wx-plugin --plugin",
"build:mp-plugin": "npm run env build:custom mp-wx-plugin --plugin"
```

以及文档中提到的 uni-app 自定义命令

```json
"uni-app": {
  "scripts": {
    "mp-wx-plugin": {
      "title": "微信小程序插件",
      "env": {
        "UNI_PLATFORM": "mp-weixin"
      },
      "define": {
        "MP-WX-PLUGIN": true
      }
    }
  }
}
```

#### 1.3.2. playground 自动生成

插件开发过程中需要一个小程序用来调试，具体可参见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/development.html)，我这里暂且称之为 `playground`。

默认情况下，在 uni-app 工程开发小程序插件时，每次都要将产物复制到另一个地方，然后用开发者工具打开，才能调试。这种效率过于低下，于是写了一个插件，可以在 dev 和 build 模式下都自动生成 `playground`。

原理是在模板的子工程目录下，提前放一个 `mp-plugin-public` 的文件，里面包括 `doc/miniprogram/project.config.json` 这些 `playground` 的必要东西。然后在 `compiler.hooks.done` 生命周期中（也可以用其他类似钩子），复制该目录到插件产物的上一层，然后打开该层目录，就可以自动调试了，无需手动拷贝。

为什么要将 `mp-plugin-public` 放到子工程下呢，是考虑到每个子工程是单独的一个插件，有不同的名称、文档、示例。

为什么要命名为 `mp-plugin-public` 呢，是将其类比成了 H5 下的 `public` 目录，在打包过程中不会编译，只会复制。


#### 1.3.3. 路径修复

由于我们项目的结构有点深，`src/project/subProject`，以及引用了外层公共模块，比如 `src/component`，`src/local-logic` 等。uni-app 在编译这种层级项目时，会生成错误的引用路径，需要编译插件修复。

1. 引入公共模块错误

举例来说，比如一个 `js` 文件中引用了 `../common/runtime.js`，插件需要从当前文件往上找 `common/runtime.js` 文件，找到了就返回正确的相对路径，并进行替换。替换结果可能为 `../../../common/runtime.js`。

另外，node_modules 下的引入路径也有问题，问题截图如下，也需要用类似方法修复。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_59464c49f1f4d685d6.png" width="600">


2. 使用了绝对路径

参考下图，里面包含了错误的绝对路径，需要替换为正确的 `moduleId`。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_c3b9a672306f979192.png" width="600">


3. getApp 找不到

此外，低版本的 `uni-app` 在编译小程序插件时候，还会使用 `getApp`，由于插件并不支持这个API，所以会报错，可以升级到最新版本解决。


## 2. 性能

小程序插件本质和小程序一样，先从优化小程序包体积开始。

先贴下最开始的包体积，方便对比。最开始总包 1.92MB。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_bd34e66ccf679453ac.png" width="500">


### 2.1. 分类

小程序包可以分为公共部分和业务部分，公共部分又可分为第三方的和我们项目组的。

第三方公共包括：

- uni-app 相关
  - uni-mp-weixin/dist/index.js 
  - vue-cli-plugin-uni/mp-runtime.esm.js
  - uni-i18n
- Press UI
- crypto、md5
- weapp-qrcode
- qs
- 其他


项目组公共包括：

- pmd-npm
  - startApp
  - report
  - login
  - tools
  - ...
- press-plus
- src/api

业务部分就是剩下的了，包括所有业务组件和业务逻辑。

优化不同部分内容的影响是不同的。对第三方库的优化，对影响所有使用它的项目，是影响力最大的。对项目组公共部分的优化，会影响项目组所有业务。对业务的优化，就只会影响当前业务了。

就这个项目而言，三方库体积并不大，最大的是业务和项目组公共部分。

### 2.2. 减包思想

减包主要分下面几种情况：

- 完全运行不到的代码
- 重复代码
- 可以用更简单方式替换的代码

完全运行不到的代码，比如 `uni-i18n` 的大部分逻辑、缺少条件编译的 H5 逻辑。

重复代码常见的有两段逻辑相似，或者引入了同一个包的两个版本。

可以用更简单方式替换的代码，比如用小程序原生上报代替 `aegis`、用原生 `swiper` 代替 `press-swiper`、自己写 `btoa` 代替 `js-base64` 中的 `encode` 等。


### 2.3. press-ui

press-ui 是核心组件库，虽然它可以减少的空间并不大，但是会对所有项目产生影响。

优化前有 51KB，通过按需加载，条件编译去掉H5环境的方法等，缩小到了 43KB。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_039c8690b63b5ed991.png" width="500">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_eead7e4ae02154b544.png" width="500">


又发现打包的 CSS 中有一些没有用到的公共样式，比如 ellipsis, hairline 等，通过按需引入，又减少了 20KB。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_7d36e4a17dcd3a6e7d.png" width="500">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_90a1a4de5db1f3e04e.png" width="500">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_738d650545621823df.png" width="500">


另外 `press-icon-plus` 打包了所有的图标，但实际只用了其中一两个，这里可以用 `loader` 将多余的图标去掉。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_a93e2ff3f43d41ae1e.png" width="500">



### 2.4. api 子仓库

尽管 `src/api` 已经做到了按需加载，只打包所需的接口，而不是所有接口，但依然有 25KB 的体积，这里一起优化下，直接使用调用 `post`，这部分体积可以直接降为 0。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_5d6ebcc7a781562fa8.png" width="500">


### 2.5. swiper

业务使用了 `press-swiper`，来实现了一个较为美观的`swiper`。我研究了一番，直接用原生实现了。

核心原理如下：

1. 通过 `next-margin`，`previous-margin`， 实现 `swiper-item` 不再撑满全屏
2. 通过 `getSystemInfo` 获取 `windowWidth`，减去 `wrapMargin`、`imageWidth` 等值，动态计算 `next-margin` 和 `previous-margin`
3. 监听 `transition` 事件，获取 `event.detail.dx`，计算当前` swiper-item`，并赋值，实现滑动切换 `swiper`

贴一下核心代码，备忘下。

```html
<!-- #ifndef H5 -->
<swiper
  v-if="mSwiperInit"
  ref="zSwiper"
  v-model="mGameTaskList"
  :options="ZSwiperOptions"
  :current="mCurrentSelectedTab"
  :next-margin="nextMargin"
  :previous-margin="nextMargin"
  @transition="onSwiperTransition"
  @animationfinish="onSwiperTransitionFInish"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
>
  <swiper-item
    v-for="(item,index) in mGameTaskList"
    :key="index"
  >
    <div
      class="task-type-item"
      :class="{
        'task-type-item--active': mCurrentSelectedTab === index
      }"
      @click.stop="changeSelectedGame(index, true)"
    >
      <img
        class="task-type-img"
        :src="tinyImage(item.icon)"
      >
    </div>
  </swiper-item>
</swiper>
<!-- #endif -->
```


```ts
methods: {
  onSwiperTransition(e) {
    const { dx } = e.detail;
    if (!this.manualMoving) return;
    movingDx = dx;
  },
  onSwiperTransitionFInish() {},
  onTouchStart() {
    this.clearTimer();
    this.manualMoving = true;
    this.movingCurrent = this.mCurrentSelectedTab;
    movingDx = 0;
  },
  onTouchMove() {},
  onTouchEnd() {
    this.manualMoving = false;

    let current;
    if (movingDx > 0) {
      current = Math.min(this.movingCurrent + Math.round(movingDx / 60), this.mGameTaskList.length - 1);
    } else {
      current = Math.max(this.movingCurrent +  Math.round(movingDx / 60), 0);
    }
    this.changeSelectedGame(current);

    this.startTimer();
  },
  getSwiperDomWidth() {
    const that = this;

    return new Promise((resolve) => {
      wx.getSystemInfo({
        success(res) {
          const clientWidth = res.windowWidth;
          const ratio = 750 / clientWidth;
          const wrapWidth = clientWidth - Math.floor(32 / ratio) * 2 - Math.floor(20 / ratio) * 2;

          const nextMargin = (wrapWidth - Math.floor(104 / ratio) - Math.floor(16 / ratio) * 2) / 2;
          that.nextMargin = `${nextMargin}px`;

          resolve();
        },
      });
    });
  },
}
```

这样优化后，发现切换 `swiper-item` 更加平滑，并直接省掉了 `176KB` 的大小。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_540e35e2212afd174d.png" width="500">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_bdd6a42f8069e60029.png" width="500">

效果如下：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_2014d9c6eb9f6f272b.gif" width="375">


### 2.6. uni-i18n

这个库是 uni-app 内部用来实现国际化的，业务没有用到，写了一个 `loader` 把它去掉了（只暴露了一个假的函数，返回最小需要的对象），可以省掉 7.5KB 的大小。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_cc1bc0dc96109135bd.png" width="500">



### 2.7. js-base64

业务主要用到了这个库的 `encode` 方法，其实就是 `window.btoa`，这个自己实现下小程序端的就行了。

从引用关系看，`js-base64` 引入了 `buffer.js`，`buffer.js` 又引入了其他的工具函数，所以去掉 `js-base64` 可以优化出比预期较多的体积，实际大概 25.89KB。

之前 JS 总体积：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_1aa7454104cc5e6542.png" width="500">


去掉 `js-base64` 后的 JS 总体积：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_4c73a0420f2de42cc5.png" width="500">

`buffer.js` 体积：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_02514049b673f9a00c.png" width="500">

`buffer.js` 引用的子模块：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_c58b5ef0d8ad6031f1.png" width="500">


### 2.8. pmd-vue

- `launchapp/base.ts` 中都是 H5 的拉起方法，用条件编译去掉

- 去掉 `initReport`，因为没有 `aegis` 了，这个引用也就没意义了

- 去掉 `initFilter`，没有用到

- 去掉 `initMixin`，使用工具方法


### 2.9. pmd-tools

- `env/user-agent.ts` 小程序中用不到，用关键词编译方法去掉

- `validate/index.ts` 中只用到了 `getType` 方法，把它单独拿出来引用

- `dialog-displayer/index.ts` 小程序中用不到，用关键词编译方法去掉

- `time` 模块太大，用到的其中几个方法，把它们单独提出来，单独引用

### 2.10. pmd-report

`tcss` 已废弃，直接去掉

### scoped

突然意识到小程序根本不需要 `scoped`，默认情况下，小程序组件样式就是只能作用于自己。于是写了个 `loader`，在小程序下去掉了所有 `scoped`，减少了 47KB。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_28e1864b844799c811.png" width="500">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/8/own_mike_bfad98a1eb69e896e3.png" width="500">

### 2.11. 最新进度

当前总包 1.17+0.412 = 1.582MB



