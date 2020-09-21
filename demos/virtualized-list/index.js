let _list = [];
const maxLen = 1000; // 数据总条数
const itemHeight = 50; // 每条高度
let startIndex = 0; // 起始索引
const visibleCount = 20; // 可视区展示条数
const threshold = 10; // 多显示的部分，阈值
let endIndex = startIndex + visibleCount + threshold; // 结束索引
let scrollTop = 0;

for (let i = 0; i < maxLen; i++) {
  _list.push({
    content: `测试数据 ${i}`,
  });
}

const virInner = document.getElementById("virInner");

const onBindScroll = (e) => {
  scrollTop = e.target.scrollTop;
  console.log(scrollTop);
  startIndex = Math.floor(scrollTop / itemHeight);

  const offset = scrollTop - (scrollTop % itemHeight);
  /**
   * offset：偏移量，意思是上面的空着的格子的高度
   * 比如 scrollTop 是75的时候，需要让第二个div显示半截
   * startIndex 向下取整，就是`1`，那么offset也要相应的调整，为75 - 75 % 50 = 50
   */
  virInner.style.transform = `translateY(${offset}px)`;
  realFill();
};

const firstFill = () => {
  realFill();
};

const realFill = () => {
  endIndex = startIndex + visibleCount + threshold;

  const visibleList = _list.slice(startIndex, endIndex);
  let showListDom = "";
  for (let item of visibleList) {
    showListDom += `<div class='vir_item'>${item.content}</div>`;
  }
  virInner.innerHTML = showListDom;
};

window.onload = function () {
  const wrapDom = document.getElementById("wrap");
  const virWrapDom = document.getElementById("virWrap");

  virWrapDom.style.height = `${maxLen * itemHeight}px`;
  firstFill();
  wrapDom.addEventListener("scroll", onBindScroll);
};
