(window.webpackJsonp=window.webpackJsonp||[]).push([[337],{607:function(t,a,s){"use strict";s.r(a);var e=s(14),r=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("ul",[a("li",[a("a",{attrs:{href:"#%E5%A6%82%E4%BD%95%E6%92%A4%E9%94%80-git-%E6%93%8D%E4%BD%9C"}},[t._v("如何撤销 Git 操作？")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#%E4%B8%80%E6%92%A4%E9%94%80%E6%8F%90%E4%BA%A4"}},[t._v("一、撤销提交")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#%E4%BA%8C%E4%B8%A2%E5%BC%83%E6%8F%90%E4%BA%A4"}},[t._v("二、丢弃提交")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#%E4%B8%89%E6%9B%BF%E6%8D%A2%E4%B8%8A%E4%B8%80%E6%AC%A1%E6%8F%90%E4%BA%A4"}},[t._v("三、替换上一次提交")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#%E5%9B%9B%E6%92%A4%E9%94%80%E5%B7%A5%E4%BD%9C%E5%8C%BA%E7%9A%84%E6%96%87%E4%BB%B6%E4%BF%AE%E6%94%B9"}},[t._v("四、撤销工作区的文件修改")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#%E4%BA%94%E4%BB%8E%E6%9A%82%E5%AD%98%E5%8C%BA%E6%92%A4%E9%94%80%E6%96%87%E4%BB%B6"}},[t._v("五、从暂存区撤销文件")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#%E5%85%AD%E6%92%A4%E9%94%80%E5%BD%93%E5%89%8D%E5%88%86%E6%94%AF%E7%9A%84%E5%8F%98%E5%8C%96"}},[t._v("六、撤销当前分支的变化")])])])])]),t._v(" "),a("h2",{attrs:{id:"如何撤销-git-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何撤销-git-操作"}},[t._v("#")]),t._v(" 如何撤销 Git 操作？")]),t._v(" "),a("p",[t._v("Git 版本管理时，往往需要撤销某些操作。")]),t._v(" "),a("p",[t._v("本文介绍几种最主要的情况，给出详细的解释。")]),t._v(" "),a("h3",{attrs:{id:"一、撤销提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、撤销提交"}},[t._v("#")]),t._v(" 一、撤销提交")]),t._v(" "),a("p",[t._v("一种常见的场景是，提交代码以后，你突然意识到这个提交有问题，应该撤销掉，这时执行下面的命令就可以了。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" revert HEAD\n")])])]),a("p",[a("strong",[t._v("上面命令的原理是，在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化")]),t._v("。它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险。")]),t._v(" "),a("p",[a("strong",[t._v("git revert 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行依次指定这些提交")]),t._v("。比如，抵消前两个提交，要像下面这样写。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" revert "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("倒数第一个提交"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("倒数第二个提交"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("git revert命令还有两个参数。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("--no-edit：执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。\n--no-commit：只抵消暂存区和工作区的文件变化，不产生新的提交。\n")])])]),a("h3",{attrs:{id:"二、丢弃提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、丢弃提交"}},[t._v("#")]),t._v(" 二、丢弃提交")]),t._v(" "),a("p",[a("strong",[t._v("如果希望以前的提交在历史中彻底消失，而不是被抵消掉，可以使用git reset命令")]),t._v("，丢弃掉某个提交之后的所有提交。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("last good SHA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[a("strong",[t._v("git reset的原理是，让最新提交的指针回到以前某个时点，该时点之后的提交都从历史中消失")]),t._v("。")]),t._v(" "),a("p",[a("strong",[t._v("默认情况下，git reset不改变工作区的文件（但会改变暂存区），--hard参数可以让工作区里面的文件也回到以前的状态")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hard")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("last good SHA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("执行git reset命令之后，如果想找回那些丢弃掉的提交，可以使用"),a("code",[t._v("git reflog")]),t._v("命令。")]),t._v(" "),a("h3",{attrs:{id:"三、替换上一次提交"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、替换上一次提交"}},[t._v("#")]),t._v(" 三、替换上一次提交")]),t._v(" "),a("p",[t._v("提交以后，"),a("strong",[t._v("发现提交信息写错了，这时可以使用git commit命令的--amend参数，可以修改上一次的提交信息")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--amend")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-m")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Fixes bug #42"')]),t._v("\n")])])]),a("p",[a("strong",[t._v("它的原理是产生一个新的提交对象，替换掉上一次提交产生的提交对象")]),t._v("。")]),t._v(" "),a("p",[a("strong",[t._v("这时如果暂存区有发生变化的文件，会一起提交到仓库。所以，--amend不仅可以修改提交信息，还可以整个把上一次提交替换掉")]),t._v("。")]),t._v(" "),a("h3",{attrs:{id:"四、撤销工作区的文件修改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、撤销工作区的文件修改"}},[t._v("#")]),t._v(" 四、撤销工作区的文件修改")]),t._v(" "),a("p",[a("strong",[t._v("如果工作区的某个文件被改乱了，但还没有提交，可以用git checkout命令找回本次修改之前的文件")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -- "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[a("strong",[t._v("它的原理是先找暂存区，如果该文件有暂存的版本，则恢复该版本，否则恢复上一次提交的版本")]),t._v("。")]),t._v(" "),a("p",[t._v("注意，工作区的文件变化一旦被撤销，就无法找回了。")]),t._v(" "),a("h3",{attrs:{id:"五、从暂存区撤销文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、从暂存区撤销文件"}},[t._v("#")]),t._v(" 五、从暂存区撤销文件")]),t._v(" "),a("p",[a("strong",[t._v("如果不小心把一个文件添加到暂存区，可以用下面的命令撤销")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--cached")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("上面的命令不影响已经提交的内容。")]),t._v(" "),a("h3",{attrs:{id:"六、撤销当前分支的变化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、撤销当前分支的变化"}},[t._v("#")]),t._v(" 六、撤销当前分支的变化")]),t._v(" "),a("p",[a("strong",[t._v("你在当前分支上做了几次提交，突然发现放错了分支，这几个提交本应该放到另一个分支")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 新建一个 feature 分支，指向当前最新的提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 注意，这时依然停留在当前分支")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch feature\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 切换到这几次提交之前的状态")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hard")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("当前分支此前的最后一次提交"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 切换到 feature 分支")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout feature\n")])])]),a("p",[t._v("上面的操作等于是撤销当前分支的变化，将这些变化放到一个新建的分支。")])])}),[],!1,null,null,null);a.default=r.exports}}]);