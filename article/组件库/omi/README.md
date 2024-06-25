OMI 是一个开发 WebComponents 的框架

## Web Components

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

## Constructable Stylesheets

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


参考：

1. https://juejin.cn/post/7298248624701358090

