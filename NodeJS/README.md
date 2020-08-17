- [1. NodeJS的优势](#1-nodejs的优势)
- [2. NodeJS 全局变量和全局对象](#2-nodejs-全局变量和全局对象)
  - [2.1. 全局对象](#21-全局对象)
  - [2.2. 全局函数：](#22-全局函数)
  - [2.3. 全局变量：](#23-全局变量)
  - [2.4. 准全局变量](#24-准全局变量)
- [3. http-server 启动本地服务器](#3-http-server-启动本地服务器)
- [4. nodeJS 获取IP和Mac地址](#4-nodejs-获取ip和mac地址)
- [5. fs 的常用API](#5-fs-的常用api)
  - [5.1. fs](#51-fs)
  - [5.2. fs 的 Promise](#52-fs-的-promise)
- [6. 流](#6-流)
  - [6.1. NodeJS 流基本用法：](#61-nodejs-流基本用法)
- [7. 扫描所有视频文件](#7-扫描所有视频文件)

### 1. NodeJS的优势

- JS适合资源密集型操作，单线程，支持高并发，如果是CPU密集型会一直占用这个线程
- NodeJS可以充分单核CPU的性能，高并发是相对的。


### 2. NodeJS 全局变量和全局对象

#### 2.1. 全局对象

所有模块都可以调用
1）`global`：表示Node所在的全局环境，类似于浏览器中的window对象。
2）`process`：指向Node内置的process模块，允许开发者与当前进程互动。
例如你在DOS或终端窗口直接输入node，就会进入NODE的命令行方式（REPL环境）。退出要退出的话，可以输入 process.exit();
3）`console`：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。
通常是写console.log()，无须多言


#### 2.2. 全局函数：

1）定时器函数：共有4个，分别是`setTimeout()`, `clearTimeout()`, `setInterval()`, `clearInterval()`。
2）`require`：用于加载模块。


#### 2.3. 全局变量：

1）`_filename`：指向当前运行的脚本文件名。
2）`_dirname`：指向当前运行的脚本所在的目录。


#### 2.4. 准全局变量

模块内部的局部变量，指向的对象根据模块不同而不同，但是所有模块都适用，可以看作是伪全局变量，主要为`module`,`module.exports`, `exports`等。

`module`变量指代当前模块。`module.exports`变量表示当前模块对外输出的接口，**其他文件加载该模块，实际上就是读取`module.exports`变量**。

- `module.id` 模块的识别符，通常是模块的文件名。
- `module.filename` 模块的文件名。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回使用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块


### 3. http-server 启动本地服务器

`npm install -g http-server`

`http-server` 目录，启动一个本地服务器

- `-p` 端口号 (默认 8080)
- `-a` IP 地址 (默认 0.0.0.0)
- `-o` 在开始服务后打开浏览器


### 4. nodeJS 获取IP和Mac地址

```js
var os=require("os");

var networkInterfaces=os.networkInterfaces();

console.info(networkInterfaces);
```

### 5. fs 的常用API

#### 5.1. fs
```js
fs.unlink(path)   // 删除文件

fs.rename(path, newPath)   // 重命名文件

fs.readFile(path, {encoding: 'utf8'})   // 读取文件

fs.writeFile(path, content, {encoding: 'utf8'})   // 写入文件
```

#### 5.2. fs 的 Promise

node10以后，fs增加了Promise，直接返回结果，如：
```js
const readFile = (path) => {
  return fs2.readFile(path, {encoding: 'utf-8'})
 }

const testPath = path.join(__dirname, 'helper.js')

readFile(testPath).then(res => {
  console.log(res)
})
```

### 6. 流

流的类型：
- 可读流
- 可写流
- 双向流
- 转换流


注意，流是基于事件的。

`pipe`做的事情：
```js
readable.on('data', (chunk)=>{
  writable.write(chunk)
})

readable.on('end', ()=>{
  writable.end()
})
```

转换流：将一个流转到另一个流，比如读取一个文件，压缩后再写入到另一个文件。`gulp`的很多模块就是用转换流实现的。

例子：
```js
src.pipe(zlib.createGzip()).pipe(writeDesc)
```

#### 6.1. NodeJS 流基本用法：
```js
// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
```

### 7. 扫描所有视频文件
```js
const path = require('path')
const fs = require('fs')

// 要遍历的根目录
// const firstPath = path.join(__dirname, '.')
const firstPath = 'D:'
const saveFileLocation = path.join(__dirname, 'video_list.txt')
readDir(firstPath)

let count = 1
// 遍历目录
function readDir(rootPath) {
  fs.readdir(rootPath, {encoding: 'utf8'}, (err, files) => {
    if(!files || !files.length) return
    
    files.forEach(file => {
      const filePath = `${rootPath}/${file}`
      
      fs.stat(filePath, (err, info) => {
        if (info && info.isDirectory()) {
          readDir(filePath)
        } else {
          const extName = path.extname(filePath)
          if (['.mp4', '.avi', '.mkv', '.rmvb'].includes(extName)){
            writeToFile(saveFileLocation, `${count}. ${filePath}\n`)
            count += 1
          }
        }
      })
    }) 
  })
}

function writeToFile(file, data) {
  fs.writeFile(file, data, {flag: 'a'}, (err,a,b) =>{
  })
}
```