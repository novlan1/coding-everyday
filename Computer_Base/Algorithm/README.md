## 编程基础
### 质数因子

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

```
1. 用一个变量k，表示数组的前k项都是非0元素，初始值为0
2. 依次遍历数组，如果当前值item不为0，赋值给nums[k]，同时k++。
3. 再从k遍历到数组尾部，将k位置以后的全部赋值为0。
```

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

```
1. 思路：滑动窗口
2. 设置左右指针`l`和`r`，一开始都设置为0。设置变量sum，记录当前窗口内的值的和。
3. 依次遍历数组，如果右指针小于n，并且sum小于s，那么sum加上右指针指向的值，同时右指针向后移动，否则，左指针向后移动，sum减去左指针指向的值。
4. 遍历的过程中，如果满足条件，即sum>=s，那么更新res为原来的res和`r-l`的较小值。
```

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
```
1. 思路：滑动窗口
2. 设置左右指针`l`和`r`，一开始都设置为0。设置对象freq，记录某字符是否出现过。
3. 依次遍历字符串，如果右指针小于n，并且freq不存在右指针的值，那么将右指针的值加入到freq中，同时右指针向后移动，否则，左指针向后移动，sum减去左指针指向的值。
```
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
python实现：
```python
def fn(s):
  n = len(s)
  l = 0
  r = 0
  res = 0
  freq = {}
  
  while l < n:
    if r < n and s[r] not in freq:
      freq[s[r]] = 1
      r += 1
    else:
      del freq[s[l]]
      l += 1
    res = max(res, r - l)
  return res
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

```
1. 思路：滑动窗口+查找表
2. 判读元素是否在数组中，python：`x in list`，js：`list.includes(x)`
```

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

```
1. 桶作为一个窗口，桶的大小是t+1，也就是值的最大距离+1，那么x的编号是x/(t+1)。
2. 桶中只放一个元素，如果有两个，说明满足条件了，返回True。
3. 依次遍历数组，获得当前值x的id，如果这个桶里有值，返回True。否则，看与它相邻的两个桶，如果它们中有值，并且，其值和x之差小于等于t，返回True。都不满足，将x放入桶id中。
4. 桶的个数是k，遍历的过程中，如果索引>=k，删除之前的桶。

注意：
1. python中，如果id不在d中，直接`d[id]`会报错。
2. python中，删除dict中的元素：`del d[id]`，如果id不在d中，会报错。
```

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

### 丑数 [Leetcode - 263]
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

