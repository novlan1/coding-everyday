- [1. Nginx](#1-nginx)
  - [1.1. 日志变量](#11-日志变量)
  - [1.2. 全局变量](#12-全局变量)
  - [1.3. 事件配置events](#13-事件配置events)
  - [1.4. `proxy_buffering`](#14-proxy_buffering)
  - [1.5. Nginx 代理](#15-nginx-代理)
  - [1.6. 配置`https`以及`http`自动跳转到`https`](#16-配置https以及http自动跳转到https)
    - [1.6.1. 常见规则](#161-常见规则)

## 1. Nginx

### 1.1. 日志变量

```bash
$remote_addr 与 $http_x_forwarded_for  # 用以记录客户端的ip地址； 

$remote_user # 用来记录客户端用户名称； 

$time_local # 用来记录访问时间与时区；

$request # 用来记录请求的url与http协议；

$status # 用来记录请求状态；成功是200， 

$body_bytes_sent # 记录发送给客户端文件主体内容大小；

$http_referer # 用来记录从那个页面链接访问过来的； 

$http_user_agent # 记录客户端浏览器的相关信息；
```

### 1.2. 全局变量

```bash
worker_processes auto; # nginx开启的进程数

pid /run/nginx.pid; # 指定进程ID存储文件位置
```

### 1.3. 事件配置events

```
use [ kqueue | rtsig | epoll | /dev/poll | select | poll ];
```
`epoll`模型是`Linux 2.6`以上版本内核中的高性能网络`I/O`模型，如果跑在`FreeBSD`上面，就用`kqueue`模型。

```bash
use epoll;

worker_connections 1024;  #最大连接数，默认为512
```
- 开启高效传输模式。
```bash
sendfile on;
```
- 防止网络阻塞

```bash
tcp_nopush on;

tcp_nodelay on; 
```

- 客户端连接超时时间，单位是秒
```bash
keepalive_timeout 60;
```
- 客户端请求头读取超时时间
```bash
client_header_timeout 10;
```
- 设置客户端请求主体读取超时时间
```bash
client_body_timeout 10;
```

- 响应客户端超时时间
```bash
send_timeout 10;
```
### 1.4. `proxy_buffering`
`proxy_buffering`主要是实现被代理服务器的数据和客户端的请求异步。

为了方便理解，我们定义三个角色，A为客户端，B为代理服务器，C为被代理服务器。

- 当`proxy_buffering`开启，A发起请求到B，B再到C，C反馈的数据先到B的`buffer`上，然后B会根据`proxy_busy_buffer_size`来决定什么时候开始把数据传输给A。
- 在此过程中，如果所有的`buffer`被写满，数据将会写入到`temp_file`中。
- 相反，如果`proxy_buffering`关闭，C反馈的数据实时地通过B传输给A。

### 1.5. Nginx 代理

- `node`和`nginx`配置的时候，不能在根目录`/`下配置代理，那是`react`或者`vue`放的真实的地址。
- 而应该再添加一个`location`，代理`/api`，这也是为什么很多项目代码里请求地址前面都是`/api`开头。



### 1.6. 配置`https`以及`http`自动跳转到`https`

![https配置](/imgs/nginx_https_config.png)



#### 1.6.1. 常见规则

- http：协议级别
- server：服务器级别
- location：请求级别

```
location [=|~|~*|^~] /uri/ { … }
```

`=`表示：必须与指定的模式精确匹配

```
server {
server_name sish
   location = /abc {
   }
}
```

那么，如下是对的：
```
`http://baidu.com/abc`
`http://baidu.com/abc?p1`
```
如下是错的：
```
`http://baidu.com/abc/`
`http://baidu.com/abcde`
```


`~` 表示：指定的正则表达式要区分大小写


```
server {
server_name baidu.com;
   location ~ ^/abc$ {
   }
}
```

那么，如下是对的：
```
http://baidu.com/abc
http://baidu.com/abc?p1=11&p2=22
```
如下是错的：
```
http://baidu.com/ABC
http://baidu.com/abc/
http://baidu.com/abcde
```


`~*` 表示：指定的正则表达式不区分大小写


```
server {
server_name baidu.com;
location ~* ^/abc$ {
   }
}
```

那么，如下是对的：
```
http://baidu.com/abc
http://baidu..com/ABC
http://baidu..com/abc?p1=11&p2=22
```
如下是错的：
```
http://baidu..com/abc/
http://baidu..com/abcde
```
