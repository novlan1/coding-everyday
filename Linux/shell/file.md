# 文件系统

## pwd

`pwd`命令显示列出当前所在的目录。

```bash
$ pwd
```

## cd

`cd`命令用来改变用户所在的目录。

```bash
# 进入用户的主目录
$ cd

# 进入前一个工作目录
$ cd -

# 进入指定用户的主目录
$ cd ~user_name

# (两个点) 回到上一级
cd ..  
```

## ls

`ls`目录可以显示指定目录的内容。不加参数时，显示当前目录的内容。

```bash
$ ls
```

上面命令显示当前目录的内容。

`ls`命令也可以显示指定文件是否存在。

```bash
$ ls foo.txt
foo.txt
```

`-l`参数可以显示文件的详细信息。

```bash
$ ls -l foo.txt
-rw-rw-r-- 1 me   me   0 2016-03-06 14:52 foo.txt
```

上面命令输出结果的第一栏，是文件的类型和权限。

文件类型分为以下几种。

- `-` 普通文件
- `d` 目录
- `l` 符号链接。注意，对于符号链接文件，剩余的文件属性总是"rwxrwxrwx"。
- `c` 字符设备文件，指按照字节流处理数据的设备，比如调制解调器。
- `b` 块设备文件，指按照数据块处理数据的设备，比如硬盘。

其他参数的用法。

```bash
# 显示多个目录的内容
$ ls ~ /usr

# -a --all 显示隐藏文件
$ ls -a

# -A 与-a类似，但是不显示当前目录和上一级目录两个点文件
$ ls -A

# -l 显示详细信息
$ ls -l

# -1 单列显示，每行只显示一个文件
$ ls -1

# -d 显示当前目录本身，而不是它的内容
# 通常与-l配合使用，列出一个目录本身的详细信息
$ ls -dl

# -F 目录名之后添加斜杠，可执行文件后面添加星号
$ ls -F

# -h 与-l配合使用，将文件大小显示为人类可读的格式

# -t 按文件修改时间排序，修改晚的排在前面
$ ls -t

# -i 显示inode
$ ls -i

# -s 按文件大小排序，

# --reverse 显示结果倒序排列
$ ls -lt --reverse
```

如果只显示一个目录里面的子目录，不显示文件，可以使用下面这些命令。

```bash
# 只显示常规目录
$ ls -d */
$ ls -F | grep /
$ ls -l | grep ^d
$ tree -dL 1

# 只显示隐藏目录
$ ls -d .*/

# 隐藏目录和非隐藏目录都显示
$ find -maxdepth 1 -type d
```

另一个简便方法是利用自动补全功能，先键入`cd`命令，然后连按两下`tab`键。

## stat

`stat`命令是加强版的`ls`命令，可以显示一个文件的详细信息。

```bash
$ stat timestamp
File: 'timestamp'
Size: 0 Blocks: 0 IO Block: 4096 regular empty file
Device: 803h/2051d Inode: 14265061 Links: 1
Access: (0644/-rw-r--r--) Uid: ( 1001/ me) Gid: ( 1001/ me)
Access: 2008-10-08 15:15:39.000000000 -0400
Modify: 2008-10-08 15:15:39.000000000 -0400
Change: 2008-10-08 15:15:39.000000000 -0400
```

## touch

`touch`用来设置或更新文件的访问，更改，和修改时间。然而，如果一个文件名参数是一个 不存在的文件，则会创建一个空文件。

```bash
$ touch timestamp
```

上面命令创建了一个名为`timestamp`空文件。如果该文件已经存在，就会把它的修改时间设置为当前时间。

```bash
$ mkdir -p playground/dir-{00{1..9},0{10..99},100}
$ touch playground/dir-{00{1..9},0{10..99},100}/file-{A..Z}
```

上面的命令创建了一个包含一百个子目录，每个子目录中包含了26个空文件。

## file

`file`命令显示指定文件的类型。

```bash
$ file picture.jpg
picture.jpg: JPEG image data, JFIF standard 1.01

$ file index.html
index.html: HTML document, ASCII text
```

file 工具可以对所给的文件一行简短的介绍，它用文件后缀、头部信息和一些其他的线索来判断文件。你在检查一堆你不熟悉的文件时使用 find 非常方便：

```bash
$ find -exec file {} \;
.:            directory
./hanoi:      Perl script, ASCII text executable
./.hanoi.swp: Vim swap file, version 7.3
./factorial:  Perl script, ASCII text executable
./bits.c:     C source, ASCII text
./bits:       ELF 32-bit LSB executable, Intel 80386, version ...
```

## chmod

`chmod`命令用于更改文件的权限，是“change mode”的缩写。

格式：
```
chmod <模式> <文件>
```
```bash
$ chmod 600 foo.txt
```

上面命令将`foo.txt`的权限改成了600。

`chmod`还可以接受四个缩写，为不同的对象单独设置权限。

- `u` 所有者“user”的简写
- `g` 用户组“group”的缩写
- `o` 其他所有人“others”的简写
- `a` 所有人“all”的简写

```bash
# 为所有者添加可执行权限
$ chmod u+x foo.txt

# 删除所有者的可执行权限
$ chmod u-x foo.txt

# 为所有人添加可执行权限，等价于 a+x
$ chmod +x foo.txt

# 删除其他人的读权限和写权限。
$ chmod o-rw foo.txt

# 设定用户组和其他人的权限是读权限和写权限
$ chmod go=rw foo.txt

# 为所有者添加执行权限，设定用户组和其他人为读权限和写权限，多种设定用逗号分隔
$ chmod u+x,go=rw foo.txt
```

添加权限。

- +x 添加执行权限
- +r 设置读权限
- +w 设置写权限
- +rwx 设置所有读、写和执行权限。

删除权限只需将`+`更改为`-`，就可以删除任何已设置的指定权限。可以使用`-R`（或`--recursive`）选项来递归地操作目录和文件。

设置精确权限，可以使用`=`代替`+`或`-`来实现此操作。如果想为用户、组或其他用户设置不同的权限，可以使用逗号将不同表达式分开（例如`ug=rwx,o=rx`）。

由于一共有3种可能的权限。也可以使用八进制数代替符号来设置权限。通过这种方式设置的权限最多使用3个八进制数。第1个数定义用户权限，第2个数定义组权限，第3个数定义其他权限。这3个数中的每一个都通过添加想要的权限设置来构造：读 (4)、写 (2) 和执行 (1)。

- rwx	7
- rw-	6
- r-x	5
- r--	4
- -wx	3
- -w-	2
- --x	1
- ---	0

## umask

`umask`用来查看和设置权限掩码。

```bash
$ umask
0022
```

上面命令显示当前系统之中，默认的文件掩码是`0022`，转为二进制就是`000 000 010 010`。

可以看到，这个掩码是一个12位的二进制数，后面的9位分别代表文件三种使用对象的三类权限。只要对应位置上是`1`，就表示关闭该项权限，所以`010`就表示关闭读权限。

新建文件时，通常不会带有执行权限，也就是说，新建文件的默认权限是`rw-rw-rw-`。如果文件掩码是`0022`，那么用户组和其他人的写权限也会被拿掉。

```bash
$ touch new.txt
$ ls -l new.txt
-rw-r--r-- 1 me   me   0 2016-03-06 14:52 new.txt
```

上面代码中，`new.txt`的用户组和其他人的写权限就没了。

`umask`后面跟着参数，就表示设置权限掩码。

```bash
$ umask 0000
```

上面命令将权限掩码设为`0000`，实际上就是关闭了权限掩码。

`umask`命令设置的掩码值只能在当前Shell会话中生效，若当前Shell会话结束后，则必须重新设置。

## du

`du`命令显示某个文件或目录的磁盘使用量。

```bash
$ du filename
```

`-h`参数将返回的大小显示为人类可读的格式，即显示单位为 K、M、G 等。

`-s`参数表示总结（summarize），否则会显示该目录内所有文件和子目录的信息。

`-x`参数表示不显示不在当前分区的目录，通常会忽略`/dev`、`/proc`、`/sys`等目录。

`-c`参数表示显示当前目录总共占用的空间大小。

```bash
# 显示根目录下各级目录占用的空间大小
$ sudo du -shxc /*
```

`--exclude`参数用于排除某些目录或文件。

```bash
$ sudo du -shxc /* --exclude=proc
$ sudo du -sh --exclude=*.iso
```

`--max-depth`参数用于设定目录大小统计到第几层。如果设为`-–max-depth=0`，那么等同于`-s`参数。

```bash
$ sudo du /home/ -hc --max-depth=2
```

`tree`命令也可以显示子目录大小。

```bash
$ tree --du -h /path/to/directory
```

## md5sum

`md5sum`命令用来显示一个文件的md5校验码。

```bash
$ md5sum image.iso
34e354760f9bb7fbf85c96f6a3f94ece    image.iso
```

## locate

`locate`程序快速搜索本机的路径名数据库，并且输出每个与给定字符串相匹配的文件名。

```bash
$ locate bin/zip
/usr/bin/zip
/usr/bin/zipcloak
/usr/bin/zipgrep
/usr/bin/zipinfo
/usr/bin/zipnote
/usr/bin/zipsplit
```

`locate`数据库由另一个叫做`updatedb`的程序创建。大多数装有 locate 的系统会每隔一天运行一回 updatedb 程序。因为数据库不能被持续地更新，所以当使用 locate 时，你会发现 目前最新的文件不会出现。为了克服这个问题，可以手动运行 updatedb 程序， 更改为超级用户身份，在提示符下运行 updatedb 命令。

locate 命令所搜索的后台数据库
```
/var/lib/mlocate (保存的搜索数据库)
```

`locate`支持正则查找。`--regexp`参数支持基本的正则表达式，`--regex`参数支持扩展的正则表达式。

```bash
$ locate --regex 'bin/(bz|gz|zip)'
```

缺点：只能按照文件名进行搜索，但常用。

配置文件
```
/etc/updatedb.conf 配置文件
```
```
PRUNE_BIND_MOUNTS = "yes"
#开启搜索限制，yes为后面三项都生效。no为 后面三项都不生效

PRUNEFS = 
#搜索时，不搜索的文件系统

PRUNENAMES =
#搜索时，不搜索的文件类型

PRUNEPATHS =
#搜索时，不搜索的路径
```

#### centos系统找不到locate命令（locate: command not found）

解决方法：
1. 安装mlocate包
    - yum -y install mlocate
2. 更新数据库
    - updatedb


## find

`locate`程序只能依据文件名来查找文件，而`find`程序能基于各种各样的属性，搜索一个给定目录（以及它的子目录），来查找文件。

格式：
```
find 路径 [参数]
```

```bash
# 输出当前目录的所有子目录和文件（含子目录）
$ find
$ find .

# 显示当前目录的文件总数
$ find . | wc -l

# 当前目录的子目录总数
$ find . -type d | wc -l

# 当前目录的文件总数（不含子目录）
$ find . -type f | wc -l

# 当前目录的文件名匹配“*.JPG”且大于1M的文件总数
$ find . -type f -name "\*.JPG" -size +1M | wc -l
```

如果不带任何参数，`find`文件会列出当前目录的所有文件，甚至还包括相对路径。如果把结果导入 sort 效果更好。

```bash
$ find | sort
.
./Makefile
./README
./build
./client.c
./client.h
./common.h
./project.c
./server.c
./server.h
./tests
./tests/suite1.pl
./tests/suite2.pl
./tests/suite3.pl
./tests/suite4.pl
```

如果想要 ls -l 样式的列表，只要在 find 后面加上 -ls。

```bash
$ find -ls
```

find 有它自己的一套复杂的过滤语句。下面列举的是一些最常用的你可以用以获取某些文件列表的过滤器：

- find -name '*.c' —— 查找符合某 shell 式样式的文件名的文件。用 iname 开启大小写不敏感搜索。
- find -path '*test*' —— 查找符合某 shell 式样式的路径的文件。用 ipath 开启大小写不敏感搜索。
- find -mtime -5 —— 查找近五天内编辑过的文件。你也可以用 +5 来查找五天之前编辑过的文件。
- find /home -mtime +10 —— 在home目录下，查找10天前修改的文件
- find /home -mtime 10 —— 在home目录下，查找10天前当天修改的文件
- find /home -mtime -10 —— 在home目录下，查找10天内修改的文件
  - atime 文件访问时间
  - ctime 修改文件属性
  - mtime 修改文件内容

- find -newer server.c —— 查找比 server.c 更新的文件。
- find -type d —— 查找所有文件夹。如果想找出所有文件，那就用 `-type f`；找符号连接就用 `-type l`。


要注意，上面提到的这些过滤器都是可以组合使用的，例如找出近两天内编辑过的 C 源码：

```bash
$ find -name '*.c' -mtime -2
```
查找 /etc 目录下，大于20kb并且小于50kb的文件
```bash
find /etc -size +20k -a -size -50k
```

默认情况下， find 对搜索结果所采取的动作只是简单地通过标准输出输出一个列表，然而其实还有其他一些有用的后续动作。

- -ls —— 如前文，提供了一种类 ls -l 式的列表。
- -delete —— 删除符合查找条件的文件。
- -exec —— 对搜索结果里的每个文件都运行某个命令， `{}`会被替换成适当的文件名，并且命令用`\;`终结。

```bash
$ find -name '*.pl' -exec perl -c {} \;
```
```
find /etc -size +20k -a -size -50k -exec ls -lh {} \;  # 后面加上分号，省的当成转义
```
`-exec {} \;` 固定格式，表示直接对前面的搜索结果进行后面的命令处理
-size 必须带单位，否则就是按照扇区搜，25就是25*512k，太大了


- -25k  小于 25kb 的文件
- 25k  等于 25kb 的文件
- +25k  大于 25kb 的文件


你也可以使用`+`作为终止符来对所有结果运行一次命令。我还发现一个我经常使用的小技巧，就是用 find 生成一个文件列表，然后在 Vim 的垂直分窗中编辑：

```bash
$ find -name '*.c' -exec vim {} +
```

`-type`参数支持的文件类型。

- `b`	块设备文件
- `c`	字符设备文件
- `d`	目录文件
- `f`	普通文件
- `l`	符号链接
- `s`   套接字
- `p`   FIFO管道文件

`-size`参数支持的文件大小类型。

- b	512 个字节块。如果没有指定单位，则这是默认值。
- c	字节
- w	两个字节的字
- k	千字节
- M	兆字节
- G	千兆字节

`find`程序支持的查询参数。

- `-cmin n`	匹配的文件和目录的内容或属性最后修改时间正好在 n 分钟之前。 指定少于 n 分钟之前，使用 -n，指定多于 n 分钟之前，使用 +n。
- `-cnewer file`	匹配的文件和目录的内容或属性最后修改时间早于那些文件。
- `-ctime n`	匹配的文件和目录的内容和属性最后修改时间在 n\*24小时之前。
- `-empty`	匹配空文件和目录。
- `-group name`	匹配的文件和目录属于一个组。组可以用组名或组 ID 来表示。
- `-iname pattern`	就像-name 测试条件，但是不区分大小写。
- `-inum n`	匹配的文件的 inode 号是 n。这对于找到某个特殊 inode 的所有硬链接很有帮助。
- `-mmin n`	匹配的文件或目录的内容被修改于 n 分钟之前。
- `-mtime n`	匹配的文件或目录的内容被修改于 n\*24小时之前。
- `-name pattern`	用指定的通配符模式匹配的文件和目录。
- `-newer file`	匹配的文件和目录的内容早于指定的文件。当编写 shell 脚本，做文件备份时，非常有帮助。 每次你制作一个备份，更新文件（比如说日志），然后使用 find 命令来决定自从上次更新，哪一个文件已经更改了。
- `-nouser`	匹配的文件和目录不属于一个有效用户。这可以用来查找 属于删除帐户的文件或监测攻击行为。
- `-nogroup`	匹配的文件和目录不属于一个有效的组。
- `-perm mode`	匹配的文件和目录的权限已经设置为指定的 mode。mode 可以用 八进制或符号表示法。
- `-samefile name`	相似于-inum 测试条件。匹配和文件 name 享有同样 inode 号的文件。
- `-size n`	匹配的文件大小为 n。
- `-type c`	匹配的文件类型是 c。
- `-user name`	匹配的文件或目录属于某个用户。这个用户可以通过用户名或用户 ID 来表示。
- `-depth`	指导 find 程序先处理目录中的文件，再处理目录自身。当指定-delete 行为时，会自动 应用这个选项。
- `-maxdepth levels`	当执行测试条件和行为的时候，设置 find 程序陷入目录树的最大级别数
- `-mindepth levels`	在应用测试条件和行为之前，设置 find 程序陷入目录数的最小级别数。
- `-mount`	指导 find 程序不要搜索挂载到其它文件系统上的目录。
- `-regex` 指定正则表达式

```bash
# 找出包括空格或其它不规范字符的文件名或路径名
$ find . -regex '.*[^-\_./0-9a-zA-Z].*'
```

`find`程序还支持逻辑操作符。

- `-and`	如果操作符两边的测试条件都是真，则匹配。可以简写为 -a。 注意若没有使用操作符，则默认使用 -and。
- `-or`	若操作符两边的任一个测试条件为真，则匹配。可以简写为 -o。
- `-not`	若操作符后面的测试条件是真，则匹配。可以简写为一个感叹号（!）。
- `()`	把测试条件和操作符组合起来形成更大的表达式。这用来控制逻辑计算的优先级。注意 因为圆括号字符对于 shell 来说有特殊含义，所以在命令行中使用它们的时候，它们必须 用引号引起来，才能作为实参传递给 find 命令。通常反斜杠字符被用来转义圆括号字符。

```bash
# 或关系
( expression 1 ) -or ( expression 2 )

# 找出不是600权限的文件，或者不是700权限的目录
$ find ~ \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)
```

`find`程序的逻辑表达式，具有“短路运算”的特点，即对于`expr1 -operator expr2`这个表达式，`expr2`不一定执行。这是为了提高运行速度。

- expr1 为真，且操作符为`-and`，expr2 总是执行
- expr1 为假，且操作符为`-and`，expr2 从不执行
- expr1 为真，且操作符为`-or`，expr2 从不执行
- expr1 为假，且操作符为`-or`，expr2 总是执行

为了方便执行一些常见操作，`find`程序定义了一些预定义操作。

- -delete	删除当前匹配的文件。
- -ls	对匹配的文件执行等同的 ls -dils 命令。并将结果发送到标准输出。
- -print	把匹配文件的全路径名输送到标准输出。如果没有指定其它操作，这是 默认操作。
- -quit	一旦找到一个匹配，退出。

```bash
# 找到匹配的文件，并显示在标准输出
# -print 是默认操作，可以省略
$ find . -print

# 删除后缀名为BAK的文件
# 执行 delete 操作前，最好先执行 print 操作，确认要删除哪些文件
$ find . -type f -name '*.BAK' -delete
```

预定义操作可以与逻辑表达式，结合使用。

```bash
$ find ~ -type f -and -name '*.BAK' -and -print
```

除了预定义操作以外，用户还可以使用`-exec`参数自定义操作。

```bash
-exec command {} ;
```

上面的命令中，`command`是一个命令行命令，`{}`用来指代当前路径，分号表示命令结束。

```bash
# 预定义的 -delete 操作，等同于下面的操作
-exec rm '{}' ';'
```

`-exec`使用时，每次找到一个匹配的文件，会启动一个新的指定命令的实例。

```bash
$ find ~ -type f -name 'foo*' -exec ls -l '{}' ';'
```

执行上面的命令，`ls`程序可能会被调用多次。

```bash
$ ls -l file1
$ ls -l file2
```

如果想改成`ls`程序只调用一次，要把`find`命令里面的分号，改成加号。

```bash
$ ls -l file1 file2
# 相当于
$ find ~ -type f -name 'foo*' -exec ls -l '{}' +
```

## xargs

`xargs`命令从标准输入接受输入，并把输入转换为一个特定命令的参数列表。

```bash
$ find ~ -type f -name 'foo\*' -print | xargs ls -l
```
