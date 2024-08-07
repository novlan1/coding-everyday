## 1. 工程适配

设计原则，简单易用，一套代码既能独立发布，又能当小程序插件。独立发布包含了 uni-app 支持的所有端，包括 H5、微信小程序、QQ 小程序等。所以目标是 n+1 端，额外的 1 就是小程序插件。

### 1.1. 使用方法

在环境变量 `.env.local` 中新增 `VUE_APP_MP_PLUGIN = pluginRoot`。`pluginRoot` 会被当作插件目录名称。

启动命令如下：

```bash
# 开发
npm run dev:mp-plugin 
# 发布
npm run build:mp-plugin
```

然后在小程序开发者工具打开 `dist/dev/mp-weixin` 或者 `dist/build/mp-weixin` 进行调试、预览、上传等。

### 1.2. 适配工作

包含以下几部分

1. 命令兼容
2. playground 自动生成
3. 路径修复

#### 1.2.1. 命令兼容

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

#### 1.2.2. playground 自动生成

插件开发过程中需要一个小程序用来调试，具体可参见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/development.html)，我这里暂且称之为 `playground`。

默认情况下，在 uni-app 工程开发小程序插件时，每次都要将产物复制到另一个地方，然后用开发者工具打开，才能调试。这种效率过于低下，于是写了一个插件，可以在 dev 和 build 模式下都自动生成 `playground`。

原理是在模板的子工程目录下，提前放一个 `mp-plugin-public` 的文件，里面包括 `doc/miniprogram/project.config.json` 这些 `playground` 的必要东西。然后在 `compiler.hooks.done` 生命周期中（也可以用其他类似钩子），复制该目录到插件产物的上一层，然后打开该层目录，就可以自动调试了，无需手动拷贝。

为什么要将 `mp-plugin-public` 放到子工程下呢，是考虑到每个子工程是单独的一个插件，有不同的名称、文档、示例。

为什么要命名为 `mp-plugin-public` 呢，是将其类比成了 H5 下的 `public` 目录，在打包过程中不会编译，只会复制。


#### 1.2.3. 路径修复

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



