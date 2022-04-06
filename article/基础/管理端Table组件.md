## 一、开始


做过几个管理端需求，很多页面都差不多，上面是几个搜索框，Input或者Select类型，中间一个新建按钮，下面一个Table，最下面是Table的分页，类似下图：


![](https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/admin-table-demo.png)

这种模式千篇一律，如果每次新来一个管理端需求，都要从0开始，那多费劲，有没有什么办法可以提高效率呢？

## 二、组件化

### 1. 思路

一个简单的想法是把它们抽成组件。组件的一个特征是通用性，它可能冗余了一小部分信息，比如一个Input组件，一些你不需要的属性它也内置了，但好处是适用性更强了。

回到上面的管理端Table页面，它其实是由一些组件组合而成，我们只要定义一些配置，然后生成页面就可以了，其思想是“配置驱动”。

注意，这里存在两种不同级别的组件：
- 一种是基础UI组件，不含逻辑，没有副作用，由基本的组件库组件构成，或者根据业务自己书写。
- 另一种是Module组件，可以存在一些逻辑，比如请求接口等。

对于这里的Table页面，将其作为一个Module组件，其由三个UI组件组成，结构如下：

![](https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/admin-table-stucture.png)

”新建“比较简单，没有提取UI组件。

### 2. UI组件

#### （1）搜索框

对于第一部分——搜索框，我们定义一个searchList，表明有多少搜索框及其类型。比如：

```js
const searchList = [{
  type: 'INPUT',
  name: 'nick',
  label: '主播昵称',
  placeholder: '请输入主播昵称',
  width: 200,
}, {
  type: 'SELECT',
  name: 'platform',
  label: '所在平台',
  placeholder: '请选择所在平台',
  options: [
    {
      value: '1',
      label: '斗鱼',
    },
    {
      value: '2',
      label: '虎牙',
    },
    {
      value: '3',
      label: '快手',
    },
  ],
  width: 200,
}, {
  type: 'INPUT',
  name: 'weight',
  label: '推荐权重',
  placeholder: '请输入',
  width: '120',
}];
```

目前搜索框支持Input/Select两种类型。

#### （2）新建


对于第二部分——新建，处理比较简单，只暴露了两个属性，是否显示`showAddItemBtn`和跳转地址`addItemRouter`。

#### （3）Table

对于第三部分——Table，定义了两个最基本的属性columns和tableData，columns是列信息，可以携带事件、指定slot，tableData是表格数据。columns如下：

```js
[{
  prop: 'desc',
  label: '自我介绍',
  width: '',
}, 
{
  prop: 'header',
  label: '图片',
  width: '100',
  slotList: [{
    type: 'AVATAR',
  }],
},
{
  prop: 'status',
  label: '状态',
  width: '',
  classFn: val => `my-status status-${val}`,
  formatter: ((val) => {
    const statusMap = {
      1: '正常',
      2: '已下线',
    };
    return statusMap[val] || '';
  }).toString(),
},
{
  label: '操作',
  slotList: [{
    type: 'BUTTON',
    emit(row) {
      this.$router.push({
        path: '/anchor/add',
        query: {
          anchor: row.streamerId,
        },
      });
    },
    text: '修改',
    props: {
      type: 'text',
      size: 'small',
    },
  }],
}]
```

其中slotList表明这个列是插槽列表，之所以设计成列表，主要是因为“操作”列可能有多个按钮。

Table组件中关于Slot的具体实现如下

```html
<template v-for="(tSlot, idx) of column.slotList">
  <!-- 按钮 -->
  <el-button
    v-if="tSlot.type === 'BUTTON'"
    :key="`slot-${idx}`"
    v-bind="tSlot.props || {}"
    @click.stop="onEmitEvent(tSlot, tableData[scope.$index])"
  >
    {{ tSlot.text }}
  </el-button>

  <!-- 头像 -->
  <el-avatar
    v-else-if="tSlot.type === 'AVATAR'"
    :key="`slot-${idx}`"
    :src="scope.row[column.prop]"
  />

  <!-- 自定义slot -->
  <slot
    v-else-if="tSlot.type === 'CUSTOM_SLOT'&& tSlot.name"
    :scope="scope"
    :name="tSlot.name"
  />
</template>
```

对于一个按钮类型slot来说，其基本结构如下：

```js
{
  type: 'BUTTON', // 指明类型
  emit(row) { // 处理事件，组件内部会将this绑定。
    this.$router.push({
      path: '/anchor/add',
      query: {
        anchor: row.streamerId,
      },
    });
  },
  text: '修改', // 文本
  props: { // 传递给el-button的其他属性
    type: 'text',
    size: 'small',
  },
}
```

对于一个Avatar类型的slot来说，其基本结构如下：

```js
{
  type: 'AVATAR', // 指明类型
}
```

除此以外，Table组件还有单独处理class、格式化的需求，这部分也是在columns中指定，比如：

```js
{
  prop: 'status',
  label: '状态',
  width: '',
  classFn: val => `my-status status-${val}`, // 单独处理class
  formatter: ((val) => { // 格式化函数，可为Function/String类型，String类型在组件内部会被转成Function
    const statusMap = {
      1: '正常',
      2: '已下线',
    };
    return statusMap[val] || '';
  }).toString(),
}
```

#### （4）分页

对于第四部分——表格的分页，完全由Module组件自己控制，开发者无需配置。


### 3. 其他

除了上面的结构需要一些配置/属性外，页面还需要通过接口获取数据，这里提供了一系列属性：

```js
// 数据获取URL
fetchDataUrl: {
  type: String,
  default: '',
},
// 数据获取基础URL
baseUrl: {
  type: String,
  default: '',
},
// 开发环境-数据获取基础URL
devBaseUrl: {
  type: String,
  default: '',
},
// 解析表格数据函数，入参数为接口返回的res，需返回list、total
parseTableDataFn: {
  type: [Function, String],
  default: null,
},
// 获取数据参数处理
handleFetchDataParamFn: {
  type: Function,
  default: null,
},
```