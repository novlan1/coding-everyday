(window.webpackJsonp=window.webpackJsonp||[]).push([[454],{726:function(t,s,a){"use strict";a.r(s);var e=a(14),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"一、husky和lint-staged"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、husky和lint-staged"}},[t._v("#")]),t._v(" 一、husky和lint-staged")]),t._v(" "),s("p",[t._v("husky继承了Git下所有的钩子，在触发钩子的时候，husky可以阻止不合法的commit、push等等。注意使用husky之前，必须先将代码放到git 仓库中，否则本地没有.git文件，就没有地方去继承钩子了。")]),t._v(" "),s("p",[t._v("lint-staged是一个可以提供运行脚本校验文件的插件平台；可以根据不同文件执行不同的命令。")]),t._v(" "),s("p",[t._v("lint-staged，一个仅仅过滤出Git代码暂存区文件(被committed的文件)的工具，并不像eslint那样需要配置忽略配置、配置内的文件全量遍历检查。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" husky lint-staged "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-D")]),t._v("\n")])])]),s("p",[t._v("package.json中增加prepare命令，顺便设置下lint-staged命令：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"scripts"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"prepare"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"husky install"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"lint-staged"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"*.{js,jsx,vue,ts,tsx}"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"eslint --fix"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("然后执行以下命令会生成.husky文件夹：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run prepare\n")])])]),s("p",[t._v("在.husky文件夹下增加pre-commit文件：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/bin/sh")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dirname")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$0")]),t._v('"')]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('/_/husky.sh"')]),t._v("\n\nnpx lint-staged\n")])])]),s("p",[t._v("或者使用以下命令生成：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ npx husky "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" .husky/pre-commit "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"npx lint-staged"')]),t._v("\n")])])]),s("h2",{attrs:{id:"二、规范commit信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、规范commit信息"}},[t._v("#")]),t._v(" 二、规范commit信息")]),t._v(" "),s("h3",{attrs:{id:"_1-conventional-commits-specification"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-conventional-commits-specification"}},[t._v("#")]),t._v(" 1. Conventional Commits specification")]),t._v(" "),s("p",[t._v("要想规范git commit 提交，我们先要了解一下Commit Message格式，目前规范使用较多的是 "),s("a",{attrs:{href:"https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines",target:"_blank",rel:"noopener noreferrer"}},[t._v("Angular 团队的规范"),s("OutboundLink")],1),t._v(", 继而衍生了 "),s("a",{attrs:{href:"https://www.conventionalcommits.org/en/v1.0.0",target:"_blank",rel:"noopener noreferrer"}},[t._v("Conventional Commits specification"),s("OutboundLink")],1),t._v(". 很多工具也是基于此规范, 它的 message 格式如下:")]),t._v(" "),s("p",[t._v("每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("("),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("scope")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("): "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("subject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("BLANK")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("LINE")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("BLANK")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("LINE")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("footer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("其中，Header 是必需的，Body 和 Footer 可以省略。")]),t._v(" "),s("p",[t._v("不管是哪一个部分，任何一行都不得超过100个字符。这是为了避免自动换行影响美观。")]),t._v(" "),s("ul",[s("li",[t._v("标题行(第一行/header): 必填, 描述主要修改类型和内容")]),t._v(" "),s("li",[t._v("主题内容(body): 描述为什么修改, 做了什么样的修改, 以及开发的思路等等")]),t._v(" "),s("li",[t._v("页脚注释(footer): 放 Breaking Changes 或 Closed Issues")]),t._v(" "),s("li",[t._v("scope: commit 影响的范围, 比如: route, component, utils, build...")]),t._v(" "),s("li",[t._v("subject: commit 的概述, 建议符合 50/72 formatting")]),t._v(" "),s("li",[t._v("body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting")]),t._v(" "),s("li",[t._v("footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.")])]),t._v(" "),s("ol",[s("li",[t._v("Header")])]),t._v(" "),s("ul",[s("li",[t._v("Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。")]),t._v(" "),s("li",[t._v("type（必填）：type用于说明 commit 的类别。")]),t._v(" "),s("li",[t._v("scope（可选）：scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。")]),t._v(" "),s("li",[t._v("subject（必填）:subject是 commit 目的的简短描述，")])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("Body（可省）")])]),t._v(" "),s("ul",[s("li",[t._v("Body 部分是对本次 commit 的详细描述，可以分成多行。")])]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("Footer（可省）")])]),t._v(" "),s("ul",[s("li",[t._v("Footer 部分只用于两种情况。")]),t._v(" "),s("li",[t._v("1）不兼容变动\n"),s("ul",[s("li",[t._v("如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。")])])]),t._v(" "),s("li",[t._v("2）关闭 Issue\n"),s("ul",[s("li",[t._v("如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。")]),t._v(" "),s("li",[t._v("Closes #234。也可以一次关闭多个 issue。Closes #123, #245, #992")])])])]),t._v(" "),s("p",[t._v("type 类型：")]),t._v(" "),s("ul",[s("li",[t._v("feat：新增功能")]),t._v(" "),s("li",[t._v("fix：bug 修复")]),t._v(" "),s("li",[t._v("docs：文档更新")]),t._v(" "),s("li",[t._v("style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)")]),t._v(" "),s("li",[t._v("refactor：重构代码(既没有新增功能，也没有修复 bug)")]),t._v(" "),s("li",[t._v("perf：性能, 体验优化")]),t._v(" "),s("li",[t._v("test：新增测试用例或是更新现有测试")]),t._v(" "),s("li",[t._v("build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交")]),t._v(" "),s("li",[t._v("ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交")]),t._v(" "),s("li",[t._v("chore：不属于以上类型的其他类，比如构建流程, 依赖管理")]),t._v(" "),s("li",[t._v("revert：回滚某个更早之前的提交")])]),t._v(" "),s("p",[t._v("如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。")]),t._v(" "),s("p",[t._v("subject注意事项：")]),t._v(" "),s("ul",[s("li",[t._v("以动词开头，使用第一人称现在时，比如change，而不是changed或changes")]),t._v(" "),s("li",[t._v("第一个字母小写")]),t._v(" "),s("li",[t._v("结尾不加句号（.）")])]),t._v(" "),s("p",[t._v("Body有两个注意点：")]),t._v(" "),s("ul",[s("li",[t._v("使用第一人称现在时，比如使用change而不是changed或changes。")]),t._v(" "),s("li",[t._v("应该说明代码变动的动机，以及与以前行为的对比。")])]),t._v(" "),s("h3",{attrs:{id:"_2-用commitizen替代你的-git-commit-使用工具生成符合规范的commit-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-用commitizen替代你的-git-commit-使用工具生成符合规范的commit-message"}},[t._v("#")]),t._v(" 2. 用Commitizen替代你的 git commit (使用工具生成符合规范的commit message)")]),t._v(" "),s("p",[t._v("上面我们已经了解了Commit Message的格式是什么样的了，如果让我们自己手动敲出那些格式也不是不可能，但是我相信那不是程序员的作风，大多数人会疯掉吧，，那么就需要通过"),s("code",[t._v("commitizen/cz-cli")]),t._v(" 工具，我们需要借助它提供的  git cz  命令替代我们之前的  git commit  命令, 帮助我们生成符合规范的 commit message .")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --save-dev commitizen cz-conventional-changelog\n")])])]),s("p",[t._v("package.json中增加：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"config"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"commitizen"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./node_modules/cz-conventional-changelog"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),s("p",[t._v("安装完可以在script添加命令或者：npx git-cz")]),t._v(" "),s("p",[t._v("在项目中.husky目录下添加一个prepare-commit-msg钩子：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ npx husky "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" .husky/prepare-commit-msg "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"exec < /dev/tty && npx git-cz --hook || true"')]),t._v("\n")])])]),s("h3",{attrs:{id:"_3-commitlint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-commitlint"}},[t._v("#")]),t._v(" 3. commitlint")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" @commitlint/cli @commitlint/config-conventional "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-D")]),t._v("\n")])])]),s("p",[t._v("在项目中.husky目录下添加一个commit-msg钩子：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ npx husky "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" .husky/commit-msg "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'npx --no -- commitlint --edit \"$1\"'")]),t._v("\n")])])]),s("p",[t._v("项目根目录下新建一个commitlint.config.js：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"module.exports = {extends: ['@commitlint/config-conventional']}\"")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" commitlint.config.js\n")])])]),s("p",[t._v("这样在git commit时会校验commit的内容。")]),t._v(" "),s("h2",{attrs:{id:"三、参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、参考"}},[t._v("#")]),t._v(" 三、参考")]),t._v(" "),s("ol",[s("li",[s("a",{attrs:{href:"https://github.com/typicode/husky",target:"_blank",rel:"noopener noreferrer"}},[t._v("husky"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.npmjs.com/package/lint-staged",target:"_blank",rel:"noopener noreferrer"}},[t._v("lint-staged"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/commitizen/cz-cli",target:"_blank",rel:"noopener noreferrer"}},[t._v("commitizen"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/commitizen/cz-conventional-changelog",target:"_blank",rel:"noopener noreferrer"}},[t._v("cz-conventional-changelog"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/conventional-changelog/commitlint",target:"_blank",rel:"noopener noreferrer"}},[t._v("commitlint"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.cnblogs.com/jiaoshou/p/11190619.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何规范git commit提交"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=n.exports}}]);