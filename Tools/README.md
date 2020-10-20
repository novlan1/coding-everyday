- [1. Yarn的使用](#1-yarn的使用)
- [2. `vendor` 的意思](#2-vendor-的意思)
- [3. STOMP](#3-stomp)
  - [3.1. `STOMP`与`WebSocket`的关系](#31-stomp与websocket的关系)
- [4. 请求头`keep-alive`](#4-请求头keep-alive)
  - [4.1. 我们已经有了 HTTP 协议，为什么还需要另一个协议websocket？它能带来什么好处？](#41-我们已经有了-http-协议为什么还需要另一个协议websocket它能带来什么好处)
- [5. 什么是`node-gyp`？](#5-什么是node-gyp)
  - [5.1. 为什么要有`node-gyp`？](#51-为什么要有node-gyp)
- [6. `antd`的`Icon`组件源码](#6-antd的icon组件源码)
- [7. `classNames`和`omit.js`组件](#7-classnames和omitjs组件)
- [8. `uuid`插件增加唯一的`id`](#8-uuid插件增加唯一的id)
- [9. 要使用`scss`，需要安装`node-sass`](#9-要使用scss需要安装node-sass)
- [10. `node-sass`的安装问题](#10-node-sass的安装问题)
- [11. 安装`electron`和`node-sass`冲突](#11-安装electron和node-sass冲突)
- [12. 安装`Babel-loader`时，需与`babel-core`(`@babel/core`)一起安装](#12-安装babel-loader时需与babel-corebabelcore一起安装)
- [13. 【错误处理】`Plugin/Preset files are not allowed to export objects,only functions.`关于`babel`报错的解决办法](#13-错误处理pluginpreset-files-are-not-allowed-to-export-objectsonly-functions关于babel报错的解决办法)
- [14. `cross-env`插件](#14-cross-env插件)
- [15. `dev-server`的`host`设置](#15-dev-server的host设置)
- [16. Fiddler 工作原理](#16-fiddler-工作原理)
- [react-docgen生成文档](#react-docgen生成文档)
- [jsDoc生成注释](#jsdoc生成注释)
- [typescript忽略传来的某属性](#typescript忽略传来的某属性)
- [判断被点击的元素是否在容器内](#判断被点击的元素是否在容器内)
- [上传文件的方式](#上传文件的方式)
- [Formdata](#formdata)
- [`rimraf`插件](#rimraf插件)
- [`npm whoami` 检测是否登录`npm`](#npm-whoami-检测是否登录npm)
- [`package.json`中的`private`？](#packagejson中的private)
- [`package.json`中的ISC协议？](#packagejson中的isc协议)
- [`peerDependencies` 预先下载的依赖，比如React组件库需要预先下载`React`](#peerdependencies-预先下载的依赖比如react组件库需要预先下载react)
- [`husky`插件进行`git commit`前的`lint`检查和单元测试](#husky插件进行git-commit前的lint检查和单元测试)
- [`travis`自动运行测试CI](#travis自动运行测试ci)
- [ts类型声明文件的作用](#ts类型声明文件的作用)
- [软实力](#软实力)

### 1. Yarn的使用

Facebook公司开发的包管理工具

为什么使用Yarn？
1. 速度快；
2. 安装版本统一、更安全；
3. 更简洁的输出；
4. 更好的语义化

如何使用Yarn？
- `yarn init`
- `yarn add `
- `yarn remove`
- `yarn install` 安装所有依赖包



### 2. `vendor` 的意思

`vendor`中文翻译为厂商（第三方），`webpack`中通常用`vendor`来命名我们项目中使用的第三方库（俗称三方库）。



### 3. STOMP

`STOMP`(`Simple Text-Orientated Messaging Protocol`) 面向消息的简单文本协议；

与HTTP不同，WebSocket是处在TCP上非常薄的一层，会将字节流转化为文本/二进制消息。因此，对于实际应用来说，WebSocket的通信形式层级过低。因此，可以在 WebSocket 之上使用STOMP协议，来为浏览器 和 server间的 通信增加适当的消息语义。



#### 3.1. `STOMP`与`WebSocket`的关系

HTTP协议解决了web浏览器发起请求以及web服务器响应请求的细节，假设HTTP协议不存在,只能使用**TCP套接字**来编写web应用，你可能认为这是一件疯狂的事情；
直接使用`WebSocket(SockJS)`就很类似于使用TCP套接字来编写web应用,因为没有高层协议，就需要我们定义应用间发送消息的语义，还需要确保连接的两端都能遵循这些语义；
同HTTP在TCP套接字上添加请求-响应模型层一样，STOMP在WebSocket之上提供了一个基于帧的线路格式层，用来定义消息语义。



### 4. 请求头`keep-alive`

HTTP的生命周期通过 Request 来界定，也就是一个 Request 一个 Response ，那么在 HTTP1.0 中，这次HTTP请求就结束了。

在HTTP1.1中进行了改进，使得有一个`keep-alive`，也就是说，**在一个HTTP连接中，可以发送多个Request，接收多个Response**。但是请记住 Request=Response ， 在HTTP中永远是这样，也就是说**一个request只能有一个response**。而且这个response也是被动的，不能主动发起。



#### 4.1. 我们已经有了 HTTP 协议，为什么还需要另一个协议websocket？它能带来什么好处？

1. 答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。
2. 以前的解决办法是轮询



### 5. 什么是`node-gyp`？

GYP是一种**构建自动化工具**。
`node-gyp`：`node`下的`gyp`。



#### 5.1. 为什么要有`node-gyp`？

`npm`为了方便干脆就**直接源码分发**，用户装的时候再**现场编译**。
因为`node`程序中需要调用一些其他语言编写的工具甚至是dll，需要先编译一下，否则就会有跨平台的问题，例如在`windows`上运行的软件`copy`到`mac`上就不能用了，但是如果源码支持，编译一下，在`mac`上还是可以用的。`node-gyp`在较新的Node版本中都是自带的（平台相关），用来编译原生`C++`模块。


### 6. `antd`的`Icon`组件源码

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



### 7. `classNames`和`omit.js`组件

`classNames`组件，主要是为组件提供动态`css`功能，方便向`React`之类的应用提供状态编程
```
classNames('foo', { bar: true }); // => 'foo bar'
```

`omit.js`，作用就是过滤掉对象中不需要的属性，避免把不必要的属性传递下去
```
var omit = require('omit.js');
omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }
```


### 8. `uuid`插件增加唯一的`id`



### 9. 要使用`scss`，需要安装`node-sass`

所以公司项目总是提示node-sass安装不正确 



### 10. `node-sass`的安装问题

总是报`node-sass`找不到，又安装不上，原因是国外网址，太慢，自动断开。
一开始用`npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`，不管用，后来用`cnpm i node-sass`可以。



### 11. 安装`electron`和`node-sass`冲突

先安装`electron`，安装任何一个其他的包后，都需要重新安装`node-sass`，因为是`cnpm`，每次装了其他包，就把它冲掉了。



### 12. 安装`Babel-loader`时，需与`babel-core`(`@babel/core`)一起安装

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



### 13. 【错误处理】`Plugin/Preset files are not allowed to export objects,only functions.`关于`babel`报错的解决办法

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



### 14. `cross-env`插件

使用`cross-env`是因为`NODE_ENV`在`mac`可以用，在`windows`下不可以



### 15. `dev-server`的`host`设置

- 设置`dev-server`的`host`为`0.0.0.0`时，可以使用`localhost`或者本地`ip`或者`127.0.0.1`。

- **如果设置为`127.0.0.1`别人无法通过ip访问**



### 16. Fiddler 工作原理

1. Fiddler工作原理： 在客户端和服务器端建立**代理服务器**。
2. 两种模式：**流模式**（更接近浏览器本身模式），**缓冲模式**（可控）




### react-docgen生成文档

对应ts：react-docgen-typescript-loader


### jsDoc生成注释

注释格式如下，开头两个`*`号，结束一个`*`号：
```js
/** This is a description of the foo function. */
function foo() {
}
```

### typescript忽略传来的某属性
比如要忽略size属性：
`Omit<XXX, 'size'>`


### 判断被点击的元素是否在容器内

```js
A.contains(e.target)
```

这么简单，不用一层一层遍历

### 上传文件的方式

有两种方式：
1. form表单
2. ajax异步发送

后者一般借助`Formdata`

### Formdata

FormData的主要用途有两个：
1. 将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
2. 异步上传文件


####​POST请求进行文件上传​
```html
<form>
    <input type="text" name="user" id="userID">
    <input type="file" name="file-name" id="fileID" multiple>
</form>
<button>上传文件</button>
```

```js
//01 获取页面中的btn标签
var oBtn    = document.getElementsByTagName("button")[0];
var oUser   = document.getElementById("userID");
var oFileID = document.getElementById("fileID");
​
//02 给按钮标签添加点击事件
oBtn.onclick = function(){
​
//03 获取表单中的文件内容
var data = new FormData();
data.set("user",oUser.value);
Array.from(oFileID.files).forEach(function(file){
    data.append("fileName",file);
})
​
//04 使用Ajax发送GET请求
var xhr = new XMLHttpRequest();
xhr.open("POST","http://127.0.0.1:5000/api",true);
xhr.send(data);
xhr.onreadystatechange = function(){
  if(xhr.status >= 200 && xhr.status <=300 || xhr.status == 304)
  {
      console.log("请求成功"+xhr.responseText);
  }else{
      console.log("请求失败"+xhr.statusText);
  }
}
}
```

### `rimraf`插件

`rm -rf`

### `npm whoami` 检测是否登录`npm`

`npm config ls`，查看`npm`配置信息，包括是否用了淘宝源

### `package.json`中的`private`？

如果你在你的`package.json`中设置了`“private”：true`，那么`npm`将拒绝发布它。 这是防止私人存储库意外发布的一种方法。

### `package.json`中的ISC协议？

ISC协议和BSD协议差不多，都极大程度的开源，一般选择MIT协议

### `peerDependencies` 预先下载的依赖，比如React组件库需要预先下载`React`

但是开发组件库的过程中还需要，所以可以将它们如`react`、`react-dom`移动到`devDependcies`

### `husky`插件进行`git commit`前的`lint`检查和单元测试

### `travis`自动运行测试CI

### ts类型声明文件的作用

什么是声明文件？
和 `C/C++` 的 `*.h` 头文件（`Header files`）非常相似：当你在 C/C++ 程序中引用了一个第三方库（`.lib/.dll/.so/.a/.la`）时，`C/C++` **编译器无法自动地识别库内导出名称和函数类型签名**等，这就需要使用头文件进行接口声明了。

同理地，`TypeScript` 的声明文件是一个以 `.d.ts` 为后缀的 `TypeScript` 代码文件，但它的作用是描述一个 `JavaScript` 模块（广义上的）内所有导出接口的类型信息。

### 软实力

1. 举一反三，触类旁通
2. 自我学习的能力



