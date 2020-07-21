###  如果需要手动写动画，你认为最小时间间隔是多久，为什么？

```
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms＝16.7ms
```

### Html 规范中为什么要求引用资源不加协议头http或者https？
```
 如果用户当前访问的页面是通过 HTTPS 协议来浏览的，那么网页中的资源也只能通过 HTTPS 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。

 为了解决这个问题，我们可以省略 URL 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为protocol-relative URL，暂且可译作协议相对 URL。

 如果使用协议相对 URL，无论是使用 HTTPS，还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。
```

### 扫描二维码登录网页是什么原理，前后两个事件是如何联系的？

```
 核心过程应该是：浏览器获得一个临时 id，通过长连接等待客户端扫描带有此 id 的二维码后,从长连接中获得客户端上报给 server的帐号信息进行展示。并在客户端点击确认后，获得服务器授信的令牌，进行随后的信息交互过程。在超时、网络断开、其他设备上登录后，此前获得的令牌或丢失、或失效，对授权过程形成有效的安全防护。
```

### javascript 有哪几种数据类型
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

### 引用类型的特点？
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

### typeof 能区分哪些类型？
typeof只能区分值类型和函数。

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

### 如何强制类型转换？

通过String（），Number（），Boolean（）函数强制转换

```
var str=123;
var str1='123';
console.log(typeof str); // numbrer
console.log(typeof str1); // string
console.log(typeof String(str)); // string
console.log(typeof Number(str1)); //number
```

### 什么情况下会发生隐式类型转换？

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





### 隐式类型转换的常见应用？

```
‘32’ – 0   //32 
‘0’+32   // ‘032’
32 + ’’   // ‘032’
巧用隐式类型转换，当要把一个字符串转为数字时，把它减去0，把一个数字转为字符串，加上空字符串。
```


### 如何判断一个变量会被当做true或者false？
通过`!![变量]`的方式。
```
var a =10; 
console.log(!!a) // true
```


















