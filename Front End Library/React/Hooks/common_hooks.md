- [1. useState](#1-usestate)
- [2. useEffect](#2-useeffect)
  - [2.1. 闭包陷阱](#21-闭包陷阱)
- [3. useContext](#3-usecontext)
- [4. useMemo](#4-usememo)
- [5. useCallback](#5-usecallback)
- [6. Ref Hooks](#6-ref-hooks)
- [7. 自定义 hooks](#7-自定义-hooks)
- [8. useEffect 和 useLayoutEffect 区别](#8-useeffect-和-uselayouteffect-区别)
  - [8.1. 对于 useEffect 和 useLayoutEffect 哪一个与 componentDidMount，componentDidUpdate 的是等价的？](#81-对于-useeffect-和-uselayouteffect-哪一个与-componentdidmountcomponentdidupdate-的是等价的)
  - [8.2. useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？](#82-useeffect-和-uselayouteffect-哪一个与-componentwillunmount-的是等价的)
  - [8.3. 为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？](#83-为什么建议将修改-dom-的操作里放到-uselayouteffect-里而不是-useeffect)
- [使用 hooks 时，父组件如何调用子组件的方法？](#使用-hooks-时父组件如何调用子组件的方法)

## 常用 hooks  <!-- omit in toc -->

### 1. useState

当给 setCount 传入一个与 count 相同的**原始值**时，组件不会重新渲染。当传递一个**对象**时，无论是否一样都会渲染。

useState()方法可以传递值也可以传递**函数**，可延迟初始化，此函数在多次渲染时只运行一次。

```js
function App(props) {
  const [count, setCount] = useState(() => {
    console.log("only run one time");
    return props.defaultCount || 0;
  });
  return <div></div>;
}
```

### 2. useEffect

- 副作用调用时机
  - mount 后
  - update 后
  - unmount 前

useEffect 返回函数的作用是清除上一次副作用遗留下来的状态。

```js
function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log("======== render ======== ");

  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onClick = () => {
    console.log("click");
  };

  // 需要频繁清理并绑定的副作用
  useEffect(() => {
    document.getElementById("size").addEventListener("click", onClick);
    return () => {
      document.getElementById("size").removeEventListener("click", onClick);
    };
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        {" "}
        Count: {count} 点了之后 id 为 size 的元素就会被替换
      </button>

      <br />
      {count % 2 ? (
        <button id="size">
          size: {size.width} x {size.height}，点击有console
        </button>
      ) : (
        <div id="size">
          size: {size.width} x {size.height}，点击有console
        </div>
      )}
    </div>
  );
}
```
#### 2.1. 闭包陷阱

每隔一秒count增加1，`setCount(count+1)`不可以，因为第二个参数为[], 说明只执行一次，拿到的是初始化时候的值；`setCount(c=>c+1)`可以，拿到的始终是最新值。

`useEffect`的第二个参数，官方建议是`useEffect`里面用到的任何hooks参数，都放到依赖里。


### 3. useContext

用来向所有后代组件传递 props

更爽的使用 context，替代 Content.Consumer

useContext 方法是在子组件中使用，也就是谁用 context 中的属性，谁调用 useContext。而根组件，用 Context 实例上的Provider，传递给子孙组件 value。

```js
const CountContext = createContext();

function Foo() {
  const count = useContext(CountContext);
  return <h2>{count}</h2>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <CountContext.Provider value={count}>
        <Foo />
      </CountContext.Provider>
    </div>
  );
}
```


### 4. useMemo

useCallback 和 useMemo 的参数跟 useEffect 一致，他们之间最大的区别有是 useEffect 会用于处理副作用，这两个 hooks 不能。

使用 useMemo 方法可以避免无用方法的调用,

```js
/**
 * 如果不加useMemo, 即时name不变，也会执行changeName函数，是不必要的
 * 如果changeName中使用了setState，那就相当于优化了
 */
const otherName = useMemo(() => {
  changeName(name);
}, [name]);
```
参考资料：[React Hooks ---useMemo](https://segmentfault.com/a/1190000018697490?utm_source=tag-newest)

### 5. useCallback

如果 usememo 返回的是一个函数，那么可以使用 useCallback 替代

useCallback 解决的是传入子组件参数过度变化导致子组件过度渲染的问题

```js
// 这两个是等价的
useMemo(() => fn, []);
useCallback(fn, []);
```

每一次函数组件重新执行一次，这两个内部函数都会重复创建。然而实际上，他们都是一样的。 所以很多传递给子组件的函数直接使用 useCallback 包裹起来，会提升性能

参考资料：[你不知道的 useCallback](https://segmentfault.com/a/1190000020108840)

### 6. Ref Hooks

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

useRef除了ref属性外，还可以**“跨渲染周期”保存数据**，state的问题在于一旦修改了它就会造成组件的重新渲染。


1. 使用 Ref 保存变量： 因为函数组件每一次都会重新执行，保存一些每一次都需要的使用的变量就需要 Ref Hook

定时器，Ref Hooks 的最佳实践

```js
function App() {
  const [count, setCount] = useState(1);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current);
    }
  });

  return (
    <>
      <h1>count: {count}</h1>
    </>
  );
}
```

2. 使用 Ref 保存上一个状态的值

```js
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef(-1);
  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <>
      <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        add{' '}
      </button>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
    </>
  );
}
```

### 7. 自定义 hooks

1. 函数必须use开头
2. 多处调用时，相互独立


因为可以自定义 Hooks, 我们可以非常方便的复用状态逻辑。

```js
// 定时器DEMO
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current);
    }
  });
  return [count];
}

function App() {
  const [count] = useCount(0);
  return (
    <>
      <h1>count: {count}</h1>
    </>
  );
}
```


### 8. useEffect 和 useLayoutEffect 区别
1. `useEffect`

基本上90%的情况下，都应该用这个。这个是在`render`结束后，你的callback函数执行，但是不会阻塞浏览器渲染，算是某种**异步**的方式吧。但是`class`的`componentDidMount` 和`componentDidUpdate`是**同步**的，在`render`结束后就运行，`useEffect`在大部分场景下都比`class`的方式性能更好。

2. `useLayoutEffect`

这个是用在处理DOM的时候，当你的`useEffect`里面的操作需要**处理DOM**，并且会**改变页面的样式**，就需要用这个，否则可能会出现出现**闪屏**问题。`useLayoutEffect`里面的 callback 函数会在**DOM更新完成**后立即执行，但是会在**浏览器进行任何绘制**之前运行完成，阻塞了浏览器的绘制。




小结：
- useEffect 在渲染时是异步执行，并且要等到**浏览器将所有变化渲染到屏幕**后才会被执行。
- useLayoutEffect 在渲染时是同步执行，其执行时机与 componentDidMount，componentDidUpdate 一致



#### 8.1. 对于 useEffect 和 useLayoutEffect 哪一个与 componentDidMount，componentDidUpdate 的是等价的？

`useLayoutEffect`，因为从源码中调用的位置来看，useLayoutEffect的 create 函数的调用位置、时机都和 componentDidMount，componentDidUpdate 一致，且都是被 React 同步调用，都会阻塞浏览器渲染。



#### 8.2. useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？

同上，useLayoutEffect 的 detroy 函数的调用位置、时机与 `componentWillUnmount` 一致，且都是同步调用。
useEffect 的 detroy 函数从调用时机上来看，更像是 `componentDidUnmount` (注意React 中并没有这个生命周期函数)。



#### 8.3. 为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？

- 通过 `useLayoutEffect` 可以拿到最新的 `DOM` 节点，并且在此时对 `DOM` 进行样式上的修改，假设修改了元素的 `height`，这些修改会和 `react` 做出的更改一起被一次性渲染到屏幕上，依旧只有一次回流、重绘的代价。
- 如果放在 `useEffect` 里，`useEffect` 的函数会**在组件渲染到屏幕之后执行**，此时对 DOM 进行修改，会触发浏览器再次进行回流、重绘，增加了性能上的损耗。


参考资料：
1. [useEffect 和 useLayoutEffect 区别](https://www.jianshu.com/p/412c874c5add)
2. [深入理解 React useLayoutEffect 和 useEffect 的执行时机](https://www.cnblogs.com/iheyunfei/archive/2020/06/08/13065047.html)

### 使用 hooks 时，父组件如何调用子组件的方法？

可以使用`useImperativeHandle`这个`hook`：
```js
useImperativeHandle(ref, createHandle, [deps])
```
`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 `ref` `这样的命令式代码。useImperativeHandle` 应当与 `forwardRef` 一起使用。

例子：
```jsx
import {useState, useImperativeHandle,forwardRef} from 'react';

// props子组件中需要接受ref
let ChildComp = (props,ref) => {
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, () => ({
        // changeVal 就是暴露给父组件的方法
        changeVal: (newVal) => {
           
        }
    }));
    return (
        <div>{val}</div>
    )
}

ChildComp = forwardRef(ChildComp)
```

```jsx
/* FComp 父组件 */
import {useRef} from 'react';

const FComp = () => {
    const childRef = useRef();
    const updateChildState = () => {
        // changeVal就是子组件暴露给父组件的方法
        childRef.current.changeVal(99);
    }
    
    return (
        <>
          <ChildComp ref={childRef} />
          <button onClick={updateChildState}>触发子组件方法</button>
        </>
    )
}
```



参考资料：
1. [React Hooks中父组件中调用子组件方法](https://www.cnblogs.com/muamaker/p/11647626.html)