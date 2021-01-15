## 如何保留textarea中的换行符

```scss
white-space: pre-wrap     // or pre/pre-line
```


### white-space属性，如何处理元素中的空白

```
pre	        所有东西原样输出，文本不换行
pre-wrap	所有东西原样输出，文本换行
pre-line	所有空格、制表符合并成一个空格，回车不变，文本换行
nowrap	        所有空格、回车、制表符都合并成一个空格，文本不换行
normal(默认)	所有空格、回车、制表符都合并成一个空格，文本自动换行
inherit	        继承父元素	
```

### 文本溢出省略号
```css
white-space: nowrap;       /*强制内容在一行显示*/
overflow: hidden;          /*超出部分溢出*/
text-overflow: ellipsis;   /*溢出的部分使用省略号*/
```

### word-break属性
```
word-break: normal|break-all|keep-all;
```

```
normal：使用浏览器默认的换行规则。 
break-all: 允许在单词内换行，允许任意非CJK(Chinese/Japanese/Korean)文本间的单词断行。
keep-all: 只能在半角空格或连字符处换行，不允许CJK(Chinese/Japanese/Korean)文本中的单词换行，只能在半角空格或连字符处换行。非CJK文本的行为实际上和normal一致。
```

### word-wrap属性
```
word-wrap: normal|break-word; 
word-wrap 属性用来标明是否允许浏览器在单词内进行断句
```

```
normal: 只在允许的断字点换行(浏览器保持默认处理) 
break-word: 在长单词或URL地址内部进行换行，内容将在边界内换行。如果需要，单词内部允许断行。
```

### `word-wrap:break-word`和`word-break:break-all`的区别
`word-wrap` 先尝试寻找空格、连接符等正常换行点，如果正常换行能满足不超出容器宽度的需求，正常换行；如果正常换行后仍然超出容器宽度，对非CJK长内容进行强制换行。
`word-break:break-all` 直接强制在行末尾换行。