- [1. `--save` 和 `--save-dev` 的区别](#1---save-和---save-dev-的区别)
- [2. 关于`cnpm`](#2-关于cnpm)
- [3. `cnpm`和`npm`的区别](#3-cnpm和npm的区别)
- [4. 设置 npm 的 registry 的几种方法](#4-设置-npm-的-registry-的几种方法)
- [5. `prepack：“npm run build"`的作用](#5-prepacknpm-run-build的作用)
- [6. `package-lock.json`的作用](#6-package-lockjson的作用)
- [7. 版本号](#7-版本号)
- [8. npx常见用处](#8-npx常见用处)
- [9. npx作用](#9-npx作用)
  - [9.1. `npm run`的过程](#91-npm-run的过程)
- [10. 【错误处理】`npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules`](#10-错误处理npm-warn-checkpermissions-missing-write-access-to-usrlocallibnode_modules)



### 1. `--save` 和 `--save-dev` 的区别

以`msbuild`包为例

1. `npm install --save`

- 会把`msbuild`包安装到`node_modules`目录中
- 会在`package.json`的`dependencies`属性下添加`msbuild`
- 之后运行`npm install`命令时，会自动安装`msbuild`到`node_modules`目录中
- 之后运行`npm install --production`或者注明`NODE_ENV`变量值为`production`时，会自动安装`msbuild`到`node_modules`目录中

2. `npm install --save-dev`

- 会把`msbuild`包安装到`node_modules`目录中
- 会在`package.json`的`devDependencies`属性下添加`msbuild`
- 之后运行`npm install`命令时，会自动安装`msbuild`到`node_modules`目录中
- 之后运行`npm install --production`或者注明NODE_ENV变量值为`production`时，**不会**自动安装`msbuild`到`node_modules`目录中

`--save`和`--save-dev`的区别在于，`--save`安装的包，会被**引入到我们最终输入的代码中**，也就是最终会在用户浏览器执行的包，比如（**`jquery`**，**`vue`**）。 `--save-dev`安装的包**只会在开发者的开发环境上执行**，用于协助开发者的开发的，比如(**`webpack`，`babel`**)。


### 2. 关于`cnpm`

因为`npm`安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果`npm`的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。来自官网：“这是一个完整`npmjs.org`镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”

- 官方网址：`http://npm.taobao.org`
- 安装：命令提示符执行`npm install cnpm -g –registry=https://registry.npm.taobao.org`
- 注意：安装完后最好查看其版本号`cnpm -v`或关闭命令提示符重新打开，安装完直接使用有可能会出现错误

注：`cnpm`跟`npm`用法完全一致，只是在执行命令时将`npm`改为`cnpm`。



### 3. `cnpm`和`npm`的区别

- cnpm是扁平化结构，把依赖都展开
- npm是树形结构，一层一层。
- 打包时cnpm慢



### 4. 设置 npm 的 registry 的几种方法

1. 临时使用

```
npm --registry https://registry.npm.taobao.org install express
```

2. 持久使用

```
npm config set registry https://registry.npm.taobao.org
```

配置后可通过下面方式来验证是否成功 

```
npm config get registry 或  npm info express
```

3. 通过cnpm使用

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



### 5. `prepack：“npm run build"`的作用

`package.json`中的命令，加上`pre`就可以在该条命令前执行，比如`prepack：“npm run build"`。同理，加上`post`就可以在该条命令之后执行。



### 6. `package-lock.json`的作用

`package-lock`就是**锁定安装时的包版本号**，需要上传到`git`上，以保证其他人在`install`时候，大家的依赖版本相同。

它和`package.json`的区别在于（举个栗子）：

```
"dependencies": {
  "@types/node": "^8.0.33",
}
```

这里的`^`向上尖号是定义**向后（新）兼容依赖**，如果`types/node`版本是超过`8.0.33`，并且是在**大版本（8）上相同**，就允许下载最新的`types/node`包。同一个大版本不同版本号之间存在差异，导致依赖库包行为特征有时候不兼容。

`package.json`文件**只能锁定大版本**，**即版本号的第一位**，不能锁定后面的小版本，你每次`npm install`时候拉取的该大版本下面最新的版本，可能有些人之前就踩过类似的坑。

`package-lock.json`就是来解决包锁定不升级问题的。

如果要升级`package-lock.json`里面的库包，怎么操作呢？

```
npm install XXX@x.x.x 
```

注意：
`cnpm install`的时候，就算你项目中有`package-lock.json`文件，`cnpm`也不会识别，仍会根据`package.json`来安装。


### 7. 版本号

使用 npm 下载和发布代码时都会接触到版本号。npm 使用语义版本号来管理代码，语义版本号分为 X.Y.Z 三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

> 版本号中的“~” 和 “^”
>
> - ~1.2.2：表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变主版本号和次版本号。
>- ˆ1.2.2：表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变主版本号。需要注意的是，如果主版本号为0，则 “^” 和 “~” 行为相同，这是因为此时处于开发阶段，即使是次版本号变动，也可能带来程序的不兼容。
>- 1.2.2：表示安装1.2.2版本，使用 npm update 命令时不会更新此类包


### 8. npx常见用处

1. 调用项目内部安装的模块
   `npx` 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。

2. 避免全局安装模块
   比如，`create-react-app`这个模块是全局安装，`npx` 可以运行它，而且不进行全局安装。


### 9. npx作用

1. 避免全局安装模块
   - 将create-react-app下载到临时目录，使用以后再删除。所以每一次执行`npx create-react-app`都会重新下载`create-react-app`。

2. 调用项目内部安装的模块
   - 比如安装了`mocha`，不可以在命令行中直接输入`mocha`，但是可以在`package.json`中新建`script`，比如：`test: mocha --version`。
   - 若使用`npx`，就可以使用`mocha`命令了，如`npx mocha --version`。

#### 9.1. `npm run`的过程
每次`npm run`的时候都会新建一个`shell`，在`shell`中执行指定的脚本命令。`shell`会将`node_modules/bin`子目录加入`path`变量，执行结束后，再将`path`变量恢复原样。这样就可以调用内部的命令了。


### 10. 【错误处理】`npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules`

这个问题的出现并不是管理员权限的问题，而是之前安装失败了，这个文件已经存在了，再次安装无法覆盖写入的问题。

1. 用`cnpm`试试
2. 删除重新安装

