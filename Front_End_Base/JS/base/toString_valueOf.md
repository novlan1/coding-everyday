- [1. 常见隐式类型转换面试题](#1-常见隐式类型转换面试题)
  - [1.1. 判断`[] == false`的输出是什么？](#11-判断--false的输出是什么)
  - [1.2. 判断`{} == false`的输出是什么？](#12-判断--false的输出是什么)
  - [1.3. 判断`[] == ![]`的输出是什么？](#13-判断--的输出是什么)
  - [1.4. 判断`{} == !{}`的输出是什么？](#14-判断--的输出是什么)
- [2. 对象到字符串的转换步骤](#2-对象到字符串的转换步骤)
- [3. 对象到数字的转换步骤](#3-对象到数字的转换步骤)
- [4. `toSring`和`valueOf`对比](#4-tosring和valueof对比)
  - [4.1. `{}` 和 `[]` 的 `valueOf` 和 `toString` 的结果是什么？](#41--和--的-valueof-和-tostring-的结果是什么)
- [5. `toString`、`ValueOf`例子](#5-tostringvalueof例子)


### 1. 常见隐式类型转换面试题

#### 1.1. 判断`[] == false`的输出是什么？
```js
[] == false   // true 
[] == true    // false
```
因为`[].toString()`为‘’，‘’和 false 比较时都化为数字0，所以相等。

#### 1.2. 判断`{} == false`的输出是什么？
```js
{} == false   // false 
{} == true    // false
```
因为`{}.toString()`为`[object Object]`，`[object Object]`和`false`比较时，`false`化为数字0，**`[object Object]`化为数字`NaN`，所以不相等。同理，也不等于`true`**


#### 1.3. 判断`[] == ![]`的输出是什么？
```js
[] == ! []   // true
```

1. 根据运算符优先级 ，`!` 的优先级是大于 `==` 的，所以先会执行 `![]`
2. !可将变量转换成 boolean 类型，`null、undefined、NaN` 以及空字符串( `''` )取反都为 `true`，其余都为`false`。
3. 所以 `![]` 为 `false`
4. 如果一个操作数是对象，另一个操作数不是，则调用对象的 `valueOf()` 方法，用得到的基本类型值按照前面的规则进行比较，如果对象没有 `valueOf()` 方法，则调用 `toString()`
5. 所以`[]`为 `‘’`

综上：`[] == ![] -> [] == false -> [] == 0 -> '' == 0 -> 0 == 0 -> true`

#### 1.4. 判断`{} == !{}`的输出是什么？
```js
{} == !{} // false 
```
1. 因为 `{}.toString()` -> `NaN`（`[object Object]`）
2. 总结：`{} == ! {} -> {} == false -> {} == 0 -> NaN == 0 -> false`


### 2. 对象到字符串的转换步骤

1. **如果对象有 `toString()`方法，javascript 调用它。如果返回一个原始值（`primitive value` 如：`string/number/boolean`），将这个值转换为字符串作为结果**
2. 如果对象没有 `toString()`方法或者返回值不是原始值，javascript 寻找对象的 `valueOf()`方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript 不能从 `toString()`或者 `valueOf()`获得一个原始值，此时 `throws a TypeError`

### 3. 对象到数字的转换步骤

1. **如果对象有`valueOf()`方法并且返回元素值，javascript将返回值转换为数字作为结果**
2. 否则，如果对象有`toString()`并且返回原始值，javascript将返回结果转换为数字作为结果
3. 否则，`throws a TypeError`



### 4. `toSring`和`valueOf`对比
1. **`toString()` 方法返回一个表示该对象的字符串**。
对于对象x，`toString()` 返回 `“[object type]”`,其中type是对象类型。如果x不是对象，`toString()` 返回x应有的文本值(不是单纯的加`”“`)

2. **`valueOf()` 方法返回指定对象的原始值**
每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，`valueOf()` 就会返回对象自身

对比：
- 当函数`fn`用`+`连接一个字符串或者是数字的时候，如果我们没有重新定义`valueOf`和`toString`，其隐式转换会调用默认的`toString()`方法，将函数本身内容作为字符串返回； 



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
经测试，如果这个对象是`object`、数组，结果和上面的一样 
但如果这个对象是`Date`，则都调用`toString()`

#### 4.1. `{}` 和 `[]` 的 `valueOf` 和 `toString` 的结果是什么？
`{}` 的 `valueOf` 结果为 `{}` ，`toString` 的结果为 `"[object Object]"`

`[]` 的 `valueOf` 结果为 `[]` ，`toString` 的结果为 `""`



### 5. `toString`、`ValueOf`例子


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
注意，**运算符`+`号即使和字符串相加，也是会优先调用`valueOf`，因为`+`号默认是数值相加，而不是连接**。


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

总结起来就是 如果只重写了`toString`，对象转换时会使用`toString`方法来进行转换。

但是，如果只重写了`valueOf`方法，只有在非要转换为字符串的时候会优先考虑`toString`方法，包括`String(obj)、alert(obj)`，运算符`+`还是会调用valueOf 。在不能调用`toString`的情况下，只能让`valueOf`上阵了。
