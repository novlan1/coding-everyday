- [1. bootstrap栅格系统](#1-bootstrap栅格系统)
- [2. bootstrap 栅格系统的工作原理](#2-bootstrap-栅格系统的工作原理)
- [3. bootstrap快速添加margin、padding](#3-bootstrap快速添加marginpadding)

### 1. bootstrap栅格系统

栅格布局，一共12份，父级`className='row'`，子元素`className='col-8'`



### 2. bootstrap 栅格系统的工作原理

- 行（`row`）必须包含在`.container`（固定宽度）或`.container-fluid`（100%宽度）中，以便为其赋予合适的排列（`aligment`）和内补（`padding`）。
- 通过行（`row`）在水平方向创建一组“列（`column`）”。
- 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（row）”的直接子元素。
- 通过为“列（`column`）”设置`padding`属性，从而创建列与列之间的间隔（`gutter`）。通过为`.row`元素设置负值`margin`从而抵消掉为`.container`元素设置的`padding`，也就间接为“行（`row`）”所包含的“列（`column`）”抵消掉了`padding`。

- 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个`.col-xs-4`来创建。
- 如果一“行（`row`）”中包含了的“列（`column`）”大于12，多余的“列（`column`）”所在的元素将被作为一个整体另起一行排列。



### 3. bootstrap快速添加margin、padding

bootstrap中，`mx-/px-`对应的尺寸：
- mx-0为0，
- mx-1: 0.25rem, 
- mx-2: 0.5rem, 
- mx-3: 1rem, 
- mx-4: 1.5rem, 
- mx-5: 3rem
