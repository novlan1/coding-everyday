## 一、VScode 设置代码片段

1. shift + ctrl(command) + p，打开搜索栏，输入snippets（英文意思为片段），找到Preferences:Configure User Snippets
2. 在打开的文件中输入以下内容，就完成了。$1代表第一个光标，$2代表第2个...

```json
[
"green": {
		"scope": "javascript,typescript",
		"prefix": "green",
		"body": [
			"console.log('\\x1B[32m%s\\x1B[0m', '$1');",
		],
		"description": "chalk.green"
	},
	"red": {
		"scope": "javascript,typescript",
		"prefix": "red",
		"body": [
			"console.log('\\x1B[31m%s\\x1B[0m', '$1');",
		],
		"description": "chalk.red"
	},
	"yellow": {
		"scope": "javascript,typescript",
		"prefix": "yellow",
		"body": [
			"console.log('\\x1B[33m%s\\x1B[0m', '$1');",
		],
		"description": "chalk.yellow"
	},
]
```

然后输入`green/red/yellow`就能快速打出下面内容了：

```js
console.log('\x1B[32m%s\x1B[0m', '绿色');
console.log('\x1B[33m%s\x1B[0m', '黄色');
console.log('\x1B[31m%s\x1B[0m', '红色');
```



参考：
1. [vsCode设置代码片段 ](https://www.cnblogs.com/aurora-ql/p/14888971.html)
2. [vscode快速添加代码片段](https://blog.csdn.net/zhaohaibo_/article/details/104367573)

## 二、OAuth 2.0

简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。

令牌（token）与密码（password）的作用是一样的，都可以进入系统，但是有三点差异。

1. 令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化。
2. 令牌可以被数据所有者撤销，会立即失效。以上例而言，屋主可以随时取消快递员的令牌。密码一般不允许被他人撤销。
3. 令牌有权限范围（scope），比如只能进小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。



OAuth 2.0 规定了四种获得令牌的流程。你可以选择最适合自己的那一种，向第三方应用颁发令牌。
- 授权码（authorization-code）
- 隐藏式（implicit）
- 密码式（password）：
- 客户端凭证（client credentials）


授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。

这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

A 网站允许 GitHub 登录的流程：

1. A 网站让用户跳转到 GitHub。
2. GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？"
3. 用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。
4. A 网站使用授权码，向 GitHub 请求令牌。
5. GitHub 返回令牌.
6. A 网站使用令牌，向 GitHub 请求用户数据。

## 三、TDesign

### 1. renderTNode

- 渲染 TNode，props 和 插槽同时处理。 
- 同名优先处理插槽

### 2. TNode

TNode组件比较简单，就是渲染传入的content prop
```ts
const TNodeComponent = (props: { content: any }) => props.content;
TNodeComponent.props = ['content'];
export default TNodeComponent;
```

### 3. Vue3中h()函数和createVNode()函数的使用

使用方法：
- h(标签, {属性},内容)
- h(标签, {属性},[可以继续嵌套h()])
- createVNode(标签, {属性},内容)
- createVNode(标签, {属性},[可以继续嵌套createVNode()])

其实h()函数和createVNode()函数都是创建dom节点，他们的作用是一样的，但是在VUE3中createVNode()函数的功能比h()函数要多且做了性能优化，渲染节点的速度也更快。

参考：https://blog.csdn.net/qq_17355709/article/details/112712786

### 4. ref获取html页面元素

```vue
<template>
   <input type="text" ref="inputRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue'

export default defineComponent({
  //例子需求：当页面加载完毕后，页面中的文本框可以直接获取焦点（自动获取焦点）
  setup(){
    //默认是空的，页面加载完毕，说明组件已经存在了，获取文本框元素
    const inputRef = ref<HTMLElement | null>(null)

    //页面加载后的生命周期组合API
    onMounted(()=>{
      inputRef.value&&inputRef.value.focus()  //如果已创建，自动获取 
    })
 
    return{
      inputRef
    }
  }
})
</script>
```

## 四、Vite核心原理


当声明一个 script标签类型为 module 时,如
```html
<script type="module" src="/src/main.js"></script>
```

当浏览器解析资源时，会往当前域名发起一个GET请求main.js文件

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

请求到了main.js文件，会检测到内部含有import引入的包，又会import 引用发起HTTP请求获取模块的内容文件，如App.vue、vue文件

Vite其核心原理是利用浏览器现在已经支持ES6的import,碰见import就会发送一个HTTP请求去加载文件，Vite启动一个 koa 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以ESM格式返回返回给浏览器。

Vite整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的webpack开发编译速度快出许多！


## 五、html2canvas和dom-to-image原理

dom-to-image库主要使用的是 SVG 实现方式，简单来说就是先把 DOM转换为 SVG 然后再把 SVG 转换为图片。

下面就拿 toPng 方法做一下简单的源码解析，分析一下其实现原理， 整体实现过程用到了几个函数：

- toPng （调用draw，实现 canvas => png ）
- draw （调用toSvg， 实现 dom => canvas）
- toSvg （调用 cloneNode 和 makeSvgDataUri，实现 dom => svg）
- cloneNode （克隆处理 dom和css）
- makeSvgDataUri （实现dom => svg data:url）


html2canvas的内部实现相对dom-to-image来说要复杂一些, 重点在于将dom重新绘制成canvas的过程。该过程整体的思路是：遍历目标节点和目标节点的子节点，遍历过程中记录所有的内容和样式，然后计算节点本身的层级关系，最后根据不同的优先级绘制到画布中。

html2canvas的解析过程, 大致的流程如下:

1. 构建配置项
2. clone目标节点并获取样式和内容
获取到目标节点后, 需要把克隆出来的目标节点的 dom 装载到一个 iframe 里，进行一次渲染，然后就可以获取到经过浏览器视图真实呈现的节点样式。

3. 解析目标节点
目标节点的样式和内容都获取到了之后，就需要把它所承载的数据信息转化为 Canvas 可以使用的数据类型。对于每一个节点而言需要绘制的包括了边框、背景、阴影、内容，而对于内容就包含图片、文字、视频等。这个过程就需要对目标节点的所有属性进行解析构造，分析成为指定的数据格式。

4. 构建内部渲染器
把目标节点处理成特定的数据结构 container 之后，就需要结合 Canvas 调用渲染方法了。 Canvas 绘图需要根据样式计算哪些元素应该绘制在上层，哪些在下层。元素在浏览器中渲染时，根据 W3C 的标准，所有的节点层级布局，需要遵循层叠上下文和层叠顺序的标准。

5. 绘制数据


## 六、Array.prototype.fill方法

```js
new Array(3).fill({ type: 'text' })
// [{type: 'text'}, {type: 'text'}, {type: 'text'}]
```



## 七、provide、inject方式传值

祖先组件：

```js
provide('tab-bar', {
	defaultIndex,
	activeValue,
	updateChild,
});
```

子孙组件：

```js
const { defaultIndex, activeValue, updateChild } = inject<any>('tab-bar');
```

## 八、常用库

1. hybrids 库用来创建原生的 web components
2. gray-matter 库可以用来解析 font-matter

## 九、vite.config.js中说明自定义元素特征

```js
plugins: [
	vue({
		template: {
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith('td-'),
			},
		},
	})
]
```

参考：https://vuejs.org/api/application.html#app-config-compileroptions

## 十、puppeteer

因为路由的二次跳转导致在之前的浏览器窗口中找不到对应的href。

browser.waitForTarget这个API有个选项timeout超时时间符合需求。

```js
browser.waitForTarget(
	target => target.opener() === pageTarget,
	{ timeout: 3000} /*3 seconds instead*/
);
```

参考：https://stackoverflow.com/questions/58851964/puppeteer-timeout-on-waitfortarget


## 十一、devops私有构建机不要在/root目录下安装

也就是执行命令的时候新建一个目录，否则会非常混乱

## 十二、JS下载文件

用这个方法下载了pdf，参考[这里](https://www.jianshu.com/p/86f7f2f2dda1)

```js
function downloadFile(content, filename) {
    var a = document.createElement('a')
    var blob = new Blob([content])
    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
}

function download(url) {
    ajax(url, function(xhr) {
        var filename = 'xxx.' + url.replace(/(.*\.)/, '') // 自定义文件名+后缀
        downloadFile(xhr.response, filename)
    }, {
        responseType: 'blob'
    })
}

function ajax(url, callback, options) {
    window.URL = window.URL || window.webkitURL
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    if (options.responseType) {
        xhr.responseType = options.responseType
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr)
        }
    }
    xhr.send()
}
```


## 十三、权限校验

权限校验，无非是某个角色有没有某个按钮。

```
角色 => 按钮
```

复杂点，某个角色是否有某个gid下的某个status下的按钮。就是配置变深，还是可以从配置上获取是否有权限。

数据结构：

```js
const tipMap = {
  411: {
    1010: {
      left: 1,
      operate: 'LEVEL',
      showAuditToolTip: true, // 是否显示审核中气泡
      tooltipTitle: '审核中',
      auditList: [{
        orgId: '411_taxofficer',
        orgName: 'xxxx',
      }],
    },
  },
}
```

比如是否展示气泡：

```js
function judgeTip(matchInfo, auditStatus) {
  const { gid } = matchInfo;
  if (!tipMap[gid]?.[auditStatus]?.showAuditToolTip) return false;

  return true;
}

showTip() {
  return judgeTip(this.matchInfo, this.approveStatus) || this.approveStatus === REJECT_STATUS;
}
```

获取气泡的title：

```js
toolTipTitle() {
  if (this.approveStatus === REJECT_STATUS) {
    return '驳回理由';
  }
  return tipMap[this.matchInfo.gid]?.[this.approveStatus]?.tooltipTitle || '';
}
```

获取气泡内容：

```js
tooltipContent() {
  if (this.approveStatus === REJECT_STATUS) {
    return this.reason;
  }
  const gidInfo = tipMap[this.matchInfo?.gid] || {};
  const statusInfo = gidInfo?.[this.approveStatus] || {};

  const orgList = statusInfo?.auditList || [];
  const curOrgIdList = orgList.map(item => item.orgId);
  const hasAuditId = !!this.roleList.find(item => curOrgIdList.includes(item.org_id));
  if (hasAuditId) {
    return '需要您审核';
  }
  const { left: leftNum } = statusInfo;
  return `还需【${orgList[0]?.orgName}】等${leftNum}个组织审核`;
}
```

如果这个配置有多个用途，除了是否显示气泡，还控制显示底部按钮的类型：NORMAL、LEVEL。

```js
// 是否显示评级操作按钮
showLevelBtn() {
  const { matchInfo, roleList, applyStatus } = this;
  const { gid } = matchInfo;
  const tipMap = getTipMap();
  if ([26, 425, 461].includes(gid)) {
    const statusInfo = tipMap[gid]?.[applyStatus] || {};
    if (statusInfo.operate === 'LEVEL') {
      const auditOrgIdList = statusInfo.auditList.map(item => item.orgId);
      const res = !!roleList.find(item => auditOrgIdList.includes(item.org_id));
      return res;
    }
    return false;
  }
  return false;
}
```

```js
// 是否显示普通的通过/审核
showNormalBtn() {
  const { matchInfo, roleList, applyStatus } = this;
  const { gid } = matchInfo;
  const tipMap = getTipMap();

  if ([26, 425, 461].includes(gid)) {
    const statusInfo = tipMap[gid]?.[applyStatus] || {};
    if (applyStatus == 100) {
      return !!roleList.find(item => ['tipcustcare'].includes(item.org_id));
    }
    if (statusInfo.operate === 'NORMAL') {
      const auditOrgIdList = statusInfo.auditList.map(item => item.orgId);
      return !!roleList.find(item => auditOrgIdList.includes(item.org_id));
    }
    return false;
  }
  // 其他gid
  return true;
}
```

## 十四、子类决定父类

页面底部的操作按钮有多种显示类型，它是否显示是由子类是否显示决定的，而不是其他。

比如子类有 showLevelBtn、showNormalBtn 两种，父类就用 `showLevelBtn && showNormalBtn` 判断，方便扩展。


## 十五、slot

slot的用法可以分为三类，分别是默认插槽、具名插槽和作用域插槽

子组件中：
1. 插槽用`<slot>`标签来确定渲染的位置，里面放如果父组件没传内容时的后备内容
2. 具名插槽用name属性来表示插槽的名字，不传为默认插槽
3. 作用域插槽在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件`slot-scope`接受的对象上。


```vue
// Child.vue
<template>
  <div>
    <main>
    <!-- 默认插槽 -->
        <slot>
          <!-- slot内为后备内容 -->
          <h3>没传内容</h3>
        </slot>
    </main>

    <!-- 具名插槽 -->
    <header>
        <slot name="header">
          <h3>没传header插槽</h3>
        </slot>
    </header>

    <!-- 作用域插槽 -->
    <footer>
        <slot name="footer" testProps="子组件的值">
          <h3>没传footer插槽</h3>
        </slot>
    <footer>
  </div>
</template>

<style scoped>
div{
 border: 1px solid #000;  
}
</style>
```

父组件中在使用时：
1. 默认插槽的话直接在子组件的标签内写入内容即可
2. 具名插槽是在默认插槽的基础上加上slot属性，值为子组件插槽name属性值
3. 作用域插槽则是通过slot-scope获取子组件的信息，在内容中使用。这里可以用解构语法去直接获取想要的属性

```html
// Parent.vue
<child>
  <!-- 默认插槽 -->
  <div>默认插槽</div>  
  <!-- 具名插槽 -->
  <div slot="header">具名插槽header</div>
  <!-- 作用域插槽 -->
  <div slot="footer" slot-scope="slotProps">
    {{slotProps.testProps}}
  </div>
</child>
```

在vue2.6中，上述的API被软废弃（3.0正式废弃），取而代之的是内置指令v-slot，可以缩写为【#】

子组件用法保持不变，父组件中
1. slot属性弃用，具名插槽通过指令参数v-slot:插槽名 的形式传入，可以简化为 #插槽名。
2. slot-scope属性弃用，作用域插槽通过`v-slot:xxx="slotProps"`的`slotProps`来获取子组件传出的属性
3. v-slot属性只能在`<template>`上使用，但在【只有默认插槽时】可以在组件标签上使用

```html
//Parent
<template>
  <child>
   <!--默认插槽-->
   <template v-slot>
     <div>默认插槽</div>
   </template>
   <!--具名插槽-->
   <template #header>
     <div>具名插槽</div>
   </template>
   <!--作用域插槽-->
   <template #footer="slotProps">
     <div>
      {{slotProps.testProps}}
     </div>
   </template>
  <child>
</template>
```

拓展用法：
1. 同样可以通过解构获取 `v-slot={user}`
2. 还可以重命名 `v-slot="{user: newName}"` 和定义默认值 `v-slot="{user = '默认值'}"`
3. 插槽名可以是动态变化的 `v-slot:[slotName]`

注意：
1. 默认插槽名为default，可以省略default直接写`v-slot`，
2. 缩写为#时不能不写参数，写成`#default`（这点所有指令都一样，v-bind、v-on）
3. 多个插槽混用时，v-slot不能省略default

## 十六、上传文件的files

上传文件的files是从input这个HTMLElement对象上获取的，不是onchange时间的event上。

## 十七、乱序

随机打乱的基本实现方式：

```js
function shuffle(array) {
  const arr = [...array];
  let m = arr.length;
  while (m > 1) {
    const index = Math.floor(Math.random() * m);
    m = m - 1;
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
}
```

就是从把最后一个和前面的随机一个交换，同时前面的范围不断缩小。

有个需求是打乱队伍，并且打乱的是非轮空的队伍，也就是提前把轮空队伍拿出来。乱序之后，再在之前的位置插入轮空队伍。

## 十八、数字与布尔的比较

数字比布尔广，可以看到是布尔的超集，就像对象可以看作列表的超集。

比如，定义`isPreview`为数字，预览赛程阶段是`1`，自定义赛程是`2`，报名结束为`0`，比单独定义`isPreview(boolean)`、`hasCustomedSche(boolean)`好一些。

## 十九、动画分类

动画分为帧动画（比如由几张图片组成）、过渡动画（比如属性）。


Transition的四个属性

1. 属性名称（property）
2. 过度时间（duration）
4. 时间函数（timing-function）
3. 延迟时间（delay）

分了整洁性，按这个顺序写很不错。


1. display不能和transition一起使用
2. transition后面尽量不跟all（影响读取速度和页面流畅性）
3. 常见闪动 可以用perspective和backface-visibility（等3D元素）


animation和transition的区别：

1. animation可以定义播放次数（`iteration-count`）
2. 播放方向(`direction`)即是否轮流播放和反向播放
3. 停止播放的状态(`fill-mode`) 是否暂停

animation解决了transition中`display:none`的bug

## 二十、Vant笔记

Vant 是通过`window.getComputedStyle(element).overflowY`是否包含`auto/scroll`，来判断一个元素是不是滚动的父元素的，也就是如果一个`element的overflowY`是`auto`或`scroll`，就是`scrollParent`。

```js
const overflowScrollReg = /scroll|auto/i;

function getScrollParent(el, root) {
  let node = el;

  while (node && node !== root ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode ;
  }

 return root
}
```

## 音乐频谱图

1. 使用 Audio API 创建 analyser，将音频流 stream 连接到 analyser
2. 设置 analyser 的 fft 参数，以此获取音频数据
3. 通过递归调用 requestAnimationFrame 来实现动画效果
4. 使用 Canvas API 来绘制条形图以及小浮块，将这绘制操作放在 requestAnimationFrame 的回调中，从而展示动态的频谱图


```ts
// 开始可视化
const visualize = (stream: MediaStream) => {
  const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
  if (!canvasEl) {
    throw new Error('找不到 canvas');
  }

  // 创建解析器
  audioCtxRef.current = new AudioContext()
  analyserRef.current = audioCtxRef.current.createAnalyser();

  // 获取音频源
  const source = audioCtxRef.current.createMediaStreamSource(stream);
  // 将音频源连接解析器
  source.connect(analyserRef.current);

  // 准备数据数组
  analyserRef.current.fftSize = 256;
  const bufferLength = analyserRef.current.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // 开始递归画图
  drawEachFrame(canvasEl, dataArray);
}
```

主要涉及的API是`new AudioContext()`，然后微信环境不支持这个API。

小浮块的高度的计算比较有意思，取的是浮块下降了的高度 dropHeight 以及被 bar 推高的高度 pushHeight 他们两的最大值就可以了 `floats[index] = Math.max(dropHeight, pushHeight)`。

```js
// 找到最大值，以及初始化高度
dataArray.forEach((item, index) => {
  // 默认值
  floats[index] = floats[index] || FLOAT_HEIGHT;
  // 处理当前值
  const pushHeight = item + FLOAT_HEIGHT;
  const dropHeight = floats[index] - DROP_DISTANCE;
  // 取最大值
  floats[index] = Math.max(dropHeight, pushHeight);
})

const barWidth = canvasWidth / dataArray.length;
let x = 0;

floats.forEach((floatItem: number) => {
  const floatHeight = floatItem;

  canvasCtx.fillStyle = '#3e47a0';
  canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT);

  x += barWidth + BAR_GAP;
})
```

bar的画法：
- 画长方形的时候，原点是在左上角，所以 y 的值为 canvasHeight - barHeight，即 总高度 - 条形高度
- 画下一个 bar 的时候，需要 + BORDER_WIDTH 来空出一个空隙，不然 bar 就都黏在一起了
- 在 <canvas> 中画渐变，需要用 addColorStop 来实现

```js
const barWidth = canvasWidth / dataArray.length
let x = 0;

dataArray.forEach((dataItem) => {
  const barHeight = dataItem;

  // 添加渐变色
  const gradient = canvasCtx.createLinearGradient(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, canvasHeight);
  gradient.addColorStop(0, '#68b3ec');
  gradient.addColorStop(0.5, '#4b5fc9');
  gradient.addColorStop(1, '#68b3ec');

  // 画 bar
  canvasCtx.fillStyle = gradient;
  canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

  x += barWidth + BAR_GAP;
})
```


参考：https://juejin.cn/post/7074015402812145677



## 用WebRtc自拍

创建一个video标签，`<video id="video">`

然后用`navigator.mediaDevices.getUserMedia`，完成用户对摄像头的使用授权，还可以从返回值里直接拿到视频流：
```js
video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
video.play()
```

拍照的核心就下面一句话：

```js
const context = canvas.getContext('2d')
context.drawImage(video, 0, 0, width, height);
```



参考：https://juejin.cn/post/7068890609414570021
