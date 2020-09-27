- [1. 虚拟DOM](#1-虚拟dom)
  - [1.1. 什么是 Vdom？](#11-什么是-vdom)
  - [1.2. 为什么使用 Vdom？](#12-为什么使用-vdom)
  - [1.3. 核心 API](#13-核心-api)
      - [1.3.0.1. `h`函数](#1301-h函数)
      - [1.3.0.2. `patch`函数](#1302-patch函数)
  - [1.4. Vdom 为何使用 Diff 算法？](#14-vdom-为何使用-diff-算法)
  - [1.5. Vdom 的 Diff 算法](#15-vdom-的-diff-算法)
  - [1.6. Diff 算法和调和](#16-diff-算法和调和)
    - [1.6.1. Diff 算法的作用](#161-diff-算法的作用)
    - [1.6.2. 传统 Diff 算法](#162-传统-diff-算法)
    - [1.6.3. React 的 Diff 算法](#163-react-的-diff-算法)
    - [1.6.4. Diff 策略](#164-diff-策略)
    - [1.6.5. tree diff](#165-tree-diff)
    - [1.6.6. element diff](#166-element-diff)


## 1. 虚拟DOM

### 1.1. 什么是 Vdom？
1. 用JS模拟DOM结构；
2. DOM变化的对比，放在JS层来做（图灵完备语言）；
3. 提高重绘性能。

### 1.2. 为什么使用 Vdom？
1. DOM操作很昂贵，js运行效率高。
2. 尽量减少DOM操作，不是推倒重来。项目越复杂，影响就越严重。

```js
// 打印下简单的div，可见其很庞杂
const div = document.createElement('div')
let res = ''

for (let item in div) {
  res += ' | ' + item
}
console.log(res)
```

### 1.3. 核心 API
以 `snabbdom`为例，虚拟DOM框架的核心API包括`h`函数和`patch`函数

##### 1.3.0.1. `h`函数
- `h`函数=>`vnode`的一个结点，JS的一个对象，模拟`dom`结点
- `h`函数第一个参数是结点，第二个参数是属性，第三个参数是子元素（数组或者字符串）
```js
const vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item 1')
  h('li.item', {}, 'Item 2')
])

// 其表示的DOM结构如下：
{
  tag: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['Item 1']
    }, {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['Item 2']
    }
  ]
}
```

##### 1.3.0.2. `patch`函数
1. 把`vnode`全部加到空的容器中
2. 可以对比新的`vnode`和旧的`vnode`，找出所需的最小的改变

```js
const vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item 1')
  h('li.item', {}, 'Item 2')
])

const container = document.getElementById('container')
patch(container, vnode) // 把vnode加到空的容器中

// 模拟改变
const btnChange = document.getElementById('btnChange')
btnChange.addEventListener('click', function() {
  const newVnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 11'),
    h('li.item', {}, 'Item 22'),
    h('li.item', {}, 'Item 33'),
  ])
  patch(vnode, newVnode)
})
```

### 1.4. Vdom 为何使用 Diff 算法？
1. DOM操作是昂贵的，因此尽量减少DOM操作。
2. 找出本次DOM必须更新的节点来更新，其他的不更新。
3. 这个“找出”的过程，就需要`diff`算法。

### 1.5. Vdom 的 Diff 算法
- 同层比对。第一层比较，如果第一层有差异，不管下面的DOM是否相同，删除下面的，全部替换。这样减少了DOM比对中的性能损耗，某些情况，比如第二层DOM相同时增加了性能损耗。
- `key`值极大了提升了`Diff`算法性能。不要用`index`做`key`值，是因为`index`值不稳定，比如删掉第一个，后面的`index`都要减1。



### 1.6. Diff 算法和调和

#### 1.6.1. Diff 算法的作用

计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。

#### 1.6.2. 传统 Diff 算法

通过循环递归对节点进行依次对比，算法复杂度达到 `O(n^3)` ，n是树的节点数，这个有多可怕呢？——如果要展示1000个节点，得执行上亿次比较。。即便是CPU快能执行30亿条命令，也很难在一秒内计算出差异。

#### 1.6.3. React 的 Diff 算法

（1）什么是调和？
将`Virtual DOM`树转换成`actual DOM`树的**最少操作**的过程 称为 调和 。

（2）什么是 React 的`diff`算法？
`diff` 算法是调和的具体实现。

#### 1.6.4. Diff 策略

React用 三大策略 将`O(n^3)`复杂度 转化为 `O(n)`复杂度

（1）策略一（`tree diff`）：
Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

（1）策略二（`component diff`）：
拥有相同类的两个组件 生成相似的树形结构，
拥有不同类的两个组件 生成不同的树形结构。

（1）策略三（`element diff`）：
对于同一层级的一组子节点，通过唯一id区分。

#### 1.6.5. tree diff

（1）React通过updateDepth对Virtual DOM树进行层级控制。
（2）对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
（3）只需遍历一次，就能完成整棵DOM树的比较。

那么问题来了，如果DOM节点出现了跨层级操作,diff会咋办呢？
答：diff只简单考虑同层级的节点位置变换，如果是跨层级的话，只有**创建节点**和**删除节点**的操作。


#### 1.6.6. element diff

Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。

可以使用元素在数组中的下标作为 key。这个策略在元素**不进行重新排序**时比较合适，**如果有顺序修改，diff 就会变得慢**。


参考资料：
1. [diff算法](https://www.jianshu.com/p/3ba0822018cf)

