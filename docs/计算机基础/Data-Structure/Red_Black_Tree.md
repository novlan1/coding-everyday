- [红黑树](#红黑树)
  - [特点和应用](#特点和应用)
  - [左旋和右旋](#左旋和右旋)
  - [插入](#插入)
      - [调整-情况（1）：父节点是红色，叔叔节点（父节点的兄弟节点）是红色的。](#调整-情况1父节点是红色叔叔节点父节点的兄弟节点是红色的)
    - [调整-情况（2）：父节点是红色，叔叔节点是黑色，添加的节点是父节点的左孩子。](#调整-情况2父节点是红色叔叔节点是黑色添加的节点是父节点的左孩子)
    - [调整-情况（3）：父节点是红色，叔叔节点是黑色，添加的节点是父节点的右孩子。](#调整-情况3父节点是红色叔叔节点是黑色添加的节点是父节点的右孩子)
  - [删除](#删除)
      - [调整情况（1）:当前节点是黑色的，且兄弟节点是红色的](#调整情况1当前节点是黑色的且兄弟节点是红色的)
      - [调整情况（2）:当前节点是黑色的，且兄弟节点是黑色的](#调整情况2当前节点是黑色的且兄弟节点是黑色的)
        - [2.1、兄弟节点的两个子节点均为黑色的；](#21兄弟节点的两个子节点均为黑色的)
        - [2.2、兄弟节点的左子节点是红色，右子节点时黑色的；](#22兄弟节点的左子节点是红色右子节点时黑色的)
        - [2.3、兄弟节点的右子节点是红色，左子节点任意颜色；](#23兄弟节点的右子节点是红色左子节点任意颜色)

## 红黑树

### 特点和应用


红黑树特点:

1. 每个节点非红即黑；
1. 根节点总是黑色的；
1. 每个叶子节点都是黑色的空节点（NIL节点）；
1. 如果节点是红色的，则它的子节点必须是黑色的（反之不一定）；
1. 从根节点到叶节点或空子节点的每条路径，必须包含相同数目的黑色节点（即相同的黑色高度）。


红黑树的应用：

TreeMap、TreeSet以及JDK1.8的HashMap底层都用到了红黑树。

为什么要用红黑树？

简单来说红黑树就是**为了解决二叉查找树的缺陷，因为二叉查找树在某些情况下会退化成一个线性结构**。

```js
function Node(key, color, parent, left, right) {
  this.key = key;
  this.color = color;
  this.parent = parent || null;
  this.left = left || null;
  this.right = right || null
}
```
```js
function RBTree() {
  this.root = null
}
```

### 左旋和右旋
左旋：
![左旋](/imgs/red_black_tree_leftRotate.jpg)
```js
/*************对红黑树节点x进行左旋操作 ******************/
/*
 * 左旋示意图：对节点x进行左旋
 *     p                       p
 *    /                       /
 *   x                       y
 *  / \                     / \
 * lx  y      ----->       x  ry
 *    / \                 / \
 *   ly ry               lx ly
 * 左旋做了三件事：
 * 1. 将y的左子节点赋给x的右子节点,并将x赋给y左子节点的父节点(y左子节点非空时)
 * 2. 将x的父节点p(非空时)赋给y的父节点，同时更新p的子节点为y(左或右)
 * 3. 将y的左子节点设为x，将x的父节点设为y
 */
RBTree.prototype.leftRotate = function(x) {
  if (!x) return
  // 1. 将y的左子节点赋给x的右子节点,并将x赋给y左子节点的父节点(y左子节点非空时)
  let y =  x.right
  x.right = y.left
  if (y.left) {
    y.left.parent = x
  }
  // 2. 将x的父节点p(非空时)赋给y的父节点，同时更新p的子节点为y(左或右)
  y.parent = x.parent
  if (x.parent) {
    if (x == x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
  } else {
    this.root = y;
  }
  // 3. 将y的左子节点设为x，将x的父节点设为y
  y.left = x 
  x.parent = y;
}
```

右旋：
![右旋](/imgs/red_black_tree_rightRotate.jpg)

```js
/*************对红黑树节点y进行右旋操作 ******************/
/*
 * 右旋示意图：对节点y进行右旋
 *        p                   p
 *       /                   /
 *      y                   x
 *     / \                 / \
 *    x  ry   ----->      lx  y
 *   / \                     / \
 * lx  rx                   rx ry
 * 右旋做了三件事：
 * 1. 将x的右子节点赋给y的左子节点,并将y赋给x右子节点的父节点(x右子节点非空时)
 * 2. 将y的父节点p(非空时)赋给x的父节点，同时更新p的子节点为x(左或右)
 * 3. 将x的右子节点设为y，将y的父节点设为x
 */
RBTree.prototype.rightRotate = function(y) {
  if (!y) return 
  // 1. 将x的右子节点赋给y的左子节点,并将y赋给x右子节点的父节点(x右子节点非空时)
  x = y.left
  y.left = x.right
  if (x.right){
    x.right.parent = y 
  }
  // 2. 将y的父节点p(非空时)赋给x的父节点，同时更新p的子节点为x(左或右)
  x.parent = y.parent
  if (y.parent) {
    if (y = y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = y;
    }
  }else {
    this.root = x;
  }
  //3. 将x的右子节点设为y，将y的父节点设为x
  x.right = y;
  y.parent = x;
}
```
### 插入

```js
/*********************** 向红黑树中插入节点 **********************/
/**
 * 1、将节点插入到红黑树中，这个过程与二叉搜索树是一样的
 * 2、将插入的节点着色为"红色"；将插入的节点着色为红色，不会违背"特性5"！
 *    少违背了一条特性，意味着我们需要处理的情况越少。
 * 3、通过一系列的旋转或者着色等操作，使之重新成为一颗红黑树。
 */
RBTree.prototype.insert = function(key) {
  let node = new Node9(key, 'black', null, null,null)
  let current = null // node的父节点
  let x = root;
  while (x) {
    current = x;
    const cmp = key - x.key;
    if (cmp < 0) {
        x = x.left
    } else {
        x = x.right
    }
  }

  // 找到位置，将当前current作为node的父节点
  node.parent = current

  // 接下来判断node是插在左子节点还是右子节点
  if (current) {
    const cmp = key - current.key
    if (cmp < 0) {
      current.left = node;
    } else {
      current.right = node;
    }
    node.color = 'red'
    insertFixUp(node)
  } else {
    this.root = node;
  }
}
```

因为左右子树的操作是对称的，我们下边讲述需要添加的节点的父节点是祖父节点的左孩子的情况，右子树添加与其相反。

1. 如果我们添加的【红色节点】的【父节点】是黑色，那么树不需要做调整。
2. 如果我们添加的【红色节点】的【父节点】是红色，那么树需要做调整。
    - 2.1 父节点是红色，叔叔节点（父节点的兄弟节点）是红色的。
    - 2.2 父节点是红色，叔叔节点是黑色，添加的节点是父节点的左孩子。
    - 2.3 父节点是红色，叔叔节点是黑色，添加的节点是父节点的右孩子。

##### 调整-情况（1）：父节点是红色，叔叔节点（父节点的兄弟节点）是红色的。
下图是这样情况的红黑树的修改过程（上边是目标节点为左孩子，下边是目标节点是右孩子）：


![插入](/imgs/red_black_tree_insert.png)

为了新添加的节点也满足特性4:

1. 将父节点和叔叔节点全部染成黑色（节点T满足了特性四），但是这样父亲和叔叔节点的分支都多了一个黑色；
2. 将祖父节点染成红色，这样祖父节点的两个分支满足了所有特性，但是我们需要检验祖父节点是否符合红黑树的特性；
3. 将祖父节点当前插入节点，继续向树根方向进行修改；

这样我们一直向上循环，直到父节点变为黑色，或者达到树根为止。

#### 调整-情况（2）：父节点是红色，叔叔节点是黑色，添加的节点是父节点的左孩子。
下图是这样情况的红黑树的修改过程:

![插入](/imgs/red_black_tree_insert2.png)

我们通过将祖父节点的左孩子分支上的连续两个红色节点，转移一个插入到祖父节点和他的右孩子之间（保证左边没有两个连续红点、右边插入的红点满足所有特性）。

1. 先将父节点染成黑色；
2. 将祖父节点染成红色；
3. 将父节点进行右旋；

我们仅仅通过以上3个步骤就调整完使整个红黑树的节点满足5个特性。

#### 调整-情况（3）：父节点是红色，叔叔节点是黑色，添加的节点是父节点的右孩子。
下图是这样情况的红黑树的修改过程:

![插入](/imgs/red_black_tree_insert3.png)

我们父节点进行左旋操作，这样就变成了调整-情况（2）的状态，然后再按照其调整操作继续进行调整。

通过以上三个情况对红黑树的调整，我们可以解决红黑树插入红色节点中的所有问题。

```js
function isRed(node) {
  return node && node.color === "red";
}
function isBlack(node) {
  return node && node.color === "black";
}

RBTree.prototype.insertFixUp = function(node) {
  let parent;
  let gparent;

  // 需要修整的条件：父节点存在，且父节点的颜色是红色
  while ((parent = node.parent) && isRed(parent)) {
    gparent = parent.parent;

    // 若父节点是祖父节点的左子节点
    if (parent == gparent.left) {
      let uncle = gparent.right;
      // case1: 叔叔节点是红色
      if (uncle && isRed(uncle)) {
        // 把父亲和叔叔节点涂黑色
        parent.color = "black";
        uncle.color = "black";
        // 把祖父节点涂红色
        gparent.color = "red";
        // 将位置放到祖父节点
        node = gparent;
        // 继续往上循环判断
        continue;
      }

      // case2：叔叔节点是黑色，且当前节点是右子节点
      if (node === parent.right) {
        //从父亲节点处左旋
        leftRotate(parent)
        // 将父节点和自己调换一下，为右旋做准备
        [(parent, node)] = [node, parent];
      }

      // case3：叔叔节点是黑色，且当前节点是左子节点
      parent.color = "black";
      gparent.color = "red";
      rightRotate(gparent);
    } else {
      // 若父亲节点是祖父节点的右子节点，与上面的完全相反，本质一样的
      let uncle = gparent.left;
      // case1:叔叔节点也是红色
      if (uncle && isRed(uncle)) {
        parent.color = "black";
        uncle.colro = "black";
        gparent.color = "red";
        node = gparent;
        continue;
      }

      // case2: 叔叔节点是黑色的，且当前节点是左子节点
      if (node === parent.left) {
        rightRotate(parent)[(parent, node)] = [node, parent];
      }

      // case3: 叔叔节点是黑色的，且当前节点是右子节点
      parent.color = "black";
      gparent.color = "red";
      leftRotate(gparent);
    }
  }
  this.root.color = "black";
}
```

### 删除

二叉搜索树节点删除的思路
- 如果要删除的节点正好是叶子节点，直接删除就 Ok 了；
- 如果要删除的节点还有子节点，就需要建立父节点和子节点的关系：
  - 如果只有左孩子或者右孩子，直接把这个孩子上移放到要删除的位置就好了；
  - 如果有两个孩子，就需要选一个合适的孩子节点作为新的根节点，该节点称为 继承节点。（新节点要求比所有左子树要大、比右子树要小，我们可以选择左子树中的最大节点，或者选择右子树中的最小的节点。）


```js
/*********************** 删除红黑树中的节点 **********************/
/**
 * 1、被删除的节点没有儿子，即删除的是叶子节点。那么，直接删除该节点。
 * 2、被删除的节点只有一个儿子。那么直接删除该节点，并用该节点的唯一子节点顶替它的初始位置。
 * 3、被删除的节点有两个儿子。那么先找出它的后继节点（右孩子中的最小的，该孩子没有子节点或者只有一个右孩子）。
 *    然后把"它的后继节点的内容"复制给"该节点的内容"；之后，删除"它的后继节点"。
 *    在这里后继节点相当与替身，在将后继节点的内容复制给"被删除节点"之后，再将后继节点删除。
 *    ------这样问题就转化为怎么删除后继即节点的问题？
 *    在"被删除节点"有两个非空子节点的情况下，它的后继节点不可能是双子都非空。
 *    注：后继节点为补充被删除的节点；
 *    即：意味着"要么没有儿子，要么只有一个儿子"。
 *    若没有儿子，则回归到（1）。
 *    若只有一个儿子，则回归到（2）。
 */
function remove(node) {
    let child
    let parent
    // 1、删除的节点的左右孩子都不为空
    if (node.left && node.right) {
        // 先找到被删除节点的后继节点，用它来取代被删除节点的位置
        let replace = node;
        // 1).获取后继节点[右孩子中的最小]
        replace = replace.right
        while (replace.left) {
            replace = replace.left
        }
        // 2).处理【后继节点】和【被删除节点的父节点】之间的关系
        if (node.parent ){
            // 要删除的节点不是根节点
            if (node === node.parent.left){
                node.parent.left = replace
            } else {
                node.parent.right = replace
            }
        } else {
            root = replace
        }
        // 3).处理【后继节点的子节点】和【被删除节点的子节点】之间的关系
        // 后继节点肯定不存在左子节点
        child = replace.right
        parent = replace.parent
        // 保存后继节点的颜色
        color = replace.color
        // 后继节点的父节点是被删除的节点
        if (parent == node) {
            parent = replace
        } else {
            if (child) {
                child.parent = parent
            }
            parent.left = child
            replace.right = node.right
            node.right.parent = replace
        }
        replace.parent = node.parent
        replace.color = node.color
        replace.left = node.left
        node.left.parent = replace

        // 4。如果移走的后继节点颜色是黑色，重新修正红黑树
        if (color === 'black') {
            removeFixup(child, parent)
        }
        node = null
    } else {
        // 被删除的节点是叶子节点，或者只有一个孩子
        if (node.left) {
            child = node.left
        } else {
            child = node.right
        }
        parent = node.parent
        // 保存"取代节点"的颜色
        color = node.color
        if (child) {
            child.parent = parent
        }
        // "node节点"不是根节点
        if (parent) {
            if (parent.left == node) {
                parent.left = child;
            } else {
                parent.right = child
            }
        } else {
            this.root = child
        }
        if (color === 'black') {
            removeFixUp(child, parent)
        }
        node = null
    }
}
```
删除操作首先需要做的也是BST的删除操作，删除操作会删除对应的节点，如果是叶子节点就直接删除，如果是非叶子节点，会用对应的中序遍历的后继节点来顶替要删除节点的位置。删除后就需要做删除修复操作，使的树符合红黑树的定义，符合定义的红黑树高度是平衡的。

删除修复操作在遇到被删除的节点是红色节点或者到达root节点时，修复操作完毕。

删除修复操作是针对删除黑色节点才有的，当黑色节点被删除后会让整个树不符合RBTree的定义的第四条。需要做的处理是从兄弟节点上借调黑色的节点过来，如果兄弟节点没有黑节点可以借调的话，就只能往上追溯，将每一级的黑节点数减去一个，使得整棵树符合红黑树的定义。

删除操作的总体思想是从兄弟节点借调黑色节点使树保持局部的平衡，如果局部的平衡达到了，就看整体的树是否是平衡的，如果不平衡就接着向上追溯调整。

下边我们讨论一下节点的颜色情况：因为当前节点的颜色一定是黑色的，我们只根据兄弟节点的颜色做讨论。

1. 当前节点是黑色的，且兄弟节点是红色的（那么父节点和兄弟节点的子节点肯定是黑色的）；
2. 当前节点是黑色的，且兄弟节点是黑色的，
   - 2.1 兄弟节点的两个子节点均为黑色的；
   - 2.2 兄弟节点的左子节点是红色，右子节点时黑色的；
   - 2.3 兄弟节点的右子节点是红色，左子节点任意颜色；



##### 调整情况（1）:当前节点是黑色的，且兄弟节点是红色的
下图是这样情况的红黑树的修改过程：

![删除](/imgs/red_black_tree_delete.png)

将父节点涂红，将兄弟节点涂黑，然后将当前节点的父节点进行支点左旋。这样就会转化为情况2中的某种状态。

##### 调整情况（2）:当前节点是黑色的，且兄弟节点是黑色的

###### 2.1、兄弟节点的两个子节点均为黑色的； 
下图是这样情况的红黑树的修改过程：

![删除](/imgs/red_black_tree_delete3.png)

将兄弟节点涂红，将当前节点指向其父节点，将其父节点指向当前节点的祖父节点，继续往树根递归判断以及调整；

###### 2.2、兄弟节点的左子节点是红色，右子节点时黑色的；

下图是这样情况的红黑树的修改过程：

![删除](/imgs/red_black_tree_delete2.png)

把当前节点的兄弟节点涂红，把兄弟节点的左子节点涂黑，然后以兄弟节点作为支点做右旋操作。

###### 2.3、兄弟节点的右子节点是红色，左子节点任意颜色；

下图是这样情况的红黑树的修改过程：

![删除](/imgs/red_black_tree_delete4.png)

把兄弟节点涂成父节点的颜色，再把父节点涂黑，把兄弟节点的右子节点涂黑，然后以当前节点的父节点为支点做左旋操作。


如果是从case:1开始发生的，可能case:2，3，4中的一种：如果是case:2，就不可能再出现case:3和4；如果是case:3，必然会导致case:4的出现；如果case:2和3都不是，那必然是case:4。
```js
/**
 * 红黑树删除修正函数
 *
 * 在从红黑树中删除插入节点之后(红黑树失去平衡)，再调用该函数；
 * 目的是将它重新塑造成一颗红黑树。
 * 如果当前待删除节点是红色的，它被删除之后对当前树的特性不会造成任何破坏影响。
 * 而如果被删除的节点是黑色的，这就需要进行进一步的调整来保证后续的树结构满足要求。
 * 这里我们只修正删除的节点是黑色的情况：
 *
 * 调整思想：
 * 为了保证删除节点的父节点左右两边黑色节点数一致，需要重点关注父节点没删除的那一边节点是不是黑色。
 * 如果删除后父亲节点另一边比删除的一边黑色多，就要想办法搞到平衡。
 * 1、把父亲节点另一边（即删除节点的兄弟树）其中一个节点弄成红色，也少了一个黑色。
 * 2、或者把另一边多的节点（染成黑色）转过来一个
 *
 * 1）、当前节点是黑色的，且兄弟节点是红色的（那么父节点和兄弟节点的子节点肯定是黑色的）；
 * 2）、当前节点是黑色的，且兄弟节点是黑色的，且兄弟节点的两个子节点均为黑色的；
 * 3）、当前节点是黑色的，且兄弟节点是黑色的，且兄弟节点的左子节点是红色，右子节点时黑色的；
 * 4）、当前节点是黑色的，且兄弟节点是黑色的，且兄弟节点的右子节点是红色，左子节点任意颜色。
 *
 * 以上四种情况中，2，3，4都是（当前节点是黑色的，且兄弟节点是黑色的）的子集。
 *
 * 参数说明：
 * @param node 删除之后代替的节点（后序节点）
 * @param parent 后序节点的父节点
 */
function removeFixUp(node, parent) {
  let other;
  let root;
  while ((!node || node.color === "black") && node !== root) {
    if (parent.left === node) {
      other = parent.right;
      if (other.color == "red") {
        //case 1：x的兄弟w是红色的【对应状态1，将其转化为2，3，4】
        other.color = "black";
        parent.color = "red";
        leftRotate(parent);
        other = parent.right;
      }
      if (
        (!other.left || other.left.color === "black") &&
        (!other.right || other.right.color === "black")
      ) {
        //case 2：x的兄弟w是黑色，且w的两个孩子都是黑色的【对应状态2，利用调整思想1网树的根部做递归】
        other.color = "red";
        node = parent;

        parent = node.parent;
      } else {
        if (!other.right || other.right.color === "black") {
          //case 3:x的兄弟w是黑色的，并且w的左孩子是红色的，右孩子是黑色的【对应状态3，调整到状态4】
          other.left.color = "black";
          other.color = "red";
          rightRotate(other);
          other = parent.right;
        }
        //case 4:x的兄弟w是黑色的；并且w的右孩子是红色的，左孩子任意颜色【对应状态4，利用调整思想2做调整】
        other.color = parent.color;
        parent.color = "black";
        other.right.color = "black";
        leftRotate(parent);
        node = root;
        break;
      }
    } else {
      other = parent.left;
      if (other.color === "red") {
        //case 1:x的兄弟w是红色的
        other.color = "black";
        parent.color = "red";
        rightRotate(parent);
        other = parent.left;
      }
      if (
        (!other.left || other.left.color === "black") &&
        (!other.right || other.right.color === "black")
      ) {
        //case 2:x兄弟w是黑色，且w的两个孩子也都是黑色的
        other.color = "red";
        node = parent;
        parent = node.parent;
      } else {
        if (!other.left || other.left.color === "black") {
          //case 3:x的兄弟w是黑色的，并且w的左孩子是红色，右孩子为黑色。
          other.right.color = "black";
          other.color = "red";
          leftRotate(other);
          other = parent.left;
        }
        //case 4:x的兄弟w是黑色的；并且w的右孩子是红色的，左孩子任意颜色。
        other.color = parent.color;
        parent.color = "black";
        other.left.color = "black";
        rightRotate(parent);
        node = root;
        break;
      }
    }
  }
  if (node) {
    node.color = "black";
  }
}
```

参考资料：
1. [寻找红黑树的操作手册](http://dandanlove.com/2018/03/18/red-black-tree/)
2. [漫画：什么是红黑树？](https://juejin.im/post/6844903519632228365#comment)