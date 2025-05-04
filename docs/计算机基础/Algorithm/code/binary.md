- [1. 二分查找的两种实现](#1-二分查找的两种实现)
- [2. 旋转数组的最小数字](#2-旋转数组的最小数字)
- [3. 长度最小的子数组 [Leetcode - 209]](#3-长度最小的子数组-leetcode---209)
- [4. 无重复字符的最长子串 [Leetcode - 3]](#4-无重复字符的最长子串-leetcode---3)
- [5. 存在重复元素 II [Leetcode-219]](#5-存在重复元素-ii-leetcode-219)
- [6. 存在重复元素 III [ Leetcode-220]](#6-存在重复元素-iii--leetcode-220)
- [7. 局部最小位置](#7-局部最小位置)
- [8. 元素最左出现位置(有序数组)](#8-元素最左出现位置有序数组)
- [9. 最左原位（有序数组）](#9-最左原位有序数组)
- [10. 快速n次方](#10-快速n次方)
- [11. 统计完全二叉树节点个数](#11-统计完全二叉树节点个数)
- [12. 和为s的两个数字](#12-和为s的两个数字)
- [13. 和为s的连续正数序列](#13-和为s的连续正数序列)

## 二分（滑动窗口） <!-- omit in toc -->

### 1. 二分查找的两种实现

```js
function binarySearch(arr, target) {
	const n = arr.length
	let left = 0
	let right = n - 1  // 在[left...right]的范围里寻找target
	while (left <= right) {  // 当left == right时，区间[left...right]仍然有效
		let mid = parseInt((left + right) / 2)
		if (arr[mid] === target) {
			return mid
		}

		if (target > arr[mid]) {
			left = mid + 1; // target 在[mid+1 ...right]中
		} else {
			right = mid - 1 // target 在[left ...mid-1]中
		}
	}
	return -1
}
```
修改边界取值
```js
function binarySearch(arr, target) {
	const n = arr.length
	let left = 0
	let right = n  // 在[left...right)的范围里寻找target
	while (left < right) {  // 当left == right时，区间[left...right)无效
		let mid = parseInt((left + right) / 2)
		if (arr[mid] === target) {
			return mid
		}

		if (target > arr[mid]) {
			left = mid + 1; // target 在[mid+1 ...right)中
		} else {
			right = mid // target 在[left ...mid)中
		}
	}
	return -1
}
```

### 2. 旋转数组的最小数字
```
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。

例如数组 {3,4,5,1,2} 为 {1,2,3,4,5} 的一个旋转，该数组的最小值为1。

NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
```

```
采用二分法解答这个问题，
mid = low + (high - low)/2

需要考虑三种情况：

(1)array[mid] > array[high]:
出现这种情况的array类似[3,4,5,6,0,1,2]，此时最小数字一定在mid的右边。
low = mid + 1

(2)array[mid] == array[high]:
出现这种情况的array类似 [1,0,1,1,1] 或者[1,1,1,0,1]，此时最小数字不好判断在mid左边
还是右边,这时只好一个一个试 ，
high = high - 1

(3)array[mid] < array[high]:
出现这种情况的array类似[2,2,3,4,5,6,6],此时最小数字一定就是array[mid]或者在mid的左
边。因为右边必然都是递增的。
high = mid

注意这里有个坑：如果待查询的范围最后只剩两个数，那么mid 一定会指向下标靠前的数字
比如 array = [4,6]
array[low] = 4 ;array[mid] = 4 ; array[high] = 6 ;
如果high = mid - 1，就会产生错误， 因此high = mid

但情形(1)中low = mid + 1就不会错误
```

```
python3中， a//b 是向下取整
```

```python
def getMinNumber(array):
  if not array: return 0
  left = 0
  right = len(array) - 1
  
  while left < right:
    mid = left + (right - left) // 2

    if array[mid] > array[right]:
      left = mid + 1
    elif array[mid] < array[left]:
      right = mid
    else:
      right -= 1

  return array[left]
```


### 3. 长度最小的子数组 [Leetcode - 209]
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

3. 依次遍历数组，如果右指针小于n，并且sum小于s，那么sum加上右指针指向的值，同
   时右指针向后移动，否则，左指针向后移动，sum减去左指针指向的值。

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


### 4. 无重复字符的最长子串 [Leetcode - 3]
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

3. 依次遍历字符串，如果右指针小于n，并且freq不存在右指针的值，那么将右指针的
   值加入到freq中，同时右指针向后移动，否则，左指针向后移动，sum减去左指针指
   向的值。
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

第二种方法，借助辅助数组来实现。
遍历字符串，遇到存在的字符，就从之前的字符的下一个开始，加上这次的字符，放入到数组中。
最后，遍历一次数组，取出最长的字符串。

```js
function getMostLen(str) {
    let total = ['']

    for (let item of str) {
        const len = total.length
        let cur = total[len - 1]

        if (!cur.includes(item)) {
            cur += item
            total[len - 1] = cur

        } else {
            const firstIdx = cur.indexOf(item)
            total.push(cur.slice(firstIdx + 1) + item)
        }
    }

    let res = ''
    for (let item of total) {
        if (item.length > res.length) {
            res = item
        }
    }
    return res
}
```


### 5. 存在重复元素 II [Leetcode-219]
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

### 6. 存在重复元素 III [ Leetcode-220]
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

3. 依次遍历数组，获得当前值x的id，如果这个桶里有值，返回True。否则，看与它相邻
   的两个桶，如果它们中有值，并且，其值和x之差小于等于t，返回True。都不满足，将
   x放入桶id中。

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

    if id in d: 
      return True
    elif id+1 in d and abs(d[id+1] - nums[i]) <= t: 
      return True
    elif id-1 in d and abs(d[id-1] - nums[i]) <= t: 
      return True
  
    d[id] = nums[i]
    if i >= k: del d[getId(nums[i-k], t)]

  return False
```

### 7. 局部最小位置 

定义局部最小的概念。
1)arr长度为1时，arr[0]是局部最小。
2)arr的长度为N(N>1)时，
①如果arr[0]＜arr[1]，那么arr[0]是局部最小；
②如果arr[N-1]＜arr[N-2]，那么arr[N-1]是局部最小；
③如果0＜i＜N-1，既有arr[i]＜arr[i-1]，又有arr[i]＜arr[i+1]，那么arr[i]是局部最小

给定无序数组arr，已知arr中任意两个相邻的数都不相等。写一个函数，只需返回arr中任意一个局部最小出现的位置即可。

```python
def getLess(A):
  n = len(A)
  if n == 0: return -1
  if n == 1: return 0
  if A[0] < A[1]: return 0
  if A[-1] < A[-2]: return n - 1

  l, r = 1 n - 2
  res = 0

  while l <= r:
    m = (l + r) // 2
    if A[m] < A[m-1] and A[m] < A[m+1]:
      return m
    elif A[m] > A[m-1]:
      r = m - 1
    else:
      l = m + 1

  return -1
```

1. 先判断是否首尾元素是较小值；
2. 否则用两个指针指向首尾，每次取首尾的中间值，如果中间值夹在中间就返回，否则如果中间值大于前一个，那么中间必存在局部最小值

### 8. 元素最左出现位置(有序数组)

思路：
1. 中间值大于目标值，将右指针指向中间左侧(r=mid-1)；
2. 如果中间值小于目标值，将左指针指向中间右侧(l=mid+1)；
3. 如果二者相等，记录该位置，将右指针减1(r=r-1).


```python
def findPos(arr, num):
  n = len(arr)
  res = -1
  l = 0
  r = n - 1
  
  while l <= r:
    mid = l + (r - l) // 2
    if arr[mid] > num:
      r = mid - 1
    elif arr[mid] < num:
      l = mid + 1
    else:
      res = mid
      r = r-1
    
  return res
```

### 9. 最左原位（有序数组）

```
有一个有序数组`arr`，其中不含有重复元素，请找到满足`arr[i]==i`条件的最左的位置。如果所有位置上的数都不满足条件，返回-1。

给定有序数组`arr`及它的大小n，请返回所求值。

测试样例：
[-1,0,2,3],4

返回：2
```

思路：
先取中间值，如果比其坐标小，说明要找的再右面，所以左指针指向中间右面一个(`l=mid+1`)

```python
def findPos(arr):
  n = len(arr)
  l = 0
  r = n - 1
  res = -1

  while l <= r:
    mid = (l + r) // 2
    if arr[mid] == mid:
      res = mid
      r = mid - 1
    elif arr[mid] < mid:
      l = mid + 1
    else:
      r = mid - 1
  
  return res
```

### 10. 快速n次方

![快速n次方](/imgs/binary_quick_n_power.png)

```python
def power(base, exponent):
  if base == 0: return 0
  if exponent == 0: return 1

  s = 1
  e = abs(exponent)
  while e > 0:
    if e & 1:
      s = s * base
    base = base * base
    e >>= 1
  
  return s if exponent > 0 else 1/s
```


### 11. 统计完全二叉树节点个数

如果头结点右子树不能到达最后一层，说明右子树也是一颗满二叉树，只不过比左子树少一层

遍历的方式，时间复杂度`O(n)`，最优解，时间复杂度O`(logN^2)`


```python
def count(root):
  res = 0
  if not root: return 0
  
  left = getH(root.left)
  right = getH(root.right)

  if left == right:
    res += pow(2, left)
    res += count(root.right)
  else:
    res += pow(2, right)
    res += count(root.left)
  
  return res

def getH(root):
  res = 0

  while root:
    res += 1
    root = root.left

  return res
```

### 12. 和为s的两个数字

题目描述：
输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得它们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

思路：
1. `a+b=sum`, a和b越远乘积越小，而一头一尾两个指针往内靠近的方法，找到的就是乘积最小的情况。
2. 如果是乘积最大的情况就是一直找到两个指针重合，每次找到一个就将之前返回的结果向量清空然后更新为新找到的。

```python
def solution(A, s):
  if not A or not s: return []
  end = len(A) - 1
  start = 0

  while start < end:
    cur = A[start] + A[end]
    if cur > s:
      end -= 1
    elif cur < sum:
      start += 1
    else:
      return [A[start], A[end]]
  
  return []
```

### 13. 和为s的连续正数序列

题目描述：
求所有和为S的连续正数序列

思路：
1.双指针问题，当总和小于`sum`，大指针继续+1，
2. 当前总和加上`big`(长度变大)，否则小指针+1，当前总和减去`small`(长度变小)。

```python
def solution(s):
  small, big, res = 1, 2, []
  cur = small + big

  while small < big:
    if cur > s:
      cur -= small
      small += 1
    else:
      if cur == s:
        res.append([i for i in range(small, big)])
      big += 1
      cur += big

  return res
```


