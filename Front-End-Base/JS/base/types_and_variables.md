- [1. javascript 有哪几种数据类型](#1-javascript-有哪几种数据类型)
- [2. javascript 按照存储方式区分变量类型？](#2-javascript-按照存储方式区分变量类型)
- [3. 引用类型的特点？](#3-引用类型的特点)
- [4. typeof 能区分哪些类型？](#4-typeof-能区分哪些类型)
- [5. `null` 和 `undefined` 的区别](#5-null-和-undefined-的区别)
- [6. 如何强制类型转换？](#6-如何强制类型转换)
- [7. 什么情况下会发生隐式类型转换？](#7-什么情况下会发生隐式类型转换)
- [8. 隐式类型转换的常见应用？](#8-隐式类型转换的常见应用)
- [9. 如何判断一个变量会被当做true或者false？](#9-如何判断一个变量会被当做true或者false)
- [10. 说一下引用类型的比较规则，并回答下列结果](#10-说一下引用类型的比较规则并回答下列结果)
- [11. 引用类型比较，何时返回true？](#11-引用类型比较何时返回true)
- [12. 何时使用`===`和`==`？](#12-何时使用和)
- [13. JS内置函数有哪些？](#13-js内置函数有哪些)
- [14. 如何理解 JSON？](#14-如何理解-json)
- [15. 函数和数组可以有属性吗？](#15-函数和数组可以有属性吗)
- [16. `!!()`是false的情况有哪几种？](#16-是false的情况有哪几种)
- [17. === 运算符判断相等的流程是怎样的](#17--运算符判断相等的流程是怎样的)
- [18. == 运算符判断相等的流程是怎样的](#18--运算符判断相等的流程是怎样的)
  - [18.1. 判断`console.log( [] ? true : false)`的输出是什么？](#181-判断consolelog---true--false的输出是什么)
- [19. `Number(1)` 与 `new Number(1)`有什么区别](#19-number1-与-new-number1有什么区别)
- [20. `console.log(!!(new Boolean(false))`输出什么](#20-consolelognew-booleanfalse输出什么)
- [21. 如何判断一个数据是不是 Array](#21-如何判断一个数据是不是-array)
- [22. `Object.prototype.toString`](#22-objectprototypetostring)
  - [22.1. `obj.toString()` 和 `Object.prototype.toString.call(obj)`](#221-objtostring-和-objectprototypetostringcallobj)
- [23. 实现一个类型判断函数](#23-实现一个类型判断函数)
- [24. 值类型的添加属性、获取属性是如何实现的，比如获取 str.length ？](#24-值类型的添加属性获取属性是如何实现的比如获取-strlength-)
- [25. 数据属性和访问器属性](#25-数据属性和访问器属性)
- [26. `eval`和`json.parse` 解析`json`的区别](#26-eval和jsonparse-解析json的区别)
- [27. 序列化的坑](#27-序列化的坑)
- [28. 在 js 中不同进制数字的表示方式](#28-在-js-中不同进制数字的表示方式)
- [29. js 中整数的安全范围是多少？](#29-js-中整数的安全范围是多少)
- [30. `isNaN` 和 `Number.isNaN` 函数的区别？](#30-isnan-和-numberisnan-函数的区别)
- [31. 类型间转换规则](#31-类型间转换规则)
  - [31.1. 其他值到字符串的转换规则？](#311-其他值到字符串的转换规则)
  - [31.2. 其他值到数字值的转换规则？](#312-其他值到数字值的转换规则)
  - [31.3. 其他值到布尔类型的值的转换规则？](#313-其他值到布尔类型的值的转换规则)
- [32. 注意 Array.length](#32-注意-arraylength)
- [33. 加法运算符](#33-加法运算符)
  - [33.1. `undefined`和字符串相加](#331-undefined和字符串相加)
  - [33.2. 输出以下代码运行结果](#332-输出以下代码运行结果)
- [34. 字符串的比较](#34-字符串的比较)
- [35. `Math.round`、`parseInt`、`Math.floor`和`Math.ceil`小数取整](#35-mathroundparseintmathfloor和mathceil小数取整)
  - [35.1. `parseInt()`和`Number()`的区别](#351-parseint和number的区别)
- [36. JS属性对象的`hasOwnProperty`方法](#36-js属性对象的hasownproperty方法)
  - [36.1. 判断自身属性是否存在](#361-判断自身属性是否存在)
  - [36.2. 遍历一个对象的所有自身属性](#362-遍历一个对象的所有自身属性)
  - [36.3. 注意 `hasOwnProperty` 作为属性名](#363-注意-hasownproperty-作为属性名)

## 类型和变量 <!-- omit in toc -->

### 1. javascript 有哪几种数据类型
七种基本数据类型(值类型)
- `undefined`
- `null`
- `string`
- `boolean`
- `number`
- **`symbol(ES6)`**
- **`BigInt`**

三种引用类型
- `Object`
- `Function`
- `Array`

### 2. javascript 按照存储方式区分变量类型？
- 值类型 
- 引用类型


### 3. 引用类型的特点？
引用类型无限制扩展属性，内存很大，在内存中公用空间

```js
var a=100
var b=a
a=200
console.log(b)   // 100


var a ={age:20}
var b=a
b.age=21
console.log(a)       // {age: 21}
```

### 4. typeof 能区分哪些类型？
typeof只能区分**值类型**和**函数**。

```js
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

### 5. `null` 和 `undefined` 的区别

1. `null`表示**"没有对象"，即该处不应该有值**。典型用法是：
    - 作为函数的参数，表示**该函数的参数不是对象**。
    - 作为**对象原型链的终点**。
2. `undefined`表示"缺少值"，就是**此处应该有一个值，但是还没有定义**。典型用法是：
   - **变量被声明了，但没有赋值**时，就等于`undefined`。
   - 调用函数时，**应该提供的参数没有提供**，该参数等于`undefined`。
   - **对象没有赋值的属性**，该属性的值为`undefined`。
   - **函数没有返回值**时，默认返回`undefined`。

3. `typeof(null)` 为 `'object'`，`typeof(undefined)` 为 `'undefined'`
4. 转为数值时，`null` 转为 0，`undefined` 转为 `NaN`。

### 6. 如何强制类型转换？

通过String()，Number()，Boolean()函数强制转换

```js
var str=123;
var str1='123';

console.log(typeof str); // numbrer
console.log(typeof str1); // string
console.log(typeof String(str)); // string
console.log(typeof Number(str1)); //number
```

### 7. 什么情况下会发生隐式类型转换？

```js
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



### 8. 隐式类型转换的常见应用？
巧用隐式类型转换，当要把一个字符串转为数字时，把它减去0，把一个数字转为字符串，加上空字符串。
```js
‘32’ – 0   //32 
‘0’+32   // ‘032’
32 + ’’   // ‘032’
```



### 9. 如何判断一个变量会被当做true或者false？

通过`!![变量]`的方式。
```js
var a =10; 
console.log(!!a) // true
```

### 10. 说一下引用类型的比较规则，并回答下列结果

对象的比较是比较的引用，就是内存是否一样。
```js
{} == {}  // false
new Object == new Object()  // false
console.log == console.log  // fase
[1,2] == [1,2]   // false

NaN == NaN    // false, NaN不是引用类型，不过它恒不等于自己。
```

### 11. 引用类型比较，何时返回true？
除非定义x，然后让x和x比较才为true。
```js
console === console // true
```


### 12. 何时使用`===`和`==`？
```js
if (obj.a == null){} // 这里相当于obj.a === null || obj.a ===defined,简写形式
```
除了这种情况，其他全用 `===`


### 13. JS内置函数有哪些？
Object, Array, Function, Boolean, Number, String, Date, RegExp, Error，内置函数就这么少。
Math 是对象，不是函数


### 14. 如何理解 JSON？
- 不过是JS中一个对象而已，Math也是JS内置对象
- 一种数据格式
```js
JSON.parse(‘{‘a’: 10, ’b’: 23}’)
JSON.stringify({a: 10, b: 23})
```

### 15. 函数和数组可以有属性吗？
不仅对象可以有属性，函数和数组也有属性
```js
var a=[12,3,4]
a.age=12
function fn(){}
fn.age=12
```

### 16. `!!()`是false的情况有哪几种？ 
0,NaN, ’’, undefined,null,false   6个


### 17. === 运算符判断相等的流程是怎样的

1. 如果两个值不是相同类型，它们不相等
2. 如果两个值都是 `null` 或者都是 `undefined`，它们相等
3. 如果两个值都是布尔类型 true 或者都是 false，它们相等
4. 如果其中有一个是NaN，它们不相等
5. 如果都是数值型并且数值相等，他们相等， -0 等于 0
6. 如果他们都是字符串并且在相同位置包含相同的 16 位值，他它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同`==`和`===`都认为他们不相等
7. 如果他们指向相同对象、数组、函数，它们相等；如果指向不同对象，他们不相等

### 18. == 运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照`===`比较方法进行比较
2. 如果类型不同，使用如下规则进行比较
3. 如果其中一个值是 null，另一个是 undefined，它们相等
4. **如果一个值是数字，另一个是字符串，将字符串转换为数字进行比较**
5. **如果有布尔类型，将true 转换为 1，false 转换为 0，然后用==规则继续比较**
6. **如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较**
7. 其他所有情况都认为不相等

```js
undefined == null // true
'0' == 0 // true，字符串转数字
0 == false // true，布尔转数字
'0' == false // true，2个都转成数字
```

```js
null == false // false  
undefined == false // false

0 == null // false
0 == undefined // false
0 == NaN // false
```

#### 18.1. 判断`console.log( [] ? true : false)`的输出是什么？
由上面可知，三元运算符会发生**隐式类型转换**，而 `!![]` 为`true`，所以结果为`true`
```js
console.log( [] ? true : false) // true
```

### 19. `Number(1)` 与 `new Number(1)`有什么区别

```js
var a = Number(1); // 1
var b = new Number(1); // Number {[[PrimitiveValue]]: 1}

typeof a; // number
typeof b; // object
a == b; // true
```

- **`var a = 1` 是一个常量**，而 `Number(1)`是一个函数
- **`new Number(1)`返回的是一个对象**
- `a==b` 为 `true` 是因为所以在求值过程中，总是会强制转为原始数据类型而非对象。

### 20. `console.log(!!(new Boolean(false))`输出什么

true 布尔的包装对象 `Boolean` 的对象实例，对象只有在 `null` 与 `undefined` 时，才会认定为布尔的 `false` 值，**布尔包装对象本身是个对象，对象->布尔 都是 `true`，所以 `new Boolean(false)`其实是布尔的 `true`**，看下面这段代码:

```js
if (new Boolean(false)) {
  alert("true!!");
}
```

只有使用了 `valueOf` 后才是真正的转换布尔值，与上面包装对象与原始资料转换说明的相同:

```js
!!new Boolean(false) // true

new Boolean(false).valueOf(); // false
```

### 21. 如何判断一个数据是不是 Array

- `Array.isArray(obj)`

  - ECMAScript 5 种的函数，当使用 ie8 的时候就会出现问题。

- `obj instanceof Array`

  - 当用来检测在不同的 window 或 iframe 里构造的数组时会失败。这是因为每一个 iframe 都有它自己的执行环境，彼此之间并不共享原型链，所以此时的判断一个对象是否为数组就会失败。此时我们有一个更好的方式去判断一个对象是否为数组。

- `Object.prototype.toString.call(obj) == '[object Array]'`

  - 这个方法比较靠谱

- `obj.constructor === Array`
  - `constructor` 属性返回对创建此对象的函数的引用

### 22. `Object.prototype.toString`

**如果是原始类型，他会将原始类型包装为引用类型**，然后调用对应方法

```js
function dd() {}
var toString = Object.prototype.toString;
toString.call(dd); //[object Function]
toString.call(new Object()); //[object Object]
toString.call(new Array()); //[object Array]
toString.call(new Date()); //[object Date]
toString.call(new String()); //[object String]
toString.call(Math); //[object Math]
toString.call(undefined); //[object Undefined]
toString.call(null); //[object Null]
toString.call(123); //[object Number]
toString.call("abc"); //[object String]
```

#### 22.1. `obj.toString()` 和 `Object.prototype.toString.call(obj)`

同样是检测对象 `obj` 调用 `toString` 方法，`obj.toString()`的结果和 `Object.prototype.toString.call(obj)`的结果不一样，这是为什么？

这是因为 `toString` 为 `Object` 的原型方法，而 **`Array` ，`function` 等类型作为 `Object` 的实例，都重写了 `toString` 方法**。
- 不同的对象类型调用 `toString` 方法时，根据原型链的知识，调用的是对应的重写之后的 `toString` 方法（`function` 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串.....），而不会去调用 `Object` 上原型 `toString` 方法（返回对象的具体类型），所以采用 `obj.toString()`不能得到其对象类型，只能将 `obj` 转换为字符串类型；
- 因此，**在想要得到对象的具体类型时，应该调用 `Object` 上原型 `toString` 方法**。



### 23. 实现一个类型判断函数

1. 判断 `null`
2. 判断基础类型
3. 使用`Object.prototype.toString.call(target)`来判断**引用类型**

注意： 一定是使用`call`来调用，不然是判断的 Object.prototype 的类型 之所以要先判断是否为基本类型是因为：虽然`Object.prototype.toString.call()`能判断出某值是：number/string/boolean，但是其实在包装的时候是把他们先转成了对象然后再判断类型的。 但是 JS 中包装类型和原始类型还是有差别的，因为对一个包装类型来说，typeof 的值是 object

```js
/**
 * 类型判断
 */
function getType(target) {
  //先处理最特殊的Null
  if (target === null) {
    return "null";
  }
  //判断是不是基础类型
  const typeOfT = typeof target;
  if (typeOfT !== "object") {
    return typeOfT;
  }
  //肯定是引用类型了
  const template = {
    "[object Object]": "object",
    "[object Array]": "array",
    // 一些包装类型
    "[object String]": "object - string",
    "[object Number]": "object - number",
    "[object Boolean]": "object - boolean",
  };
  const typeStr = Object.prototype.toString.call(target);
  return template[typeStr];
}
```


### 24. 值类型的添加属性、获取属性是如何实现的，比如获取 str.length ？
把原始类型当作对象方式使用的本质，例如访问length属性，或者增加属性。js都会智能转换成包装类型对象，相当于`new`了一个原始类型对象。当访问完成后，会把这个包装的对象销毁

例子：
```js
var str = ‘abc’
var str1 = new string(‘abc’)

console.log(str.length)   //3

str.t =10      // 定义属性
console.log(str.t)    // undefined
```


### 25. 数据属性和访问器属性

ECMAScript中有两种属性：数据属性和访问器属性，数据属性一般用于存储数据数值，访问器属性对应的是`set/get`操作，不能直接存储数据值，每种属性下面又都含有四个特性.下面介绍一下:

数据属性
1. **`[[Configurable]]`: 表示能否通过delete将属性删除**，**能否把属性修改为访问器属性**, 默认为`false`。当把属性`Configurable`设置为`false`后，该属性不能通过delete删除，并且也无法再将该属性的`Configurable`设置回`true`
2. **`[[Enumerable]]`: 表示属性可否被枚举**(即是否可以通过`for in`循环返回)，默认`false`
3. **`[[Writable]]`: 表示属性是否可写**(即是否可以修改属性的值)，默认`false`
4. `[[Value]]`: 该属性的数据值, 默认是`undefined`


访问器属性
1. `[[Configurable]]`: 表示能否通过`delete`将属性删除，能否把属性修改为数据属性, 默认为`false`。当把属性`Configurable`设置为`false`后，该属性不能通过`delete`删除，并且也无法再将该属性的`Configurable`设置回`true`
2. `[[Enumerable]]`: 表示属性可否被枚举(即是否可以通过`for in`循环返回)，默认`false`
3. `[[Get]]`: 读取属性时调用的函数, 默认为`undefined`
4. `[[Set]]`: 写入属性时调用的函数, 默认是`undefined`


### 26. `eval`和`json.parse` 解析`json`的区别
1.	`eval`不会判断你的字符串**是否合法**，且`json`字符串中的**一些方法会被执行**。
2.	`parse`要判断字符串是否合法，要是不合法报错。
3.	使用`parse`相对于`eval`比较安全，要是调用第三方数据，数据中存在恶意代码，使用`eval`就会被执行。




### 27. 序列化的坑
- `undeifined`属性不会出现在序列化后的字符串中
- `NaN`和`infinity`都会转出`null`，`New Date() `会转成时间
```js
var obj = {x: 1, y: true, z: [1,2,3], nullVal: null}

JSON.stringify(obj) // "{"x":1,"y":true,"z":[1,2,3],"nullVal":null}"
```
```js
obj = {a: undefined, b: NaN, c: Infinity, d: new Date()}

JSON.stringify(obj) // "{"b":null,"c":null,"d":"2020-07-26T09:11:16.677Z"}"
```

### 28. 在 js 中不同进制数字的表示方式
- 以 0X、0x 开头的表示为十六进制(hex)。
- 以 0、0O、0o 开头的表示为八进制(octal)。
- 以 0B、0b 开头的表示为二进制格式。

### 29. js 中整数的安全范围是多少？
安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 **2^53 - 1**，
即9007199254740991，在 ES6 中被定义为 `Number.MAX_SAFE_INTEGER`。最小整数是-9007199254740991，在 ES6 中
被定义为 `Number.MIN_SAFE_INTEGER`。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
计算返回了正或负的 `Infinity` 值，那么**该值将无法参与下一次的计算**。判断一个数是不是有穷的，可以使用 `isFinite` 函数
来判断。

### 30. `isNaN` 和 `Number.isNaN` 函数的区别？
函数 `isNaN` 接收参数后，会**尝试将这个参数转换为数值**，**任何不能被转换为数值的的值都会返回 true**，比如`undefined`、对象(`{}`)、函数、不能被转成数字的字符串(如‘string’)，因此非数字值传入也会返回 `true` ，会影响 `NaN` 的判断。

函数 `Number.isNaN` 会**首先判断传入参数是否为数字**，如果是数字再继续判断是否为 `NaN` ，这种方法对于 `NaN` 的判断更为**准确**。

参考资料：[isNaN](https://uwayfly.com/detail/201)

### 31. 类型间转换规则

#### 31.1. 其他值到字符串的转换规则？
规范的 9.8 节中定义了抽象操作 `ToString` ，它负责处理非字符串到字符串的强制类型转换。

1. `Null` 和 `Undefined` 类型 `，null` 转换为 `"null"`，`undefined` 转换为 `"undefined"`

1. `Boolean` 类型，`true` 转换为 `"true"`，`false` 转换为 `"false"`。

1. `Number` 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。

1. `Symbol` 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

1. 对普通对象来说，除非自行定义 `toString()` 方法，否则会调用 `toString()`（`Object.prototype.toString()`）来返回内部属性 `[[Class]]` 的值，如`"[object Object]"`。如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

#### 31.2. 其他值到数字值的转换规则？
有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 `ToNumber`。

1. `Undefined` 类型的值转换为 NaN。

1. `Null` 类型的值转换为 0。

1. `Boolean` 类型的值，`true` 转换为 1，`false` 转换为 0。

1. `String` 类型的值转换如同使用 `Number()` 函数进行转换，如果包含非数字值则转换为 `NaN`，空字符串为 0。

1. `Symbol` 类型的值不能转换为数字，会报错。

1. 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 `ToPrimitive` 会首先（通过内部操作 `DefaultValue`）检查该值是否有`valueOf()` 方法。
如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 `toString()` 的返回值（如果存在）来进行强制类型转换。

如果 `valueOf()` 和 `toString()` 均不返回基本类型值，会产生 `TypeError` 错误。

#### 31.3. 其他值到布尔类型的值的转换规则？
ES5 规范 9.2 节中定义了抽象操作 `ToBoolean`，列举了布尔强制类型转换所有可能出现的结果。

以下这些是假值：
• `undefined`
• `null`
• `false`
• `+0、-0 和 NaN`
• `""`

假值的布尔强制类型转换结果为 `false`。从逻辑上说，假值列表以外的都应该是真值。


### 32. 注意 Array.length

直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化：

```js
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```

请注意，如果通过索引赋值时，索引超过了范围，同样会引起`Array`大小的变化：

```js
var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']
```

将`Array`的长度设为0，将会清空`Array`：
```js
var arr = [1, 2, 3];
arr.length = 0;
arr; // []
```


### 33. 加法运算符

JavaScript 允许非数值的相加。

```javascript
true + true // 2
1 + true // 2
```

上面代码中，**第一行是两个布尔值相加，第二行是数值与布尔值相加。这两种情况，布尔值都会自动转成数值，然后再相加**。

比较特殊的是，**如果是两个字符串相加，这时加法运算符会变成连接运算符**，返回一个新的字符串，将两个原字符串连接在一起。

```javascript
'a' + 'bc' // "abc"
```

**如果一个运算子是字符串，另一个运算子是非字符串，这时非字符串会转成字符串，再连接在一起。**

```javascript
1 + 'a' // "1a"
false + 'a' // "falsea"
```

加法运算符是在运行时决定，到底是执行相加，还是执行连接。也就是说，运算子的不同，导致了不同的语法行为，这种现象称为“重载”（overload）。由于加法运算符存在重载，可能执行两种运算，使用的时候必须很小心。

```javascript
'3' + 4 + 5 // "345"
3 + 4 + '5' // "75"
```

上面代码中，由于从左到右的运算次序，字符串的位置不同会导致不同的结果。


#### 33.1. `undefined`和字符串相加
```js
console.log("a"+a); var a = 1; // aundefined
console.log("b"+b); var b = 1; // bundefined
```

#### 33.2. 输出以下代码运行结果

```js
1 + "1"    // '11'

'1' + 1     // '11'

2 * "2"    // 4

[1, 2] + [2, 1]    // '1221'

4 + [1, 2, 3]       // '41,2,3'

"a" + + "b"    // 'aNaN'

100 + true     // 101

100 + false    // 100

100 + undefined    //NaN

100 + null     // 100

true + true   // 2
```

- `1 + "1"`
  - 加性操作符：如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来
  - 所以值为：`“11”`
- `2 * "2"`
  - 乘性操作符：如果有一个操作数不是数值，则在后台调用 `Number()`将其转换为数值
- `[1, 2] + [2, 1]`
  - Javascript 中所有对象基本都是先调用 valueOf 方法，如果不是数值，再调用 `toString` 方法。
  - 所以两个数组对象的 toString 方法相加，值为：`"1,22,1"`
- `"a" + + "b"`
  - 后边的“+”将作为一元操作符，如果操作数是字符串，将调用 `Number` 方法将该操作数转为数值，如果操作数无法转为数值，则为 NaN。
  - 所以值为：`"aNaN"`

### 34. 字符串的比较

字符串按照字典顺序进行比较。

```js
'2' > '11' // true
```

### 35. `Math.round`、`parseInt`、`Math.floor`和`Math.ceil`小数取整

`Math.round`、`parseInt`、`Math.floor`和`Math.ceil` 都可以返回一个整数，具体的区别请看下面的总结。

**一、Math.round**

作用：**四舍五入，返回参数+0.5后，向下取整**。

如：
```
Math.round(5.57)　　//返回6

Math.round(2.4) 　　//返回2

Math.round(-1.5)　　//返回-1

Math.round(-5.8)　　//返回-6
```
**二、parseInt**

作用：解析一个字符串，并返回一个整数，**这里可以简单理解成返回舍去参数的小数部分后的整数**。

如：
```
parseInt(5.57)　　//返回5

parseInt(2.4)　　//返回2

parseInt(-1.5)　　//返回-1

parseInt(-5.8)　　//返回-5
```
**三、Math.floor**

作用：返回小于等于参数的最大整数。

如：
```
Math.floor(5.57)　　//返回5

Math.floor(2.4)　　//返回2

Math.floor(-1.5)　　//返回-2

Math.floor(-5.8)　　//返回-6
```
**四、Math.ceil**

作用：返回大于等于参数的最小整数
```
Math.ceil(5.57)　　//返回6

Math.ceil(2.4)　　//返回3

Math.ceil(-1.5)　　//返回-1

Math.ceil(-5.8)　　//返回-5
```

#### 35.1. `parseInt()`和`Number()`的区别
- `parseInt()` 和 `parseFloat()` 方法只转换第一个无效字符之前的字符串，因此 "1.2.3" 将分别被转换为 "1" 和 "1.2"。
- 用 Number() 进行强制类型转换，"1.2.3" 将返回 NaN，因为整个字符串值不能转换成数字。
- 如果字符串值能被完整地转换，`Number()` 将判断是调用 `parseInt()` 方法还是 `parseFloat()` 方法。



### 36. JS属性对象的`hasOwnProperty`方法

Object的`hasOwnProperty()`方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。

#### 36.1. 判断自身属性是否存在

```js
var o = new Object();
o.prop = 'exists';

function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}

o.hasOwnProperty('prop');  // true
changeO();
o.hasOwnProperty('prop');  // false
```

#### 36.2. 遍历一个对象的所有自身属性

在看开源项目的过程中，经常会看到类似如下的源码。`for...in`循环对象的所有枚举属性，然后再使用`hasOwnProperty()`方法来忽略继承属性。

```js
var buz = {
    fog: 'stack'
};

for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
        alert("this is fog (" + name + ") for sure. Value: " + buz[name]);
    }
    else {
        alert(name); // toString or something else
    }
}
```

#### 36.3. 注意 `hasOwnProperty` 作为属性名

JavaScript 并没有保护 `hasOwnProperty` 属性名，因此，可能存在于一个包含此属性名的对象，有必要使用一个可扩展的`hasOwnProperty`方法来获取正确的结果：

```js
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
// 使用另一个对象的`hasOwnProperty` 并且call
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```





