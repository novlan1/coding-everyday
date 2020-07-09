## 如何在列表、字典和集合中根据条件筛选数据
在实际开发过程中，常常遇到如下几种情况：

* 过滤掉列表[3, 9, -1, 10, 20, -2, ...]中的负数；
* 筛选出字典{‘Jack’:79, 'Jim':88, 'Lucy':92, ...}中值高于90的键值对；
* 筛选出集合{77, 89, 32, 20, ...}中能被3整除的元素。
故应学会在列表、字典和集合中根据条件筛选数据。

1. 列表
通常我们会采用如下代码进行筛选：

```python
data = [1, 5, -3, -2, 6, 0, 9]
res = []
for x in data:
    if x >= 0:
        res.append(x)
print res
```
对此，我们可以使用Python中的filter()，具体做法如下：

```python
# -*- coding: utf-8 -*-

from random import randint

# 通过randint()随机生成含有10个int类型元素的list，且其元素范围为[-10, 10]
data = [randint(-10, 10) for _ in xrange(10)]

print data

# 通过filter()过滤掉负数，并将其最终结果打印
print filter(lambda x: x >= 0, data)
```

除此之外，我们还能使用列表解析过滤掉列表中的负数。
```python


# -*- coding: utf-8 -*-

from random import randint

# 通过randint()随机生成含有10个int类型元素的list，且其元素范围为[-10, 10]
data = [randint(-10, 10) for _ in xrange(10)]

print data

# 通过列表解析过滤掉负数，并将其最终结果打印
print [x for x in data if x >= 0]
```


这时，我们可能会有一个疑问既然这三种方法都可以成功过滤掉列表中的负数，那哪一种方法效率更高呢？这里，我们可以使用timeit这个计时工具模块，分别测试三种方法的运行时间。其中，我们不妨将第一种方法命名为CommReNeg()，第二种方法命名为FiltReNeg()，第三种方法命名为ListReNeg()，具体代码如下：

```python
# -*- coding: utf-8 -*-

from random import randint
import timeit

# 通过randint()随机生成含有10个int类型元素的list，且其元素范围为[-10, 10]
data = [randint(-10, 10) for _ in xrange(10)]

def CommReNeg():
    res = []
    for x in data:
        if x >= 0:
            res.append(x)
    print res

def FiltReNeg():
    # 通过filter()过滤掉负数，并将其最终结果打印
    print filter(lambda x: x >= 0, data)

def ListReNeg():
    # 通过列表解析过滤掉负数，并将其最终结果打印
    print [x for x in data if x >= 0]

if __name__ == '__main__':
    print (timeit.timeit("CommReNeg()", setup="from __main__ import CommReNeg", number=1))
    print (timeit.timeit("FiltReNeg()", setup="from __main__ import FiltReNeg", number=1))
    print (timeit.timeit("ListReNeg()", setup="from __main__ import ListReNeg", number=1))
```

其运行结果如图所示：
```
[3, 3, 6, 6, 4]
0.00333480301869
[3, 3, 6, 6, 4]
0.00176789890732
[3, 3, 6, 6, 4]
0.00172641700262
```

从图中可以看出第三种方法运行最快，因此推荐使用第三种方法根据条件筛选数据。

2. 字典
既然在列表中已经分析出，采用列表解析运行速度最快，故在此处采用类似于列表解析的方法过滤掉字典中我们不想要的键值对，具体操作如下：

```python
# -*- coding: utf-8 -*-

from random import randint

# 随机生成含有20个键值对的字典
d = {x: randint(60, 100) for x in xrange(1, 21)}

print d

# 通过类似于列表解析的方法过滤掉值小于90的键值对
print {k: v for k, v in d.iteritems() if v > 90}
```

3. 集合
在列表和字典中，都可以采用同一种方式过滤掉我们不想要的值，那么在集合中是否也可以采用呢？答案当然是可以的，那具体操作如下：

```python
# -*- coding: utf-8 -*-

from random import randint

data = [randint(-10, 10) for _ in xrange(10)]

# 将list转为集合
s = set(data)

print {x for x in s if x%3 == 0}
```
