(window.webpackJsonp=window.webpackJsonp||[]).push([[542],{814:function(_,v,e){"use strict";e.r(v);var t=e(14),o=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("p",[_._v("项目回滚重新上线，新发布的项目有效（2024-4-28 17:55）。")]),_._v(" "),v("p",[_._v("之前流程如下。")]),_._v(" "),v("ol",[v("li",[_._v("打包生成产物 A")]),_._v(" "),v("li",[_._v("拷贝 A 到 "),v("code",[_._v("nginx-build-files")])]),_._v(" "),v("li",[_._v("拷贝 "),v("code",[_._v("nginx-build-files")]),_._v(" 中当前域名下所有文件到 "),v("code",[_._v("workspace")])]),_._v(" "),v("li",[_._v("在 "),v("code",[_._v("workspace")]),_._v(" 中创建 "),v("code",[_._v("Dockerfile、nginx.conf、default.conf、logrotate-nginx")])]),_._v(" "),v("li",[_._v("在 "),v("code",[_._v("workspace")]),_._v(" 中构建镜像，并推送")]),_._v(" "),v("li",[_._v("更新模版集，发布到集群")])]),_._v(" "),v("p",[_._v("需要将产物放到 "),v("code",[_._v("git")]),_._v(" 仓库中，好处如下：")]),_._v(" "),v("ul",[v("li",[_._v("安全，有备份，不用担心误删，所有项目丢失")]),_._v(" "),v("li",[_._v("有历史记录，易追溯到任一版本、易回滚")]),_._v(" "),v("li",[_._v("可视化管理，易维护，镜像大小易控制，比如之前很多 "),v("code",[_._v("sourcemap")]),_._v("、"),v("code",[_._v(".gz")]),_._v(" 文件以及没用的 "),v("code",[_._v("js/css")]),_._v(" 文件都可以很轻易的删除")])]),_._v(" "),v("p",[_._v("发布流程改动：")]),_._v(" "),v("ol",[v("li",[_._v("拷贝产物 A 到 "),v("code",[_._v("nginx-build-files")]),_._v(" 后，增加 "),v("code",[_._v("git commit")]),_._v(" 和 "),v("code",[_._v("git push")]),_._v("，用流水线构建 ID 作为 "),v("code",[_._v("tag")])]),_._v(" "),v("li",[_._v("生成操作记录时，将上面的流水线构建 ID 连同其他发布配置，一起存起来，即 "),v("code",[_._v("pipelineRunId")]),_._v("，这一步其实已有")])]),_._v(" "),v("p",[_._v("回滚时：")]),_._v(" "),v("ol",[v("li",[_._v("新建 "),v("code",[_._v("/data/landun/revert")]),_._v(" 作为统一的回滚目录，并将之前的多例回滚改为单例回滚，防止互相影响")]),_._v(" "),v("li",[_._v("从 "),v("code",[_._v("nginx-build-files")]),_._v(" 中拷贝域名文件，到当前目录")]),_._v(" "),v("li",[_._v("从 "),v("code",[_._v("/data/landun/revert")]),_._v(" 中切换 "),v("code",[_._v("tag")]),_._v("，并拷贝 "),v("code",[_._v("IMAGE_NAME")]),_._v(" 到当前目录的域名下")]),_._v(" "),v("li",[_._v("从 "),v("code",[_._v("/data/landun/revert")]),_._v(" 切回 "),v("code",[_._v("master")]),_._v("，拉最新代码，并拷贝回工作目录的文件，切新分支，并 "),v("code",[_._v("push")])]),_._v(" "),v("li",[_._v("从 "),v("code",[_._v("workspace")]),_._v(" 重新生成镜像，发布集群")])]),_._v(" "),v("p",[_._v("几个核心要点：")]),_._v(" "),v("ol",[v("li",[_._v("要有单独的回滚目录，不能用发布目录，防止切分支的时候，有人正在发布，导致发布成过去的项目")]),_._v(" "),v("li",[_._v("永远不要在 "),v("code",[_._v("nginx-build-files")]),_._v(" 目录下，进行 "),v("code",[_._v("git reset")]),_._v(" 或者 "),v("code",[_._v("git checkout")]),_._v(" 操作，原因同上")]),_._v(" "),v("li",[_._v("回滚要有 git 记录，所以 "),v("code",[_._v("/data/landun/revert")]),_._v(" 切完 tag 并拷贝出文件后，再切成 "),v("code",[_._v("master")]),_._v("，拉最新代码，并拷贝回工作目录的文件，切新分支，并 "),v("code",[_._v("push")])]),_._v(" "),v("li",[_._v("要注意发布到域名根目录的回滚")])]),_._v(" "),v("p",[_._v("总结下升级后的整体好处：")]),_._v(" "),v("ul",[v("li",[_._v("安全，有备份")]),_._v(" "),v("li",[_._v("有记录，可回溯，可回滚")]),_._v(" "),v("li",[_._v("回滚也有记录，可查看是否回滚错误")])]),_._v(" "),v("p",[_._v("另外，通过删除镜像中无用的 "),v("code",[_._v(".map")]),_._v("，"),v("code",[_._v(".gz")]),_._v(", "),v("code",[_._v(".js")]),_._v(", "),v("code",[_._v(".css")]),_._v(" 文件等，减少 "),v("code",[_._v("130M")]),_._v("，减少构建推送镜像时间1分钟")]),_._v(" "),v("p",[_._v("之前的构建并推送时间：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/4/own_mike_0baab6cda1a111128c.png",width:"300"}}),_._v(" "),v("p",[_._v("现在的构建并推送时间：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/4/own_mike_61e5f2658fe567b0a3.png",width:"300"}}),_._v(" "),v("p",[_._v("大小对比：")]),_._v(" "),v("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/4/own_mike_f7b22cf119e6fd5253.png",width:"500"}}),_._v(" "),v("p",[_._v("几个变量：")]),_._v(" "),v("div",{staticClass:"language-ts extra-class"},[v("pre",{pre:!0,attrs:{class:"language-ts"}},[v("code",[v("span",{pre:!0,attrs:{class:"token constant"}},[_._v("IMAGE_NAME")]),v("span",{pre:!0,attrs:{class:"token operator"}},[_._v(":")]),_._v(" "),v("span",{pre:!0,attrs:{class:"token string"}},[_._v('"pvpesport.web.user.feature.story-team-create"')]),_._v("\n"),v("span",{pre:!0,attrs:{class:"token constant"}},[_._v("IMAGE_TAG")]),v("span",{pre:!0,attrs:{class:"token operator"}},[_._v(":")]),_._v(" "),v("span",{pre:!0,attrs:{class:"token string"}},[_._v('"1714126074270-825"')]),_._v("\n"),v("span",{pre:!0,attrs:{class:"token constant"}},[_._v("IMAGE_URL")]),v("span",{pre:!0,attrs:{class:"token operator"}},[_._v(":")]),_._v(" "),v("span",{pre:!0,attrs:{class:"token string"}},[_._v('"mirrors.tencent.com/pmd-mobile/pvpesport.web.user.feature.story-team-create"')]),_._v("\n")])])]),v("p",[_._v("中间的 "),v("code",[_._v("pmd-mobile")]),_._v(" 是命名空间")]),_._v(" "),v("p",[v("code",[_._v("cp -r img/ dest")]),_._v(" 与 "),v("code",[_._v("cp -r img/* dest")]),_._v(" 的区别：")]),_._v(" "),v("p",[_._v("加星号")]),_._v(" "),v("p",[v("code",[_._v('cp("-R", "__config/img/*", \'dev\')')]),_._v(" 复制整个"),v("code",[_._v("img")]),_._v("目录下的文件到"),v("code",[_._v("dev")]),_._v("下，不包含"),v("code",[_._v("img")]),_._v("目录")]),_._v(" "),v("p",[_._v("不加星号")]),_._v(" "),v("p",[v("code",[_._v('cp("-R", "__config/img/", \'dev\')')]),_._v(" 复制整个"),v("code",[_._v("img")]),_._v("目录到"),v("code",[_._v("dev")]),_._v("下，包含"),v("code",[_._v("img")]),_._v("目录")])])}),[],!1,null,null,null);v.default=o.exports}}]);