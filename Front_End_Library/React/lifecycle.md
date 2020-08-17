- [1. React 的生命周期](#1-react-的生命周期)
  - [1.1. getDerivedStateFromProps(nextProps, prevState)](#11-getderivedstatefrompropsnextprops-prevstate)
  - [1.2. getSnapshotBeforeUpdate(prevProps, prevState)](#12-getsnapshotbeforeupdateprevprops-prevstate)

## 1. React 的生命周期

16.0之前的生命周期：
![](../../imgs/react_old_lifecycle.png)

16.4之后的生命周期：
![](../../imgs/react_new_lifecycle.png)

### 1.1. getDerivedStateFromProps(nextProps, prevState)

代替componentWillReceiveProps()。

老版本中的componentWillReceiveProps()方法判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。

举个例子:



```js
// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({ 
      isLogin: nextProps.isLogin,   
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```

这两者最大的不同就是:

在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。

1. 在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。
2. 而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

### 1.2. getSnapshotBeforeUpdate(prevProps, prevState)

代替componentWillUpdate。

常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。

这两者的区别在于：

1. 在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
    componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
2. getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。

此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。

参考资料：
1. [详解React生命周期(包括react16最新版)](https://www.jianshu.com/p/514fe21b9914)
2. [React的生命周期](https://www.jianshu.com/p/b331d0e4b398)