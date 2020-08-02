### pm2 使用

`pm2`是 node 的进程管理工具，利用它可以简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。

一、安装pm2

```
npm install -g pm2
```


二、配置pm2自启动

```bash
pm2 startup centos
```


三、启动`koa2`项目

在项目根目录执行项目根文件


```bash
pm2 start index.js
```

四、其他命令

```bash
pm2 list   #查看进程

pm2 stop/reload/restart/delete all    #停止/重载/重启/删除 所有进程

pm2 stop/reload/restart/delete 0     #停止/重载/重启/删除 pm2进程列表中进程为0的进程

pm2 logs [--raw]             #显示所有进程的日志

pm2 flush                #清空所有日志文件

pm2 reloadLogs              #重载所有日志
```

`pm2`应该全局安装`-g`，开启`node`的守护进程，不会阻塞

```
pm2 start app.js

pm2 list

pm2 stop app
```

