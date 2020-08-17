const path = require('path')
const getLoaderPath = (loaderPath) => {
  return path.resolve(__dirname, 'loaders', loaderPath)
}

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: getLoaderPath('loader'),
        options: {
          year: '2020'
        }
      },
      {
        test: /\.txt/,
        use: [
          getLoaderPath('uppercase-loader.js'),
          getLoaderPath('reverse-loader.js'),
        ]
      }
    ]
  }
}
