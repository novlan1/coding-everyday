## 1. page-meta

```
<page-meta :root-font-size="fontsize+'px'"></page-meta>
```

page-meta只能是页面内的第一个节点，可以实现rem


## 2. v-for

- 在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 v-for="(item, index) in 10" 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
- 在非H5平台 循环对象时不支持第三个参数，如 v-for="(value, name, index) in object" 中，index 参数是不支持的。
- 小程序端数据为差量更新方式，由于小程序不支持删除对象属性，使用的设置值为 null 的方式替代，导致遍历时可能出现不符合预期的情况，需要自行过滤一下值为 null 的数据。


## 3. uniapp中vant-tab 的change事件暴露参数为event，需适配

```ts
this.curTab = e.detail.name;
```

## 4. key

对于原生标签，可以用 :key="type-${index}"，

自定义标签，这样也可以 :key="`${item.childId}-hold`"，这样也可以 :key="`${index}-hold`"，有警告：

```
[WXML Runtime warning] ./local-component/ui/pages/user/home/index.wxml
 Now you can provide attr `wx:key` for a `wx:for` to improve performance.
```


这样就没有警告：

```
:key="getHoldKey(item.childId)"

getHoldKey(item) {
  return `hold${item.childId}`;
},
```


```
<TipMatchItem
  v-for="(item) in holdMatchList"
  :key="getHoldKey(item)"
  :item-data="item"
  @lookMatch="()=>lookMatch(item, 'hold')"
/>
```

```
@lookMatch="lookMatch(item, 'hold')" // 这样的话拿不到item，为undefined
```


https://uniapp.dcloud.io/tutorial/vue3-basics.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9


## 5. van-tab

uniapp中vant-tab不要用v-model，否则会被转为value="val" bind:change="__e" bind:input="__e"


```
data-event-opts="{{[['^change',[['onChangeStageTab']]],['^input',[['__set_model',['','curStageTab','$event',[]]]]]]}}"
```


## 6. style 不能用对象

## 7. key不能重复

小程序不支持字符串拼接，比如

:key="`hold` + index"


这样其实也是有问题的：

:key="`hold-${index}`"

甚至提到一个函数中，也有可能有问题：

```
:key="getHoldKey(index)"


getHoldKey(index) {
  return `hold${index}`
}
```

最佳方式其实是提前处理好数据，这样性能会更好，也避免了key重复。

```ts
getData() {
  items = items.map((item,index) => ({
    ...item,
    key: `hold-${index}`
  }))
}
```


key重复会造成挂载在组件上面的事件参数为undefined，从而不成功。


参考：

1. https://blog.csdn.net/weixin_55489077/article/details/119983795
2. https://www.jianshu.com/p/ec4c0c73bb83



## 8. prop为函数类型时this指向问题

父组件把方法传给子组件后，该方法里的this是子组件的this而不是父组件的this。

这个[链接](https://ask.dcloud.net.cn/question/97718)提到了相同的问题，一个解决方法是在外层声明`gThis`，然后在 `mounted` 或 `updated` 中将this 赋值给 gThis，`gThis = this`。


## 9. slot问题

uniapp是支持具名插槽的，有一点需要注意，对于写在slot标签上的类名，h5会下发到slot内部的外层元素上，而小程序则会创建view元素，在这个元素上添加类名。

如果遇到slot的样式异常，可以先排查下这里。

举个例子：

```html
<SomeComp class="extra">
  <template #middle>
      title
  </template>
</SomeComp>
```

SomeComp组件内容如下：

```html
<div class="inner">
  <div class="middle">
    <slot name="middle" />
  </div>
</div>
```

在h5中会被渲染成：

```html
<div class="extra inner">
  <div class="middle">
    title
  </div>
</div>
```

在小程序会被渲染成：

```html
<view class="extra">
  <view class="inner">
    <view class="middle">
      title
    </view>
  </view>
</view>
```

## 10. van-tab

`tabMap[curTab]`不要写在template中，否则切换tab时会有延迟，可以写在computed中。


```html
<!-- 存在问题 -->
<Comp 
  :list="tabMap[curTab]"
/>
```



```vue
<!-- 推荐 -->
<Comp 
  :list="curList"
/>

computed: {
  curList() {
    const { tabMap, curTab } = this;
    return tabMap[curTab]
  }
}
```

更好的方式是不依赖curTab

```html
:sche-list="stageScheMap[index]"
```

## 11. list挂载属性


之前在list上挂载属性，比如list = []; list.a = 1，是可以传递给子组件的，但是uniapp编译后则不可以。




