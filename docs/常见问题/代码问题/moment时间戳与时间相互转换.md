## moment时间戳与时间相互转换

举例

时间：`var time = new Date(); // Tue Aug 28 2018 09:16:06 GMT+0800` (中国标准时间)

时间戳：`var timestamp = Date.parse(time); // 1535419062000` （**Date.parse() 默认不取毫秒，即后三位毫秒为0**）


```js
// moment转时间：
moment(time).valueOf(); // 1535419062126

// moment转时间戳：
moment(timestamp).format(); // 2018-08-28T09:17:42+08:00
```


