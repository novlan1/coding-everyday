/**
 * 订阅者 Watcher 是一个 类，在它的构造函数中，定义了一些属性：
 *
 * vm：   一个 Vue 的实例对象；
 * prop：是 node 节点的 v-model 等指令的属性值 或者插值符号中的属性。
 *       如 v-model="name"，prop 就是name;
 * cb：  是 Watcher 绑定的更新函数;
 */

function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  },
  get() {
    Dep.target = this; // 储存订阅器
    const value = this.vm.$data[this.prop]; // 因为属性被监听，这一步会执行监听器里的 get方法
    Dep.target = null;
    return value;
  }
};
