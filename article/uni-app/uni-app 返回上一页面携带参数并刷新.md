```js
methods: {
  refreshPLastPage() {
    const pages = getCurrentPages() || [];
    const page = pages[pages.length - 2];
    if (!page?.$vm?.$refs?.mine?.initData) return;
    page.$vm.$refs.mine.initData();
  },
}
```

