- [1. Git的add、commit、push的详细介绍](#1-git的addcommitpush的详细介绍)
  - [1.1. Git add](#11-git-add)
    - [1.1.1.](#111)
    - [1.1.2.](#112)
    - [1.1.3.](#113)
  - [1.2. Git commit](#12-git-commit)
    - [1.2.1.](#121)
    - [1.2.2.](#122)
  - [1.3. Git push](#13-git-push)
    - [1.3.1.](#131)
    - [1.3.2.](#132)
    - [1.3.3.](#133)
    - [1.3.4.](#134)
    - [1.3.5. 关于 refs/for](#135-关于-refsfor)
  - [1.4.` git push -u origin master`中的-u](#14-git-push--u-origin-master中的-u)

## 1. Git的add、commit、push的详细介绍

### 1.1. Git add

git add [参数] <路径>　作用就是将我们需要提交的代码从工作区添加到暂存区，就是告诉git系统，我们要提交哪些文件，之后就可以使用git commit命令进行提交了。

#### 1.1.1. 

```
git add .
```

不加参数默认为将修改操作的文件和未跟踪新添加的文件添加到git系统的暂存区，**注意不包括删除**。



#### 1.1.2. 

```
git add -u .
```

**-u 表示将已跟踪文件中的修改和删除的文件添加到暂存区，不包括新增加的文件**，注意这些被删除的文件被加入到暂存区再被提交并推送到服务器的版本库之后这个文件就会从git系统中消失了。



#### 1.1.3. 

```
git add -A .
```

**-A 表示将所有的已跟踪的文件的修改与删除和新增的未跟踪的文件都添加到暂存区**。





### 1.2. Git commit

git commit 主要是将暂存区里的改动给提交到本地的版本库。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，

commit-id 在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里.

#### 1.2.1. 

```
git commit -m ‘message’
```

-m 参数表示可以直接输入后面的“message”，如果不加 -m参数，那么是不能直接输入message的，而是会调用一个编辑器一般是vim来让你输入这个message，

message即是我们用来简要说明这次提交的语句。

#### 1.2.2. 

```
git commit -am ‘message’ -am等同于-a -m
```

-a参数可以将所有已跟踪文件中的执行修改或删除操作的文件都提交到本地仓库，即使它们没有经过git add添加到暂存区，

注意: 新加的文件（即没有被git系统管理的文件）是不能被提交到本地仓库的。




### 1.3. Git push

在使用git commit命令将修改从暂存区提交到本地版本库后，只剩下最后一步将本地版本库的分支推送到远程服务器上对应的分支了。

git push的一般形式为 git push <远程主机名> <本地分支名> <远程分支名> ，例如 git push origin master：refs/for/master ，即是将本地的master分支推送到远程主机origin上的对应master分支， origin 是远程主机名。第一个master是本地分支名，第二个master是远程分支名。

#### 1.3.1. 

```
git push origin master
```

如果远程分支被省略，如上则表示将本地分支推送到与之存在追踪关系的远程分支（通常两者同名），如果该远程分支不存在，则会被新建

#### 1.3.2. 

```
git push origin ：refs/for/master
```

如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支，等同于 git push origin –delete master。

#### 1.3.3. 

```
git push origin
```

如果当前分支与远程分支存在追踪关系，则本地分支和远程分支都可以省略，将当前分支推送到origin主机的对应分支

#### 1.3.4. 

```
git push
```

如果当前分支只有一个远程分支，那么主机名都可以省略，形如 git push，可以使用git branch -r ，查看远程的分支名


#### 1.3.5. 关于 refs/for

**refs/for 的意义在于我们提交代码到服务器之后是需要经过code review 之后才能进行merge的，而refs/heads 不需要**


### 1.4.` git push -u origin master`中的-u

**upstream与有几个远程库没有关系，它是分支与分支之间的流通道**。

再来说说`git push -u`和`git branch --set-upstream-to`指令之间的区别。

举个例子：我要把本地分支`mybranch1`与远程仓库origin里的分支`mybranch1`建立关联。

（如果使用下列途径1的话，首先，你要切换到`mybranch1`分支上（`git checkout mybranch1`））

两个途径：

1. `git push -u origin mybranch1`
2. `git branch --set-upstream-to=origin/mybranch1 mybranch1`

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有`mybranch1`分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？

所以可以总结一下：`git push -u origin mybranch1` 相当于` git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1`