- [1. DOM是哪种基本数据结构](#1-dom是哪种基本数据结构)
- [2. DOM 事件级别](#2-dom-事件级别)
- [3. DOM 事件模型](#3-dom-事件模型)
- [4. DOM 事件流](#4-dom-事件流)
- [5. 描述 DOM 事件捕获的具体流程](#5-描述-dom-事件捕获的具体流程)
- [6. Event 对象常见应用](#6-event-对象常见应用)
- [7. 自定义事件](#7-自定义事件)
- [8. IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？](#8-ie-与火狐的事件机制有什么区别-如何阻止冒泡)
- [9. DOM 操作——怎样添加、移除、移动、复制、创建和查找节点?](#9-dom-操作怎样添加移除移动复制创建和查找节点)
- [10. `documen.write` 和 `innerHTML` 的区别](#10-documenwrite-和-innerhtml-的区别)
- [11. `window` 对象 与 `document` 对象](#11-window-对象-与-document-对象)
- [12. 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”](#12-区分什么是客户区坐标页面坐标屏幕坐标)
- [13. `focus/blur` 与 `focusin/focusout` 的区别与联系](#13-focusblur-与-focusinfocusout-的区别与联系)
- [14. mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系](#14-mouseovermouseout-与-mouseentermouseleave-的区别与联系)
- [15. onclick 与 addEventListener 区别？](#15-onclick-与-addeventlistener-区别)
- [16. DOM节点的Attribute和property有何区别？](#16-dom节点的attribute和property有何区别)

### 1. DOM是哪种基本数据结构
1. DOM，`Document Object Model`，文档对象模型 
2. DOM 的本质 => 树结构
3.  DOM可以理解为：浏览器把拿到的HTML代码，结构化为一个浏览器能识别并且js可以操作的一个模型而已


### 2. DOM 事件级别

- DOM0
  - `onXXX` 类型的定义事件
  - **`element.onclick = function(e) { ... }`**
- DOM2
  - **`addEventListener` 方式**
  - `element.addEventListener('click', function (e) { ... })`
  - `btn.removeEventListener('click', func, false)`
  - `btn.attachEvent("onclick", func);`
  - `btn.detachEvent("onclick", func);`
- DOM3
  - 增加了很多事件类型
  - **`element.addEventListener('keyup', function (e) { ... })`**
  - `eventUtil` 是自定义对象，`textInput` 是 DOM3 级事件

### 3. DOM 事件模型
![DOM 事件模型](/imgs/dom_event_model.jpg)

捕获从上到下， 冒泡从下到上。 **先捕获，再到目标，再冒泡** 

### 4. DOM 事件流

DOM 标准采用捕获+冒泡。两种事件流都会触发 DOM 的所有对象，从 window 对象开始，也在 window 对象结束。

DOM 标准规定事件流包括三个阶段：

- 事件**捕获阶段**
- 处于**目标阶段**
- 事件**冒泡阶段**

### 5. 描述 DOM 事件捕获的具体流程

从 `window` -> `document` -> `html` -> `body` -> ... -> 目标元素

### 6. Event 对象常见应用

- `event.target`
  - **触发事件**的元素
- `event.currentTarget`
  - **绑定事件**的元素
- `event.preventDefault()`
  - 阻止默认行为
  - `event.cancelBubble()`和 `event.preventBubble` 都已经废弃
- `event.stopPropagation()`
  - 阻止在捕获阶段或冒泡阶段继续传播，而不是阻止冒泡
- `event.stopImmediatePropagation()`
  - 阻止事件冒泡并且阻止相同事件的其他侦听器被调用。


### 7. 自定义事件

- Event
- CustomEvent

CustomEvent 不仅可以用来做自定义事件，还可以在后面跟一个 object 做参数

```js
var evt = new Event("myEvent");

someDom.addEventListener("myEvent", function () {
  //处理这个自定义事件
});

someDom.dispatchEvent(evt);
```

### 8. IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？

IE 只事件冒泡，不支持事件捕获；火狐同时支持件冒泡和事件捕获。

阻止冒泡：

- 取消默认操作
  - w3c 的方法是 `e.preventDefault()`
  - IE 则是使用 `e.returnValue = false;`
- 阻止冒泡
  - w3c 的方法是`e.stopPropagation()`
  - IE 则是使用 `e.cancelBubble = true`
- `return false`
  - javascript 的 `return false` 只会**阻止默认行为**
  - **用 jQuery 的话则既阻止默认行为又防止对象冒泡。**
  
```js
function stopHandler(event)
  window.event
  ? window.event.cancelBubble = true
  : event.stopPropagation();
}
```

### 9. DOM 操作——怎样添加、移除、移动、复制、创建和查找节点?

创建新节点

- `createDocumentFragment()` //创建一个 DOM 片段
- `createElement()` //创建一个具体的元素
- `createTextNode()` //创建一个文本节点

添加、移除、替换、插入

- `appendChild()`
- `removeChild()`
- `replaceChild()`
- `insertBefore()` //在已有的子节点前插入一个新的子节点

查找

- `getElementsByTagName()` //通过标签名称
- `getElementsByName()` // 通过元素的 `Name` 属性的值(IE 容错能力较强，会得到一个数组，其中包括 id 等于 name 值的)
- `getElementById()` //通过元素 Id，唯一性

### 10. `documen.write` 和 `innerHTML` 的区别

- `document.write` 只能重绘整个页面
- `innerHTML` 可以重绘页面的一部分

### 11. `window` 对象 与 `document` 对象

window

- Window 对象表示当前浏览器的窗口，是 JavaScript 的顶级对象。
- 我们创建的所有对象、函数、变量都是 Window 对象的成员。
- Window 对象的方法和属性是在全局范围内有效的。

document

- Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）
- Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问
- Document 对象是 Window 对象的一部分，即 window.document

### 12. 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”

- 客户区坐标
  - 鼠标指针在可视区中的水平坐标(`clientX`)和垂直坐标(`clientY`)
- 页面坐标
  - 鼠标指针在页面布局中的水平坐标(`pageX`)和垂直坐标(`pageY`)
- 屏幕坐标
  - 设备物理屏幕的水平坐标(`screenX`)和垂直坐标(`screenY`)

### 13. `focus/blur` 与 `focusin/focusout` 的区别与联系

1. `focus/blur` 不冒泡，`focusin/focusout` 冒泡
2. `focus/blur` 兼容性好，`focusin/focusout` 在除 FireFox 外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在 FireFox 下使用事件捕获 `elem.addEventListener('focus', handler, true)`

### 14. mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系

1. mouseover/mouseout 是标准事件，**所有浏览器都支持**；mouseenter/mouseleave 是 IE5.5 引入的特有事件后来被 DOM3 标准采纳，现代标准浏览器也支持
2. mouseover/mouseout 是**冒泡**事件；mouseenter/mouseleave**不冒泡**。需要为**多个元素监听鼠标移入/出事件时，推荐 mouseover/mouseout 托管，提高性能**
3. 标准事件模型中 `event.target` 表示发生移入/出的元素,**event.relatedTarget**对应移出/如元素；在老 IE 中 `event.srcElement` 表示发生移入/出的元素，**event.toElement**表示移出的目标元素，**event.fromElement**表示移入时的来源元素


### 15. onclick 与 addEventListener 区别？

1. `onclick`事件在同一时间**只能指向唯一对象**。就算对于一个对象**绑定了多次**，但是仍然只会**执行最后的一次绑定**。
2. `addEventListener` 给一个事件**注册多个listener**
3. `addEventListener` 对任何DOM都是有效的，而 `onclick` 仅限于HTML
4. `addEventListener` 可以控制 `listener` 的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用 `removeEventListener` 清除
5. IE9使用 `attachEvent` 和 `detachEvent`

。


### 16. DOM节点的Attribute和property有何区别？
1. property只是一个**JS对象的属性**的修改（如`nodeType/nodeName/classList`）
2. attribute是对 **html标签属性**的修改

以下是property：
```js
var pList = document.querySelectAll('p')
var p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' // 修改样式

console.log(p.className) // 获取class
p.className = 'p1' // 修改class

// 获取nodeName和nodeType
console.log(p.nodeName)
console.log(p.nodeType)
```

以下是attribute：
```js
var pList = document.querySelectAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'mike')

p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px;')
```

attribute：
```html
<li class='item'>
  <a href='' class='mock-link'>
    <img src='img/mock.png' alt='mock' style='' />
  </a>
</li>
```



