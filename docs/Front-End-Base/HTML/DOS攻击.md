- [1. DOS攻击](#1-dos攻击)
  - [1.1. DDOS](#11-ddos)
- [2. script标签的integrity属性](#2-script标签的integrity属性)
  - [2.1. 如何开启 SRI 功能](#21-如何开启-sri-功能)
- [3. `crossorigin`属性](#3-crossorigin属性)

### 1. DOS攻击

拒绝服务（英文名称`denial of service, DoS`）是指通过向服务器发送大量垃圾信息或干扰信息的方式，导致服务器无法向正常用户提供服务的现象。
拒绝服务攻击的类型按其攻击形式分为：
- 导致异常型：利用软硬件实现上的编程缺陷，导致其出现异常，从而使其拒绝服务。如`ping of death`攻击等；
- 资源耗尽型：通过大量消耗资源使得攻击目标由于资源耗尽不能提供正常服务，是资源类型的不同分为带宽耗尽和系统资源耗尽两类：
  - 带宽耗尽攻击的本质是攻击者通过方法等技巧消耗掉目标网络的所有带宽，如`smurf攻击`等；
  - 系统资源耗尽型攻击指对系统内存、cpu或程序中的其他资源进行消耗，使其无法满足正常提供服务的需求。如`syn flood` 攻击等；
- 欺骗型：`arp`拒绝服务攻击。



#### 1.1. DDOS

全称`Distributed Denial of Service`，中文意思为“分布式拒绝服务”，就是利用大量合法的**分布式服务器**对目标发送请求，从而导致正常合法用户无法获得服务。


### 2. script标签的integrity属性

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



#### 2.1. 如何开启 SRI 功能

SRI 开启需要有两个条件：首先需要资源为同域或者开启 `CORS` 设置，然后需要在`<script>`中提供**签名**以供校验。由于 SRI 在不匹配的时候就不执行脚本。

```html
<script 
    crossorigin="anonymous" 
    integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" 
    src="http://lib.baomitu.com/jquery/3.2.1/jquery.min.js">
<script>
```

### 3. `crossorigin`属性

在HTML5中，一些 HTML 元素提供了对 CORS 的支持， 例如 `<audio>、<img>、<link>、<script> 和 <video>` 均有一个跨域属性 (`crossOrigin property`)，它允许你配置元素获取数据的 CORS 请求。 

> The crossorigin content attribute on media elements is a CORS settings attribute.

这些属性是枚举的，并具有以下可能的值：

|关键字|描述|
|---|---|
|`anonymous`|	对此元素的 CORS 请求将不设置凭据标志。|
|`use-credentials`|	对此元素的CORS请求将设置凭证标志；这意味着请求将提供凭据。|
|""|	设置一个空的值，如 `crossorigin` 或 `crossorigin=""`，和设置 `anonymous` 的效果一样。|

**默认情况下（即未指定 `crossOrigin` 属性时），CORS 根本不会使用**。如 Terminology section of the CORS specification 中的描述，在非同源情况下，设置 `"anonymous"` 关键字将不会通过 `cookies`，客户端 SSL 证书或 HTTP 认证交换用户凭据。

即使是无效的关键字和空字符串也会被当作 `anonymous` 关键字使用。


转换成我们的理解就是：

在html的标签中，有些标签时自带跨域功能的，比如上边提到的`audio  img link  script  video` 标签，他们的`src`属性可以是任意源的链接，并且均可以进行加载。

但是**如果在标签中添加了`anonymous`属性，那么浏览器再去解析这些跨域资源的时候，就不会以它的自带跨域功能去加载了，而是使用CORS的方式加载**，就像我们的`ajax`一样，**需要服务器设置跨域头，才可以完成加载，否则会报跨域问题，导致加载失败**。

同样的，如果说加载的资源接入了CDN，那么需要源站和CDN节点都需要有此配置，如果没有，该CDN节点的这个资源就是不可用的状态，因为会报跨域问题。

