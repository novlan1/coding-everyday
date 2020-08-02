## 虚拟DOM

### 什么是 Vdom？
1. 用JS模拟DOM结构；
2. DOM变化的对比，放在JS层来做（图灵完备语言）；
3. 提高重绘性能。

### 为什么使用 Vdom？
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

### 核心 API
以 `snabbdom`为例，虚拟DOM框架的核心API包括`h`函数和`patch`函数

##### `h`函数
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

##### `patch`函数
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

### Vdom 为何使用 Diff 算法？
1. DOM操作是昂贵的，因此尽量减少DOM操作。
2. 找出本次DOM必须更新的节点来更新，其他的不更新。
3. 这个“找出”的过程，就需要`diff`算法。

### Vdom 的 Diff 算法
- 同层比对。第一层比较，如果第一层有差异，不管下面的DOM是否相同，删除下面的，全部替换。这样减少了DOM比对中的性能损耗，某些情况，比如第二层DOM相同时增加了性能损耗。
- `key`值极大了提升了`Diff`算法性能。不要用`index`做`key`值，是因为`index`值不稳定，比如删掉第一个，后面的`index`都要减1。



