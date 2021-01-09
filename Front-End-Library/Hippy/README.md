## Hippy


（1）hippy中ul-li的 type 必须是字符串，否则会报转化字符串失败
                 
（2）overflow-y:scroll的元素内只能有一个子元素，否则会报错；也可以不设置此属性，直接用ul元素
（3）ul上以下两种方法都要加
```jsx
<ul      
@endReached="loadmore" // ios
@loadMore="loadmore" // andriod
</ul>
```


