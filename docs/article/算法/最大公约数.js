function getGreatCommonDivider(a,b) {
  while (b) {
    [a,b] = [b, a % b]
  }
  return a;
}

console.log(getGreatCommonDivider(4,6))

// a b
// 4 6
// 6 4
// 4 2
// 2 0
