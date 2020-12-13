- [1. 添加多列唯一约束](#1-添加多列唯一约束)
- [2. 为`t_test`已有表中的`nickname`字段设置默认值](#2-为t_test已有表中的nickname字段设置默认值)
- [3. 表建立后，增加非空约束](#3-表建立后增加非空约束)
- [4. SQL 对查询为`null`的值赋默认值](#4-sql-对查询为null的值赋默认值)
- [5. relace函数](#5-relace函数)
- [6. `datetime`类型导入不到`navicat`中](#6-datetime类型导入不到navicat中)
- [7. MySQL 最基本操作](#7-mysql-最基本操作)
- [8. On Delete属性](#8-on-delete属性)
- [9. On update属性](#9-on-update属性)
- [10. MySQL如何支持emoji表情？](#10-mysql如何支持emoji表情)

### 1. 添加多列唯一约束
```sql
alter table tutor add unique key unique_tutor ( tutorName, schoolName, collegeName, tutorType)
```


### 2. 为`t_test`已有表中的`nickname`字段设置默认值
```sql
ALTER TABLE t_test ALTER COLUMN nickname SET DEFAULT ‘刘德华’;
```

### 3. 表建立后，增加非空约束
```
alter table annis modify openid varchar(80) not null
```


### 4. SQL 对查询为`null`的值赋默认值

针对不同的数据库实现方式有

1. sqlserver：
```sql
select isnull(字段,0) from 表名 --这样就是把空值赋值为0 
```
2. MySQL：
```sql
select ifnull(字段,0) from 表名
```
3. oracle：
```sql
select nvl(字段,0) from 表名
```

### 5. relace函数

比如要将表 `tb1`里面的 `f1`字段的`abc`替换为`def`
```bash
UPDATE tb1 SET f1=REPLACE(f1, 'abc', 'def');
```
日期格式替换：
```bash
update annis set date=replace(date, '/', '-')
```

### 6. `datetime`类型导入不到`navicat`中
在 excel 中将数据格式加上`s`（秒）


### 7. MySQL 最基本操作
```sql
mysql -uroot –p  --连接mysql，-u和root之间不加空格也可以

show databases;

create database <数据库名>

drop database <数据库名>

use mydatabase;

desc <表名>;     --查看指定表结构

drop table <表名>;    --删除表

exit 或 quit（回车）   --退出MySQL

set password for 用户名@localhost = password('新密码');   --修改密码
```


### 8. On Delete属性

On Delete属性，可能取值为：`No Action`，`Cascade`，`Set Null`，`Restrict`属性。

- 当取值为`No Action`或者`Restrict`时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除。
- 当取值为`Cascade`时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则也删除外键在子表（即包含外键的表）中的记录。
- 当取值为`Set Null`时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（不过这就要求该外键允许取null）。

### 9. On update属性

- 当取值为`No Action`或者`Restrict`时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许更新。
- 当取值为`Cascade`时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则也更新外键在子表（即包含外键的表）中的记录。
- 当取值为`Set Null`时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（不过这就要求该外键允许取null）。

 

### 10. MySQL如何支持emoji表情？

mysql支持emoji表情，只需要将需要的字段由`utf8_general_ci`变为`utf8m64_general_ci`即可

原因：UTF-8编码有可能是两个、三个、四个字节。`Emoji`表情是4个字节，而Mysql的`utf8`编码最多3个字节，所以数据插不进去。

 

 