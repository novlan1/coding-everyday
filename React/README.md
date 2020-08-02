## React基础

### JSX本质
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

### JSX 和 vdom 的关系?
- JSX需要渲染成`html`，数据驱动视图
- `React.createElement` 和`h`，都生成`vnode`
- 何时`patch`？初次渲染以及`setState`
- 自定义组件的解析？先初始化实例，然后执行`render`


### setState 为何需要异步？
可能会一次执行多个`setState`，没必要每次`setState`都重新渲染，提高性能，把多个`setState`合并。即使是每次重新渲染，用户也看不到中间的效果，只看到最后的结果。

Vue修改属性也是异步！


### setState过程
1. 每个组件实例，都有`renderComponent`方法（继承自`component`）
2. 执行`renderComponent`方法，会重新执行实例`render`方法
3. `render`函数返回的`newVnode`，然后拿到`preVnode`
4. 执行`patch(preVnode, newVnode)`


### Vue和React的本质区别
1. Vue本质是MVVM框架，由MVC发展而来
2. React本质是前端组件化框架，由后端组件化发展而来


##### 模板的区别
1. Vue 使用模板（最初由angular提出，`v-if`，`v-model`等）
2. React 使用JSX，学习成本低
3. 模板语法上，JSX更好
4. 模板分离上，Vue更好

##### 组件化的区别
- React本身就是组件化，没有组件化就不是React
- Vue也支持组件化，不过是在MVVM上的扩展
- Vue组件化的文档很多（侧面反映其实它的组件化不好用，复杂度低才叫好用）。
- 对于组件化，我更倾向于React，做的彻底而清晰。


##### Vue和React共同点
1. 都支持组件化
2. 数据驱动视图


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

### React的`PureComponent` VS `Component`

它们几乎完全相同，但是`PureComponent`通过`prop`和`state`的**浅比较**来实现`shouldComponentUpdate`，某些情况下可以用`PureComponent`提升性能
所谓浅比较(`shallowEqual`)，即react源码中的一个函数，然后根据下面的方法进行是不是`PureComponent`的判断，帮我们做了本来应该我们在shouldComponentUpdate中做的事情

浅比较就是比较一个旧的props和新props的或者旧的state和新的state的长度是否一致，key值是否相同，以及它们对应的引用是否发生改变。仅仅做了一层的比较。所以这才叫做浅比较。

### diff算法和调和
#### 1. diff算法的作用
计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。

#### 2. 传统diff算法
通过循环递归对节点进行依次对比，算法复杂度达到 `O(n^3)` ，n是树的节点数，这个有多可怕呢？——如果要展示1000个节点，得执行上亿次比较。。即便是CPU快能执行30亿条命令，也很难在一秒内计算出差异。

#### 3. React的diff算法
（1）什么是调和？
将`Virtual DOM`树转换成`actual DOM`树的**最少操作**的过程 称为 调和 。

（2）什么是 React 的`diff`算法？
`diff` 算法是调和的具体实现。

#### 4. diff策略
React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度

（1）策略一（`tree diff`）：
Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

（1）策略二（`component diff`）：
拥有相同类的两个组件 生成相似的树形结构，
拥有不同类的两个组件 生成不同的树形结构。

（1）策略三（`element diff`）：
对于同一层级的一组子节点，通过唯一id区分。

#### 5. tree diff
（1）React通过updateDepth对Virtual DOM树进行层级控制。
（2）对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
（3）只需遍历一次，就能完成整棵DOM树的比较。

那么问题来了，如果DOM节点出现了跨层级操作,diff会咋办呢？
答：diff只简单考虑同层级的节点位置变换，如果是跨层级的话，只有**创建节点**和**删除节点**的操作。


#### 6. element diff
Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。

可以使用元素在数组中的下标作为 key。这个策略在元素**不进行重新排序**时比较合适，**如果有顺序修改，diff 就会变得慢**。


参考资料：[diff算法, 简书](https://www.jianshu.com/p/3ba0822018cf)


### React 中 key 的作用
key 是 React 中用于追踪哪些列表中元素被修改、删除或者被添加的辅助标识。在 diff 算法中，key 用来**判断该元素节点是被移动过来的还是新创建的元素，减少不必要的元素重复渲染**。

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

### React 父子组件的生命周期
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

### 更新组件的两种方式
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

