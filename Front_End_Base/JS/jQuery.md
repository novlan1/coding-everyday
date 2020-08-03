## jQuery
### jQuery自执行函数与普通自执行函数的区别
JS自执行函数： 
```
(function(){
	//这里为调用的其它代码
})();
```
Jquery立即执行函数：
```
$(function(){
	//这里为要调用的其它代码
})
```
区别：
- 第一个为顺序执行，即如果要调用其它的js方法，则需要置于代码末尾。否则无法调用。
- 第二个可以为全部代码加载后再执行，因此，如果第一个放在代码末尾，两者功能一样。



### jQuery 中`$.fn`是什么意思
`jQuery.fn = jQuery.prototype`



### jQuery中的 ready 与 load 
jQuery 有3种针对文档加载的方法，其中一个是`ready`一个是`load`，这两个到底有什么区别呢？

`ready`与`load`谁先执行：
- 答案是`ready`先执行，`load`后执行。

`ready`与`load`的区别就在于资源文件的加载，`ready`构建了基本的DOM结构，所以对于代码来说应该越快加载越好。



### jQuery组件开发分类
1. 类级别组件开发：
```
jQuery.myPlugin = function(){
    // do sth
};
```
例如 `$.Ajax(), $.extend()`

2. 对象级别组件开发
```
$.fn.myPlugin = function(){
    // do sth
};
```
这里的`$.fn===$.prototype`
例如 `addClass()`，`attr()`

### 使用`$`好处：
1. 只有`$`会暴露在`window`全局变量
2. 将插件扩展统一到`$.fn.xxx`这一个接口，方便使用