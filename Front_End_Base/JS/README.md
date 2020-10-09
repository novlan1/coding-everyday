- [1. 构造函数的特点](#1-构造函数的特点)
- [2. 只有对象都有构造函数吗？](#2-只有对象都有构造函数吗)
- [3. 如何判断一个函数是否为一个变量的构造函数？](#3-如何判断一个函数是否为一个变量的构造函数)
- [4. 逗号运算符的规则](#4-逗号运算符的规则)
- [5. 说一下原型链](#5-说一下原型链)
- [6. 描述new一个对象的过程？](#6-描述new一个对象的过程)
- [7. 如何判断一个变量是数组类型？](#7-如何判断一个变量是数组类型)
- [8. 写一个原型链继承的例子](#8-写一个原型链继承的例子)
- [9. 函数方法中，forEach 和 map 的区别？](#9-函数方法中foreach-和-map-的区别)
- [10. 日期 Math 数组 对象](#10-日期-math-数组-对象)
- [11. 获取随机数，要求是长度一致的字符串格式](#11-获取随机数要求是长度一致的字符串格式)
- [13. JS实现异步的几种方式](#13-js实现异步的几种方式)
- [14. 构造json参数时key需要加引号吗？](#14-构造json参数时key需要加引号吗)
- [15. 数组去重的方法](#15-数组去重的方法)
- [18. 将一个类数组对象转化为数组的几种方法](#18-将一个类数组对象转化为数组的几种方法)
- [19. 什么是JS Engine（JS引擎）？](#19-什么是js-enginejs引擎)
  - [20. JS引擎中栈和堆](#20-js引擎中栈和堆)
- [21. 对称加密和非对称加密算法](#21-对称加密和非对称加密算法)
- [22. 可解密：](#22-可解密)
- [23. 不可解密：](#23-不可解密)
- [24. 如何在选择图片后，不经后端而显示预览图片？](#24-如何在选择图片后不经后端而显示预览图片)
- [25. Blob 和 ArrayBuffer](#25-blob-和-arraybuffer)
- [26. Blob](#26-blob)
- [27. ArrayBuffer](#27-arraybuffer)
- [28. Blob 和 ArrayBuffer 的区别](#28-blob-和-arraybuffer-的区别)
- [29. 使用blob和URL.createObjectURL生成一个url](#29-使用blob和urlcreateobjecturl生成一个url)
- [30. URL.createObjectURL()](#30-urlcreateobjecturl)
- [31. `URL.createObjectURL(blob)`和`FileReader.readAsDataURL(file)`的异同：](#31-urlcreateobjecturlblob和filereaderreadasdataurlfile的异同)
- [32. 文件和二进制数据对象](#32-文件和二进制数据对象)
- [33. fetch 发送2次请求的原因](#33-fetch-发送2次请求的原因)
- [34. 空语句](#34-空语句)
- [35. 自动插入分号](#35-自动插入分号)
- [36. 让坐标变化的2种方式](#36-让坐标变化的2种方式)
- [37. 自适应字体大小](#37-自适应字体大小)
- [38. `requestAnimFrame`](#38-requestanimframe)
- [39. 双~的用法](#39-双的用法)
- [40. `|` 的用法，通常用来取整](#40--的用法通常用来取整)
- [41. 原生JS获取dom中的id](#41-原生js获取dom中的id)
- [42. `onmouseenter`和`onmouseover`对比](#42-onmouseenter和onmouseover对比)
- [43. click 在 ios 上有300ms延迟，如何解决](#43-click-在-ios-上有300ms延迟如何解决)
- [44. PNG,GIF,JPG 的区别及如何选](#44-pnggifjpg-的区别及如何选)
- [45. [,,,] 的长度？](#45--的长度)
- [46. 如何判断当前脚本运行在浏览器还是 node 环境中？](#46-如何判断当前脚本运行在浏览器还是-node-环境中)
- [47. 如何中断ajax请求？](#47-如何中断ajax请求)
- [48. Object.getOwnPropertyNames 和 Object.keys 的区别](#48-objectgetownpropertynames-和-objectkeys-的区别)
- [49. 属性描述对象](#49-属性描述对象)
- [51. 注意img的`onerror`属性：](#51-注意img的onerror属性)
- [52. ajax解决浏览器缓存问题](#52-ajax解决浏览器缓存问题)
- [50. 学习资料](#50-学习资料)


### 1. 构造函数的特点
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

### 2. 只有对象都有构造函数吗？

所有的引用类型都有构造函数：
1. `var a ={}` 其实是 `var a = new Object()` 的语法糖
2. `var a =[]` 其实是 `var a = new Array()` 的语法糖
3. `function Foo()` 其实是 `var Foo = new Function()` （Function大写）


### 3. 如何判断一个函数是否为一个变量的构造函数？
应使用 `instanceof` ， `typeof` 不可以

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


### 4. 逗号运算符的规则

逗号运算符，会从左到右依次计算表达式的值，最后取最右边的（每个都需要计算）
```js
var s = (1,2,3)  
console.log(s)   // 3
```


### 5. 说一下原型链
五条原型规则
1. 所有的引用类型（数组、对象、函数）都具有对象特性，即可自由扩展属性（除了null）
2. 所有的引用类型（数组、对象、函数）都具有一个`__proto__`属性，属性值是一个普通对象（隐式原型）
3. 所有函数都有一个prototype属性，属性值也是一个普通对象（显式原型）
4. 所有的引用类型（数组、对象、函数），`__proto__`属性值指向它的构造函数的 prototype 属性值
5. 当试图得到一个引用类型的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`中（即它的构造函数的 prototype ）寻找

![原型链](../../imgs/prototype.png)

因此，获取实例对象`obj`的原型对象，有三种方法。

- `obj.__proto__`
- `obj.constructor.prototype`
- `Object.getPrototypeOf(obj)`

上面三种方法之中，前两种都不是很可靠。`__proto__`属性只有浏览器才需要部署，其他环境可以不部署。而`obj.constructor.prototype`在手动改变原型对象时，可能会失效。

### 6. 描述new一个对象的过程？

1. 创建一个对象
2. this指向这个对象
3. 执行代码，即对this赋值
4. 返回this


### 7. 如何判断一个变量是数组类型？
```js
var arr = []
arr instanceof Array;  // true
```


### 8. 写一个原型链继承的例子

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

### 9. 函数方法中，forEach 和 map 的区别？
- forEach()方法不会返回执行结果，而是undefined。
- 也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

### 10. 日期 Math 数组 对象
### 11. 获取随机数，要求是长度一致的字符串格式
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

### 13. JS实现异步的几种方式

1. callback
2. 发布订阅模式
3. Promise
4. 生成器函数
5. async/await

注意：`await`在`for`循环中才生效，`forEach`不生效

### 14. 构造json参数时key需要加引号吗？

json不是最好加不加，而是必须加，而且加的是双引号。


### 15. 数组去重的方法
1. indexOf循环去重
2. ES6 Set去重；Array.from(new Set(array))
3. Object 键值对去重；把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。



### 18. 将一个类数组对象转化为数组的几种方法
1. slice
`Array.prototype.slice.call(arguments)`，或者 `[].slice.call(arguments)`亦可
2. splice
`Array.prototype.splice.call(arguments, 0);`

3. `Array.prototype.concat.apply([], arguments)`
4. ES6中的`Array.from`
语法：`Array.from(arguments)`
5. `[...arguments]`




### 19. 什么是JS Engine（JS引擎）？
**处理并执行js代码的运行环境**， 也就是专门处理Js脚本的虚拟机。

#### 20. JS引擎中栈和堆
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


### 21. 对称加密和非对称加密算法
### 22. 可解密：
1. 对称加密：DES、3DES、AES
2. 非对称加密：RSA

### 23. 不可解密：
不可逆加密算法：MD5、SHA1



### 24. 如何在选择图片后，不经后端而显示预览图片？
1. 监听`input`的`change`事件，从`e.target.files[0]`获取file对象。
2. `window.URL`获取URL对象，利用`URL.createObjectURL(file)`生成目标`url`，设置`img`的`src`属性为生成的`url`。 或者`new一个FileReader()`得到`reader`....



### 25. Blob 和 ArrayBuffer

### 26. Blob
`Blob(binary large object)`，**二进制类文件大对象**，是一个可以**存储二进制文件的“容器”**，HTML5中的Blob对象除了存放二进制数据外还可以设置这个数据的MIME类型。File接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

```js
new Blob([data], {type: "application/octet-binary"})
```
Blob构造函数接受两个参数，第一个参数是一个包含实际数据的数组，第二个参数是数据的MIME类型。

### 27. ArrayBuffer
`ArrayBuffer`对象表示内存中一段原始的二进制数据容器（**缓冲区**）

```js
const buffer = new ArrayBuffer(8); // create an ArrayBuffer with a size in bytes

console.log(buffer.byteLength); // 8
```



### 28. Blob 和 ArrayBuffer 的区别

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

### 29. 使用blob和URL.createObjectURL生成一个url

```js
var blob = new Blob("保存为blob形式的数据");
var url = new URL.createObjectURL(blob);
```
可以被img等标签使用,例如:image.src = url;


### 30. URL.createObjectURL()

URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的File对象或Blob对象。

### 31. `URL.createObjectURL(blob)`和`FileReader.readAsDataURL(file)`的异同：

区别
1. 通过`FileReader.readAsDataURL(file)`可以获取一段`data:base64`的字符串
2. 通过`URL.createObjectURL(blob)`可以获取当前文件的一个`内存URL`


执行时机
1. `createObjectURL`是同步执行（立即的）
2. `FileReader.readAsDataURL`是异步执行（过一段时间）

内存使用
1. `createObjectURL`返回一段带hash的url，并且一直存储在内存中，直到`document`触发了unload事件（例如：document close）或者执行revokeObjectURL来释放。
2. `FileReader.readAsDataURL`则返回包含很多字符的`base64`，并会比`blob url`消耗更多内存，但是在不用的时候会自动从内存中清除（通过垃圾回收机制）



### 32. 文件和二进制数据对象

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


### 33. fetch 发送2次请求的原因

fetch 发送 post 请求的时候，总是发送2次，第一次状态码是204，第二次才成功？

原因很简单，因为你用fetch的post请求的时候，导致`fetch`第一次发送了一个`Options`请求，**询问服务器是否支持修改的请求头**，如果服务器支持，则在第二次中发送真正的请求。

### 34. 空语句
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


### 35. 自动插入分号
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


### 36. 让坐标变化的2种方式

- 传统的top, left坐标修改
- CSS3中的`transform`属性

### 37. 自适应字体大小
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



### 38. `requestAnimFrame`
`requestAnimFrame();`  是一个比较科学的API，相对于`setInterval`和`setTimeout`来讲，`requestAnimFrame`会更科学

`requestAnimFrame`的原理就是：当前绘制完成之后，去根据你**机器的性能**来确定**间隔多长时间绘制下一帧**，所以它是一个智能计算的过程。而`setInterval`和`setTimeout`会有一个固定的时间，比如我们指定给它每过60ms就绘制一帧，万一你绘制的内容非常大，以至于60ms之内不能完成，而`requestAnimFrame`会是一个科学的方法，
但是也有一个问题：`fps`————`frame per second`(每秒多少帧).
使用`requestAnimFrame`会导致帧与帧之间的时间间隔是不固定的，所以有一个动态的时间间隔。



### 39. 双~的用法
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

### 40. `|` 的用法，通常用来取整
```
1.2|0  // 1
1.8|0 // 1
-1.2|0 // -1
```

### 41. 原生JS获取dom中的id
- `querySelector()` 返回匹配的一个元素，比如`'.class'`，`‘#id’`
- 把数据通过`data-`放在dom上，比如`data-id={id}`，JS中获取到元素后，通过`element.dataset.id`来取




### 42. `onmouseenter`和`onmouseover`对比
- `onmouseenter`和`onmouseleave`是一组：当鼠标进入指定区域的时候触发，但是不支持冒泡，进入或者离开子组件都不触发。
- `onmouseover`和`onmouseout`是一组：当鼠标进入指定区域的时候触发，进入或者离开子组件也都触发

比如在A上绑定事件，A包含子元素B，`onmouseenter` A进入B不触发，`onmouseover` A进入B触发




### 43. click 在 ios 上有300ms延迟，如何解决

1. 粗暴型，禁用缩放
```html
<meta name="viewport" content="width=device-width, user-scalable=no">
```
2. 利用`FastClick`，其原理是：
检测到`touchend`事件后，立刻出发模拟`click`事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉



### 44. PNG,GIF,JPG 的区别及如何选

参考资料： [选择正确的图片格式](http://www.yuiblog.com/blog/2008/11/04/imageopt-2/) 
**GIF**:

1. 8 位像素，256 色
2. 无损压缩
3. 支持简单动画
4. 支持 boolean 透明
5. 适合简单动画

**JPEG**：

1. 颜色限于 256
2. 有损压缩
3. 可控制压缩质量
4. 不支持透明
5. 适合照片

**PNG**：

1. 有 PNG8 和 truecolor PNG
2. PNG8 类似 GIF 颜色上限为 256，文件小，支持 alpha 透明度，无动画
3. 适合图标、背景、按钮

### 45. [,,,] 的长度？
有几个逗号，长度就是几，最后一个逗号后面的`undefined`不算。

### 46. 如何判断当前脚本运行在浏览器还是 node 环境中？

```
this === window ? 'browser' : 'node';

通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中。
```

### 47. 如何中断ajax请求？

一种是设置超时时间让ajax自动断开，另一种是手动停止ajax请求，其核心是调用XML对象的abort方法，`ajax.abort()`

### 48. Object.getOwnPropertyNames 和 Object.keys 的区别

对于一般的对象来说，`Object.keys()`和`Object.getOwnPropertyNames()`返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。`Object.keys`方法只返回可枚举的属性，`Object.getOwnPropertyNames`方法还返回不可枚举的属性名。

```javascript
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

上面代码中，数组的`length`属性是不可枚举的属性，所以只出现在`Object.getOwnPropertyNames`方法的返回结果中。

又一例子：

```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// ["p1", "p2"]
```



### 49. 属性描述对象

下面是属性描述对象的一个例子。

```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性。

- `value`
  - `value`是该属性的属性值，默认为`undefined`。
  - 只要`writable`和`configurable`有一个为`true`，就允许改动。
  - 另外，`writable`为`false`时，直接目标属性赋值，不报错，但不会成功，如果用`Object.defineProperty`的方式修改，则会成功。
- `writable`
  - `writable`是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为`true`。

- `enumerable`

  - `enumerable`是一个布尔值，表示该属性是否可遍历，默认为`true`。如果设为`false`，会使得某些操作（比如`for...in`循环、`Object.keys()`、`JSON.stringify`）跳过该属性。

- `configurable`

  - `configurable`是一个布尔值，表示可配置性，默认为`true`。
  - 如果设为`false`，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（`value`属性除外）。也就是说，`configurable`属性控制了属性描述对象的可写性。

- `get`

  - `get`是一个函数，表示该属性的取值函数（getter），默认为`undefined`。
  - 注意，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`属性设为`true`，或者同时定义`value`属性，否则会报错。
```javascript
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
```

- `set`

  - `set`是一个函数，表示该属性的存值函数（setter），默认为`undefined`。

`Object.defineProperty()`和`Object.defineProperties()`参数里面的属性描述对象，`writable`、`configurable`、`enumerable`这三个属性的默认值都为`false`。

要冻结对象的读写状态，防止对象被改变，有三种方法，最弱的一种是`Object.preventExtensions`，其次是`Object.seal`，最强的是`Object.freeze`。





### 51. 注意img的`onerror`属性：
`onerror`属性找图片加载失败了的时候，可以使用`onerror`将图片替换为默认图片。注意，一定要**在`onerror`里面将`onerror`置空**，不然在新的图片也加载失败后，会形成死循环。

```
<img src="http://example.com/a.png" onerror="this.onerror=''; this.src='http://example.com/b.png'">
```

### 52. ajax解决浏览器缓存问题
1. 在ajax发送请求前加上`anyAjaxObj.setRequestHeader ( "If-Modified-Since","0")`。
2. 在ajax发送请求前加上 `anyAjaxObj.setRequestHeader ( "Cache-Control","no-cache")`。
3. 在URL后面加上一个**随机数**：` "fresh=" + Math.random()`。
4. 在URL后面加上**时间戳**：`"nowtime=" + new Date().getTime()`。
5. 如果是使用`jQuery`，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。

### 50. 学习资料
https://github.com/huyaocode/webKnowledge
