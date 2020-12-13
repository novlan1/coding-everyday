## Python获取当前时间及格式化

```python
import time

# 打印时间戳
print(time.time())
# 1595229943.843956

# 格式化时间戳为本地的时间
print(time.localtime(time.time()))
# time.struct_time(tm_year=2020, tm_mon=7, tm_mday=20, tm_hour=15, tm_min=25, tm_sec=54, tm_wday=0, tm_yday=202, tm_isdst=0)


# 优化格式化化版本
print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
# 2020-07-20 15:30:18
```


**strftime根据区域设置格式化本地时间/日期，函数的功能：将时间格式化**！！！，或者说格式化一个时间字符串。(f指的是format)


**strptime()，功能：按照特定时间格式将字符串转换（解析）为时间类型**。（p指的是parse）



```python
print(time.strptime('2020-05-02', '%Y-%m-%d'))
# time.struct_time(tm_year=2020, tm_mon=5, tm_mday=2, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=5, tm_yday=123, tm_isdst=-1)
```