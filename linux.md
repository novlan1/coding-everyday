# Linux命令

### ssh-keygen -t rsa -C "your_email@example.com"

代码参数含义：

 

-t 指定密钥类型，默认是 rsa ，可以省略。

-C 设置注释文字，比如邮箱。

-f 指定密钥文件存储文件名。

 

 

以上代码省略了 -f 参数，因此，运行上面那条命令后会让你输入一个文件名，用于保存刚才生成的 SSH key 代码，如：

 

Generating public/private rsa key pair.

\# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]

当然，你也可以不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。

 

 

 

默认情况下，用户的 SSH 密钥存储在其 ~/.ssh 目录下

 

 

 

### unzip解压缩到其他目录

 

unzip test.zip -d /tmp

 

### linux创建文件名添加当前系统日期时间的方法

 

使用`date +%y%m%d` 

Example: mkdir `date +%y%m%d` 

 

注意：`这个符号是键盘上~，而不是'.

 

重要说明点：那个日期$(date +%Y%m%d)的 date命令和后边的日期格式的+号之前有一个空格。直接连写生成不了日期

 

### vim删除当前行： dd

 

### vim搜索与取消搜索

在Vi里面如果要搜索某个关键字，只要在命令状态下键入/xxx就可以了，比如，我要搜索port的位置，我就键入：

/port

然后回车，一个文件中，所有出现这个字样的地方都会被高亮显示。按n键，就可以自动把光标跳到下一个。

 

但是，用好这个功能，怎么消除高亮呢，我以前一直不知道，弄得自己也很无奈。

终于在网上看到，只要键入

:noh

就可以了

 

 

## 指令

### windows电脑查看mac地址 ipconfig/all

 

 

 

### df -h df -i

df -h查看磁盘使用情况

df -i 查看inode使用情况

 

 

 

### mac电脑在控制台输入open .即可打开finder的当前文件夹。用的工具是iterm

 

### ps -ef和ps aux的区别

-ef是System V展示风格，而aux是BSD风格。

COMMAND列如果过长，aux会截断显示，而ef不会

 

如果想查看进程的CPU占用率和内存占用率，可以使用aux 

如果想查看进程的父进程ID和完整的COMMAND命令，可以使用ef

 

 

### vs code使用时会每次修改文件时提示没有权限的问题

 

每次修改的时候都要去点击 edit as admin  还要输入开机密码。比较麻烦，我改了一下文件 夹的权限，当前用户下都是可以读和写的。但是还不行，搜索了一下发现运行如下命令就可以解决了。

 

sudo chown -R 当前用户  需要操作的文件夹路径 。 如（sudo chown -R liwz /Users/liwz/workspace/minicnypafe ）

 

 

 

 

## Nginx

 

### 日志变量

1.$remote_addr 与$http_x_forwarded_for 用以记录客户端的ip地址； 2.$remote_user ：用来记录客户端用户名称； 

3.$time_local ： 用来记录访问时间与时区；

4.$request ： 用来记录请求的url与http协议；

 

5.$status ： 用来记录请求状态；成功是200， 

6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；

7.$http_referer ：用来记录从那个页面链接访问过来的； 

8.$http_user_agent ：记录客户端浏览器的相关信息；

 

 

### 全局变量

nginx开启的进程数

worker_processes auto;

 

指定进程ID存储文件位置

pid    /run/nginx.pid;

 

### 事件配置events

\#use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。

use epoll;

worker_connections 1024;  #最大连接数，默认为512

 

 

 

\#开启高效传输模式。

sendfile on;

 

\#防止网络阻塞

tcp_nopush on;

tcp_nodelay on; 

 

 

\#客户端连接超时时间，单位是秒

keepalive_timeout 60;

 

\#客户端请求头读取超时时间

client_header_timeout 10;

 

 

\#设置客户端请求主体读取超时时间

client_body_timeout 10;

 

\#响应客户端超时时间

send_timeout 10;

 

 

 

 

 

proxy_buffering主要是实现被代理服务器的数据和客户端的请求异步。

 

为了方便理解，我们定义三个角色，A为客户端，B为代理服务器，C为被代理服务器。

 

当proxy_buffering开启，A发起请求到B，B再到C，C反馈的数据先到B的buffer上，然后B会根据proxy_busy_buffer_size来决定什么时候开始把数据传输给A。

 

在此过程中，如果所有的buffer被写满，数据将会写入到temp_file中。

 

相反，如果proxy_buffering关闭，C反馈的数据实时地通过B传输给A。

 

 

 

 

 

 

## 部署项目至远程服务器

选择的是CentOS系统，版本在7.0以上

### 连接远程linux服务器

Gitbash连接远程工具 

命令：ssh user@remote_ip 链接到远程服务器

 

除了git bash，大家还可以用Xshell,也很方便，或者直接通过远程桌面连接（方法：windows键+R；输入mstsc）

 

 

### Web服务器nginx的安装

1、因为centos的yum源没有nginx资源，故需要先安装epel-release

  yum install epel-release

2、安装nginx

  yum install nginx

3、查看版本号，检查是否安装成功

 

 

 

EPEL的全称叫 Extra Packages for Enterprise Linux 。EPEL是由 Fedora 社区打造，为 RHEL 及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。装上了 EPEL之后，就相当于添加了一个第三方源。

 

### Nginx的配置

--nginx配置文件

nginx -t

 

--配置nginx.conf

1、use nginx 改为 use root

2、http > server > location

location / { //根访问地址，可/***

  root /root/www/;  //网站存放路径

  index index.html index.htm;  //网站默认访问页面

}

 

 

### 上传项目到服务器

scp -r ./* root@47.94.255.230:/root/www 

没有scp命令的话，通过yum install openssh-clients 安装

 

nginx 运行 Web服务器

退出服务器：logout

查看进程: ps -ef | grep nginx

停止进程：nginx -s stop

重启nginx:  直接nginx  或者 nginx -s reload

 

 

ps -ef用于查看全格式的全部进程，其中“ps”是在Linux中是查看进程的命令，“-e ”参数代表显示所有进程，“-f”参数代表全格式。

 

 

Vim设置行号  :set number

 

 

**开启新的端口****8080**

先在阿里云安全组添加新的端口，再在nginx配置文件添加一个server，listen 写8080，server_name不变 为_，location规则一样，指定文件位置

 

 

设置二级域名

首先在域名那添加新的解析记录，指向原来的IP地址

再在nginx配置文件中添加一个server，主要是配置一个代理proxy_set_header和proxy_pass

​                                   

80端口被占用时，杀掉这个进程：

killall -9 nginx

再次启动nginx：

nginx

查看是否启动：

ps aux|grep nginx

 

 

 

 

server_name www.renbus.com renbus.com;    # 域名；多个之间用空格

 

 

 

## 服务器部署

sudo su 和 sudo -s都是切换到root用户，不同的是：

Ø sudo su 环境用的是目标用户(root)的环境

Ø sudo -s 环境用的是当前用户本身的环境

 

 

 

如果你如法使用unzip命令解压.zip文件，可能是你没有安装unzip软件，下面是安装方法

 

命令： yum list | grep zip/unzip  #获取安装列表

安装命令： yum install zip  #提示输入时，请输入y；

安装命令：yum install unzip #提示输入时，请输入y；

 

 

 

服务器安装node，解压安装包后，在/etc/profile文件export path语句前加上

PATH=$PATH:/home/kun/mysofltware/node-v0.10.26-linux-x64/bin

并source /etc/profile，使环境变量生效

然后echo $PATH，检查下有没有node的环境变量

 

或者vim ~/.bash_profile

找到PATH=$PATH:$HOME/bin，在后面添加路径：/usr/local/src/node/bin，注意冒号

然后，source ~/.bash_profile

 

 

 

### Linux安装mongodb:

创建日志目录和数据文件目录

mkdir -p data/logs

mkdir -p data/db

 

创建mongodb.conf文件：

设置数据文件的存放目录 

dbpath = /usr/local/mongodb/data/test/db 

设置日志文件的存放目录及其日志文件名 

logpath = /usr/local/mongodb/data/test/logs/mongodb.log 

设置端口号（默认的端口号是 27017） 

port = 27017 

设置为以守护进程的方式运行，即在后台运行 

fork = true 

关闭http接口，默认关闭27018端口访问

nohttpinterface = true

 

启动mongodb，可以放到环境变量里，也可以直接启动：

cd /usr/local/mongodb/bin/

./mongod --config ../mongodb.conf

 

 

 

### CentOS7安装MySQL

 

在CentOS中默认安装有MariaDB，这个是MySQL的分支，但为了需要，还是要在系统中安装MySQL，而且安装完成之后可以直接覆盖掉MariaDB。

 

1 下载并安装MySQL官方的 Yum Repository

wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

 

 使用上面的命令就直接下载了安装用的Yum Repository，大概25KB的样子，然后就可以直接yum安装了。

yum -y install mysql57-community-release-el7-10.noarch.rpm

 

 之后就开始安装MySQL服务器。

yum -y install mysql-community-server

 这步可能会花些时间，安装完成后就会覆盖掉之前的mariadb。

 

 

2 MySQL数据库设置

 

 首先启动MySQL

systemctl start mysqld.service

 

 查看MySQL运行状态，运行状态如图：

ystemctl status mysqld.service

 

 

此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码，通过如下命令可以在日志文件中找出密码：

[root@localhost ~]# grep "password" /var/log/mysqld.log

 

 

 

如下命令进入数据库：

mysql -uroot -p

 

 输入初始密码，此时不能做任何事情，因为MySQL默认必须修改密码之后才能操作数据库：

mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';

 

 

 

 

 

mysql修改用户密码的方法及命令

 

用SET PASSWORD命令 

首先登录MySQL。 

格式：mysql> set password for 用户名@localhost = password('新密码'); 

例子：mysql> set password for root@localhost = password('123');

 

 

这里有个问题，新密码设置的时候如果设置的过于简单会报错：

原因是因为MySQL有密码设置的规范，具体是与validate_password_policy的值有关：

MySQL完整的初始密码规则可以通过如下命令查看：

mysql> SHOW VARIABLES LIKE 'validate_password%';

 

 

密码的长度是由validate_password_length决定的，而validate_password_length的计算公式是：

 

validate_password_length = validate_password_number_count + validate_password_special_char_count + (2 * validate_password_mixed_case_count)

 

 

我的是已经修改过的，初始情况下第一个的值是ON，validate_password_length是8。可以通过如下命令修改：

 

mysql> set global validate_password_policy=0;

mysql> set global validate_password_length=1;

 设置之后就是我上面查出来的那几个值了，此时密码就可以设置的很简单，例如1234之类的。到此数据库的密码设置就完成了。

 

 但此时还有一个问题，就是因为安装了Yum Repository，以后每次yum操作都会自动更新，需要把这个卸载掉：

 

[root@localhost ~]# yum -y remove mysql57-community-release-el7-10.noarch

 

 

 

登录MySQL的命令是mysql， mysql 的使用语法如下： 

mysql [-u username] [-h host] [-p[password]] [dbname] 

 

 

 

 

### pm2使用

pm2是node的进程管理工具，利用它可以简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。

一、安装pm2

npm install -g pm2

 

二、配置pm2自启动

pm2 startup centos

 

三、启动koa2项目

在项目根目录执行项目根文件

 

pm2 start index.js

四、其他命令

pm2 list   #查看进程

pm2 stop/reload/restart/delete all    #停止/重载/重启/删除 所有进程

pm2 stop/reload/restart/delete 0     #停止/重载/重启/删除 pm2进程列表中进程为0的进程

pm2 logs [--raw]             #显示所有进程的日志

pm2 flush                #清空所有日志文件

pm2 reloadLogs              #重载所有日志

 

 

 

pm2应该全局安装-g，开启node的守护进程，不会阻塞

pm2 start app.js

pm2 list

pm2 stop app

 

 

 

node和nginx配置的时候，不能在根目录/下配置代理，那是react或者vue放的真实的地址，而应该再添加一个location，代理/api，这也是为什么很多项目代码里请求地址前面都是/api开头

 

 

 

 

 

 