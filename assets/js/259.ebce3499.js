(window.webpackJsonp=window.webpackJsonp||[]).push([[259],{529:function(t,a,_){"use strict";_.r(a);var i=_(14),r=Object(i.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("ul",[a("li",[a("a",{attrs:{href:"#1-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%A0%B7%E6%9C%AC%E6%96%B9%E5%B7%AEsample-variance%E7%9A%84%E5%88%86%E6%AF%8D%E6%98%AFn-1"}},[t._v("1. 为什么样本方差(sample variance)的分母是n-1？")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#11-%E5%AE%8C%E6%95%B4%E7%9A%84%E9%97%AE%E9%A2%98%E6%8F%8F%E8%BF%B0"}},[t._v("1.1. 完整的问题描述")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#12-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%88%86%E6%AF%8D%E6%98%AFn-1"}},[t._v("1.2. 为什么分母是n-1？")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#121-%E5%AE%9A%E6%80%A7%E7%90%86%E8%A7%A3"}},[t._v("1.2.1. 定性理解")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#122-%E5%AE%9A%E9%87%8F%E5%88%86%E6%9E%90"}},[t._v("1.2.2. 定量分析")])])])])])])]),t._v(" "),a("h2",{attrs:{id:"_1-为什么样本方差-sample-variance-的分母是n-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-为什么样本方差-sample-variance-的分母是n-1"}},[t._v("#")]),t._v(" 1. 为什么样本方差(sample variance)的分母是n-1？")]),t._v(" "),a("h3",{attrs:{id:"_1-1-完整的问题描述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-完整的问题描述"}},[t._v("#")]),t._v(" 1.1. 完整的问题描述")]),t._v(" "),a("p",[t._v("如果已知随机变量X的期望为μ，那么可以如下计算方差σ^2：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614094121_04adbec2b31a.png",alt:"img"}})]),t._v(" "),a("p",[t._v("上面的式子需要知道X的具体分布是什么（在现实应用中往往不知道准确分布），计算起来也比较复杂。")]),t._v(" "),a("p",[t._v("所以实践中常常采样之后，"),a("strong",[t._v("用下面这个S^2 来近似 σ^2")]),t._v("：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614094204_a5dc51f97d82.png",alt:"img"}})]),t._v(" "),a("p",[t._v("其实现实中，"),a("strong",[t._v("往往连X的期望μ也不清楚，只知道样本的均值")]),t._v("：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614094252_a843c21aa062.png",alt:"img"}})]),t._v(" "),a("p",[t._v("那么可以这么来计算S^2：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614094342_2a59fd5750db.png",alt:"img"}})]),t._v(" "),a("p",[t._v("那么问题来了，"),a("strong",[t._v("为什么用样本均值X'代替总体均值μ后，分母变成了n-1")]),t._v("？")]),t._v(" "),a("h3",{attrs:{id:"_1-2-为什么分母是n-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-为什么分母是n-1"}},[t._v("#")]),t._v(" 1.2. 为什么分母是n-1？")]),t._v(" "),a("h4",{attrs:{id:"_1-2-1-定性理解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-1-定性理解"}},[t._v("#")]),t._v(" 1.2.1. 定性理解")]),t._v(" "),a("p",[t._v("我们不知道μ是多少的，只能计算出X'。不同的采样对应不同的X'：")]),t._v(" "),a("p",[t._v("对于某次采样而言，当μ=X'时，下式取得最小值：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095227_0f9a48e6281a.png",alt:"img"}})]),t._v(" "),a("p",[t._v("我们也是比较容易从图像中观察出这一点，"),a("strong",[t._v("只要μ偏离X'，该值就会增大")]),t._v("。")]),t._v(" "),a("p",[t._v("所以可知：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095304_f7eeb7b0c3be.png",alt:"img"}})]),t._v(" "),a("p",[t._v("可推出：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095336_10201f9869f1.png",alt:"img"}})]),t._v(" "),a("p",[t._v("进而推出：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095405_d380cbbee184.png",alt:"img"}})]),t._v(" "),a("p",[t._v("可见，"),a("strong",[t._v("如果分母是n，倾向于低估σ^2")]),t._v("。")]),t._v(" "),a("h4",{attrs:{id:"_1-2-2-定量分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-2-定量分析"}},[t._v("#")]),t._v(" 1.2.2. 定量分析")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095842_8a5d0ad3c535.png",alt:"img"}})]),t._v(" "),a("p",[t._v("其中：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095904_77029575bead.png",alt:"img"}})]),t._v(" "),a("p",[t._v("所以：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614095940_56a8151f3f3a.png",alt:"img"}})]),t._v(" "),a("p",[t._v("其中：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614100021_8392b2a63e8f.png",alt:"img"}})]),t._v(" "),a("p",[t._v("所以：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614100058_41e365fa7a6d.png",alt:"img"}})]),t._v(" "),a("p",[t._v("也就是说，"),a("strong",[t._v("低估了σ^2/n")]),t._v("，进行一下调整：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614100308_50c5acdef28e.png",alt:"img"}})]),t._v(" "),a("p",[t._v("因此使用下面这个式子进行估计，得到的就是无偏估计：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200614100341_99115fe95066.png",alt:"img"}})])])}),[],!1,null,null,null);a.default=r.exports}}]);