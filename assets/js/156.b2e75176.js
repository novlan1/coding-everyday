(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{425:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("ul",[s("li",[s("a",{attrs:{href:"#1-%E8%99%9A%E6%8B%9Fdom"}},[t._v("1. 虚拟DOM")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#11-%E4%BB%80%E4%B9%88%E6%98%AF-vdom"}},[t._v("1.1. 什么是 Vdom？")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#12-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8-vdom"}},[t._v("1.2. 为什么使用 Vdom？")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#13-%E6%A0%B8%E5%BF%83-api"}},[t._v("1.3. 核心 API")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#1301-h%E5%87%BD%E6%95%B0"}},[t._v("1.3.0.1. "),s("code",[t._v("h")]),t._v("函数")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#1302-patch%E5%87%BD%E6%95%B0"}},[t._v("1.3.0.2. "),s("code",[t._v("patch")]),t._v("函数")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#14-vdom-%E4%B8%BA%E4%BD%95%E4%BD%BF%E7%94%A8-diff-%E7%AE%97%E6%B3%95"}},[t._v("1.4. Vdom 为何使用 Diff 算法？")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#15-vdom-%E7%9A%84-diff-%E7%AE%97%E6%B3%95"}},[t._v("1.5. Vdom 的 Diff 算法")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#16-diff-%E7%AE%97%E6%B3%95%E5%92%8C%E8%B0%83%E5%92%8C"}},[t._v("1.6. Diff 算法和调和")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#161-diff-%E7%AE%97%E6%B3%95%E7%9A%84%E4%BD%9C%E7%94%A8"}},[t._v("1.6.1. Diff 算法的作用")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#162-%E4%BC%A0%E7%BB%9F-diff-%E7%AE%97%E6%B3%95"}},[t._v("1.6.2. 传统 Diff 算法")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#163-react-%E7%9A%84-diff-%E7%AE%97%E6%B3%95"}},[t._v("1.6.3. React 的 Diff 算法")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#164-diff-%E7%AD%96%E7%95%A5"}},[t._v("1.6.4. Diff 策略")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#165-tree-diff"}},[t._v("1.6.5. tree diff")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#166-element-diff"}},[t._v("1.6.6. element diff")])])])])])])]),t._v(" "),s("h2",{attrs:{id:"_1-虚拟dom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-虚拟dom"}},[t._v("#")]),t._v(" 1. 虚拟DOM")]),t._v(" "),s("h3",{attrs:{id:"_1-1-什么是-vdom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-什么是-vdom"}},[t._v("#")]),t._v(" 1.1. 什么是 Vdom？")]),t._v(" "),s("ol",[s("li",[t._v("用JS模拟DOM结构；")]),t._v(" "),s("li",[t._v("DOM变化的对比，放在JS层来做（图灵完备语言）；")]),t._v(" "),s("li",[t._v("提高重绘性能。")])]),t._v(" "),s("h3",{attrs:{id:"_1-2-为什么使用-vdom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-为什么使用-vdom"}},[t._v("#")]),t._v(" 1.2. 为什么使用 Vdom？")]),t._v(" "),s("ol",[s("li",[t._v("DOM操作很昂贵，js运行效率高。")]),t._v(" "),s("li",[t._v("尽量减少DOM操作，不是推倒重来。项目越复杂，影响就越严重。")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印下简单的div，可见其很庞杂")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" div "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" item "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" div"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  res "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("' | '")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" item\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"_1-3-核心-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-核心-api"}},[t._v("#")]),t._v(" 1.3. 核心 API")]),t._v(" "),s("p",[t._v("以 "),s("code",[t._v("snabbdom")]),t._v("为例，虚拟DOM框架的核心API包括"),s("code",[t._v("h")]),t._v("函数和"),s("code",[t._v("patch")]),t._v("函数")]),t._v(" "),s("h5",{attrs:{id:"_1-3-0-1-h函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-0-1-h函数"}},[t._v("#")]),t._v(" 1.3.0.1. "),s("code",[t._v("h")]),t._v("函数")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("h")]),t._v("函数=>"),s("code",[t._v("vnode")]),t._v("的一个结点，JS的一个对象，模拟"),s("code",[t._v("dom")]),t._v("结点")]),t._v(" "),s("li",[s("code",[t._v("h")]),t._v("函数第一个参数是结点，第二个参数是属性，第三个参数是子元素（数组或者字符串）")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vnode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ul#list'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其表示的DOM结构如下：")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("tag")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ul'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("attrs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'list'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("children")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("tag")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("attrs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("className")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'item'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("children")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("tag")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("attrs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("className")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'item'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("children")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h5",{attrs:{id:"_1-3-0-2-patch函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-0-2-patch函数"}},[t._v("#")]),t._v(" 1.3.0.2. "),s("code",[t._v("patch")]),t._v("函数")]),t._v(" "),s("ol",[s("li",[t._v("把"),s("code",[t._v("vnode")]),t._v("全部加到空的容器中")]),t._v(" "),s("li",[t._v("可以对比新的"),s("code",[t._v("vnode")]),t._v("和旧的"),s("code",[t._v("vnode")]),t._v("，找出所需的最小的改变")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vnode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ul#list'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" container "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("patch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" vnode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把vnode加到空的容器中")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模拟改变")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" btnChange "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btnChange'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nbtnChange"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" newVnode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ul#list'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 11'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 22'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li.item'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item 33'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("patch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vnode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newVnode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"_1-4-vdom-为何使用-diff-算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-vdom-为何使用-diff-算法"}},[t._v("#")]),t._v(" 1.4. Vdom 为何使用 Diff 算法？")]),t._v(" "),s("ol",[s("li",[t._v("DOM操作是昂贵的，因此尽量减少DOM操作。")]),t._v(" "),s("li",[t._v("找出本次DOM必须更新的节点来更新，其他的不更新。")]),t._v(" "),s("li",[t._v("这个“找出”的过程，就需要"),s("code",[t._v("diff")]),t._v("算法。")])]),t._v(" "),s("h3",{attrs:{id:"_1-5-vdom-的-diff-算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-vdom-的-diff-算法"}},[t._v("#")]),t._v(" 1.5. Vdom 的 Diff 算法")]),t._v(" "),s("ul",[s("li",[t._v("同层比对。第一层比较，如果第一层有差异，不管下面的DOM是否相同，删除下面的，全部替换。这样减少了DOM比对中的性能损耗，某些情况，比如第二层DOM相同时增加了性能损耗。")]),t._v(" "),s("li",[s("code",[t._v("key")]),t._v("值极大了提升了"),s("code",[t._v("Diff")]),t._v("算法性能。不要用"),s("code",[t._v("index")]),t._v("做"),s("code",[t._v("key")]),t._v("值，是因为"),s("code",[t._v("index")]),t._v("值不稳定，比如删掉第一个，后面的"),s("code",[t._v("index")]),t._v("都要减1。")])]),t._v(" "),s("h3",{attrs:{id:"_1-6-diff-算法和调和"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-diff-算法和调和"}},[t._v("#")]),t._v(" 1.6. Diff 算法和调和")]),t._v(" "),s("h4",{attrs:{id:"_1-6-1-diff-算法的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-1-diff-算法的作用"}},[t._v("#")]),t._v(" 1.6.1. Diff 算法的作用")]),t._v(" "),s("p",[t._v("计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。")]),t._v(" "),s("h4",{attrs:{id:"_1-6-2-传统-diff-算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-2-传统-diff-算法"}},[t._v("#")]),t._v(" 1.6.2. 传统 Diff 算法")]),t._v(" "),s("p",[t._v("通过循环递归对节点进行依次对比，算法复杂度达到 "),s("code",[t._v("O(n^3)")]),t._v(" ，n是树的节点数，这个有多可怕呢？——如果要展示1000个节点，得执行上亿次比较。。即便是CPU快能执行30亿条命令，也很难在一秒内计算出差异。")]),t._v(" "),s("h4",{attrs:{id:"_1-6-3-react-的-diff-算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-3-react-的-diff-算法"}},[t._v("#")]),t._v(" 1.6.3. React 的 Diff 算法")]),t._v(" "),s("p",[t._v("（1）什么是调和？\n将"),s("code",[t._v("Virtual DOM")]),t._v("树转换成"),s("code",[t._v("actual DOM")]),t._v("树的"),s("strong",[t._v("最少操作")]),t._v("的过程 称为 调和 。")]),t._v(" "),s("p",[t._v("（2）什么是 React 的"),s("code",[t._v("diff")]),t._v("算法？\n"),s("code",[t._v("diff")]),t._v(" 算法是调和的具体实现。")]),t._v(" "),s("h4",{attrs:{id:"_1-6-4-diff-策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-4-diff-策略"}},[t._v("#")]),t._v(" 1.6.4. Diff 策略")]),t._v(" "),s("p",[t._v("React用 三大策略 将"),s("code",[t._v("O(n^3)")]),t._v("复杂度 转化为 "),s("code",[t._v("O(n)")]),t._v("复杂度")]),t._v(" "),s("p",[t._v("（1）策略一（"),s("code",[t._v("tree diff")]),t._v("）：\nWeb UI中DOM节点跨层级的移动操作特别少，可以忽略不计。")]),t._v(" "),s("p",[t._v("（1）策略二（"),s("code",[t._v("component diff")]),t._v("）：\n拥有相同类的两个组件 生成相似的树形结构，\n拥有不同类的两个组件 生成不同的树形结构。")]),t._v(" "),s("p",[t._v("（1）策略三（"),s("code",[t._v("element diff")]),t._v("）：\n对于同一层级的一组子节点，通过唯一id区分。")]),t._v(" "),s("h4",{attrs:{id:"_1-6-5-tree-diff"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-5-tree-diff"}},[t._v("#")]),t._v(" 1.6.5. tree diff")]),t._v(" "),s("p",[t._v("（1）React通过updateDepth对Virtual DOM树进行层级控制。\n（2）对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。\n（3）只需遍历一次，就能完成整棵DOM树的比较。")]),t._v(" "),s("p",[t._v("那么问题来了，如果DOM节点出现了跨层级操作,diff会咋办呢？\n答：diff只简单考虑同层级的节点位置变换，如果是跨层级的话，只有"),s("strong",[t._v("创建节点")]),t._v("和"),s("strong",[t._v("删除节点")]),t._v("的操作。")]),t._v(" "),s("h4",{attrs:{id:"_1-6-6-element-diff"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-6-element-diff"}},[t._v("#")]),t._v(" 1.6.6. element diff")]),t._v(" "),s("p",[t._v("Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。")]),t._v(" "),s("p",[t._v("可以使用元素在数组中的下标作为 key。这个策略在元素"),s("strong",[t._v("不进行重新排序")]),t._v("时比较合适，"),s("strong",[t._v("如果有顺序修改，diff 就会变得慢")]),t._v("。")]),t._v(" "),s("p",[t._v("参考资料："),s("a",{attrs:{href:"https://www.jianshu.com/p/3ba0822018cf",target:"_blank",rel:"noopener noreferrer"}},[t._v("diff算法"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);