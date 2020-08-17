- [1. 数组](#1-数组)
  - [1.1. 有序二维数组中的查找 [剑指 offer]](#11-有序二维数组中的查找-剑指-offer)
  - [1.2. 旋转数组的最小数字](#12-旋转数组的最小数字)

## 1. 数组

### 1.1. 有序二维数组中的查找 [剑指 offer]

```
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```
```
思路：
1. 从右上角开始找
2. 若大于当前值，就说明可能在下一行
3. 若小于当前值，就说嘛可能在当前行的前面
```
```python
def findtarget(target, array):
  if not array: return 
  n = len(target)
  m = len(target[0])
  i = 0 
  j = m - 1
  
  while i < n and j >= 0:
    if array[i][j] == target:
      return True
    elif array[i][j] > target:
      j -= 1
    else:
      i += 1
  return False
```

### 1.2. 旋转数组的最小数字
```
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
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


