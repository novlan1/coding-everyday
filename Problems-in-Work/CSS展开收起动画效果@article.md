### CSS展开收起动画效果

最简单的实现是这样：
```css
.box{
  width: 100px;
  height: 50px;
  overflow: hidden;
  transition: height .5s;
}
.box:hover{
  height: 300px;
}
```


但是，如果元素高度是不固定的，上面就没办法了，如果把`height`改成`auto`，就失去了动画效果。

解决方案：

将`height`改成`max-height`，这时，`div`会自动计算高度，实现自适应。

不足之处是，当`max-height`设置过大时，收起时，有一点延迟。

```css
.box{
  width: 100px;
  max-height: 50px;
  overflow: hidden;
  transition: max-height .5s;
}
.box:hover{
  max-height: 300px;
}
```