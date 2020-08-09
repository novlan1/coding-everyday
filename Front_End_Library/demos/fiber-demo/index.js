var a1 = { name: 'a1', render: () => [b1, b2, b3] }
var b1 = { name: 'b1', render: () => [c1] }
var b2 = { name: 'b2', render: () => [c2] }
var b3 = { name: 'b3', render: () => [] }
var c1 = { name: 'c1', render: () => [d1] }
var c2 = { name: 'c2', render: () => [] }
var d1 = { name: 'd1', render: () => [d2] }
var d2 = { name: 'd2', render: () => [] }

// walk(a1)

/**
 * 在 React 16 之前，节点之间的关系可以用数据结构中树的深度遍历来表示。
 * 如下实现 walk 函数, 将深度遍历的节点打印出来。
 */
function walk(instance) {
  if (!instance) return
  console.log(instance.name)
  instance.render().map(walk)
}

var FiberNode = function(instance) {
  this.instance = instance
  this.parent = null
  this.sibling = null
  this.child = null
}

var connect = function(parent, childList) {
  parent.child = childList.reduceRight((prev, current) => {
    const fiberNode = new FiberNode(current)
    fiberNode.parent = parent
    fiberNode.sibling = prev
    return fiberNode
  }, null)

  return parent.child
}

// var parent = new FiberNode(a1)
// var childFirst = connect(parent, a1.render())

// 打印日志以及添加列表
var walk = function(node) {
  console.log(node.instance.name)
  const childLists = node.instance.render()
  let child = null
  if (childLists.length > 0) {
    child = connect(node, childLists)
  }
  console.log(child)
  return child
}

var goWalk = function(root) {
  let currentNode = root

  while (true) {
    const child = walk(currentNode)
    // 如果有子节点
    if (child) {
      currentNode = child
      continue
    }

    // 如果没有相邻节点, 则返回到父节点
    while (!currentNode.sibling) {
      currentNode = currentNode.parent
      if (currentNode === root) {
        return
      }
    }

    // 相邻节点
    currentNode = currentNode.sibling
  }
}

// 调用
goWalk(new FiberNode(a1))