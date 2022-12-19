# css

## height与min-height

父元素设置 `min-height` 后，子元素设置 `height：100%` 无效。

父元素设置 `height` 后，子元素设置 `height：100%` 有效。

## fixed


position:fixed 的元素将相对于屏幕视口（viewport）的位置来指定其位置。并且元素的位置在屏幕滚动时不会改变。

但是在某些特定场景下，指定了 position:fixed 的元素却无法相对于屏幕视口进行定位。

MDN 中有句话对这些特定场景做了解释：

>当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。


## box-sizing

content-box 默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。


border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，**内容区的实际宽度是 width 减去(border + padding) 的值**。大多数情况下，**这使得我们更容易地设定一个元素的宽高**。

注：border-box 不包含 margin。

## 线性渐变、径向渐变、锥形渐变

线性渐变、径向渐变、锥形渐变的明显区别是，渐变色垂线方向的不同。

- 线性渐变垂线方向是从一条边到另一条边，两条边不一定水平或垂直
- 径向渐变垂线方向是从中心到两边
- 锥形渐变垂线是绕边360度方向




# less

## fade函数

LESS 的 fade() 函数在 SCSS 中只能使用 rgba() 之类的实现，因为 SCSS 没有这个函数。

