(window.webpackJsonp=window.webpackJsonp||[]).push([[394],{666:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("[toc]")]),t._v(" "),s("h2",{attrs:{id:"_1-背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-背景"}},[t._v("#")]),t._v(" 1. 背景")]),t._v(" "),s("p",[t._v("uni-app对JS文件的打包策略有提升空间，对于多个分包使用的JS会放到主包中，这会让主包变得特别大。因此需要将只有分包使用的JS文件转移到分包中，下面介绍下这个 webpack 插件的实现。这个插件不是我写的，这里仅是分享下我的理解。")]),t._v(" "),s("h2",{attrs:{id:"_2-实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现原理"}},[t._v("#")]),t._v(" 2. 实现原理")]),t._v(" "),s("p",[t._v("对于JS文件，有以下几种情况：")]),t._v(" "),s("ol",[s("li",[t._v("主包js => 一个分包在用，uni已经处理好了，会被打包到分包中，不用处理")]),t._v(" "),s("li",[t._v("主包js => 多个分包在用，uni把js已经放到主包，需要清除uni的副作用，把主包的删了，然后放到各个分包去")]),t._v(" "),s("li",[t._v("主包js => 主包组件 => 分包页面，uni判断只要主包组件在使用，就放到主包，需要将这个文件迁移到分包里")]),t._v(" "),s("li",[t._v("主包js => 主包组件 => 主包页面，不用处理")])]),t._v(" "),s("p",[t._v("本插件处理的是第二种情况。")]),t._v(" "),s("p",[t._v("实现的话，分两步，先在"),s("code",[t._v("compilation.hooks.optimizeChunksAdvanced")]),t._v("钩子中收集需要移动的文件，然后在"),s("code",[t._v("compilation.hooks.optimizeChunkModules")]),t._v("钩子中移动打包文件。")]),t._v(" "),s("h2",{attrs:{id:"_3-实现代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-实现代码"}},[t._v("#")]),t._v(" 3. 实现代码")]),t._v(" "),s("p",[t._v("如何收集要移动的文件呢，可以从 "),s("code",[t._v("compilation.modules")]),t._v(" 过滤出vue文件，就是一个个module，然后获取这些 module 的 chunks，找到这些 chunks 对应的分包，如果有分包在使用，但是主包没在使用，就把它放入 moveFiles 中。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("compilation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hooks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("optimizeChunksAdvanced"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SplitUtilPlugin'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" waitDisposeModules "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" compilation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("modules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("module")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseTest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  waitDisposeModules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("module")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" chunks "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getChunks")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" matchSubPackages "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findSubPackages")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" isMain "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hasMainPackage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 有分包在使用，但是主包没有使用，包含了上面的情况2")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matchSubPackages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("isMain"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("moveFiles"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resource"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("pkgSet")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" matchSubPackages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("找到chunks对应的分包：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" subPackageRoots "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("keys")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("UNI_SUBPACKAGES")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("root"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("findSubPackages")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("reduce")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pkgs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("normalizePath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pkgRoot "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" subPackageRoots"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    pkgRoot "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" pkgs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pkgRoot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" pkgs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("判断chunks是否有主包在使用，就是判断是否是所有用它的包都是分包：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("hasMainPackage")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("subPackageRoots"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("如何移动 module 呢？遍历 modules，如果某个 module 存在于 moveFiles 中，调用 module.getChunks 获取它的所有 chunks，如果只有 common/vendor 中包含这个 module，说明这个需要被放到分包中，并将 common/vendor 中的移除。")]),t._v(" "),s("p",[t._v("这里面有几个核心API：")]),t._v(" "),s("ul",[s("li",[t._v("GraphHelpers.disconnectChunkAndModule(chunk, module)，将一个 module 从 chunk 中移除")]),t._v(" "),s("li",[t._v("GraphHelpers.connectChunkAndModule(chunk, module)，将一个 module 放入 chunk 中")]),t._v(" "),s("li",[t._v("compilation.addChunkInGroup(chunkName)，创建一个新 chunkGroup")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[t._v("compilation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hooks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("optimizeChunkModules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SplitUtilPlugin'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" modules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  modules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("moveFiles"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("has")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mainChunks "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getChunks")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果不存在主包的common/vendor中，说明已经被uni放入分包了，就不需要做任何处理")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mainChunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" mainChunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VENDER_PATH")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mainChunk "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mainChunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" moveFileInfo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("moveFiles"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" chunkNames "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        moveFileInfo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pkgSet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          chunkNames"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("normalizePath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VENDER_PATH")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        chunkNames"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunkName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pkgChunk "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findNameChunk")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" chunkName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("pkgChunk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新建一个chunk")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" group "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" compilation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addChunkInGroup")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunkName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            pkgChunk "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" group"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 从之前chunk移除，也就是common/vendor")]),t._v("\n          GraphHelpers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("connectChunkAndModule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pkgChunk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加到分包chunk中")]),t._v("\n        GraphHelpers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("disconnectChunkAndModule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mainChunk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("findNameChunk就是从chunks中根据名字找到对应的chunk：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("findNameChunk")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" chunks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("chunk "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" chunk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"_4-效果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-效果"}},[t._v("#")]),t._v(" 4. 效果")]),t._v(" "),s("p",[t._v("JS分发到分包之前，主包大小为 2.48M：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/8/uni-app-bundle-week-2.4.png",width:"380"}}),t._v(" "),s("p",[t._v("优化后，主包大小为 1.97M，减小了 0.51M：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/8/uni-app-bundle-week-2.5.png",width:"380"}}),t._v(" "),s("h2",{attrs:{id:"_5-小结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-小结"}},[t._v("#")]),t._v(" 5. 小结")]),t._v(" "),s("ol",[s("li",[t._v("optimizeChunksAdvanced 钩子中寻找需要处理的 module，以及该 module 对应的分包。")]),t._v(" "),s("li",[t._v("optimizeChunkModules 钩子中从 common/vendor 移除之前的 module，然后移动到分包的 chunk 中。")])]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("后面有一些优化，这里记录下。")]),t._v(" "),s("p",[t._v("增加了自动分析JS依赖的功能，也就是对于一个JS文件，可以判断有哪些分包使用，这样就可以处理上面讲的第3种情况了，也就是")]),t._v(" "),s("blockquote",[s("p",[t._v("主包js => 主包组件 => 分包页面")])]),t._v(" "),s("p",[t._v("只需要配置需要移动的JS文件列表，就可以自动移JS。")]),t._v(" "),s("h2",{attrs:{id:"_6-附录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-附录"}},[t._v("#")]),t._v(" 6. 附录")]),t._v(" "),s("h3",{attrs:{id:"_6-1-compiler-hooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-compiler-hooks"}},[t._v("#")]),t._v(" 6.1. Compiler Hooks")]),t._v(" "),s("p",[t._v("构建器实例的生命周期可以分为 3 个阶段：")]),t._v(" "),s("ul",[s("li",[t._v("初始化阶段")]),t._v(" "),s("li",[t._v("构建过程阶段")]),t._v(" "),s("li",[t._v("产物生成阶段。")])]),t._v(" "),s("p",[t._v("下面我们就来大致介绍下这些不同阶段的 Hooks，文档地址在这里：https://www.webpackjs.com/api/compiler-hooks/")]),t._v(" "),s("h4",{attrs:{id:"_6-1-1-初始化阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-1-初始化阶段"}},[t._v("#")]),t._v(" 6.1.1. 初始化阶段")]),t._v(" "),s("ul",[s("li",[t._v("environment、afterEnvironment：在创建完 compiler 实例且执行了配置内定义的插件的 apply 方法后触发。")]),t._v(" "),s("li",[t._v("entryOption、afterPlugins、afterResolvers：在 WebpackOptionsApply.js 中，这 3 个 Hooks 分别在执行 EntryOptions 插件和其他 Webpack 内置插件，以及解析了 resolver 配置后触发。")])]),t._v(" "),s("h4",{attrs:{id:"_6-1-2-构建过程阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-2-构建过程阶段"}},[t._v("#")]),t._v(" 6.1.2. 构建过程阶段")]),t._v(" "),s("ul",[s("li",[t._v("normalModuleFactory、contextModuleFactory：在两类模块工厂创建后触发。")]),t._v(" "),s("li",[t._v("beforeRun、run、watchRun、beforeCompile、compile、thisCompilation、compilation、make、afterCompile：在运行构建过程中触发。")])]),t._v(" "),s("h4",{attrs:{id:"_6-1-3-产物生成阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-3-产物生成阶段"}},[t._v("#")]),t._v(" 6.1.3. 产物生成阶段")]),t._v(" "),s("ul",[s("li",[t._v("shouldEmit、emit、assetEmitted、afterEmit：在构建完成后，处理产物的过程中触发。")]),t._v(" "),s("li",[t._v("failed、done：在达到最终结果状态时触发。")])]),t._v(" "),s("h3",{attrs:{id:"_6-2-compilation-hooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-compilation-hooks"}},[t._v("#")]),t._v(" 6.2. Compilation Hooks")]),t._v(" "),s("p",[t._v("构建过程实例的生命周期我们分为两个阶段，文档地址在这里：https://www.webpackjs.com/api/compilation-hooks/")]),t._v(" "),s("h4",{attrs:{id:"_6-2-1-构建阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-1-构建阶段"}},[t._v("#")]),t._v(" 6.2.1. 构建阶段")]),t._v(" "),s("ul",[s("li",[t._v("addEntry、failedEntry、succeedEntry：在添加入口和添加入口结束时触发（Webpack 5 中移除）。")]),t._v(" "),s("li",[t._v("buildModule、rebuildModule、finishRebuildingModule、failedModule、succeedModule：在构建单个模块时触发。")]),t._v(" "),s("li",[t._v("finishModules：在所有模块构建完成后触发。")])]),t._v(" "),s("h4",{attrs:{id:"_6-2-2-优化阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-2-优化阶段"}},[t._v("#")]),t._v(" 6.2.2. 优化阶段")]),t._v(" "),s("p",[t._v("优化阶段在 seal 函数中共有 12 个主要的处理过程，每个过程都暴露了相应的 Hooks，分别如下:")]),t._v(" "),s("ul",[s("li",[t._v("seal、needAdditionalSeal、unseal、afterSeal：分别在 seal 函数的起始和结束的位置触发。")]),t._v(" "),s("li",[t._v("optimizeDependencies、afterOptimizeDependencies：触发优化依赖的插件执行，例如FlagDependencyUsagePlugin。")]),t._v(" "),s("li",[t._v("beforeChunks、afterChunks：分别在生成 Chunks 的过程的前后触发。")]),t._v(" "),s("li",[t._v("optimize：在生成 chunks 之后，开始执行优化处理的阶段触发。")]),t._v(" "),s("li",[t._v("optimizeModule、afterOptimizeModule：在优化模块过程的前后触发。")]),t._v(" "),s("li",[t._v("optimizeChunks、afterOptimizeChunks：在优化 Chunk 过程的前后触发，用于 Tree Shaking。")]),t._v(" "),s("li",[t._v("optimizeTree、afterOptimizeTree：在优化模块和 Chunk 树过程的前后触发。")]),t._v(" "),s("li",[t._v("optimizeChunkModules、afterOptimizeChunkModules：在优化 ChunkModules 的过程前后触发，例如 ModuleConcatenationPlugin，利用这一 Hook 来做Scope Hoisting的优化。")]),t._v(" "),s("li",[t._v("shouldRecord、recordModules、recordChunks、recordHash：在 shouldRecord 返回为 true 的情况下，依次触发 recordModules、recordChunks、recordHash。")]),t._v(" "),s("li",[t._v("reviveModules、beforeModuleIds、moduleIds、optimizeModuleIds、afterOptimizeModuleIds：在生成模块 Id 过程的前后触发。")]),t._v(" "),s("li",[t._v("reviveChunks、beforeChunkIds、optimizeChunkIds、afterOptimizeChunkIds：在生成 Chunk id 过程的前后触发。")]),t._v(" "),s("li",[t._v("beforeHash、afterHash：在生成模块与 Chunk 的 hash 过程的前后触发。")]),t._v(" "),s("li",[t._v("beforeModuleAssets、moduleAsset：在生成模块产物数据过程的前后触发。")]),t._v(" "),s("li",[t._v("shouldGenerateChunkAssets、beforeChunkAssets、chunkAsset：在创建 Chunk 产物数据过程的前后触发。")]),t._v(" "),s("li",[t._v("additionalAssets、optimizeChunkAssets、afterOptimizeChunkAssets、optimizeAssets、afterOptimizeAssets：在优化产物过程的前后触发，例如在 TerserPlugin 的压缩代码插件的执行过程中，就用到了 optimizeChunkAssets。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);