- [1. Python属于动态强类型语言](#1-python属于动态强类型语言)
- [2. 为什么要用Python？](#2-为什么要用python)
- [3. 什么是`monkey patch`？哪些地方用到类？自己如何实现？](#3-什么是monkey-patch哪些地方用到类自己如何实现)
- [4. 什么是自省(`Introspection`)？](#4-什么是自省introspection)
- [5. `is`和等号的区别](#5-is和等号的区别)
- [6. Python 之禅](#6-python-之禅)
- [7. Python2和3差别](#7-python2和3差别)
  - [7.1. Python3 改进](#71-python3-改进)
  - [7.2. Python3新增：](#72-python3新增)
  - [7.3. 兼容2/3的工具](#73-兼容23的工具)
- [8. `replace()` 和` re.sub()` 字符串字符替换](#8-replace-和-resub-字符串字符替换)
  - [8.1. `replace()`](#81-replace)
  - [8.2. `re.sub()`](#82-resub)
- [9. Python如何传递参数？](#9-python如何传递参数)
- [10. 哪些是不可变对象？哪些可变？](#10-哪些是不可变对象哪些可变)
- [11. `*args`,  `**kwarg`s含义是什么](#11-args-kwargs含义是什么)
- [12. 如何自定义异常？](#12-如何自定义异常)
- [13. Python生成器与协程](#13-python生成器与协程)
  - [13.1. 协程](#131-协程)
- [14. Python 单元测试](#14-python-单元测试)
- [15. Python 深拷贝和浅拷贝](#15-python-深拷贝和浅拷贝)
- [16. Python 内置数据结构算法](#16-python-内置数据结构算法)
  - [16.1. Python `dict`底层结构](#161-python-dict底层结构)
  - [16.2. `List`和`tuple`区别](#162-list和tuple区别)
- [17. 什么是LRUCache？](#17-什么是lrucache)
  - [17.1. 如何实现`LRUCache`？](#171-如何实现lrucache)
- [18. 组合和继承](#18-组合和继承)
- [19. `Classmethod/staticmethod`区别](#19-classmethodstaticmethod区别)
- [20. 元类](#20-元类)
  - [20.1. `type(‘child’, (Base, ), {})`](#201-typechild-base--)
- [21. `__init__`与`__new__`的区别？](#21-__init__与__new__的区别)
  - [21.1. `__new__`用途：](#211-__new__用途)
- [22. 装饰器 `Decorator`](#22-装饰器-decorator)
  - [22.1. 如何使用类编写装饰器](#221-如何使用类编写装饰器)
- [23. python 实现单例模式](#23-python-实现单例模式)
- [24. python 迭代器模式](#24-python-迭代器模式)
- [25. 函数式编程](#25-函数式编程)
  - [25.1. 函数式编程优点](#251-函数式编程优点)
  - [25.2. 计算机（`Computer`）和计算（`Compute`）的区别：](#252-计算机computer和计算compute的区别)
- [26. 什么是闭包(`Closure`)](#26-什么是闭包closure)
- [27. IO多路复用](#27-io多路复用)
  - [27.1. 提升服务器的并发能力？](#271-提升服务器的并发能力)
  - [27.2. 什么是IO多路复用?](#272-什么是io多路复用)
  - [27.3. 为什么`select`能实现高并发？](#273-为什么select能实现高并发)
  - [27.4. Python如何实现IO多路复用？](#274-python如何实现io多路复用)
- [28. Python并发网络库](#28-python并发网络库)
  - [28.1. `Tornado`框架](#281-tornado框架)
  - [28.2. `Gevent`：高性能的并发网络库](#282-gevent高性能的并发网络库)
  - [28.3. `Asyncio` 基于协程实现的内置的并发网络库](#283-asyncio-基于协程实现的内置的并发网络库)
- [29. WSGI和web框架](#29-wsgi和web框架)
  - [29.1. 常用python web框架对比](#291-常用python-web框架对比)
- [30. python多线程编程](#30-python多线程编程)
- [31. Python性能分析与优化，GIL](#31-python性能分析与优化gil)
  - [31.1. 如何规避GIL影响](#311-如何规避gil影响)
  - [31.2. GIL的实现](#312-gil的实现)
  - [31.3. 为什么有了GIL还要关注线程安全？](#313-为什么有了gil还要关注线程安全)
  - [31.4. 如何剖析程序性能？](#314-如何剖析程序性能)
- [32. 服务端性能优化措施](#32-服务端性能优化措施)
- [33. GIL](#33-gil)
- [34. `pandas`保存文件的中文乱码](#34-pandas保存文件的中文乱码)
- [35. xpath 取值](#35-xpath-取值)
- [36. Python的垃圾回收机制原理](#36-python的垃圾回收机制原理)
  - [36.1. 标记清除](#361-标记清除)
  - [36.2. 分代回收](#362-分代回收)




### 1. Python属于动态强类型语言
1. 动态还是静态指的是**编译期**还是**运行期**确定类型
2. **强类型指的是不会发生隐式类型转换**（`php` `js` 都是弱类型语言）


### 2. 为什么要用Python？ 
1. 胶水语言，轮子多，应用广泛
2. 语言灵活，生产力高

缺点：
1. 性能问题
2. 代码维护问题（动态语言一时爽，代码重构火葬场）
3. python2/3兼容问题



### 3. 什么是`monkey patch`？哪些地方用到类？自己如何实现？
1. 所谓的`monkey patch`就是**运行时替换**
2. 比如`gevent`库需要修改内置的`socket`

```
from gevent import monkey; 
monkey.patch_socket()
```


### 4. 什么是自省(`Introspection`)？
1. 运行时判断一个对象的类型的能力
2. `python`一切皆对象，用`type`，`id`，`instance`获取对象类型信息
3. `inspect`模块提供了更多获取对象信息的函数
4. `id`返回的是变量在内存中的地址


```python
print(type([1, 2, 3]))
# <class 'list'>

print(isinstance([1], list))
# True

a = 1
print(id(a)) 
# 140723276551840
```


### 5. `is`和等号的区别

1. `is`判断两个变量的地址是否相同
2. 等号`==`判断两个变量值是否相同

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b) # True
print(a is b) # False

print(id(a)) # 2583559616320
print(id(b)) #  2583559616128
```

注意：
- 判断一个变量是不是`None`的时候，用`is None` 不是`==None`因为`None`本身是单例的

### 6. Python 之禅
`import this` 查看`python`准则


### 7. Python2和3差别
- Print 成为函数，python2 中是关键字
- 编码问题，`python3` 不再有 `unicode` 对象，默认 `str` 就是 `unicode`
- 除法变化，`python3` 除号返回浮点数，`python2` 是直接截断，为了得到和 `python2` 一样的效果，使用`//`双斜杠



Python2 需要`s=u’中文’`，`type(s)` // Unicode
Python3 直接可以 `s=’中文’`   `type(s)`   // str



####  7.1. Python3 改进
1. 类型注解（`type hint`）帮助 IDE 进行类型检查
2. 优化的`super()`方便直接调用父类函数
3. Python 3 可以使用直接使用 `super().xxx` 代替 `super(Class, self).xxx`
4. 高级解包操作，`a, b, *rest = range(10)`
5.	生成的`pyc` 文件统一放到`__pycache__`
6.	一些内置库的修改 `urllib selector`
7.	性能优化


#### 7.2. Python3新增：
1. `yield from` 链接子生成器
2. `Asyncio`内置库，`asyc/await`原生协程支持异步编程
3. 新的内置库 `enum, mock, asyncio, ipaddress, concurrent.futures`等



#### 7.3. 兼容2/3的工具
1.	`Six` 模块
2.	`2to3`等工具转换代码
3.	`__future__` 在 python2 实现 python3 功能


### 8. `replace()` 和` re.sub()` 字符串字符替换


#### 8.1. `replace()`
```python
testStr = 'aa:bb[cc'

testStr.replace(':', '_')
# 每次只能替换一个字符或字符串
```

#### 8.2. `re.sub()`
```python
import re
testStr = 'aa:bb[cc}'

# 把 :[} 替换成 _
re.sub(r'[:[}]', '_', testStr)
```

`re.sub()` 的第一个参数是`pattern`，使用正则表达式，所以例子中 `r'[:[}]'` 代表 `[]` 中的任何一个字符 


### 9. Python如何传递参数？

1. 传值还是传递引用? 都不是，python 唯一支持的参数传递是共享传参
2. `Call by Object` (`call by Object Reference or call by Sharing`)
3. `Call by sharing`(共享传参)。**函数形参获得实参中各个引用的副本**。


一切皆对象，变量是对象的标识，比如a, b可以指向 `[1,2]`

例题：

```python
def flist(l):
  l.append(0)
  print(l)

l = []
flist(l) # [0]
flist(l) # [0, 0]
```

```python
def fstr(s):
  s += 'a'
  print(s)

s = 'hehe'
fstr(s) # hehea
fstr(s) # hehea
```


上述例子解释：
1. `Call by Object Reference` 就是传递参数的时候，**形参和实参都指向同一个对象，它既不是拷贝一个值，也不是直接操作内存**。
2. 但结果有两种，对于可变对象可以直接修改，对于不可变对象很像`copy`了这个值


### 10. 哪些是不可变对象？哪些可变？
1. 不可变对象 `bool/int/float/tuple/str/frozenset`
2. 可变对象 `list/set/dict`


例题：

```python
def clearList(l):
  l = []

ll = [1, 2, 3]

clearList(ll)

print(ll) # [1, 2, 3]
```
函数内的局部变量指向了新的对象，并不影响全局变量。这一点和 JS 不同。


### 11. `*args`,  `**kwarg`s含义是什么
1.	用来处理可变参数
2.	`*args` 被打包成`tuple`
3.	`**kwargs` 被打包成`dict`

```python
def multi(*args):
  print(type(args), args) 


multi(1,2,3) 
# <class 'tuple'> (1, 2, 3)
```
```python
def multi(**kwargs):
  print(type(kwargs), kwargs)


multi(a=1, b=2) 
# <class 'dict'> {'a': 1, 'b': 2}
```

### 12. 如何自定义异常？
1.	继承`Exception`实现自定义异常（为什么不是`BaseException`）（就不能用`ctrl+c` 结束程序了）
2.	给异常加上个一些附加信息
3.	处理一些业务相关的特定异常（`raise MyException`）

```python
class MyException(Exception):
  pass

try:
  raise MyException('my exception')
except MyException as e:
  print(e) # my exception
```



### 13. Python生成器与协程
什么是生成器？`Generator`

1. 生成器就是可以生成值的函数
1. 当一个函数里有了`yield`关键字就成了生成器
1. 生成器可以挂起执行并且保持当前执行的状态

生成器例子：
```python
def simple_gen():
  yield 'hello'
  yield 'world'

gen = simple_gen()
print(type(gen)) # <class 'generator'>
print(next(gen)) # hello
print(next(gen)) # world
```


基于生成器的协程（python2）
- Python3之前没有原生协程，只有基于生成器的协程
- `pep342`(`coroutines via Enhanced Generators`)增强生成器功能
- 生成器可以通过`yield`暂停执行和产出数据
- 同时支持`send()`向生成器发送数据和`throw()`向生成器抛异常


协程注意点：
1. 协程需要使用`send(None)` 或者`next(coroutine)`来预激(`prime`)才能启动
2. 在`yield`处协程会暂停执行
3. 单独的`yield value`会产出值给调用方
4. 可以通过`coroutine.send(value)`来给协程发送值，发送的值会赋值给`yield`表达式左边的`value=yield`
5. 协程执行完成后（没有遇到下一个`yield`语句）会抛出`StopIteration`异常

#### 13.1. 协程
- 协程（`Coroutine`）是一种轻量级的用户态线程，实现的是非抢占式的调度，即由当前协程切换到其他协程由当前协程来控制。
- 目前的协程框架一般都是设计成`1:N`模式。所谓`1:N`就是一个线程作为一个容器里面放置多个协程。
- 那么谁来适时的切换这些协程？答案是由协程自己主动让出CPU，也就是每个协程池里面有一个调度器，这个调度器是被动调度的。意思就是他不会主动调度。


### 14. Python 单元测试
`Unit Testing`
- 针对程序模块进行正确性检验
- 一个函数，一个类进行验证
- 自底向上保证程序正确性


为什么要写单元测试？
三无代码不可取（无文档、无注释、无单测）
- 保证代码逻辑的正确性（甚至有些采用测试驱动开发TDD）
- 单测影响设计，易测的代码往往是高内聚低耦合的。
- 回归测试，防止改一处导致整个服务不可用



单元测试相关的库：
- `nose/pytest` 较为常用
- `mock`模块用来模拟替换网络请求等
- `coverage`统计测试覆盖率


### 15. Python 深拷贝和浅拷贝

- 什么是深拷贝？什么是浅拷贝？
- 如何实现深拷贝？ `copy.deepcopy(x)`
- Python如何正确初始化一个二维数组？


浅拷贝是对另外一个变量的内存地址的拷贝，这两个变量指向同一个内存地址的变量值

深拷贝：一个变量对另一个变量的值拷贝


### 16. Python 内置数据结构算法
用过哪些内置的算法数据结构？
- `sorted`
- `dict/list/set/tuple`


![Python 内置数据结构算法](../imgs/python_data_structure.png)


#### 16.1. Python `dict`底层结构
- Dict底层使用的是哈希表
- 为了支持快速查找使用了哈希表作为底层结构
- 哈希表平均查找时间复杂度`O(1)`
- `CPython`解释器使用二次探查解决哈希冲突问题


哈希表示如何解决冲突的？**链接法**、**探查法**
哈希表示如何扩容的？


#### 16.2. `List`和`tuple`区别
- 都是线性结构，支持下标访问
- `List`是可变对象，`tuple`保存的引用不可变(不可变对象)
- `List`不能作为字典的`key`，`tuple`可以（可变对象不可`hash`）


注意：
如果`tuple`本身保存的是可变对象，则可以修改这个可变对象


```python
t = ([1], 2, 3)

t[0].append(1)

print(t) # ([1, 2], 2, 3)
```


### 17. 什么是LRUCache？
- `Least-Recently-Used`替换掉最近最少使用的对象
- 缓存剔除策略，当缓存空间不够用的时候需要一种方式剔除`key`
- 常见的有`LRU`、`LFU`等(`F`即`frequency`)
- `LRU`通过使用一个**循环双端队列**不断把最新访问的`key`放到表头

![](../imgs/python_LRU.png)

#### 17.1. 如何实现`LRUCache`？
- 字典用来缓存，循环双端链表用来记录访问顺序
- 利用`python`内置的`dict + collection.OrderedDict`实现
- `Dict`用来当做`k/v`键值对的缓存
- `OrderedDict`用来实现最新最近访问的`key`


```python
from collections import OrderedDict

class LRUCache:
  def __init__(self, capacity = 128):
    self.Od = OrderedDict
    self.capacity = capacity

  def get(self, key): # 每次访问更新最近使用的key
    if key in self.Od:
      val = self.Od[key]
      self.Od.move_to_end(key)
      return val
    else:
      return -1

  def put(self, key, value): # 更新k/v
    if key in self.Od:
      del self.Od[key]
      self.Od[key] = value  # 更新key到表头
    else:
      self.Od[key] = value
      if len(self.Od) > self.capacity:
        self.Od.popitem(last = False)
```

### 18. 组合和继承
- 优先使用组合（保持代码简单），而非继承
- 组合是使用其他的类实例作为自己的一个属性（`Has – a`关系）
- 子类继承父类的属性和方法（`Is a` 关系）


`collections.Deque=>stack`就是组合


### 19. `Classmethod/staticmethod`区别
- 都可以通过`Class.method()`的方式使用
- `Classmethod`的第一个参数是`cls`，可以引用类变量
- `Staticmethod`使用起来和普通函数一样，只不过放在类里去组织
- `Classmethod`是为了使用类变量
- `Staticmethod`是代码组织的需要，完全可以放到类之外


```python
class Person：
  country = 'China'

  def __init__(self, name):
    self.name = name

  @classmethod
  def print_c(cls):
    print(cls.country)

  @staticmethod
  def join_name(first, last):
    return first + last
```


### 20. 元类
- 元类(`Meta Class`)是创建类的类
- 元类允许我们控制类的生成，比如修改类的属性等
- 使用`type`来定义元类
- 元类最常见的一个使用场景就是`ORM`框架


#### 20.1. `type(‘child’, (Base, ), {})`

三个参数，类的名称、基类（`Base`后必须加括号，否则就不是`tuple`了）、属性


```python
class Base:
  pass

class Child(Base):
  pass

# 等价于如下格式：
SameChild = type('Child', (Base,), {})
```

```python
# 带有方法的类
class ChildWithMethod(Base):
  bar = True
  
  def hello(self):
    print('hello')

def hello(self):
  print('hello')

# 等价定义
ChildWithMethod = type('ChildWithMethod', (Base,), {'bar': True, 'hello': hello})
```

### 21. `__init__`与`__new__`的区别？
1. 用法不同
    - `new`用于创建实例，所以该方法是在实例创建之前被调用，是类级别的方法，是静态方法。 
    - `init`用于初始化实例，在实例创建之后被调用，是实例级别的方法，用于设置对象属性的初始值。

2. 传入参数不同
    - `new`至少有一个参数`cls`，代表当前类，此参数在实例化使由`python`解释器自动识别。
    - `init`至少有一个参数`self`，就是`__new__`返回的实例。

3. 返回值不同 
    - `__new__`必须有返回值，返回实例对象；
    - `__init__`不需要有返回值


子类没有重新定义`new`方法时，`python`默认调用父类的`new`方法类来构造该类实例，可以一直追溯到`object`的`new`方法



#### 21.1. `__new__`用途：
1. 可以用于继承一些不可变的`class`，比如`int`，`str`，`tuple`，提供一个自定义这些类的实例化过程的途径，一般通过重载`new`方法实现。
2. 还可以用于实现单例模式。


```python
class PositiveInteger(int):
  def __new__(cls, value):
    return super(PositiveInteger, cls).__new__(cls, abs(value))

a = PositiveInteger(-10)
print(a)
```


### 22. 装饰器 `Decorator`
- 一切皆对象，函数也可以当做参数传递
- 装饰器是接收函数作为参数，添加功能后返回一个新函数的函数（类）
- `Python`中通过`@`使用装饰器


编写一个记录函数执行时间的装饰器

```python
import time

def log_time(func):
  def _log(*args, **kwargs):
    beg = time.time()
    res = func(*args, **kwargs)
    print('use time: {}'.format(time.time() - beg))
    return res
  return _log

@log_time
def mysleep():
  time.sleep(1)

mysleep()
```

`@`只是语法糖
还可以这样：
```python
newsleep = log_time(mysleep)
newsleep()
```

#### 22.1. 如何使用类编写装饰器

```python
import time

class LogTime:
  def __call__(self, func)
    def _log(*args, **kwargs):
      beg = time.time()
      res = func(*args, **kwargs)
      print('use time: {}'.format(time.time() - beg))
      return res
    return _log

@LogTime()
def mysleep():
  time.sleep(1)

mysleep()
```

### 23. python 实现单例模式

```python
class Singleton:
  def __new__(cls, *args, **kwargs):
    if not hasattr(cls, '_instance'):
      _instance = super().__new__(cls, *args, **kwargs)
      cls._instance = _instance
    return cls._instance

class MyClass(Singleton):
  pass

c1 = MyClass()
c2 = MyClass()

assert c1 is c2
```



### 24. python 迭代器模式

- `Python`内置对迭代器模式的支持
- 比如用`for`遍历各种`Iterable`的数据类型
- `Python`可以实现`__next__`和`__iter__`实现迭代器

栈的迭代：

```python
from collections import deque

class Stack(object):

  def __init__(self):
    self._deque = deque()

  def push(self, val):
    return self._deque.append(val)

  def pop(self):
    return self._deque.pop()

  def empty(self):
    return len(self._deque) == 0

  def __iter__(self):
    # 使栈可以迭代，后进先出
    res = []
    for i in self._deque:
      res.append(i)
    for i in reversed(res):
      yield i

s = Stack()

s.push(1)
s.push(2)
for i in s:
  print(i)
```

`Iterable`和`Iterator`的区别？


### 25. 函数式编程
Python支持部分函数式编程特性
- 把电脑的运算视作视觉上的函数计算（`lambda`演算）
- 高阶函数：`map/reduce/filter`
- 无副作用，相同的函数调用始终会产生同样的结果

#### 25.1. 函数式编程优点
1. 代码简洁，开发快速（大量使用函数，减少了代码的重复）
2. 接近自然语言，易于理解（抽象程度高）
3. 更方便的代码管理 （利于单元测试以及模块化组合）
4. 易于并发编程 （不修改变量，不存在锁线程问题，不需要考虑死锁）


#### 25.2. 计算机（`Computer`）和计算（`Compute`）的区别：
- 在计算机的层次上，CPU执行的是加减乘除的指令代码，以及各种条件判断和跳转指令，所以，汇编语言是最贴近计算机的语言。
- 而计算则指数学意义上的计算，越是抽象的计算，离计算机硬件越远。
- 对应到编程语言，就是越低级的语言，越贴近计算机，抽象程度低，执行效率高，比如`C`语言；越高级的语言，越贴近计算，抽象程度高，执行效率低，比如`Lisp`语言。
- 函数式编程就是一种抽象程度很高的编程范式，纯粹的函数式编程语言编写的函数没有变量，因此，任意一个函数，只要输入是确定的，输出就是确定的，这种纯函数我们称之为没有副作用。而允许使用变量的程序设计语言，由于函数内部的变量状态不确定，同样的输入，可能得到不同的输出，因此，这种函数是有副作用的。
- 函数式编程的一个特点就是，允许把函数本身作为参数传入另一个函数，还允许返回一个函数！
- Python对函数式编程提供部分支持。由于Python允许使用变量，因此，Python不是纯函数式编程语言。

### 26. 什么是闭包(`Closure`)
- 绑定了外部作用域的变量的函数（引用了外部自由变量的函数）
- 特性：自由变量会和闭包函数同时存在
- 即使程序离开外部作用域，如果仍然可见，绑定变量不会销毁
- 每次运行外部函数都会重新创建闭包


### 27. IO多路复用
五种IO模型（Unix网络编程中提到了5中IO网络模型）
- `Blocking IO`      阻塞式IO
- `Nonblocking IO`  非阻塞式IO
- `IO multiplexing`   IO多路复用
- `Signal Driven IO`   信号驱动IO
- `Asynchronous IO`   异步IO

后两种不常用，一般使用IO多路复用比较多



#### 27.1. 提升服务器的并发能力？
- 多线程模型，创建新的线程处理请求
- 多进程模型，创建新的进程处理请求
  - 线程/进程创建开销比较大，可以用线程池方式解决
  - 线程和进程比较占用资源，难以同时创建太多
- IO多路复用，实现单进程同时处理多个`socket`请求


#### 27.2. 什么是IO多路复用?
- 操作系统提供的同时监听多个`socket`的机制
- 为了实现高并发需要一种机制并发处理多个`socket`
- Linux常见的是`select/poll/epoll`
- 可以使用单线程单进程处理多个`socket`


#### 27.3. 为什么`select`能实现高并发？
`select`可以同时处理多个`socket`，有一个就绪应用程序 代码就可以处理它


#### 27.4. Python如何实现IO多路复用？
- Python封装了操作系统的多路复用(`select/poll/epoll`)
- Python2 `select`模块
- Python3 `selectors`模块

### 28. Python并发网络库
你用过哪些并发网络库？
- `Tornado`  `Gevent`  `Asyncio`
- `Tornado`并发网络库，同时也是一个web微框架
- `Gevent`绿色框架(`greenlet`)实现并发，猴子补丁修改内置`socket`(修改阻塞的内置库为非阻塞的)
- `Asyncio`  `python3`内置的并发网络库，基于原生协程


#### 28.1. `Tornado`框架
- `Tornado`适用于微服务，实现`Restful`接口
- 底层基于Linux多路复用
- 可以通过协程或者回调实现异步编程
- 生态不完善，相应的异步框架比如`ORM`不完善

#### 28.2. `Gevent`：高性能的并发网络库
- 基于轻量级绿色线程（`greenlet`）实现并发
- 需要注意`monkey patch`， `gevent`修改了内置的`socket`为非阻塞
- 配合`gunicorn`和`gevent`部署作为`wsgi server`


#### 28.3. `Asyncio` 基于协程实现的内置的并发网络库
- 协程+事件循环
- 应用不够广泛，生态不够完善，`aiohttp`



并发网络库底层一般都是基于IO多路复用实现



### 29. WSGI和web框架
什么WSGI？
- `Python web server gateway interface`(`pep3333`)
- 解决`python web server`乱象 `mod_python`, `CGI`, `FastCGI`
- 描述了`web server`(`Gunicorn/uWSGI`)如何与web框架（`Flask/Djano`）交互，web框架如何处理请求


#### 29.1. 常用python web框架对比
- `Django`：大而全，内置`ORM`、`Admin`等组件，第三方插件较多
- `Flask`：微框架，插件机制，比较灵活
- `Tornado`：异步支持的微框架和异步网络库



CPU时间和IO时间可以并行，所以并发尽管CPU时间和串行时间相同，但有IO的存在，使得可以缩短总时间。

### 30. python多线程编程
多线程是为了同步完成多项任务，不是为了提高运行效率，而是为了提高资源使用效率来提高系统的效率。线程是在同一时间需要完成多项任务的时候实现的。

多线程目的：
- 更好的利用CPU资源，提高并发数量，避免阻塞（异步调用）

多线程缺点：
- 如果有大量的线程，会影响性能，因为操作系统需要在它们之前切换
- 更多的线程需要更多的内存空间
- 需要防止线程死锁



当开启一个程序的时候，会默认开启一个主线程
- `join`方法：在子线程完成后才执行主线程（阻塞主线程）
- `setDaemon`方法：主线程结束后，会把子线程一起结束，不论它是否执行完。要在`start`方法之前调用
- `join`和`setDaemon`方法的作用相反

```python
def test():
  start_time = time.time()
  t1 = Thread(target = sleep_task, args = (2,))
  t1.start()

  t2 = Thread(target = sleep_task, args = (3,))
  t2.start()

  t1.join() # 阻塞主线程
  t2.join()

  time.sleep(1)
  end_time = time.time()
  print(end_time - start_time)
```

实例化`Thread`两种方式：
1. 创建任务函数，然后`t1 = Thread(target=task, args=(2,))`
（任务后面不能加括号，否则传递的是执行后的结果，即`null`；只有一个参数的话，一定要加逗号，否则不是`tuple`）
2. 创建类，继承`Thread`，然后`t1 = MyThread(2)`

```python
def sleep_task(sleep_time):
  print('start {}'.format(sleep_time))
  time.sleep(sleep_time)
  print('end {}'.format(sleep_time))

def SleepThread(Thread):
  def __init__(self, sleep_time):
    self.sleep_time = sleep_time
    super().__init__() # 调用父类的初始化方法
  
  def run(self):
    print('start {}'.format(self.sleep_time))
    time.sleep(self.sleep_time)
    print('end {}'.format(self.sleep_time))
```


### 31. Python性能分析与优化，GIL
`Global Interpreter Lock` （`Cpython`中的）
1.	`Cpython`解释器的内存管理并不是线程安全的
2.	保护多线程情况下对`python`对象的访问
3.	`Cpython`使用简单的锁机制避免多个线程同时执行字节码

`GIL`的影响，限制了程序的多核执行：
1.	同一个时间只能有一个线程执行字节码
2.	`CPU`密集程序难以利用多核优势
3.	IO期间会释放`GIL`，对IO密集程序影响不大

![GIL](../imgs/python_GIL_IO.png)

#### 31.1. 如何规避GIL影响
区分 `CPU` 和 `IO` 密集程序

1. `CPU` 密集可以使用**多进程+进程池**
2. `IO` 密集使用**多线程/协程**
3. `Cython` 扩展 

#### 31.2. GIL的实现

每隔一段时间尝试释放当前线程的锁并让其他线程获取锁并执行

#### 31.3. 为什么有了GIL还要关注线程安全？
Python中什么操作才是原子的？一步到位执行完
1.	一个操作如果是**一个字节码执行可以完成**就是原子的
2.	原子的是可以保证线程安全的
3.	使用dis操作来分析字节码


#### 31.4. 如何剖析程序性能？
使用`Profile`工具（内置或第三方）
1.	内置的`profile`/`cprofile`等工具
2.	使用`pyflame`(`uber`开源)的火焰图工具


### 32. 服务端性能优化措施
Web应用一般语言不会成为瓶颈

1. 数据结构与算法优化
1. 数据库层：索引优化，慢查询消除，批量操作减少IO，`NoSQL`
1. 网络IO：批量操作，`pipeline`操作减少IO
1. 缓存：使用内存数据库 `redis/Memcached`
1. 异步： `asyncio`, `celery`
1. 并发：`gevent`/多线程


### 33. GIL
`Global Interpreter Lock`(全局解释器锁)，来源是`python`设计之初的考虑，为了数据安全。每个CPU在同一个时间只能执行一个线程（在单核CPU下的多线程其实都只是并发，不是并行）
只有`cpython`解释器有GIL，所以说`python`慢不严谨，其他解释器如`pypy`、`jpython`没有`GIL`

某个线程想要执行，必须先拿到`GIL`，我们可以把`GIL`看做是“通行证”，并且在一个`python`进程中，`GIL`只有一个。拿不到通行证的线程，就不允许进入`CPU`执行，`GIL`会释放的情况：
1. 时间片释放-指定时间释放
2. 遇到IO释放（所以`python`并不是串行）


Python和java对比：
![Python和java对比](../imgs/python_java_compare_thread.png)

1. 同一时刻一个进程内只有一个能拿到GIL，所以多线程很多时候是单线程的
2. 限制了线程并发的数量（同时拿到GIL锁和互斥锁的线程才可以执行）

串行、并行、并发：
![串行、并行、并发](../imgs/process_do_jobs_models.png)


IO操作时间比CPU操作时间高几十万倍，所以GIL锁的存在不会使python比java执行效率低，原因：
1. IO操作不会占用CPU时间
2. CPU速度远远高于IO速度

不同任务的不同策略：
1. 对应Web系统，高IO的程序，GIL可以忽略不计
2. 计算任务可以使用多进程编程


既然GIL保证安全，但是GIL又有时间片的概念，是否矛盾？
- GIL会保证字节码的安全


### 34. `pandas`保存文件的中文乱码

用`utf_8_sig`代替`utf-8`
```python
df.to_csv('tempscore.csv', encoding='utf_8_sig')
```

### 35. xpath 取值
1. `/li/a/@href` 这样取的是`href`的内容
2. `/li/a/text()` 这样取得是`text`内容

### 36. Python的垃圾回收机制原理
- **引用计数**为主（缺点：**循环引用**无法解决）
- 引入**标记清除**和**分代回收**解决引用计数的问题
- 引用计数为主+标记清除和分代回收为辅


`del` 不是销毁对象，而是减少对象的引用计数（一切皆对象），只有引用计数为`0`时才会进行回收

#### 36.1. 标记清除
从垃圾回收的根对象开始，不断的往下查找可达对象，可达对象就是有向图，线表示引用关系，把不可达的点置灰，认为没有对象引用它们，就可以把它们清除
（根对象一般就是栈里面的对象）


#### 36.2. 分代回收
把对象的生命周期分三代`0 1 2`，每一代都使用**双向链表**标记这些对象，把创建的新的对象称为第`0`代，每隔一段时间，分代进行标记清除，第`0`代没有被清除会转移到更老的一代，比如第`1`代
