md5需要使用2版本，不能使用1版本。否则会报错：

```
mp.runtime.esm.js?09f6:5840 TypeError: Cannot set property '_block' of undefined
    at HashBase (index.js?a465:15)
    at MD5 (index.js?8036:9)
    at getMPMsdkParams (mp-msdk.ts:88)
    at VueComponent.onLoad (project-mixins.js:46)
    at invokeWithErrorHandling (mp.runtime.esm.js?09f6:1863)
    at VueComponent.Vue.__call_hook (mp.runtime.esm.js?09f6:5903)
    at VueComponent._vue.default.__call_hook (index.js:2076)
    at gi.pageOptions.methods.onLoad (index.js:2408)
    at gi.t.<computed>.t.<computed> [as onLoad] (aegis.min.js?6708:10)
    at gi.<anonymous> (WASubContext.js?t=wechat&s=1715396363953&v=3.3.4:1)(env: macOS,mp,1.06.2402021; lib: 3.3.4)
```

如果 pnpm 包中做了转发，记得 npm i md5@2，否则会从上往下查找，使用 md5@1 的版本，导致出错。
