- [1. 链表的实现](#1-链表的实现)
- [2. 翻转链表](#2-翻转链表)
- [3. K 个一组翻转链表 [Leetcode - 25]](#3-k-个一组翻转链表-leetcode---25)
- [4. 两两交换链表中的节点](#4-两两交换链表中的节点)
- [5. 模拟`git rebase`的第一步，找到最近的公共节点](#5-模拟git-rebase的第一步找到最近的公共节点)
- [6. 判断两个无环单链表是否相交](#6-判断两个无环单链表是否相交)
- [7. 从尾到头打印链表](#7-从尾到头打印链表)
- [8. 访问单个节点的删除](#8-访问单个节点的删除)
- [9. 打印两个升序链表的公共值](#9-打印两个升序链表的公共值)
- [10. 合并两个排序的链表](#10-合并两个排序的链表)
- [11. 合并 K 个有序的链表](#11-合并-k-个有序的链表)
- [12. 复杂链表的复制](#12-复杂链表的复制)
- [13. 求链表的中间节点](#13-求链表的中间节点)
- [14. 求链表的倒数第 K 个节点](#14-求链表的倒数第-k-个节点)
- [15. 删除链表的倒数第 N 个节点](#15-删除链表的倒数第-n-个节点)
- [16. 判断链表是否为回文](#16-判断链表是否为回文)
- [17. 链表中环的入口结点](#17-链表中环的入口结点)
- [18. 删除链表指定值](#18-删除链表指定值)
- [19. 删除链表中重复的节点](#19-删除链表中重复的节点)
- [20. 两个链表的第一个公共结点](#20-两个链表的第一个公共结点)
- [21. 二叉搜索树转换成排序的双向链表](#21-二叉搜索树转换成排序的双向链表)
- [22. 链表的分化](#22-链表的分化)
- [23. 判断两个有环单链表是否相交](#23-判断两个有环单链表是否相交)
- [24. 判断单链表是否相交](#24-判断单链表是否相交)
- [25. 环形单链表插值](#25-环形单链表插值)

## 1. 链表 <!-- omit in toc -->
### 1. 链表的实现
```python
class Node:
  def __init__(self, val):
    self.val = val
    self.next = None

class LinkedList:
  def __init__(self):
    self.head = None
  
  def add(self, val):
    node = Node(val)
    if not self.head:
      self.head = node
    else:
      head = self.head
      while head.next:
        head = head.next
      head.next = node
```
### 2. 翻转链表
```
输入一个链表，翻转链表后，输出新链表的表头。
1->2->3->4->5->null
5->4->3->2->1->null
```
```python
# 迭代
def reverseList(head):
  # if not head or not head.next: return head
  # 拿掉上面那一句也是一样的

  pre = None
  while head:
    nxt = head.next
    head.next = pre
    pre = head
    head = nxt
  return pre

# 递归
def reverseList2(head):
  if not head or not head.next: return head

  # head->next 此刻指向 head 后面的链表的尾节点
  # head->next-next = head 把 head 节点放在了尾部
  p = reverseList2(head.next)
  head.next.next = head
  head.next = null
  return p
```

### 3. K 个一组翻转链表 [Leetcode - 25]
```
1. 设置一个头结点的前一个节点 hair，设置 tail，含义是指向子链表的尾部，一开始等于 hair。
2. 每k个一组，找到tail的位置，并记下tail.next，设为nxt。
3. 翻转head和tail之间的子链表
4. 翻转完后，将 pre.next 指向子链表新的 head，将 tail.next 指向记录的 nxt。
5. pre 指向 tail，head 指向 tail.next，进行下一次循环。


翻转子链表：
1. 首先要找到 tail.next，记为 prev，让 p(head) 指向 prev，并移动 p。
2. 终止条件是，prev 等于 tail。
```
```python
def reverseK(head, k):
  hair = ListNode(0)
  hair.next = head
  pre = hair
  
  while head:
    tail = pre
    # 查看剩余部分长度是否大于等于 k
    for i in range(k):
      tail = tail.next
      if not tail:
        return hair.next
    nxt = tail.next
    head, tail = reverse(head, tail)
    
    # 把子链表重新接回原链表
    pre.next = head
    tail.next = nxt
    pre = tail
    head = tail.next
    
  return hair.next

# 翻转一个子链表，并且返回新的头与尾
def reverse(head, tail):
  prev = tail.next
  p = head   # 如果不设置p，head 最后就和 tail 一样了。
  
  while prev != tail:
    nxt = p.next
    p.next = prev
    prev = p
    p = nxt
  return tail, head
```


### 4. 两两交换链表中的节点
```
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例: 给定 1->2->3->4, 你应该返回 2->1->4->3.
```
```
node1表示子链表的第1个节点，node2表示子链表的第2个节点，nxt表示node2的下一个节点。
```
```python
def reverseTwo(head):
  hair = ListNode(0)
  hair.next = head
  p = hair
  
  while p.next and p.next.next:
    node1 = p.next
    node2 = node1.next
    nxt = node2.next
    
    node2.next = node1
    node1.next = nxt
    
    p.next = node2
    p = node1
    
  return hair.next
```


### 5. 模拟`git rebase`的第一步，找到最近的公共节点

```js
function getBestCommonAncestor(head, mergeHead) {
  let headList = getList(head, [])
  let mergeHeadList = getList(mergeHead, [])

  const res = {}
  const totalList= [...headList, ...mergeHeadList]

  for (let item of totalList) {
    if (res[item]) {
      return item
    } else {
      res[item] = 1
    }
  }

  // for (let i = 0, len = headList.length; i < len; i++) {
  //   if (mergeHeadList.includes(headList[i])) {
  //     return headList[i]
  //   }
  // }
  return null
}

function getList(head, res) {
  while (head && head.id) {
    res.push(head.id)
    head = head.parent
  }
  return res
}

// test case
const A = { id: 'A', parent: null };
const B = { id: 'B', parent: A };
const C = { id: 'C', parent: B };
const D = { id: 'D', parent: B };
const E = { id: 'E', parent: C };

getBestCommonAncestor(A, B); // A
getBestCommonAncestor(D, E); // B
```


### 6. 判断两个无环单链表是否相交

如果相交最后一个节点必相等，只需要看最后一个节点值是否相等

```python
def chkIntersect(headA, headB):
  if not headA or not headB: return False

  while headA.next:
    headA = headA.next
  while headB.next:
    headB = headB.next

  if headA == headB:
    return True

  return False
```

### 7. 从尾到头打印链表

```python
def printList(node):
  newList = []
  while node:
    newList.insert(0, node.val)
    node = node.next
  return newList
```


### 8. 访问单个节点的删除

实现一个算法，删除单向链表中间的某个结点，假定你只能访问该结点。
给定待删除的节点，请执行删除操作，若该节点为尾节点，返回false，否则返回true

```python
def removeNode(node):
  if not node.next: return False
  node.val = node.next.val
  node.next = node.next.next
  return True
```

### 9. 打印两个升序链表的公共值

谁小就让谁走一个指针，相等就添加到列表中，并且都走一个指针

```python
def findCommonParts(headA, headB):
  res = []
  
  while headA and headB:
    if headA.val < headB.val:
      headA = headA.next
    elif headA.val > headB.val:
      headB = headB.next
    else:
      res.append(headA.val)
      headA = headA.next
      headB = headB.next

  return res
```

### 10. 合并两个排序的链表

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```python
def merge(head1, head2):
  res = head = ListNode(0)

  while head1 and head2:
    if head1.val < head2.val:
      head.next = head1
      head1 = head1.next
    else:
      head.next = head2
      head2 = head2.next

    head = head.next
  head.next = head1 if head1 else head2
  return res.next
```

### 11. 合并 K 个有序的链表

输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6

```python
from heapq import heapify, heappop

def mergeL(lists):
  h = []

  for node in lists:
    while node:
      h.append(node.val)
      node = node.next

  if not h: return None

  heapify(h)

  root = ListNode(heappop(h))
  curNode = root

  while h:
    nextNode = ListNode(heappop(h))
    curNode.next = nextNode
    curNode = nextNode

  return root
```

### 12. 复杂链表的复制

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

递归：

创建新的头结点，random等于原来头结点的random，next为递归的原来的next，这样每个节点保证复制一次（不多不少）

```python
class RandomListNode:
  def __init__(self, x):
    self.label = x
    self.next = None
    self.random = None

def clone(head):
  if not head: return 
  newN = RandomListNode(head.label)
  newN.random = head.random
  newN.next = clone(head.next)
  return newN
```

非递归：

1. 复制每个节点，如：复制节点`A`得到`A1`，将`A1`插入节点`A`后面
2. 遍历链表，`A1->random = A->random->next`;
3. 将链表拆分成原链表和复制后的链表

```python
def clone(head):
  if not head: return 
  cur = head

  while cur:
    newN = RandomListNode(cur.label)
    nxt = cur.next
    cur.next = newN
    newN.next = nxt
    cur = nxt

  cur = head
  
  while cur:
    cur.next.random = cur.random
    cur = cur.next.next
  
  cur = head
  cloneH = cur.next

  while cur:
    newN = cur.next
    nxt = newN.next
    newN.next = nxt.next if nxt else None
    cur.next = nxt
    cur = nxt

  return cloneH
```

### 13. 求链表的中间节点

思路：
1. 两个指针，一块一慢，快指针每次走两步，慢指针每次走一步。
2. fast 或者 fast.next 节点为 None 时，慢指针指向的节点为中间节点

```python
def findMidNode(head):
  if not head: return None
  fast = slow = head

  while fast and fast.next:
    fast = fast.next.next
    slow = slow.next

  return slow
```

### 14. 求链表的倒数第 K 个节点

【思路】：
首先判断链表的长度，判断是否有K个结点。当存在多余K个结点的时候，就用到了链表解决方案中经常使用的方法【运用两个指针，一前一后】。
让一个链表先运动K步，然后同时向前运动，当先运动的指针结点为None的时候，后运动的指针对应的链表结点就是所求的倒数第K个结点。

```python
def findKthToTail(head, k):
  if not head or k <= 0: return 
  p1 = head
  p2 = head

  for i in range(k - 1):
    if not p1.next: return 
    p1 = p1.next

  while p1.next:
    p1 = p1.next
    p2 = p2.next

  return p2
```

### 15. 删除链表的倒数第 N 个节点

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例： 给定一个链表: 1->2->3->4->5, 和 n = 2. 当删除了倒数第二个节点后，链表变为 1->2->3->5.

```python
def removeNthFromEnd(head, n):
  if not head: return 

  fake = ListNode(0)
  fake.next = head

  p = q = fake
  for i in range(n):
    if not q: return 
    q = q.next
  
  while (q.next):
    q = q.next
    p = p.next

  delNode = p.next
  p.next = delNode.next

  return fake.next
```

### 16. 判断链表是否为回文

```
请编写一个函数，检查链表是否为回文。

给定一个链表 ListNode* pHead，请返回一个bool，代表链表是否为回文。

测试样例：

{1,2,3,2,1}
返回：true

{1,2,3,2,3}
返回：false
```

慢指针走一步，快指针走两步，在快指针到尾部之前，将慢指针的值压入到队列中，（注意判断奇数的情况，就是fast有值而fast.next为空，需要让fast=fast.next），然后慢指针继续走，每走一步和队列中弹出的值比较，不相等不是回文

用栈，额外空间复杂度为O(n)，直接用指针可以做到O(1)

快指针走到尾的时候，让慢指针以后的元素逆序，也就是后半部分，然后一个指针从尾部向前，一个指针从头部往后，进行比较。注意最后要让逆序的结点再翻回来。

```python
def isPalindrome(head):
  fast = head
  slow = head
  stack = []

  while fast and fast.next:
    stack.append(slow.val)
    slow = slow.next
    fast = fast.next.next

  # 链表为奇数个时，跳过中间元素
  if fast:
    slow = slow.next
  
  while slow:
    if slow.val != stack.pop():
      return False
    slow = slow.next

  return True
```

### 17. 链表中环的入口结点

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

![链表中环的入口结点](../../../imgs/linked_list_circle_entry.png)

1. 链表起始点到环的入口点距离为`L`，环周长为`R`，环的入口点到快慢指针相遇位置为`X`，红色位置为相遇点
2. 快指针走的距离：`F=L+X+n*R`
3. 慢指针走的距离：`S=L+X`
4. 慢指针一定是走不到一圈就相遇了，最差是在环入口点相遇（表头就是入口，慢指针走了一圈，快指针走了两圈）
5. 关系：
    -  `F=2 * S`
    -  `L+X+n*R = 2 * (L+X)`
    -  `n`等于1时，`L=R-X`，`L`为链表头部到环入口距离，`R-X`是相遇点到环入口距离
6. 第二次让`temp`指针指向头结点，`slow`继续走完剩下的一圈的时候（走了R-X），`temp`指针就走到入口了（走了L）

```python
def entryNodeOfLoop(head):
  if not head or not head.next: return 
  fast = slow = head

  while fast and fast.next:
    fast = fast.next.next
    slow = slow.next
    if slow == fast:
      break
  
  temp = head

  while slow:
    if slow == temp:
      return slow
    slow = slow.next
    temp = temp.next

  return 
```
1. 1个快指针每次走两步，1个慢指针每次走一步，
2. 快指针和慢指针相遇时，找一个tmp指针指向头结点，慢指针继续走，再一次相遇，tmp所在位置是入口节点


### 18. 删除链表指定值
 
删除某值，就是构造链表的过程


```python
def removeElements(head, val):
  # 设置虚拟头结点
  fake = ListNode(0)
  fake.next = head

  cur = fake
  
  while cur.next:
    if cur.next.val == val:
      delNode = cur.next
      cur.next = delNode.next
    else:
      cur = cur.next

  return fake.next
```

### 19. 删除链表中重复的节点

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表`1->2->3->3->4->4->5` 处理后为 `1->2->5`

思路：

1. 首先添加一个头节点，以方便碰到第一个，第二个节点就相同的情况
2. 设置 pre ，last 指针， pre指针指向当前确定不重复的那个节点，而last指针相当于工作指针，一直往后面搜索。


```python
def deleteDuplication(head):
  fake = ListNode(0)
  fake.next = head

  pre = fake
  last = fake
  
  while last:
    if last.next and last.val == last.next.val:
      while last.next and last.val == last.next.val:
        last = last.next
      pre.next = last.next
    else:
      pre = last
    last = last.next

  return fake.next
```

### 20. 两个链表的第一个公共结点

输入两个链表，找出它们的第一个公共结点

```
思路：不需要存储链表的额外空间。也不需要提前知道链表的长度。看下面的链表例子：

0-1-2-3-4-5-null
a-b-4-5-null

代码的if else语句，对于某个指针p1来说，其实就是让它跑了连接好的的链表，长度就变成一样了。

如果有公共结点，那么指针一起走到末尾的部分，也就一定会重叠。看看下面指针的路径吧。

p1： `0-1-2-3-4-5-null`(此时遇到if else)-`a-b-4-5-null`
p2:  `a-b-4-5-null`(此时遇到if else)`0-1-2-3-4-5-null`

因此，两个指针所要遍历的链表就长度一样了！

其实就是两个链表相加 `a+n+b+n`；再一起走 `a+b+n` 步就行

```
```python
def findFirstCommonNode(head1, head2):
  p1, p2 = head1, head2

  while p1 != p2:
    p1 = p1.next if p1 else head2
    p2 = p2.next if p2 else head1

  return p1
```

### 21. 二叉搜索树转换成排序的双向链表

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。


```python
def convert(root):
  s = []
  cur = root
  res = []

  while s or cur:
    if cur:
      s.append(cur)
      cur = cur.left
    else:
     node = s.pop()
     res.append(node)
     cur = node.right

  p = res[0]

  while res:
    top = res.pop(0)
    if res:
      top.right = res[0]
      res[0].left = top

  return p
```

### 22. 链表的分化

```
对于一个链表，我们需要用一个特定阈值完成对它的分化，使得小于等于这个值的结点移到前面，大于该值的结点在后面，同时保证两类结点内部的位置关系不变。

给定一个链表的头结点head，同时给定阈值val，请返回一个链表，使小于等于它的结点在前，大于等于它的在后，保证结点值不重复。

测试样例：
{1,4,2,5},3

{1,2,4,5}
```

```
思路：

遍历的时候，保存三条链表(或者两条)，分别是值小于val、值等于val、值大于val的链表，然后再把它们连起来。
```

```python
def listDivide(head, val):
  # smallTree, smallHead, bigTree, bigHead
  st, sh, bt, bh = None, None, None, None

  while head:
    if head.val <= val：
      if not sh:
        sh = head
      else:
        st.next = head
      st = head

    else:
      if not bh:
        bh = head
      else:
        bt.next = head
      bt = head

    head = head.next

  if st:
    st.next = bh

  return sh if sh else bh
```


### 23. 判断两个有环单链表是否相交

![判断两个有环单链表是否相交](../../../imgs/linked_list_circle_inter.png)

思路：

先找到两个链表各自的入环节点a、b，如果a和b相等，则两个环相交，p等于a.next，沿着环找一圈，看是否有等于b的，有的话就相交。

如果两个有环单链表相交，则环中一定有它们的共同的节点，如果找了一圈没有找到共同节点，就不相交。


```python
def chkInter(head1, head2):
  a, b = findCircle(head1), findCircle(head2)

  p = a.next
  while True:
    if p == b: return True
    if p == a: return False
    p = p.next

# 下面一个函数找到的不一定是入环节点，但一定在环内。
def findCircle(head):
  p = q = head

  while True:
    p, q = p.next, q.next.next
    if p == q: return p
```

### 24. 判断单链表是否相交

三种情况
- 一个有环，一个无环，必不相交
- 都无环
- 都有环


```python
def chkInter(head1, head2):
  if not head1 or not head2: return False

  a, b = findCircle(head1), findCircle(head2)
  if not a and not b: # 都无环
    while head1.next:
      head1 = head1.next
    while head2.next:
      head2 = head2.next
    return head1 == head2

  elif a and b: # 都有环
    p = a.next
    while True:
      if p == b: return True
      if p == a: return False
      p = p.next
      
  return False

def findCircle(head):
  p = q = head
  while p:
    if not p.next: return
    p, q = p.next.next, q.next
    if p == q: return p


  return 
```

### 25. 环形单链表插值

```
有一个整数 val，如何在节点值有序的环形链表中插入一个节点值为 val 的节点，并且保证这个环形单链表依然有序。

给定链表的信息，及元素的值A及对应的 nxt 指向的元素编号同时给定 val，请构造出这个环形链表，并插入该值。

测试样例：
[1,3,4,5,7],[1,2,3,4,0],2

返回：{1,2,3,4,5,7}
```

![环形单链表插值](../../../imgs/linked_list_circle_insert_value.png)

```python
def insertV(A, nxt, val):
  node = ListNode(val)

  if not A: return node

  # 构造环形单链表
  head = ListNode(A[0])
  r = head

  for i in range(len(A) - 1):
    r.next = ListNode(A[nxt[i]])
    r = r.next

  # 若插入节点比头节点小，则它自己作为头节点
  if val < head.val: 
    node.next = head
    return head
  
  # 若插入节点比尾节点大，则它自己作为尾节点，但此时要返回头节点
  if val > r.val:
    r.next = node
    node.next = head
    return head

  pre, cur = head, head.next

  while True:
    if pre.val <= val and cur.val >= val:
      break
    else:
      pre = pre.next
      now = now.next
    
  pre.next = node
  node.next = cur
  
  return head
```