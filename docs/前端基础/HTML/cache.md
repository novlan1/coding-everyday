- [1. cache-control 属性有哪些？](#1-cache-control-属性有哪些)
  - [1.1. `immutable`](#11-immutable)
- [2. 协商缓存触发条件](#2-协商缓存触发条件)
- [3. 强缓存和协商缓存](#3-强缓存和协商缓存)
- [4. 为什么要有etag？](#4-为什么要有etag)
- [5. 输入URL、`F5`、 `Ctrl + F5` 的区别](#5-输入urlf5-ctrl--f5-的区别)
- [6. 缓存种类](#6-缓存种类)
- [7. 实际场景应用缓存策略](#7-实际场景应用缓存策略)
  - [7.1. 频繁变动的资源](#71-频繁变动的资源)
  - [7.2. 不常变化的资源](#72-不常变化的资源)

### 1. cache-control 属性有哪些？

1. `cache-control: max-age=xxxx，public`

**客户端和代理服务器**都可以缓存该资源；
客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，`statu code:200` ，如果用户做了刷新操作，就向服务器发起http请求


2. `cache-control: max-age=xxxx，private`

只让**客户端**可以缓存该资源；**代理服务器不缓存**
客户端在xxx秒内直接读取缓存，`statu code:200`

3. `cache-control: max-age=xxxx，immutable`

客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，`statu code:200` ，即使用户做了刷新操作，也不向服务器发起http请求

4. `cache-control: no-cache`

**跳过设置强缓存**，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了`no-cache`就不会走强缓存了，每次请求都回询问服务端。


5. `cache-control: no-store`

不缓存，这个会让**客户端、服务器都不缓存**，也就**没有所谓的强缓存、协商缓存**了。



#### 1.1. `immutable`

`immutable` 为了让用户在刷新页面的时候不要去请求服务器。

`Cache-Control: max-age=3600, immutable`，表明该资源能存活一小时，在一小时之内，即便用户刷新也不要发送条件请求，不走协商缓存的流程。

在过期之后，浏览器会发送一个不带`If-Modified-Since`和`If-None-Match`的请求来更新资源。

这里需要注意，一旦被标志成 immutable，则这个资源不可能返回 304 响应了，只有 200（Chrome 开发者工具的network里面size会显示为`from memory cache/from disk cache`）。


### 2. 协商缓存触发条件

1. `Cache-Control`的值为`no-cache` （不强缓存）
2. 或者`max-age`过期了 （强缓存，但总有过期的时候）


### 3. 强缓存和协商缓存
强缓存：
- `cache-control`的单位是秒
- `Expire`绝对时间，`cache-control`是相对时间，以后者为准

协商缓存：
- `Last-Modified`是服务器下发的，`If-Modified-Since`是浏览器发送到的，记录的时间，有可能时间变了，内容不变
- `Etag`是变的是内容才会再次请求，对应的是`If-None-Match`

<img src='/imgs/b_s_cache.png' height='500'/>

1. 图上说的「`Etag`? -> 否」是指没有 `ETag`，而不是 `ETag` 不同。
2. 图上的错误则是，`RFC` 规定，如果 `ETag` 和 `Last-Modified` 都有，则必须一次性都发给服务器，没有优先级。
3. 最后，如果服务器输出了 `ETag`，没有必要再输出 `Last-Modified`。


### 4. 为什么要有etag？

你可能会觉得使用`last-modified`已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要`etag`呢？HTTP1.1中etag的出现（也就是说，etag是新增的，为了解决之前只有`If-Modified`的缺点）主要是为了解决几个l`ast-modified`比较难解决的问题：

1. 一些文件也许会**周期性的更改**，但是他的**内容并不改变(仅仅改变的修改时间)**，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
2. 某些文件**修改非常频繁**，比如在**秒以下的时间内进行修改，(比方说1s内修改了N次)**，`if-modified-since`能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3. 某些**服务器不能精确的得到文件的最后修改时间**。


### 5. 输入URL、`F5`、 `Ctrl + F5` 的区别
1. 实际上浏览器输入 `url` 之后敲下回车就是先看本地 `cache-control`、`expires` 的情况（**先看强缓存**）；
2. 刷新(`F5`)就是忽略先看本地 `cache-control`、`expires` 的情况，带上条件 `If-None-Match`、`If-Modified-Since`（**忽略强缓存，直接尝试协商缓存**）；
3. 强制刷新(`Ctrl + F5`)就是不带条件的访问（**忽略强缓存和协商缓存**）。`CTRL+F5`触发的HTTP请求的请求头中没有上面的那两个头，却有**`Pragma: no-cache`或`Cache-Control: no-cache`字段**，或者两者兼有。服务器看到`no-cache`这样的值就会把**最新的文件**响应过去，也就跳过了缓存。


### 6. 缓存种类

缓存有**内存缓存**和**硬盘缓存**两种

- 内存缓存(`from memory cache`)：内存缓存具有两个特点，分别是**快速读取和时效性**；
  - 快速读取：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。
  - 时效性：一旦该进程关闭，则该进程的内存则会清空。
- 硬盘缓存(`from disk cache`)：硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行`I/O`操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。

`Base64` 格式的图片，几乎永远可以被塞进 `memory cache`，这可以视作浏览器为节省渲染开销的“自保行为”；此外，体积不大的 JS、CSS 文件，也有较大地被写入内存的几率——相比之下，较大的 JS、CSS 文件就没有这个待遇了，内存资源是有限的，它们往往被直接甩进磁盘。

### 7. 实际场景应用缓存策略

#### 7.1. 频繁变动的资源

对于频繁变动的资源，首先**需要使用`Cache-Control: no-cache` 使浏览器每次都请求服务器**，然后**配合 `ETag` 或者 `Last-Modified` 来验证资源是否有效**。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

#### 7.2. 不常变化的资源

通常在处理这类资源时，给它们的 **`Cache-Control` 配置一个很大的 `max-age=31536000` (一年)**，这样浏览器之后请求相同的 `URL` 会命中强制缓存。而为了解决更新的问题，就需要**在文件名(或者路径)中添加 `hash，` 版本号等动态字符**，之后更改动态字符，从而达到更改引用 `URL` 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。

在线提供的类库 (如 `jquery-3.3.1.min.js`, `lodash.min.js` 等) 均采用这个模式。


参考资料：
1. [强缓存和协商缓存](https://www.cnblogs.com/everlose/p/12779864.html)
2. [浅谈http中的Cache-Control](https://blog.csdn.net/u012375924/article/details/82806617)
3. [有了Etag，last-Modified还有必要存在吗](https://www.zhihu.com/question/22883627)
4. [扼杀 304，Cache-Control: immutable](https://www.cnblogs.com/ziyunfei/p/5642796.html) 
