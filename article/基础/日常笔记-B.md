## VScode 设置代码片段

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



参考：
1. [vsCode设置代码片段 ](https://www.cnblogs.com/aurora-ql/p/14888971.html)
2. [vscode快速添加代码片段](https://blog.csdn.net/zhaohaibo_/article/details/104367573)

## OAuth 2.0

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

## TDesign

### renderTNode

- 渲染 TNode，props 和 插槽同时处理。 
- 同名优先处理插槽

### TNode

TNode组件比较简单，就是渲染传入的content prop
```ts
const TNodeComponent = (props: { content: any }) => props.content;
TNodeComponent.props = ['content'];
export default TNodeComponent;
```

### Vue3中h()函数和createVNode()函数的使用

使用方法：
- h(标签, {属性},内容)
- h(标签, {属性},[可以继续嵌套h()])
- createVNode(标签, {属性},内容)
- createVNode(标签, {属性},[可以继续嵌套createVNode()])

其实h()函数和createVNode()函数都是创建dom节点，他们的作用是一样的，但是在VUE3中createVNode()函数的功能比h()函数要多且做了性能优化，渲染节点的速度也更快。

参考：https://blog.csdn.net/qq_17355709/article/details/112712786

### ref获取html页面元素

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

## Vite核心原理


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


## html2canvas和dom-to-image原理

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


## Array.prototype.fill方法

```js
new Array(3).fill({ type: 'text' })
// [{type: 'text'}, {type: 'text'}, {type: 'text'}]
```



## provide、inject方式传值

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

## hybrids 库用来创建原生的 web components
## gray-matter 库可以用来解析 font-matter

## vite.config.js中说明自定义元素特征

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

## puppeteer

因为路由的二次跳转导致在之前的浏览器窗口中找不到对应的href。

browser.waitForTarget这个API有个选项timeout超时时间符合需求。

```js
browser.waitForTarget(
	target => target.opener() === pageTarget,
	{ timeout: 3000} /*3 seconds instead*/
);
```

参考：https://stackoverflow.com/questions/58851964/puppeteer-timeout-on-waitfortarget


## devops私有构建机不要在/root目录下安装

也就是执行命令的时候新建一个目录，否则会非常混乱

## three.js

