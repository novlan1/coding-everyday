
## 贪心

### 跳跃游戏 [leetcode-55]
题目描述：

给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个位置。

示例 1:

输入: [2,3,1,1,4]
输出: true
解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。

示例 2:

输入: [3,2,1,0,4]
输出: false
解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

思路：
我们依次遍历数组中的每一个位置，并实时维护 最远可以到达的位置。对于当前遍历到的位置 x，如果它在 最远可以到达的位置 的范围内，那么我们就可以从起点通过若干次跳跃到达该位置，因此我们可以用 `x+nums[x]` 更新 最远可以到达的位置。

在遍历的过程中，如果 最远可以到达的位置 大于等于数组中的最后一个位置，那就说明最后一个位置可达，我们就可以直接返回 True 作为答案。反之，如果在遍历结束后，最后一个位置仍然不可达，我们就返回 False 作为答案。

JS解法：
```js
var canJump = function(nums) {
    const n = nums.length
    let rightMost = 0

    for (let i = 0; i< n;i++) {
        if (i <= rightMost) {
            rightMost = Math.max(rightMost, i + nums[i])
            if (rightMost >= n -1) {
                return true
            }
        }
    }

    return false
};
```

python解法：

```python
def canJump(nums):
  n = len(nums)
  rightMost = 0

  for i in range(n):
    if i <= rightMost:
      rightMost = max(rightMost, i+nums[i])
      if rightMost >= n - 1:
        return True
  return False
```