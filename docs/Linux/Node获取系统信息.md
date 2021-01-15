## Node获取系统信息

1. 获取公网IP

```bash
curl ifconfig.io
```

2. 获取公网端口

```bash
curl ifconfig.io/port
```

3. 获取内网IP

```js
const os = window.require('os')
const ifaces = os.networkInterfaces()
 
let address = '' // IP地址
for (let dev in ifaces) {
  for ( let iface of ifaces[dev]) {
    if (iface.family === 'IPv4' && iface.address !== '127.0.0.1' && !iface.internal) {
      address = iface.address;
      resolve(address)
      return
    }
  }
}
```
4. 获取磁盘序列号
```js
const os = window.require("os");
const platform = os.platform();
const process = window.require("child_process");
if (platform === "darwin") {
  process.exec("system_profiler SPHardwareDataType", function(error, stdout, stderr) {
    if (stdout && !error) {
      var reg = /Hardware UUID:(.*)/;
      const res = reg.exec(stdout);
      if (res && res[1]) {
        resolve(res[1].trim());
      }
} else if (platform === "win32") {
  process.exec("wmic diskdrive get serialnumber", function(error, stdout, stderr) {
    if (stdout && !error) {
    let res = stdout.split("\n");
    if (res && res[1] && /^[a-zA-Z0-9]*$/.test(res[1].trim())) {
      resolve(res[1].trim());
    } 
  });
}
```

5. 获取CPU序列号
```bash
macbook: system_profiler SPHardwareDataType
windows: wmic CPU get ProcessorID 
```
6. 获取MAC地址

```js
const os = window.require('os')
const ifaces = os.networkInterfaces()

let macAddress = '' // MAC地址
for (let dev in ifaces) {
  for ( let iface of ifaces[dev]) {

    if (!iface.internal && iface.mac !== '00:00:00:00:00:00' && iface.family === 'IPv4') {
      macAddress = iface.mac
      resolve(macAddress)
      return
    }
  }
}
```

7. 获取主机名字 
```js
os.hostname() 
// 但是windows乱码，所以用process.exec('hostname', { encoding: 'binary' } ...)
```

8. 获取硬盘分区信息
```bash
mac: system_profiler SPStorageDataType
windows: wmic LOGICALDISK get filesystem,name,size
```

9. 获取系统盘卷标号
```bash
mac: system_profiler SPStorageDataType
windows: vol c:
```

10.  node 调用cmd 乱码问题

出现原因：因为CMD默认的是gbk2312 编码 , 而nodejs 默认的是utf-8的格式, 所以在exec 运行的时候接受的cmd命令返回值乱码

解决方式: 

使用 iconv 进行编码转一下

```bash
npm install iconv-lite
```

```js
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true; // 这个主要是它会警告, 大体意思是转化编码失去精度, 不想看见控制台报那种一片黄色警告的就加上这句
const childProcess = require('child_process');

childProcess.exec(`dir`,{ encoding: 'binary' },(err, stdout, stderr)=>{
  if(err){
    return false;
  } else {
    let ress = iconv.decode(stdout, 'cp936');
　}
})
```

11. 获取系统版本号

mac电脑：
```bash
more /System/Library/CoreServices/SystemVersion.plist
```