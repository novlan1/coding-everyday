## linux tar 命令打包绝对路径文件去除目录结构（不打包目录）

```
tar -zcvf /opt/test/a.tar.gz -C/opt/test/ a.log
```
注意：**-C与文件夹之间没有空格，文件夹与文件中间有空格**



命令结构为：打包命令+空格+压缩后文件存放目录及名称+空格+"-C"+源文件目录+空格+文件名称



![img](http://img.uwayfly.com/article_mike_20200713105027_c2389584d988.png)

