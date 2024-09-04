## marquee

marquee 滚动动画的核心是计算 wrap 宽度和 text 宽度，然后让 text 的 translateX 设置为 -wrapWidth，就可以滚动的。

并监听 transitionEnd 事件，重置 animationStyle，注意设置了一个中间变量 offset。

