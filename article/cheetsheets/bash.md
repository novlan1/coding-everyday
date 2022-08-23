## 1. [[ false ]]


```bash
if [[ false ]];then
  echo '1'
fi;

if [[ true ]]; then
  echo '1'
fi;

if [[ 0 ]];then
  echo '1'
fi;

if [[ 1 ]];then
  echo '1'
fi;
```

会打印出4个1


`[[ false ]]` 中的false是字符串，下面这样就可以

```bash
if false;then echo "YES"; else echo "NO"; fi # NO
if true;then echo "YES"; else echo "NO"; fi # YES
```


## 2. bash彩色字体

```bash
echo -e "\033[31m红字\033[0m"
```

## 3. echo多行变量到文件中

```bash
echo "VUE_APP_DIR = ${VUE_APP_DIR}

DEV_HOST_NAME=9

DEV_HOST_PWD=N
" > .env.local
```


## 4. shell获取函数返回值

通过echo返回一个任意值

在函数最后使用echo打印一个值，在调用该函数的地方，可以通过 `$(function_name)` 把结果传给一个新的变量，也就获取了函数的处理结果


参考：https://cloud.tencent.com/developer/article/1991405




## 5. cat /dev/null > somedir 

可以用来清空文件


## 6. df -h

查看磁盘容量 `df -h`

查看大体积文件夹 `du -h --max-depth=1`

