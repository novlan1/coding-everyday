

安装包，TTT代表某公司:

```json
"@babel/preset-react": "^7.14.5",
"@TTT/eslint-config-TTT": "^0.16.0",
"@typescript-eslint/eslint-plugin": "^4.29.3",
"@typescript-eslint/parser": "^4.29.3",
"eslint": "^7.32.0",
"eslint-plugin-jest": "^24.5.2",
"eslint-plugin-react": "^7.26.1",
"eslint-plugin-react-hooks": "^4.2.0",
"eslint-plugin-vue": "^7.18.0",
"vue-eslint-parser": "^7.10.0"
```

.eslintrc.js文件：

```js
const vueConfig = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended'],
};
const baseConfig = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', '@TTT/eslint-config-TTT'],
};
const tsConfig = {
  parser: '@typescript-eslint/parser',
  extends: ['@TTT/eslint-config-TTT/ts'],
  plugins: ['@typescript-eslint'],
};
const jestConfig = {
  extends: ['plugin:jest/recommended'],
};
const reactConfig = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'], // 使用推荐的React代码检测规范
  env: {
    browser: true,
    node: true,
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
};

module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    app: true,
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: ['*.test.js', '*.spec.js'],
      ...baseConfig,
    },
    {
      files: ['*.ts'],
      excludedFiles: ['*.test.ts', '*.spec.ts'],
      ...baseConfig,
      ...tsConfig,
    }, {
      files: ['*.vue'],
      ...baseConfig,
      ...vueConfig,
    }, {
      files: ['*.test.js', '*.spec.js'],
      ...baseConfig,
      ...jestConfig,
    }, {
      files: ['*.test.ts', '*.spec.ts'],
      ...baseConfig,
      ...tsConfig,
      ...jestConfig,
    }, {
      files: ['*.jsx'],
      excludedFiles: ['*.test.jsx', '*.spec.jsx'],
      ...reactConfig,
      ...baseConfig,
    }, {
      files: ['*.tsx'],
      excludedFiles: ['*.test.tsx', '*.spec.tsx'],
      ...reactConfig,
      ...baseConfig,
      ...tsConfig,
    }],

};
```