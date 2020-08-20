- [1. 动态规划](#1-动态规划)
  - [1.1. 斐波那契数列](#11-斐波那契数列)
  - [1.2. 01背包问题](#12-01背包问题)
  - [1.3. 找零钱问题](#13-找零钱问题)
  - [1.4. 最长公共子序列LCS](#14-最长公共子序列lcs)
  - [1.5. 最长上升子序列 LIS](#15-最长上升子序列-lis)
  - [1.6. 字符串全排列](#16-字符串全排列)
  - [1.7. 集合的所有子集](#17-集合的所有子集)
  - [1.8. 最优编辑（插入、删除、替换）](#18-最优编辑插入删除替换)
  - [矩阵最小路径和](#矩阵最小路径和)
  - [判断在一个矩阵中是否存在一条包含某字符串所有字符的路径](#判断在一个矩阵中是否存在一条包含某字符串所有字符的路径)
  - [机器人的运动范围](#机器人的运动范围)
  - [机器人走方格（有障碍的方格）](#机器人走方格有障碍的方格)

## 1. 动态规划

### 1.1. 斐波那契数列

```python
def fibonacci(n):
  res = [0, 1]
  for i in range(n - 1):
    res.append(res[-1] + res[-2])
  return res[n]
```



### 1.2. 01背包问题
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

### 1.3. 找零钱问题
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

### 1.4. 最长公共子序列LCS

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

### 1.5. 最长上升子序列 LIS
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



### 1.6. 字符串全排列
```
比如，'abc' => ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```

```
1. 第一步是确定第一个位置的字符，就是第一个位置与后边的所有字符进行交换。

2. 第二步，就是对除了第一个位置的后边所有位置的字符进行相同处理；直至剩下一个字符，打印；

递归的出口，就是只剩一个字符的时候，递归的循环过程，就是从每个子串的第二个字符开始依次与第一个字符交换，然后继续处理子串，如果有重复的，然后对结果使用 set 去重就可以了
```

![字符串全排列](../../imgs/algorithm_permutation.png)

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

### 1.7. 集合的所有子集

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

### 1.8. 最优编辑（插入、删除、替换）

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

### 矩阵最小路径和
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
### 判断在一个矩阵中是否存在一条包含某字符串所有字符的路径

题目描述：

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。例如 a b c e s f c s a d e e 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

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

### 机器人的运动范围

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，
每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。
例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

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
  
  def tranverse(r, c):
    if not (0 <= r < rows and 0 <= c < cols): return

    if block(r, c): board[r][c] = -1
    if board[r][c] != 0: return

    board[r][c] = 1
    res[0] += 1

    tranverse(r + 1, c)
    tranverse(r - 1, c)
    tranverse(r, c - 1)
    tranverse(r, c + 1)

  tranverse(0, 0)
  return res[0]
```

### 机器人走方格（有障碍的方格）

```
有一个XxY的网格，一个机器人只能走格点且只能向右或向下走，要从左上角走到右下角。请设计一个算法，计算机器人
有多少种走法。注意这次的网格中有些障碍点是不能走的。

给定一个int[][] map(C++ 中为vector >),表示网格图，若map[i][j]为1则说明该点不是障碍点，否则则为障碍。
另外给定int x,int y，表示网格的大小。请返回机器人从(0,0)走到(x - 1,y - 1)的走法数，为了防止溢出，请
将结果Mod 1000000007。保证x和y均小于等于50
```

思路分析：
可采用递推求解，用二维数组street[n][n]存放坐标，当前格子的走法数量等于上方数量加左方数量，递推式：dp[i][j] = dp[i - 1][j] + dp[j - 1][i]。
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

# 堆箱子

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

### 洪水在矩阵建筑中流动

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

### 4个数字，通过加减乘除，得到数字24就算胜利

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

### 走方格，多少种走法

请编写一个函数（允许增加子函数），计算n x m的棋盘格子（n为横向的格子数，m为竖向的格子数）沿着各自边缘线从左上角走到右下角，总共有多少种走法，要求不能走回头路，即：只能往右和往下走，不能往左和往上走。

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



