function defineReactive(data, key, value) {
  // 递归调用，监听所有属性
  observer(value);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('observer-defineRactive-get', Dep.target, data, key, value);
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify(); // 通知订阅器
      }
    }
  });
}

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
};

Dep.target = null;
/**
 * 我们设计了一个订阅器 Dep 类，该类里面定义了一些属性和方法，这里需要特别注意的
 * 是它有一个静态属性 Dep.target，这是一个全局唯一 的Watcher，因为在同一时间只能
 * 有一个全局的 Watcher 被计算，另外它的自身属性 subs 也是 Watcher 的数组。
 */
