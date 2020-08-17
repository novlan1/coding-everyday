- [1. hooks 与定时器](#1-hooks-与定时器)
  - [1.1. 错误的定时器用法](#11-错误的定时器用法)
  - [1.2. 正确的定时器设置](#12-正确的定时器设置)
  - [1.3. 思考这样能不能实现定时器效果？](#13-思考这样能不能实现定时器效果)

## 1. hooks 与定时器

在 hooks 中使用了定时器对于新手来说往往会出错，本文将介绍并剖析。

### 1.1. 错误的定时器用法

```
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  return <h1>{count}</h1>;
}
```

页面上的 count 永远是 1，因为 useEffect 的依赖数组重没有包含 count。导致定时器中 count 永远是第一次渲染时的值，即 0 。页面上一直为 0+1 = 1

```
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  return <h1>{count}</h1>;
}
```

现在在依赖数组中加入了 count，页面上的数值不一直为 1 了， 但是过不了一会儿，页面上的数字就会开始闪烁。 这是因为每次 count 变化后，都重新去运行了一遍 useEffect，导致生成了**非常多的定时器**。页面上结果为：

- 0 + 1
- 1 + 1
- 2 + 1
- 3 + 1
- 4 + 1
- ...

所以数字在闪烁。

### 1.2. 正确的定时器设置

```
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [count]);

  return <h1>{count}</h1>;
}
```

每下一次渲染前都用 useEffect 的 return 销毁掉之前生成的 定时器。

不过这样是比较耗费性能的，每一次加一都要执行一遍创建和销毁定时器。可以使用箭头函数的方式来更新 count。

```
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

### 1.3. 思考这样能不能实现定时器效果？

```
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  });

  return <h1>{count}</h1>;
}
```

答案是：会。 看似没有把 count 放入依赖数组中，但不使用依赖数组的情况下，useEffect 会在第一次渲染之后和每次更新之后都会执行。这就使得每次渲染都能拿到最新的 count 值，这样就能实现定时器效果了。

不过，这会导致一个非常隐蔽的 BUG，参见 [Dan 的博客](https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/#%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%B0%9D%E8%AF%95)

原因： setInterval 和它们不一样。当我们执行 clearInterval 和 setInterval 时，它们会进入时间队列里，如果我们频繁重渲染和重执行 effects，interval 有可能没有机会被执行！

