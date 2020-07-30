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


### 毫秒时间段转为持续时间
```js
function parseTime(time) {
    time = time / 1000
    
    const h = addZero(parseInt(time / 3600))
    const m = addZero(parseInt(time % 3600 / 60))
    const s = addZero(parseInt(time % 60))
    return `${h}:${m}:${s}`
}
```

### 正则匹配两位以内有效数字
```js
const pattern = /^\d+([.]{1}(\d){0,2}){0,1}$/
```
### 元素距离浏览器顶部距离
```js
getElementTop = (elem) => {
  if(!elem) return 0
  var elemTop = elem.offsetTop  // 获得elem元素距相对定位的父元素的top
  elem = elem.offsetParent // 将elem换成 相对定位的父元素
  while(elem) {
    elemTop += elem.offsetTop
    elem = elem.offsetParent
  }
  return elemTop
}
```
或者直接`ele.getBoudingRect.left()`

### JS一层层向上查找父节点

右击时不一定点在含有data-id的dom元素上，还有可能是子元素，所以需要向上查找，比如根据节点的类名：
```js
export const getParentNode = (node, parentClassName) => {
  let current = node
  while (current !== parentClassName) {
    if (current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}
```


### 判断是否是回文字符串
```js
function fn(s) {
  return s.split('').reverse().join('') === s
}
```

### moment获取当日0点时间戳
```js
moment().startOf('day');     // set to 12:00 am today
```

### moment时间戳与时间格式互换
获取时间戳 : 
```js
var res = moment(Date.now(), 'YYYY-MM-DD HH:mm:ss').valueOf();
```
获取格式时间: 
```js
var res = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
```

### 前端导出csv格式时产生中文乱码
```js
content="\ufeff"+content;
let url = window.URL.createObjectURL(new Blob([content], {type: 'text/csv, charset = utf-8'}));
```
在字符串头部加上`"\ufeff"`表示它是utf-8格式编码的，再用编辑器打开时就不会产生乱码了



### 实现compose
```js
// 命令式编程（面向过程）
function compose(fns) {
  let length = fns.length;
  let count = length - 1;
  let result = null;

  return function fn1(...args) {
    result = fns[count].apply(null, args);
    if (count <= 0) {
      return result
    }

    count--;
    return fn1(result);
  }
}
```
```js
// 声明式编程(函数式)
function compose(funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

### 判断参数是否为浮点型？
```js
// 1.
n != parseInt(n)

// 2.
~~n !== n
```

### js动态修改@keyframes属性值

`document.styleSheets`这个接口可以获取网页上引入的link样式表和style样式表。

`insertRule(rule,index)`
- rule ：要添加到样式表的规则。
- index：要把规则插入或附加到 cssRules 数组中的位置。



### charCodeAt() 
获取ASCII码




### HTML5视频元素video在加载的时候获取不到duration
1. 直接监听`canplay`事件获取：
`canplay`：当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。

2. 监听`onloadedmetadata`事件
`onloadedmetadata` ：事件在指定视频/音频（audio/video）的元数据加载后触发。
视频/音频（audio/video）的元数据包含: 时长，尺寸大小（视频），文本轨道。




### 单行文本超出经常使用省略号(`text-overflow: ellipsis`)，如何判断文本是否超出？
```js
var clientWidth = document.getElementById("ellipsis").clientWidth;  
var scrollWidth = document.getElementById("ellipsis").scrollWidth;  
if (clientWidth < scrollWidth){  
     alert("已省略……");  
}
```

### 借用`encodeURIComponent`进行base64编码
中文编码一直都是程序员要关注的，`window.btoa('哎哟不错')`，是会抛出异常的。
那么一般的思想都是先借用`encodeURIComponent`进行base64编码，
然后借用`decodeURIComponent`进行base64解码。
后看到MDN的备注，
```js
function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}
```

### escape, encodeURI, encodeURIComponent
`escape()`不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如"春节"的返回结果是`%u6625%u8282`，`escape()`不对"+"编码 主要用于汉字编码，现在已经不提倡使用。

`encodeURI()`是Javascript中真正用来对URL编码的函数。 编码整个url地址，但对特殊含义的符号`"; / ? : @ & = + $ , #"`，也不进行编码。对应的解码函数是：`decodeURI()`。

`encodeURIComponent() `能编码`"; / ? : @ & = + $ , #"`这些特殊字符。对应的解码函数是`decodeURIComponent()`。

假如要传递带`&`符号的网址，所以用`encodeURIComponent()`



### `e.preventDefault(); passive: true`
从 chrome56 开始，在 window、document 和 body 上注册的 `touchstart` 和 `touchmove` 事件处理函数，会默认为是`passive: true`。浏览器忽略 preventDefault() 就可以第一时间滚动了。

导致下面的效果一致：
```
wnidow.addEventListener('touchmove', func) // 效果和下面一句一样
wnidow.addEventListener('touchmove', func, { passive: true })
```

#### 如何不让控制台提示，而且 `preventDefault()` 有效果呢？

注册处理函数时，用如下方式，明确声明为不是被动的
```js
window.addEventListener(‘touchmove’, func, { passive: false })
```



### 代理
ES5对象代理
```
var Person1 = {
name: 'es5',
age: 16
};

Object.defineProperty(Person1, 'sex', {
writable:false,
value: 'male'
});
```
ES6对象代理
```
let Person2 = {
name: 'es6',
sex: 'male',
age: 17
};

let person2 = new Proxy(Person2, {
get(target, key) {
return target[key];
},
set(target, key, value) {
if(key !== 'sex') {
return (target[key] = value);
 }
 }
});
```

### &&符号
&&符号也是可以赋值的，需要加上小括号，如：
```js
step > max_step && (step = min_step)
```

### 服务端请求数据自动添加`http://127.0.0.1`
服务端axios.get/post请求数据，自动添加`http://127.0.0.1`, 而客户端自动添加`http://localhost:3000`, 可见服务端不会添加端口。因为服务端没有domain



### 拖拽技巧
- 拖拽的事件不要放在某个小div上，而要放在全局上，否则卡顿
- addEventListener 第三个参数为true（捕获阶段），不冒泡

### 禁止拖拽时选中文本的方法: 
- js: `mousedown`事件`return false`
- css：`user-select: none;`




### 如何处理浮点数计算不准确？
方法1：通过`toFixed(num)`方法来保留小数。因为这个方法是根据四舍五入来保留小数的，所以最后的计算结果不精确。
方法2：把要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，计算完以后再降级，推荐


### JS实现滚动条触底加载更多

原理：
通过监听滚动区域DOM的scroll事件, 计算出触底
```js
// 滚动可视区域高度 + 当前滚动位置 === 整个滚动高度
scrollDom.clientHeight + scrollDom.scrollTop === scrollDom.scrollHeight
```

### 页面切换出去再切换回来后怎样保持之前的滚动位置
- 当页面切换出去的时候会调用`componentWillUnmount`方法，所以在这里记录下当前组件位置（`scrollTop = this.contentNode.scrollTop`）
- 当页面切换进来的时候会调用`componentDidMount`方法，将之前保存的位置重新赋值给组件（`this.contentNode.scrollTop = scrollTop`）
- scrollTop放在类外面作为全局变量
- `ref={ node => this.contentNode = node }`



### 判断浏览器版本是否ie8,ie9,ie10,ie11并提示升级
```html
<!--[if lte IE8]>
<p class=''>您的浏览器太旧了，请到<a href='http://browserhappy.com'>这里</a>更新</p>
<![endif]-->
```
- 优点：注释语句仅在IE浏览器执行，代码简单
- 缺点：仅支持到IE9，不支持IE10和IE11


### 解构赋值常见应用
多维数组变一维数组，`[].concat(...arr)`或者`[].concat.apply([], arr)`


由于`[].concat(1,2,3)` 和`[].concat([1,2,3])`结果一样，所以`arg.concat(...arguments)`等于`arg.concat([...arguments])`

`Array.prototype.slice.call(arguments, 1)` 等于`[...arguments].slice(1)`



### 下载CSV

```javascript
const exportCSV = (data, name) => {
  // var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
  var downloadLink = document.createElement("a");
  // downloadLink.href = uri;
  
  var blob = new Blob(["\ufeff" + data], {type: 'text/csv,charset=UTF-8'}); //解决大文件下载失败
  
  downloadLink.setAttribute("href", URL.createObjectURL(blob));
  downloadLink.download = name ? (name+".csv"): "temp.csv";
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
```

### 生成随机字符串

```javascript
/**
 * toString()方法可以根据所传递的参数把数值转换为对应进制的数字字符串。参数范围为 2~36 之间的任意整数。
 * substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
 * e.g, 0.3288894104484157 => '0.agp1hbf0dko' => 'agp1hbf0dko'
 */
function getRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}
```

### 生成[n, m]的随机整数
```js
/**
 * parseInt()和Math.floor()结果都是向下取整。
 * 所以Math.random()*5生成的都是[0,4] 的随机整数。
 * 所以生成[1,max]的随机数，公式如下：
 */
parseInt(Math.random()*max, 10) + 1;
Math.floor(Math.random() * max) + 1;
Math.ceil(Math.random() * max);
```
```js
// 生成[min,max]的随机数
function getRandInt(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1))
}
```

