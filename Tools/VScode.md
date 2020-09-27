- [1. VSCode中Flow报错解决](#1-vscode中flow报错解决)
- [2. VScode 技巧](#2-vscode-技巧)
  - [2.1. 快捷键](#21-快捷键)
  - [2.2. VScode 常用插件](#22-vscode-常用插件)
  - [2.3. 在 VScode 中高亮 css-in-js 语法的插件](#23-在-vscode-中高亮-css-in-js-语法的插件)
- [3. `.editorConfig`文件](#3-editorconfig文件)


### 1. VSCode中Flow报错解决

在VSCode中设置
```
"typescript.validate.enable": false,
"javascript.validate.enable": false,
```

VSCode中哪里能设置这个，最后在`Code->Preferences->Settings`中搜索，才找到`settings.json`这个文件

### 2. VScode 技巧

1. 编辑器如vscode一屏幕内显示**30行**左右比较舒服，比较方便
2. 要重置vscode所有设置，只需要把`setting.json`文件内容删掉

#### 2.1. 快捷键

1. `ctrl+enter`在下方插入一行
2. `ctrl+shift+enter`在上方插入一行


#### 2.2. VScode 常用插件

- `css peek`：`html`和`css`关联
- `prettier`：代码格式化
- `Icon Fonts`：图标集
- `Auto Rename Tag`：自动修改标签
- `Html Boilerplate`：`html`模板
- `Color Info`：颜色提示
- `Auto Close Tag`：自动闭合标签
- `HTML CSS Support`：`html`中`css`，`class`自动提示 



#### 2.3. 在 VScode 中高亮 css-in-js 语法的插件

`vscode-styled-jsx`



### 3. `.editorConfig`文件

 如果没有设置`.editorConfig`文件，会使用编辑器里的规则，如果设置了`.editorConfig`文件，则会优先使用这个文件里的配置：
``` js
# editorconfig.org

root = true

[*]
charset = utf-8
indent_size = 2
indent_syle = space
insert_final_newline = true # 是否使文件以一个空白行结尾
tirm_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false # 自动去除行尾多余的空格
```


