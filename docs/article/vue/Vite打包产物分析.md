如果是index.html只引用了空的main.js，main.js只打印了console.log('123')，那么打包产物除了console这一句外，还有下面这些。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/7/vite-build-code.jpeg" width="800">

就是modulepreload的polyfill，在不支持这个属性的浏览器中预加载一些资源。




