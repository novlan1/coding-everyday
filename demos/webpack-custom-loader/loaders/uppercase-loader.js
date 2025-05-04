module.exports = function (src) {
    if (src) {
        console.log('--- uppercase-loader input:', src);
        src = src.charAt(0).toUpperCase() + src.slice(1);
        console.log('--- uppercase-loader output:', src);
    }

    // 这里为什么要这么写？因为直接返回转换后的字符串会报语法错误，
    // 这么写import后转换成可以使用的字符串
    const res = `module.exports = '${src}'`;
    console.log('--- res:', res);
    return res;
};
