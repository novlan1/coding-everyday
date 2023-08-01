

## 一、Linux

### 1. SSH配置config快速登录服务器


#### （1）本地操作

```bash
# 快速生成密钥
$ ssh-keygen -t rsa

# 进入ssh配置目录
$ cd ~/.ssh 

# 没有config文件的话需自己创建一个
$ ls 
```

在config文件中新增如下内容：

```bash
Host my
  HostName x.x.x.x
  Port 36000
  User root
  IdentityFile ~/.ssh/id_rsa # 这句可以省略
```


- Host后面是别名，group的话就可以通过“ssh group” 进行登录
- HostName为IP
- Port为端口
- User为用户名
- IdentityFile为自己ID私钥

#### （2）服务器操作

将自己的公钥写入`authorized_keys`中。


```bash
$ cd ~/.ssh 
$ cat authorized_keys
```





参考：[ssh配置config快速登录服务器](https://blog.csdn.net/ky1in93/article/details/83093981)





### 2. 管道命令和xargs的区别

`linux`命令可以从两个地方读取要处理的内容，一个是通过命令行参数，一个是标准输入。

1. 管道是实现“将前面的标准输出作为后面的标准输入” 
2. `xargs`是实现“将标准输入作为命令的参数” 

尝试运行以下代码，看下结果的不同。 

```bash
$ echo "--help"|cat 

$ echo "--help"|xargs cat 
```

如果你直接在命令行输入`cat`后回车，而不输入命令参数，这时`cat`会等待标准输入，你通过键盘输入内容并按回车，`cat`进程会读取输入并原样返回。所以如果此时你输入`–help`，那么cat程序会在标准输出上输出`–help`，这就是使用管道符时的情况。

然而使用`| xargs`时，就相当于直接将 `--help` 作为了 `cat` 命令的参数，执行了`cat --help`命令。

参考：[linux xargs与管道的区别](https://blog.csdn.net/whatday/article/details/105290814)





### 3. Linux环境变量文件

登录 Session 是用户登录系统以后，系统为用户开启的原始 Session，通常需要用户输入用户名和密码进行登录。

登录 Session 一般进行整个系统环境的初始化，启动的初始化脚本依次如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `/etc/profile.d`目录里面所有.sh文件
- `~/.bash_profile`：用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。

Linux 发行版更新的时候，会更新/etc里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建.sh脚本。

如果想修改你个人的登录环境，一般是写在`~/.bash_profile`里面。这个脚本定义了一些最基本的环境变量，然后执行了`~/.bashrc`。

参考：[Linux环境变量文件介绍](https://blog.csdn.net/pengjunlee/article/details/81585726)


### 4. kill与kill -9的区别

`kill - 9` 表示强制杀死该进程

参考：[kill与kill -9的区别](https://blog.csdn.net/yushouxiang2014/article/details/82876405)



### 5. 反斜杠

- 在Windows系统中，正斜杠 `/` 表示除法，用来进行整除运算；反斜杠 `\` 用来表示目录。
- 在Unix系统中，`/`表示目录；`\`表示跳脱字符将特殊字符变成一般字符（如`enter`,`$`,空格等）。



### 6. find命令

`find` 先接 `path`，然后是选项参数(`-()`)，然后是表达式`expression`。

- `find -name '*.c'` —— 查找符合某 shell 式样式的文件名的文件。用 `iname` 开启大小写不敏感搜索。

- `find -path 'test'` —— 查找符合某 shell 式样式的路径的文件。用 `ipath` 开启大小写不敏感搜索。

- `find -mtime -5` —— 查找近五天内编辑过的文件。你也可以用 `+5` 来查找五天之前编辑过的文件。

- `find -newer server.c` —— 查找比 `server.c` 更新的文件。

- `find -type d` —— 查找所有文件夹。如果想找出所有文件，那就用 `-type f`；找符号连接就用 `-type l`。

### 7. set命令

- `set -u` 等于 `set -o nounset`，遇到不存在的变量就会报错，比如直接 `echo $a`。有时需要暂时 `set +u`，暂时取消这个规则。
- `set -x` 等于 `set -o xtrace`，在运行结果之前，先输出执行的那一行命令
- `set -e` 等于 `set -o errexit`，只要脚本发生错误(返回值为非0代表失败)，就终止执行

- `set -o pipefail`，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。之前是`set -e`对管道命令不生效，其中一个子命令失败，整个管道命令依然成功。比如`foo | echo a`

- `set -E`，一旦设置了`set -e`，函数内部的错误不会被`trap`命令捕获，`-E`参数可以纠正这个行为。

连在一起使用

```bash
# 写法一
set -euxo pipefail

# 写法二
set -eux
set -o pipefail
```

另一种办法是在执行 Bash 脚本的时候，从命令行传入这些参数。

```bash
$ bash -euxo pipefail script.sh
```



### 8. cp命令

拷贝目录必须带-r

```bash
$ cp -r dir1 dir2
```

拷贝多个文件

```bash
$ cp source1 source2 source3 dest
```

删除文件/目录时显示详情 -v

```bash
$ rm -rfv test/
```


### 9. tree命令

`tree` 命令比 `ll` 命令更详细。

### 10. Nginx 配置反向代理

Nginx 配置反向代理 `proxy_pass http:/127.0.0.1:3066/` 最后一定要加斜杠！！！


### 11. 创建一个文件，写入三行数据


```bash
$ echo -e '123123\n123123\n123' > 123.txt
```


### 12. Bash检查目录是否存在

在Linux下，检查一个目录是否存在，不存在则创建的方法如下，通过shell文件

```bash
if [ ! -d dirname]; then
  mkdir dirname
fi
```

这里判断名称 dirname 的目录是否存在，如果不存在则通过 mkdir 创建 dirname 目录，如果是多层的目录，则可以用`mkdir -p`递归创建多层的目录。

### 13. crontab日志存放位置

默认情况下,crontab中执行的日志写在`/var/log`下,如:

```bash
$ ls /var/log/cron*
/var/log/cron /var/log/cron.1 /var/log/cron.2 /var/log/cron.3 /var/log/cron.4
```

### 14. echo输出的内容赋值给变量

```bash
$ data='123'
$ value=$( echo $data )
$ echo $value
123
```

上面的`$()`可以用`\`\``代替。

参考：[echo输出的内容赋值给变量](https://www.jianshu.com/p/129011d4bc43)



### 15.pm2查看日志命令

- 快速查看日志：`pm2 logs appname|id`
- 查看某一个项目的详情：`pm2 show appname|id`


### 16. Bash中eval的用法



```bash
$ eval command-line
```


其中`command－line`是在终端上键入的一条普通命令行。然而当在它前面放上`eval`时，其结果是Shell在执行命令行之前扫描它两次。如：

```bash
$ pipe="|"
$ eval ls $pipe wc -l
```


shell第1次扫描命令行时，它替换出`pipe`的值`｜`，接着`eval`使它再次扫描命令行，这时shell把`｜`作为管道符号了。

如果变量中包含任何需要shell直接在命令行中看到的字符（不是替换的结果），就可以使用`eval`。命令行结束符（`;｜&`），I／O重定向符（`< >`）和引号就属于对shell具有特殊意义的符号，必须直接出现在命令行中。


### 17. 读取文件中的服务器密码


比如有一个文件，存放服务器的域名和密码：

```
hostName=x.x.x.x
hostPwd=***
```

有一个脚本用来打包并上传文件，它会读取服务器地址和密码，并把文件上传到该服务器上。

```bash
#!/bin/sh
set -eux

function getHostInfo() {
  # 先获取域名或密码，然后赋值给参数，也就是hostName或者hostPwd
  eval $1=$(awk -F '=' '$1 == "'$1'"  {print $NF}' server.pwd)
}

fileName=work-weixin-robot
tarFileName=${fileName}.tar.gz

getHostInfo hostName
getHostInfo hostPwd


rm -rf ./$tarFileName
tar --exclude=node_modules/ --exclude=test/ --exclude=output/ --exclude=build.sh -zcvf $tarFileName ./*


expect -c "
        set timeout 1200;
        spawn scp -P 36000 -r $tarFileName root@$hostName:/root/ft_local
        expect {
                \"*yes/no*\" {send \"yes\r\"; exp_continue}
                \"*password*\" {send \"$hostPwd\r\";}
               }
expect eof;"
```


### 18. linux下tar命令解压到指定的目录 

```bash
tar zxvf /bbs.tar.zip -C /zzz/bbs    
```

把根目录下的bbs.tar.zip解压到/zzz/bbs下，前提要保证存在/zzz/bbs这个目录 

这个和cp命令有点不同，cp命令如果不存在这个目录就会自动创建这个目录！

附：用tar命令打包

例：将当前目录下的zzz文件打包到根目录下并命名为zzz.tar.gz

```bash
tar zcvf /zzz.tar.gz ./zzz
```
参考：[linux下tar命令解压到指定的目录](http://blog.sina.com.cn/s/blog_62449fcf0100nfar.html)


### 19. Linux下的date命令

date 可以用来显示或设定系统的日期与时间。
```js
-d<字符串>：显示字符串所指的日期与时间。字符串前后必须加上双引号； 
-s<字符串>：根据字符串来设置日期与时间。字符串前后必须加上双引号； 
-u：显示GMT； 
--help：在线帮助； 
--version：显示版本信息。
```

如果需要以指定的格式显示日期，可以使用“+”开头的字符串指定其格式

```bash
date "+现在时间是：%Y-%m-%d %H:%M:%S"
# 现在时间是：2021-05-07 09:37:01
```

如果要显示的时间不是当前时间，而是经过运算的时间，则可以用-d选项。例如显示三年前的时间：
```bash
date +"%Y-%m-%d %H:%M:%S" -d "-3 year"
# 2018-05-07 09:39:46
```

有时候需要获取当前时间距离1970年0时0分0秒所经历的秒数，保存在变量中：
```bash
time=`date "+%s"
echo $time
# 1620351114
```




参考：[Linux date命令的用法](https://www.cnblogs.com/asxe/p/9317811.html)


### 20.  top命令按内存和cpu排序


- 按内存排序：大写M
- 按CPU排序：大写P

TOP完整命令：

```
c： 显示完整的命令
d： 更改刷新频率
f： 增加或减少要显示的列(选中的会变成大写并加*号)
F： 选择排序的列
h： 显示帮助画面
H： 显示线程
i： 忽略闲置和僵死进程
k： 通过给予一个PID和一个signal来终止一个进程。（默认signal为15。在安全模式中此命令被屏蔽）
l:  显示平均负载以及启动时间（即显示影藏第一行）
m： 显示内存信息
M： 根据内存资源使用大小进行排序
N： 按PID由高到低排列
o： 改变列显示的顺序
O： 选择排序的列，与F完全相同
P： 根据CPU资源使用大小进行排序
q： 退出top命令
r： 修改进程的nice值(优先级)。优先级默认为10，正值使优先级降低，反之则提高的优先级
s： 设置刷新频率（默认单位为秒，如有小数则换算成ms）。默认值是5s，输入0值则系统将不断刷新
S： 累计模式（把已完成或退出的子进程占用的CPU时间累计到父进程的MITE+ ）
T： 根据进程使用CPU的累积时间排序
t： 显示进程和CPU状态信息（即显示影藏CPU行）
u： 指定用户进程
W： 将当前设置写入~/.toprc文件，下次启动自动调用toprc文件的设置
<： 向前翻页
>： 向后翻页
?： 显示帮助画面
1(数字1)： 显示每个CPU的详细情况
```


### 21. 软连接：ln -s 源文件 目标文件。


如：
```
ln -s /usr/local/mysql/bin/mysql /usr/bin
```




## 二、业务


### 1. 前端鉴权

权限页面，用`computed`属性表示是否有权限，可以在`computed`中进行跳转，只是要用个标志位，否则会陷入死循环。

```js
computed: {
  // 是否显示资质审核tab
  hasCertAuditTab() {
    const { certRole } = this.$store.state.authority || {} ;
    const result = !!certRole && !this.isPvp && !this.isGPVersion;
    if (result && !jumped) {
      jumped = true;
      this.onChangeTab('cert');
    }
    return result;
  },
}
```

### 2. 不要用二维数组

二维数组可以拆分成`[ { title: xx, children: [] } ]`，更容易维护！！！


### 3. 表单要做到数据驱动，否则后期难以维护


### 4. 页面多个tab的话，许多数据都需要设置成对象的形式


页面多个tab的话，dataList、loadings、endFlags、pageIdxes都需要设置成对象的形式，然后根据curTab取当前值。

这样的好处是简单，维护方便，不用写myDataList、allDataList，这种多标记，很难维护。


### 5. vue如果模块引入路径错误，也有可能报错：TypeError: Object(...) is not a function 

报这种错误信息的另一个场景是，把写在methods的方法写在了data中

### 6. 实名认证输入框的时候，会有横竖屏提示，所以有输入框的时候可以用样式去掉提示。



### 7. 要获取游戏圈链接，分享给好友，快速点击右上角，有复制链接按钮


### 8. 发布

- feature->develop -> 发布测试 
- hotfix-release  -> 发布测试 -> 审核 -> 发布正式
- relase -> develop
- develop -> release -> 发布测试 -> 审核 -> 发布正式


### 9. VSCode中对一行的css进行换行

```
\s\{([\s\S]+)

 {\n  $1
```



## 三、Android

(1) Android 四大组件

- Activity: 负责用户界面的展示和用户交互,学习Activity就要学习Fragment，虽然它不是四大组件之一，但是它在我们的开发工作中也是频频被使用到，且必须和Activity一块使用，常用于分模块开发，比如慕课首页的几个tab,每个tab都是对应着一个Fragment.

- Service服务：不需要和用户交互，负责后台任务，比如播放音乐，socket长连接

- BroadcastReceiver广播接收者: 负责页面间通信，系统和APP通信，APP和APP通信，比如监听网络连接状态变化，就是通过BroadcastReceiver广播接收者来实现的

- ContentProvider内容提供者: 负责数据存取，常用于APP进数据共享，跨进程数据存取等....比如读取相册，读取联系人，都是ContentProvider来实现的


(2) noActionBar没有状态栏

RecyclerView控件的名称：androidx.recyclerview.widget.RecyclerView


(3) 设置textView的跑马灯效果，需要设置下面两个属性

- android:ellipsize="marquee"
- android:marqueeRepeatLimit="marquee_forever"

textView默认不可点击，加上clickable="true"，就可以点击


(4) 对textview设置layout_width为match-parent，即和linearout宽度进行匹配


(5) 按住option+enter可以快速实现方法



(6) mainActivity.kt中的setContentView(R.layout.activity_main)决定使用哪个布局文件




(7) MaterialButtonToggleGroup继承关系，可以看出viewGroup继承自View，MaterialButtonToggleGroup继承自LinearLayout

```
java.lang.Object
   ↳android.view.View
        ↳android.view.ViewGroup
             ↳android.widget.LinearLayout
                  ↳com.google.android.material.button.MaterialButtonToggleGroup
```


(8) materialButton继承自button，button继承自textview，所以有android:text、android:textSize等属性 

materialButton在xml中名称是com.google.android.material.button.MaterialButton

materialButton属性没有提示的话，把    xmlns:app="http://schemas.android.com/apk/res-auto" 写在布局容器中，然后就可以使用app这个命名空间了。

在text属性中写&会报错，&符号不支持在xml文件中使用

给materialButton添加icon示例：   app:icon="@android:drawable/star_on"

默认iconGravity是start，也就是button的最前面出现，还可以是textStart、textEnd，在文本的前面和后面。

消除阴影，可以设置style：        style="@style/Widget.MaterialComponents.Button.UnelevatedButton"





(9) 添加依赖在app/build.gradle下面添加，比如添加'com.google.android.material:material:1.3.0'。
在dependencies中增加     implementation 'com.google.android.material:material:1.3.0' 。然后点击sync now，会把依赖下载到本地。



(10) 修改主题，先去app/src/main/AndroidManifest.xml中，找到主题，然后command+鼠标左键，进入，修改parent属性，改成想要的



(11) FrameLayout属性：

组件的默认位置都是左上角，组件之间可以重叠。像千层饼一样，一层压着一层 可以设置上下左右的对齐、水平垂直居中、设置方式与线性布局相似

常用属性

| 属性                | 可选值                                   | 说明                 |
| ------------------- | ---------------------------------------- | -------------------- |
| layout_gravity      | center/center_vertical/center_horizontal | 组件相对父容器的位置 |
| layout_marginLeft   | 具体的数值100dp                          | 左侧外间距           |
| layout_marginTop    | 具体的数值100dp                          | 上侧外间距           |
| layout_marginRight  | 具体的数值100dp 右侧外间距               |
| layout_marginBottom | 具体的数值100dp                          | 下侧外间距           |






(12) button的insetTop和insetBottom默认大于0dp，背景色都不会填充。这两个属性IDE不会智能提示，只能自己敲，android:insetTop="0dp"。

设置id，android:id="@+id/btn1"







(13) RelativeLayout元素属性

相对于父元素 7个常用属性

| 属性                     | 可选值     | 说明                           |
| ------------------------ | ---------- | ------------------------------ |
| layout_alignParentTop    | true/false | 是否让控件相对于父容器顶部对齐 |
| layout_alignParentBottom | true/false | 是否让控件相对于父容器底部对齐 |
| layout_alignParentLeft   | true/false | 是否让控件相对于父容器左边对齐 |
| layout_alignParentRight  | true/false | 是否让控件相对于父容器右边对齐 |
| layout_centerHorizontal  | true/false | 相对父容器水平居中显示         |
| layout_centerVertical    | true/false | 相对父容器垂直居中显示         |
| centerInParent           | true/false | 相对父容器居中显示             |



(14) 只有LinearLayout的子元素可以使用layout_weight，相对布局等其他布局不可以


(15) linearLayout如果设置了orientation是vertical，那么如果对子元素button再设置layout_gravity为center_vertical会无效，因为父元素要保证它们从上到下按序排列。

也就是说子元素设置的layout_gravity(center_vertical)如果和父元素的orientation(vertical)方向一致的话，就会失效。

linearLayout的orientation如果是horizontal时，对一个控件设置了layout_weight后，layout_width就会失效，所以将layout_width设置为0dp。如果Linearlayout的orientation是vertical，layout_height会失效。








(16) 高版本中，button设置背景色不能用background，需要用backgroundTint





(17) 写布局文件，在src/main/res/layout中，new Layout Resource File。先把root element设置为LinearLayout




(18) layout_gravity：决定该容器相对它的父容器的位置

1.center：该容器相对于它的父容器居中显示
2.horizontal_center:该容器横向方向上相对它的父容器居中显示
3.vertical_center:该容器纵向方向上相对它的父容器居中显示






(19) gravity：决定子控件相对该父容器的位置 

1.center：所有子视图相对于父容器居中显示
2.horizontal_center:所有子容器的横向方向上相对父容器居中显示
3.vertical_center:所有子视图的纵向方向上相对父容器居中显示





(20) layout_width
layout_height 

1.match_parent:填充父容器的剩余空间
2.wrap_content:根据子视图宽高自适应自己的宽高
3.自定义大小50dp





## 四、Typescript


### 1.typescript常见报错：Element implicitly has an 'any' type because expression of type 'string | number' can't be used to index type. 

解决：声明接口，然后用类型断言
```ts
interface IConfig {
    [key: string]: any;
}

```

- 第一种方式：`(args as IConfig)[key2]`

- 第二种方式：`<IConfig>args[key2]`

上面其实是类型断言，类型断言有两种形式：
- <类型>值
- 值 as 类型

### 2. 函数返回never类型，表示总是会抛出异常或根本就不会有返回值

例如：

```ts
function errorEmitter(): never {
  while(true) {}
}
```

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```


### 3. 定义数组的两种方式

```ts
let arr: number[] = [1,2,3];
let arr: Array<number> = [1,2,3];
```


### 4. 元组的约束比数组强，数量和每一项的类型都确定了

元组在读CSV文件的时候会用到

```ts
const info: [string, string, number] = ['yang', 'male', 18]
```



### 5. 对象数组

```ts
// type alias 类型别名
type User = { name: string; age: number };

class Teacher {
  name: string;
  age: number;
}

const objectArr: Teacher[] = [
  new Teacher(),
  {
    name: 'dell',
    age: 28
  }
];
```


### 6. 函数参数为变量名称时不报错，直接写对象参数报错 

```ts
inserface Person{
 name: string
}

function getName(person: Person):void {
  console.log(person.name)  
}

const person = {
  name: 'yang',
  age: 18
}

getName(person) // 参数为变量名称时不报错
getName({
  name: 'yang',
  age: 18
}). // 直接写对象参数，报错
```

解决：
Person接口增加`[prop: string]: any`


### 7. interface定义函数

```ts
interface SayHi {
  (word: string): string;
}

const say: SayHi = (word: string) => {
  return word;
};
```

### 8. 类中super的使用场景

子类覆盖掉父类方法后，想调用父类的方法，可以用`super.getName()`


### 9. 初始化赋值简写

```ts
class Person{
  constructor(public name: string){}

  // 等价于下面
  // public name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
}
```



### 10. 子类声明构造器的时候，要手动调用父类的构造器，也就是super()，即使父类没有构造器

比如：

```ts
class Person{
  constructor(public name: string){}
}

class Teacher extends Person{
  constuctor(public age: number) {
    super('yang') // 不可少  
  }
}
const teacher = new Teacher(20)
```


### 11. getter和setter 保护私有变量

```ts
class Person{
  constructor(private _name: string){}
  get name() {
    return this._name+' good'
  }
  set name(name: string) {
    const realName = name.split(' ')[0];
    this._name = realName
  }
}

const person = new Person('yang')
console.log(person.name)

person.name='ygw good'
console.log(person.name)
```

### 12. 如果把constructor设置为private属性，那就不能在类外通过new的方式调用，但可以在类内调用。借此可以实现单例模式。


### 13. 抽象类只能被继承，不能直接new实现

### 14. void类型

声明一个void类型的变量没有什么大用，因为你只能为它赋予`undefined`和`null`：

```ts
let unusable: void = undefined;
```

### 15. null和undefined类型 

默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

```ts
let test:string = null;
```
然而，当你指定了`--strictNullChecks`标记，**null和undefined只能赋值给void和它们各自**。

### 16. TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它，但是箭头函数`=>`后的返回值类型不可省略

```ts
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```

### 17. 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值


### 18. 枚举的使用：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型
```ts
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```


### 19. 类型保护-去除null或undefined

如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined：
```ts
function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

### 20. 映射类型，从旧类型中创建新类型

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

// 通过从T中选择属性K的集合来构造类型
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

// K 中所有属性值转化为 T 类型
type Record<K extends string, T> = {
    [P in K]: T;
}
```

使用：
```ts
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

```ts
interface Animal {
  canFly: boolean
  canSwim: boolean
}

let person: Pick<Animal, 'canSwim'> = {
  canSwim: true,
}
```

```ts
interface DatabaseInfo {
  id: string
}

type DataSource = 'user' | 'detail' | 'list'

const x: Record<DataSource, DatabaseInfo> = {
  user: { id: '1' },
  detail: { id: '2' },
  list: { id: '3' },
}
```

### 21. extends关键字，主要作用是添加泛型约束

```ts
interface WithLength {
  length: number
}
// extends 来继承
function logger<T extends WithLength>(val: T) {
  console.log(val.length)
}

logger('hello')
logger([1, 2, 3])
// logger(true) // error 没有length属性
```

### 22. keyof关键字，用于获取某种类型的所有键，其返回类型是联合类型
```ts
interface Person {
  name: string
  age: number
}

type PersonKey = keyof Person // "name" | "age"
```


keyof 的使用场景：

```ts
interface Person{
  name: string,
  age: number,
}
```

定义了一个对象`info: Person`，然后一个方法`getInfo(key)`会报类型错误，因为key有可能是`name/age`之外的任意属性。可以这样:

```ts
getInfo<T extends keyof Person>(key: T): Person[T]{
  return this.info[key]
}
```


### 23. typeof关键字，获取一个对象/实例的类型

```ts
interface Person {
  name: string
  age: number
}
const person1: Person = { name: 'monkey', age: 18 }
const person2: typeof person1 = { name: 'jacky', age: 24 } // 通过编译
```

### 24. 联合类型，表示其类型为多个类型中的任意一个

```ts
export type ButtonSize = 'lg' | 'md' | 'sm'
```

### 25. 交叉类型，将多个类型合并成一个类型

```ts
type Props = TypographyProps & ColorProps & SpaceProps
```

### 26. Symbol

Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

```js
let a = Symbol.for('abc');
let b = Symbol.for('abc');
a === b; // true

let c = Symbol('abc');
let d = Symbol('abc');
c === d; // false
```

### 27. superagent可以用来爬虫，抓取页面
cheerio进行数据提取

### 28. tsconfig.json配置

- tsconfig.json文件中`outDir: './build'`，可以更改编译后的文件地址，如果不指定，直接运行tsc则会在js同文件夹下生成对应的ts文件
- tsconfig.json中的`include、exclude、files`表示tsc编译的范围
- `noImplicitAny: true`，表示必须显式的指明any类型，不能隐式的指明
- `strictNullChecks: true`，表示null不能赋值给string/number等
- `incremental: true`, 表示开启增量编译
- `rootDir: './src'`，表示编译入口
- `allowJS: true`, 表示也会编译JS文件，比如将JS文件中的ES6语法编译成ES5
- `checkJS: true`, 表示对JS语法进行检测


- `noUnusedLocals: true`，表示文件中如果有未使用的代码会报错
- `noUnusedParameter: true`, 表示函数有未使用的参数会报错

- `outFile:'./build/index.js'`，会把所有文件打包到一个文件中，但是这时`module`不可以是`commonjs`，可以是`amd`和`system`


### 29. tsc命令

- tsc -w命令可以监听文件变化，实时进行编译

- nodemon可以监听文件变化，不断执行某种操作，比如：nodemon node ./build/main.js

- concurrently可以同时执行多种命令，比如：concurrently npm run dev & npm run start


tsc后面接文件名时，tsconfig.json不生效

直接执行tsc时，tsconfig.json才生效


### 30. `ts-loader 9 doesn't support webpack 4`，降级到8


### 31. 类型融合，比如使用第三方库的时候扩展类型



### 32. jquery的声明文件

```ts
declare module 'jquery' {
  function $(): void;
  // ...
  export = $;
}
```

### 33. refrence

```ts
///<refrence path='./components' />
```
说明本文件依赖components中的变量


### 34. 泛型应用的简单举例

比如，add函数要求后一个参数必须和前一个参数相同，`function add(x: string | number, y: string | number)`达不到这样的效果，可以`function add<T>(x: T, y: T){}`。


泛型还可以继承自`stirng | number`，比如`add<T extends string | number>()`



### 35. 枚举类型

```ts
enum Status={
  offline,
  online=4,
  deleted,
}
```
结果分别是0 4 5

正着查：

```ts
console.log(Status.offline) // 0
```

反着查：

```ts
console.log(Status[0]) // offline
```



### 36. 装饰器

装饰器从上到下、从左到右收集，执行的时候从下到上、从右到左执行

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

打印顺序为 ：

```
f(): evaluated
g(): evaluated
g(): called
f(): called
```

#### (1) 类的装饰器
唯一的参数是类的构造函数

#### (2)  方法装饰器
有三个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

#### (3) 访问器装饰器
有三个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

#### (4) 属性装饰器

有两个参数：
1.  对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

属性装饰器没有办法直接修改此属性，因为装饰器第一个参数是类的原型，`Class.prototype.name = 'yang'`，而属性是`test.name`，可以通过`test.__proto__.name`拿到装饰器里赋予的值

#### (5) 参数装饰器
有三个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。


#### (6) 执行时机
类的装饰器执行时机是在类定义的时候，不是实例化的时候。
方法的装饰器也是一样，是类定义的时候，就会执行。

#### (7) 返回descriptor

在装饰器中创建新的descriptor，并将它返回的时候，新的descriptor会替换被装饰得对象，比如禁止修改类的属性

#### 37. 构造函数的表示方法

```ts
new (...args: any[])=>any 
```

#### 38. 类型保护

只有联合类型中，才会出现需要类型保护的情况

类型保护的方式有：
1. 类型断言
2. in语法
3. typeof
4. instanceof
