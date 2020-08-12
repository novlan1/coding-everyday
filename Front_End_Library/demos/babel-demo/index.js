// import "@bable/polyfill"; // 不完美的方式

const fn = () => {
  console.log("wens");
};
const p = new Promise((resolve, reject) => {
  resolve("wens");
});
const list = [1, 2, 3, 4].map(item => item * 2);


class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}

Array.prototype.map3 = function () {
  const [fn, thisArg] = [...arguments]
  const arr = this;
  return arr.reduce((acc, arr[i], i, arr) => {
    acc.push(fn.call(thisArg, arr[i], i, arr))
    return acc;
  }, [])
}