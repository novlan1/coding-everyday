(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{321:function(_,v,t){"use strict";t.r(v);var a=t(14),r=Object(a.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("ul",[v("li",[v("a",{attrs:{href:"#1-%E4%BD%9C%E4%B8%9A%E7%AE%A1%E7%90%86%E4%B9%8B%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6"}},[_._v("1. 作业管理之进程调度")]),_._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"#11-%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6"}},[_._v("1.1. 进程调度")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#12-%E4%B8%89%E4%B8%AA%E6%9C%BA%E5%88%B6"}},[_._v("1.2. 三个机制")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#13-%E5%88%86%E7%B1%BB"}},[_._v("1.3. 分类")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#14-%E9%9D%9E%E6%8A%A2%E5%8D%A0%E5%BC%8F%E7%9A%84%E8%B0%83%E5%BA%A6"}},[_._v("1.4. 非抢占式的调度")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#15-%E6%8A%A2%E5%8D%A0%E5%BC%8F%E7%9A%84%E8%B0%83%E5%BA%A6"}},[_._v("1.5. 抢占式的调度")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#16-%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6%E7%AE%97%E6%B3%95"}},[_._v("1.6. 进程调度算法")])])])]),_._v(" "),v("li",[v("a",{attrs:{href:"#2-%E4%BD%9C%E4%B8%9A%E7%AE%A1%E7%90%86%E4%B9%8B%E6%AD%BB%E9%94%81"}},[_._v("2. 作业管理之死锁")]),_._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"#21-%E6%AD%BB%E9%94%81%E7%9A%84%E4%BA%A7%E7%94%9F"}},[_._v("2.1. 死锁的产生")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#22-%E6%AD%BB%E9%94%81%E7%9A%84%E5%9B%9B%E4%B8%AA%E5%BF%85%E8%A6%81%E6%9D%A1%E4%BB%B6"}},[_._v("2.2. 死锁的四个必要条件")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#23-%E9%A2%84%E9%98%B2%E6%AD%BB%E9%94%81%E7%9A%84%E6%96%B9%E6%B3%95"}},[_._v("2.3. 预防死锁的方法")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#24-%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%95"}},[_._v("2.4. 银行家算法")])])])])]),_._v(" "),v("h2",{attrs:{id:"作业管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#作业管理"}},[_._v("#")]),_._v(" 作业管理 ")]),_._v(" "),v("h3",{attrs:{id:"_1-作业管理之进程调度"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-作业管理之进程调度"}},[_._v("#")]),_._v(" 1. 作业管理之进程调度")]),_._v(" "),v("h4",{attrs:{id:"_1-1-进程调度"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-进程调度"}},[_._v("#")]),_._v(" 1.1. 进程调度")]),_._v(" "),v("ul",[v("li",[_._v("计算机通过决策决定哪个就绪进程可以获得CPU使用权")]),_._v(" "),v("li",[_._v("前提是多道程序设计")]),_._v(" "),v("li",[_._v("保存 旧进程的运行信息，清除旧进程（收拾包袱）")]),_._v(" "),v("li",[_._v("选择新进程，准备运行环境并分配CPU（新进驻）")])]),_._v(" "),v("h4",{attrs:{id:"_1-2-三个机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-三个机制"}},[_._v("#")]),_._v(" 1.2. 三个机制")]),_._v(" "),v("ul",[v("li",[_._v("就绪队列的排队机制")]),_._v(" "),v("li",[_._v("选择运行进程的委派机制（选择就绪进程，分配CPU给它）")]),_._v(" "),v("li",[_._v("新老进程的上下文切换机制（保存当前进程的上下文信息，装入被委派执行进程的运行上下文）")])]),_._v(" "),v("h4",{attrs:{id:"_1-3-分类"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-分类"}},[_._v("#")]),_._v(" 1.3. 分类")]),_._v(" "),v("ol",[v("li",[_._v("非抢占式的调度")]),_._v(" "),v("li",[_._v("抢占式调度")])]),_._v(" "),v("h4",{attrs:{id:"_1-4-非抢占式的调度"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-非抢占式的调度"}},[_._v("#")]),_._v(" 1.4. 非抢占式的调度")]),_._v(" "),v("ul",[v("li",[_._v("处理器一旦分配给某个进程，就让该进程一直使用下去")]),_._v(" "),v("li",[_._v("调度程序不以任何原因抢占正在使用的处理器")]),_._v(" "),v("li",[_._v("直到进程完成工作或者因为IO阻塞才会让出处理器")])]),_._v(" "),v("h4",{attrs:{id:"_1-5-抢占式的调度"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-抢占式的调度"}},[_._v("#")]),_._v(" 1.5. 抢占式的调度")]),_._v(" "),v("ul",[v("li",[_._v("允许调度程序以一定的策略暂停当前运行的进程")]),_._v(" "),v("li",[_._v("保存旧进程的上下文信息，分配处理器给新进程")])]),_._v(" "),v("p",[_._v("对比：")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th"),_._v(" "),v("th",[_._v("抢占式调度")]),_._v(" "),v("th",[_._v("非抢占式调度")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("系统开销")]),_._v(" "),v("td",[_._v("频繁切换，开销大")]),_._v(" "),v("td",[_._v("切换次数少，开销小")])]),_._v(" "),v("tr",[v("td",[_._v("公平性")]),_._v(" "),v("td",[_._v("相对公平")]),_._v(" "),v("td",[_._v("不公平")])]),_._v(" "),v("tr",[v("td",[_._v("应用")]),_._v(" "),v("td",[_._v("通用系统")]),_._v(" "),v("td",[_._v("专用系统")])])])]),_._v(" "),v("h4",{attrs:{id:"_1-6-进程调度算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-进程调度算法"}},[_._v("#")]),_._v(" 1.6. 进程调度算法")]),_._v(" "),v("ol",[v("li",[_._v("先来先服务调度算法")]),_._v(" "),v("li",[_._v("短进程优先调度算法（不利于长作业进程的执行）")]),_._v(" "),v("li",[_._v("高优先权优先调度算法（前台进程 优先级高于后台进程）")]),_._v(" "),v("li",[_._v("时间片轮转调度算法（最公平）")])]),_._v(" "),v("p",[_._v("只有最后一个是抢占式的调度")]),_._v(" "),v("h3",{attrs:{id:"_2-作业管理之死锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-作业管理之死锁"}},[_._v("#")]),_._v(" 2. 作业管理之死锁")]),_._v(" "),v("p",[_._v("什么是死锁？")]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("互相等待，一直阻塞下去")]),_._v("（如五哲学家进餐模型）")])]),_._v(" "),v("h4",{attrs:{id:"_2-1-死锁的产生"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-死锁的产生"}},[_._v("#")]),_._v(" 2.1. 死锁的产生")]),_._v(" "),v("ul",[v("li",[_._v("竞争资源（本质：共享资源数量不足）")]),_._v(" "),v("li",[_._v("进程调度顺序不当")])]),_._v(" "),v("h4",{attrs:{id:"_2-2-死锁的四个必要条件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-死锁的四个必要条件"}},[_._v("#")]),_._v(" 2.2. 死锁的四个必要条件")]),_._v(" "),v("ol",[v("li",[_._v("互斥条件（进程对资源的使用是"),v("strong",[_._v("排他性的使用")]),_._v("，资源只能由一个进程使用，其他进程只能等待）\n2. 请求保持条件（进程"),v("strong",[_._v("至少保持一个资源，又提出新的资源请求")]),_._v("；新资源被占用，请求被阻塞；被阻塞的进程不释放自己保持的资源）")]),_._v(" "),v("li",[_._v("不可剥夺条件（进程获得的资源在"),v("strong",[_._v("未完成使用前不能被剥夺")]),_._v("，获得的资源只能由进程自身释放）")]),_._v(" "),v("li",[_._v("环路等待条件（发生死锁时，必然存在"),v("strong",[_._v("进程-资源环形链")]),_._v("）")])]),_._v(" "),v("h4",{attrs:{id:"_2-3-预防死锁的方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-预防死锁的方法"}},[_._v("#")]),_._v(" 2.3. 预防死锁的方法")]),_._v(" "),v("ul",[v("li",[_._v("系统规定进程运行之前，"),v("strong",[_._v("一次性申请所有需要的资源")]),_._v("（消除请求保持条件），进程在运行期间不会提出资源请求")]),_._v(" "),v("li",[_._v("当一个进程"),v("strong",[_._v("请求新的资源得不到满足时，必须释放占有的资源")]),_._v("（消除不可剥夺条件）")]),_._v(" "),v("li",[v("strong",[_._v("可用资源线性排序")]),_._v("，申请必须按照需要递增申请，不再形成环路（摒弃环路等待条件）")])]),_._v(" "),v("h4",{attrs:{id:"_2-4-银行家算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-银行家算法"}},[_._v("#")]),_._v(" 2.4. 银行家算法")]),_._v(" "),v("p",[_._v("背景：")]),_._v(" "),v("ul",[v("li",[_._v("客户申请的贷款有限，每次申请需声明最大资金量")]),_._v(" "),v("li",[_._v("银行家在满足贷款时，都应该给用户贷款")]),_._v(" "),v("li",[_._v("客户在使用完贷款后，能够及时归还贷款")])]),_._v(" "),v("p",[_._v("需要是三个表：")]),_._v(" "),v("ol",[v("li",[_._v("已分配资源表")]),_._v(" "),v("li",[_._v("所需资源表")]),_._v(" "),v("li",[_._v("可分配资源表")])]),_._v(" "),v("p",[v("img",{attrs:{src:"/imgs/job_management_banker.png",alt:"银行家算法"}})]),_._v(" "),v("p",[_._v("过程：")]),_._v(" "),v("ul",[v("li",[_._v("所需资源表减去已分配资源表，可以得到还需分配资源表，与可分配资源表比较，看能满足哪个进程，就把资源分配给它，然后等它运行完，归还后运行其他进程")])]),_._v(" "),v("p",[v("img",{attrs:{src:"/imgs/job_management_banker2.png",alt:"银行家算法"}})])])}),[],!1,null,null,null);v.default=r.exports}}]);