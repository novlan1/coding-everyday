- [1. cache-control 属性有哪些？](#1-cache-control-属性有哪些)
  - [1.1. `immutable`](#11-immutable)
- [2. 协商缓存触发条件](#2-协商缓存触发条件)
- [3. 强缓存和协商缓存](#3-强缓存和协商缓存)
- [4. 为什么要有etag？](#4-为什么要有etag)
- [输入URL、`F5`、 `Ctrl + F5` 的区别](#输入urlf5-ctrl--f5-的区别)

### 1. cache-control 属性有哪些？

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



#### 1.1. `immutable`

`immutable` 为了让用户在刷新页面的时候不要去请求服务器。

`Cache-Control: max-age=3600, immutable`，表明该资源能存活一小时，在一小时之内，即便用户刷新也不要发送条件请求，不走协商缓存的流程。

在过期之后，浏览器会发送一个不带`If-Modified-Since`和`If-None-Match`的请求来更新资源。

这里需要注意，一旦被标志成 immutable，则这个资源不可能返回 304 响应了，只有 200（Chrome 开发者工具的network里面size会显示为`from memory cache/from disk cache`）。



参考资料：[扼杀 304，Cache-Control: immutable](https://www.cnblogs.com/ziyunfei/p/5642796.html) 


### 2. 协商缓存触发条件

1. `Cache-Control`的值为`no-cache` （不强缓存）
2. 或者`max-age`过期了 （强缓存，但总有过期的时候）


参考资料：[强缓存和协商缓存](https://www.cnblogs.com/everlose/p/12779864.html)，[浅谈http中的Cache-Control](https://blog.csdn.net/u012375924/article/details/82806617)

### 3. 强缓存和协商缓存
强缓存：
- `cache-control`的单位是秒
- `Expire`绝对时间，`cache-control`是相对时间，以后者为准

协商缓存：
- `Last-Modified`是服务器下发的，`If-Modified-Since`是浏览器发送到的，记录的时间，有可能时间变了，内容不变
- `Etag`是变的是内容才会再次请求，对应的是`If-None-Match`

<img src='../../imgs/b_s_cache.png' height='500'/>

1. 图上说的「`Etag`? -> 否」是指没有 `ETag`，而不是 `ETag` 不同。
2. 图上的错误则是，`RFC` 规定，如果 `ETag` 和 `Last-Modified` 都有，则必须一次性都发给服务器，没有优先级。
3. 最后，如果服务器输出了 `ETag`，没有必要再输出 `Last-Modified`。

参考资料：
1. [有了Etag，last-Modified还有必要存在吗](https://www.zhihu.com/question/22883627)

### 4. 为什么要有etag？

你可能会觉得使用`last-modified`已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要`etag`呢？HTTP1.1中etag的出现（也就是说，etag是新增的，为了解决之前只有`If-Modified`的缺点）主要是为了解决几个l`ast-modified`比较难解决的问题：

1. 一些文件也许会**周期性的更改**，但是他的**内容并不改变(仅仅改变的修改时间)**，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
2. 某些文件**修改非常频繁**，比如在**秒以下的时间内进行修改，(比方说1s内修改了N次)**，`if-modified-since`能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3. 某些**服务器不能精确的得到文件的最后修改时间**。


### 输入URL、`F5`、 `Ctrl + F5` 的区别
1. 实际上浏览器输入 `url` 之后敲下回车就是先看本地 `cache-control`、`expires` 的情况；
2. 刷新(`F5`)就是忽略先看本地 `cache-control`、`expires` 的情况，带上条件 `If-None-Match`、`If-Modified-Since`；
3. 强制刷新(`Ctrl + F5`)就是不带条件的访问。




