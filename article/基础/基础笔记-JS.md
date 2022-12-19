## 获取相对路径

```ts
const filePath = '/Users/mike/Documents/press-ui/node_modules/css-loader/dist/runtime/api.js';
const res = path.relative(process.cwd(), filePath);

// node_modules/css-loader/dist/runtime/api.js
// 如果filePath是绝对路径，这个方式可以获取其绝对路径
```

## js对象元素自动排序

js对象key为数字时，其元素会自动排序

```ts
const obj = { 2: 2, 0: 0 }
console.log(Object.keys(obj))
// 0 2

for (let item in obj) console.log(item)
// 0 2
```

参考：https://juejin.cn/post/7041049741458669576

## script error

服务器端如果没有设置 CORS，普通的跨域`<script>`标签，将只向`window.onerror`反馈尽量少的内容。

```ts
window.onerror = (...args) => console.log(args);  // ["Script error.", "", 0, 0, null]
```
给`<script>`标签添加 crossorigin 属性，

并在服务器端设置 `Access-Control-Allow-Origin` 响应头，允许脚本被跨域访问，

就可以在 `window.onerror` 中获取更详细的日志信息。

```
[
    "Uncaught ReferenceError: a is not defined", 
    "http://127.0.0.1:8081/index.js", 
    1, 
    1, 
    ReferenceError: a is not defined
        at http://127.0.0.1:8081/index.js:1:1]
```

注：

普通`<script>`标签是可以加载跨域脚本的，但如果给跨域`<script>`标签添加了crossorigin属性，（且服务器端没有设置 `Access-Control-Allow-Origin` 响应头），就会出现以下错误，

```
Access to Script at 'http://127.0.0.1:8081/index.js' from origin 'http://127.0.0.1:8080' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
Origin 'http://127.0.0.1:8080' is therefore not allowed access.
```

参考：https://www.jianshu.com/p/a45c9d089c93

