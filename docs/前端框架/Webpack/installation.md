- [1. 安装 webpack](#1-安装-webpack)
  - [1.1. webpack-cli](#11-webpack-cli)
  - [1.2. npx](#12-npx)
  - [1.3. 安装制定版本 webpack](#13-安装制定版本-webpack)
## 1. 安装 webpack

在项目中安装

```
npm install webpack webpack-cli --save-dev
```

是否全局安装？

如果电脑上有两个项目，一个 webpack3 打包，一个 webpack4 打包。安装后可能导致你 webpack3 的项目无法打包，所以一般都是项目内安装。

### 1.1. webpack-cli

使得可以在命令行里使用 webpack

### 1.2. npx

项目内安装 webpack 后，直接在终端输入`webpack -v`是不可以的，但是使用`npx webpack -v`就可以。

```
$ webpack -v
> bash: webpack: command not found
$ npx webpack -v
> 4.35.0
```

这是因为`npx`这个命令可以帮助我们在当前项目的`node_modules`中查找对应的包。

### 1.3. 安装制定版本 webpack

```
`npm install webpack@4.16.5 -D` 在包名后加‘@’再加版本号 查看某包信息，可以运行 `npm info webpack`
```
