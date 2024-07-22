小程序引入 uuid，报错：

```ts
import { v4 as uuidv4 } from 'uuid';
uuidv4();
```

```
 Error: crypto.getRandomValues() not supported.
```


参考：https://developers.weixin.qq.com/community/develop/doc/000800f97c0790fbd7f86a93c51400