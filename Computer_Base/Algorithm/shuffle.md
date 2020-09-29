## 洗牌算法

1. 首先，出一个简单的题目：有一个大小为100的数组，里面的元素是从 1 到 100，怎样随机从里面选择 1 个数呢？

很简单，利用 `Math.random() * 100` ，就可以拿到一个 0 到 99 的随机数，然后去数组找对应的位置就行了。

2. 下面难度提高一点。 有一个大小为100的数组，里面的元素是从 1 到 100，怎样随机从里面选择 50 个数呢？不能重复。

弄一个数组，把每一次随机的数都放到数组里，下一次随机就看这个数组里面有没有这数，有的话就继续随机，直到这个数组里面有 50 个数字就停止。

问题：如果我们考虑极限，就比如拿 99 个数字，是不是越往后重复的概率越高，那么需要重复随机的次数也越大？


2.1 我们完全可以先把数组混乱了，然后直接从头拿 50 个数字就行了。

打乱数组的方法，是不是第一时间想到一个 `sort(() => return Math.random() > 0.5)` 这个方法了？哈哈，但是这个方法有一个问题就是不是真随机，你想啊，第一个数和第二个数有 50% 的概率交换，第二个数和第三个数有 50% 的概率交换。。。那第一个数和最后一个数交换的概率是不是基本没有呢？如果是真正的随机，第一个数出现在任意位置的概率是相同的，但是用 sort 第一个数大概率是出现在前部的！


3. 洗牌算法


原理很简单：最后一个数和前面任意`n`个数中的一个交换（不能是n-1，因为它有可能在最后位置），然后倒数第二个数和前面任意 `n-1` 个数中的一个交换。。。依次下去就行了。直接看代码：

```js
function shuffle(arr) {
	var len = arr.length
	
	while(len){
		let idx = parseInt(Math.random()*len);
		[arr[len -1], arr[idx]] = [arr[idx], arr[len - 1]];
		len--;
	}
	return arr
}


var arr = [1,2,3,4,5,6,7,8,9]
shuffle(arr)
// arr: [6, 4, 2, 9, 7, 5, 1, 3, 8]
```

Python：

```python
from random import random

def shuffle(arr):
  n = len(arr)

  while n:
    idx = int(random() * n)
	  arr[n-1], arr[idx] = arr[idx], arr[n-1]
	  n -= 1

  return arr
```

当然，我们可以更残忍一点，每次把数组切掉一个元素，再随机现有长度也行：

```js
function shuffle(arr) {
	var arr1 = arr.slice(0)
	var tempArr = []
	while(tempArr.length < 5){
		let idx = parseInt(Math.random()* arr1.length)
		tempArr.push(arr1.splice(idx,1)[0])
	}
	return arr
}


var arr = [1,2,3,4,5,6,7,8,9]
shuffle(arr)
// arr: [5, 7, 4, 9, 3]
```

