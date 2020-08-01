### 添加多列唯一约束
```sql
alter table tutor add unique key unique_tutor ( tutorName, schoolName, collegeName, tutorType)
```


### 为`t_test`已有表中的`nickname`字段设置默认值
```sql
ALTER TABLE t_test ALTER COLUMN nickname SET DEFAULT ‘刘德华’;
```

### 表建立后，增加非空约束
```
alter table annis modify openid varchar(80) not null
```


### SQL 对查询为`null`的值赋默认值

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

### relace函数

比如要将表 `tb1`里面的 `f1`字段的`abc`替换为`def`
```bash
UPDATE tb1 SET f1=REPLACE(f1, 'abc', 'def');
```
日期格式替换：
```bash
update annis set date=replace(date, '/', '-')
```

### `datetime`类型导入不到`navicat`中
在 excel 中将数据格式加上`s`（秒）

 

 