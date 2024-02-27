// 10进制转16进制
function int2Hex(num) {
  if (num == 0){
    return '0'
  }
  const HEXS = '0123456789abcdef'
  let hex = '';
  while (num) {
    hex = HEXS[num % 16] + hex;
    num = Math.floor(num / 16)
  }
  return hex;
}

console.log(int2Hex(16))
console.log(int2Hex(32))
console.log(int2Hex(31))
console.log(int2Hex(15))

// 10进制转2进制
function int2Binary(num) {
  if (num == 0) {
    return '0'
  }
  const NUMBERS = '01'
  let result = ''
  while (num) {
    result = NUMBERS[num % 2]+ result;
    num = Math.floor(num / 2)
  }
  return result;
}


console.log(int2Binary(2))
console.log(int2Binary(5))
console.log(int2Binary(16))
console.log(int2Binary(0))

// 2进制转10进制
function binary2Int(num) {
  const str = '' + num;
  return str.split('').reduce((acc, item, index) => {
    
    acc += 2 ** (str.length - index - 1) *item;
    console.log('acc', acc)
    return acc;
  }, 0)
}

  
console.log(binary2Int(10000))
console.log(binary2Int(101))
console.log(binary2Int(111))