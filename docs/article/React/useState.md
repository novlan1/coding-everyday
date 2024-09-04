### useState

useState 如果放到 Vue 中，可以这样实现

```ts
import { ref } from 'vue';

export function useState(value) {
  const inner = ref(value);

  const changeInner = (newVal) => {
    inner.value = newVal;
  };
  return [
    inner,
    changeInner
  ];
}
```

引入并使用如下。

和 React 的 useState 区别是，在模板中不用加 `.value`，在脚本中需要加。

```html
<div
  @click.stop="setMock(mock+1)"
>
  {{ mock }}
</div>
```

```ts
import { useState } from './useState';
const [mock, setMock] = useState(0);
```


### 命名式 UI 和声明式 UI

命令式 UI 一定会直接操作DOM，举例如下：

```ts
function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

function enable(el) {
  el.disabled = false;
}

function disable(el) {
  el.disabled = true;
}
```

声明式 UI 是数据驱动

### ref

```ts
const ref = useRef(0)

console.log(ref.current)

ref.current += 1;
```


1. ref 是一种脱围机制，用于保留不用于渲染的值。 你不会经常需要它们。
2. ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置。
3. 你可以通过调用 useRef Hook 来让 React 给你一个 ref。
4. 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
5. 与 state 不同，设置 ref 的 current 值不会触发重新渲染。
6. 不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测。

### ref 操作 DOM

1. Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
2. 你通过传递 `<div ref={myRef}>` 指示 React 将 DOM 节点放入 myRef.current。
3. 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
4. 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
5. 避免更改由 React 管理的 DOM 节点。
6. 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。


转发 Ref

```ts
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref}>
})

function Form() {
  return (
    <>
      <MyInput ref={inputRef}>
    </>
  )
}
```


### Effect

Effect 在 React 中是专有定义——由渲染引起的副作用。为了指代更广泛的编程概念，也可以将其称为“副作用（side effect）”。

编写 Effect 需要遵循以下三个规则：

- 声明 Effect。默认情况下，Effect 会在每次 提交 后都会执行。
- 指定 Effect 依赖。大多数 Effect 应该按需执行，而不是在每次渲染后都执行。例如，淡入动画应该只在组件出现时触发。连接和断开服务器的操作只应在组件出现和消失时，或者切换聊天室时执行。文章将介绍如何通过指定依赖来控制如何按需执行。
- 必要时添加清理（cleanup）函数。有时 Effect 需要指定如何停止、撤销，或者清除它的效果。例如，“连接”操作需要“断连”，“订阅”需要“退订”，“获取”既需要“取消”也需要“忽略”。

一般来说，Effect 会在  每次 渲染后执行，而以下代码会陷入死循环中。

每次渲染结束都会执行 Effect；而更新 state 会触发重新渲染。但是新一轮渲染时又会再次执行 Effect，然后 Effect 再次更新 state……如此周而复始，从而陷入死循环。

```ts
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```

在下面这个例子中，Effect 中的代码没有使用任何 props 或 state，此时指定依赖数组为空数组 []。这告诉 React 仅在组件“挂载”时运行此代码，即首次出现在屏幕上这一阶段。

```ts
useEffect(() => {
  const connection = createConnection();
  connection.connect();
}, []);
```

每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数。

```ts
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, []);
```

小结：

1. 与事件不同，Effect 是由渲染本身，而非特定交互引起的。
2. Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
3. 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
4. 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
5. 不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
6. 空的依赖数组（[]）对应于组件“挂载”，即添加到屏幕上。
7. 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
8. 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
9. React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。



### key



通常，当在相同的位置渲染相同的组件时，React 会保留状态。**通过将 userId 作为 key 传递给 Profile 组件，使  React 将具有不同 userId 的两个 Profile 组件视为两个不应共享任何状态的不同组件。**

```ts
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ 当 key 变化时，该组件内的 comment 或其他 state 会自动被重置
  const [comment, setComment] = useState('');
  // ...
}
```


### useMemo

这会告诉 React，除非 todos 或 filter 发生变化，否则不要重新执行传入的函数。

```ts
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

### useDefaultProps

```ts
import { useMemo } from 'react';

// defaultProps 将于 18.3.0 废弃，故需实现 hook 在组件内部兼容
// https://github.com/facebook/react/pull/16210
export default function useDefaultProps<T>(originalProps: T, defaultProps: Record<PropertyKey, any>): T {
  return useMemo<T>(() => {
    // eslint-disable-next-line
    const props = Object.assign({}, originalProps);
    Object.keys(defaultProps).forEach((key) => {
      // https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L719-L722
      if (props[key] === undefined) {
        props[key] = defaultProps[key];
      }
    });
    return props;
  }, [originalProps, defaultProps]);
}
```


### useClass

```ts
import { useMemo } from 'react';
import useConfig from './useConfig';

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig();

  return useMemo(() => (componentName ? `${classPrefix}-${componentName}` : classPrefix), [classPrefix, componentName]);
}
```

### parseNode

TNode 类型，统一使用 parseTNode 渲染

```ts
// 解析 TNode 数据结构
export default function parseTNode(
  renderNode: TNode | TNode<any> | undefined,
  renderParams?: any,
  defaultNode?: ReactNode,
): ReactNode {
  let node: ReactNode = null;

  if (typeof renderNode === 'function') {
    node = renderNode(renderParams);
  } else if (renderNode === true) {
    node = defaultNode;
  } else if (renderNode !== null) {
    node = renderNode ?? defaultNode;
  }
  return node as ReactNode;
}
```


### useDefault


```ts
import { useState } from 'react';
import noop from './noop';

export interface ChangeHandler<T, P extends any[]> {
  (value: T, ...args: P);
}

export default function useDefault<T, P extends any[]>(
  value: T,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  // 无论是否受控，都要 useState，因为 Hooks 是无条件的
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  // 受控模式
  if (typeof value !== 'undefined') {
    return [value, onChange || noop];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue, ...args);
      }
    },
  ];
}
```

### ReactDom.render


这个方法在 ts 和 tsx 中的类型是不同的，像下面的写法只能在 tsx 中写，否则会报错。

```tsx
ReactDOM.render(<Drawer {...drawerProps} /> , div);
```

如果使用了 ts 文件，报错内容是：

```
“Drawer”表示值，但在此处用作类型。是否指“类型 Drawer”
```


### 函数式调用组建后改变属性

1. 用 `forwardRef` 将 `ref` 转发
2. 用 `useImperativeHandle` 指定暴露哪些方法
3. 组件内部不要直接使用 `props`，将其转化成内部变量再实用，方便 `plugin` 模式



```ts
const [state, setState] = useSetState<DrawerProps>({ isPlugin: false, ...props });
```

`useSetState` 可以将 `props` 转为 `state`。


```ts
/**
 * 管理 object 类型 state 的 Hooks，用法与 class 组件的 this.setState 基本一致。
 * @param initialState
 * @returns [state, setMergeState]
 */
const useSetState = <T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  return [state, setMergeState];
};

export default useSetState;
```

`useImperativeHandle` 的使用：

```ts
useImperativeHandle(ref, () => ({
  show() {
    setState({ visible: true });
  },
  hide() {
    setState({ visible: false });
  },
  destroy() {
    setState({ visible: false, destroyOnClose: true });
  },
  update(newOptions) {
    setState((prevState) => ({ ...prevState, ...newOptions }));
  },
}));
```
