## Electron
### 进程
- chrome和electron一样，有一个主进程和多个渲染进程
- 每个渲染进程对应一个窗口
- 渲染进程能够调用 DOM 的 API 和 node 的 API
- 主进程能调用 node 的 API



### 主进程特点
- 支持nodejs；
- 只有一个，作为整个程序的入口点；
- 创建渲染进程；
- 可以使用和系统对接的Eelectron API，比如上传文件、创建菜单等。


### parent 属性
从窗口增加 parent 属性，作用是当父窗口关闭时，子窗口也跟着关闭。

### `nodeIntegration`
electron 项目中，HTML 页面里面引用 nodejs 的模块时缺报了错，提示 require 未找到，原来是electron 升级到5.0之后默认关闭了 html 页面启用 nodejs 环境的问题！
```js
webPreferences:{
  nodeIntegration:true
}
```

### IPC进程间通信
```js
ipcRenderer.send('msg', 'hello')

ipcMain.on('msg', (event, arg) => {
  ipcMain.reply('reply', 'hi')
})

ipcMain.emit(‘msg’,’hi’)
```

### `electron-is-dev`插件
`electron-is-dev`插件判断是开发环境还是线上 
```js
const isDev=require('electron-is-dev')
```

### 启动命令
- 使用`concurrently`同时运行`react``和`electron`，`concurrently \"electron .\"  \"npm start\"`
- 使用`wait-on`插件，等待`localhost:3000`加载完之后，再运行`electron`
- 安装`cross-env`，不在浏览器中打开`localhost:3000`，`BROWSER=none`

最后的命令为：
```js
 "dev": "concurrently \"wait-on http://localhost:3000 && electron .\"  \"cross-env BROWSER=none npm start\""
```


### loadUrl
electron 用 loadUrl 当作 loadFile 使用，需要加上`file://`协议符号


### 上下文菜单 Menu、MenuItem
```js
menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

### 打开导入文件对话框
```js
remote.dialog.showOpenDialog({
  title: '',
  properties: [],
  filters: []
})
```
返回对象，包括 `canceled` 和 `filepaths`


### 打开成功提示信息
```js
remote.dialog.showMessageBox({
  type: 'info',
  title: ``,
  message: ``,
})
```

### `electron-store`进行持久化数据
数据持久化，就是防止刷新就没了，比如数据库、`localStorage`、本地文件等


### `window.require`
`electron` + `react`中无法使用`require`的原因是被`webpack`劫持了，在`node_modules`中去找了。
加上`window.require`后，可以把控制权交给`node.js`。

### HTTPS 证书不合法时 ，electron 会自动退出
```js
app.on('certificate-error'，(e, cb)=>{ 
  e.preventDefault(); 
  cb(true) 
})
```

### 提示跨域

渲染进程发送http请求，是从`file`协议上发的，提示跨域，需要设置：
```js
webPreferences:{ 
  webSecurity: false 
}
```

### `electron-builder`打包时下载依赖失败，解决方法
1. 在淘宝镜像上下载相应的包，`https://npm.taobao.org/mirrors/electron/`。按照包名下载
2. 放到相应系统的缓存目录下。
```js
macOS: ～/Library/Cache/electron-builder
windows: %LOCALAPPDATA\electron-builder\cache
```

### 打包中的坑
1. `electron-builder`中把`react build`后的文件夹当成静态文件，不给打包，所以在配置的**`files`**字段中手动写入要打包的文件。 （提示错误为找不到`build/index.html`）
    1.1 `glob pattern`, 比如`build/**/*`，两个星号匹配所有子文件夹的文件，一个星号匹配当前文件夹下的所有文件。`**/*`就是当前目录下的所有文件。
    1.2 只要一设置`files`字段，默认配置就不生效了，所以必须全部写进去，包括`main.js`以及它依赖的文件和包。
2. 修改`extends`属性为`null`，禁掉自动修改打包入口文件（应始终是`main.js`）（提示错误为找不到入口文件`build/electron.js`）。
3. 在`package.json`中添加`homepage`为`'./'`，改为相对路径（提示错误为静态文件路径不对，`/static/css`、`/static/js`等）。
4. 把所有在`main.js`中引用的插件，放到`dependencies`中去，否则会报错。

### 打包体积优化
1. electron打包时要把需要的包名称写到`package.jason`的`dependencies`中，`electron-builder`不会打包`devDependencies`中的包。
所以一个优化的点就是将`main.js`中不需要的包移动到`devDependencies`中去。因为`react`已经将其他的打包过了，且是压缩的形式。打包后的`node_modules`文件夹就会变得很小。

2. 用`webpack`将`main.js`及其依赖打包，就可以在配置的`files`中少写文件。同时要在配置中添加`extraMetadata`字段，以覆盖开发中的入口文件`main.js`
```json
"extraMetadata": {
  "main": "./build/main.js"
},
```
并且将`prepack`和`predist`改为`npm run build && npm run buildMain`，以及在`main.js`中把`loadUrl`路径更新。同时把`dependencies`更新，把`main.js`中使用的去掉。


### `electron-builder --dir`
- `"electron-builder --dir"`, 打包生成安装完毕后的文件
- `"electron-builder"`，生成`dmg`、`exe`等源文件


### 自动更新
1. 自动发布`release`

添加`publish`配置：`[‘github’]`；增加命令`release`，和`dist`指令相同，不过它会自动发布一个`release`；同时增加指令`prerelease`，和`predist`相同。

如果更新到`github`需要`token`，所以完整命令为:
```json
“release”： "cross-env GH_TOKEN=123 electron-builder"
```
2. 添加自动更新功能

安装`electron-updater`，比`electron`内置的更新配置简单。


### `nodemon`监控某些文件变动，自动刷新
```json
"onlyEle": "nodemon --watch main.js --watch ./src/utils/menuTemplate.js --exec \"electron .\" "
```

### 设置原生菜单
```js
const menu = Menu.buildFromTemplate(menuTemplate)

Menu.setApplicationMenu(menu)
```
在主进程中，还可以动态设置某些菜单是否禁用：
```js
menu.items[0].submenu.items[0].enabled = false
```

### 安装`devtron`后，能查看IPC通信信息
代码：
```js
require('devtron').install()
```
### electron 打开控制台：
```js
mainWindow.webContents.openDevTools()
```

### electron 的 shell
可以用默认浏览器打开网页，可以打开文件夹

### 上下文菜单
electron上下文菜单（右键菜单），需要先判断点击目标是否是文件`item`的子元素，然后响应`contextmenu`事件：
```js
const menu =  new Menu()

menu.append(new MenuItem(item))
menu.popup({ window: remote.getCurrentWindow() })
```

### 在`main.js`中使用`ipcMain`监听事件，为什么有的地方可以用`event.sender`去发送信息，有的地方却只能用`mainWindow`来发送呢？
- `mainWindow`指定发送，而`event.sender`进程内回调发送。
- 就是一个页面内发信息发送到`main.js`，然后用`event.sender`进行进程内在发送回去。
- 而`mainwindow`实际上是新建的一个进程窗口，我们就指定给他发送了。




### 解决 Windows 下安装`electron 8.0.0` 在`node install.js`卡住的问题


1. 卡在 `node install.js` 时 `ctrl+c` 退出进程
2. `cd node_modules/electron && code install.js` （打开`install.js`）
3. 修改代码如下:
```js
mirrorOptions:{
  mirror:'https://npm.taobao.org/mirrors/electron/',
  customDir:'8.0.0',
  // customFilename:'electron-8.0.0-win32-x64.zip'
}
```
这个方案在其他文章中也有所提及，只是版本不同，修改的参数不同了

