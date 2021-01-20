## Vue图片放大器的实现

介绍一个Vue的图片放大器插件`v-image-preview`，主要是利用了对图片`transfrom`和背景色的`transition`。

先看效果

![img](http://km.oa.com/files/photos/pictures/202101/1610198775_91_w320_h162.gif)

实现的注意点：

1. 要实现原地放大，就要拿到原来img标签的`left`和`top`，因为以后还要归位，以及它的`naturalWidth`、`naturalHeight`.
2. 给图片设定基准宽度，然后设定transform比例，才能做到回归原来位置的效果

具体代码可参考：https://github.com/novlan1/v-image-preview


