## uni-icons

uni-icons本质用的是字体文件，所以不支持多色，用字体的优势是比较普适，因为小程序不支持svg。

icon实现有以下几种：

- 雪碧图
  - 本质是图片，缺点是维护困难，每新增一个图标，都需要改动原始图片
- unicode
  - 原理：使用了Unicode中`E000 - F8FF`这一私用区范围，并通过 @font-face 引入自定义字体(其实就是一个字体库) 
  - 优势：兼容性好，支持ie6+；支持按照字体的方式调整icon大小、颜色
  - 劣势：不支持多色；在不同的设备浏览器字体的渲染会略有差别；书写不直观，语义不明确
- font
  - font-class 是 Unicode 使用方式的一种变种
  - 优势：相比unicode，书写直观，语义明确；当要替换图标时，只需要修改 class 里面的 Unicode 引用
- svg
  - 优势：支持多色图标；矢量，缩放不失真
  - 劣势：兼容性较差，支持 IE9+，及现代浏览器


uni-icons主要代码如下：

```scss
@font-face {
  font-family: uniicons;
  src: url('./uniicons.ttf') format('truetype');
}

.uni-icons {
  font-family: uniicons;
  text-decoration: none;
  text-align: center;
}

.uniui-arrow-up:before {
  content: "\e6bd";
}


.uniui-arrow-down:before {
  content: "\e6be";
}
```


我们项目没使用uni-icons，而是另一个iconfont库，原理一样，小程序中`iconfont.css`写在了项目中，H5的`iconfont.css`使用了外链。

## uni-transition

uni-transition核心是用了uni.createAnimation这个方法。

既然style不能传递对象，那么组件内部做一层处理，传递styles，在组件内部拼接成style。

用了setTimeout，来延迟执行操作。


## picker

uni-app内置picker-view，其DOM结构如下：

```html
<uni-picker-view
  style="position: relative;"
>
  <uni-resize-sensor>
    <div><div /></div>
    <div><div /></div>
  </uni-resize-sensor>
  <div class="uni-picker-view-wrapper">
    <!-- 内容 -->
  </div>
</uni-picker-view>
```

两层嵌套：
- uni-picker-view
  - uni-resize-sensor
  - uni-picker-view-wrapper
    - 实际内容 




uni-app内置picker-view-column，其DOM结构如下：

```html
<uni-picker-view-column>
  <div class="uni-picker-view-group">
    <div
      class="uni-picker-view-mask"
      style="background-size: 100% 125px;"
    />
    <div
      class="uni-picker-view-indicator"
      style="height: 50px;"
    >
      <uni-resize-sensor>
        <div><div /></div>
        <div><div /></div>
      </uni-resize-sensor>
    </div>
    <div
      class="uni-picker-view-content picker-view-column-1667531825290"
      style="padding: 125px 0px; transform: translateY(-300px) translateZ(0px);"
    >
     <!-- 循环内容 -->
    </div>
  </div>
</uni-picker-view-column>
```

也可以当作两层嵌套吧：

- uni-picker-view-column
  - uni-picker-view-group
  - uni-picker-view-indicator
    - uni-resize-sensor
  - uni-picker-view-content
    - 实际内容 

