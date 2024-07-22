### 一、字段说明

```json
// 必须，长度必须小于或等于214个字符，不能以“.”和“_”开头，不能包含大写字母
// 最终会作为URL使用，所以不能包含非URL安全字符
"name": "vuex",
// npm包项目的主要入口文件，必须的
"main": "dist/vue.runtime.common.js",
// node17版本的新字段，可以根据模块指定不同的引用入口
// 参考：https://nodejs.org/api/packages.html#packages_conditional_exports
"exports": {
  ".": {
    "module": "./dist/vuex.esm.js",
    "require": "./dist/vuex.common.js",
    "import": "./dist/vuex.mjs"
  },
  "./*": "./*",
  "./": "./"
},
// 打包工具支持es的时候的引用入口
"module": "dist/vue.runtime.esm.js",
// npm 上所有的文件都开启 cdn 服务地址
"unpkg": "dist/vue.js",
// jsdelivr cdn公共库
"jsdelivr": "dist/vue.js",
// TypeScript 的入口文件
"typings": "types/index.d.ts",
// 当你发布package时，具体那些文件会发布上去
"files": [
  "src",
  "dist/*.js",
  "types/*.d.ts"
],
// 声明该模块是否包含 sideEffects（副作用），从而可以为 tree-shaking 提供更大的优化空间。
"sideEffects": false,
// 指明了该项目所需要的node.js版本
"engines": {
  "node": ">=8.9.1",
  "npm": ">=5.5.1",
  "yarn": ">=1.3.2"
},
// 版本号格式为：主版本号.次版本号.修订号
// 依赖存在以下情况：
// 1. 固定版本：react-scripts的版本4.0.3就是固定版本，安装时只安装这个指定的版本；
// 2. 波浪号：比如~4.0.3，表示安装4.0.x的最新版本（不低于4.0.3），也就是说安装时不会改
// 变主版本号和次版本号；
// 3. 插入号： 比如 react 的版本^17.0.2，表示安装17.x.x的最新版本（不低于17.0.2），
// 也就是说安装时不会改变主版本号。如果主版本号为0，那么插入号和波浪号的行为是一致的；
// 4. latest：安装最新的版本
"dependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-scripts": "4.0.3",
},
// 前置依赖
"peerDependencies": {
  "chai": "1.x"
}
```

其他字段比较简单，在此不再赘述。


### 二、module

接下来对比下`module`和`main`在实践中的差异，下面是`package.json`的一种配置：

```js
{
  "main": "dist/dist.js",
  "module": "dist/dist.es.js"
}
```

相当于在一个包内同时发布了两种模块规范的版本。

当打包工具遇到我们的模块时：
- 如果它已经支持 `module` 字段则会优先使用 `ES6` 模块规范的版本，这样可以启用 `Tree Shaking` 机制。
- 如果它还不识别 `module` 字段则会使用我们已经编译成 `CommonJS` 规范的版本，也不会阻碍打包流程。

#### 试验

我们可以做个`Demo`测试下是否优先引用`module`地址，其次才是`main`。

新建一个项目，用`rollup`打包。`rollup.config.js`的配置如下：

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

export default [{
  input: ['./src/index.js'],
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'mybundle'
  },
  plugins: [resolve(),commonjs(), babel(), json()],
  external: ['axios']
}]
```

在`node_modules`下新建文件夹，随便起个名字比如`test-module`，然后创建以下文件夹和文件：

```
- dist
  - dist.js
  - dist.es.js 
- package.json
```

在`node_modules/test-module/package.json`中设置如下：

```json
{
  "main": "dist/dist.js",
  "module": "dist/dist.es.js"
}
```

在`node_modules/test-module/dist/dist.js`中定义变量`a`为1，并导出：

```js
var a = 1;
module.exports = { a }
```

在`node_modules/test-module/dist/dist.es.js`中定义变量`a`为2，并导出：

```js
export const a = 2;
```

然后在项目的`src/index.js`中引入测试模块`test-module`，然后打印a的值：

```js
import a from 'test-module'

console.log('a')
```

然后执行`rollup -c`，在打包后的文件中查看：
```js
// ...

const a = 1;

// ...
```

去掉`node_modules/test-module/package.json`中的`module`字段，再次打包一次后查看：

```js
// ...

var index_cjs = {
  a: 2
};

// ...
```

可知对于`rollup`这种可以识别`ES6`语法的打包器来说，确实会优先引入`package.json`中`module`字段对应的文件，其次是`main`字段，验证了上面的说法。


### 三、相关资料

1. [nodejs17文档](https://nodejs.org/api/packages.html#packages_conditional_exports)
2. [npm package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)
3. [你真的了解package.json吗？来看看吧，这可能是最全的package解析](https://juejin.cn/post/6987179395714646024)
4. [关于前端大管家 package.json，你知道多少？](https://juejin.cn/post/7023539063424548872)
5. [package.json中的exports](https://www.cnblogs.com/ajanuw/p/14154400.html)
6. [聊聊 package.json 文件中的 module 字段](https://juejin.cn/post/6844903569150197774)
7. [Node.js 的模块加载方法](https://es6.ruanyifeng.com/#docs/module-loader)
8. [package.json 的 exports 字段](https://es6.ruanyifeng.com/#docs/module-loader#package-json-%E7%9A%84-exports-%E5%AD%97%E6%AE%B5)

