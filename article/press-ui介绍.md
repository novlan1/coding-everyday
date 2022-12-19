## 1. 组件

组件是前端开发中最重要的内容，一切皆组件，组件封装的好，API友好，可以加快开发进度。


## 2. BEM

关于[BEM]的介绍(https://getbem.com/)可以参考这篇[文章](https://juejin.cn/post/7102980936232337445/)。

我对项目中之前的组件，全部进行了BEM改造，以`press-dialog`为例，改造前：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/12/press_dialog_before_bem.pic.jpg">

改造后：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/12/press_dialog_after_bem.pic.jpg" >


可以看出，可读性大幅增强。

## 3. 项目结构

`press-ui` 的项目目录如下：

```bash
- docs            # 文档地址
- plugin          # [demo]工程用到的插件
- script          # 脚本
- src
  - common        # [demo]公共内容
  - packages      # 对外发布的包内容
  - pages         # [demo]页面内容
  - static        # [demo]静态内容
  - App.vue       # [demo]应用入口
  - main.js
  - pages.json
```

组件库除了组件外，还有文档、demo、工程化配置等部分。为了维护起来方便，将demo、文档、组件都放在一个文件夹里，所以一个标准的组件文件夹目录如下：

```bash
- press-button
  - demo.vue            # 组件demo
  - press-button.vue    # 组件
  - README.md           # 组件文档
```

`src/packages`下就是由这些组件文件夹和一些公共文件构成。

上面的组织结构并不能直接用，还需要把`README.md`移动到`docs`中，把`demo.vue`移动到`src/pages`中。这里我写了脚本用来监听这些文件变动，发生变动后就把它们拷贝到需要的位置上，命令为`npm run docs:watch`。



## 4. 组件设计


### 4.1. vant

大部分组件都是基于vant的，vant用户多、使用量大，经过市场验证，其健壮性、稳定性有保证。

此外，vant的h5版本和小程序大部分api是一致的，press-ui只需要抹平少部分差异。

如何将一个vant组件快速迁移成一个跨端组件呢？

其实uni-app有个插件做了这个事情，它会把vant-weapp组件转成vue组件，也就是合并了 js、wxml、wxss、json 四个文件到一个 Vue 文件中。只是这个 Vue 组件并不是独立的，它必须依附于uni-app改造的Vue运行时才可以，这里我把这些非Vue原生的部分全部转成Vue原生的，让它做到真正的跨端。


### 4.2. 项目基础组件

一部分组件来自于项目本身，这些组件设计的不是很好，扩展性不足，比如popup只有下面弹出的，遇到横屏，才匆匆忙忙加上右边弹出的。这种遇到需求再去改变组件的模式，注定组件的不稳定。

对于这部分组件，目前的规划是尽量将他们统一到vant组件中去，想办法扩充属性，如果vant组件无法支持，则暂时保留原有组件。


### 4.3. 4.3 项目业务组件

业务组件也可以介入，只要保证独立性。


## 5. 新组件一键接入


```
npm run new:comp
```

然后交互式的输入组件英文名、中文名等内容即可。

为了维护方便，内部会有一个`comp-config.json`文件，保存了所有的组件信息，包括名称、类型等。文档和Demo的路由配置都是从这个文件生成。

这样的好处是要删除一个组件时，只要改变这个配置文件，然后执行`npm run gen:config`即可，同理，对于组件名称变动、类型变动也是一样的。

这个配置文件相当于一个收口，可以很方便的管理文档和Demo。




## 一些问题


### children循环引用

循环引用的对象不要放在`data/computed`中，直接在`created`中声明，比如`press-tabs`中的`children`。

### 跨组件通信

vant-weapp用的是reletion，press-ui用的是provide/inject，也可以用eventBus。



