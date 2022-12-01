## 一、前端

### 1. Git 中 cannot lock ref问题的解决


1、打开git-bash, 输入 git branch -a 后发现远程有两个相同名字的分支。

2、删除掉远程重复名字的分支，在删除远程代码之前做好本地代码备份

```
git branch -r -d origin/branch-name  
git push origin :branch-name 
```

参考：[cannot lock ref问题的解决](https://blog.csdn.net/qq_29781403/article/details/78454913)


### 2. 重要的需要优先加载的图片最好采用img，不重要的图片最好采用background

参考：[前端优化-Img与background](https://www.cnblogs.com/hunchun/p/3794182.html)

### 3. Node.js：Expected linebreaks to be 'CRLF' but found 'LF'. 

(linebreak-style)换行符报错换行符报错因为在执行上操作系统不一样的缘故！


参考：[Node.js：Expected linebreaks to be 'CRLF' but found 'LF'. (linebreak-style)换行符报错](https://blog.csdn.net/weixin_37937428/article/details/83063577)



### 4. window.parent 与 Window.top 


#### window.parent

返回当前窗口的父窗口对象.

如果一个窗口没有父窗口,则它的 parent 属性为自身的引用.

如果当前窗口是一个 `<iframe>`, `<object>`, 或者 `<frame>`,则它的父窗口是嵌入它的那个窗口


#### Window.top

返回窗口体系中的最顶层窗口的引用。

#### 区别

window.parent 返回当前窗口的父对象，而 window.top 返回最顶层的窗口对象。

当你在处理父窗口的子框架（subframe），而你想获取顶层框架时，这个属性相当有用。

参考：[window.parent 与 Window.top](https://www.cnblogs.com/ys-wuhan/p/6600885.html)

### 5. Object.seal() 和 Object.freeze()方法


- 相同点：删除属性和添加属性都不生效
- 不同点：Object.seal()方法可以修改属性，Object.freeze()方法不可以修改属性。


### 6. 代理与反向代理



#### 代理，隐藏了真实的客户端。

比如我们想直接上`www.google.com`是上不去的，如果在境外搭一个代理服务器，我们向它发送请求，它再向`www.google.com`发送就可以了。

又比如小明想向马云借钱，但是没有渠道，就可以通过中间好友小芳，让她去借，也隐藏了真实的“客户端“。

#### 反向代理，隐藏了真实的服务端。

比如我们打10086，会有不同的人接电话，10086总机就相当于反向代理服务器。

又如，我们访问淘宝，有很多的服务器，我们不必知道具体是哪一台，`taobao.com`背后就是反向代理服务器。Nginx是有名的反向代理服务器。

参考：[反向代理为何叫反向代理？](https://www.zhihu.com/question/24723688)


### 7. vue同一页面，只是参数不同，如果使用this.$router.push，不会触发mounted钩子

vue同一页面，只是参数不同，如果使用`this.$router.push`，不会触发`mounted`钩子。

可以利用`beforeRouteUpdate`钩子函数，进行参数判断(to.params.mid和from.params.mid)，重新请求数据。


### 8. rgb(0 0 0 / 50%)，就是不透明度50%，等于rgba(0,0,0,0.5)



### 9. beforeDestory前，必须clearInterval，否则多个子组件会相互影响


### 10. vue传递props时，期待boolean类型，若传递undefined，会使用默认类型default。defaut是true则为true，default为false则为false 


### 11. mac - vscode保存文件时，提示权限不足

解决: `sudo chmod -R 用户名 ./`

### 12. JS中map和forEach函数，break和continue报错，return不生效

例子：
```js
function test() {
    const a = [1,2,3,4,5,6]
    a.map(item => { // forEach
        console.log(item)
        if (item == 3){
            continue; // break
            return item
        }
    })
   console.log('end')
}

b = test()
```



### 13. windows切换盘符

直接输入`d:`就可以，或者输入`cd /d`, `d:`


### 14. 通过命令行将iOS的APP安装到模拟器中

```
xcrun simctl install booted Calculator.app 
```


### 15. npm设置registry地址

```
npm config set registry https://mirrors.tencent.com/npm/

npm config set registry https://registry.npm.taobao.org 

npm config set registry http://registry.npmjs.org
```



### 16. 代码规范

1. if-else嵌套不能超过4层
拒绝面条代码，减少代码中各种结构的嵌套，例如 if-else、try-catch、循环等。从指标上说，这是为了降低圈复杂度。从实际读代码的体验上来看，两层刚好，三层偏多，四层爆炸。
2. 方法超过80行
方法尽量精简在80行以内，并且以小function进行组织，方便维护、复用。
3. 项目中存在大量注释掉的无用代码
注释掉的代码应该通过git仓库本身的版本管理来进行回溯，而不是通过注释来注释掉。
4. 遗留大量多余的console.log调试日志
5. 缺少注释
6. 存在很多eslint-disable注释
在代码中存在多个tslint-disable、eslint-disable的注释，而且这些注释本身可被修复。





### 17. localStorage存储数字的时候，取出来的时候是字符串，要parseInt一下


### 18. vue-router中，beforeEach中的location.replace不生效，还是存在历史记录，算是vue-router的bug

### 19. ESLint采用逐级向上查找的方式查找`.eslintrc.*`文件，当找到带有 "root": true 配置项的`.eslintrc.*`文件时，将会停止向上查找。



### 20. antd或者element的页码实现原理


antd或者element的页码实现原理：
1. 总数小于等于8时，显示全部
2. 当前小于等于4时，显示`[前6个, ..., total]`
3. 当前大于等于`total-3`时，显示`[1, ..., 后6个]`
4. 显示`[1, ..., cur-2, cur-1, cur, cur+1, cur+2, ..., total]`

示例代码如下：
```js
function onChangePageList() {
  const { curPage, totalPage } = this;
  const pageList = [];

  // 总数小于等于8
  if (totalPage <= 8) {
    for (let i = 1;i < totalPage + 1 ; i++) {
      pageList.push(i);
    }
    this.showPageList = pageList;
    return;
  }

  // 当前小于等于4
  if (curPage <= 4) {
    for (let i = 1;i <= 6; i++) {
      pageList.push(i);
    }
    pageList.push('...');
    pageList.push(totalPage);
    this.showPageList = pageList;
    return;
  }

  // 当前大于等于totalPage-3
  if (curPage >= totalPage - 3) {
    pageList.push(1);
    pageList.push('...');
    for (let i = totalPage - 5;i <= totalPage; i++) {
      pageList.push(i);
    }
    this.showPageList = pageList;
    return;
  }

  // 大于5，小于total-3, total至少为11，因为total为10的情况上面已经全部覆盖了
  pageList.push(1);
  pageList.push('...');

  for (let i = curPage - 2;i <= curPage + 2; i++) {
    pageList.push(i);
  }

  pageList.push('...');
  pageList.push(totalPage);
  this.showPageList = pageList;
}
```




### 21. Vue3新特性 

#### (1) ref、reactive

ref和reactive都可以给数据添加响应性，ref一般用于给js基本数据类型添加响应性（当然也支持非基本类型的object），reactive只能用于代理非基本数据类型。null是基本数据类型，只能使用ref，那既然如此，为什么不在所有情况都使用ref呢？


```js
const num = ref(0);
num.value = 1;

const obj = { a: 1 };
const refObj = ref(obj);
const reactiveObj = reactive(obj);

refObj.value.a = 2;
reactiveObj.a = 3;
console.log(num, refObj, reactiveObj);
```

使用ref api时，数据变成了对象，值就是value属性的值，如果数据本身就是对象，依然会多一层value结构，而reactive没有这些副作用。

#### (2) toRefs

因为响应式对象，经过解构出来的属性不再具有响应性，toRefs就是为了快速获得响应性的属性，因此这段代码`const { init } = toRefs(props);`，就是为了获得响应式属性init，想要保留props参数的响应性，建议这么做。



#### (3) watch、watchEffect
```js
const num = ref(0);
const state = reactive({
  num: 0,
});
const obj = { num: 0 };

watch(num, (newVal, oldVal) => {
  console.log("num", newVal, oldVal);
});
watch(() => state.num, (newVal, oldVal) => {
  console.log("num", newVal, oldVal);
});
watch(() => obj.num, () => {
  console.log("这里不会执行");
});

num++;
state.num++;
obj.num++;
```
watch api，它需要接受一个具有返回值的getter函数或者ref（如() => state.num，ref）。

如果需要监听多个值，如下所示：
```js
const num1 = ref(0);
const num2 = ref(0);

watch([num1, num2], ([newNum1, newNum2], [prevNum1, prevNum2]) => {
  console.log([newNum1, newNum2], [prevNum1, prevNum2]);
});

num1.value = 1; // [1, 0], [0, 0]
num2.value = 2; // [1, 2], [1, 0]
```

可见多个数据的每次更新都会触发watch。想要监听一个嵌套的对象，跟Vue2一样，依旧需要使用deep选项，如下所示：

```js
const state = reactive({
  attr: {
    id: 1,
  },
});

watch(() => state, (currState, prevState) => {
  console.log(currState.attr.id, prevState.attr.id, currState === prevState, currState === state); // 2, 2, true, true
}, { deep: true });

watch(() => state.attr.id, (currId, prevId) => {
  console.log(currId, prevId); // 2, 1
});
state.attr.id = 2;
```


看到差别了吗？监听响应式对象时，返回的是对象的引用，因此currState，prevState指向是同一个最新的state，如果需要获取变化前的值，建议返回监听的属性，如watch(() => state.attr.id)，刚好state.attr.id是一个基本类型的值，那么deep也不需要。

watchEffect是Vue3新增的api，watchEffect会自动运行一次，用于自动收集依赖，但不支持获取变化前的值，除此之外，与watch用法一致。那么watchEffect适用什么场景呢？这也是我刚上手Vue3的困惑之一。我们来看一段代码：

```js
const rights = {
  admin: ["read", "write"],
  user: ["read"],
};
const state = reactive({
  rights: "",
})

const userInfo = reactive({ role: "user" });
userInfo.name = "Tom";
userInfo.role = "admin";

watch(() => userInfo.role, (newVal, oldVal) => {
  state.rights = rights[newVal];
});

watchEffect(() => {
  state.rights = rights[userInfo.role];
});
```
以上代码中，watch中的逻辑只能在userInfo变化后执行，因此state.rights不会提供初始值，相反，watchEffect中state.rights由于自动依赖收集，获得了一次赋值的机会。

这样做的好处是什么呢？在实际项目中，userInfo.role可能是一个全局store中的数据，用户登录进来后，就会通过接口获取初始值，我们并不能确认，用户进到其中一个页面时，userInfo.role的值是否已经被接口更新，且userInfo变化前的值我们也不关心，watchEffect就非常适合这种场景，它会自动进行一次初始化，并且在变化后，及时更新值。

watch和watchEffect的监听会在组件销毁时自动取消，除此之外，可以通过它们返回的函数手动取消监听，如下所示：
```js
const stopWatch = watch(selectRef, (newVal, oldVal){});
const stopWatchEffect = watchEffect(selectRef, (newVal, oldVal){});

setTimeout(stopWatch, 1000);
setTimeout(stopWatchEffect, 1000);
```

#### (4) 生命周期函数的执行顺序

```
setup -> beforeCreate -> created -> setup.onBeforeMount -> beforeMount -> setup.onMounted...
```

#### (5) vue3中的setup方法可以接收两个参数props和context


1. props就是传过来的props，props不能进行ES6的解构，因为这会消除响应式。
2. context上有emit方法，因为setup没有this了(原因是setup执行时，组件实例没有创建)，所以可以用context.emit进行事件的传递




#### (6) Vite和Webpack的区别


                                                                  

1. webpack的模式是先进行打包再启动开发服务。
2. Vite是启动服务请求哪个模块再对该模块进行编译。

很明显 Vite充分利用浏览器支持ES Module的特性，浏览器会自动像依赖的Module发出请求，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。

Vite在启动的时候不需要进行打包，就意味着不需要分析模块的依赖以及编译，因此启动速度非常快。

当浏览器请求某个模块时按需进行编译。

这种按需动态编译的方式，极大的缩减了启动时间，项目越复杂、模块越多，vite的优势越明显。



### 22. PNG图片压缩原理


#### 什么是PNG

PNG的全称叫便携式网络图型（Portable Network Graphics）是目前最流行的网络传输和展示的图片格式，原因有如下几点：

- 无损压缩：PNG图片采取了基于LZ77派生算法对文件进行压缩，使得它压缩比率更高，生成的文件体积更小，并且不损失数据。

- 体积小：它利用特殊的编码方法标记重复出现的数据，使得同样格式的图片，PNG图片文件的体积更小。网络通讯中因受带宽制约，在保证图片清晰、逼真的前提下，优先选择PNG格式的图片。

- 支持透明效果：PNG支持对原图像定义256个透明层次，使得图像的边缘能与任何背景平滑融合，这种功能是GIF和JPEG没有的。


#### PNG类型

PNG图片主要有三个类型，分别为 `PNG 8/ PNG 24 / PNG 32`。


- PNG 8：PNG 8中的8，其实指的是8bits，相当于用`2^8`（2的8次方）大小来存储一张图片的颜色种类，`2^8`等于256，也就是说PNG 8能存储256种颜色，一张图片如果颜色种类很少，将它设置成PNG 8得图片类型是非常适合的。


- PNG 24：PNG 24中的24，相当于3乘以8 等于 24，就是用三个8bits分别去表示 R（红）、G（绿）、B（蓝）。`R(0~255),G(0~255),B(0~255)`，可以表达256乘以256乘以256=16777216种颜色的图片，这样PNG 24就能比PNG 8表示色彩更丰富的图片。但是所占用的空间相对就更大了。


- PNG 32：PNG 32中的32，相当于PNG 24 加上 8bits的透明颜色通道，就相当于R（红）、G（绿）、B（蓝）、A（透明）。`R(0~255),G(0~255),B(0~255),A(0~255)`。比PNG 24多了一个A（透明），也就是说PNG 32能表示跟PNG 24一样多的色彩，并且还支持256种透明的颜色，能表示更加丰富的图片颜色类型。


#### PNG图片数据结构

PNG图片的数据结构其实跟http请求的结构很像，都是一个数据头，后面跟着很多的数据块。

#### 什么样的PNG图片更适合压缩

常规的png图片，颜色越单一，颜色值越少，压缩率就越大。



#### PNG的压缩

PNG图片的压缩，分两个阶段：

- 预解析（Prediction）：这个阶段就是对png图片进行一个预处理，处理后让它更方便后续的压缩。
- 压缩（Compression）：执行Deflate压缩，该算法结合了 LZ77 算法和 Huffman 算法对图片进行编码。



参考：[PNG图片压缩原理解析](https://juejin.cn/post/6844903798658318343)



### 23. lighthouse 性能检测工具


####  First Contentful Paint (FCP)
第一次内容丰富的绘画(FCP)指标衡量了从页面开始加载到页面内容的任何部分呈现在屏幕上的时间。对于该指标，"内容 "指的是文本、图像（包括背景图像）、元素或非白色元素。

虽然部分内容已经呈现，但并非所有内容都已呈现。这是First Contentful Paint (FCP)和Largest Contentful Paint (LCP)之间的一个重要区别--LCP的目的是衡量页面的主要内容何时完成加载。

####   Largest Contentful Paint (LCP)
最大内容画（LCP）指标报告了在视口中可见的最大图像或文本块的渲染时间，相对于页面首次开始加载的时间。

为了提供良好的用户体验，网站应该努力使最大内容画幅达到2.5秒或更少。

####  Cumulative Layout Shift (CLS)
官方对它的解释:

>Cumulative Layout Shift (CLS)是一种视觉稳定性的测量方法，它量化了页面内容在视觉上的移动程度。它量化了一个页面的内容在视觉上移动的程度。


### 24. performance.now()和Date.now()的区别是什么


- performance.now()是相对于页面加载和数量级更精确，单位是毫秒。具有小数点，从`page load`的时候从零开始计数。约等于 `Date.now()-performance.timing.navigationStart`
- Date.now()是相对于Unix时代(`1970-01-01T00：00：00Z`)并且依赖于系统时钟。


### 25. 负载均衡常用算法

1、轮询
   遍历服务器节点列表，并按节点次序每轮选择一台服务器处理请求。当所有节点均被调用过一次后，该算法将从第一个节点开始重新一轮遍历。
  特点：适用于服务器性能相近的集群情况，其中每个服务器承载相同的负载。对于服务器性能不同的集群而言，该算法容易引发资源分配不合理等问题。

2、加权轮询
  每个服务器会有各自的 weight。一般情况下，weight 的值越大意味着该服务器的性能越好，可以承载更多的请求。该算法中，客户端的请求按权值比例分配，当一个请求到达时，优先为其分配权值最大的服务器。
   特点：加权轮询可以应用于服务器性能不等的集群中，使资源分配更加合理化。

3、IP hash
  ip_hash 依据发出请求的客户端 IP 的 hash 值来分配服务器，该算法可以保证同 IP 发出的请求映射到同一服务器，或者具有相同 hash 值的不同 IP 映射到同一服务器。
  特点：该算法在一定程度上解决了集群部署环境下 Session 不共享的问题。

4、URL hash
  url_hash 是根据请求的 URL 的 hash 值来分配服务器。该算法的特点是，相同 URL 的请求会分配给固定的服务器，当存在缓存的时候，效率一般较高。然而 Nginx 默认不支持这种负载均衡算法，需要依赖第三方库。

5、最小连接数
  当有新的请求出现时，遍历服务器节点列表并选取其中连接数最小的一台服务器来响应当前请求。连接数可以理解为当前处理的请求数。



#### Node服务器代码

```js
const express = require('express');
const app = express();

// 定义要监听的端口号
const listenedPort = '8087';

app.get('/', (req, res) => res.send(`Hello World! I am port ${listenedPort}～`));

// 监听端口
app.listen(listenedPort, () => console.log(`success: ${listenedPort}`));
```

#### Ngnix配置



- 轮询的服务器，写在 http 中的 upstream 对象里：
```
upstream testServer {
  server localhost:8087 weight=10;
  server localhost:8088 weight=2;
  server localhost:8089;
}
```

- 代理地址，写在 http 中的 server 对象里：

```
location / {
  root   html;
  index  index.html index.htm;
  proxy_pass http://testServer; // testServer 为自己定义的服务器集群
}	
```

参考：[五分钟看懂 Nginx 负载均衡](https://juejin.cn/post/6844904106541203464)


### 26. requestAnimationFrame


与 setTimeout 相比，rAF 最大的优势是**由系统来决定回调函数的执行时机**。具体一点讲就是，系统每次绘制之前会主动调用 rAF 中的回调函数，如果系统绘制率是 60Hz，那么回调函数就每16.7ms 被执行一次，如果绘制频率是75Hz，那么这个间隔时间就变成了 1000/75=13.3ms。换句话说就是，rAF 的执行步伐跟着系统的绘制频率走。它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，**不会因为间隔时间过短，造成过度执行，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅**，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

另外一个特点是，**在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流**，这当然就意味着更少的的cpu，gpu和内存使用量。


使用方法：

```js
varprogress = 0;
//回调函数
function render() {
    progress += 1;//修改图像的位置
 
    if(progress < 100) {
           //在动画没有结束前，递归渲染
           window.requestAnimationFrame(render);
    }
}
 
//第一帧渲染
window.requestAnimationFrame(render);
```

参考：[requestAnimationFrame 知多少？](https://www.cnblogs.com/onepixel/p/7078617.html)


### 27. window.location.href="javascript:void(0)"不会跳转


### 28. Vue的分页组件


```vue
<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <a
      :class="curPage == 1 ? 'disable': ''"
      @click="onGetPrePage"
    >上一页</a>

    <span
      v-for="(item, index) of showPageList"
      :key="index"
      :class="{on: item == curPage, 'more-page': item === '...' && index!=1, 'back-more-page': item === '...' && index == 1}"
      @click="onChangePage(item, index)"
    >{{ item }}</span>
    <a
      :class="totalPage != 1 && curPage == totalPage ? 'disable': ''"
      @click="onGetNextPage"
    >下一页</a>
  </div>
</template>
<script>
export default {
  props: {
    curPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      showPageList: [],
    };
  },
  watch: {
    totalPage() {
      this.onChangePageList();
    },
    curPage() {
      this.onChangePageList();
    },
  },
  methods: {
    // 改变页码
    onChangePage(page, index) {
      if (page == this.curPage) {
        return;
      }
      if (page === '...') {
        if (index === 1) {
          // 点击前一个...
          const page = this.curPage - 5 < 1 ? 1 : this.curPage - 5;
          this.$emit('changePage', page);
        } else {
          // 点击后一个...
          const page = this.curPage + 5  > this.totalPage ? this.totalPage : this.curPage + 5;
          this.$emit('changePage', page);
        }
      } else {
        this.$emit('changePage', page);
      }
    },
    // 点击上一页
    onGetPrePage() {
      if (this.curPage <= 1) {
        return;
      }
      this.$emit('changePage', this.curPage - 1);
    },
    // 点击下一页
    onGetNextPage() {
      if (this.curPage >= this.totalPage) {
        return;
      }
      this.$emit('changePage', this.curPage + 1);
    },
    // 根据curPage和totalPage改变展示的pageList
    onChangePageList() {
      const { curPage, totalPage } = this;
      const pageList = [];
      // 总数小于等于8
      if (totalPage <= 8) {
        for (let i = 1;i < totalPage + 1 ; i++) {
          pageList.push(i);
        }
        this.showPageList = pageList;
        return;
      }
      // 当前小于等于4
      if (curPage <= 4) {
        for (let i = 1;i <= 6; i++) {
          pageList.push(i);
        }
        pageList.push('...');
        pageList.push(totalPage);
        this.showPageList = pageList;
        return;
      }
      // 当前大于等于totalPage-3
      if (curPage >= totalPage - 3) {
        pageList.push(1);
        pageList.push('...');
        for (let i = totalPage - 5;i <= totalPage; i++) {
          pageList.push(i);
        }
        this.showPageList = pageList;
        return;
      }
      // 大于5，小于total-3, total至少为11，因为total为10的情况上面已经全部覆盖了
      pageList.push(1);
      pageList.push('...');

      for (let i = curPage - 2;i <= curPage + 2; i++) {
        pageList.push(i);
      }

      pageList.push('...');
      pageList.push(totalPage);
      this.showPageList = pageList;
    },
  },
};
</script>
```

分页组件的几种边界：
1. totalPage <= 8时，展示全部
  
  <img src="https://user-images.githubusercontent.com/41728540/117237040-9f6ee000-ae5c-11eb-8022-c2bc4d4139c7.png" width="420" />

2. curPage <= 4时，展示前6个、...、最后一个

  <img src="https://user-images.githubusercontent.com/41728540/117236303-04293b00-ae5b-11eb-986c-3c58dbd415d3.png" width="420" />

3. curPage >= totalPage - 3 ，展示第一个、...、最后6个

<img src="https://user-images.githubusercontent.com/41728540/117236361-1c995580-ae5b-11eb-9b1c-cba3ca92a2ba.png" width="420" />

4. 其他情况，展示第一个、...、curPage-2、curPage-1、curPage、curPage+1、curPage+2、...、最后一个

<img src="https://user-images.githubusercontent.com/41728540/117236352-1905ce80-ae5b-11eb-9f1e-a2d0ebeae424.png" width="420" />


### 29. 自动化测试


#### (1) browser.pages()

puppeteer中，`browser.pages()`获取到的`page`在不激活的情况下，无法执行`tap`、`click`等事件，需要新建个tab

#### (2) 自动化测试可以分为两类：接口自动化、UI自动化

#### (3) UI 测试（UI Test）和端到端测试（E2E Test）是稍有区别的

1. UI 测试（UI Test）只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用 Mock 的。
2. 端到端测试（E2E Test）则是将整个应用放到真实的环境中运行，包括数据在内也是需要使用真实的。

#### (4) 前端测试主要分为 3 种：单元测试（Unit Test）、集成测试（Integration Test）、UI 测试（UI Test）

集成测试通常被应用在：耦合度较高的函数/组件、经过二次封装的函数/组件、多个函数/组件组合而成的函数/组件等。

集成测试的目的在于，测试经过单元测试后的各个模块组合在一起是否能正常工作。会对组合之后的代码整体暴露在外接口进行测试，查看组合后的代码工作是否符合预期



#### (5) 端到端测试

端到端测试，除了软件系统，它还验证来自其他上游/下游系统的批处理/数据处理。因此，被称为 "端到端"。

#### (6) eptest相关

1. 必须加describe才能正确解析用例
2. 失败用例前要加注解，注明用例管理者，并且不能是debug模式，才会收到失败通知


### 30. Vuex和Redux


#### (1) Vuex 处理异步操作
vuex中，mutation是同步的，用commit提交；action是异步的，用dispatch派发

- 同步操作：commit mutation -> 修改state
- 异步操作：`dispatch action` -> `commit mutation` -> 修改state


#### (2) Vuex 和 Redux 核心概念对比

| Redux 的核心概念                                                                                   | Vuex 的核心概念                                                    |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| action （同步action ，或借助 中间件 实现异步操作，action 不会改变 store，只是描述了怎么改变store） | mutation（用于同步操作） 、action（可用于异步操作，提交 mutation） |
| reducer（纯函数，根据 action 和旧的 store 计算出新的 store                                         | mutation里面直接修改 state                                         |
| store（单一数据源）                                                                                | state（单一数据源）                                                |



#### (3) Redux处理异步操作

Redux 得益于 中间件机制，利用 redux-thunk ，可以将异步逻辑放在  action creator 里面，通过 action creator 做一个控制反转， 给 action creator 传入 dispatch 作为参数，于是就可以 dispatch  action。

>redux-thunk 可以 dispatch 函数，这个函数用于生成 action，所以在这个函数里面我们可以进行异步操作，等异步的结果出来后再放在 action 里面将这个 action 用 dispatch 分发出去, 而这个函数被叫做 “action creator” 。

>原本是通过 dispatch 来分发 action ,现在是异步 action 即 action creator 掌握了控制权调用 dispatch，所以叫控制反转。

- 同步action: dispatch action -> reducer -> 新state
- 异步action：dispatch -> action creator -> dispatch action -> reducer -> 新state





#### (4) 参考
1. [Redux 和 Vuex 的对比](https://juejin.cn/post/6844903929063424013)
2. [一篇文章总结redux、react-redux、redux-saga](https://juejin.cn/post/6844903846666321934)


### 31. first-child、first-of-type，last-child、last-of-type，nth-child(n)、nth-of-type(n)的区别


使用p:first-child生效要满足两个条件：

1. `p`被同一个父元素包裹
2. 该父元素的第一个元素就是`p`元素

同理，使用p:last-child生效要满足两个条件：

1. `p`被同一个父元素包裹 
2. 该父元素的最后一个元素就是`p`元素

```html
<div id="wrap">
<a></a>
<p></p>
</div>
```
```css
#wrap p:first-child{}
```
是取不到上面的p元素的
可以用

```css
#wrap p:first-of-type{}
```

结论：

1. :first-child 匹配的是某父元素的第一个子元素，可以说是结构上的第一个子元素。
2. :first-of-type 匹配的是某父元素下相同类型子元素中的第一个，比如 p:first-of-type，就是指所有类型为p的子元素中的第一个。这里不再限制是第一个子元素了，只要是该类型元素的第一个就行了。

同样类型的选择器 :last-child  和 :last-of-type、:nth-child(n)  和  :nth-of-type(n) 也可以这样去理解。


### 32. 在console面板上打印vue实例

一种方法是**将vue实例挂在window对象下**，比如`window.app=new Vue()`，然后可以在console中打印`window.app`。

还有一种是，Vue 组件挂载成功后会在根节点 DOM 实例上挂一个 `__vue__` 对象，所以有时候并不一定为了好调试而非要把 new Vue() 的实例赋给 window.app 什么的。**直接在 console 上用 $0 表示当前高亮的节点，然后通过 `__vue__` 就能找到组件实例了**



### 33. bash打包上传，远程监控文件变化并部署




 远程监控

#### mon.deploy.sh文件

```bash
#!/bin/sh
# monitor and deploy bash file

set -eux

src=/root/ft_local/chat-robot.tar.gz

/usr/bin/inotifywait -rmq --timefmt '%Y-%m-%d %H:%M:%S' --format '%T %w%f %e' \
 -e "create,delete,close_write,attrib,moved_to" $src |  while read  event
do
echo $event;
bash ./deploy.sh
done
```

#### deploy.sh文件

```bash
#!/bin/sh

set -eux

dirName=chat-robot
zipFileName=${dirName}.tar.gz


ls ./ft_local -l
tar -zxf ./ft_local/$zipFileName -C $dirName

cd $dirName
ls -lh

npm install
# npm run dev
pm2 restart $dirName
```


### 34. nginx 配置反向代理 `proxy_pass http:/127.0.0.1:3066/` 最后一定要加斜杠


### 35. 关闭浏览器或者关闭网页窗口的时候，需要移除token，但是destroyed与beforeDestroy钩子不生效


关闭浏览器或者关闭网页窗口的时候，需要移除token
在 App.vue挂载的时候，加上这个方法，浏览器关闭动作的事件

```js
mounted () {
  window.addEventListener('beforeunload', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  });
},
```
vue的生命钩子函数destroyed与beforeDestroy只能在页面切换的时候才能检测到,关闭浏览器的时候，拿不到摧毁组件的事件，所以无效


### 36. 如何根据进入链接不同，始终显示不同的列表？



sessionstorage一刷新，参数就丢了，如果不舍弃，那如果又从其他链接进入又会有问题。所以， 唯一刷新还保留数据的还是url参数，所有始终将用户点击时的参数保留。在`router.afterEach`中，增加：
```js
if (to.query.qq === undefined) {
      app.$router.replace({
        query: {
          ...to.query,
          qq: parseInt(from.query.qq || 0, 10) ? 1 : 0,
        },
      });
    }
```


### 37. koa框架


router里面的`await next()`，前面有了`ctx.body=''`，后面再写`ctx.body='about'`会覆盖前面的`ctx.body`；
而`return`语句后面的`ctx.body`不会覆盖之前的返回；
如果既没有`await next()`，也没有`return`，则后一个`ctx.body`会覆盖前面的。

结论：只有`return`，才会截断。


### 38. CSS相关


#### filter的hue-rotate


```css
hue-rotate(90deg)   /* 90度旋转 */
hue-rotate(.5turn)       /* 180度旋转 */
hue-rotate(3.142rad)     /* 3.142弧度旋转，近似一圈，也就是360度 */
```

#### CSS之linear-gradient

##### 1. 语法

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```



##### 2. 例子-渐变文本
![shine-words](https://user-images.githubusercontent.com/41728540/111406737-c6871c00-870d-11eb-95ef-04e872e538b8.gif)

渐变文本关键：
```css
-webkit-background-clip: text
background-image: linear-gradient(...);
```

##### 3. 例子-波浪线

<img width="154" alt="wave-word" src="https://user-images.githubusercontent.com/41728540/111407349-a60b9180-870e-11eb-98df-86413376d8fe.png">

波浪线的核心代码：

```css
 background:
        linear-gradient(135deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%),
        linear-gradient(45deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%);
background-size: 1em 1em;
background-repeat: repeat-x, repeat-x;
height: 0.5rem;
```

原理是，一个135度的线和一个45度的线交叉，同时`background-size`的宽和高都是`height`的2倍

`linear-gradient`中度数的意思，0度指向上，45度指向右，不填的话，默认其实是180度，指向下。




#### CSS之蛇形边框

蛇形边框运用了clip属性，clip属性只能用在`position: absolute`或者`position: fixed`元素上。

clip常见用法：`clip: rect (top, right, bottom, left)`;

蛇形边框的本质是，在矩形周围，用一圈圈的线围绕，然后给它们`animation`。




参考：[CSS Clip属性](https://www.cnblogs.com/tianma3798/p/5862126.html)


#### CSS之box-shadow详解

box-shadow有5个属性值offset-x、offset-y、blur-radius、spread-radius、color

- blur-radius：模糊距离，值越大，就越模糊。blur半径值大于0时会扩展阴影尺寸
- spread-radius：阴影大小


参考：
- [三维视角解析box-shadow](https://blog.csdn.net/qq_40574071/article/details/94326686)
- [详解box-shadow](https://zhuanlan.zhihu.com/p/96747540)


#### div中img有间隙的解决方法：line-height: 0

##### 方案

方案1，给img 设置为display：block

```css
img{
  display:block
}
```

第二种办法就是给外层的div添加line-height 设置为0 （none）也一样

```css
div{
  line-height:0;
}
```

##### 为什么line-height设置为0就可以消除img下面多余的空白呢？

猜测是默认的 line-height 撑开了div的高度。

类似的应用场景还有 [父元素line-height设为0后，inline-block的空元素终于安分了](https://segmentfault.com/a/1190000007661072)


####  line-height的理解

行高是指文本行基线间的垂直距离。 基线（base line）并不是汉字文字的下端沿，而是英文字母“x”的下端沿。下图中两条红线之间的距离就是行高，上行的底线和下一行顶线之间的距离就是行距，而同一行顶线和底线之间的距离是font-size的大小，行距的一半是半行距。

![line-height.png](https://github.com/novlan1/technical-blog/blob/main/imgs/line-height.png?raw=true)

##### font-size和line-height的关系
![line-height.png](https://github.com/novlan1/technical-blog/blob/main/imgs/line-height2.png?raw=true)

- 当font-size等于line-height时，行距 = line-height - font-size = 0；
- 而当font-size大于line-height时，则会出现行距为负值，则两行重叠，如下图

![line-height.png](https://github.com/novlan1/technical-blog/blob/main/imgs/line-height3.png?raw=true)
 

设置div的高度时，是div的font-size决定了div的高度还是line-weight的值。
- 试验发现是，line-height。

div的height与line-height的大小关系不同时，会有什么显示结果呢？
- height=line-height时，垂直居中
- height > line-height时，文字靠上
- height < line-height时，文字靠下



参考：
1. [css行高line-height的一些深入理解及应用](https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)
2. [真正理解CSS中的font-size，height与line-height](https://blog.csdn.net/a2013126370/article/details/82786681)


#### css中，:after中`content: "...\a..\a." `的`\a`可以起到换行的作用

css中 `:after`中 `content: "...\a..\a." `的`\a`可以起到换行的作用

实现加载中`...`效果的一个方法是：

```css
animation: loading 3s infinite step-start both;

@keyframes loading {
 33% {
  transform: translate3d(0, -2em, 0);
 }
 66% {
  transform: translate3d(0, -1em, 0);
 }
}
```

#### CSS white-space 属性

white-space 属性设置如何处理元素内的空白。

| normal   | 默认。空白会被浏览器忽略。                                       |
| -------- | ---------------------------------------------------------------- |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 \<pre\> 标签。      |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 \<br\> 标签为止。 |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                             |
| pre-line | 合并空白符序列，但是保留换行符。                                 |
| inherit  | 规定应该从父元素继承 white-space 属性的值。                      |


white-space中 pre pre-line pre-wrap的区别？

pre-line与pre-wrap都会自动换行，但pre-line会把多个空格合并成一个，而pre-wrap会保留空格。



#### VSCode中Live Sass Compiler和Live Server两个插件


Live Sass Compiler用于实时编译sass/scss文件为css文件。

Live Server用于启动具有实时刷新功能的本地开发服务器，以处理静态页面和动态页面。


#### CSS3 [attribute*=value] 选择器

实例：

设置 class 属性值包含 "test" 的所有 div 元素的背景色：

```css
div[class*="test"] {
  background:#ffff00;
}
```

参考： [CSS3 [attribute*=value] 选择器](https://www.w3school.com.cn/cssref/selector_attr_contain.asp)



### 39. IoC 


#### 什么是IoC

IoC 的全称叫做 `Inversion of Control`，可翻译为为「控制反转」或「依赖倒置」，它主要包含了三个准则：

- 高层次的模块不应该依赖于低层次的模块，它们都应该依赖于抽象
- 抽象不应该依赖于具体实现，具体实现应该依赖于抽象
- 面向接口编程 而不要面向实现编程



```js
class App {
    constructor(options) {
        this.options = options;
        this.router = new Router();
        this.track = new Track();

        this.init();
    }

    init() {
        window.addEventListener('DOMContentLoaded', () => {
            this.router.to('home');
            this.track.tracking();
            this.options.onReady();
        });
    }
}

// index.js
import App from 'path/to/App';
new App({
    onReady() {
        // do something here...
    },
});
```
如果需要给路由新增功能（比如实现 `history` 模式）或者更新配置（启用 `history, new Router({ mode: 'history' })`）。这就不得不在 App 内部去修改这两个模块

这不是一个好的应用结构，高层次的模块 App 依赖了两个低层次的模块 Router 和 Track，对低层次模块的修改都会影响高层次的模块 App。

#### 依赖注入
依赖注入，就是**把高层模块所依赖的模块通过传参的方式把依赖「注入」到模块内部**。

```js
// app.js
class App {
    constructor(options) {
        this.options = options;
        this.router = options.router;
        this.track = options.track;

        this.init();
    }

    init() {
        // ...
    }
}

// index.js
import App from 'path/to/App';
import Router from './modules/Router';
import Track from './modules/Track';

new App({
    router: new Router(),
    track: new Track(),
    onReady() {
        // do something here...
    },
});
```

虽然 App 通过依赖注入的方式在一定程度上解耦了与其他几个模块的依赖关系，但是还不够彻底，其中的 `this.router` 和 `this.track` 等属性其实都还是对「具体实现」的依赖，明显违背了 IoC 思想的准则，那如何进一步抽象 App 模块呢。

```js
class App {
    static modules = []
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        window.addEventListener('DOMContentLoaded', () => {
            this.initModules();
            this.options.onReady(this);
        });
    }
    static use(module) {
        Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module);
    }
    initModules() {
        App.modules.map(module => module.init && typeof module.init == 'function' && module.init(this));
    }
}
```
App.use 做了一件非常简单的事情，就是把依赖保存在了 App.modules 属性中，等待后续初始化模块的时候被调用。

`this.initModules()`方法同样做了一件非常简单的事情，就是遍历 App.modules 中所有的模块，判断模块是否包含 init 属性且该属性必须是一个函数，如果判断通过的话，该方法就会去执行模块的 init 方法并把 App 的实例 this 传入其中，以便在模块中引用它。

从这个方法中可以看出，要实现一个可以被 `App.use()` 的模块，就必须满足两个「约定」：

1. 模块必须包含 init 属性
2. init 必须是一个函数

这其实就是 IoC 思想中对「面向接口编程 而不要面向实现编程」这一准则的很好的体现。App 不关心模块具体实现了什么，只要满足对 接口 init 的「约定」就可以了。

经过改造后 App 内已经没有「具体实现」了，看不到任何业务代码了，那么如何使用 App 来管理我们的依赖呢：

```js
// modules/Router.js
import Router from 'path/to/Router';
export default {
    init(app) {
        app.router = new Router(app.options.router);
        app.router.to('home');
    }
};
// modules/Track.js
import Track from 'path/to/Track';
export default {
    init(app) {
        app.track = new Track(app.options.track);
        app.track.tracking();
    }
};

// index.js
import App from 'path/to/App';
import Router from './modules/Router';
import Track from './modules/Track';

App.use([Router, Track]);

new App({
    router: {
        mode: 'history',
    },
    track: {
        // ...
    },
    onReady(app) {
        // app.options ...
    },
});
```

可以发现 App 模块在使用上也非常的方便，通过 `App.use()` 方法来「注入」依赖，在 `./modules/some-module.js` 中按照一定的「约定」去初始化相关配置，比如此时需要新增一个 Share 模块的话，无需到 App 内部去修改内容：

#### 总结

App 模块此时应该称之为「容器」比较合适了，跟业务已经没有任何关系了，它仅仅只是提供了一些方法来辅助管理注入的依赖和控制模块如何执行。
控制反转（`Inversion of Control`）是一种「思想」，依赖注入（`Dependency Injection`）则是这一思想的一种具体「实现方式」，而这里的 App 则是辅助依赖管理的一个「容器」。


### 40. AMD、UMD、CJS、ESM的区别


#### 不同打包模式的区别
##### 1. CJS

`CJS` 是 `CommonJS` 的缩写。经常我们这么使用：

```js
// importing 
const doSomething = require('./doSomething.js'); 

// exporting
module.exports = function doSomething(n) {
  // do something
}
```

- 很多人可以从 Node 中立刻认出 `CJS` 的语法。这是因为 `Node` 就是使用 `CJS` 模块的
- `CJS` 是同步导入模块
- 你可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件 。如 `const myLocalModule = require('./some/local/file.js')` 或者 `var React = require('react');` ，都可以起作用
- 当 `CJS` 导入时，它会给你一个导入对象的副本
- `CJS` 不能在浏览器中工作。它必须经过转换和打包


##### 2. AMD

AMD 代表异步模块定义。下面是一个示例代码

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```
或者

```js
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

- `AMD` 是异步(`asynchronously`)导入模块的(因此得名)
- 一开始被提议的时候，`AMD` 是为前端而做的(而 `CJS` 是后端)
- `AMD` 的语法不如 `CJS` 直观。我认为 `AMD` 和 `CJS` 完全相反


##### 3. UMD

`UMD` 代表通用模块定义（`Universal Module Definition`）。下面是它可能的样子

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```

- 在前端和后端都适用（“通用”因此得名）
- 与 `CJS` 或 `AMD` 不同，`UMD` 更像是一种配置多个模块系统的模式。这里可以找到更多的模式
- 当使用 `Rollup/Webpack` 之类的打包器时，`UMD` 通常用作备用模块

##### 4. ESM

`ESM` 代表 `ES` 模块。这是 `Javascript` 提出的实现一个标准模块系统的方案。我相信你们很多人都看到过这个:

```js
import React from 'react';
// 或者
import {foo, bar} from './myLib';

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
```

- 在很多现代浏览器可以使用
- 它兼具两方面的优点：具有 `CJS` 的简单语法和 `AMD` 的异步
- 得益于 `ES6` 的静态模块结构，可以进行  `Tree Shaking`
- `ESM` 允许像 `Rollup` 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载
- 可以在 `HTML` 中调用，只要如下

```html
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```

但是不是所有的浏览器都支持


#### 总结

- 由于 `ESM` 具有简单的语法，异步特性和`tree-shaking`特性，因此它是最好的模块化方案
- `UMD` 随处可见，通常在 ESM 不起作用的情况下用作备用
- `CJS` 是同步的，适合后端
- `AMD` 是异步的，适合前端


#### 相关资料

- [What are CJS, AMD, UMD, and ESM in Javascript?](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
- [【面试说】Javascript 中的 CJS, AMD, UMD 和 ESM是什么？](https://juejin.cn/post/6935973925004247077)
- [聊聊 package.json 文件中的 module 字段](https://juejin.cn/post/6844903569150197774)


### 41. eslint规则

- “off” 或 0 - 关闭规则
- “warn” 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- “error” 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)


### 42. IoC

IoC 的全称叫做 Inversion of Control，可翻译为为「控制反转」或「依赖倒置」，它主要包含了三个准则：

1. 高层次的模块不应该依赖于低层次的模块，它们都应该依赖于抽象
2. 抽象不应该依赖于具体实现，具体实现应该依赖于抽象
3. 面向接口编程 而不要面向实现编程

依赖注入，就是把高层模块所依赖的模块通过传参的方式把依赖「注入」到模块内部。

```js
class App {
    static modules = []
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        window.addEventListener('DOMContentLoaded', () => {
            this.initModules();
            this.options.onReady(this);
        });
    }
    static use(module) {
        Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module);
    }
    initModules() {
        App.modules.map(module => module.init && typeof module.init == 'function' && module.init(this));
    }
}
```


```js
import Track from 'path/to/Track';
export default {
    init(app) {
        app.track = new Track(app.options.track);
        app.track.tracking();
    }
};
```

```js
// index.js
import App from 'path/to/App';
import Router from './modules/Router';
import Track from './modules/Track';

App.use([Router, Track]);

new App({
    router: {
        mode: 'history',
    },
    track: {
        // ...
    },
    onReady(app) {
        // app.options ...
    },
});
```


### 43. TypeError: this.getOptions is not a function




It seems like sass-loader@11.0.0 doesn't work with vue@2.6.12.

I installed sass-loader@10.1.1 and it worked like a charm again.


### 44. npm link


执行npm link命令后，npm-link-module会根据package.json上的配置，被链接到全局，路径是`{prefix}/lib/node_modules/<package>`，这是官方文档上的描述，我们可以使用`npm config get prefix`命令获取到`prefix`的值(不过我这里使用的是windows，实际被链接到的路径是`{prefix}/node_modules/<package>`，不知道是不是npm升级的原因)，如果是win系统的话，实际观察，会发现在`{prefix}/lib/node_modules/<package>`路径下的`node-link-module`是一个快捷方式


### 45. vm._vnode 

vm._vnode 和 `vm.$vnode` 的关系就是一种父子关系，用代码表达就是 `vm._vnode.parent === vm.$vnode`



### 46. 解决封装van-list时v-model=“loaing”时报错“改变props”


比如自定义组件为match-list，引用的时候用`<match-list  v-model="loading" />`，match-list组件内部加上一个model和computed，使用的时候用vantLoading：

```js
model: {
    prop: 'loading',
    event: 'changeLoading',
  },
computed: {
    vantLoading: {
      get() {
        return this.loading;
      },
      set(val) {
        this.$emit('changeLoading', val);
      },
    },
  },
```

### 47. effect函数：副作用函数实际就是响应式数据在发生变更的时候，要执行的函数

### 48. node版本小于7的时候，不能识别async


### 49. Vuex

vuex中，mutation是同步的，用commit提交；action是异步的，用dispatch派发
- 异步操作：dispatch action -> commit mutation -> 修改state
- 同步操作：commit mutation -> 修改state

### 50. Codecc的Hack方法


1. 过滤掉反引号，可以解决sql的安全问题

2. codecc代码安全检测不识别includes，只能识别indexof，即不能识别es7的语法


### 51. git stash

常用git stash命令：

（1）`git stash save "save message"`  : 执行存储时，添加备注，方便查找，只有`git stash` 也要可以的，但查找时不方便识别。

（2）`git stash list`  ：查看stash了哪些存储

（3）`git stash show` ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加`stash@{$num}`，比如第二个 `git stash show stash@{1}`

（4）`git stash show -p` : 显示第一个存储的改动，如果想显示其他存存储，命令：`git stash show  stash@{$num}  -p `，比如第二个：`git stash show  stash@{1} -p`

（5）`git stash apply` :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即`stash@{0}`，如果要使用其他个，`git stash apply stash@{$num}`， 比如第二个：`git stash apply stash@{1} `

（6）`git stash pop` ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即`stash@{0}`，如果要应用并删除其他stash，命令：`git stash pop stash@{$num}` ，比如应用并删除第二个：`git stash pop stash@{1}`

（7）`git stash drop stash@{$num}` ：丢弃stash@{$num}存储，从列表中删除这个存储

（8）`git stash clear` ：删除所有缓存的stash



### 52. cookie写入浏览器


```js
const DOMAIN = 'igame.qq.com';

function setCookie(name, value, Hours = 1) {
  const date = new Date(); // 获取当前时间
  const expiresDays = Hours;  // 将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
  document.cookie = `${name}=${value};expires=${date.toGMTString()};path=/;domain=${DOMAIN}`;  // 设置cookie
}

function writeToCookie(cookie) {
  const a = cookie.split('; ');
  const d = a.reduce((c, item) => {
    const temp = item.split('=');
    c[temp[0]] = temp[1];
    return c;
  }, {});
  Object.keys(d).map((item) => {
    setCookie(item, d[item]);
  });
}
```


## 二、基础

### 1. HTTP2.0

二进制分帧层，是HTTP 2.0性能增强的核心。 HTTP 1.x在应用层以**纯文本**的形式进行通信，而HTTP 2.0将所有的传输信息分割为更小的消息和帧，并对它们采用二进制格式编码。这样，客户端和服务端都需要引入新的二进制编码和解码的机制。 如下图所示，HTTP 2.0并没有改变HTTP 1.x的语义，只是在应用层使用二进制分帧方式传输。

二进制分帧层保留了HTTP的语义不受影响，包括首部、方法等，在应用层来看，和HTTP 1.x没有差别。同时，所有同主机的通信能够在**一个TCP连接**上完成。



参考：
1. [HTTP 2.0 原理详细分析](https://blog.csdn.net/zhuyiquan/article/details/69257126)
2. [HTTP2.0性能增强的核心：二进制分帧](https://blog.csdn.net/u011904605/article/details/53012844)


### 2. Base64原理

#### （1）原理

- 第一步，将待转换的字符串每三个字节分为一组，每个字节占8bit，那么共有24个二进制位。
- 第二步，将上面的24个二进制位每6个一组，共分为4组。
- 第三步，在每组前面添加两个0，每组由6个变为8个二进制位，总共32个二进制位，即四个字节。
- 第四步，根据Base64编码对照表（见下图）获得对应的值。


```
0　A　　17　R　　　34　i　　　51　z

1　B　　18　S　　　35　j　　　52　0

2　C　　19　T　　　36　k　　　53　1

3　D　　20　U　　　37　l　　　54　2

4　E　　21　V　　　38　m　　　55　3

5　F　　22　W　　　39　n　　　56　4

6　G　　23　X　　　40　o　　　57　5

7　H　　24　Y　　　41　p　　　58　6

8　I　　25　Z　　　42　q　　　59　7

9　J　　26　a　　　43　r　　　60　8

10　K　　27　b　　　44　s　　　61　9

11　L　　28　c　　　45　t　　　62　+

12　M　　29　d　　　46　u　　　63　/

13　N　　30　e　　　47　v

14　O　　31　f　　　48　w　　　

15　P　　32　g　　　49　x

16　Q　　33　h　　　50　y
```


举例：

| 文本      | M        | a        | n        |
| --------- | -------- | -------- | -------- |
| ASCII编码 | 77       | 97       | 110      |
| 二进制位  | 01001101 | 01100001 | 01101110 |


对二进制位重新分组


| 二进制位   | 010011 | 010110 | 000101 | 101110 |  |
| ---------- | ------ | ------ | ------ | ------ |
| 索引       | 19     | 22     | 5      | 46     |
| Base64编码 | T      | w      | F      | u      |



因此“Man”Base64编码之后就变为：TWFu。




#### （2）位数不足情况


- 两个字节：两个字节共16个二进制位，依旧按照规则进行分组。此时总共16个二进制位，每6个一组，则第三组缺少2位，用0补齐，得到三个Base64编码，第四组完全没有数据则用“=”补上。因此，“BC”转换之后为“QkM=”；



| 文本      | B        | C        |
| --------- | -------- | -------- |
| ASCII编码 | 66       | 67       |
| 二进制位  | 01000010 | 01000011 |


对二进制位重新分组：

| 二进制位   | 010000 | 100100 | 001100 |     |
| ---------- | ------ | ------ | ------ | --- |
| 索引       | 16     | 36     | 12     |     |
| Base64编码 | Q      | k      | M      | =   |




- 一个字节：一个字节共8个二进制位，依旧按照规则进行分组。此时共8个二进制位，每6个一组，则第二组缺少4位，用0补齐，得到两个Base64编码，而后面两组没有对应数据，都用“=”补上。因此，“A”转换之后为“QQ==”；


| 文本      | B        |
| --------- | -------- |
| ASCII编码 | 65       |
| 二进制位  | 01000001 |


对二进制位重新分组：

| 二进制位   | 010000 | 010000 |     |     |
| ---------- | ------ | ------ | --- | --- |
| 索引       | 16     | 16     |     |     |
| Base64编码 | Q      | Q      | =   | =   |


#### （3）作用

Base64都是可打印字符，可解决乱码问题。


#### （4）特点

1. Base64字符表中的字符原本用6个bit就可以表示，现在前面添加2个0，变为8个bit，会造成一定的浪费。因此，Base64编码之后的文本，要比原文大约三分之一。
2. 为什么使用3个字节一组呢？因为6和8的最小公倍数为24，三个字节正好24个二进制位，每6个bit位一组，恰好能够分为4组。
3. 大多数编码都是由字符串转化成二进制的过程，而Base64的编码则是从二进制转换为字符串。与常规恰恰相反，
4. Base64编码主要用在传输、存储、表示二进制领域，不能算得上加密，只是无法直接看到明文。也可以通过打乱Base64编码来进行加密。
5. 中文有多种编码（比如：utf-8、gb2312、gbk等），不同编码对应Base64编码结果都不一样。



参考：[一篇文章彻底弄懂Base64编码原理](https://blog.csdn.net/wo541075754/article/details/81734770)


### 3. Open Graph Protocol

og标签是一种新的http头部标记，即Open Graph Protocol（开放内容协议）。在页面添加这种协议可以让网页成为一个“富媒体对象”，表示同意网页内容可以被其他社会化网站引用等。

目前Facebook、人人等SNS网站都支持该协议。任何网页只要遵守该协议，SNS网站就能从页面上提取最有效的信息并呈现给用户；也能让SNS网站按照页面上og标签规定的内容呈现给用户。


比如：

```html
<meta property="og:title" content="The Rock" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
```

参考：
1. [ogp.me/](https://ogp.me/)
2. [什么是og标签？什么是OG协议？](https://www.jianshu.com/p/dedd9a9aff4e)


### 4. git取消文件跟踪

如果要取消追踪dir：

```bash
$ git rm -r --cached dir # 不删除本地文件

$ git rm -r --f dir   # 删除本地文件
```


参考：[git取消文件跟踪](https://www.cnblogs.com/zhuchenglin/p/7128383.html)



### 6. 基础图的区别


| 图表   | 维度       | 注意点                     |
| ------ | ---------- | -------------------------- |
| 柱状图 | 二维       | 只需比较其中一维           |
| 折线图 | 二维       | 适用于较大的数据集         |
| 饼图   | 二维       | 只适用反映部分与整体的关系 |
| 散点图 | 二维或三维 | 有两个维度需要比较         |
| 气泡图 | 三维或四维 | 其中只有两维能精确辨识     |
| 雷达图 | 四维以上   | 数据点不超过6个            |


### 7. mongodb远程连接命令

```
mongo mongodb://mongouser:username@x.x.x.x:xxxxx/dbname
```


### 8. semver

`semver`，语义化版本 `semantic version`。

版本号格式：主版本号，次版本号，修订号。


定义依赖版本号时：

- `^`，次版本号以及修订号为最新，主版本号不变。这种说法不完备。`^` 只会执行不更改最左边非零数字的更新，如果写入的是 ^0.13.0，可以更新到 0.13.1、0.13.2 等，但不能更新到 0.14.0 或更高版本。 如果写入的是 ^1.13.0，则当运行 npm update 时，可以更新到 1.13.1、1.14.0 等，但不能更新到 2.0.0 或更高版本。
- `~`，修订号为最新，次版本号及主版本号不变。如果写入的是 〜0.13.0，则当运行 npm update 时，会更新到补丁版本：即 0.13.1 可以，但 0.14.0 不可以。



参考：[semver 语义化版本规范](https://www.jianshu.com/p/a7490344044f)



### 9. MVC


#### （1）MVC

MVC模式其实就是单向通信：

1. 用户通过View传送指令到Controller
2. Controller完成业务逻辑，促使Model改变状态
3. Model 将新的数据发送到View，用户得到反馈


View => Controller => Model => View ...

```
           View

         /      \

 Controller  -->   Model
```

#### （2）MVP

MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。
1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。


View <=> Presenter <=> Model

```
         View 
    
      //

 Presenter   <-->    Model
```

#### （3）MVVM

MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。
唯一的区别是，**它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然**。

```
       View
 
     //

ViewModel  <-->  Model   
```

也就是说，MVVM 模式中 View 层也非常薄，没有任何业务逻辑，ViewModel 非常厚，含有很多逻辑。


参考：[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)




### 10. XOR 运算

#### （1）XOR 运算有以下的运算定律

1. 一个值与自身的运算，总是为 false。

```
x ^ x = 0
```

2. 一个值与 0 的运算，总是等于其本身。

```
x ^ 0 = x
```

3. 可交换性

```
x ^ y = y ^ x
```

4. 结合性

```
x ^ (y ^ z) = (x ^ y) ^ z
```

#### （2）一道面试题

一个数组包含 n-1 个成员，这些成员是 1 到 n 之间的整数，且没有重复，请找出缺少的那个数字。

最快的解答方法，就是把所有数组成员（A[0] 一直到 A[n-2]）与 1 到 n 的整数全部放在一起，进行异或运算。

```
A[0] ^ A[1] ^ ... ^ A[n-2] ^ 1 ^ 2 ^ ... ^ n
```

上面这个式子中，每个数组成员都会出现两次，相同的值进行异或运算就会得到 0。只有缺少的那个数字出现一次，所以最后得到的就是这个值。

加法也可以解这道题。

```
1 + 2 +  ... + n - A[0] - A[1] - ... - A[n-2]
```

但是，加法的速度没有异或运算快，而且需要额外的空间。如果数字比较大，还有溢出的可能。
