- [1. React基础](#1-react基础)
  - [1.1. JSX本质](#11-jsx本质)
  - [1.2. JSX 和 vdom 的关系?](#12-jsx-和-vdom-的关系)
  - [1.3. setState 为何需要异步？](#13-setstate-为何需要异步)
  - [1.4. setState过程](#14-setstate过程)
  - [1.5. Vue 和 React的本质区别](#15-vue-和-react的本质区别)
    - [1.5.1. 模板的区别](#151-模板的区别)
    - [1.5.2. 组件化的区别](#152-组件化的区别)
    - [1.5.2.1. Vue和React共同点](#1521-vue和react共同点)
  - [1.6. React原理](#16-react原理)
  - [1.7. 构建DOM过程：](#17-构建dom过程)
  - [1.8. 有状态组件和无状态组件](#18-有状态组件和无状态组件)
  - [1.9. 什么情况下使用有状态组件？什么情况下使用有状态组件？](#19-什么情况下使用有状态组件什么情况下使用有状态组件)
  - [1.10. 组件中的props和state/data之间的区别](#110-组件中的props和statedata之间的区别)
  - [1.11. React使用变量](#111-react使用变量)
  - [1.12. 解决卸载后还更新](#112-解决卸载后还更新)
  - [1.13. 触发render的条件有哪些？](#113-触发render的条件有哪些)
  - [1.14. React的坑](#114-react的坑)
  - [1.15. React的`PureComponent` VS `Component`](#115-react的purecomponent-vs-component)
  - [1.16. React 中 key 的作用](#116-react-中-key-的作用)
  - [1.17. setState 什么时候批量更新？](#117-setstate-什么时候批量更新)
  - [1.18. React 父子组件的生命周期](#118-react-父子组件的生命周期)
  - [1.19. 更新组件的两种方式](#119-更新组件的两种方式)


## 1. React基础

### 1.1. JSX本质
- 语法糖，需要被解析成JS才能运行
- Vue中模板也需要被解析成JS才能运行(开发环境解析)；
- 解析的形式是`React.createElement`,也可以是`h`函数
- JSX是一个独立的标准
- JSX降低了学习成本和编码工作量，代码简洁，但会可能增加debug成本

- JSX（比如render函数中的div）=>`createElement`=>JS对象（虚拟DOM）=>真实DOM
- 没有JSX语法，通过`React.createElement`完全可以实现JSX功能，不过JSX使代码简洁
```
return React.createElement(‘div’, {}, React.createElement(‘span’, {}, ’item’))
```
等于
```
return (
  <div>
    <span>item</span>
  </div>
)
```

### 1.2. JSX 和 vdom 的关系?
- JSX需要渲染成`html`，数据驱动视图
- `React.createElement` 和`h`，都生成`vnode`
- 何时`patch`？初次渲染以及`setState`
- 自定义组件的解析？先初始化实例，然后执行`render`


### 1.3. setState 为何需要异步？
可能会一次执行多个`setState`，没必要每次`setState`都重新渲染，提高性能，把多个`setState`合并。即使是每次重新渲染，用户也看不到中间的效果，只看到最后的结果。

Vue修改属性也是异步！


### 1.4. setState过程
1. 每个组件实例，都有`renderComponent`方法（继承自`component`）
2. 执行`renderComponent`方法，会重新执行实例`render`方法
3. `render`函数返回的`newVnode`，然后拿到`preVnode`
4. 执行`patch(preVnode, newVnode)`


### 1.5. Vue 和 React的本质区别
1. Vue本质是MVVM框架，由MVC发展而来
2. React本质是前端组件化框架，由后端组件化发展而来


#### 1.5.1. 模板的区别
1. Vue 使用模板（最初由angular提出，`v-if`，`v-model`等）
2. React 使用JSX，学习成本低
3. 模板语法上，JSX更好
4. 模板分离上，Vue更好

#### 1.5.2. 组件化的区别
- React本身就是组件化，没有组件化就不是React
- Vue也支持组件化，不过是在MVVM上的扩展
- Vue组件化的文档很多（侧面反映其实它的组件化不好用，复杂度低才叫好用）。
- 对于组件化，我更倾向于React，做的彻底而清晰。


#### 1.5.2.1. Vue和React共同点
1. 都支持组件化
2. 数据驱动视图


### 1.6. React原理
- 最顶层是`ReactDOM.render()`, 一般是App，App包含的组件继承`React.component`。
- jsx语法会被转译成是`React.createElement()`, 其需要传入三个参数，一是元素类型(如h1), 二是元素属性(如`className:’cc’`)，三是子元素(如一段字符串),，还可以嵌套。
- 本质上来讲，JSX 只是为 `React.createElement(component, props, ...children)` 方法提供的语法糖。



### 1.7. 构建DOM过程：

- JSX（比如render函数中的div）=>`createElement`=> JS对象（虚拟DOM）=> 真实DOM



### 1.8. 有状态组件和无状态组件

- 有状态组件：用class关键字创建出来的组件(用的最多)
- 无状态组件：用构造函数创建出来的组件（用的不多）



### 1.9. 什么情况下使用有状态组件？什么情况下使用有状态组件？

- 如果一个组件需要有自己的私有数据，则推荐使用：class创建的有状态组件；
- 如果一个组件不需要有自己的私有数据，则推荐使用：无状态组件；

React官方说：无状态组件，由于没有自己的state和生命周期函数，所以运行效率高。

有状态组件和无状态组件之间的本质区别就是：**有无state属性**和**生命周期函数**！



### 1.10. 组件中的props和state/data之间的区别
- props中的数据都是外界传递过来的；
- state/data中的数据，都是组件私有的；（通过ajax获取回来的数据，一般都是私有数据）；
- props中的数据都是只读的；不能重新赋值；
- state/data中的数据，都是可读可写的；



### 1.11. React使用变量
- 变量都用{}大括号包着
- style={{}}两个括号，里面是一个对象

### 1.12. 解决卸载后还更新 
```js
componentWillUnmount(){
    this.setState = (state, cb) => {return}
  }
```
### 1.13. 触发render的条件有哪些？
- 首次加载组件
- 使用了setState(更新了state)
- props更新了(父级传给子级的值改变了)


### 1.14. React的坑

1、尽量不要在 `componentWillReviceProps` 里使用 `setState`，如果一定要使用，那么需要判断结束条件，不然会出现**无限重渲染**，导致页面崩溃。(实际不是`componentWillReviceProps`会无限重渲染，而是`componentDidUpdate`)

2、JSX做表达式判断时候，需要**强转**为`boolean`类型，如:
```jsx
const b = 0;
!!b && <div>这是一段文本</div>
```

### 1.15. React的`PureComponent` VS `Component`

它们几乎完全相同，但是`PureComponent`通过`prop`和`state`的**浅比较**来实现`shouldComponentUpdate`，某些情况下可以用`PureComponent`提升性能
所谓浅比较(`shallowEqual`)，即react源码中的一个函数，然后根据下面的方法进行是不是`PureComponent`的判断，帮我们做了本来应该我们在shouldComponentUpdate中做的事情

浅比较就是比较一个旧的props和新props的或者旧的state和新的state的长度是否一致，key值是否相同，以及它们对应的引用是否发生改变。仅仅做了一层的比较。所以这才叫做浅比较。


### 1.16. React 中 key 的作用
key 是 React 中用于追踪哪些列表中元素被修改、删除或者被添加的辅助标识。在 diff 算法中，key 用来**判断该元素节点是被移动过来的还是新创建的元素，减少不必要的元素重复渲染**。

### 1.17. setState 什么时候批量更新？

```
1. setState 会不会立刻更新 state 取决于调用 setState 时是不是已经处于批量更新事务中。

2. 组件的生命周期函数和绑定的事件回调函数(比如onChange、onClick、onTouchMove等)都是在批量更新事务中执行的。

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

### 1.18. React 父子组件的生命周期
```
Parent constructor
Parent componentWillMount
Parent render
Child constructor
Child componentWillMount
Child render
Child componentDidMount
Parent componentDidMount
```
结论：
- 当需要`render`子组件的时候，才会进入子组件的生命周期，子组件的周期结束后，再回到上级的周期。
- 子组件的`componentDidMout`在父组件的`componentDidMout`之前

### 1.19. 更新组件的两种方式
1. 主动更新：组件通过`setState`修改自己的状态
```
Child shouldComponentUpdate
Child componentWillUpdate
Child render
Child componentDidUpdate
```
2. 被动更新，父组件通过`props`把自己的`state`传递给子组件，父组件执行`setState`更新状态
```
Parent shouldComponentUpdate
Parent componentWillUpdate
Parent render
Child componentWillReceiveProps(nextProps)
Child shouldComponentUpdate
Child componentWillUpdate
Child render
Child componentDidUpdate
Parent componentDidUpdate
```

