(window.webpackJsonp=window.webpackJsonp||[]).push([[268],{540:function(_,t,a){"use strict";a.r(t);var v=a(14),r=Object(v.a)({},(function(){var _=this,t=_._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("ul",[t("li",[t("a",{attrs:{href:"#1-%E8%92%99%E7%89%B9%E5%8D%A1%E7%BD%97%E6%96%B9%E6%B3%95%E5%85%A5%E9%97%A8"}},[_._v("1. 蒙特卡罗方法入门")]),_._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"#11-%E6%A6%82%E8%BF%B0"}},[_._v("1.1. 概述")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#12-%CF%80%E7%9A%84%E8%AE%A1%E7%AE%97"}},[_._v("1.2. π的计算")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#13-%E7%A7%AF%E5%88%86%E7%9A%84%E8%AE%A1%E7%AE%97"}},[_._v("1.3. 积分的计算")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#14-%E4%BA%A4%E9%80%9A%E5%A0%B5%E5%A1%9E"}},[_._v("1.4. 交通堵塞")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#15"}},[_._v("1.5.")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#16-%E4%BA%A7%E5%93%81%E5%8E%9A%E5%BA%A6"}},[_._v("1.6. 产品厚度")])]),_._v(" "),t("li",[t("a",{attrs:{href:"#17-%E8%AF%81%E5%88%B8%E5%B8%82%E5%9C%BA"}},[_._v("1.7. 证券市场")])])])])]),_._v(" "),t("h2",{attrs:{id:"_1-蒙特卡罗方法入门"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-蒙特卡罗方法入门"}},[_._v("#")]),_._v(" 1. 蒙特卡罗方法入门")]),_._v(" "),t("h3",{attrs:{id:"_1-1-概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-概述"}},[_._v("#")]),_._v(" 1.1. 概述")]),_._v(" "),t("p",[_._v("蒙特卡罗方法是一种计算方法。原理是"),t("strong",[_._v("通过大量随机样本，去了解一个系统，进而得到所要计算的值")]),_._v("。")]),_._v(" "),t("p",[_._v("它非常强大和灵活，又相当简单易懂，很容易实现。对于许多问题来说，它往往是最简单的计算方法，有时甚至是唯一可行的方法。")]),_._v(" "),t("p",[_._v('它诞生于上个世纪40年代美国的"曼哈顿计划"，名字来源于赌城蒙特卡罗，象征概率。')]),_._v(" "),t("h3",{attrs:{id:"_1-2-π的计算"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-π的计算"}},[_._v("#")]),_._v(" 1.2. π的计算")]),_._v(" "),t("p",[_._v("第一个例子是，如何用蒙特卡罗方法计算圆周率π。")]),_._v(" "),t("p",[_._v("正方形内部有一个相切的圆，它们的面积之比是π/4。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606151557_7ae779c0e5d2.png",alt:"img"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606151603_61ba04b1ef94.png",alt:"img"}})]),_._v(" "),t("p",[_._v("现在，在这个正方形内部，随机产生10000个点（即10000个坐标对 (x, y)），计算它们与中心点的距离，从而判断是否落在圆的内部。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606151623_0cc88d1e38e2.png",alt:"img"}})]),_._v(" "),t("p",[_._v("如果这些点均匀分布，那么圆内的点应该占到所有点的 π/4，因此将这个比值乘以4，就是π的值。通过R语言脚本随机模拟30000个点，π的估算值与真实值相差0.07%。")]),_._v(" "),t("h3",{attrs:{id:"_1-3-积分的计算"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-积分的计算"}},[_._v("#")]),_._v(" 1.3. 积分的计算")]),_._v(" "),t("p",[_._v("上面的方法加以推广，就可以计算任意一个积分的值。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606151718_09dbac0005db.png",alt:"img"}})]),_._v(" "),t("p",[_._v("比如，计算函数 y = x2 在 [0, 1] 区间的积分，就是求出下图红色部分的面积。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606151745_a6e7aaed9dcc.png",alt:"img"}})]),_._v(" "),t("p",[_._v("这个函数在 (1,1) 点的取值为1，所以整个红色区域在一个面积为1的正方形里面。在该正方形内部，产生大量随机点，可以计算出有多少点落在红色区域（判断条件 y < x2）。这个比重就是所要求的积分值。")]),_._v(" "),t("p",[_._v("用Matlab模拟100万个随机点，结果为0.3328。")]),_._v(" "),t("h3",{attrs:{id:"_1-4-交通堵塞"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-交通堵塞"}},[_._v("#")]),_._v(" 1.4. 交通堵塞")]),_._v(" "),t("p",[_._v("蒙特卡罗方法不仅可以用于计算，还可以用于模拟系统内部的随机运动。下面的例子模拟单车道的交通堵塞。")]),_._v(" "),t("p",[_._v("根据 Nagel-Schreckenberg 模型，车辆的运动满足以下规则。")]),_._v(" "),t("ul",[t("li",[_._v("当前速度是 v 。")]),_._v(" "),t("li",[_._v("如果前面没车，它在下一秒的速度会提高到 v + 1 ，直到达到规定的最高限速。")]),_._v(" "),t("li",[_._v("如果前面有车，距离为d，且 d < v，那么它在下一秒的速度会降低到 d - 1 。")]),_._v(" "),t("li",[_._v("此外，司机还会以概率 p 随机减速， 将下一秒的速度降低到 v - 1 。")])]),_._v(" "),t("p",[_._v("在一条直线上，随机产生100个点，代表道路上的100辆车，另取概率 p 为 0.3 。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606152024_8511e246f211.png",alt:"img"}})]),_._v(" "),t("p",[_._v("上图中，横轴代表距离（从左到右），纵轴代表时间（从上到下），因此每一行就表示下一秒的道路情况。")]),_._v(" "),t("p",[_._v("可以看到，该模型会随机产生交通拥堵（图形上黑色聚集的部分）。这就证明了，单车道即使没有任何原因，也会产生交通堵塞。")]),_._v(" "),t("h3",{attrs:{id:"_1-5"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5"}},[_._v("#")]),_._v(" 1.5.")]),_._v(" "),t("h3",{attrs:{id:"_1-6-产品厚度"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-产品厚度"}},[_._v("#")]),_._v(" 1.6. 产品厚度")]),_._v(" "),t("p",[_._v("某产品由八个零件堆叠组成。也就是说，这八个零件的厚度总和，等于该产品的厚度。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606152138_5726548b15be.png",alt:"img"}})]),_._v(" "),t("p",[_._v("已知该产品的厚度，必须控制在27mm以内，但是每个零件有一定的概率，厚度会超出误差。请问有多大的概率，产品的厚度会超出27mm？")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606152147_5c8d194c13f2.png",alt:"img"}})]),_._v(" "),t("p",[_._v("取100000个随机样本，每个样本有8个值，对应8个零件各自的厚度。计算发现，产品的合格率为99.9979%，即百万分之21的概率，厚度会超出27mm。")]),_._v(" "),t("h3",{attrs:{id:"_1-7-证券市场"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-7-证券市场"}},[_._v("#")]),_._v(" 1.7. 证券市场")]),_._v(" "),t("p",[_._v("证券市场有时交易活跃，有时交易冷清。下面是你对市场的预测。")]),_._v(" "),t("ul",[t("li",[_._v("如果交易冷清，你会以平均价11元，卖出5万股。")]),_._v(" "),t("li",[_._v("如果交易活跃，你会以平均价8元，卖出10万股。")]),_._v(" "),t("li",[_._v("如果交易温和，你会以平均价10元，卖出7.5万股。")])]),_._v(" "),t("p",[_._v("已知你的成本在每股5.5元到7.5元之间，平均是6.5元。请问接下来的交易，你的净利润会是多少？")]),_._v(" "),t("p",[_._v("取1000个随机样本，每个样本有两个数值：一个是证券的成本（5.5元到7.5元之间的均匀分布），另一个是当前市场状态（冷清、活跃、温和，各有三分之一可能）。")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://img.uwayfly.com/article_mike_20200606152407_ecca60b65fa7.png",alt:"img"}})]),_._v(" "),t("p",[_._v("模拟计算得到，平均净利润为92, 427美元。")])])}),[],!1,null,null,null);t.default=r.exports}}]);