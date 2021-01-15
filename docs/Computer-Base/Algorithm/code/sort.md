- [1. 选择排序](#1-选择排序)
- [2. 冒泡排序](#2-冒泡排序)
- [3. 插入排序](#3-插入排序)
- [4. 快排](#4-快排)
- [5. 堆排序](#5-堆排序)
  - [5.1. 堆](#51-堆)
  - [5.2. 索引堆](#52-索引堆)
- [6. 希尔排序](#6-希尔排序)
- [7. 归并排序](#7-归并排序)
  - [7.1. 几乎有序情况下，归并排序和快排的时间复杂度？](#71-几乎有序情况下归并排序和快排的时间复杂度)
- [8. 计数排序](#8-计数排序)
- [9. 基数排序](#9-基数排序)
- [10. 有序数组合并](#10-有序数组合并)
- [11. 三色排序问题](#11-三色排序问题)
- [12. 小范围排序（几乎有序数组）](#12-小范围排序几乎有序数组)
- [13. 重复值判断，时间复杂度`O(1)`](#13-重复值判断时间复杂度o1)
- [14. 有序二维数组中的查找 [剑指 offer]](#14-有序二维数组中的查找-剑指-offer)
- [15. 需要排序的最短子数组的长度](#15-需要排序的最短子数组的长度)
- [16. 相邻两数最大差值](#16-相邻两数最大差值)

## 排序 <!-- omit in toc -->

### 1. 选择排序

```python
def selectionSort(A):
  n = len(A)
  
  for i in range(n-1):
    min_index = i
    
    for j in range(i + 1, n):
      if A[min_index] > A[j]:
        min_index = j
        
    A[i], A[min_index] = A[min_index], A[i]
  return A
```


### 2. 冒泡排序

1. 原理：比较两个相邻的元素，将值大的元素交换到右边
2. 冒泡排序的优点：每进行一趟排序，就会少比较一次，因为每进行一趟排序都会找出一个较大值。
   如上例：第一趟比较之后，排在最后的一个数一定是最大的一个数；
   第二趟排序的时候，只需要比较除了最后一个数以外的其他的数，同样也能找出一个最大的数排在参与第二趟比较的数后面；
   第三趟比较的时候，只需要比较除了最后两个数以外的其他的数，以此类推……
   也就是说，每进行一趟比较，每一趟少比较一次，一定程度上减少了算法的量。
  
```python
def bubbleSort(A):
  n = len(A)
  
  for i in range(n - 1):
    for j in range(n - i - 1):
      if A[j] > A[j + 1]:
        A[j], A[j + 1] = A[j + 1], A[j]
        
  return A
```

### 3. 插入排序

```python
def insertSort(A):
  n = len(A)
  for i in range(1, n):
    for j in range(i):
      if A[j] > A[i]:
        A[i], A[j] = A[j], A[i]
  return A
```

优化插入排序
```python
def insertSort(A):
  n = len(A)
  for i in range(1, n):
    temp = A[i]
    j = i # j 保存元素 temp 应该插入的位置
    while j > 0 and A[j - 1] > temp:
      A[j] = A[j - 1]
      j -= 1
    A[j] = temp
  return A
```

1. 内层循环从后往前找，发现比它大的就把当前的往后挪一位，找到适合它插入的位置。
2. 优化的插入特别适合基本有序的情况。

### 4. 快排

```python
def quick(A):
  n = len(A)
  if n <= 1: return A
  m = A[0]
  left = quick([i for i in A if i < m])
  right = quick([i for i in A if i > m])
  mm = [i for i in A if i == m]
  return left + mm + right

```

### 5. 堆排序

先组成一个大顶堆，然后每次取出堆顶（最大值）放到最后一个位置上，并重新组成大顶堆，重新取堆顶。

```python
def heap(A, i, n):
  j = 2 * i +1
  while j < n:
    if j + 1 < n and A[j] < A[j+1]:
      j += 1
    if A[i] < A[j]:
      A[i], A[j] = A[j], A[i]
      i = j
      j = 2 * i + 1
    else:
      break
      
def heapSort(A):
  n = len(A)
  for i in range(n // 2 - 1, -1, -1):
    heap(A, i, n)
  for i in range(n - 1, -1, -1):
    A[i], A[0] = A[0], A[i]
    heap(A, 0, i)
  return A
```

上面的函数保证第`i`个父节点，大于其子节点(`i`可取`0`,`1`,`2`…`n//2-1`)
第二次循环的时候并不需要保证A是严格的大根堆，只需要堆顶最大即可


#### 5.1. 堆
1. 必须是完全二叉树 
2. 父节点一定大于子节点

实现堆，包含两个重要方法，一个是`shift up`，插入新的元素恢复的过程， `shift down`，即从堆顶弹出元素，将最后一个元素放到堆顶然后恢复的过程。
还有可能是`heapify`, 直接从数组转为堆, 从`n/2`的位置`shift down`

- N个元素逐个插入到一个空堆中，算法复杂度是`O(nlogn)`
- `Heapify` 的过程，算法复杂度为`O(n)`


#### 5.2. 索引堆

比较的是`data`，交换的是`index`，优势是如果`data`结构复杂的话，交换`index`方便
还可以存放移动后的`index`（再多维护一个数组），即`reverse`，`reverse[i]`表示索引`i`在`indexes`（堆）中的位置

![索引堆](../../../imgs/index_max_heap.png)



### 6. 希尔排序

```python
def shellSort(A):
  n = len(A)
  step = 4
  while step > 0:
    for i in range(step, n):
      p = i
      q = i-step
      while q >= 0:
        if A[q] > A[p]:
          A[p], A[q] = A[q], A[p]
          p = q
          q = p - step
        else:
          break
    step -= 1
  return A
```
### 7. 归并排序

```python
def mergeSort(A):
  n = len(A)
  if n <= 1: return A
  num = n // 2
  
  left = mergeSort(A[:num])
  right = mergeSort(A[num:])
  
  res = []
  i, j = 0, 0
  
  while i < len(left) and j < len(right):
    if left[i] < right[j]:
      res.append(left[i])
      i += 1
    else:
      res.append(right[j])
      j += 1
      
  res += left[i:]
  res += right[j:]
  return res
```
#### 7.1. 几乎有序情况下，归并排序和快排的时间复杂度？
归并每次都能保证二分，所以平均复杂度也是`nlogn`，但快排在几乎有序的情况下，左侧都是最小的，深度就是n，复杂度就是`n^2`

### 8. 计数排序

```python
def countingSort(A):
  mi = min(A)
  ma = max(A)
  res = []
  bu = [0] * (ma - mi + 1)
  
  for i in A:
    bu[i - mi] += 1
    
  for i in range(len(bu)):
    if bu[i]:
      res += [i + mi] * bu[i]
  return res
```

数据分布区间小、范围集中时，计数排序高效


### 9. 基数排序

```python
def radixSort(A):
  n = len(A)
  
  for i in range(4):
    s = [[] for _ in range(10)]
    
    for j in A:
      s[j//(10**i)%10].append(j)
      
    A = [a for b in s for a in b]
  return A
```

### 10. 有序数组合并 

```
[ leetcode - 88 ]
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:
初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

```
```python
def mergeAB(A, B):
  n = len(A)
  m = len(B)
  A.extend([0] * m)
  
  i = n - 1
  j = m - 1
  
  while i >= 0 and j >= 0:
    if A[i] > B[j]:
      A[i+j+1] = A[i]
      i -= 1
    else:
      A[i+j+1]=B[j]
      j -= 1
      
  if j >= 0:
    A[:j+1] = B[:j+1]
  return A
```

### 11. 三色排序问题
```
有一个只由0，1，2三种元素构成的整数数组，请使用交换、原地排序而不是使用计数进行排序。

给定一个只含0，1，2的整数数组A及它的大小，请返回排序后的数组。保证数组大小小于等于500。

测试样例：
[0,1,1,0,2,2],6

返回：[0,0,1,1,2,2]
```

```
1. 用三个指针，指针p指向开始，指针q指向末尾，指针i表示当前。
2. 开始时，p向后遍历到不为0的地方，并让 i=p，同时，q向前遍历到不为2的地方。
3. i向后移动，
   若arr[i]等于1, 则i++；
   若arr[i]等于2，则 arr[i]和arr[q]调换位置，q--，i不动（i不动的原因是，被交换活过来的元素有可能是0）；
   若arr[i]等于0，则 arr[i]和arr[p]调换位置，p++，i++。
```

```python
def sortThreeColor(A):
  n = len(A)
  p = 0
  q = n - 1
  
  while A[p] == 0:
    p += 1
  while A[q] == 2:
    q -= 1
  i = p
  
  while i <= q:
    if A[i] == 1:
      i += 1
    elif A[i] == 2:
      A[i], A[q] = A[q], A[i]
      q -= 1
    else:
      A[i], A[p] = A[p], A[i]
      i += 1
      p += 1
  return A
```
时间复杂度O(n)，空间复杂度O(1)。


### 12. 小范围排序（几乎有序数组）

```
已知一个几乎有序的数组，几乎有序是指，如果把数组排好顺序的话，每个元素移动的距离可以不超过k，
并且k相对于数组来说比较小。请选择一个合适的排序算法针对这个数据进行排序。

给定一个int数组A，同时给定A的大小n和题意中的k，请返回排序后的数组。

测试样例：`[2,1,4,3,6,5,8,7,10,9],10,2`

返回：`[1,2,3,4,5,6,7,8,9,10]
```

```python
def sort(A, n, k):
  heapD = heapBuild(A[:k], k)

  for i in range(k, n):
    A[i - k] = heapD[0]
    heapD[0] = A[i]
    heap(heapD, 0, k)

  for i in range(n - k, n):
    A[i] = heapD[0]
    heapD[0], heapD[k - 1] = heapD[k - 1], heapD[0]
    k -= 1
    heap(heapD, 0, k)

  return A 

def heapBuild(A, k):
  for i in range(int(k/2 - 1), -1, -1):
    heap(A, i, k)
  return A

def heap(A, i, n):
  j = 2 * i + 1
  while j < n:
    if j + 1 < n and A[j] > A[j + 1]:
      j += 1
    if A[i] < A[j]:
      break
    
    A[i], A[j] = A[j], A[i]
    i, j = j, 2 * j +1
```

- `A[0]… A[k-1]`建立小根堆，弹出堆顶放在位置`0`上，`A[k]`插入堆顶，调整该堆，再弹出堆顶放在位置`1`上;
- 整个时间复杂度是`O(nlog(K))`，`log(K)`是堆调整的时间

### 13. 重复值判断，时间复杂度`O(1)`
如果没有时间复杂度`O(1)`的要求，可以用哈希表。
这里要先排序，然后判断。
堆排序如果用递归的方式时间复杂度是`O(log(N))`，因为用到了函数栈，所以这里要用`非递归的堆排序`。

### 14. 有序二维数组中的查找 [剑指 offer]

```
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```
```
思路：
1. 从右上角开始找
2. 若大于当前值，就说明可能在下一行
3. 若小于当前值，就说嘛可能在当前行的前面
```
```python
def findtarget(target, array):
  if not array: return 
  n = len(target)
  m = len(target[0])
  i = 0 
  j = m - 1
  
  while i < n and j >= 0:
    if array[i][j] == target:
      return True
    elif array[i][j] > target:
      j -= 1
    else:
      i += 1
  return False
```
时间复杂度`O(m+n)`，空间复杂度`O(1)`

### 15. 需要排序的最短子数组的长度
```
题目描述：对于一个无序数组A，请设计一个算法，求出需要排序的最短子数组的长度。 给定一个整数数组A及它的大小n，请返回最短子数组的长度。

要求：时间复杂度O(n) 空间复杂度O(1)

例子： [1,5,3,4,2,6,7],7

返回：4
```

算法描述：
1. 从左往右找”当前值比`max`小”的一系列情况：
    - 初始：`max=arr[0]`；
    - 如果当前元素比max大，max就等于当前元素；
    - 如果当前元素比max小，max不变，然后继续往后找,直到最后一次出现”当前值比max小”的情形，记下此时的下标为k。
2. 从右往左找”当前值比`min`大”的一系列情况：
    - 初始：`min=arr[6]`;
    - 如果当前元素比min小，min就等于当前元素；
    - 如果当前元素比min大，min不变，然后继续往前找，直到最后一次出现就”当前值比min大”的情形，记下此时的下标为j。
3. 长度=k-j+1。

```python
def shortestSubsequence(A):
  if not A: return 0

  n = len(A)
  left, right = 0, 0
  mi = A[n - 1]
  ma = A[0]

  for i in range(1, n):
    if A[i] >= ma:
      ma = A[i]
    else:
      right = i
  
  for j in range(n - 2, -1, -1):
    if A[j] <= mi:
      mi = A[j]
    else:
      left = j
  
  return 0 if (left == 0 and right == 0) else right - left + 1
```

```
[1, 2, 3, 4, 5] 这种情况，ma 从 1 开始, 一直变，变到5，right 就不变， 一直为 0
[5, 4, 3, 2, 1] 这种情况，ma 从 5 开始就不变了，right 就变，从0变为4 
```

### 16. 相邻两数最大差值

```
有一个整形数组A，请设计一个复杂度为O(n)的算法，算出排序后相邻两数的最大差值。

给定一个int数组A和A的大小n，请返回最大的差值。保证数组元素多于1个。

测试样例：
[1,2,5,4,6],5

返回：2
```

```
时间复杂度O(N)，空间复杂度O(N)

思想来自桶排序，数组长度为N的话，额外空间复杂度为O(N)，与数组出现的范围无关。

1. 我们不是以元素的值来计算桶的数目，而是元素个数来划分桶

2. n的数的话，找到最大值max和最小值min，等量分成n个区间，每个区间对应一个桶，每个数根据所在的区间放在对应的桶，第n+1个桶放最大值

3. n个数，n+1个桶，一定存在空桶，只需要考虑后面一个桶的最小值和前面一个非空桶的最大值的差值，找到最大的差值。
```

```python
def maxGap(A):
  n = len(A)
  mi = min(A)
  ma = max(A)
  s = [[] for i in range(n + 1)]
  for i in A:
    s[(i - mi) * n // (ma - mi)].append(i)

  i, j = 0, 1
  res = 0
  while j < len(s):
    while s[j] == []:
      j += 1
    res = max(res, min(s[j]) - max(s[i]))
    i = j
    j += 1

  return res
```

