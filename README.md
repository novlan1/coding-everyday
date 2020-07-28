* [排序](#sort)
   * [选择排序](#choose-sort)
   * [冒泡排序](#bubble-sort)
   * [插入排序](#insert-sort)
   * [快排](#quick-sort)
   * [堆排序](#heap-sort)
   * [希尔排序](#shell-sort)
   * [归并排序](#merge-sort)
   * [计数排序](#count-sort)
   * [基数排序](#radix-sort)
   * [有序数组合并](#sorted-array-merge)
   * [三色排序问题](#sort-three-color)

* [动态规划](#dp)
   * [01背包问题](#bag-question)
   * [最长公共子序列LCS](#long-common-subsequence)
   * [最长上升子序列LIS](#LIS)
   * [找零钱问题](#exchange-money)
   
* [二叉树](#Tree)
   * [二叉树的实现](#make-tree)
   * [二叉树的层次遍历](#traverse-tree)
   * [二叉树的前序、中序、后序遍历（递归）](#pre-in-post-order-treee)
   * [二叉树的按层打印](#level-print-tree)
   * [二叉树之字形打印](#zhi-print-tree)
   * [折纸问题](#paper-question)
   
* [编程基础](#coding-base)
   * [质数因子](#get-prime-number)
   
* [Node](#node-api)
   * [扫描所有视频文件](#get-all-video)
   
* [前端](#front-code)
   * [下载CSV](#download-csv)
   * [格式化数字，添加逗号](#format-money)
   * [随机字符串](#random-string)
   

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

<h3 id='insert-sort'>插入排序</h3>

```python
def insertSort(A):
  n = len(A)
  for i in range(1, n):
    for j in range(i):
      if A[j] > A[i]:
        A[i], A[j] = A[j], A[i]
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

<h3 id='shell-sort'>希尔排序</h3>

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
      res += [i + mi] * bu[i]
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

<h3 id='sorted-array-merge'>有序数组合并</h3>

```python
def mergeAB(A, B):
  n = len(A)
  m = len(B)
  A.extend([0] * m)
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

<h3 id='sort-three-color'>三色排序问题</h3>

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
  
  m = len(B)
  A.extend([0] * m)
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

<h3 id='long-common-subsequence'>最长公共子序列LCS</h3>

```python
def LCS(A, B):
  n = len(A)
  m = len(B)
  dp =[[0 for i in range(m)]for j in range(n)]
  dp[0][0] = 1 if A[0] == B[0] else 0
  for i in range(1, n):
    dp[i][0] = 1 if A[i] == B[0] else dp[i-1][0]
  for j in range(1, m):
    dp[0][j] = 1 if A[0] == B[j] else dp[0][j-1]
  for i in range(1, n):
    for j in range(1, m):
      if A[i] == B[j]:
        dp[i][j] = dp[i-1][j-1] + 1
      else:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[-1][-1]
```

<h3 id='LIS'>最长上升子序列LIS</h3>

```python
def LIS(A):
  n = len(A)
  dp = [0 for i in range(n)]
  dp[0] = 1
  for i in range(1, n):
    temp = 0
    for j in range(i):
      if A[j] < A[i] and temp < dp[j]:
        temp = dp[j]
    dp[i] = temp + 1
  return dp[-1]
```

<h3 id='exchange-money'>找零钱问题</h3>

```python
def exchange(penny, aim):
  n = len(penny)
  res = [0 for i in range(aim + 1)]
  res[0] = 1
  for i in range(n):
    j = penny[i]
    while j <= aim:
      res[j] += res[j - penny[i]]
      j += 1
  return res[-1]
```

<br/>
## 二叉树

### 二叉树的实现

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

### 二叉树的层次遍历
1. 队列，先放入根节点。
2. 然后每次弹出一个来，放入res中，并且遍历左右孩子，放入队列中。
```python
def traverseTree(root):
  if not root: return []
  res = []
  q = [root]
  while q:
    p = q.pop(0)
    res.append(p.val)
    if p.left:
      q.append(p.left)
    if p.right:
      q.append(p.right)
  return res

```
### 二叉树的前序、中序、后序遍历（递归）

```python
def preOrder(root):
  if not root: return []
  res = [root.val]
  left = preOrder(root.left)
  right = preOrder(root.right)
  return res + left + right

def inOrder(root):
  if not root: return []
  res = [root.val]
  left = inOrder(root.left)
  right = inOrder(root.right)
  return left + res + right

def postOrder(root):
  if not root: return []
  res = [root.val]
  left = postOrder(root.left)
  right = postOrder(root.right)
  return left + right + res
```
### 二叉树的前序、中序、后序遍历（非递归）

#### 前序遍历
1. 申请一个栈，将根节点推入。
2. 每次从栈中弹出一个元素，并放入res中，并且依次遍历它的右、左孩子，如果存在，将其放入栈中。
3. 重复步骤2，直到栈为空。
```python
def preOrder2(root):
  if not root: return []
  res = []
  q = [root]
  
  while q:
    node = q.pop()
    res.append(node.val)
    
    if node.right:
      q.append(node.right)
    if node.left:
      q.append(node.left)
  return res
```
#### 中序遍历
1. 申请一个栈，和一个变量cur，指向根节点。
2. 只要cur不为空，就不断将其压入到栈中，并不断将cur指向它的左孩子。
3. 如果cur为空，就从栈中弹出一个元素node，并打印，将cur指向node的右孩子。
4. 重复步骤2和3，直到栈和cur都为空。
```python
def inOrder2(root):
  if not root: return []
  res = []
  q = []
  cur = root
  
  while q or cur:
    if cur:
      q.append(cur)
      cur = cur.left
    else:
      node = q.pop()
      res.append(node.val)
      cur = node.right
  return res
```
#### 后序遍历
1. 申请两个栈，s1 和 s2，s1先推入根节点
2. 每次s1弹出一个节点，将其放入s2中，并且依次遍历其左右孩子，将其推入s1中
3. 重复步骤2，直到s1为空
4. 从s2中依次弹出节点，并打印。
```
def postOrder2(root):
  if not root: return []
  res = []
  s1 = [root]
  s2 = []
  
  while s1:
    node = s1.pop()
    s2.append(node)
    if node.left: s1.append(node.left)
    if node.right: s1.append(node.right)
  
  while s2:
    res.append(s2.pop().val)
  return res
```

### 二叉树的按层打印
1. 用队列不断推入当前层的节点，每次遍历的时候用一个变量记录当前层的节点个数。
2. 依次遍历队列，将值放入temp中，遍历完一层后，将temp放入res中。

```python
def levelOrder(root):
  if not root: return 
  res = []
  q = [root]
  
  while q:
    curLen = len(q)
    temp = []
    for i in range(curLen):
      node = q.pop(0)
      temp.append(node.val)
      if node.left: q.append(node.left)
      if node.right: q.append(node.right)
    res.append(temp)
  return res
```



### 二叉树之字形打印
1. 和上题类似，多了一个标志位。
2. python的三元表达式形式：
```python
res = 'haha' if True else 'hehe'

# 或者
res.append(temp if True else temp[::-1])
```
3. python用not来取反

```python
def levelReverseOrder(root):
  if not root: return 
  res = []
  q = [root]
  positiveFlag = True
  
  while q:
    curLen = len(q)
    temp = []
    
    for i in range(curLen):
      node = q.pop(0)
      temp.append(node.val)
      if node.left: q.append(node.left)
      if node.right: q.append(node.right)
      
    res.append(temp if positiveFlag else temp[::-1])
    positiveFlag = not positiveFlag
  return res
```

### 折纸问题
把纸条从下往上对折，此时向下突起，再折一次，从上到下突起方向分别为：下、下、上，那么折n次突起顺序？
```
       下
      /  \
    下    上
   / \   /  \
  下  上 下  上 
```
- 第一次折痕向`下`，第二次`下、下、上`，可以发现是二叉树结构，每个折痕的上面是`上`，下面是`下`
- 那就是二叉树的`左-根-右`遍历，即中序遍历。

```python
def fold(i, n, down, res):
  if i > n: return 
  fold(i + 1, n, True, res)
  res.append('down') if down else res.append('up')
  fold(i + 1, n, False, res)
  
def foldPaper(n):
  res = []
  fold(1, n, True, res)
  return res
```

### 求二叉树的镜像
1. 只要当前节点不为空，交换其左、右孩子
2. 对左、右孩子进行递归。
```python
def mirror(root):
  if root:
    root.left, root.right = root.right, root.left
    mirror(root.left)
    mirror(root.right)
```

### 判断是否是平衡树
1. 如果根节点为空，返回True。
2. 否则递归比较根节点的左、右孩子，以及左、右孩子的高度差是否小于1。

获取树的高度的函数
 - 如果根节点为空，返回0
 - 递归获取左右子树的高度
 - 返回`max(左右子树的高度)+1`

```python
def checkBalance(root):
  if not root: return True
  return checkBalance(root.left) and \
         checkBalance(root.right) and \
         abs(getHeight(root.left) - getHeight(root.right)) <= 1

# 获取树的高度
def getHeight(root):
  if not root: return 0
  left = getHeight(root.left)
  right = getHeight(root.right)
  return left + 1 if left > right else right + 1

```





<h2 id='coding-base'>编程基础</h2>
<h3 id="get-prime-number">质数因子</h3>

```python
def getPrime(n):
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
const exportCSV = (data, name) => {
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

<h3 id='format-money'>格式化数字，添加逗号</h3>

```javascript

/**
 * 格式化数字，添加逗号
 * isDecimal: 是否返回小数部分，优先级低
 * isCutTwo: 保留两位小数
 * isCutThree: 保留三位小数
 */
export const formatMoney = (n, isDecimal, isCutTwo, isCutThree)=> {
  if (n === 0) {
    if (isCutTwo){
      return '0.00'
    } else if (isCutThree) {
      return '0.000'
    }
    return 0
  }
  if (n === undefined || n === null || isNaN(n)) return ""
  // 是否是负数
  const isMinus = n < 0
  // 绝对值，转为string
  let num = '' + Math.abs(n)
  // 小数部分
  let decimals = num.indexOf('.') > -1 ?  '.' + num.split('.')[1] : ''
  // 整数部分长度
  let len = num.split('.')[0].length
  // 整数部分
  let res = num.split('.')[0]

  if (len > 3) {
    let remainder = len % 3
    if (remainder > 0) { 
      // 不是3的整数倍
      res = num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',')
    } else {          
      // 是3的整数倍
      res = num.slice(0, len).match(/\d{3}/g).join(',') 
    }
  }
  if(isMinus) {
    res = '-' + res
  }
  if (isCutTwo && num.indexOf(".") > -1) {
    return res + decimals.slice(0, 3)
  }
  if (isCutThree && num.indexOf(".") > -1) {
    return res + decimals.slice(0, 4)
  }
  if (isDecimal) {
    // return res + decimals
    // 最多显示3位小数 TODO
    return res + decimals.slice(0, 4) 
  }
  // 默认取整
  return res.split('.')[0]  
}

```

<h3 id='random-string'>随机字符串</h3>

```javascript
/**
 * toString()方法可以根据所传递的参数把数值转换为对应进制的数字字符串。参数范围为 2~36 之间的任意整数。
 * substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
 * e.g, 0.3288894104484157 => '0.agp1hbf0dko' => 'agp1hbf0dko'
 */
function getRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

```


## LeetCode
### 移动零 [Leetcode - 283 ]

```
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。
```
1. 用一个变量k，表示数组的前k项都是非0元素，初始值为0
2. 依次遍历数组，如果当前值item不为0，赋值给nums[k]，同时k++。
3. 再从k遍历到数组尾部，将k位置以后的全部赋值为0。
```javascript
var moveZeroes = function(nums) {
    // let _list = []
    
    // for (let item of nums) {
    //     if (item != 0) {
    //         _list.push(item)
    //     }
    // }
    // for (let i = 0; i < nums.length; i++) {
    //     nums[i] = _list[i] || 0
    // }

    // 原地(in place)解决该问题
    // 空间复杂度O(n) => O(1)
    let k = 0 // nums中, [0...k)的元素均为非0元素

    for (let item of nums) {
        if (item) {
            nums[k++] = item
        }
    }
    for (let i = k; i < nums.length; i ++) {
        nums[i] = 0
    }
};
```
python实现：
```python
def fn(nums):
  k = 0
  
  for item in nums:
    if item:
      nums[k]=item
      k+=1
      
  for i in range(k, len(nums)):
    nums[i]=0
  return nums
```
### 长度最小的子数组 [Leetcode - 209]
```
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的子数组，
并返回其长度。如果不存在符合条件的子数组，返回 0。

示例：

输入：s = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```
1. 思路：滑动窗口
2. 设置左右指针`l`和`r`，一开始都设置为0。设置变量sum，记录当前窗口内的值的和。
3. 依次遍历数组，如果右指针小于n，并且sum小于s，那么sum加上右指针指向的值，同时右指针向后移动，否则，左指针向后移动，sum减去左指针指向的值。
4. 遍历的过程中，如果满足条件，即sum>=s，那么更新res为原来的res和`r-l`的较小值。
```javascript
var minSubArrayLen = function(s, nums) {
    const n = nums.length
    let l = 0
    let r = 0 // nums[l...r]为我们的滑动窗口

    let res = n + 1
    let sum = 0

    while (l < n){ // 窗口的左边界在数组范围内,则循环继续
        if (r < n && sum < s) {
            sum += nums[r++]
        }
        
        else { // r已经到头 或者 sum >= s
            sum -= nums[l++]
        }
        
        if (sum >= s) {
            res=Math.min(res, r-l)
        }
    }
    if (res == n+1) return 0
    return res
};
```
python实现：
```python
def fn(s, nums):
  n = len(nums)
  l = 0
  r = 0
  
  res = n + 1
  sum = 0
  
  while l < n:
    if r < n and sum < s:
      sum += nums[r]
      r += 1
    else:
      sum -= nums[l]
      l -= 1
    
    if sum >= s:
      res = min(res, r - l)
      
  if res == n+1: return 0
  return res

```


### 无重复字符的最长子串 [Leetcode - 3]
```
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```
1. 思路：滑动窗口
2. 设置左右指针`l`和`r`，一开始都设置为0。设置对象freq，记录某字符是否出现过。
3. 依次遍历字符串，如果右指针小于n，并且freq不存在右指针的值，那么将右指针的值加入到freq中，同时右指针向后移动，否则，左指针向后移动，sum减去左指针指向的值。

```javascript
var lengthOfLongestSubstring = function(s) {
    let freq = {}
    let l = 0
    let r = 0  //滑动窗口为s[l...r]
    const n = s.length
    let res = 0

    // 在每次循环里逐渐改变窗口, 维护freq, 并记录当前窗口中是否找到了一个新的最优值
    while (l < n) {
        if (r < n && !freq[s[r]]) {

            freq[s[r]] = 1
            r+=1
        } 
        else {   //r已经到头 || freq[s[r+1]] == 1
            freq[s[l++]]--
        }
        res = Math.max(res, r-l)
    }
    return res
};
```


### 完全平方数 [Leetcode - 279]
```
给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。
你需要让组成和的完全平方数的个数最少。

示例 1:
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.

示例 2:
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```
1. 动态规划解法，`dp[n`]存储了组成n的最少平方的个数
2. 求平方根，python：`x**0.5`，js：`Math.sqrt(x)`
3. 无穷大，python：`float('inf')`，js：`Infinity`
```python
def numSquares(n):
  square_nums = []
  for i in range(int(n ** 0.5) + 1):
    square_nums.append(i ** 2)
  
  dp = [0]
  for i in range(1, n+1):
    dp.append(float('inf'))
  
  for i in range(1, n+1):
    for square in square_nums:
      if i < square: break
      dp[i] = min(dp[i], dp[i-square] + 1)
      
  return dp[-1]
```

### 存在重复元素 II [Leetcode - 219]
```
给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，
并且 i 和 j 的差的 绝对值 至多为 k。 

示例:
输入: nums = [1,2,3,1], k = 3
输出: true
```
1. 思路：滑动窗口+查找表
2. 判读元素是否在数组中，python：`x in list`，js：`list.includes(x)`
```python
def fn(nums, k):
  if len(nums) <= 1 or k <= 0: return 
  d = []
  
  for i in range(len(nums)):
    if nums[i] in d: return True
    
    d.append(nums[i])
    
    if (len(d) > k):
      d.pop(0)
  return False
```

### 存在重复元素 III [ Leetcode - 220]
```
在整数数组 nums 中，是否存在两个下标 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值小于等于 t ，
且满足 i 和 j 的差的绝对值也小于等于 ķ 。

如果存在则返回 true，不存在返回 false。

示例 1:
输入: nums = [1,2,3,1], k = 3, t = 0
输出: true

示例 2:
输入: nums = [1,0,1,1], k = 1, t = 2
输出: true

示例 3:
输入: nums = [1,5,9,1,5,9], k = 2, t = 3
输出: false
```
1. 桶作为一个窗口，桶的大小是t+1，也就是值的最大距离+1，那么x的编号是x/(t+1)。
2. 桶中只放一个元素，如果有两个，说明满足条件了，返回True。
3. 依次遍历数组，获得当前值x的id，如果这个桶里有值，返回True。否则，看与它相邻的两个桶，如果它们中有值，并且，其值和x之差小于等于t，返回True。都不满足，将x放入桶id中。
4. 桶的个数是k，遍历的过程中，如果索引>=k，删除之前的桶。

注意：
1. python中，如果id不在d中，直接`d[id]`会报错。
2. python中，删除dict中的元素：`del d[id]`，如果id不在d中，会报错。

```python
import math

def getId(x, t): # 获取桶的编号
  return math.floor(x / (t + 1))

def fn(nums, k, t):
  if t < 0: return False
  d = {} # 桶
  
  for i in range(len(nums)):
    id = getId(nums[i], t)
    if id in d: return True
    elif id+1 in d and abs(d[id+1] - nums[i]) <= t: return True
    elif id-1 in d and abs(d[id-1] - nums[i]) <= t: return True
  
    d[id] = nums[i]
    if i >= k: del d[getId(nums[i-k], t)]
  return False
```


### 回旋镖的数量 [Leetcode - 447]
```
给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 
之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

示例:

输入: [[0,0],[1,0],[2,0]]

输出: 2

解释: 两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```


1. 依次遍历数组，针对每一个点都建立一个字典，存储它和其他点的距离的平方（注意不要开根号）。
2. 然后求组合总数，比如某个距离有6个，那就是5*6中组合方式(C62)。
```python
def getDis(a, b):
  return (a[0] - b[0])**2 + (a[1] - b[1])**2

def fn(points):
  res = 0
  
  for item in points:
    d = {}
    for it in points:
      if item[0] != it[0] or item[1] != it[1]:
        dis = getDis(item, it)
        if dis in d:
          d[dis] += 1
        else: 
          d[dis] = 1
      
    for it in d:
      res += d[it]*(d[it]-1)
  return res
```

### 丑数 [Leetcode - 263]
思路：不断除以2、3、5，如果最后等于1，说明是丑数，如果最后小于1，说明不是丑数。
```python
def isUgly(num):
  while True:
    if num < 1: return False
    if num == 1: return True
    elif num % 2 == 0: num = num // 2
    elif num % 3 == 0: num = num // 3
    elif num % 5 == 0: num = num // 5
    else: return False
```


### 丑数 II [Leetcode - 264]
```
编写一个程序，找出第 n 个丑数。
丑数就是质因数只包含 2, 3, 5 的正整数。

示例:
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。

说明:  
1 是丑数。
n 不超过1690。
通过次数30,264提交次数56,833
```
1. 思路：动态规划
2. 从数组中只包含一个丑数数字 1 开始，使用三个指针`i2、i3、i5`标记所指向丑数要乘以的因子。
3. 在`nums[i2]*2, nums[i3]*3, nums[i5]*5`中选出最小的丑数并添加到数组中。并将该丑数对应的因子指针往前走一步。重复该步骤直到计算完 1690 个丑数。

```python
def nthUglyNumber(n):
  res = [1]
  i2 = i3 = i5 = 0
  for i in range(1, n):
    ugly = min(res[i2]*2, res[i3]*3, res[i5]*5)
    res.append(ugly)
    
    if ugly == res[i2]*2:
      i2 += 1
    if ugly == res[i3]*3:
      i3 += 1
    if ugly == res[i5]*5:
      i5 += 1
  return res[-1]
```

### 超级丑数 [Leetcode - 313]
```
编写一段程序来查找第 n 个超级丑数。
超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。

示例:
输入: n = 12, primes = [2,7,13,19]
输出: 32 
解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。

说明:
(1) 1 是任何给定 primes 的超级丑数。
(2) 给定 primes 中的数字以升序排列。
(3) 0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000 。
(4) 第 n 个超级丑数确保在 32 位有符整数范围内。
```
1. 和上一题类似，L存放质数的指针，初始值都是0。
2. 然后求出质数列表中，每个质数乘以相应指针的最小值。并让相应的指针向后移动1位。
```python
def ulgy(n, primes):
  num = len(primes)
  L = [0 for i in range(num)]
  res = [0] * n
  res[0]=1
  
  for i in range(1, n):
    min_u = min(res[L[j]] * primes[j] for j in range(num))
    res[i] = min_u
    for k in range(num):
      if res[L[k]] * primes[k] == min_u:
        L[k] += 1
  return res[-1]
```

