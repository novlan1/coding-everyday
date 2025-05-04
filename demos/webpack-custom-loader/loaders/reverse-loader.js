module.exports = function (src) {
  if (src) {
      console.log('--- reverse-loader input:', src);
      src = src.split('').reverse().join('');
      console.log('--- reverse-loader output:', src);
  }

  return src;
};
