## JS 读取 `input[type=file]` 内容，直接显示文本 | 图片

1. 开始之前，你需要知道的一些基础知识

当出现 `<input type="file">` 时，该元素的 `value` 属性保存了用户指定的文件的名称，当外层有 `form` 表单包裹的时候，选中的文件会被添加到表单中一并上传至服务器。

通过点击 `input[type=file]` 来选取文件的时候，都会触发该 `input` 的 `onchange` 句柄，想要显示文件的内容，在该句柄添加方法即可

2. 显示选取的文本文件的内容
```html
<input type="file" id="file" onchange="handleFiles(this.files)"/>
<p id="text"></p>
```
```js
<script>
function handleFiles(files)
{
  if(files.length){
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function(){
      document.getElementById('text').innerHTML = this.result;
    };
    reader.readAsText(file);
   }
}
</script>
```
照上面的来，就会在 `p` 标签中显示出选择的文本文件的内容。

下面说说具体是怎么实现的：

1. `onchange="handleFiles(this.files)`

在 `input` 上添加这个的意思是，在用户选择文件的时候，调用 `handleFiles()` 方法，并把当前 `input` 上已选中的文件传给 `handleFiles()` 方法。

传递的 `this.files` 是 `input` 这个元素上已有的属性 `files`，这个`files` 是个 `FileList` 对象，里面包含已选的文件数组，所以取的时候需要用索引。

因为我们这里只有一个文件，所以这个文件就是 `files[0]`，这样，我们就取到了这个文件。接下来就是读取并显示这个文件。

2. 用 `FileReader` 读取文件的内容

我们已经取到文件 files[0]，读取这个文件的内容，需要用到 `FileReader` 这个对象，其方法和属性可以查看本文最下文。

读取文本文件
```js
let reader = new FileReader();
// 新建 FileReader 对象

reader.onload = function(){
    // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
  document.getElementById('text').innerHTML = this.result;
};

reader.readAsText(file);
// 设置以什么方式读取文件，这里以文本方式
```
读取图片并显示
```js
let fileReader = new FileReader();
fileReader.onload = () => {
    document.getElementById('preview').src = fileReader.result;
    // 其它跟上面是一样的，这里只需要指定 img 的 src 到 FileReader.result 就好了
};

fileReader.readAsDataURL(file);
// readAsDataURL 读取出的是图片的 base64 格式的数据，这种数据可以直接赋值到 img 的 src 上
```