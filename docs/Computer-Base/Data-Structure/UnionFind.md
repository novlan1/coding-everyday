- [1. 并查集 UnionFind](#1-并查集-unionfind)
	- [1.1. 关于动态连通性](#11-关于动态连通性)
		- [1.1.1. 动态连通性的应用场景](#111-动态连通性的应用场景)
	- [1.2. 对问题建模](#12-对问题建模)
	- [1.3. 对动态连通图（并查集）有几种可能的操作](#13-对动态连通图并查集有几种可能的操作)
	- [1.4. Quick-Find](#14-quick-find)
	- [1.5. Quick-Union](#15-quick-union)
	- [1.6. 路径压缩](#16-路径压缩)


### 1. 并查集 UnionFind

主要两个操作`union`和 `find`
解决动态连通性一类问题

#### 1.1. 关于动态连通性

我们看一张图来了解一下什么是动态连通性：

![动态连通性](/imgs/union_find_dynamic_connection.png) 


假设我们输入了一组整数对，即上图中的(4, 3) (3, 8)等等，每对整数代表这两个`points/sites`是连通的。那么随着数据的不断输入，整个图的连通性也会发生变化，从上图中可以很清晰的发现这一点。同时，对于已经处于连通状态的`points/sites`，直接忽略，比如上图中的(8, 9)。



##### 1.1.1. 动态连通性的应用场景

1. **网络连接判断**：
   如果每个pair中的两个整数分别代表一个网络节点，那么该pair就是用来表示这两个节点是需要连通的。那么为所有的pairs建立了动态连通图后，就能够尽可能少的减少布线的需要，因为已经连通的两个节点会被直接忽略掉。

2. **变量名等同性**(类似于指针的概念)：
   在程序中，可以声明多个引用来指向同一对象，这个时候就可以通过为程序中声明的引用和实际对象建立动态连通图，来**判断哪些引用实际上是指向同一对**象。

 

#### 1.2. 对问题建模

在对问题进行建模的时候，我们应该尽量想清楚需要解决的问题是什么。因为模型中选择的数据结构和算法显然会根据问题的不同而不同，就**动态连通性**这个场景而言，我们需要解决的问题可能是：

1. 给出两个节点，判断它们是否连通，如果连通，**不需要给出具体的路径**
2. 给出两个节点，判断它们是否连通，如果连通，需要给出具体的路径


就上面两种问题而言，虽然只有是否能够给出具体路径的区别，但是这个区别导致了选择算法的不同，本文主要介绍的是第一种情况，即不需要给出具体路径的`Union-Find`算法，而第二种情况可以使用基于`DFS`的算法。


类比一下，二分查找比顺序查找快，因为顺序查找做的事情多，不仅找到了`rank`，还找到了`rank`以前的所有元素



#### 1.3. 对动态连通图（并查集）有几种可能的操作

- **查询节点属于的组`find`**
  - 数组对应位置的值即为组号

- **判断两个节点是否属于同一个组`isConnected`**
  - 分别得到两个节点的组号，然后判断组号是否相等。
  - 用数组表示，`d[i]=3`、`d[j]=3`，组号都为3，就说明它们是互相连接的。

- **连接两个节点，使之属于同一个组`union`**
  - 分别得到两个节点的组号，组号相同时操作结束，不同时，将其中的一个节点的组号换成另一个节点的组号

- **获取组的数目`count`**
  - 初始化为节点的数目，然后每次成功连接两个节点之后，递减1

我们可以设计相应的API：

![并查集API](/imgs/union_find_api.png)


#### 1.4. Quick-Find

`Quickfind`，`find`的时间复杂度为`O(1)`，即返回`A[index]`，很快。
举个例子，比如输入的 Pair 是`(5，9)`，那么首先通过`find`方法发现它们的组号并不相同，然后在`union`的时候通过一次遍历，将组号`1`都改成`8`。当然，由`8`改成`1`也是可以的，保证操作时都使用一种规则就行。

```java
public int find(int p)
	{ return id[p]; }

public void union(int p,int q)
{
  //获得p和q的组号
  int pID = find(p);
  int qID = find(q);
  
  //如果两个组号相等，直接返回
  if(pID == qID) return;
  
  //遍历一次，改变组号使他们属于一个组
  for(inti = 0; i < id.length; i++)
    if(id[i] == pID) id[i] = qID;
    count--;
}
```

对于需要添加新路径的情况，就涉及到对于组号的修改，因为并不能确定哪些节点的组号需要被修改，因此就必须对整个数组进行遍历，找到需要修改的节点，逐一修改，这一下每次添加新路径带来的复杂度就是线性关系了，如果要添加的新路径的数量是`M`，节点数量是`N`，那么最后的时间复杂度就是`MN`


#### 1.5. Quick-Union

为什么以上的解法会造成“牵一发而动全身”？因为每个节点所属的组号都是单独记录，各自为政的，没有将它们以更好的方式组织起来，当涉及到修改的时候，除了逐一通知、修改，别无他法。

如何将节点以更好的方式组织起来，组织的方式有很多种，但是最直观的还是将组号相同的节点组织在一起，想想所学的数据结构，什么样子的数据结构能够将一些节点给组织起来？常见的就是链表，图，树，什么的了。但是哪种结构对于查找和修改的效率最高？毫无疑问是树，因此考虑**如何将节点和组的关系以树的形式表现出来**。

```java
private int find(int p)
{
	//寻找p节点所在组的根节点，根节点具有性质id[root] = root
	while(p != id[p]) p = id[p];
	return p;
}
public void union(int p,int q)
{
	//Give p and q the same root.
	
	int pRoot = find(p);
	int qRoot = find(q);
	if(pRoot == qRoot) return;
	id[pRoot] = qRoot; //将一颗树(即一个组)变成另外一课树(即一个组)的子树
	count--;
```

优化

1. 根据`size`（需要维护一个`size`数组）、`rank`（维护一个`rank`数组）决定谁指向谁，让高度更小，可以更快找到
2. 路径压缩，将层数减少



#### 1.6. 路径压缩

巧妙的实现方式

```java
private int find(int p)
{
	while(p != id[p])
	{
		//将p节点的父节点设置为它的爷爷节点
		id[p] = id[id[p]];
		p = id[p];
	}
	return p;
}
```

路径压缩后的并查集的操作，时间复杂度近乎是`O(1)`的。

这几种算法的时间复杂度如下所示：

| **Algorithm**                                  | **Constructor** | **Union**                  | **Find**                   |
| ---------------------------------------------- | --------------- | -------------------------- | -------------------------- |
| **Quick-Find**                                 | N               | N                          | 1                          |
| **Quick-Union**                                | N               | Tree height                | Tree height                |
| **Weighted Quick-Union**                       | N               | lgN                        | lgN                        |
| **Weighted Quick-Union With Path Compression** | N               | Very near to 1 (amortized) | Very near to 1 (amortized) |

 

参考资料：
1. [并查集(Union-Find)算法介绍](https://blog.csdn.net/dm_vincent/article/details/7655764?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)





