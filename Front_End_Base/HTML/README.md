
#### a. 从输入url到得到html的过程中，浏览器做的工作大致分为以下几步：

- 加载：根据请求的URL进行域名解析，向服务器发起请求，接收文件（HTML、JS、CSS、图象等）。
- 解析：对加载到的资源（HTML、JS、CSS等）进行语法解析，建议相应的内部数据结构（比如HTML的DOM树，JS的（对象）属性表，CSS的样式规则等等）
- 渲染：构建渲染树，对各个元素进行位置计算、样式计算等等，然后根据渲染树对页面进行渲染（可以理解为“画”元素）

这几个过程不是完全孤立的，会有交叉，比如HTML加载后就会进行解析，然后拉取HTML中指定的CSS、JS等。



#### b. 浏览器**渲染**页面的过程：

![渲染过程](../../imgs/dom_render_process.png)

- 第一步，用 HTML 分析器，分析 HTML 元素，构建一颗 DOM 树(标记化和树构建)。
- 第二步，用 CSS 分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。
- 第三步，将 DOM 树和样式表，关联起来，构建一颗`Render`树(这一过程又称为`Attachment`)。每个 DOM 节点都有`attach`方法，接受样式信息，返回一个`render`对象(又名`renderer`)。这些`render`对象最终会被构建成一颗`Render`树。
- 第四步，有了`Render`树，浏览器开始布局，为每个`Render`树上的节点确定一个在显示屏上出现的精确坐标。
- 第五步，`Render`树和节点显示坐标都有了，就调用每个节点`paint`方法，把它们绘制出来。 


##### DOM树的构建是文档加载完成开始的？
构建DOM数是一个渐进过程，为达到更好用户体验，渲染引擎会尽快将内容显示在屏幕上。它不必等到整个HTML文档解析完毕之后才开始构建render数和布局。

##### Render树是DOM树和CSSOM树构建完毕才开始构建的吗？
这三个过程在实际进行的时候又不是完全独立，而是会有交叉。会造成一边加载，一遍解析，一遍渲染的工作现象。

##### CSS的解析是从右往左逆向解析的
从DOM树的`下－上`解析比`上－下`解析效率高)，嵌套标签越多，解析越慢。



### 2. `window.onload`和`DomContentLoaded`的区别
```javascript
window.addEventListener('load', function() {
  // 页面的全部资源加载完之后才会执行，包括图片、视频等。
})
window.addEventListener('DomContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频等可能没加载完。
})
```



### 3. cache-control 属性有哪些？

1. `cache-control: max-age=xxxx，public`

**客户端和代理服务器**都可以缓存该资源；
客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，statu code:200 ，如果用户做了刷新操作，就向服务器发起http请求


2. `cache-control: max-age=xxxx，private`

只让**客户端**可以缓存该资源；代理服务器不缓存
客户端在xxx秒内直接读取缓存，statu code:200

3. `cache-control: max-age=xxxx，immutable`

客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，statu code:200 ，即使用户做了刷新操作，也不向服务器发起http请求

4. `cache-control: no-cache`

**跳过设置强缓存**，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了no-cache就不会走强缓存了，每次请求都回询问服务端。


5. `cache-control: no-store`

不缓存，这个会让**客户端、服务器都不缓存**，也就没有所谓的强缓存、协商缓存了。



#### a. `immutable`

`immutable` 为了让用户在刷新页面的时候不要去请求服务器。

`Cache-Control: max-age=3600, immutable`，表明该资源能存活一小时，在一小时之内，即便用户刷新也不要发送条件请求，不走协商缓存的流程。

在过期之后，浏览器会发送一个不带`If-Modified-Since`和`If-None-Match`的请求来更新资源。

这里需要注意，一旦被标志成 immutable，则这个资源不可能返回 304 响应了，只有 200（Chrome 开发者工具的network里面size会显示为`from memory cache/from disk cache`）。



参考资料：[扼杀 304，Cache-Control: immutable](https://www.cnblogs.com/ziyunfei/p/5642796.html) 



### 4. 协商缓存触发条件

1. `Cache-Control`的值为`no-cache` （不强缓存）
2. 或者`max-age`过期了 （强缓存，但总有过期的时候）


参考资料：[强缓存和协商缓存](https://www.cnblogs.com/everlose/p/12779864.html)，[浅谈http中的Cache-Control](https://blog.csdn.net/u012375924/article/details/82806617)

### 5. 强缓存和协商缓存
强缓存：
- `cache-control`的单位是秒
- `Expire`绝对时间，`cache-control`是相对时间，以后者为准

协商缓存：
- `Last-Modified`是服务器下发的，`If-Modified-Since`是浏览器发送到的，记录的时间，有可能时间变了，内容不变
- `Etag`是变的是内容才会再次请求，对应的是`If-None-Match`

<img src='../../imgs/b_s_cache.png' height='500'/>

### 6. 为什么要有etag？

你可能会觉得使用`last-modified`已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要`etag`呢？HTTP1.1中etag的出现（也就是说，etag是新增的，为了解决之前只有If-Modified的缺点）主要是为了解决几个last-modified比较难解决的问题：

1. 一些文件也许会**周期性的更改**，但是他的**内容并不改变(仅仅改变的修改时间)**，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
2. 某些文件**修改非常频繁**，比如在**秒以下的时间内进行修改，(比方说1s内修改了N次)**，if-modified-since能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3. 某些**服务器不能精确的得到文件的最后修改时间**。

 

### 7. 常见的浏览器内核比较
```
Trident：这种浏览器内核是 IE 浏览器用的内核，因为在早期 IE 占有大量的市场份额，所以这种内核比较流行，以前有很多
网页也是根据这个内核的标准来编写的，但是实际上这个内核对真正的网页标准支持不是很好。但是由于 IE 的高市场占有率，微
软也很长时间没有更新 Trident 内核，就导致了 Trident 内核和 W3C 标准脱节。还有就是 Trident 内核的大量 Bug 等
安全问题没有得到解决，加上一些专家学者公开自己认为 IE 浏览器不安全的观点，使很多用户开始转向其他浏览器。

Gecko：这是 Firefox 和 Flock 所采用的内核，这个内核的优点就是功能强大、丰富，可以支持很多复杂网页效果和浏览器扩
展接口，但是代价是也显而易见就是要消耗很多的资源，比如内存。

Presto：Opera 曾经采用的就是 Presto 内核，Presto 内核被称为公认的浏览网页速度最快的内核，这得益于它在开发时的
天生优势，在处理 JS 脚本等脚本语言时，会比其他的内核快3倍左右，缺点就是为了达到很快的速度而丢掉了一部分网页兼容性。

Webkit：Webkit 是 Safari 采用的内核，它的优点就是网页浏览速度较快，虽然不及 Presto 但是也胜于 Gecko 和 Trid
ent，缺点是对于网页代码的容错性不高，也就是说对网页代码的兼容性较低，会使一些编写不标准的网页无法正确显示。WebKit 
前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。

Blink：谷歌在 Chromium Blog 上发表博客，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 B
link 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。其实 Blink 引擎就是 Webkit 的一个分支，就像 webkit 是
KHTML 的分支一样。Blink 引擎现在是谷歌公司与 Opera Software 共同研发，上面提到过的，Opera 弃用了自己的 Presto 
内核，加入 Google 阵营，跟随谷歌一起研发 Blink。
```

### 8. 常见浏览器所用内核

```
 （1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；

 （2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；

 （3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；

 （4） Safari 浏览器内核：Webkit 内核；

 （5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；

 （6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；

 （7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；

 （8） 百度浏览器、世界之窗内核：IE 内核；

 （9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；

 （10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说
      是基于火狐内核。
```

### 11. `defer` 和 `async` 的区别
![difference between defer and async](../../imgs/deferAndAsyncDiff.png)

1. defer和async在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于**脚本下载完之后何时执行**，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
3. 关于defer，此图未尽之处在于它是**按照加载顺序执行脚本**的，这一点要善加利用
4. async 则是一个**乱序执行**的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
5. 仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：`Google Analytics`



### 12. 懒加载与预加载的基本概念

- 懒加载也叫延迟加载： 延迟加载图片或符合某些条件时才加载某些图片。
- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。


两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。**懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力**。

懒加载的意义：
- 懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

懒加载的实现方式： 
1. 第一种是**纯粹的延迟加载**，使用`setTimeOut或setInterval`进行加载延迟.
2. 第二种是**条件加载**，符合某些条件，或触发了某些事件才开始异步下载。
3. 第三种是**可视区加载**，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。

预加载的意义：
- 预加载可以说是牺牲服务器前端性能，换取更好的用户体验，这样可以使用户的操作得到最快的反映。

预加载的实现方式：
- 实现预载的方法非常多，可以用`CSS(background)、JS(Image)、HTML(<img />)`都可以。
- 常用的是`new Image()`，设置其`src`来实现预载，再使用`onload`方法回调预载完成事件。只要浏览器把图片下载到本地，同样的src就会使用缓存，这是最基本也是最实用的预载方法。当Image下载完图片头后，会得到宽和高，因此可以在预载前得到图片的大小(方法是用记时器轮循宽高变化)。



### 13. 浏览器内核的理解

主要分成两部分：**渲染引擎(layout engineer 或 Rendering Engine) **和 **JS 引擎**。

- 渲染引擎：**负责取得网页的内容（HTML、 XML 、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机**。
浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
- JS引擎则**解析和执行 javascript 来实现网页的动态效果**。

最开始渲染引擎和JS引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。 



### 14. HTML 规范中为什么要求引用资源不加协议头`http`或者`https`？

如果用户当前访问的页面是通过 `HTTPS` 协议来浏览的，那么网页中的资源也只能通过 `HTTPS` 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。

为了解决这个问题，我们可以省略 `URL` 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为`protocol-relative URL`，暂且可译作`协议相对 URL`。

如果使用协议相对 URL，无论是使用` HTTPS`，还是 `HTTP` 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。




### 15. `script`标签的`crossorigin`属性

引入跨域的脚本（比如用了 `apis.google.com` 上的库文件），如果这个脚本有错误，因为浏览器的限制（根本原因是协议的规定），是拿不到错误信息的。当本地尝试使用 `window.onerror` 去记录脚本的错误时，跨域脚本的错误只会返回 `Script error`。

但 HTML5 新的规定，是可以**允许本地获取到跨域脚本的错误信息**，但有两个条件：
1. 一是跨域脚本的服务器必须通过 `Access-Controll-Allow-Origin` 头信息允许当前域名可以获取错误信息
2. 二是当前域名的 `script` 标签也必须指明 `src` 属性指定的地址是支持跨域的地址，也就是 `crossorigin` 属性。


`crossorigin`属性：
- `anonymous`，对此元素的 CORS 请求将**不设置凭据标志**。
- `use-credentials`，对此元素的CORS请求将设置凭证标志；这意味着**请求将提供凭据**。
- `""`，设置一个空的值，如 `crossorigin` 或 `crossorigin=""`，和设置 `anonymous` 的效果一样。



### 16. DOS攻击

拒绝服务（英文名称`denial of service;DoS`）是指通过向服务器发送大量垃圾信息或干扰信息的方式，导致服务器无法向正常用户提供服务的现象。
拒绝服务攻击的类型按其攻击形式分为：
- 导致异常型：利用软硬件实现上的编程缺陷，导致其出现异常，从而使其拒绝服务。如`ping of death`攻击等；
- 资源耗尽型：通过大量消耗资源使得攻击目标由于资源耗尽不能提供正常服务，是资源类型的不同分为带宽耗尽和系统资源耗尽两类：
  - 带宽耗尽攻击的本质是攻击者通过方法等技巧消耗掉目标网络的所有带宽，如`smurf攻击`等；
  - 系统资源耗尽型攻击指对系统内存、cpu或程序中的其他资源进行消耗，使其无法满足正常提供服务的需求。如`syn flood` 攻击等；
- 欺骗型：`arp`拒绝服务攻击。



#### a. DDOS

全称`Distributed Denial of Service`，中文意思为“分布式拒绝服务”，就是利用大量合法的**分布式服务器**对目标发送请求，从而导致正常合法用户无法获得服务。



### 17. script标签的integrity属性

CDN均表示以支持SRI为荣，不支持SRI功能为耻

SRI 全称是 `Subresource Integrity`，是用来解决由于 CDN 资源被污染而导致的 XSS 漏洞的方案。当浏览器检测加载脚本签名与给定的签名不一致时，会拒绝执行该脚本。

为什么CDN主推SRI功能，因为XSS，可以牵扯出`DDoS`攻击(分布式拒绝服务攻击)，XSS比劫持肉鸡简单多了！

现代网站的大部分交互都来自于JavaScript，一般我们为了优化JS的加载速度，一般会分好几个域名加载js，而众多公用库一般放在第三方CDN上。JavaScript可以发出HTTP(S)请求，实现网页内容异步加载，但它也能将浏览器变成攻击者的武器。例如，下面的代码可以向受攻击网站发出洪水般的请求：
```javascript
function imgflood() {  
  var TARGET = 'victim-website.com'
  var URI = '/index.php?'
  var pic = new Image()
  var rand = Math.floor(Math.random() * 1000)
  pic.src = 'http://'+TARGET+URI+rand+'=val'
}
setInterval(imgflood, 10)
```
上述脚本每秒钟会在页面上创建10个`image`标签。该标签指向`“victim-website.com”`，并带有一个随机查询参数。如果用户访问了包含这段代码的恶意网站，那么他就会在不知情的情况下参与了对`“victim-website.com”`的DDoS攻击。

这种攻击之所以有效是因为HTTP中缺少一种机制使网站能够禁止被篡改的脚本运行。为了解决这一问题，W3C已经提议增加一个新特性子资源一致性。该特性允许网站告诉浏览器，只有在其下载的脚本与网站希望运行的脚本一致时才能运行脚本。这是通过密码散列实现的。这就是守门神：`integrity=文件指纹`

密码散列可以唯一标识一个数据块，任何两个文件的密码散列均不相同。属性`integrity`提供了**网站希望运行的脚本文件的密码散列**。浏览器在下载脚本后会计算它的散列，然后将得出的值与`integrity`提供的值进行比较。如果不匹配，则说明**目标脚本被篡改**，浏览器将不使用它。



#### a. 如何开启 SRI 功能

SRI 开启需要有两个条件：首先需要资源为同域或者开启 `CORS` 设置，然后需要在`<script>`中提供**签名**以供校验。由于 SRI 在不匹配的时候就不执行脚本。

```html
<script 
    crossorigin="anonymous" 
    integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" 
    src="http://lib.baomitu.com/jquery/3.2.1/jquery.min.js">
<script>
```

### 21. Viewport

1. `iphone5`的分辨率是 `640dp * 1136 dp`（物理像素）
    `dp,pt`： `device independent pixels` 设备无关的像素
2. 开发中应该是`320px * 568px` （逻辑像素）
    `px: css pixel` （逻辑像素），浏览器使用的抽象单位
3. `dpr:devicePixelRatio` 设备像素缩放比
    计算公式：`1px`等于`dpr的平方`乘`物理像素`


- `DPI`：打印机每英寸可以喷的墨汁点（印刷行业）
- `PPI`：屏幕每英寸的像素数量，即单位英寸内的像素密度



`viewport` 的构成：

1. `visual viewport`：视口视图（**设定缩放scale**）
2. `layout viewport`：布局视图（**承载底层布局**）



手机浏览器对页面默认行为：

1. 渲染在`viewport`（保证基本布局正确）
2. 对页面进行缩放（保证页面显示完整）



注意：

- 苹果浏览器默认`layout viewport`是`980px`，所以一张`320px`或者`640px`的图片都是铺不满的。
- `meta`标签设置的是`layout viewport`



`layout viewport`和`visual viewport`对应的获取宽度API

- 布局 viewport 宽度（meta 设置）：`document.body.clientWidth`
- 度量 viewport 宽度（css 设置）：`window.innerWidth`
- 缩放比：`window.innerWidth / document.body.clientWidth`



设置`width=device-width`后, 如果页面中宽度小于`device-width`，比如`320px`，显示是没问题的， `document.body.clientWidth = window.innerWidth = 320`。

但是，如果页面总宽度大于`device-width`，那么会自动缩小，比如`document.body.clientWidth = 320，window.innerWidth = 390`，默认缩放比就是`390/320`，这时就需要设置`initial-scale=1.0`，不让它自动缩放，这样`document.body.clientWidth` 和 `window.innerWidth` 都是`320`了


总结：`width=device-width`，让`布局viewport`时刻等于设备宽度；`initial-scale=1`，让`布局viewport`时刻等于`度量viewport`。



移动web最佳`viewpoint`设置：

- `布局viewport` = 设备宽度 = `度量viewpoint`



最常用代码：

```
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

### 22. HTML `<meta>` 标签
元数据（Metadata）是数据的数据信息。
`<meta>` 标签提供了 HTML 文档的元数据。元数据不会显示在客户端，但是会被浏览器解析。
META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。
元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。



HTML 与 XHTML 之间的差异

- 在 HTML 中 `<meta>` 标签没有结束标签。
- 在 XHTML 中 `<meta>` 标签必须包含结束标签。



#### a. `name`属性

`name`属性主要用于**描述网页**，与之对应的属性值为`content`，`content`中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。 

meta标签的name属性语法格式是：
```
<meta name="参数" content="具体的参数值">
```



其中name属性主要有以下几种参数：　

- `Keywords`(关键字)　
  - `keywords`用来告诉搜索引擎你网页的关键字是什么。
- `description`(网站内容描述)
  - `description`用来告诉搜索引擎你的网站主要内容。
- `robots`(机器人向导)
  - `robots`用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。
  - `content`的参数有`all, none, index, noindex, follow, nofollow`。默认是all。
- `author`(作者)



#### b. `http-equiv`属性

`http-equiv`顾名思义，**相当于http的文件头**作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为`content`，`content`中的内容其实就是各个参数的变量值。

meta标签的`http-equiv`属性语法格式是：

```
<meta http-equiv="参数"content="参数变量值">；
```



其中`http-equiv`属性主要有以下几种参数：

- `Expires`(期限)
  - 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。


- `Pragma`(`cache`模式)
  - 禁止浏览器从本地计算机的缓存中访问页面内容。


- `Refresh`(刷新)
  - 自动刷新并指向新页面。

- `Set-Cookie`(`cookie`设定)
  - 如果网页过期，那么存盘的`cookie`将被删除。


- `Window-target`(显示窗口的设定)
  - 强制页面在当前窗口以独立页面显示。

- `content-Type`(显示字符集的设定)
  - 设定页面使用的字符集。

- `content-Language`（显示语言的设定）




#### c. `HTML 4.01` 与 `HTML5`之间的差异
使用 `http-equiv` 已经不是规定 HTML 文档的字符集的唯一方式：

`HTML 4.01`：
```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```
`HTML5`： 
```
<meta charset="UTF-8">
```


#### d. Content-Type 类型

`application/x-www-form-urlencoded`, `multipart/form-data`, `application/json`, `application/xml` 这四个是ajax的请求，表单提交或上传文件的常用的资源类型。
form表单中可以定义`enctype`属性，该属性的含义是在发送到服务器之前应该如何对表单数据进行编码。默认的情况下，表单数据会编码为 `"application/x-www-form-unlencoded"`
enctype常用的属性值如下：

- `application/x-www-form-unlencoded`： 在发送前编码所有字符(默认情况下)；
- `multipart/form-data`, 不对字符编码。在使用文件上传时候，使用该值。

##### `application/x-www-form-urlencoded` 主要用于如下:
1. 最常见的POST提交数据方式。
2. 原生form默认的提交方式(可以使用`enctype`指定提交数据类型)。
3. jquery，zepto等默认post请求提交的方式。

如上默认提交的 `contentType`为 `application/x-www-form-urlencoded`，此时提交的数据将会格式化成：`username=111&age=2;`
- 如果请求类型type是GET的话，那么格式化的字符串将直接拼接在`url`后发送到服务端； 
- 如果请求类型是POST, 那么格式化的字符串将放在`http body`的`Form Data`中发送。

<img src='../../imgs/content_type_urlencoded.png' height='250' />


##### `multipart/form-data`
使用表单上传文件时，必须指定表单的 `enctype`属性值为 `multipart/form-data`. 请求体被分割成多部分，每部分使用 `--boundary`分割；

<img src='../../imgs/content_type_multipart.png' height='250' />



##### `application/json`
在http请求中，`Content-Type`都是默认的值 `application/x-www-form-urlencoded`, 这种编码格式的特点是：`name/value`值对，每组之间使用`&`连接，而`name`与`value`之间是使用 `=` 连接，比如 `key=xxx&name=111&password=123456; `键值对一般的情况下是没有什么问题的，但是在一些复杂的情况下，比如需要传一个复杂的json对象，也就是对象**嵌套**数组的情况下，建议使用`application/json`传递比较好，

<img src='../../imgs/content_type_json.png' height='250' />

如上我们可以看到json格式提交的数据会显示 `Request Payload;`

注意：请求头`Content-Type`的`Type`的T一定大写。

### 23. 响应式开发
响应式开发：弹性网格布局+弹性图片+媒体查询

- 优点：**减少工作量**、节省时间
- 缺点：会**加载更多的样式和脚本资源**、老版本浏览器兼容不好

### 24. `class`和`id`命名规范
`class`一般都是**小写加横杠**的方式命名，如`first-button`，`id`一般是用**驼峰**的方式命名，如`firstButton`


### 25. 回流和重绘
回流(`reflow`)
- 当`render tree`中的一部分(或全部)因为元素的**规模尺寸，布局，隐藏**等改变而需要重新构建。这就称为回流(`reflow`)
- 当页面布局和几何属性改变时就需要回流


重绘(`repaint`)：
- 当`render tree`中的一些元素需要更新属性，而这些属性只是影响元素的**外观、风格**，而不会影响布局的，比如`background-color`。则就叫称为重绘。
- 回流必将引起重绘，而重绘不一定会引起回流



改革像重绘，革命像回流。



#### a. 针对回流和重绘的优化点：

1. 用`translate`替代`top`改变
2. 用`opacity`替代`visibility`
3. 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 `className`
4. 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 `reflow`)，然后你修改100次，然后再把它显示出来
5. 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
6. 不要使用`table`布局，可能很小的一个小改动会造成整个`table`的重新布局（虚拟列表就是用的div）
7. 动画实现的速度的选择
8. 对于动画新建图层
9. 启用 GPU 硬件加速



### 26. HTML5的Audio

Audio的使用：
- `audio = new Audio()`，先设置`src`，后`play`或`pause`，自动支持断点续播

Audio的属性：

- `currentTime`：当前播放时间
- `duration`：时长

Audio的事件：
- `timeupdate`，当播放位置更改时触发，播放的时候监听此事件。
- `loadedmetadata`，加载完音频的元数据时，元数据包括：时长、尺寸（仅视频）以及文本轨道



#### a. 当音频/视频处于加载过程中时，会依次发生以下事件

- loadstart
- durationchange
- loadedmetadata
- loadeddata
- progress
- canplay
- canplaythrough

`loadeddata`在`loadedmetadata`之后，先知道元数据，后知道真正的数据



#### b. 元数据和数据的区别？

- 元数据是用来**描述数据的数据**，比如“年龄"、"身高"、"相貌"、"性格”，数码照片的`EXIF`信息，何文件系统中的数据分为数据和元数据。
- 数据是指普通文件中的实际数据，而元数据指用来描述一个文件的特征的系统数据，诸如访问权限、文件拥有者以及文件数据块的分布信息(`inode`...)等。



#### c. 动态的创建`<audio>`元素

```javascript
//方式1
var audio = document.createElement("audio");
audio.src = "hangge.mp3";
audio.play();
 
//方式2
var audio = new Audio("hangge.mp3");
audio.play();
```


#### d. 判断浏览器支持的编码方式

通过`canPlayType()`方法可以判断浏览器支持的编码方式，从而设置对应的音频文件。

```javascript
if (audio.canPlayType("audio/mp3")) {
    audio.src = "hangge.mp3";
}else if(audio.canPlayType("audio/ogg")) {
    audio.src = "hangge.ogg";
}
```

### 27. Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
<!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，这并不是一个 HTML 标签

- 严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码。
- 混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

如何区分：浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

1、如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。（严格 DTD ——严格模式）
2、包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式）
3、DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。（DTD不存在或者格式不正确——混杂模式）
4、HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。（ HTML5 没有严格和混杂之分）

意义：严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。


### 28. 严格模式与混杂模式的语句解析不同点有哪些？
1）盒模型的高宽包含内边距padding和边框border
  在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在IE5.5及以下的浏览器及其他版本的Quirks模式下，IE的宽度和高度还包含了padding和border。
2）可以设置行内元素的高宽
   在Standards模式下，给span等行内元素设置wdith和height都不会生效，而在quirks模式下，则会生效。
3）可设置百分比的高度
   在standards模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置高度，子元素设置一个百分比的高度是无效的。
4）用margin:0 auto设置水平居中在IE下会失效
   使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效,quirk模式下的解决办法，用text-align属性:
   body{text-align:center};#content{text-align:left}
5）quirk模式下设置图片的padding会失效
6）quirk模式下Table中的字体属性不能继承上层的设置
7）quirk模式下white-space:pre会失效



### 29. Doctype作用?严格模式与混杂模式如何区分？它们有何意义? 
- Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式，严格模式和混杂模式。
- 严格模式的排版和JS 运作模式是 以该浏览器支持的最高标准运行。
- 混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

### 30. 两个标签页的sessionstorage共享吗

- 这取决于标签页如何打开。
- 通过点击链接（或者用了 window.open）打开的新标签页之间是属于同一个 session 的，但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session。
- 刷新当前页面，或者通过location.href、window.open、或者通过带`target="_blank"`的a标签打开新标签，之前的sessionStorage还在，但是如果你是主动打开一个新窗口或者新标签，对不起，打开F12你会发现，sessionStorage空空如也。
- 也就是说，sessionStorage的session仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。


### `iframe`的优缺点
##### `iframe` 的优点：
- iframe能够原封不动地把嵌入的网页展现出来。
- 如果有多个网页调用iframe，只需要修改iframe的内容，就可以实现对调用iframe的每一个页面内容的更改，方便快捷。
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用性。
- 如果遇到加载缓慢的第三方内容，如图标和广告等，可以用iframe来解决。

##### iframe 的缺点：
- 会产生很多页面，不容易管理。
- 在几个框架中都出现上下、左右滚动条时，这些滚动条除了会挤占已经非常有限的页面空间外，还会分散访问者的注意力。
- 使用框架结构时，必须保证正确设置所有的导航链接，否则会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架内，这种情况下会导致链接死循环。
- 很多的移动设备（PDA手机）无法完全显示框架，设备兼容性差。
- iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。


