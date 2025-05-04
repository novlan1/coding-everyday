## MySQL的时间差函数TIMESTAMPDIFF、DATEDIFF的用法

**datediff函数，返回值是相差的天数，不能定位到小时、分钟和秒**。

```sql
-- 相差2天

select datediff('2018-03-22 09:00:00', '2018-03-20 07:00:00');
```

**TIMESTAMPDIFF函数，有参数设置，可以精确到天（DAY）、小时（HOUR），分钟（MINUTE）和秒（SECOND）**，使用起来比datediff函数更加灵活。对于比较的两个时间，时间小的放在前面，时间大的放在后面。

```sql
--相差1天

select TIMESTAMPDIFF(DAY, '2018-03-20 23:59:00', '2015-03-22 00:00:00');

--相差49小时

select TIMESTAMPDIFF(HOUR, '2018-03-20 09:00:00', '2018-03-22 10:00:00');

--相差2940分钟

select TIMESTAMPDIFF(MINUTE, '2018-03-20 09:00:00', '2018-03-22 10:00:00');

--相差176400秒

select TIMESTAMPDIFF(SECOND, '2018-03-20 09:00:00', '2018-03-22 10:00:00');
```

在存储过程中的写法：

注意：var_committime是前面业务中获取到需要比较的时间。

```sql
-- 获取当前时间

SET var_current_time = CONCAT(CURDATE(),' ',CURTIME());

-- 时间比较

SET var_time_diff = TIMESTAMPDIFF(MINUTE, var_committime, var_current_time); 或者直接now()

-- 判断未审核的合同是否超过48小时未处理，如果超过则进行后续逻辑处理，否则不处理。

IF (var_time_diff > 2880) THEN

-- 相关业务逻辑处理
```
