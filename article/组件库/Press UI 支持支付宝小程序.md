记录一些坑。

## 1. 模板部分


### 1.1. $slots.xxx 判断是否有插入内容无效

在 `template` 中，其他平台可以通过 `$slots.default` 判断是否有插入内容，而支付宝小程序不支持。

比如，`press-field` 使用的 `press-cell` 需要改造。


### 1.2. 子元素 slot 的 v-if

`press-toast` 预埋时，会显示一道杠，发现是 `press-toast--text` 元素被渲染出来了，而其他平台没有。

推测是子元素的 `v-if` 没有生效，这样修改：

```html
<press-transition
  :show="dataShow"
>
  <!-- 在 press-toast 内部再加一层判断，不依赖子元素 -->
  <div
    v-if="dataShow"
    :class="toastClass"
    @touchmove.stop.prevent="noop"
  >
  <!-- 其他逻辑 -->
  </div>
</press-transition>
```

### 1.3. 模板行内箭头函数

支付宝不支持如下写法：

```html
<div
  v-for="(item, index) in showingData"
  :key="index"
  @mouseup="e => itemUp(e, item.uniqueKey)"
>
  {{ item.label }}
</div>
```

可以这样改，将额外数据放到 `dataset` 中，然后方法中也从 `event.target.dataset` 中取。

```html
<div
  v-for="(item, index) in showingData"
  :key="index"
  class="press-picker-view--item"
  :data-unique-key="item.uniqueKey"
  @mouseup="itemUp"
>
  {{ item.label }}
</div>
```

```ts
export default {
  methods() {
    itemUp(e) {
      const { uniqueKey } = e.currentTarget.dataset;
      // ...
    }
  }
}
```

### 1.4. 形如 name="" 会被当成 boolean 类型

组件如果要接受 `string` 类型的 `name`，其他平台传入 `name=""` 没任何问题，支付宝则会把它当成 `true`，可以这样修改：

```html
<press-transition :name="``" />
```

### 1.5. press-icon 不应该用 click.stop

图标组件不应该用 click.stop，否则使用它的所有地方都要声明 click 事件，比较容易出粗。


### 1.6. 自定义组件的 click.stop 无效

比如 `press-button` 上使用 `click.stop` 无效，需要去掉 `.stop`。

### 1.7. canvas的id

`canvas` 的 `id` 不能相同，否则绘制的时候会因为错位而闪烁。



## 2. 样式部分

### 2.1. 自定义组件的样式

还是在 `toast` 组件中，引用的自定义组件，上面声明了 `class`，对它进行的样式声明无效。

```html
<press-icon-plus
  class="press-toast__icon"
/>
```

```scss
::v-deep .press-toast__icon {
  font-size: var(--toast-icon-size, $toast-icon-size);
  white-space: normal;
}
```

可以改成在 `press-icon-plus` 上声明，`press-icon-plus` 是子组件自己的类名。

```scss
::v-deep .press-icon-plus {
  font-size: var(--toast-icon-size, $toast-icon-size);
  white-space: normal;
}
```

顺便说下，微信小程序的 `custom-class` 样式和子组件的自身样式的优先级，不能确定，即使你加了类名，提高比重，一样不能提升其优先级，除非用 `!important`。[参考这里](https://developers.weixin.qq.com/community/develop/doc/000046750e80180c07b63826151400)。


所以最终改成这种方案，组件自己的 `class`、`v-deep`、个性化的组件 `class` 提升。


### 2.2. scroll-view 默认宽度

微信小程序和 `uni-app` 的 h5 下的 `scroll-view` 都是 `width: 100%`;

支付宝小程序并没有。

### 2.3. page 下第1层元素设置 100% 无效

`page` 设置 `100%`，其下的第1个子元素，比如 `.demo-wrap`，也设置 100%，并没有撑满。

可以将 `page` 改成 `100vh`。



### 2.4. 路径上只能有1个::v-deep

`scss` 选择器路径上只能有1个 `::v-deep`，其他不会被转化。

比如 

```scss
.press-collapse-item {
  ::v-deep &__title {
    ::v-deep &--expanded {
      .press-cell__right-icon {
        transform: rotate(-90deg);
      }
    }
  }
}
```

会被转为

```scss
.data-v-469c232f ::v-deep .press-collapse-item__title--expanded .press-cell__right-icon {
  -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
}
```

而你想要的应该是

```scss
.data-v-469c232f .press-collapse-item__title--expanded .press-cell__right-icon {
  -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
}
```

多了一个 `::v-deep`，由于原生 CSS 并不认识它，所以样式不生效。

### 2.5. swiper-item 高度

支付宝小程序 `swiper-item` 高度只能由子元素高度，不能自主设置 `style=“height: 100%”`。

所以 `image-preview` 组件的图片需要增加一个包裹层，设置为 `100%`。


### 2.6. 滚动穿透

可以[参考这里](https://open.alipay.com/portal/forum/post/24301024)，滚动时，将页面设置为 `fixed`。


## 3. 脚本部分

### 3.1. 导航栏设置

支付宝的导航栏支持的颜色比较少，可以放到脚本中。比如下面就是放到 mixin 中，每个页面的 onLoad 时，都会执行。

```ts
onLoad() {
  // https://opendocs.alipay.com/mini/api/xwq8e6
  // #ifdef MP-ALIPAY
  // @ts-ignore
  my?.setNavigationBar({
    backgroundColor: '#fff',
    frontColor: '#000',
  });
  // #endif
}
```


### 3.2. 不支持 scrollIntoView

支付宝小程序和QQ小程序都不支持函数式的设置 `scroll-top`，也就是不支持 `node.scrollIntoView`，只能在模板上设置 `scroll-top`。
