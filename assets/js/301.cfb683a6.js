(window.webpackJsonp=window.webpackJsonp||[]).push([[301],{572:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("ul",[a("li",[a("a",{attrs:{href:"#1-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%86%99%E6%B3%95"}},[t._v("1. 模块的写法")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#11-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%8E%9F%E5%A7%8B%E5%86%99%E6%B3%95"}},[t._v("1.1. 模块的原始写法")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#12-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%86%99%E6%B3%95"}},[t._v("1.2. 模块的对象写法")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#13-%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E5%86%99%E6%B3%95"}},[t._v("1.3. 立即执行函数写法")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#14-%E6%94%BE%E5%A4%A7%E6%A8%A1%E5%BC%8F"}},[t._v("1.4. 放大模式")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#15-%E5%AE%BD%E6%94%BE%E5%A4%A7%E6%A8%A1%E5%BC%8Floose-augmentation"}},[t._v("1.5. 宽放大模式（"),a("code",[t._v("Loose augmentation")]),t._v("）")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#16-%E8%BE%93%E5%85%A5%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F"}},[t._v("1.6. 输入全局变量")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#2-amd%E8%A7%84%E8%8C%83"}},[t._v("2. AMD规范")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#21-commonjs"}},[t._v("2.1. CommonJS")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#22-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83"}},[t._v("2.2. 浏览器环境")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#23-amd"}},[t._v("2.3. AMD")])])])])]),t._v(" "),a("h2",{attrs:{id:"_1-模块的写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-模块的写法"}},[t._v("#")]),t._v(" 1. 模块的写法")]),t._v(" "),a("h3",{attrs:{id:"_1-1-模块的原始写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-模块的原始写法"}},[t._v("#")]),t._v(" 1.1. 模块的原始写法")]),t._v(" "),a("p",[t._v("只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("m1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("m2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("缺点：污染了全局变量，有可能会发生命名冲突")]),t._v(" "),a("h3",{attrs:{id:"_1-2-模块的对象写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-模块的对象写法"}},[t._v("#")]),t._v(" 1.2. 模块的对象写法")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　_count "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("m1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("m2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("缺点：会暴露所有的模块成员，内部状态可以被外部改写。")]),t._v(" "),a("h3",{attrs:{id:"_1-3-立即执行函数写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-立即执行函数写法"}},[t._v("#")]),t._v(" 1.3. 立即执行函数写法")]),t._v(" "),a("p",[t._v('使用"立即执行函数"（'),a("code",[t._v("Immediately-Invoked Function Expression，IIFE")]),t._v("），可以达到不暴露私有成员的目的。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _count "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("m1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("m2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　m1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" m1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n　　　　m2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" m2\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("使用上面的写法，外部代码无法读取内部的_count变量。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("info")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//undefined")]),t._v("\n")])])]),a("p",[t._v("module1就是Javascript模块的基本写法。下面，再对这种写法进行加工。")]),t._v(" "),a("h3",{attrs:{id:"_1-4-放大模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-放大模式"}},[t._v("#")]),t._v(" 1.4. 放大模式")]),t._v(" "),a("p",[t._v('如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（'),a("code",[t._v("augmentation")]),t._v("）。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("mod")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　mod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("m3")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n　　　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" mod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("上面的代码为"),a("code",[t._v("module1")]),t._v("模块添加了一个新方法"),a("code",[t._v("m3()")]),t._v("，然后返回新的"),a("code",[t._v("module1")]),t._v("模块。")]),t._v(" "),a("h3",{attrs:{id:"_1-5-宽放大模式-loose-augmentation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-宽放大模式-loose-augmentation"}},[t._v("#")]),t._v(" 1.5. 宽放大模式（"),a("code",[t._v("Loose augmentation")]),t._v("）")]),t._v(" "),a("p",[t._v('在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("mod")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" mod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v('与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。')]),t._v(" "),a("h3",{attrs:{id:"_1-6-输入全局变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-输入全局变量"}},[t._v("#")]),t._v(" 1.6. 输入全局变量")]),t._v(" "),a("p",[t._v("独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。")]),t._v(" "),a("p",[t._v("为了在模块内部调用全局变量，必须显式地将其他变量输入模块。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("YAHOO")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("jQuery"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("YAHOO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("上面的module1模块需要使用"),a("code",[t._v("jQuery")]),t._v("库和"),a("code",[t._v("YUI")]),t._v("库，就把这两个库（其实是两个模块）当作参数输入"),a("code",[t._v("module1")]),t._v("。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。")]),t._v(" "),a("h2",{attrs:{id:"_2-amd规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-amd规范"}},[t._v("#")]),t._v(" 2. AMD规范")]),t._v(" "),a("h3",{attrs:{id:"_2-1-commonjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-commonjs"}},[t._v("#")]),t._v(" 2.1. CommonJS")]),t._v(" "),a("p",[t._v("在CommonJS中，有一个全局性方法"),a("code",[t._v("require()")]),t._v("，用于加载模块。假定有一个数学模块"),a("code",[t._v("math.js")]),t._v("，就可以像下面这样加载。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" math "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'math'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("然后，就可以调用模块提供的方法：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" math "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'math'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 5")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-2-浏览器环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-浏览器环境"}},[t._v("#")]),t._v(" 2.2. 浏览器环境")]),t._v(" "),a("p",[t._v("上面的代码，第二行"),a("code",[t._v("math.add(2, 3)")]),t._v("，在第一行"),a("code",[t._v("require('math')")]),t._v("之后运行，因此必须等"),a("code",[t._v("math.js")]),t._v("加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。")]),t._v(" "),a("p",[t._v('这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。')]),t._v(" "),a("p",[t._v('因此，浏览器端的模块，不能采用"同步加载"（'),a("code",[t._v("synchronous")]),t._v('），只能采用"异步加载"（'),a("code",[t._v("asynchronous")]),t._v("）。这就是AMD规范诞生的背景。")]),t._v(" "),a("h3",{attrs:{id:"_2-3-amd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-amd"}},[t._v("#")]),t._v(" 2.3. AMD")]),t._v(" "),a("p",[t._v('AMD是"'),a("code",[t._v("Asynchronous Module Definition")]),t._v('"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。')]),t._v(" "),a("p",[t._v("AMD也采用"),a("code",[t._v("require()")]),t._v("语句加载模块，但是不同于CommonJS，它要求两个参数：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数"),a("code",[t._v("callback")]),t._v("，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'math'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("math")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n　　math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);