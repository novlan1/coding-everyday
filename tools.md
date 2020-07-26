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



### 【错误处理】`npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules`

这个问题的出现并不是管理员权限的问题，而是之前安装失败了，这个文件已经存在了，再次安装无法覆盖写入的问题。

1. 用`cnpm`试试
2. 删除重新安装
  - 找到`node`的全局安装路径，一般在`nodejs`文件夹的`node_modules`文件夹内，我的文件路径为：`E:\softtest\nodejs\node_modules`
  - 找到安装失败创建的文件夹，删除它；如果不清楚是哪个文件夹安装失败了，那么最直接的方式就是直接删掉`node_modules`文件夹，一了百了
  - .删除之后，再次执行`npm install`命令重新安装，即可成功 



### VScode 技巧

1. 编辑器如vscode一屏幕内显示**30行**左右比较舒服，比较方便
2. 要重置vscode所有设置，只需要把`setting.json`文件内容删掉



#### 快捷键

1. `ctrl+enter`在下方插入一行
2. `ctrl+shift+enter`在上方插入一行



#### VScode 常用插件

- css peek,html和css关联
- prettier代码格式化
- Icon Fonts：图标集
- Auto Rename Tag：自动修改标签
- Html Boilerplate：html模板
- Color Info 颜色提示
- Auto Close Tag：自动闭合标签
- HTML CSS Support：html中css，class自动提示 



#### 在 VScode 中高亮 css-in-js 语法的插件

vscode-styled-jsx



### `.editorConfig`文件

 如果没有设置.editorConfig文件，会使用编辑器里的规则，如果设置了.editorConfig文件，则会优先使用这个文件里的配置：
``` 
# editorconfig.org

root = true

[*]
charset = utf-8
indent_size = 2
indent_syle = space
insert_final_newline = true # 是否使文件以一个空白行结尾
tirm_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false # 自动去除行尾多余的空格
```



### Yarn的使用

Facebook公司开发的包管理工具

为什么使用Yarn？
1. 速度快；
2. 安装版本统一、更安全；
3. 更简洁的输出；
4. 更好的语义化

如何使用Yarn？
- yarn init
- yarn add 
- yarn remove
- yarn install 安装所有依赖包



### `vendor` 的意思

`vendor`中文翻译为厂商（第三方），`webpack`中通常用`vendor`来命名我们项目中使用的第三方库（俗称三方库）。



### STOMP

`STOMP(Simple Text-Orientated Messaging Protocol)` 面向消息的简单文本协议；
WebSocket是一个消息架构，不强制使用任何特定的消息协议，它依赖于应用层解释消息的含义。
-与HTTP不同，WebSocket是处在TCP上非常薄的一层，会将字节流转化为文本/二进制消息。因此，对于实际应用来说，WebSocket的通信形式层级过低。因此，可以在 WebSocket 之上使用STOMP协议，来为浏览器 和 server间的 通信增加适当的消息语义。



#### `STOMP`与`WebSocket`的关系

HTTP协议解决了web浏览器发起请求以及web服务器响应请求的细节，假设HTTP协议不存在,只能使用**TCP套接字**来编写web应用，你可能认为这是一件疯狂的事情；
直接使用`WebSocket(SockJS)`就很类似于使用TCP套接字来编写web应用,因为没有高层协议，就需要我们定义应用间发送消息的语义，还需要确保连接的两端都能遵循这些语义；
同HTTP在TCP套接字上添加请求-响应模型层一样，STOMP在WebSocket之上提供了一个基于帧的线路格式层，用来定义消息语义。



### 请求头`keep-alive`

HTTP的生命周期通过 Request 来界定，也就是一个 Request 一个 Response ，那么在 HTTP1.0 中，这次HTTP请求就结束了。

在HTTP1.1中进行了改进，使得有一个`keep-alive`，也就是说，**在一个HTTP连接中，可以发送多个Request，接收多个Response**。但是请记住 Request=Response ， 在HTTP中永远是这样，也就是说**一个request只能有一个response**。而且这个response也是被动的，不能主动发起。



#### 我们已经有了 HTTP 协议，为什么还需要另一个协议websocket？它能带来什么好处？

1. 答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。
2. 以前的解决办法是轮询



### 什么是`node-gyp`？

GYP是一种**构建自动化工具**。
`node-gyp`：`node`下的`gyp`。



#### 为什么要有`node-gyp`？

`npm`为了方便干脆就**直接源码分发**，用户装的时候再**现场编译**。
因为`node`程序中需要调用一些其他语言编写的工具甚至是dll，需要先编译一下，否则就会有跨平台的问题，例如在`windows`上运行的软件`copy`到`mac`上就不能用了，但是如果源码支持，编译一下，在`mac`上还是可以用的。`node-gyp`在较新的Node版本中都是自带的（平台相关），用来编译原生`C++`模块。


### `antd`的`Icon`组件源码

主体代码
```
const Icon = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);
  return <i {...omit(props, ['type', 'spin'])} className={classString} />;
};
```

主要是整理`className`和`props`



### `classNames`和`omit.js`组件

`classNames`组件，主要是为组件提供动态`css`功能，方便向`React`之类的应用提供状态编程
```
classNames('foo', { bar: true }); // => 'foo bar'
```

`omit.js`，作用就是过滤掉对象中不需要的属性，避免把不必要的属性传递下去
```
var omit = require('omit.js');
omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }
```


### `uuid`插件增加唯一的`id`



### 要使用`scss`，需要安装`node-sass`

所以公司项目总是提示node-sass安装不正确 



### `node-sass`的安装问题

总是报`node-sass`找不到，又安装不上，原因是国外网址，太慢，自动断开。
一开始用`npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`，不管用，后来用`cnpm i node-sass`可以。



### 安装`electron`和`node-sass`冲突

先安装`electron`，安装任何一个其他的包后，都需要重新安装`node-sass`，因为是`cnpm`，每次装了其他包，就把它冲掉了。



### 安装`Babel-loader`时，需与`babel-core`(`@babel/core`)一起安装

`.babelrc`文件配置：
```
{
  "presets": [
    ["es2015", {"loose": true}], "react"]
}
```
需要安装：

- `babel-preset-es2015`
- `babel-preset-es2015-loose` 
- `babel-preset-react`



### 【错误处理】`Plugin/Preset files are not allowed to export objects,only functions.`关于`babel`报错的解决办法

1. 这里报错是因为`babel`的版本冲突。
官方文档注明：
`babel-loader 8.x | babel 7.x`
```
npm install -D babel-loader @babel/core @babel/preset-env 
```
`babel-loader 7.x | babel 6.x`
```
npm install -D babel-loader@7 babel-core babel-preset-env
```

2. 处理方法
(1) 升级`babel`到`babel7.0`
将所有有关babel的包都升级为7.0版本
```
"@babel/core": "^7.2.2",
"@babel/preset-env": "^7.3.1",
"@babel/preset-react": "^7.0.0",
"babel-loader": "^8.0.5",
```

(2) 并且修改`.babelrc`文件
```
{ "presets":["@babel/react","@babel/env",]}
```



### `cross-env`插件

使用`cross-env`是因为`NODE_ENV`在`mac`可以用，在`windows`下不可以



### `dev-server`的`host`设置

设置`dev-server`的`host`为`0.0.0.0`可以使用`localhost`或者本地`ip`或者`127.0.0.1`。

如果设置为`127.0.0.1`别人无法通过ip访问



### Fiddler 工作原理

1. Fiddler工作原理： 在客户端和服务器端建立**代理服务器**。
2. 两种模式：**流模式**（更接近浏览器本身模式），**缓冲模式**（可控）




