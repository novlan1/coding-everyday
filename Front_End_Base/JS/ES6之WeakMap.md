- [1. WeakMap](#1-weakmap)
  - [1.1. 存在意义](#11-存在意义)
  - [1.2. 使用场景](#12-使用场景)
  - [1.3. 什么是JS中的弱引用?](#13-什么是js中的弱引用)
  

## 1. WeakMap

### 1.1. 存在意义

```js
var map = new Map();
var weakmap = new WeakMap();

(function IIFE(){
    var k1 = {x: 1};
    var k2 = {y: 2};

    map.set(k1, 'k1');
    weakmap.set(k2, 'k2');
})()

map.forEach((val, key) => console.log(key, val))
// Weakmap. forEach(...) ERROR!
```

我们思考一个的问题，在运行完`IIFE`函数后，我们是否还需要在`map`里保存`k1`的对象呢？

答案应该是“不保存”：`k1`和`k2`的作用域在`IIFE`内，之后我们将无法获取这两个引用，再驻留map里只会产生副作用。但是`IIFE`之后，当遍历`map`时——`map.forEach(...)`，我们依旧能找到`{x: 1}`，而且除了调用`clear`方法，我们甚至无法删除这个对象；垃圾回收机制更无法对`{x: 1}`起作用，久而久之便是内存溢出。

具体原因还是得从`Map api`中深究。`Map api`共用了两个数组（一个存放`key`,一个存放`value`）。
**给`Map set`值时会同时将`key`和`value`添加到这两个数组的末尾**。从而使得`key`和`value`的索引在两个数组中相对应。**当从`Map`取值时，需要遍历所有的`key`，然后使用索引从存储值的数组中检索出相应的`value`**。
这个实现的缺点很大，**首先是赋值和搜索的时间复杂度为`O(n)`；其次是可能导致内存溢出**，因为数组会一直保存每个键值引用，即便是引用早已离开作用域，垃圾回收器也无法回收这些内存。那 WeakMap 呢？（虽然就它那几个`api`，引用不存在后，WeakMap 确实也没啥可以操作了）。

看一下WeakMap的`polyfill`，管中窥豹。

```js
var WeakMap = function() {
    this.name = '__wm__' + uuid()
};

WeakMap.prototype = {
    set: function(key, value) {
        Object.defineProperty(key, this.name, {
            value: [key, value],
        });
        return this;
    },
    get: function(key) {
        var entry = key[this.name];
        return entry && (entry[0] === key ? entry[1] : undefined);
    },
    ...
};
```

很有意思，它并没有使用任何数组。`weakmap.set(key, val)`事实上是直接通过`Object.defineProperty`给这个`key`加了一个新属性——`this.name`，**这就解释了为什么`WeakMap`的`key`必需是个`Object`了**；同理，`weakmap.get(key)`是从`key`的该属性里获取了值对象。很有趣的设计。
相比`Map`，`WeakMap`持有的只是每个键值对的“弱引用”，不会额外开内存保存键值引用。这意味着在没有其他引用存在时，垃圾回收器能正确处理`key`指向的内存块。**正因为这个特殊的实现，`WeakMap`的`key`是不可枚举的**，更不用说提供`keys()`、`forEach()`这类方法了。

### 1.2. 使用场景

1. Cache
作缓存的话，一般是做全局Map，可以读取调用链上游的一些信息，好处就是调用链结束后随时可以回收内存。

2. DOM listener
管理DOM listener时也可以用WeakMap

```js
const dom = {};
addListener(dom, () => console.log('hello'));
addListener(dom, () => console.log('world'));

triggerListeners(dom);
```

添加和触发监听器是很典型的订阅发布模式。实现时我们可以利用WeakMap保存`listener`，**在DOM销毁后即可释放内存**：

```js
const listeners = new WeakMap();

function addListener(obj, listener) {
    if (!listeners.has(obj)) {
        listeners.set(obj, new Set());
    }
    listeners.get(obj).add(listener);
}

function triggerListeners(obj) {
    const listeners = listeners.get(obj);
    if (listeners) {
        for (const listener of listeners) {
            listener();
        }
    }
}
```

3. 保存对象的私有数据


### 1.3. 什么是JS中的弱引用?

> 垃圾回收机制不考虑对该对象的引用。

也就是说，**如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还在该弱引用的结构中。**

注意： 弱引用的对象不可遍历！


参考资料：
1. [ES6之WeakMap](https://www.jianshu.com/p/8c4ffa77b346)
