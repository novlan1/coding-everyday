- [1. HTML `<meta>` 标签](#1-html-meta-标签)
  - [1.1. a. `name`属性](#11-a-name属性)
  - [1.2. b. `http-equiv`属性](#12-b-http-equiv属性)
  - [1.3. c. `HTML 4.01` 与 `HTML5`之间的差异](#13-c-html-401-与-html5之间的差异)
  - [1.4. d. Content-Type 类型](#14-d-content-type-类型)
    - [1.4.1. `application/x-www-form-urlencoded` 主要用于如下:](#141-applicationx-www-form-urlencoded-主要用于如下)
    - [1.4.2. `multipart/form-data`](#142-multipartform-data)
    - [1.4.3. `application/json`](#143-applicationjson)


### 1. HTML `<meta>` 标签
1. 元数据（Metadata）是数据的数据信息。
2. `<meta>` 标签提供了 HTML 文档的元数据。元数据不会显示在客户端，但是会被浏览器解析。
3. META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。
4. 元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。



HTML 与 XHTML 之间的差异

- 在 HTML 中 `<meta>` 标签没有结束标签。
- 在 XHTML 中 `<meta>` 标签必须包含结束标签。



#### 1.1. `name`属性

`name`属性主要用于**描述网页**，与之对应的属性值为`content`，`content`中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。 

meta标签的name属性语法格式是：
```
<meta name="参数" content="具体的参数值">
```



其中`name`属性主要有以下几种参数：　

- `Keywords`(关键字)　
  - `keywords`用来告诉搜索引擎你网页的关键字是什么。
- `description`(网站内容描述)
  - `description`用来告诉搜索引擎你的网站主要内容。
- `robots`(机器人向导)
  - `robots`用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。
  - `content`的参数有`all, none, index, noindex, follow, nofollow`。默认是all。
- `author`(作者)



#### 1.2. `http-equiv`属性

`http-equiv`顾名思义，**相当于http的文件头**作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为`content`，`content`中的内容其实就是各个参数的变量值。

meta标签的`http-equiv`属性语法格式是：

```
<meta http-equiv="参数"content="参数变量值">；
```



其中`http-equiv`属性主要有以下几种参数：

- `Expires`(期限)
  - 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。


- `Pragma`(`cache`模式)
  - 禁止浏览器从本地计算机的缓存中访问页面内容。


- `Refresh`(刷新)
  - 自动刷新并指向新页面。

- `Set-Cookie`(`cookie`设定)
  - 如果网页过期，那么存盘的`cookie`将被删除。


- `Window-target`(显示窗口的设定)
  - 强制页面在当前窗口以独立页面显示。

- `content-Type`(显示字符集的设定)
  - 设定页面使用的字符集。

- `content-Language`（显示语言的设定）




#### 1.3. `HTML 4.01` 与 `HTML5`之间的差异
**使用 `http-equiv` 已经不是规定 HTML 文档的字符集的唯一方式**：

`HTML 4.01`：
```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```
`HTML5`： 
```
<meta charset="UTF-8">
```

