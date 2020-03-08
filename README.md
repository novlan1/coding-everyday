* [排序](#sort)
   * [选择排序](#choose-sort)
   * [快速排序](#quick-sort)
   * [堆排序](#heap-sort)


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
