- [1. git rebase](#1-git-rebase)
  - [1.1. 举例](#11-举例)
  - [1.2. 冲突](#12-冲突)
  - [1.3. 用途](#13-用途)
  - [1.4. 常用命令](#14-常用命令)

## 1. git rebase

### 1.1. 举例

在feature分支上执行: `git rebase master`

这句命令的意识是：**以master为基础，将feature分支上的修改增加到master分支上，并生成新的版本。**

**rebase的好处是避免了菱形的产生，保持提交曲线为直线，让大家易于理解**。


### 1.2. 冲突

在rebase的过程中，有时也会有conflict，这时Git会停止rebase并让用户去解决冲突，解决完冲突后，**用git add命令去更新这些内容，然后不用执行git-commit,直接执行git rebase --continue,这样git会继续apply余下的补丁**。

在任何时候，都可以用`git rebase --abort`参数来终止rebase的行动，并且mywork分支会回到rebase开始前的状态。



### 1.3. 用途

1. 本地开发git rebase主分支

2. 拉取远程代码时，如果远程代码最新提交和本地有冲突也可能会用到rebase。

```bash
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase
```

拉取的代码如果和本地代码分叉，可以再git rebase，也可以用git pusll --rebase代替git pull。


### 1.4. 常用命令

查看本分支提交历史：

```bash
git log --oneline --graph
```