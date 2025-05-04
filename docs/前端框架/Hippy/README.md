## Hippy


1、问题：使用`ul`时报错转化为字符串失败
 
解决：hippy中`ul-li`的 type 必须是字符串
                 

2、问题：页面中报错只能包含一个元素

解决：排查发现，`overflow-y:scroll`的元素内只能有一个子元素，否则会报错；也可以不设置此属性，直接用ul元素


3、问题：安卓手机上`ul`下拉刷新不生效

解决：从日志中查看到触发的事件中有`loadMore`，尝试后发现这个方法可以实现下拉刷新，但文档中未提及

注意：`ul`上以下两种方法都要加

```jsx
<ul      
@endReached="loadmore" // ios
@loadMore="loadmore" // andriod
</ul>
```


