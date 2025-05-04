- [1. 缓存](#1-缓存)
  - [1.1. webpack 中的 hash、chunkhash、contenthash 区别](#11-webpack-中的-hashchunkhashcontenthash-区别)


## 1. 缓存

### 1.1. webpack 中的 hash、chunkhash、contenthash 区别

hash 一般是结合 CDN 缓存来使用，通过 webpack 构建之后，生成对应文件名自动带上对应的 MD5 值。

如果文件内容改变的话，那么对应文件哈希值也会改变，对应的 HTML 引用的 URL 地址也会改变，触发 CDN 服务器从源服务器上拉取对应数据，进而更新本地缓存。但是在实际使用的时候，这几种 hash 计算还是有一定区别。

1. `hash` 　

hash 是跟**整个项目**的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值

2. `chunkhash`

采用 `hash` 计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即 `chunkhash` 。 　　 

`chunkhash` 和 `hash` 不一样，它根据**不同的入口文件**(`Entry`)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。

我们在生产环境里把一些**公共库**和**程序入口文件**区分开，单独打包构建，接着我们采用 `chunkhash` 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

3. `contenthash`

在使用 `chunkhash` 的例子中，如果 `index.css` 被 `index.js` 引用了，那么就会共用相同的 `chunkhash` 值。

但是这样子有个问题，如果 index.js 更改了代码，css 文件就算内容没有任何改变，由于是该模块发生了改变，导致 css 文件会重复构建。

这个时候，我们可以使用 `extra-text-webpack-plugin` 里的 `contenthash` 值，保证即使 css 文件所处的模块里就算其他文件内容改变，只要 css 文件内容不变，那么不会重复构建。

