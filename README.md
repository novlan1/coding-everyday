* [排序](#sort)
   * [选择排序](#choose-sort)
   * [冒泡排序](#bubble-sort)
   * [快排](#quick-sort)
   * [堆排序](#heap-sort)
   * [希尔排序](#shell-sort)
   * [归并排序](#merge-sort)
   * [计数排序](#count-sort)
   * [基数排序](#radix-sort)

* [动态规划](#dp)
   * [01背包问题](#bag-question)
   
* [二叉树](#Tree)
   * [二叉树的实现](#make-tree)
   * [二叉树的按层打印](#level-print-tree)
   
* [Node](#node-api)
   * [扫描所有视频文件](#get-all-video)
   
* [前端](#front-code)
   * [下载CSV](#download-csv)
   
   
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
<br/>
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
<br/>

<h2 id='dp'>动态规划</h2>
<h3 id='bag-question'>01背包问题</h3>

```python
def bag(w, v, cap):
  n = len(w)
  dp = [[0 for i in range(cap + 1)] for j in range(n + 1)]
  for i in range(1, n + 1):
    for j in range(1, cap + 1):
      dp[i][j] = dp[i - 1][j]
      if j >= w[i -1] and dp[i-1][j-w[i-1]] + v[i-1] > dp[i-1][j]:
        dp[i][j] = dp[i-1][j-w[i-1]] + v[i-1]
  return dp[-1][-1]
```

<br/>
<h2 id='Tree'>二叉树</h2>

<h3 id='make-tree'>二叉树的实现</h3>

```python
class Node:
  def __init__(self, x):
    self.val = x
    self.left = None
    self.right = None

class Tree:
  def __init__(self):
    self.root = None
  
  def add(self, x):
    node = Node(x)
    if not self.root:
      self.root = node
    else:
      q = [self.root]
      while True:
        p = q.pop(0)
        if p.left is None:
          p.left = node
          return
        elif p.right is None:
          p.right = node
          return
        else:
          q.append(p.left)
          q.append(p.right)
```

<h3 id='level-print-tree'>二叉树的按层打印</h3>

```python
def levelOrder(root):
  if not root: return []
  res = []
  cur = [root]
  nxt = []
  res.append([i.val for i in cur])
  while cur or nxt:
    for node in cur:
      if node.left:
        nxt.append(node.left)
      if node.right:
        nxt.append(node.right)
    if nxt:
      res.append([i.val for i in nxt])
    cur = nxt
    nxt = []
  return res
```
<br/>


<h2 id='node'>Node</h2>
<h3 id='get-all-video'>扫描所有视频文件</h3>

```javascript
const path = require('path')
const fs = require('fs')

// 要遍历的根目录
// const firstPath = path.join(__dirname, '.')
const firstPath = 'D:'
const saveFileLocation = path.join(__dirname, 'video_list.txt')
readDir(firstPath)

let count = 1
// 遍历目录
function readDir(rootPath) {
  fs.readdir(rootPath, {encoding: 'utf8'}, (err, files) => {
    if(!files || !files.length) return
    
    files.forEach(file => {
      const filePath = `${rootPath}/${file}`
      
      fs.stat(filePath, (err, info) => {
        if (info && info.isDirectory()) {
          readDir(filePath)
        } else {
          const extName = path.extname(filePath)
          if (['.mp4', '.avi', '.mkv', '.rmvb'].includes(extName)){
            writeToFile(saveFileLocation, `${count}. ${filePath}\n`)
            count += 1
          }
        }
      })
    }) 
  })
}

function writeToFile(file, data) {
  fs.writeFile(file, data, {flag: 'a'}, (err,a,b) =>{
  })
}

```

<br/>
<h2 id='front-code'>前端</h2>
<h3 id='download-csv'>下载CSV</h3>
```javascript
export const exportCSV = (data, name) => {
  // var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
  var downloadLink = document.createElement("a");
  // downloadLink.href = uri;
  var blob = new Blob(["\ufeff" + data], {type: 'text/csv,charset=UTF-8'}); //解决大文件下载失败
  downloadLink.setAttribute("href", URL.createObjectURL(blob));
  
  downloadLink.download = name ? (name+".csv"): "temp.csv";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
```
