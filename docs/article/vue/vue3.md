## 插槽


### 默认插槽


有时为一个插槽指定备用 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个 `<submit-button>` 组件中：
```html
<button type="submit">
  <slot></slot>
</button>
```

我们可能希望这个 `<button>` 内绝大多数情况下都渲染“Submit”文本。为了将“Submit”作为备用内容，我们可以将它放在` <slot>` 标签内：

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```
现在当我们在一个父级组件中使用 `<submit-button> `并且不提供任何插槽内容时：

```html
<submit-button></submit-button>
```
备用内容“Submit”将会被渲染：

```html
<button type="submit">
  Submit
</button>
```
但是如果我们提供内容：

```html
<submit-button>
  Save
</submit-button>
```
则这个提供的内容将会被渲染从而取代备用内容：

```html
<button type="submit">
  Save
</button>
```



### 具名插槽
有时我们需要多个插槽。例如对于一个带有如下模板的 `<base-layout>` 组件：

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

对于这样的情况，`<slot>` 元素有一个特殊的 attribute：name。通过它可以为不同的插槽分配独立的 ID，也就能够以此来决定内容应该渲染到什么地方：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
一个不带 name 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>`元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。

渲染的 HTML 将会是：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```


#### 具名插槽的缩写

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 `v-slot:header` 可以被重写为 `#header`：

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 作用域插槽

就是父组件可以使用子组件中的变量。



绑定在 `<slot>` 元素上的 attribute 被称为插槽 prop。现在，在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字：

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```


在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 slotProps，但你也可以使用任意你喜欢的名字。




