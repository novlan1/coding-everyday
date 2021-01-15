## isNaN 和 Number.isNaN的区别

如果isNaN函数的参数不是Number类型， **isNaN函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是NaN进行判断**。

因此，对于能被强制转换为有效的非NaN数值来说（**空字符串和布尔值分别会被强制转换为数值0和1），返回false值也许会让人感觉莫名其妙**。比如说，空字符串就明显“不是数值（not a number）”。

```
isNaN(NaN);       // true
isNaN(undefined); // true
isNaN({});        // true

isNaN(true);      // false
isNaN(null);      // false
isNaN(37);        // false

// strings
isNaN("37");      // false: 可以被转换成数值37
isNaN("37.37");   // false: 可以被转换成数值37.37
isNaN("37,5");    // true
isNaN('123ABC');  // true:  parseInt("123ABC")的结果是 123, 但是Number("123ABC")结果是 NaN
isNaN("");        // false: 空字符串被转换成0
isNaN(" ");       // false: 包含空格的字符串被转换成0

// dates
isNaN(new Date());                // false
isNaN(new Date().toString());     // true

isNaN("blabla")   // true: "blabla"不能转换成数值
                  // 转换成数值失败， 返回NaN
```





### isNaN的必要性

有许多方式来看待isNaN()：

如果isNaN(x)返回false，那么x在任何算数表达式中都不会使表达式等于NaN；如果返回true，x会使所有算数表达式返回NaN。
这就意味着，在JavaScript中，**isNaN(x)==true**等价于**x-0=NaN**(在JavaScript中 x-0 == NaN 总是返回false，所以你不用去测试它)。

实际上， isNaN(x), isNaN(x - 0),isNaN(Number(x)), Number.isNaN(x - 0),和Number.isNaN(Number(x)) 的返回值都是一样的 并且在JavaScript中isNaN(x)是这些表达式中最短的表达。



**Number.isNaN() 不会自行将参数转换成数字，只有在参数是值为 NaN 的数字时，才会返回 true**。

```js
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

### Number.isNaN的polyfill

```js
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return typeof n === "number" && window.isNaN( n );
  };
}
简单的实现,利用只有 NaN 不跟自己相等的特性
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return  return value !== value;
  };
}
```