// const hello = (name: string) => {
//   return `hello ${name}`
// }

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

// class Animal{
//   protected name: string
//   readonly age: number // 只读属性
//   constructor(name: string) {
//     this.name = name
//   }
//   run() {
//     console.log(`${this.name} is running`)
//   }
// }

// const snake = new Animal('viking')
// snake.run()
// console.log(snake.name) // 报错，只能在类内部和子类中使用

// class Cat extends Animal{
//   constructor(name) {
//     super(name)
//     console.log(this.name)
//   }

//   run() {
//     console.log(`The cat ${this.name} is running`)
//   }

// }

// const cat = new Cat('mm')
// cat.run()


// interface Radio{
//   switchRadio() :void
// }

// interface Battery{
//   checkBatteryStatus();
// }



// class Car implements Radio{
//   switchRadio() {

//   }
// }

// class CellPhone implements Radio, Battery{
//   switchRadio() {

//   }

//   checkBatteryStatus() {

//   }
// }

// // 接口的继承
// interface RadioWithBattery extends Radio{
//   checkBatteryStatus();
// }

// class CellPhone2 implements RadioWithBattery{
//   switchRadio() {

//   }

//   checkBatteryStatus() {

//   }
// }


// enum Direction {
//   Up,
//   Down,
//   Right,
//   Left
// }
// enum Direction2 {
//   Up = 'UP',
//   Down = 'DOWN',
//   Right = 'RIGHT',
//   Left = 'LEFT'
// }

// console.log(Direction.Down)
// console.log(Direction[1])

// const directionVal = 'UP'
// // 比较枚举类型中的值和普通值
// if (Direction2.Up === directionVal){
//   console.log('go up')
// }

// const enum Direction3 {
//   Up = 'UP',
//   Down = 'DOWN',
//   Right = 'RIGHT',
//   Left = 'LEFT'
// }

// if (Direction3.Up === directionVal){
//   console.log('go up')
// }

// function echo<T>(args: T): T{
//   return args
// }

// const res = echo(123)
// console.log(res)

// function swap<T, U>(tuple:[T,U]): [U, T]{
//   return [tuple[1], tuple[0]]
// }

// const myTuple: [string, number] = ['str', 123]
// const myTuple2 = swap(myTuple)
// console.log(myTuple2)

// interface IWithLength {
//   length: number
// }

// function echoWithLength<T extends IWithLength>(args: T): T {
//   console.log(args.length)
//   return args
// }


// echoWithLength('string2')
// echoWithLength([1,2,3])
// echoWithLength({ length: 10000, width: 200 })

// class Queue<T>{
//   private data = []
//   push(item: T) {
//     this.data.push(item)
//   }
//   pop(): T {
//     return this.data.shift()
//   }
// }

// const queue = new Queue<number>()
// queue.push(1)
// // queue.push('str')
// console.log(queue.pop().toFixed())
// // console.log(queue.pop().toFixed())

// const queue2 = new Queue<string>()
// queue2.push('string2')
// console.log(queue2.pop().length)

// interface KeyPair<T, U> {
//   key: T;
//   value: U;
// }

// let kp: KeyPair<number, string> = {
//   key: 123,
//   value: 'str'
// }

// let kp2: KeyPair<string, number> = {
//   key: 'str',
//   value: 123
// }

// let arr: number[] = [1, 2, 3]
// let arr2: Array<number> = [1, 2, 3]


// interface IPlus<T> {
//   (a: T, b: T): T
// }

// function plus(a: number, b: number): number {
//   return a + b
// }

// function connect(a: string, b: string): string {
//   return a + b
// }

// const a: IPlus<number> = plus
// const b: IPlus<string> = connect


// type PlusType = (a: number, b: number) => number // 类型别名

// function sum(a: number, b: number): number{
//   return a + b
// }

// const sum2: PlusType = sum

// type NameResolver = () => string
// type NameOrResolver = string | NameResolver

// function getName(n: NameOrResolver): string {
//   if (typeof n === 'string') {
//     return n
//   } 
//   return n()
// }

// function getLength(input: number | string) : number {
//   // const str = input as String // 类型断言，大写，表示接口，不是类型
//   // if (str.length) {
//   //   return str.length
//   // }
//   // const number = input as Number
//   // return number.toString().length

//   if((<string>input).length) {
//     return (<string>input).length
//   }
//   return input.toString().length
// }

// let str = 'str'
// str = 123 // 报错

// declare var jQuery: (selector: string) => any
jQuery('$foo')