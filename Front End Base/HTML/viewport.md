### Viewport

1. `iphone5`的分辨率是 `640dp * 1136 dp`（物理像素）
    `dp,pt`： `device independent pixels` 设备无关的像素
2. 开发中应该是`320px * 568px` （逻辑像素）
    `px: css pixel` （逻辑像素），浏览器使用的抽象单位
3. `dpr:devicePixelRatio` 设备像素缩放比
    计算公式：`1px`等于`dpr的平方`乘`物理像素`


- `DPI`：打印机每英寸可以喷的墨汁点（印刷行业）
- `PPI`：屏幕每英寸的像素数量，即单位英寸内的像素密度



`viewport` 的构成：

1. `visual viewport`：视口视图（**设定缩放scale**）
2. `layout viewport`：布局视图（**承载底层布局**）



手机浏览器对页面默认行为：

1. 渲染在`viewport`（保证基本布局正确）
2. 对页面进行缩放（保证页面显示完整）



注意：

- 苹果浏览器默认`layout viewport`是`980px`，所以一张`320px`或者`640px`的图片都是铺不满的。
- `meta`标签设置的是`layout viewport`



`layout viewport`和`visual viewport`对应的获取宽度API

- 布局 viewport 宽度（meta 设置）：`document.body.clientWidth`
- 度量 viewport 宽度（css 设置）：`window.innerWidth`
- 缩放比：`window.innerWidth / document.body.clientWidth`



设置`width=device-width`后, 如果页面中宽度小于`device-width`，比如`320px`，显示是没问题的， `document.body.clientWidth = window.innerWidth = 320`。

但是，如果页面总宽度大于`device-width`，那么会自动缩小，比如`document.body.clientWidth = 320，window.innerWidth = 390`，默认缩放比就是`390/320`，这时就需要设置`initial-scale=1.0`，不让它自动缩放，这样`document.body.clientWidth` 和 `window.innerWidth` 都是`320`了


总结：`width=device-width`，让`布局viewport`时刻等于设备宽度；`initial-scale=1`，让`布局viewport`时刻等于`度量viewport`。



移动web最佳`viewpoint`设置：

- `布局viewport` = 设备宽度 = `度量viewpoint`



最常用代码：

```
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```
