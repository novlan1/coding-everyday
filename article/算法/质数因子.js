function getPrimeFactor(num) {
  let divider = 2;
  const res = []

  while (num>=2) {
    if (num % divider == 0 ) {
      res.push(divider)
      num = num / divider
    } else {
      divider += 1;
    }
  }

  return res
}

console.log(getPrimeFactor(180))
console.log(getPrimeFactor(150))
console.log(getPrimeFactor(151))