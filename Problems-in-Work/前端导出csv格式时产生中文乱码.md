## 前端导出csv格式时产生中文乱码

```js
content="\ufeff"+content;
let url = window.URL.createObjectURL(new Blob([content], {type: 'text/csv, charset = utf-8'}));
```
在字符串头部加上`"\ufeff"`表示它是utf-8格式编码的，再用编辑器打开时就不会产生乱码了

