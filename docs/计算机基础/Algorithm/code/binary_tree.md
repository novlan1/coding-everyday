- [1. 二叉树的实现](#1-二叉树的实现)
- [2. 二叉树的层次遍历](#2-二叉树的层次遍历)
- [3. 二叉树的按层打印](#3-二叉树的按层打印)
- [4. 二叉树的前序、中序、后序遍历（递归）](#4-二叉树的前序中序后序遍历递归)
- [5. 前序遍历（非递归）](#5-前序遍历非递归)
- [6. 中序遍历（非递归）](#6-中序遍历非递归)
- [7. 后序遍历（非递归）](#7-后序遍历非递归)
- [8. 二叉树之字形打印](#8-二叉树之字形打印)
- [9. 折纸问题](#9-折纸问题)
- [10. 求二叉树的镜像](#10-求二叉树的镜像)
- [11. 判断是否是平衡树](#11-判断是否是平衡树)
- [12. 重建二叉树](#12-重建二叉树)
- [13. 二叉树的序列化与反序列化](#13-二叉树的序列化与反序列化)
- [14. 二叉搜索数的第k个结点](#14-二叉搜索数的第k个结点)
- [15. 完全二叉树判断](#15-完全二叉树判断)
- [16. 判断一棵树是不是另一棵树的子结构](#16-判断一棵树是不是另一棵树的子结构)
- [17. 求中序遍历的下一个节点](#17-求中序遍历的下一个节点)
- [18. 判断二叉树是否对称](#18-判断二叉树是否对称)
- [19. 判断某数组是否是二叉搜索树的后序遍历序列](#19-判断某数组是否是二叉搜索树的后序遍历序列)
- [20. 找到二叉树中和为某一值的路径](#20-找到二叉树中和为某一值的路径)
- [21. 二叉树节点间的最大距离问题](#21-二叉树节点间的最大距离问题)
- [22. 求根到叶子节点的数字之和](#22-求根到叶子节点的数字之和)
- [23. 寻找搜索二叉树的错误结点](#23-寻找搜索二叉树的错误结点)
- [24. 最大搜索二叉子树](#24-最大搜索二叉子树)

## 1. 二叉树 <!-- omit in toc -->

### 1. 二叉树的实现

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

### 2. 二叉树的层次遍历

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

### 3. 二叉树的按层打印

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



### 4. 二叉树的前序、中序、后序遍历（递归）




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

测试

```python
a = Tree()
for i in range(10):
  a.add(i)

preorder(a.root)
# [0, 1, 3, 7, 8, 4, 9, 2, 5, 6]

inOrder(a.root)
# [7, 3, 8, 1, 9, 4, 0, 5, 2, 6]

postOrder(a.root)
# [7, 8, 3, 9, 4, 1, 5, 6, 2, 0]
```

```
         0
      /    \
     1       2
    /  \    /   \
   3    4  5    6
 /  \   / 
7    8  9   
```

### 5. 前序遍历（非递归）

1. 申请一个栈 stack，将头节点head压入。
2. 每次从栈中弹出一个元素，并放入res中，并且依次遍历它的右、左孩子，如果存在，将其放入栈中。
3. 重复步骤2，直到栈为空。


```python
def preOrder2(root):
  if not root: return []
  res = []
  s = [root]
  
  while s:
    node = s.pop()
    res.append(node.val)
    
    if node.right:
      s.append(node.right)
    if node.left:
      s.append(node.left)
  return res
```

### 6. 中序遍历（非递归）

1. 申请一个栈，和一个变量cur，指向根节点。
2. 只要cur不为空，就不断将其压入到栈中，并不断将cur指向它的左孩子。
3. 如果cur为空，就从栈中弹出一个元素node，并打印，将cur指向node的右孩子。
4. 重复步骤2和3，直到栈和cur都为空。


```python
def inOrder2(root):
  if not root: return []
  res = []
  s = []
  cur = root
  
  while s or cur:
    if cur:
      s.append(cur)
      cur = cur.left
    else:
      node = s.pop()
      res.append(node.val)
      cur = node.right
  return res
```

### 7. 后序遍历（非递归）

方法一：使用两个栈实现
1. 申请两个栈，s1 和 s2，s1先推入根节点
2. 每次s1弹出一个节点，将其放入s2中，并且依次遍历其左右孩子，将其推入s1中
3. 重复步骤2，直到s1为空
4. 从s2中依次弹出节点，并打印。


```python
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

方法二：使用一个栈实现
1. 申请一个栈，记为 stack，将头节点压入stack，同时设置两个变量 h 和 c。整个流程中，h 代表最近一次弹出并打印的节点，c 代表当前 stack 的栈顶结点，初始时令 h 为头节点， c 为 null
2. 每次令 c 等于当前 stack 的栈顶节点，但是不从 stack 中弹出节点，此时分以下三种情况。
   - （1）如果 c 的左孩子不为空，并且 h 不等于 c 的左孩子，也不等于 c 的右孩子，则把 c 的左孩子压入 stack 中。
   - （2）如果情况1不成立，并且 c 的右孩子不为空，并且 h 不等于 c 的右孩子，则把 c 的右孩子压入 stack 中。
   - （3）如果情况1 和情况2都不成立，那么从 stack 中弹出 c 并打印，然后令 h 等于 c。
3. 一直重复步骤2，直到 stack 为空，过程停止。


```python
def postOrder3(root):
  if not root: return []

  s = [root]
  res = []
  h = root

  while s:
    c = s[-1]
    if c.left and h != c.left and h != c.right:
      s.append(c.left)
    elif c.right and h != c.right:
      s.append(c.right)
    else:
      c = s.pop()
      res.append(c.val)
      h = c

  return res
```



### 8. 二叉树之字形打印

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

### 9. 折纸问题
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

### 10. 求二叉树的镜像
1. 只要当前节点不为空，交换其左、右孩子
2. 对左、右孩子进行递归。
```python
def mirror(root):
  if root:
    root.left, root.right = root.right, root.left
    mirror(root.left)
    mirror(root.right)
```

### 11. 判断是否是平衡树
1. 如果根节点为空，返回True。
2. 否则递归比较根节点的左、右孩子，以及左、右孩子的高度差是否小于1。

获取树的高度的函数
 - 如果根节点为空，返回 0
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

二叉树的子树：二叉树中以任一节点为头部的整棵树称为二叉树的子树

![二叉树的子树](/imgs/binary_tree_son_tree.png)


### 12. 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```python
def reConstructBinaryTree(pre, tin):
  if not pre or not tin: return None

  root = TreeNode(pre[0])
  i = tin.index(pre[0])

  root.left = reConstructBinaryTree(pre[1: i+1], tin[:i])
  root.right = reConstructBinaryTree(pre[i+1:], tin[i+1:])
  return root
```

### 13. 二叉树的序列化与反序列化


1. 首先我们介绍二叉树先序序列化的方式，假设序列化的结果字符串为 str，初始时 st r等于空字符串。
2. 先序遍历二叉树，如果遇到空节点，就在str的末尾加上“#!”，“#”表示这个节点为空，节点值不存在，当然你也可以用其他的特殊字符，“!”表示一个值的结束。
3. 如果遇到不为空的节点，假设节点值为3，就在 str 的末尾加上“3!”。现在请你实现树的先序序列化。
4. 给定树的根结点root，请返回二叉树序列化后的字符串。

```python
def serialize(root):
  if not root: return '#!'

  res = ''
  res += str(root.val) + '!'
  res += serialize(root.left)
  res += serialize(root.right)
  return res 


def deserialize(s):
  s = s.split('!')
  return dese(s)


def dese(s):
  if not s: return

  node = s.pop(0)
  root = None
  
  if node != '#':
    root = TreeNode(int(node))
    root.left = dese(s)
    root.right = dese(s)

  return root
```

### 14. 二叉搜索数的第k个结点

给定一棵二叉搜索树，请找出其中的第k小的结点。
样例 （5，3，7，2，4，6，8）中，按结点数值大小顺序第三小结点的值为4。

```python
# 递归方式
def kthNode(root, k):
  res = []

  mid(root, res)

  if k <=0 or len(res) < k: return 

  return res[k - 1]


# 中序遍历
def mid(root, res)：
  if not root: return res
  
  mid(root.left, res)
  res.append(root)
  mid(root.right, res)
```

```python
# 迭代方式
def kthNode(root, k):
  if not root or not k: return 
  stack = []
  cur = root
  count = 0

  while cur or stack:
    if cur:
      stack.append(cur)
      cur = cur.left
    else:
      node = stack.pop()
      count += 1

      if count == k:
        return node

      cur = node.right
```


### 15. 完全二叉树判断 

1. 按层遍历，如果当前节点有右孩子，没有左孩子返回false
2. 如果当前节点不是左右孩子都有，那之后的节点必须为叶节点，否则返回false

```python
def checkCompletion(root):
  if not root: return True

  queue = [root]
  flag = 0

  while queue:
    node = queue.pop(0)

    if flag:
      if node.left or node.right:
        return False

    if node.left:
      if node.right:
        queue.append(node.left)
        queue.append(node.right)
      else:
        flag = 1
    elif node.right:
      return False

  return True
```

### 16. 判断一棵树是不是另一棵树的子结构

约定空树不是任意一个树的子结构

```python
def hasSubTree(root1, root2):
  if not root1 or not root2:
    return False
  
  return isSubTree(root1, root2) or \
         isSubTree(root1.left, root2) or \
         isSubTree(root1.right, root2)


def isSubTree(root1, root2):
  if not root2: return True
  if not root1 or root1.val != root2.val: return False

  return isSubTree(root1.left, root2.left) and \
         isSubTree(root1.right, root2.right)
```



### 17. 求中序遍历的下一个节点

给定一棵二叉树和其中的一个节点，如何找出中序遍历序列的下一个节点？树中的节点除了有两个分别指向左、右子节点的指针，还有一个指向父节点的指针。

```python
def getNext(node):
  if not node: return

  if node.right:
    leftN = node.right:
    while leftN.left:
      return leftN
  
  while node.next:
    temp = node.next
    if temp.left == node:
      return temp
    node = temp
```

分析二叉树的下一个节点，一共有以下情况： 

1. 二叉树为空，则返回空； 
2. 节点右孩子存在，则设置一个指针从该节点的右孩子出发，一直沿着指向左子结点的指针找到的叶子节点即为下一个节点； 
3. 节点不是根节点。如果该节点是其父节点的左孩子，则返回父节点；否则继续向上遍历其父节点的父节点，重复之前的判断，返回结果。


### 18. 判断二叉树是否对称

对称是指，一个二叉树同此二叉树的镜像是同样的

```python
def isSymmetrical(root):
  if not root: return True
  return isSame(root.left, root.right)


def isSame(p1, p2):
  if not p1 and not p2: return True

  if not p1 or not p2: return False
  if p1.val != p2.val: return False

  return isSame(p1.left, p2.right) and \
         isSame(p1.right, p2.left)
```

思路：

1. 如果根节点为空，直接返回false，否则递归判断左孩子节点和右孩子节点是否一样
2. 用一个函数判断两个节点是否一样，`p1.left==p2.right`,`p1.right==p2.left`



### 19. 判断某数组是否是二叉搜索树的后序遍历序列

假设输入的数组的任意两个数字都互不相同

思路：
- 后序遍历的序列中，最后一个数字是树的根节点，数组中前面的数字可以分为两部分：
  - 第一部分是左子树节点的值，都比根节点的值小；
  - 第二部分是右子树节点的值，都比根节点的值大
- 后面用递归分别判断前后两部分是否符合以上原则

```python
def verifySequenceOfBST(s):
  n = len(s)
  if n == 0: return False
  if n == 1: return True

  root = s[-1]
  i = 0
  
  while s[i] < root:
    i += 1
  
  for j in range(i, n-1):
    if s[j] < root:
      return False

  left, right = True, True
  
  if i > 0:
    left = verifySequenceOfBST(s[:i])
  if i < n -1:
    right = verifySequenceOfBST(s[i:n-1])

  return left and right
```


### 20. 找到二叉树中和为某一值的路径

路径指根到叶节点的路径

输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。(注意: 在返回值的list中，数组长度大的数组靠前)


思路：
1. 如果只有根节点或者找到叶子节点，我们就把其对应的`val`值返回
2. 如果不是叶子节点，我们分别对根节点的左子树、右子树进行递归，直到找到叶子结点。然后遍历把叶子结点和父节点对应的`val`组成的序列返回上一层；如果没找到路径，其实也返回了序列，只不过是`[]`

只有当`left`或`righ`t有值的时候，才会走到`res.append([root.val]+i)`这一步，也就是说找到了一条路径

```python
def findPath(root, n):
  if not root: return []
  
  if not root.left and not root.right and root.val == n:
    return [[root.val]]

  left = findPath(root.left, n - root.val)
  right = findPath(root.right, n - root.val)

  res = []
  for i in left + right:
    res.append([root.val] + i)

  return res
```

### 21. 二叉树节点间的最大距离问题

从二叉树的节点 A 出发，可以向上或者向下走，但沿途的节点只能经过一次，当到达节点 B 时，路径上的节点数叫作 A 到 B 的距离。
现在给出一棵二叉树，求整棵树上每对节点之间的最大距离。

思路：
一个以h为头的树上，最大距离只可能来自以下三种情况：
1. h 的左子树上的最大距离
2. h 的右子树上的最大距离
3. h 左子树上离 h 左孩子最远的距离，加上 h 自身， 加上 h 右子树离 h 右孩子的最远距离。

三个值中最大的那个就是以 h 为头的整棵树上的最远的距离。

```python
def findLongest(root):
  if not root: return 0

  lmax = findLongest(root.left)
  rmax = findLongest(root.right)
  hmax = getH(root.left) + getH(root.right) + 1

  return max(lmax, rmax, hmax)


def getH(root):
  if not root: return 0

  lH = getH(root.left)
  rH = getH(root.right)

  return max(lH, rH) + 1
```

### 22. 求根到叶子节点的数字之和
```
给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

示例 1:

输入: [1,2,3]
 1
/ \
2 3

输出: 25

解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.

因此，数字总和 = 12 + 13 = 25.

示例 2:

输入: [4,9,0,5,1]
  4
 / \
 9 0
/ \
5 1

输出: 1026

解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.

因此，数字总和 = 495 + 491 + 40 = 1026.
```

```
思路：
既然我们需要到达每一个叶节点，那么就可以采用DFS(深度递归遍历)的方式，创建一个数组来存放所有结果
```

```python
def DFS(res, root, cur):
  if not root: return 
  cur += str(root.val)

  if not root.left and not root.right: 
    res.append(cur)
  else:
   DFS(res, root.left, cur)
   DFS(res, root.right, cur)


def sumPath(root):
  res = []
  DFS(res, root, '')
  return res
```

### 23. 寻找搜索二叉树的错误结点 

给定一棵搜索二叉树，将其中的某两个节点颠倒，求出被颠倒的结点


思路：
1. 对二叉树进行中序遍历，依次出现的节点值会一直升序，如果两个节点值错了，会出现降序
2. 第一个错误节点为第一次降序时较大的节点，第二个错误节点为第二次降序时较小的节点

举例：
`[1,2,3,4,5]` => `[1,5,3,4,2]`或者`[1,3,2,4,5]`

1. 有两次降序的话，第一个错误的节点是大值5，第二个错误的节点是小值2；
2. 只有一次降序的话，第一个错误节点为大值3，第二个错误节点为小值2。


```python
def findError(root):
  temp = []
  inOrder(root, temp)

  flag = 0
  num = []

  for i in range(len(temp) - 1):
    if temp[i] > temp[i + 1] and flag == 0:
      num.append(i)
      flag += 1
    elif temp[i] > temp[i + 1] and flag == 1:
      num.append(i + 1)
      flag += 1
  
  if flag == 1: # 只出现了一次降序
    return temp[num[0] + 1], temp[num[0]]
  elif flag == 2:
    return temp[num[1]], temp[num[0]]


# 中序遍历
def inOrder(root, res):
  if not root: return 
  inOrder(root.left, res)
  res.append(root.val)
  inOrder(root.right, res)
```


### 24. 最大搜索二叉子树

有一棵二叉树，其中所有节点的值都不一样，找到含有节点最多的搜索二叉子树，并返回这棵子树的头节点。
给定二叉树的头结点 `root`，请返回所求的头结点,若出现多个节点最多的子树，返回头结点权值最大的。


以节点 `node`为头的树中，最大的搜索二叉子树只可能来自以下两种情况：
1. 来自 `node` 左子树上的最大搜索二叉子树是以 `node` 左孩子为头的，并且来自 `node` 右子树上的最大搜索二叉子树是以 `node` 右孩子为头的。`node` 左子树上的最大搜索二叉子树的最大值小于 `node` 的节点值，`node` 右子树上的最大搜索二叉子树的最小值大于 `node` 的节点值，那么以节点 `node` 为头的整棵树都是搜索二叉树
2. 如果不满足第一种情况，说明以节点 `node` 为头的树整体不能连成搜索二叉树。这种情况下，以 `node` 为头的树上的最大搜索二叉子树是来自 `node` 的左子树上的最大搜索二叉子树和来自 `node` 的右子树上的最大搜索二叉子树之间，节点数较多的那个。


通过以上分析，求解的具体过程如下：
1. 整体过程是二叉树的后序遍历
2. 遍历到当前节点记为 `cur` 时，先遍历 `cur` 的左子树并收集4个信息，分别是左子树上，最大搜索二叉子树的头节点、节点数、树上最小值和树上最大值。再遍历 `cur` 的右子树收集4个信息，分别是右子树上，最大搜索二叉子树的头节点、节点数、最小值和最大值。
3. 根据步骤2所收集的信息，判断是否满足第一种情况，也就是是否以 `cur` 为头的子树，整体都是搜索二叉树。如果满足第一种情况，就返回 `cur` 节点，如果满足第二种情况，就返回左子树和右子树各自的最大搜索二叉树中，节点数较多的那个树的头节点。
4. 对于如何返回4个信息，可以使用全局变量更新的方式实现。


```python
import sys

def getMaxSubTree(root):
  temp = [0, 0, 0] # 存放最大值、最小值、节点数
  return post(root, temp)


def post(root, temp):
  if not root:
    temp[0] = -sys.maxsize
    temp[1] = sys.maxsize
    temp[2] = 0
    return 

  left_node = post(root.left, temp)
  left_max = temp[0]
  left_min = temp[1]
  left_num = temp[2]

  right_node = post(root.right, temp)
  right_max = temp[0]
  right_min = temp[1]
  right_num = temp[2]

  temp[0] = max(root.val, right_max)
  temp[1] = min(root.val, left_min)

  if left_node == root.left and \
     right_node == root.right and \
     left_max < root.val and \
     root.val < right_min:
    return root
  else:
    temp[2] = max(left_num, right_num)
    return left_node if left_num > right_num else right_node
```


