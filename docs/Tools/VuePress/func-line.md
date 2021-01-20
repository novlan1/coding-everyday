- [为Vuepress文档增加源代码链接](#为vuepress文档增加源代码链接)
  - [实现步骤](#实现步骤)
  - [具体实现](#具体实现)
  - [效果](#效果)
  - [注意](#注意)

## 为Vuepress文档增加源代码链接

在用Vuepress制作公共库文档的时候，仅用文字描述和代码示例，用户印象并不深刻。

如果能跳转到源代码文件，就可以节省用户时间，不用自己寻找源代码地址，从而增强文档的可用性。

### 实现步骤

1、实现一个方法，能够提取所有API（函数/类）所在文件和行号

2、在markdwon文件的相应位置插入a标签，指向上面找到的文件链接

### 具体实现

对于步骤一，可以通过正则匹配的方式，找到所有的function、箭头函数关健词等，进而找到所在行号。我写了一个命令行工具，能够提取这样的对应关系，具体见：https://github.com/novlan1/func-line-cli

对于步骤二，实现如下：

1、先在markdown文件中插入空的a标签占位置

2、然后在Vuepress的enhanceApp.js中，mounted后找到这些a标签，赋予其对应的链接。

我写了一个另一个插件，在.vuepress/enhanceApp.js中使用，具体见：https://github.com/novlan1/v-func-line

### 效果

效果见下图，点击下面的source链接，会跳转到对应的git地址：

![img](http://km.oa.com/files/photos/pictures/151/a9f2c33d943e7959f73d60468b8fe_w1634_h1194.png)



![img](http://km.oa.com/files/photos/pictures/b17/4e96b67efbe926574e923efd1f52d_w1320_h230.png)



### 注意

1、正则匹配的API对应行号有时不够全，所以需要额外的手写的json数据作为补充。

2、如果同一份文档中存在多个git仓库链接，需要自己进行处理，比如将gitLink保留公共部分，差异部分放到`funcLineMap.json`文件中。