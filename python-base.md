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
from random import randint

# 通过randint()随机生成含有10个int类型元素的list，且其元素范围为[-10, 10]
data = [randint(-10, 10) for _ in xrange(10)]

print data

# 通过filter()过滤掉负数，并将其最终结果打印
print filter(lambda x: x >= 0, data)
```

除此之外，我们还能使用列表解析过滤掉列表中的负数。
```python
from random import randint

# 通过randint()随机生成含有10个int类型元素的list，且其元素范围为[-10, 10]
data = [randint(-10, 10) for _ in xrange(10)]

print data

# 通过列表解析过滤掉负数，并将其最终结果打印
print [x for x in data if x >= 0]
```


这时，我们可能会有一个疑问既然这三种方法都可以成功过滤掉列表中的负数，那哪一种方法效率更高呢？这里，我们可以使用timeit这个计时工具模块，分别测试三种方法的运行时间。其中，我们不妨将第一种方法命名为CommReNeg()，第二种方法命名为FiltReNeg()，第三种方法命名为ListReNeg()，具体代码如下：

```python
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
from random import randint

# 随机生成含有20个键值对的字典
d = {x: randint(60, 100) for x in xrange(1, 21)}

print d

# 通过类似于列表解析的方法过滤掉值小于90的键值对
print {k: v for k, v in d.iteritems() if v > 90}
```
pyhton3使用d.items()即可。

3. 集合
在列表和字典中，都可以采用同一种方式过滤掉我们不想要的值，那么在集合中是否也可以采用呢？答案当然是可以的，那具体操作如下：

```python
from random import randint

data = [randint(-10, 10) for _ in xrange(10)]

# 将list转为集合
s = set(data)

print {x for x in s if x%3 == 0}
```


## 如何统计序列中元素的出现的频度

实际案例
某随机序列[12, 5, 6, 4, 6, 5, 5, 7, ...]中，找到出现次数最高的3个元素，它们出现次数是多少？
对某英文文章的单词，进行词频统计，找到出现次数最高的10个单词，它们出现次数是多少？
现在我们以序列为例，看下我们如何处理该问题。首先我们先创建一个序列，具体操作如下：

```python
from random import randint

# 创建随机数序列
data = [randint(0, 5) for _ in xrange(20)]
我们思考一下，最终的统计结果必定是字典类型的。因此，我们可在上述的代码中进行如下操作：

# -*- coding: utf-8 -*-

from random import randint

# 创建随机数序列
data = [randint(0, 5) for _ in xrange(20)]
print data

# 创建字典，以data序列的值为字典的键，值初始化为0
c = dict.fromkeys(data, 0)
print c

# 遍历data序列
for x in data:
    c[x] += 1

print c
```

输出结果如下：

```
[5, 0, 1, 5, 2, 5, 0, 4, 1, 2, 4, 1, 4, 1, 0, 3, 4, 2, 0, 4]
{0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
{0: 4, 1: 4, 2: 3, 3: 1, 4: 5, 5: 3}
```
这样，我们就统计出了序列中各个元素出现的次数。再回到实际案例中，案例1要求找到出现次数最高的3个元素。那我们就要根据字典的值，对字典的元素进行排序，具体操作如下：

```
# -*- coding: utf-8 -*-

from random import randint

# 创建随机数序列
data = [randint(0, 5) for _ in xrange(20)]
print data

# 创建字典，以data序列的值为字典的键，值初始化为0
c = dict.fromkeys(data, 0)
print c

# 遍历data序列
for x in data:
    c[x] += 1

print c

# 根据键值进行从大到小排序
c_list = sorted(c.items(), key=lambda i:i[1], reverse=True)

# 打印出现次数最多的3个元素
print c_list[:3]
```

其输出结果如下：
```
[5, 0, 1, 5, 2, 5, 0, 4, 1, 2, 4, 1, 4, 1, 0, 3, 4, 2, 0, 4]
{0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
{0: 4, 1: 4, 2: 3, 3: 1, 4: 5, 5: 3}
[(4, 5), (0, 4), (1, 4)]
```
除上述方法外，我们还可以使用collections.Counter对象处理该问题。首先，将序列传入Counter的构造器，得到Counter的对象是元素频度的字典；然后，我们利用Counter.most_common(n)方法得到频度最高的n个元素的列表；最后，我们输出频度最高的3个元素。collections.Counter的相关操作可具体参考Python官方文档，此处的代码具体如下所示：

```
# -*- coding: utf-8 -*-

from random import randint
from collections import Counter

# 创建随机数序列
data = [randint(0, 5) for _ in xrange(20)]
print data

# 创建字典，以data序列的值为字典的键，值初始化为0
c = dict.fromkeys(data, 0)
print c

# 遍历data序列
for x in data:
    c[x] += 1

print c
# 统计元素的频率
counter = Counter(data)

# 打印出现次数最多的3个元素
print counter.most_common(3)
```
其输出结果如下：
```
[5, 0, 1, 5, 2, 5, 0, 4, 1, 2, 4, 1, 4, 1, 0, 3, 4, 2, 0, 4]
{0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
{0: 4, 1: 4, 2: 3, 3: 1, 4: 5, 5: 3}
[(4, 5), (0, 4), (1, 4)]
```
好了，实际案例中的第一个案例我们已经圆满解决了。现在，让我们看看实际案例中的第二个案例。第二个案例是要求我们对英文单词进行词频统计，这里我们就要采用正则表达式了。我们运用正则表达式把英文单词一个一个地分割出来，然后再使用collections.Counter对象进行词频统计，最后，我们输出出现次数最高的10个单词，其代码如下：
```
# -*- coding: utf-8 -*-

import re

from collections import Counter

# 读入test.txt文件
text = open("test.txt").read()

# 运用正则表达式做切割
word_list = re.split("\W+", text)

# 统计英文单词的词频
counter = Counter(word_list)

# 打印出现次数最多的10个元素
print counter.most_common(10)
```
其中，输出结果如下：

```
[('in', 12), ('the', 11), ('as', 10), ('China', 9), ('by', 7), ('AI', 7), ('guideline', 6), ('and', 6), ('to', 5), ('intelligence', 5)]
```
代码中，test.txt文件的内容来自扇贝新闻。这样我们也圆满完成实际案例中的第二个案例。
