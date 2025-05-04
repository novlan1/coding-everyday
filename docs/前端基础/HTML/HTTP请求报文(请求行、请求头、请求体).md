- [1. HTTP请求报文（请求行、请求头、请求体）](#1-http请求报文请求行请求头请求体)
  - [1.1. HTTP协议](#11-http协议)
  - [1.2. HTTP请求报文](#12-http请求报文)
    - [1.2.1. HTTP请求报文由4部分组成（请求行+请求头+空行+请求体）：](#121-http请求报文由4部分组成请求行请求头空行请求体)
  - [1.3. HTTP请求报文头属性](#13-http请求报文头属性)
    - [1.3.1. Accept](#131-accept)
    - [1.3.2. Cookie](#132-cookie)
    - [1.3.3. Referer](#133-referer)
    - [1.3.4. Cache-Control](#134-cache-control)
    - [1.3.5. Accept-Charset](#135-accept-charset)
    - [1.3.6. Accept-Encoding](#136-accept-encoding)
    - [1.3.7. Accept-Language](#137-accept-language)
    - [1.3.8. Authorization](#138-authorization)
    - [1.3.9. Content-Length](#139-content-length)
    - [1.3.10. Host](#1310-host)
    - [1.3.11. If-Modified-Since](#1311-if-modified-since)
    - [1.3.12. Referer](#1312-referer)
    - [1.3.13. User-Agent](#1313-user-agent)
    - [1.3.14. Pragma](#1314-pragma)
    - [1.3.15. From](#1315-from)
    - [1.3.16. Connection](#1316-connection)
    - [1.3.17. Range](#1317-range)
    - [1.3.18. UA-Pixels，UA-Color，UA-OS，UA-CPU](#1318-ua-pixelsua-colorua-osua-cpu)
  - [1.4. HTTP响应报文](#14-http响应报文)
  - [1.5. 响应状态码](#15-响应状态码)
  - [1.6. 常见的HTTP响应报文头属性](#16-常见的http响应报文头属性)
    - [1.6.1. Cache-Control](#161-cache-control)
    - [1.6.2. ETag](#162-etag)
    - [1.6.3. Location](#163-location)
    - [1.6.4. Set-Cookie](#164-set-cookie)
    - [1.6.5. Allow](#165-allow)
    - [1.6.6. Content-Encoding](#166-content-encoding)
    - [1.6.7. Content-Length](#167-content-length)
    - [1.6.8. Content- Type](#168-content--type)
    - [1.6.9. Date](#169-date)
    - [1.6.10. Expires](#1610-expires)
    - [1.6.11. Last-Modified](#1611-last-modified)
    - [1.6.12. Location](#1612-location)
    - [1.6.13. Refresh](#1613-refresh)
    - [1.6.14. Server](#1614-server)
    - [1.6.15. Set-Cookie](#1615-set-cookie)
    - [1.6.16. Transfer-Encoding](#1616-transfer-encoding)

## 1. HTTP请求报文（请求行、请求头、请求体）

### 1.1. HTTP协议

1.简介

HTTP协议（Hyper Text Transfer Protocol，超文本传输协议）,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。

HTTP基于TCP/IP通信协议来传递数据。

HTTP基于客户端/服务端（C/S）架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。



2.特点

（1）HTTP是无连接：**无连接的含义是限制每次连接只处理一个请求**。**服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间**。

（2）HTTP是媒体独立的：**只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送**。客户端以及服务器指定使用适合的MIME-type内容类型。

（3）HTTP是无状态：**无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传**，这样可能导致每次连接传送的数据量增大。另一方面，**在服务器不需要先前信息时它的应答就较快**。





### 1.2. HTTP请求报文

#### 1.2.1. HTTP请求报文由4部分组成（请求行+请求头+空行+请求体）：

![img](http://img.uwayfly.com/article_mike_20200717090644_51c0d15fe1bb.png)



请求行：

- ①是**请求方法**，GET和POST是最常见的HTTP方法，除此以外还包括DELETE、HEAD、OPTIONS、PUT、TRACE。
- ②为**请求对应的URL地址**，它和报文头的Host属性组成完整的请求URL。
- ③是**协议名称及版本号**。

  - 其中HTTP协议版本有两种：HTTP1.0/HTTP1.1 可以这样区别：
  - **HTTP1.0对于每个连接都只能传送一个请求和响应，请求就会关闭**，**HTTP1.0没有Host字段**;
  - 而**HTTP1.1在同一个连接中可以传送多个请求和响应，多个请求可以重叠和同时进行，HTTP1.1必须有Host字段**。

请求头：

- ④是HTTP的报文头，报文头包含若干个属性，格式为“属性名:属性值”，服务端据此获取客户端的信息。
- 与缓存相关的规则信息，均包含在header中



请求体：

- ⑤是报文体，它将一个页面表单中的组件值通过**param1=value1&param2=value2**的键值对形式编码成一个格式化串，它承载多个请求参数的数据。
- **不但报文体可以传递请求参数，请求URL也可以通过类似于“/chapter15/user.html? param1=value1&param2=value2”的方式传递请求参数**。
- 若方法字段是GET，则此项为空，没有数据
- 若方法字段是POST,则通常来说此处放置的就是要提交的数据
- 比如要使用POST方法提交一个表单，其中有user字段中数据为“admin”, password字段为123456，那么这里的请求数据就是 user=admin&password=123456，使用&来连接各个字段。

总的来说，HTTP请求报文格式就如下图所示：

![img](http://img.uwayfly.com/article_mike_20200717113554_3871d610fc8a.png)







### 1.3. HTTP请求报文头属性



#### 1.3.1. Accept

请求报文可通过一个“Accept”报文头属性**告诉服务端 客户端接受什么MIME类型的响应**。

如下报文头相当于告诉服务端，俺客户端能够接受的响应类型仅为纯文本数据啊，你丫别发其它什么图片啊，视频啊过来，那样我会歇菜的~~~

```
Accept:text/plain 
```

Accept属性的值可以为一个或多个MIME类型的值（描述消息内容类型的因特网标准， 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据）

#### 1.3.2. Cookie

客户机通过这个头可以向服务器带数据，这是最重要的请求头信息之一。如下所示：

```
Cookie: $Version=1; Skin=new;jsessionid=5F4771183629C9834F8382E23 
```

服务端是怎么知道客户端的多个请求是隶属于一个Session呢？注意到后台的那个jsessionid = 5F4771183629C9834F8382E23木有？原来就是通过HTTP请求报文头的Cookie属性的jsessionid的值关联起来的！（当然也可以通过重写URL的方式将会话ID附带在每个URL的后面哦）。

#### 1.3.3. Referer

表示这个请求是从哪个URL过来的，假如你通过google搜索出一个商家的广告页面，你对这个广告页面感兴趣，鼠标一点发送一个请求报文到商家的网站，这个请求报文的Referer报文头属性值就是http://www.google.com。

#### 1.3.4. Cache-Control

对缓存进行控制，如一个请求希望响应返回的内容在客户端要被缓存一年，或不希望被缓存就可以通过这个报文头达到目的。

#### 1.3.5. Accept-Charset

浏览器可接受的字符集。

#### 1.3.6. Accept-Encoding

浏览器能够进行解码的数据编码方式，比如gzip。Servlet能够向支持gzip的浏览器返回经gzip编码的HTML页面。许多情形下这可以减少5到10倍的下载时间。

#### 1.3.7. Accept-Language

浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到。

#### 1.3.8. Authorization

授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中。

#### 1.3.9. Content-Length

表示请求消息正文的长度。

#### 1.3.10. Host

客户机通过这个头告诉服务器，想访问的主机名。Host头域指定请求资源的Intenet主机和端口号，必须表示请求url的原始服务器或网关的位置。HTTP/1.1请求必须包含主机头域，否则系统会以400状态码返回。

#### 1.3.11. If-Modified-Since

客户机通过这个头告诉服务器，资源的缓存时间。只有当所请求的内容在指定的时间后又经过修改才返回它，否则返回304“Not Modified”应答。

#### 1.3.12. Referer

客户机通过这个头告诉服务器，它是从哪个资源来访问服务器的(防盗链)。包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。

#### 1.3.13. User-Agent

User-Agent头域的内容包含发出请求的用户信息、浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用。

#### 1.3.14. Pragma

指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝。

#### 1.3.15. From

请求发送者的email地址，由一些特殊的Web客户程序使用，浏览器不会用到它。

#### 1.3.16. Connection

处理完这次请求后是否断开连接还是继续保持连接。如果Servlet看到这里的值为“Keep- Alive”，或者看到请求使用的是HTTP 1.1(HTTP 1.1默认进行持久连接)，它就可以利用持久连接的优点，当页面包含多个元素时(例如Applet，图片)，显著地减少下载所需要的时间。要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入 ByteArrayOutputStream，然后在正式写出内容之前计算它的大小。

#### 1.3.17. Range

Range头域可以请求实体的一个或者多个子范围。例如，



- 表示头500个字节：bytes=0-499
- 表示第二个500字节：bytes=500-999
- 表示最后500个字节：bytes=-500
- 表示500字节以后的范围：bytes=500-
- 第一个和最后一个字节：bytes=0-0,-1
- 同时指定几个范围：bytes=500-600,601-999

但是服务器可以忽略此请求头，**如果无条件GET包含Range请求头，响应会以状态码206(PartialContent)返回而不是以200 (OK)**。

#### 1.3.18. UA-Pixels，UA-Color，UA-OS，UA-CPU

**由某些版本的IE浏览器所发送的非标准的请求头**，表示屏幕大小、颜色深度、操作系统和CPU类型。


### 1.4. HTTP响应报文

HTTP的响应报文也由4部分组成（响应行+响应头+空行+响应体）

![img](http://img.uwayfly.com/article_mike_20200717090740_afd0d0af3f29.png)



响应行：

- ①**报文协议及版本**；
- ②**状态码及状态描述**；

响应头：

- ③响应报文头，也是由多个属性组成；

响应体：

- ④响应报文体，即我们真正要的“干货”
- 响应体就是响应的消息体，如果是纯数据就是返回纯数据，如果请求的是HTML页面，那么返回的就是HTML代码，如果是JS就是JS代码，如此之类。





### 1.5. 响应状态码



和请求报文相比，响应报文多了一个“响应状态码”，它以“清晰明确”的语言告诉客户端本次请求的处理结果。

HTTP的响应状态码由5段组成：

- 1xx 消息，一般是告诉客户端，请求已经收到了，正在处理，别急...
- 2xx 处理成功，一般表示：请求收悉、我明白你要的、请求已受理、已经处理完成等信息.
- 3xx 重定向到其它地方。它让客户端再发起一个请求以完成整个处理。
- 4xx 处理发生错误，责任在客户端，如客户端的请求一个不存在的资源，客户端未被授权，禁止访问等。
- 5xx 处理发生错误，责任在服务端，如服务端抛出异常，路由出错，HTTP版本不支持等。





### 1.6. 常见的HTTP响应报文头属性



#### 1.6.1. Cache-Control

响应输出到客户端后，服务端通过该报文头属告诉客户端如何控制响应内容的缓存。

常见的取值有private、public、no-cache、max-age，no-store，默认为private。

- private: 客户端可以缓存
- public: 客户端和代理服务器都可缓存（前端的同学，可以认为public和private是一样的）
- max-age=xxx: 缓存的内容将在 xxx 秒后失效
- no-cache: 需要使用对比缓存来验证缓存数据
- no-store: 所有内容都不会缓存

**默认为private，缓存时间为31536000秒（365天）** 。也就是说，在365天内再次请求这条数据，都会直接获取缓存数据库中的数据，直接使用。

#### 1.6.2. ETag

一个代表响应服务端资源（如页面）版本的报文头属性，如果某个服务端资源发生变化了，这个ETag就会相应发生变化。它是Cache-Control的有益补充，可以让客户端“更智能”地处理什么时候要从服务端取资源，什么时候可以直接从缓存中返回响应。

#### 1.6.3. Location

我们在JSP中让页面Redirect到一个某个A页面中，其实是让客户端再发一个请求到A页面，这个需要Redirect到的A页面的URL，其实就是通过响应报文头的Location属性告知客户端的，如下的报文头属性，将使客户端redirect到iteye的首页中：

```
Location: http://www.iteye.com  
```

#### 1.6.4. Set-Cookie

服务端可以设置客户端的Cookie，其原理就是通过这个响应报文头属性实现的：

```
Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1  
```

cookie机制：

客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。

Cookie的maxAge决定着Cookie的有效期，单位为秒（Second）。Cookie中通过getMaxAge()方法与setMaxAge(int maxAge)方法来读写maxAge属性。

- **如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效**。
- **如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该Cookie即失效**。
- **如果maxAge为0，则表示删除该Cookie**。

Cookie并不提供修改、删除操作。如果要修改某个Cookie，只需要新建一个同名的Cookie，添加到response中覆盖原来的Cookie。

**如果要删除某个Cookie，只需要新建一个同名的Cookie，并将maxAge设置为0**，并添加到response中覆盖原来的Cookie。

```
Cookie cookie = new Cookie("username","helloweenvsfei"); // 新建Cookie
cookie.setMaxAge(0); // 设置生命周期为0，不能为负数
response.addCookie(cookie); // 必须执行这一句 输出到客户端
```

#### 1.6.5. Allow

服务器支持哪些请求方法(如GET、POST等)。

#### 1.6.6. Content-Encoding

文档的编码(Encode)方法。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。Java的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE4、IE5才支持它。因此，Servlet应该通过查看Accept-Encoding头(即request.getHeader(“Accept- Encoding”))检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面。

#### 1.6.7. Content-Length

**表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据**。如果你想要利用持久连接的优势，可以把输出文档写入 ByteArrayOutputStram，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容。

#### 1.6.8. Content- Type

**表示后面的文档属于什么MIME类型**。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置 Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。

#### 1.6.9. Date

**当前的GMT时间**，例如，Date:Mon,31Dec200104:25:57GMT。Date描述的时间表示世界标准时，换算成本地时间，需要知道用户所在的时区。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦。**北京时间=GMT时间+8小时**。

#### 1.6.10. Expires

**告诉浏览器把回送的资源缓存多长时间，-1或0则是不缓存**。

#### 1.6.11. Last-Modified

**文档的最后改动时间**。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304(Not Modified)状态。Last-Modified也可用setDateHeader方法来设置。

#### 1.6.12. Location

这个头配合302状态码使用，用于重定向接收者到一个新URI地址。表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302。

#### 1.6.13. Refresh

**告诉浏览器隔多久刷新一次，以秒计**。

#### 1.6.14. Server

**服务器通过这个头告诉浏览器服务器的类型**。Server响应头包含处理请求的原始服务器的软件信息。此域能包含多个产品标识和注释，产品标识一般按照重要性排序。Servlet一般不设置这个值，而是由Web服务器自己设置。

#### 1.6.15. Set-Cookie

设置和页面关联的Cookie。Servlet不应使用response.setHeader(“Set-Cookie”, …)，而是应使用HttpServletResponse提供的专用方法addCookie。

#### 1.6.16. Transfer-Encoding

告诉浏览器数据的传送格式。