## NodeJS中的`child_process`模块



### `spawn` 和 `exec` 的区别
1. 总体来说 `spawn` 返回一个`stream`，`exec`返回一个`buffer`

2. 接受参数的方式:`spawn`使用了参数数组，而`exec`则直接接在命令后。
    - 比如要运行 `du -sh /disk1` 命令， 使用`spawn`函数需要写成`spawn('du', ['-sh ', '/disk1'])`；
    - 而使用`exec`函数时，可以直接写成`exec('du -sh /disk1')`。`exec`是会先进行`Shell`语法解析，因此用`exec`函数可以更方便的使用复杂的`Shell`命令，包括管道、重定向等。

`child_process.spawn`
1. `child_process.spawn` 返回一个有输出流和错误的流的对象，你可以监听它们从而获取数据，输出流有数据和结束事件，**`child_process.spawn` 适合用在处理大量数据返回的场景中，图片处理，读二进制数据等等**。
2. `child_process.spawn`是一个异步的异步函数，怎么解释呢？`child_process.spawn` 在执行时就会返回数据，而不是等到数据都处理好了再一次返回。

`child_process.exec`
1. `child_process.exec` 一次性返回输出执行结果内容，默认的`buffer`大小为`200kb`，如果`exec`返回的内容超过 `200kb`则会返回一个错误：`Error maxBuffer execeded`，你可以通过设置`options buffer`的`size`来扩大 `buffer` 的大小。
2. `child_process.exec` 是一个同步的异步方法，这个意思是，虽然方法体本身是异步的，但是它要等 `child process` 执行完成后，再把返回数据一口气返回给回调方法。如果返回内容超过了设置的`buffer size`，则会返回一个`maxBuffer exceeded` 错误。

`spawn`例子：
```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```


`exec`例子：
```js
const { exec } = require('child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
```

