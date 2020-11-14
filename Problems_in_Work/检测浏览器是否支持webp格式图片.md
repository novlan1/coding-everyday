检查：
```js
 funciton checkWebpSupport() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const result = (img.width > 0) && (img.height > 0);
      resolve(result);
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  });
},
```

使用：
```js
checkWebpSupport().then(res => {
  // ...
})
```