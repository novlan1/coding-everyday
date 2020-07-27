const fs = require('fs')
const alphabetList = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
]
let replaceMarkdown = []
const getCate = function (str) {
  const  _list = str.split('\n')
  let res = []
  let index = 1
  let idx = 0
  _list.map(item => {
    let newItem = item
    if (item.startsWith('####')) {
      newItem = item.replace(/(#+)\s+(.*)/g, `$1 ${alphabetList[idx]}. $2`)
      res.push(newItem)
      idx += 1
    } else if (item.startsWith('###')) {
      newItem = item.replace(/(#+)\s+(.*)/g, `$1 ${index}. $2`)
      res.push(newItem)
      index += 1
      idx = 0
    }
    else {
    }
    replaceMarkdown.push(newItem)
  })

  const res2 = []

  res.map(item => {
    const firstStr = item.replace(/(#+\s+)/g, '')
      // .replace(/¥{2}/g, '`')

    const lastStr = firstStr.replace(/\s/g, '-')
      // .replace(/@{2}/g, '')
      .replace(/[?？.,，。\(\)（）！!、><=*&%\[\]：:`\}\{]/g, '')
      .toLowerCase()

    if (item.startsWith('####')) {
      res2.push(`    - [${firstStr}](#${lastStr})`)

    } else {
      res2.push(`- [${firstStr}](#${lastStr})`)
    }
    
  })
  const totalRes = res2.join('\n') + '\n' + replaceMarkdown.join('\n')
  // fs.writeFileSync('category.txt', res2.join('\n'))
  fs.writeFileSync('newMarkdown.md', totalRes)
}


module.exports = {
  getCate
}