(window.webpackJsonp=window.webpackJsonp||[]).push([[470],{744:function(a,s,t){"use strict";t.r(s);var e=t(14),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[a._v("使用 pnpm wrokspace 改造 plugin-light。")]),a._v(" "),s("h2",{attrs:{id:"一些命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一些命令"}},[a._v("#")]),a._v(" 一些命令")]),a._v(" "),s("h3",{attrs:{id:"w"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#w"}},[a._v("#")]),a._v(" -w")]),a._v(" "),s("p",[a._v("-w, --workspace-root 表示在workspace的根目录下安装而不是当前的目录")]),a._v(" "),s("p",[a._v("比如")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("pnpm i -Dw rollup\n")])])]),s("h3",{attrs:{id:"filter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#filter"}},[a._v("#")]),a._v(" --filter")]),a._v(" "),s("p",[a._v("pnpm 提供了 --filter 参数，可以用来对特定的package进行某些操作")]),a._v(" "),s("p",[a._v("如果想给 pkg1 安装一个依赖包，比如 axios")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("pnpm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" axios "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--filter")]),a._v(" @xxx/pkg1\n")])])]),s("p",[a._v("需要注意的是，--filter 参数跟着的是package下的 package.json 的 name 字段，并不是目录名。")]),a._v(" "),s("p",[a._v("关于 --filter 操作其实还是很丰富的，比如执行 pkg1 下的 scripts 脚本：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("pnpm")]),a._v(" build "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--filter")]),a._v(" @xxx/pkg1\n")])])]),s("p",[a._v("filter 后面除了可以指定具体的包名，还可以跟着匹配规则来指定对匹配上规则的包进行操作")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("pnpm")]),a._v(" build "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--filter")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"./packages/**"')]),a._v("\n")])])]),s("p",[a._v("此命令会执行所有 package 下的 build 命令。")]),a._v(" "),s("h3",{attrs:{id:"r-recursive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#r-recursive"}},[a._v("#")]),a._v(" -r, --recursive")]),a._v(" "),s("p",[a._v("在工作区的每个项目中运行命令")]),a._v(" "),s("h3",{attrs:{id:"模块之间的相互依赖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块之间的相互依赖"}},[a._v("#")]),a._v(" 模块之间的相互依赖")]),a._v(" "),s("p",[a._v("基于 pnpm 提供的 workspace:协议，可以方便的在 packages 内部进行互相引用。比如在 pkg1 中引用 pkg2：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("pnpm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @xxx/pkg2 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-r")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--filter")]),a._v(" @xxx/pkg1\n")])])]),s("p",[a._v("此时我们查看 pkg1 的 package.json，可以看到 dependencies 字段中多了对 @xxx/pkg2 的引用，以 workspace: 开头，后面跟着具体的版本号。")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@xxx/pkg1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"version"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1.0.0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"dependencies"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"@xxx/pkg2"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"workspace:^1.0.0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"axios"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"^0.27.2"')]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("在设置依赖版本的时候推荐用 workspace:*，这样就可以保持依赖的版本是工作空间里最新版本，不需要每次手动更新依赖版本。")]),a._v(" "),s("p",[a._v("当 pnpm publish 的时候，会自动将 package.json 中的 workspace 修正为对应的版本号。")]),a._v(" "),s("p",[a._v("参考：")]),a._v(" "),s("ul",[s("li",[a._v("https://juejin.cn/post/7098609682519949325")]),a._v(" "),s("li",[a._v("https://developer.baidu.com/article/details/3219676")])])])}),[],!1,null,null,null);s.default=r.exports}}]);