/* observer.js */

class Observer {
  constructor(data) {
    // 用来遍历 data
    this.walk(data);
  }
  // 遍历 data 转为响应式
  walk(data) {
    // 判断 data是否为空 和 对象
    if (!data || typeof data !== 'object') return;
    // 遍历 data
    Object.keys(data).forEach((key) => {
      // 转为响应式
      this.defineReactive(data, key, data[key]);
    });
  }
  // 转为响应式
  // 要注意的 和vue.js 写的不同的是
  // vue.js中是将 属性给了 Vue 转为 getter setter
  // 这里是 将data中的属性转为getter setter
  defineReactive(obj, key, value) {
    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
    this.walk(value);
    // 保存一下 this
    const self = this;
    // 创建 Dep 对象
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      // 设置可枚举
      enumerable: true,
      // 设置可配置
      configurable: true,

      // 获取值
      get() {
        // 在这里添加观察者对象 Dep.target 表示观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      // 设置值
      set(newValue) {
        // 判断旧值和新值是否相等
        if (newValue === value) return;
        // 设置新值
        value = newValue;
        // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
        self.walk(newValue);
        // 触发通知 更新视图
        dep.notify();
      },
    });
  }
}

// Watcher 是依赖，Dep 是依赖列表，Observer 是观察者

// Watcher 是靠近模版一侧，或者是自定义的 Watcher。而 Observer 是对开发者声明的 data，进行响应式劫持，get 中会把 Watcher 放到 dep.subs中， set 时会依次触发 sub 的 notify，来更新视图

// data 的每一个 key，在 Observer 劫持时，都有一个独立的 Dep 对象

// Watcher 只在构造函数中对 Dep.target 赋值一次 this，也就可以防止重复被收集。

// 「依赖的本质：」
// 所谓的依赖，其实就是Watcher。
// 至于如何收集依赖，总结起来就一句话:
// 在getter中收集依赖（收集Watch当如Dep中），在setter中触发依赖。先收集依赖，即把用到该数据的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就行了。


// Dep 和 Watcher 的关系

// Observer 负责将数据转换成 getter/setter 形式； Dep 负责管理数据的依赖列表；是一个发布订阅模式，上游对接 Observer，下游对接 Watcher Watcher 是实际上的数据依赖，负责将数据的变化转发到外界(渲染、回调)； 首先将 data 传入 Observer 转成 getter/setter 形式；当 Watcher 实例读取数据时，会触发 getter，被收集到 Dep 仓库中；当数据更新时，触发 setter，通知 Dep 仓库中的所有 Watcher 实例更新，Watcher 实例负责通知外界

// - Dep 负责收集所有相关的的订阅者 Watcher ，具体谁不用管，具体有多少也不用管，只需要根据 target 指向的计算去收集订阅其消息的 Watcher 即可，然后做好消息发布 notify 即可。
// - Watcher 负责订阅 Dep ，并在订阅的时候让 Dep 进行收集，接收到 Dep 发布的消息时，做好其 update 操作即可。
