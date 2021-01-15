## JS监听浏览器离开页面

**onunload，onbeforeunload**都是在刷新或关闭时调用，可以在`<script>`脚本中通过window.onunload来指定或者在`<body>`里指定。

区别：

- **onbeforeunload在onunload之前执行，它还可以阻止onunload的执行**。 
- **onbeforeunload是正要去服务器读取新的页面时调用，此时还没开始读取**；而**onunload则已经从服务器上读到了需要加载的新的页面**，在即将替换掉当前页面时调用。
- **onunload是无法阻止页面的更新和关闭的，而 onbeforeunload 可以做到**。


- 页面加载时只执行onload
- 页面关闭时先执行onbeforeunload，最后onunload 
- **页面刷新时先执行onbeforeunload，然后onunload，最后onload**


```
window.onbeforeunload=function(e){     
　　var e = window.event||e;  
　　e.returnValue=("确定离开当前页面吗？");
} 
```

