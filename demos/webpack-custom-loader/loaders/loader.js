const loaderUtil = require('loader-utils');


function loader(source) {
  const options = loaderUtil.getOptions(this) || {};

  source = source.replace(/111/g, `222${options.year || ''}`);
  return source;
}

module.exports = loader;

