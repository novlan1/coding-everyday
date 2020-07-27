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

  res.map(item => {
    const firstStr = item.replace(/(#+\s+)/g, '')
      .replace(/¥{2}/g, '`')

    const lastStr = firstStr.replace(/\s/g, '-')
      .replace(/@{2}/g, '')
      .replace(/[?？.,，。\(\)（）！!、><=*&%\[\]:`\}\{]/g, '')
      .toLowerCase()

    if (item.startsWith('####')) {
      res2.push(`  1. [${firstStr}](#${lastStr})`)

    } else {
      res2.push(`1. [${firstStr}](#${lastStr})`)
    }
    
  })
  fs.writeFileSync('category.txt', res2.join('\n'))
}


module.exports = {
  getCate
}