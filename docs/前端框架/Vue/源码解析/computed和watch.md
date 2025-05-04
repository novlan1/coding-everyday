# watch


```js
export default {
  watch: {
    name(newName) {...}
  }
}
```

其实它只是this.$watch这个API的一种封装：

```js
export default {
  created() {
    this.$watch('name', newName => {...})
  }
}
```

看下watch的整个过程：
```js
// 1. 初始化所有状态时
function initState(vm) {  
  vm._watchers = []  // 当前实例watcher集合
  const opts = vm.$options  // 合并后的属性
  
  if(opts.watch) {  // 如果有定义watch属性
    initWatch(vm, opts.watch)  // 执行初始化方法
  }
}

// 2. // 初始化watch
function initWatch (vm, watch) {  
  for (const key in watch) {  // 遍历watch内多个监听属性
    const handler = watch[key]  // 每一个监听属性的值
    if (Array.isArray(handler)) {  // 如果该项的值为数组
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])  // 将每一项使用watcher包装
      }
    } else {
      createWatcher(vm, key, handler) // 不是数组直接使用watcher
    }
  }
}


// 3. 创建Watcher
function createWatcher (vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) { // 如果是对象，参数移位
    options = handler  
    handler = handler.handler
  }
  if (typeof handler === 'string') {  // 如果是字符串，表示为方法名
    handler = vm[handler]  // 获取methods内的方法
  }
  return vm.$watch(expOrFn, handler, options)  // 封装
}

// 4. $watch
Vue.prototype.$watch = function(expOrFn, cb, options = {}) {
  const vm = this
  if (isPlainObject(cb)) {  // 如果cb是对象，当手动创建监听属性时
    return createWatcher(vm, expOrFn, cb, options)
  }
  
  options.user = true  // user-watcher的标志位，传入Watcher类中
  const watcher = new Watcher(vm, expOrFn, cb, options)  // 实例化user-watcher
  
  if (options.immediate) {  // 立即执行
    cb.call(vm, watcher.value)  // 以当前值立即执行一次回调函数
  }  // watcher.value为实例化后返回的值
  
  return function unwatchFn () {  // 返回一个函数，执行取消监听
    watcher.teardown()
  }
}

// 5. Watcher
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    vm._watchers.push(this)  // 添加到当前实例的watchers内
    this.getter = parsePath(expOrFn)  // 返回的方法
    
    this.value = this.get()  // 执行get
    
    if(options) {
      this.deep = !!options.deep  // 是否深度监听
      this.user = !!options.user  // 是否是user-wathcer
      this.sync = !!options.sync  // 是否同步更新
    }
    
    this.active = true  // // 派发更新的标志位
    this.cb = cb  // 回调函数
    
    if (typeof expOrFn === 'function') {  // 如果expOrFn是函数
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)  // 如果是字符串对象路径形式，返回闭包函数
    }
    
    ...
    
  }

  get() {
    pushTarget(this)  // 将当前user-watcher实例赋值给Dep.target，读取时收集它
    
    let value = this.getter.call(this.vm, this.vm)  // 将vm实例传给闭包，进行读取操作
    
    if (this.deep) {  // 如果有定义deep属性
      traverse(value)  // 进行深度监听
    }
    
    popTarget()
    return value  // 返回闭包读取到的值，参数immediate使用的就是这里的值
  }

  update() {  // 执行派发更新
    if(this.sync) {  // 如果有设置sync为true
      this.run()  // 不走nextTick队列，直接执行
    } else {
      queueWatcher(this)  // 否则加入队列，异步执行run()
    }
  }

    run() {
    if (this.active) {
      this.getAndInvoke(this.cb)  // 传入回调函数
    }
  }
  
  getAndInvoke(cb) {
    const value = this.get()  // 重新求值
    
    if(value !== this.value || isObject(value) || this.deep) {
      const oldValue = this.value  // 缓存之前的值
      this.value = value  // 新值
      if(this.user) {  // 如果是user-watcher
        cb.call(this.vm, value, oldValue)  // 在回调内传入新值和旧值
      }
    }
  }
}
```




watch就是创建了一个option.user=true的Watcher，当监听对象发生变化时，只行额外的回调函数，并把newVal和oldVal传给回调函数。

watch可以取消监听
```js
export default {
  data() {
    return {
      name: 'cc'
    }  
  },
  created() {
    this.unwatch = this.$watch('name', newName => {...})
    this.unwatch()  // 取消监听
  }
}
```