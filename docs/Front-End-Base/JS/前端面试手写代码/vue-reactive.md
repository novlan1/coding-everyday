### 双向数据绑定

极简版：
```html
<input id="input"/>
```
```js
const data = {};
const input = document.getElementById('input');

Object.defineProperty(data, 'text', {
  set(value) {
    input.value = value;
    this.value = value;
  }
});

input.onchange = function(e) {
  data.text = e.target.value;
}
```

完整版：

```js
// 订阅器
function Dep(){
  this.subs = []
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.map(sub => {
      sub.update()
    })
  }
}

Dep.target = null
```

```js
// 观察者
function observer(data) {
  if (!data || typeof(data) !== 'object') {
    return
  }
  Object.keys(data).map(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set(newVal) {
      if (value !== newVal) {
        
        value = newVal // 这两句的顺序很关键，必须先赋新的值，才能成功notify
        dep.notify()
      }
    }
  })

  if (value && typeof(value) === 'object') {
    observer(value)
  }

}
```

```js
// Proxy 实现观察者
function observer(data) {
  if (!data || typeof(data) !== 'object') return
  
  const dep = new Dep()

  return new Proxy(data, {
    get(target, key, receiver) {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      if (target[key] !== value) {
        Reflect.set(target, key, value, receiver)
        dep.notify()
      }
    }
  })
}
```

```js
// 订阅者
function Watcher(vm, prop, cb) {
  this.vm = vm
  this.prop = prop
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  get() {
    Dep.target = this
    const value = this.vm.$data[this.prop]
    Dep.target = null
    return value
  },
  update() {
    let value = this.value
    const newVal = this.vm.$data[this.prop]
    if (value !== newVal) {
      this.value = newVal 
      this.cb(newVal)
    }
  }
}
```

```js
// Vue
function Vue(options) {
  this.$data = options.data
  this.init()
}

Vue.prototype.init = function() {
  observer(this.$data)
  // this.$data = observer(this.$data) // 用Proxy实现观察者的话需替换为这行
  new Watcher(this, 'msg', (value) => { // 模拟编译过程中的监听
    console.log('-----------------', value)
  })
}
```

```js
// 测试
const vm = new Vue({
  data: {
    msg: 'test'
  }
})

setTimeout(() => {
  vm.$data['msg'] = 'test2'
}, 1000)
```


