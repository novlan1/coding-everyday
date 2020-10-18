- [1. Linux 命令](#1-linux-命令)
  - [1.1. 生成 SSH 密钥](#11-生成-ssh-密钥)
  - [1.2. unzip解压缩到其他目录](#12-unzip解压缩到其他目录)
  - [1.3. linux创建文件名添加当前系统日期时间的方法](#13-linux创建文件名添加当前系统日期时间的方法)
  - [1.4. Vim 删除当前行](#14-vim-删除当前行)
  - [1.5. Vim 设置行号](#15-vim-设置行号)
  - [1.6. Vim 搜索与取消搜索](#16-vim-搜索与取消搜索)
  - [1.7. `df -h`和 `df -i`](#17-df--h和-df--i)
  - [1.8. `sudo su` 和 `sudo -s`的区别](#18-sudo-su-和-sudo--s的区别)
  - [1.9. `ps -ef`和`ps aux`的区别](#19-ps--ef和ps-aux的区别)
  - [1.10. VScode 使用时会每次修改文件时提示没有权限的问题](#110-vscode-使用时会每次修改文件时提示没有权限的问题)
  - [1.11. mac 电脑在控制台输入`open .`即可打开`finder`的当前文件夹](#111-mac-电脑在控制台输入open-即可打开finder的当前文件夹)
  - [1.12. ifconfig 含义](#112-ifconfig-含义)
  - [1.13. windows 电脑查看mac地址](#113-windows-电脑查看mac地址)
  - [1.14. 部署项目至远程服务器](#114-部署项目至远程服务器)
    - [1.14.1. 连接远程linux服务器](#1141-连接远程linux服务器)
    - [1.14.2. Web服务器Nginx的安装](#1142-web服务器nginx的安装)
    - [1.14.3. Nginx的配置](#1143-nginx的配置)
    - [1.14.4. 上传项目到服务器](#1144-上传项目到服务器)
  - [1.15. Linux 安装`unzip`](#115-linux-安装unzip)
  - [1.16. Linux 安装`node`](#116-linux-安装node)
  - [1.17. Linux 安装 MongoDB](#117-linux-安装-mongodb)
  - [1.18. CentOS7 安装 MySQL](#118-centos7-安装-mysql)
  - [1.19. mysql修改用户密码的方法及命令](#119-mysql修改用户密码的方法及命令)
  - [1.20. 查看 crontab 任务是否执行以及执行日志](#120-查看-crontab-任务是否执行以及执行日志)
  - [1.21. 挂载](#121-挂载)

## 1. Linux 命令

### 1.1. 生成 SSH 密钥
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

### 1.2. unzip解压缩到其他目录

`unzip test.zip -d /tmp`


### 1.3. linux创建文件名添加当前系统日期时间的方法

使用`date +%y%m%d` 

举例：
```bash
mkdir `date +%y%m%d` 
```

注意：这个符号是键盘上`~`，而不是`'`.

重要说明点：那个日期`$(date +%Y%m%d)`的 `date`命令和后边的日期格式的`+`号之前有一个空格。直接连写生成不了日期

### 1.4. Vim 删除当前行
```vim
dd
```

### 1.5. Vim 设置行号 
```
:set number
```


### 1.6. Vim 搜索与取消搜索

在Vi里面如果要搜索某个关键字，只要在命令状态下键入`/xxx`就可以了，比如，我要搜索`port`的位置，我就键入：
```
/port
```
然后回车，一个文件中，所有出现这个字样的地方都会被高亮显示。按n键，就可以自动把光标跳到下一个。
但是，用好这个功能，怎么消除高亮呢，只要键入`:noh`就可以了

### 1.7. `df -h`和 `df -i`

- `df -h`查看磁盘使用情况
- `df -i` 查看inode使用情况


### 1.8. `sudo su` 和 `sudo -s`的区别
`sudo su` 和 `sudo -s`都是切换到root用户，不同的是：

- sudo su 环境用的是目标用户(root)的环境
- sudo -s 环境用的是当前用户本身的环境


### 1.9. `ps -ef`和`ps aux`的区别

- `-ef`是`System V`展示风格，而`aux`是`BSD`风格。
- `COMMAND`列如果过长，`aux`会截断显示，而ef不会
- 如果想查看进程的`CPU`占用率和内存占用率，可以使用`aux`
- 如果想查看进程的父进程`ID`和完整的`COMMAND`命令，可以使用`ef`


### 1.10. VScode 使用时会每次修改文件时提示没有权限的问题
```bash
sudo chown -R 当前用户  需要操作的文件夹路径
```
比如：

```bash
sudo chown -R liwz /Users/liwz/workspace/minicnypafe
```

### 1.11. mac 电脑在控制台输入`open .`即可打开`finder`的当前文件夹
用的工具是`iterm`

### 1.12. ifconfig 含义
```
lo0 = loopback

gif0 = Software Network Interface

stf0 = 6to4 tunnel interface

en0 = Ethernet 0

fw0 = Firewire

en1 = Ethernet 1

vmnet8 = Virtual Interface

vmnet1 = Virtual Interface
```
```
在较旧的Apple便携式設備上，en0是以太網，en1是機场（wiFi）。

帶有以太網插孔的旧版Mac Pro將具有en3以及两个以太網NIC和機场（wiFi）。

在没有以太網插孔的较新MacBook中，en0是機场（wiFi）。

vmnet#通常由VM（Parallels / VMware）建立
```
- 可以通過執行 `networksetup -listallhardwareports`查看某些設備的"系統偏好設置"中使用的名稱。
- `networksetup -listnetworkserviceorder`  产生類似的輸出，但它按照連線的順序顯示"網路服務列表"，或者以与系統偏好設備相同的順序顯示服務。
- `networksetup`  不包括 `vmnet1`等設備 和 `vmnet8`等`VMware`使用的設備。


参考资料：[有人可以在Mac OS X中解釋ifconfig輸出吗？](https://t.codebug.vip/questions-1079897.htm)

### 1.13. windows 电脑查看mac地址 

```
ipconfig/all
```


### 1.14. 部署项目至远程服务器

选择的是CentOS系统，版本在7.0以上

#### 1.14.1. 连接远程linux服务器

`Git bash`连接远程工具 

命令：`ssh user@remote_ip` 链接到远程服务器

除了`git bash`，大家还可以用`Xshell`,也很方便，或者直接通过远程桌面连接（方法：`windows键+R`；输入`mstsc`）


输入下面的命令，将公钥传送到远程主机host上面：
```bash
$ ssh-copy-id user@host
```
好了，从此你再登录，就不需要输入密码了。


#### 1.14.2. Web服务器Nginx的安装

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


#### 1.14.3. Nginx的配置

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
#### 1.14.4. 上传项目到服务器

`scp -r ./* root@47.94.255.230:/root/www`

没有scp命令的话，通过`yum install openssh-clients`安装



### 1.15. Linux 安装`unzip`
如果你如法使用`unzip`命令解压.zip文件，可能是你没有安装unzip软件，下面是安装方法

- 命令： `yum list | grep zip/unzip`  #获取安装列表
- 安装命令：`yum install zip`  #提示输入时，请输入y；
- 安装命令：`yum install unzip` #提示输入时，请输入y；

### 1.16. Linux 安装`node`
- 服务器安装`node`，解压安装包后，在`/etc/profile`文件`export path`语句前加上
```
PATH=$PATH:/home/kun/mysofltware/node-v0.10.26-linux-x64/bin
```
- 并`source /etc/profile`，使环境变量生效
- 然后`echo $PATH`，检查下有没有`node`的环境变量

 

- 或者`vim ~/.bash_profile`，找到`PATH=$PATH:$HOME/bin`，在后面添加路径：`/usr/local/src/node/bin`，注意冒号。
- 然后，`source ~/.bash_profile`


### 1.17. Linux 安装 MongoDB

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

### 1.18. CentOS7 安装 MySQL

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


### 1.19. mysql修改用户密码的方法及命令


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
```bash
mysql> SHOW VARIABLES LIKE 'validate_password%';
```


密码的长度是由`validate_password_length`决定的，而`validate_password_length`的计算公式是：
```bash
validate_password_length = 
validate_password_number_count + 
validate_password_special_char_count + 
(2 * validate_password_mixed_case_count)
```

我的是已经修改过的，初始情况下第一个的值是ON，`validate_password_length`是8。可以通过如下命令修改：
```bash
mysql> set global validate_password_policy=0;

mysql> set global validate_password_length=1;
```
设置之后就是我上面查出来的那几个值了，此时密码就可以设置的很简单，例如`1234`之类的。到此数据库的密码设置就完成了。

但此时还有一个问题，就是因为安装了`Yum Repository`，以后每次yum操作都会自动更新，需要把这个卸载掉：

```bash
$ yum -y remove mysql57-community-release-el7-10.noarch
```

### 1.20. 查看 crontab 任务是否执行以及执行日志
1. 查看 crontab 的日志
- 日志文件为`/var/log/cron`
- 找到对应时间，是否执行指令
- 这种方式只能看到是否执行，但是并无法确定是否执行成功

2. 将定时任务的日志重定向

日志重定向的时候要注意，要将标准错误日志一起重定向，才能获取到正常和错误的日志。
例如：
```
27 10 * * * /usr/bin/sh /opt/lyy/checkES.sh >>/opt/lyy/checkES.log 2>&1
```
```
2>&1, 表示将错误的日志（文件描述符为2）重定向到标准输出（文件描述符为1）中。

>>/opt/lyy/checkES.log，表示将标准输出（文件描述符为1）的日志重定向到文件 /opt/lyy/checkES.log 中，相当于 1>>/opt/lyy/checkES.log。
```

### 1.21. 挂载

1. `mount /dev/sdb1 ~/Share/ `，把新硬盘的区sdb1挂载到工作目录的`~/Share/`文件夹下，之后访问这个`~/Share/`文件夹就相当于访问这个硬盘2的`sdb1`分区了。对`/Share/`的任何操作，都相当于对`sdb1`里文件的操作。
2. 所以Linux下，mount挂载的作用，就是将一个设备（通常是存储设备）挂接到一个已存在的目录上。访问这个目录就是访问该存储设备。
3. linux操作系统将所有的设备都看作文件，它将整个计算机的资源都整合成一个大的文件目录。我们要访问存储设备中的文件，必须将文件所在的分区挂载到一个已存在的目录上，然后通过访问这个目录来访问存储设备。
4. 挂载就是把设备放在一个目录下，让系统知道怎么管理这个设备里的文件，了解这个存储设备的可读写特性之类的过程。
5. 我们不是有/dev/sdb1 吗，直接对它操作不就行了？这不是它的目录吗？
6. 这不是它的目录。虽然/dev是个目录，但/dev/sdb1不是目录。可以发现ls/dev/sdb1无法执行。/dev/sdb1，是一个类似指针的东西，指向这个分区的原始数据块。mount前，系统并不知道这个数据块哪部分数据代表文件，如何对它们操作。



磁盘的分区主要分为基本分区（`primary partion`）和扩充分区(`extension partion`)两种，基本分区和扩充分区的数目之和不能大于四个。且基本分区可以马上被使用但不能再分区。扩充分区必须再进行分区后才能使用，也就是说它必须还要进行二次分区。那么由扩充分区再分下去的是什么呢？它就是逻辑分区（`logical partion`），况且逻辑分区没有数量上限制。

在 Linux 中，每一个硬件设备都映射到一个系统的文件，对于硬盘、光驱等 IDE 或 SCSI 设备也不例外。Linux把各种 IDE 设备分配了一个由 hd 前缀组成的文件；而对于各种 SCSI 设备，则分配了一个由 sd 前缀组成的文件。

对于 ide 硬盘，驱动器标识符为“`hdx`”,其中“hd”表明分区所在设备的类型，这里是指ide硬盘了。“x”为盘号（a为基本盘，b为基本从属盘，c为辅助主盘，d为辅助从属盘）,“”代表分区，前四个分区用数字1到4表示，它们是主分区或扩展分区，从5开始就是逻辑分区。
例，hda3表示为第一个ide硬盘上的第三个主分区或扩展分区,hdb2表示为第二个ide硬盘上的第二个主分区或扩展分区。
对于scsi硬盘则标识为“sdx~”，scsi硬盘是用“sd”来表示分区所在设备的类型的，其余则和ide硬盘的表示方法一样，不在多说。

在 Linux 中规定，每一个硬盘设备最多能有 4个主分区（其中包含扩展分区）构成，任何一个扩展分区都要占用一个主分区号码，也就是在一个硬盘中，主分区和扩展分区一共最多是 4 个。

Linux 规定了主分区（或者扩展分区）占用 1 至 16 号码中的前 4 个号码。
- 以第一个 IDE 硬盘为例说明，主分区（或者扩展分区）占用了 hda1、hda2、hda3、hda4;
- 而逻辑分区占用了 hda5 到 hda16 等 12 个号码。
- 因此，Linux 下面每一个硬盘总共最多有 16 个分区。



`/dev/sda1`也只不过是某个物理硬盘如 `/dev/sda`的分区之一。 `/dev/sda`才代表是这一块物理硬盘



参考资料:
1. [Linux 磁盘管理](https://www.runoob.com/linux/linux-filesystem.html)