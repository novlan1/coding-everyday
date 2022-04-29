app

```js
// vue3
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')

// 与大多数应用方法不同的是，mount 不返回应用本身。相反，它返回的是根组件实例。
```

vue-router

```js
// vue2
import VueRouter from 'vue-router'
const router = new VueRouter({
  routes 
})

// vue3
import { createRouter } from 'vue-router'
const router = createRouter({
  history: VueRouter.createWebHashHistory(), // 必须提供history选项
  routes, 
})
```


vuex

```js
// vue2
import vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({})


// vue3
import { createStore } from 'vuex'
const store = createStore({
})
```

vue-lazyload

```
npm install vue3-lazy -S
```

```js
createApp(App)
  .use(lazyPlugin, {
    loading: require('@/assets/images/default.png'), // 图片加载时默认图片
    error: require('@/assets/images/error.png')// 图片加载失败时默认图片
  })
  .mount('#app')
```

Vue.use()什么时候使用？
它在使用时实际是调用了该插件的install方法，所以引入的当前插件如果含有install方法我们就需要使用Vue.use()。

比如vant的install方法是注册全局组件：

```ts
export const Button = withInstall(_Button);

export function withInstall<T>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string };
    app.component(name, options);
    app.component(camelize(`-${name}`), options);
  };

  return options as WithInstall<T>;
}
```

也就是说没必要两种都做：

```js
// 方式一. 通过 app.use 注册
// 注册完成后，在模板中通过 <van-button> 或 <VanButton> 标签来使用按钮组件
app.use(Button);

// 方式二. 通过 app.component 注册
// 注册完成后，在模板中通过 <van-button> 标签来使用按钮组件
app.component(Button.name, Button);
```


Vant 2 中默认提供了 `$toast`、`$dialog` 等全局方法，但 Vue 3.0 不再支持直接在 Vue 的原型链上挂载方法，因此从 Vant 3.0 开始，使用全局方法前必须先通过 app.use 将组件注册到对应的 app 上。

```js
import { Toast, Dialog, Notify } from 'vant';

// 将 Toast 等组件注册到 app 上
app.use(Toast);
app.use(Dialog);
app.use(Notify);

// app 内的子组件可以直接调用 $toast 等方法
export default {
  mounted() {
    this.$toast('提示文案');
  },
};
```

```html
<!-- Vant 2 -->
<van-popup v-model="show" />

<!-- Vant 3 -->
<van-popup v-model:show="show" />
```

按需引入组件，不使用任何构建插件

```js
// 引入组件脚本
import Button from 'vant/es/button/index';
// 引入组件样式
// 若组件没有样式文件，则无须引入
import 'vant/es/button/style/index';
```

使用`babel-plugin-import`

```js
// 原始代码
import { Button } from 'vant';

// 编译后代码
import Button from 'vant/es/button';
import 'vant/es/button/style';
```

挂载原型方法

```js
// vue3
const app = createApp(App)
app.config.globalProperties.$api = api


// vue2
Vue.prototype.$api = api 
```


