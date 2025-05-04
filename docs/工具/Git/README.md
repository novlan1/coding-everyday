- [1. Git 和 SVN 的区别](#1-git-和-svn-的区别)
- [2. Git 的优势](#2-git-的优势)
- [3. Git 的历史](#3-git-的历史)
- [4. Git 只能追踪文本文件的变动](#4-git-只能追踪文本文件的变动)
- [5. Git 四个区域](#5-git-四个区域)
- [6. Git 管理的文件有三种状态](#6-git-管理的文件有三种状态)
- [7. Github 技巧](#7-github-技巧)
- [8. `git add`后面的参数](#8-git-add后面的参数)
- [9. Git 怎么知道哪个版本在先哪个版本在后？](#9-git-怎么知道哪个版本在先哪个版本在后)
- [10. Git 中的 HEAD 表示什么](#10-git-中的-head-表示什么)
- [11. 快进模式](#11-快进模式)
- [12. Git 配置](#12-git-配置)
  - [12.1. 查看不同级别的配置文件](#121-查看不同级别的配置文件)
  - [12.2. Git 相关的配置文件有三个](#122-git-相关的配置文件有三个)
  - [12.3. 配置用户名和邮箱](#123-配置用户名和邮箱)
- [13. 查看本地分支与远程分支的追踪](#13-查看本地分支与远程分支的追踪)
- [14. bug 分支合并](#14-bug-分支合并)
- [15. `.gitignore`不起作用](#15-gitignore不起作用)
- [16. `git rm` 与 `git rm --cached`](#16-git-rm-与-git-rm---cached)
- [17. 常用 `git stash` 命令](#17-常用-git-stash-命令)
- [18. git列出所有已经跟踪文件](#18-git列出所有已经跟踪文件)
- [19. `git commit`报`did not match any file known to git`的错误的问题](#19-git-commit报did-not-match-any-file-known-to-git的错误的问题)
- [20. git rebase 和 git merge 的区别](#20-git-rebase-和-git-merge-的区别)
  - [20.1. 变基的风险](#201-变基的风险)


### 1. Git 和 SVN 的区别

Git 是**分布式*的版本控制工具，每一个你pull下来的git仓库都是主仓库的一个分布式版本，仓库的内容完全一样。
而SVN不然，它需要一个**中央版本**来**集中控制**。
分布式版本控制不依赖与网络，有更改需要提交但又无法联网时，可以把更改提交到本地仓库，有网络的时候再将本地仓库和远程的主仓库进行同步。

### 2. Git 的优势
- 分布式版本控制系统，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了。
- 安全性要高很多，因为每个人电脑里都有**完整的版本库**，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。

### 3. Git 的历史
Git 是 用 C 开发的，一个公司威胁要收回原来的免费使用权，Linus 用了两周的时间做出了 Git。


### 4. Git 只能追踪文本文件的变动 
- 所有的版本控制系统，其实只能跟踪**文本文件**的改动，比如 TXT 文件，网页，所有的程序代码等等，Git也不例外。版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。
- 而**图片、视频**这些**二进制文件**，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。
- 不幸的是，Microsoft 的 Word 格式是二进制格式，因此，版本控制系统是没法跟踪 Word 文件的改动的


### 5. Git 四个区域
git跟传统的代码管理器（如:svn）不同， 主要区别在于git多了个**本地仓库以及缓存区**，所以即使无法联网也一样能提交代码。

- 工作区间：即我们创建的工程文件， 在编辑器可直观显示；
- 缓存区：只能通过git GUI或git shell 窗口显示，提交代码、解决冲突的中转站；
- 本地仓库：只能在git shell 窗口显示，连接本地代码跟远程代码的枢纽，不能联网时本地代码可先提交至该处；
- 远程仓库：即保存我们代码的服务器，本文以公共版本控制系统：github为例，登录github账号后可直观显示；

![git 仓库](/imgs/git_repos.jpg)


### 6. Git 管理的文件有三种状态
- 已修改（`modified`）
- 已暂存（`staged`）
- 已提交(`committed`)


### 7. Github 技巧

1. 在`issue`中回复他人时，可以使用引用模式，回答具体某人的问题，`>`某人具体的问题；有可以引用某人回答过的答案，点击某人的那条回答，地址栏会得到该回答的链接，在评论里插入这个链接即可。
2. 针对某个`issue`可以插入代码，新建代码后，`commit`时`title`最后加 `#1`(1表示`issue`编号) ，若最后加上`fix #1`，则会关闭该`issue`。
3. 快捷键`T`，打开检索文件功能


### 8. `git add`后面的参数
- `git add -u`：提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)。
- `git add .`：提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件。
- `git add -A`：提交所有变化，包括以上2种。


### 9. Git 怎么知道哪个版本在先哪个版本在后？
因为还保存了父版本号


### 10. Git 中的 HEAD 表示什么

git 中的分支，其实本质上仅仅是个指向 commit 对象的可变指针。git 是如何知道你当前在哪个分支上工作的呢？
其实答案也很简单，它保存着一个名为 HEAD 的特别指针。在 git 中，它是一个**指向你正在工作中的本地分支的指针**，可以将 HEAD 想象为当前分支的别名。


- 一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向 master，就能确定当前分支，以及当前分支的提交点。
- 当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上。
- Git怎么合并呢？最简单的方法，就是直接把 master 指向d ev 的当前提交，就完成了合并。


一般情况下，用`HEAD`表示**当前版本**，也就是最新的提交`1094adb`...（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个^比较容易数不过来，所以写成`HEAD~100`。

### 11. 快进模式
- 快进模式，也就是**直接把 master 指向 dev 的当前提交**，所以合并速度非常快。
- 合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就**看不出来曾经做过合并**。


### 12. Git 配置

#### 12.1. 查看不同级别的配置文件
- 查看系统config
`git config --system --list`
- 查看当前用户（global）配置
`git config --global  --list`
- 查看当前仓库配置信息
`git config --local  --list`




#### 12.2. Git 相关的配置文件有三个
1. `/etc/gitconfig`：包含了适用于系统所有用户和所有项目的值。(`Win：C:\Program Files\Git\mingw64\etc\gitconfig`) ，`--system` 系统级 
2. `~/.gitconfig`：只适用于当前登录用户的配置。(`Win：C:\Users\Administrator\.gitconfig`)，  `--global` 全局 
3. 位于git项目目录中的`.git/config`：适用于特定git项目的配置。(`Win：C:\gitProject`) ，`--local`当前项目


1）添加配置项 
`git config [--local|--global|--system]  section.key value`

- `[--local|--global|--system]`，可选的，对应本地，全局，系统不同级别的设置
- `section.key`，区域下的键
- `value`，对应的值

2）删除配置项 
`git config [--local|--global|--system] --unset section.key`

#### 12.3. 配置用户名和邮箱

当你安装Git后首先要做的事情是设置你的用户名称和`e-mail`地址。这是非常重要的，因为每次Git提交都会使用该信息。它被永远的嵌入到了你的提交中：
```bash
git config --global user.name "zhangguo"  #名称
git config --global user.email zhangguo@qq.com   #邮箱
```


只需要做一次这个设置，如果你传递了`--global` 选项，因为Git将总是会使用该信息来处理你在系统中所做的一切操作。如果你希望在一个特定的项目中使用不同的名称或`e-mail`地址，你可以在该项目中运行该命令而不要`--global`选项。 总之`--global`为全局配置，不加为某个项目的特定配置。



### 13. 查看本地分支与远程分支的追踪
`git branch -vv`



### 14. bug 分支合并
在`master`分支上修复的bug，提交后，想要合并到当前`dev`分支，可以`dev`分支上用`git cherry-pick <commit>`命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。

### 15. `.gitignore`不起作用

`.gitignore`中已经标明忽略的文件目录下的文件，`git push`的时候还会出现在 push 的目录中，原因是因为在 git 忽略目录中，新建的文件在 git 中会有**缓存**，如果某些文件已经被纳入了版本管理中，就算是在`.gitignore`中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行 git 的 push，这样就不会出现忽略的文件了。

git清除本地缓存命令如下：
```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

### 16. `git rm` 与 `git rm --cached`

1.当我们需要删除暂存区或分支上的文件，同时**工作区**也不需要这个文件了，可以使用
```bash
git rm file_path
````

2.当我们需要删除暂存区或分支上的文件，但**本地又需要使用**，只是**不希望这个文件被版本控制**，可以使用
```bash
git rm --cached file_path
```


### 17. 常用 `git stash` 命令

1. `git stash save "save message"`  : 执行存储时，添加备注，方便查找，只有`git stash` 也要可以的，但查找时不方便识别。
2. `git stash list`  ：查看 stash 了哪些存储
3. `git stash show` ：显示做了哪些改动，默认 show 第一个存储,如果要显示其他存贮，后面加`stash@{$num}`，比如第二个 `git stash show stash@{1}`
4. `git stash show -p` : 显示第一个存储的改动，如果想显示其他存存储，命令：`git stash show stash@{$num} -p` ，比如第二个：`git stash show  stash@{1} -p`
5. `git stash apply` :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储，即`stash@{0}`，如果要使用其他个，`git stash apply stash@{$num}` ， 比如第二个：`git stash apply stash@{1}` 
6. `git stash pop` ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下，默认为第一个 stash，即`stash@{0}`，如果要应用并删除其他 stash，命令：`git stash pop stash@{$num} `，比如应用并删除第二个：`git stash pop stash@{1}`
7. `git stash drop stash@{$num}` ：丢弃`stash@{$num}`存储，从列表中删除这个存储
8. `git stash clear` ：删除所有缓存的 stash

说明：新增的文件，直接执行 stash 是不会被存储的
先执行下`git add` 加到git版本控制中，然后再`git stash`就可以了



### 18. git列出所有已经跟踪文件
```bash
git ls-tree -r master --name-only
```


### 19. `git commit`报`did not match any file known to git`的错误的问题

`git commit -m “changed one thing”`使用双引号，而不是单引号

 

### 20. git rebase 和 git merge 的区别

git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会
保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后
将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记
录了。



#### 20.1. 变基的风险

**不要对在你的仓库外有副本的分支执行变基。** 如果你已经将提交推送至某个仓库，而其他人也已经从该仓库拉取提交并进行了后续工作，此时，如果你用 git rebase 命令重新整理了提交并再次推送，你的同伴因此将不得不再次将他们手头的工作与你的提交进行整合，如果接下来你还要拉取并整合他们修改过的提交，事情就会变得一团糟。