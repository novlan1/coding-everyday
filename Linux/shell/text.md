- [1. 文本处理](#1-文本处理)
  - [1.1. cat](#11-cat)
  - [1.2. more](#12-more)
  - [1.3. nl](#13-nl)
  - [1.4. sort](#14-sort)
  - [1.5. uniq](#15-uniq)
  - [1.6. cut](#16-cut)
  - [1.7. paste](#17-paste)
  - [1.8. wc](#18-wc)
  - [1.9. head](#19-head)
  - [1.10. tail](#110-tail)
  - [1.11. grep](#111-grep)
  - [1.12. egrep](#112-egrep)
  - [1.13. sed](#113-sed)
  - [1.14. awk](#114-awk)
    - [1.14.1. 基本用法](#1141-基本用法)
    - [1.14.2. 变量](#1142-变量)
    - [1.14.3. 函数](#1143-函数)
    - [1.14.4. 条件](#1144-条件)
    - [1.14.5. if 语句](#1145-if-语句)
    - [1.14.6. 参考链接](#1146-参考链接)
  - [1.15. fmt](#115-fmt)
  - [1.16. tr](#116-tr)

# 1. 文本处理

## 1.1. cat

`cat`可以文件的内容，显示在标准输出。

```bash
$ cat text1
1 apple
2 pear
3 banana
```

它也可以同时输出多个文件内容。

```bash
$ cat text1 text2
```

它与重定向结合，就可以合并多个文件。

```bash
# 合并文本文件
$ cat text* > text.all

# 合并二进制文件
$ cat movie.mpeg.0* > movie.mpeg
```

如果调用`cat`命令时没有任何参数，它将读取标准输入，然后显示到标准输出。按下`Ctrl + d`，将会结束`cat`读取标准输入。利用这一点，可以将键盘输入写入指定文件，按下`Ctrl + d`结束输入。

```bash
$ cat > lazy_dog.txt
```

它的参数如下。

- `-n` 输出结果显示行号
- `-s` 将多个连续的空白行，输出为一行
- `-A` 输出结果中显示控制符，比如Tab键显示为`^I`，行尾显示`$`

`cat`支持Here document，显示多行文本。

```bash
cat << _EOF_
<HTML>
         <HEAD>
                <TITLE>$TITLE</TITLE>
         </HEAD>
         <BODY>
                <H1>$TITLE</H1>
                <P>$TIME_STAMP</P>
         </BODY>
</HTML>
_EOF_
```

Here document 常在脚本当中作为输入的手段。

```bash
$ sort -k2 <<END
> 1 apple
> 2 pear
> 3 banana
> END
1 apple
3 banana
2 pear
```

如果使用`<<-`代替`<<`，行首的tab键将被剥离。

## 1.2. more
分页显示文件内容
语法：
```
more [文件名] 
```
- `空格`或`f`   **显示下一页**
- `Enter`      **显示下一行**
- `Q`或`q`     退出

```bash
more /etc/services
```

less与more类似，不同的是less命令除了可以用空格向下显示文件外，还可以利用**上下键卷动文件**。


## 1.3. nl

`nl`命令为文本文件添加行号，显示在标准输出。

下面是`example.txt`文件的内容。

```bash
Lorem ipsum
dolor sit amet,
consetetur
sadipscing elitr,
sed diam nonumy
eirmod tempor
invidunt ut labore
et dolore magna
aliquyam erat, sed
diam voluptua. At
vero eos et
accusam et justo
duo dolores et ea
rebum. Stet clita
kasd gubergren,
no sea takimata
sanctus est Lorem
ipsum dolor sit
amet.
```

`nl`命令让上面这段文本显示行号。

```bash
$ nl -s". " example.txt
     1. Lorem ipsum
     2. dolor sit amet,
     3. consetetur
     4. sadipscing elitr,
     5. sed diam nonumy
     6. eirmod tempor
     7. invidunt ut labore
     8. et dolore magna
     9. aliquyam erat, sed
    10. diam voluptua. At
    11. vero eos et
    12. accusam et justo
    13. duo dolores et ea
    14. rebum. Stet clita
    15. kasd gubergren,
    16. no sea takimata
    17. sanctus est Lorem
    18. ipsum dolor sit
    19. amet.
```

`-s`参数表示行号的后缀。


## 1.4. sort

`sort`命令将文本文件的所有行排序后输出。

```bash
$ sort file1.txt file2.txt file3.txt > final_sorted_list.txt
```

它的参数如下。

- `-b` `--ignore-leading-blanks` 默认情况下，排序用的是每行的第一个字符。这个参数忽略每行开头的空格，从第一个非空白字符开始排序。
- `-f` `--ignore-case` 让排序不区分大小写。
- `-n` `--numeric-sort` 按照数值排序，而不是字符值，用于行首是数值的情况。
- `-r` `--reverse` 按相反顺序排序。结果按照降序排列，而不是升序。
- `-k` `--key=field1[,field2]` 指定按照每行的第几个字段（从1开始）排序，而不是按照行首字符排序。该属性可以多个连用，用于指定多重排序标准，还可以指定每个字段指定排序标准，这些值与全局属性一致，比如b（忽略开头的空格），n（数值排序），r（逆向排序）等等。
- `-m` `--merge` 把每个参数看作是一个预先排好序的文件。把多个文件合并成一个排好序的文件，而没有执行额外的排序。
- `-o` `--output=file` 把排好序的输出结果发送到文件，而不是标准输出。
- `-t` `--field-separator=char` 定义字段分隔字符。默认情况下，字段由空格或制表符分隔。
- `-u` 输出结果中删除重复行

```bash
$ sort --key=1,1 --key=2n distros.txt
```

上面命令中，第一个`--key`指定第一排序标准是只用第一字段（`1,1`），也可以指定使用第一字段第一个字符（`1.1`）；第二排序标准是第二字段，按数值排序。

## 1.5. uniq

`uniq`命令在排序后的行中，删除所有重复的行，保证所有输出没有重复。

```bash
$ ls /bin /usr/bin | sort | uniq
```

它的参数如下。

- `-c`	输出所有的重复行，并且每行开头显示重复的次数。
- `-d`	只输出重复行，而不是不重复的文本行。
- `-f n`	忽略每行开头的 n 个字段，字段之间由空格分隔，正如 sort 程序中的空格分隔符；然而， 不同于 sort 程序，uniq 没有选项来设置备用的字段分隔符。
- `-i`	在比较文本行的时候忽略大小写。
- `-s n`	跳过（忽略）每行开头的 n 个字符。
- `-u`	只是输出独有的文本行。这是默认的。
- `-V` 按照版本号排序。

`-V`参数可以按版本号排列（从小到大）。

```bash
$ sort -V input.txt
1.0.15
1.3.0
2.1.2
3.0.0
```

`-rV`参数可以按版本号逆序排列。

```bash
$ sort -rV input.txt
3.0.0
2.1.2
1.3.0
1.0.15
```

## 1.6. cut

`cut`程序用来从文本行中抽取文本，并把其输出到标准输出。它能够接受多个文件参数或者标准输入。

它的参数如下。

- `-b`参数用来指定读取的字节。

```bash
# 输出前三个字节
$ cut file1.txt -b1,2,3

# 输出前十个字节
$ cut file1.txt -b1-10

# 输出从第5个字节开始的所有字节
$ cut file1.txt -b5-

# 输出前5个字节
$ cut file1.txt -b-5
```

- `-c char_list` 抽取指定范围的文本，用法与`-b`一样。有的字符是多字节字符，这时候就应该用`-c`代替`-b`。
- `-f field_list` 抽取指定字段，字段之间可以tab分隔也可以逗号分隔
- `-d delim_char` 指定字段分隔符，默认是tab键
- `--complement`	抽取整个文本行，除了那些由-c 和／或-f 选项指定的文本。

```bash
# 抽取每行的第三个字段
$ cut -f 3 distros.txt

# 抽取每行的第7到第10个字符
$ cut -c 7-10 distros.txt

# 抽取每行的第23个到结尾的字符1
$ cut -c 23- distros.txt

# 指定字段分隔符为冒号
$ cut -d ':' -f 1 /etc/passwd

# 指定每一行的分隔符为逗号，
# 输出第一和第三个字段
$ cut file1.txt -d, -f1,3

# 输出第一、第二、第四和第五个字段
$ cut -f 1-2,4-5 data.txt
```

## 1.7. paste

`paste`程序将多个文本文件按行合并，即每一行都由原来文本文件的每一行组成，显示在标准输出。

```bash
$ paste distros-dates.txt distros-versions.txt
```

## 1.8. wc

`wc`命令输出一个文本文件的统计信息（word count），一共有三个值，分别为行数、词数和字节数。

```bash
$ wc ls-output.txt
 7902 64566 503634 ls-output.txt
```

如果使用`-l`参数，则只输出行数。

```bash
$ ls /bin /usr/bin | sort | uniq | wc -l
 2728
```

## 1.9. head

`head`命令返回文本文件的头部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ head -n 5 ls-output.txt
```

## 1.10. tail

`tail`命令返回文本文件的尾部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ tail -n 5 ls-output.txt
```

`-f`会实时追加显示新增的内容，常用于实时监控日志，按`Ctrl + c`停止。

```bash
$ tail -f /var/log/messages
```

## 1.11. grep

`grep`程序用于在指定文件之中，搜索符合某个模式的行，并把搜索结果输出到标准输出。

英文：`Globally search a Regular Expression and Print`
格式： 
```
grep [参数] <要找的字串> <要寻找字串的源文件>
```

```bash
$ grep keyword foo.txt
```

上面命令输出`foo.txt`之中匹配`keyword`的行。

`grep`程序可以同时搜索多个文件。

```bash
$ grep keyword f*.txt
```

上面命令输出多个文件中匹配`keyword`的行。

`-l`参数输出匹配的文件名，而不是文件行。

```bash
$ grep -l bzip dirlist*.txt
```

如果想搜索文件名，而不是文件内容，可以使用重定向。

```bash
$ ls /usr/bin | grep zip
```

上面命令会输出`/usr/bin`目录中，文件名中包含子字符串`zip`的所有文件。

参数的含义。

- `-c`或`--count` 输出匹配的数量，而不是匹配的文本行。如果使用了`-v`，则输出不匹配的数量。
- `-h`或`--no-filename` 应用于多文件搜索，不在每行匹配的文本前，输出文件名
- `-i`或`--ignore-case` 忽略大小写
- `-l`或`--files-with-matches` 输出包含匹配项的文件名，而不是文本行本身
- `-L`或`--files-without-match` 类似于`-l`，但输出不包含匹配项的文件名
- `-n`或`--line-number` 每个匹配行之前输出其对应的行号
- `-v`或`--invert-match` 只返回不符合模式的行


find 命令与 grep 命令的区别
- find：在系统中搜索符合条件的文件名，使用通配符（完全）匹配
- grep：在文件当中搜索符合条件的字符串，使用正则表达式 （包含）匹配

linux选项分为简化选项和完整选项，它俩作用完全一样，比如`-a`和`--all`


## 1.12. egrep

`egrep`命令用于显示匹配正则模式的行，与`grep -E`命令等价。

下面是`example.txt`文件的内容。

```
Lorem ipsum
dolor sit amet, 
consetetur
sadipscing elitr,
sed diam nonumy
eirmod tempor
invidunt ut labore
et dolore magna
aliquyam erat, sed
diam voluptua. At
vero eos et
accusam et justo
duo dolores et ea
rebum. Stet clita
kasd gubergren,
no sea takimata
sanctus est Lorem
ipsum dolor sit
amet.
```

`egrep`命令显示包括`Lorem`或`dolor`的行。

```bash
$ egrep '(Lorem|dolor)' example.txt
# 或者
$ grep -E '(Lorem|dolor)' example.txt
Lorem ipsum
dolor sit amet,
et dolore magna
duo dolores et ea
sanctus est Lorem
ipsum dolor sit
```

## 1.13. sed

`sed`是一个强大的文本编辑工具。

```bash
# 输出前5行
$ sed -n '1,5p' distros.txt

# 输出包含指定内容的行
$ sed -n '/SUSE/p' distros.txt

# 输出不包含指定内容的行
$ sed -n '/SUSE/!p' distros.txt

# 替换内容（只替换第一个）
$ sed 's/regexp/replacement/' distros.txt

# 替换内容（全局替换）
$ sed 's/regexp/replacement/g' distros.txt
```

下面是`example.txt`文件的内容。

```bash
Hello This is a Test 1 2 3 4
replace all spaces with hyphens
```

`sed`命令将所有的空格换成连词线`-`。

```bash
$ sed 's/ /-/g' example.txt
Hello-This-is-a-Test-1-2-3-4
```

下面的命令将数字换成字母`d`。

```bash
$ sed 's/[0-9]/d/g' example.txt
Hello This is a Test d d d d
```

## 1.14. awk

[`awk`](https://en.wikipedia.org/wiki/AWK)是处理文本文件的一个应用程序，几乎所有 Linux 系统都自带这个程序。

它依次处理文件的每一行，并读取里面的每一个字段。对于日志、CSV 那样的每行格式相同的文本文件，`awk`可能是最方便的工具。

![](https://www.wangbase.com/blogimg/asset/201811/bg2018110702.jpg)

`awk`其实不仅仅是工具软件，还是一种编程语言。不过，这里只介绍它的命令行用法，对于大多数场合，应该足够用了。

### 1.14.1. 基本用法

`awk`的基本用法就是下面的形式。

```bash
# 格式
$ awk 动作 文件名

# 示例
$ awk '{print $0}' demo.txt
```

上面示例中，`demo.txt`是`awk`所要处理的文本文件。前面单引号内部有一个大括号，里面就是每一行的处理动作`print $0`。其中，`print`是打印命令，`$0`代表当前行，因此上面命令的执行结果，就是把每一行原样打印出来。

下面，我们先用标准输入（stdin）演示上面这个例子。

```bash
$ echo 'this is a test' | awk '{print $0}'
this is a test
```

上面代码中，`print $0`就是把标准输入`this is a test`，重新打印了一遍。

`awk`会根据空格和制表符，将每一行分成若干字段，依次用`$1`、`$2`、`$3`代表第一个字段、第二个字段、第三个字段等等。

```bash
$ echo 'this is a test' | awk '{print $3}'
a
```

上面代码中，`$3`代表`this is a test`的第三个字段`a`。

下面，为了便于举例，我们把`/etc/passwd`文件保存成`demo.txt`。

```bash
root:x:0:0:root:/root:/usr/bin/zsh
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
```

这个文件的字段分隔符是冒号（`:`），所以要用`-F`参数指定分隔符为冒号。然后，才能提取到它的第一个字段。

```bash
$ awk -F ':' '{ print $1 }' demo.txt
root
daemon
bin
sys
sync
```

### 1.14.2. 变量

除了`$ + 数字`表示某个字段，`awk`还提供其他一些变量。

变量`NF`表示当前行有多少个字段，因此`$NF`就代表最后一个字段。

```bash
$ echo 'this is a test' | awk '{print $NF}'
test
```

`$(NF-1)`代表倒数第二个字段。

```
$ awk -F ':' '{print $1, $(NF-1)}' demo.txt
root /root
daemon /usr/sbin
bin /bin
sys /dev
sync /bin
```

上面代码中，`print`命令里面的逗号，表示输出的时候，两个部分之间使用空格分隔。

变量`NR`表示当前处理的是第几行。

```bash
$ awk -F ':' '{print NR ") " $1}' demo.txt
1) root
2) daemon
3) bin
4) sys
5) sync
```

上面代码中，`print`命令里面，如果原样输出字符，要放在双引号里面。

`awk`的其他内置变量如下。

> - `FILENAME`：当前文件名
> - `FS`：字段分隔符，默认是空格和制表符。
> - `RS`：行分隔符，用于分割每一行，默认是换行符。
> - `OFS`：输出字段的分隔符，用于打印时分隔字段，默认为空格。
> - `ORS`：输出记录的分隔符，用于打印时分隔记录，默认为换行符。
> - `OFMT`：数字输出的格式，默认为`％.6g`。

### 1.14.3. 函数

 `awk`还提供了一些内置函数，方便对原始数据的处理。

函数`toupper()`用于将字符转为大写。

```bash
$ awk -F ':' '{ print toupper($1) }' demo.txt
ROOT
DAEMON
BIN
SYS
SYNC
```

上面代码中，第一个字段输出时都变成了大写。

其他常用函数如下。

> - `tolower()`：字符转为小写。
> - `length()`：返回字符串长度。
> - `substr()`：返回子字符串。
> - `sin()`：正弦。
> - `cos()`：余弦。
> - `sqrt()`：平方根。
> - `rand()`：随机数。

`awk`内置函数的完整列表，可以查看[手册](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)。

### 1.14.4. 条件

`awk`允许指定输出条件，只输出符合条件的行。

输出条件要写在动作的前面。

```bash
$ awk '条件 动作' 文件名
```

请看下面的例子。

```bash
$ awk -F ':' '/usr/ {print $1}' demo.txt
root
daemon
bin
sys
```

上面代码中，`print`命令前面是一个正则表达式，只输出包含`usr`的行。

下面的例子只输出奇数行，以及输出第三行以后的行。

```bash
# 输出奇数行
$ awk -F ':' 'NR % 2 == 1 {print $1}' demo.txt
root
bin
sync

# 输出第三行以后的行
$ awk -F ':' 'NR >3 {print $1}' demo.txt
sys
sync
```

下面的例子输出第一个字段等于指定值的行。

```bash
$ awk -F ':' '$1 == "root" {print $1}' demo.txt
root

$ awk -F ':' '$1 == "root" || $1 == "bin" {print $1}' demo.txt
root
bin
```

### 1.14.5. if 语句

`awk`提供了`if`结构，用于编写复杂的条件。

```bash
$ awk -F ':' '{if ($1 > "m") print $1}' demo.txt
root
sys
sync
```

上面代码输出第一个字段的第一个字符大于`m`的行。

`if`结构还可以指定`else`部分。

```bash
$ awk -F ':' '{if ($1 > "m") print $1; else print "---"}' demo.txt
root
---
---
sys
sync
```

### 1.14.6. 参考链接

- [An Awk tutorial by Example](https://gregable.com/2010/09/why-you-should-know-just-little-awk.html), Greg Grothaus
- [30 Examples for Awk Command in Text Processing](https://likegeeks.com/awk-command/), Mokhtar Ebrahim

## 1.15. fmt

`fmt`命令用于对文本指定样式。

下面是`example.txt`的内容，是非常长的一行。

```
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
```

`fmt`可以将其输出为每行80个字符。

```bash
cat example.txt | fmt -w 20
Lorem ipsum
dolor sit amet,
consetetur
sadipscing elitr,
sed diam nonumy
eirmod tempor
invidunt ut labore
et dolore magna
aliquyam erat, sed
diam voluptua. At
vero eos et
accusam et justo
duo dolores et ea
rebum. Stet clita
kasd gubergren,
no sea takimata
sanctus est Lorem
ipsum dolor sit
amet.
```

## 1.16. tr

`tr`命令用于按照给定模式转换文本。

下面是`example.txt`文件的内容。

```bash
Hello World Foo Bar Baz!
```

`tr`命令可以将所有小写字母转换为大写字母。

```bash
$ cat example.txt | tr 'a-z' 'A-Z'
HELLO WORLD FOO BAR BAZ!
```

`tr`命令还可以将所有空格转为换行符。

```bash
$ cat example.txt | tr ' ' '\n'
Hello
World
Foo
Bar
Baz!
```







