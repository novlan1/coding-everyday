## Jest配置文件

jest.config.js
```js
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  moduleFileExtensions: [
    'js', 
    'jsx', 
    'json', 
     // 告诉 Jest 处理 `*.vue` 文件
    'vue'
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',

  },
  moduleNameMapper: {
    // 路径别名，@ => src
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: ['src/utils/**/*.{js,vue}', '!src/utils/auth.js', '!src/utils/request.js', 'src/components/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  // 'collectCoverage': true,
  coverageReporters: [
    'lcov',
    'text-summary',
  ],
  testURL: 'http://localhost/',
};
```

- `transform`
简单地说就是一种转换器配置


-  `testEnvironment`
测试环境。
```js
"testEnvironment": "jsdom"
```
表示它是一个类浏览器的测试环境，我们可以使用浏览器环境中的一些 API。

- `testRegex`
要测试文件的正则表达式。

```
"testRegex": "/test/.*\\.(test|spec)\\.(ts)$"
```


- `moduleFileExtensions`
模块文件扩展名，当你去引入一个模块并没有指定扩展名的时候，它会依次尝试去添加这些扩展名去找你引入的模块文件。
```json
"moduleFileExtensions": [
  "ts",
  "tsx",
  "js"
]
```
表示优先找 .ts 的模块、然后是 .tsx，最后是 .js。

- `coverageThreshold`
测试覆盖率的阈值设定，当我们的测试覆盖率达不到阈值的时候，测试会失败。
```js
"coverageThreshold": {
  "global": {
    "branches": 90,
    "functions": 95,
    "lines": 95,
    "statements": 95
  }
}
```
表示全局的代码分支覆盖率要达到 90%，方法覆盖率要达到 95%，代码行数覆盖率达到 95%，声明覆盖率达到 95%。

- `collectCoverageFrom`
收集指定文件的测试覆盖率(即使你没为这些文件编写测试)，它的值为 `glob patterns` 类型。
```js
"collectCoverageFrom": [
  "src/*.{js,ts}",
  "src/**/*.{js,ts}"
]
```
表示收集 src 目录以及它的所有子目录中的 js 和 ts 文件的测试覆盖率。

- `setupFilesAfterEnv`
测试框架安装后立即执行的代码文件列表。
```js
"setupFilesAfterEnv": [
  "<rootDir>/test/boot.ts"
]
```

表示每次跑具体测试代码之前会先运行 `<rootDir>/test/boot.ts` 中的代码，`<rootDir>` 表示当前项目的根目录。这个配置在之后的章节我们会具体介绍。


`babel.config.js`


```js
module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
    }, 'vant'],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', {
        targets: {
          node: 'current',
        },
      }]],
      plugins: [
        ['import', {
          libraryName: 'vant',
          style: false,
        }, 'vant'],
      ],
    },
  },
};
```
1. 如果报 `import` 导入错误的话，设置`@babel/preset-env`
2. 如果报导入 `vant` 的 `css` 错误的话，配置`babel-plugin-import`，可能 `jest` 不支持 `css` 的按需加载。
3. 如果`Eslint`报`describe/it/expect`这些函数都是`undefined`的话，`.eslintrc.js`文件添加如下设置：
```js
env: {
  jest: true
}
```




