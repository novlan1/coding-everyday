(window.webpackJsonp=window.webpackJsonp||[]).push([[597],{868:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"_1-开始"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-开始"}},[t._v("#")]),t._v(" 1. 开始")]),t._v(" "),s("p",[t._v("介绍下对某项目做的优化，包括代码重构、体验优化等方面。")]),t._v(" "),s("h2",{attrs:{id:"_2-问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-问题"}},[t._v("#")]),t._v(" 2. 问题")]),t._v(" "),s("p",[t._v("外行写前端有几个明显特征：")]),t._v(" "),s("ol",[s("li",[t._v("大段"),s("code",[t._v("dom")]),t._v("全写到页面中，没有组件化、没有模块化，缺点：后期难以维护")]),t._v(" "),s("li",[t._v("不会一些相对高级、简洁的语法，比如数组的"),s("code",[t._v("map")]),t._v(", "),s("code",[t._v("reduce")]),t._v(", "),s("code",[t._v("filter")]),t._v(", 只会 "),s("code",[t._v("for")]),t._v(" 循环 "),s("code",[t._v("index")]),t._v("。缺点：代码又臭又长，难以维护")]),t._v(" "),s("li",[t._v("代码规范严重缺失，风格极度不统一。缺点：难以维护，后面的开发人员边写边骂街")]),t._v(" "),s("li",[t._v("没有数据驱动，设计稿怎么写就全部罗列到页面里，典型的是数据页和规则")])]),t._v(" "),s("p",[s("strong",[t._v("外行还不是“新手”，新手会成长，外行不会成长")]),t._v("。")]),t._v(" "),s("p",[t._v("之前的项目就是由“外行”写的，上面的问题都有。")]),t._v(" "),s("p",[t._v("此外还有很重要的一点，MR 形同虚设，“同意”机器人，"),s("strong",[t._v("毫无思想，毫无原则，毫无规范")]),t._v("。仿佛在比谁点同意点的快，谁就🐮🍺。")]),t._v(" "),s("h2",{attrs:{id:"_3-解决"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-解决"}},[t._v("#")]),t._v(" 3. 解决")]),t._v(" "),s("p",[t._v("组件方面，解决手段就是抽组件、提高复用率，整理代码、删除重复样式等。")]),t._v(" "),s("h3",{attrs:{id:"_3-1-原则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-原则"}},[t._v("#")]),t._v(" 3.1. 原则")]),t._v(" "),s("ol",[s("li",[s("strong",[t._v("严格遵守代码规范")]),t._v("，这是防止项目腐化的第一步。长期来看，一个没有代码规范的项目，一定会变成"),s("code",[t._v("x")]),t._v("山")]),t._v(" "),s("li",[s("strong",[t._v("分层")]),t._v("，一个项目能健康跑多远，取决于分层的程度。这个项目而言，核心组件、核心流程（拉起游戏、赛程卡片）一定要物理隔离，其他人想污染也污染不到")]),t._v(" "),s("li",[t._v("消除重复代码，"),s("strong",[t._v("能复用的一定要复用")]),t._v("。一方面可以减少维护成本，只维护一份，另一个方面包体积也比较小，性能较好。")])]),t._v(" "),s("h3",{attrs:{id:"_3-2-工具"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-工具"}},[t._v("#")]),t._v(" 3.2. 工具")]),t._v(" "),s("p",[t._v("针对大量无用样式的问题，做了一个插件，在小程序下，对组件的模板（"),s("code",[t._v("wxml/qml")]),t._v("等）、样式（"),s("code",[t._v("wxss/qss")]),t._v("等）、脚本文件（"),s("code",[t._v(".js")]),t._v("）大小进行分析。可以快速定位哪些组件问题最大、最亟需优化。")]),t._v(" "),s("p",[t._v("插件会获取每个组件（包括页面）的上述三种产物的大小，以及样式与模板的体积比例、模板与脚本的体积比例，输出为 "),s("code",[t._v("json")]),t._v(" 文件和 "),s("code",[t._v("csv")]),t._v(" 文件。")]),t._v(" "),s("p",[t._v("开发者可以据此进行分析，一般来说，"),s("strong",[t._v("样式模板体积比（"),s("code",[t._v("cssHtmlRatio")]),t._v("）特别大的组件（基础组件除外），往往存在大量无用样式")]),t._v("。")]),t._v(" "),s("p",[t._v("可利用 "),s("code",[t._v("Excel")]),t._v(" 中的自定义排序，对 "),s("code",[t._v("cssHtmlRatio")]),t._v(" 进行降序，进而确定优化目标及优先级。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_bec1b61c4ac07795da.png",width:"600"}}),t._v(" "),s("h3",{attrs:{id:"_3-3-优化效果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-优化效果"}},[t._v("#")]),t._v(" 3.3. 优化效果")]),t._v(" "),s("p",[t._v("以一个组件为例，优化前"),s("code",[t._v("66KB")]),t._v("，优化后"),s("code",[t._v("5KB")]),t._v("，减少了"),s("code",[t._v("93.8%")]),t._v("。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2025/1/own_mike_5d9c7612d80b485ded.png",width:"500"}}),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2025/1/own_mike_9b247e037421016cac.png",width:"500"}}),t._v(" "),s("h2",{attrs:{id:"_4-体验优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-体验优化"}},[t._v("#")]),t._v(" 4. 体验优化")]),t._v(" "),s("p",[t._v("在代码重构的基础了做了一些体验优化，包括")]),t._v(" "),s("ol",[s("li",[t._v("支持默认路由（404页面重定向到首页）")]),t._v(" "),s("li",[t._v("跳转二级页面时，携带已有的信息并展示。举例，抖音首页到个人页面跳转时，会携带用户名、头像等，然后接口返回后，显示其他信息。不能放到 "),s("code",[t._v("url")]),t._v(" 里，否则 "),s("code",[t._v("url")]),t._v(" 过长，复制后用户体验差。容量控制，不能过大。")]),t._v(" "),s("li",[t._v("核心页面增加骨架屏")]),t._v(" "),s("li",[t._v("弹窗、Popup等都增加渐变动画")]),t._v(" "),s("li",[t._v("页面切换增加切换效果，后面细说")]),t._v(" "),s("li",[t._v("H5在PC端展示优化，后面细说")])]),t._v(" "),s("h2",{attrs:{id:"_5-性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-性能优化"}},[t._v("#")]),t._v(" 5. 性能优化")]),t._v(" "),s("p",[t._v("也做了一些涉及性能方面的优化。")]),t._v(" "),s("ol",[s("li",[t._v("使用"),s("code",[t._v("tim")]),t._v("的页面都放到了一个分包中，"),s("code",[t._v("views/battle-room")]),t._v(" => "),s("code",[t._v("views/match/battle-room")]),t._v(", 原页面进行了重定向，外部无感知。优化效果：主包大小减少，"),s("code",[t._v("1.88MB")]),t._v(" => "),s("code",[t._v("1.22MB")]),t._v("。")]),t._v(" "),s("li",[s("code",[t._v("h5")]),t._v(" 下 "),s("code",[t._v("tim")]),t._v(" 使用异步加载")]),t._v(" "),s("li",[s("code",[t._v("h5")]),t._v(" 下 "),s("code",[t._v("vendor")]),t._v(" 拆分")]),t._v(" "),s("li",[s("code",[t._v("console")]),t._v(" 去除")])]),t._v(" "),s("h2",{attrs:{id:"_6-开发体验优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-开发体验优化"}},[t._v("#")]),t._v(" 6. 开发体验优化")]),t._v(" "),s("ol",[s("li",[t._v("将 "),s("code",[t._v("press-gp-dialog")]),t._v(" 的 "),s("code",[t._v("dom")]),t._v(" 内嵌在 global-component 中，这样每个页面只需要注入一个全局组件即可，即 "),s("code",[t._v("global-component")]),t._v("。同时，在 "),s("code",[t._v("main.ts")]),t._v(" 中增加了 "),s("code",[t._v("press-gp-dialog")]),t._v(" 调用时的默认 "),s("code",[t._v("selector")]),t._v("，即从 "),s("code",[t._v("global-component")]),t._v(" 内部寻找。"),s("code",[t._v("press-toast")]),t._v(" 同理。好处是，降低开发成本，减少犯错。")]),t._v(" "),s("li",[t._v("每个项目的QQ小程序二维码单独一个文档")]),t._v(" "),s("li",[t._v("去除循环依赖、子包引用主包等引用错误问题，避免潜在的错误。这里是做了插件去提取引用错误的问题。")])]),t._v(" "),s("h2",{attrs:{id:"_7-页面切换动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-页面切换动画"}},[t._v("#")]),t._v(" 7. 页面切换动画")]),t._v(" "),s("p",[t._v("介绍下页面切换动画（"),s("code",[t._v("Page Animation")]),t._v("）的原理、效果。")]),t._v(" "),s("h3",{attrs:{id:"_7-1-原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-原理"}},[t._v("#")]),t._v(" 7.1. 原理")]),t._v(" "),s("p",[t._v("核心原理是借助了 "),s("code",[t._v("router")]),t._v(" 的 "),s("code",[t._v("beforeEach")]),t._v(" 和 "),s("code",[t._v("afterEach")]),t._v(" 钩子，在路由跳转前后改变顶层类名，进而增加动画。")]),t._v(" "),s("p",[s("code",[t._v("beforeEach")]),t._v(" 负责添加 "),s("code",[t._v("xxx-out")]),t._v(" 类名，"),s("code",[t._v("afterEach")]),t._v(" 负责添加 "),s("code",[t._v("xxx-in")]),t._v(" 类名。这两钩子中是拿不到路由是前进还是后退的，所以需要 "),s("code",[t._v("hook")]),t._v(" 路由跳转方法，记录跳转类型。")]),t._v(" "),s("p",[t._v("以最常用的 "),s("code",[t._v("slide-in-right")]),t._v(" 举例，最核心的样式是 "),s("code",[t._v("translateX")]),t._v("，其作用的元素是 "),s("code",[t._v("uni-app")]),t._v("，它是 "),s("code",[t._v("body > #app")]),t._v(" 的下个元素。")]),t._v(" "),s("h4",{attrs:{id:"_7-1-1-页面跳转"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-1-页面跳转"}},[t._v("#")]),t._v(" 7.1.1. 页面跳转")]),t._v(" "),s("p",[t._v("前进时，动画从右往左。")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".page-slide-in-right--out ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("uni-page ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 前进，1")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" page-left-out "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("var")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("--redirect-duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 300ms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ease"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".page-slide-in-right--in ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("uni-page ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 前进，2")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" page-right-in "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("var")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("--redirect-duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 300ms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ease"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("left-out")]),t._v(" 内容：")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token atrule"}},[s("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" page-left-out")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("-90%"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("right-in")]),t._v(" 内容：")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token atrule"}},[s("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" page-right-in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("90%"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_716cf8a6eab5168bb9.png",width:"300"}}),t._v(" "),s("p",[t._v("页面表现：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_da779c6987d6ce72fa.gif",width:"260"}}),t._v(" "),s("h4",{attrs:{id:"_7-1-2-页面返回"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-2-页面返回"}},[t._v("#")]),t._v(" 7.1.2. 页面返回")]),t._v(" "),s("p",[t._v("返回时，动画从左往右。")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".page-slide-in-right--out ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[s("span",{pre:!0,attrs:{class:"token parent important"}},[t._v("&")]),t._v(".back uni-page ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回，1")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" page-right-out "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("var")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("--redirect-duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 300ms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ease"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".page-slide-in-right--in ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[s("span",{pre:!0,attrs:{class:"token parent important"}},[t._v("&")]),t._v(".back uni-page ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回，2")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" page-left-in "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("var")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("--redirect-duration"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 300ms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ease"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("right-out")]),t._v(" 内容：")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token atrule"}},[s("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" page-right-out")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("90%"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("left-in")]),t._v(" 内容：")]),t._v(" "),s("div",{staticClass:"language-scss extra-class"},[s("pre",{pre:!0,attrs:{class:"language-scss"}},[s("code",[s("span",{pre:!0,attrs:{class:"token atrule"}},[s("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" page-left-in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("-90%"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100% ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_d1e5f789f8ce463b57.png",width:"300"}}),t._v(" "),s("p",[t._v("页面表现：")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_7f289563c77d92f439.gif",width:"260"}}),t._v(" "),s("h3",{attrs:{id:"_7-2-效果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-2-效果"}},[t._v("#")]),t._v(" 7.2. 效果")]),t._v(" "),s("p",[t._v("左边是使用之前，右边是使用之后。使用后有切换动画，流畅感有提升。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_2f9613b04c19a3c50f.gif",width:"200"}}),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_1726c8e1bea10c9ff3.gif",width:"200"}}),t._v(" "),s("h3",{attrs:{id:"_7-3-接入方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-3-接入方式"}},[t._v("#")]),t._v(" 7.3. 接入方式")]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("App.vue")]),t._v(" 中 "),s("code",[t._v("onLaunch")]),t._v(" 方法中增加拦截。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #ifdef H5")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" pageAnimation "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'press-plus/common/page-animation/index'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" hookVueRouter "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'press-plus/common/page-animation/hook-vue-router'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #endif")]),t._v("\n\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("onLaunch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #ifdef H5")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("pageAnimation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hookVueRouter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NODE_ENV")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #endif")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"_8-h5在pc端展示优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-h5在pc端展示优化"}},[t._v("#")]),t._v(" 8. H5在PC端展示优化")]),t._v(" "),s("p",[t._v("介绍下 H5 项目在 PC 端打开的优化。背景是 H5 用电脑浏览器打开时，会变形，宽高都会被拉长。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_17d782ed948ba4b524.png",width:"500"}}),t._v(" "),s("h3",{attrs:{id:"_8-1-原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-1-原理"}},[t._v("#")]),t._v(" 8.1. 原理")]),t._v(" "),s("p",[t._v("优化思路是模拟浏览器的手机调试，具体就是在 PC 端打开一个 "),s("code",[t._v("iframe")]),t._v("，其宽高是手机的尺寸，其路径是想要打开的页面路径。")]),t._v(" "),s("p",[t._v("当发现是在PC打开，且不在白名单内时，就跳转到 "),s("code",[t._v("/web-container?path=xxx")]),t._v(" 的路由，"),s("code",[t._v("xxx")]),t._v(" 就是之前的 "),s("code",[t._v("window.location.href")]),t._v("。")]),t._v(" "),s("p",[s("code",[t._v("web-container")]),t._v(" 页面内是一个 "),s("code",[t._v("iframe")]),t._v("，会拿到页面的 "),s("code",[t._v("query.path")]),t._v("，将其作为 "),s("code",[t._v("iframe")]),t._v(" 的 "),s("code",[t._v("src")]),t._v("。")]),t._v(" "),s("p",[t._v("当子应用页面跳转时，调用 "),s("code",[t._v("window.parent.history.replaceState")]),t._v("，更新 "),s("code",[t._v("query.path")]),t._v("，这样刷新页面，不会跳转到其他地方。")]),t._v(" "),s("p",[t._v("当发现是手机浏览器打开时，且当前是 "),s("code",[t._v("web-container")]),t._v(" 模式，就 "),s("code",[t._v("router.replace")]),t._v(" 到真正的页面，即去掉子应用。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_6908e2b6ef5ea73567.png",width:"500"}}),t._v(" "),s("h3",{attrs:{id:"_8-2-效果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-2-效果"}},[t._v("#")]),t._v(" 8.2. 效果")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/12/own_mike_4d49d0193a52d02293.png",width:"500"}}),t._v(" "),s("h3",{attrs:{id:"_8-3-接入方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-3-接入方式"}},[t._v("#")]),t._v(" 8.3. 接入方式")]),t._v(" "),s("p",[t._v("先根据自身业务，进行二次封装，如：")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" redirectToWebContainerInPC "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'press-plus/common/web-container/index'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pathWhiteList "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'web-container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'third-plat-login'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ai-room-pc'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" disableWebContainerList "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ai-room-pc'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" corePath "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/pvpesport.next.user'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirectToWebContainer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirectToWebContainerInPC")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    pathWhiteList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    disableWebContainerList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    corePath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n    router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    log"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    tag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在 "),s("code",[t._v("App.vue")]),t._v(" 中 "),s("code",[t._v("onLaunch")]),t._v(" 方法中增加以下方法。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("onLaunch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #ifdef H5")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirectToWebContainer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" tag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'onLaunch'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'resize'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirectToWebContainer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" tag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'resize'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("afterEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirectToWebContainer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" tag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'afterEach'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #endif")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"_9-感想"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9-感想"}},[t._v("#")]),t._v(" 9. 感想")]),t._v(" "),s("p",[t._v("事后改代码成本颇多")]),t._v(" "),s("ol",[s("li",[t._v("不测，或不全量测，存在影响线上的风险，测，则成本过高")]),t._v(" "),s("li",[t._v("难以模拟所有环境，自测、调试困难")]),t._v(" "),s("li",[t._v("需了解之前的需求、之前的代码，存在上下文切换成本")])])])}),[],!1,null,null,null);s.default=e.exports}}]);