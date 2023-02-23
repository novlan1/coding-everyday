1. 拦截器
  

做请求参数拦截器，将参数中的`child_id`转为`child_id_new`，作为额外参数

做返回数据拦截器，递归遍历`child_id`为空，而`child_id_new`存在的情况，将`child_id_new`赋值给`child_id`

2. 改代码

全局搜索`childid|childId|child_id|mChildId`，在找到的每个文件中搜索`\+|parseInt|Number`，判断是否是转化了`childId`的类型，如果是，则去掉。

具体语法包括`parseInt(childId)`、`Number(childId)`、`+childId`

判断是否在组件的`props`中，将`childId`的类型设置为了`Number`，如果是，改成`[String, Number]`


