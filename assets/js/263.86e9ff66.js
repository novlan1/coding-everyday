(window.webpackJsonp=window.webpackJsonp||[]).push([[263],{534:function(_,v,t){"use strict";t.r(v);var a=t(14),e=Object(a.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("ul",[v("li",[v("a",{attrs:{href:"#1-%E5%8D%8F%E6%96%B9%E5%B7%AE"}},[_._v("1. 协方差")]),_._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"#11-%E5%8D%8F%E6%96%B9%E5%B7%AE%E5%85%B6%E6%84%8F%E4%B9%89"}},[_._v("1.1. 协方差其意义")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#12-%E7%90%86%E8%A7%A3"}},[_._v("1.2. 理解")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#13-%E5%8D%8F%E6%96%B9%E5%B7%AE%E6%98%AF%E6%9C%89%E5%8D%95%E4%BD%8D%E7%9A%84"}},[_._v("1.3. 协方差是有单位的")])])])])]),_._v(" "),v("h2",{attrs:{id:"_1-协方差"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-协方差"}},[_._v("#")]),_._v(" 1. 协方差")]),_._v(" "),v("h3",{attrs:{id:"_1-1-协方差其意义"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-协方差其意义"}},[_._v("#")]),_._v(" 1.1. 协方差其意义")]),_._v(" "),v("blockquote",[v("p",[_._v("度量各个维度偏离其均值的程度。协方差的值如果为正值，则说明两者是正相关的(从协方差可以引出“相关系数”的定义)，结果为负值就说明负相关的，如果为0，也是就是统计上说的“相互独立”。")])]),_._v(" "),v("h3",{attrs:{id:"_1-2-理解"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-理解"}},[_._v("#")]),_._v(" 1.2. 理解")]),_._v(" "),v("p",[_._v("如果正相关，这个计算公式，每个样本对"),v("code",[_._v("（Xi, Yi）")]),_._v(",　每个求和项大部分都是正数，即两个同方向偏离各自均值，而不同时偏离的也有，但是少，这样当样本多时，总和结果为正。下面这个图就很直观。")]),_._v(" "),v("p",[_._v("在概率论中，两个随机变量 X 与 Y 之间相互关系，大致有下列3种情况：")]),_._v(" "),v("p",[v("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20201114143142_2324947aeab5.png",alt:"正相关"}})]),_._v(" "),v("p",[_._v("当 X, Y 的联合分布像上图那样时，我们可以看出，大致上有： X 越大  Y 也越大， X 越小  Y 也越小，这种情况，我们称为“正相关”。")]),_._v(" "),v("p",[v("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20201114143232_764665e4423f.png",alt:"负相关"}})]),_._v(" "),v("p",[_._v("当X, Y 的联合分布像上图那样时，我们可以看出，大致上有：X 越大Y 反而越小，X 越小 Y 反而越大，这种情况，我们称为“负相关”。")]),_._v(" "),v("p",[v("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20201114143301_97f3674313a5.png",alt:"不相关"}})]),_._v(" "),v("p",[_._v("当X, Y  的联合分布像上图那样时，我们可以看出：既不是X  越大Y 也越大，也不是 X 越大 Y 反而越小，这种情况我们称为“ 不相关”。")]),_._v(" "),v("p",[_._v("怎样将这3种相关情况，用一个简单的数字表达出来呢？")]),_._v(" "),v("ol",[v("li",[_._v("在图中的区域（1）中，有 "),v("code",[_._v("X>EX ，Y-EY>0 ，所以(X-EX)(Y-EY)>0")]),_._v("；")]),_._v(" "),v("li",[_._v("在图中的区域（2）中，有 "),v("code",[_._v("X<EX ，Y-EY>0 ，所以(X-EX)(Y-EY)<0")]),_._v("；")]),_._v(" "),v("li",[_._v("在图中的区域（3）中，有 "),v("code",[_._v("X<EX ，Y-EY<0 ，所以(X-EX)(Y-EY)>0")]),_._v("；")]),_._v(" "),v("li",[_._v("在图中的区域（4）中，有 "),v("code",[_._v("X>EX ，Y-EY<0 ，所以(X-EX)(Y-EY)<0")]),_._v("。")])]),_._v(" "),v("ul",[v("li",[_._v("当X 与Y 正相关时，它们的（联合）分布大部分在区域（1）和（3）中，小部分在区域（2）和（4）中，所以平均来说，有"),v("code",[_._v("E(X-EX)(Y-EY)>0")]),_._v(" 。\n"),v("ul",[v("li",[_._v("可以从一维 "),v("code",[_._v("x~N(μ,σ")]),_._v(")的大部分的分布"),v("code",[_._v("（-3σ-3σ）99.7%")]),_._v("的区间取值来理解，当符合条件的X和Y区域都在这（1）（3）区间，X-EX和Y-EY的数值同大于0和小于0的居多，其乘积大于0")]),_._v(" "),v("li",[_._v("且其对应数值相乘"),v("code",[_._v("(X-EX)(Y-EY)")]),_._v("越大偏离越大")])])]),_._v(" "),v("li",[_._v("当 X与 Y负相关时，它们的分布大部分在区域（2）和（4）中，小部分在区域（1）和（3）中，所以平均来说，有"),v("code",[_._v("(X-EX)(Y-EY)<0")]),_._v(" 。")]),_._v(" "),v("li",[_._v("当 X与 Y不相关时，它们在区域（1）和（3）中的分布，与在区域（2）和（4）中的分布几乎一样多，所以平均来说，有"),v("code",[_._v("(X-EX)(Y-EY)=0")]),_._v(" 。")])]),_._v(" "),v("p",[_._v("所以，我们可以定义一个表示X, Y 相互关系的数字特征，也就是 协方差\n"),v("strong",[v("code",[_._v("cov(X, Y) = E[(X-EX)(Y-EY)]")])]),_._v(" 。")]),_._v(" "),v("ol",[v("li",[_._v("当 "),v("code",[_._v("cov(X, Y)>0")]),_._v("时，表明 X与Y 正相关；")]),_._v(" "),v("li",[_._v("当 "),v("code",[_._v("cov(X, Y)<0")]),_._v("时，表明X与Y负相关；")]),_._v(" "),v("li",[_._v("当 "),v("code",[_._v("cov(X, Y)=0")]),_._v("时，表明X与Y不相关。")])]),_._v(" "),v("p",[_._v("这就是协方差的意义。")]),_._v(" "),v("h3",{attrs:{id:"_1-3-协方差是有单位的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-协方差是有单位的"}},[_._v("#")]),_._v(" 1.3. 协方差是有单位的")]),_._v(" "),v("p",[_._v("将其除以方差的平方，也就约去了单位，成为相关系数。")])])}),[],!1,null,null,null);v.default=e.exports}}]);