- [业务](#业务)
  - [如果需要手动写动画，你认为最小时间间隔是多久，为什么？](#如果需要手动写动画你认为最小时间间隔是多久为什么)
  - [HTML 规范中为什么要求引用资源不加协议头http或者https？](#html-规范中为什么要求引用资源不加协议头http或者https)
  - [扫描二维码登录网页是什么原理，前后两个事件是如何联系的？](#扫描二维码登录网页是什么原理前后两个事件是如何联系的)
- [类型和变量](#类型和变量)
  - [javascript 有哪几种数据类型](#javascript-有哪几种数据类型)
  - [javascript 按照存储方式区分变量类型？](#javascript-按照存储方式区分变量类型)
  - [引用类型的特点？](#引用类型的特点)
  - [typeof 能区分哪些类型？](#typeof-能区分哪些类型)
  - [如何强制类型转换？](#如何强制类型转换)
  - [什么情况下会发生隐式类型转换？](#什么情况下会发生隐式类型转换)
  - [隐式类型转换的常见应用？](#隐式类型转换的常见应用)
  - [如何判断一个变量会被当做true或者false？](#如何判断一个变量会被当做true或者false)
  - [说一下引用类型的比较规则，并回答下列结果](#说一下引用类型的比较规则并回答下列结果)
  - [引用类型比较，何时返回true？](#引用类型比较何时返回true)
  - [值类型的添加属性、获取属性是如何实现的，如获取 str.length ？](#值类型的添加属性获取属性是如何实现的如获取-strlength-)
  - [何时使用===和==？](#何时使用和)
  - [JS内置函数有哪些？](#js内置函数有哪些)
  - [如何理解 JSON？](#如何理解-json)
  - [函数和数组可以有属性吗？](#函数和数组可以有属性吗)
  - [`!!()`是false的情况有哪几种？ ](#是false的情况有哪几种-)
  - [===运算符判断相等的流程是怎样的](#运算符判断相等的流程是怎样的)
  - [==运算符判断相等的流程是怎样的](#运算符判断相等的流程是怎样的)
  - [对象到字符串的转换步骤](#对象到字符串的转换步骤)
  - [对象到数字的转换步骤](#对象到数字的转换步骤)
  - [判断`[] == false`的输出是什么？](#判断--false的输出是什么)
  - [判断`{} == false`的输出是什么？](#判断--false的输出是什么)
  - [判断`[] == ![]`的输出是什么？](#判断--的输出是什么)
  - [判断`{} == !{}`的输出是什么？](#判断--的输出是什么)
  - [判断`console.log( [] ? true : false)`的输出是什么？](#判断consolelog---true--false的输出是什么)
- [原型和原型链](#原型和原型链)
  - [构造函数的特点](#构造函数的特点)
  - [只有对象都有构造函数吗？](#只有对象都有构造函数吗)
  - [如何判断一个函数是否为一个变量的构造函数？](#如何判断一个函数是否为一个变量的构造函数)
  - [逗号运算符的规则](#逗号运算符的规则)
  - [说一下原型链](#说一下原型链)
  - [描述new一个对象的过程？](#描述new一个对象的过程)
  - [如何判断一个变量是数组类型？](#如何判断一个变量是数组类型)
  - [写一个原型链继承的例子](#写一个原型链继承的例子)
- [作用域 闭包 执行上下文](#作用域-闭包-执行上下文)
  - [函数表达式会变量提升吗？](#函数表达式会变量提升吗)
  - [什么是执行上下文？](#什么是执行上下文)
  - [执行上下文特点](#执行上下文特点)
  - [什么是执行上下文栈？](#什么是执行上下文栈)
  - [this使用场景](#this使用场景)
  - [this的特点](#this的特点)
  - [js 的作用域有哪些？](#js-的作用域有哪些)
  - [什么是自由变量和作用域链？](#什么是自由变量和作用域链)
  - [什么是js的闭包？有什么作用，用闭包写个单例模式](#什么是js的闭包有什么作用用闭包写个单例模式)
  - [写一个自执行函数](#写一个自执行函数)
- [异步和单线程](#异步和单线程)
  - [前端使用异步的场景？](#前端使用异步的场景)
  - [同步和异步的区别是什么？分别举一个同步和异步的例子](#同步和异步的区别是什么分别举一个同步和异步的例子)
  - [css 是同步执行还是异步的？](#css-是同步执行还是异步的)
  - [函数方法中，forEach 和 map 的区别？](#函数方法中foreach-和-map-的区别)
- [日期 Math 数组 对象](#日期-math-数组-对象)
  - [获取随机数，要求是长度一致的字符串格式](#获取随机数要求是长度一致的字符串格式)
- [JS Web API](#js-web-api)
  - [DOM是哪种基本数据结构](#dom是哪种基本数据结构)
  - [DOM节点的Attribute和property有何区别？](#dom节点的attribute和property有何区别)
  - [什么是BOM？](#什么是bom)
  - [BOM 通用的API](#bom-通用的api)
  - [如何检测浏览器的类型？](#如何检测浏览器的类型)
  - [拆解URL的各部分](#拆解url的各部分)
  - [对于一个无限下拉加载图片的页面，如何给每个图片绑定事件？](#对于一个无限下拉加载图片的页面如何给每个图片绑定事件)
  - [事件委托](#事件委托)
  - [事件代理的好处](#事件代理的好处)
  - [什么时候用事件委托？](#什么时候用事件委托)
  - [手动编写一个ajax，不依赖第三方库](#手动编写一个ajax不依赖第三方库)
  - [什么是跨域？](#什么是跨域)
  - [可以跨域的三个标签](#可以跨域的三个标签)
  - [三个标签的使用场景](#三个标签的使用场景)
  - [跨域注意事项](#跨域注意事项)
  - [前端优化](#前端优化)
  - [JS实现异步的几种方式](#js实现异步的几种方式)
  - [构造json参数时key需要加引号吗？](#构造json参数时key需要加引号吗)


### 业务
####  如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms＝16.7ms

#### HTML 规范中为什么要求引用资源不加协议头http或者https？

如果用户当前访问的页面是通过 HTTPS 协议来浏览的，那么网页中的资源也只能通过 HTTPS 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。

为了解决这个问题，我们可以省略 URL 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为protocol-relative URL，暂且可译作协议相对 URL。

如果使用协议相对 URL，无论是使用 HTTPS，还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。

#### 扫描二维码登录网页是什么原理，前后两个事件是如何联系的？

核心过程应该是：浏览器获得一个临时 id，通过长连接等待客户端扫描带有此 id 的二维码后,从长连接中获得客户端上报给 server的帐号信息进行展示。并在客户端点击确认后，获得服务器授信的令牌，进行随后的信息交互过程。在超时、网络断开、其他设备上登录后，此前获得的令牌或丢失、或失效，对授权过程形成有效的安全防护。

### 类型和变量
#### javascript 有哪几种数据类型
六种基本数据类型(值类型)
- undefined
- null
- string
- boolean
- number
- symbol(ES6)

三种引用类型
- Object
- Function
- Array

#### javascript 按照存储方式区分变量类型？
- 值类型 
- 引用类型


#### 引用类型的特点？
引用类型无限制扩展属性，内存很大，在内存中公用空间

```
var a=100
var b=a
a=200
console.log(b)   // 100


var a ={age:20}
var b=a
b.age=21
console.log(a)       // {age: 21}
```

#### typeof 能区分哪些类型？
typeof只能区分**值类型**和**函数**。

```
typeof null ==> object
typeof [] ==>object
typeof {} ==>object
typeof console.log ==> function


typeof 'abc' ==> string
typeof 123 ==> number
typeof true ==> boolean
typeof undefined  ==>undefined
typeof NaN==>number
```

#### 如何强制类型转换？

通过String()，Number()，Boolean()函数强制转换

```
var str=123;
var str1='123';

console.log(typeof str); // numbrer
console.log(typeof str1); // string
console.log(typeof String(str)); // string
console.log(typeof Number(str1)); //number
```

#### 什么情况下会发生隐式类型转换？

```
// 1. 字符串拼接
100 + ‘10’ // '10010'


// 2. ==运算符
100 == ‘100’ // true 
0 == ’’ // true  
null == undefined // true


// 3. if语句
if(100){} // true
if(‘’){} // false


// 4. 逻辑运算
10 && 0 // 0   
‘’ || ’abc’  //abc
```



#### 隐式类型转换的常见应用？
巧用隐式类型转换，当要把一个字符串转为数字时，把它减去0，把一个数字转为字符串，加上空字符串。
```
‘32’ – 0   //32 
‘0’+32   // ‘032’
32 + ’’   // ‘032’
```



#### 如何判断一个变量会被当做true或者false？

通过`!![变量]`的方式。
```
var a =10; 
console.log(!!a) // true
```

#### 说一下引用类型的比较规则，并回答下列结果

对象的比较是比较的引用，就是内存是否一样。
```
{} == {}  // false
new Object == new Object()  // false
console.log == console.log  // fase
[1,2] == [1,2]   // false

NaN == NaN    // false, NaN不是引用类型，不过它恒不等于自己。
```

#### 引用类型比较，何时返回true？
除非定义x，然后让x和x比较才为true。
```
console === console // true
```

#### 值类型的添加属性、获取属性是如何实现的，如获取 str.length ？
把原始类型当作对象方式使用的本质，例如访问length属性，或者增加属性。js都会智能转换成包装类型对象，相当于new了一个原始类型对象。当访问完成后，会把这个包装的对象销毁

例子：
```
var str = ‘abc’
var str1 = new string(‘abc’)
console.log(str.length)   //3
str.t =10      // 定义属性
console.log(str.t)    // undefined
```

#### 何时使用===和==？
```
if (obj.a == null){} // 这里相当于obj.a === null || obj.a ===defined,简写形式
```
除了这种情况，其他全用 ===


#### JS内置函数有哪些？
Object, Array, Function, Boolean, Number, String, Date, RegExp, Error，内置函数就这么少。
Math 是对象，不是函数


#### 如何理解 JSON？
- 不过是JS中一个对象而已，Math也是JS内置对象
- 一种数据格式
```
JSON.parse(‘{‘a’: 10, ’b’: 23}’)
JSON.stringify({a: 10, b: 23})
```

#### 函数和数组可以有属性吗？
不仅对象可以有属性，函数和数组也有属性
```
var a=[12,3,4]
a.age=12
function fn(){}
fn.age=12
```

#### `!!()`是false的情况有哪几种？ 
0,NaN, ’’, undefined,null,false   6个


#### ===运算符判断相等的流程是怎样的

1. 如果两个值不是相同类型，它们不相等
2. 如果两个值都是 null 或者都是 undefined，它们相等
3. 如果两个值都是布尔类型 true 或者都是 false，它们相等
4. 如果其中有一个是**NaN**，它们不相等
5. 如果都是数值型并且数值相等，他们相等， -0 等于 0
6. 如果他们都是字符串并且在相同位置包含相同的 16 位值，他它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同==和===都认为他们不相等
7. 如果他们指向相同对象、数组、函数，它们相等；如果指向不同对象，他们不相等

#### ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===比较方法进行比较
2. 如果类型不同，使用如下规则进行比较
3. 如果其中一个值是 null，另一个是 undefined，它们相等
4. 如果一个值是**数字**另一个是**字符串**，将**字符串转换为数字**进行比较
5. 如果有布尔类型，将**true 转换为 1，false 转换为 0**，然后用==规则继续比较
6. 如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较
7. **其他所有情况都认为不相等**

```
undefined == null // true
'0' == 0 // true，字符串转数字
0 == false // true，布尔转数字
'0' == false // true，2个都转成数字
```

```
null == false // false  
undefined == false // false

0 == null // false
0 == undefined // false
0 == NaN // false
```
```

结果分别是什么？
答案：true true true

关键在于Number([])是0，Number({})是NaN，Number(false)是0，
Boolean([])是true，Boolean({})是true
```


#### 对象到字符串的转换步骤

1. 如果对象有 toString()方法，javascript 调用它。如果返回一个原始值（primitive value 如：string number boolean）,将这个值转换为字符串作为结果
2. 如果对象没有 toString()方法或者返回值不是原始值，javascript 寻找对象的 valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript 不能从 toString()或者 valueOf()获得一个原始值，此时 throws a TypeError

#### 对象到数字的转换步骤

```
1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
2. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
3. 否则，throws a TypeError
```

#### 判断`[] == false`的输出是什么？
```
[] == false   // true 
```
因为[].toString()为‘’，‘’和 false 比较时都化为数字0，所以相等。


#### 判断`{} == false`的输出是什么？
```
{} == false   // false 
```
因为{}.toString()为`[object Object]`，`[object Object]`和 false 比较时，false化为数字0，`[object Object]`化为数字1，所以不相等。


#### 判断`[] == ![]`的输出是什么？
```
[] == ! []   // true
```

1. 根据运算符优先级 ，! 的优先级是大于 == 的，所以先会执行 ![]
2. !可将变量转换成 boolean 类型，null、undefined、NaN 以及空字符串( '' )取反都为 true，其余都为false。
3. 所以 ![] 为 false
4. 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf() 方法，用得到的基本类型值按照前面的规则进行比较，如果对象没有 valueOf() 方法，则调用 toString()
5. 所以[]为 ‘’
综上：[] == ![] -> [] == false -> [] == 0 -> '' == 0 -> 0 == 0 -> true


#### 判断`{} == !{}`的输出是什么？
```
{} == !{} // false 
```
1. 因为 {}.toString() -> NaN（[object Object]）
2. 总结：{} == ! {} -> {} == false -> {} == 0 -> NaN == 0 -> false


#### 判断`console.log( [] ? true : false)`的输出是什么？
由上面可知，三元运算符会发生**隐式类型转换**，而 !![] 为true，所以结果为true
```
console.log( [] ? true : false) // true
```

### 原型和原型链
#### 构造函数的特点
1. 构造函数名称大写。
2. 默认 return this，写不写无所谓

```
function Foo(name,age){
    this.name=name;
    this.age = age;
    this.class=1;
    // return this
}  // 默认就是return this,写不写无所谓

var f = new Foo('za',23)
console.log(f)  // Foo {name: "za", age: 23, class: 1}
```

#### 只有对象都有构造函数吗？

所有的引用类型都有构造函数：
1. var a ={} 其实是 var a = new Object() 的语法糖
2. var a =[] 其实是 var a = new Array() 的语法糖
3. function Foo() 其实是 var Foo = new Function() （Function大写）


#### 如何判断一个函数是否为一个变量的构造函数？
应使用 instanceof，typeof 不可以

```
var a = {}
a instanceof Object // true
```

判断引用类型还可以用 Object.prototype.toString.apply()：

```
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


#### 逗号运算符的规则

逗号运算符，会从左到右依次计算表达式的值，最后取最右边的（每个都需要计算）
```
var s = (1,2,3)  
console.log(s)   // 3
```


#### 说一下原型链
五条原型规则
1. 所有的引用类型（数组、对象、函数）都具有对象特性，即可自由扩展属性（除了null）
2. 所有的引用类型（数组、对象、函数）都具有一个__proto__属性，属性值是一个普通对象（隐式原型）
3. 所有函数都有一个prototype属性，属性值也是一个普通对象（显式原型）
4. 所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的 prototype 属性值
5. 当试图得到一个引用类型的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__中（即它的构造函数的 prototype ）寻找

![原型链](imgs/prototype.png)


#### 描述new一个对象的过程？
1. 创建一个对象
2. this指向这个对象
3. 执行代码，即对this赋值
4. 返回this


#### 如何判断一个变量是数组类型？
```
var arr = []
arr instanceof Array;  // true
```


#### 写一个原型链继承的例子

```
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
```
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

#### 函数表达式会变量提升吗？

```
fn1(); 
var fn1=function(){} // 报错(fn1 is not a function)，函数表达式

fn2(); 
function fn2(){} // undefined，函数声明
```
可见，函数声明才会出现变量提升，函数表达式不会。
变量提升的其他例子：
```
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
```
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
#### 什么是执行上下文？
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


#### 执行上下文特点
1. 单线程，在主进程上运行
2. 同步执行，从上往下按顺序执行
3. **全局上下文只有一个**，浏览器关闭时会被弹出栈
4. 函数的执行上下文没有数目限制
5. 函数每被调用一次，**都会产生一个新的执行上下文环境**

#### 什么是执行上下文栈？
执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。
其实这是一个压栈出栈的过程——执行上下文栈。
![执行上下文栈](imgs/js_process_environment.png)

函数中调用其他函数：
![执行上下文栈](imgs/js_process_environment_iter.png)

#### this使用场景

1. 作为构造函数
2. 作为对象属性
3. 作为普通函数
4. call apply bind

普通函数 ，this就是window

#### this的特点
this要在执行时才能确认值，定义时无法确认：
```
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



#### js 的作用域有哪些？

js没有块级作用域，只有函数和局部作用域：
```
// 无块级作用域
if (true) {
    var name = 'ZhangSan'
}
console.log(name) // 'ZhangSan'
```
```
// 函数和全局作用域
var a = 'LiBai'
function fn() {
    var a = 'DuFu'
    console.log(a)
}

console.log('global', a) // 'LiBai'

fn() // 'DuFu'
````




#### 什么是自由变量和作用域链？
1. 当前作用域（函数或全局）没有定义的变量，就是自由变量。
2. 当前函数没有定义a，就一层一层去父级作用域寻找，形成链式结构，成为作用域链。

```
var a = 100
function fn() {
    var b = 200
    console.log(a) // 当前作用域没有定义的变量，即自由变量
    console.log(b)
}

fn()
```
再看一个例子：
```
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

#### 什么是js的闭包？有什么作用，用闭包写个单例模式

MDN对闭包的定义是：闭包是指那些**能够访问自由变量的函数**，**自由变量是指在函数中使用的，但既不是函数参数又不是函数的局部变量的变量**。

由此可以看出，闭包=函数+函数能够访问的自由变量，所以从技术的角度讲，**所有JS函数都是闭包**，但是这是理论上的闭包。还有一个实践角度上的闭包。

从实践角度上来说，只有满足1、**即使创建它的上下文已经销毁，它仍然存在**，2、在代码中引入了自由变量，才称为闭包。

闭包的应用：

1. 模仿块级作用域
2. 保存外部函数的变量
3. 封装私有变量

单例模式，参见 [前端面试手写代码](https://uwayfly.com/detail/69)

#### 写一个自执行函数
```
( function(i){ console.log(i)} ) (2)    // 2
```

### 异步和单线程
#### 前端使用异步的场景？
1. 定时任务：setTimeout，setInterval
2. 网络请求：ajax请求，动态<img>加载
3. 事件绑定



#### 同步和异步的区别是什么？分别举一个同步和异步的例子
- 同步会**阻塞代码执行**，而异步不会
- alert是同步，setTimeout是异步


#### css 是同步执行还是异步的？
css没有同步和异步一说，弄清楚这个问题需要知道浏览器的渲染机制，dom树和css结合之后才会形成渲染树，才会执行页面渲染。


#### 函数方法中，forEach 和 map 的区别？
- forEach()方法不会返回执行结果，而是undefined。
- 也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

### 日期 Math 数组 对象
#### 获取随机数，要求是长度一致的字符串格式
```
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

### JS Web API
#### DOM是哪种基本数据结构
1. DOM，Document Object Model，文档对象模型 
2. DOM 的本质 => 树结构
3.  DOM可以理解为：浏览器把拿到的HTML代码，结构化为一个浏览器能识别并且js可以操作的一个模型而已。


#### DOM节点的Attribute和property有何区别？
1. property只是一个**JS对象的属性**的修改（如`nodeType/nodeName/classList`）
2. attribute是对 **html标签属性**的修改

以下是property：
```
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
```
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


#### 什么是BOM？

1. BOM 是 Broswer Object Model 的缩写，中文为**浏览器对象模型**。
2. BOM 提供了独立于内容而与浏览器窗口进行交互的对象。
3. 由于 BOM 主要用于管理窗口与窗口之间的通讯，因此其核心对象是**` window`**。
4. BOM 缺乏标准，所以你会发现 MDN 上面搜寻不了，JavaScript语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C。


#### BOM 通用的API
- window对象——BOM核心
```
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
```
localtion.href = 'url地址';           // 跳转到这个url地址
localtion.hostname         // 返回 web 主机名
localtion.pathname            // 返回当前页面的路径和文件名
localtion.port             // 返回 web 主机的端口
localtion.protocol      // 返回页面使用的web协议，http||https
```
- navigator对象 —— 获取浏览器的所有信息
```
navigator.appCodeName   // 返回浏览器的代码名
navigator.appMinorVersion      // 返回浏览器的次级版本
navigator.appName    // 返回浏览器的名称
navigator.appVersion   // 返回浏览器的平台和版本信息
navigator.browserLanguage      // 返回当前浏览器的语言
navigator.userAgent       // 返回由客户机发送服务器的 user-agent 头部的值。
```
- screen对象
```
screen.height     // 获取整个屏幕的高
screen.width        // 获取整个屏幕的宽
screen.availiHeight         // 整个屏幕的高减去系统部件的高（可用的屏幕高度）
screen.availWidth         // 整个屏幕的宽减去系统部件的宽（可用的屏幕宽度）
```
- history对象 包含浏览器的历史
```
history.back();         // 返回上一页
history.forward()      // 前进下一页
history.go('参数');     // -1 表示上一页，1表示下一页
```
参考资料：[BOM](https://www.cnblogs.com/pingzi-wq/p/11525058.html)
#### 如何检测浏览器的类型？
```
var ua = navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
var isChrome = ua.includes('Chrome') // true
```
从 userAgent 的输出可以看出，前端可以判断系统类型，`Mac/Windows`，这是很多软件下载网站需要做的事情。

#### 拆解URL的各部分
```
const { href, hash, search, host, port, protocol } = location
```

#### 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件？
采用事件代理，给父容器绑定事件，然后通过 event.target 判断是否是图片类型，是的话，执行事件逻辑。


#### 事件委托

事件委托(事件代理)指的是，**不在事件的发生地（直接dom）上设置监听函数**，而是**在其父元素上设置监听函数**，通过**事件冒泡**，父元素可以监听到子元素上事件的触发，**通过判断事件发生元素DOM的类型**，来做出不同的响应。

举例：最经典的就是`ul`和`li`标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在`li`标签上直接添加，而是在`ul`父元素上添加。

关键是 e.target


#### 事件代理的好处
1. 代码简洁
2. 比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。
3. 事件委托技术可以避免对每个子元素添加事件监听器，减少操作DOM节点的次数，从而减少浏览器的重绘和重排，提高代码的性能。使用事件委托，只有父元素与DOM存在交互，其他的操作都是在JS虚拟内存中完成的，这样就大大提高了性能。

#### 什么时候用事件委托？
当子元素有很多，需要对子元素的事件进行监听的时候。

#### 手动编写一个ajax，不依赖第三方库
```
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


#### xhr.readyState 有几种状态？
- 0，未初始化（还没有调用send方法）;
- 1，载入（已经调用send方法，正在发送请求）;
- 2，载入完成（send方法执行完成，已经收到全部响应内容）;
- 3，交互（正在解析响应的内容）;
- 4，完成（响应内容解析完成，可以在客户端调用了）


#### 什么是跨域？
1. 浏览器有同源策略，不允许ajax访问其他域接口
2. 跨域条件：协议、域名、端口，有一个不同就算跨域


#### 可以跨域的三个标签
img、link、script



#### 三个标签的使用场景
1. `<img>`用于打点统计，统计网站可能是其他域；
2. `<link><script>`可以使用CDN，CDN的也是其他域；
3. `<script>`可以用于JSONP。


#### 跨域注意事项
所有的跨域必须经过信息提供方允许


#### 前端优化
1. 降低请求量（减少请求数量和大小）：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad，防抖和节流。
2. 加快请求速度：预解析DNS，减少域名数，并行加载，CDN 分发。
3. 缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存localStorage。
4. 渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。

#### JS实现异步的几种方式

1. callback
2. 发布订阅模式
3. Promise
4. 生成器函数
5. async/await

#### 构造json参数时key需要加引号吗？
json不是最好加不加，而是必须加，而且加的是双引号。


#### 数组去重的方法
1. indexOf循环去重
2. ES6 Set去重；Array.from(new Set(array))
3. Object 键值对去重；把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。



#### 箭头函数与普通函数的区别
1. 箭头函数是匿名函数，不能作为构造函数，不能使用new
2. 箭头函数不绑定arguments，取而代之用rest参数...解决
3. 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
4. 箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
5. 箭头函数没有原型属性
6. 箭头函数不能当做 Generator 函数,不能使用yield关键字

箭头函数的 this 永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()。
普通函数的this指向调用它的那个对象。

#### `defer` 和 `async` 的区别
![difference between defer and async](imgs/deferAndAsyncDiff.png)

1. defer和async在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于**脚本下载完之后何时执行**，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
3. 关于defer，此图未尽之处在于它是**按照加载顺序执行脚本**的，这一点要善加利用
4. async 则是一个**乱序执行**的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
5. 仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：`Google Analytics`


#### 实现一个两列等高布局

为了实现两列等高，可以给每列加上 `padding-bottom:预加载; margin-bottom:-9999px;`
同时父元素设置`overflow:hidden;`

#### 懒加载与预加载的基本概念

懒加载也叫延迟加载： 延迟加载图片或符合某些条件时才加载某些图片。
预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。


两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。**懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力**。

懒加载的意义及实现方式有：
意义： 懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

实现方式： 
1. 第一种是**纯粹的延迟加载**，使用`setTimeOut或setInterval`进行加载延迟.
2. 第二种是**条件加载**，符合某些条件，或触发了某些事件才开始异步下载。
3. 第三种是**可视区加载**，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。

预加载的意义及实现方式有：
预加载可以说是牺牲服务器前端性能，换取更好的用户体验，这样可以使用户的操作得到最快的反映。
实现预载的方法非常多，可以用`CSS(background)、JS(Image)、HTML(<img />)`都可以。常用的是`new Image()`，设置其`src`来实现预载，再使用`onload`方法回调预载完成事件。只要浏览器把图片下载到本地，同样的src就会使用缓存，这是最基本也是最实用的预载方法。当Image下载完图片头后，会得到宽和高，因此可以在预载前得到图片的大小(方法是用记时器轮循宽高变化)。



#### 关于Event Loop
##### 一、为什么`JavaScript`是单线程？
JavaScript 语言的一大特点就是单线程，也就是说，**同一个时间只能做一件事**。那么，为什么JavaScript 不能有多个线程呢？这样能提高效率啊。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

##### 二、任务队列
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时**主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务**。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是**同步任务（synchronous）**，另一种是**异步任务（asynchronous）**。同步任务指的是，**在主线程上排队执行**的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，**不进入主线程、而进入"任务队列"（task queue）**的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

（1）所有同步任务都在主线程上执行，形成一个**执行栈（execution context stack）**。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。


下图就是主线程和任务队列的示意图。

![任务队列](imgs/eventloop.jpg)

只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

参考资料：[Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)


##### 三、事件和回调函数
"任务队列"是一个**事件的队列**（也可以理解成消息的队列），**IO设备完成一项任务，就在"任务队列"中添加一个事件**，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些**用户产生的事件（比如鼠标点击、页面滚动等等）**。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓"回调函数"（callback），就是那些会**被主线程挂起来的代码**。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

##### 四、Event Loop
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![Event Loop](imgs/eventloop2.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。请看下面这个例子。

```
var req = new XMLHttpRequest();
req.open('GET', url);    
req.onload = function (){};    
req.onerror = function (){};    
req.send();
```
上面代码中的req.send方法是Ajax操作向服务器发送数据，它是一个异步任务，意味着只有当前脚本的所有代码执行完，系统才会去读取"任务队列"。所以，它与下面的写法等价。

```
var req = new XMLHttpRequest();
req.open('GET', url);
req.send();
req.onload = function (){};    
req.onerror = function (){};  
```
也就是说，指定回调函数的部分（onload和onerror），在send()方法的前面或后面无关紧要，因为它们属于执行栈的一部分，系统总是执行完它们，才会去读取"任务队列"。


#### XSS 和 CSRF

- XSS：跨站脚本攻击（Cross-site scripting）
- CSRF：跨站请求伪造（Cross-site request forgery）


XSS：
1. 比如在新浪博客中写一篇文章，同时偷偷插入一段`<script>`
2. 攻击代码中，获取cookie，发送到服务器
3. 发布博客，有人查看博客内容
4. 会把查看者到cookie发送到攻击者到服务器


XSS防范：
- 将`<`和`>`替换

#### flex布局
首先要有个容器，并设置`display: flex; display: -webkit-flex;`
该容器有以下六个属性：

- flex-direction (元素排列方向)
  - row, row-reverse, column, column-reverse
- flex-wrap (换行)
  - nowrap, wrap, wrap-reverse
- flex-flow (以上两者的简写)
  - flex-direction || flex-wrap
- justify-content (水平对齐方式)主轴
  - flex-start, flex-end, center, space-between, space-around
- align-items (垂直对齐方式)交叉轴
  - stretch（拉伸）, flex-start, flex-end, center, baseline（文字底部对齐）
- align-content (多行垂直对齐方式)
  - stretch, flex-start, flex-end, center, space-between, space-around

项目的属性：

- order 排列顺序，数值，默认0
  - "integer"
- flex-grow定义放大比例，默认0，即如果存在剩余空间，也不放大。
  - "number"
- flex-shrink定义缩小比例，默认1，如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
   - "number"
- flex-basis 定义项目占据的主轴空间，默认auto。会根据flex-direction定义的主轴（水平或者垂直），定义项目本来的大小，跟width或者height一样。

- flex 推荐，以上三个的缩写，默认 0 1 auto
  - "flex-grow" "flex-shrink" "flex-basis"
- align-self单个项目有与其他项目不一样的对齐方式，可覆盖align-items
  - "auto","flex-start","flex-end","center","baseline","stretch"　


注意：flex 弹性盒子**消除了里面元素的 block 属性**，因此里面**不用加 Inline-block**


#### BFC及其作用

BFC( block formatting context ）：简单来说，BFC 就是一种属性，这种属性会影响着元素的定位以及与其兄弟元素之间的相互作用。 

中文常译为**块级格式化上下文**。是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。 
在进行盒子元素布局的时候，BFC提供了一个环境，在这个环境中按照一定规则进行布局不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。
也就是说，**如果一个元素符合了成为BFC的条件，该元素内部元素的布局和定位就和外部元素互不影响(除非内部的盒子建立了新的 BFC)**，是一个隔离了的独立容器。（在 CSS3 中，BFC 叫做 Flow Root）


BFC（块级格式化上下文，用于**清除浮动，防止margin重叠**等）
- 直译成：块级格式化上下文，是一个**独立的渲染区域，并且有一定的布局规则**。
- BFC区域不会与float box重叠
- BFC是页面上的一个独立容器，**子元素不会影响到外面**
- 计算BFC的高度时，浮动元素也会参与计算

#### 哪些元素会生成BFC
1. 根元素
2. float不为none的元素
3. position为fixed和absolute的元素
4. display为inline-block、table-cell、table-caption，flex，inline-flex的元素
5. overflow不为visible的元素





#### 同源策略
所谓"同源"是指**协议**、**端口号**、**域名**相同，那么"跨域"就可以理解为**不同源的网站之间的访问**，最常见的应用是当我们调用ajax接口时如果不设置跨域浏览器会报错，这证明使用xmlHttpRequest 对象不能发送跨域请求。

有疑惑的小伙伴肯定会问，那我用a标签和script标签请求其他网站，是不是就是跨域了呢？

这里要明白**跨域**是指在**当前域下调用其他域下的东西**，而链接则是**直接跳转到对方的域下**了，跟你之前的域名毫无关系。


#### JSONP实现跨域的原理

通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过**在请求的 url 后指定一个回调函数**，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，**因为请求的是脚本文件，所以会直接执行**，这样我们先前定义好的**回调函数就可以被调用**，从而实现了跨域请求的处理。这种方式只能用于 get 请求。


#### 浏览器内核的理解

主要分成两部分：**渲染引擎(layout engineer 或 Rendering Engine) **和** JS 引擎**。

- 渲染引擎：**负责取得网页的内容（HTML、 XML 、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机**。
浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
- JS引擎则**解析和执行 javascript 来实现网页的动态效果**。

最开始渲染引擎和JS引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。 


#### 将一个类数组对象转化为数组的几种方法
1. slice
`Array.prototype.slice.call(arguments)`，或者 `[].slice.call(arguments)`亦可
2. splice
`Array.prototype.splice.call(arguments, 0);`

3. `Array.prototype.concat.apply([], arguments)`
4. ES6中的`Array.from`
语法：`Array.from(arguments)`
5. [...arguments]







#### 事件处理程序

##### DOM0 级事件处理程序
1. 先把元素取出来，然后为其属性添加一个事件的方法叫DOM0级处理程序。
2. 它是一种较传统的方式：把一个函数赋值给一个事件处理程序的属性。
3. 优点：简单，跨浏览器的优势



##### DOM2 级事件
两个方法：
1. 处理指定事件处理程序的操作：addEventListener()
2. 删除事件处理程序的操作：removeEventListener()

接收三个参数：
1. 要处理的事件名（**去掉前面的on**，比如直接写`click`或`mouseover`）
2. 作为事件处理程序的函数
3. 布尔值（**false是事件冒泡，true是事件捕获，默认false**）


注意：
1. 通过addEventListener添加的事件只能通过removeEventListener去掉
2. addEventListener可以添加多个事件。



##### IE 事件处理程序
1. attachEvent() 添加事件 （它又加上on了，即onclick等）
2. detachEvent() 删除事件
3. 接收相同的两个参数：事件处理程序的名称和事件处理程序的函数
4. **不使用第三参数**的原因：IE8 以及更早的浏览器版本**只支持事件冒泡**！




##### 事件对象
事件对象（event）：在触发 DOM 上的事件时都会产生一个对象。
DOM 中的事件对象
1. type 属性：用于获取事件类型
2. target 属性：用于获取事件目标
3. stopPropagation() 方法，阻止时间冒泡
4. preventDefault() 方法，阻止事件的默认行为（比如a标签默认跳转）




##### DOM事件级别：
- DOM0：element.onclick=function(){}
- DOM2：element.addEventListener(‘click’, function(){}, false)
- DOM3：element.addEventListener(‘keyup, function(){}, false)

##### DOM事件模型：
- 捕获（从上往下）
- 冒泡（从下往上）


##### 事件流三个阶段
捕获、目标阶段、冒泡


##### 描述DOM事件捕获到具体流程：
- window => document => html => body => ....=> 目标元素


##### event 对象的常见应用：
- event.preventDefault()
- event.stopPropagation()
- event.stopImmediatePropagation() 
- event.currentTarget
- event.target



#### onclick 与 addEventListener 区别？
1. onclick事件在同一时间**只能指向唯一对象**。就算对于一个对象**绑定了多次**，但是仍然只会**执行最后的一次绑定**。
2. addEventListener 给一个事件**注册多个listener**
3. addEventListener 对任何DOM都是有效的，而 onclick 仅限于HTML
4. addEventListener 可以控制 listener 的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用 removeEventListener 清除
5. IE9使用 attachEvent 和 detachEvent




####  absolute、relative、fixed、static 的区别
- absolute：相对于**上一级不是static的元素**定位，脱离文档流。
- relative：相对于**上一级**定位，static也可以，不脱离文档流，保留原来的位置。
- fixed：相对于**浏览器窗口**定义，脱离文档流。
- static：不定位。

#### `display:none`与`visibility：hidden`的区别？
1. `display：none` 不显示对应的元素，在文档布局中不再分配空间（**回流reflow + 重绘repaint**）
2. `visibility：hidden` 隐藏对应元素，在文档布局中仍保留原来的空间（**重绘repaint**）


#### 为什么会出现浮动？什么时候需要清除浮动？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

浮动带来的问题：
1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

#### 清除浮动的方式

1. 父级div定义`height`
2. 最后一个浮动元素后加空div标签 并添加样式`clear:both`。
3. 包含浮动元素的父标签添加样式`overflow为hidden或auto`。
4. 父级div定义`zoom`


#### img标签的title与alt区别
1. title属性规定关于元素的额外信息。这些信息通常会在**鼠标移到元素上**时显示一段工具**提示文本（tooltip text）**。在显示的内容被省略的时候，可以加一个title属性，快速实现提示文本。
2. alt属性alt定义有关图形的短的描述。在**图片加载失败了**的时候，会显示该描述。


另外，注意`onerror`属性：
`onerror`属性找图片加载失败了的时候，可以使用`onerror`将图片替换为默认图片。注意，一定要**在`onerror`里面将`onerror`置空**，不然在新的图片也加载失败后，会形成死循环。
```
<img src="http://example.com/a.png" onerror="this.onerror=''; this.src='http://example.com/b.png'">
```

#### 常见的浏览器内核比较
```
Trident：这种浏览器内核是 IE 浏览器用的内核，因为在早期 IE 占有大量的市场份额，所以这种内核比较流行，以前有很多
网页也是根据这个内核的标准来编写的，但是实际上这个内核对真正的网页标准支持不是很好。但是由于 IE 的高市场占有率，微
软也很长时间没有更新 Trident 内核，就导致了 Trident 内核和 W3C 标准脱节。还有就是 Trident 内核的大量 Bug 等
安全问题没有得到解决，加上一些专家学者公开自己认为 IE 浏览器不安全的观点，使很多用户开始转向其他浏览器。

Gecko：这是 Firefox 和 Flock 所采用的内核，这个内核的优点就是功能强大、丰富，可以支持很多复杂网页效果和浏览器扩
展接口，但是代价是也显而易见就是要消耗很多的资源，比如内存。

Presto：Opera 曾经采用的就是 Presto 内核，Presto 内核被称为公认的浏览网页速度最快的内核，这得益于它在开发时的
天生优势，在处理 JS 脚本等脚本语言时，会比其他的内核快3倍左右，缺点就是为了达到很快的速度而丢掉了一部分网页兼容性。

Webkit：Webkit 是 Safari 采用的内核，它的优点就是网页浏览速度较快，虽然不及 Presto 但是也胜于 Gecko 和 Trid
ent，缺点是对于网页代码的容错性不高，也就是说对网页代码的兼容性较低，会使一些编写不标准的网页无法正确显示。WebKit 
前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。

Blink：谷歌在 Chromium Blog 上发表博客，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 B
link 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。其实 Blink 引擎就是 Webkit 的一个分支，就像 webkit 是
KHTML 的分支一样。Blink 引擎现在是谷歌公司与 Opera Software 共同研发，上面提到过的，Opera 弃用了自己的 Presto 
内核，加入 Google 阵营，跟随谷歌一起研发 Blink。
```

#### 常见浏览器所用内核

```
 （1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；

 （2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；

 （3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；

 （4） Safari 浏览器内核：Webkit 内核；

 （5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；

 （6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；

 （7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；

 （8） 百度浏览器、世界之窗内核：IE 内核；

 （9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；

 （10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说
      是基于火狐内核。
```
#### 什么是JS Engine（JS引擎）？
**处理并执行js代码的运行环境**， 也就是专门处理Js脚本的虚拟机。

#### JS引擎中栈和堆
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

![图解基本数据和引用数据类型存放位置](imgs/stackAndheap.png)



### NodeJS
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



#### 对称加密和非对称加密算法
##### 可解密：
1. 对称加密：DES、3DES、AES
2. 非对称加密：RSA

##### 不可解密：
不可逆加密算法：MD5、SHA1




#### 最快合并两个数组
```
let arr1=[1,3]
let arr2=[4,6]
arr1.concat(arr2) // [1, 3, 4, 6] 


// ES6
[...arr1, ...arr2] // [1, 3, 4, 6]
```


#### 简述js中 for in 与 for of 区别
1. for in是ES5标准，**遍历key**，并且可以遍历**继承的可枚举的属性**，常用于**对象**的遍历。
2. for of是**ES6**标准，**遍历value**，常用于**数组**的遍历。



#### overflow 清除浮动 的原理

要讲清楚这个解决方案的原理，首先需要了解块格式化上下文，块格式化上下文是CSS可视化渲染的一部分，它是一块区域，规定了内部块盒 的渲染方式，以及浮动相互之间的影响关系

当元素设置了overflow样式且值不为visible时，该元素就**构建了一个BFC，BFC在计算高度时，内部浮动元素的高度也要计算在内**，也就是说技术BFC区域内只有一个浮动元素，BFC的高度也不会发生塌缩，所以达到了清除浮动的目的。

