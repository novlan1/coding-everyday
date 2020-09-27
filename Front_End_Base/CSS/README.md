- [1. CSS优先级](#1-css优先级)
  - [1.1. CSS选择器的优先级关系](#11-css选择器的优先级关系)
  - [1.2. 浏览器具体的优先级算法是怎样的？](#12-浏览器具体的优先级算法是怎样的)
  - [1.3. 怎么比较两个优先级的高低？](#13-怎么比较两个优先级的高低)
  - [1.4. 覆盖内联样式方法](#14-覆盖内联样式方法)
- [2. 伪类和伪元素的区别](#2-伪类和伪元素的区别)
  - [2.1. `:after/::after`和`:before/::before`的异同](#21-afterafter和beforebefore的异同)
- [3. 伪元素注意事项](#3-伪元素注意事项)
- [4. `link`标签和`@import`标签的区别](#4-link标签和import标签的区别)
- [5. ajax解决浏览器缓存问题](#5-ajax解决浏览器缓存问题)
- [6. 径向渐变](#6-径向渐变)
- [7. 线性渐变](#7-线性渐变)
- [8. CSS `attr()` 函数](#8-css-attr-函数)
- [9. text-shadow和box-shadow对比](#9-text-shadow和box-shadow对比)
- [10. 关于`vw`、`vh`、`vmin`、`vmax`](#10-关于vwvhvminvmax)
  - [10.1. vw、vh、vmin、vmax 的含义](#101-vwvhvminvmax-的含义)
  - [10.2. vw、vh 与 % 百分比的区别](#102-vwvh-与--百分比的区别)
  - [10.3. vmin、vmax 用处](#103-vminvmax-用处)
- [11. `input`的`placeholder`样式：](#11-input的placeholder样式)
- [12. CSS Modules](#12-css-modules)
- [13. `calc()`注意事项](#13-calc注意事项)
- [14. 如何去掉 antd 的 Input 组件获取焦点时的蓝色边框](#14-如何去掉-antd-的-input-组件获取焦点时的蓝色边框)
- [15. 关于`Normalize.css`](#15-关于normalizecss)
- [16. Chrome中文字体下限`12px`](#16-chrome中文字体下限12px)
- [17. `nth-child`和`nth-of-type`的区别](#17-nth-child和nth-of-type的区别)
- [18. select:last-child](#18-selectlast-child)
- [19. CSS类选择器并排](#19-css类选择器并排)
- [20. `active`、`hover`、`link`、`visited`、`focus`的区别](#20-activehoverlinkvisitedfocus的区别)
  - [20.1. `a`标签伪类的触发顺序](#201-a标签伪类的触发顺序)
- [21. `z-index`理解](#21-z-index理解)
- [22. `em`与`rem`的重要区别](#22-em与rem的重要区别)
- [23. `word-wrap/word-break/white-space`区别](#23-word-wrapword-breakwhite-space区别)
- [24. filter属性](#24-filter属性)
- [25. 画一条0.5px的线](#25-画一条05px的线)
- [26. 移动端 1px 像素问题及解决办法](#26-移动端-1px-像素问题及解决办法)
- [27. 什么是 FOUC？如何避免](#27-什么是-fouc如何避免)
- [28. inline-block 的间隙](#28-inline-block-的间隙)
- [29. 你对 line-height 是如何理解的？](#29-你对-line-height-是如何理解的)
- [30. line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）](#30-line-height-三种赋值方式有何区别带单位纯数字百分比)
- [31. 图片下面有一个缝隙是因为什么](#31-图片下面有一个缝隙是因为什么)
- [32. target、currentTarget的区别？](#32-targetcurrenttarget的区别)
- [33. `-webkit-overflow-scrolling: touch`](#33--webkit-overflow-scrolling-touch)
- [34. `object.getBoundingClientRect()`](#34-objectgetboundingclientrect)
- [35. `documentElement` 和 `body` 的异同点](#35-documentelement-和-body-的异同点)
  - [35.1. scrollTop](#351-scrolltop)
- [36. 图标ICON的解决方案](#36-图标icon的解决方案)
- [37. `display:none => display: block`过程中其他动画不生效](#37-displaynone--display-block过程中其他动画不生效)
  - [37.1. `react-transition-group`](#371-react-transition-group)
- [38. `react-scripts`其实就是`create-rect-app`](#38-react-scripts其实就是create-rect-app)
- [39. `storybook`](#39-storybook)

### 1. CSS优先级

#### 1.1. CSS选择器的优先级关系
内联 > ID选择器 > 类选择器 > 标签选择器。



#### 1.2. 浏览器具体的优先级算法是怎样的？

优先级是由A、B、C、D的值来决定的，其中它们的值计算规则如下：
1. 如果存在**内联样式**，那么A = 1, 否则A = 0;
2. B的值等于**ID选择器**出现的次数;
3. C的值等于**类选择器**和**属性选择器**和**伪类**出现的总次数;
4. D的值等于**标签选择器**和**伪元素**出现的总次数 。

这样子直接看好像也还是很明白 ，那先上个例子：
```css
#nav-global > ul > li > a.nav-link
```
套用上面的算法，依次求出ABCD的值：
1. 因为没有内联样式 ，所以A = 0;
2. ID选择器总共出现了1次，B = 1;
3. 类选择器出现了1次， 属性选择器出现了0次，伪类选择器出现0次，所以C = (1 + 0 + 0) = 1；
4. 标签选择器出现了3次， 伪元素出现了0次，所以D = (3 + 0) = 3;
上面算出的A、B、C、D可以简记作：(0, 1, 1, 3)。



#### 1.3. 怎么比较两个优先级的高低？

现在已经弄清楚了优先级是怎么算的了。但是，还有一个问题，怎么比较两个优先级的高低呢？
比较规则是: **从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较** 。**如果4位全部相等，则后面的会覆盖前面的**。



#### 1.4. 覆盖内联样式方法

内联样式的优先级是最高的，但是外部样式有没有什么办法覆盖内联样式呢？有的，那就要`!important`出马了。因为一般情况下，很少会使用内联样式 ，所以`!important`也很少会用到！如果不是为了要覆盖内联样式，建议尽量不要使用`!important`。
如果内联样式用了`!important`，外部样式就没有办法了。所以**千万不要在内联样式中使用`!important`**。



### 2. 伪类和伪元素的区别

伪类和伪元素的根本区别在于：它们是否**创造了新的元素**。

1. 伪元素/伪对象：不存在在DOM文档中，是虚拟的元素，是创建新元素。代表某个元素的子元素，这个子元素虽然在**逻辑上存在**，但却**并不实际存在于文档树中**。例如：用`::before`和`::after`。
2. 伪类：表示**已存在的某个元素处于某种状态**，但是通过dom树又无法表示这种状态，就可以通过伪类来为其添加样式。例如a元素的`:hover`, ` :active`等。

伪元素：

![伪元素](../../imgs/pseudo_elements.png)

伪类：

![伪类](../../imgs/pseudo_classes.png)

另外：

1. 伪类的效果可以通过**添加实际的类**来实现
2. 伪元素的效果可以通过**添加实际的元素**来实现
3. 所以它们的本质区别就是是否抽象**创造了新元素**

注意：
1. 伪类只能使用`：`
2. 除了`::placeholder`和`::selection`，伪元素既可以使用`:`，也可以使用`::`。
3. 因为伪类是类似于添加类所以可以是多个，而伪元素在一个选择器中只能出现一次，并且只能出现在末尾。




#### 2.1. `:after/::after`和`:before/::before`的异同
相同点
1. 都可以用来表示伪元素，用来设置对象前的内容。
2. `:before`和`::before`写法是等效的， `:after`和`::after`写法是等效的。



不同点

1. `:before/:after`是CSS2的写法，`::before/::after`是CSS3的写法。
2. `:before/:after`的兼容性要比`::before/::after`好 ，不过在H5开发中建议使用`::before/::after`比较好。



注意：

1. 伪元素要配合`content`属性一起使用
2. 伪元素**不会出现在DOM中**，所以**不能通过js来操作**，仅仅是在**CSS 渲染层加入**
3. 伪元素的特效通常要使用`:hover`伪类样式来激活
eg: 当鼠标移在`span`上时，`span`前插入”mike”
```css
span:hover::before{
    content: 'mike'
}
```

参考资料：
1. [伪类和伪元素的区别](https://www.cnblogs.com/xmbg/p/11608268.html)
2. [伪类和伪元素的区别总结](https://blog.csdn.net/qq_27674439/article/details/90608220)


### 3. 伪元素注意事项
1. 伪元素，它是一个元素的子元素，其意思就是说，我们无法用JS获取到这些伪元素，我们无法通过JS对其进行增、删、改，所以这也是它们的优点，因为它们不会增加JS查询DOM的负担，即对于JS来说伪元素是透明的。然后因为它们也不是实际的HTML标签，所以可以加快浏览器加载HTML文件，对SEO也有帮助（SEO 搜索引擎优化）。
2. 如果我们把伪类的样式有`absolute`定位的话会把伪类强制变成块级元素，伪类本身是行内元素的。
3. `img`、`input`和其他的单标签是没有`after`和`before`伪元素的，因为单标签本身不能有子元素。


### 4. `link`标签和`@import`标签的区别

1. `link`属于`html`标签，而`@import`是`css`提供的
2. 页面被加载时，`link`会**同时被加载**，而`@import`引用的css会等到**页面加载结束后**加载。
3. link是html标签，因此没有**兼容性**，而@import只有`IE5`以上才能识别。
4. 当用`JS`控制`dom`去**改变样式**的时候，只能使用link标签，由于 DOM 方法是**基于文档**的，无法使用@import的方式插入样式。

注意：
- CSS 的`link`标签是同时加载的 
- `script`标签才会加载完一个再加载另一个（默认，加上`defer/async`就不同了）


### 5. ajax解决浏览器缓存问题
1. 在ajax发送请求前加上`anyAjaxObj.setRequestHeader ( "If-Modified-Since","0")`。
2. 在ajax发送请求前加上 `anyAjaxObj.setRequestHeader ( "Cache-Control","no-cache")`。
3. 在URL后面加上一个**随机数**：` "fresh=" + Math.random()`。
4. 在URL后面加上**时间戳**：`"nowtime=" + new Date().getTime()`。
5. 如果是使用`jQuery`，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。



### 6. 径向渐变

`radial-gradient`的**渐变轴**是**圆心到顶点的一条线**，设置渐变色都是在渐变轴上设置的。
线性渐变的渐变轴比较简单，就是**那条线**。
径向渐变可以实现内凹圆角


### 7. 线性渐变

`background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`
比如：
```
linear-gradient(12deg, red, yellow); 
linear-gradient(to bottom right, red , yellow);
linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%)
```
如果两个或多个颜色终止在同一位置，则在该位置声明的第一个颜色和最后一个颜色之间的过渡将是一条生硬线。
`to top`, `to bottom`, `to left` 和 `to right`这些值会被转换成角度`0度`、`180度`、`270度`和`90度`。其余值会被转换为一个以**向顶部中央方向为起点** **顺时针**旋转的角度。



### 8. CSS `attr()` 函数
`attr()` 函数返回**选择元素的属性值**
如`attr(data-name)`, `attr(href)`

 

### 9. text-shadow和box-shadow对比
`text-shadow`和`box-shadow`都有`blur`属性（模糊距离），`box-shadow`还有`spread`（阴影的大小）。

- `h-shadow`：必需的。水平阴影的位置。允许负值
- `v-shadow`：必需的。垂直阴影的位置。允许负值



比如，`text-shadow: 1px 1px 1px #333`，指的是，水平阴影位置，垂直阴影位置，模糊距离，阴影的颜色



### 10. 关于`vw`、`vh`、`vmin`、`vmax`

####  10.1. vw、vh、vmin、vmax 的含义
- vw：视窗宽度的百分比（1vw 代表视窗的宽度为 1%）
- vh：视窗高度的百分比
- vmin：当前 vw 和 vh 中较小的一个值
- vmax：当前 vw 和 vh 中较大的一个值



####  10.2. vw、vh 与 % 百分比的区别

- % 是相**对于父元素**的大小设定的比率，vw、vh 是**视窗大小**决定的。
- vw、vh 优势在于能够**直接获取高度**，而用 % 在没有设置 body 高度的情况下，是无法正确获得可视区域的高度的，所以这是挺不错的优势。



#### 10.3. vmin、vmax 用处

做**移动页面开发**时，如果使用 vw、wh 设置**字体大小**（比如 5vw），在**竖屏**和**横屏**状态下显示的字体大小是不一样的。
由于 vmin 和 vmax 是当前较小的 vw 和 vh 和当前较大的 vw 和 vh。这里就可以用到 vmin 和 vmax。使得文字大小在横竖屏下保持一致。



### 11. `input`的`placeholder`样式：

`input::-webkit-input-placeholder`不能和`moz`、`ms`连起来写，需要分开

 

### 12. CSS Modules

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。产生局部作用域的唯一方法，就是使用一个独一无二的class的名字，不会与其他选择器重名。但是当我们与其他人共同开发的时候，无法保证一定与其他人不同，这时候就要用到 CSS Modules了。

将样式文件`App.css`输入到`style`对象，然后引用`style.title`代表一个class。构建工具会将类名`style.title`编译成一个**哈希字符串**。`App.css`也会同时被编译。

我们使用的`antd`组件的样式大部分都是全局样式，使用局部方式声明class经过编译后，无法与组件的默认样式class匹配，样式自然就无法进行覆盖，要覆盖默认样式就需要使用全局样式。使用`global`声明的class，都不会被编译成**哈希字符串**也就能够进行覆盖了。



注意:
css module在react使用的时候，如果类不存在或者写的位置或方法不对，是挂载不上去的。



### 13. `calc()`注意事项

`calc(50% - 470px)`，中间必须加**空格**



### 14. 如何去掉 antd 的 Input 组件获取焦点时的蓝色边框

最初尝试通过设置`outline:none`的方法去掉这个边框，但是发现这个方法不起作用。

其实，`antd`的`Input`组件在获取焦点情况下的蓝色边框是通过`box-shadow`来实现的。



### 15. 关于`Normalize.css`

`Normalize.css`是一种`CSS reset`的替代方案。它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的`CSS reset`，`Normalize.css`是一种现代的、为HTML5准备的优质替代方案。


### 16. Chrome中文字体下限`12px`


### 17. `nth-child`和`nth-of-type`的区别

1. `p:nth-child(2)`是**先找到第2个元素**，然后看看它是否是p，**是p才渲染**
2. `p:nth-of-type(2)`是**找到这些个p元素**，然后**渲染第2个p元素**(如果第二个p存在，一定会渲染)



### 18. select:last-child

选择父元素的最后一个子元素，且同时满足`select`条件的。两者缺一不可！



### 19. CSS类选择器并排

1. `.nav .user`（中间有空格）匹配到`.nav`的元素**下面的`.user`的元素**
2. `.user.login`（中间没有空格）匹配到**同时含有**`.user`和`.login`的元素



### 20. `active`、`hover`、`link`、`visited`、`focus`的区别

- `link`表示链接在正常情况下（即页面刚加载完成时）显示的颜色。
- `visited`表示**链接被点击后**显示的颜色。
- `hover`表示鼠标悬停时显示的颜色。
- `focus`表示**元素获得光标焦点**时使用的颜色，主要用于**文本框**输入文字时使用（鼠标松开时显示的颜色）。
- `active`表示当所指元素处于**激活**状态（**鼠标在元素上按下还没有松开**）时所显示的颜色。



#### 20.1. `a`标签伪类的触发顺序 

触发顺序为`link`-->`visited`--->`hover`--->`active`即记为`love and hate`， 然后单独记住`focus`在`hover`和`active`之间即可




### 21. `z-index`理解

html中页面元素可以并列，也可以层叠。`z-index`是用来控制元素重叠时堆叠顺序的属性。`z-index`属性适用于已经定位的元素（即`position`不为`static`的元素）

1. 堆叠上下文

即`stacking content`，在一个页面中可能有多个堆叠上下文，每个页面上的元素都只属于一个堆叠上下文，元素的`z-index`属性也只描述同一个堆叠上下文中"z轴"的层级表示，不同堆叠上下文的元素无法通过`z-index`来控制元素的层叠



2. `z-index`的取值

- `z-index`的默认值是`auto`，当页面生成一个新的元素时，如果不显式地设置它的`z-index`值，它就不会自己产生一个新的`stacking content`，而是处于和父元素相同的`stacking content`中。
- `z-index`的值可以为`inherit`，表示继承父级的属性。
- `z-index`的值也可以设置为整数值，甚至可以设置为负值，当元素的`z-index`值设置为整数时（包括0），它就会产生一个自己的`stacking content`，它的父元素的`z-index`值就不会和它的`z-index`值做比较。
- 

3. 不使用`z-index`的情况

页面元素在页面中的布局是流式的，即从上到下，从左到右排布，而堆叠顺序是从下到上的，也就是说一个元素A先于另一个元素B出现，那么A就是处于B之下的（如果两者有重叠的部分，A就会被B覆盖），另一个关注点是非定位元素（即不显式地设置position的元素）总是先于定位元素（显式地设置position的元素）渲染的，所以它始终是在定位元素之下的，与在HTML中出现的顺序无关。

比如最后一个normal元素出现在position为absolute和relative的后面，却被它们遮盖




4. 浮动堆叠顺序
    浮动元素的层叠位置介于非定位元素与定位元素之间

  

5. `z-index`的堆叠
    如果一个元素未设置`position`，那么即使设置了`z-index`的值，也无法提高它的层级。

    
    
6. 子元素的`z-index`值只在父元素范围内有效。子堆叠上下文被看做是父堆叠上下文中一个独立的模块，相邻的堆叠上下文完全没关系。



总结：
1. `z-index`的默认值是`auto`，表示和父元素在相同等堆叠上下文中。
2. 只有设置了`position`为`absolute`或者`relative`，才可以通过`z-index`提高层级。
3. 非定位元素（即不显式地设置`position`的元素）总是在定位元素（显式地设置`position`的元素）之下。
4. 浮动元素的层叠位置介于非定位元素与定位元素之间



### 22. `em`与`rem`的重要区别

`rem`是CSS3新增的一个相对单位（`root em`，根em），相对于根元素(即`html`元素)`font-size`计算值的倍数

em是相对于父元素的`font-size`，继承的特点，浏览器有默认(`16px`)

区别：它们计算的规则一个是依赖父元素，另一个是依赖根元素计算。


### 23. `word-wrap/word-break/white-space`区别

- `white-space`，**控制空白字符的显示**，同时还能控制**是否自动换行**。它有五个值：`normal | nowrap | pre | pre-wrap | pre-line`
- `word-break`，**控制单词如何被拆分换行**。它有三个值：`normal | break-all | keep-all`
- `word-wrap`（overflow-wrap）**控制长度超过一行的单词是否被拆分换行**，是`word-break`的补充，它有两个值：`normal | break-word`

 

### 24. filter属性

- filter：blur（5）模糊
- filter：grayscale（5）灰度
- filter：sepia（5）黄棕色
- filter：saturate（5）饱和度
- filter：hue-rotate（50deg）色相
- filter：invert（1）反色
- filter：opacity（0.2）不透明度
- filter：brightness（0.2）明度
- filter：contrast（2）对比度
- filter：drop-shadow（10px 10px 2px #aaa）阴影


### 25. 画一条0.5px的线
- 采用meta viewport的方式：  
```
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
- 采用`border-image`的方式
- 采用`transform: scale()`的方式

### 26. 移动端 1px 像素问题及解决办法
问题出现原因：如果移动显示屏的分辨率始终是普通屏幕的2倍，1px的边框在`devicePixelRatio=2`（设备的物理像素和逻辑像素的比值）的移动显示屏下会显示成`2px`，所以在高清屏下看着`1px总是感觉变胖了

解决方案：
1. 媒体查询
优点：简单，好理解
缺点：兼容性差，目前IOS8+才支持，在IOS7及其以下、安卓系统都是显示0px。
```css
.border { 
  border: 1px solid #999 
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border { 
    border: 0.5px solid #999 
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border { 
    border: 0.333333px solid #999 
  }
}
```


2. 设置 `border-image` 方案
缺点：需要制作图片，圆角可能出现模糊
```css
.border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url("border.png") 2 0 stretch;
    border-image: url("border.png") 2 0 stretch;
}
```
3. `background-image` 渐变实现
缺点：因为每个边框都是线性渐变颜色实现，因此无法实现圆角。
```css
.border {
    background-image:linear-gradient(180deg, red, red 50%, transparent 50%),
    linear-gradient(270deg, red, red 50%, transparent 50%),
    linear-gradient(0deg, red, red 50%, transparent 50%),
    linear-gradient(90deg, red, red 50%, transparent 50%);
    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;
    background-repeat: no-repeat;
    background-position: top, right top,  bottom, left top;
    padding: 10px;
}
```
4. `box-shadow`

利用阴影也可以实现，优点是没有圆角问题，缺点是颜色不好控制
```css
div {
  -webkit-box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
}
```
5. `transform: scale(0.5)` 方案 - 推荐: 很灵活


参考资料：[移动端 1px 像素问题及解决办法](https://www.jianshu.com/p/31f8907637a6)

### 27. 什么是 FOUC？如何避免

Flash Of Unstyled Content：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。

**解决方法**：把样式表放到文档的`head`




### 28. inline-block 的间隙

两个并列的 inline-block 中间会有一条裂缝，这个的原因是两个标签之间有空格，浏览器把这些空格当成文字中空格，所以这两个块中间多少有间隙。

解决办法：

1. 删除两个标签间的空格，但是这样 html 排版不好
2. 容器元素 font-size: 0 然后再在里面再重新设置字体大小

### 29. 你对 line-height 是如何理解的？

- line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中
- line-height 和 height 都能撑开一个高度，height 会触发 haslayout（一个低版本 IE 的东西），而 line-height 不会

### 30. line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
- 百分比：将计算后的值传递给后代

### 31. 图片下面有一个缝隙是因为什么

![图片下面有一个缝隙是因为什么](../../imgs/imgbottom.png)

因为 img 也相当于一个 inline 的元素， inline 就要遵守行高的构成，它会按照 base 基线对齐，基线对齐的话那么它就会和底线间有一个缝隙。

如何解决： 因为它会遵守文字对齐方案，那么就把图片的对齐方式修改为 `vertical-align: bottom`。或者让他`display: block`，这样图片虽然会换行，但是没有间隙了。

### 32. target、currentTarget的区别？

currentTarget当前所绑定事件的元素

target当前被点击的元素

### 33. `-webkit-overflow-scrolling: touch`

1. 作用

可控制元素在移动设备有滚动回弹效果，可惯性滚动

2. 适应场景

在ios移动端上，设置容器overflow-y:scroll;使容器内元素滚动时，滑动会很卡顿，使用-webkit-overflow-scrolling:touch;可以解决该问题。 

原理：该属性开启了硬件加速

缺点：耗内存

参考资料：
1. [-webkit-overflow-scrolling:touch介绍和碰到的坑](https://www.cnblogs.com/luoyanan/p/11095643.html)


### 34. `object.getBoundingClientRect()`

![getBoundingClientRect](../../imgs/getBoundingClientRect.png)

1. 返回的结果是包含完整元素的最小矩形，并且拥有l`eft, top, right, bottom, x, y, width`, 和 `height`这几个以像素为单位的只读属性用于描述整个边框。
2. 除了width 和 height 以外的属性是相对于视图窗口的左上角来计算的。
3. 当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作，也就是说，当滚动位置发生了改变，`top`和`left`属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。
4. 如果你需要获得相对于整个网页左上角定位的属性值，那么只要给`top`、`left`属性值加上当前的滚动位置（通过 `window.scrollX` 和 `window.scrollY`），这样就可以获取与当前的滚动位置无关的值。

如果需要更好的跨浏览器兼容性，请使用 `window.pageXOffset` 和 `window.pageYOffset` 代替 `window.scrollX` 和 `window.scrollY`(`pageYOffset` 属性是 `scrollY` 属性的别名)。不能访问这些属性的脚本可以使用下面的代码：

```js
// For scrollX
(((t = document.documentElement) || (t = document.body.parentNode))
  && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
// For scrollY
(((t = document.documentElement) || (t = document.body.parentNode))
  && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
```

### 35. `documentElement` 和 `body` 的异同点
1. `document`代表的是整个文档(对于一个网页来说包括整个网页结构)；
2. `document.documentElement`是整个文档节点树的根节点，在网页中即`html`标签；
3. `document.body`是整个文档DOM节点树里的`body`节点，网页中即为`body`标签元素。

 

#### 35.1. scrollTop
```js
var scroll = document.documentElement.scrollTop || document.body.scrollTop;
// 或者
var scroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
```
- 在文档使用了DTD时，`document.body.scrollTop`的值为`0`。
  - 此时需要使用`document.documentElement.scrollTop`来获取滚动条滚过的长度；
- 在未使用DTD定义文档时，使用`document.body.scrollTop`获取值。


### 36. 图标ICON的解决方案

1. 上古时期，雪碧图`CSS sprite`
    - 无法缩放，无法用`CSS`控制
2. 近代，`Font Icon`
    - 用字体文件的字符编码代表图标，通过特定的`class`加伪类插入到浏览器中。
    - 
4. 现代和未来，`SVG`
    - 完全可控，而`Font Icon`只能控制字符相关的属性
    - `SVG`即取即用，`Font Icon`要下载全部的字体文件
    - `Font Icon`还有奇怪的`bug`，当文件加载失败时，浏览器可能把`Icon`渲染成各种各样的字符


### 37. `display:none => display: block`过程中其他动画不生效

比如`opacity: 0 => opacity: 1`，即使对透明度设置了动画，一样不起作用，除非去掉`display: none`，但会占据位置，违背了初衷。

解决方法：
`display: none;` => `display: block; opacity: 0;` => `display: block; opacity: 1;`
拆成两步走，第二步可以加动画。

#### 37.1. `react-transition-group`

`react-transition-group`这个库，可以给react组件添加动画。

enter (force a reflow, 添加动画效果)=> enter-active =>(自定义timeout) enter-done

exit是一样的流程


transition不会继承

### 38. `react-scripts`其实就是`create-rect-app`

### 39. `storybook`

开发组件而不是web应用常用的库

`info-addon`，最常用的`addon`，可以方便的生成说明文档。

react-docgen-typescript-loader，是docge的ts版本loader，主要目的就是生成`proptypes`表格

JSDOC格式的注释才能被显示出来


