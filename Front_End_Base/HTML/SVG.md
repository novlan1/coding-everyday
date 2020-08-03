## SVG

### a. 基本图形
```html
<rect>，x,y,width,height,rx,ry

<circle>，cx, cy, r

<ellipse>，cx, cy, rx ry

<line>，x1,y1,x2,y2

<polyline>，points="x1 y1 x2 y2 x3 y3"
<polygon>，points="x1 y1 x2 y2 x3 y3"
```

### b. 基本属性
- `fill`填充颜色
- `stroke`描边颜色
- `stroke-width` 
- `transform`

注意：

- 圆的cx、cy是到圆心的位置
- 矩形的x y 是到矩形左上角的位置



### c. 基本操作API
创建图形：`document.createElementNS(ns,tagName);`
添加图形：`element.appendChild(childElement)`

设置/获取属性：
`element.setAttribute(name,value)`
`element.getAttribute(name)`

```html
<svg width="400" height="300" viewBox="0,0,40,30" preserveAspectRatio = "xMinYMin meet"></svg>
```
- 世界：SVG代码 无限大
- 视野：`viewBox` (观察区域)、`preserveAspectRatio`，这两属性控制视野
- 视窗：在 SVG 标签当中可以指定⼀个宽和⾼属性，来表⽰ SVG ⽂件渲染的区域⼤⼩。这个⼤⼩也可以使⽤样式表来定义。这个区域⼤⼩，就是视窗。


### d. `preserveAspectRatio`
- meet: 让viewBox等比例的同时，viewBox完全在SVG中显示。viewBox大于SVG，等比例缩放。
- slice: 保持viewBox比例，视野包含视窗，尽量填满SVG。viewBox大于SVG，不缩放，按SVG大小剪切。
- 对齐方式：xMinYMin xMinYMid xMinYMax xMidYMin xMidYMid xMidYMax xMaxYMin xMaxYMid xMaxYMax
- none: 不关心比例，viewBox直接拉伸到最大填满viewport.


### e. SVG中的图形分组
- `<g>`标签用来创建分组
- 属性继承




### f. SVG四个坐标系
1. User Coordinate--用户坐标系；(SVG中用户视野坐标系，也被称为原始坐标系)
2. Current Corrdinate--自身坐标系；(图形绘制后自身携带的坐标系，用户自身宽高等定义均基于自身坐标系)
3. Previous Coordinate--前驱坐标系；(父容器的坐标系)
4. Reference Coordinate--参考坐标系；（主要用于定义自身坐标系和前驱坐标系的关系）

图形变换：自身坐标系相对于前驱坐标系进行坐标变换；


### g. 渐变
在 SVG 中，有两种主要的渐变类型：
- 线性渐变
- 放射性渐变


线性渐变可被定义为水平、垂直或角形的渐变：

当 y1 和 y2 相等，而 x1 和 x2 不同时，可创建水平渐变
当 x1 和 x2 相等，而 y1 和 y2 不同时，可创建垂直渐变
当 x1 和 x2 不同，且 y1 和 y2 不同时，可创建角形渐变


### h. SVG 圆弧命令：
`A（a）rx ry x-axis-rotation large-arc-flag sweep-flag x y`
命令解析如下：
- .rx：规定圆弧在x轴方向的半径尺寸。
- .ry ：规定元素在y轴方向的半径尺寸，如果与rx相等则正圆圆弧，否则是椭圆圆弧。
- .x-axis-rotation：规定圆弧的横轴与x轴的夹角，正数表示顺时针旋转，反之表示逆时针。
- .large-arc-flag：规定绘制大圆弧还是小圆弧，1表示绘制大角度圆弧，0表示绘制小角度圆弧。
- .sweep-flag：规定绘制顺时针方向绘制，还是逆时针方向绘制，1表示顺时针，0表示逆时针。
- .x：规定圆弧终点的x轴坐标。
- .y：规定圆弧终点的y轴坐标。


### i. 线性(左标)变换
<img src='../imgs/svg_linear_change.png' height='200'/>

```
X = aX + cY +e
```
平移是`e f`，缩放是`a d`，旋转是`b c`


### j. 颜色HSL

H：表示色环的度数（红：0deg，绿：120deg，蓝：240deg）
S：表示色彩饱和度（100%颜色最艳，0%颜色退化为灰度）
L：表示明暗程度（100%颜色最亮为白色，0%颜色最暗为黑色）


配色的一个网站 http://paletton.com/



### k. 笔刷
绘制纹理，`<pattern>`标签
- `patternUnits="userSpaceOnUse"`，指定pattern标签本身的属性单位基于世界坐标系
  - patternUnits 笔刷使用单位
- `patternContentUnits="objectBoundingBox"`，pattern里面的每一个元素的单位都是基于绘制图形的一个八维盒
  - patternContentUnits 笔刷内容（笔刷内部包含的图形单元）使用单位


`objectBoundingBox` 模式下的比例均为相对于`boundingbox`。也就是不是根据父标签来定义比例。




### l. path命令
参数之间可以⽤空格或逗号隔开，有⼀种情况例外，就是下⼀个数值是负数。
如`<path d="M0,0L10,20C30-10,40,20,100,100" stroke="red">`
<img src='../imgs/svg_path.png' height='350'/>

`M(X,Y)` 移动画笔，后面如果有重复参数，会当做是`L`命令处理



path命令基本规律：
1. 区分大小写：大写表示坐标参数为绝对位置，小写为相对位置
2. 最后的参数表示最终要到达的位置
3. 上一个命令结束的位置就是下一个命令开始的位置
4. 命令可以重复参数表示重复执行同一条命令




### m. 弧线(`arc`)命令
`A(rx, ry, xr, laf, sf, x, y)`  七个参数


- rx - (radius-x) 弧线所在椭圆的x半轴长
- ry - (radius-y) 弧线所在椭圆的y半轴长
- xr - (xAxis-rotation) 弧线所在椭圆的长轴角度
- laf - (large-arc-flag) 是否选择弧长较长的那一段弧
- sf - (sweep-flag) 是否选择逆时针方向的那一段弧
- x,y = 弧的终点位置


### n. 贝塞尔曲线命令 - 光滑曲线
- T:Q的光滑版本
  C1是上一段曲线的控制点关于当前曲线起始点的镜像位置
- S:C的简化版本
  C1是上一段曲线的控制点2关于当前曲线起始点的镜像位置

<img src='../imgs/svg_curve.png' height='200' />



### o. SVG文本
`<text x="" y="" dx="10 20 30 40 50 60" dy=""></text>`
`dx`可对每个字体控制

`text`中的`dy`能被`tspan`中的`dy`覆盖
`dy`具有向下传递的效果，`text`传递给下个字符，`tspan`传递给下个`tspan`(当无`tspan` 传递给字符)



#### 垂直居中
- 水平居中对齐 `text-anchor`
- 垂直居中对齐 `dominant-baseline`  加上自己模拟



#### `<textPath>` 路径文本，可以让文本沿着路径排列，比如：曲线等
- 定位属性 `x y dx dy`
- `dy` 影响法线方向的偏移量
- `text-anchor`和`startOffSet` 设置文本偏移的方向和大小

使用`textpath` 属性` xlink:href="#path1"` 将包含的文本节点text设置到对应的id的path上,
设置该属性需要使用
`setAttributeNS(NS,attrName,attrValue);`



### p. 图形的引用，裁切和蒙版

1. use 标签创建图形引用
2. clip标签裁切图形
3. mask标签创建蒙版
```html
<use>
 xlink:href="#id"
<clipPath>
 clip-path="url(#clip-id)"
<mask>
 mask="url(#mask-id)
```

svg是内联元素,不将`font-size,line-height`设为0撑满之后会出现滚动条
使用use标签,属性`xlink:href`通过ID引用一个绘制好的图形，`defs`标签内定义的图形不会被显示。

`xLink:href` 已经废除， 可用href 代替。

```html
viewBox="-400 -300 800 600"  preserveAspectRatio="xMidYMid slice" 
```
指定SVG坐标系原点在屏幕中央，方便对齐



### q. 字体抗锯齿
```css
-webkit-font-smothing: antialiased;
```
