## 源码

### React16架构

React16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Scheduler、Reconciler、Renderer

`Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。

`Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。

`render`与`commit`阶段统称为`work`，即React在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。



### 代数效应

代数效应是函数式编程中的一个概念，用于将副作用从函数调用中分离。
假设我们有一个函数`getTotalPicNum`，传入2个用户名称后，分别查找该用户在平台保存的图片数量，最后将图片数量相加后返回。

```js
function getTotalPicNum(user1, user2) {
  const num1 = getPicNum(user1);
  const num2 = getPicNum(user2);

  return picNum1 + picNum2;
}
```
我们虚构一个类似`try...catch`的语法 —— `try...handle`与两个操作符`perform`、`resume`。
```js
function getPicNum(name) {
  const picNum = perform name;
  return picNum;
}

try {
  getTotalPicNum('kaSong', 'xiaoMing');
} handle (who) {
  switch (who) {
    case 'kaSong':
      resume with 230;
    case 'xiaoMing':
      resume with 122;
    default:
      resume with 0;
  }
}
```
与`try...catch`最大的不同在于：当`Error`被`catch`捕获后，之前的调用栈就销毁了。而`handle`执行`resume`后会回到之前`perform`的调用栈。

### 异步可中断更新

在React15及以前，Reconciler采用递归的方式创建虚拟DOM，**递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿**。

为了解决这个问题，React16将递归的无法中断的更新重构为异步的可中断更新。

异步可中断更新可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

### Fiber



我们可以将纤程(`Fiber`)、协程(`Generator`)理解为代数效应思想在JS中的体现。

`React Fiber`可以理解为：

React内部实现的一套状态更新机制。**支持任务不同优先级**，**可中断与恢复**，**并且恢复后可以复用之前的中间状态**。

其中每个任务更新单元为`React Element`对应的`Fiber`节点。

Fiber节点可以保存对应的DOM节点。相应的，Fiber节点构成的Fiber树就对应DOM树。

### 双缓存

当我们用`canvas`绘制动画，每一帧绘制前都会调用`ctx.clearRect`清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种**在内存中构建并直接替换**的技术叫做双缓存 (`opens new window`)。

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

### 双缓存Fiber树

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的`Fiber`树称为`current Fiber`树，正在内存中构建的`Fiber`树称为`workInProgress Fiber`树。

`current Fiber`树中的Fiber节点被称为`current fiber`，`workInProgress Fiber`树中的Fiber节点被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

React应用的根节点通过`current`指针在不同`Fiber`树的`rootFiber`间切换来实现Fiber树的切换。

当`workInProgress Fiber`树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向`workInProgress Fiber`树，此时`workInProgress Fiber`树就变为`current Fiber`树。

每次状态更新都会产生新的`workInProgress Fiber`树，通过`current`与`workInProgress`的替换，完成DOM更新。





