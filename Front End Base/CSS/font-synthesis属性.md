## font-synthesis属性

font-synthesisCSS 属性控制浏览器可以合成（synthesize）哪些缺失的字体，粗体或斜体。

```css
font-synthesis: weight style; 
font-synthesis: none; 
font-synthesis: weight; 
font-synthesis: style;
```

大多数标准西方字体包含斜体和粗体变体，但许多新颖（novelty）的字体不包括这些。用于中文、日文、韩文和其他语标文字（logographic script）的字体往往不含这些变体，同时，从默认字体中生成、合成这些变体可能会妨碍文本的易读性。在这些情况下，可能最好关闭浏览器默认的 font-synthesis 字体合成特性。

初始值： `weight style`

属性值
- none
 此关键词表示不合成粗体字型（typeface）或斜体字型。
- weight
 此关键词表示，如果需要的话，可以合成粗体字型。
- style
 此关键词表示，如果需要的话，可以合成斜体字型。




