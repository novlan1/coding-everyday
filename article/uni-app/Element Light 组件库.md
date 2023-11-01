[TOC]


## 1. 开始

缺个 PC 组件库，由于组内大部分项目都是 Vue 的，所以基于 Element UI 搭建了 Element Light，旨在沉淀更多业务组件、二次封装基础组件。

这里介绍下如何搭建的，以及遇到的问题和解决办法。

## 2. 问题

### 2.1. sass 版本

element-ui 仍使用 node-sass，由于gyp经常安装失败，这里改成了 `sass`。

```json
{
  "sass": "^1.50.1",
  "sass-loader": "^7.3.1",
}
```


### 2.2. 组件互相引用

组件内互相引用的话，不能使用相对路径，这样会在打包时，把子组件也打进去。比如:

```ts
import ElCard from '../../card/src/main';

export default {
  component: {
    ElCard,
  }
}
```

需要改成从 `element-ui/packages` 中引入，即：

```ts
import ElCard from 'element-ui/packages/card';
```

打包的时候，会把 `element-ui` 当作 `externals` 排除出去。

### 2.3. 引入三方库

引入的三方库都不会打包进去，比如 `echarts`，所以需要在 `dependencies` 或 `peerDependencies` 声明。

这样有个好处是，业务组件沉淀的时候可以放心引入三方库，不会增加包体积，以及不会有打包格式问题。

### 2.4. 打包配置修改

打包的 `externals` 需要修改，否则还是会寻找 `element-ui`。之前是：

```ts
Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
});

externals['element-ui/src/locale'] = 'element-ui/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/${file}`] = `element-ui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/mixins/${file}`] = `element-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/transitions/${file}`] = `element-ui/lib/transitions/${file}`;
});
```

更新为：

```ts
function addExternalsForLightAndUI(externals, key, value) {
  externals[`element-ui/${key}`] = value;
  externals[`element-light/${key}`] = value;
}

Object.keys(Components).forEach(function(key) {
  addExternalsForLightAndUI(externals, `packages/${key}`, `element-light/lib/${key}`);
});
addExternalsForLightAndUI(externals, 'src/locale', 'element-light/lib/locale');
// ...
```

以及 `output.filename` 和 `package.json` 中的 `main` 都改为 `'element-light.common.js'`。

并增加 `element-light` 的 `alias` 配置。

```ts
exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'element-ui': path.resolve(__dirname, '../'),
  // 新增
  'element-light': path.resolve(__dirname, '../')
};
```

## 3. 其他

### 3.1. markdown 中字符串太长

字符串太长没有换行，可以这样加：

```markdown
<code style="word-break: break-all;">https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js</code>
```
