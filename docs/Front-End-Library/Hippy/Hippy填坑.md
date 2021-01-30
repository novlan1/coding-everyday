## Hippy填坑

### 1、抽取子组件后，页面异常卡顿

处理数据一定要放在父组件中，如果放在子组件中，会非常卡，日志显示createNode达到5000多个。

![img](http://km.oa.com/files/photos/pictures/b9c/6b1419b3f0d28e0a894ce54b1a1a2_w1052_h465.png)

**优化后：**

![img](http://km.oa.com/files/photos/pictures/2f6/8b529614c814d0ec88057a74fdfe6_w686_h485.png)

实际处理非常简单，就是请求回接口后，在父组件进行数据的处理，比如格式化日期等。

排查历程：排除了ul-li因素，key格式，this.$set，datalist => obj.list 减少data的赋值，

### 2、`<p>{{汉字}}</p>`没有任何报错，加载不出来

类似的还有 :title="汉字"，问题的关键是不提示任何报错，极其不友好。

### 3、keep-alive保留了组件，hippy的路由参数变化，也不触发mounted，应该是bug

解决方法：既然mounted不会触发，就在activated中去再次请求数据。

### 4、分享截图中，背景色为异常的黑色，正常页面为白色

解决：在shot-view上加上background-color: #fff

注意：background不生效

### 5、分享截图中，用shot-view包裹住截图的部分，导致页面卡顿

在shot-view元素加上 `position:relative;flex:1;`

### 6、如何让Hippy的ul元素兼容H5？

**为什么要兼容H5呢？**

为了只写一套代码，而Hippy中ul的@loadMore和@endReached事件，H5显然不支持。

**如何兼容？**

写一个全局组件，判断当前环境，如果是Hippy环境，就用Hippy原生的ul，否则就用vant的list。

具体实现中，要注意数据的传递，van-list和hippy的ul需要的props不同。

**index.hippy.vue**

```javascript
<template>
  <ul
    :class="uClass"
    :numberOfRows="dataLength"
    @loadMore="loadMore"
    @endReached="loadMore"
  >
    <slot />
  </ul>
</template>
```

 **index.h5.vue**

```javascript
<template>
  <van-list
    @load="loadMore"
  >
    <slot />
    <div
      v-if="finished"
      :style="loadingH5Style"
    >
      没有更多了
    </div>
    <div
      v-if="loading && dataLength"
      :style="loadingH5Style"
    >
      加载中...
    </div>
  </van-list>
</template>
```

###  7、如何用hippy提供的animation实现vue的loading？

Vue结构：

```javascript
<template>
  <div class="loading-wrap">
    <div class="loading-circle-wrap">
      <animation
        v-for="(item, index) of new Array(circleNumbers)"
        :key="index"
        playing
        :actions="actions[index] || {}"
      >
        <span class="circle" />
      </animation>
    </div>
    <p class="title">
      正在加载...
    </p>
  </div>
</template>
```

 Vue逻辑：

```javascript
function getActions(circleNumbers) {
  const actions = [];
  const unitDelay = 220;

  for (let i = 0; i < circleNumbers; i++) {
    actions.push({
      opacity: {
        startValue: 0,
        toValue: 1,
        duration: circleNumbers * unitDelay,
        delay: unitDelay * i,
        repeatCount: -1,
      },
    });
  }
  return actions;
}

export default {
  mounted() {
    this.onGetActions();
  },
  methods: {
    onGetActions() {
      const { circleNumbers } =  this;
      const actions = getActions(circleNumbers);
      this.actions = actions;
    },
  },
}
```

 CSS：

```scss
.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading-circle-wrap {
  display: flex;
  flex-direction: row;
}
.circle {
  background-color: gray;
  height: 0.16rem;
  width: 0.16rem;
  border-radius: 0.08rem;
  margin-right: 10px;
  opacity: 1;
}
.title {
  font-size: 0.28rem;
}
```

 同样地，由于animation元素只能在原生上使用，web上要用其他方案，就比较简单了。