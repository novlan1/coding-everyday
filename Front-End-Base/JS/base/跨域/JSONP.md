## JSONP


JSONP跨域的原理

1. 使用script 标签发送请求，这个标签支持跨域访问
2. 在script 标签里面给服务器端传递一个 callback
3. **callback 的值对应到页面一定要定义一个全局函数**（为什么是全局？因为服务端接收到callback函数后会返回页面中的script中去找，如果不写在全局作用域中根本找不到）
4. 服务端返回的是一个函数的调用。调用的时候会把数据作为参数包在这个函数里面。
5. 因为是通过script的src请求的，请求成功后立即执行。



```js
//动态创建script标签，并请求
function addScriptTag(src){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    document.body.appendChild(script);
};

//如：在onload后，跨域请求
window.onload = function(){
    addScriptTag('http://127.0.0.1:8080/jsonp?callback=monkey');
};

//回调的方法,且必须为全局方法，不然会报错
function monkey(data){
    alert(data);
};
```



Koa服务端：

```js
const Koa = require('koa');

const koaApp = new Koa();

let allHardInfo = {}

koaApp.use(async ctx => {
 const { callback } = ctx.query
 ctx.body = `${callback}(${JSON.stringify(allHardInfo)})`;
});

koaApp.listen(2345);
```