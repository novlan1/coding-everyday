## Linux 命令

### 生成 SSH 密钥
```bash
ssh-keygen -t rsa -C "your_email@example.com"
```
代码参数含义：
```js
-t  // 指定密钥类型，默认是 rsa ，可以省略。

-C  // 设置注释文字，比如邮箱。

-f  // 指定密钥文件存储文件名。
```

以上代码省略了 `-f` 参数，因此，运行上面那条命令后会让你输入一个文件名，用于保存刚才生成的`SSH key` 代码，如：

```
Generating public/private rsa key pair.

\# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
```
当然，你也可以不输入文件名，使用默认文件名（推荐），那么就会生成 `id_rsa` 和 `id_rsa.pub` 两个秘钥文件。

默认情况下，用户的 SSH 密钥存储在其 `~/.ssh` 目录下

### unzip解压缩到其他目录

`unzip test.zip -d /tmp`


### linux创建文件名添加当前系统日期时间的方法

使用`date +%y%m%d` 

举例：
```bash
mkdir `date +%y%m%d` 
```

注意：这个符号是键盘上`~`，而不是`'`.

重要说明点：那个日期`$(date +%Y%m%d)`的 `date`命令和后边的日期格式的`+`号之前有一个空格。直接连写生成不了日期

### Vim 删除当前行
```vim
dd
```

### Vim 设置行号 
```
:set number
```


### Vim 搜索与取消搜索

在Vi里面如果要搜索某个关键字，只要在命令状态下键入`/xxx`就可以了，比如，我要搜索`port`的位置，我就键入：
```
/port
```
然后回车，一个文件中，所有出现这个字样的地方都会被高亮显示。按n键，就可以自动把光标跳到下一个。
但是，用好这个功能，怎么消除高亮呢，只要键入`:noh`就可以了

### `df -h`和 `df -i`

- `df -h`查看磁盘使用情况
- `df -i` 查看inode使用情况


### `sudo su` 和 `sudo -s`的区别
`sudo su` 和 `sudo -s`都是切换到root用户，不同的是：

- sudo su 环境用的是目标用户(root)的环境
- sudo -s 环境用的是当前用户本身的环境


### `ps -ef`和`ps aux`的区别

- `-ef`是`System V`展示风格，而`aux`是`BSD`风格。
- `COMMAND`列如果过长，`aux`会截断显示，而ef不会
- 如果想查看进程的`CPU`占用率和内存占用率，可以使用`aux`
- 如果想查看进程的父进程`ID`和完整的`COMMAND`命令，可以使用`ef`


### VScode 使用时会每次修改文件时提示没有权限的问题
```bash
sudo chown -R 当前用户  需要操作的文件夹路径
```
比如：

```bash
sudo chown -R liwz /Users/liwz/workspace/minicnypafe
```

### mac 电脑在控制台输入`open .`即可打开`finder`的当前文件夹
用的工具是`iterm`


### windows 电脑查看mac地址 

```
ipconfig/all
```


### 部署项目至远程服务器

选择的是CentOS系统，版本在7.0以上

##### 1. 连接远程linux服务器

`Git bash`连接远程工具 

命令：`ssh user@remote_ip` 链接到远程服务器

除了`git bash`，大家还可以用`Xshell`,也很方便，或者直接通过远程桌面连接（方法：`windows键+R`；输入`mstsc`）


##### 2. Web服务器Nginx的安装

1. 因为`centos`的`yum`源没有`nginx`资源，故需要先安装`epel-release`
```
yum install epel-release
```
2. 安装nginx
```
yum install nginx
```
3. 查看版本号，检查是否安装成功

`EPEL`的全称叫 `Extra Packages for Enterprise Linux` 。EPEL是由 `Fedora` 社区打造，为 `RHEL` 及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。装上了 EPEL之后，就相当于添加了一个第三方源。


##### 3. Nginx的配置

- nginx配置文件

```
nginx -t
```

- 配置`nginx.conf`
  - `use nginx` 改为 `use root`
  - 修改`http > server > location`
```
location / { //根访问地址，可/***
  root /root/www/;  //网站存放路径
  index index.html index.htm;  //网站默认访问页面
}
```
Linux 关于 Nginx 的命令：
```bash
ps -ef | grep nginx # 查看进程

nginx -s stop # 停止进程

直接`nginx`  或者 nginx -s reload # 重启nginx
```
##### 4. 上传项目到服务器

`scp -r ./* root@47.94.255.230:/root/www`

没有scp命令的话，通过`yum install openssh-clients`安装



### Linux 安装`unzip`
如果你如法使用`unzip`命令解压.zip文件，可能是你没有安装unzip软件，下面是安装方法

- 命令： `yum list | grep zip/unzip`  #获取安装列表
- 安装命令：`yum install zip`  #提示输入时，请输入y；
- 安装命令：`yum install unzip` #提示输入时，请输入y；

### Linux 安装`node`
- 服务器安装`node`，解压安装包后，在`/etc/profile`文件`export path`语句前加上
```
PATH=$PATH:/home/kun/mysofltware/node-v0.10.26-linux-x64/bin
```
- 并`source /etc/profile`，使环境变量生效
- 然后`echo $PATH`，检查下有没有`node`的环境变量

 

- 或者`vim ~/.bash_profile`，找到`PATH=$PATH:$HOME/bin`，在后面添加路径：`/usr/local/src/node/bin`，注意冒号。
- 然后，`source ~/.bash_profile`


### Linux 安装 MongoDB

- 创建日志目录和数据文件目录
```bash
mkdir -p data/logs
mkdir -p data/db
```

- 创建`mongodb.conf`文件：

```bash
dbpath = /usr/local/mongodb/data/test/db    # 设置数据文件的存放目录 

logpath = /usr/local/mongodb/data/test/logs/mongodb.log   # 设置日志文件的存放目录及其日志文件名 

port = 27017   # 设置端口号（默认的端口号是 27017） 
  
fork = true   # 设置为以守护进程的方式运行，即在后台运行 
 
nohttpinterface = true   # 关闭http接口，默认关闭27018端口访问
```


- 启动mongodb，可以放到环境变量里，也可以直接启动：
```bash
cd /usr/local/mongodb/bin/

./mongod --config ../mongodb.conf
```

### CentOS7 安装 MySQL

在 CentOS 中默认安装有 MariaDB，这个是 MySQL 的分支，但为了需要，还是要在系统中安装 MySQL，而且安装完成之后可以直接覆盖掉 MariaDB。

1. 下载并安装MySQL官方的`Yum Repository`
```
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

使用上面的命令就直接下载了安装用的`Yum Repository`，大概 25KB 的样子，然后就可以直接`yum`安装了。
```
yum -y install mysql57-community-release-el7-10.noarch.rpm
```

之后就开始安装MySQL服务器。
```
yum -y install mysql-community-server
```
这步可能会花些时间，安装完成后就会覆盖掉之前的`mariadb`。

2. MySQL数据库设置

- 首先启动MySQL
```
systemctl start mysqld.service
```
- 查看MySQL运行状态，运行状态如图：
```
ystemctl status mysqld.service
```


- 此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时`root`用户的密码，通过如下命令可以在日志文件中找出密码：
```
$ grep "password" /var/log/mysqld.log
```


- 如下命令进入数据库：
```
mysql -uroot -p
```

- 输入初始密码，此时不能做任何事情，因为MySQL默认必须修改密码之后才能操作数据库：
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```


### mysql修改用户密码的方法及命令


用`SET PASSWORD`命令 

首先登录MySQL。 

格式：
```sql
mysql> set password for 用户名@localhost = password('新密码'); 
```
例子：
```bash
mysql> set password for root@localhost = password('123');
```
这里有个问题，新密码设置的时候如果设置的过于简单会报错：
原因是因为 MySQL 有密码设置的规范，具体是与`validate_password_policy`的值有关：

MySQL完整的初始密码规则可以通过如下命令查看：
```
mysql> SHOW VARIABLES LIKE 'validate_password%';
```


密码的长度是由`validate_password_length`决定的，而`validate_password_length`的计算公式是：
```
validate_password_length = 
validate_password_number_count + 
validate_password_special_char_count + 
(2 * validate_password_mixed_case_count)
```

我的是已经修改过的，初始情况下第一个的值是ON，`validate_password_length`是8。可以通过如下命令修改：
```
mysql> set global validate_password_policy=0;

mysql> set global validate_password_length=1;
```
设置之后就是我上面查出来的那几个值了，此时密码就可以设置的很简单，例如`1234`之类的。到此数据库的密码设置就完成了。

但此时还有一个问题，就是因为安装了`Yum Repository`，以后每次yum操作都会自动更新，需要把这个卸载掉：

```
$ yum -y remove mysql57-community-release-el7-10.noarch
```
