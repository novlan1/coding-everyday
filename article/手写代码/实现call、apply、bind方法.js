Function.prototype.call2 = function(context, ...args) {
  const key = Symbol('key')
  context[key] = this;

  const res = context[key](...args)
  delete context[key]
  return res;
}


Function.prototype.apply2 = function(context, args = []) {
  const key = Symbol('key')
  context[key] = this;

  const res = context[key](...args)

  delete context[key]
  return res;
}


Function.prototype.bind2 = function(context, ...args) {
  const fn = this;

  const newFn = function() {
    const newArgs = args.concat(...arguments)
    if (this instanceof newFn) {
      return fn.apply(this, newArgs)
    }
    return fn.apply(context, newArgs)
  }
  return newFn;
}


// 测试

const obj = {
  name: 'yang',
  getName() {
    console.log(this.name)
  }
}

const getName2 = obj.getName.bind2({name: 'mike'})
getName2()

