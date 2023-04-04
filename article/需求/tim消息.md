
## 全局消息

是否显示一个全局消息弹窗，取决于4个因素：

1. 是否有新消息进来，没有不显示
2. 用户是否点击了x，点击后不显示
3. props中传入的是否显示，有些页面不需要显示
4. 未读消息总数是否大于0，这个因素不考虑的话，消息框会先闪烁后消失

```ts
 realIsShowMsg() {
  const { hasRobotNewMsg, showRobotMsg, isShowMsg } = this;
  return hasRobotNewMsg && showRobotMsg && isShowMsg;
},
```

## 消息传递流程

普通页面(比如message-center)mixin-mounted，监听uid，登录tim，监听回调，给到vuex

header 从 vuex 中取，去到其他页面，还是从 vuex 中取，不影响。不要直接引入 IMHander，要解耦

