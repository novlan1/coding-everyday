(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{300:function(_,v,t){"use strict";t.r(v);var s=t(14),r=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("ul",[v("li",[v("a",{attrs:{href:"#%E5%BA%94%E7%94%A8%E5%B1%82%E4%B9%8Bdns%E8%AF%A6%E8%A7%A3"}},[_._v("应用层之DNS详解")])]),_._v(" "),v("li",[v("a",{attrs:{href:"#dhcp%E5%8D%8F%E8%AE%AE"}},[_._v("DHCP协议")])])]),_._v(" "),v("h3",{attrs:{id:"应用层之dns详解"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#应用层之dns详解"}},[_._v("#")]),_._v(" 应用层之DNS详解")]),_._v(" "),v("ul",[v("li",[_._v("[ ] 应用层是"),v("strong",[_._v("面向用户")]),_._v("的一层")]),_._v(" "),v("li",[_._v("[ ] 而传输层以及以下的层"),v("strong",[_._v("提供完整的通信服务")])])]),_._v(" "),v("p",[_._v("TCP和UDP各自对应的应用层：")]),_._v(" "),v("ul",[v("li",[_._v("[ ] UDP，"),v("strong",[_._v("多媒体信息分发")]),_._v("，比如"),v("strong",[_._v("视频、语音、实时信息")]),_._v("，这一秒数据丢失没关系（卡顿），下一秒会有新的数据展示，用户关注的实时信息")]),_._v(" "),v("li",[_._v("[ ] TCP，"),v("strong",[_._v("可靠的消息传输")]),_._v("，比如金融交易、可靠通讯、MQ")])]),_._v(" "),v("p",[_._v("应用层主要功能："),v("strong",[_._v("定义应用间通信的规则")]),_._v("：")]),_._v(" "),v("ul",[v("li",[_._v("[ ] 应用进程的报文类型（请求报文、应答报文）")]),_._v(" "),v("li",[_._v("[ ] 报文的语法、格式")]),_._v(" "),v("li",[_._v("[ ] 应用进程发送数据的时机、规则")])]),_._v(" "),v("p",[_._v("DNS（"),v("code",[_._v("Domain Name System")]),_._v("）域名系统：")]),_._v(" "),v("ul",[v("li",[_._v("[ ] 把域名转为IP，再进行网络通信")]),_._v(" "),v("li",[_._v("[ ] 域：代表网络，比如前面的AS自治系统")]),_._v(" "),v("li",[_._v("[ ] 名：代表名字")]),_._v(" "),v("li",[_._v("[ ] 应用UDP协议")])]),_._v(" "),v("p",[_._v("域名：")]),_._v(" "),v("ul",[v("li",[_._v("[ ] 域名由"),v("strong",[_._v("点、字母和数字")]),_._v("组成")]),_._v(" "),v("li",[_._v("[ ] "),v("strong",[_._v("点分割不同的域")])]),_._v(" "),v("li",[_._v("[ ] 域名可以分为"),v("strong",[_._v("顶级域")]),_._v("(如"),v("code",[_._v("com")]),_._v(")、"),v("strong",[_._v("二级域")]),_._v("(如"),v("code",[_._v("baidu")]),_._v(")、"),v("strong",[_._v("三级域")]),_._v("(如"),v("code",[_._v("www")]),_._v(")")])]),_._v(" "),v("p",[_._v("顶级域分为"),v("strong",[_._v("国家")]),_._v("和"),v("strong",[_._v("通用")]),_._v("两种：\n"),v("img",{attrs:{src:"/imgs/network_DNS.png",alt:"DNS"}}),_._v(" "),v("img",{attrs:{src:"/imgs/network_DNS2.png",alt:"DNS"}})]),_._v(" "),v("p",[_._v("域名服务器：")]),_._v(" "),v("ol",[v("li",[_._v("根域名服务器")]),_._v(" "),v("li",[_._v("顶级域名服务器")]),_._v(" "),v("li",[_._v("本地域名服务器")])]),_._v(" "),v("p",[v("img",{attrs:{src:"/imgs/network_DNS3.png",alt:"DNS"}})]),_._v(" "),v("h3",{attrs:{id:"dhcp协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#dhcp协议"}},[_._v("#")]),_._v(" DHCP协议")]),_._v(" "),v("p",[_._v("DHCP（"),v("code",[_._v("Dynamic Host Configuration Protocol")]),_._v("）动态主机设置协议")]),_._v(" "),v("ul",[v("li",[_._v("[ ] DHCP是一个"),v("strong",[_._v("局域网协议")]),_._v("（"),v("strong",[_._v("由三类保留地址组成的网络称为局域网")]),_._v("）")]),_._v(" "),v("li",[_._v("[ ] DHCP是应用"),v("strong",[_._v("UDP")]),_._v("协议的应用层协议（DNS系统也是用UDP）")])]),_._v(" "),v("p",[_._v("即插即用联网")]),_._v(" "),v("ul",[v("li",[_._v("[ ] "),v("strong",[_._v("临时IP")]),_._v("（自动获得IP地址），一般是"),v("strong",[_._v("内网IP")]),_._v("，结合Nat技术（内网转换技术）进行网络连接")]),_._v(" "),v("li",[_._v("[ ] "),v("strong",[_._v("租期")])])]),_._v(" "),v("p",[_._v("过程：")]),_._v(" "),v("ul",[v("li",[_._v("[ ] DHCP服务器监听默认端口："),v("code",[_._v("67")])]),_._v(" "),v("li",[_._v("[ ] 主机使用UDP协议广播DHCP"),v("strong",[_._v("发现报文")])]),_._v(" "),v("li",[_._v("[ ] DHCP服务器发出DHCP"),v("strong",[_._v("提供报文")])]),_._v(" "),v("li",[_._v("[ ] 主机向DHCP服务器发出DHCP"),v("strong",[_._v("请求报文")])]),_._v(" "),v("li",[_._v("[ ] DHCP服务器"),v("strong",[_._v("回应并提供IP地址")])])]),_._v(" "),v("p",[_._v("类比：受伤的人大声呼救，周围人有的是医生，就先应答，再提供帮助")])])}),[],!1,null,null,null);v.default=r.exports}}]);