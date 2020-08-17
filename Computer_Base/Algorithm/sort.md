- [1. 排序](#1-排序)
  - [1.1. 选择排序](#11-选择排序)
  - [1.2. 冒泡排序](#12-冒泡排序)
  - [1.3. 插入排序](#13-插入排序)
  - [1.4. 快排](#14-快排)
  - [1.5. 堆排序](#15-堆排序)
  - [1.6. 希尔排序](#16-希尔排序)
  - [1.7. 归并排序](#17-归并排序)
  - [1.8. 计数排序](#18-计数排序)
  - [1.9. 基数排序](#19-基数排序)
  - [1.10. 有序数组合并](#110-有序数组合并)
  - [1.11. 三色排序问题](#111-三色排序问题)

## 1. 排序

### 1.1. 选择排序

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


### 1.2. 冒泡排序

```python
def bubbleSort(A):
  n = len(A)
  
  for i in range(n - 1):
    for j in range(n - i - 1):
      if A[j] > A[j + 1]:
        A[j], A[j + 1] = A[j + 1], A[j]
        
  return A
```

### 1.3. 插入排序

```python
def insertSort(A):
  n = len(A)
  for i in range(1, n):
    for j in range(i):
      if A[j] > A[i]:
        A[i], A[j] = A[j], A[i]
  return A
```

### 1.4. 快排

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

### 1.5. 堆排序

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

### 1.6. 希尔排序

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
### 1.7. 归并排序

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

### 1.8. 计数排序

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

### 1.9. 基数排序

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

### 1.10. 有序数组合并

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

### 1.11. 三色排序问题
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