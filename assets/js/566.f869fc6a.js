(window.webpackJsonp=window.webpackJsonp||[]).push([[566],{838:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"_1-开始"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-开始"}},[t._v("#")]),t._v(" 1. 开始")]),t._v(" "),s("p",[t._v("本文为 "),s("code",[t._v("Vue3.x")]),t._v(" 工程适配记录。项目中很多老工具、组件都是基于 "),s("code",[t._v("Vue2.x")]),t._v(" 的，而且还在用，所以基本是戴着镣铐跳舞，需要向下兼容，同时追求高效、简单。")]),t._v(" "),s("p",[t._v("适配大体分两类，运行时和编译时，运行时适配包括各种语法，编译时适配包括 "),s("code",[t._v("Webpack Loader")]),t._v("、"),s("code",[t._v("Plugin")]),t._v("、"),s("code",[t._v("transpileDependencies")]),t._v(" 等方面。")]),t._v(" "),s("h2",{attrs:{id:"_2-基础配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-基础配置"}},[t._v("#")]),t._v(" 2. 基础配置")]),t._v(" "),s("p",[t._v("首先基于当前项目架构，搭建了 "),s("code",[t._v("vite")]),t._v(" "),s("a",{attrs:{href:"https://mobile.woa.com/uni-plugin-light/zh/config/vite-config.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("基础配置"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[t._v("当前架构是什么？就是形如 "),s("code",[t._v("src/project/user")]),t._v(" 的 "),s("code",[t._v("monorepo")]),t._v(" 模式。")]),t._v(" "),s("p",[t._v("还有对 "),s("code",[t._v("devcloud")]),t._v(" 中 "),s("code",[t._v("node")]),t._v(" 版本升级，打包产物位置的更新，等这些比较小的点。")]),t._v(" "),s("h2",{attrs:{id:"_3-适配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-适配"}},[t._v("#")]),t._v(" 3. 适配")]),t._v(" "),s("h3",{attrs:{id:"_3-1-tip-platform-name-适配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-tip-platform-name-适配"}},[t._v("#")]),t._v(" 3.1. TIP_PLATFORM_NAME 适配")]),t._v(" "),s("p",[t._v("一个 "),s("a",{attrs:{href:"https://mobile.woa.com/uni-plugin-light/zh/vite/cross-platform.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vite 插件"),s("OutboundLink")],1),t._v(" 即可解决。")]),t._v(" "),s("p",[t._v("但是对于第三方库，需要额外的技巧。")]),t._v(" "),s("p",[t._v("需要在 "),s("code",[t._v("vite.config.ts")]),t._v(" 中的 "),s("code",[t._v("optimizeDepsExcludes")]),t._v(" 中将其排除，否则在 "),s("code",[t._v("vite")]),t._v(" 的依赖分析的时候就会提前报错，此时还没到插件的处理时机。")]),t._v(" "),s("p",[t._v("这样处理后，一些用 "),s("code",[t._v("commonjs")]),t._v(" 的三方库可能会报错，这时又需要添加 "),s("code",[t._v("optimizeDepsIncludes")]),t._v("，让插件处理这些依赖。")]),t._v(" "),s("h3",{attrs:{id:"_3-2-组件库适配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-组件库适配"}},[t._v("#")]),t._v(" 3.2. 组件库适配")]),t._v(" "),s("p",[t._v("一些三方库是以源码方式提供的，比如 "),s("code",[t._v("press-plus")]),t._v("，"),s("code",[t._v("Vue2.x")]),t._v(" 时可以配置 "),s("code",[t._v("transpileDependencies")]),t._v("，但是 "),s("code",[t._v("Vite")]),t._v(" 没有对应的配置项。")]),t._v(" "),s("p",[t._v("可以这么处理：")]),t._v(" "),s("ol",[s("li",[t._v("将三方库复制到 "),s("code",[t._v("src")]),t._v(" 下的某个目录下")]),t._v(" "),s("li",[t._v("为三方库配置 "),s("code",[t._v("alias")]),t._v("，指向 "),s("code",[t._v("src")]),t._v(" 某目录下")]),t._v(" "),s("li",[t._v("配置 "),s("code",[t._v("tsconfig.json")]),t._v(" 的 "),s("code",[t._v("compileOptions.paths")])])]),t._v(" "),s("p",[t._v("除组件库外，一些类似 "),s("code",[t._v("pmd-tools")]),t._v(" 的三方库也可以这样处理。需要注意的是，一旦配置 "),s("code",[t._v("alias")]),t._v(" 为本地源码后，一些依赖要额外安装（比如 "),s("code",[t._v("vue-runtime-helpers")]),t._v("），否则在 "),s("code",[t._v("pnpm")]),t._v(" 项目中可能找不到。")]),t._v(" "),s("h3",{attrs:{id:"_3-3-条件编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-条件编译"}},[t._v("#")]),t._v(" 3.3. 条件编译")]),t._v(" "),s("p",[t._v("项目支持条件编译，一些地方使用它会非常简单。比如 "),s("code",[t._v("src/component/logic/tip-merchant/jump-handle/helper.js")]),t._v(" 中 对 "),s("code",[t._v("configInfo")]),t._v(" 的适配。")]),t._v(" "),s("h3",{attrs:{id:"_3-4-node-js-版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-node-js-版本"}},[t._v("#")]),t._v(" 3.4. node.js 版本")]),t._v(" "),s("p",[s("code",[t._v("node")]),t._v(" 版本必须 "),s("code",[t._v(">= 16")]),t._v("，可以使用 "),s("code",[t._v("nvm")]),t._v(" 切换，非常方便。")]),t._v(" "),s("p",[s("code",[t._v("devcolud")]),t._v(" 已支持。")]),t._v(" "),s("h3",{attrs:{id:"_3-5-template-v-for"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-5-template-v-for"}},[t._v("#")]),t._v(" 3.5. template v-for")]),t._v(" "),s("p",[s("code",[t._v("Vue2.x")]),t._v(" 和 "),s("code",[t._v("Vue3.x")]),t._v(" 的 "),s("code",[t._v(":key")]),t._v(" 使用互不兼容，前者不能放到 "),s("code",[t._v("template")]),t._v(" 上，后者必须放到 "),s("code",[t._v("template")]),t._v(" 上，且是 "),s("code",[t._v("vscode")]),t._v(" 插件的报错，不是 "),s("code",[t._v("eslint")]),t._v(" 的报错。")]),t._v(" "),s("p",[t._v("一个简单的解决办法就是把 "),s("code",[t._v("template")]),t._v(" 改成 "),s("code",[t._v("div/span")]),t._v("。")]),t._v(" "),s("p",[t._v("参考：https://v3-migration.vuejs.org/zh/breaking-changes/key-attribute.html")]),t._v(" "),s("h3",{attrs:{id:"_3-6-vite-依赖缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-6-vite-依赖缓存"}},[t._v("#")]),t._v(" 3.6. vite 依赖缓存")]),t._v(" "),s("p",[t._v("vite 有依赖缓存，禁用缓存可以用 "),s("code",[t._v("sudo npm run dev --force")])]),t._v(" "),s("h3",{attrs:{id:"_3-7-vite-root"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-7-vite-root"}},[t._v("#")]),t._v(" 3.7. vite root")]),t._v(" "),s("p",[t._v("修改了 "),s("code",[t._v("vite.config.ts")]),t._v(" 中的 "),s("code",[t._v("root")]),t._v(" 后，比如设置为 "),s("code",[t._v("subProject")]),t._v(" 路径，需要更改 "),s("code",[t._v("envDir")]),t._v("，否则客户端拿不到环境变量。")]),t._v(" "),s("h3",{attrs:{id:"_3-8-支持-history-模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-8-支持-history-模式"}},[t._v("#")]),t._v(" 3.8. 支持 history 模式")]),t._v(" "),s("p",[s("code",[t._v("router")]),t._v(" 需要改成:")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" baseUrl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("meta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VITE_ROUTER_BASE")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" router "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createRouter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// hash 模式为 createWebHashHistory(),")]),t._v("\n  history"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createWebHistory")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  routes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("code",[t._v("vite.config.ts")]),t._v(" 中增加额外配置，支持上云和 "),s("code",[t._v("history")]),t._v(" 模式。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vueAppBase "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VUE_APP_PUBLICPATH")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" experimentalConfig "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vueAppBase "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  experimental"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("renderBuiltUrl")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" hostId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" hostType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" type "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      hostId"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      hostType"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[experimental] '")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" hostType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" hostId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeLastSlash")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vueAppBase"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("filename"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  root"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" subProjectRoot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  envDir"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cwd")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  \n  base"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" vueAppBase "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("experimentalConfig"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"_3-9-其他"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-9-其他"}},[t._v("#")]),t._v(" 3.9. 其他")]),t._v(" "),s("p",[t._v("还有很多其他小的适配和改造，直接看"),s("a",{attrs:{href:"https://v3-migration.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1),t._v("就行了。")]),t._v(" "),s("p",[t._v("比如 "),s("code",[t._v(".sync")]),t._v(" 的去除，这里我写了脚本对 "),s("code",[t._v("component")]),t._v(" 子仓库进行了批量替换，")]),t._v(" "),s("h2",{attrs:{id:"_4-实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-实例"}},[t._v("#")]),t._v(" 4. 实例")]),t._v(" "),s("p",[t._v("Vue 中的实例分应用实例和组件实例，"),s("code",[t._v("Vue2.x")]),t._v(" 中开发者不用太关心，因为它用了原型链，在组件实例尝试获取应用实例的属性，也可以拿到。"),s("code",[t._v("Vue3.x")]),t._v(" 中则不一样。")]),t._v(" "),s("p",[t._v("比如 "),s("code",[t._v("$ebus")]),t._v(" 的适配，首先 "),s("code",[t._v("$ebus")]),t._v(" 一定是挂载在应用实例上，这样每个组件才能拿到相同的。下面代码是错误的：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[t._v("app "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("propsData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" eBus "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EventBus")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载目标不对")]),t._v("\napp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("globalProperties"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$ebus "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eBus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("并且挂载时机也必须在 "),s("code",[t._v("mount")]),t._v(" 之前。下面的代码就是错误的：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[t._v("app "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("propsData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ncomponentInstance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" eBus "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EventBus")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载太晚了")]),t._v("\napp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("globalProperties"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$ebus "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eBus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("贴两张图，直观感受下应用实例和组件示例的差别。应用实例：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/1/own_mike_c20cc965e3ff166983.png",width:"500"}}),t._v(" "),s("p",[t._v("组件实例：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/1/own_mike_b7b0e0ea9ff730394f.png",width:"500"}}),t._v(" "),s("h2",{attrs:{id:"_5-总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-总结"}},[t._v("#")]),t._v(" 5. 总结")]),t._v(" "),s("p",[t._v("好的工程配置可以事半功倍，升级 Vue3 在我看来不只是语法的升级，更重要的是工程的配置。你可以在 Vue3 中写 "),s("code",[t._v("hooks")]),t._v("，也可以写 "),s("code",[t._v("options API")]),t._v("，这些都是小事，重要的是你得有这样一套配置，并且对基础组件、基础工具库做好兼容。")]),t._v(" "),s("p",[t._v("复杂的事情简单做，而不是反过来。一天天吭哧吭哧加班，装作很忙的样子，最后代码写的像屎一样。对应到 Vue3 适配，Press 系列组件库、底层工具都是兼容 Vue3 的，所以上层改动很少，如果由 KPI 驱动型的人来做，估计又要重新写一套组件库，当作自己辉煌的 KPI 了。")]),t._v(" "),s("p",[t._v("至于 Press 系列组件库是如何兼容 Vue3 的，可以参考"),s("a",{attrs:{href:"https://juejin.cn/spost/7325693010569609266",target:"_blank",rel:"noopener noreferrer"}},[t._v("之前的文章"),s("OutboundLink")],1),t._v("。")])])}),[],!1,null,null,null);s.default=e.exports}}]);