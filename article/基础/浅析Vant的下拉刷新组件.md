## 一、开始

这是一篇简单的学习笔记。

## 二、结构

先看下pull-refresh组件的HTML结构：

```jsx
<div ref={root} class={bem()}>
  <div
    class={bem('track')}
    style={trackStyle}
    onTouchstart={onTouchStart}
    onTouchmove={onTouchMove}
    onTouchend={onTouchEnd}
    onTouchcancel={onTouchEnd}
  >
    <div class={bem('head')} style={getHeadStyle()}>
      {renderStatus()}
    </div>
    {slots.default?.()}
  </div>
</div>
```

可以看到下拉刷新的本质是对touch事件的监听，Vant这里是对class为track的元素的监听。

其中 renderStatus() 是 pulling、loosing、loading、success 这些状态的体现，就是一个div文本或者Loading组件：

```tsx
const renderStatus = () => {
  const { status, distance } = state;

  if (slots[status]) {
    return slots[status]!({ distance });
  }

  const nodes: JSX.Element[] = [];

  if (TEXT_STATUS.includes(status)) {
    nodes.push(<div class={bem('text')}>{getStatusText()}</div>);
  }
  if (status === 'loading') {
    nodes.push(
      <Loading
        v-slots={{ default: getStatusText }}
        class={bem('loading')}
      />
    );
  }

  return nodes;
};
```

## 三、下拉状态

看一下下拉状态的流转：

```
normal => pulling => losing => loading => success => normal...
```

假设触发下拉刷新的距离(pulling-distance)为M，头部占位距离(head-height)为N，动画时长(animation-duration)为D。状态流转解释如下：


- normal，原始位置
- pulling，下拉过程中下拉距离小于M的部分
- losing，下拉过程中下拉距离大于M的部分，松手前
- loading，松手后至数据加载完毕前，立即触发refresh事件，distance会被马上设置为N
- success，数据加载完毕后，下拉元素归位前，这部分存在时长为动画时长D。
- normal，动画运行完，归位

具体实现如下：

```ts
type PullRefreshStatus =
  | 'normal'
  | 'loading'
  | 'loosing'
  | 'pulling'
  | 'success';

const state = reactive({
  status: 'normal' as PullRefreshStatus,
  distance: 0,
  duration: 0,
});

const setStatus = (distance: number, isLoading?: boolean) => {
  const pullDistance = +(props.pullDistance || props.headHeight);
  state.distance = distance;

  if (isLoading) {
    state.status = 'loading';
  } else if (distance === 0) {
    state.status = 'normal';
  } else if (distance < pullDistance) {
    state.status = 'pulling';
  } else {
    state.status = 'loosing';
  }
};
```

在 onTouchMove 中会调用 setStatus 进行状态的流转：

```ts
const onTouchMove = (e: TouchEvent) => {
  if (!isTouchable()) {
    return;
  }
  const { deltaY } = touch;
  if (deltaY.value >= 0) {
    e.preventDefault();
    setStatus(ease(deltaY.value, PULL_DISTANCE));
  }
  touch.move(e);
};
```

在 onTouchEnd 中，会触发 refresh 事件：

```ts
const onTouchEnd = () => {
  state.duration = ANIMATION_DURATION;
  if (state.status === 'loosing') {
    emit('update:modelValue', true);
    nextTick(() => emit('refresh'));
  } else {
    setStatus(0);
  }
};
```



## 四、动画处理

在 onTouchStart 中，会将 state.duration 设置为0，这个数值会作为动画的持续时间。

这么做是为了在下拉的过程中不要有延迟，也就是animation-duration仅对松手释放、元素归位有效。

```ts
const onTouchStart = (e: TouchEvent) => {
  if (isTouchable()) {
    state.duration = 0;
    touch.start(e);
  }
};
```


下拉过程中，并不是向下拉多少，元素就向下位移多少，而是加了压缩，下拉越多，压缩比例越大。这样用户体验会好一点，而且几乎所有的APP都是这么做的。实现方式如下：

```ts
const ease = (distance: number) => {
  const pullDistance = +(props.pullDistance || props.headHeight);

  if (distance > pullDistance) {
    if (distance < pullDistance * 2) {
      distance = pullDistance + (distance - pullDistance) / 2;
    } else {
      distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
    }
  }

  return Math.round(distance);
};
```

## 五、样式

最后看下样式的实现。track 元素是`position: relative`，head 元素（就是“释放即可刷新...”等状态）是`position:absolute; transform: translateY(-100%)`。

```less
.van-pull-refresh {
  overflow: hidden;

  &__track {
    position: relative;
    height: 100%;
    transition-property: transform;
  }

  &__head {
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--van-pull-refresh-head-height);
    overflow: hidden;
    color: var(--van-pull-refresh-head-text-color);
    font-size: var(--van-pull-refresh-head-font-size);
    line-height: var(--van-pull-refresh-head-height);
    text-align: center;
    transform: translateY(-100%);
  }
}
```

track 元素的下拉距离动画是写入行内的：

```js
const trackStyle = {
  transitionDuration: `${state.duration}ms`,
  transform: state.distance
    ? `translate3d(0,${state.distance}px, 0)`
    : '',
};
```

