## 如何实现圆角钝角

```html
<div class="uTabWrap">
  <span class='uTab active'>空</span>
  <span class='uTab'>风火</span>
  <span class='uTab'>风火轮</span>
  <span class='uTab'>中华民族</span>
  <span class='uTab'>醉醺醺酒鬼</span>
</div>
```
```css
.uTabWrap {
  background: #15161b;
  line-height: 32px;
  padding: 20px;
}

.uTab {
  display: inline-block;
  cursor: pointer;
  margin-right: 8px;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 24px;
  height: 32px;
  text-align: center;
  background: rgba(49, 55, 69, 1);
  border-radius: 8px 8px 0px 0px;
  font-size: 14px;
  z-index: 100;
}
.uTab.active {
  background: rgba(45, 113, 246, 1);
  position: relative; /*关键*/
  font-weight: 600;
  color: #fff;
}

.uTab.active::after, 
.uTab.active::before{
  content: "";
  display: block;
  width: 35px;
  height: 32px;
  position: absolute;
  background: rgba(45, 113, 246, 1);
  top: 0;
  z-index: -1;
}

.uTab::after {
  transform: skewX(20deg); /*关键*/
  border-top-right-radius: 6px;
  right: -8px;
}

.uTab::before {
  transform: skewX(-20deg); /*关键*/
  border-top-left-radius: 6px;
  left: -8px;
}

.uTab:first-child.active::before,
.uTab:nth-last-of-type(1).active::after {
  display: none !important;
}
```
效果图：
![圆角钝角](/imgs/css_skewx_obtuse_angle.png)
