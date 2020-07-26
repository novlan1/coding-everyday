#### nodejs 全局变量和全局对象

##### 1、全局对象

所有模块都可以调用
1）`global`：表示Node所在的全局环境，类似于浏览器中的window对象。
2）`process`：指向Node内置的process模块，允许开发者与当前进程互动。
例如你在DOS或终端窗口直接输入node，就会进入NODE的命令行方式（REPL环境）。退出要退出的话，可以输入 process.exit();
3）`console`：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。
通常是写console.log()，无须多言


##### 2、全局函数：

1）定时器函数：共有4个，分别是`setTimeout()`, `clearTimeout()`, `setInterval()`, `clearInterval()`。
2）`require`：用于加载模块。


##### 3、全局变量：

1）`_filename`：指向当前运行的脚本文件名。
2）`_dirname`：指向当前运行的脚本所在的目录。


##### 4、准全局变量

模块内部的局部变量，指向的对象根据模块不同而不同，但是所有模块都适用，可以看作是伪全局变量，主要为`module`,`module.exports`, `exports`等。

`module`变量指代当前模块。`module.exports`变量表示当前模块对外输出的接口，**其他文件加载该模块，实际上就是读取`module.exports`变量**。

- `module.id` 模块的识别符，通常是模块的文件名。
- `module.filename` 模块的文件名。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回使用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块







####  module.exports 和 exports

 

1. **exports只是module.exports的全局引用**，在模块被导出之前exports被赋值为module.exports。
2. 用中文的话来说就是一个**全局引用**，在模块内部你都可以使用exports导出一些东西。
3. 值得注意的是，**不能给exports赋值**，这很重要，很重要，很重要。

 

比如，你想导出一个类。

```
class Boy{
    constructor(age) {
        this.age = age
    }
    say() {
    }
}

// 导出Boy
exports = Boy // 报错，不能重写exports
// 正确做法
module.exports = Boy 
```

总结：

1. exports只是module.exports的引用
2. 如果你想要使用exports导出模块，千万不能给它赋值！
3. 稳一点的做法是使用module.exports，虽然exports用起来是挺爽的


## path.resolve和path.join的区别

 

path.join只是简单的将路径片段进行拼接，并规范化生成一个路径，而path.resolve则一定会生成一个绝对路径，相当于执行cd操作。

 

 

### path.join()

Ø path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

Ø 长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

Ø 注意：如果路径中出现".."，那么它前面的路径片段将被丢失。

 

“平台特定的分隔符”：

Ø windows下文件路径分隔符使用的是"\"

Ø Linux下文件路径分隔符使用的是"/"

 

比如：

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // 返回: '/foo/bar/baz/asdf'

 

 

### path.resolve()

Ø path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

Ø 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。

Ø 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。

Ø 生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。

Ø 长度为零的 path 片段会被忽略。

Ø 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

 

 

举例：

path.resolve('/foo/bar', './baz');

// 返回: '/foo/bar/baz'

 

path.resolve('/foo/bar', '/tmp/file/');

// 返回: '/tmp/file'

// 如果是path.join的话，就会返回/foo/bar/tmp/file

 

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');

// 如果当前工作目录为 /home/myself/node，

// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'

 

 

 

 

 

## process.cwd()和__dirname区别

 

cwd是指当前node命令执行时所在的文件夹目录，和./作用相同。

__dirname是指被执行js文件所在的文件夹目录

 

### `__dirname``和``./``的区别`

Node.js 中，`__dirname` 总是指向被执行 js 文件的绝对路径，所以当你在 `/d1/d2/myscript.js` 文件中写了 `__dirname`， 它的值就是 `/d1/d2` 。

相反，`./` 会返回你执行 node 命令的路径，例如你的工作路径。

 

 

 

## koa-body作用：

不使用的话，this.request.body是undefined;使用的话，this.request.body是{}。

 

 

### koa-body上传文件注意事项

Ø file在ctx.request.files.file中，不在ctx.request.body中

Ø 请求头Content—Type，为multipart/form-data

 

 

 

 

 

## http-server启动本地服务器

npm install -g http-server

http-server 目录，启动一个本地服务器

Ø -p 端口号 (默认 8080)

Ø -a IP 地址 (默认 0.0.0.0)

Ø -o 在开始服务后打开浏览器

 

 

 

## nodeJS获取IP和Mac地址

 

var os=require("os");

var networkInterfaces=os.networkInterfaces();

console.info(networkInterfaces);

 

 

 

 

 

 

## KOA

浏览器发送请求才会触发中间件函数

koa只会帮你自动执行第一个中间件，剩下的都要由开发者自己来调用

​     

想要调用下一个中间件函数，在前一个中间件函数中调用next()（中间函数有两个参数ctx和next，其中ctx就是上下文，next就是下一个中间件函数）

​     

 

 

### 洋葱模型

中间件打印顺序：1 3 4 2

​     

对应的洋葱模型：

​     

 

 

### async和await

中间件要加上async和await，异步模型，如果不加上async和await很难保证所有的中间件函数都按照洋葱模型来执行（万无一失）。

​     

 

 

next()方法返回的是promise

​     

 

 

想要获取具体的值，而不是promise，可以用then方法

​     

也可以用async和await，await对返回的promise进行***求值\*** 

​     

 

 

await不仅仅可以求promise的值，也可以拿到表达式的值

​     

 

 

资源的操作都是异步的（包括读取文件），以及发送http请求、操作数据库

await会***阻塞线程，等待异步结果的返回\***，把异步代码变成同步的，因为当前代码被阻塞住了，必须等待结果返回后才能继续

​     

 

 

await的两个作用：

1.表达式或proimse求值

2.阻塞线程，等待异步结果返回（切换线程，去做异步任务）

 

 

async意义：函数返回值都是promise（返回值包装为promise）

​     

 

Koa内部处理了，中间件不加async依然会返回promise，这里加上async主要是因为里面使用了await，不加async的话会报错。（面试）

 

 

 

加上async和await是为了保证洋葱模型，比如下面第一中间件没加async和await，打印顺序为1324

​     

 

为什么一定要保证洋葱模型？

有些功能需要让下面的中间件执行完才能进行，比如计时功能，写在next()后面，当next执行完，说明下面的代码都执行完了。

 

 

中间件传递参数利用ctx, 挂载在ctx上面，一定要加上async和await，以及写在next()后面保证后面代码执行完：

​     

 

 

### 路由

ctx.path和request.path等效，以及ctx.method

​     

Ø 不能是小写的get

Ø 不能直接return返回，需写在ctx.body上

Ø Koa自动将对象形式转为JSON返回

 

 

使用koa-router：

​     

 

 

 

REST中get代表查询，post代表新增，put代表更新，delete代表删除

 

 

版本号：

Ø 版本号可以放在路径中、查询参数中或者header中

Ø 最好的方法是在api文件夹下分别新建v1和v2等文件夹，放置不同版本的api文件。不能用if、if，对扩展开放，对修改关闭，所以不能新增功能就修改原来的代码

 

 

 

全局可以有很多个router实例，所以book.js中：

​     

调用的时候，app.js：

​     

 

上层调用下层，下层调用上层可能会导致循环引用

 

commonjs导出可以加大括号，也可以不加，加的话导入的时候也要加，不加的话导入的时候不要加

 

​     

全局安装nodemon，npm install nodemon -g ，不加-g需要npx nodemon来启动nodemon，因为是在命令行中输入nodemon来调用，所以要么写在package.json脚本里，要么npx nodemon，要么就全局安装

 

 

 

Vscode点击’爬虫’，点击设置’齿轮’按钮，会出现launch.json，第一个是默认的，第2个是手动添加的，第3个是添加配置自动生成的。

​     

 

 

RequireDirectory实现路由自动，每当requireDirectory导入一个模块，就执行这个函数，检测导出的是否是router，是的话就app.use()

​     

按F5在vscode中进行断点调试

 

 

 

入口文件不能太复杂，因此重构下, ./core/init.js，里面是一些静态方法，好处是在调用的时候，不用实例化然后再调用其非静态方法，而是一句话就够了，操作都在类里面做：

​     

process.cwd() 可以找到绝对路径

app.js中这样使用：InitManager.initCore(app)

 

### 获取参数

传参有四种方式，下面两种加上header和body

/v1/book/{param}/latest?param=

 

 

使用koa-bodyparse解析body参数

​     

​     

 

 

### 异常处理

异常处理应该throw，而不是return null，让调用它的函数能捕捉到，让用户或开发者知道错误

 

单纯的try catch 捕捉不到异步错误，需要用async和await，await等待异步结果，所以能捕获异常，前提是调用的函数返回的是promise :

​     

 

 

全局异常处理中间件：1.监听错误2.返回有意义的信息，然后在app.js中使用这个中间件app.use(catchError)

​     

 

AOP面向切面编程，不考虑细节

 

 

HTTP状态码

错误分类：已知错误和未知错误（潜在错误）

 

业务代码：

​     

 

http-exception.js，必须继承自Error才能throw出去：

​     

Exception中间件改写成如下，来处理已知异常，已知异常都是有error_code的：

​     

 

 

 

因为有很多地方会用到这种错误类型，封装一个类，继承自HttpException基类，其msg、code等都可以固定下来，也可以传参

​     

调用的时候直接const error = new ParamterException()

 

也可以不每次导入文件，方法是在init.js文件中把那个常用的文件放到global变量上，然后每次用global.errs.ParamterException就可以了，缺点是不易排查错误。

 

 

 

用户=>API=>Model=>MySQL=>KOA=>用户

 

 

### sequelize

使用wamp，安装mysql简单，并且可以用phpmyadmin可视化数据库

 

在koa中用sequelize管理数据库，必须npm install mysql2，以及npm install sequelize

实例化方法：

​     

创建表格，先建立一个继承Model的类，调用类的init方法：

 

​     

 

 

sequelize中事务 transaction 须和where同级

 

连接池：

Ø 如果池中有空闲连接可用，返回该连接。

Ø 如果池中连接都已用完，创建一个新连接添加到池中。

Ø 如果池中连接已达到最大连接数，请求进入等待队列直到有空闲连接可用。

 

 

sequelize连接池，默认最小是0，最大是5。

 

 

idle 参数是指闲置的连接超过多少毫秒被释放。 acquire 参数是指在建立连接出错的时候，在抛出错误之前，池子会尝试建立连接的最大时间，重新连接成功就不抛出错误，不行才再抛。

 

 

 

// 只选择相应属性

Model.findAll( {

  attributes: [ 'foo', 'bar' ]

} );

// 除开某些属性

Model.findAll( {

  attributes: { exclude: [ 'baz' ] }

} );

 

freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步

 

Mysql分组查询，如求三种类别图书的点赞数目

Favor.findAll({

   where: {

​    art_id: {

[Op.in]: ids

​    }

​    

   },

   group: ['art_id'],

   attributes: ['art_id', [Sequelize.fn('COUNT','*'), 'count']]

})

求数目总和是count，求字段总和如分数用sum，第二个参数是字段名称

 

 

Sequelize实现事务，坑比较多

​     

 

大写的Favor是表，小写的favor是表里的一条记录

 

 

 

 

.allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.

如果只监听了 / 路由的 POST 方法，在浏览器中使用 GET 方法访问路由，koa 会自动设置一些 Header 并返回访问该路由的方法不被允许

 

 

 

中间件只在应用程序启动时初始化一次，validator不容易做出中间件

 

 

一旦throw Error就不会继续向下执行了

 

 

Ø jwt的token可以生成很多个，每次只关心它的secretKey和过期时间，也就是有可能一个用户的多个token同时生效

Ø 从用户取到token的uid后，放到ctx中，方便每次取用

Ø 权限管理放到token的信息中，普通用户8、管理员16，验证token做成中间件，token错误或过期或权限不足可以返回相应信息

 

 

 

 

Ø socket来了，判断一条是否仍然被选中的根本是，维护的那个checkedarr（由eid和modelid组成）是否包含这一条的eid和modelid

Ø 单纯判断key不靠谱，因为一插入警报和标的，原来该变的key没变

Ø 搜索过程中，搜索不到的，对曾经选过的取消选择

 

 

 

Ø this.props.form.setFields({user:{value:12,Errors: [new Error('error')]}})

Ø this.props.form.validateFields([])

 

 

 

API接口不要写太多业务逻辑，应该写在model里(MVC)

ThinkPHP Model Service Login三层

 

 

对象比函数的优势是可以保存变量，函数就相当于对象的静态方法。async在static后面，async后面紧跟函数名称

 

 

令牌验证抛出错误即为不合法

​     

 

业务表（抽象出来）/实体表

 

 

弹出层与mark遮罩是同级，它们的上一级设置成fixed，并且overflow：auto，；同时body是height：100%，overflow：hidden。滚动时fixed的那一层的scrollTop变化。

​     

 

 

给查询的结果增加属性，用setDataValue比较安全

​     

 

 

 

用户id不能通过参数传递，非常危险，应该通过token

 

 

 

url和问号？params=1传递的参数都是字符串，而body里json可以记录数据类型。

 

 

Switch不能case 11 || ‘100’，而if可以==。

 

 

 

 

 

避免循环查询数据库的方法是用in，即把查询的字段放到数组里。不可以用for循环，for循环不可控。

 

 

越主要的函数就应该越简洁，复杂逻辑要拆分。

 

 

A文件导入B文件，B文件导入A文件，即循环导入，会导致一个文件为undefined，不好排查，一个解决方法是在函数或类内部导入

 

 

 

Ø CMS即Content Management System的缩写，意为"内容管理系统"。中大型项目不允许直接修改数据库。

Ø 内容的创作人员、编辑人员、发布人员使用内容管理系统来提交、修改、审批、发布内容。（多数情况下给产品和运营用，编辑、统计分析数据）

 

 

forEach里面不能用await，得用for循环

 

 

python只有一个线程，thread伪线程？

 

 

Ø JS适合资源密集型操作，单线程，支持高并发，如果是CPU密集型会一直占用这个线程

Ø NodeJS可以充分单核CPU的性能，高并发是相对的。

 

 

 

Docker为微服务带来了便利

 

 

Ø 老式的分页是pageNum第多少页, perPage,每页多少条；

Ø 新式的分页是start和count，从第几条开始取，连着取多少条。

 

 

Axios不能传递中文参数，用encodeURI

 

Like %key%, mysql不会使用索引，速度慢，而key%会使用索引，即用后面的百分号

 

Python工具型语言

 

 

Sequelize某一字段加1：

 

 

 

对象里面有toJSON方法的话，序列化结果就是toJSON函数返回的对象。

​     

 

 

要过滤某些字段，就可以在模型上添加toJSON方法，方法里面用this.getDataValues(‘’)

​     

 

 

在Model的原型链上添加toJSON方法，就不用每建立一个模型实例就手动添加toJSON方法了。并且添加exclude数组，可以简便的排除。

​     

有个缺陷是只能用于findOne，如果是findAll需要在模型实例上，如Comment.propotype.exclude = [‘id’]进行排除

 

Model中禁止使用构造函数

 

 

Koa静态资源使用koa-static中间件

​     

然后在浏览器中http://localhost:3000/1.jpg就能显示出来了

 

 

静态资源存储方案（如图片、js、css、html，特点是消耗流量）

1.网站目录，缺点污染api

2.专门的静态资源服务器--微服务—带宽足够

3.云服务 OSS 贵 （ECS、RDS、OSS） CDN

4.github gitpage

 

 

 

## NodeJS中的常用API

### path

Path.join(‘’, ’’)

path.dirname获取路径中去掉文件名的部分

path.extname获取文件后缀

path.basename(path, path.extname)，获取除了后缀外的文件名

 

 

### fs

删除文件：fs.unlink(path)

重命名文件：fs.rename(path, newPath)

读取文件：fs.readFile(path, {encoding: 'utf8'})

写入文件：fs.writeFile(path, content, {encoding: 'utf8'})

 

 

### fs的promise

node10以后，fs增加了promise，直接返回结果，如：

const readFile = (path) => {

  return fs2.readFile(path, {encoding: 'utf-8'})

 }

 

const testPath = path.join(__dirname, 'helper.js')

 

readFile(testPath).then(res => {

 console.log(res)

})

 

 

 

### 流

流的类型：

可读流、可写、双向、转换

 

流是基于事件的

 

pipe做的事情：

readable.on('data', (chunk)=>{

writable.write(chunk)

})

readable.on('end', ()=>{

writable.end()

})

 

 

转换流：将一个流转到另一个流，比如读取一个文件，压缩后再写入到另一个文件。gulp的很多模块就是用转换流实现的。

例子：src.pipe(zlib.createGzip()).pipe(writeDesc)

 

 

 

### NodeJS流基本用法：

 

// 创建一个可读流

var readerStream = fs.createReadStream('input.txt');

 

// 创建一个可写流

var writerStream = fs.createWriteStream('output.txt');

 

// 管道读写操作

// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中

readerStream.pipe(writerStream);

 



### 为什么要调用`await next()`？

原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用`await next()`来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。



