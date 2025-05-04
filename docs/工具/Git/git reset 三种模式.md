- [1. git reset 三种模式](#1-git-reset-三种模式)
  - [1.1. git reset 语法](#11-git-reset-语法)
    - [1.1.1. 使用参数--hard，如git reset --hard <commit ID>](#111-使用参数--hard如git-reset---hard-commit-id)
    - [1.1.2. 使用参数--soft，如 git reset --soft <commit ID>](#112-使用参数--soft如-git-reset---soft-commit-id)
    - [1.1.3. 使用参数--mixed或者不使用参数（默认为--mixed），如 git reset <commit>](#113-使用参数--mixed或者不使用参数默认为--mixed如-git-reset-commit)
  - [1.2. git reset 原理](#12-git-reset-原理)
    - [1.2.1. --hard](#121---hard)
    - [1.2.2. --soft](#122---soft)
    - [1.2.3. --mixed（默认）](#123---mixed默认)
  - [1.3. 总结](#13-总结)

## 1. git reset 三种模式

git reset --hard指的是恢复某一个库。**git reset --hard HEAD^ 是向前回退版本，其中HEAD后面跟几个^ 就是往回退几个版本，如果回退100个版本，可以写成 HEAD~100** 。



git reset有三种模式，soft,mixed,hard，具体的使用方法下面这张图，展示的很全面了。

![img](http://img.uwayfly.com/article_mike_20200706091315_56bbec5e59dc.png)



### 1.1. git reset 语法

```
命令格式：git reset [--soft | --mixed | --hard] [<commit>]
```

#### 1.1.1. 使用参数--hard，如git reset --hard <commit ID>

1. 替换引用的指向。引用指向新的提交ID。

2. 替换暂存区。替换后，**暂存区的内容和引用指向的目录树一致**。

3. 替换工作区。替换后，**工作区的内容变得和暂存区一致，也和HEAD所指向的目录树内容相同**。



#### 1.1.2. 使用参数--soft，如 git reset --soft <commit ID>

即只更改引用的指向，**不改变暂存区和工作区**。

只改变commit（指针指向），stage index 和 working directory 不变



#### 1.1.3. 使用参数--mixed或者不使用参数（默认为--mixed），如 git reset <commit>

**更改引用的指向及重置暂存区，但是不改变工作区**。

只改变commit（指针指向） 和 add （stage index），working directory不变



### 1.2. git reset 原理

#### 1.2.1. --hard

重置位置的同时，**直接将 working Tree工作目录、 index 暂存区及repository 都重置成目标Reset节点的內容**，所以效果看起来等同于清空暂存区和工作区。


#### 1.2.2. --soft
重置位置的同时，**保留working Tree工作目录和index暂存区的内容，只让repository中的内容和 reset 目标节点保持一致**，因此原节点和reset节点之间的【差异变更集】会放入index暂存区中(Staged files)。
所以效果看起来就是工作目录的内容不变，暂存区原有的内容也不变，只是原节点和Reset节点之间的所有差异都会放到暂存区中。

#### 1.2.3. --mixed（默认）

重置位置的同时，**只保留Working Tree工作目录的內容，但会将 Index暂存区 和 Repository 中的內容更改和reset目标节点一致**，因此原节点和Reset节点之间的【差异变更集】会放入Working Tree工作目录中。
所以效果看起来就是原节点和Reset节点之间的所有差异都会放到工作目录中。



### 1.3. 总结

**`reset` 的本质：移动 HEAD 以及它所指向的 `branch`。**

实质上，`reset` 这个指令虽然可以用来撤销 `commit` ，但它的实质行为并不是撤销，而是移动 HEAD ，并且「捎带」上 HEAD 所指向的 `branch`（如果有的话）。也就是说，reset 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 HEAD 以及它所指向的 `branch` 的位置的。

而 `reset --hard HEAD^` 之所以起到了撤销 `commit` 的效果，是因为它把 HEAD 和它所指向的 `branch` 一起移动到了当前 `commit` 的父 `commit` 上，从而起到了「撤销」的效果：



![img](http://img.uwayfly.com/article_mike_20200706092506_efca09bf591b.png)



Git 的历史只能往回看，不能向未来看，所以把 `HEAD` 和 `branch` 往回移动，就能起到撤回 `commit` 的效果。

所以同理，`reset --hard` 不仅可以撤销提交，还可以用来把 `HEAD` 和 `branch` 移动到其他的任何地方。

```bash
git reset --hard branch2
```



![img](http://img.uwayfly.com/article_mike_20200706092426_3dd4e8985c8a.png)