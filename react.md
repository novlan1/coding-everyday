## React基础
### React原理
- 最顶层是`ReactDOM.render()`, 一般是App，App包含的组件继承`React.component`。
- jsx语法会被转译成是`React.createElement()`, 其需要传入三个参数，一是元素类型(如h1), 二是元素属性(如`className:’cc’`)，三是子元素(如一段字符串),，还可以嵌套。
- 本质上来讲，JSX 只是为 `React.createElement(component, props, ...children)` 方法提供的语法糖。



### 构建DOM过程：

- JSX（比如render函数中的div）=>`createElement`=> JS对象（虚拟DOM）=> 真实DOM



### 有状态组件和无状态组件

- 有状态组件：用class关键字创建出来的组件(用的最多)
- 无状态组件：用构造函数创建出来的组件（用的不多）



### 什么情况下使用有状态组件？什么情况下使用有状态组件？

- 如果一个组件需要有自己的私有数据，则推荐使用：class创建的有状态组件；
- 如果一个组件不需要有自己的私有数据，则推荐使用：无状态组件；

React官方说：无状态组件，由于没有自己的state和生命周期函数，所以运行效率高。

有状态组件和无状态组件之间的本质区别就是：**有无state属性**和**生命周期函数**！



### 组件中的props和state/data之间的区别
- props中的数据都是外界传递过来的；
- state/data中的数据，都是组件私有的；（通过ajax获取回来的数据，一般都是私有数据）；
- props中的数据都是只读的；不能重新赋值；
- state/data中的数据，都是可读可写的；



### React使用变量
- 变量都用{}大括号包着
- style={{}}两个括号，里面是一个对象

### 解决卸载后还更新 
```js
componentWillUnmount(){
    this.setState = (state, cb) => {return}
  }
```
### 触发render的条件有哪些？
- 首次加载组件
- 使用了setState(更新了state)
- props更新了(父级传给子级的值改变了)


### React的坑

1、尽量不要在 `componentWillReviceProps` 里使用 `setState`，如果一定要使用，那么需要判断结束条件，不然会出现**无限重渲染**，导致页面崩溃。(实际不是`componentWillReviceProps`会无限重渲染，而是`componentDidUpdate`)

2、JSX做表达式判断时候，需要**强转**为`boolean`类型，如:
```jsx
const b = 0;
!!b && <div>这是一段文本</div>
```

### React的`PureComponent` Vs `Component`

它们几乎完全相同，但是`PureComponent`通过`prop`和`state`的**浅比较**来实现`shouldComponentUpdate`，某些情况下可以用`PureComponent`提升性能
所谓浅比较(`shallowEqual`)，即react源码中的一个函数，然后根据下面的方法进行是不是`PureComponent`的判断，帮我们做了本来应该我们在shouldComponentUpdate中做的事情

浅比较就是比较一个旧的props和新props的或者旧的state和新的state的长度是否一致，key值是否相同，以及它们对应的引用是否发生改变。仅仅做了一层的比较。所以这才叫做浅比较。

### diff算法和调和
#### diff算法的作用
计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。

#### 传统diff算法
通过循环递归对节点进行依次对比，算法复杂度达到 O(n^3) ，n是树的节点数，这个有多可怕呢？——如果要展示1000个节点，得执行上亿次比较。。即便是CPU快能执行30亿条命令，也很难在一秒内计算出差异。

#### React的diff算法
（1）什么是调和？
将Virtual DOM树转换成actual DOM树的最少操作的过程 称为 调和 。

（2）什么是React diff算法？
diff算法是调和的具体实现。

#### diff策略
React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度

（1）策略一（tree diff）：
Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

（1）策略二（component diff）：
拥有相同类的两个组件 生成相似的树形结构，
拥有不同类的两个组件 生成不同的树形结构。

（1）策略三（element diff）：
对于同一层级的一组子节点，通过唯一id区分。

#### tree diff
（1）React通过updateDepth对Virtual DOM树进行层级控制。
（2）对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
（3）只需遍历一次，就能完成整棵DOM树的比较。

那么问题来了，如果DOM节点出现了跨层级操作,diff会咋办呢？
答：diff只简单考虑同层级的节点位置变换，如果是跨层级的话，只有**创建节点**和**删除节点**的操作。


#### element diff
Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。

可以使用元素在数组中的下标作为 key。这个策略在元素**不进行重新排序**时比较合适，**如果有顺序修改，diff 就会变得慢**。


参考资料：[diff算法, 简书](https://www.jianshu.com/p/3ba0822018cf)


### react 中 key 的作用
key 是 React 中用于追踪哪些列表中元素被修改、删除或者被添加的辅助标识。在 diff 算法中，key 用来**判断该元素节点是被移动过来的还是新创建的元素，减少不必要的元素重复渲染**。


## React Hooks
### 闭包陷阱
每隔一秒count增加1，`setCount(count+1)`不可以，因为第二个参数为[], 说明只执行一次，拿到的是初始化时候的值；`setCount(c=>c+1)`可以，拿到的始终是最新值。

`useEffect`的第二个参数，官方建议是`useEffect`里面用到的任何hooks参数，都放到依赖里。



### `useEffect`和`useLayoutEffect`区别

#### `useEffect`
基本上90%的情况下，都应该用这个，这个是在render结束后，你的callback函数执行，但是**不会block browser painting**，算是某种异步的方式吧，但是`class`的`componentDidMount `和`componentDidUpdate`是同步的，在render结束后就运行，useEffect在大部分场景下都比class的方式性能更好。

#### `useLayoutEffect`
这个是用在处理DOM的时候，当你的`useEffect`里面的操作需要处理DOM，并且会改变页面的样式，就需要用这个，否则可能会出现出现闪屏问题， `useLayoutEffect`里面的callback函数会在DOM更新完成后立即执行，但是会在浏览器进行任何绘制之前运行完成， **阻塞了浏览器的绘制**。

### useEffect
useEffect，顾名思义，就是执行有副作用的操作，你可以把它当成`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` 的集合。

```
useEffect(() => {
    initData();
  }, []);
```
这里的useEffect的第二个参数必须传空数组，这样它就等价于只在`componentDidMount`的时候执行。如果不传第二个参数的话，它就等价于`componentDidMount`和`componentDidUpdate`。

#### 需要清除的effect

useEffect返回一个函数，就会在执行清除时，操作它
```js
useEffect(() => {
    const addListener = (event) => {
      setPosition({x: event.clientX, y: event.clientY})
    }
    document.addEventListener('click', addListener)
    return () => {
      document.removeEventListener('click', addListener)
    }
  })
```


#### 可控的effect
可控的effect，通过第二个参数实现，第二个参数如果是空数组，则只会执行一次，即`componentDidMount`，如果不是空数组，是数组中值发生变化，就会重新触发effect


### 自定义Hook
1.函数必须use开头
2.多处调用时，相互独立


### Hook规则
1. 只在最顶层使用 Hook。不要在循环，条件或嵌套函数中调用 Hook
2. 只在 React 函数中调用 Hook。不要在普通的 JavaScript 函数中调用 Hook

### useRef
useRef，通过current属性保存上一次的值，原理是在dom节点上赋值、取值
```js
const node= useRef(null);
const onButtonClick = () => {
    node.current.focus();
};
```
```html
<input ref={node}/>
```
useRef除了ref属性外，还可以“跨渲染周期”保存数据，state的问题在于一旦修改了它就会造成组件的重新渲染。



### hooks中的闭包陷阱
`setTimeout`事件中拿到的是之前保存的值，3秒后显示不是最新的。类似于`class`形式的`const { count } = this.state`, 然后`setTimeout`。

`hooks`要想规避闭包陷阱，可以用`useRef`，因为`useRef`保存的对象不变，`useRef`会在每次渲染时返回同一个 `ref` 对象，`countRef.current = count`。类似于`class`形式的`setTimeout(() => console.log(this.state.count), 3000)`






## Redux
### 为什么用redux？
- 不用的话只能A流向子组件B，B流向子组件C，不能跨级，这时需要redux。
- 更好的管理状态
  - 随着单页面应用的普及，web app内部需要管理的状态越来越多，这些状态可能来自服务器端，用户输入的数据，用户交互数据，当前UI状态，本地的缓存数据等等。如何能够有条理的管理这些数据，成为前端开发中一个难题。


### 三大原则

- 单一数据源
  - 使用redux的程序，所有的state都存储在一个单一的数据源store内部，类似一个巨大的对象树。

- state是只读的
  - state是只读的，能改变state的唯一方式是通过触发action来修改

- 使用纯函数执行修改
  - 为了描述 action 如何改变 state tree ， 你需要编写 reducers。
  - reducers是一些纯函数，接口当前state和action。只需要根据action，返回对应的state。而且必须要有返回。
  - 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数

### 常见概念
#### Action：
```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的type字段来表示将要执行的动作。多数情况下，type会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放action。


#### Reducer：
- Action 只是描述了有事情发生了这件事实，但并没有说明要做哪些改变，这正是reducer需要做的事情。
- Reducer作为纯函数，内部不建议使用任何有副作用的操作，比如操作外部的变量，任何导致相同输入但输出却不一致的操作。

#### Redux middleware：
Redux middleware提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。

#### `Redux middleware`的本质：
`Middleware` 接收了一个 `next()` 的 `dispatch` 函数，并返回一个 `dispatch` 函数，返回的函数会被作为下一个 `middleware` 的 `next()`，以此类推。


### `redux`中的`reducer`为什么叫做`reducer`？
因为它和 `Array.prototype.reduce` 当中传入的回调函数非常相似。


`reducer`应该返回新的对象，为什么呢？因为比较两个对象是否相同，是看对象地址是否相同，所以要返回新的对象，而不是直接改变原来的state


### action异步，为什么需要中间件？
因为dispatch的时候，需要`action.data`需要等待，而`redux`的`action`没有这个等待，而是立马返回。


### 为什么叫thunk？
Thunk 是一类函数的别名，主要特征是**对另外一个函数添加了一些额外的操作**，类似**装饰器**。其主要用途为延迟函数执行（惰性求值）或者给一个函数执行前后添加一些额外的操作。




### `react-redux`数据流
- `Provider`将`store`提供给组件，组件`connect(mapStateToProps, mapDispatchToProps)(Comp)`，
- 组件每次拿到的都是`mapStateToProps`中最新的`state`，
- 调用`props.add`方法，`add`方法在`mapDispatchToProps`中定义，`dispatch`一个对象，交给`reducer`的`dispatch`，改变`state`，然后组件获得更新后的`state`。


### `mapStateToProps`和`mapDispatchToProps`
- `mapStateToProps`，参数为`state`，返回一个**对象(普通对象)**，为组件需要的数据。
- `mapDispatchToProps`，参数为`dispatch`，返回一个**对象(包含一些方法)**，每个方法调用`dispatch`。



## React-router
### `BrowserRouter`和`HashRouter`
- `<BrowserRouter>`使用HTML5提供的`history API` (`pushState`,`replaceState`和 `popstate` 事件) 来保持 UI 和 URL 的同步。

- `<HashRouter>`使用 URL 的hash部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。

一般就这两种，用它包裹住`<Route/>`


`Switch`当第一个路由匹配成功后，就不再往下走了

### 混合组件化

就是路由当组件使用。

- 3.0版本是`<Router history=''>`
- 4.0是`<HashRouter></HashRouter>`

注意：
- 一个`HashRouter`**只能有一个子节点**，不能有多个。
- `<Route/>`标签中的`component`一定是小写。
- 根标签必须是`Router`(`BrowserRouter`或`HashRouter`)，否则没法跳转。
- 路由匹配不到有两种处理方式，一是404，二是跳转到默认的首页。


### 实现404
必须使用`switch`，写一个**不带path**的`Route`放在所有`Route`的最后，`component`就是404页面
```jsx
<Switch>
    <Route path='/about' component={About} />
    <Route path='/main' component={Main} />
    <Route component={notMatch} />
</Switch>
```

### setState 什么时候批量更新？

```
1. setState 会不会立刻更新 state 取决于调用 setState 时是不是已经处于批量更新事务中。

2. 组件的生命周期函数和绑定的事件回调函数都是在批量更新事务中执行的。

3. 而通过 JavaScript 原生 addEventListener 直接添加的事件处理函数，以及使
   用 setTimeout/setInterval 等setState会以同步的方式执行。
```
下面是一个例子：
```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log->0

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log->0

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log->2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log->3
    }, 0);
  }

  render() {
    return null;
  }
};
```
参考资料：[setState, 知乎](https://zhuanlan.zhihu.com/p/57748690)
