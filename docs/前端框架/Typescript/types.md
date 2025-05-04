- [1. 数据类型](#1-数据类型)
- [2. 类型推论](#2-类型推论)
- [3. 联合类型](#3-联合类型)
  - [3.1. 访问联合类型的属性或方法](#31-访问联合类型的属性或方法)
- [4. 对象的类型](#4-对象的类型)
- [5. 数组的类型](#5-数组的类型)
- [6. 函数的类型](#6-函数的类型)
- [7. 类型断言](#7-类型断言)
- [8. 联合类型和交叉类型的区别](#8-联合类型和交叉类型的区别)

### 1. 数据类型

- `boolean`

- `number`

- `string`

- `undefind`

- `list`

- `Tuple`
- 合并了不同类型的对象的数组
  
- `enum`

  - 用于取值被限定在一定范围内的场景
  - 未手动赋值的枚举项会接着上一个枚举项递增
  - 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
  - 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
  - 常数枚举
    - 是使用 const enum 定义的枚举类型，不能包含计算成员
  - 外部枚举
    - 使用 declare enum 定义的枚举类型
    - 外部枚举与声明语句一样，常出现在声明文件中

- `any`

  - 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
  - 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

- `void`
- 可以用 void 表示没有任何返回值的函数
  - 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null

### 2. 类型推论

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 3. 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

#### 3.1. 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```ts
function getLength(something: string | number): number {
  return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

length 不是 string 和 number 的共有属性，只有 string 有，所以会报错。

联合类型的变量在被**赋值**的时候，会根据类型推论的规则推断出一个类型。推断后访问该类型没有的属性就会报错。

### 4. 对象的类型

除了可用于[对类的一部分行为进行抽象](https://ts.xcatliu.com/advanced/class-and-interfaces.html#类实现接口)以外，也常用于对`对象的形状（Shape）`进行描述。

- 普通接口
  - 定义的变量比接口**少了**或是**多了**一些属性是不允许的
- 可选属性
  - 在属性后面加`?`表示该属性为可选属性
- 任意属性
  - `[propName: string]: 类型;`
  - 注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
- 只读属性
  - 在属性名前加`readonly`，则该属性只能在创建的时候被赋值

### 5. 数组的类型

- 类型 + 方括号 表示法
  - `let fibonacci: number[] = [1, 1, 2, 3, 5];`
  - `let fibonacci: (number | string)[] = [1, '1', 2, 3, 5];`
- 数组泛型`Array<elemType>` 来表示数组
  - let fibonacci: Array = [1, 1, 2, 3, 5];
- 在数组中的`any`
  - `let list: any[] = ['yaoyao', 25, { a: 'str' }];`
- 用接口表示数组
  - NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number

```ts
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

- 类数组
  - 类数组（Array-like Object）不是数组类型，比如 `arguments`
  - 事实上常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection

```ts
function sum() {
  let args: IArguments = arguments;
}
```

### 6. 函数的类型

- 声明式
  - 一个函数有输入和输出，需要把输入和输出都考虑到。并且输入多余的（或者少于要求的）参数，是不被允许的

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

- 函数表达式
  - TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。 不要和 ES6 的箭头函数搞混了

```ts
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

- 用接口定义函数的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySerch: SearchFunc = function (
  source: string,
  subString: string
): boolean {
  return source.search(subString) !== -1;
};
```

- 可选参数
  - 用`?`表示可选的参数

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
```

- 参数默认值
  - TypeScript 会将添加了默认值的参数识别为可选参数

```ts
function buildName(firstName: string, lastName: string = "Cat") {
  return firstName + " " + lastName;
}
```

- 剩余参数
  - 事实上，剩余参数是一个数组。所以我们可以用数组的类型来定义它

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);
```

- 重载
  - 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
  - 通常做法：重复定义了多次函数，前几次都是函数定义，最后一次是函数实现。
  - TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

### 7. 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法： `<类型>值` 或 `值 as 类型`，在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。

```ts
// 获取长度例子：
function getLength(something: string | number): number {
  if ((<string>something).length) {
    //可能是number，所以断言
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```

注意： 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的

### 8. 联合类型和交叉类型的区别
1. 联合类型（T | U）是多个类型中的某一个，只能访问所有类型的共有属性。
2. 交叉类型（T & U）是多个类型合并为一个类型，可以访问所有类型的属性；


```
联合类型 A | B 表示一个集合，该集合是与类型A关联的一组值和与类型 B 关联的一组值的并集。
交叉类型 A & B 表示一个集合，该集合是与类型 A 关联的一组值和与类型 B 关联的一组值的交集。

因此，Foo | Bar 表示有 foo 和 name 属性的对象集和有 bar 和 name 属性的对象集的并集。
属于这类集合的对象都含有 name 属性。有些有 foo 属性，有些有 bar 属性。

而 Foo & Bar 表示具有 foo 和 name 属性的对象集和具有 bar 和 name 属性的对象集的交集。换句话说，
集合包含了属于由 Foo 和 Bar 表示的集合的对象。只有具有这三个属性（foo、bar 和 name）的对象才属于交集。
```

参考资料：[联合类型和交叉类型的区别](https://blog.csdn.net/azl397985856/article/details/106394200)

