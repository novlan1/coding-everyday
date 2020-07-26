### MAC和IP地址正则匹配
1. MAC地址正则匹配：
```
([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}
```
2. IP地址正则匹配：
```
((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}
```
其中：

`2(5[0-5]|[0-4]\d)` 匹配：200 ~ 255
`[0-1]?\d{1,2}` 匹配：0 ~ 199



### `flatten state`概念及代码
`flatten state`就是把对象列表转成`hashMap`（对象），更方便的进行数据处理，省去map、filter、find等方法，直接`data[id]`获得

用reduce进行flatten：
```js
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}
```



### js滚动到指定位置方法

获取到最外层的div的id，然后获取属性`scrollTop`，给`scrollTop`赋值



### 拖动时的`e.clientX`和`offsetLeft`

```js
let diffX = e.clientX - alarmWrapDom.offsetLeft
let diffY = e.clientY - alarmWrapDom.offsetTop
```
`clientX`、 `clientY`是**鼠标离左上角**的距离，`offsetLeft`、`offsetTop`是**DIV框离左上角**的距离（或者使用`getBoundingClientRect()`）



### `immutable`排序也会产生新的对象，而不是原地排序
```js
let a = fromJS([4,3,2,5,2,4,1])
let bb = a.sort((c,d)=>c-d)
console.log( bb.toJS(), a.toJS())
// [1, 2, 2, 3, 4, 4, 5] 
// [4, 3, 2, 5, 2, 4, 1]
```
同时，注意几个API的差异：
```js
//Map()  原生object转Map对象 (只会转换第一层，注意和fromJS区别)
immutable.Map({name:'danny', age:18})

//List()  原生array转List对象 (只会转换第一层，注意和fromJS区别)
immutable.List([1,2,3,4,5])

//fromJS()   原生js转immutable对象  (深度转换，会将内部嵌套的对象和数组全部转成immutable)
immutable.fromJS([1,2,3,4,5])    //将原生array  --> List
immutable.fromJS({name:'danny', age:18})   //将原生object  --> Map

//toJS()  immutable对象转原生js  (深度转换，会将内部嵌套的Map和List全部转换成原生js)
immutableData.toJS();
```



### qs的`stringify`和`parse`

1、`qs.parse()`将URL解析成对象的形式
```js
let url = 'method=1&projectId=85&appToken=3';
qs.parse(url);   // {method: "1", projectId: "85", appToken: "3"}
```

2、`qs.stringify(  )`将对象解析成URL的形式
```js
let obj= {method: "1", projectId: "85", appToken: "3", datasetId: "12564701"};
qs.stringify( obj)   // method=1&projectId=85&appToken=3&datasetId=1256470

var a=[{a:123},{a:345}]    // 数组
qs.stringify(a)   //'0[a]=123&1[a]=345'

```

用途：
```js
if (method === 'POST' || method === 'PUT') {
    options.data = stringify(data)
  } else if(method === 'UPLOAD'){
    options.method = 'POST'
    options.params = data
    options.headers['Content-Type'] = 'multipart/form-data'
  } else {
    options.params = data
  }
```

### axios的cancelToken 取消发送

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const options = {
    ...
    cancelToken: source.token
}

source.cancel()
```



### 类 > 函数 > 对象 > 数组


### 音乐列表很长，是否在每一项上都绑定事件？
- 只在最外层包裹元素上绑定事件，根据事件冒泡机制，点到button的事件会被此包裹元素捕获，称为事件代理。
- 从而只有一次事件绑定，然后根据`event.target.dataset.id`判断点击具体目标是什么。


### classList属性
用`e.target.classList`获取和操作`class`，比`className`好用，有`add`、`remove`、`contains`、`replace`等实用方法。



