### 1. 移动端 1px 像素问题及解决办法
问题出现原因：如果移动显示屏的分辨率始终是普通屏幕的2倍，1px的边框在`devicePixelRatio=2`（设备的物理像素和逻辑像素的比值）的移动显示屏下会显示成`2px`，所以在高清屏下看着`1px`总是感觉变胖了

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

### 2. 画一条0.5px的线
- 采用meta viewport的方式：  
```
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
- 采用`border-image`的方式
- 采用`transform: scale()`的方式


