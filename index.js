function objectFlat(obj = {}) {
  const res = {};

  _objectFlat(obj, res);
  return res;
}

function _objectFlat(item, res, preKey = "") {
  Object.entries(item).forEach(([key, val]) => {
    const newKey = preKey ? `${preKey}.${key}` : key;
    if (val && typeof val === "object") {
      _objectFlat(val, res, newKey);
    } else {
      res[newKey] = val;
    }
  });
}

// 测试
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(objectFlat(source));
