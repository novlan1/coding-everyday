const path = require('path');

module.exports = {
    // 模式为生产模式
    mode: 'production',
    entry: {
        app: './index2.js'
    },
    // 打包后的文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 关闭webpack 自动压缩 混淆 代码
    optimization: {
        minimize: false, // <---- 禁用 uglify.
    },
    module: {
        rules: [
            {
                // 所有的js 都进过 babel-loader 处理
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/',
            }
        ]
    }
};
