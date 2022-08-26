## 1. page-meta

```
<page-meta :root-font-size="fontsize+'px'"></page-meta>
```

page-meta只能是页面内的第一个节点，可以实现rem


## 2. v-for

### 2.1. 基础


- 在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 v-for="(item, index) in 10" 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
- 在非H5平台 循环对象时不支持第三个参数，如 v-for="(value, name, index) in object" 中，index 参数是不支持的。
- 小程序端数据为差量更新方式，由于小程序不支持删除对象属性，使用的设置值为 null 的方式替代，导致遍历时可能出现不符合预期的情况，需要自行过滤一下值为 null 的数据。

文档地址[在这里](https://uniapp.dcloud.net.cn/tutorial/vue3-basics.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)。

###  2.2. v-for 的 key

小程序不支持字符串拼接，比如

```html
:key="`hold` + index"
```

这样其实也是有问题的：

```html
:key="`hold-${index}`"
```

甚至提到一个函数中，也有可能有问题：

```
:key="getHoldKey(index)"


getHoldKey(index) {
  return `hold${index}`
}
```

最佳方式其实是提前处理好数据，这样性能会更好，也避免了key重复。

```ts
getData() {
  items = items.map((item,index) => ({
    ...item,
    key: `hold-${index}`
  }))
}
```


key重复会造成挂载在组件上面的事件参数为undefined，从而不成功。


参考：

1. https://blog.csdn.net/weixin_55489077/article/details/119983795
2. https://www.jianshu.com/p/ec4c0c73bb83



## 3. van-tab

### 3.1. change事件参数

uni-app中 vant-tab 的change事件暴露参数为event，需适配

```ts
this.curTab = e.detail.name;
```


### 3.2. v-model无效

uni-app 中 van-tab 使用 v-model 无效，会被转为


```html
<view 
  value="val" 
  bind:change="__e" 
  bind:input="__e"
  data-event-opts="{{[['^change',[['onChangeStageTab']]],['^input',[['__set_model',['','curStageTab','$event',[]]]]]]}}"
/>
```

### 3.3. 性能问题

`tabMap[curTab]`不要写在template中，否则切换tab时会有延迟，可以写在computed中。


```html
<!-- 存在问题 -->
<Comp 
  :list="tabMap[curTab]"
/>
```



```vue
<!-- 推荐 -->
<Comp 
  :list="curList"
/>

computed: {
  curList() {
    const { tabMap, curTab } = this;
    return tabMap[curTab]
  }
}
```

更好的方式是不依赖curTab

```html
:sche-list="stageScheMap[index]"
```


## 4. this指向问题

### 4.1. prop为函数类型

父组件把方法传给子组件后，该方法里的this是子组件的this而不是父组件的this。

这个[链接](https://ask.dcloud.net.cn/question/97718)提到了相同的问题，一个解决方法是在外层声明`gThis`，然后在 `mounted` 或 `updated` 中将this 赋值给 gThis，`gThis = this`。

### 4.2. vant组件

有时候vant-weapp的组件报this指向问题，但在真机或其他人的电脑上就没事，可以尝试把小程序基础库版本降低下，比如调整到 2.23.0。有时候不一定是自己代码的问题。


相关链接：https://ask.dcloud.net.cn/question/97718


## 5. slot问题

uni-app是支持具名插槽的，有一点需要注意，对于写在slot标签上的类名，h5会下发到slot内部的外层元素上，而小程序则会创建view元素，在这个元素上添加类名。

如果遇到slot的样式异常，可以先排查下这里。

举个例子：

```html
<SomeComp class="extra">
  <template #middle>
      title
  </template>
</SomeComp>
```

SomeComp组件内容如下：

```html
<div class="inner">
  <div class="middle">
    <slot name="middle" />
  </div>
</div>
```

在h5中会被渲染成：

```html
<div class="extra inner">
  <div class="middle">
    title
  </div>
</div>
```

在小程序会被渲染成：

```html
<view class="extra">
  <view class="inner">
    <view class="middle">
      title
    </view>
  </view>
</view>
```

子组件加上下面代码可以解决：

```ts
options: {
  virtualHost: true,
},
```



## 6. list挂载属性


之前在list上挂载属性，比如`list = []; list.a = 1`，是可以传递给子组件的，但是uni-app编译后则不可以。




## 7. 渐变导航与onPageScroll


项目多在多个页面上加自定义导航栏，还要有渐变效果，就是随着页面上滑，导航栏透明度由0逐渐变为1。这里面有几个基本点需要注意下。


### 7.1. page的样式

page不能是height: 100%，可以设置height: auto，这样才可以触发onPageScroll。

### 7.2. onPageScroll


只有page才有 onPageScroll 事件。试验发现，mixin 和页面内都写了 onPageScroll 的话，都会触发。

如果把它放在mixin中，写成下面这样，可能会有问题：

```ts
data() {
  return {
    pageScrollTop: 0,
  };
},
onPageScroll({ scrollTop }) {
  this.pageScrollTop = scrollTop || 0;
},
```

因为自定义导航栏不一定要在页面级组件上，很多页面都是写在子组件里，而mixin是各个组件各自维护了一份data，所以无法传递。这也是Vue组件和小程序组件的不同之处。

解决方法有多个：
- 将 onPageScroll 写在页面级组件上，然后获取到 scrollTop 后传给子组件，这种方法太麻烦
- onPageScroll 依然写在 mixin 中，保存 scrollTop 到 vuex 的 state 中，然后在页面或者组件中获取这个 state


### 7.3. 性能问题


这里面还有两个性能相关的点要注意下：

1. 只有页面级组件或者个别组件需要用的数据，不要放在 mixin 的 data/computed 中。因为 mixin 是所有组件的混入，并且 uni-app 中所有 data 和 computed 都会作为渲染依赖，不管用没用到，可能会引起很多性能开销。
2. onPageScroll 中不要做复杂逻辑，不要频繁调用setData，在uni-app中就是不要频繁更新data。因为小程序是双线程通信，逻辑层更改数据要先到native层，再传到渲染层，中间可能还有JSON.stringify等操作。



### 7.4. 方案

综上，目前采用的方案是：

mixin中，监听 onPageScroll，因为这个在只会在当前页面触发，子组件会被忽略，所以写在这里并不影响性能。

```ts
const uniSystemInfoMixin = {
  onPageScroll({ scrollTop }) {
    const mpHeaderHeight = this.$store?.state?.wxHeader?.mpHeaderHeight || 44;
    const pageScrollTop = this.$store?.state?.wxHeader?.pageScrollTop || 44;
    // 提升性能，超过范围的就不再commit
    const parsedScrollTop = scrollTop > mpHeaderHeight ? mpHeaderHeight : scrollTop;
    if (parsedScrollTop === mpHeaderHeight && pageScrollTop === mpHeaderHeight) {
      return;
    }
    this.$store.commit('wxHeader/setPageScrollTop', parsedScrollTop);
  },
  beforeDestroy() {
    this.$store.commit('wxHeader/setPageScrollTop', 0);
  },
  methods: {
    onSetFontSize() {
      const that = this ;
      if (that.mpType === 'page') {
        try {
          uni.getSystemInfo({
            success(res) {
              const mpHeaderHeight = res.statusBarHeight + 44;
              that.$store.commit('wxHeader/setMpHeaderHeight', mpHeaderHeight);
            },
          });
        } catch (err) {
        }
      }
    },
  },
};
```

vuex 中保存 pageScrollTop、mpHeaderHeight，及一个衍生变量 mpHeaderBg。

```ts
const wxHeaderStore = {
  namespaced: true,
  state: () => ({
    pageScrollTop: 0,
    mpHeaderHeight: 44,
  }),
  mutations: {
    setPageScrollTop(state, pageScrollTop = 0) {
      state.pageScrollTop = pageScrollTop;
    },
    setMpHeaderHeight(state, mpHeaderHeight) {
      state.mpHeaderHeight = mpHeaderHeight;
    },
  },
  getters: {
    mpHeaderHeightStr(state) {
      return `${state.mpHeaderHeight}px`;
    },
    mpHeaderBg(state) {
      const { pageScrollTop, mpHeaderHeight } = state;
      return `rgba(255, 255, 255, ${Math.min(1, pageScrollTop / mpHeaderHeight)})`;
    },
  },
};
```

然后，需要使用 mpHeaderBg 的页面，自己去引用 vuex 中的变量：

```html
<SomeComp
  :header-bg="mpHeaderBg"
/>

<style>
page {
  height: auto;
}
</style>
```

```ts
computed: {
  mpHeaderBg() {
    return this?.$store?.getters?.['wxHeader/mpHeaderBg'] || '';
  },
}
```


现在如果想要在一个新页面加上渐变导航，只需要引用 vuex 中的 mpHeaderBg 即可。



## 8. 分包设置注意事项

pages.json 用的分包一定要用到，不要root写了，path是空，或者path不全，因为没写全的会被放到主包内，会在包分析中失败。

另外，假设 views/A 只是 views/B 的一个子组件，不要在 pages.json 中声明一个分包 root 为 views/A。

## 9. main.js不要引用router

因为这会导致所有js都会打包到主包里的 common/main.js 中


## 10. 样式隔离

主要涉及 styleIsolation 属性。文档地址[在这里](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)。

styleIsolation 选项支持以下取值：

- isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
- apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
- shared **表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件**。（这个选项在插件中不可用。


使用后两者时，要注意组件间样式的相互影响。

如果这个一个组件构造器用于构造页面 ，则这个组件的 styleIsolation 默认值为 shared ，且还有以下几个额外的样式隔离选项可用：

- page-isolated 表示在这个页面禁用 app.wxss ，同时，页面的 wxss 不会影响到其他自定义组件；
- page-apply-shared 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式不会影响到其他自定义组件，但设为 shared 的自定义组件会影响到页面；
- page-shared 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式会影响到其他设为 apply-shared 或 shared 的自定义组件，也会受到设为 shared 的自定义组件的影响。



## 11. loader上下文



loader 中，可以用 this.resourcePath 获取文件路径，文档地址[在这里](https://www.webpackjs.com/api/loaders/)。其他可能会用到的爆款：

- this.context，模块所在的目录
- this.loaders，所有 loader 组成的数组
- this.emitFile，产生一个文件

## 12. 一个组件被import两次，对应的js就会编译错误

啥时候一个组件会被 import 两次呢，动态加载，比如`() => import('./xxx.comp')`

## 13. path-to-regexp库使用时，keys不能是const

示例代码：

```ts
import pathToRegexp from 'path-to-regexp';

// eslint-disable-next-line prefer-const
let keys = [];
const regexp = pathToRegexp(item, keys);
const match = path.match(regexp);
```



## 14. Vue TypeError: Right-hand side of 'instanceof' is not an object

Vue项目报上面这个错误，一般是props类型校验问题。这个搜索引擎一搜就能知道。


## 15. uni-app传递对象props，对象中的function会被丢掉


写在对象中的 function 会被丢掉，需要改成 $emit，但是测试了下，直接写 Function 类型的 props 是可以的。

相关链接：
- https://ask.dcloud.net.cn/question/72570
- https://ask.dcloud.net.cn/question/70659

## 16. 微信小程序体验版数据加载不了，打开调试模式下才行

检查下面几项：域名已经备案、https已经配置、ssl证书在1.2以上版本、小程序后台已经配置服务器域名




## 17. style

不能在 class、style 中直接使用 函数、data、计算属性 的对象，比如：

```html
<div
  :style="scheItemStyle[index]"
>
```

但是可以这样：


```html
<div
 :style="{ height: scheItemStyle[index].height }"
>
```

也就是使用某个具体的属性（字符串、数字等非引用类型类型），但不能是对象、数组等。


这种也不可以：

```html
<div
  :class="[
    {'hidden-van-tabs': stageCfgList.length === 1},
  ]"
/>
```


这种可以：

```html
<div
  :class="[
    {'hidden-van-tabs': isOnlyOneStage},
  ]"
/>
```

## 18. scroll-view


小程序内无法获取或改变一个普通view的scrollTop，只能用scroll-view。

这个标签需要设置scroll-y纵向滚动或者scroll-x横向滚动，默认都是false。

enable-flex="true"是开始flex布局，默认为false。

设置enhanced="true"后，可以通过下面代码动态改变其scrollTop。

```ts
function mpBackUp() {
  this.createSelectorQuery()
    .select('#scheduleTreeId')
    .node()
    .exec((res) => {
      const scrollView = res[0]?.node;
      if (!scrollView) return;
      scrollView.scrollTo({
        top: 0,
      });
    });
}
```

## 19. 获取小程序运行环境

```ts
const { envVersion = '', version = '', appId = '' } = wx?.getAccountInfoSync?.()?.miniProgram || {};
const { SDKVersion = '', platform = '' } = __wxConfig as any;
```

envVersion 取值有：develop，trial，release

类似的参数还有version、platform等，可以看上面代码。




## 20. v-if vs v-show

都知道v-show比v-if性能高，但是uni-app不支持v-show，对于dom节点特别大的页面来说，切换tab只能用v-show，v-if太卡。

这时可以用修改动态元素样式来实现，示例如下：

```html
<div
  :class="['double-fail-wrap', `double-fail-wrap-${curTab}`]"
>

<style lang="scss">
.double-fail-wrap-1 {
  .loser-sche-map {
    display: none;
  }
}
.double-fail-wrap-2 {
  .winner-sche-map {
    display: none;
  }
}
</style>
```


## 21. input的focus

小程序中需要手动指定 focus，没有js调用的API。

删除话，input 事件 `e.target.value === ''` 为 true


