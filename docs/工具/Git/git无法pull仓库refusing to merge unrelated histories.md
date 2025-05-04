## git无法pull仓库: refusing to merge unrelated histories

本文讲的是把git在最新2.9.2，合并pull两个不同的项目，出现的问题如何去解决

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示


```
fatal: refusing to merge unrelated histories
```


如我在Github新建一个仓库，写了License，然后把本地一个写了很久仓库上传。**这时会发现 github 的仓库和本地的没有一个共同的 commit 所以 git 不让提交，认为是写错了 origin** ，如果开发者确定是这个 origin 就可以使用 --allow-unrelated-histories 告诉 git 自己确定。


遇到无法提交的问题，一般先pull 也就是使用 git pull origin master 这里的 origin 就是仓库，而 master 就是需要上传的分支，因为两个仓库不同，**发现 git 输出 refusing to merge unrelated histories 无法 pull 内容**。


因为他们是两个不同的项目，要把两个不同的项目合并，git需要添加一句代码，在 git pull 之后，这句代码是在git 2.9.2版本发生的，最新的版本需要添加 **--allow-unrelated-histories** 告诉 git 允许不相关历史合并。



假如我们的源是origin，分支是master，那么我们需要这样写**git pull origin master --allow-unrelated-histories** 如果有设置了默认上传分支就可以用下面代码。

```
git pull --allow-unrelated-histories
```

这个方法只解决因为两个仓库有不同的开始点，也就是两个仓库没有共同的 commit 出现的无法提交。如果使用本文的方法还无法提交，需要看一下是不是发生了冲突，解决冲突再提交。