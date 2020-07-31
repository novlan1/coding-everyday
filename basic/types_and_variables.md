## 类型和变量

### a. javascript 有哪几种数据类型
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

### b. javascript 按照存储方式区分变量类型？
- 值类型 
- 引用类型


### c. 引用类型的特点？
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

### d. typeof 能区分哪些类型？
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

### e. 如何强制类型转换？

通过String()，Number()，Boolean()函数强制转换

```js
var str=123;
var str1='123';

console.log(typeof str); // numbrer
console.log(typeof str1); // string
console.log(typeof String(str)); // string
console.log(typeof Number(str1)); //number
```

### f. 什么情况下会发生隐式类型转换？

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



### g. 隐式类型转换的常见应用？
巧用隐式类型转换，当要把一个字符串转为数字时，把它减去0，把一个数字转为字符串，加上空字符串。
```js
‘32’ – 0   //32 
‘0’+32   // ‘032’
32 + ’’   // ‘032’
```



### h. 如何判断一个变量会被当做true或者false？

通过`!![变量]`的方式。
```js
var a =10; 
console.log(!!a) // true
```

### i. 说一下引用类型的比较规则，并回答下列结果

对象的比较是比较的引用，就是内存是否一样。
```js
{} == {}  // false
new Object == new Object()  // false
console.log == console.log  // fase
[1,2] == [1,2]   // false

NaN == NaN    // false, NaN不是引用类型，不过它恒不等于自己。
```

### j. 引用类型比较，何时返回true？
除非定义x，然后让x和x比较才为true。
```js
console === console // true
```


### l. 何时使用===和==？
```js
if (obj.a == null){} // 这里相当于obj.a === null || obj.a ===defined,简写形式
```
除了这种情况，其他全用 ===


### m. JS内置函数有哪些？
Object, Array, Function, Boolean, Number, String, Date, RegExp, Error，内置函数就这么少。
Math 是对象，不是函数


### n. 如何理解 JSON？
- 不过是JS中一个对象而已，Math也是JS内置对象
- 一种数据格式
```js
JSON.parse(‘{‘a’: 10, ’b’: 23}’)
JSON.stringify({a: 10, b: 23})
```

### o. 函数和数组可以有属性吗？
不仅对象可以有属性，函数和数组也有属性
```js
var a=[12,3,4]
a.age=12
function fn(){}
fn.age=12
```

### p. `!!()`是false的情况有哪几种？ 
0,NaN, ’’, undefined,null,false   6个


### q. ===运算符判断相等的流程是怎样的

1. 如果两个值不是相同类型，它们不相等
2. 如果两个值都是 null 或者都是 undefined，它们相等
3. 如果两个值都是布尔类型 true 或者都是 false，它们相等
4. 如果其中有一个是**NaN**，它们不相等
5. 如果都是数值型并且数值相等，他们相等， -0 等于 0
6. 如果他们都是字符串并且在相同位置包含相同的 16 位值，他它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同==和===都认为他们不相等
7. 如果他们指向相同对象、数组、函数，它们相等；如果指向不同对象，他们不相等

### r. ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===比较方法进行比较
2. 如果类型不同，使用如下规则进行比较
3. 如果其中一个值是 null，另一个是 undefined，它们相等
4. 如果一个值是**数字**另一个是**字符串**，将**字符串转换为数字**进行比较
5. 如果有布尔类型，将**true 转换为 1，false 转换为 0**，然后用==规则继续比较
6. 如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较
7. **其他所有情况都认为不相等**

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
```

结果分别是什么？
答案：true true true

关键在于Number([])是0，Number({})是NaN，Number(false)是0，
Boolean([])是true，Boolean({})是true
```


### s. 对象到字符串的转换步骤

1. 如果对象有 toString()方法，javascript 调用它。如果返回一个原始值（primitive value 如：string number boolean）,将这个值转换为字符串作为结果
2. 如果对象没有 toString()方法或者返回值不是原始值，javascript 寻找对象的 valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript 不能从 toString()或者 valueOf()获得一个原始值，此时 throws a TypeError

### t. 对象到数字的转换步骤

```
1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
2. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
3. 否则，throws a TypeError
```

### u. 判断`[] == false`的输出是什么？
```js
[] == false   // true 
[] == true    // false
```
因为[].toString()为‘’，‘’和 false 比较时都化为数字0，所以相等。

### v. 判断`{} == false`的输出是什么？
```js
{} == false   // false 
{} == true    // false
```
因为{}.toString()为`[object Object]`，`[object Object]`和`false`比较时，`false`化为数字0，`[object Object]`化为数字`NaN`，所以不相等。同理，也不等于`true`


### w. 判断`[] == ![]`的输出是什么？
```js
[] == ! []   // true
```

1. 根据运算符优先级 ，! 的优先级是大于 == 的，所以先会执行 ![]
2. !可将变量转换成 boolean 类型，null、undefined、NaN 以及空字符串( '' )取反都为 true，其余都为false。
3. 所以 ![] 为 false
4. 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf() 方法，用得到的基本类型值按照前面的规则进行比较，如果对象没有 valueOf() 方法，则调用 toString()
5. 所以[]为 ‘’

综上：[] == ![] -> [] == false -> [] == 0 -> '' == 0 -> 0 == 0 -> true

### x. 判断`{} == !{}`的输出是什么？
```js
{} == !{} // false 
```
1. 因为 {}.toString() -> NaN（[object Object]）
2. 总结：{} == ! {} -> {} == false -> {} == 0 -> NaN == 0 -> false


### y. 判断`console.log( [] ? true : false)`的输出是什么？
由上面可知，三元运算符会发生**隐式类型转换**，而 !![] 为true，所以结果为true
```js
console.log( [] ? true : false) // true
```

### 1 与 new Number(1)有什么区别

```js
var a = Number(1); // 1
var b = new Number(1); // Number {[[PrimitiveValue]]: 1}
typeof a; // number
typeof b; // object
a == b; // true
```

- var a = 1 是一个常量，而 Number(1)是一个函数
- new Number(1)返回的是一个对象
- a==b 为 true 是因为所以在求值过程中，总是会强制转为原始数据类型而非对象。

### console.log(!!(new Boolean(false))输出什么

true 布尔的包装对象 Boolean 的对象实例，对象只有在 null 与 undefined 时，才会认定为布尔的 false 值，布尔包装对象本身是个对象，对象->布尔 都是 true，所以 new Boolean(false)其实是布尔的 true，看下面这段代码:

```js
if (new Boolean(false)) {
  alert("true!!");
}
```

只有使用了 valueOf 后才是真正的转换布尔值，与上面包装对象与原始资料转换说明的相同:

```js
!!new Boolean(false)(
  //true
  new Boolean(false)
).valueOf(); //false
```

### 如何判断一个数据是不是 Array

- `Array.isArray(obj)`

  - ECMAScript 5 种的函数，当使用 ie8 的时候就会出现问题。

- `obj instanceof Array`

  - 当用来检测在不同的 window 或 iframe 里构造的数组时会失败。这是因为每一个 iframe 都有它自己的执行环境，彼此之间并不共享原型链，所以此时的判断一个对象是否为数组就会失败。此时我们有一个更好的方式去判断一个对象是否为数组。

- `Object.prototype.toString.call(obj) == '[object Array]'`

  - 这个方法比较靠谱

- ```obj.constructor === Array`
- constructor 属性返回对创建此对象的函数的引用

### Object.prototype.toString

如果是原始类型，他会将原始类型包装为引用类型，然后调用对应方法

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

### obj.toString() 和 Object.prototype.toString.call(obj)

同样是检测对象 obj 调用 toString 方法，obj.toString()的结果和 Object.prototype.toString.call(obj)的结果不一样，这是为什么？

这是因为 toString 为 Object 的原型方法，而 Array ，function 等类型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串.....），而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 Object 上原型 toString 方法。

### 输出以下代码运行结果

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

- 1 + "1"
  - 加性操作符：如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来
  - 所以值为：“11”
- 2 * "2"
  - 乘性操作符：如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值
- [1, 2] + [2, 1]
  - Javascript 中所有对象基本都是先调用 valueOf 方法，如果不是数值，再调用 toString 方法。
  - 所以两个数组对象的 toString 方法相加，值为："1,22,1"
- "a" + + "b"
  - 后边的“+”将作为一元操作符，如果操作数是字符串，将调用 Number 方法将该操作数转为数值，如果操作数无法转为数值，则为 NaN。
  - 所以值为："aNaN"

### 实现一个类型判断函数

1. 判断 null
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

### 对象转基本类型

1. `toString()` 方法返回一个**表示该对象的字符串**。
对于对象x，`toString()` 返回 `“[object type]”`,其中type是对象类型。如果x不是对象，`toString()` 返回x应有的文本值(不是单纯的加”“)

2. `valueOf()` 方法返回**指定对象的原始值**
每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，`valueOf()` 就会返回对象自身。

一般来说，对象到字符串的转换经过了如下步骤：

1. 如果对象具有`toString()`方法，则调用这个方法。如果它返回一个原始值，js将这个值转换成字符串，并返还这个字符串结果。
2. 如果对象没有`toString()`方法，或者这个方法并不返回一个原始值，那么js将调用valueOf()方法。
3. 否则，js无法从`toString()`或者`valueOf()`获得一个原始值，因此这时它将抛出一个类型错误异常。

 

一般来说，对象到数字的转换过程中，js做了同样类似的事情，但这里它会首先尝试使用`valueOf()`方法：
1. 如果对象具有`valueOf()`方法，后者返回一个原始值，则js将这个原始值转换成数字，并返回这个数字。
2. 否则，如果对象具有`toString()`方法，后者返回一个原始值，则js将转换并返回。
（首先js转换成相应的字符串原始值，再继续将这个原始值转换成相应的数字类型，再返回数字）
3. 否则，js抛出一个类型错误异常。
```js
var a = {
  valueOf() {
    return 0;
  },
  toString() {
    return "1";
  },
};

1 + a; // 1
a + 1; // 1
'1' + a; // '10'
a + '1'; // '01'

"1".concat(a); //"11"
```
注意，运算符`+`号即使和字符串相加，也是会优先调用valueOf。


```js
var aa = { 
  i: 10, 
  toString: function() { 
    console.log('toString'); 
    return this.i; 
  } 
} 

alert(aa);// 10 toString 
console.log(+aa); // 10 toString 
console.log('' + aa); // '10' toString 
console.log(String(aa)); // '10' toString 
console.log(Number(aa)); // 10 toString 
console.log(aa == '10'); // true toString 


// 再看 valueOf
var bb = { 
  i: 10, 
  valueOf: function() { 
    console.log('valueOf'); 
    return this.i; 
  } 
} 

alert(bb);// [object Object] 
console.log(+bb); // 10 valueOf 
console.log('' + bb); // '10' valueOf 
console.log(String(bb)); // [object Object] 
console.log(Number(bb)); // 10 valueOf 
console.log(bb == '10'); // true valueOf 
// 发现有点不同吧？！它没有像上面toString那样统一规整。对于那个[object Object]，我估计是从Object那里继承过来的，我们再去掉它看看。 


Object.prototype.toString = null; 
var cc = { 
  i: 10, 
  valueOf: function() { 
    console.log('valueOf'); 
    return this.i; 
  } 
} 

alert(cc);// 10 valueOf 
console.log(+cc); // 10 valueOf 
console.log('' + cc); // '10' valueOf 
console.log(String(cc)); // '10' valueOf 
console.log(Number(cc)); // 10 valueOf 
console.log(cc == '10'); // true valueOf
```

总结起来就是 如果只重写了toString，对象转换时会使用toString方法来进行转换。

但是，如果只重写了valueOf方法，只有在非要转换为字符串的时候会优先考虑toString方法，包括String(obj)、alert(obj)，运算符`+`还是会调用valueOf 。在不能调用toString的情况下，只能让valueOf上阵了。

参考资料：[博客园](https://www.cnblogs.com/liutianzeng/p/10859000.html)

### k. 值类型的添加属性、获取属性是如何实现的，比如获取 str.length ？
把原始类型当作对象方式使用的本质，例如访问length属性，或者增加属性。js都会智能转换成包装类型对象，相当于new了一个原始类型对象。当访问完成后，会把这个包装的对象销毁

例子：
```js
var str = ‘abc’
var str1 = new string(‘abc’)

console.log(str.length)   //3

str.t =10      // 定义属性
console.log(str.t)    // undefined
```

