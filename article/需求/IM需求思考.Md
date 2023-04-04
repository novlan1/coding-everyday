
[toc]

### ready状态

一旦初始化以后，就应该监听`ready`状态，然后存一个标志下来。太晚监听，就会错过这个回调。

对用户的错误使用进行兜底，比如用户非`ready`状态下获取消息列表，发送消息等，在底层兼容，举例如下：


```ts
async function send() {
  const userId = 'Little 1';
  const userSig = await getSig(userId);
  await IMHandler.login({
    userId,
    userSig,
  });
  await IMHandler.sendMessage({
    to: this.chatInfo.to,
    text: content,
  })
}
```

上面的代码，登录成功后就去发送信息了，sdk却要求必须处理ready状态才可以，可以进行如下封装：

```ts
class IM {
  async sendMessage({ to, text = '' }) {
    const { tim } = this;
    const { isOnline, userId, userSig } = tim;

    if (!isOnline && userId && userSig) {
      await login({ userId, userSig, tim });
    }
    await waitReady(tim);

    return await sendMessage({
      tim,
      to,
      text,
    });
  }
}

async function waitReady(tim) {
  if (tim.isReady) {
    return Promise.resolve(1);
  }
  return new Promise((resolve) => {
    tim.on(TIM.EVENT.SDK_READY, resolve);
  });
}
```

核心是一个`waitReady`函数。


### 过滤相同请求

另外，如果同一时间用户同时登录，也会报警告，这里可以用一个过滤器来过滤：


```ts
 type HandleListType = Array<{
   url: string;
   reqData: object;
   handle: any;
 }>;

let handleList: HandleListType = []; // 请求列表


export function filterSameRequest({
  url,
  reqData,
  handle,
}) {
  const sameHandle = handleList.find(item => item.url === url
   && JSON.stringify(item.reqData) === JSON.stringify(reqData));

  if (sameHandle) {
    // 遇到相同请求直接返回之前请求的promise
    console.log('存在重复请求，直接返回');
    return sameHandle.handle;
  }
  console.log('不存在重复请求');

  const promise = handle();
  promise.finally(() => {
    console.log('[filterSameRequest] finally');

    handleList = handleList.filter(item => item.url !== url
      && JSON.stringify(item.reqData) !== JSON.stringify(reqData));
  });

  handleList.push({ url, reqData, handle: promise });
  return promise;
}
```

使用的时候可以这样：

```ts
async function login({
  userId,
  userSig,
  tim,
}) {
  const url = 'LOGIN';
  const reqData = { userId, userSig };

  return await filterSameRequest({
    url,
    reqData,
    handle: innerLogin.bind(null, {
      userId,
      userSig,
      tim,
    }),
  });
}
```


### TIM类型提示

对于`uni-app`的项目，如果要`typescript`的类型提示，可以这样做：

```ts
import TIM_TYPE from 'tim-js-sdk/tim-js';
export class IM {
  tim: IChatSDK;
  TIM: typeof TIM_TYPE;
}
```

注意不能从`tim-js.d.ts`中引入，会报错。`typeof`也不能漏掉。



参考：
- https://stackoverflow.com/questions/46207258/error-debug-failure-false-expression-output-generation-failed-when-importin
- https://blog.csdn.net/SmallTeddy/article/details/123837585


### 状态保存

`ready`状态和`online`应该挂在`tim`上，还是`IMHandler`上呢？

`tim`是TIM的实例对象，`IMHandler`是`IM`的实例对象。

这里采用的挂在`tim`上，但可以通过`IMHandler`拿到，代码如下。

```ts
class IM {
  get isReady() {
    return this.tim.isReady || false;
  }

  set isReady(value) {
    this.tim.updateReadyStatus(!!value);
  }

  get isOnline() {
    return this.tim.isOnline || false;
  }

  set isOnline(value) {
    this.tim.updateOnlineStatus(!!value);
  }
}
```

使用的时候，既可以通过`this.tim.isReady`拿到，也可以通过`IMHandler.isReady`拿到。

### 适配器

底层的IM应该尽量通用，业务的`IMHandler`应当简单易用，这里可以采用继承`class`的方式，底层IM是基类，业务可以继承此IM，并做一些业务上的适配。

比如获取`userSig`的逻辑，每个项目可能是不同的，可以放在业务的IM中。

```ts
class IMAdapter extends IM {
  async login(uid) {
    if (this.tim.isReady) return Promise.resolve();
    if (this.tim.userSig) return this.loginAndUpdateProfile(uid, this.tim.userSig);
    const userSig = await getUserSig(uid);
    return this.loginAndUpdateProfile(uid, userSig);
  }

    loginAndUpdateProfile(userId, userSig) {
    return this.innerLogin({ userId, userSig }).then(() => {
      this.tim.updateMyProfile({
        nick: app.$store.state.user?.nick,
        avatar: app.$store.state.user?.head,
      } as any);
    });
  }
}
```

此外，这次是重构之前的代码，如果不想改页面、组件中的代码，可以在`IMAdapter`中对参数做一些兼容。

```ts
class IMAdapter extends IM {
  setReceivedMessagesListener(cb) {
    function newCb(event) {
      const message = formatMessage(event);
      return cb(message, event);
    }
    this.setEventListener(this.TIM.EVENT.MESSAGE_RECEIVED, newCb);
  }
}
```

### 改之前的还是从0开始重写

重构是持续进行的，`im`模块的重构是在之前的上面改，还是直接重写呢？

这里选择的是改之前的，从0开始写，抛开开发成本，测试成本就很高。

另外，如果代码无法很好的修改，那么写了新的也很难去应用，除非另起炉灶，完全废弃之前的。

