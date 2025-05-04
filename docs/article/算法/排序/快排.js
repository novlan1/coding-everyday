function quickSort(list = []) {
  if (list.length <= 1) {
    return list;
  }
  const base = list[0];
  const left = [];
  const right = [];
  const middle = [];

  list.forEach(item => {
    if (item < base) {
      left.push(item);
    } else if (item > base) {
      right.push(item);
    } else {
      middle.push(item);
    }
  });
  return [
    ...quickSort(left),
    ...middle,
    ...quickSort(right),
  ];
}
const list = [7, 1, 3, 5, 1, 54, 6, 1, 3, 6, 1, 45, 2];
console.log(quickSort(list));
