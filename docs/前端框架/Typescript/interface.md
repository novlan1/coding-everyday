- [1. 接口](#1-接口)
  - [1.1. 可选属性](#11-可选属性)
  - [1.2. 只读属性](#12-只读属性)
  - [1.3. 可索引的类型](#13-可索引的类型)
  - [1.4. 继承接口](#14-继承接口)
  - [1.5. 混合类型](#15-混合类型)
  - [1.6. 类继承接口](#16-类继承接口)
  - [1.7. 接口继承类](#17-接口继承类)

## 1. 接口

描述对象、函数、类，接口中描述的属性都必须包含，但对象有其他一些属性、接口未定义不会报错。

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
```

### 1.1. 可选属性

```ts
interface SquareConfig {
  color?: string
  width?: number
}
```

### 1.2. 只读属性

```ts
interface Point {
  readonly x: number
  readonly y: number
}
```

### 1.3. 可索引的类型

描述了对象索引的类型，还有相应的索引返回值类型。

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

### 1.4. 继承接口

继承接口，使得接口可分割到更多重用的模块里。

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
```

### 1.5. 混合类型

在函数上定义一些属性

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

### 1.6. 类继承接口

实现接口

```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

### 1.7. 接口继承类

会继承类的成员但不包括其实现。 接口同样会继承到类的 private 和 protected 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。