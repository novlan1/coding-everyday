import json from 'rollup-plugin-json';

export default {
  input: 'index.js',
  output: {
    file: './dist/distByConfig.js',
    format: 'cjs',
  },
  plugins: [json()]
};

