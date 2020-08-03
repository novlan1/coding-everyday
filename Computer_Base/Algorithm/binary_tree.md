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
### 前序遍历（非递归）
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
### 中序遍历（非递归）
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
### 后序遍历（非递归）
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