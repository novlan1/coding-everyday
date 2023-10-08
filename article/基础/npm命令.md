查看本地所有已安装的包
```bash
npm list
```

查看所有全局安装的包
```bash
npm list -g 
```

仅获取顶层的包
```bash
npm list --depth=0
npm list -g --depth=0
```

查看某个包安装依赖关系，可以用来查看哪个依赖的版本有安全问题
```bash
npm list t-comm
```


查看包在npm服务器上的所有版本
```bash
npm view t-comm versions
```

查看包在npm服务器上的最新版本
```bash
npm view t-comm version
```

查看包的所有版本及其他信息
```bash
npm info t-comm
```

查看本地安装的包
```bash
npm ls t-comm
```

查看全局安装的包
```bash
npm ls t-comm -g
```

全局npm包安装路径
```bash
npm root -g
```

全局npm命令路径
```bash
npm bin -g
```

查看npm当前镜像源
```bash
npm config get registry  
```

