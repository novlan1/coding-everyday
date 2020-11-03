## focus / focusin / focusout / blur 事件


`focus`:当`focusable`元素获得焦点时，不支持冒泡；
`focusin`:和`focus`一样，只是此事件支持冒泡；
`blur`:当`focusable`元素失去焦点时，不支持冒泡；
`focusout`:和`blur`一样，只是此事件支持冒泡；

用`focusin`和`focusout`的好处：

比如在body上监听这两个事件，可以捕获所有地方的`focus`