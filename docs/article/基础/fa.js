function fa(n) {
  if (n == 1) {
    return 1;
  }
  return n * fa(n - 1);
}


function fa2(n) {
  let res = 1;
  for (let i = 1; i < n + 1; i++) {
    res = res * i;
  }
  return res;
}


function fn(n) {
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 1;
  }
  return fn(n - 2) + fn(n - 1);
}


function fn2(n) {
  const list = [1, 1, 2, 3];
  for (let i = 2;i < n;i++) {
    list[i] = list[i - 2] + list[i - 1];
  }
  return list[n - 1];
}


module.exports = {
  fa,
  fa2,
  fn,
  fn2,
};
