- [1. flex布局](#1-flex布局)
- [2. `flex:1;`的含义](#2-flex1的含义)
- [3. `flex-basis` 和 `width` 的优先级](#3-flex-basis-和-width-的优先级)


### 1. flex布局
首先要有个容器，并设置`display: flex; display: -webkit-flex;`
该容器有以下六个属性：

- flex-direction (元素排列方向)
  - row, row-reverse, column, column-reverse
- flex-wrap (换行)
  - nowrap, wrap, wrap-reverse
- flex-flow (以上两者的简写)
  - flex-direction || flex-wrap
- justify-content (水平对齐方式)主轴
  - flex-start, flex-end, center, space-between, space-around
- align-items (垂直对齐方式)交叉轴
  - stretch（拉伸）, flex-start, flex-end, center, baseline（文字底部对齐）
- align-content (多行垂直对齐方式)
  - stretch, flex-start, flex-end, center, space-between, space-around



项目的属性：

- order 排列顺序，数值，默认`0`
  - "integer"
- flex-grow定义放大比例，默认`0`，即如果存在剩余空间，也不放大。
  - "number"
- flex-shrink定义缩小比例，默认`1`，如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
   - "number"
- flex-basis 定义**项目占据的主轴空间**，默认`auto`。会根据flex-direction定义的主轴（水平或者垂直），定义项目本来的大小，跟width或者height一样。

- flex 推荐，以上三个的缩写，默认`0 1 auto`
  - "flex-grow" "flex-shrink" "flex-basis"
- align-self单个项目有与其他项目不一样的对齐方式，可覆盖align-items
  - "auto","flex-start","flex-end","center","baseline","stretch"　


注意：flex 弹性盒子**消除了里面元素的 block 属性**，因此里面**不用加 Inline-block**



### 2. `flex:1;`的含义

- 默认`flex`属性是`0 1 auto`，【父控件有剩余控件也不放大，父控件空间不足按1缩小，保持本身的空间大小】

- `flex:1;`的值是`1 1 0%`，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】

```
flex为none：0 0 auto  （不放大也不缩小）
flex为auto：1 1 auto  （放大且缩小）

flex为一个非负数字n：该数字为flex-grow的值，
flex：n；=  flex-grow：n；
           flex-shrink：1；
           flex-basis：0%；

flex为两个非负数字n1，n2： 分别为flex-grow和flex-shrink的值，
flex：n1 n2; = flex-grow：n1；
               flex-shrink：n2；
               flex-basis：0%；

flex为一个长度或百分比L：视为flex-basis的值，
flex: L; =  flex-grow：1；
            flex-shrink：1；
            flex-basis：L；

flex为一个非负数字n和一个长度或百分比L：分别为flex-grow和flex-basis的值，
flex：n L；= flex-grow：n；
            flex-shrink：1；
            flex-basis：L;
```


参考资料：[flex, 博客园](https://www.cnblogs.com/LangZ-/p/12703858.html)，[flex, MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)


### 3. `flex-basis` 和 `width` 的优先级
当一个元素同时被设置了 `flex-basis` (除值为 auto 外) 和 `width` (或者在 `flex-direction: column` 情况下设置了 `height`) , `flex-basis` 具有更高的优先级.

1. 如果没有设置`flex-basis`属性，那么`flex-basis`的大小就是项目的`width`属性的大小；
2. 如果没有设置`width`属性，那么`flex-basis`的大小就是项目内容(`content`)的大小。

