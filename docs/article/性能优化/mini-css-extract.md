`uni-app` 小程序打包产物的 `runtime` 很大，而且每次做个新需求都会变大一点，这是为什么呢？

通过查看 `runtime` 打包产物，可以看到有很多组件路径在里面，这是 `mini-css-extract-plugin` 为异步 `css` 加载增加的运行时代码。大致结构如下：

```js
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];
  // mini-css-extract-plugin CSS loading

  // cssChunks 很多，这里只列了一个
  var cssChunks = {"components/dialogs/match-intro-layer/index":1,};
  if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
  else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
    promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {

      // 下面的对象同样很多，这里也只列了一小部分
      var href = "" + ({"component/ui/tip-merchant/tip-comp-dialog-explain/index":"component/ui/tip-merchant/tip-comp-dialog-explain/index","components/dialogs/match-intro-layer/index":"components/dialogs/match-intro-layer/index","components/global-component/global-component":"components/global-component/global-component","views/index/common/vendor":"views/index/common/vendor","node-modules/@tencent/press-ui/press-loading/press-loading":"node-modules/@tencent/press-ui/press-loading/press-loading"}[chunkId]||chunkId) + ".wxss";
      var fullhref = __webpack_require__.p + href;
      var existingLinkTags = document.getElementsByTagName("link");
      for(var i = 0; i < existingLinkTags.length; i++) {
        var tag = existingLinkTags[i];
        var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
        if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
      }
      var existingStyleTags = document.getElementsByTagName("style");
      for(var i = 0; i < existingStyleTags.length; i++) {
        var tag = existingStyleTags[i];
        var dataHref = tag.getAttribute("data-href");
        if(dataHref === href || dataHref === fullhref) return resolve();
      }
      var linkTag = document.createElement("link");
      linkTag.rel = "stylesheet";
      linkTag.type = "text/css";
      linkTag.onload = resolve;
      linkTag.onerror = function(event) {
        var request = event && event.target && event.target.src || fullhref;
        var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
        err.code = "CSS_CHUNK_LOAD_FAILED";
        err.request = request;
        delete installedCssChunks[chunkId]
        linkTag.parentNode.removeChild(linkTag)
        reject(err);
      };
      linkTag.href = fullhref;
  
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(linkTag);
    }).then(function() {
      installedCssChunks[chunkId] = 0;
    }));
  }
  
  // JSONP chunk loading for javascript
  // 省略其他运行时代码

  return Promise.all(promises);
};
```

一看里面有 `document` 就知道肯定不会运行到，因为小程序没有 `document`。

那为什么会有异步 `css` 呢，是 `vue-cli` 的 `css.extract` 这个属性被强制设置成了 `true`。而 `mini-css-extract-plugin` 作用是把组件的 `css` 分离到单独的 `wxss` 文件。

能不能禁用掉 `mini-css-extract-plugin` 呢？不可以，因为 `wxss` 就生成不出来了。只需要把生成的上面的异步加载 `css` 的代码去掉即可。

这里用了一个插件，`mainTemplate` 的编译中会把 `mini-css-extract-plugin` 当成空函数。


```js
const {
  mainTemplate,
} = compilation;
mainTemplate.hooks.localVars.intercept({
  register: (tapInfo: any) => {
    if (tapInfo.name === 'mini-css-extract-plugin') {
      tapInfo.fn = function () {};
    }
    return tapInfo;
  },
});
mainTemplate.hooks.requireEnsure.intercept({
  register: (tapInfo: any) => {
    if (tapInfo.name === 'mini-css-extract-plugin') {
      tapInfo.fn = function () {};
    }
    return tapInfo;
  },
});
```

效果对比，使用前：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_68993f09f9b81a54df.png" width="700">

使用后：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/3/own_mike_8966cd7551ac5b513c.png" width="700">