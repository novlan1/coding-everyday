OMI 是一个开发 WebComponents 的框架

## 1. Web Components

Web Components包括以下三个主要技术：

- Custom Elements：允许开发者创建自定义的HTML元素，并定义它们的行为。
- Shadow DOM：为自定义元素提供封装的DOM结构，使其与主文档隔离，避免样式和脚本的冲突。
- HTML Templates：提供一种创建HTML模板的方法，这些模板可以在运行时被克隆和填充，提高渲染性能。

比如不使用任何框架实现一个自定义元素：


```tsx
class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    div.textContent = 'Hello, Shadow DOM!';
    shadowRoot.appendChild(div);
  }
}

customElements.define('my-element', MyElement);

```

在这个例子中，我们创建了一个自定义元素`my-element`，并在其内部创建了一个 Shadow DOM。当浏览器遇到`<my-element>`标签时，会自动创建一个MyElement实例，并将其附加到文档中。`<my-element>`是框架无关的，任何框架都可以使用该元素。


其中 OMI 框架使用了其中两种：Custom Elements 和 Shadow DOM，而 HTML Templates 则由编程体验更好 JSX 语法来代替来实现。

```ts
import { tag, Component, h } from 'omi'

@tag('my-element')
class MyElement extends Component {
  render() {
    return <div>Hello, Shadow DOM!</div>
  }
}
```

## 2. Constructable Stylesheets

Constructable Stylesheets 是 Web Components 的黄金搭档。在使用 Shadow DOM 时创建和分布可重复使用的样式的一种方式，既降低了尺寸，还能提高性能。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6e82c801f440878fbd8ebe7c5a5a34~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1874&h=1430&s=141304&e=png&b=fbf5f4" width="800" />

这个 API 主要包含以下几个部分：

- CSSStyleSheet 类：这个类代表一个样式表。
- adoptedStyleSheets 属性：这个属性存在于 Document 和 ShadowRoot 对象上。

我们可以通过 `new CSSStyleSheet()` 来创建一个新的样式表，然后通过 `sheet.replace(text)` 或者 `sheet.replaceSync(text)` 来设置样式表的内容。这里的 `text` 是一个包含 CSS 代码的字符串。

然后通过 `document.adoptedStyleSheets = [sheet1, sheet2, ...]` 或者 `shadowRoot.adoptedStyleSheets = [sheet1, sheet2, ...]` 来应用样式表。这里的 `sheet1, sheet2, ...` 是 CSSStyleSheet 对象。

使用 `Constructable Stylesheets`，我们可以在 JavaScript 中创建和管理样式表，然后在需要的地方动态地应用样式表。这样，我们就可以复用样式，而且只需要加载一次样式代码，从而提高性能。

例如，我们可以创建一个样式表，然后在多个 Shadow DOM 中应用这个样式表，这里举一个不使用 OMI 框架原生使用 Constructable Stylesheets 的例子:

```tsx
const sheet = new CSSStyleSheet();
sheet.replaceSync('p { color: red; }');

customElements.define('my-element', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = '<p>Hello, world!</p>';
  }
});
```

在这个例子中，我们创建了一个样式表 sheet，然后在 my-element 组件的 Shadow DOM 中应用了这个样式表。无论我们创建了多少个 my-element 组件，样式表的代码都只需要加载一次。


## 3. omi

### 3.1. ?raw

vite 中可用这种方式加载字符串

### 3.2. props

`render` 函数接收 `props`

`static defaultProps` 来设置默认值，使用 `static propTypes` 来设置类型:

也可以合并到 `static props` 一起定义

### 3.3. css

```ts
static css = 'h1 { color: red }' 
```

也可以是数组

```ts
static css = [style, 'h3 { color: red; }']
```

### 3.4. 事件

和 React 一样

```tsx
class x {
  onClick = (evt) => {
    alert('Hello Omi!')
  }

  render() {
    return (
      <h1 onClick={this.onClick}></h1>
    )
  }
}
```

通过 fire 触发事件，对应 Vue 中的 emit

```ts
onClick = event => {
  this.fire('my-event', { name: 'yang' })
}

render() {
  return (
    <h1 onClick={this.onClick}></h1>
  )
}
```

外层使用者绑定事件，通过 event.detail 拿到参数

```tsx
<my-element onMyEvent={(event) => alert(event.detail.name)}></my-element>
```

或者通过 addEventListener

```ts
myElement.addEventListener('my-event', () => {})
```

### 3.5. slot

`slot` 不能和 `static isLightDom = true` 同时使用，否则子元素样式失效，可以使用 `props.children`。

### 3.6. Ref

想在 JS 中获取元素

```ts
onClick = () => {
  console.log(this.myRef)
}

render() {
  return (
    <h1 ref={e => { this.myRef = e}}></h1>
  )
}
```

提前赋值


```ts
onClick = () => {
  console.log(this.myRef)
}

myRef = e => this.myRef = e;

render() {
  return (
    <h1 ref={this.myRef}></h1>
  )
}
```

createRef 方法

```ts
onClick = () => {
  console.log(this.myRef.current)
}

myRef = createRef()

render() {
  return (
    <h1 ref={this.myRef}></h1>
  )
}
```



### 3.7. provide/inject

```ts
innerValue = signal([]);
provide = {
  name: 'yang',
  value: innerValue, // 不要传递 innerValue.value，会丢失响应式
}
```

```ts
inject = ['name']
render() {
  return (
    <h1>{this.injection.name}</h1>
  )
}
```


### 3.8. 接口多继承

实现类型的时候会用到接口多继承，比如

```ts
export interface PopupProps extends TdPopupProps, StyledProps {
  expandAnimation?: boolean;
  updateScrollTop?: (content: HTMLElement) => void;
}
```

### 3.9. computed 无法响应式更新

不要使用 computed，而是使用 get 方法，否则无法监听 props 的变化


```ts
// 正确的
get currentPos() {
  const { value, min, rangeDiff } = this.props;
  const result = `${(((value.value as number) - min) / rangeDiff) * 100}%`;
  return result;
}

// 错误的
currentPos = computed(() => {
  const { value, min, rangeDiff } = this.props;
  const result = `${(((value.value as number) - min) / rangeDiff) * 100}%`;
  return result;
});
```

## 4. 组件

tdesign-web-components 正用 omi 搭建。

### 4.1. collapse

由 Collapse 和 CollapsePanel 两个组件构成，CollapsePanel 是前者的插槽内容。CollapsePanel 由 `header、body` 构成，`header` 由 `left/content/right` 构成。


动画用了 omi-transition，给它提了个[PR](https://github.com/Tencent/omi/pull/891)，加上了 beforeEnter, enter 等方法的 dom 参数。


t-fake-arrow，注意这个箭头的动画，不要加 isActive 的 class，容易造成动画旋转角度出问题。



### 4.2. slider

先拆出 `slider-button`、`slider-mark`。

`slider` 中的刻度是 `slider-stops`，刻度和标记一一对应，也就是 `stops` 和 `mark` 内的元素都是 `markList` 循环而来。


### 4.3. popup

内部使用了 @popperjs/core。

参考：

1. https://juejin.cn/post/7298248624701358090
2. https://www.jianshu.com/p/32f786f25cb2


