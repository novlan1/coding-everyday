function test () {
  return orderable(
    class extends BaseClass {
      constructor () {
        super()
        console.log('test')
      }
    }
  )
}

class BaseClass {
  constructor () {
    console.log('baseClass')
  }
}

function orderable (Class) {
  return class extends Class {
    constructor () {
      super()
      console.log('orderable')
    }
  }
}

const NewClass = test()

const a = new NewClass()

// 打印顺序
// baseClass
// test
// orderable
