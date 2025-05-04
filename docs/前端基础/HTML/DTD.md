- [1. doctype 是什么，举例常见 doctype 及特点](#1-doctype-是什么举例常见-doctype-及特点)
- [2. 标准模式与兼容模式各有什么区别？](#2-标准模式与兼容模式各有什么区别)
- [3. HTML5 为什么只需要写 `<!DOCTYPE HTML>`，而不需要引入 DTD？](#3-html5-为什么只需要写-doctype-html而不需要引入-dtd)
- [4. SGML 、 HTML 、XML 和 XHTML 的区别？](#4-sgml--html-xml-和-xhtml-的区别)
- [5. DTD 介绍](#5-dtd-介绍)

### 1. doctype 是什么，举例常见 doctype 及特点

1. `<!doctype>`声明必须处于 HTML 文档的头部，在`<html>`标签之前，HTML5 中不区分大小写
2. `<!doctype>`声明不是一个 HTML 标签，是一个用于告诉浏览器当前 HTMl 版本的指令
3. 现代浏览器的 html 布局引擎通过检查 doctype 决定使用兼容模式还是标准模式对文档进行渲染，一些浏览器有一个接近标准模型。
4. 在 HTML4.01 中`<!doctype>`声明指向一个 DTD，由于 HTML4.01 基于 SGML，所以 DTD 指定了标记规则以保证浏览器正确渲染内容
5. HTML5 不基于 SGML，所以不用指定 DTD

常见 dotype：

1. **HTML4.01 strict**：不允许使用表现性、废弃元素（如 font）以及 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
2. **HTML4.01 Transitional**:允许使用表现性、废弃元素（如 font），不允许使用 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
3. **HTML4.01 Frameset**:允许表现性元素，废气元素以及 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
4. **XHTML1.0 Strict**:不使用允许表现性、废弃元素以及 frameset。文档必须是结构良好的 XML 文档。声明：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
5. **XHTML1.0 Transitional**:允许使用表现性、废弃元素，不允许 frameset，文档必须是结构良好的 XMl 文档。声明： `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
6. **XHTML 1.0 Frameset**:允许使用表现性、废弃元素以及 frameset，文档必须是结构良好的 XML 文档。声明：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
7. **HTML 5**: `<!doctype html>`

### 2. 标准模式与兼容模式各有什么区别？

标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

### 3. HTML5 为什么只需要写 `<!DOCTYPE HTML>`，而不需要引入 DTD？

HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。

而 HTML4.01 基于 SGML ，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

### 4. SGML 、 HTML 、XML 和 XHTML 的区别？

1. **SGML 是标准通用标记语言**，是一种定义电子文档结构和描述其内容的国际标准语言，是**所有电子文档标记语言的起源**。

1. HTML 是超文本标记语言，主要是用于规定怎么显示网页。

1. XML 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 **XML 的标签是可以自己创建的，数量无限多**，而 HTML 的标签都是固定的而且数量有限。

1. XHTML 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是**比 HTML 更严格，比如标签必须都用小写，标签都必须有闭合标签等**。

### 5. DTD 介绍

DTD（ `Document Type Definition` 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。

DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。
