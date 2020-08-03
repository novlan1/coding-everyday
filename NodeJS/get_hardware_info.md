####  可以获取外网 IP 的网址
```js
const ipUrlList = [
  "http://pv.sohu.com/cityjson",
  "http://www.net.cn/static/customercare/yourip.asp",
  "http://www.ip.cn",
  "http://www.ifconfig.io",
];
```

#### 获取外网端口号

```bash
curl ifconfig.io/port 
```

#### MAC 电脑获取WIFI、网线等对应的设备代码
```bash
networksetup -listnetworkserviceorder
```
示例如下：
```
An asterisk (*) denotes that a network service is disabled.
(1) USB 10/100/1000 LAN
(Hardware Port: USB 10/100/1000 LAN, Device: en7)

(2) Wi-Fi
(Hardware Port: Wi-Fi, Device: en0)

(3) Bluetooth PAN
(Hardware Port: Bluetooth PAN, Device: en6)

(4) Thunderbolt Bridge
(Hardware Port: Thunderbolt Bridge, Device: bridge0)
```


#### Windows 获取 CPU 序列号

```bash
wmic CPU get ProcessorID
```
返回示例如下：
```
ProcessorId
BFEBFBFF000506E3
```
#### 获取主机名字
```js
const os = require("os");
const host = os.hostname();
```
或者 `Windows/MAC` 命令：
```
hostname
```
#### 获取主机序列号
MAC（与获取磁盘序列号一样）：
```bash
system_profiler SPHardwareDataType
```
#### 获取磁盘序列号
MAC（获取的是`Hardware UUID`）：
```bash
system_profiler SPHardwareDataType
```
示例如下：
```
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Model Identifier: MacBookPro15,1
      Processor Name: 6-Core Intel Core i7
      Processor Speed: 2.2 GHz
      Number of Processors: 1
      Total Number of Cores: 6
      L2 Cache (per Core): 256 KB
      L3 Cache: 9 MB
      Hyper-Threading Technology: Enabled
      Memory: 16 GB
      Boot ROM Version: 1037.120.87.0.0 (iBridge: 17.16.15300.0.0,0)
      Serial Number (system): C02XGBVDJG5H
      Hardware UUID: 3B3FB39B-13D4-5270-A874-F16326BD0CCD
      Activation Lock Status: Disabled
```
Windows：
```
wmic diskdrive get serialnumber
```
返回示例如下：
```
SerialNumber
AU6485
86DA166MS
```
#### 获取磁盘分区信息
MAC（与获取系统盘卷标号一样）：
```bash
system_profiler SPStorageDataType
```
Windows：
```bash
wmic LOGICALDISK get filesystem,name,size?
```
返回示例如下：
```
FileSystem  Name  Size
NTFS        C:    213789782016
            D:
            E:
NTFS        F:    214754652160
NTFS        G:    214754652160
NTFS        H:    340186361856
```

#### 获取系统版本
Windows 命令：
```
ver
```
MAC 命令：
```
more /System/Library/CoreServices/SystemVersion.plist
```
返回示例如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>ProductBuildVersion</key>
        <string>19F101</string>
        <key>ProductCopyright</key>
        <string>1983-2020 Apple Inc.</string>
        <key>ProductName</key>
        <string>Mac OS X</string>
        <key>ProductUserVisibleVersion</key>
        <string>10.15.5</string>
        <key>ProductVersion</key>
        <string>10.15.5</string>
        <key>iOSSupportVersion</key>
        <string>13.5</string>
</dict>
</plist>
```

#### 获取系统盘卷标号
Windows 命令：
```
vol c:
```
返回示例如下：
```
驱动器 C 中的卷是 OS
卷的序列号是 14CE-F7C5
```
MAC命令：
```bash
system_profiler SPStorageDataType
```
返回示例如下：
```
Storage:

    Macintosh HD - 数据:

      Free: 19.15 GB (19,154,718,720 bytes)
      Capacity: 250.69 GB (250,685,575,168 bytes)
      Mount Point: /System/Volumes/Data
      File System: APFS
      Writable: Yes
      Ignore Ownership: No
      BSD Name: disk1s1
      Volume UUID: D95122D0-B8E2-4C3C-A8F2-9CAC88DEDAD9
      Physical Drive:
          Device Name: APPLE SSD AP0256M
          Media Name: AppleAPFSMedia
          Medium Type: SSD
          Protocol: PCI-Express
          Internal: Yes
          Partition Map Type: Unknown
          S.M.A.R.T. Status: Verified

    Macintosh HD:

      Free: 19.15 GB (19,154,718,720 bytes)
      Capacity: 250.69 GB (250,685,575,168 bytes)
      Mount Point: /
      File System: APFS
      Writable: No
      Ignore Ownership: No
      BSD Name: disk1s5
      Volume UUID: F2573A97-3C7C-478A-B0CE-58408C2CCC7A
      Physical Drive:
          Device Name: APPLE SSD AP0256M
          Media Name: AppleAPFSMedia
          Medium Type: SSD
          Protocol: PCI-Express
          Internal: Yes
          Partition Map Type: Unknown
          S.M.A.R.T. Status: Verified

    SunloginClient Installer:

      Free: 69.8 MB (69,849,088 bytes)
      Capacity: 100 MB (99,983,360 bytes)
      Mount Point: /Volumes/SunloginClient Installer
      File System: HFS+
      Writable: No
      Ignore Ownership: Yes
      BSD Name: disk2s1
      Volume UUID: 5E64F6B5-23B7-3A2A-B91D-36BE33AA4530
      Physical Drive:
          Device Name: Disk Image
          Media Name: Apple 已压缩为UDIF只读(zlib) Media
          Protocol: Disk Image
          Internal: No
          Partition Map Type: GPT (GUID Partition Table)
```
正则获取第一个`BSD Name`即可

#### 获取内网 IP 和 MAC 地址
```js
const os = require("os");
const ifaces = os.networkInterfaces();
```
在获取内网 IP 和 MAC 地址之前，可以先获取 WIFI、网线的设备编号，从而优先返回网线的 IP 地址和 MAC 地址。

原文链接：[Node 获取系统信息](https://uwayfly.com/detail/24)

