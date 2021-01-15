## MySQL设置复合主键方法

```sql
alter table tb_name add primary key (字段1,字段2,字段3);
```

或者

```sql
CREATE TABLE SC
    (Sno CHAR(12),
    Con CHAR(4),
    PRIMARY KEY(Sno,Con)
)
```

