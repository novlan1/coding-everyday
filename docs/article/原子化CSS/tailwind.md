## vue3 uni-app

`vite.config.ts`

```ts
import tailwindcss from 'tailwindcss';

import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

export default defineConfig(){
  return {
    plugins: [
      uniTailwind(),
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
        ],
      },
    },
  }
}
```

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // 不需要 preflight，因为preflight主要是给 h5 的，小程序使用的独特的标签，导致preflight不起作用。
    // 如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
  },
  plugins: [],
};
```

`App.vue`

```html
<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
```


`VSCode` 插件 `Tailwind CSS IntelliSense`

名词解释：

- preflight，预设的基础样式，原本含义是“飞行前检查”，[示例](https://unpkg.com/tailwindcss@2.2.19/dist/base.css)

当在 CSS 中包含 `@tailwind base` 时，Tailwind 会自动注入以下样式：

```css
@tailwind base; /* Preflight will be injected here */

@tailwind components;

@tailwind utilities;
```

## vue2 uni-app

`vue.config.js`

```js
const { TailwindPlugin } = require('@ttt/webpack-plugin-tailwind');


module.exports = {
  configureWebpack: {
    plugins: [
      new TailwindPlugin(),
    ],
  },
}
```

`tailwind.config.js`


```js
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: 'media',
  // separator: '__', // 兼容小程序，将 : 替换成 __
  theme: {
    // 兼容小程序，将默认配置里带 .和/ 清除
    // 如果有些属性你没有用到，请在 corePlugins 里禁用
    extend: {},
    // fontSize: {},
    // height: {},
    // inset: {},
    // screens: {},
    // spacing: {},
    // translate: {},
    // width: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
    // space: false,
    // divideColor: false,
    // divideOpacity: false,
    // divideStyle: false,
    // divideWidth: false,
  },
};
```

`postcss.config.js`

```js
module.exports = {
  plugins: [
    require('tailwindcss')({ config: './tailwind.config.js' }),
  ],
};
```

`App.vue`

```html
<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
```
