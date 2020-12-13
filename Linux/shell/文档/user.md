- [1. 用户管理](#1-用户管理)
  - [1.1. id](#11-id)
  - [1.2. su](#12-su)
  - [1.3. sudo](#13-sudo)
  - [1.4. chown](#14-chown)
  - [1.5. chgrp](#15-chgrp)
  - [1.6. useradd](#16-useradd)
  - [1.7. usermod](#17-usermod)
  - [1.8. adduser](#18-adduser)
  - [1.9. groupadd](#19-groupadd)
  - [1.10. groupdel](#110-groupdel)
  - [1.11. passwd](#111-passwd)
  - [1.11.1. 用户帐号信息文件 `/etc/password`](#1111-用户帐号信息文件-etcpassword)
  - [1.11.2. 用户口令信息文件 `/etc/shadow`](#1112-用户口令信息文件-etcshadow)
  - [1.11.3. 用户组账号信息文件 `/etc/group`](#1113-用户组账号信息文件-etcgroup)
  - [1.11.4. 主要组和附属组](#1114-主要组和附属组)
  - [1.11.5. 特殊权限](#1115-特殊权限)
    - [1.11.5.1. ACL权限](#11151-acl权限)
      - [1.11.5.1.1. ACL权限在什么情况下使用？](#111511-acl权限在什么情况下使用)
    - [1.11.5.2. 文件特殊权限](#11152-文件特殊权限)
      - [1.11.5.2.1. SetUID](#111521-setuid)
    - [1.11.5.3. SetGIP](#11153-setgip)
    - [1.11.5.4. Sticky BIT](#11154-sticky-bit)
    - [1.11.5.5. 不可改变位权限](#11155-不可改变位权限)

# 1. 用户管理

## 1.1. id

`id`命令用于查看指定用户的用户名和组名。

```bash
$ id
uid=500(me) gid=500(me) groups=500(me)
```

`id`输出结果分为三个部分，分别是UID（用户编号和用户名）、GID（组编号和组名），groups（用户所在的所有组）。

用户帐户的信息，存放在`/etc/passwd`文件里面；用户组的信息，存放在`/etc/group`文件里面。

```bash
# 返回UID
$ id -u [UserName]

# 返回GID
$ id -g [UserName]

# 返回用户名
$ id -un [UserName]

# 返回组名
$ id -gn [UserName]
```

上面的命令，如果省略用户名，则返回当前用户的信息。

## 1.2. su

`su`命令允许你以另一个用户的身份，启动一个新的 shell 会话，或者是以这个用户的身份来发布一个命令。

```bash
$ su otherUser
```

执行上面的命令以后，系统会提示输入密码。通过以后，就以另一个用户身份在执行命令了。

如果不加用户名，则表示切换到root用户。

```bash
$ su
```

`-l`参数表示启动一个需要登录的新的Shell，这意味着工作目录会切换到该用户的主目录。它的缩写形式是`-`。

```bash
$ su -
```

上面命令表示，切换到root用户的身份，且工作目录也切换到root用户的主目录。

`-c`参数表示只以其他用户的身份，执行单个命令，而不是启动一个新的Session。

```bash
$ su -c 'command'

# 实例
$ su -c 'ls -l /root/*'
```

## 1.3. sudo

`sudo`命令很类似`su`命令，但有几点差别。

- 对于管理员来说，`sudo`命令的可配置性更高
- `sudo`命令通常只用于执行单个命令，而不是开启另一个Session。
- `sudo`命令不要求超级用户的密码，而是用户使自己的密码来认证。

`sudo`的设置在文件`/etc/sudoers`之中。

`-l`参数列出用户拥有的所有权限。

```bash
$ sudo -l
```

## 1.4. chown

`chown`命令用来更改文件或目录的所有者和用户组。使用这个命令需要超级用户权限。

```bash
$ chown [owner][:[group]] file
```

下面是一些例子。

```bash
# 更改文件所有者
$ sudo chown bob foo.txt

# 更改文件所有者和用户组
$ sudo chown bob:users foo.txt

# 更改用户组
$ sudo chown :admins foo.txt

# 更改文件所有者和用户组（用户 bob 登录系统时，所属的用户组）
$ sudo chown bob: foo.txt
```

## 1.5. chgrp

`chgrp`命令更改用户组，用法与`chown`命令类似。

举例：将ex1文件所属的用户组由`root`改为`staff`
```bash
chgrp staff ex1
```

## 1.6. useradd

`useradd`命令用来新增用户。

格式：
```
useradd [参数] <用户名>
```
参数：
- -d 指定用户登入时的主目录
- -e 账号终止日期
- -g 指定账户所属的用户组
- -G 指定账户所属的附加组
- -s 指定账户登录后所使用的shell
- -u 指定用户ID号


```bash
$ useradd -G admin -d /home/bill -s /bin/bash -m bill
```

上面命令新增用户`bill`，参数`-G`指定用户所在的组，参数`d`指定用户的主目录，参数`s`指定用户的 Shell，参数`m`表示如果该目录不存在，则创建该目录。

## 1.7. usermod

`usermod`命令用来修改用户的各项属性。

```bash
$ usermod -g sales jerry
```

上面的命令修改用户`jerry`属于的主要用户组为`sales`。

```bash
$ usermod -G sales jerry
```

上面的命令修改用户`jerry`属于的次要用户组为`sales`。

## 1.8. adduser

`adduser`命令用来将一个用户加入用户组。

```bash
$ sudo adduser username grouptoadd
```

## 1.9. groupadd

`groupadd`命令用来新建一个用户组。

```bash
$ sudo groupadd group1
$ sudo adduser foobar group1
```

## 1.10. groupdel

`groupdel`命令用来删除一个用户组。

```bash
$ sudo groupdel group1
```

## 1.11. passwd

`passwd`命令用于修改密码。

- `-l 用户名` 锁定用户 禁用
- `-u 用户名` 解锁用户
- `-d 用户名` 清除用户密码，可以无密码登录


```bash
# 修改自己的密码
$ passwd

# 修改其他用户的密码
$ sudo passwd [user]
```

## 1.11.1. 用户帐号信息文件 `/etc/password`
1. 文件中每一行为一个用户的信息
2. 文件中各字段从左到右依次为：用户名、口令、用户ID、用户组、全称、用户主目录和登录Shell。
3. 口令字段用x来填充，加密后的口令保存在`/etc/shadow`文件中。


## 1.11.2. 用户口令信息文件 `/etc/shadow`
`shadow` 文件只有超级用户才能查看并修改其内容，且加密存储



## 1.11.3. 用户组账号信息文件 `/etc/group`
1. 每一行为一个用户组信息
2. 文件中各字段从左到右依次为：用户组名、口令、用户组ID和附加用户列表。
3. 用户组口令信息文件`/etc/gshadow`，同`/etc/shadow`


## 1.11.4. 主要组和附属组
1. 用户可以同时属于多个组，一个是主要组，其他的为附属组
2. 添加附属组：`gpasswd -a 用户名 附属组，附属组，.....`
3. `usermod -g`修改主要组

用户创建的文件默认为主要组；需要以附属组创建文件的，需将身份切换到附属组
`newgrp boss`(需要用户登录后，自己执行，切换，组密码是在组切换时用的，如果有会要求输入组密码）

- 删除附属组： `gpasswd -d 用户名 附属组`
- 创建用户同时指定主要组和附属组： `useradd -g group1 -G group2,group3,....`
- 设定组密码： `gpasswd 用户组`，输入后回车，会有提示让输入密码
  
其他：
- `id 用户名`//显示指定用户信息，包括用户编号、用户编号、主要组编号及名称、附属组列表
- `su 用户名` //切换到其他用户下   su cls
- `su` 后面什么也不接//表示切换到root用户下
- `whoami`//显示当前登录用户名
- `groups 用户名` //显示用户所在的所有组，包括主要组和附属组
- `chfn 用户名` //设置用户资料，依次输入用户资料
- `finger 用户名` //显示用户详细资料

其他：
- `w` 查看用户信息 （有系统资源）
  - `load average: x.xx x.xx x.xx` 表示系统在1分钟内 5分钟内 15分钟内的平均负载（CPU 内存）
  - `tty`：终端 tty1本机终端 pts/0第一个远程终端 
  - `IDLE`：用户闲置时间 
  - `WHAT`:用户正在执行命令
- `who` 查看用户信息（简化）
- `last` 查询当前登陆和过去登陆用户信息 （可以看到reboot时间）实际是查看`/var/log/wtmp` 但必须用 last 命令才能看(防止人为修改)
- `lastlog` 查看所有用户最后一次登陆时间 `/var/log/lastlog` 不能直接看 也是用 lastlog 看

使用`pkill -kill -t pts/0`命令踢出第一个用户，即强制下线。-kill就是-9，-9和-t不能颠倒顺序



## 1.11.5. 特殊权限
### 1.11.5.1. ACL权限
文件就三个权限
- 所有者权限 
- 组权限 
- 其他权限

有时候不够用 这时候就需要ACL权限 用来解决用户身份不够的问题


#### 1.11.5.1.1. ACL权限在什么情况下使用？
当要给一个用户与文件属主、属组、其他人权限都不相同的时候使用，也就是说，这个用户对于这个文件不属于三种身份的任何一种，是属于第四种身份，那么我们就需要使用ACL权限去给他赋予单独的权限。（比如班级中来了其他人）


查看分区ACL权限是否开启
```
dumpe2fs -h /dev/sda5
```
- dumpe2fs命令是查询指定分区详细文件系统信息的命令
- -h  仅显示超级块中信息，而不显示磁盘块的详细信息


文件信息里项：
```
Default mount options: user_xattr acl
```
那就说明分区是支持acl的


临时开启分区ACL权限
```
mount -o remount,acl /
#重新挂载根分区，并挂载加入acl权限
```


永久开启分区ACL权限
```
vi /etc/fstab

UUID=c2ca6f57-b15c-43ea=bca0-f239083d8bd2 / ext4 defaults,acl 1（＃启动是否需要检测） 1(#启动是否需要备份)
#加入acl

mount -o remount /
#重新挂载文件系统或重启系统，使修改生效
```

- getfacl 文件名     // 查看acl权限；
- setfacl 选项 文件名     // 设定ACL权限的命令；
选项：
  - -m：设定ACL权限；
  - -x：删除指定的ACL权限；
  - -b：删除所有的ACL权限；
  - -d：设定默认ACL权限；
  - -k：删除默认ACL权限；
  - -R：递归设定ACL权限；


为用户设定ACL权限
```
setfacl -m u:用户名:权限(rwx) 文件名
```
如 `setfacl -m u:ly:rwx hello.log（两个冒号）`

为用户组设定ACL权限
```
setfacl -m g:组名:权限(rwx) 文件名
```



最大有效权限mask（使用命令`getfacl` 文件名显示的结果中倒数第二排会出现 mask 这个词）mask是用来指定最大有效权限的。如果我给用户赋予了 acl 权限，是需要和mask的权限“相与”才能得到用户的真正权限。
※最大权限也会影响到组权限
（例：某文件所有者为 tony，chmod 赋予的普通权限为7，而 acl 赋予 tony 的权限为5，则 acl 权限会高于 chmod 权限）
1. 修改mask值的命令 `setfacl -m m:rx 文件`  如 `setfacl -m m:rx hello.log（一个冒号）`
    - 一般最大权限`mask`是`rwx`
2. 删除acl权限的命令 
    - `setfacl -x u:用户名 文件` （删除指定用户的acl权限）
    - `setfacl -x g:组名 文件` （删除指定用户组的acl权限） 
    - `setfacl -b 文件` （删除所有的acl权限）


1. 递归ACL：指在给父目录赋予权限的同时，给已经存在于目录下的文件赋予相同的权限
```
setfacl -m u:用户名:权限 -R 目录名 # 这里R表示递归
```

注意： 
(1) 用递归的方式容易导致文件权限溢出（权限超过预想的范围，原因是目录权限和文件权限不一样，目录`x`进入和文件`x`执行）
(2) 递归acl只能用在目录而不能用于普通文件

2.默认 ACL 权限： 给父目录下将来新建的文件默认赋予父目录的权限
```
setfacl -m d:u:用户名：权限 目录名 # 这里d 表示default
```


`sudo su` 和 `sudo -s`都是切换到root用户，不同的是：
- `sudo su` 环境用的是目标用户(root)的环境
- `sudo -s` 环境用的是当前用户本身的环境


### 1.11.5.2. 文件特殊权限
#### 1.11.5.2.1. SetUID
一、设定SetUID方法
```
   4代表SUID
   chmod 4755 文件名
   chmod u+s 文件名
```

取消SetUID：

```
chmod 0755 文件名
chomd u-s 文件名
```
二、SetUID功能
1. 只有可执行二进制程序才能设定 SUID 权限
2. 命令执行者要对该程序拥有`x`(执行)权限（如果当前文件没有执行权限，则会出现大`S`权限，大`S`权限是无效的，`s=S+x`，`s`才是超级权限。）
3. 命令执行者在执行该程序时获得该程序文件属主身份
4. SetUID 权限只在程序执行过程中有效

`passwd`拥有`SetUID`权限，所以普通用户可以修改自己密码（/`usr/bin/passwd` 权限是`-rwsr-xr-x`  所以普通用户执行`passwd`命令时，获得最大权限，即 root 权限）
cat、vi命令没有`SetUID`权限，所以普通用户不能查看`/etc/shadow`文件内容




定期检查suid
```
#!/bin/bash
find / -perm -4000 -o -perm -2000> /tmp/setuid.check
for i in $(cat /tmp/setuid.check)
        do
        grep $i /home/suid.log> /dev/null
                if [ "$?" != "0" ]
                then
                echo "$i isn't in listfile!">>/home/suid_log_$(date +%F)
                fi
        done
rm -rf /tmp/setuid.check
```

赋予SetUID给vi等命令十分危险，普通用户就可以密码等文件了


### 1.11.5.3. SetGIP
SetUID只针对文件，SetGIP可以针对文件和目录

1. SetGID针对文件的作用
    - 只有可执行二进制程序才能设定 SGID 权限
    - 命令执行者要对该程序拥有`x`(执行)权限
    - 命令执行执行程序时，组身份升级为该程序文件的属组
    - SetGID 权限只在程序执行过程中有效

例子 `/usr/bin/locate`具有SetGID身份(`-rwx—s--x`), (`locate`搜索的数据库是`/var/lib/mlocate/mlocate.db` 权限为`-rw-r-----`，普通用户执行`locate`时变成其所属组)

2. SetGID针对目录的作用
    - 普通用户必须对此目录必须拥有`r`和`x`权限，才能进入此目录
    - 普通用户在此目录中的有效组会变成此目录的属组
    - 若普通用户对此目录拥有w权限,新建的文件的默认属组是这个目录的属组

3. 设定SetGID
```
chmod g+s 文件名
chmod 2755 文件名
```

4.取消SetGID
```
chmod g-s 文件名
chmod 0755 文件名
```



### 1.11.5.4. Sticky BIT
SBIT 也叫粘着位权限

SBIT粘着位权限
1. 粘着位目前只对目录有效
2. 普通用户对该目录拥有`w`和`x`权限，即普通用户可以在此目录有写入权限
3. 如果没有粘着位，因为普通用户拥有w权限，所以可以删除此目录下所有文件，包括其他用户建立的文件。
4. 一旦赋予了粘着位，除了`root`可以删除所有文件，普通用户就算有w权限，也只能删除自己建立的文件，但是不能删除其他用户建立的文件


设置粘着位：
```
chmod 1755 目录名
chmod o+t 目录名
```

取消粘着位：

```
chmod 0777 目录名
chmod o-t 目录名
```

`/tmp`权限为`drwxrwxrxt`，运行所有用户增删改查，但是普通用户不能删除其他用户建立的文件



### 1.11.5.5. 不可改变位权限
chattr命令格式

```
charrt [+-=][选项] 文件或目录
```

- +:增加权限
- -：删除权限
- =:等于某权限

选项包括i和a （`insert`和`append`）
`i`:
- 如果对文件设置 i 属性,那么不允许对文件进行删除，改名也不能添加和修改数据；
- 如果对目录设置i属性，那么只能修改目录下文件的数据，但不能建立和删除文件。（锁定）

`a`:
- 如果对文件设置a属性，那么只能在文件中增加数据，但不能删除也不能修改数据
- 如果对目录设置a属性，那么只允许在目录中建立和修改文件，但不允许删除



总结：
1. setUID 和 setGID 让普通用户在执行命令瞬间拥有`root`权限。粘着位让用户不能删除其他用户创建的文件。
2. setUID、setGID 和粘着位，分别在所有者、所属组、其他人的最后一个位置上有区别。
3. setUID 和 setGID 是 `x` 变成了 `s` ，粘着位是 `x` 变成了 `t`。
4. 典型代表分别是`passwd`、`locate`命令和`tmp`文件夹。
5. 三个命令分别是`chmod 4755 2755 1755 文件/目录`
6. 不可改变位权限不能通过ls看出来，需要通过`lsattr`看出来。修改命令是`chattr [+-=][i/a]文件/目录`。作用是锁定文件
7. ACL权限用来解决用户身份不够的问题，查看方法：`getfacl 文件/目录`，设置：`setfacl -m/-b-x ...`



