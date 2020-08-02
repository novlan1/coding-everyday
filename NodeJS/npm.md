### `--save` 和 `--save-dev` 的区别

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


### 关于`cnpm`

因为`npm`安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果`npm`的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。来自官网：“这是一个完整`npmjs.org`镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”

- 官方网址：`http://npm.taobao.org`
- 安装：命令提示符执行`npm install cnpm -g –registry=https://registry.npm.taobao.org`
- 注意：安装完后最好查看其版本号`cnpm -v`或关闭命令提示符重新打开，安装完直接使用有可能会出现错误

注：`cnpm`跟`npm`用法完全一致，只是在执行命令时将`npm`改为`cnpm`。



### `cnpm`和`npm`的区别

- cnpm是扁平化结构，把依赖都展开
- npm是树形结构，一层一层。
- 打包时cnpm慢



### 设置 npm 的 registry 的几种方法

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



### `prepack：“npm run build"`的作用

`package.json`中的命令，加上`pre`就可以在该条命令前执行，比如`prepack：“npm run build"`。同理，加上`post`就可以在该条命令之后执行。



### `package-lock.json`的作用

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



### npx常见用处

1. 调用项目内部安装的模块
   npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。

2. 避免全局安装模块
   比如，`create-react-app`这个模块是全局安装，`npx` 可以运行它，而且不进行全局安装。



### 【错误处理】`npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules`

这个问题的出现并不是管理员权限的问题，而是之前安装失败了，这个文件已经存在了，再次安装无法覆盖写入的问题。

1. 用`cnpm`试试
2. 删除重新安装

  - 找到`node`的全局安装路径，一般在`nodejs`文件夹的`node_modules`文件夹内，我的文件路径为：`E:\softtest\nodejs\node_modules`
  - 找到安装失败创建的文件夹，删除它；如果不清楚是哪个文件夹安装失败了，那么最直接的方式就是直接删掉`node_modules`文件夹，一了百了
  - 删除之后，再次执行`npm install`命令重新安装，即可成功 

