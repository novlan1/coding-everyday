

### 样式中困扰我们的offsetWidth、clientWidth、width、scrollWidth、clientX、screenX、offsetX、pageX

1. `offsetWidth`, `offsetHeight` // 返回元素的宽度, 高度（包括**元素宽度、内边距和边框**，不包括外边距）
2. `clientWidth`, `clientHeight` // 返回元素的宽度, 高度（包括**元素宽度、内边距**，不包括边框和外边距）
3. `style.width`, `style.height` // 返回元素的宽度, 高度（包括**元素宽度**，不包括内边距、边框和外边距）
4. `scrollWidth`, `scrollHeight` // 返回元素的宽度, 高度（包括**元素宽度、内边距和溢出尺寸**，不包括边框和外边距），无溢出的情况，与`clientWidth`相同



注意:

1. `style.width` 返回的是字符串，如`28px`，`offsetWidth`返回的是数值`28`；
2. `style.width/style.height`与`scrollWidth/scrollHeight`是可读写的属性，`clientWidth/clientHeight`与`offsetWidth/offsetHeight`是只读属性
3. `style.width`的值需要事先定义，否则取到的值为空。而且必须要定义在`html`里(内联样式)，如果定义在`css`里，`style.height`的值仍然为空，但元素偏移有效；而`offsetWidth`则仍能取到。



在处理鼠标事件时,我们通常要知道鼠标的x,y位置

1. `clientX` 鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角x轴的坐标； 不随滚动条滚动而改变；
2. `clientY` 鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角y轴的坐标； 不随滚动条滚动而改变；
3. `pageX` 鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角x轴的坐标； 随滚动条滚动而改变；
4. `pageY` 鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角y轴的坐标； 随滚动条滚动而改变；
5. `screenX` 鼠标相对于显示器屏幕左上角x轴的坐标；
6. `screenY` 鼠标相对于显示器屏幕左上角y轴的坐标；
7. `offsetX` 鼠标相对于事件源左上角X轴的坐标
8. `offsetY` 鼠标相对于事件源左上角Y轴的坐标

![clientWidth和offsetWidth的区别](../../imgs/clientWidth_offsetWidth_diff.png)

