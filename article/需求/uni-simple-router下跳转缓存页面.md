
比如创建赛事页面，如果前往查看规则，返回后，希望保留之前的表单。

```ts

let randomKey = '';
const RANDOM_KEY = 'RANDOM_KEY_CREATE';

export default {
  beforeRouteLeave(to, from, next) {
    if (to.name === 'match-rule-page') {
      randomKey = Math.random() * 1000000;
      localStorage.setItem(RANDOM_KEY, randomKey);
    } else {
      localStorage.setItem(RANDOM_KEY, '');
    }
    next();
  },
  activated() {
    const localRandomKey = localStorage.getItem(RANDOM_KEY);
    this.useCache = (localRandomKey && localRandomKey == randomKey);

    if (!this.useCache) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
  },
}
```
