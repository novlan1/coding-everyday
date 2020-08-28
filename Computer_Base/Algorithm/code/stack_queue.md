- [生成窗口最大值数组](#生成窗口最大值数组)
- [双栈队列问题](#双栈队列问题)
- [栈的压入弹出顺序](#栈的压入弹出顺序)
- [双栈排序](#双栈排序)

### 生成窗口最大值数组

有一个整型数组arr和一个大小为w的窗口从数组的最左边滑到最右边，窗口每次向右边滑一个位置，求每一种窗口状态下的最大值。（如果数组长度为`n`，窗口大小为`w`，则一共产生`n-w+1`个窗口的最大值）


思路：
双端队列 `qmax = {}`, 双端队列存放着数组中的下标值，假设当前数为 `arr[i]`，放入规则如下：
1. 如果 `qmax` 为空，直接把下标 `i` 放入 `qmax` 中。
2. 如果 `qmax` 不为空，取出当前 `qmax` 队尾存放的下标 `j`。如果 `arr[j] > arr[i]`，直接把下标 `i` 放进 `qmax` 的队尾。
3. 如果 `arr[j] <= arr[i]`，则一直从 `qmax` 的队尾弹出下标，直到某个下标在 `qmax` 中对应的值大于 `arr[i]`，把 `i` 放入 `qmax` 的队尾。



```python
def slide(arr, n, w):
  if not w or not n: return []
  qmax = []
  res = []

  for i in range(n):
    if qmax and qmax[0] == i - w:
      qmax.pop(0)
    while qmax and arr[qmax[-1]] < arr[i]:
      qmax.pop()
    qmax.append(i)
    if i >= w-1:
      res.append(arr[qmax[0]])

  return res
```

### 双栈队列问题 

编写一个类，只能用两个栈结构实现队列，支持队列的基本操作(push, pop)

给定一个操作序列 ope 及它的长度 n，其中元素为正数代表push操作，为0代表pop操作，返回pop的结果序列。

测试样例：[1, 2, 3, 0, 4, 0] 6

返回： [1, 2]

![](../../imgs/two_stack_mock_queue.png)

注意：
1. 如果 `stackPush` 要往 `stackPop` 中倒入数据，那么必须要把 `stackPush` 中的所有数据一次性倒完。
2. 如果 `stackPop` 中有数据，则不能发生倒数据的行为。



```python
class TwoStack:
  def __init__(self):
    self.stackPush = []
    self.stackPop = []

  def twoStack(self, ope, n):
    res = []

    for i in ope:
      if i > 0:
        self.stackPush.append(i)
      else:
        if len(self.stackPop):
          res.append(self.stackPop.pop())
        else:
          while len(self.stackPush):
            self.stackPop.append(self.stackPush.pop())
          res.append(self.stackPop.pop())

    return res
```

### 栈的压入弹出顺序


输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。
例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

思路：

1. 申请一个栈`s`，遍历`pushV`，每一个元素都压入栈`s`中；
2. 同时判断`popV[-1]`是否和栈`s`的栈顶元素相等，如果相等，弹出`popV`的第一个元素和栈`s`的栈顶，继续这样判断，如果还相等，就继续这样弹出。
3. 最后如果`pushV`为空，而s不为空(`popV`也可以)，返回`false`


```python
def isPopOrder(pushV, popV):
  stack = []

  for i in pushV:
    stack.append(i)
    while len(stack) and stack[-1] == popV[0]:
      stack.pop()
      popV.pop(0)

  if len(stack):
    return False
  else:
   return True
```


### 双栈排序

一个栈中元素类型为整型，现在想将该栈从顶到底按从小到大排序，只许申请一个栈，除此之外可以申请新的变量，但不能申请额外的数据结构。如何完成排序？

思路：
1. 当前栈为stack，申请一个栈help
2. 从stack弹出一个元素cur，如果cur小于等于help栈顶，就直接压入help栈顶，否则，将help元素逐渐弹出，重新压回到stack中，直到cur小于等于help栈顶元素，就把它压入help中
3. 重复2，直到stack为空，再把help压回到stack即可


```python
def twoStackSort(A):
  if not A: return A
  n = len(A)
  s = []

  while A:
    cur = A.pop()
    if not s or cur <= s[-1]:
      s.append(cur)
    else:
      while s and cur > s[-1]:
        A.append(s.pop())
      s.append(cur)

  return s
```




