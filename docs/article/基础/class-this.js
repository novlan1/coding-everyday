class Prosen {
  constructor(name) {
    this.name = name;
    this.sayName = this.sayName.bind(this);
  }
  sayName() {
    console.log(this.name);
  }

  // sayName = () => {
  //   console.log(this.name);
  // }
}

const prosen = new Prosen('zhangsan');
prosen.sayName();  // 张三

const prosen1 = new Prosen('lisi');
const { sayName } = prosen1;
sayName();  // 报错

