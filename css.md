### CSS优先级

#### CSS选择器的优先级关系
内联 > ID选择器 > 类选择器 > 标签选择器。

#### 浏览器具体的优先级算法是怎样的？

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


#### 怎么比较两个优先级的高低？
现在已经弄清楚了优先级是怎么算的了。但是，还有一个问题，怎么比较两个优先级的高低呢？
比较规则是: **从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较** 。**如果4位全部相等，则后面的会覆盖前面的**。


#### 覆盖内联样式方法
内联样式的优先级是最高的，但是外部样式有没有什么办法覆盖内联样式呢？有的，那就要`!important`出马了。因为一般情况下，很少会使用内联样式 ，所以`!important`也很少会用到！如果不是为了要覆盖内联样式，建议尽量不要使用`!important`。
如果内联样式用了`!important`，外部样式就没有办法了。所以**千万不要在内联样式中使用`!important`**。


### 伪类和伪元素的区别

伪类和伪元素的根本区别在于：它们是否**创造了新的元素**。

1. 伪元素/伪对象：不存在在DOM文档中，是虚拟的元素，是创建新元素。代表某个元素的子元素，这个子元素虽然在**逻辑上存在**，但却**并不实际存在于文档树中**。例如：用`::before`和`::after`。
2. 伪类：表示**已存在的某个元素处于某种状态**，但是通过dom树又无法表示这种状态，就可以通过伪类来为其添加样式。例如a元素的`:hover`, ` :active`等。

伪元素：
![伪元素](imgs/pseudo_elements.png)



伪类：
![伪类](imgs/pseudo_classes.png)

另外：

1. 伪类的效果可以通过**添加实际的类**来实现
2. 伪元素的效果可以通过**添加实际的元素**来实现
3. 所以它们的本质区别就是是否抽象**创造了新元素**

注意：
1. 伪类只能使用`：`
2. 除了`::placeholder`和`::selection`，伪元素既可以使用`:`，也可以使用`::`。
3. 因为伪类是类似于添加类所以可以是多个，而伪元素在一个选择器中只能出现一次，并且只能出现在末尾。


#### `:after/::after`和`:before/::before`的异同
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

参考资料：[伪类和伪元素的区别](https://www.cnblogs.com/xmbg/p/11608268.html)，[伪类和伪元素的区别总结](https://blog.csdn.net/qq_27674439/article/details/90608220)




###  absolute、relative、fixed、static 的区别
- absolute：相对于**上一级不是static的元素**定位，脱离文档流。
- relative：相对于**上一级**定位，static也可以，不脱离文档流，保留原来的位置。
- fixed：相对于**浏览器窗口**定义，脱离文档流。
- static：不定位。

### `display:none`与`visibility：hidden`的区别？
1. `display：none` 不显示对应的元素，在文档布局中不再分配空间（**回流reflow + 重绘repaint**）
2. `visibility：hidden` 隐藏对应元素，在文档布局中仍保留原来的空间（**重绘repaint**）


### 为什么会出现浮动？什么时候需要清除浮动？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

浮动带来的问题：
1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

### 清除浮动的方式

1. 父级div定义`height`
2. 最后一个浮动元素后加空div标签 并添加样式`clear:both`。
3. 包含浮动元素的父标签添加样式`overflow为hidden或auto`。
4. 父级div定义`zoom`

### overflow 清除浮动的原理

要讲清楚这个解决方案的原理，首先需要了解块格式化上下文，块格式化上下文是CSS可视化渲染的一部分，它是一块区域，规定了内部块盒 的渲染方式，以及浮动相互之间的影响关系

当元素设置了overflow样式且值不为visible时，该元素就**构建了一个BFC，BFC在计算高度时，内部浮动元素的高度也要计算在内**，也就是说技术BFC区域内只有一个浮动元素，BFC的高度也不会发生塌缩，所以达到了清除浮动的目的。



### img标签的title与alt区别
1. title属性规定关于元素的额外信息。这些信息通常会在**鼠标移到元素上**时显示一段工具**提示文本（tooltip text）**。在显示的内容被省略的时候，可以加一个title属性，快速实现提示文本。
2. alt属性alt定义有关图形的短的描述。在**图片加载失败了**的时候，会显示该描述。


另外，注意`onerror`属性：
`onerror`属性找图片加载失败了的时候，可以使用`onerror`将图片替换为默认图片。注意，一定要**在`onerror`里面将`onerror`置空**，不然在新的图片也加载失败后，会形成死循环。
```
<img src="http://example.com/a.png" onerror="this.onerror=''; this.src='http://example.com/b.png'">
```

### 实现一个两列等高布局

为了实现两列等高，可以给每列加上 `padding-bottom:预加载; margin-bottom:-9999px;`
同时父元素设置`overflow:hidden;`



### flex布局
首先要有个容器，并设置`display: flex; display: -webkit-flex;`
该容器有以下六个属性：

- flex-direction (元素排列方向)
  - row, row-reverse, column, column-reverse
- flex-wrap (换行)
  - nowrap, wrap, wrap-reverse
- flex-flow (以上两者的简写)
  - flex-direction || flex-wrap
- justify-content (水平对齐方式)主轴
  - flex-start, flex-end, center, space-between, space-around
- align-items (垂直对齐方式)交叉轴
  - stretch（拉伸）, flex-start, flex-end, center, baseline（文字底部对齐）
- align-content (多行垂直对齐方式)
  - stretch, flex-start, flex-end, center, space-between, space-around

项目的属性：

- order 排列顺序，数值，默认0
  - "integer"
- flex-grow定义放大比例，默认0，即如果存在剩余空间，也不放大。
  - "number"
- flex-shrink定义缩小比例，默认1，如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
   - "number"
- flex-basis 定义项目占据的主轴空间，默认auto。会根据flex-direction定义的主轴（水平或者垂直），定义项目本来的大小，跟width或者height一样。

- flex 推荐，以上三个的缩写，默认 0 1 auto
  - "flex-grow" "flex-shrink" "flex-basis"
- align-self单个项目有与其他项目不一样的对齐方式，可覆盖align-items
  - "auto","flex-start","flex-end","center","baseline","stretch"　


注意：flex 弹性盒子**消除了里面元素的 block 属性**，因此里面**不用加 Inline-block**


### BFC及其作用

BFC( block formatting context ）：简单来说，BFC 就是一种属性，这种属性会影响着元素的定位以及与其兄弟元素之间的相互作用。 

中文常译为**块级格式化上下文**。是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。 
在进行盒子元素布局的时候，BFC提供了一个环境，在这个环境中按照一定规则进行布局不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。
也就是说，**如果一个元素符合了成为BFC的条件，该元素内部元素的布局和定位就和外部元素互不影响(除非内部的盒子建立了新的 BFC)**，是一个隔离了的独立容器。（在 CSS3 中，BFC 叫做 Flow Root）


BFC（块级格式化上下文，用于**清除浮动，防止margin重叠**等）
- 直译成：块级格式化上下文，是一个**独立的渲染区域，并且有一定的布局规则**。
- BFC区域不会与float box重叠
- BFC是页面上的一个独立容器，**子元素不会影响到外面**
- 计算BFC的高度时，浮动元素也会参与计算

### 哪些元素会生成BFC
1. 根元素
2. float不为none的元素
3. position为fixed和absolute的元素
4. display为inline-block、table-cell、table-caption，flex，inline-flex的元素
5. overflow不为visible的元素


### 关于js动画和CSS3动画的差异性

渲染线程分为`main thread`和`compositor thread`，如果css动画**只改变`transform和opacity`，这时整个CSS动画得以在`compositor trhead`完成（而js动画则会在`main thread`执行，然后触发`compositor thread`进行下一步操作）**，特别注意的是如果改变`transform和opacity`是不会layout或者paint的。
区别：

1. **功能涵盖面**，js比CSS3大
2. **实现/重构难度**不一，CSS3比js更加简单，性能调优方向固定
3. 对帧速表现不好的低版本浏览器，CSS3可以做到**自然降级**
4. CSS3动画有天然事件支持
5. CSS3有兼容性问题



### link标签和@import标签的区别
1. `link`属于`html`标签，而`@import`是`css`提供的
2. 页面被加载时，`link`会**同时被加载**，而`@import`引用的css会等到**页面加载结束后**加载。
3. link是html标签，因此没有**兼容性**，而@import只有`IE5`以上才能识别。
4. 当用`JS`控制`dom`去**改变样式**的时候，只能使用link标签，由于 DOM 方法是**基于文档**的，无法使用@import的方式插入样式。



### F5 和 Ctrl+F5 的区别

1. `F5`触发的HTTP请求的请求头中，通常包含了**`If-Modified-Since`或`If-None-Match`字段**，或者两者兼有。如果服务器认为被请求的文件没有发生变化，则返回**304响应**,也就没有跳过缓存。
2. `CTRL+F5`触发的HTTP请求的请求头中没有上面的那两个头，却有**`Pragma: no-cache`或`Cache-Control: no-cache`字段**，或者两者兼有。服务器看到no-cache这样的值就会把**最新的文件**响应过去，也就跳过了缓存。



### ajax解决浏览器缓存问题
1. 在ajax发送请求前加上`anyAjaxObj.setRequestHeader ( "If-Modified-Since","0")`。
2. 在ajax发送请求前加上 `anyAjaxObj.setRequestHeader ( "Cache-Control","no-cache")`。
3. 在URL后面加上一个**随机数**：` "fresh=" + Math.random()`。
4. 在URL后面加上**时间戳**：`"nowtime=" + new Date().getTime()`。
5. 如果是使用`jQuery`，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。





