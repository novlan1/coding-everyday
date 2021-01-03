## MySQL增加列，修改列名、列属性，删除列语句

### 修改表名

```sql
alter table test rename test1;
```

### 添加列

```sql
alter table test add column name varchar(10); 
```


### 删除列

```sql
alter table test drop column name;
```

### 修改列类型

```sql
alter table test modify address char(10)
||alter table test change address address  char(40)  
```

### 修改列名

```sql
alter table test change  column address address1 varchar(30);
```