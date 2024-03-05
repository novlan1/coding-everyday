
> First Contentful Paint 标记了绘制出首个文本或首张图片的时间。

当前现状，`lighthouse` 截图：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_eb8b3c6b49e47273e1.png" width="500">



项目 FCP 耗时长，之前为 `4.2` 秒左右。可以通过在 `index.html` 中加个 `loading`，并在 `DOMContentLoaded` 事件发生时，去掉此`DOM`。


大致代码如下：

```js
<script>
  !function () {
    var i = document.createElement("div");
    i.innerHTML = '<style>.pre-loading{}</style><div class="pre-loading"></div>';
    document.body.appendChild(i);
    document.addEventListener("DOMContentLoaded", (function () {
      setTimeout((function () {
        document.body.removeChild(i)
      }))
    }))
  }()
</script>
```

有几个注意点：

1. 不要放到所有非异步脚本的后面，否则会等前面的脚本加载完才执行，太慢了
2. 不要用 `loading` 图片，因为图片加载也需要时间，可以直接用样式控制


优化效果，FCP降低到 1.7 秒。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_2825bf6c9816b208ec.png" width="500">

体验地址：https://h5-test.nes.smoba.qq.com/pvpesport.web.user.develop/#/
体验方法：模拟弱网