- [1. 操作`cookie`](#1-操作cookie)
  - [1.1. 获取`cookie`](#11-获取cookie)
  - [1.2. 设置`cookie`](#12-设置cookie)
  - [1.3. 删除`cookie`](#13-删除cookie)


## 1. 操作`cookie`
### 1.1. 获取`cookie`

```ts
export function getCookie(key: string) {
  // 从cookie里面取
  const reg = new RegExp(key + "=([^;]*)");
  const m = document.cookie.match(reg);
  if (m && m.length > 1) {
    return m[1];
  }
  return null;
}
```
### 1.2. 设置`cookie`
```ts
export function setCookie(
  key: string,
  data: string,
  time?: any,
  path?: any
) {
  const exp = new Date();
  if (time) {
    exp.setTime(exp.getTime() + time);
  } else {
    exp.setTime(exp.getTime() + 23.9 * 60 * 60 * 1000);
  }
  if (path) {
    document.cookie =
      key + "=" + data + ";expires=" + exp.toUTCString() + ";path=" + path;
    return;
  }
  document.cookie = key + "=" + data + ";path=/;expires=" + exp.toUTCString();
}
```
### 1.3. 删除`cookie`

```ts
export function removeCookie(key: string, forceCookie = false) {
  if (localStorage && !forceCookie) {
    localStorage.removeItem(key);
  }
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  // 应该要清得彻底一点
  const value = getCookie(key);
  if (value !== null) {
    document.cookie = key + "=" + value + ";expires=" + exp.toUTCString();
  }
}
```

