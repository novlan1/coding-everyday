- [1. 装饰器](#1-装饰器)
  - [1.1. 类装饰器](#11-类装饰器)
  - [1.2. 类中方法的装饰器](#12-类中方法的装饰器)
  - [1.3. 类的访问器装饰器](#13-类的访问器装饰器)
  - [1.4. 属性的装饰器](#14-属性的装饰器)
  - [1.5. 参数装饰器](#15-参数装饰器)

## 1. 装饰器

装饰器函数(Decorator)用于给对象在运行期间动态的增加某个功能，职责等，装饰器本身是一个函数。

### 1.1. 类装饰器

类装饰器接受的参数是构造函数。通过下面的方法可以让装饰后的类获取到装饰器中定义的方法，否则无此方法提示。

```ts
function testDecorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "xiansheng";
      getName() {
        return this.name;
      }
    };
  };
}

const Test = testDecorator()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test = new Test("haha");
console.log(test.getName());
```

### 1.2. 类中方法的装饰器

- 普通方法，target 对应的是类的 prototype
- 静态方法，target 对应的是类的构造函数

```ts
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // console.log(target, key);
  // descriptor.writable = true;
  descriptor.value = function () {
    return "decorator";
  };
}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test = new Test("haha");
console.log(test.getName());
// -> decorator
```

### 1.3. 类的访问器装饰器

```ts
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.writable = false;
}

class Test {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test = new Test("hu");
test.name = "yao"; // 报错
console.log(test.name);
```

### 1.4. 属性的装饰器

- 可返回 descriptor
- target 上修改的是原型上属性

```ts
function nameDecorator1(target: any, key: string): any {
  const descriptor: PropertyDescriptor = {
    writable: false,
  };
  return descriptor;
}

// 修改的并不是实例上的 name， 而是原型上的 name
function nameDecorator2(target: any, key: string): any {
  target[key] = 20;
}

// name 放在实例上
class Test {
  @nameDecorator1
  name = "a";
  @nameDecorator2
  age = 18;
}

const test = new Test();
console.log((test as any).__proto__.name);
```

### 1.5. 参数装饰器

```ts
// 原型，方法名，参数所在的位置
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}

class Test {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age);
  }
}

const test = new Test();
test.getInfo("a", 20);
```