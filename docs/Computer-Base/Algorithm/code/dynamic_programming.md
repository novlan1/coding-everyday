- [1. 斐波那契数列](#1-斐波那契数列)
- [2. 01背包问题](#2-01背包问题)
- [3. 找零钱问题](#3-找零钱问题)
- [4. 最长公共子序列LCS](#4-最长公共子序列lcs)
- [5. 最长上升子序列 LIS](#5-最长上升子序列-lis)
- [6. 字符串全排列](#6-字符串全排列)
- [7. 集合的所有子集](#7-集合的所有子集)
- [8. 最优编辑（插入、删除、替换）](#8-最优编辑插入删除替换)
- [9. 走方格，多少种走法](#9-走方格多少种走法)
- [10. 机器人走方格（有障碍的方格）](#10-机器人走方格有障碍的方格)
- [11. 矩阵最小路径和](#11-矩阵最小路径和)
- [12. 4个数字，通过加减乘除，得到数字24就算胜利](#12-4个数字通过加减乘除得到数字24就算胜利)
- [13. 判断在一个矩阵中是否存在一条包含某字符串所有字符的路径](#13-判断在一个矩阵中是否存在一条包含某字符串所有字符的路径)
- [14. 机器人的运动范围](#14-机器人的运动范围)
- [15. 丑数 [Leetcode-263]](#15-丑数-leetcode-263)
- [16. 丑数 II [Leetcode-264]](#16-丑数-ii-leetcode-264)
- [17. 超级丑数 [Leetcode-313]](#17-超级丑数-leetcode-313)
- [18. 数组不相邻元素之和的最大值(腾讯面试题)](#18-数组不相邻元素之和的最大值腾讯面试题)
  - [18.1. 题目描述](#181-题目描述)
  - [18.2. 举例](#182-举例)
  - [18.3. 解题思路](#183-解题思路)
  - [18.4. 代码](#184-代码)
- [19. 堆箱子](#19-堆箱子)
- [20. 洪水在矩阵建筑中流动](#20-洪水在矩阵建筑中流动)
- [21. K站中转内最便宜的航班](#21-k站中转内最便宜的航班)
- [22. 合唱团：挑选k个人，距离不超过d，使能力值乘积最大](#22-合唱团挑选k个人距离不超过d使能力值乘积最大)
- [23. 最长回文串](#23-最长回文串)
- [24. 完全平方数 [Leetcode-279]](#24-完全平方数-leetcode-279)
- [25. 回旋镖的数量 [Leetcode-447]](#25-回旋镖的数量-leetcode-447)

## 动态规划 <!-- omit in toc -->

### 1. 斐波那契数列

```python
def fibonacci(n):
  res = [0, 1]
  for i in range(n - 1):
    res.append(res[-1] + res[-2])
  return res[n]
```



### 2. 01背包问题
```
dp[x][y]表示前x件物品，不超过重量y的时候的最大价值。
有两种可能：
（1）若选择x件物品，则前x-1件物品的重量不能超过y-w[x]。
（2）若不选择x件物品，则前x-1件物品的重量不能超过y。

所以dp[x][y]可能等于dp[x-1][y]，也就是不取第x件物品。也可能是dp[x-1][y-w[x]]+v[x]，二者取较大值。
```

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

### 3. 找零钱问题
```
dp[i]是目标面值为i时，可以换钱的方法数。

dp[j] += dp[j - penny[i]]，比如，当 penny[i] 为5时，比5大的目标，都应该加上5 + (剩余的面值)的方法数。
```
```python
def exchange(penny, aim):
  n = len(penny)
  dp = [0 for i in range(aim + 1)]
  dp[0] = 1

  for i in range(n):
    j = penny[i]
    while j <= aim:
      dp[j] += dp[j - penny[i]]
      j += 1
        
  return dp[-1]
```

### 4. 最长公共子序列LCS

```
LCS是Longest Common Subsequence的缩写,即最长公共子序列

1. dp[i][j]的含义是字符串arr1[0...i]和arr2[0...j]的最长公共子序列。
2. 矩阵dp的第一列，即dp[i][0]，为arr1[0..j]和arr2[0]的最长公共子序列长度，
   由于arr2[0]长度为1，所以dp[i][0]最大为1。dp[i][0]一旦被设为1，那么之后的dp[i+1..M]都为1。
3. 同理，矩阵的第一行，dp[0][j]，也是相同的规律。
4. 若 arr1[i]==arr2[j]，则 dp[i][j]=dp[i-1][j-1]+1，否则 dp[i][j] = max(dp[i-1][j], dp[i][j-1])。
```

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

### 5. 最长上升子序列 LIS
```
Longest Increasing Subsequence

dp[i]表示以arr[i]结尾的情况下，arr[0...i]中最大递增子序列长度。

dp[i]=max{ dp[j] + 1 }，其中 0<=j<i，并且 arr[j]<arr[i]
```

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
    
  return max(dp) # 注意是取最大的，不是最后一个
```



### 6. 字符串全排列
```
比如，'abc' => ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```

```
1. 第一步是确定第一个位置的字符，就是第一个位置与后边的所有字符进行交换。

2. 第二步，就是对除了第一个位置的后边所有位置的字符进行相同处理；直至剩下一个字符，打印；

递归的出口，就是只剩一个字符的时候，递归的循环过程，就是从每个子串的第二个字符开始依次与第一个字符交换，然后继续处理子串，如果有重复的，然后对结果使用 set 去重就可以了
```

![字符串全排列](../../../imgs/algorithm_permutation.png)

```python
def perm(s):
  n = len(s)
  if n<=1: return [s]
  res = []
  
  for i in range(n):
    for j in perm(s[:i] + s[i+1:]):
      res.append(s[i] + j)
  return res
```

### 7. 集合的所有子集

```python
def subset(s):
  if not s: return
  n = len(s)
  res = []
  
  for i in range(2**n):
    temp = []
    
    for j in range(n):
      if (i>>j)&1:
        temp.append(s[j])
    res.append(temp)
    
  return res
```
```
0 []        --> 0000
1 [1]       --> 0001
2 [2]       --> 0010
3 [1, 2]    --> 0011
4 [3]       --> 0100
5 [1, 3]    --> 0101
6 [2, 3]    --> 0110
7 [1, 2, 3] --> 0111

算上空集的话一共 2^n 个，从 0 到 2^n ，将其转为二进制，与原始数组位置相对应，二进制位上为
1的位置，是数组中留下来的数。
```

### 8. 最优编辑（插入、删除、替换）

```
对于两个字符串A和B，我们需要进行 插入、删除和修改 操作将A串变为B串，定义  
c0，c1，c2 分别为三种操作的代价，请设计一个高效算法，求出将A串变为B串所需  
要的最少代价。

给定两个字符串A和B，及它们的长度和三种操作代价，请返回将A串变为B串所需要  
的最小代价。保证两串长度均小于等于300，且三种代价值均小于等于100。

测试样例：
"abc",3,"adc",3,5,3,100

返回：8
```

```python
def findMinCost(A, n, B, m, c0, c1, c2):
  dp = [[0 for i in range(m + 1)] for j in range(n + 1)]

  for i in range(1, n + 1):
    dp[i][0] = i * c1
  for j in range(1, m + 1):
    dp[0][j] = j * c0

  for i in range(1, n + 1):
    for j in range(1, m + 1):
      if A[i - 1] == B[j - 1]:
        dp[i][j] = dp[i - 1][j - 1]
      else:
        dp[i][j] = min(dp[i-1][j] + c1, dp[i][j-1] + c0, dp[i-1][j-1] + c2)
  return dp[-1][-1]
```

### 9. 走方格，多少种走法

请编写一个函数（允许增加子函数），计算`n x m`的棋盘格子（n为横向的格子数，m为竖向的格子数）沿着各自边缘线从左上角走到右下角，总共有多少种走法，要求不能走回头路，即：只能往右和往下走，不能往左和往上走。

```python
def solution(n, m):
  if n == 1 or m == 1:
    return 1

  res = [[0 for i in range(m)] for j in range(n)]
  
  for i in range(n):
    res[i][0] = 1
  for j in range(m):
    res[0][j] = 1

  for i in range(1, n):
    for j in range(1, m):
      res[i][j] = res[i-1][j] + res[i][j-1]

  return res[-1][-1]
```


### 10. 机器人走方格（有障碍的方格）

```
有一个XxY的网格，一个机器人只能走格点且只能向右或向下走，要从左上角走到右下角。请设计一个算法，计算机器人
有多少种走法。注意这次的网格中有些障碍点是不能走的。

给定一个int[][] map(C++ 中为vector >),表示网格图，若map[i][j]为1则说明该点不是障碍点，否则则为障碍。
另外给定int x,int y，表示网格的大小。请返回机器人从(0,0)走到(x - 1,y - 1)的走法数，为了防止溢出，请
将结果Mod 1000000007。保证x和y均小于等于50
```

思路分析：
可采用递推求解，用二维数组street[n][n]存放坐标，当前格子的走法数量等于上方数量加左方数量，递推式：`dp[i][j] = dp[i - 1][j] + dp[j - 1][i]`。
在地图边界，后面的格子走法数量全等于前一个的数量。若碰见障碍物则后面的格子走法数全为零。

```python
def countWays(m, x, y):
  d = [[0] * y for i in range(x)]

  for i in range(x):
    for j in range(y):
      if m[i][j] != 1:
        continue

      if i == 0 and j == 0:
        d[i][j] = 1

      elif i == 0 and j != 0:
        d[i][j] = d[i][j-1]

      elif i != 0 and j == 0:
        d[i][j] = d[i-1][j]

      else:
        d[i][j] = (d[i][j-1] + d[i-1][j]) % 100000000007

  return d[-1][-1]
```

注意：
- 因为**递推式都是从上或左推出下一个的**，所以不用单独先给最上一行、最左一列赋值。
- 同理，下面一题（矩阵最小路径和）也可以不用提前赋值的

### 11. 矩阵最小路径和
```
给你一个二维数组，二维数组中的每个数都是正数，要求从左上角走到右下角，每一步只能向右或者向下。
沿途经过的数字要累加起来。返回最小的路径和。

举例
如果给定的m如下，那么路径 1,3,1,0,6,1,0 就是最小路径和，返回 12

1 3 5 9 
8 1 3 4 
5 0 6 1 
8 8 4 0
```

```
思路：
dp[i][j] = m[i][j] + min(dp[i-1][j], d[i][j-1])
```

```python
def getMinPath(mmap):
  n = len(mmap)
  m = len(mmap[0])
  dp = mmap
  
  for i in range(1, n):
    dp[i][0] += dp[i-1][0]

  for i in range(1, m):
    dp[0][i] += dp[0][i-1]
  
  for i in range(1, n):
    for j in range(1, m):
      dp[i][j] += min(dp[i-1][j], dp[i][j-1])
  return dp[-1][-1]
  
# 测试
getMinPath([[1, 3, 5, 9], [8, 1, 3, 4], [5, 0, 6, 1], [8, 8, 4, 0]])
```

### 12. 4个数字，通过加减乘除，得到数字24就算胜利

```python
def fn(arr, num):
  if num < 1: return False
  if len(arr) == 1: return arr[0] == num

  for i in range(len(arr)):
    temp = arr[:i] + arr[i+1:]
    b = arr[i]
    if fn(temp, num+b) or fn(temp, num-b) or fn(temp, num*b) or fn(temp, num/b):
      return True
  return False
```
7 2 1 10 => True

### 13. 判断在一个矩阵中是否存在一条包含某字符串所有字符的路径

题目描述：

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。例如 `a b c e s f c s a d e e` 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

思路：

回溯法。试探，如果当前路不通了，回溯（重置访问标志为false，返回到上一层）

```python
def hasPath(mat, rows, cols, path):
  flag = [0] * len(mat)
  for i in range(rows):
    for j in range(cols):
      if find(mat, rows, cols, path, i, j, 0, flag):
        return True

  return False

# i,j：第i行，第j列
# index = i * cols + j：判断mat中的此字符是否能匹配上
# flag是记录整个mat长度的字符是否到达过，所以它的索引是index，而不是k
# k：正在尝试匹配path的第k个字符
def find(mat, rows, cols, path, i, j, k, flag):
  index = i * cols + j
  if i < 0 or i >= rows or j < 0 or j >= cols or mat[index] != path[k] or flag[index] == 1:
    return False
  
  if k == len(path) - 1: return True
  flag[index] = 1 # 已经进入过该格子，不能再次进入

  if find(mat, rows, cols, path, i - 1, j, k + 1, flag) \
    or find(mat, rows, cols, path, i + 1, j, k + 1, flag) \
    or find(mat, rows, cols, path, i, j + 1, k + 1, flag) \
    or find(mat, rows, cols, path, i, j - 1, k + 1, flag):
    return True
  
  flag[index] = 0
  return False

# 测试
hasPath(['a','b','c','e','s','f','c','s','a','d','e','e'],3,4,'bcced')=> True

'abcb'=>False
```

### 14. 机器人的运动范围

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，
每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。
例如，当k为18时，机器人能够进入方格`（35,37）`，因为`3+5+3+7 = 18`。
但是，它不能进入方格`（35,38）`，因为`3+5+3+8 = 19`。请问该机器人能够达到多少个格子？

思路： 
和 矩阵中的路径 相似

- 从（0,0）开始走，每成功走一步标记当前位置为真，然后从当前位置往四个方向探索，返回1 + 4个方向的探索值之和。
- 探索时，判断当前节点是否可达的标准为：
  - 当前节点在矩阵内(不能越界);
  - 当前节点未被访问过;
  - 当前节点满足限制(不能进入行坐标和列坐标的数位之和大于k的格子)。


```python
def movingCount(thre, rows, cols):
  board = [[0 for i in range(cols)] for j in range(rows)]
  res = [0] # 引用类型，模拟修改全局变量

  def block(r, c):
    s = sum(map(int, str(r) + str(c)))
    return s > thre
  
  def traverse(r, c):
    if not (0 <= r < rows and 0 <= c < cols): return

    if block(r, c): board[r][c] = -1
    if board[r][c] != 0: return

    board[r][c] = 1
    res[0] += 1

    traverse(r + 1, c)
    traverse(r - 1, c)
    traverse(r, c - 1)
    traverse(r, c + 1)
    # 最后并没有将board[r][c]置回0，否则陷入死循环
  traverse(0, 0)
  return res[0]
```


### 15. 丑数 [Leetcode-263]
```
思路：不断除以2、3、5，如果最后等于1，说明是丑数，如果最后小于1，说明不是丑数。
```
```python
def isUgly(num):
  while True:
    if num < 1: return False
    elif num == 1: return True
    elif num % 2 == 0: num = num // 2
    elif num % 3 == 0: num = num // 3
    elif num % 5 == 0: num = num // 5
    else: return False
```
另一种写法：
```python
def idUgly(num):
  while num > 1: 
    if num % 2 == 0: num //= 2
    elif num % 3 == 0: num //=3
    elif num % 5 == 0: num //= 5
  if num == 1: return True
  return False
```

### 16. 丑数 II [Leetcode-264]
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
```
1. 思路：动态规划
2. 从数组中只包含一个丑数数字 1 开始，使用三个指针`i2、i3、i5`标记所指向丑数要乘以的因子。
3. 在`nums[i2]*2, nums[i3]*3, nums[i5]*5`中选出最小的丑数并添加到数组中。并将该丑数对应的因子指针往前走一步。重复该步骤直到计算完 1690 个丑数。
```
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

### 17. 超级丑数 [Leetcode-313]
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

```
1. 和上一题类似，L存放质数的指针，初始值都是0。

2. 然后求出质数列表中，每个质数乘以相应指针的最小值。并让相应的指针向后移动1位。
```
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

### 18. 数组不相邻元素之和的最大值(腾讯面试题)

#### 18.1. 题目描述

给你一个数组，让你计算元素的和，但是这些元素都不能相邻，求最大的和。其实这题很常见，在leetcode上面也有，但是原题是这样的：

假设你是一个专业的窃贼，准备沿着一条街打劫房屋。每个房子都存放着特定金额的钱。你面临的唯一约束条件是：相邻的房子装着相互联系的防盗系统，且 当相邻的两个房子同一天被打劫时，该系统会自动报警。给定一个非负整数列表，表示每个房子中存放的钱， 算一算，如果今晚去打劫，你最多可以得到多少钱 在不触动报警装置的情况下。

#### 18.2. 举例
数组arr为[1, 3, 5, 4, 9]，那么结果为 1 + 5 + 9 = 15，再例如数组arr为[5, 1, 3, 11, 7]，那么结果为5 + 11 = 16，从这两个例子可以看出，单纯的计算奇数位的和或者偶数位的和得到的结果未必是最大的。

#### 18.3. 解题思路
定义一个数组p，`p[i]` 代表从第0到第i个房屋，打劫第i个房屋为止所获得金钱总额，也就是说第i个房屋要打劫，而`p[i]`肯定等于`arr[i] + p[i-2]`或者`arr[i] + p[i-3]`的最大值，因为相邻的房屋不能打劫，所以`p[i-1]`不能算。最后我们只要计算`p[arr.length-1]`和`p[arr.length-2]`哪个大就行了。`p[arr.length-3]`肯定不是最大的，因为`p[arr.length-3] + arr[arr.length-1]`肯定比`p[arr.length-3]`大。

#### 18.4. 代码

```js
function thief(arr){
  const len = arr.length
  if (len === 0) return 0
  if (len === 1) return arr[0]
  if (len === 2) return Math.max(arr[0], arr[1])
  if (len === 3) return Math.max(arr[0] + arr[2], arr[1])

  const p = [arr[0], arr[1], arr[0] + arr[2]]

  for (let i = 3; i < len; i++) {
    const temp = Math.max(p[i-2], p[i-3]) + arr[i]
    p.push(temp)
  }

  return Math.max(p[len - 1], p[len - 2])
}
```
python解法：
```python
def thief(arr):
  n = len(arr)
  if n == 0: return 0
  if n == 1: return arr[0]
  if n == 2: return max(arr[0], arr[1])
  if n == 3: return max(arr[0] + arr[2], arr[1])

  p = [arr[0], arr[1], arr[0] + arr[2]]

  for i in range(3, n):
    temp = max(p[i-2], p[i-3]) + arr[i]
    p.append(temp)

  return max(p[n-1], p[n-2])
```


其实这题还能优化为`o(1)`的空间，从上面的代码分析，在计算打劫第`i`个房屋的收益的时候，其实只是和打劫前面3个房屋的收益有关，我们完全可以定义4个变量来表示。

```js
function thief(arr){
  const len = arr.length
  if (len === 0) return 0
  if (len === 1) return arr[0]
  if (len === 2) return Math.max(arr[0], arr[1])
  if (len === 3) return Math.max(arr[0] + arr[2], arr[1])

  let m0 = arr[0]
  let m1 = arr[1]
  let m2 = arr[0] +arr[2]
  let m3 = 0

  for (let i = 3; i < len; i++) {
    m3 = arr[i] + Math.max(m0, m1)

    if (i !== len - 1) { // 不是最后一次遍历，否则会把最后一个数给到倒第二个数
      m0 = m1
      m1 = m2
      m2 = m3
    }
    
  }

  return Math.max(m3, m2)
}


solution([3, 12, 6, 1, 4]) // 16
solution([1, 4, 5, 3]) // 7
solution([1, 3, 5, 4, 9]) // 15
solution([5, 1, 3, 11, 7]) // 16
```

### 19. 堆箱子

```
有一堆箱子，每个箱子宽为wi，长为di，高为hi，现在需要将箱子都堆起来，而且为了使堆起来的箱子不倒，上面的箱子的宽度和长度必须小于下面的箱子。请实现一个方法，求出能堆出的最高的高度，这里的高度即堆起来的所有箱子的高度之和。

给定三个int数组w,l,h，分别表示每个箱子宽、长和高，同时给定箱子的数目n。请返回能堆成的最高的高度。保证n小于等于500。

测试样例：
[1,1,1], [1,1,1], [1,1,1], 3

返回：1
```

```python
def getHeight(w, l, h, n):
  box = [[w[i], l[i], h[i]] for i in range(n)]
  box.sort(key = lambda x: (x[0], x[1]))
  height = [0] * n

  for i in range(n):
    height[i] = box[i][2]

    for j in range(i):
      if box[j][0] < box[i][0] and box[j][1] < box[i][1]:
        height[i] = max(height[i], height[j] + box[i][2])

  return max(height)
```

### 20. 洪水在矩阵建筑中流动

```
在一个nxm矩阵形状的城市里爆发了洪水，洪水从(0,0)的格子流到这个城市，在这个矩阵中有的格子有一些建筑，洪水只能在没有建筑的格子流动。请返回洪水流到(n - 1,m - 1)的最早时间(洪水只能从一个格子流到其相邻的格子且洪水单位时间能从一个格子流到相邻格子)。

给定一个矩阵map表示城市，其中map[i][j]表示坐标为(i,j)的格子，值为1代表该格子有建筑，0代表没有建筑。同时给定矩阵的大小n和m(n和m均小于等于100)，请返回流到(n - 1,m - 1)的最早时间。保证洪水一定能流到终点。
```

```python
def floodFill(tmap, n, m):
  dp = [[10000] * (m + 2) for i in range(n + 2)]
  dp[1][1] = 0

  for i in range(n):
    for j in range(m):
      if i == 0 and j == 0: continue
      if tmap[i][j] == 0:
        dp[i+1][j+1] = min(dp[i][j+1], dp[i+1][j], dp[i+2][j+1], dp[i+1][j+2]) + 1
  
  return dp[n][m]
```

### 21. K站中转内最便宜的航班

有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。

现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 如果没有这样的路线，则输出 -1。

示例 1:

输入: 
n = 3, edges = `[[0,1,100],[1,2,100],[0,2,500]]`
src = 0, dst = 2, k = 1

输出: 200
解释: 
城市航班图如下
![城市航班图](../../../imgs/dynamic_k_flight.png)

从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。
示例 2:

输入: 
n = 3, edges = `[[0,1,100],[1,2,100],[0,2,500]]`
src = 0, dst = 2, k = 0

输出: 500

解释: 
城市航班图同上，从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。

提示：
- n 范围是 `[1, 100]`，城市标签从 0 到 `n - 1`.
- 航班数量范围是 `[0, n * (n - 1) / 2]`.
- 每个航班的格式 `(src, dst, price)`.
- 每个航班的价格范围是` [1, 10000]`.
- k 范围是 `[0, n - 1]`.
- 航班没有重复，且不存在环路


思路：
- 动态规划解法, `dp[i][k]`表示经过`k`个中转站后到达站`i`的最低费用
- 初始除了`dp[src][0]~dp[src][k]`之外所有的元素置为无穷大`inf`
- 则状态方程为: 对于所有目标地位`i`的航班(`flight[1] = i`)
- 只要`dp[flight[0]][k-1] != inf`就更新`dp[i][k]`
- `dp[i][k] = Math.min(dp[i][k], dp[flight[0]][k-1])`

解释：
1. `dp[flight[0]][k-1]`不为无穷大，说明`flight`的起点可以到达，那么比较原来的`flight[1]`和经过0的dp，取较小值。
2. dp有`K+2`列，比如限制中转站个数K为0，那么至少有一个起点、一个终点。起点是会计算的，终点不会计算。


```python
def findCheapestFlight(n, flights, src, dst, K):
  dp = [[float('inf') for i  in range(K+2)]for j in range(n)]

  for i in range(K+2):
    dp[src][i] = 0

  for k in range(1, K+2):
    for f in flights:
      if dp[f[0]][k-1] != float('inf'):
        dp[f[1]][k] = min(dp[f[1]][k], dp[f[0]][k-1] + f[2])
  return -1 if dp[dst][K+1] == float('inf') else dp[dst][K+1]
```

### 22. 合唱团：挑选k个人，距离不超过d，使能力值乘积最大

```
题目描述
有 n 个学生站成一排，每个学生有一个能力值，牛牛想从这 n 个学生中按照顺序选取 k 名学生，
要求相邻两个学生的位置编号的差不超过 d，使得这 k 个学生的能力值的乘积最大，你能返回最大
的乘积吗？

输入描述:

每个输入包含 1 个测试用例。每个测试数据的第一行包含一个整数 n (1 <= n <= 50)，表示学
生的个数，接下来的一行，包含 n 个整数，按顺序表示每个学生的能力值 ai（-50 <= ai <= 50
）。接下来的一行包含两个整数，k 和 d (1 <= k <= 10, 1 <= d <= 50)。

输出描述:

输出一行表示最大的乘积。

示例：

输入：
3
7 4 7
2 50

输出：
49
```

```python
def fn(line, K, d):
  n = len(line)
  res = 0

  fm = [[0 for i in range(K)] for j in range(n)]
  fn = [[0 for i in range(K)] for j in range(n)]

  for i in range(n):
    fm[i][0] = fn[i][0] = line[i]

    for k in range(1, K):
      for j in range(max(0, i-d), i):
        fm[i][k] = max(fm[i][k], max(fm[j][k-1] * line[i], fn[j][k-1] * line[i]))
        fn[i][k] = min(fn[i][k], min(fm[j][k-1] * line[i], fn[j][k-1] * line[i]))
      res = max(res, fm[i][K-1])

  return res
```

```
因为能力值有可能为负数，所以fm为最大值表，fn为最小值表。

fm[i][k]表示在前i个人中，取k个人，最大的能力值。等于max(之前的值, fm[j][k-1]*line[i]), 
也就是已知的k-1个人的能力最大积*当前的这个人

k从1开始，是因为k=0，即表示找一个人，即第一列，为每个人能力值，不会改变的。

max(0, i-d)
1. 当数到第2个人时，i为2，d为50，那么d不起作用，还是从0开始；
2. 当数到第52个人时，i为52，d为50，那么就从2开始，2以前的超出了边界。

for i in range(0,0)，for i in range(1, 1)，for i in range(1, 0)，这些都是无效代码，程
序根本不会执行下面的逻辑。
```


### 23. 最长回文串

```
每当增加一个新的字母，最大回文串的长度 只能增加1或者2，不可能增加更多，
并且，新的最大回文串必然要包含这个字母！

证明：如果新增了一个字母，最大回文串的长度增加了3，这是不可能的，例如：
`abcdefgfedcba`，当增加到最后的`b`或者`a`时，是不可能增加3个长度的，
因为每增加一个字母，前面必然已经存在一个回文子串，且长度比新串小1或者小2.

所以，从头到尾扫描字符串，每增加一个新的字符，判断以这个字符结尾，且长
度为`maxLen+1`或者`maxLen+2`的子串是否为回文，如果是，更新最大回文子串。
```


```python
def getLongP(s):
  if s == s[::-1]: return len(s)

  maxLen = 0

  for i in range(len(s)):
    if i - maxLen >= 1 and s[i - maxLen - 1: i + 1] == s[i - maxLen - 1: i + 1][::-1]:
      # 比如‘aba', i = 2, maxLen = 1 时
      maxLen += 2
      continue

    if i - maxLen >= 0 and s[i - maxLen: i + 1] == s[i - maxLen: i + 1][::-1]:
      # 比如‘aaa', i = 2, maxLen = 2 时
      maxLen += 1

  return maxLen

```

解释：
```
1. 每增加一个字符，以它为结尾，就是s[:i+1]，而每次最长回文串的长度只会增加2或1个，
   那么就往前推maxL+2或者maxL+1个字符，所以是s[i-maxL-1:i+1]或s[i-maxL:i+1]。
2. 同时要先判断i-maxL-1是否大于等于0，如果不是就没意义。
3. 如果最长回文串的长度加2满足了，就进行下一次循环。
```


### 24. 完全平方数 [Leetcode-279]
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

```
1. 动态规划解法，`dp[n`]存储了组成n的最少平方的个数

2. 求平方根，python：`x**0.5`，js：`Math.sqrt(x)`

3. 无穷大，python：`float('inf')`，js：`Infinity`
```

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
      if i < square: 
        break
      dp[i] = min(dp[i], dp[i-square] + 1)
      
  return dp[-1]
```



### 25. 回旋镖的数量 [Leetcode-447]
```
给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 
之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

示例:

输入: [[0,0],[1,0],[2,0]]

输出: 2

解释: 两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```

```
1. 依次遍历数组，针对每一个点都建立一个字典，存储它和其他点的距离的平方（注意不要开根号）。

2. 然后求组合总数，比如某个距离有6个，那就是5*6中组合方式(C62)。
```

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



