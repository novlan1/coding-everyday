```ts
function mockListWrap() {
  let time = 0;

  return function (mockData, max) {
    if (time < max) {
      time += 1;
      return {
        ...mockData,
        the_end: 0,
      };
    }
    return {
      ...mockData,
      the_end: 1,
    };
  };
}

// 想要mock的时候这样使用
const mockList = mockListWrap()
const mockData = {}
// 加载10次数据后，就会到底
mockList(mockData, 10)
```