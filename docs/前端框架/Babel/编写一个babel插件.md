## 编写一个babel插件

Babel的原理，简单点说： Babel解析成AST，然后插件更改AST，最后由Babel输出代码（解析->转换->生成，parse->transform->generate）。



**Babel的插件模块需要暴露一个function，function内返回visitor**:

```js
module.export = function(babel){ 
  return { 
    visitor: { } 
  } 
}
```

visitor是对各类型的AST节点做处理的地方，那么我们怎么知道Babel生成了的AST有哪些节点呢？



很简单，你可以把Babel转换的结果打印出来，或者这里有传送门: [AST explorer](https://astexplorer.net/)



下面是一个实例，可以将x = 1 +2 +3，转成 x = 6：

```js
var babel = require('@babel/core');
var t = require('@babel/types');

const visitor = {
  BinaryExpression(path) {
    const node = path.node;
    let result;
    // 判断表达式两边，是否都是数字
    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      // 根据不同的操作符作运算
      switch (node.operator) {
        case "+":
          result = node.left.value + node.right.value;
          break
        case "-":
          result = node.left.value - node.right.value;
          break;
        case "*":
          result = node.left.value * node.right.value;
          break;
        case "/":
          result = node.left.value / node.right.value;
          break;
        case "**":
          let i = node.right.value;
          while (--i) {
            result = result || node.left.value;
            result = result * node.left.value;
          }
          break;
        default:
      }
    }


    // 如果上面的运算有结果的话
    if (result !== undefined) {
      // 把表达式节点替换成number字面量
      path.replaceWith(t.numericLiteral(result));

      let parentPath = path.parentPath;

      // 向上遍历父级节点
      parentPath && visitor.BinaryExpression.call(this, parentPath);
    }
  }
};

module.exports = function (babel) {
  return {
    visitor
  };
}
```

测试一下：



```js
const babel = require("@babel/core");

const result = babel.transform("const result = 1 + 2 + 1 + 1;",{
  plugins:[
    require("./custom_plugin.js")
  ]
});

console.log(result.code); // const result = 5;
```





参考资料：https://juejin.im/post/6844903566809759758