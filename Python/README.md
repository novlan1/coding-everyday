- [1. Python属于动态强类型语言](#1-python属于动态强类型语言)
- [2. 为什么要用Python？](#2-为什么要用python)
- [3. 什么是`monkey patch`？哪些地方用到类？自己如何实现？](#3-什么是monkey-patch哪些地方用到类自己如何实现)
- [4. 什么是自省(`Introspection`)？](#4-什么是自省introspection)
- [5. `is`和等号的区别](#5-is和等号的区别)
- [Python 之禅](#python-之禅)
- [Python2和3差别](#python2和3差别)
  - [Python3 改进](#python3-改进)
  - [Python3新增：](#python3新增)
  - [兼容2/3的工具](#兼容23的工具)
- [`replace()` 和` re.sub()` 字符串字符替换](#replace-和-resub-字符串字符替换)
  - [`replace()`](#replace)
- [`re.sub()`](#resub)
- [Python如何传递参数？](#python如何传递参数)
  - [例题](#例题)
- [哪些是不可变对象？哪些可变？](#哪些是不可变对象哪些可变)
  - [例题](#例题-1)
- [`*args`,  `**kwarg`s含义是什么](#args-kwargs含义是什么)
- [如何自定义异常？](#如何自定义异常)
- [Python性能分析与优化，GIL](#python性能分析与优化gil)
- [如何规避GIL影响](#如何规避gil影响)
- [为什么有了GIL还要关注线程安全？](#为什么有了gil还要关注线程安全)
- [如何剖析程序性能？](#如何剖析程序性能)
- [服务端性能优化措施](#服务端性能优化措施)
- [Python生成器与协程](#python生成器与协程)




### 1. Python属于动态强类型语言
1. 动态还是静态指的是编译期还是运行期确定类型
2. 强类型指的是不会发生隐式类型转换（php js 都是弱类型语言）


### 2. 为什么要用Python？ 
1. 胶水语言，轮子多，应用广泛
2. 语言灵活，生产力高

缺点：
1. 性能问题
2. 代码维护问题（动态语言一时爽，代码重构火葬场）
3. python2/3兼容问题



### 3. 什么是`monkey patch`？哪些地方用到类？自己如何实现？
1. 所谓的`monkey patch`就是运行时替换
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

### Python 之禅
`import this` 查看`python`准则


### Python2和3差别
- Print 成为函数，python2 中是关键字
- 编码问题，python3 不再有 unicode 对象，默认 str 就是 unicode
- 除法变化，python3 除号返回浮点数，python2 是直接截断，为了得到和 python2 一样的效果，使用`//`双斜杠



Python2 需要`s=u’中文’`，`type(s)` // Unicode
Python3 直接可以 `s=’中文’`   `type(s)`   // str



####  Python3 改进
1. 类型注解（`type hint`）帮助 IDE 进行类型检查
2. 优化的`super()`方便直接调用父类函数
3. Python 3 可以使用直接使用 `super().xxx` 代替 `super(Class, self).xxx`
4. 高级解包操作，`a, b, *rest = range(10)`
5.	生成的`pyc` 文件统一放到`__pycache__`
6.	一些内置库的修改 `urllib selector`
7.	性能优化


#### Python3新增：
1. `yield from` 链接子生成器
2. `Asyncio`内置库，`asyc/await`原生协程支持异步编程
3. 新的内置库 `enum, mock, asyncio, ipaddress, concurrent.futures`等



#### 兼容2/3的工具
1.	`Six` 模块
2.	`2to3`等工具转换代码
3.	`__future__` 在 python2 实现 python3 功能


### `replace()` 和` re.sub()` 字符串字符替换


#### `replace()`
```python
testStr = 'aa:bb[cc'

testStr.replace(':', '_')
# 每次只能替换一个字符或字符串
```

### `re.sub()`
```python
import re
testStr = 'aa:bb[cc}'

# 把 :[} 替换成 _
re.sub(r'[:[}]', '_', testStr)
```

`re.sub()` 的第一个参数是`pattern`，使用正则表达式，所以例子中 `r'[:[}]'` 代表 `[]` 中的任何一个字符 


### Python如何传递参数？

1. 传值还是传递引用? 都不是，python 唯一支持的参数传递是共享传参
2. `Call by Object` (`call by Object Reference or call by Sharing`)
3. `Call by sharing`(共享传参)。**函数形参获得实参中各个引用的副本**。


一切皆对象，变量是对象的标识，比如a, b可以指向 `[1,2]`

#### 例题

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


### 哪些是不可变对象？哪些可变？
1. 不可变对象 `bool/int/float/tuple/str/frozenset`
2. 可变对象 `list/set/dict`


#### 例题

```python
def clearList(l):
  l = []

ll = [1, 2, 3]
clearList(ll)
print(ll) # [1, 2, 3]
```
函数内的局部变量指向了新的对象，并不影响全局变量。这一点和 JS 不同。


### `*args`,  `**kwarg`s含义是什么
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

### 如何自定义异常？
1.	继承`Exception`实现自定义异常（为什么不是`BaseException`）（就不能用`ctrl+c` 结束程序了）
2.	给异常加上个一些附加信息
3.	处理一些业务相关的特定异常（`raise MyException`）


### Python性能分析与优化，GIL
`Global Interpreter Lock` （`Cpython`中的）
1.	`Cpython`解释器的内存管理并不是线程安全的
2.	保护多线程情况下对`python`对象的访问
3.	`Cpython`使用简单的锁机制避免多个线程同时执行字节码

`GIL`的影响，限制了程序的多核执行：
1.	同一个时间只能有一个线程执行字节码
2.	`CPU`密集程序难以利用多核优势
3.	IO期间会释放`GIL`，对IO密集程序影响不大

 

### 如何规避GIL影响
区分 CPU 和 IO 密集程序

1. CPU 密集可以使用多进程+进程池
2. IO 密集使用多线程/协程
3. Cython 扩展 



### 为什么有了GIL还要关注线程安全？
Python中什么操作才是原子的？一步到位执行完
1.	一个操作如果是**一个字节码执行可以完成**就是原子的
2.	原子的是可以保证线程安全的
3.	使用dis操作来分析字节码


### 如何剖析程序性能？
使用`Profile`工具（内置或第三方）
1.	内置的`profile`/`cprofile`等工具
2.	使用`pyflame`(`uber`开源)的火焰图工具


### 服务端性能优化措施
Web应用一般语言不会成为瓶颈

1. 数据结构与算法优化
1. 数据库层：索引优化，慢查询消除，批量操作减少IO，`NoSQL`
1. 网络IO：批量操作，`pipeline`操作减少IO
1. 缓存：使用内存数据库 `redis/Memcached`
1. 异步： `asyncio`, `celery`
1. 并发：`gevent`/多线程



### Python生成器与协程
什么是生成器？`Generator`

1. 生成器就是可以生成值的函数
1. 当一个函数里有了yield关键字就成了生成器
1. 生成器可以挂起执行并且保持当前执行的状态

