## 1. 开始

用 React 比较少，学习记录下。

## 2. 在 Vue 中实现 useState

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

和 React 的 `useState` 区别是，在模板中不用加 `.value`，在脚本中需要加。

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


## 3. PullDownRefresh

### 3.1. 原理

实现了 TDesign 中 `Mobile React` 端 和 `Mobile Vue` 端的对齐。组件的核心逻辑如下。

`onTouchMove` 中，也就是下拉过程中可能产生两种状态：

- `pulling`，下拉
- `loosing`，下拉距离大于 `loadingBarHeight`

`onTouchEnd` 中，会判断 `status` 是否为 `loosing`

- 如果是则会进入 `refresh` 方法
- 否则设置 `status` 为 `normal`，`distance` 恢复为 0。`distance` 控制真实的下拉距离，用 `transform` 实现。

`refresh` 中

- 会将 `distance` 置为 `loadingBarHeight`
- 状态置为 `loading`
- 然后生成一个唯一的 timer，利用 `Promise.race`，判断 `timer` 和 `onRefresh` 哪个返回的早，如果是 `onRefresh`, 则状态置为 `success`，否则代表超时，则恢复 `status` 为 `normal`。
- `success` 或者超时之后，都会在 `300ms` 后，重置 `status`、`distance`

Vue 实现不同，`status` 不直接设置，而是根据 `value/distance/loadingBarHeight/afterLoading` 等值计算而来。

### 3.2. useTouch

`useTouch` 是可以判断滑动距离的 `hook`，Vue 实现了一套，通过“翻译”它到 React，可以了解 React 和 Vue 的语法差异。


```ts
import { ref } from 'vue';

export function useTouch() {
  const startX = ref(0);
  const startY = ref(0);
  const diffX = ref(0);
  const diffY = ref(0);
  const start = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    startX.value = clientX;
    startY.value = clientY;
    diffY.value = 0;
    diffX.value = 0;
  };
  const move = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    diffY.value = clientY - startY.value;
    diffX.value = clientX - startX.value;
  };
  return {
    startX,
    startY,
    diffX,
    diffY,
    start,
    move,
  };
}
```

React 版本的 `useTouch`，就是把 `ref` 变量改成 `useState`，设置的地方去掉 `.value`，改成用 `setXxx`。

```ts
export function useTouch() {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const start = (event: React.TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    setStartX(clientX);
    setStartY(clientY);
    
    setDiffX(0);
    setDiffY(0);
  };
  const move = (event: React.TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    setDiffY(clientY - startY);
    setDiffX(clientX - startX);
  };
  return {
    startX,
    startY,
    diffX,
    diffY,
    start,
    move,
  };
}
```

## 4. React 中实现 computed

使用 useMemo 可以实现。

```ts
const trackStyle = computed(() => {
  return {
    transform: `translate3d(0, ${distance.value}px, 0)`,
  };
});
```

在 React 中

```ts
const trackStyle = useMemo(
  () => ({
    transform: `translate3d(0, ${distance}px, 0)`,
  }),
  [distance],
);
```

## 5. React 中 实现 watch

利用的是 `useEffect`，下面的代码没有实际使用，只做学习用。

利用 `useRef` 实现 `oldValue` 的缓存。

```ts
type Callback<T> = (prev?: T) => void;

function useWatch<T>(dep: T, callback: Callback<T>) {
  const prev = useRef<T>();

  useEffect(() => {
    callback(prev.current)
    prev.current = dep;
  }, [dep])
}
```

使用方法:

```ts
useWatch(xxx, (oldXxx) => {
  console.log(xxx);
  console.log(oldXxx);
});
```


`useEffect` 在组件初始化的时候就会执行，而 `watch` 默认不会。可以在内部增加标志位，实现 `immediate`。

```ts
function useWatch<T>(dep: T, callback: Callback<T>, { immediate = false}) {
  const prev = useRef<T>();
  const inited = useRef(false);

  useEffect(() => {
    const exec = () => callback(prev.current);

    if (inited.current) {
      // 非第一次
      exec()
    } else {
      if (immediate) {
        exec();
      }
    }

    inited.current = true;
    prev.current = dep;
  }, [dep])
}
```

要实现的 `stop` 的话，需要在内部再声明一个 `useRef` 变量，然后返回一个方法，其逻辑为 `stop.current = true`。`useWatch` 先判断 `stop.current`，如果为 `true`，则直接返回。


参考：

1. https://juejin.cn/post/6844904078653276167


## 6. ReactDom.render


这个方法在 ts 和 tsx 中的类型是不同的，像下面的写法只能在 tsx 中写，否则会报错。

```tsx
ReactDOM.render(<Drawer {...drawerProps} /> , div);
```

如果使用了 ts 文件，报错内容是：

```
“Drawer”表示值，但在此处用作类型。是否指“类型 Drawer”
```


## 7. 函数式调用组件后改变属性

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

## 8. hooks 学习

### 8.1. useDefaultProps

TDesign 中用来实现默认 `Props` 的 `hook`。

就是判断每一个 `prop` 是否为 `undefined`，如果是，则赋值为 `defaultProps` 的值。

```ts
import { useMemo } from 'react';

// defaultProps 将于 18.3.0 废弃，故需实现 hook 在组件内部兼容
// https://github.com/facebook/react/pull/16210
export default function useDefaultProps<T>(originalProps: T, defaultProps: Record<PropertyKey, any>): T {
  return useMemo<T>(() => {
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

### 8.2. useDefault

受控模式和非受控模式的统一处理。

受控模式就是 `value` 不等于 `undefined`，将返回 value 和 onChange。

非受控模式就是 `value` 未定义，使用 `defaultValue`，更新的时候通同时执行 `setInternalValue`、`onChange`。

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

