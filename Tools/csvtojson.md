## csvtojson插件

可以导入CSV文件

### From CSV String to CSV Row 
```js
csv({
    noheader:true,
    output: "csv"
})
.fromString(csvStr)
.then((csvRow)=>{ 
    console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
})
```


### From CSV File to JSON Array
```js
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
```


