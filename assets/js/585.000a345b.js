(window.webpackJsonp=window.webpackJsonp||[]).push([[585],{858:function(_,v,e){"use strict";e.r(v);var o=e(14),t=Object(o.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h2",{attrs:{id:"_1-开始"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-开始"}},[_._v("#")]),_._v(" 1. 开始")]),_._v(" "),v("p",[_._v("什么是用户体验呢？一个字，爽，具体点就是，简单、自然、流畅。")]),_._v(" "),v("p",[_._v("基础体验优化是最重要的，之前的小程序登录体验较差，有明显的刷新页面过程，用户会感觉到页面在闪烁。")]),_._v(" "),v("h2",{attrs:{id:"_2-优化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-优化"}},[_._v("#")]),_._v(" 2. 优化")]),_._v(" "),v("p",[_._v("先说下之前的逻辑。前端请求后台接口，后台返回错误码为"),v("code",[_._v("100000")]),_._v("时，便认为是缺失了登录态。于是执行"),v("code",[_._v("wx.login")]),_._v("拿到"),v("code",[_._v("code")]),_._v("，再请求后台接口拿到登录态（"),v("code",[_._v("code")]),_._v("换"),v("code",[_._v("ticket")]),_._v("），然后将后台请求头中携带的"),v("code",[_._v("token")]),_._v("等信息种到"),v("code",[_._v("storage")]),_._v("中，然后刷新页面。下次请求从"),v("code",[_._v("storage")]),_._v("中拿到登录信息，放到"),v("code",[_._v("header")]),_._v("中，请求后台成功。")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_a2d957080d4dad2f5c.png",width:"550"}}),_._v(" "),v("p",[_._v("上面黄色是前端请求，粉色是后台返回，绿色和红色是前端做的。其中“刷新页面”就是这次要优化的部分。")]),_._v(" "),v("p",[_._v("这里是小程序官网提供的"),v("a",{attrs:{href:"https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html",target:"_blank",rel:"noopener noreferrer"}},[_._v("时序图"),v("OutboundLink")],1),_._v("。")]),_._v(" "),v("p",[_._v("如何优化呢？")]),_._v(" "),v("p",[_._v("首先需要引入装饰器，就是对请求做一层包裹，当后台返回 "),v("code",[_._v("100000")]),_._v(" 的时候，不要直接 "),v("code",[_._v("reject")]),_._v(" 了，而是记录当前请求、并监听登录接口（"),v("code",[_._v("code")]),_._v("换"),v("code",[_._v("ticket")]),_._v("）的成功事件。当登录成功后再次请求刚才记录的接口，并 "),v("code",[_._v("resolve")]),_._v(" 这次的返回。")]),_._v(" "),v("p",[_._v("顺手在"),v("code",[_._v("wx.login")]),_._v("和"),v("code",[_._v("code")]),_._v("换"),v("code",[_._v("ticket")]),_._v("时，加了个“登录中”的"),v("code",[_._v("toast")]),_._v("。")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_693dc0bb411861d355.png",width:"550"}}),_._v(" "),v("p",[_._v("这里面有几个核心点：")]),_._v(" "),v("ol",[v("li",[_._v("这里的“重放”不是完全一样的请求，不是严格意义的重放。是对刚才失败的接口再次请求，请求参数不变，但请求头会变化")]),_._v(" "),v("li",[_._v("要引入装饰器。因为拦截器很难做到重放，需要把它改造成异步，以及递归调用自己，还要维护一个失败队列，这会让拦截器变得很重")]),_._v(" "),v("li",[_._v("要注意有可能多个接口都返回了"),v("code",[_._v("100000")]),_._v("，因为接口很有可能并发执行，需要将它们分别重放")])]),_._v(" "),v("p",[_._v("说一下与上次优化的”无感登录"),v("code",[_._v("webview")]),_._v("“的区别：")]),_._v(" "),v("p",[_._v("登录"),v("code",[_._v("webview")]),_._v("时，"),v("code",[_._v("url")]),_._v("有额外特征（携带特殊"),v("code",[_._v("query")]),_._v("），所以可以根据这个控制接口并发为1，当请求登录成功后，就重新执行这个请求。")]),_._v(" "),v("p",[_._v("而小程序因为登录态有可能在任意时间失效，所以登录时机无法确定，导致并不能控制并发数为1。既然无法控制并发数，就只能在装饰器内分别记录每个请求了。")]),_._v(" "),v("p",[_._v("下面拿个具体的页面看下。")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_a347796c66c07b11b3.png",width:"800"}}),_._v(" "),v("ul",[v("li",[v("p",[_._v("第1个请求，无需登录态，直接返回了成功。")])]),_._v(" "),v("li",[v("p",[_._v("第2-4个请求是并发执行，需要登录态，但此时登录态失效，所以都返回了 "),v("code",[_._v("100000")]),_._v("。")])]),_._v(" "),v("li",[v("p",[_._v("第5个请求，是登录接口，会执行"),v("code",[_._v("code")]),_._v("换"),v("code",[_._v("ticket")]),_._v("。")])]),_._v(" "),v("li",[v("p",[_._v("第6-8个请求，是对刚才失败的请求（第2-4个）进行的重放。")])])]),_._v(" "),v("p",[_._v("通过上面的"),v("code",[_._v("Waterfall")]),_._v("还可以看出，"),v("code",[_._v("wx.login")]),_._v("执行也是花费了时间的，所以第4和第5个请求之间有一些间隔时间。")]),_._v(" "),v("p",[_._v("也可以看出登录接口（"),v("code",[_._v("code")]),_._v("换"),v("code",[_._v("ticket")]),_._v("）只返回了登录态信息，并没有返回业务信息，所以该接口仍需重放，所以这个CGI总共会被请求3次。")]),_._v(" "),v("h2",{attrs:{id:"_3-效果"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-效果"}},[_._v("#")]),_._v(" 3. 效果")]),_._v(" "),v("p",[_._v("下面是和平赛场之前的效果，登录后有明显的刷新页面，刷新期间页面白屏：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_19921f26ae20ec5be7.gif",width:"380"}}),_._v(" "),v("p",[_._v("优化之后：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_757fb02af679f762c3.gif",width:"380"}}),_._v(" "),v("p",[_._v("下面是掼蛋赛事之前的效果：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_450860049263fd4097.gif",width:"380"}}),_._v(" "),v("p",[_._v("优化之后：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/11/own_mike_88a10e6b0da491ecf3.gif",width:"380"}})])}),[],!1,null,null,null);v.default=t.exports}}]);