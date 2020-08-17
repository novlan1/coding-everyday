- [1. `SOLID` 五大设计原则](#1-solid-五大设计原则)
		- [1.0.1. 依赖倒置](#101-依赖倒置)
		- [1.0.2. 里氏替换](#102-里氏替换)
- [2. 23种设计模式：创建型、组合型、行为型](#2-23种设计模式创建型组合型行为型)
- [3. 工厂模式](#3-工厂模式)
- [4. 单例模式](#4-单例模式)
- [5. 适配器模式](#5-适配器模式)
- [6. 装饰器模式](#6-装饰器模式)
		- [6.0.1. 适配器和装饰器的区别](#601-适配器和装饰器的区别)
- [7. 代理模式](#7-代理模式)
		- [7.0.1. 代理模式 vs 适配器模式](#701-代理模式-vs-适配器模式)
		- [7.0.2. 代理模式 vs 装饰器模式](#702-代理模式-vs-装饰器模式)
- [8. 外观模式](#8-外观模式)
- [9. 观察者模式](#9-观察者模式)
- [10. 迭代器模式](#10-迭代器模式)
- [11. 状态模式](#11-状态模式)
- [12. 原型模式](#12-原型模式)
- [13. 桥接模式](#13-桥接模式)
- [14. 组合模式](#14-组合模式)
- [15. 享元模式](#15-享元模式)
- [16. 策略模式](#16-策略模式)
- [17. 模板方法](#17-模板方法)
- [18. 职责链模式](#18-职责链模式)
- [19. 命令模式](#19-命令模式)
- [20. 备忘录模式](#20-备忘录模式)
- [21. 中介者模式](#21-中介者模式)
- [22. 访问者模式](#22-访问者模式)
- [23. 解释器模式](#23-解释器模式)

## 设计模式 <!-- omit in toc -->

### 1. `SOLID` 五大设计原则
- S，单一职责原则。`single`，一个程序只做好一件事，如果功能过于复杂就拆分开，每个部分保持独立。
- O，开放封闭原则。`open-close`，对扩展开放，对修改封闭。增加需求，扩展新代码，而非修改已有代码。
- L，里氏置换原则。子类能覆盖父类。所有父类能出现的地方，子类就能出现。JS使用较少（弱类型&继承使用少）
- I，接口独立原则。保持接口的单一独立，避免出现‘胖接口’。JS中没有接口，使用较少。
类似于单一职责原则，这里更关注接口。
- D，依赖倒置原则。面向接口编程，依赖于抽象而不依赖于具体。 使用方只关注接口而不关注具体类的实现。 JS使用较少（没有接口&弱类型）

`S O`体现较多，`L I D`体现较少

##### 1.0.1. 依赖倒置 
依赖倒置： `Dependence Inversion Principle`(`DIP`):高层模块不应该依赖底层模块，都应该依赖于抽象；抽象不应该依赖于具体，具体依赖于抽象。
例子：福特和本田汽车

##### 1.0.2. 里氏替换
里氏替换原则包含以下4层含义：
1. 子类可以实现父类的抽象方法，但是不能覆盖父类的非抽象方法。
2. 子类中可以增加自己特有的方法。
3. 当子类覆盖或实现父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
4. 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。


### 2. 23种设计模式：创建型、组合型、行为型

- 创建型：工厂模式（工厂方法模式、抽象方法模式、建造者模式）、单例模式、原型模式
- 结构型：适配器、装饰器、代理、外观模式、桥接、组合、享元模式
- 行为型：观察者模式、迭代器模式、状态模式、策略、模板方法、职责链、命令、备忘录、中介者、访问者、解释器模式


### 3. 工厂模式
1. 将 new 操作单独封装
2. 遇到 new 时，就要考虑是否使用工厂模式

特点：
创建实例的时候有统一的入口，收口。构造函数和创建者分离。符合开放封闭原则。

场景：
1. `jQuery - $(‘div’)`
2. `React.createElement`
3. vue 异步组件

`React.createElement`创建的是 vnode 的实例
```js
React.createElement = function(tag, attrs, children){
	return new Vnode(tag, attrs, children)
}
```

### 4. 单例模式
1. 系统中被唯一使用
2. 保证一个类只有一个实例，先判断实例存在与否，如果存在直接返回，不存在创建了再返回，就保证了一个类只有一个实例对象。

设计原则验证：
1. 符合单一职责原则，只实例化唯一的对象
2. 没有体现开闭原则，但没违反开闭原则

前端应用场景：
1. jQuey只有一个$
2. 登录框
3. 购物车
4. vuex 和 redux 中的 store

其他应用场景：
1. Windows的`Task Manager`（任务管理器）就是很典型的单例模式（这个很熟悉吧），想想看，是不是呢，你能打开两个`windows task manager`吗？
2. windows的`Recycle Bin`（回收站）也是典型的单例应用。在整个系统运行过程中，回收站一直维护着仅有的一个实例
3. 应用程序的日志应用，一般都用单例模式实现，这一般是由于共享的日志文件一直处于打开状态，因为只能有一个实例去操作，否则内容不好追加
4. Web应用的配置对象的读取，一般也应用单例模式，这个是由于配置文件是共享的资源。
5. 数据库连接池的设计一般也是采用单例模式，因为数据库连接是一种数据库资源。数据库软件系统中使用数据库连接池，主要是节省打开或者关闭数据库连接所引起的效率损耗，这种效率上的损耗还是非常昂贵的，因为何用单例模式来维护，就可以大大降低这种损耗
6. 多线程的线程池的设计一般也是采用单例模式，这是由于线程池要方便对池中的线程进行控制
7. 操作系统的文件系统，也是大的单例模式实现的具体例子，一个操作系统只能有一个文件系统

单例模式应用的场景一般发生在以下条件下：
（1）资源共享的情况下，避免由于资源操作时导致的性能或损耗等。如上述中的日志文件，应用配置。
（2）控制资源的情况下，方便资源之间的互相通信。如线程池等。



### 5. 适配器模式

1. 旧接口格式和使用者不兼容
2. 中间加一个适配器转换接口（开闭原则）

场景：
1. 封装旧接口（比如`jQuery`中的`$.ajax({})`）
2. `Vue computed`



### 6. 装饰器模式
无需子类化扩展对象功能。

1. 为对象添加新功能
2. 不改变其原有的结构和功能


场景：
1. ES7装饰器
2. `core-decorators`（封装了一些常见的装饰器，比如`readonly`，`deprecate`(提示此方法已经废弃)）
3. 设置为只读
4. 打印日志

##### 6.0.1. 适配器和装饰器的区别
适配器是原有的根本不能用了，装饰器是在`a b c`功能上增加`e f`功能（手机壳）


### 7. 代理模式
把一个对象的操作代理到另一个对象（deque=>stack）。

1. 使用者无权访问目标对象
2. 中间加代理，通过代理做授权和控制

示例：
1. 科学上网
2. 明星经纪人


场景：
1. 网页事件代理
2. jQuery 的`$.proxy`
3. ES6 的`proxy`

##### 7.0.1. 代理模式 vs 适配器模式
1. 适配器模式：提供一个不同的接口
2. 代理模式：提供一模一样的接口

##### 7.0.2. 代理模式 vs 装饰器模式
1. 装饰器模式：扩展功能，原有功能不变且可以直接使用
2. 代理模式：显示原有功能，但是经过限制或者阉割之后的

### 8. 外观模式
简化复杂对象的访问问题。

1. 为子系统中的一组接口提供了一个高层接口
2. 使用者使用这个高层接口

场景：
兼容传3个参数和传4个参数

设计原则验证：
不符合单一职责和开放封闭原则，谨慎使用

### 9. 观察者模式
1. 前端使用最多
2. 发布&订阅
3. 可以一对多

场景：
1. 网页事件绑定
2. Promise
3. `jQuery callbacks`
4. NodeJS 自定义事件
5. NodeJS 中：处理 http 请求；多进程通讯
6. Vue 和 React 组件生命周期触发
7. Vue 的`watch`

设计原则验证：
1. 主题和观察者分离，不是主动触发而是被动监听，两者解耦
2. 符合开发封闭原则

### 10. 迭代器模式
1. 顺序访问一个集合
2. 使用者无需知道集合的内部结构（封装）

场景：
1. jQuery 的`each`
2. ES6 的`Iterator`

ES6 的`Iterator`为何存在？
1. 有序集合很多，`Array Map Set String TypedArray arguments NodeList`
2. `Object`不是有序集合，可以用`Map`代替
3. 需要一个统一的遍历接口来遍历所有数据类型

ES6 `Iterator`是什么？
1. 以上数据类型都有`[Symbol.iterator]`属性
2. 属性值是函数，执行函数返回一个迭代器
3. 这个迭代器有`next`方法可顺序迭代子元素
4. 可运行`Array.prototype[Symbol.iterator]`来测试

### 11. 状态模式
1. 一个对象有状态变化
2. 每次状态变化都会触发一个逻辑
3. 不能总是用`if else`来控制

场景：
1. 有限状态机（如交通信号灯）
2. 写一个简单的`Promise`

### 12. 原型模式
1. `clone`自己，生成一个新对象（`new`开销大）
2. Java 默认有`clone`接口，不用自己实现
3. 通过克隆原型来创建新的实例
4. 可以使用相同的原型，通过修改部分属性来创建新的实例
5. 用途：对于一些创建实例开销比较大的地方可以使用原型模式

JS中的应用：`Object.create`

### 13. 桥接模式
1. 用于把抽象化与实现化解耦
2. 使得二者可以独立变化

比如：画图时，颜色有黄色和绿色，图形有矩形和三角形，它们的两两组合可以称为桥接。

### 14. 组合模式
1. 生成树形结构，表示‘整体-部分’关系
2. 让整体和部分都具有一致的操作方式

比如，文件夹包含文件和子文件夹，子文件夹又包含子子文件夹和文件，...

场景：
虚拟DOM中的`vnode`是组合模式，但数据类型简单。

### 15. 享元模式
通过对象复用（池）改善资源利用，比如连接池。

1. 共享内存（主要考虑内存，而非效率）
2. 相同的数据，共享使用

事件代理可以看成享元模式的思想。

### 16. 策略模式
1. 不同策略分开处理
2. 避免出现大量`if else`或者`switch case`

### 17. 模板方法

对自己内部的有顺序的方法封装

### 18. 职责链模式
1. 一个操作可能分为多个职责角色来完成
2. 把这些角色都分开，然后用一个链串起来
3. 将发起者和各个处理者进行隔离

链式操作场景：
- jQuery 的链式操作
- `Promise.then`的链式操作

### 19. 命令模式
1. 执行命令时，发布者和执行者分开
2. 中间加入命令对象，作为中转站

一级嵌套一级，`Invoker`调用`command`的`cmd`命令，`cmd`方法中又调用了`Receiver`的`exec`命令。

JS 中的应用
1. 网页富文本编辑器操作，浏览器封装了一个命令对象
2. `document.exexCommand(‘bold’)`
3. `document.exexCommand(‘undo)`

### 20. 备忘录模式
1. 随时记录一个对象的状态变化
2. 随时可以恢复之前的某个状态（如撤销功能）


### 21. 中介者模式

比如，买房子和卖房子的中介。

### 22. 访问者模式
将数据操作和数据结构进行分离

### 23. 解释器模式
1. 描述语言语法如何定义，如何解释和编译
2. 用于专业场景（`babel`、`less`、`sass`）

