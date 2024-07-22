## 1. Resource Hints

### 1.1. 预解析

第一步：首先打开DNS预解析

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
```

第二步：手动添加解析

```html
<link rel="dns-prefetch" href="//www.img.com">
```

这样之后用户的某个动作，触发了 www.img.com 域名下的远程请求时，就避免了 DNS 解析的步骤。


使用场景：

- 静态资源域名（如CDN）
- 未来即将会发生跳转的域名
- 会重定向的域名


注意事项：

- 浏览器并不保证一定会去解析域名，可能会根据当前的网络、负载等状况做决定
- Chrome会使用了8个异步线程来处理DNS预解析，所以过多的 prefetch 并不一定能提高网页加载效率

### 1.2. 预连接

>preconnect 会触发DNS预解析

建立连接需要 TCP 协议握手，有些还会有 TLS/SSL 协议，这些都会导致连接的耗时。使用 Preconnect 可以帮助你告诉浏览器：“我有一些资源会用到某个源（origin），你可以帮我预先建立连接。

```html
<link rel="preconnect" href="//example.com">
<link rel="preconnect" href="//cdn.example.com" crossorigin>
```

### 1.3. 预加载


#### 1.3.1. Prefetch

可以用 Prefetch 来指定在紧接着之后的操作或浏览中需要使用到的资源，让浏览器在空闲时提前获取。由于仅仅是提前获取资源，因此浏览器不会对资源进行预处理，实际使用中效果也很好。 示例：

第一步：在使用React做懒加载时，可借助Webpack指定Prefetch

```ts
const Game = lazy(() => import(/* webpackPrefetch: true */ './game'));
```

第二步：此时你会发现对应的Chunk被加上了Prefetch标识

```html
<link rel="prefetch" as="script" href="/static/js/6.f0a869f6.chunk.js">
```

第三步：此时访问到对应页面时会发现响应头状态码带上了缓存标识

```
Request Method: GET
Status Code: 200 OK (from **prefetch cache**)
```

#### 1.3.2. Preload

错误的设置会导致阻塞页面加载，通常可以对字体资源设置preload，来避免无样式文本 (FOUT) 闪烁的情况
在遇到需要 Preload 的资源时，浏览器会 立刻 进行预获取，并将结果放在内存中，资源的获取不会影响页面 parse 与 load 事件的触发。

```html
<link rel="preload" href="./nextpage.js" as="script">
```

#### 1.3.3. Prerender

如果你指定 Prerender 一个页面，那么它依赖的其他资源，像 <script>、 等页面所需资源也可能会被下载与处理。但是预处理会基于当前机器、网络情况的不同而被不同程度地推迟。例如，会根据 CPU、GPU 和内存的使用情况，以及请求操作的幂等性而选择不同的策略或阻止该操作。

```html
<link rel="prerender" href="//sample.com/nextpage.html">
```

## 2. 项目实战


```html
<link rel="dns-prefetch" href="//image-1251917893.file.myqcloud.com">
<link rel="dns-prefetch" href="//igame-10037599.file.myqcloud.com">
<link rel="dns-prefetch" href="//a.igame.qq.com">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
<link rel="dns-prefetch" href="//cdn3.codesign.qq.com">

<link rel="preconnect" href="//image-1251917893.file.myqcloud.com">
<link rel="preconnect" href="//igame-10037599.file.myqcloud.com">
<link rel="preconnect" href="//a.igame.qq.com">
<link rel="preconnect" href="//cdn.jsdelivr.net">
<link rel="preconnect" href="//cdn3.codesign.qq.com">

<link rel="preload"
  href="https://cdn3.codesign.qq.com/icons/Q2kY5j31A70ExNd/latest/iconfont.woff?t=f80fd900284bd1c3838a660cbe7279e1"
  as="script">
```

参考：https://html.spec.whatwg.org/#linkTypes
