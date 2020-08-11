/**
 * @param {object|array|number|string} val - 待format的数据
 * @return nothing
 */
function format(val) {
  // TODO
  const thisType = typeof(val)
  if (thisType  === 'number') {
    return String(val)
  }
  if (thisType  === 'string') {
    return `"${val}"`
  }
  if (Array.isArray(val)) {
    let res = '['
    for (let item of val) {
      res += format(item)
      res += ','
    }
    // // if (val.length === 1) {
    //   return `[${val.toString()}]`
    // // }
    res += ']'
    return res;
   }

  let res = '{'
  for (let item in val) {
    res += `"${item}":`
    res += format(val[item])

  }
  res += '}'
  return res
}

// test case
const data = {
  a: 1,
  b: [
    2,
    3,
    {
      c: 4
    }
  ],
  d: {
    e: 5,
    f: {
      g: '6'
    },
  }
}
 
const res = format(data)
console.log(res)
/*
将在控制台中打印出
{
  "a": 1,
  "b": [
    2,
    3,
    {
      "c": 4
    }
  ],
  "d": {
    "e": 5,
    "f": {
      "g": "6"
    },
  }
}
*/

