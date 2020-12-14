### 1. `documentElement` 和 `body` 的异同点
1. `document`代表的是整个文档(对于一个网页来说包括整个网页结构)；
2. `document.documentElement`是整个文档节点树的根节点，在网页中即`html`标签；
3. `document.body`是整个文档DOM节点树里的`body`节点，网页中即为`body`标签元素。

 

#### 1.1. scrollTop
```js
var scroll = document.documentElement.scrollTop || document.body.scrollTop;
// 或者
var scroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
```
- 在文档使用了DTD时，`document.body.scrollTop`的值为`0`。
  - 此时需要使用`document.documentElement.scrollTop`来获取滚动条滚过的长度；
- 在未使用DTD定义文档时，使用`document.body.scrollTop`获取值。
