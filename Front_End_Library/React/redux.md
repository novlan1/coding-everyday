- [1. Redux](#1-redux)
  - [1.1. 为什么用redux？](#11-为什么用redux)
  - [1.2. 三大原则](#12-三大原则)
  - [1.3. 常见概念](#13-常见概念)
    - [1.3.1. Action](#131-action)
    - [1.3.2. Reducer](#132-reducer)
    - [1.3.3. Redux middleware](#133-redux-middleware)
    - [1.3.4. `Redux middleware`的本质](#134-redux-middleware的本质)
  - [1.4. `redux`中的`reducer`为什么叫做`reducer`？](#14-redux中的reducer为什么叫做reducer)
  - [1.5. action异步，为什么需要中间件？](#15-action异步为什么需要中间件)
  - [1.6. 为什么叫 thunk ？](#16-为什么叫-thunk-)
  - [1.7. `react-redux`数据流](#17-react-redux数据流)
  - [1.8. `mapStateToProps` 和 `mapDispatchToProps`](#18-mapstatetoprops-和-mapdispatchtoprops)
  - [1.9. 为什么reducer是纯函数](#19-为什么reducer是纯函数)

## 1. Redux

### 1.1. 为什么用redux？

- 不用的话只能A流向子组件B，B流向子组件C，不能跨级，这时需要redux。
- 更好的管理状态
  - 随着单页面应用的普及，web app内部需要管理的状态越来越多，这些状态可能来自服务器端，用户输入的数据，用户交互数据，当前UI状态，本地的缓存数据等等。如何能够有条理的管理这些数据，成为前端开发中一个难题。


### 1.2. 三大原则

- 单一数据源
  - 使用redux的程序，所有的state都存储在一个单一的数据源store内部，类似一个巨大的对象树。

- state是只读的
  - state是只读的，能改变state的唯一方式是通过触发action来修改

- 使用纯函数执行修改
  - 为了描述 action 如何改变 state tree ， 你需要编写 reducers。
  - reducers是一些纯函数，接口当前state和action。只需要根据action，返回对应的state。而且必须要有返回。
  - 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数

### 1.3. 常见概念

#### 1.3.1. Action

```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象。

我们约定，action 内必须使用一个字符串类型的type字段来表示将要执行的动作。多数情况下，type会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放action。


#### 1.3.2. Reducer

- Action 只是描述了有事情发生了这件事实，但并没有说明要做哪些改变，这正是reducer需要做的事情。
- Reducer作为纯函数，内部不建议使用任何有副作用的操作，比如操作外部的变量，任何导致相同输入但输出却不一致的操作。

#### 1.3.3. Redux middleware

Redux middleware提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。

#### 1.3.4. `Redux middleware`的本质

`Middleware` 接收了一个 `next()` 的 `dispatch` 函数，并返回一个 `dispatch` 函数，返回的函数会被作为下一个 `middleware` 的 `next()`，以此类推。


### 1.4. `redux`中的`reducer`为什么叫做`reducer`？

因为它和 `Array.prototype.reduce` 当中传入的回调函数非常相似。


`reducer`应该返回新的对象，为什么呢？因为比较两个对象是否相同，是看对象地址是否相同，所以要返回新的对象，而不是直接改变原来的state


### 1.5. action异步，为什么需要中间件？

因为dispatch的时候，需要`action.data`需要等待，而`redux`的`action`没有这个等待，而是立马返回。


### 1.6. 为什么叫 thunk ？

Thunk 是一类函数的别名，主要特征是**对另外一个函数添加了一些额外的操作**，类似**装饰器**。其主要用途为延迟函数执行（惰性求值）或者给一个函数执行前后添加一些额外的操作。




### 1.7. `react-redux`数据流

- `Provider`将`store`提供给组件，组件`connect(mapStateToProps, mapDispatchToProps)(Comp)`，
- 组件每次拿到的都是`mapStateToProps`中最新的`state`，
- 调用`props.add`方法，`add`方法在`mapDispatchToProps`中定义，`dispatch`一个对象，交给`reducer`的`dispatch`，改变`state`，然后组件获得更新后的`state`。


### 1.8. `mapStateToProps` 和 `mapDispatchToProps`

- `mapStateToProps`，参数为`state`，返回一个**对象(普通对象)**，为组件需要的数据。
- `mapDispatchToProps`，参数为`dispatch`，返回一个**对象(包含一些方法)**，每个方法调用`dispatch`。


### 1.9. 为什么reducer是纯函数
因为不能改变输入值state，说白了就是reducer传state和action返回新的state。

为什么这样设计？

因为页面渲染需要比较新旧state，react比较state比较的是地址（也就是浅比较，如果深比较耗费性能）所以必须返回新的state，否则页面不更新
