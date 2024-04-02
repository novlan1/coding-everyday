记录一些坑。

### 子元素 slot 的 v-if

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

### 自定义组件的样式

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

微信小程序的 `custom-class` 样式和子组件的自身样式的优先级，不能确定，即使你加了类名，提高比重，一样不能提升其优先级，除非用 `!important`。[参考这里](https://developers.weixin.qq.com/community/develop/doc/000046750e80180c07b63826151400)。


所以最终改成这种方案，组件自己的 `class`、`v-deep`、个性化的组件 `class` 提升。


### 模板行内箭头函数

支付宝不支持如下写法：

```html
<div
  v-for="(item, index) in showingData"
  :key="index"
  @mouseup="e=>itemUp(e, item.uniqueKey)"
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

### 形如 name="" 会被当成 boolean 类型

组件如果要接受 `string` 类型的 `name`，其他平台传入 `name=""` 没任何问题，支付宝则会把它当成 `true`，可以这样修改：

```html
<press-transition :name="``" />
```

### 导航栏设置

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

