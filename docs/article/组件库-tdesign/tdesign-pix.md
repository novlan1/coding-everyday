### CSS 变量

`pixui` 不支持CSS变量，需要将 `var(--xxx, xxx)` 这种都改掉。

怎么改呢，想到几个点：

1. 用编译后的产物去替换。比如 `es/` 目录下的css文件，替换原有文件
2. 用 `less` 变量替换之前的css变量
3. 用 `scss` 变量替换，好处是 `scss` 中 `!default` 默认变量，业务可以方便覆盖

第1个方案不够彻底，仍需要处理CSS变量。第3个成本高，并且业务本身也是`less`，同时使用两种预处理器，并不统一。

目前采用的第2个方案，借助 `less` 中的 `if` 和 `isdefined` 语法，将之前样式文件中的CSS变量批量替换成 `less` 变量。


之前；

```less
@brand-color-1: var(--td-brand-color-1, #f2f3ff);
```

现在：

```less
@brand-color-1: if(isdefined(@td-brand-color-1), @td-brand-color-1, #f2f3ff);
```

这里应该最小化组件库改动，之后 `tdesign-mobile-react` 官方有更新的话，也可以方便合入。

当前采用的方案是脚本处理 `var.less` 文件，生成了`pixui`支持的`less`变量。官方有变动的话，再次生成并覆盖。

### 样式覆盖

解决完 CSS 变量，有一些组件在浏览器，和在 `pxide`、真机内仍不一致。原因 pi`x`ui 规则不一样：

1. div 默认flex布局，不是block
2. div 默认不会撑满父元素

以上等等问题，需要写一些覆盖的样式。这里不能写到组件内，也是考虑到后面不方便合入官方更新。采用的方案是单独提供 `pixui` 的 `ployfill.css`。

