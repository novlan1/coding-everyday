class A{

}
A.getInstance = (function() {
  let _instance
  return function(...args) {
    if (!_instance) {
      _instance = new A(...args)
    }
    return _instance
  }
 
})()

const a = A.getInstance()
const b = A.getInstance()

console.log(a===b)


