- [1. mixin](#1-mixin)
  - [1.1. 选项合并](#11-选项合并)
    - [1.1.1. data](#111-data)
    - [1.1.2. 钩子函数](#112-钩子函数)
    - [1.1.3. 值为对象的选项(`如methods`、`components`)](#113-值为对象的选项如methodscomponents)
  - [1.2. 全局混入](#12-全局混入)

## 1. mixin

一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

例子：
```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```


### 1.1. 选项合并

#### 1.1.1. data

数据对象在内部会进行**递归合并**，并在发生冲突时**以组件数据优先**。

#### 1.1.2. 钩子函数

**同名钩子函数将合并为一个数组，因此都将被调用**。另外，混入对象的钩子将在组件自身钩子之前调用。


```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

#### 1.1.3. 值为对象的选项(`如methods`、`components`)

值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

**注意：`Vue.extend()` 也使用同样的策略进行合并。**



### 1.2. 全局混入

一旦使用全局混入，它将**影响每一个之后创建的 Vue 实例（包括第三方组件）**。使用恰当时，这可以用来为自定义选项注入处理逻辑。


```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```