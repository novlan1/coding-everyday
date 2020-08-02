### jQuery 和 Vue 的区别
1. 数据和视图的分离，解耦（开放封闭原则，对修改封闭，对扩展开放）；
2. 以数据驱动视图，只关心数据变化，DOM操作被封装。



### 如何理解MVVM？

MVC：M-Model数据，V-View 视图、界面，C-Controller控制器，逻辑处理
MVVM：Vm是一个桥，ViewModel 主要通过`DOM Listener` 和 `Data Bindings` 连接`View`和`Model`

1）三大框架都是数据驱动型的框架
2）vue及angular是双向数据绑定；react是单向数据绑定。React貌似使用的也是Object.defineProperty 监控数据，只是没有进一步把表单控件的事件封装进 v-model
3）Vuex、Redux 都是单项数据绑定的，即 M 的变化可以自动更新到 V，但 V 的变化必须手动触发事件更新到 M，这种单项数据绑定使数据更易于跟踪管理和维护。


### Vue 三要素
- 响应式（vue如何监听到data 的每个属性变化）
- 模板引擎（模板如何被解析，指令如何处理）
- 渲染（模板如何被渲染成html，渲染过程）

### 什么是模板

- Html是静态的、没有逻辑，模板是动态的、有逻辑
- 模板：字符串；有逻辑；嵌入JS变量
- 模板必须转换为JS代码  [有逻辑(JS才能实现)、转为html渲染页面(JS才能实现)]

### Vue的整个实现流程
1. 解析模板成`render`函数
2. 响应式开始监听
3. 首次渲染，显示页面，且绑定依赖
4. data属性变化，触发`rerender`

### computed和watch的区别
##### computed 特性
1. 是计算值
2. 应用：就是简化`tempalte`里面`{{}}`计算和处理`props`或`$emit`的传值
3. 具有缓存性，页面重新渲染值不变化时,计算属性会立即返回之前的计算结果，而不必再次执行函数

##### watch 特性
1. 是观察的动作
2. 应用：监听`props`，`$emit`或本组件的值执行异步操作
3. 无缓存性，页面重新渲染时值不变化也会执行



### vue双向绑定原理
vue数据双向绑定是通过**数据劫持**结合**发布者-订阅者模式**的方式来实现的。利用了 `Object.defineProperty()` 这个方法重新定义了对象获取属性值(get)和设置属性值(set)。

### 为什么vue组件的属性，有的需要加冒号“:”，有的不用?
加冒号的，说明后面的是一个`变量或者表达式`，没加冒号的后面就是对应的`字符串字面量`



### 理解 vue 修饰符`sync`
`sync`会被扩展为一个自动更新父组件属性的 `v-on` 监听器。

示例代码如下：
```
<comp :foo.sync="bar"></comp>
```
会被扩展为：
```
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```
当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：
```
this.$emit('update:foo', newValue)
```


### 为什么在 vue 的组件中，data 要用 function 返回对象呢？
- 因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。
- 如果不用`function return` 每个组件的data都是内存的同一个地址，那一个数据改变其他也改变了。 用`function return` 其实就相当于申明了新的变量，相互独立，自然就不会有这样的问题




### Vue事件修饰符——.prevent 和.passive
`prevent` 是拦截默认事件，`passive`是不拦截默认事件。

##### prevent
- 某些标签拥有自身的默认事件，如`a[href="#"]`，`button[type="submit"]` 这种标签在冒泡结束后会开始执行默认事件。注意默认事件虽然是冒泡后开始，但不会因为stop阻止事件传递而停止。

##### passive
- `passive`这个修饰符会执行默认方法。你们可能会问，明明默认执行为什么会设置这样一个修饰符。这就要说一下这个修饰符的本意了。
- 【浏览器只有等内核线程执行到事件监听器对应的JavaScript代码时，才能知道内部是否会调用`preventDefault`函数来阻止事件的默认行为，所以浏览器本身是没有办法对这种场景进行优化的。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿。】
- 通俗点说就是每次事件产生，浏览器都会去查询一下是否有`preventDefault`阻止该次事件的默认动作。我们加上`passive`就是为了告诉浏览器，不用查询了，我们没用`preventDefault`阻止默认动作。

这里一般用在滚动监听，`@scoll`，`@touchmove` 。因为滚动监听过程中，移动每个像素都会产生一次事件，每次都使用内核线程查询`prevent`会使滑动卡顿。我们通过`passive`将内核线程查询跳过，可以大大提升滑动的流畅度。

注：`passive`和`prevent`冲突，不能同时绑定在一个监听器上。



### 覆盖elementui样式的几种办法
- 用 `/deep/` 标签，例如 `/deep/ .class{ 要覆盖的样式 }` 。
- 可以在这个写`scope`的`style`标签下面再写一个`style`标签，专门写要覆盖的样式就好了 。
- 在`index.html`中引入一个外部样式，进行覆盖



### $router和$route的区别
- $router 路由器
- $route  单个路由页面

### Vue 中父子组件执行的先后顺序
- “父亲”先开始自己的`created`
- 然后“儿子”开始自己的`created`和`mounted`
- 最后“父亲”再执行自己的`mounted`

### Vue 创建全局变量和方法

Vue 创建全局变量和方法有很多种，不过在这我推荐使用先新建一个`js`文件，这个文件主要就是写一个对象，这个对象直接带属性和方法即可，然后在`main.js`引入，引入后再用`Vue.prototype`把引入的文件直接挂接到`vue`的原型上。
例如：
新建的`js`文件内容：
```
//在文件的开始先定义一个对象
const  aa = {}

// 要全局的变量的话
aa.name = '张三'

// 定义方法
aa.bb= function ( ) {
   
};

export default aa
```
在`main.js`中：
```
// 引入封装好的js文件的路径
import aa from './***/***/***'

// 把全局js挂接到vue原型上
Vue.prototype.$aa = aa
```
这样就能用了
在 vue 实例化上要用变量的话就话就直接`this.aa.name`，用方法的话就`this.aa.bb()`这样就OK了


### `cli-3.0`环境变量

`cli-3.0`总共提供了四种方式来制定环境变量：
- 在根目录添加`.env`文件，配置所有情况下都会用到的配置
- 在根目录添加`.env.local`文件，配置所有情况下都会用到的配置，与`.env`的区别是只会在本地，该文件不会被`git`跟踪。
- 在根目录添加`.env.[mode]`文件，配置对应某个模式下的配置,比如：`.env.development`来配置开发环境的配置。
- 在根目录添加`.env.[mode].local`文件，配置对应某个模式下的配置,与`.env.[mode]`的区别也只是会在本地生效，该文件不会被`git`跟踪。

在文件中，我们只需要以`key=value`的方式就可以设置变量了。
例如：
```
FOO=bar
VUE_APP_SECRET=secret
```

### 环境变量的使用
设置完环境变量之后就可以在我们的项目中使用这两个变量了。不过还需要注意的是在项目的不同地方使用，限制也不一样。
1. 在项目中，也就是`src`中使用环境变量的话，必须以`VUE_APP_`开头。例如我们可以在`main.js`中直接输出：
```
console.log(process.env.VUE_APP_SECRET)
```
2. 在`webpack`配置中使用，没什么限制，可以直接通过`process.env.XXX`来使用
3. 在`public/index.html`中使用的：分三类：（没怎么用过）

  - `<%= VAR %>` 用于非转换插值  例如：
```
<link rel="shortcut icon" href="<%= BASE_URL %>favicon.ico">
```
  - `<%- VAR %>` 用于HTML转义插值
  - `<% expression %>` 用于JavaScript控制流   



