- [1. TypeScript](#1-typescript)
  - [1.1. TS 优势](#11-ts-优势)
  - [1.2. 声明文件](#12-声明文件)
    - [1.2.1. 书写声明文件](#121-书写声明文件)
  - [1.3. 内置对象](#13-内置对象)
  - [1.4. 类型别名](#14-类型别名)
  - [1.5. 字符串字面量类型](#15-字符串字面量类型)
  - [1.6. 类](#16-类)
    - [1.6.1. TS 中的类](#161-ts-中的类)
    - [1.6.2. 抽象类](#162-抽象类)
  - [1.7. 类与接口](#17-类与接口)
  - [1.8. 泛型](#18-泛型)
  - [1.9. 声明合并](#19-声明合并)
  - [1.10. is 关键字](#110-is-关键字)
  - [1.11. 查看版本](#111-查看版本)
    - [1.11.1. 将ts文件编译成js文件](#1111-将ts文件编译成js文件)
    - [1.11.2. `undefined`和`null`](#1112-undefined和null)
    - [1.11.3. 联合类型(Union Types)](#1113-联合类型union-types)
    - [1.11.4. `any`](#1114-any)
    - [1.11.5. 数组](#1115-数组)
    - [1.11.6. 元组](#1116-元组)
    - [1.11.7. 接口](#1117-接口)
      - [1.11.7.1. `readonly` vs `const`](#11171-readonly-vs-const)
    - [1.11.8. 函数](#1118-函数)
  - [1.12. `ts-node`库](#112-ts-node库)
  - [1.13. 类](#113-类)
  - [1.14. 类和接口](#114-类和接口)
    - [1.14.1. 枚举类型](#1141-枚举类型)
  - [1.15. 泛型](#115-泛型)
    - [1.15.1. 约束泛型](#1151-约束泛型)
    - [1.15.2. 类和接口](#1152-类和接口)
  - [1.16. 类型别名](#116-类型别名)
  - [1.17. 类型推论](#117-类型推论)
  - [1.18. 类型断言](#118-类型断言)
  - [1.19. 声明文件](#119-声明文件)
    - [1.19.1. `tsconfig.json`配置文件](#1191-tsconfigjson配置文件)
    - [1.19.2. 使用第三方声明文件](#1192-使用第三方声明文件)
  - [TS和React结合](#ts和react结合)
  - [VSCode中Typescript的Eslint配置](#vscode中typescript的eslint配置)
  - [色彩体系](#色彩体系)

## 1. TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。

TypeScript 只会进行静态检查，编译为 js 之后，并没有什么检查的代码被插入进来。如果编译时发现有错误，就会报错，但还是会生成编译结果。

### 1.1. TS 优势

- TypeScript 增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
  - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
  - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
- TypeScript 非常包容
  - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
  - 即使不显式的定义类型，也能够自动做出类型推论
  - 可以定义从简单到复杂的几乎一切类型
  - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
  - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
- TypeScript 拥有活跃的社区
  - 大部分第三方库都有提供给 TypeScript 的类型定义文件
- TypeScript 的缺点
  - 有一定的学习成本
  - 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
  - 集成到构建流程需要一些工作量
  - 可能和一些库结合的不是很完美

### 1.2. 声明文件

通常我们会把声明语句放到一个单独的文件中，声明文件必需以 `.d.ts` 为后缀。

```js
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

更推荐的是使用 `@types` 统一管理第三方库的声明文件。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：`npm install @types/jquery --save-dev`

可以在[这个页面](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

#### 1.2.1. 书写声明文件

- 以`npm install @types/xxx --save-dev`安装的，则不需要任何配置。

- 如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下

- 如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件

- 语法

  - declare var/let/const
    - 声明全局变量，一般用 const
  - declare function
    - 声明全局方法的**类型**
  - declare class
    - 声明全局类，只定义不实现
  - declare enum
    - 声明全局枚举类型
  - declare namespace
    - 它用来表示全局变量是一个对象，包含很多子属性。
    - 可嵌套定义
  - interface 和 type
    - 声明全局类型

- 防止命名冲突

  - 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故应该将他们放到 namespace 下。在使用这个 interface 的时候，也应该加上 命名空间 前缀了

- npm 包

  - 已存在配置

    - 与该 npm 包绑定在一起。
    - 发布到了 `@types` 里。

  - 自己为它写声明文件

    - 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。

  - ```
    export
    ```

    - 在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。

### 1.3. 内置对象

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

在 [TypeScript 核心库](https://github.com/Microsoft/TypeScript/tree/master/src/lib)的定义文件中定义了 JS 的内置对象。

### 1.4. 类型别名

类型别名用来给一个类型起个新名字。类型别名常用于联合类型。

### 1.5. 字符串字面量类型

类型别名与字符串字面量类型都是使用 type 进行定义。

### 1.6. 类

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

#### 1.6.1. TS 中的类

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

#### 1.6.2. 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

- 抽象类是不允许被实例化
- 抽象类中的抽象方法必须被子类实现

### 1.7. 类与接口

有时候**不同类之间可以有一些共有的特性，这时候就把特性提取成接口（interfaces）**，用 implements 关键字来实现。

- 一个类可实现多个接口
- 接口与接口之间可以是继承关系
- 接口也可以继承类
- 混合类型（有时候，一个函数还可以有自己的属性和方法）

### 1.8. 泛型

在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray(3, "x"); // ['x', 'x', 'x']
```

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, "seven"]); // ['seven', 7]
```

- 泛型约束
  - 即函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，这时，我们可以对泛型进行约束。**即让泛型继承一个接口**
  - 多个类型参数之间也可以相互约束，如下例：其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
- 泛型接口
  - 在使用泛型接口的时候，需要定义泛型的类型
- 泛型类
- 泛型参数的默认类型
  - 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

### 1.9. 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型。

```ts
interface Alarm {
  price: number;
  alert(s: string): string;
}
interface Alarm {
  weight: number;
  alert(s: string, n: number): string;
}
```

相当于：

```ts
interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}
```

### 1.10. is 关键字

可以用来判断一个变量属于某个接口|类型

例如，此时有一个接口 A

```ts
interface IAProps {
  name: string
  js: any
}
```

现在需要判断一个变量是否为该类型

定义规则：

```ts
// 属于接口A
let isAProps = (props: any): props is IAProps =>
  typeof (props as IAProps)['js'] !== 'undefined'
```

若 isAProps(props)返回 true 则断定参数 props 为 IAProps 类型


### 1.11. 查看版本

```
tsc -v
```
`tsc`的意思是`typescript compiler`，即`ts`的编译器

#### 1.11.1. 将ts文件编译成js文件


```
tsc hello.ts
```
即可生成`hello.js`

#### 1.11.2. `undefined`和`null`
`undefined`和`null`是所有类型的子类型，也就是可以赋值给任意类型的变量，比如：
```ts
let str: string = undefined

let str2: number = null
```

#### 1.11.3. 联合类型(Union Types)

```ts
let numberOrStr: number | string = 'test'

numberOrStr = 123123
```

#### 1.11.4. `any`
任意数据类型

注意：`ts`中冒号后面的一定是类型

```ts
let notSure: any = undefined
notSure = '123'
notSure = 1212
notSure = false
```

#### 1.11.5. 数组

```ts
let numberArray: number[] = [1, 2, 3, 4]

numberArray = ['str'] // 报错

numberArray.push('test') // 报错
```


#### 1.11.6. 元组

可以看作是包含不同数据类型的数组。
和数组类型定义的不同是，**把数据类型写在了中括号里面**。

数组元素多了或少了都会报错。

```ts
let tupleTest: [string, number] = ['str', 123]
```

#### 1.11.7. 接口

```ts
interface IPerson { // 一般大写
  readonly id: number; // 只读属性
  name: string; // 注意是分号，不是逗号
  age: number; 
  gender?: string; // 可选属性
}

let testObj: IPerson = {
  id: 18,
  name: 'mike',
  age: 18,
}

testObj.id = 123123 // 报错
```

##### 1.11.7.1. `readonly` vs `const`
最简单判断该用`readonly`还是`const`的方法是看要**把它做为变量使用还是做为一个属性**。 做为变量使用的话用 `const`，若做为属性则使用`readonly`。


#### 1.11.8. 函数

函数声明
```ts
// 可选参数
function add(x: number, y: number, z?: number): number{
  return x + y
}
// 默认参数
function add2(x: number, y: number, z: number = 10): number{
  return x + y
}

let res = add(3, 5)
let res2 = add(3, 5)
```

函数表达式
```ts
const add3 = function(x: number, y: number, z?: number): number{
  return x + y
}

// const add4: string = add3 // 报错

/**
 * 正确
 * 这里的箭头不是箭头函数，而是声明函数返回类型
 */
const add4: (x: number, y: number, z?: number) => number = add3 
```



### 1.12. `ts-node`库

将`tsc index.ts`和`node index.js`两个命令合二为一。
全局安装:
```
npm install -g ts-node
```
### 1.13. 类
```ts
class Animal{
  protected name: string
  readonly age: number // 只读属性
  constructor(name: string) {
    this.name = name
  }
  run() {
    console.log(`${this.name} is running`)
  }
}

const snake = new Animal('viking')
snake.run()
console.log(snake.name) // 报错，只能在类内部和子类中使用
```
继承
```ts
class Cat extends Animal{
  constructor(name) {
    super(name)
    console.log(this.name)
  }

  run() {
    console.log(`The cat ${this.name} is running`)
  }

}

const cat = new Cat('mm')
cat.run()
```

### 1.14. 类和接口

```ts
interface Radio{
  switchRadio() :void
}

interface Battery{
  checkBatteryStatus();
}

class Car implements Radio{
  switchRadio() {}
}

class CellPhone implements Radio, Battery{
  switchRadio() {}

  checkBatteryStatus() {}
}
```

接口的继承:
```ts
interface RadioWithBattery extends Radio{
  checkBatteryStatus();
}

class CellPhone2 implements RadioWithBattery{
  switchRadio() {}

  checkBatteryStatus() {}
}
```

#### 1.14.1. 枚举类型

```ts
enum Direction {
  Up,
  Down,
  Right,
  Left
}

console.log(Direction.Down) // 1

console.log(Direction[1]) // 'Down'
```

手动赋值：
```ts
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Right = 'RIGHT',
  Left = 'LEFT'
}

const directionVal = 'UP'

// 比较枚举类型中的值和普通值
if (Direction2.Up === directionVal){
  console.log('go up')
}
```


常量枚举，在枚举类型前面加上`const`，能够大幅提高性能。

只把用到的枚举类型翻译成结果，不会把枚举类型转成JS代码。

```ts
const enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Right = 'RIGHT',
  Left = 'LEFT'
}

if (Direction3.Up === directionVal){
  console.log('go up')
}
```

### 1.15. 泛型

```ts
function echo<T>(args: T): T{
  return args
}

const res = echo(123)
```
多个类型
```ts
function swap<T, U>(tuple:[T,U]): [U, T]{
  return [tuple[1], tuple[0]]
}

const myTuple: [string, number] = ['str', 123]
const myTuple2 = swap(myTuple)
```
#### 1.15.1. 约束泛型
约束泛型，约束传过来的参数必须包含某属性。

```ts
interface IWithLength {
  length: number
}

function echoWithLength<T extends IWithLength>(args: T): T {
  console.log(args.length) // 不继承该接口的话，不能使用length属性，会报错
  return args
}

echoWithLength('string2')
echoWithLength([1,2,3])
echoWithLength({ length: 10000, width: 200 })
```

#### 1.15.2. 类和接口

泛型类：
```ts
class Queue<T>{
  private data = []
  push(item: T) {
    this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}

const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

const queue2 = new Queue<string>()
queue2.push('string2')
console.log(queue2.pop().length)
```

泛型接口：
```ts
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kp: KeyPair<number, string> = {
  key: 123,
  value: 'str'
}

let kp2: KeyPair<string, number> = {
  key: 'str',
  value: 123
}
```
`Array`就是一个内置的`interface`

用泛型的方式声明数值类型的数组：
```ts
let arr: number[] = [1, 2, 3]

// 两种方式等价
let arr2: Array<number> = [1, 2, 3]
```

接口描述函数类型：
```ts
interface IPlus {
  (a: number, b: number): number
}

function plus(a: number, b: number): number {
  return a + b
}

const a: IPlus = plus
```
泛型接口，描述函数类型
```ts
interface IPlus<T> {
  (a: T, b: T): T
}

function plus(a: number, b: number): number {
  return a + b
}

function connect(a: string, b: string): string {
  return a + b
}

const a: IPlus<number> = plus
const b: IPlus<string> = connect
```

### 1.16. 类型别名

第一个例子，函数类型的别名
```ts
type PlusType = (a: number, b: number) => number // 类型别名

function sum(a: number, b: number): number{
  return a + b
}

const sum2: PlusType = sum


```
第二个例子，函数参数可以是`string`或者函数
```ts
type NameResolver = () => string
type NameOrResolver = string | NameResolver

function getName(n: NameOrResolver): string {
  if (typeof n === 'string') {
    return n
  } 
  return n()
}
```
### 1.17. 类型推论
`TypeScript`里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。
```ts
let str = 'str'
str = 123 // 报错
```

### 1.18. 类型断言

类型断言有两种形式。 其一是“尖括号”语法：
```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为as语法：
```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

例子：

```ts
function getLength(input: number | string) : number {
  // const str = input as String // 类型断言，大写，表示接口，不是类型
  // if (str.length) {
  //   return str.length
  // }
  // const number = input as Number
  // return number.toString().length

  if((<string>input).length) { // 简便写法
    return (<string>input).length
  }
  return input.toString().length
}
```

### 1.19. 声明文件
功能包括代码补全、提示等

基本写法：
```ts
declare var jQuery: (selector: string) => any
```

文件名以`d.ts`结尾，比如`jQuery.d.ts`。

#### 1.19.1. `tsconfig.json`配置文件
```json
{
  "include": ["**/*"]
}
```
功能：让编译器编译当前文件夹下的所有文件。

#### 1.19.2. 使用第三方声明文件
```
npm install --save @types/jquery
```
`@types`开头，比如`@types/jquery`。这些第三方声明文件由`DefinitelyTyped`组织来管理。



### TS和React结合
```tsx
interface IHello {
  message?: string
}

// const Hello: React.FunctionComponent<IHello> = (props) => {
//   return <h2>{props.message}</h2>
// }

const Hello: React.FC<IHello> = (props) => { // FC 是 FunctionComponent 的别名
  return <h2>{props.message}</h2>
}

Hello.defaultProps = {
  message: 'defaultName'
}

export default Hello
```

### VSCode中Typescript的Eslint配置

在项目目录的`.vscode/setting.json`文件中添加以下代码，其实就是让编译器检查对`js/jsx/ts/tsx`文件都进行格式检查。

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true},
    { "language": "typescriptreact", "autoFix": true}
  ]
}
```


### 色彩体系

系统色板：基础色板+中性色板
产品色板：品牌色板+功能色板

基础色，指通过观察得到的颜色，比如红橙黄绿蓝紫。
中性色板，指黑白和不同级别的灰色。

品牌色，比如可口可乐是红色和白色，百事可乐是蓝色和白色。`primary color`和`secondary color`。
功能色板，比如成功是绿色，危险或失败是红色，警告是橙色。
