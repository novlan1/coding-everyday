- [1. 系统信息](#1-系统信息)
  - [1.1. uname](#11-uname)
  - [1.2. service](#12-service)
  - [1.3. last](#13-last)
  - [1.4. uptime](#14-uptime)
  - [1.5. w](#15-w)
  - [1.6. who](#16-who)
  - [1.7. whoami](#17-whoami)

# 1. 系统信息

## 1.1. uname

`uname`命令返回当前机器的信息。

```bash
# 内核的版本
$ uname -r
3.2.0-24-virtual

# CPU 架构
$ uname -m
x86_64

# 全部机器信息
$ uname -a
```

如果要了解操作系统的版本，可以查看`/etc/issue`文件。

```bash
$ cat /etc/issue
Debian GNU/Linux 9 \n \l
```

## 1.2. service

`service`命令可以查看当前正在运行的服务。

```bash
$ service --status-all
 [ + ]  apache2
 [ ? ]  atd
 [ - ]  bootlogd
```

上面代码中，`+`表示正在运行，`-`表示已经停止，`?`表示`service`命令不了解相关信息。


## 1.3. last

`last`命令显示用户登录系统的记录。

```bash
$ last
```

`last`命令后面加上用户名，会显示该用户上次登录的信息。

```bash
$ last yourUsername
```

## 1.4. uptime

`uptime`命令显示本次开机运行的时间。

## 1.5. w

`w`命令显示当期谁在线。


## 1.6. who

`who`命令显示已经登录的用户。

`-b`参数显示上一次系统启动的时间。

```bash
$ who -b
system boot  2017-06-20 17:41
```

## 1.7. whoami
显示当前操作用户


