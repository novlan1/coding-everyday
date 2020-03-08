* [排序](#sort)
   * [选择排序](#choose-sort)
   * [冒泡排序](#bubble-sort)
   * [快排](#quick-sort)
   * [堆排序](#heap-sort)
   * [希尔排序](#shell-sort)
   * [归并排序](#merge-sort)
   * [计数排序](#count-sort)
   * [基数排序](#radix-sort)

<h2 id="1">质数因子</h2>

```python
def getZ(n):
  i = 2
  res = []
  while n != 1:
    if n%i == 0:
      res.append(i)
      n = n//i
    else:
      i += 1
  return res
```

<h2 id='sort'>排序</h2>

<h3 id='choose-sort'>选择排序</h3>

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


<h3 id='bubble-sort'>冒泡排序</h3>

```python
def bubbleSort(A):
  n = len(A)
  for i in range(n - 1):
    for j in range(n - i - 1):
      if A[j] > A[j + 1]:
        A[j], A[j + 1] = A[j + 1], A[j]
  return A
```

<h3 id='quick-sort'>快排</h3>

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

<h3 id='heap-sort'>堆排序</h3>

```python
def heap(A, i, n):
  j = 2 * i +1
  while j < n:
    if j + 1 < n and A[j] < A[j+1]:
      A[j] = A[j+1]
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

<h3 id='shell-sort'>希尔排序</h3>

```python
def shellSort(A):
  n = len(A)
  step = 4
  while step > 0:
    for i in range(step, n):
      p = i
      q = i-step
      while q > 0:
        if A[q] > A[p]:
          A[p], A[q] = A[q], A[p]
          p = q
          q = i - step
        else:
          break
    step -= 1
  return A
```
<h3 id='merge-sort'>归并排序</h3>

```python
def mergeSort(A):
  n = len(A)
  if n <= 1: return A
  num = n // 2
  left = mergeSort(A[:num])
  right = mergeSort(A[num:])
  res = []
  i, j = 0, 0
  while i < left[left] and j < len(right):
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

<h3 id='count-sort'>计数排序</h3>

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
      res = [i + mi] * bu[i]
  return res
```

<h3 id='radix-sort'>基数排序</h3>

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
