const fs = require('fs')
const getCate = function (str) {
  const  _list = str.split('\n')
  let res = []
  _list.map(item => {
    if (item.startsWith('###')) {
      res.push(item)
    }
  })

  const res2 = []
  let idx = 1

  res.map((item, index) => {
    const firstStr = item.replace(/(#+\s+)/g, '')
      .replace(/¥{2}/g, '`')

    const lastStr = firstStr.replace(/\s/g, '-')
      .replace(/@{2}/g, '')
      .replace(/[?？.,，。\(\)（）！!、><=*&%\[\]:`\}\{]/g, '')
      .toLowerCase()

    if (item.startsWith('####')) {
      res2.push(`    ${idx}. [${firstStr}](#${lastStr})`)
      idx += 1

    } else {
      res2.push(`${index+1}. [${firstStr}](#${lastStr})`)
      idx = 1
    }
    
  })
  fs.writeFileSync('category.txt', res2.join('\n'))
}


module.exports = {
  getCate
}