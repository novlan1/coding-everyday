(window.webpackJsonp=window.webpackJsonp||[]).push([[600],{870:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("ul",[a("li",[a("a",{attrs:{href:"#1-%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B"}},[t._v("1. 基本数据类型")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#2-%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B"}},[t._v("2. 引用类型")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#3-%E5%B8%B8%E9%87%8F"}},[t._v("3. 常量")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#4-%E6%BA%A2%E5%87%BA"}},[t._v("4. 溢出")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#5-println"}},[t._v("5. "),a("code",[t._v("println")])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#6-if%E8%AF%AD%E5%8F%A5"}},[t._v("6. "),a("code",[t._v("if")]),t._v("语句")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#7-%E5%88%A4%E6%96%AD%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%E7%9B%B8%E7%AD%89"}},[t._v("7. 判断引用类型相等")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#8-switch"}},[t._v("8. switch")])])]),t._v(" "),a("h3",{attrs:{id:"_1-基本数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本数据类型"}},[t._v("#")]),t._v(" 1. 基本数据类型")]),t._v(" "),a("p",[t._v("基本数据类型是CPU可以直接进行运算的类型。Java定义了以下几种基本数据类型：")]),t._v(" "),a("ul",[a("li",[t._v("整数类型：byte，short，int，long")]),t._v(" "),a("li",[t._v("浮点数类型：float，double")]),t._v(" "),a("li",[t._v("字符类型：char")]),t._v(" "),a("li",[t._v("布尔类型：boolean")])]),t._v(" "),a("p",[t._v("计算机内存的最小存储单元是字节（byte），一个字节就是一个8位二进制数，即8个bit。它的二进制表示范围从"),a("code",[t._v("00000000")]),t._v("~"),a("code",[t._v("11111111")]),t._v("，换算成十进制是0~255，换算成十六进制是"),a("code",[t._v("00")]),t._v("~"),a("code",[t._v("ff")]),t._v("。")]),t._v(" "),a("p",[t._v("不同的数据类型占用的字节数不一样。我们看一下Java基本数据类型占用的字节数：")]),t._v(" "),a("div",{staticClass:"language-ascii extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("       ┌───┐\n  byte │   │\n       └───┘\n       ┌───┬───┐\n short │   │   │\n       └───┴───┘\n       ┌───┬───┬───┬───┐\n   int │   │   │   │   │\n       └───┴───┴───┴───┘\n       ┌───┬───┬───┬───┬───┬───┬───┬───┐\n  long │   │   │   │   │   │   │   │   │\n       └───┴───┴───┴───┴───┴───┴───┴───┘\n       ┌───┬───┬───┬───┐\n float │   │   │   │   │\n       └───┴───┴───┴───┘\n       ┌───┬───┬───┬───┬───┬───┬───┬───┐\ndouble │   │   │   │   │   │   │   │   │\n       └───┴───┴───┴───┴───┴───┴───┴───┘\n       ┌───┬───┐\n  char │   │   │\n       └───┴───┘\n")])])]),a("p",[a("code",[t._v("byte")]),t._v("恰好就是一个字节，而"),a("code",[t._v("long")]),t._v("和"),a("code",[t._v("double")]),t._v("需要8个字节。")]),t._v(" "),a("h3",{attrs:{id:"_2-引用类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-引用类型"}},[t._v("#")]),t._v(" 2. 引用类型")]),t._v(" "),a("p",[t._v("除了上述基本类型的变量，剩下的都是引用类型。比如String、数组、类、接口，引用类型最常用的就是"),a("code",[t._v("String")]),t._v("字符串：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('String s = "hello";\n')])])]),a("p",[t._v("引用类型的变量类似于C语言的指针，它内部存储一个“地址”，指向某个对象在内存的位置。")]),t._v(" "),a("h3",{attrs:{id:"_3-常量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-常量"}},[t._v("#")]),t._v(" 3. 常量")]),t._v(" "),a("p",[t._v("定义变量的时候，如果加上"),a("code",[t._v("final")]),t._v("修饰符，这个变量就变成了常量：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("final double PI = 3.14; // PI是一个常量\ndouble r = 5.0;\ndouble area = PI * r * r;\n")])])]),a("p",[t._v("使用"),a("code",[t._v("var")]),t._v("定义变量，仅仅是少写了变量类型而已：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("StringBuilder sb = new StringBuilder();\n// 等于\nvar sb = new StringBuilder();\n")])])]),a("h3",{attrs:{id:"_4-溢出"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-溢出"}},[t._v("#")]),t._v(" 4. 溢出")]),t._v(" "),a("p",[t._v("整数运算在除数为"),a("code",[t._v("0")]),t._v("时会报错，而浮点数运算在除数为"),a("code",[t._v("0")]),t._v("时，不会报错，但会返回几个特殊值：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("NaN")]),t._v("表示Not a Number")]),t._v(" "),a("li",[a("code",[t._v("Infinity")]),t._v("表示无穷大")]),t._v(" "),a("li",[a("code",[t._v("-Infinity")]),t._v("表示负无穷大")])]),t._v(" "),a("p",[t._v("例如：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("double d1 = 0.0 / 0; // NaN\ndouble d2 = 1.0 / 0; // Infinity\ndouble d3 = -1.0 / 0; // -Infinity\n")])])]),a("p",[t._v("Java的数组有几个特点：")]),t._v(" "),a("ul",[a("li",[t._v("数组所有元素初始化为默认值，整型都是"),a("code",[t._v("0")]),t._v("，浮点型是"),a("code",[t._v("0.0")]),t._v("，布尔型是"),a("code",[t._v("false")]),t._v("；")]),t._v(" "),a("li",[t._v("数组一旦创建后，大小就不可改变。")])]),t._v(" "),a("h3",{attrs:{id:"_5-println"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-println"}},[t._v("#")]),t._v(" 5. "),a("code",[t._v("println")])]),t._v(" "),a("p",[a("code",[t._v("println")]),t._v("是print line的缩写，表示输出并换行。因此，如果输出后不想换行，可以用"),a("code",[t._v("print()")])]),t._v(" "),a("h3",{attrs:{id:"_6-if语句"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-if语句"}},[t._v("#")]),t._v(" 6. "),a("code",[t._v("if")]),t._v("语句")]),t._v(" "),a("p",[t._v("当"),a("code",[t._v("if")]),t._v("语句块只有一行语句时，可以省略花括号{}，但不推荐。")]),t._v(" "),a("h3",{attrs:{id:"_7-判断引用类型相等"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-判断引用类型相等"}},[t._v("#")]),t._v(" 7. 判断引用类型相等")]),t._v(" "),a("p",[a("code",[t._v("==")]),t._v("表示“引用是否相等”，或者说，是否指向同一个对象，要判断引用类型的变量内容是否相等，必须使用"),a("code",[t._v("equals()")]),t._v("方法。")]),t._v(" "),a("p",[t._v("执行语句"),a("code",[t._v("s1.equals(s2)")]),t._v("时，如果变量"),a("code",[t._v("s1")]),t._v("为"),a("code",[t._v("null")]),t._v("，会报"),a("code",[t._v("NullPointerException")]),t._v("。")]),t._v(" "),a("h3",{attrs:{id:"_8-switch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-switch"}},[t._v("#")]),t._v(" 8. switch")]),t._v(" "),a("p",[t._v("用"),a("code",[t._v("switch")]),t._v("时，注意"),a("code",[t._v("case")]),t._v("语句并没有花括号"),a("code",[t._v("{}")]),t._v("，而且，"),a("code",[t._v("case")]),t._v("语句具有“"),a("em",[t._v("穿透性")]),t._v("”，漏写"),a("code",[t._v("break")]),t._v("将导致意想不到的结果。")]),t._v(" "),a("p",[t._v("如果有几个"),a("code",[t._v("case")]),t._v("语句执行的是同一组语句块，可以这么写：")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Main")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" option "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("option"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Selected 1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Selected 2, 3"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Not selected"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("没有在构造方法中初始化字段时，引用类型的字段默认是"),a("code",[t._v("null")]),t._v("，数值类型的字段用默认值，"),a("code",[t._v("int")]),t._v("类型默认值是"),a("code",[t._v("0")]),t._v("，布尔类型默认值是"),a("code",[t._v("false")]),t._v("。")]),t._v(" "),a("p",[t._v("方法名相同，但各自的参数不同，称为方法重载（"),a("code",[t._v("Overload")]),t._v("）。")]),t._v(" "),a("p",[t._v("在Java中，任何"),a("code",[t._v("class")]),t._v("的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句"),a("code",[t._v("super();")]),t._v("。")])])}),[],!1,null,null,null);a.default=e.exports}}]);