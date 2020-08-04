
### 原型和原型链
#### a. 构造函数的特点
1. 构造函数名称大写。
2. 默认 `return this`，写不写无所谓

```js
function Foo(name,age){
    this.name=name;
    this.age = age;
    this.class=1;
    // return this
}  // 默认就是return this,写不写无所谓

var f = new Foo('za',23)
console.log(f)  // Foo {name: "za", age: 23, class: 1}
```

#### b. 只有对象都有构造函数吗？

所有的引用类型都有构造函数：
1. var a ={} 其实是 var a = new Object() 的语法糖
2. var a =[] 其实是 var a = new Array() 的语法糖
3. function Foo() 其实是 var Foo = new Function() （Function大写）


#### c. 如何判断一个函数是否为一个变量的构造函数？
应使用 instanceof，typeof 不可以

```js
var a = {}
a instanceof Object // true
```

判断引用类型还可以用 Object.prototype.toString.apply()：

```js
Object.prototype.toString.call(null)  // "[object Null]"
Object.prototype.toString.call(undefined)  // "[object Undefined]"

Object.prototype.toString.call({})  // "[object Object]"
Object.prototype.toString.call([])  // "[object Array]"
Object.prototype.toString.call(function(){})  // "[object Function]"
```

注意：ie6/7下
```
Object.prototype.toString.apply(null)  // [Object Object]
```


#### d. 逗号运算符的规则

逗号运算符，会从左到右依次计算表达式的值，最后取最右边的（每个都需要计算）
```js
var s = (1,2,3)  
console.log(s)   // 3
```


#### e. 说一下原型链
五条原型规则
1. 所有的引用类型（数组、对象、函数）都具有对象特性，即可自由扩展属性（除了null）
2. 所有的引用类型（数组、对象、函数）都具有一个__proto__属性，属性值是一个普通对象（隐式原型）
3. 所有函数都有一个prototype属性，属性值也是一个普通对象（显式原型）
4. 所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的 prototype 属性值
5. 当试图得到一个引用类型的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__中（即它的构造函数的 prototype ）寻找

![原型链](../../imgs/prototype.png)


#### f. 描述new一个对象的过程？
1. 创建一个对象
2. this指向这个对象
3. 执行代码，即对this赋值
4. 返回this


#### g. 如何判断一个变量是数组类型？
```js
var arr = []
arr instanceof Array;  // true
```


#### h. 写一个原型链继承的例子

```js
// 动物类
function Animal(){
    this.eat = function(){
        console.log('animal eat')}
}

// 狗类
function Dog(){
    this.bark = function(){
        console.log('dog bark')}
}

Dog.prototype = new Animal()

var hashiqi = new Dog()

hashiqi.eat() // animal eat
```
另一个例子：
```js
// 获取元素的构造函数
function Elem(id){
    this.elem = document.getElementById(id)
}

// 构造函数上的原型链上的方法
Elem.prototype.html = function(val){
    var elem = this.elem;
    if(val) {
        elem.innerHTML = val;
        return this;
    } else {
        return  elem.innerHTML;
    }
}

// 构造函数上的原型链上的方法
Elem.prototype.on = function(type,fn){
    var elem = this.elem;
    elem.addEventListener(type,fn);
    return this
}

var div1 = new Elem('div1')
console.log(div1.html())

div1.html('<h1>gogo</h1>').on('click',function(){alert('clicked')}) //链式操作

div1.html('<h1>gogo</h1>').on('click',function({alert('clicked')}).html('<h1>nono</h1>')
```

## 作用域 闭包 执行上下文

#### i. 函数表达式会变量提升吗？

```js
fn1(); 
var fn1=function(){} // 报错(fn1 is not a function)，函数表达式

fn2(); 
function fn2(){} // undefined，函数声明
```
可见，函数声明才会出现变量提升，函数表达式不会。
变量提升的其他例子：

```js
console.log(a);
var a=9;         			 //undefined

fn6('zhang');
function fn6(name){
    console.log(name)
}    		                  // zhang

fn('zhang');
function fn(name){
    age =20; 
    console.log(name, age);
    var age
}                         //zhang 20
```
可以看出，函数提升就可以执行，变量只是声明。
再看几个例子：

```js
fn('zhang');
function fn(name){
    console.log(name, age); 
    var age=10
}    			// zhang undefined

var fo = 1;
var foobar = function(){
    console.log(fo);
    var fo=2;
}
foobar();
// undefined
// 既不是1也不是2，因为函数中的 var fo 存在变量提升，会覆盖全局的 fo
```
#### j. 什么是执行上下文？
当代码运行时，会产生一个对应的执行环境，在这个环境中，所有变量会被事先提出来（变量提升），有的直接赋值，有的为默认值 undefined，代码从上往下开始执行，就叫做执行上下文。

在 JavaScript 中，运行环境有三种，分别是：
1. 全局环境：代码首先进入的环境，也就是一段`<script>`
2. 函数环境：函数被调用时执行的环境
3. eval函数（不常用）

全局范围内什么会出现变量提升？
1. 变量定义
2. 函数声明

函数内什么会出现变量提升？
1. 变量定义
2. 函数声明
3. this
4. arguments


#### k. 执行上下文特点
1. 单线程，在主进程上运行
2. 同步执行，从上往下按顺序执行
3. **全局上下文只有一个**，浏览器关闭时会被弹出栈
4. 函数的执行上下文没有数目限制
5. 函数每被调用一次，**都会产生一个新的执行上下文环境**

#### l. 什么是执行上下文栈？
执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。
其实这是一个压栈出栈的过程——执行上下文栈。

![执行上下文栈](../../imgs/js_process_environment.png)

函数中调用其他函数：

![执行上下文栈](../../imgs/js_process_environment_iter.png)

#### m. this使用场景

1. 作为构造函数
2. 作为对象属性
3. 作为普通函数
4. call apply bind

普通函数 ，this就是window

#### n. this的特点
this要在执行时才能确认值，定义时无法确认：
```js
var a = {
    name : 'A',
    fn: function() {
        console.log(this.name)
    }
}

a.fn() // 此时 this 等于 a

a.fn.call({ name: 'b' }) // 此时 this 等于{ name: 'b' }

var fn1 = a.fn()
fn1() // 此时 this 等于 window
```



#### o. js 的作用域有哪些？

js没有块级作用域，只有函数和局部作用域：
```js
// 无块级作用域
if (true) {
    var name = 'ZhangSan'
}
console.log(name) // 'ZhangSan'
```
```js
// 函数和全局作用域
var a = 'LiBai'
function fn() {
    var a = 'DuFu'
    console.log(a)
}

console.log('global', a) // 'LiBai'

fn() // 'DuFu'
````




#### p. 什么是自由变量和作用域链？
1. 当前作用域（函数或全局）没有定义的变量，就是自由变量。
2. 当前函数没有定义a，就一层一层去父级作用域寻找，形成链式结构，成为作用域链。

```js
var a = 100
function fn() {
    var b = 200
    console.log(a) // 当前作用域没有定义的变量，即自由变量
    console.log(b)
}

fn()
```
再看一个例子：
```js
var a = 100
function fn1() {
    var b = 200
    function fn2() {
        var c = 300
        console.log(a) // 自由变量
        console.log(b) // 自由变量
        console.log(c)
    }
    fn2()
}

fn1()
```

#### q. 什么是js的闭包？有什么作用，用闭包写个单例模式

MDN对闭包的定义是：闭包是指那些**能够访问自由变量的函数**，**自由变量是指在函数中使用的，但既不是函数参数又不是函数的局部变量的变量**。

由此可以看出，闭包=函数+函数能够访问的自由变量，所以从技术的角度讲，**所有JS函数都是闭包**，但是这是理论上的闭包。还有一个实践角度上的闭包。

从实践角度上来说，只有满足1、**即使创建它的上下文已经销毁，它仍然存在**，2、在代码中引入了自由变量，才称为闭包。

闭包的应用：

1. 模仿块级作用域
2. 保存外部函数的变量
3. 封装私有变量

单例模式，参见 [前端面试手写代码](https://uwayfly.com/detail/69)

#### 为什么闭包函数能够访问其他函数的作用域?
顺着作用域链一层一层往上找


#### r. 写一个自执行函数
```js
( function(i){ console.log(i)} ) (2)    // 2
```

### 3. 异步和单线程
#### a. 前端使用异步的场景？
1. 定时任务：setTimeout，setInterval
2. 网络请求：ajax请求，动态<img>加载
3. 事件绑定



#### b. 同步和异步的区别是什么？分别举一个同步和异步的例子
- 同步会**阻塞代码执行**，而异步不会
- alert是同步，setTimeout是异步


#### c. css 是同步执行还是异步的？
css没有同步和异步一说，弄清楚这个问题需要知道浏览器的渲染机制，dom树和css结合之后才会形成渲染树，才会执行页面渲染。


#### d. 函数方法中，forEach 和 map 的区别？
- forEach()方法不会返回执行结果，而是undefined。
- 也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

### 4. 日期 Math 数组 对象
#### a. 获取随机数，要求是长度一致的字符串格式
```js
function getRandomNums(len = 10) {
    var random = Math.random()
    for (let i = 0; i < len; i ++) random += '*'
    return random.slice(0, len)
}

// 更好的方法
function getRandomString() {
  return Math.random()
    .toString(36)
      .substr(2)
} 
// 比如，'ihen49kznl'
```

### 5. JS Web API
#### a. DOM是哪种基本数据结构
1. DOM，Document Object Model，文档对象模型 
2. DOM 的本质 => 树结构
3.  DOM可以理解为：浏览器把拿到的HTML代码，结构化为一个浏览器能识别并且js可以操作的一个模型而已。


#### b. DOM节点的Attribute和property有何区别？
1. property只是一个**JS对象的属性**的修改（如`nodeType/nodeName/classList`）
2. attribute是对 **html标签属性**的修改

以下是property：
```js
var pList = document.querySelectAll('p')
var p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' // 修改样式

console.log(p.className) // 获取class
p.className = 'p1' // 修改class

// 获取nodeName和nodeType
console.log(p.nodeName)
console.log(p.nodeType)
```
以下是attribute：
```js
var pList = document.querySelectAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'mike')

p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px;')
```

attribute：
```
<li class='item'>
  <a href='' class='mock-link'>
    <img src='img/mock.png' alt='mock' style='' />
  </a>
</li>
```


#### c. 什么是BOM？

1. BOM 是 Broswer Object Model 的缩写，中文为**浏览器对象模型**。
2. BOM 提供了独立于内容而与浏览器窗口进行交互的对象。
3. 由于 BOM 主要用于管理窗口与窗口之间的通讯，因此其核心对象是**` window`**。
4. BOM 缺乏标准，所以你会发现 MDN 上面搜寻不了，JavaScript语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C。


#### d. BOM 通用的API
- window对象——BOM核心
```js
window.alert('提示信息')
window.confirm('确认信息')
window.prompt('弹出输入框')
window.open('url地址', '_blank或_self', '新窗口大小')；     // _blank：新开一个空白的窗口打开链接，_self在当前框架中打开链接
window.close()   // 关闭当前页
setTimeout(函数， 时间)    // 定时器，只执行一次
clearTimeout(定时器名称)  // 清除计时器
setInterval(函数，时间)     // 定时器，无限执行
clearInterval()      // 停止执行 setInterval()
```
- location对象
```js
localtion.href = 'url地址';           // 跳转到这个url地址
localtion.hostname         // 返回 web 主机名
localtion.pathname            // 返回当前页面的路径和文件名
localtion.port             // 返回 web 主机的端口
localtion.protocol      // 返回页面使用的web协议，http||https
```
- navigator对象 —— 获取浏览器的所有信息
```js
navigator.appCodeName   // 返回浏览器的代码名
navigator.appMinorVersion      // 返回浏览器的次级版本
navigator.appName    // 返回浏览器的名称
navigator.appVersion   // 返回浏览器的平台和版本信息
navigator.browserLanguage      // 返回当前浏览器的语言
navigator.userAgent       // 返回由客户机发送服务器的 user-agent 头部的值。
```
- screen对象
```js
screen.height     // 获取整个屏幕的高
screen.width        // 获取整个屏幕的宽
screen.availiHeight         // 整个屏幕的高减去系统部件的高（可用的屏幕高度）
screen.availWidth         // 整个屏幕的宽减去系统部件的宽（可用的屏幕宽度）
```
- history对象 包含浏览器的历史
```js
history.back();         // 返回上一页
history.forward()      // 前进下一页
history.go('参数');     // -1 表示上一页，1表示下一页
```
参考资料：[BOM](https://www.cnblogs.com/pingzi-wq/p/11525058.html)
#### e. 如何检测浏览器的类型？
```js
var ua = navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
var isChrome = ua.includes('Chrome') // true
```
从 userAgent 的输出可以看出，前端可以判断系统类型，`Mac/Windows`，这是很多软件下载网站需要做的事情。

#### f. 拆解URL的各部分
```js
const { href, hash, search, host, port, protocol } = location
```

#### g. 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件？
采用事件代理，给父容器绑定事件，然后通过 event.target 判断是否是图片类型，是的话，执行事件逻辑。


#### h. 事件委托

事件委托(事件代理)指的是，**不在事件的发生地（直接dom）上设置监听函数**，而是**在其父元素上设置监听函数**，通过**事件冒泡**，父元素可以监听到子元素上事件的触发，**通过判断事件发生元素DOM的类型**，来做出不同的响应。

举例：最经典的就是`ul`和`li`标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在`li`标签上直接添加，而是在`ul`父元素上添加。

关键是 e.target


#### i. 事件代理的好处
1. 代码简洁
2. 比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。
3. 事件委托技术可以避免对每个子元素添加事件监听器，减少操作DOM节点的次数，从而减少浏览器的重绘和重排，提高代码的性能。使用事件委托，只有父元素与DOM存在交互，其他的操作都是在JS虚拟内存中完成的，这样就大大提高了性能。

#### j. 什么时候用事件委托？
当子元素有很多，需要对子元素的事件进行监听的时候。

#### k. 手动编写一个ajax，不依赖第三方库
```js
function ajax() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/api', false)
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responceText)
        }
    }
    xhr.send(null)
}
```


#### l. xhr.readyState 有几种状态？
- 0，未初始化（还没有调用send方法）;
- 1，载入（已经调用send方法，正在发送请求）;
- 2，载入完成（send方法执行完成，已经收到全部响应内容）;
- 3，交互（正在解析响应的内容）;
- 4，完成（响应内容解析完成，可以在客户端调用了）


#### m. 什么是跨域？
1. 浏览器有同源策略，不允许ajax访问其他域接口
2. 跨域条件：协议、域名、端口，有一个不同就算跨域


#### n. 可以跨域的三个标签
img、link、script



#### o. 三个标签的使用场景
1. `<img>`用于打点统计，统计网站可能是其他域；
2. `<link><script>`可以使用CDN，CDN的也是其他域；
3. `<script>`可以用于JSONP。


#### p. 跨域注意事项
所有的跨域必须经过信息提供方允许


#### q. 前端优化
1. 降低请求量（减少请求数量和大小）：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad，防抖和节流。
2. 加快请求速度：预解析DNS，减少域名数，并行加载，CDN 分发。
3. 缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存localStorage。
4. 渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。

#### r. JS实现异步的几种方式

1. callback
2. 发布订阅模式
3. Promise
4. 生成器函数
5. async/await

注意：`await`在`for`循环中才生效，`forEach`不生效

#### s. 构造json参数时key需要加引号吗？

json不是最好加不加，而是必须加，而且加的是双引号。


#### t. 数组去重的方法
1. indexOf循环去重
2. ES6 Set去重；Array.from(new Set(array))
3. Object 键值对去重；把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。



#### u. 箭头函数与普通函数的区别
1. 箭头函数是匿名函数，不能作为构造函数，不能使用new
2. 箭头函数不绑定arguments，取而代之用rest参数...解决
3. 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
4. 箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
5. 箭头函数没有原型属性
6. 箭头函数不能当做 Generator 函数,不能使用yield关键字

箭头函数的 this 永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()。
普通函数的this指向调用它的那个对象。


#### w. XSS 和 CSRF

- XSS：跨站脚本攻击（Cross-site scripting）
- CSRF：跨站请求伪造（Cross-site request forgery）


##### XSS攻击
1. 比如在新浪博客中写一篇文章，同时偷偷插入一段`<script>`
2. 攻击代码中，获取cookie，发送到服务器
3. 发布博客，有人查看博客内容
4. 会把查看者到cookie发送到攻击者到服务器


##### XSS防范
- 将`<`和`>`替换



##### CSRF攻击

CSRF攻击：攻击者盗用了你的身份，以你的名义向第三方网站发送恶意请求。 CRSF能做的事情包括利用你的身份发邮件、发短信、进行交易转账等，甚至盗取你的账号。


1. 首先用户C浏览并登录了受信任站点A；
2. 登录信息验证通过以后，站点A会在返回给浏览器的信息中带上已登录的cookie，cookie信息会在浏览器端保存一定时间（根据服务端设置而定）；
3. 完成这一步以后，用户在没有登出（清除站点A的cookie）站点A的情况下，访问恶意站点B；
4. 这时恶意站点 B的某个页面向站点A发起请求，而这个请求会带上浏览器端所保存的站点A的cookie；
5. 站点A根据请求所带的cookie，判断此请求为用户C所发送的。


受害者只需要做下面两件事情，攻击者就能够完成CSRF攻击：
1. 登录受信任站点 A，并在本地**生成cookie**；
2. 在**不登出站点A（清除站点A的cookie）**的情况下，访问**恶意站点B**。


##### CSRF的防御
1. 尽量使用`POST`，限制`GET`
2. 将`cookie`设置为`HttpOnly`
3. 增加`token` (在请求中放入攻击者所不能伪造的信息，并且该信息不存在于cookie之中)
4. 通过`Referer`识别
5. 在 HTTP 头中自定义属性并验证





#### x. 同源策略
所谓"同源"是指**协议**、**端口号**、**域名**相同，那么"跨域"就可以理解为**不同源的网站之间的访问**，最常见的应用是当我们调用ajax接口时如果不设置跨域浏览器会报错，这证明使用xmlHttpRequest 对象不能发送跨域请求。

有疑惑的小伙伴肯定会问，那我用a标签和script标签请求其他网站，是不是就是跨域了呢？

这里要明白**跨域**是指在**当前域下调用其他域下的东西**，而链接则是**直接跳转到对方的域下**了，跟你之前的域名毫无关系。


#### y. JSONP实现跨域的原理

通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过**在请求的 url 后指定一个回调函数**，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，**因为请求的是脚本文件，所以会直接执行**，这样我们先前定义好的**回调函数就可以被调用**，从而实现了跨域请求的处理。这种方式只能用于 get 请求。


#### z. 将一个类数组对象转化为数组的几种方法
1. slice
`Array.prototype.slice.call(arguments)`，或者 `[].slice.call(arguments)`亦可
2. splice
`Array.prototype.splice.call(arguments, 0);`

3. `Array.prototype.concat.apply([], arguments)`
4. ES6中的`Array.from`
语法：`Array.from(arguments)`
5. `[...arguments]`




#### a. 什么是JS Engine（JS引擎）？
**处理并执行js代码的运行环境**， 也就是专门处理Js脚本的虚拟机。

#### b. JS引擎中栈和堆
- 同其它编程语言（java）一样，JS引擎中也有堆(Heap)和栈(Stack)的概念
- 堆和栈都是内存中划分出来用来存储的区域，是一种数据结构，它基本记录了程序中的位置
- 栈（stack）为**自动分配**的内存空间，它由系统**自动释放**，用来存储**方法和基本数据类型**；
- 堆（heap）则是**动态分配**的内存，**大小不定**，也不会自动释放，用来存储**引用数据类型**;


基本数据类型存储
- 基本数据类型存放在栈中
- 栈内存中的简单数据，数据大小确定，内存空间大小可以分配，是直接**按值存放**的

引用数据类型
- 引用类型存放在堆中，变量实际上是一个**存放在栈内存的指针**，
- 这个指针指向堆内存中的地址。每个空间大小不一样，根据情况进行特定的分配

![图解基本数据和引用数据类型存放位置](../../imgs/stackAndheap.png)


#### c. 对称加密和非对称加密算法
##### 可解密：
1. 对称加密：DES、3DES、AES
2. 非对称加密：RSA

##### 不可解密：
不可逆加密算法：MD5、SHA1




#### d. 最快合并两个数组
```js
let arr1=[1,3]
let arr2=[4,6]
arr1.concat(arr2) // [1, 3, 4, 6] 


// ES6
[...arr1, ...arr2] // [1, 3, 4, 6]
```


#### e. 简述js中 for in 与 for of 区别
1. for in是ES5标准，**遍历key**，并且可以遍历**继承的可枚举的属性**，常用于**对象**的遍历。
2. for of是**ES6**标准，**遍历value**，常用于**数组**的遍历。



#### g. 如何在选择图片后，不经后端而显示预览图片？
1. 监听`input`的`change`事件，从`e.target.files[0]`获取file对象。
2. `window.URL`获取URL对象，利用`URL.createObjectURL(file)`生成目标`url`，设置`img`的`src`属性为生成的`url`。 或者`new一个FileReader()`得到`reader`....



#### h. Blob 和 ArrayBuffer

##### Blob
`Blob(binary large object)`，**二进制类文件大对象**，是一个可以**存储二进制文件的“容器”**，HTML5中的Blob对象除了存放二进制数据外还可以设置这个数据的MIME类型。File接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

```js
new Blob([data], {type: "application/octet-binary"})
```
Blob构造函数接受两个参数，第一个参数是一个包含实际数据的数组，第二个参数是数据的MIME类型。

##### ArrayBuffer
`ArrayBuffer`对象表示内存中一段原始的二进制数据容器（**缓冲区**）

```js
const buffer = new ArrayBuffer(8); // create an ArrayBuffer with a size in bytes

console.log(buffer.byteLength); // 8
```



##### Blob 和 ArrayBuffer 的区别

1. Blob和ArrayBuffer都能存储二进制数据。Blob相对而言储存的**二进制数据大**（如File文件对象）。
2. ArrayBuffer对象表示原始的二进制数据缓冲区，即在内存中分配指定大小的二进制缓冲区（容器），用于存储各种类型化数组的数据，是**最基础的原始数据容器，无法直接读取或写入**， 需要通过具体视图来读取或写入，即`TypedArray`对象或`DataView`对象对内存大小进行读取或写入；Blob对象表示一个不可变、原始数据的类文件对象。
3. ArrayBuffer是**原始的二进制数据缓冲区**，**不能设置MIME类型**；Blob可以储存大量的二进制编码格式的数据，可以设置对象的MIME类型。

二者可以相互转换：
```js
// Blob => ArrayBuffer：
let blob = new Blob([1,2,3,4])
let reader = new FileReader();
reader.onload = function(result) {
    console.log(result);
}
reader.readAsArrayBuffer(blob);

// ArrayBuffer => Blob：
let blob = new Blob([buffer])
```

#### i. 使用blob和URL.createObjectURL生成一个url

```js
var blob = new Blob("保存为blob形式的数据");
var url = new URL.createObjectURL(blob);
```
可以被img等标签使用,例如:image.src = url;


#### j. URL.createObjectURL()

URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的File对象或Blob对象。

#### k. `URL.createObjectURL(blob)`和`FileReader.readAsDataURL(file)`的异同：

区别
1. 通过`FileReader.readAsDataURL(file)`可以获取一段`data:base64`的字符串
2. 通过`URL.createObjectURL(blob)`可以获取当前文件的一个`内存URL`


执行时机
1. `createObjectURL`是同步执行（立即的）
2. `FileReader.readAsDataURL`是异步执行（过一段时间）

内存使用
1. `createObjectURL`返回一段带hash的url，并且一直存储在内存中，直到`document`触发了unload事件（例如：document close）或者执行revokeObjectURL来释放。
2. `FileReader.readAsDataURL`则返回包含很多字符的`base64`，并会比`blob url`消耗更多内存，但是在不用的时候会自动从内存中清除（通过垃圾回收机制）



#### l. 文件和二进制数据对象

Blob对象是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的API，用来操作文件。
- `File`对象：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
- `FileList`对象：File对象的网页表单接口；
- `FileReader`对象：负责将二进制数据读入内存内容；
- `URL`对象：用于对二进制数据生成URL。


对于不同类型的文件，`FileReader`提供不同的方法读取文件。
- `readAsBinaryString(Blob|File)`：返回二进制字符串，该字符串每个字节包含一个0到255之间的整数。
- `readAsText(Blob|File, opt_encoding)`：返回文本字符串。默认情况下，文本编码格式是’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。
- `readAsDataURL(Blob|File)`：返回一个基于Base64编码的data-uri对象
- `readAsArrayBuffer(Blob|File)`：返回一个ArrayBuffer对象。



参考资料：[js中Blob对象一般用法](https://www.cnblogs.com/cheng825/p/11694348.html) [ArrayBuffer-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

#### m. 实现promise时需要注意的点

1. `New promise`时接收一个`executor函数`作为参数，该函数立即执行，该函数有两个参数`resolve`和`reject`，它俩也是函数。
2. 状态流转，只能从`pending`转为`fulfilled`或者`rejected`，并且不可逆。
3. `Promise`拥有一个`then`方法，接收两个参数`onFulfilled`和`onRejected`，分别作为`promise`成功和失败的回调。所以在`then`方法中对`state`进行判断，如果为`fulfilled`执行`onFulfilled(value)`，如果为`rejected`，执行`onRejected(reason)`。
4. 由于成功值`value`和失败原因`reason`是用户在`executor`通过`resolve(value)`和`reject(reason)`传入的，所以设置初始的`value`和`reason`为全局变量。
5. 如果是异步调用`resolve()`，比如放到`setTimeout`中，需要添加回调函数数组`onFulfilledCallbacks`和`onRejectedCallbacks`，并且在`then`方法中将`pending`状态的回调放到两个回调数组中(用来存储`then()`传入的成功和失败的回调)。当用户调用`resolve()`或`reject()`的时候，修改`state`状态时，并从相应的回调数组中取出回调执行。

### 6. fetch发送2次请求的原因

fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功？

原因很简单，因为你用fetch的post请求的时候，导致`fetch`第一次发送了一个`Options`请求，**询问服务器是否支持修改的请求头**，如果服务器支持，则在第二次中发送真正的请求。



### 7. 正则中的`()`和`[]`有本质的区别
- ()内的内容表示的是一个子表达式，()本身不匹配任何东西，也不限制匹配任何东西，只是把括号内的内容作为同一个表达式来处理，例如(ab){1,3}，就表示ab一起连续出现最少1次，最多3次。如果没有括号的话，ab{1,3},就表示a，后面紧跟的b出现最少1次，最多3次。另外，括号在匹配模式中也很重要。
- []表示匹配的字符在[]中，并且只能出现一次，并且特殊字符写在[]会被当成普通字符来匹配。例如[(a)]，会匹配(、a、)、这三个字符。

所以() [] 无论是作用还是表示的含义，都有天壤之别，没什么联系

#### a. 圆括号()是组，主要应用在限制多选结构的范围/分组/捕获文本/环视/特殊模式处理
示例：

1. `(abc|bcd|cde)`，表示这一段是abc、bcd、cde三者之一均可，顺序也必须一致
2. `(abc)?`，表示这一组要么一起出现，要么不出现，出现则按此组内的顺序出现
3. `(?:abc)`表示找到这样abc这样一组，但不记录，不保存到$变量中，否则可以通过$x取第几个括号所匹配到的项，比如：`(aaa)(bbb)(ccc)(?:ddd)(eee)`，可以用`$1`获取`(aaa)`匹配到的内容，而`$3`则获取到了`(ccc)`匹配到的内容，而`$4`则获取的是由`(eee)`匹配到的内容，因为前一对括号没有保存变量
4. `a(?=bbb)` 顺序环视 表示a后面必须紧跟3个连续的b
5. `(?i:xxxx)` 不区分大小写 (?s:.*) 跨行匹配.可以匹配回车符

#### b. 方括号是单个匹配，字符集/排除字符集/命名字符集
示例：

1. `[0-3]`，表示找到这一个位置上的字符只能是0到3这四个数字，与(abc|bcd|cde)的作用比较类似，但圆括号可以匹配多个连续的字符，而一对方括号只能匹配单个字符
2. `[^0-3]`，表示找到这一个位置上的字符只能是除了0到3之外的所有字符
3. `[:digit:]`：0-9，`[:alnum:]` ：A-Za-z0-9


### 8. `clothes.length=0, clothes[0]` 的值是什么
```
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

clothes[0]; // => ???
```

减少length属性的值有一个副作用，就是会删除索引位于新旧长度值之间的元素。

`clothes[0]` 是`undefined`，因为 `clothes` 数组被清空了。



### 9. 空语句
```js
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1);
}

numbers; // => ???
```

很容易忽略这个分号，而它创建了一个空语句。空语句是不做任何事情的语句。

`for()` 在空语句（什么也不做）上循环了 4 次，忽略了实际上往数组里添加元素的代码块`{ numbers.push(i + 1); }。`


### 10. 自动插入分号
```js
function arrayFromValue(item) {
  return
    [item];
}

arrayFromValue(10); // => ???
```
很容易忽略`return`关键字和`[items]`表达式之间的换行。
换行使 JavaScript 自动在`return`和`[items]`表达式之间插入一个分号。函数中的` return;` 导致它返回` undefined`。
因此 `arrayFromValue(10)` 的值是 `undefined`。


### 11. 让坐标变化的2种方式

- 传统的top, left坐标修改
- CSS3中的transform属性

### 12. 自适应字体大小
给html设置`fontSize`大小，其实就是在`DOMContentLoaded`或者`resize`变化后调整`fontSize`的大小，从而调整rem的比值关系。


```js
var docEl = document.documentElement,
    //当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
    //注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
    //总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        //设置根字体大小
        docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
    };

//绑定浏览器缩放与加载时间
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);
```



### 13. `requestAnimFrame`
`requestAnimFrame();`  是一个比较科学的API，相对于`setInterval`和`setTimeout`来讲，`requestAnimFrame`会更科学

`requestAnimFrame`的原理就是：当前绘制完成之后，去根据你**机器的性能**来确定**间隔多长时间绘制下一帧**，所以它是一个智能计算的过程。而`setInterval`和`setTimeout`会有一个固定的时间，比如我们指定给它每过60ms就绘制一帧，万一你绘制的内容非常大，以至于60ms之内不能完成，而`requestAnimFrame`会是一个科学的方法，
但是也有一个问题：`fps`————`frame per second`(每秒多少帧).
使用`requestAnimFrame`会导致帧与帧之间的时间间隔是不固定的，所以有一个动态的时间间隔。



### 14. 正则断言
- `(?=)`这个语法结构在正则里表示“设定后面是”的意思。
- `(?=.*[a-zA-Z])`  这句的意思就是后面必须有一位大写或小写字母
- `(?=.*[1-9])` 这句的意思是后面必须有一位数字

正则表达式从文本头部向尾部开始解析，文本尾部方向为“前”，头部方向为“后”
前瞻：正则表达式匹配到规则的时候，向前检查是否符合断言，后顾/后瞻方向相反（javascript不支持）

- `reg(?=exp)`，零宽度正先行断言，reg匹配的内容后面内容满足exp规则
- `reg(?!exp)`，零宽度负先行断言，reg匹配的内容后面内容不满足exp规则
- `(?<=exp)reg`，零宽度正后发断言，reg匹配的内容前面内容满足exp规则
- `(?<!exp)reg`，零宽度负后发断言，reg匹配的内容前面内容不满足exp规则

"先行"表示待校验的位置在前，即校验的位置在exp匹配的内容之前
"正"表示exp描述的规则，匹配校验位置后面的内容



例如：

- `(?=exp)`  匹配exp前面的位置
  如 `"How are you doing"` 正则`"(.+(?=ing))"` 这里取ing前所有的字符，值为`"How are you do";`

- `(?<=exp)`  匹配exp后面的位置
如 `"How are you doing"` 正则`"((?<=How).+)"` 这里取`"How"`之后所有的字符，值为`" are you doing";`

- `(?!exp)`  匹配后面跟的不是exp的位置
  如`"123abc"` 正则 `"\d{3}(?!\d)"`匹配3位数字后非数字的结果

- `(?<!exp)`  匹配前面不是exp的位置
  如 `"abc123 "` 正则`"(?<![0-9])123"` 匹配"123"前面是非数字的结果也可写成`"(?!<\d)123"`



另外，`?:` 非获取匹配
- `(?:x)`匹配x但是不会捕获，不会 $n 获取到（与()有区别），但是可以被替换



### 15. 双~的用法
`~~`它代表双按位取反运算符，如果你想使用比`Math.floor()`更快的方法，那就是它了。
需要注意：

- 对于正数，它向下取整；
- 对于负数，向上取整；
- 非数字取值为0，它具体的表现形式为：

```js
~~null;      // => 0
~~undefined; // => 0
~~Infinity;  // => 0
--NaN;       // => 0
~~0;         // => 0
~~{};        // => 0
~~[];        // => 0
~~(1/0);     // => 0
~~false;     // => 0
~~true;      // => 1
~~1.9;       // => 1
~~-1.9;      // => -1
```
 特殊类型，转化为Boolean是true的输出1，转化为boolean是false的输出0；

### 16. `|` 的用法，通常用来取整
```
1.2|0  // 1
1.8|0 // 1
-1.2|0 // -1
```

### 17. `Promise.resolve([123])`，借用promise的形式，统一代码
`()=>{resolve()}`，其实就等于`resolve`，又比如`writer.on('error', reject)`

### 18. 如果两个方法处理错误的方式相同，如何用Promise封装？
高阶函数，接收resove和reject两个参数，返回一个函数，函数的参数是err、body、statuCode三个参数。
调用的时候就只用传两个参数了，否则还要传5个参数。代码清爽
```js
_handleCallBack(resolve, reject) {
  return (err, body, statusCode) {
    if (err)  { reject(err) }
    else { resolve( {code: statusCode, body } ) }
  }
}
```

### 19. 原生JS获取dom中的id
- `querySelector()` 返回匹配的一个元素，比如`'.class'`，`‘#id’`
- 把数据通过`data-`放在dom上，比如`data-id={id}`，JS中获取到元素后，通过`element.dataset.id`来取



### 20. 对比`forEach`、`for in`、`for of`
#### a. `forEach`
1. 不能终止循环，break，continue不能使用。
2. 不适应于 字符串，Object。

#### b. `for in`
1. index索引为字符串型数字，不能直接进行几何运算。
2. 遍历顺序有可能不是按照实际数组的内部顺序。
3. 使用`for in`会遍历数组所有的**可枚举属性**，包括原型。

所以for in更适合遍历对象，不要使用for in遍历数组

### 21. `for of`
1.	`for..of`适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象，因为没有迭代器对象。
2.	与`forEach()`不同的是，它可以**正确响应`break`、`continue`和`return`语句**。
3.	for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用`for-in`循环（这也是它的本职工作）或内建的Object.keys()方法。



### 22. `onmouseenter`和`onmouseover`对比
- `onmouseenter`和`onmouseleave`是一组：当鼠标进入指定区域的时候触发，但是不支持冒泡，进入或者离开子组件都不触发。
- `onmouseover`和`onmouseout`是一组：当鼠标进入指定区域的时候触发，进入或者离开子组件也都触发

比如在A上绑定事件，A包含子元素B，`onmouseenter` A进入B不触发，`onmouseover` A进入B触发



### 23. 数据属性和访问器属性

ECMAScript中有两种属性：数据属性和访问器属性，数据属性一般用于存储数据数值，访问器属性对应的是set/get操作，不能直接存储数据值，每种属性下面又都含有四个特性.下面介绍一下:

数据属性
1. `[[Configurable]]`: 表示**能否通过delete将属性删除**，**能否把属性修改为访问器属性**, 默认为false。当把属性Configurable设置为false后，该属性不能通过delete删除，并且也无法再将该属性的Configurable设置回true
2. `[[Enumerable]]`: 表示属性**可否被枚举**(即是否可以通过for in循环返回)，默认false
3. `[[Writable]]`: 表示属性**是否可写**(即是否可以修改属性的值)，默认false
4. `[[Value]]`: 该属性的数据值, 默认是undefined


访问器属性
1. `[[Configurable]]`: 表示能否通过delete将属性删除，能否把属性修改为数据属性, 默认为false。当把属性Configurable设置为false后，该属性不能通过delete删除，并且也无法再将该属性的Configurable设置回true
2. `[[Enumerable]]`: 表示属性可否被枚举(即是否可以通过for in循环返回)，默认false
3. `[[Get]]`: 读取属性时调用的函数, 默认为undefined
4. `[[Set]]`: 写入属性时调用的函数, 默认是undefined


### 25. `eval`和`json.parse` 解析`json`的区别：
1.	`eval`不会判断你的字符串**是否合法**，且`json`字符串中的**一些方法会被执行**。
2.	`parse`要判断字符串是否合法，要是不合法报错。
3.	使用`parse`相对于`eval`比较安全，要是调用第三方数据，数据中存在恶意代码，使用`eval`就会被执行。



### 26. `undefined`和字符串相加
```js
console.log("a"+a); var a = 1; // aundefined
console.log("b"+b); var b = 1; // bundefined
```

### 27. parseInt()和Number()的区别
- parseInt() 和 parseFloat() 方法只转换第一个无效字符之前的字符串，因此 "1.2.3" 将分别被转换为 "1" 和 "1.2"。
- 用 Number() 进行强制类型转换，"1.2.3" 将返回 NaN，因为整个字符串值不能转换成数字。
- 如果字符串值能被完整地转换，Number() 将判断是调用 parseInt() 方法还是 parseFloat() 方法。



### 29. `toSring`和`valueOf`对比
1. toString() 方法返回一个**表示该对象的字符串**。
对于对象x，toString() 返回 `“[object type]”`,其中type是对象类型。如果x不是对象，toString() 返回x应有的文本值(不是单纯的加”“)

2. valueOf() 方法返回**指定对象的原始值**
每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，valueOf() 就会返回对象自身

对比：
- 当函数fn用+连接一个字符串或者是数字的时候，如果我们没有重新定义valueOf和toString，其隐式转换会调用默认的toString()方法，将函数本身内容作为字符串返回； 
- 如果我们自己重新定义toString/valueOf方法，那么其转换会按照我们的定义来，其中valueOf比toString优先级更高（不鸣则已，一鸣惊人）
```js
// 这个对象是一个函数
function fn() {
    return 20;
} 
console.log(fn + 10);  // function fn(){return 20}10
console.log(fn + 'hello'); // function fn(){return 20}hello

fn.toString = function() {
    return 10;
}
console.log(fn + 10);  // 20
console.log(fn + 'hello');  //10hello

fn.valueOf = function() {
    return 5;
}

console.log(fn + 10);   //15
console.log(fn + 'hello');   //5hello
```
如果这个对象不是函数呢？ 
经测试，如果这个对象是object、数组，结果和上面的一样 
但如果这个对象是Date，则都调用toString()



### 30. 序列化的坑
- `undeifined`属性不会出现在序列化后的字符串中
- `NaN`和`nfinity`都会转出`null`，`New Date() `会转成时间
```js
var obj = {x: 1, y: true, z: [1,2,3], nullVal: null}

JSON.stringify(obj) // "{"x":1,"y":true,"z":[1,2,3],"nullVal":null}"

obj = {a: undefined, b: NaN, c: Infinity, d: new Date()}
JSON.stringify(obj) // "{"b":null,"c":null,"d":"2020-07-26T09:11:16.677Z"}"
```



### 32. 生成数组`0-4`
```
Array.from({length: 5}, (v, i) => i);     // [0, 1, 2, 3, 4]
```

### 33. 在 js 中不同进制数字的表示方式
- 以 0X、0x 开头的表示为十六进制。
- 以 0、0O、0o 开头的表示为八进制。
- 以 0B、0b 开头的表示为二进制格式。

### 34. js 中整数的安全范围是多少？
安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 **2^53 - 1**，
即9007199254740991，在 ES6 中被定义为 `Number.MAX_SAFE_INTEGER`。最小整数是-9007199254740991，在 ES6 中
被定义为 `Number.MIN_SAFE_INTEGER`。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
计算返回了正或负的 `Infinity` 值，那么**该值将无法参与下一次的计算**。判断一个数是不是有穷的，可以使用 `isFinite` 函数
来判断。

### 35. isNaN 和 Number.isNaN 函数的区别？
函数 isNaN 接收参数后，会**尝试将这个参数转换为数值**，**任何不能被转换为数值的的值都会返回 true**，比如`undefined`、对象(`{}`)、函数、不能被转成数字的字符串(如‘string’)，因此非数字值传入也会返回 true ，会影响 NaN 的判断。

函数 Number.isNaN 会**首先判断传入参数是否为数字**，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为**准确**。

参考资料：[isNaN](https://uwayfly.com/detail/201)

### 36. 其他值到字符串的转换规则？
```
规范的 9.8 节中定义了抽象操作 ToString ，它负责处理非字符串到字符串的强制类型转换。

（1）Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，

（2）Boolean 类型，true 转换为 "true"，false 转换为 "false"。

（3）Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。

（4）Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

（3）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）
    来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会
    调用该方法并使用其返回值。
```

### 37. 其他值到数字值的转换规则？
```
有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber。

（1）Undefined 类型的值转换为 NaN。

（2）Null 类型的值转换为 0。

（3）Boolean 类型的值，true 转换为 1，false 转换为 0。

（4）String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。

（5）Symbol 类型的值不能转换为数字，会报错。

（6）对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf() 方法。
如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。
```

### 38. 其他值到布尔类型的值的转换规则？
```
ES5 规范 9.2 节中定义了抽象操作 ToBoolean，列举了布尔强制类型转换所有可能出现的结果。

以下这些是假值：
• undefined
• null
• false
• +0、-0 和 NaN
• ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。
```

### 39. {} 和 [] 的 valueOf 和 toString 的结果是什么？
```
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""
```

### 40. 什么是假值对象？
```
浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和
普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它
是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。
```

### 41. 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？
```
解析允许字符串（如 parseInt() ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换（如
Number ()）不允许出现非数字字符，否则会失败并返回 NaN。
```

### 42. || 和 && 操作符的返回值？
```
|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件
判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果
```


### 43. JS为数字添加千位分隔符
```js
function milliFormat(num) {
    return num && num.toString()
        .replace(/\d+/, function(s){
             return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
         })
}
```

### 44. 判断打印顺序
```js
for(var i = 0; i < 5; i++){
  setTimeout((function() {
    return function() {
      console.log(i++)
    }
  })(), 0)
}
// 5 6 7 8 9
```

### 45. ES6 中的 class 的 this 指向
```js
class Logger{
    printName(name = 'there'){
        this.print(`hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}
 
const logger = new Logger();    //实例化

const {printName } = logger;    //printName
printName(); // 报错    VM77:3 Uncaught TypeError: Cannot read property 'print' of undefined

logger.printName(); // 不报错  hello there
```

`printName`方法中的`this` ，默认指向`Logger`类的实例化对象，但如上单独使用的时候，`this`会指向该方法运行时指向的环境。ES6的class内部默认是严格模式，`this`指向`undifined`。


解决方案：
1. 在构造方法中绑定this，这样实例化时 this就会指向当前实例
```js
class Logger{
    constructor(){
        this.printName = this.printName.bind(this);
    }
 
//...
}
```
2. 使用箭头函数

```js
class Logger{
    constructor(){
        this.printName = (name = 'there') => {
            this.print(name);
        }
    }
}
```
3.使用 Proxy， 获取方法的时候，自动绑定this

### click 在 ios 上有300ms延迟，如何解决

1. 粗暴型，禁用缩放
```html
<meta name="viewport" content="width=device-width, user-scalable=no">
```
2. 利用`FastClick`，其原理是：
检测到`touchend`事件后，立刻出发模拟`click`事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉

