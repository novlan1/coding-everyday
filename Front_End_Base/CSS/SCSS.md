- [1. `SCSS`的`@import`和`CSS`的`@import`的区别](#1-scss的import和css的import的区别)
- [2. `SCSS`文件下划线的使用](#2-scss文件下划线的使用)
- [3. SCSS的@mixin` 与 `@include`](#3-scss的mixin与include)
- [4. Sass @extend 与 继承](#4-sass-extend-与-继承)
- [5. 关于`@mixin` 和 `@extend` 对比](#5-关于mixin-和-extend-对比)
- [6. SCSS百分号操作符](#6-scss百分号操作符)
- [7. `SCSS`的 `@each`遍历](#7-scss的-each遍历)
- [8. Sass和SCSS区别](#8-sass和scss区别)
- [9. 默认变量](#9-默认变量)
- [10. 全局变量和局部变量](#10-全局变量和局部变量)
- [11. 混合宏、继承、占位符](#11-混合宏继承占位符)
- [12. Sass中注释类型的区别](#12-sass中注释类型的区别)


### 1. `SCSS`的`@import`和`CSS`的`@import`的区别

- `SCSS`的`@import`是直接将代码包含进目标`SCSS`文件，不会产生新的`HTTP`请求;
- 而`CSS`的`@import`会产生新的`HTTP`请求。


### 2. `SCSS`文件下划线的使用

SASS能够将代码分割为多个片段，并以`underscore`风格的下划线作为其命名前缀（`_partial.scss`），SASS会通过这些下划线来辨别哪些文件是SASS片段，并且**不让片段内容直接生成为CSS文件，从而只是在使用@import指令的位置被导入**。

### 3. SCSS的@mixin` 与 `@include`


`@mixin` 指令允许我们定义一个可以在整个样式表中重复使用的样式。

`@include` 指令可以将混入（`mixin`）引入到文档中。

混入可以接收参数：
```scss
/* 混入接收两个参数 */
@mixin bordered($color, $width) {
  border: $width solid $color;
}


.myArticle {
  @include bordered(blue, 1px);  // 调用混入，并传递两个参数
}

.myNotes {
  @include bordered(red, 2px); // 调用混入，并传递两个参数
}
```

转换后的CSS代码：
```css
.myArticle {
  border: 1px solid blue;
}

.myNotes {
  border: 2px solid red;
}
```
包含默认参数：
```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }
```

转换后的CSS代码：
```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }

h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed;
}
```

### 4. Sass @extend 与 继承
`@extend` 指令告诉 `Sass` 一个选择器的样式从另一选择器继承。

如果一个样式与另外一个样式几乎相同，只有少量的区别，则使用 `@extend` 就显得很有用。

以下 Sass 实例中，我们创建了一个基本的按钮样式 `.button-basic`，接着我们定义了两个按钮样式 `.button-report` 与 `.button-submit`，它们都继承了 `.button-basic` ，它们主要区别在于背景颜色与字体颜色，其他的样式都是一样的。

Sass 代码：
```scss
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}
```
将以上代码转换为 CSS 代码，如下所示：

Css 代码：
```css
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  background-color: red;
}

.button-submit  {
  background-color: green;
  color: white;
}
```
使用 `@extend` 后，我们在 `HTML` 按钮标签中就不需要指定多个类 `class="button-basic button-report"` ，只需要设置 `class="button-report"` 类就好了。

`@extend` 很好的体现了代码的复用。


### 5. 关于`@mixin` 和 `@extend` 对比
- `@minxin` 相对`@extend`更可控，
- 更易减少复杂度 尤其`@mixin`可以多层嵌套和传入参数
- 在使用`gzip`后 `@mixin` 比`@extend`的压缩比更大


### 6. SCSS百分号操作符

SCSS 的`"%"` 与 `"."` 功能类似，但是**不会输出代码**

DEMO
```scss
%fo{
  color:red;
}

.two {
  @extend %fo;
  font-size: 10px;
}
```
生成
```css
.two {
  color: red; 
}

.two {
  font-size: 10px;
}
```


### 7. `SCSS`的 `@each`遍历


用`()`包住`Map`，而不是`{}`

用`#`包住变量，如`#{$size}`

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：
```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
编译为
```css
.puma-icon {
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon {
  background-image: url('/images/egret.png'); 
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}
```
8.4.1 Multiple Assignment
The `@each` directive can also use multiple variables, as in `@each $var1, $var2, ... in` . If is a list of lists, each element of the sub-lists is assigned to the respective variable. For example:
```scss
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```
is compiled to:
```css
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; 
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; 
}
```
Since maps are treated as lists of pairs, multiple assignment works with them as well. For example:
```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```
is compiled to:
```css
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

### 8. Sass和SCSS区别

`Sass` 和 `SCSS` 其实是同一种东西，我们平时都称之为 `Sass`，两者之间不同之处有以下两点：
- 文件扩展名不同，`Sass` 是以`“.sass”`后缀为扩展名，而 `SCSS` 是以`“.scss”`后缀为扩展名
- 语法书写方式不同，`Sass` 是以**严格的缩进式语法**规则来书写，不带大括号(`{}`)和分号(`;`)，而 `SCSS` 的语法书写和我们的 `CSS` 语法书写方式非常类似。



### 9. 默认变量

`Sass` 的默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可。


```scss
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default;
body{
  line-height: $baseLineHeight; 
}
```

### 10. 全局变量和局部变量

在选择器、函数、混合宏...的外面定义的变量为全局变量。

当在局部范围（选择器内、函数内、混合宏内...）声明一个已经存在于全局范围内的变量时，局部变量就成为了全局变量的影子。基本上，局部变量只会在局部范围内覆盖全局变量。


### 11. 混合宏、继承、占位符

`Sass` 中的占位符 `%placeholder`可以取代以前 CSS 中的基类造成的代码冗余的情形。因为 `%placeholder` 声明的代码，如果不被 `@extend`调用的话，不会产生任何代码。

通过`@extend`调用的占位符，编译出来的代码会将相同的代码合并在一起。这也是我们希望看到的效果，也让你的代码变得更为干净。

- 如果你的代码块中涉及到**变量**，建议使用**混合宏**来创建相同的代码块。
- 如果你的代码块不需要任何变量参数，而且有一个**基类**已在文件中存在，那么建议使用 Sass 的**继承**。

### 12. Sass中注释类型的区别
- `/* */`是多行注释,会被编译到css文件中
- 用`//`单行注释不会被编译到css文件中

