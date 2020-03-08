* [排序](#sort)
   * [选择排序](#choose-sort)


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
```
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

