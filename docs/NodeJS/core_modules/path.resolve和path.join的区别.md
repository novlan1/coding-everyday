- [1. path.resolve和path.join的区别](#1-pathresolve和pathjoin的区别)
  - [1.1. 区别](#11-区别)
  - [1.2. path.join()](#12-pathjoin)
  - [1.3. path.resolve()](#13-pathresolve)

## 1. path.resolve和path.join的区别

### 1.1. 区别

**path.join只是简单的将路径片段进行拼接**，并规范化生成一个路径，而p**ath.resolve则一定会生成一个绝对路径，相当于执行cd操作**。


### 1.2. path.join()

- path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
- 长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
- 注意：如果路径中出现".."，那么它前面的路径片段将被丢失。

“平台特定的分隔符”：

- windows下文件路径分隔符使用的是"\\"
- Linux下文件路径分隔符使用的是"/"

比如：

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');  // 返回: '/foo/bar/baz/asdf'
```


### 1.3. path.resolve()

- path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
- 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
- **如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上**。
- **生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录**。
- 长度为零的 path 片段会被忽略。
- 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

举例：

```js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'
// 如果是path.join的话，就会返回/foo/bar/tmp/file

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```