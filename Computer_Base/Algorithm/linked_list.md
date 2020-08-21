- [1. 链表](#1-链表)
  - [1.1. 链表的实现](#11-链表的实现)
  - [1.2. 翻转链表](#12-翻转链表)
  - [1.3. K 个一组翻转链表 [Leetcode - 25]](#13-k-个一组翻转链表-leetcode---25)
  - [1.4. 两两交换链表中的节点](#14-两两交换链表中的节点)
  - [1.5. 模拟`git rebase`的第一步，找到最近的公共节点](#15-模拟git-rebase的第一步找到最近的公共节点)
  - [判断两个无环单链表是否相交](#判断两个无环单链表是否相交)
  - [从尾到头打印链表](#从尾到头打印链表)
  - [访问单个节点的删除](#访问单个节点的删除)
  - [打印两个升序链表的公共值](#打印两个升序链表的公共值)
  - [合并两个排序的链表](#合并两个排序的链表)
  - [合并 K 个有序的链表](#合并-k-个有序的链表)
  - [复杂链表的复制](#复杂链表的复制)
  - [求链表的中间节点](#求链表的中间节点)
  - [求链表的倒数第 K 个节点](#求链表的倒数第-k-个节点)
  - [删除链表的倒数第N个节点](#删除链表的倒数第n个节点)
  - [判断链表是否为回文](#判断链表是否为回文)
  - [链表中环的入口结点](#链表中环的入口结点)

## 1. 链表
### 1.1. 链表的实现
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
### 1.2. 翻转链表
```
输入一个链表，翻转链表后，输出新链表的表头。
1->2->3->4->5->null
5->4->3->2->1->null
```
```python
# 迭代
def reverseList(head):
  if not head or not head.next: return head
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

### 1.3. K 个一组翻转链表 [Leetcode - 25]
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
### 1.4. 两两交换链表中的节点
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
    
  return hair.nexts
```


### 1.5. 模拟`git rebase`的第一步，找到最近的公共节点

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


### 判断两个无环单链表是否相交

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

### 从尾到头打印链表

```python
def printList(node):
  newList = []
  while node:
    newList.insert(0, node.val)
    node = node.next
  return newList
```


### 访问单个节点的删除

实现一个算法，删除单向链表中间的某个结点，假定你只能访问该结点。
给定待删除的节点，请执行删除操作，若该节点为尾节点，返回false，否则返回true

```python
def removeNode(node):
  if not node.next: return False
  node.val = node.next.val
  node.next = node.next.next
  return True
```

### 打印两个升序链表的公共值

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

### 合并两个排序的链表

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
  head.next = head1 if head2
  return res.next
```

### 合并 K 个有序的链表

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

### 复杂链表的复制

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

### 求链表的中间节点

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

### 求链表的倒数第 K 个节点

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

### 删除链表的倒数第N个节点

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

### 判断链表是否为回文

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

### 链表中环的入口结点

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

![链表中环的入口结点](../../imgs/linked_list_circle_entry.png)

1. 链表起始点到环的入口点距离为L，环周长为R，环的入口点到快慢指针相遇位置为X，红色位置为相遇点
2. 快指针走的距离：`F=L+X+n*R`
3. 慢指针走的距离：`S=L+X`
4. 慢指针一定是走不到一圈就相遇了，最差是在环入口点相遇（表头就是入口，慢指针走了一圈，快指针走了两圈）
`F=2S`
`L+X+n*R = 2 * (L+X)`，n等于1时，L=R-X，L为链表头部到环入口距离，R-X是相遇点到环入口距离
第二次让temp指针指向头结点，slow继续走完剩下的一圈的时候，temp指针就走到入口了

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


