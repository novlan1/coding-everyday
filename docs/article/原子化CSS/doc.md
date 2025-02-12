## 常见问题

1. vscode 插件

提效工具：`Tailwind CSS IntelliSense`

2. `pr-[.28rem]`

小程序中不能使用 `pr-[.28rem]` 这种，可以使用 `pr-1.12`，同时在`tailwind.config.js` 中配置下 `theme.extend.padding = {1.12: '.28rem'}`。

原因是`uni-app`会把`class`中的`[.`解析成`\[\`放到`wxss`中，导致编译错误。

持续更新...

