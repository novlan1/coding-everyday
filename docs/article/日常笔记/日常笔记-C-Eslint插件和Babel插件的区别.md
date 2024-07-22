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



“计算机科学领域的任何问题都可以通过增加一个中间层来解决”，难的是如何在实际业务中察觉和设计这些中间层。


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

### 23. 低代码平台相关

#### 23.1. 获取父容器的rule：

```
rule?.__fc__?.parent?.rule;
```

#### 23.2. 深拷贝解决子组件不更新的问题

### 24. `display：grid`

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


### 25. mongodb

#### 25.1. ObjectId

```js
var ObjectId = require('mongodb').ObjectId;

id = ObjectId(req.query.id);     
// 此时的id才是ajax传过来的id,才能与数据库对照
```


#### 25.2. 多个选择条件查找

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

### 26. 获取transform中translateX、translateY的值

```js
const translates = document.defaultView.getComputedStyle(scrollBarThumb, null).transform;

const translateX = parseFloat(translates.substring(6).split(',')[4]);

const translateY = parseFloat(translates.substring(6).split(',')[5]);
```

### 27. jest

#### 27.1. mock技巧

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


#### 27.2. 字符串部分匹配，用toMatch更优雅

```js
expect(msdkSuffix().indexOf('&access_token=1&acctype=qc') > -1).toBe(true);
expect(msdkSuffix()).toMatch('&access_token=1&acctype=qc');
```

### 28. dom2image转图片的坑

dom2image转图片，如果父元素height: 100vh, overflow: hidden，在safari中有问题，要设置成overflow:auto，可以设置margin-top。


### 29. 架构

架构的三个目的，高性能、高可用、高扩展。

- 高可用指的是有备份等，在负载压力很大的时候也能用，前端上可以借款的就是边界处理，判空。
- 高扩展就是不用改动或者少改动来应对未来的需求。


### 30. `input + label` 包裹的click事件可能会触发两次

### 31. ElementUI的date-picker固定在页面上

ElementUI的date-picker固定在页面上，需要将`body：overflow：hidden`，那个app就需要`overflow:auto`

```css
html{
  height: 100vh;
  overflow: hidden;
}
body {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  overflow: auto;
}
```

### 32. 前端分页用page/pageIdx，还是start/num

page控制start/num，不管后台要的什么，前端一直使用page，传递的时候转换一下就好了。

page转start/num比较方便。


### 33. 记一次奇葩的数据拼接需求


奇葩的数据拼接需求，要请求两种类型的数据，一种请求完后再请求另一种。为什么不让后台两种类型合在一起呢，因为后台说两种类型是两张表。

由于底下有上下切页，所以在上一种类型请求完后，下一页也要高亮，一开始用的是`isEnd && curGameType==1`来判断，如果为`true`，则另`curGameType=2`，`getPrev`时，还要判断当前状态，很麻烦。

其实我们可以拿到两种类型的总条数，然后下页`disabled = page >= firstPage + secondPage - 1`，获取数据的时候根据`page`所在的区间去判断类型，如果`page > firstPage`，则`type=2`，`page -= firstPage`。


### 34. ElementUI的upload组件

ElementUI扚upload组件，`on-remove`移除文件需要自己写一下 `this.fileList = fileList`，否则删除不了

```js
onRemove(file, fileList) {
  this.fileList = fileList;
},
```


### 35. 多tab的table

当前page、总page：

```js
curPage() {
  const { curMatchTab, enrollMatchMap } = this;
  const curDataConfig = enrollMatchMap[curMatchTab];
  return +curDataConfig.page ;
}
curTotalPage() {
  const { curMatchTab, enrollMatchMap } = this;
  const curDataConfig = enrollMatchMap[curMatchTab];
  return Math.ceil(curDataConfig.total / curDataConfig.pageSize);
}
```

data中的数据enrollMatchMap:

```js
{
  self: { data: [], total: 0, page: 0, pageSize: 9 },
  large: { data: [], total: 0, page: 0, pageSize: 9 },
  my: { data: [], total: 0, page: 0, pageSize: 9 },
}
```

获取数据:

```js
queryMatchList() {
  const { curMatchTab, enrollMatchMap } = this;
  const curDataConfig = enrollMatchMap[curMatchTab];

  queryCollegeGameList({
    pageIdx: curDataConfig.page,
    pageSize: curDataConfig.pageSize,
    queryType: curMatchTab === 'my' ? 2 : 0,
    gameType: curMatchTab === 'large' ? 2 : 1,
  }).then((res) => {
    const { childInfo, totalNum } = res;

    enrollMatchMap[curMatchTab] = {
      ...enrollMatchMap[curMatchTab],
      data: childInfo,
      total: totalNum,
    };
  });
}
```

### 36. `new Date().getMonth()` 是少1的，其他正常

### 37. 产品经理

人是懒惰的，懒惰导致发明；懒惰是创新的动力

时尚是驱动力，因为别人都在用”，人是跟风的，在互联网产品中，“时尚”是重要驱动力，不要太“工具化”

人没有耐心，用户没有耐心看你的说明书，如果不能让用户一分钟爱上你，产品做好前不轻易拉用户来你的产品


找到需求背后的本质
1. 用户说出来的需求，这话后面本质到底是什么？
2. 用户说是要分组，但，本质上呢？（用户本质上，是要屏蔽几个人而已）
用户说要取消斗地主中欢乐豆的门槛，而真取消了，输赢没有积累，ta根本不会再玩（ta只是想要更多次赠送而已）


宁损功能，不损体验
1. 不为流量，到处加入口，硬导入的用户流量，只会给ta们留下坏印象，再也不来
2. 微信主页左上角，为啥没有删除对话按钮？


抽象方能化繁为简
抽象——提取事物的共有特性，降低教育成本，然后用单一的模型尽可能覆盖多样性；

1. 由于抽象，用户识别（认知）的成本最低；
2. 一旦完成教育阶段，这种简单可复用的模块，可以适应多种形式（应用号、企业号、公众号三号打天下）；
3. 由于简单至极，体验难以被同行超越，如附近人，摇一摇


越简单的分类，越易于接受
1. 手机产品的功能上一大特征，就是帮助用户进行精确分类筛选，产品自身模块越是简单，越方便后期的升级维护（从草履虫开始）
2. 升级迭代于无形中（QQmail升级迭代，你有感知么？）

### 38. 可选链操作符后面接方法

```js
let result = someInterface.customMethod?.();
```

### 39. Vue项目登录鉴权

```js
{
  path: '/apply/act',
  name: 'apply_act',
  component: () => import('@/views/apply/act'),
  beforeEnter: (to, from, next) => {
    if (app.tip_uid) {
      next();
    } else {
      app.$ebus.emit('askLogin');
    }
    // ...
  }
}
```

### 40. 代码规范

同一个文件夹下的文件类型尽量统一，不要一半子文件，一半子文件夹，index.js/ts除外。如果一个文件夹下都大量文件，将他们都用文件夹另外包裹起来。


### 41. element 2.13版本的table上没有`el-table__cell`这个class


可以安装两个版本：

```js
"element-ui": "2.13.0",
"element-ui215": "npm:element-ui@^2.15.8",
```

### 42. 下载任意类型文件，自动获取文件后缀名

指定了blob的type后，(浏览器会自动会下载的文件添加上后缀名，比如.pdf/.docx/.png)。

用axios，而不要用xhr，axios能获取到blob的类型，并放在headers中的 content-type 中。

axios获取headers的本质是利用了`XMLHttpRequest.getAllResponseHeaders()`这个方法。

```js
import axios from 'axios';

function downloadFile(blob, filename) {
  const a = document.createElement('a');

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
}


export function download(url, postfix = '.docx') {
  axios({
    url,
    method: 'GET',
    // 设置返回数据类型，这里一定要设置，否则下载下来的会是空白,也可以是`arraybuffer`
    responseType: 'blob',
    params: {
    },
  }).then((res) => {
    const type = res.headers['content-type'];
    const fileName = Date.now();
    // if (type.endsWith('document')) {
    //   fileName += '.docx';
    // } else if (type.endsWith('pdf')) {
    //   fileName += '.pdf';
    // }
    downloadFile(res.data, fileName);
  })
    .catch((err) => {
      console.log('err', err);
    });
}
```

### 43. Blob、ArrayBuffer、Buffer

- Blob: 前端的一个专门用于支持文件操作的二进制对象
- ArrayBuffer：前端的一个通用的二进制缓冲区，类似数组，但在API和特性上却有诸多不同
- Buffer：Node.js提供的一个二进制缓冲区，常用来处理I/O操作


#### 43.1. Blob

Blob是用来支持文件操作的。简单的说：在JS中，有两个构造函数 File 和 Blob, 而File继承了所有Blob的属性。

所以在我们看来，File对象可以看作一种特殊的Blob对象。


在前端工程中，我们在哪些操作中可以获得File对象呢？


- input标签上选择的文件
- 拖拽中生成的DataTransfer对象

Blob用途：

通过window.URL.createObjectURL方法可以把一个blob转化为一个Blob URL，并且用做文件下载或者图片显示的链接。

Blob URL所实现的下载或者显示等功能，仅仅可以在单个浏览器内部进行。而不能在服务器上进行存储，亦或者说它没有在服务器端存储的意义。

下面是一个Blob的例子，可以看到它很短

```
blob:d3958f5c-0777-0845-9dcf-2cb28783acaf
```

和冗长的Base64格式的Data URL相比，Blob URL的长度显然不能够存储足够的信息，这也就意味着它只是类似于一个浏览器内部的“引用“。从这个角度看，Blob URL是一个浏览器自行制定的一个伪协议

##### 43.1.1. Blob实现下载文件

我们可以通过`window.URL.createObjectURL`，接收一个Blob（File）对象，将其转化为Blob URL,然后赋给 a.download属性，然后在页面上点击这个链接就可以实现下载了


```html
<!-- html部分 -->
<a id="h">点此进行下载</a>
<!-- js部分 -->
<script>
  var blob = new Blob(["Hello World"]);
  var url = window.URL.createObjectURL(blob);
  var a = document.getElementById("h");
  a.download = "helloworld.txt";
  a.href = url;
</script> 
```

##### 43.1.2. Blob实现图片本地显示

`window.URL.createObjectURL`生成的Blob URL还可以赋给img.src，从而实现图片的显示


```html
<!-- html部分 -->
<input type="file" id='f' />
<img id='img' style="width: 200px;height:200px;" />
<!-- js部分 -->
<script>
  document.getElementById('f').addEventListener('change', function (e) {
    var file = this.files[0];
    const img = document.getElementById('img');
    const url = window.URL.createObjectURL(file);
    img.src = url;
    img.onload = function () {
        // 释放一个之前通过调用 URL.createObjectURL创建的 URL 对象
        window.URL.revokeObjectURL(url);
    }
  }, false);
</script>
```

##### 43.1.3. Blob实现文件分片上传

通过Blob.slice(start,end)可以分割大Blob为多个小Blob
xhr.send是可以直接发送Blob对象的

前端

```html
<!-- html部分 -->
<input type="file" id='f' />
<!-- js部分 -->
<script>
function upload(blob) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/ajax', true);
    xhr.setRequestHeader('Content-Type', 'text/plain')
    xhr.send(blob);
}

document.getElementById('f').addEventListener('change', function (e) {
    var blob = this.files[0];
    const CHUNK_SIZE = 20; .
    const SIZE = blob.size;
    var start = 0;
    var end = CHUNK_SIZE;
    while (start < SIZE) {
        upload(blob.slice(start, end));
        start = end;
        end = start + CHUNK_SIZE;
    }
}, false);
</script>
```

##### 43.1.4. 本地读取文件内容

如果想要读取Blob或者文件对象并转化为其他格式的数据，可以借助FileReader对象的API进行操作

- FileReader.readAsText(Blob)：将Blob转化为文本字符串
- FileReader.readAsArrayBuffer(Blob)： 将Blob转为ArrayBuffer格式数据
- FileReader.readAsDataURL(): 将Blob转化为Base64格式的Data URL

下面我们尝试把一个文件的内容通过字符串的方式读取出来


```html
<input type="file" id='f' />
<script>
  document.getElementById('f').addEventListener('change', function (e) {
    var file = this.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const content = reader.result;
        console.log(content);
    }
    reader.readAsText(file);
  }, false);
</script>
```

Blob是针对文件的，或者可以说它就是一个文件对象，同时呢我们发现Blob欠缺对二进制数据的细节操作能力，比如如果如果要具体修改某一部分的二进制数据，Blob显然就不够用了，而这种细粒度的功能则可以由下面介绍的ArrayBuffer来完成。



#### 43.2. ArrayBuffer

##### 43.2.1. 通过ArrayBuffer的格式读取本地数据

```js
document.getElementById('f').addEventListener('change', function (e) {
  const file = this.files[0];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const result = fileReader.result;
    console.log(result)
  }
  fileReader.readAsArrayBuffer(file);
}, false);
```


##### 43.2.2. 通过TypeArray对ArrayBuffer进行写操作

```js
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;

console.log(typedArray1);
//  output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2);
//  output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
```

##### 43.2.3. 通过DataView对ArrayBuffer进行写操作

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.setInt8(2, 42);
console.log(view.getInt8(2));
// 输出: 42
```

#### 43.3. Buffer

Buffer是Node.js提供的对象，前端没有。 它一般应用于IO操作，例如接收前端请求数据时候，可以通过以下的Buffer的API对接收到的前端数据进行整合
