(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{329:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("ul",[s("li",[s("a",{attrs:{href:"#1-mongodb"}},[t._v("1. mongoDB")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#11-mongodb%E5%91%BD%E4%BB%A4"}},[t._v("1.1. mongoDB命令")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#12-mongoose-%E5%91%BD%E4%BB%A4"}},[t._v("1.2. Mongoose 命令")])])])])]),t._v(" "),s("h2",{attrs:{id:"_1-mongodb"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-mongodb"}},[t._v("#")]),t._v(" 1. mongoDB")]),t._v(" "),s("h3",{attrs:{id:"_1-1-mongodb命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-mongodb命令"}},[t._v("#")]),t._v(" 1.1. mongoDB命令")]),t._v(" "),s("p",[t._v("集合相当于数据表")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.")]),t._v(" show dbs  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 显示所有数据库")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.")]),t._v(" use test   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 切换数据库，test是数据库名称")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.")]),t._v(" show collections   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 显示所有集合")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4.")]),t._v(" db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("users"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// users是集合名称")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5.")]),t._v(" db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("users"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("drop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 删除集合user")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6.")]),t._v(" db     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 查看当前所在数据库")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("7.")]),t._v(" db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("users"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("insert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"_id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"520"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xiaoming"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建表。键名称不加引号也能输入，最好加上；单引号双引号最后都会化为双引号。")]),t._v("\n")])])]),s("h3",{attrs:{id:"_1-2-mongoose-命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-mongoose-命令"}},[t._v("#")]),t._v(" 1.2. Mongoose 命令")]),t._v(" "),s("p",[t._v("Mongoose 模型提供了 "),s("code",[t._v("find")]),t._v(", "),s("code",[t._v("findOne")]),t._v(", 和 "),s("code",[t._v("findById")]),t._v(" 方法用于文档查询。")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("Model.find")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("query"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fields"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fields 和 options 都是可选参数")]),t._v("\n")])])]),s("p",[t._v("简单查询:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'csser.com'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" docs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// docs 是查询的结果数组 });")]),t._v("\n")])])]),s("p",[t._v("只查询指定键的结果:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'first'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'last'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" docs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// docs 此时只包含文档的部分键值})")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[s("code",[t._v("Model.findOne")])])]),t._v(" "),s("p",[t._v("与 "),s("code",[t._v("Model.find")]),t._v(" 相同，但只返回单个文档")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findOne")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" doc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// doc 是单个文档});")]),t._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[s("code",[t._v("Model.findById")])])]),t._v(" "),s("p",[t._v("与 "),s("code",[t._v("findOne")]),t._v(" 相同，但它接收文档的"),s("code",[t._v("_id")]),t._v(" 作为参数，返回单个文档。"),s("code",[t._v("_id")]),t._v(" 可以是字符串或 ObjectId 对象。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" doc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// doc 是单个文档});")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);