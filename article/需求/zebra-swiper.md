我们项目注入了 globalThis.window，导致 @zebra-ui/swiper 这个库报错。

可以这样解决：

```ts
// #ifndef H5
globalThis.HTMLElement = Date;
// #endif
```
