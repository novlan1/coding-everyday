## which和whereis命令的区别

which和whereis命令都是Linux操作系统下**查找可执行文件路径**的命令。

### which

这条命令主要是用来查找**系统PATH目录下的可执行文件**。说白了就是查找那些我们已经安装好的可以直接执行的命令，比如

```bash
$ which ls

/bin/ls
```

注意， which 查找的可执行文件，必须是要在 PATH 下的可执行文件，而不能是没有加入 PATH 的可执行文件，即使他就是可执行文件，但是没有加入到系统搜索路径，他仍然无法被 which 发现（好吧，有点啰嗦了）。


### whereis

这个命令可以用来查找**二进制（命令）、源文件、man文件**。与which不同的是这条命令可以是通过**文件索引数据库而非PATH**来查找的，所以查找的面比which要广。例如：

```bash
$ whereis ls

ls: /bin/ls
 /usr/share/man/man1/ls.1.gz
```

可以看到，whereis不仅找到了 ls 可执行文件的位置，还找到了其 man 帮助文件，可见其搜索范围比较广，不局限于PATH。