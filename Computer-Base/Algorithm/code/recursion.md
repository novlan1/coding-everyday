

## 递归

### 返回过滤后的数据结构(面试题)
```js
/*
其中树形结构的格式如下：

tree = [
    {name: 'A'},
    {name: 'B', children: [
        {name: 'A'},
        {name: 'AA', children: [...]}
    ]},
    {name: 'C'}
]

1. 假设我输入的 str 为 A 则过滤后返回的结果为
[
    {name: 'A'},
    {name: 'B', children: [
        {name: 'A'}
    ]}
]

2. 假设我输入的 str 为 AA 则过滤后返回的结果为
[
    {name: 'B', children: [
        {name: 'AA', children: [...]}
    ]}
]

3. 假设我输入的 str 为 B 则过滤后返回的结果为
[
    {name: 'B', children: [
        {name: 'A'},
        {name: 'AA', children: [...]}
    ]}
]
*/
```

```js
function filter(tree, str) {
  let newTree = []
  fn(tree, newTree, str)
  return newTree
}

function fn(tree, newTree, str) {
  for (let item of tree) {
    if (item.name === str) {
      newTree.push(item)
    } else if (Array.isArray(item.children)) {
        let temp = []
        fn(item.children, temp, str)
        if (temp.length) {
          newTree.push(Object.assign(item, { children: temp }))
        }
        
      }
  }
  return newTree
}

const tree = [
  { name: 'A' },
  {
    name: 'B', children: [
      { name: 'A' },
      { name: 'C', children: [
        { name : 'AA'}
      ] }
    ]
  },
  { name: 'C' }
]

filter(tree, 'AA')
```