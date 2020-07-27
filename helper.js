const { getCate } = require('./utils')
const fs = require('fs')

const content = fs.readFileSync('./rawMarkdown.md').toString()

// console.log(content.toString())
getCate(content)