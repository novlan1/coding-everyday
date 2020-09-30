## JS跳转页面与打开新窗口的方法

1.超链接
```html
<a href="http://www.jb51.net" title="脚本之家">Welcome</a>
```
等效于js代码
```js
window.location.href="http://www.jb51.net";     //在同当前窗口中打开窗口
```
 

2.超链接
```html
<a href="http://www.jb51.net" title="脚本之家" target="_blank">Welcome</a>
```
等效于js代码
```js
window.open("http://www.jb51.net");                 //在另外新建窗口中打开窗口
```