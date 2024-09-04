如果直接计算字符串长度，可能出错，比如 '一二三🎁'，长度为5，如果获取字面上的长度呢？

一个简单的方式是:


```ts
[...(str || '')].length
```

巧妙的思路。

另外，input 原生支持 maxlength，它的计算方式是 str.length。这个 bug 就是因为这个 https://github.com/Tencent/tdesign-vue-next/issues/4413



