css 文件打包

每个组件引用的css都是 css/index.scss 的路径，所以子组件展平放在src目录下，不能嵌套。

打包流程里，需要 rollup-plugin-copy 等插件：

```ts
plugins.push(
  staticImport({
    include: ['src/**/css/css.mjs'],
  }),
  ignoreImport({
    include: ['**/*.scss', '**/*.css'],
    body: 'import "./css/css.mjs";',
  }),

  copy({
    targets: [
      {
        src: 'src/**/css/index.js',
        dest: 'es',
        rename: (name, extension, fullPath) => {
          const result = `${fullPath.substring(4, fullPath.length - 8)}css.mjs`;
          return result;
        },
        transform(contents, name) {
          return contents.toString().replace('index.scss', 'index.css');
        },
      },
    ],
    verbose: true,
  }),
  // 一些不需要 css 的组件，强行注入一个空文件
  copy({
    targets: [
      {
        src: 'script/utils/rollup-empty-input.css',
        dest: [
          'es/press-overlay/css',
        ],
        rename: 'index.css',
      },
    ],
    verbose: true,
  }),
);
```

如果公共的组件被打包到公共 `chunk` 中，`css` 文件会找不到。因为它被注入的也是 `import "./css/css.mjs`，而 `chunk` 目录没有 `css/css.mjs`，导致使用报错。解决办法是，利用 `chunkFileNames`，根据 `module` 名称，改变存放路径。

```ts
const config = {
   output: {
    chunkFileNames(chunkInfo) {
      const moduleIds = Object.keys(chunkInfo.modules);
      const reg = /\/(press-[\w-]+)\.vue$/;
      const vueFile = moduleIds.find(item => reg.test(item));
      if (vueFile) {
        const match = vueFile.match(reg);
        return `${match[1]}/dep-[hash].js`;
      }
      return '_chunks/dep-[hash].js';
    },
  },
}
```
