Git 2.13.0(2017年发布)包含了一个新的功能`includeIf`配置，可以把匹配的路径使用对应的配置用户名和邮箱。


修改你的 `~/.gitconfig` 文件内容，增加：

```bash
[includeIf "gitdir:~/Documents/ygw/"]
    path = ~/.gitconfig-self
```

创建对应的 `~/.gitconfig-self`

```bash
[user]
    name = xiaoming
    email = 123@qq.com
```

参考：https://juejin.cn/post/7054370789050548231


