(window.webpackJsonp=window.webpackJsonp||[]).push([[492],{880:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[s("code",[t._v("manifest.json")]),t._v(" 中可以设置 "),s("code",[t._v("h5.optimization.treeShaking.enable")]),t._v(" 为 "),s("code",[t._v("true")]),t._v("，这是 "),s("code",[t._v("uni-app")]),t._v(" 自带的优化。")]),t._v(" "),s("p",[s("code",[t._v("babel.config.js")]),t._v(" 中在 "),s("code",[t._v("h5")]),t._v(" 下设置 "),s("code",[t._v("modules")]),t._v(" 为 "),s("code",[t._v("auto")]),t._v("，不要都是 "),s("code",[t._v("commonjs")]),t._v("。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("presets")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不要设置成 modules: 'commonjs',")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("modules")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("UNI_PLATFORM")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'h5'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'auto'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'commonjs'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("useBuiltIns")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("UNI_PLATFORM")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'h5'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'usage'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'entry'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("如果不设置成 "),s("code",[t._v("auto")]),t._v(" 的话，"),s("code",[t._v("() => import('')")]),t._v(" 这种动态加载的包会被打包到首包中。")]),t._v(" "),s("p",[t._v("之前的 "),s("code",[t._v("chunk-vendors")]),t._v(" 大小 "),s("code",[t._v("279.41kb")]),t._v("，光 "),s("code",[t._v("vant")]),t._v(" 就有 "),s("code",[t._v("40.67kb")]),t._v("。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_1516149616dcabf6be.png",width:"600"}}),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_2260a3ed5f00bc8e90.png",width:"600"}}),t._v(" "),s("p",[s("code",[t._v("babel-config.js")]),t._v(" 的 "),s("code",[t._v("modules")]),t._v(" 配置改成 "),s("code",[t._v("auto")]),t._v(" 后，"),s("code",[t._v("chunk-vendors")]),t._v(" 大小降为 "),s("code",[t._v("163.75kb")]),t._v("。")]),t._v(" "),s("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/5/own_mike_5b5f07cdfcd857dfe5.png",width:"600"}})])}),[],!1,null,null,null);s.default=e.exports}}]);