- [1. BOM](#1-bom)
  - [1.1. BOM 与 DOM 的关系](#11-bom-与-dom-的关系)
  - [1.2. BOM 对象包含哪些内容？](#12-bom-对象包含哪些内容)
  - [1.3. History 对象](#13-history-对象)
  - [1.4. Location 对象](#14-location-对象)
  - [1.5. Window 对象](#15-window-对象)
  - [1.6. Navigator 对象](#16-navigator-对象)
  - [1.7. Screen 对象](#17-screen-对象)
  - [1.8. 检测浏览器版本版本有哪些方式？](#18-检测浏览器版本版本有哪些方式)
  - [1.9. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别](#19-offsetwidthoffsetheightclientwidthclientheight-与-scrollwidthscrollheight-的区别)
  - [1.10. 什么是BOM？](#110-什么是bom)
  - [1.11. BOM 通用的API](#111-bom-通用的api)
  - [1.12. 如何检测浏览器的类型？](#112-如何检测浏览器的类型)
  - [1.13. 拆解URL的各部分](#113-拆解url的各部分)

## 1. BOM

BOM 是 `browser object model` 的缩写， 简称浏览器对象模型。 主要处理浏览器窗口和框架， 描述了与浏览器进行交互的方法和接口， 可以对浏览器窗口进行访问和操作， 譬如可以弹出 新的窗口， 回退历史记录， 获取 url……

### 1.1. BOM 与 DOM 的关系

1. javacsript 是通过访问 BOM 对象来访问、 控制、 修改浏览器
2. **BOM 的 window 包含了 document**， 因此通过 window 对象的 document 属性就可以访问、 检索、 修改文档内容与结构。
3. document 对象又是 DOM 模型的根节点。

因此， **BOM 包含了 DOM**， 浏览器提供出来给予访问的是 BOM 对象， 从 BOM 对象再访 问到 DOM 对象， 从而 js 可以操作浏览器以及浏览器读取到的文档

### 1.2. BOM 对象包含哪些内容？

- Window JavaScript 层级中的顶层对象， 表示浏览器窗口。
- Navigator 包含客户端浏览器的信息。
- History 包含了浏览器窗口访问过的 URL。
- Location 包含了当前 URL 的信息。
- Screen 包含客户端显示屏的信息。

### 1.3. History 对象

History 对象包含用户（在浏览器窗口中） 访问过的 URL

| 方法/属性 | 描述                              |
| --------- | --------------------------------- |
| length    | 返回浏览器历史列表中的 URL 数量。 |
| back()    | 加载 history 列表中的前一个 URL。 |
| forward() | 加载 history 列表中的下一个 URL。 |
| go()      | 加载 history 列表中的某个具体页面 |

### 1.4. Location 对象

Location 对象包含有关当前 URL 的信息。

| 属性     | 描述                                         |
| -------- | -------------------------------------------- |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚） 。     |
| host     | 设置或返回主机名和当前 URL 的端口号。        |
| hostname | 设置或返回当前 URL 的主机名。                |
| href     | 设置或返回完整的 URL。                       |
| pathname | 设置或返回当前 URL 的路径部分。              |
| port     | 设置或返回当前 URL 的端口号。                |
| protocol | 设置或返回当前 URL 的协议。                  |
| search   | 置或返回从问号 (?) 开始的 URL（查询部分） 。 |

| 方法            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| assign()        | 加载新的文档。                                               |
| reload(‘force’) | 重新加载当前文档。参数可选，不填或填 false 则取浏览器缓存的文档 |
| replace()       | 用新的文档替换当前文档。                                     |

### 1.5. Window 对象

Window 对象表示一个浏览器窗口或一个框架。 在客户端 JavaScript 中， Window 对象 是全局对象，所有的表达式都在当前的环境中计算。 例如，可以只写 document， 而 不必写 window.document。

| 属性                                 | 描述                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| closed                               | 返回窗口是否已被关闭。                                       |
| defaultStatus                        | 设置或返回窗口状态栏中的默认文本。 （仅 Opera 支持）         |
| document                             | 对 Document 对象的只读引用。 请参阅 Document 对象。          |
| history                              | 对 History 对象的只读引用。 请参数 History 对象。            |
| innerheight                          | 返回窗口的文档显示区的高度。                                 |
| innerwidth                           | 返回窗口的文档显示区的宽度。                                 |
| length                               | 设置或返回窗口中的框架数量。                                 |
| location                             | 用于窗口或框架的 Location 对象。 请参阅 Location 对象。      |
| name                                 | 设置或返回窗口的名称。                                       |
| Navigator                            | 对 Navigator 对象的只读引用。 请参数 Navigator 对象。        |
| opener                               | 返回对创建此窗口的窗口的引用。                               |
| outerheight                          | 返回窗口的外部高度。                                         |
| outerwidth                           | 返回窗口的外部宽度。                                         |
| pageXOffset                          | 设置或返回当前页面相对于窗口显示区左上角的 X 位置。          |
| pageYOffset                          | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。          |
| parent                               | 返回父窗口。                                                 |
| Screen                               | 对 Screen 对象的只读引用。 请参数 Screen 对象。              |
| self                                 | 返回对当前窗口的引用。 等价于 Window 属性。                  |
| status                               | 设置窗口状态栏的文本。 (默认只支持 Opera)                    |
| top                                  | 返回最顶层的先辈窗口。                                       |
| window                               | window 属性等价于 self 属性， 它包含了对窗口自身的引用。     |
| screenLeft screenTop screenX screenY | 只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。 IE、 Safari、 Chrome 和 Opera 支持 screenLeft 和 screenTop， 而 Chrome、 Firefox 和 Safari 支持 screenX 和 screenY。 |

| 方法            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| alert()         | 显示带有一段消息和一个确认按钮的警告框。                     |
| blur()          | 把键盘焦点从顶层窗口移开。                                   |
| confirm()       | 显示带有一段消息以及确认按钮和取消按钮的对话框。             |
| createPopup()   | 创建一个弹出窗口。 只有 ie 支持（不包括 ie11）               |
| focus()         | 把键盘焦点给予一个窗口。                                     |
| moveBy()        | 可相对窗口的当前坐标把它移动指定的像素。                     |
| moveTo()        | 把窗口的左上角移动到一个指定的坐标。                         |
| open()          | 打开一个新的浏览器窗口或查找一个已命名的窗口。 window.open(URL,name,features,replace) |
| print()         | 打印当前窗口的内容。                                         |
| prompt()        | 显示可提示用户输入的对话框。                                 |
| resizeBy()      | 按照指定的像素调整窗口的大小。                               |
| resizeTo()      | 把窗口的大小调整到指定的宽度和高度。                         |
| scrollBy()      | 按照指定的像素值来滚动内容。                                 |
| scrollTo()      | 把内容滚动到指定的坐标。                                     |
| setInterval()   | 按照指定的周期（以毫秒计） 来调用函数或计算表达式。          |
| setTimeout()    | 在指定的毫秒数后调用函数或计算表达式。                       |
| clearInterval() | 取消由 setInterval() 设置的 timeout。                        |
| clearTimeout()  | 取消由 setTimeout() 方法设置的 timeout。close() 关闭浏览器窗口 |

### 1.6. Navigator 对象

Navigator 对象包含的属性描述了正在使用的浏览器。 可以使用这些属性进行平台专用的配置。 虽然这个对象的名称显而易见的是 Netscape 的 Navigator 浏览器， 但其他实现了 JavaScript 的浏览器也支持这个对象。

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| appCodeName     | 返回浏览器的代码名。 以 Netscape 代码为基础的浏览器中， 它的值是 "Mozilla"。Microsoft 也是 |
| appMinorVersion | 返回浏览器的次级版本。 （IE4、 Opera 支持）                  |
| appName         | 返回浏览器的名称。                                           |
| appVersion      | 返回浏览器的平台和版本信息。                                 |
| browserLanguage | 返回当前浏览器的语言。 （IE 和 Opera 支持）cookieEnabled 返回指明浏览器中是否启用 cookie 的布尔值。 |
| cpuClass        | 返回浏览器系统的 CPU 等级。 （IE 支持）                      |
| onLine          | 返回指明系统是否处于脱机模式的布尔值。                       |
| platform        | 返回运行浏览器的操作系统平台。                               |
| systemLanguage  | 返回当前操作系统的默认语言。 （IE 支持）                     |
| userAgent       | 返回由客户机发送服务器的 user-agent 头部的值。               |
| userLanguage    | 返回操作系统设定的自然语言。 （IE 和 Opera 支持）            |
| plugins         | 返回包含客户端安装的所有插件的数组                           |

| 方法           | 描述                                         |
| -------------- | -------------------------------------------- |
| javaEnabled()  | 规定浏览器是否支持并启用了 Java。            |
| taintEnabled() | 规定浏览器是否启用数据污点 (data tainting)。 |

### 1.7. Screen 对象

Screen 对象包含有关客户端显示屏幕的信息。 每个 Window 对象的 screen 属性都引用一个 Screen 对象。 Screen 对象中存放着有关显示浏览器屏幕的信息。 JavaScript 程序将利用这些信息来优化它们的输出， 以达到用户的显示要求。 例如，一个程序可以根据显示器的尺寸选择使用大图像还是使用小图像，它还可以根据显示器的颜色深度选择使用 16 位色还是使用 8 位色的图形。 另外，JavaScript 程序还能根有关屏幕尺寸的信息将新的浏览器窗口定位在屏幕中间。

| 属性                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| availHeight          | 返回显示屏幕的高度 (除 Windows 任务栏之外)。                 |
| availWidth           | 返回显示屏幕的宽度 (除 Windows 任务栏之外)。                 |
| bufferDepth          | 设置或返回调色板的比特深度。 （仅 IE 支持）colorDepth 返回目标设备或缓冲器上的调色板的比特深度。 |
| deviceXDPI           | 返回显示屏幕的每英寸水平点数。 （仅 IE 支持）                |
| deviceYDPI           | 返回显示屏幕的每英寸垂直点数。 （仅 IE 支持）                |
| fontSmoothingEnabled | 返回用户是否在显示控制面板中启用了字体平滑。 （仅 IE 支持）  |
| height               | 返回显示屏幕的高度。                                         |
| logicalXDPI          | 返回显示屏幕每英寸的水平方向的常规点数。 （仅 IE 支持）      |
| logicalYDPI          | 返回显示屏幕每英寸的垂直方向的常规点数。 （仅 IE 支持）      |
| pixelDepth           | 返回显示屏幕的颜色分辨率（比特每像素） 。                    |
| updateInterval       | 设置或返回屏幕的刷新率。 （仅 IE11 以下支持）                |
| width                | 返回显示器屏幕的宽度。                                       |

### 1.8. 检测浏览器版本版本有哪些方式？

- 根据 navigator.userAgent // `UA.toLowerCase().indexOf('chrome')`
- 根据 window 对象的成员 // `'ActiveXObject' in window`

### 1.9. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

- offsetWidth/offsetHeight 返回值包含 content + padding + border，效果与 e.getBoundingClientRect()相同
- clientWidth/clientHeight 返回值只包含 content + padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸


### 1.10. 什么是BOM？

1. BOM 是 Broswer Object Model 的缩写，中文为**浏览器对象模型**。
2. BOM 提供了独立于内容而与浏览器窗口进行交互的对象。
3. 由于 BOM 主要用于管理窗口与窗口之间的通讯，因此其核心对象是**` window`**。
4. BOM 缺乏标准，所以你会发现 MDN 上面搜寻不了，JavaScript语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C。


### 1.11. BOM 通用的API
- window对象——BOM核心
```js
window.alert('提示信息')
window.confirm('确认信息')
window.prompt('弹出输入框')
window.open('url地址', '_blank或_self', '新窗口大小')；     // _blank：新开一个空白的窗口打开链接，_self在当前框架中打开链接
window.close()   // 关闭当前页
setTimeout(函数， 时间)    // 定时器，只执行一次
clearTimeout(定时器名称)  // 清除计时器
setInterval(函数，时间)     // 定时器，无限执行
clearInterval()      // 停止执行 setInterval()
```
- location对象
```js
localtion.href = 'url地址';           // 跳转到这个url地址
localtion.hostname         // 返回 web 主机名
localtion.pathname            // 返回当前页面的路径和文件名
localtion.port             // 返回 web 主机的端口
localtion.protocol      // 返回页面使用的web协议，http||https
```
- navigator对象 —— 获取浏览器的所有信息
```js
navigator.appCodeName   // 返回浏览器的代码名
navigator.appMinorVersion      // 返回浏览器的次级版本
navigator.appName    // 返回浏览器的名称
navigator.appVersion   // 返回浏览器的平台和版本信息
navigator.browserLanguage      // 返回当前浏览器的语言
navigator.userAgent       // 返回由客户机发送服务器的 user-agent 头部的值。
```
- screen对象
```js
screen.height     // 获取整个屏幕的高
screen.width        // 获取整个屏幕的宽
screen.availiHeight         // 整个屏幕的高减去系统部件的高（可用的屏幕高度）
screen.availWidth         // 整个屏幕的宽减去系统部件的宽（可用的屏幕宽度）
```
- history对象 包含浏览器的历史
```js
history.back();         // 返回上一页
history.forward()      // 前进下一页
history.go('参数');     // -1 表示上一页，1表示下一页
```
参考资料：[BOM](https://www.cnblogs.com/pingzi-wq/p/11525058.html)
### 1.12. 如何检测浏览器的类型？
```js
var ua = navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
var isChrome = ua.includes('Chrome') // true
```
从 `userAgent` 的输出可以看出，前端可以判断系统类型，`Mac/Windows`，这是很多软件下载网站需要做的事情。

### 1.13. 拆解URL的各部分
```js
const { href, hash, search, host, port, protocol } = location
```