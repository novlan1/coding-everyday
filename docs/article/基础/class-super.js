class A {}

class B extends A {
  constructor() {
  }
}

const b = new B(); // 报错

console.log('b', b);
