### 1. Eslint插件和Babel插件的区别

Eslint 的 AST 记录了所有的 token，token 中有行列号信息，而且 AST 中也保存了 range，也就是当前节点的开始结束位置。并且还提供了 SourceCode 的 api 可以根据 range 去查询 token。这是它能实现格式检查的原因。


Babel 其实也支持 range 和 token，但是却没有提供根据 range 查询 token 的 api，这是它不能做格式检查的原因。

### 2. iota

iota  美`[aɪˈoʊtə]`. n. 极少量; 微量; 希腊字母表的第9个字母

### 3. `typescript-eslint/parser`

`typescript-eslint/parser` 版本在4.19时，对`member-ordin`g判断有错误，需升级到最新版本。


```js
/**
 * 指定类成员的排序规则
 * @reason 优先级：
 * 1. static > instance
 * 2. field > constructor > method
 * 3. public > protected > private
 */
"public-static-field",
"protected-static-field",
"private-static-field",
"static-field",
"public-static-method",
"protected-static-method",
"private-static-method",
"static-method",
"public-instance-field",
"protected-instance-field",
"private-instance-field",
"public-field",
"protected-field",
"private-field",
"instance-field",
"field",
"constructor",
"public-instance-method",
"protected-instance-method",
"private-instance-method",
"public-method",
"protected-method",
"private-method",
"instance-method",
"method"
```

### 4. `+new Date()`

```js
Date.now() === +new Date()
```

### 5. 今日零点

```js
const date = new Date();
const stamp = date.setHours(0, 0, 0, 0);
// 今日零点
```

### 6. 顶层设计

一开始要设计好，否则一开始乱了，后面就没法收拾了


### 7. 处理数据

前端大部分时间的工作是处理数据、展示，其中处理数据花了大量的时间。

数据驱动，而不是罗列！

### 8. UI和逻辑分离

甚至写代码也要有远见，逻辑和UI分离，指不定哪天，这套逻辑就要复用到其他端上，或者UI大变样。

能抽组件就抽组件，不要把某个文件搞得很大。

### 9. JS对象实现链表

root.next 一直变化，但root没变。


```js
// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function test() {
  const root = new ListNode(0)
  let cursor = root;

  cursor.next = sumNode;
  cursor = sumNode
}
```


### 10. vscode 插件发布 

```
vsce login novlan1 
```

如果想让发布之后版本号的patch自增，例如：1.0.2 -> 1.0.3，可以这样：

```
vsce publish patch
```

### 11. VSCode 查看定义后返回



- Windows: Alt + '-' （有的是 Alt + ‘←’）
- Ubuntu: Ctrl + Alt + '-'
- Mac: control + '-'

目前已经改成 Alt + Shift + 2，方便左手操作。

### 12. 项目中请求接口的抽象


返回一个函数，该函数执行后返回一个promise。

比如：
```ts
export function checkCertification({
  childId,
  gid,
  actid,
}) {
  return new Promise((resolve, reject) => {
    post({
      url: '/matchcgi/matchdata/CheckCertificate',
      showMsgToast: false,
      reqData: {
        gid,
        actid,
        childid: childId ? +childId : undefined,
      },

    }).then((resp) => {
      if (resp.data && resp.data.r != 0) {
        reject();
      } else {
        resolve(resp);
      }
    })
      .catch((err) => {
        reject(err);
      });
  });
}
```

可以提取一个公共函数`makeRequest`

```ts
export function makeRequest({
  showMsgToast: false,
  reqData,
  url,
}) {
  return new Promise((resolve, reject) => {
    post({
      url,
      showMsgToast,
      reqData
    }).then((resp) => {
      if (resp.data && resp.data.r != 0) {
        reject();
      } else {
        resolve(resp);
      }
    })
      .catch((err) => {
        reject(err);
      });
  });
}
```

然后可以这样使用：


```js
export function checkCertification({
  childId,
  gid,
  actid,
}) {
  return makeRequest({
    url: '/matchcgi/matchdata/CheckCertificate',
    showMsgToast: false,
    reqData: {
      gid,
      actid,
      childid: childId ? +childId : undefined,
    },
  })
}
```


### 13. 赛程

- 分组： 1 2 4 6 ...
- 决胜方式，就是设置BO数，比如BO1 BO3等
- 开赛方式，就是设置定时开赛、人满开赛

小组赛所有轮次BO都是一定的，从上面进入；淘汰赛每轮BO可以单独指定。




### 14. Module组件整理

整理一个可拖拽的`module`组件，无非是将`methods`都融合进`props`，注意在组件中绑定下`this`


不要在`columns`中的方法中写`console.log(this)`，报错`toJSON`未定义。

### 15. 架构设计

如果需求永远不会变化，那么所有的架构设计都是没有必要的。不管代码有多乱，毕竟只要功能可以运行，线上没有bug就可以了。就像一个再也不会去住的房子，我们自然也不会关心房子里面的旧家具摆的有多凌乱，

进行架构设计的唯一目的是：当需求变化来临时，我们希望付出尽可能小的代价就能满足这些需求的变化。


工具栏、sheetbar、右键菜单这些组件，依赖的并非登录这个UI组件，它们实际上依赖的是文档的权限状态，我们更好的做法是引入权限模块，让其他需要根据权限变更发生变化的组件，去依赖权限模块。

```
toolbar/sheetbar/menu -> login
```

变成 

```
toolbar/sheetbar/menu -> permission
```

对于toolbar、sheetbar、menu这些上层业务的开发者，这些组件和只读-可编辑态之间的关系永远是稳定的，不管业务中将来会存在多少种权限，文档都只有两种状态，要么是只读状态，要么是可编辑状态。至于只读-可编辑态和这些权限之间的映射关系到底是怎样，那是别人应该关心的事情。


最终变成：

```
toolbar/sheetbar/menu -> sheetStatus
```

和 

```
login -> permission -> sheetStatus
```

### 16. 规律

1. 将抽象而稳定的代码放在系统高层
2. 将具体而不稳定的的代码放在系统低层
3. 复用性越强的模块放在系统高层，反之，不太需要复用的模块放在系统低层
4. 根据业务模块加载优先级，对性能要求越高的模块放在系统高层



计算机科学领域的任何问题都可以通过增加一个中间层来解决”，难的是如何在实际业务中察觉和设计这些中间层。


### 17. `$parent`

通过$parent获取父组件实例，进而获取父组件方法、data等

### 18. 移动端判断是否长按


```html
<div class="invite_code"
  @touchstart="touchStart"
  @touchend="touchEnd"
  @touchmove="gotouchMove">
</div>
```

```js
/** 触屏开始 */
touchStart() {
  clearTimeout(this.timeOutEvent); //清除定时器
  this.timeOutEvent = 0;
  this.timeOutEvent = setTimeout(() => {
    //长按行为的操作函数
    this.longPress();
  }, 1500); //这里设置定时
},
/** 触屏结束 */
touchEnd() {
  clearTimeout(this.timeOutEvent);
  if (this.timeOutEvent != 0) {
  }
},
/**定时器清楚 */
gotouchMove() {
  clearTimeout(this.timeOutEvent); //清除定时器
  this.timeOutEvent = 0;
}
```

参考: https://juejin.cn/post/6876382991388508174

其实就是设置一个setTimeout计时器，200ms过后触发一个回调，如果抬起计时器就被清除

### 19. three.js

`场景 + 相机` 经过 `渲染器`，生成 `投影图`

### 20. 既有默认值，又改了名字

```js
const { a: b = 1 } = c
```

### 21. 去掉空行

```js
.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '');
```

### 22. chrome调试技巧

chrome 控制台 双击函数的f符号，能显示函数内容

### 23. 如何找到性能瓶颈

几个问题：

- 如何找到性能瓶颈
- Http和websocket区别
- 前端监控


### 24. 低代码平台相关

#### 24.1. 获取父容器的rule：

```
rule?.__fc__?.parent?.rule;
```

#### 24.2 深拷贝解决子组件不更新的问题

### 25. `display：grid`

```css
grid-template-columns: 1fr 5fr minmax(100px, 1fr);
```


`fr(fraction)`: 如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。

解释：第一列是1fr，第二列是5fr，第三列最小值是100px, 最大是1fr。当第二列fr无限大时和第三列到100px时，会往第一列借值；

```css
grid-template-columns: repeat(auto-fill, 100px);
```

`auto-fill`: 如果容器大小不固定，项目大小固定，可以用`auto-fill`关键字自动填充；


下面是一个珊格布局的例子，用来盛放每一行不定的卡片：

```css
display: grid;
grid-row-gap: 24px;
grid-column-gap: 24px;
align-content: start;
flex-direction: row;
grid-template-columns: repeat(auto-fill, minmax(330px,1fr));
position: relative;
```


### 26. mongodb

#### 26.1 ObjectId

```js
var ObjectId = require('mongodb').ObjectId;

id = ObjectId(req.query.id);     
// 此时的id才是ajax传过来的id,才能与数据库对照
```


#### 26.2 多个选择条件查找

```js
const searchSql = { $or: [{ projectId: { $regex: search } }, { projectName: { $regex: search } }] };
const querySql = {
  $and: [
    searchSql,
    { staffId },
  ],
};

await collection.find(searchSql)
```

### 27. 获取transform中translateX、translateY的值

```js
const translates = document.defaultView.getComputedStyle(scrollBarThumb, null).transform;

const translateX = parseFloat(translates.substring(6).split(',')[4]);

const translateY = parseFloat(translates.substring(6).split(',')[5]);
```

### 28. jest

#### 28.1 mock技巧

mock一个模块的内部实现

```js
const isWindowsMock = require('../is-windows')
const commandConvert = require('../command')

jest.mock('../is-windows')

test(`converts unix-style env variable usage for windows`, () => {
  isWindowsMock.mockReturnValue(true)
  expect(commandConvert('$test', env)).toBe('%test%')
})

```

再比如：

```js
import { getUrlPara } from 'tools/url/url';
jest.mock('tools/url/url');

getUrlPara.mockImplementation((val) => {
  if (val === 'accesstoken') return 1;
  if (val === 'areaid') return 1;
  if (val === 'msdkEncodeParam') return 0;
  if (val === 'sig') return 0;
});

// getUrlPara
//   .mockReturnValueOnce(1)
//   .mockReturnValueOnce(1)
//   .mockReturnValueOnce('')
//   .mockReturnValueOnce('');
```


#### 28.2 字符串部分匹配，用toMatch更优雅

```js
expect(msdkSuffix().indexOf('&access_token=1&acctype=qc') > -1).toBe(true);
expect(msdkSuffix()).toMatch('&access_token=1&acctype=qc');
```

