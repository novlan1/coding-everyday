- [1. Content-Type 类型](#1-content-type-类型)
  - [1.1. `application/x-www-form-urlencoded` 主要用于如下:](#11-applicationx-www-form-urlencoded-主要用于如下)
  - [1.2. `multipart/form-data`](#12-multipartform-data)
  - [1.3. `application/json`](#13-applicationjson)

### 1. Content-Type 类型

`application/x-www-form-urlencoded`, `multipart/form-data`, `application/json`, `application/xml` 这四个是`ajax`的请求，表单提交或上传文件的常用的资源类型。
form表单中可以定义`enctype`属性，该属性的含义是在发送到服务器之前应该如何对表单数据进行编码。默认的情况下，表单数据会编码为 `"application/x-www-form-unlencoded"`
`enctype`常用的属性值如下：

- `application/x-www-form-unlencoded`： 在发送前编码所有字符(默认情况下)；
- `multipart/form-data`, 不对字符编码。在使用文件上传时候，使用该值。

#### 1.1. `application/x-www-form-urlencoded` 主要用于如下:
1. 最常见的POST提交数据方式。
2. 原生form默认的提交方式(可以使用`enctype`指定提交数据类型)。
3. jquery，zepto等默认post请求提交的方式。

如上默认提交的 `contentType`为 `application/x-www-form-urlencoded`，此时提交的数据将会格式化成：`username=111&age=2;`
- 如果请求类型type是GET的话，那么格式化的字符串将直接拼接在`url`后发送到服务端； 
- 如果请求类型是POST, 那么格式化的字符串将放在`http body`的`Form Data`中发送。

<img src='/imgs/content_type_urlencoded.png' height='250' />


#### 1.2. `multipart/form-data`
使用表单上传文件时，必须指定表单的 `enctype`属性值为 `multipart/form-data`. 请求体被分割成多部分，每部分使用 `--boundary`分割；

<img src='/imgs/content_type_multipart.png' height='250' />



#### 1.3. `application/json`
在http请求中，`Content-Type`都是默认的值 `application/x-www-form-urlencoded`, 这种编码格式的特点是：`name/value`值对，每组之间使用`&`连接，而`name`与`value`之间是使用 `=` 连接，比如 `key=xxx&name=111&password=123456; `键值对一般的情况下是没有什么问题的，但是在一些复杂的情况下，比如需要传一个复杂的json对象，也就是对象**嵌套**数组的情况下，建议使用`application/json`传递比较好，

<img src='/imgs/content_type_json.png' height='250' />

如上我们可以看到json格式提交的数据会显示 `Request Payload;`

注意：请求头`Content-Type`的`Type`的T一定大写。


