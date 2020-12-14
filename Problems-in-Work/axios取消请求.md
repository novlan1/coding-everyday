## axios取消请求

可以使用 `CancelToken.source` 工厂方法创建 cancel token，像这样：

```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 `executor` 函数到 `CancelToken` 的构造函数来创建 `cancel token`：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
  // executor 函数接收一个 cancel 函数作为参数
  cancel = c;
  })
});

// cancel the request
cancel();
```

实际使用中，可以传递对象 `obj` 给 `makeRequest` 方法，并给 `obj` 添加 `cancel` 方法。
要取消请求时调用 `obj.cancel` 方法。

