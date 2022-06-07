

## 一、开始

近期整理了一些“收藏”，主要是日常开发中遇到过的问题和小知识点。


## 二、前端

### 1. void运算符

void 运算符 对给定的表达式进行求值，然后返回 undefined。比如：

```js
function test() {
  return void console.log(1)
}

const res = test()
// 1

console.log(res)
// undefined
```



`void 0`返回`undefined`，为什么经常能看到`void 0`，而不是直接用`undefined`呢？因为`undifined`在函数中可以被改写，在全局作用域中不会。


```js
function test() {
  const undefined = 1
  console.log(undefined)
}

test() // 1
```

为什么是`void 0`呢，而不是其他表达式呢，因为`void 0`是表达式中最短的。用`void 0`代替`undefined`能节省字节。

除了表示undefined外，有时还会看到以下用法：


```html
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，如果去掉 void()，
  点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome中即使<a href="javascript:0;">也没变化，firefox中会变成一个字符串0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>
```

当用户点击一个以 `javascript:` 开头的URI 时，它会执行URI中的代码，然后用返回的值替换页面内容，除非返回的值是undefined。void运算符可用于返回undefined。

注意，虽然这么做是可行的，但利用 javascript: 伪协议来执行 JavaScript 代码是不推荐的，推荐的做法是为链接元素绑定事件。



相关资料：

1. [void-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)
2. [void 0 与 undefined的区别](https://blog.csdn.net/juzipchy/article/details/86367565)




### 2. CSS 如何排除具有某个class的项


```scss
.text:not(.text-danger){
  display: inline-block;
}
// 增加样式时将class为text的元素并且含有text-danger类的排除掉。
```

相关资料：[前段笔记之——css 排除具有某个class的项](https://blog.csdn.net/weixin_42336774/article/details/87871397)


### 3. 报错`Cannot read property bindings of null`的解决方法


如果该使用`@babel/preset-env`，却使用了`babel-preset-env`就会报这个错误，也就是`@babel/preset-env`的7和6版本不兼容。

```js
// webpack.config.js
{
 test: /\.js$/,
 loader: 'babel-loader',
 exclude: /node_modules/, 
 query: {
   //presets: ["env"]
   presets: ["@babel/preset-env"]
 }
}
```


相关资料：[Cannot read property bindings of null 解决方法](https://blog.csdn.net/qq_41614928/article/details/106839182)

### 4. CSS宽度高度的百分比取值基于谁


width=num% ， height=num% 基于以下几点

1. 若元素不存在定位： 则基于直接父元素的宽高度

2. 若元素存在定位 且 定位为 relative， 则也基于直接父元素的宽高度

3. 若元素存在定位 且 定位为 absolute， 则基于最近的相对定位（relative）的祖先元素的宽高度

4. 若元素存在定位 且 定位为 fixed， 则始终基于body元素的宽高度


注意上面都是**宽高度**！！！

参考：[CSS宽度高度的百分比取值基于谁](https://www.cnblogs.com/nelson-hu/p/9470648.html)


### 5. h5页面禁止双击或者双指放大




第一种方式，可以在meta中指定以下内容，缺点是如果要放开就很难了。


```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
```

第二种方式是用JS控制：

```js
// 禁止ios10+页面缩放
export const disabledScale = () => {
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    })
}
```

在业务组件（比如Vue组建）内引入：


```js
import { disabledScale } from "@/tools/disableScale";

mounted() {
  disabledScale();
},
```

参考：[h5页面禁止双击或者双指放大](https://blog.csdn.net/qq_46003166/article/details/106851406)


### 6. 获取Cookie

主要是正则的理解：`(^| )name=(.*?)(;|$)`。

```js
function getC(name) {
  const re =new RegExp('(^| )' +name + '=(.*?)(;|$)')
  const ma = document.cookie.match(re);
  if (ma && ma[2]) {
    return ma[2]
  } 
}
```


### 7. 驼峰和下划线的转换

转驼峰很简单，就是`/_(\w)/`。


转下划线就是匹配 `/([A-Z])/`，然后用`$1`替换匹配到的，即`_$1`。


```js
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}

// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}
 
 
// 测试
let a = 'a_b2_345_c2345';
console.log(toHump(a));
 
let b = 'aBdaNf';
console.log(toLine(b));
```

### 8. 正确使用cookie中的domain

domain的含义为域，分为子域和父域，子域可以访问本级域名及父级域名的下的cookie。

假设有两个域名：

```
域名1：a.b.e.f.com.cn  

域名2：c.d.e.f.com.cn   
```

在域名中，所有域名进行分级，也就是说域名1与域名2都是`f.com.cn`的子域名，`f.com.cn`又是`com.cn`的子域名。

在域名1所使用的服务中，可以设置域名

```
a.b.e.f.com.cn

b.e.f.com.cn

e.f.com.cn

f.com.cn
```

于域名1下的`cookie`，域名2可以拿到`e.f.com.cn`，`f.com.cn这`两个`domain`下的`cookie`，单点登录，就是以这个原理实现的。


#### （1）不同`domain`可以存在同名的`cookie`

如果存在相同名的`cookie`不同`domain`呢？不同域名下`的cookie`可以同名，同域名下的`cookie`同名会被替换。

比如`域名1`设置设置`domain`为`e.f.com.cn`的`cookie`，`mykey=myvalue1`。而在`域名2`中设置`domain`为`c.d.e.f.com.cn`的`cookie`，`mykey=myvalue2`。此时在`域名2`服务端能拿到两个`cookie`，并不存在覆盖一说。

注意在域名2中如果设置`domain`为`e.f.com.cn`的`cookie`，`mykey=myvalue3`。此时会覆盖域为`e.f.com.cn`的`mykey`的值，即浏览器中，同一个域，只存在一个名为`mykey`的`cookie`。

#### （2）显式设置domain

如果不显式设置domain，那么浏览器会生成一个只针对当前域名的cookie。

>如果显式声明，不管域中带不带点，到chrome中，都是带点存储的，只有非显式声明域的cookie，浏览器存储才是不带点的。


如果有一个域名就是`e.f.com.cn`，在该域名下设置的cookie如果没有显式domain，在回写浏览器的时候浏览器会特殊处理。如果是火狐，你会发现该cookie的信息，有一个主机项，而域项消失了。在chrome中，虽然有域这个项，但是域的前面少了一个点，也就是子域名拿不到这个cookie。

所以要想子域名拿到这个cookie，需要显式设置domain，比如：

```js
document.cookie=`userName=123;domain=qq.com;`
```


参考：[正确使用cookie中的domain](https://blog.csdn.net/u010856177/article/details/81104714)



### 9. 倒计时

```js
var presentDate = new Date();
var funtureTime = funtureDate.getTime();
var presenTime = presentDate.getTime();
var allTime = funtureTime - presenTime;         

var allSecond = parseInt(allTime / 1000);
var day = size(parseInt(allSecond / 3600 / 24));
var hour = size(parseInt(allSecond / 3600 % 24));
var minute = size(parseInt(allSecond / 60 % 60));
var second = size(parseInt(allSecond % 60));


function size(num) {
  return num < 10 & num >= 0 ? '0' + num : num;
}  
```

参考：[JS实现超级简单的动态倒计时](https://blog.csdn.net/wls666/article/details/89543397)



### 10. vant使用list时，`@load`无法触发


在`list`的父级样式添加 `overflow-y: scroll; height: 100%;`

参考：[vant使用list时，@load 无法触发](https://blog.csdn.net/weixin_44231175/article/details/119653048)


### 11. selenium和puppeteer的区别


- Chronium -> (DevTools Protocol) -> puppeteer
- Chronium -> (DevTools Protocol) -> ChromeDriver -> (WebDriver Protocol) -> WebDriver Client(比如selenium)


参考：[webdriver和puppeteer在实现原理上有什么区别](https://www.zhihu.com/question/278723746)




### 12. `.gitignore`忽略文件夹中除了指定的文件外的其他所有文件

只有2级目录：

```js
//.ignore忽略文件夹中除了指定的文件外的其他所有文件
**/node_modules/*//忽略文件夹node_modules
!**/node_modules/vue-html5-editor/ //不包含vue-html5-editor文件夹
```

存在多级目录时：

```js
//错误写法
**/node_modules/*//忽略文件夹node_modules
!**/node_modules/vue-html5-editor/dist/  //这样写是不生效的

//正确写法
**/node_modules/*
!**/node_modules/vue-html5-editor/
**/node_modules/vue-html5-editor/*
!**/node_modules/vue-html5-editor/dist
```


参考：[.gitignore忽略文件夹中除了指定的文件外的其他所有文件](https://www.jianshu.com/p/82bbcfbb0ec9)

### 13. 正确的清除cookie

清除cookie方式是设置为过期，切记设置domain和path，只有这两个参数跟你要删除的参数完全一样才能把它删除掉。


参考：[Javascript清除cookie的方法](https://www.jiangweishan.com/article/js8usdotjoi8390785023985.html)


### 14. JS设置CSS样式的几种方式



1. 直接设置style的属性，属性名用驼峰写法

比如：

```
element.style.height = '100px';
```


2. setAttribute

```js
element.setAttribute('height', 100);
element.setAttribute('height', '100px');
```

3. setAttribute设置style

```js
element.setAttribute('style', 'height: 100px !important');
```

4. 使用setProperty。如果要设置!important，推荐用这种方法设置第三个参数,属性名不用驼峰写法

```js
element.style.setProperty('height', '300px', 'important');
```

5. 改变class

```js
element.className = 'blue';
element.className += 'blue fb';
```

6. 设置cssText

```js
element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';
```


7. 创建并引入新的CSS样式文件

```js
function addNewStyle(newStyle) {
  let styleElement = document.getElementById('styles_js');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'styles_js';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('.box {height: 100px !important;}');
```

8. 使用addRule、insertRule

```js
// 在原有样式操作
document.styleSheets[0].addRule('.box', 'height: 100px');
document.styleSheets[0].insertRule('.box {height: 100px}', 0);

// 或者插入新样式时操作
const styleEl = document.createElement('style');
const styleSheet = styleEl.sheet;
styleSheet.addRule('.box', 'height: 100px');
styleSheet.insertRule('.box {height: 100px}', 0);
document.head.appendChild(styleEl);
```


参考：[JS设置CSS样式的几种方式](https://blog.csdn.net/x619y/article/details/80604609)



### 15. CSS3 animation动画中forwards和both的区别


如果动画无延迟，forwards 和 both 表现出来的效果是相同的；在有延迟的时候表现出来的效果才会不同，forwards 和 both 的结束效果相同（停留在最后一个关键帧中定义的状态），**开始时 both 会应用 backwards（第一帧定义的状态） 的效果**。


参考：[一次搞懂 CSS3 animation动画中forwards和both的区别](https://blog.csdn.net/weixin_42989576/article/details/100551602)



### 16. Webpack3和4的区别


1. 增加了一个mode配置，只有两种值`development | production`。
2. 移除了webpack.optimize.CommonsChunkPlugin。可使用optimization.splitChunks进行模块划分（提取公用代码）。
3. 删除原 extract-text-webpack-plugin 配置，增加 mini-css-extract-plugin 配置。
4. 移除UglifyJsPlugin，只需要使用optimization.minimize为true就行，production mode下面自动为true
5. 移除loaders，必须使用rules。


参考：[WEBPACK3和WEBPACK4区别](https://www.cnblogs.com/Super-scarlett/p/11085363.html)



### 17. Nodejs接收图片base64格式保存为文件


base64的形式为`“data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0...”`；

当接收到上边的内容后，需要将`data:image/png;base64`,这段内容过滤掉，过滤成：`“iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0...”`；然后进行保存。

```js
const fs=require('fs');
app.post('/upload', function(req, res){
    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // 返回一个被 string 的值初始化的新的 Buffer 实例,原始二进制数据存储在 Buffer 类的实例中，        
    // 一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("保存成功！");
        }
    });
});
```

参考：[Nodejs接收图片base64格式保存为文件](https://blog.csdn.net/weixin_42103706/article/details/105903712)




### 18. 字符串中的换行符`\r`、`\n`、`<br>`不生效问题


在css中设置：

```scss
white-space: pre-line; // 合并空白符序列，但是保留换行符 让换行符生效
```


### 19. 进制转换

js中的两个内置方法 toString 和 parseInt。

`toString` 可以把一个数转换为指定进制的数，`parseInt` 是把数按照指定进制解析成十进制的数。

1. 任意进制转换成十进制

```js
console.log(parseInt('11001',2)) // 25
console.log(parseInt('007F',16)) // 127
```

2. 十进制转成任意进制

```js
(25).toString(2) // 11001
```


顺便贴下字符与Unicode（其实是UTF-16代码单元）互相转化：

```js
"a".charCodeAt(0)
// 97

String.fromCharCode(97)
// "a"
```

### 20. 可选链操作符属性为数组

可选链操作符，数组的话，可以 `list?.[1]`。

也可以 `let nestedProp = obj?.['prop' + 'Name'];`


### 21. TS报类型错误

报类型错误，可以直接`(pvpapp as any).invoke`。


### 22. 异步函数调用

异步函数调用的时候不能用`await`，要用`then`，不然某些考试编辑器会超时。


### 23. 查看npm全局包下载路径

```bash
# 查看全局包下载路径
$ npm root -g

# 查看命令下载路径
$ npm bin -g
```

### 24. 插槽

插槽就是在组件引用的内部增加额外的内容，比如一个子组件名字是`Comp`，父组件这样使用：`<Comp>hello</Comp>`，`hello`所处的位置就是`slot`插槽。




### 25. 实现一个任务调度器，将多个任务依次执行，并且上一个任务的结果作为下一个任务的参数

```js
function taskRunner() {
  // TODO
}

function step1(a) {
  return `1-${a}`
}

async function step2(b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`2-${b}`)
    }, 2000)
  })
}


const task = taskRunner(step1, step2)

const res = task(0)
```

实现：

```js
function taskRunner() {
  const [...steps] = [...arguments];

  return async function (...args) {
    let tempRes;

    for (let i = 0;i < steps.length;i++) {
      const step = steps[i];
      if (i == 0) {
        tempRes = await Promise.resolve(step(...args));
      } else {
        tempRes = await Promise.resolve(step(tempRes));
      }
    }

    return tempRes;
  };
}

const task = taskRunner(step1, step2)

const res = task(0)

res.then(res => {
  console.log('res', res)
})
// res 2-1-0
```

### 26. 将对象的key由下划线转为驼峰，只转化key

```js
function toHump(str) {
  return str.replace(/\_(\w)/g, (a,b) => {
    return b.toUpperCase()
  })
}

function objToHump(obj, cache = new WeakMap()) {
  if (!(obj instanceof Object)) {
    return obj;
  }

  if (cache.get(obj)) {
    return cache.get(obj);
  }

  const res = {};
  cache.set(obj, res);

  Object.keys(obj).map((key) => {
    const newKey = toHump(key);

    if (obj[key] instanceof Object) {
      if (Array.isArray(obj[key])) {
        res[newKey] = obj[key].map(cObj => objToHump(cObj, cache));
      } else {
        res[newKey] = objToHump(obj[key], cache);
      }
    } else {
      res[newKey] = obj[key];
    }
  });

  return res;
}


const obj = {
  a_apple_p: 'aa',
  a_apple_q: {
    a_k_c: '1',
  },
  a_apple_u: {
    a_apple_h: {
      a_apple_i: '123',
    },
  },
  a_apple_t: [
    {
      a_k_c: '2',
      dd_dd_dd: '3',
    },
    {
      a_k_d: '5',
      dd_dd_de: '6',
    },
  ],
};

obj.t_t_t = obj;

console.log(objToHump(obj));

/**
 * {
      aAppleP: 'aa',
      aAppleQ: { aKC: '1' },
      aAppleU: { aAppleH: { aAppleI: '123' } },
      aAppleT: [ { aKC: '2', ddDdDd: '3' }, { aKD: '5', ddDdDe: '6' } ],
      tTT: [Circular *1]
    }
 */
```


### 27. 理解 TypeScript 中 any 和 unknown


#### （1）Any

any 类型类似于纯 JavaScript 的工作方式。我们有时可能需要描述一个我们根本不知道类型的变量。

```ts
let uncertain: any = 'Hello world'!;
uncertain = 5;
uncertain = { hello: () => 'Hello world!' };
```

在 TypeScript 中，任何东西可以赋值给 any 。它通常被称为 top type 。


>any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查.

any 破坏了 TypeScript 的类型检查，会引起错误：

```ts
const uncertain: any = 'Hello world!';
uncertain.hello();
```

下面是更接近实际的例子：

```ts
const dog: any = {
 name: 'Fluffy',
 sayHello: () => 'woof woof'
};

dog.hello();
```


#### （2）Unknown

TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown。

```ts
let uncertain: unknown = 'Hello'!;
uncertain = 12;
uncertain = { hello: () => 'Hello!' };
```

我们只能将 unknown 类型的变量赋值给 any 和 unknown。

```ts
let uncertain: unknown = 'Hello'!;
let notSure: any = uncertain;
```

它确实在很多方面不同于 any 类型。如果不缩小类型，就无法对 unknown 类型执行任何操作。

```ts
function getDog() {
return '22'
}

const dog: unknown = getDog();
dog.hello(); //Object is of type 'unknown'
```

##### a. 使用类型断言缩小未知范围

上述机制具有很强的预防性，但对我们的限制过于有限。要对未知类型执行某些操作，首先需要使用类型断言来缩小范围。

```ts
const getDogName = () => {
let x: unknown;
return x;
};

const dogName = getDogName();
console.log((dogName as string).toLowerCase());
```

在上面的代码中，我们强制TypeScript编译器相信我们知道自己在做什么。

以上的一个重要缺点是它只是一个假设。它没有运行时效果，也不能防止我们在不小心的情况下造成错误。比如下面的代码, 他实际上是错误的, 但却可以通过 typescript 的检测.

```ts
const number: unknown = 15;
(number as string).toLowerCase();
```

TypeScript编译器接收到我们的数字是一个字符串的假设，因此它并不反对这样处理它。


##### b. 使用类型收缩

一种更类型安全的缩小未知类型的方法是使用 类型收缩 。TypeScript 编译器会分析我们的代码，并找出一个更窄的类型。

```ts
const dogName = getDogName();
if (typeof dogName === 'string') {
  console.log(dogName.toLowerCase());
}
```

在上面的代码中，我们在运行时检查了 dogName 变量的类型。因此，我们可以确保只在 dogName 是变量时调用 toLowerCase函数。

除了使用 typeof，我们还可以使用 instanceof 来缩小变量的类型。

```ts
type getAnimal = () => unknown;

const dog = getAnimal();

if (dog instanceof Dog) {
 console.log(dog.name.toLowerCase());
}
```

在上面的代码中，我们确保只有在变量是某个原型的实例时才调用dog.name.toLowerCase。TypeScript编译器理解这一点，并假设类型。


##### c. 联合类型中的 unknown 类型

在联合类型中，unknown 类型会吸收任何类型。这就意味着如果任一组成类型是 unknown，联合类型也会相当于 unknown：

```ts
type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
```

这条规则的一个意外是 any 类型。如果至少一种组成类型是 any，联合类型会相当于 any：

```ts
type UnionType5 = unknown | any;  // any
```

为什么 unknown 可以吸收任何类型（any 类型除外）？让我们来想想 unknown | string 这个例子。这个类型可以表示任何 unkown 类型或者 string 类型的值。就像我们之前了解到的，所有类型的值都可以被定义为 unknown 类型，其中也包括了所有的 string 类型，因此，unknown | string 就是表示和 unknown 类型本身相同的值集。因此，编译器可以将联合类型简化为 unknown 类型。


##### d. 交叉类型中的 unknown 类型

在交叉类型中，任何类型都可以吸收 unknown 类型。这意味着将任何类型与 unknown 相交不会改变结果类型：

```ts
type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
```

让我们回顾一下 IntersectionType3：unknown & string 类型表示所有可以被同时赋值给 unknown 和 string 类型的值。由于每种类型都可以赋值给 unknown 类型，所以在交叉类型中包含 unknown 不会改变结果。我们将只剩下 string 类型。


##### e. 示例：从 localStorage 中读取JSON


这是一个使用 unknown 类型的真实例子。

假设我们要编写一个从 localStorage 读取值并将其反序列化为 JSON 的函数。如果该项不存在或者是无效 JSON，则该函数应返回错误结果，否则，它应该反序列化并返回值。

因为我们不知道在反序列化持久化的 JSON 字符串后我们会得到什么类型的值。我们将使用 unknown 作为反序列化值的类型。这意味着我们函数的调用者必须在对返回值执行操作之前进行某种形式的检查（或者使用类型断言）。


实现如下：

```ts
type Result =
  | { success: true, value: unknown }
  | { success: false, error: Error };
 
function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);
 
  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`)
    };
  }
 
  let value: unknown;
 
  try {
    value = JSON.parse(item);
  } catch (error) {
    // The item is not valid JSON, thus return an error result
    return {
      success: false,
      error
    };
  }
 
  // Everything's fine, thus return a success result
  return {
    success: true,
    value
  };
}
```


tryDeserializeLocalStorageItem 的函数调用者在尝试使用 value 或 error 属性之前必须首先检查 success 属性：

```ts
const result = tryDeserializeLocalStorageItem("dark_mode");
 
if (result.success) {
  // We've narrowed the `success` property to `true`,
  // so we can access the `value` property
  const darkModeEnabled: unknown = result.value;
 
  if (typeof darkModeEnabled === "boolean") {
    // We've narrowed the `unknown` type to `boolean`,
    // so we can safely use `darkModeEnabled` as a boolean
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  // We've narrowed the `success` property to `false`,
  // so we can access the `error` property
  console.error(result.error);
}
```

请注意，tryDeserializeLocalStorageItem 函数不能简单地通过返回 null 来表示反序列化失败，原因如下：

1. null 值是一个有效的 JSON 值。因此，我们无法区分是对值 null 进行了反序列化，还是由于缺少参数或语法错误而导致整个操作失败。
2. 如果我们从函数返回 null，我们无法同时返回错误。因此，我们函数的调用者不知道操作失败的原因。


#### （3）小结

unknown 类型要安全得多，因为它迫使我们执行额外的类型检查来对变量执行操作。




参考：
1. [[译] 理解 TypeScript 中 any 和 unknown](https://blog.51cto.com/u_13691366/3266274)
2. [[译] TypeScript 3.0: unknown 类型](https://blog.csdn.net/weixin_33716557/article/details/93177689)



### 28. 填写Promise的返回值类型

介绍完 unknown 类型后，看下下面这个题：


lib.d.ts：

```ts
type SomeProp = unknown;
export declare function getSomeProp(): Promise<SomeProp>;
```

main.ts：

```ts
import { getSomeProp } from './lib';

/**
 * 请实现下面这个类型，使得下面的 `main` 函数能通过 TypeScript 的类型检查。
 * 注意：不能修改 lib.d.ts 文件。
 */
type Result = /* REPLACE */ any;

async function main() {
  const res: Result = await getSomeProp();
}
```

这里我的理解是 unknown 类型的变量只能赋值给 any 或 unknown，那么这里不是 any 也就是 unknown 了。


### 29. Passive Event Listeners

addEventListener()：大家都是认识的，为dom添加触发事件。

在早期addEventListener是这样的：

```js
addEventListener(type, listener, useCapture)
```

useCapture:是否允许事件捕捉，但是很少会传true，然后就变成可选项了：


```js
addEventListener(type, listener[, useCapture ])
```

到现在就变成了这个样子：

```js
addEventListener(type, listener, {
    capture: false, //捕获
    passive: false, 
    once: false    //只触发一次
})
```


如果我们在 touchstart 事件调用 preventDefault 会怎样呢？这时页面会禁止，不会滚动或缩放。那么问题来了：浏览器无法预先知道一个监听器会不会调用 preventDefault()，它需要等监听器执行完后，再去执行默认行为，而监听器执行是要耗时的，这样就会导致页面卡顿。

当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 touchstart 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 preventDefault，那么页面就不应该滚动，如果你没有调用 preventDefault，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。


当浏览器等待执行事件的默认行为时，大部分情况是白等了。如果 Web 开发者能够提前告诉浏览器：“我不调用 preventDefault 函数来阻止事件事件行为”，那么浏览器就能快速生成事件，从而提升页面性能。

Chrome官方有个视频测试：https://www.youtube.com/watch?v=NPM6172J22g 


而 passive 就是为此而生的。在 WICG 的 demo 中提到，即使滚动事件里面写一个死循环，浏览器也能够正常处理页面的滑动。

在最新的 DOM 规范中，事件绑定函数的第三个参数变成了对象：

```js
target.addEventListener(type, listener[, options]);
```

我们可以通过传递 passive 为 true 来明确告诉浏览器，事件处理程序不会调用 preventDefault 来阻止默认滑动行为。

在 Chrome 浏览器中，如果发现耗时超过 100 毫秒的非 passive 的监听器，会在 DevTools 里面警告你加上 `{passive: true}`。




参考：

1. [移动Web滚动性能优化: Passive event listeners](https://zhuanlan.zhihu.com/p/24555031)
2. [passive的作用和原理](https://blog.csdn.net/w993263495/article/details/85009761)
3. [让页面滑动流畅得飞起的新特性：Passive Event Listeners](https://blog.csdn.net/dj0379/article/details/52883315)

### 30. Chrome渲染原理

上面的参考文章中，讲到了Chrome的渲染过程中的几个概念：

- 绘制（Paint）：将绘制操作转换成为图像的过程（比如软件模式下经过光栅化生成位图，硬件模式下经过光栅化生成纹理）。在Chrome中，绘制分为两部分实现：绘制操作记录部分（main-thread side）和绘制实现部分（impl-side）。绘制记录部分将绘制操作记录到SKPicture中，绘制实现部分负责将SKPicture进行光栅化转成图像；
- 图层（Paint Layer）：在Chrome中，页面的绘制是分层绘制的，页面内容变化的时候，浏览器仅需要重新绘制内容变化的图层，没有变化的图层不需要重新绘制；
- 合成（Composite）：将绘制好的图层图像混合在一起生成一张最终的图像显示在屏幕上的过程；
- 渲染（Render）：可以简单认为渲染等价于绘制+合成；
- UI线程（UI Thread）：浏览器的主线程，负责接收到系统派发给浏览器窗口的事件、资源下载等；
- 内核线程（Main/Render Thread）：Blink内核及V8引擎运行的线程，如DOM树构建、元素布局、绘制（main-thread side）、JavaScript执行等逻辑在该线程中执行；
- 合成线程（Compositor Thread）：负责图像合成的线程，如绘制（impl-side），合成等逻辑在该线程中执行。

#### （1）单线程渲染框架

内核线程几乎包揽了页面内容渲染的所有工作，如JavaScript执行，元素布局，图层绘制，图层图像合成等，每项工作的执行耗时基本都跟页面内容相关，耗时一般在几十毫秒至几百毫秒不等。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/chrome-single-thread-render.png" width="500">

#### （2）线程化渲染框架

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/chrome-multi-thread-render.png" width="500">


在Chrome的线程化渲染框架中，当内核线程完成第1帧（Frame#1）的布局和记录绘制操作，立即通知合成线程对第一帧（Frame#1）进行渲染，然后内核线程就开始准备第2帧（Frame#2）的布局和记录绘制操作。由此可以看出，内核线程在进行第N+1帧的布局和记录绘制操作同时，合成线程也在努力进行第N帧的渲染并交给屏幕展示，这里利用了CPU多核的特性进行并发处理，因此提高了页面的渲染效率。由此也可知，实际上用户看到的页面内容，是上一帧的内容快照，新的一帧还在处理中。


### 31. 配置 Webpack 的 loader


#### （1）配置规则Rule的条件

`Rule.test`

筛选资源，符合条件的资源让这项规则中的loader处理。

除了test，还可以用
- Rule.include（包含）
- Rule.exclude（排除）
- Rule.resource（可以在里面配置test、include、exclude子选项，上面三个其实是它的快捷选项）
- Rule.issuer（匹配的不是资源路径，而是引入资源的文件的路径）
- Rule.resourceQuery（匹配资源引入路径上从问号开始的部分）

来匹配。

这些规则可以同时使用，同时使用时，是“与”的关系。必须同时符合以上所有配置的条件才可以让这项规则中的loader处理。


#### （2）配置规则Rule的loader

- `Rule.use`
- `Rule.loader`

1. `use: ['style-loader']`其实是`use: [ { loader: 'style-loader'} ]`的简写。
2. `loader: 'css-loader'` 是 `use: [ { loader: 'css-loader'} ]`的简写。


参考：[『Webpack系列』—— loader配置详解](https://juejin.cn/post/6847902222873788430)


### 32. progress-bar-webpack-plugin

webpack插件，显示构建过程进度条


### 33. babel-plugin-module-resolver 

模块解析插件


`.babelrc`文件
```js
{
  "plugins": [
    ["module-resolver", {
      "root": ["./"],
      "alias": {
         "P":"./app/p"
      }
    }]
  ]
}
```

因为`.babelrc`文件的路径在项目根, 我们指定配置`module-resolver的root为"./"`，因此我们在使用类似`import X from 'path’`导入模块的使用可以不指定`…/…/`这种相对路径, 默认以项目根为模块的搜索路径。也可以使用别名，而不是在项目中使用相对路径。


下面举个简单的例子：

```js
//import Mp from '../../p/MyPropTypes';
import Mp from 'P/MyPropTypes'

//import MyUtilFn from '../../../../utils/MyUtilFn';
import MyUtilFn from 'utils/MyUtilFn';
```


### 34. json-templater/string 库

可以进行简单的字符串替换


### 35. React Dev Tools 注入全局变量 `__REACT_DEVTOOLS_GLOBAL_HOOK__`


当我们使用React Dev Tools时，Dev Tools会向页面注入全局变量__REACT_DEVTOOLS_GLOBAL_HOOK__。

这个变量是连接React与Dev Tools的桥梁。

### 36. 简写形式：export { default } from './index.vue'

#### （1）转发 default
```js
import comp from './index.vue'
export default comp
```
等于以下形式 ：

```js
export { default } from './index.vue'
```

#### （2）转发全部

```js
import { foo, bar } from 'utils'
export {
  foo,
  bar
};
```

等于以下形式：

```js
export * from 'utils'
```


### 37. ElementUI源码中，是如何拿到所有的自定义icon的？

ElementUI源码中，是如何拿到所有的自定义icon的？

```js
var postcss = require('postcss');

var fontFile = fs.readFileSync(path.resolve(__dirname, 'icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;

var classList = [];

nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});
```

### 38. 前端如何实时监听本地代码文件的修改变动？

可以使用chokidar模块


### 39. JS 中 replace函数

#### （1）replace函数

replace方法的第二个参数是函数的时候，函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。

如下面第三个例子中，`camelize('abc-def-xyz')`打印信息为 

```
-d d
-x x
```

#### （2）例子

1. 在本例中，我们将把所有的花引号替换为直引号：


```js
name = '"a", "b"';

name.replace(/"([^"]*)"/g, "'$1'");
```

2. 在本例中，我们将把字符串中所有单词的首字母都转换为大写：

```js
name = 'aaa bbb ccc';

uw=name.replace(/\b\w+\b/g, function(word){
    return word.substring(0,1).toUpperCase() + word.substring(1);}
);
```

3. 中线改驼峰

```js
const camelizeRE = /-(\w)/g;

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => {
     console.log(_, c)
     c.toUpperCase()
  });
}
```

### 40. NodeJS中如何获取换行符

```js
var endOfLine = require('os').EOL
```


### 41. Vuepress的 displayAllHeaders 及 sidebarDepth 不生效，原因h1标题后必须接h2，不能直接跨到h3


### 42. Vuepress的sidebar配置数组形式时，目录的README.md如何配置？

解决：需要写成'/pmd-tools/'或者'/pmd-tools/index'，写成'/pmd-tools'或者'/pmd-tools/README'无效



### 43. v-imapge-preview插件图片不清晰？

原因：设置的基准width太小了，同一张图片，即使用transform的scale放大，也比直接设置width为原始值模糊。解决：将基准width设置为图片原始宽度



### 44. VScode要使eslint-plugin-vue对vue文件生效，需要写tsconfig.json文件

### 46. vue-test-utils的setData不会改变引用地址？

如果组件内两个变量已经指向了同一地址，setData的方式无法让其不相等，可以用`wrapper.vm.tempSelectRole = {}`改变值

### 47. vue.mixin不生效，找不到getLocation，删除子模块的node_modules就可以了


推测是如果安装了子模块的 node_modules，vue 就会从子模块里取得，而 main.js 的 vue.mixin 会优先找当前目录下的node_modules 的 vue，所以两个 vue 引用位置不同，导致不生效。



### 48. 如何不改变代码，而模拟游戏内环境？

方法：修改User agent，chrome开发者工具 => 右上角... => More tools => Network Conditions => ingame...



### 49. touchmove事件一旦滚动，无法中途停止，即在内部调用event.preventDefault时，会报错。

解决：想模拟中断滚动，可以让元素的scrollTop始终为一定值。


### 50. vue 的script使用typescript时，报JSON解析错误。解决：通过排查发现是tsconfig.json中 lib 没有引入 scripthost 导致。


### 51. `vue-lazyload`重复请求图片？

原因：页面主动设置了`disable-cache`。解决方法：允许使用缓存。


### 52. React源码中用二进制表示mode

```js
var a = 0b000
var b = 0b001
var c = 0b010
var d = 0b100

var mode = a 

// 判断是否包含模式b
mode & b // 0

// 添加模式b
mode |= b  // 1 (0b001)

// 添加模式c
mode |= c // 3 (0b011)
```
二进制或运算符`(|)`：如果两个符号位都为0，则结果为0，否则为1






### 53. js获取上一个兄弟元素

需要用到的两个属性：previousSbiling和previousElementSibling

1. previousSibling：获取元素的上一个兄弟节点；（既包含元素节点、文本节点、注释节点）

2. previousElementSibling：获取上一个兄弟元素节点；（只包含元素节点）；

区别如下图：

![https://github.com/novlan1/technical-blog/blob/main/imgs/previousSibling.jpg](https://github.com/novlan1/technical-blog/blob/main/imgs/previousSibling.jpg?raw=true)

所以一般我们会用previousElementSibling

参考：[js获取上一个兄弟元素](https://www.cnblogs.com/Mrrabbit/p/8591558.html)


### 54. npm查看包的版本信息



#### 1. 远程包
##### (1) 查看npm服务器上所有的jquery版本信息

```
npm view jquery versions
```

##### (2) 查看jquery的最新版本是哪个

```bash
npm view jquery version
```

##### (3) 和第一种方式类似，也能查看jquery所有版本，但能查出更多关于jquery的信息

```bash
npm info jquery
```

#### 2. 本地包
##### (1) 查看本地下载的jquery版本信息

```
npm ls jquery
```
##### (2) 查看全局安装的jquery

```
npm ls jquery -g
```


### 55. npm为什么要设置代理,设置镜像源不就行了吗,两者有什么区别?



代理的话，是设置代理服务器，代理服务器帮你转发下载请求；

镜像源的话，是镜像站点已经提前镜像(下载)了所有的npm包，你是直接从它的服务器上获取到的包。

参考： [npm 代理](https://segmentfault.com/q/1010000017507867)


### 56. 报错信息：Error 'tunneling socket' while executing npm install 

解决：取消代理设置

```bash
npm config set proxy null
npm config set https-proxy null
```

参考：[error-tunneling-socket-while-executing-npm-install](https://stackoverflow.com/questions/33162560/error-tunneling-socket-while-executing-npm-install)

### 57. shims-vue.d.ts 解析


**shims-vue.d.ts**文件

```js
declare module '*.vue' {
  import Vue from 'vue';  // 引用了type和value (value是Vue构造器 type是Vue interface)
  export default Vue;
}
```

在TypeScript编译器解析 `import ‘aaa’ from xxx.vue` 的时候

拿到 `node_modules/vue/` 目录下 `index.d.ts` 中`export default`出来的`type`和`value`， type是Vue接口，value是 const Vue，这个常量的类型是VueConstructor

![demo page](https://github.com/novlan1/technical-blog/blob/main/imgs/shims-vue.d.ts.png?raw=true)
(图中是从'vue'中import中得到的type和 value) 

一个import 能同时import到两个东西，import了一种type 还import了一个value，参考[这里](https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html)

 我们来看vue.d.ts:

![vue.d.ts.png](https://github.com/novlan1/technical-blog/blob/main/imgs/vue.d.ts.png?raw=true)

23行导出了type Vue， 129行导出了 value Vue 这两个东西都被export default出来了 当你import的时候 就拿到了这两个东西，并且改成了你import的名字。


参考：[shims-vue.d.ts 解析](https://www.cnblogs.com/eret9616/p/11308470.html)



### 58. Promise 版本的 JSONP



```js
const jsonp = function (url, data) {
  return new Promise((resolve, reject) => {

    // 初始化url
    const dataString = url.indexOf('?') === -1 ? '?' : '&';
    const callbackName = `jsonpCB_${Date.now()}`;
    url += `${dataString}callback=${callbackName}`;

    if (data) {
      // 有请求参数，依次添加到url
      for (const k in data) {
        url += `&${k}=${data[k]}`;
      }
    }

    const jsNode = document.createElement('script');
    jsNode.src = url;

    // 触发callback，触发后删除js标签和绑定在window上的callback
    window[callbackName] = (result) => {
      delete window[callbackName];
      document.body.removeChild(jsNode);

      if (result) {
        resolve(result);
      } else {
        reject('没有返回数据');
      }
    };

    // js加载异常的情况
    jsNode.addEventListener('error', () => {
      delete window[callbackName];
      document.body.removeChild(jsNode);
      reject('JavaScript资源加载失败');
    }, false);

    // 添加js节点到document上时，开始请求
    document.body.appendChild(jsNode);
  });
};

jsonp('http://192.168.0.103:8081/jsonp', { a: 1, b: 'heiheihei' })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  }); 
```


参考：[手写一个JSONP(promise封装)](https://www.jianshu.com/p/43b48648c730?utm_source=oschina-app)


### 59. switch 中一旦 case 匹配，就会一次执行后面的代码，直到遇到 break


#### 1、switch 中一旦 case 匹配，就会一次执行后面的代码，直到遇到 break

```js
for (let i = 0;i < 3;i++) {
  switch (i) {
    case 0: {
      console.log(i);
    }
    case 2: {
      console.log(i);
    }
    default: {
      console.log(i);
    }
  }
}
```
上题的打印顺序是：000122

#### 2、无论default位置在前还是在后，都是先判断各个case, 最后才进default

```js
switch (0) {
  default:
    text = '期待周末！';
    break;
  case 6:
    text = '今天是周六';
    break;
  case 0:
    text = '今天是周日';
}
```
上题中：text 为 '今天是周日'



### 60. JS实现滚动区域触底事件


```js
export default {
  data(){
    return {
      isReachBottom: false,
      reachBottomDistance: 100
      scrollHeight: 0,
      offsetHeight: 0,
    }
  },
  mounted(){
    // 页面加载完成后  将高度存储起来
    let dom = document.querySelector('.comment-area .comment-list')
    this.scrollHeight = dom.scrollHeight
    this.offsetHeight = Math.ceil(dom.getBoundingClientRect().height)
  },
  methods: {
    onScroll(e) {
        let scrollTop = e.target.scrollTop
        let currentHeight = scrollTop + this.offsetHeight + this.reachBottomDistance

        if(currentHeight < this.scrollHeight && this.isReachBottom){
          this.isReachBottom = false
        }
        if(this.isReachBottom){
          return
        }
        if (currentHeight >= this.scrollHeight) {
          this.isReachBottom = true
          console.log('触底')
        }
    }
  }
}
```
监听滚动事件，从 event 上取得 scrollTop 信息，而不是全局的 page

参考：[JS实现滚动区域触底事件](https://www.cnblogs.com/chanwahfung/p/12540114.html)


### 61. touchmove 实时获取当前元素 



```js
// 根据坐标直接返回元素 document.elementFromPoint()

const ele = document.elementFromPoint(touch.pageX, touch.pageY);   
```

eg:

```js
$('ul li').on('touchmove touchstart', (e) => {
  event.preventDefault();
  e = e || window.event;
  const touch = e.originalEvent.targetTouches[0];
  const ele = document.elementFromPoint(touch.pageX, touch.pageY);
});
```

参考：
1. [touchmove 实时获取当前元素](https://www.cnblogs.com/mrt-yyy/p/5946258.html)
2. [Document.elementFromPoint()-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint)


### 62. JS 产生正态分布随机数


有一个称为 [Box-Muller (1958)](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) 转换的算法能够将两个在区间（0,1] 的均匀分布转化为标准正态分布，其公式为：

y1 = sqrt( - 2 ln(u) ) cos( 2 pi v )

y2 = sqrt( - 2 ln(u) ) sin( 2 pi v )

因为三角函数计算较慢，我们可以通过上述公式的一个 polar form（极坐标形式）能够简化计算，

代码如下：
```js
function getNumberInNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}
```



参考：[Javascript 随机数函数 学习之二：产生服从正态分布随机数](https://www.cnblogs.com/zztt/p/4025207.html)


### 63. .npmrc文件，npm 配置文件


项目根目录下的.npmrc文件：

```
registry=http://registry.npmjs.org/
```

可以实现，仅仅对于这个项目，换npm的源了

### 64. NodeJS 可以直接读取 .json 文件


示例如下：

```js
const config = require('./config.json')
console.log("name",config.name)
console.log("age",config.age)
```


参考：[nodejs中 require 方法的加载规则](https://blog.csdn.net/duansamve/article/details/89787480)


### 65. ADB命令


ADB，全称为Android Debug Bridge，它是 Android 开发/测试人员不可替代的强大工具。

- 查看ADB版本：adb version
- 查看手机设备：adb devices
- 查看设备型号：adb shell getprop ro.product.model
- 查看电池信息：adb shell dumpsys battery
- 查看设备ID：adb shell settings get secure android_id
- 查看设备IMEI：adb shell dumpsys iphonesubinfo
- 查看Android版本：adb shell getprop ro.build.version.release
- 查看手机网络信息：adb shell ifconfig
- 查看设备日志：adb logcat
- 重启手机设备：adb reboot
- 安装一个apk：adb install /path/demo.apk
- 卸载一个apk：adb uninstall <package>
- 查看系统运行进程：adb shell ps
- 查看系统磁盘情况：adb shell ls /path/
- 手机设备截屏：adb shell screencap -p /sdcard/aa.png
- 手机文件下载到电脑：adb pull /sdcard/aa.png ./
- 电脑文件上传到手机：adb push aa.png /data/local/
- 手机设备录像：adb shell screenrecord /sdcard/ab.mp4
- 手机屏幕分辨率：adb shell wm size
- 手机屏幕密度：adb shell wm density
- 手机屏幕点击：adb shell input tap xvalue yvalue
- 手机屏幕滑动：adb shell input swipe 1000 1500 200 200
- 手机屏幕带时间滑动：adb shell input swipe 1000 1500 0 0 1000
- 手机文本输入：adb shell input text xxxxx
- 手机键盘事件：adb shell input keyevent xx
- 连接多个手机设备时，指定手机设备：adb -s serialNumber <command>


参考：[MAC系统下ADB入门与简单使用](https://zhuanlan.zhihu.com/p/41381658)


### 66. Chrome 跨域的方式


#### Windows 电脑 Chrome 跨域的方式

在chrome的快捷方式上右键，在属性后面加上：
```js
--disable-web-security --user-data-dir=C:\MyChromeDevUserData
```

#### Mac 电脑 Chrome 跨域的方式

最后文件夹为自己主目录，一进来的目录，切换zsh，用pwd可以查看

```
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/liyuquan/Documents/MyChromeDevUserData
```


参考：[Windows10 Google浏览器的跨域设置——包括版本49前后两种设置
](https://blog.csdn.net/qq_19734597/article/details/104062061)


### 67. JS字符串和 DOM 互相转化 

JS字符串转DOM：
```js
function parseDom(arg) {
    const objE = document.createElement('div');
    objE.innerHTML = arg;
    return objE.childNodes;
};
```

DOM转字符串：
- 直接调用`dom.innerHTML()`

参考：[js 字符串转dom 和dom 转字符串](https://www.cnblogs.com/lxg0/p/5976909.html)



### 68. 用HTTP的方式链接远程仓库，有时会经常要求输入密码，用SSH则不用

参考：[git使用指令git push origin master报错remote: Invalid username or password. fatal: Authentication failed for](https://www.cnblogs.com/xiaohaodeboke/p/12617776.html)



### 69. tagName和nodeName的区别


首先介绍DOM里常见的三种节点类型（总共有12种，如docment）：**元素节点，属性节点以及文本节点**，例如`<h2 class="title">head</h2>`，其中h2是元素节点，class是属性节点，head是文本节点，在这里你可以说h2这个元素节点包含一个属性节点和一个文本节点。其实几乎所有HTML的标签都是元素节点，而id, title, class等则是属性节点，而元素所包含的文本内容则是文本节点。

tagName和nodeName的语义是一样的，都是返回所包含标签的名称，例如上面的h2标签，都是返回h2，但是tagName只能在元素标签上使用，而nodeName则可以在所有的节点上使用。

总结：tagName只能用在元素节点上，而nodeName可以用在任何节点上，可以说nodeName涵盖了tagName，并且具有更多的功能，因此建议总是使用nodeName。

参考：[tagName和nodeName的区别](https://blog.csdn.net/borishuai/article/details/5719227)



### 70. npm link的使用 



1. 假如开发的包的名称是`module-a`，进入`module-a`主目录，执行`npm link`。
2. 进入项目目录，执行`npm link module-a`


参考：[npm link的使用](https://www.jianshu.com/p/aaa7db89a5b2)


### 71. node获取当前路径的三种方法


- __dirname
- process.cwd()
- path.resolve(./)


区别如下：

- __dirname：返回运行文件所在的目录
- path.resolve('./')：当前命令所在的目录
- process.cwd()：当前命令所在的目录

参考：[node获取当前路径的三种方法](https://www.cnblogs.com/founderswitch/p/10310203.html)


### 72. Chrome DevTools — Network - Timing：查看请求在各个阶段对应的时间 


- Queueing：浏览器会在以下情况对请求进行排队：
  - 有更高优先级的请求
  - 在这个域下，已经有6个TCP连接了，达到Chrome最大限制数量。此条规则仅适用在HTTP/1.0和HTTP/1.1
- Stalled：Queueing中的任何一个因素发生都会导致该请求被拖延

- Proxy negotiation：浏览器与代理服务器协商消耗的时间

- DNS Lookup：浏览器对请求的IP地址进行DNS查找所消耗的时间

- Initial conncection：发起连接所消耗的时间

- Request sent：请求发送消耗的时间

- Waiting (TTFB)：浏览器等待响应的时间，TTFB表示 Time To First Byte

- Content Download：资源下载所消耗的时间

![network-timing](https://github.com/novlan1/technical-blog/blob/main/imgs/chrome-network-timing.jpeg?raw=true)

参考：
- [Chrome 官网](https://developers.google.com/web/tools/chrome-devtools/network/reference#timing)
- [Chrome DevTools — Network](https://segmentfault.com/a/1190000008407729)


### 73. JS exec()方法：执行正则表达式匹配



在非全局模式下，exec() 方法返回的数组与 String.match() 方法返回的数组是相同的。

在全局模式下，exec() 方法与 String.match() 方法返回的结果不同。当调用 exec() 方法时，会为正则表达式对象定义 lastIndex 属性，执行执行下一次匹配的起始位置，同时返回匹配数组，与非全局模式下的数组结构相同；而 String.match() 仅返回匹配文本组成的数组，没有附加信息。

因此，在全局模式下获取完整的匹配信息只能使用 exec() 方法。

```js
var s = "JavaScript";  //测试使用的字符串直接量
var r = /\w/g;  //匹配模式
while ((a = r.exec(s))) {  //循环执行匹配操作
    console.log("匹配文本 = " + a[0] + "    a.index = " + a.index + "    r.lastIndex = " + r.lastIndex);  //显示每次匹配后返回的数组信息
}
// 匹配文本 = J    a.index = 0    r.lastIndex = 1
// ...
```


参考：[JS exec()方法：执行正则表达式匹配](http://c.biancheng.net/view/5616.html)


### 74. 【webpack】中library的作用 

webpack默认打包之后的代码形式是这样的（假设我导出 module.exports = 'hello world' ）
```js
(function () {
  return 'hello world'
})()
```

注意：代码是一个自执行函数，外界想获取函数里面的返回值怎么办（也就是模块的导出结果 hello world ），那么就需要配置一个 library 

```js
const path = require('path')

module.exports = {
  entry: './src/utils.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'result'
  }
}
```
 

然后打包之后是这样的形式
```js
var result = (function () {
  return 'hello world'
})()
```

通过把导出的结果赋值给 result 变量，配置了 library: 'result' 

 

将打包之后的文件引入到HTML文件中，可以直接使用哦！（假设打包的文件名是bundle.js）

```html
<body>
  <script src="./dist/bundle.js"></script>
  <script>
    console.log(result)
  </script>
</body>
```
 

如果你不想在HTML中使用，想在一个JS文件里面通过 require 导入来使用，需要这么配置

```js
const path = require('path')

module.exports = {
  entry: './src/utils.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  }
}
```
 

打包之后代码是这样的
```js
module.exports = (function () {
  return 'hello world'
})()
```

可以在JS文件中导入来使用
```js
import result from './bundle'

console.log(result)
```
同时支持import和require语法引入

 

两个配置同时使用，生效的是第二种模式

参考：[【webpack】中library的作用](https://www.cnblogs.com/wuxianqiang/p/11324078.html)


### 75. vue获取当前页面路由



当前页面
完整url可以用 window.location.href
路由路径可以用 this.$route.path
路由路径参数 this.$route.params

参考：[vue获取当前页面路由](https://blog.csdn.net/weixin_43292447/article/details/89242307)



### 76. NPM 废弃/删除包 

#### 废弃
```
npm deprecate yuyy-test-pkg@1.1.0 'test deprecate'
```

废弃的包除了安装时会有警示，并不影响使用。

#### 删除
```
npm unpublish @yuyy/babel --force
```

参考：[npm发布包教程（五）：废弃/删除](https://segmentfault.com/a/1190000017479985)




### 77. scss中循环的使用


1、`@each in` 循环

使用一个变量： #{$变量名}
```scss
$colors: (
    p1: rgb(255, 113, 61),
    p2: lightblue,
    p3: lightseagreen
);
@each $key, $color in $colors {
    &.#{$key} {
         background-color: $color;
    }
}
```
2、`@for… from… to` 循环

```scss
@for $i from 1 to 4 {
    .paper:nth-child(#{$i}) {
        /**
        有顺序之分
        transform: translate() rotate() !== transform: rotate() translate()
        */
         transform: translate(-50%, -40%) rotate(#{$i}5deg);
     }
}
分别旋转15 25 35 45度
```

参考：[scss中循环的妙用](https://blog.csdn.net/swallowblank/article/details/108468926)


### 78. nodejs判断文件、文件夹是否存在


判断的方法

```js
fs.exists(path, callback)
```

- path：判断的文件夹、文件的路径
- callback：回调函数

```js
fs.exists("dirName", function(exists) {
  console.log(exists ? "创建成功" : "创建失败");
});
```





参考：[nodejs判断文件、文件夹是否存在及删除的方法](https://www.jb51.net/article/127906.htm)



### 79. JavaScript的new Function()方法


new Function的基本用法：

```js

// 最后一个参数是函数的 body(函数体),类型为 string;  
// 前面的参数都是 索要构造的函数的参数(名字)  
var myFunction = new Function('users', 'salary', 'return users * salary');  
```

参考：[你可能不知道的JavaScript的new Function()方法](https://www.jb51.net/article/49103.htm)


### 80. 几个正则


#### Javascript正则里面\s\S和.的区别

- \s 匹配空白字符；
- \S 匹配非空白字符；
- +? 匹配 1 次或多次。

- [\s\S]+? 就是匹配任意字符1次或多次。

- . 匹配换行符以外的字符。

- [.]+? 就是匹配换行符以外的字符1次或多次。

区别就在于：
```js
/.+?/.test('\n')  // false
/[\s\S]+?/.test('\n')  // true

/.+?/.test('\r') // false
/[\s\S]+?/.test('\r')  // true
```


参考：[Javascript正则里面\s\S和.的区别](https://www.imooc.com/wenda/detail/421482)



#### 中文正则

```js
/[\u4e00-\u9fa5]|[^\x00-\xff]/;
```


中文字符算2个，英文字符算1个，求字符总数
```js
export const getFixedNameLen = (teamName) => {
  const chiReg = /[\u4e00-\u9fa5]|[^\x00-\xff]/g;
  const pureName = teamName.replace(chiReg, () => 'xx');
  const len = pureName.length;

  return len;
};
```


#### Vue中限制input最大输入长度

```js
watch: {
   teamName(val = '') {
     const fixedLen = getFixedNameLen(val);
     if (fixedLen > DEFAULT_MAX_LEN) {
        this.teamName = this.teamName.substr(0, val.length - 1);
        this.$forceUpdate();
      }
   },
},
```

