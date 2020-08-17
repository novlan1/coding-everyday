- [1. Loader](#1-loader)
- [2. 打包静态资源](#2-打包静态资源)
  - [2.1. 打包图片](#21-打包图片)
    - [2.1.1. file-loader](#211-file-loader)
      - [2.1.1.1. 配置项](#2111-配置项)
    - [2.1.2. url-loader](#212-url-loader)
  - [2.2. 打包样式](#22-打包样式)
    - [2.2.1. 使用 sass](#221-使用-sass)
    - [2.2.2. 厂商前缀 postcss-loader](#222-厂商前缀-postcss-loader)
    - [2.2.3. importLoaders](#223-importloaders)
    - [2.2.4. CSS modules](#224-css-modules)
  - [2.3. 打包字体](#23-打包字体)
  - [自定义 loader](#自定义-loader)
    - [获得 Loader 的 options](#获得-loader-的-options)

## 1. Loader

当打包到非 JS 文件的时候，webpack 会在`module`中配置里查找，然后根据`rules`中的`test`选择一个 loader 来处理。

## 2. 打包静态资源

### 2.1. 打包图片

#### 2.1.1. file-loader

当发现是图片，使用 file-loader 来打包。 file-loader 做的事：

- 将图片移到 dist 目录下
- 给图片改个名字
- 将名字返回给引入模块的变量中

```js
module: {
    rules: [{
        test: /\.jpg$/,
        use: {
            loader: 'file-loader'
        }
    }]
},
```

##### 2.1.1.1. 配置项

让图片打包出来的名字与拓展名与原来一样 `'[name].[ext]'` 这种语法叫 `placehoder` 即占位符

```js
rules: [
  {
    test: /\.jpg$/,
    use: {
      loader: "file-loader",
      // option 为配置参数
      options: {
        // 图片打包出来的名字和后缀原来的一样
        name: "[name]_[hash].[ext]",
      },
    },
  },
];
```

#### 2.1.2. url-loader

将文件打包为 Base64 编码，当图片特别小（1~2k）的时候适用。

但是大图片不使用，可以给它加上一个`limit`来限制

```js
rules: [
  {
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: "url-loader",
      // option 为配置参数
      options: {
        limit: 2048,
      },
    },
  },
];
```

### 2.2. 打包样式

```js
{
    test: /\.css$/,
    // 一种文件多个Loader就使用数组
    use: [
        'style-loader', 'css-loader'
    ]
}
```

- `css-loader` 能帮我们分析出几个 CSS 文件之间的关系
- `style-loader` 在得到 css-loader 生成的文件后，style-loader 会将这段样式挂在到 header 标签中

#### 2.2.1. [使用 sass](https://webpack.js.org/loaders/sass-loader/)

loader 是**有顺序**的，顺序是：从数组的最后一个依次向前处理。

```js
use: [
  "style-loader", // creates style nodes from JS strings
  "css-loader", // translates CSS into CommonJS
  "sass-loader", // compiles Sass to CSS, using Node Sass by default
];
```

#### 2.2.2. [厂商前缀 postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

```js
use: [
  "style-loader", // creates style nodes from JS strings
  "css-loader", // translates CSS into CommonJS
  "postcss-loader", // compiles Sass to CSS, using Node Sass by default
];
```

它可以进行配置，要创建一个`postcss.config.js`文件

```js
module.exports = {
  plugins: [require("autoprefixer")],
};
```

`autoprefixer`这个插件可以帮我们添加厂商前缀

#### 2.2.3. importLoaders

在 sass 文件中又 使用`@import`的方式去引入了其他文件，可能就会导致在打包时直接走 css-loader，而不会去走下面的两个 loader

`importLoaders`就是让`@import`方式引入方式的文件也走下面的两个 loader

```js
use: [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
    },
  },
  "sass-loader",
  "postcss-loader",
];
```

#### 2.2.4. CSS modules

css-loader 直接将其打包注入到 header 中，可能造成 CSS 的干扰。即一个文件中引入了一个 CSS，其他地方都会受到影响

解决方法是配置`modules`：

```js
{
    loader: "css-loader",
    options:{
        importLoaders: 2,
        modules: true
    }
},
```

引入样式时使用 `style.className` 方式：

```js
import style form './style.sass'
// 添加样式

const img = new Image();
img.src = girl;

img.classList.add(style.girl)
```

### 2.3. 打包字体

打包时如果有字体文件的话打包又会报错，因为不认识字体文件。而对字体文件的打包只需要`file-loader`就可以了

```js
{
    test: /\.(eot|ttf|svg)$/,
    use: {
        loader: 'file-loader'
    }
}
```

### 自定义 loader

`loader.js`：

```js
const loaderUtil = require("loader-utils");

function loader(source) {
  const options = loaderUtil.getOptions(this) || {};
  source = source.replace(/111/g, "222" + (options.year || ""));
  return source;
}

module.exports = loader;
```

`uppercase-loader.js`：

```js
module.exports = function (src) {
  if (src) {
    src = src.charAt(0).toUpperCase() + src.slice(1);
  }

  // 这里为什么要这么写？因为直接返回转换后的字符串会报语法错误，
  // 这么写import后转换成可以使用的字符串
  return `module.exports = '${src}'`;
};
```

`webpack.config.js`：

```js
const path = require("path");
const getLoaderPath = (loaderPath) => {
  return path.resolve(__dirname, "loaders", loaderPath);
};

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: getLoaderPath("loader"),
        options: {
          year: "2020",
        },
      },
      {
        test: /\.txt/,
        use: [
          getLoaderPath("uppercase-loader.js"),
          getLoaderPath("reverse-loader.js"),
        ],
      },
    ],
  },
};
```

#### 获得 Loader 的 options

```js
const loaderUtils = require('loader-utils');
  module.exports = function(source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
```
