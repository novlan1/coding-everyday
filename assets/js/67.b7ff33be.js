(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{338:function(s,e,r){"use strict";r.r(e);var a=r(14),t=Object(a.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("ul",[e("li",[e("a",{attrs:{href:"#1-redis"}},[s._v("1. Redis")]),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#11-redis%E8%BF%90%E8%A1%8C"}},[s._v("1.1. Redis运行")])]),s._v(" "),e("li",[e("a",{attrs:{href:"#12-mac%E4%BD%BF%E7%94%A8"}},[s._v("1.2. mac使用：")])]),s._v(" "),e("li",[e("a",{attrs:{href:"#13-redis%E5%91%BD%E4%BB%A4"}},[s._v("1.3. Redis命令")])]),s._v(" "),e("li",[e("a",{attrs:{href:"#14-ioredis%E5%BA%93"}},[s._v("1.4. "),e("code",[s._v("ioredis")]),s._v("库")])])])])]),s._v(" "),e("h2",{attrs:{id:"_1-redis"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-redis"}},[s._v("#")]),s._v(" 1. Redis")]),s._v(" "),e("h3",{attrs:{id:"_1-1-redis运行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-redis运行"}},[s._v("#")]),s._v(" 1.1. Redis运行")]),s._v(" "),e("ol",[e("li",[s._v("服务")]),s._v(" "),e("li",[s._v("不以服务的方式运行（CMD启动）")])]),s._v(" "),e("ul",[e("li",[s._v("进入CMD，进入redis的目录，执行如下命令")]),s._v(" "),e("li",[e("code",[s._v("redis-server redis.windows.conf")]),s._v("，出现下图显示表示启动成功了")]),s._v(" "),e("li",[s._v("redis-cli，进入redis环境")])]),s._v(" "),e("h3",{attrs:{id:"_1-2-mac使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-mac使用"}},[s._v("#")]),s._v(" 1.2. mac使用：")]),s._v(" "),e("ol",[e("li",[s._v("下载")]),s._v(" "),e("li",[s._v("make")]),s._v(" "),e("li",[e("code",[s._v("sudo make install")])])]),s._v(" "),e("p",[s._v("或者直接 "),e("code",[s._v("brew install redis")]),s._v("\n然后就可以"),e("code",[s._v("redis-server")]),s._v("了，因为mac已经把"),e("code",[s._v("redis-server")]),s._v("放到了环境变量里，就不需要用 "),e("code",[s._v("redis-server redis.conf")])]),s._v(" "),e("ul",[e("li",[s._v("Redis配置文件中的密码： "),e("code",[s._v("requirepass")]),s._v("默认关闭，后面跟的就是它的密码")]),s._v(" "),e("li",[s._v("登录的时候： "),e("code",[s._v("auth 密码")])])]),s._v(" "),e("h3",{attrs:{id:"_1-3-redis命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-redis命令"}},[s._v("#")]),s._v(" 1.3. Redis命令")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" a "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("get")]),s._v(" a "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 123")]),s._v("\n\nsetex c "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 设置c的 值为1，10秒后过期")]),s._v("\n\nkeys "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 查看存储的所有key")]),s._v("\n\ndel a "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 删除a这个key")]),s._v("\n")])])]),e("h3",{attrs:{id:"_1-4-ioredis库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-ioredis库"}},[s._v("#")]),s._v(" 1.4. "),e("code",[s._v("ioredis")]),s._v("库")]),s._v(" "),e("p",[e("code",[s._v("ioredis")]),s._v("库是NodeJS 操作"),e("code",[s._v("Redis")]),s._v("的库")])])}),[],!1,null,null,null);e.default=t.exports}}]);