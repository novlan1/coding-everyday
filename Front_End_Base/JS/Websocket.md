##  WebSocket
### 握手协议
WebSocket 是独立的、创建在TCP上的协议。

Websocket 通过 HTTP/1.1 协议的101状态码进行握手。

为了创建 Websocket 连接，需要通过浏览器发出请求，之后服务器进行回应，这个过程通常称为“握手”（`Handshaking`）。

#### 例子
一个典型的Websocket握手请求如下：

客户端请求：
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

服务器回应：
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```
字段说明
1. `Connection`必须设置`Upgrade`，表示客户端希望连接升级。
2. `Upgrade`字段必须设置`Websocket`，表示希望升级到 Websocket 协议。
3. `Sec-WebSocket-Key`是随机的字符串，服务器端会用这些数据来构造出一个SHA-1的信息摘要。把`“Sec-WebSocket-Key”`加上一个特殊字符串`“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”`，然后计算SHA-1摘要，之后进行`Base64`编码，将结果做为`“Sec-WebSocket-Accept”`头的值，返回给客户端。如此操作，可以尽量避免普通HTTP请求被误认为`Websocket`协议。
4. `Sec-WebSocket-Version` 表示支持的Websocket版本。`RFC6455`要求使用的版本是13，之前草案的版本均应当弃用。
5. `Origin` 字段是可选的，通常用来表示在浏览器中发起此 Websocket 连接所在的页面，类似于Referer。但是，与Referer 不同的是，Origin 只包含了协议和主机名称。
6. 其他一些定义在 HTTP 协议中的字段，如 `Cookie` 等，也可以在 Websocket 中使用。




参考资料：[WebSocket, wikipedia](https://zh.wikipedia.org/wiki/WebSocket)，[WebSocket协议：5分钟从入门到精通](https://www.cnblogs.com/chyingp/p/websocket-deep-in.html)

### `Sec-WebSocket-Key/Accept`的作用
`Sec-WebSocket-Key/Sec-WebSocket-Accept`在主要作用在于提供基础的防护，减少恶意连接、意外连接。
但连接是否安全、数据是否安全、客户端/服务端是否合法的 ws客户端、ws服务端，其实并没有实际性的保证。

作用大致归纳如下：

1. 避免服务端收到非法的 websocket 连接（比如 http 客户端不小心请求连接 websocket 服务，此时服务端可以直接拒绝连接）
2. 确保服务端理解 websocket 连接。因为ws握手阶段采用的是 http 协议，因此可能 ws 连接是被一个http服务器处理并返回的，此时客户端可以通过 `Sec-WebSocket-Key` 来确保服务端认识ws协议。（并非百分百保险，比如总是存在那么些无聊的http服务器，光处理Sec-WebSocket-Key，但并没有实现ws协议。）
3. 用浏览器里发起ajax请求，设置 header 时，`Sec-WebSocket-Key`以及其他相关的`header`是被禁止的。这样可以避免客户端发送 ajax 请求时，意外请求协议升级（`websocket upgrade`）
4. 可以防止反向代理（不理解ws协议）返回错误的数据。比如反向代理前后收到两次ws连接的升级请求，反向代理把第一次请求的返回给cache住，然后第二次请求到来时直接把 cache 住的请求给返回（无意义的返回）。
5. `Sec-WebSocket-Key`主要目的并不是确保数据的安全性，因为`Sec-WebSocket-Key`、`Sec-WebSocket-Accept`的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）。



