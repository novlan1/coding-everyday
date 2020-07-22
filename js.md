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

```
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms＝16.7ms
```

#### HTML 规范中为什么要求引用资源不加协议头http或者https？
```
 如果用户当前访问的页面是通过 HTTPS 协议来浏览的，那么网页中的资源也只能通过 HTTPS 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。

 为了解决这个问题，我们可以省略 URL 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为protocol-relative URL，暂且可译作协议相对 URL。

 如果使用协议相对 URL，无论是使用 HTTPS，还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。
```

#### 扫描二维码登录网页是什么原理，前后两个事件是如何联系的？

```
 核心过程应该是：浏览器获得一个临时 id，通过长连接等待客户端扫描带有此 id 的二维码后,从长连接中获得客户端上报给 server的帐号信息进行展示。并在客户端点击确认后，获得服务器授信的令牌，进行随后的信息交互过程。在超时、网络断开、其他设备上登录后，此前获得的令牌或丢失、或失效，对授权过程形成有效的安全防护。
```

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
3. DOM可以理解为：浏览器把拿到的HTML代码，结构化为一个浏览器能识别并且js可以操作的一个模型而已。


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


xhr.readyState 有几种状态？
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
1. 降低请求量（减少请求数量和大小）：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad。
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










