需要先下载xcode和配置adb等

### MacOS 配置adb

先下载 Android stdio，然后配置环境变量。

```bash
vim ~/.bash_profile
```

然后输入下面内容，ANDROID_HOME 即为SDK位置。

```bash
# Android Sdk

export ANDROID_HOME=/Users/yang/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export PATH=${PATH}:${ANDROID_HOME}/tools/bin
export PATH=${PATH}:${ANDROID_HOME}/emulator
export ANDROID_SDK=${ANDROID_HOME}
export ANDROID_NDK=${ANDROID_HOME}/ndk-bundle
```

终端输入 `source ~/.bash_profile`，使环境变量生效。

然后输入 `adb devices` 或 `adb version`，可以检查是否配置成功。

另外，在手机上开启USB调试，才能在 `adb devices` 中看到设备。

参考：
- https://blog.csdn.net/xiaoyue_/article/details/132020304
- https://www.jianshu.com/p/744fc5946627
