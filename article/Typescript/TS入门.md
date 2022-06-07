## 泛型推断 infer

infer 的中文是“推断”的意思，一般是搭配上面的泛型条件语句使用的，所谓推断，**就是你不用预先指定在泛型列表中，在运行时会自动判断**，不过你得先预定义好整体的结构。举个例子

```ts
type Foo<T> = T extends {t: infer Test} ? Test: string
```

首选看 extends 后面的内容，`{t: infer Test}`可以看成是一个包含t属性的类型定义，这个t属性的 value 类型通过infer进行推断后会赋值给Test类型，如果泛型实际参数符合`{t: infer Test}`的定义那么返回的就是Test类型，否则默认给缺省的string类型。

举个例子加深下理解：

```ts
type One = Foo<number>  // string，因为number不是一个包含t的对象类型
type Two = Foo<{t: boolean}>  // boolean，因为泛型参数匹配上了，使用了infer对应的type
type Three = Foo<{a: number, t: () => void}> // () => void，泛型定义是参数的子集，同样适配
```

infer用来`对满足的泛型类型进行子类型的抽取`，有很多高级的泛型工具也巧妙的使用了这个方法。



## interface VS type

interface 和 type 两个关键字因为其功能比较接近，常常引起新手的疑问：应该在什么时候用type，什么时候用interface？

interface 的特点如下：

- 同名interface自动聚合，也可以和已有的同名class聚合，适合做polyfill
- 自身只能表示object/class/function的类型

建议库的开发者所提供的公共api应该尽量用interface/class，方便使用者自行扩展。


与interface相比，type的特点如下：

- 表达功能更强大，不局限于object/class/function
- 要扩展已有type需要创建新type，不可以重名
- 支持更复杂的类型操作

```ts
type Tuple = [number, string];
const a: Tuple = [2, 'sir'];
type Size = 'small' | 'default' | 'big' | number;
const b: Size = 24;
```

基本上所有用interface表达的类型都有其等价的type表达。但有一种类型只能用interface表达，无法用type表达，那就是往函数上挂载属性。

```ts
interface FuncWithAttachment {
    (param: string): boolean;
    someProperty: number;
}

const testFunc: FuncWithAttachment = ...;
const result = testFunc('mike');    // 有类型提醒
testFunc.someProperty = 3;    // 有类型提醒
```

## 内置别名

### Partial/Required/Readonly

- `Partial<Type>` – 所有属性变成可选
- `Required<Type>` – 所有属性变成必选
- `Readonly<Type>`– 所有属性变成只读


```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### Pick

- `Pick<Type, Keys>` 从Type中挑出一些Keys

Pick和Omit分别是删除和保留Map的一部分。


```ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

举例：

```ts
type Animal = {
  name: string,
  category: string,
  age: number,
  eat: () => number
}

const bird: Pick<Animal, "name" | "age"> = { name: 'bird', age: 1 }
```

### Omit


- `Omit<Type, Keys>` 从Type中排除一些Keys

```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

Omit 与 Pick 得到的结果完全相反，一个是取非结果，一个取交结果。

Omit 在定义中，第一步先从 T 的 key 中去掉与 K 重叠的 key，接着使用 Pick 把 T 类型和剩余的 key 组合起来即可。

举例：


```ts
const OmitAnimal:Omit<Animal, 'name'|'age'> = { category: 'lion', eat: () => { console.log('eat') } }
```


### Extract/Exclude

- `Extract<Type, Union>` 从联合类型Type中挑出Union的子类型
- `Exclude<Type, ExcludedUnion>` 从联合类型Type中排除Union的子类型

Extract和Exclude分别是保留和删除 Set 的一部分。

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

举例：

```ts
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;   // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

```ts
type T1 = Extract<"a" | "b" | "c", "a" | "b">;   // "a"|"b"
type T2 = Extract<string | number | (() => void), Function>; // () => void
```

### Record


- `Record<Keys, Type>` – Keys, ValueType字典

此工具的作用是将 K 中所有属性值转化为 T 类型，可以由Set生成Map

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```


举例：

```ts
const obj: Record<string, string> = { 'name': 'LiLei', 'tag': '打工人' }
```

另一个例子：

```ts
type Page = 'home' | 'about' | 'contract';

interface PageInfo  {
  title: string
}

export const nav: Record<Page, PageInfo> = {
  about: { title: '' },
  home: { title: '' },
  contract: { title: '' },
};
```

### NonNullable


- `NonNullable<Type>` - 排除空值


```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

举例：

```ts
type T0 = NonNullable<string | number | null>; // string | number

type T1 = NonNullable<string[] | null | undefined>; /// string[]
```

### ReturnType/InstanceType

- `ReturnType<Type>` 推断返回类型
- `InstanceType<Type>` 推断构造函数返回类型


```ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```

ReturnType 可以稍微简化成下面的样子：

```ts
type ReturnType<T extends func> = T extends () => infer R ? R: any;
```

举例：

```ts
function foo(x: string | number): string | number { /*..*/ }

type FooType = ReturnType<foo>;  // string | number
```


### Parameters/ConstructorParameters

- `Parameters<Type>` 推导函数参数
- `ConstructorParameters<Type>` 推导构造函数参数

```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```

举例：

```ts
type T1 = ConstructorParameters<ErrorConstructor>;
// [message?: string | undefined, options?: ErrorOptions | undefined]

type T2 = ConstructorParameters<FunctionConstructor>; 
// string[]

type T3 = ConstructorParameters<RegExpConstructor>;
// [pattern: string | RegExp, flags?: string | undefined]

type T4 = ConstructorParameters<any>; 
// unknown[]
```


## 其他


### ScriptHost

TS配置文件中lib有个选项是ScriptHost，它的含义是 `APIs for the Windows Script Hosting System`

参考: https://www.typescriptlang.org/tsconfig


### allowJS

`tsconfig.json`的`allowJS`设置为`true`，否则JS文件中引用TS文件没有方法类型智能提示。


### Exclude


`exclude`只是告诉Typescript这不是你的源代码，不要去转译和检查它。但是Typescript还是会去`node_modules`中查找第三方库的声明文件，这个行为也可以通过`types`或`typesRoots`选项配置。

如果不想让Typescript检查第三方库的声明文件，可以设置`skipLibCheck`

`--skipLibCheck boolean`，false 忽略所有的声明文件（ `*.d.ts`）的类型检查。


### declare

在declare的最广为人知的用处就是给第三方js库来做类型定义，让typescript明白js引入的用法，但是还有一些用法例如: 

1. 可以将我们写入在分散在各个ts文件中的定义，给统一的放到一个myProject.d.ts中，这样做的好处就是如果我们的后端是nodejs写的，那么可以做到前后端数据共用格式。

在`.d.ts`文件中，如果我们没有使用了`import || export`，然后这时候如果我们定义

`declare interface A{...}`这时候这个这个`interface`就是全局的，我们在用它的时候不需要`import`就可以直接使用。

同理对于`namespace`也是一样的，例如`declare namespace responseTypes{......}`，这样用的时候也可以直接使用`responseTypes.a`来用

反之一旦里面用了`import || export了`，那么我们的`declare type..`前面也要加上`export`，不然用不了。

但是如果我们实在想定义成全局的，可以用

```ts
declare global {
  namespace Express {
  }
}
```

2. 第二种用法就是如果我们想去改变第三方库中的类型定义，那么我们可以通过`declare`的类型融合，比如在`Express`中，里面暴露出来了`Express.Request`的全局变量，然后如果我们自己再定义一个全局的`namespace Express{interface Request:{{name:string}}`，这样就可以做到类型的融合，将第三方库中的`Request`类型给改写掉，正如上面的代码注释所提示的那样，这个功能在我们写中间件的时候比较有用，我们就可以改写`request`里面的类型定义。