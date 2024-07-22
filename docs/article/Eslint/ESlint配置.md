## 一、`.eslintrc.js`

```js
module.exports = {
  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  root: true,
  // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    ecmaVersion: 2019,
    // ECMAScript modules 模式
    sourceType: 'module',
    ecmaFeatures: {
      // 不允许 return 语句出现在 global 环境下
      globalReturn: false,
      // 开启全局 script 模式
      impliedStrict: true,
      jsx: true
    },
    // 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
    requireConfigFile: false,
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false
  },
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境和node环境
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
    mongo: true,
  },
  // 脚本在执行期间访问的额外的全局变量
  globals: {
    "$": true,
    app: true,
  },
   // 此项是用来提供插件的，插件名称可以省略前缀eslint-plugin-，下面这个配置是用来规范html的
  plugins: [
    'html',
    'import', // eslint-plugin-import
    'vue-',
    "flow-vars", 
    "react"
  ],
  /**
   * 继承已有规则
   * extends 属性值可以是：
   * 1. 指定配置的字符串(配置文件的路径、可共享配置的名称、eslint:recommended 或 eslint:all); 
   * 2. 字符串数组：每个配置继承它前面的配置
   */
  extends: [
    './base.js', // 从文件继承
    './import.js',
    'standard', // 流行的风格指南
    'eslint:recommended', // 推荐规则
    'eslint:all', // 所有核心规则
    /**
     * extends如果是plugin的写法 
     * 1. plugin:
     * 2. 包名 (省略了前缀，比如，react)
     * 3. /
     * 4. 配置名称 (比如 recommended)
     */
    'plugin:react/recommended', 
    'plugin:vue/recommended',
  ],
  rules:{
   /**
    * 不要在中括号中添加空格 
    */
  'array-bracket-spacing': [
    "error",
    "never"
  ],
}
```


## 二、`.eslintignore`

```js
# Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

除了 `.eslintignore` 文件中的模式，ESLint总是忽略 `/node_modules/*` 和 `/bower_components/*` 中的文件。


参考：https://eslint.bootcss.com/