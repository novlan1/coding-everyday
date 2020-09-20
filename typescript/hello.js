// const hello = (name: string) => {
//   return `hello ${name}`
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// hello('123')
// let isDone: boolean = false
// let str: string = undefined
// let str2: string = null
// let notSure: any = undefined
// notSure = '123'
// notSure = 1212
// notSure = false
// let numberOrStr: number | string = 'test'
// numberOrStr = 123123
// let numberArray: number[] = [1, 2, 3, 4]
// // numberArray = ['str'] // 报错
// // numberArray.push('test') // 报错
// let tupleTest: [string, number] = ['str', 123]
// interface IPerson { // 一般大写
//   readonly id: number; // 只读属性
//   name: string; // 注意是分号，不是逗号
//   age: number; 
//   gender?: string; // 可选属性
// }
// let testObj: IPerson = {
//   id: 18,
//   name: 'mike',
//   age: 18,
// }
// // testObj.id = 123123 // 报错
// // 可选参数
// function add(x: number, y: number, z?: number): number{
//   return x + y
// }
// // 默认参数
// function add2(x: number, y: number, z: number = 10): number{
//   return x + y
// }
// let res = add(3, 5)
// let res2 = add(3, 5)
// const add3 = function(x: number, y: number, z?: number): number{
//   return x + y
// }
// // const add4: string = add3 // 报错
// const add4: (x: number, y: number, z?: number) => number = add3 // 正确
// // 
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        console.log(this.name + " is running");
    };
    return Animal;
}());
var snake = new Animal('viking');
// snake.run()
// console.log(snake.name)
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.run = function () {
        console.log("The cat " + this.name + " is running");
    };
    return Cat;
}(Animal));
var cat = new Cat('mm');
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.switchRadio = function () {
    };
    return Car;
}());
var CellPhone = /** @class */ (function () {
    function CellPhone() {
    }
    CellPhone.prototype.switchRadio = function () {
    };
    CellPhone.prototype.checkBatteryStatus = function () {
    };
    return CellPhone;
}());
var CellPhone2 = /** @class */ (function () {
    function CellPhone2() {
    }
    CellPhone2.prototype.switchRadio = function () {
    };
    CellPhone2.prototype.checkBatteryStatus = function () {
    };
    return CellPhone2;
}());
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "UP";
    Direction2["Down"] = "DOWN";
    Direction2["Right"] = "RIGHT";
    Direction2["Left"] = "LEFT";
})(Direction2 || (Direction2 = {}));
console.log(Direction.Down);
console.log(Direction[1]);
var directionVal = 'UP';
// 比较枚举类型中的值和普通值
if (Direction2.Up === directionVal) {
    console.log('go up');
}
if ("UP" /* Up */ === directionVal) {
    console.log('go up');
}
