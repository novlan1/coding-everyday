使用 pnpm wrokspace 改造 plugin-light。


## 一些命令

### -w

-w, --workspace-root 表示在workspace的根目录下安装而不是当前的目录

比如

```
pnpm i -Dw rollup
```

### --filter

pnpm 提供了 --filter 参数，可以用来对特定的package进行某些操作

如果想给 pkg1 安装一个依赖包，比如 axios

```bash
pnpm add axios --filter @xxx/pkg1
```
需要注意的是，--filter 参数跟着的是package下的 package.json 的 name 字段，并不是目录名。

关于 --filter 操作其实还是很丰富的，比如执行 pkg1 下的 scripts 脚本：

```bash
pnpm build --filter @xxx/pkg1
```

filter 后面除了可以指定具体的包名，还可以跟着匹配规则来指定对匹配上规则的包进行操作

```bash
pnpm build --filter "./packages/**"
```

此命令会执行所有 package 下的 build 命令。

### -r, --recursive

在工作区的每个项目中运行命令

### 模块之间的相互依赖 

基于 pnpm 提供的 workspace:协议，可以方便的在 packages 内部进行互相引用。比如在 pkg1 中引用 pkg2：


```bash
pnpm install @xxx/pkg2 -r --filter @xxx/pkg1
```

此时我们查看 pkg1 的 package.json，可以看到 dependencies 字段中多了对 @xxx/pkg2 的引用，以 workspace: 开头，后面跟着具体的版本号。

```json
{
  "name": "@xxx/pkg1",
  "version": "1.0.0",
  "dependencies": {
    "@xxx/pkg2": "workspace:^1.0.0",
    "axios": "^0.27.2"
  }
}
```

在设置依赖版本的时候推荐用 workspace:*，这样就可以保持依赖的版本是工作空间里最新版本，不需要每次手动更新依赖版本。

当 pnpm publish 的时候，会自动将 package.json 中的 workspace 修正为对应的版本号。




参考：

- https://juejin.cn/post/7098609682519949325
- https://developer.baidu.com/article/details/3219676

