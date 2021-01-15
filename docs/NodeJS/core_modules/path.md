- [1. path](#1-path)
    - [1.0.1. `normalize`、`join`、`resolve`](#101-normalizejoinresolve)
    - [1.0.2. basename、dirname、extname](#102-basenamedirnameextname)
    - [1.0.3. parse 与 format](#103-parse-与-format)
    - [1.0.4. sep、delimiter、win32、posix](#104-sepdelimiterwin32posix)
    - [1.0.5. 关于路径，`__dirname`，`process.cwd()`，`path.resolve()`三者的区别](#105-关于路径__dirnameprocesscwdpathresolve三者的区别)

# 1. path

path 模块提供用于处理文件路径和目录路径的实用工具。

### 1.0.1. `normalize`、`join`、`resolve`

- `path.normalize()` 方法规范化给定的 `path`，解析 '..' 和 '.' 片段。

```js
path.normalize("/foo/bar//baz/asdf/quux/..");
// 返回: '/foo/bar/baz/asdf'
```

- `path.join` 方法使用平台特定分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后生成规范的路径

```js
path.join("/foo", "bar", "baz/asdf", "..");
// 返回: '/foo/bar/baz/asdf'
```

- `path.resolve([...paths])`把一个相对路径解析成一个绝对路径。

```js
[path.join([...paths])](path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif')
```

### 1.0.2. basename、dirname、extname

- basename
  - 文件名.拓展名
- dirname
  - 所在的文件夹
- extname
  - 拓展名是什么

```
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
```

### 1.0.3. parse 与 format

- `parse` 是将字符串形式的文件路径给解析成一个包含 `root`, `dir`, `base`, `name`, `ext` 属性的对象
  - `format` 则是将这个对象代表的路径转成字符串形式，与 parse 相反

如果有了一个路径指向修改其中的一个内容，那么就可以使用 `parse` 转成对象然后修改后使用 `format` 在转成一个新路径。

当为 `pathObject` 提供属性时，注意以下组合，其中一些属性优先于另一些属性：

- 如果提供了 `pathObject.dir`，则忽略 `pathObject.root`。
- 如果 `pathObject.base` 存在，则忽略 `pathObject.ext` 和 `pathObject.name`。

### 1.0.4. sep、delimiter、win32、posix

- `delimiter`提供平台特定的路径分隔符：
  - `Windows` 上是 `;`
  - `POSIX` 上是 `:`
- `sep`提供了平台特定的路径片段分隔符：
  - `Windows` 上是 `\`
  - `POSIX` 上是 `/`
- `path.win32` 属性提供了 `path` 方法针对 `Windows` 的实现;
- `path.posix` 属性提供了 `path` 方法针对 `POSIX` 的实现。

### 1.0.5. 关于路径，`__dirname`，`process.cwd()`，`path.resolve()`三者的区别

- `__dirname`与`__filename`总是返回文件的绝对路径，即物理磁盘上的路径
- `process.cwd()`总是返回执行`node`命令时所在的文件夹路径，当前在哪里启动的脚本路径
- `./`在`require`方法中总是相对当前文件所在文件夹的路径；在其他的地方和`process.cwd()`一样，相对`node`启动文件夹





参考资料：
1. [初学node，你必须懂的几个api](https://www.jianshu.com/p/08e014f786a4?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)