- [1. Crontab相关问题](#1-crontab相关问题)
  - [1.1. 查看crontab任务是否执行以及执行日志](#11-查看crontab任务是否执行以及执行日志)
  - [1.2. crontab 定时任务报错 `node: command not found`](#12-crontab-定时任务报错-node-command-not-found)
  - [1.3. crontab环境变量问题](#13-crontab环境变量问题)
  - [1.4. crontab其他应该注意的问题](#14-crontab其他应该注意的问题)
  - [1.5. cron启动](#15-cron启动)

## 1. Crontab相关问题

### 1.1. 查看crontab任务是否执行以及执行日志

1. 查看crontab的日志
- 日志文件为`/var/log/cron`
- 找到对应时间，是否执行指令
- 这种方式只能看到是否执行，但是并无法确定是否执行成功


2. 将定时任务的日志重定向
日志重定向的时候要注意，要将标准错误日志一起重定向，才能获取到正常和错误的日志

例如：
```bash
27 10 * * * /usr/bin/sh /opt/lyy/checkES.sh >>/opt/lyy/checkES.log 2>&1
```

### 1.2. crontab 定时任务报错 `node: command not found`

脚本没问题，用 sh 命令可以执行，但是定时任务日志显示报错。 
原因：发现是因为缺少环境变量，需要在 crontab 命令中指定环境变量位置，改了命令就可以了。
```bash
30 13 * * 0-6 /etc/profile; sh /root/myjobs/crawerOne/crawAndUpload.sh >> /root/myjobs/crawerOne/job.log 2>&1
```

### 1.3. crontab环境变量问题

crontab总是不会缺省的从用户profile文件中读取环境变量参数，经常导致在手工执行某个脚本时是成功的，但是到crontab中试图让它定期执行时就是会出错。

2种方法可以解决这个问题，主要是让环境变量在crontab中被定义 
1. 在Shell文件里面获取环境变量值的路径写成**绝对路径**，别用环境变量的路径值。 
2. Shell脚本缺省的#!/bin/sh开头换行后的第一行用（前提是`profile`和`.bash_profile`分别存在需要的路径配置） 

```
#!/bin/sh 
. /etc/profile 
. ~/.bash_profile 
```
只有crontab在执行脚本的时候能够读到用户的环境变量参数，才能保证定时能正常被执行。


### 1.4. crontab其他应该注意的问题 

1. 新创建的cron job，**不会马上执行，至少要过2分钟才执行**。如果重启cron则马上执行。 
2. 每条 JOB 执行完毕之后，系统会自动将输出发送邮件给当前系统用户。日积月累，非常的多，甚至会撑爆整个系统。所以每条 JOB 命令后面进行重定向处理是非常必要的： **`>/dev/null 2>&1`**。前提是对 Job 中的命令需要正常输出已经作了一定的处理, 比如追加到某个特定日志文件。 
3. 当`crontab`突然失效时，可以**尝试`/etc/init.d/crond restart`解决问题**。或者查看日志看某个job有没有**执行/报错`tail -f /var/log/cron`。** 
4. 千万别乱运行`crontab -r`。它从Crontab目录（`/var/spool/cron`）中删除用户的`Crontab`文件。删除了该用户的所有crontab都没了。 
5. **在`crontab`中`%`是有特殊含义的，表示换行的意思**。如果要用的话必须进行转义`\%`，如经常用的`date ‘+%Y%m%d’`在`crontab`里是不会执行的，应该换成`date ‘+\%Y\%m\%d’`。 


### 1.5. cron启动

cron服务是Linux的内置服务，但它不会开机自动启动。可以用以下命令启动和停止服务： 
```
/sbin/service crond start 
/sbin/service crond stop 
/sbin/service crond restart 
/sbin/service crond reload 
```
以上1-4行分别为启动、停止、重启服务和重新加载配置。 
要把cron设为在开机的时候自动启动，在 `/etc/rc.d/rc.local` 脚本中加入 `/sbin/service crond start` 即可 
- 查看当前用户的crontab，输入 `crontab -l`；
- 编辑crontab，输入 `crontab -e`； 
- 删除crontab，输入 `crontab -r`
