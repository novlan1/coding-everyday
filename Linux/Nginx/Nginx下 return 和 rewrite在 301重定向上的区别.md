唯一区别：正则匹配的性能区别
```bash
rewrite ^/(.*)$ https://example.com/$1;
rewrite ^ https://example.com$request_uri? permanent;
return 301 https://example.com$request_uri;
```

- 第一种 `rewrite` 写法是抓取所有的 URI 再减去开头第一个 / (反斜线)。
- 第二种写法用了`$request_uri` 省去了减去开头第一个反斜线的过程，正则匹配上性能更优。但仍不如第三种写法，因为 rewrite 有很多写法和规则，执行到最后 nginx 才知道这是一个 301 永久重定向。
- 第三种则直接 `return 301 + $request_uri`，直接告诉 nginx 这是个 301重定向，直接抓取指定URI。

所以以上三种写法，第三种性能更优一些。当然，一般情况下快那么一点点，作为普通业余站长来说，我们也感觉不到。


