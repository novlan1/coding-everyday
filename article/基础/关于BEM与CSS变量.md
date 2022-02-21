## 一、BEM

### 1. 概念

BEM 是CSS模块化的一种实现方式，是一种非常有用、强大且简单的命名约定，它使您的前端代码更易于阅读和理解，更易于使用，更易于扩展，更健壮和明确，并且更加严格。



1. 块名称可以由拉丁字母、数字和破折号组成。要形成 CSS 类，请为命名空间添加一个短前缀：`.block`


2. 元素名称可以由拉丁字母、数字、破折号和下划线组成。CSS 类由块名称加上两个下划线加上元素名称组成：`.block__elem`


3. 修饰符名称可以由拉丁字母、数字、破折号和下划线组成。CSS 类由块或元素的名称加上两个破折号组成：`.block--modor.block__elem--mod`和`.block--color-blackwith .block--color-red`。复杂修饰符中的空格由破折号代替。



个人理解块就是一个组件的根元素，元素是块的组成部分。


block块名称和element元素名称：

- 仅使用类名选择器
- 没有标签名称或 ID
- 不依赖页面上的其他块/元素



举个例子：

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```

```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

### 2. 常见问题

#### (1) 为什么不用组合选择器

>BEM 建议像这样修改块`<div class="block block--mod">`。为什么不使用简单的版本`<div class="block mod">`呢？由于我们现在已经组合了选择器.block.mod，因此很容易为它定义所有 CSS 属性。

首先，由于可以在同一个 DOM 节点上混合多个块和元素，我们需要确保修改器只影响它所属的块。假设我们有一个菜单项元素和一个按钮混合在一起。在 HTML 中，这种结构由以下标记表示：

```html
<div class="menu__item button"></div>
```

在这种情况下.active，向它们添加修饰符会影响两者。

```html
<div class="menu__item button active"></div>
```

所有 3 个都位于同一个 DOM 节点，因此无法区分我们的意思是`menu__item.active`还是`button.active`。而在前缀的情况下，命名`button--active`明确表示这只是必须受到影响的按钮。

另一点是 CSS 的特殊性。组合选择器比单个类选择器更具体（意味着更重要）。这意味着您在使用父块代码重新定义它们时可能会遇到麻烦。

```html
<div class="header">
    <button class="button active">
</div>
```

如果您的代码中已经有`.button.active`选择器，则重新定义`.header .button`的特异性将与修饰符组合选择器的特异性完全相同，这使您依赖于声明的 CSS 规则的顺序。而如果您使用前缀修饰符，则始终可以确保级联选择器`.header .button`将覆盖`.button--active`修饰符。

这使生活更轻松，特别是对于可维护的项目。

第三点是看`<div class="block block--mod">`标记你可以清楚地看到块结构。很容易认识到我们有一个块及其修饰符，这里没有不同的解释。不幸的是，掌握`<div class="block mod">`代码并没有提供这样的信息。根据确切的 CSS 类是什么，有时我们无法识别我们这里是否有一个块和一个修饰符或两个块的混合。如果实体的名称很复杂或缩写/缩写（有时在大型项目中发生），这可能会更加令人困惑。
在文件系统上查找相应代码时，对块结构的清晰理解尤其有用。

#### (2) 块不应该嵌套

>如果我的块具有复杂的结构并且它的元素是嵌套的，我该怎么办？CSS 类`block__elem1__elem2__elem3`看起来很吓人。

块状结构应该是扁平的；您不需要反映块的嵌套 DOM 结构。因此，这种情况下的类名将是：

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

而块的 DOM 表示可能是嵌套的：

```html
<div class='block'>
    <div class='block__elem1'>
        <div class='block__elem2'>
            <div class='block__elem3'></div>
        </div>
    </div>
</div>
```

除了类看起来更好之外，它使元素仅依赖于块。因此，在对界面进行更改时，您可以轻松地将它们移动到整个块中。块 DOM 结构的更改不需要对 CSS 代码进行相应的更改。

```html
<div class='block'>
    <div class='block__elem1'>
        <div class='block__elem2'></div>
    </div>
    <div class='block__elem3'></div>
</div>
```



## 二、CSS变量



### 1. 变量声明

声明变量的时候，变量名前面要加两根连词线（--）

```css
body {
  --foo: #7F583F;
  --bar: #F7EFD2;
}
```

### 2. var() 函数

var()函数用于读取变量。

```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```

var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--foo, #7F583F);
```

第二个参数不处理内部的逗号或空格，都视作参数的一部分。

```css
var(--font-stack, "Roboto", "Helvetica");
var(--pad, 10px 15px 20px);
```

var()函数还可以用在变量的声明。

```css
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```

注意，变量值只能用作属性值，不能用作属性名。

```css
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```


上面代码中，变量--side用作属性名，这是无效的

### 3. 变量值的类型

如果变量值是一个字符串，可以与其他字符串拼接。

```css
--bar: 'hello';
--foo: var(--bar)' world'; 
```

如果变量值是数值，不能与数值单位直接连用。

```css
.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap)px;
} 
```

上面代码中，数值与单位直接写在一起，这是无效的。必须使用calc()函数，将它们连接。

```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
} 
```

如果变量值带有单位，就不能写成字符串。

```css
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}
/* 有效 */
.foo {
 --foo: 20px;
 font-size: var(--foo);
}
```

### 4. 作用域

同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。

下面是一个


```css
<style>
 :root { --color: blue; }
 div { --color: green; }
 #alert { --color: red; }
 * { color: var(--color); }
</style>
<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div> 
```


上面代码中，三个选择器都声明了--color变量。不同元素读取这个变量的时候，会采用优先级最高的规则，因此三段文字的颜色是不一样的。

这就是说，变量的作用域就是它所在的选择器的有效范围。

```css
 body {
  --foo: #7F583F;
 }
 
 .content {
   --bar: #F7EFD2;
 }
```

上面代码中，变量--foo的作用域是body选择器的生效范围，--bar的作用域是.content选择器的生效范围。

由于这个原因，全局的变量通常放在根元素:root里面，确保任何选择器都可以读取它们。

```css
:root {
  --main-color: #06c;
}
```

### 5. 响应式布局

利用这个特点，可以在响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值。

```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

### 6. 兼容性处理

对于不支持 CSS 变量的浏览器，可以采用下面的写法。

a {
  color: #7F583F;
  color: var(--primary);
}
也可以使用@support命令进行检测。


```css
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

## 三、Vant中CSS


下面是Vant中的CSS学习笔记。


Vant 中默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 1. 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<!-- 最多显示一行 -->
<div class="van-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>

<!-- 最多显示两行 -->
<div class="van-multi-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</div>

<!-- 最多显示三行 -->
<div class="van-multi-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</div>
```

实现方式：


```less
// mixins/ellipsis.less
.multi-ellipsis(@lines) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: @lines;

  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

.ellipsis() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

```less
// base.less
.van-ellipsis {
  .ellipsis();
}

.van-multi-ellipsis--l2 {
  .multi-ellipsis(2);
}

.van-multi-ellipsis--l3 {
  .multi-ellipsis(3);
}
```

### 2. 1px 边框

为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="van-hairline--top"></div>

<!-- 下边框 -->
<div class="van-hairline--bottom"></div>

<!-- 左边框 -->
<div class="van-hairline--left"></div>

<!-- 右边框 -->
<div class="van-hairline--right"></div>

<!-- 上下边框 -->
<div class="van-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="van-hairline--surround"></div>
```

实现方式：


```less
// mixins/hairline.less
.hairline-common() {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
}

.hairline(@color: var(--van-border-color)) {
  .hairline-common();

  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid @color;
  transform: scale(0.5);
}

.hairline-top(@color: var(--van-border-color), @left: 0, @right: 0) {
  .hairline-common();

  top: 0;
  right: @right;
  left: @left;
  border-top: 1px solid @color;
  transform: scaleY(0.5);
}

.hairline-bottom(@color: var(--van-border-color), @left: 0, @right: 0) {
  .hairline-common();

  right: @right;
  bottom: 0;
  left: @left;
  border-bottom: 1px solid @color;
  transform: scaleY(0.5);
}
```

```less
// base.less

// 对包含van-hairline的class都应用hair样式。
[class*='van-hairline'] {
  &::after {
    .hairline();
  }
}

.van-hairline {
  &,
  &--top,
  &--left,
  &--right,
  &--bottom,
  &--surround,
  &--top-bottom {
    position: relative;
  }

  &--top::after {
    border-top-width: @border-width-base;
  }

  &--left::after {
    border-left-width: @border-width-base;
  }

  &--right::after {
    border-right-width: @border-width-base;
  }

  &--bottom::after {
    border-bottom-width: @border-width-base;
  }

  &,
  &-unset {
    &--top-bottom::after {
      border-width: @border-width-base 0;
    }
  }

  &--surround::after {
    border-width: @border-width-base;
  }
}
```

Vant内部1px边框的使用：

van-collapse-item:

```less
.van-collapse-item {
  position: relative;

  &--border {
    &::after {
      .hairline-top(var(--van-border-color), var(--van-padding-md), var(--van-padding-md));
    }
  }
}
```

van-cell:

```less
.van-cell {
  &::after {
    .hairline-bottom(var(--van-cell-border-color), var(--van-padding-md), var(--van-padding-md));
  }
}
```

van-button设置了hairline后会增加类名`van-hairline--surround`。





### 3. 底部安全区

为元素添加底部安全区适配。

```html
<div class="van-safe-area-bottom"></div>
```

实现方式：

```less
// base.less

.van-safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

注意：

- 屏幕上安全距离: safe-area-inset-top
- 屏幕右安全距离: safe-area-inset-right
- 屏幕下安全距离: safe-area-inset-bottom
- 屏幕左安全距离: safe-area-inset-left

iOS 11

```css
padding-top: constant(safe-area-inset-top);
padding-right: constant(safe-area-inset-right);
padding-bottom: constant(safe-area-inset-bottom);
padding-left: constant(safe-area-inset-left);
```

iOS 11.2+

```css
padding-top: env(safe-area-inset-top);
padding-right: env(safe-area-inset-right);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
```

兼容性写法：

```css
padding-top: constant(safe-area-inset-top);
padding-top: env(safe-area-inset-top);
```

### 4. 动画

可以通过 `transition` 组件使用内置的动画类。

```html
<!-- 淡入 -->
<transition name="van-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- 上滑进入 -->
<transition name="van-slide-up">
  <div v-show="visible">Slide Up</div>
</transition>

<!-- 下滑进入 -->
<transition name="van-slide-down">
  <div v-show="visible">Slide Down</div>
</transition>

<!-- 左滑进入 -->
<transition name="van-slide-left">
  <div v-show="visible">Slide Left</div>
</transition>

<!-- 右滑进入 -->
<transition name="van-slide-right">
  <div v-show="visible">Slide Right</div>
</transition>
```

实现方式：

```less
// animation.less

@keyframes van-slide-up-enter {
  from {
    transform: translate3d(0, 100%, 0); // Y轴向下移动100%，就是藏在屏幕下面
  }
}

@keyframes van-slide-up-leave {
  to {
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes van-slide-down-enter {
  from {
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes van-slide-down-leave {
  to {
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes van-slide-left-enter {
  from {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes van-slide-left-leave {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes van-slide-right-enter {
  from {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes van-slide-right-leave {
  to {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes van-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes van-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes van-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.van-fade {
  &-enter-active {
    animation: var(--van-animation-duration-base) van-fade-in both
      var(--van-animation-timing-function-enter);
  }

  &-leave-active {
    animation: var(--van-animation-duration-base) van-fade-out both
      var(--van-animation-timing-function-leave);
  }
}

.van-slide-up {
  &-enter-active {
    animation: van-slide-up-enter var(--van-animation-duration-base) both
      var(--van-animation-timing-function-enter);
  }

  &-leave-active {
    animation: van-slide-up-leave var(--van-animation-duration-base) both
      var(--van-animation-timing-function-leave);
  }
}

.van-slide-down {
  &-enter-active {
    animation: van-slide-down-enter var(--van-animation-duration-base) both
      var(--van-animation-timing-function-enter);
  }

  &-leave-active {
    animation: van-slide-down-leave var(--van-animation-duration-base) both
      var(--van-animation-timing-function-leave);
  }
}

.van-slide-left {
  &-enter-active {
    animation: van-slide-left-enter var(--van-animation-duration-base) both
      var(--van-animation-timing-function-enter);
  }

  &-leave-active {
    animation: van-slide-left-leave var(--van-animation-duration-base) both
      var(--van-animation-timing-function-leave);
  }
}

.van-slide-right {
  &-enter-active {
    animation: van-slide-right-enter var(--van-animation-duration-base) both
      var(--van-animation-timing-function-enter);
  }

  &-leave-active {
    animation: van-slide-right-leave var(--van-animation-duration-base) both
      var(--van-animation-timing-function-leave);
  }
}
```

涉及的一些变量：

```less
@animation-duration-base: 0.3s;
@animation-duration-fast: 0.2s;
@animation-timing-function-enter: ease-out;
@animation-timing-function-leave: ease-in;


:root {
  --van-animation-duration-base: @animation-duration-base;
  --van-animation-duration-fast: @animation-duration-fast;
  --van-animation-timing-function-enter: @animation-timing-function-enter;
  --van-animation-timing-function-leave: @animation-timing-function-leave;
}
```


## 四、参考

1. [BEM](http://getbem.com/)
4. [属性选择器 class^=](https://blog.csdn.net/stklway/article/details/110656240)
5. [iPhoneX 安全区域 safe-area-inset-*](https://www.jianshu.com/p/6c8151dc188e)

