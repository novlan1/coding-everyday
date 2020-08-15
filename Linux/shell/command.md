# Shell 的命令

## 命令的类别

Bash可以使用的命令分成四类。

- 可执行程序
- Shell 提供的命令
- Shell 函数
- 前三类命令的别名

## type, whatis

`type`命令可以显示命令类型。

```bash
$ type command
```

下面是几个例子。

```bash
$ type type
type is a shell builtin

$ type ls
ls is aliased to `ls --color=tty'

$ type cp
cp is /bin/cp
```

`whatis`命令显示指定命令的描述。

```bash
$ whatis ls
ls (1) - list directory contents
```

## apropos

`apropos`命令返回符合搜索条件的命令列表。

```bash
$ apropos floppy
create_floppy_devices (8) - udev callout to create all possible
fdformat (8) - Low-level formats a floppy disk
floppy (8) - format floppy disks
gfloppy (1) - a simple floppy formatter for the GNOME
mbadblocks (1) - tests a floppy disk, and marks the bad
mformat (1) - add an MSDOS filesystem to a low-level
```

## alias, unalias

`alias`命令用来为命令起别名。

```bash
$ alias foo='cd /usr; ls; cd -'

$ type foo
foo is aliased to `cd /usr; ls ; cd -'
```

上面命令指定`foo`为三个命令的别名。以后，执行`foo`就相当于一起执行这三条命令。

注意，默认情况下，别名只在当前Session有效。当前Session结束时，这些别名就会消失。

`alias`命令不加参数时，显示所有有效的别名。

```bash
$ alias
alias l.='ls -d .* --color=tty'
alias ll='ls -l --color=tty'
alias ls='ls --color=tty'
```

`unalias`命令用来取消别名。

```bash
$ unalias foo
$ type foo
bash: type: foo: not found
```

## which

`which`命令显示可执行程序的路径。

`which`命令根据`PATH`环境变量指定的顺序，返回最早发现某个命令的位置。即不指定路径时，实际执行的命令的完整路径。

```bash
$ which ls
/bin/ls
```

`which`命令用于Shell内置命令时（比如`cd`），将没有任何输出。

不仅能看到命令的路径，如果有别名，还能看到别名）
```
$ which ls
alias ls='ls --color=auto'
        /usr/bin/ls
```


## whereis

`whereis`用来显示某个命令的位置。如果有多个程序符合条件，会全部列出。

```bash
$ whereis node
/usr/bin/node /usr/sbin/node
```

## help，man

`help`命令用于查看Shell内置命令的帮助信息，`man`命令用于查看可执行命令的帮助信息。

```bash
$ help cd
$ man ls
```

`man`里面的文档一共有8类，如果同一个命令，匹配多个文档，`man`命令总是返回第一个匹配。如果想看指定类型的文档，命令可以采用下面的形式。

```bash
$ man 5 passwd
```

man的级别：
1. 查看命令的帮助 
2. 查看可被内核调用的函数的帮助
3. 查看函数和函数库的帮助
4. 查看特殊文件的帮助（主要是/dev目录下的文件）
5. 查看配置文件的帮助
6. 查看游戏的帮助
7. 查看其它杂项的帮助
8. 查看系统管理员可用命令的帮助
9. 查看和内核相关文件的帮助

- man -f 命令 相当于 whatis 命令
- man -k 命令 相当于 apropos 命令 搜索含有关键词“命令”的帮助文档，相关就能搜索到

### info 
info里面内容十分繁琐，是关于命令的一个巨大的帮助文档，里面有各个版本对于此命令
的说明。
- -回车：进入带*号的说明
- -u: 进入上层页面
- -n: 进入下一个帮助小节
- -p: 进入上一个帮助小节
- -q: 退出

## script

`script`命令会将输入的命令和它的输出，都保存进一个文件。

```bash
$ script [file]
```

如果没有指定文件名，则所有结果会保存进当前目录下`typescript`文件。结束录制的时候，可以按下`Ctrl + d`。

## export

`export`命令用于将当前进程的变量，输出到所有子进程。

```bash
$ export hotellogs="/workspace/hotel-api/storage/logs"
```

然后执行下面的命令，新建一个子 Shell。

```bash
$ bash
$ cd hotellogs
```

上面命令的执行结果会进入`hotellogs`变量指向的目录。

`export`命令还可以显示所有环境变量。

```bash
$ export
SHELL=/bin/zsh
AWS_HOME=/Users/adnanadnan/.aws
LANG=en_US.UTF-8
LC_CTYPE=en_US.UTF-8
LESS=-R
```

如果想查看单个变量，使用`echo $VARIABLE_NAME`。

```bash
$ echo $SHELL
/usr/bin/zsh
```

## 命令的连续执行

多个命令可以写在一起。

Bash 提供三种方式，定义它们如何执行。

```bash
# 第一个命令执行完，执行第二个命令
command1; command2

# 只有第一个命令成功执行完（退出码0），才会执行第二个命令
command1 && command2

# 只有第一个命令执行失败（退出码非0），才会执行第二个命令
command1 || command2
```

上面三种执行方法的退出码，都是最后一条执行的命令的退出码。

bash 允许把命令组合在一起。可以通过两种方式完成；要么用一个 group 命令，要么用一个子 shell。 这里是每种方式的语法示例：

组命令：

```bash
{ command1; command2; [command3; ...] }
```

子 shell

```bash
(command1; command2; [command3;...])
```

这两种形式的不同之处在于，组命令用花括号把它的命令包裹起来，而子 shell 用括号。值得注意的是，鉴于 bash 实现组命令的方式， 花括号与命令之间必须有一个空格，并且最后一个命令必须用一个分号或者一个换行符终止。

那么组命令和子 shell 命令对什么有好处呢？ 它们都是用来管理重定向的。

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } > output.txt
```

使用一个子 shell 是相似的。

```bash
(ls -l; echo "Listing of foo.txt"; cat foo.txt) > output.txt
```

组命令和子 shell 真正闪光的地方是与管道线相结合。 当构建一个管道线命令的时候，通常把几个命令的输出结果合并成一个流是很有用的。 组命令和子 shell 使这种操作变得很简单。

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } | lpr
```

这里我们已经把我们的三个命令的输出结果合并在一起，并把它们用管道输送给命令 lpr 的输入，以便产生一个打印报告。

虽然组命令和子 shell 看起来相似，并且它们都能用来在重定向中合并流，但是两者之间有一个很重要的不同。 然而，一个组命令在当前 shell 中执行它的所有命令，而一个子 shell（顾名思义）在当前 shell 的一个 子副本中执行它的命令。这意味着运行环境被复制给了一个新的 shell 实例。当这个子 shell 退出时，环境副本会消失， 所以在子 shell 环境（包括变量赋值）中的任何更改也会消失。因此，在大多数情况下，除非脚本要求一个子 shell， 组命令比子 shell 更受欢迎。组命令运行很快并且占用的内存也少。

当我们发现管道线中的一个 read 命令 不按我们所期望的那样工作的时候。为了重现问题，我们构建一个像这样的管道线：

```bash
echo "foo" | read
echo $REPLY
```

该 REPLY 变量的内容总是为空，是因为这个 read 命令在一个子 shell 中执行，所以它的 REPLY 副本会被毁掉， 当该子 shell 终止的时候。因为管道线中的命令总是在子 shell 中执行，任何给变量赋值的命令都会遭遇这样的问题。 幸运地是，shell 提供了一种奇异的展开方式，叫做进程替换，它可以用来解决这种麻烦。进程替换有两种表达方式：

一种适用于产生标准输出的进程：

```bash
<(list)
```

另一种适用于接受标准输入的进程：

```bash
>(list)
```

这里的 list 是一串命令列表：

为了解决我们的 read 命令问题，我们可以雇佣进程替换，像这样。

```bash
read < <(echo "foo")
echo $REPLY
```

进程替换允许我们把一个子 shell 的输出结果当作一个用于重定向的普通文件。事实上，因为它是一种展开形式，我们可以检验它的真实值：

```bash
[me@linuxbox ~]$ echo <(echo "foo")
/dev/fd/63
```

通过使用 echo 命令，查看展开结果，我们看到子 shell 的输出结果，由一个名为 /dev/fd/63 的文件提供。



## clear

`clear`命令用来清除当前屏幕的显示，运行后会只留下一个提示符。

```bash
$ clear
```


## 关机和重启
格式：
```
shutdown [选项] 时间
```
参数：
- -h 关机
- -r 重启 
- -c 取消前一个关机命令 

举例：
```bash
$ shutdown -r now # 立马重启
```

`halt poweroff inti 0` 也都可以关机 但不安全，不会保存，相当于突然断电
`reboot    init 6` 也可以重启

#### `init 数字` 改变运行级别
`init 5`, 启动图形界面，没安装的话会报错
`runlevel` 查看运行级别 前级别 当前级别  ( 结果：N  3) N是 null 空，是之前级别，3是当前级别，在进入3之前是空级别。

系统运行级别：
- 0 关机
- 1 单用户，单用户模式相当于 windows 的安全模式，主要用于系统修复
- 2 不完全多用户，不含NFS服务
- 3 完全多用户
- 4 未分配
- 5 图形界面
- 6 重启


```bsh
$ logout
# 退出当前用户，也就是注销

$ shutdown -h 05:30 
# 设定凌晨05:30关机

$ shutdown -h now
# 立即关机

$ shutdown -r 05:30
# 设定凌晨05:30重启

$ shutdown -r now
# 立即重启

$ shutdown -c
# 取消前一个关机或重启命令
```
注：
1. 以上定时关机或重启命令执行后，计算机就会卡在那里，当前用户和其他登录的用户都将无法操作，直到关机或重启。这个时候，如果当前用户按`ctrl+c`可以取消本次关机或重启的操作，而其他用户如果按`ctrl+c`的话，则不会取消关机或重启操作，但可以退出中断，继续进行其他操作。
2. 如果想要关机命令后台运行的话，可以在命令后面输入`&`，例如：`shutdown -h 05:30 &`，这样当前用户和其他登录用户的前台就不会中断了（若中断的话，按一下回车即可）；
3. 任何时候，不管哪个用户输入`shutdown -c`命令都可以取消关机或重启操作。
4. 后面的时间可以使用`+m`格式，表示多少分钟后执行。也可以使用`hh:mm`格式，表示指定的时间执行，该时间是24小时制的；
5. 若远程登录的话，最好不要执行关机命令，因为开机需要到机房开机才行。重启也尽量少执行，若必须运行，则应关闭正在运行的服务；


