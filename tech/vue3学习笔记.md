## 模版语法

### 指令上的动态参数

可以在指令参数中使用 JavaScript 表达式，方法是用方括号括起来：

```html
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的组件实例有一个 data property attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：


```html
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus。


动态参数预期会求出一个字符串，null 例外。这个特殊的 null 值可以用于显式地移除绑定。任何其它非字符串类型的值都将会触发一个警告。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，**因为浏览器会把 attribute 名全部强制转为小写**：

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

题外话，[falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值 (虚值) 是在 Boolean 上下文中认定为 false 的值。

JavaScript 在需要用到布尔类型值的上下文中使用强制类型转换(Type Conversion )将值转换为布尔值，例如条件语句和循环语句。

在 JavaScript 中只有 8 个 falsy 值（之前以为是6个，漏了-0，0n）

- false
- 0。数值 zero	
- -0。数值 负 zero	
- 0n。当 BigInt 作为布尔值使用时, 遵从其作为数值的规则. 0n 是 falsy 值.
- "", '', \`\`。这是一个空字符串 (字符串的长度为零). JavaScript 中的字符串可用双引号 "", 单引号 '', 或 模板字面量 \`\` 定义。
- null。缺少值
- undefined。原始值
- NaN。非数值


## class绑定

如果你想根据条件切换列表中的 class，可以使用三元表达式：

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

这样写将始终添加 errorClass，但是只有在 isActive 为 truthy 时才添加 activeClass。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：


```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### 在组件上使用

当你在带有单个根元素的自定义组件上使用 class attribute 时，这些 class 将被添加到该元素中。此元素上的现有 class 将不会被覆盖。

例如，如果你声明了这个组件：

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

然后在使用它的时候添加一些 class：

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

HTML 将被渲染为：

```html
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定 class 也同样适用：

```html
<my-component :class="{ active: isActive }"></my-component>
```

如果你的组件有多个根元素，你需要定义哪些部分将接收这个 class。可以使用 $attrs 组件 property 执行此操作：

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})
```

## 事件处理


有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // 现在可以访问到原生事件
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

### 多事件处理器


事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：


```html
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">
  Submit
</button>
```

```js
// ...
methods: {
  one(event) {
    // 第一个事件处理器逻辑...
  },
  two(event) {
   // 第二个事件处理器逻辑...
  }
}
```

### 事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：**方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节**。

```html
<!-- 阻止单击事件继续冒泡 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>
```

不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。

>使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止元素本身及其子元素的点击的默认行为，而 @click.self.prevent 只会阻止对元素自身的点击的默认行为。



Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发，   -->
<!-- 而不会等待 `onScroll` 完成，                    -->
<!-- 以防止其中包含 `event.preventDefault()` 的情况  -->
<div @scroll.passive="onScroll">...</div>
这个 .passive 修饰符尤其能够提升移动端的性能。
```

>不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。


题外话，passive的意思是消极的、被动的、顺从的。


## 非 Prop 的 Attribute


一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 props 或 emits 定义的 attribute。常见的示例包括 class、style 和 id attribute。**可以通过 $attrs property 访问那些 attribute**。


## 自定义事件

默认情况下，组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件。我们可以通过向 v-model 传递参数来修改这些名称：

```html
<my-component v-model:title="bookTitle"></my-component>
```

在本例中，子组件将需要一个 title prop 并发出 update:title 事件来进行同步：

```js
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```



## Provide/inject

有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- 模板的其余部分 -->
    </div>
  `
})

app.component('todo-list-statistics', {
  inject: ['user'],
  created() {
    console.log(`Injected property: ${this.user}`) // > 注入的 property: John Doe
  }
})
```

要访问组件实例 property，我们需要将 provide 转换为返回对象的函数：

```js
provide() {
  return {
    todoLength: this.todos.length
  }
}
```


### 处理响应式

默认情况下，provide/inject 绑定并不是响应式的。我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为。在我们的例子中，如果我们想对祖先组件中的更改做出响应，我们需要为 provide 的 todoLength 分配一个组合式 API computed property：

```js
provide() {
  return {
    todoLength: Vue.computed(() => this.todos.length)
  }
}
```



## 组合式API


使用 (data、computed、methods、watch) 组件选项来组织逻辑通常都很有效。然而，当我们的组件开始变得更大时，**逻辑关注点**的列表也会增长。尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解。


这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够**将同一个逻辑关注点相关代码收集在一起会更好**。而这正是组合式 API 使我们能够做到的。

## mixin不足

在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

- Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。
- 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

为了解决这些问题，添加了一种**通过逻辑关注点组织代码**的新方法：组合式 API。



## setup

### setup参数

使用 setup 函数时，它将接收两个参数：

- props
- context


 因为 setup的参数props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。

如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作：

```ts
const { title } = toRefs(props)
console.log(title.value)
```


如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它：

```ts
const title = toRef(props, 'title')
console.log(title.value)
```

传递给 setup 函数的第二个参数是 context。context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值



- context.attrs，等同于 $attrs
- context.slots，等同于 $slots
- context.emit，等同于$emit
- context.expose，暴露公共 property (函数)

context 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。

attrs 和 slots 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。请注意，与 props 不同，attrs 和 slots 的 property 是非响应式的。


执行 setup 时，无法访问以下组件选项：

- data
- computed
- methods
- refs (模板 ref)





注意，从 setup 返回的 refs 在模板中访问时是被自动浅解包的，因此不应在模板中使用 .value。

### 使用this

在 setup() 内部，this 不是该活跃实例的引用，因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这使得 setup() 在和其它选项式 API 一起使用时可能会导致混淆。


## 生命周期钩子

在 setup () 内部调用生命周期钩子：在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 setup 函数中编写。



生命周期钩子接受一个回调函数，当钩子被组件调用时将会被执行:

```js
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```


