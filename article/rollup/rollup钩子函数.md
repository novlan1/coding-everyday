build阶段的钩子有：

- options：async+sequential类型。可替换或操作传递给rollup.rollup()的选项。返回null的时候将不做任何替换。
- buildStart：async+parallel类型。rollup.rollup()时执行。可以用来查看rollup.rollup的选项，此时完成了选项的处理并且包含了默认值。
- resolveId： async, first类型。解析入口点的ID，或者解析一个import的ID，或者作为动态导入的回调用，还可以通过this.emitFile或者this.resove手动触发。
- load：加载当前处理的文件
- transform：转换加载的文件
- moduleParsed：文件被处理和解析后触发
- resolveDynamicImport：处理动态导入
- buildEnd：async, parallel类型。build阶段的最后一个钩子，如果构建过程中出现任何错误，会传递给此钩子。
- closeBundle：出现构建错误时会在buildEnd后调用，或者执行bundle.close时调用。

generate阶段的钩子的机制和build阶段的钩子相同，但是可以分开执行bundle.generate(outputOptions)或者bundle.write(outputOptions)。

- outputOptions:
- renderStart：在bundle.generate()或者bundle.write()执行时被调用，可以用来访问传递给上述两个方法的选项
- banner/footer：字符串类型或者返回字符串类型的函数。就是output的banner/footer。
- intro
- outro
- renderDynamicImport：动态导入
- augmentChunkHash：增加单个chunk的hash
- resolveFileUrl
- resolveImportMeta
- generateBundle
- writeBundle
- renderError
- 

其他钩子：

- watchChange：可以在任何阶段执行
- closeWatcher：可以在任何阶段执行


rollup中模块(文件)的id就是文件地址，所以类似resolveID这种就是解析文件地址的意思，我们可以返回我们想返回的文件id(也就是地址，相对路径、决定路径)来让rollup加载

rollup.rollup分为以下几步：
- 配置收集、标准化
- 文件分析
- 源码编译，生成ast
- 模块生成
- 依赖解析
- 过滤净化
- 产出chunks

主要通用模块以及含义

- Graph: 全局唯一的图，包含入口以及各种依赖的相互关系，操作方法，缓存等。是rollup的核心
- PathTracker: 无副作用模块依赖路径追踪
- PluginDriver: 插件驱动器，调用插件和提供插件环境上下文等
- FileEmitter: 资源操作器
- GlobalScope: 全局作用局，相对的还有局部的
- ModuleLoader: 模块加载器
- NodeBase: ast各语法(ArrayExpression、AwaitExpression等)的构造基类

