- [1. 链表](#1-链表)
  - [1.1. 链表的实现](#11-链表的实现)
  - [1.2. 翻转链表](#12-翻转链表)
  - [1.3. K 个一组翻转链表 [Leetcode - 25]](#13-k-个一组翻转链表-leetcode---25)
  - [1.4. 两两交换链表中的节点](#14-两两交换链表中的节点)
  - [1.5. 模拟`git rebase`的第一步，找到最近的公共节点](#15-模拟git-rebase的第一步找到最近的公共节点)

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
def reverseList(head):
  if not head or not head.next: return head
  pre = None
  while head:
    nxt = head.next
    head.next = pre
    pre = head
    head = nxt
  return pre
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
