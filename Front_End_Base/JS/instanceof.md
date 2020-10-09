- [1. `instanceof`](#1-instanceof)
  - [1.1. 语法](#11-语法)
  - [1.2. 例子](#12-例子)
  - [1.3. 不是...的实例](#13-不是的实例)

## 1. `instanceof`

### 1.1. 语法
>object instanceof constructor

`instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。


### 1.2. 例子
```js
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();


o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype


o instanceof D; // false，因为 D.prototype 不在 o 的原型链上

o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
C.prototype instanceof Object // true，同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上
```


注意：使用对象文字符号创建的对象，`instanceof String` 返回 `false`， `instanceof Object` 返回 `true`。

```js
var simpleStr = "This is a simple string"; 
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};
var myNonObj  = Object.create(null);

simpleStr instanceof String; // 返回 false, 检查原型链会找到 undefined
myString  instanceof String; // 返回 true
newStr    instanceof String; // 返回 true
myString  instanceof Object; // 返回 true
```

### 1.3. 不是...的实例

要检测对象不是某个构造函数的实例时，你可以这样做
```js
if (!(mycar instanceof Car)) {
  // Do something, like mycar = new Car(mycar)
}
```
这和以下代码完全不同

```js
if (!mycar instanceof Car)
```
这段代码永远会得到 `false`（`!mycar` 将在 `instanceof` 之前被处理，所以你总是在验证一个布尔值是否是 `Car` 的一个实例）。


