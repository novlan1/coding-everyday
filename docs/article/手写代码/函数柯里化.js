function currying(fn, ...args) {
  let allArgs = args;
  const cb = function(...cbArgs) {
    if (!cbArgs.length) {
      return fn.apply(this, allArgs)
    }
    allArgs.push(...arguments)
    return cb;
  }
  cb.toString = () => {
    return fn.apply(null, allArgs)
  }
  return cb;
}

function add(...args) {
  return args.reduce((acc,item) => acc + item, 0)
}

const a = currying(add, 1, 2, 3)
console.log(a());
console.log(+a(1)(2)(3))