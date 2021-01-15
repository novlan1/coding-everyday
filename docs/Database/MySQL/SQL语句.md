- [1. SQL语句](#1-sql语句)
  - [1.1. 修改数据表名称，如将titles_test表名修改为titles_2017。](#11-修改数据表名称如将titles_test表名修改为titles_2017)
  - [1.2. 插入数据，如果数据已经存在，请忽略](#12-插入数据如果数据已经存在请忽略)
  - [1.3. 对于employees表，在对first_name进行排名后，选出奇数排名对应的first_name](#13-对于employees表在对first_name进行排名后选出奇数排名对应的first_name)
  - [1.4. 三张表，film(film_id, title, description)，category(category_id, name)，film-category(film_id, category_id)，属于Action分类的所有电影对应的title,description](#14-三张表filmfilm_id-title-descriptioncategorycategory_id-namefilm-categoryfilm_id-category_id属于action分类的所有电影对应的titledescription)
  - [1.5. 找出没有分类的电影id以及名称](#15-找出没有分类的电影id以及名称)
  - [1.6. 查找描述信息(film.description)中包含robot的电影对应的分类名称(category.name)以及电影数目(count(film.film_id))，而且还需要该分类包含电影总数量(count(film_category.category_id))>=5部](#16-查找描述信息filmdescription中包含robot的电影对应的分类名称categoryname以及电影数目countfilmfilm_id而且还需要该分类包含电影总数量countfilm_categorycategory_id5部)
  - [1.7. 查找salary的累计和running_total。其中running_total为前N个当前( to_date = '9999-01-01')员工的salary累计和，其他以此类推。具体结果如下Demo展示。](#17-查找salary的累计和running_total其中running_total为前n个当前-to_date--9999-01-01员工的salary累计和其他以此类推具体结果如下demo展示)
  - [1.8. 删除emp_no重复的记录，只保留最小的id对应的记录。](#18-删除emp_no重复的记录只保留最小的id对应的记录)
  - [1.9. MYSQL top 报错](#19-mysql-top-报错)
  - [1.10. 查找薪水变动超过15次的员工号emp_no以及其对应的变动次数](#110-查找薪水变动超过15次的员工号emp_no以及其对应的变动次数)
  - [1.11. 查找当前薪水(to_date='9999-01-01')排名第二多的员工编号emp_no、薪水salary、last_name以及first_name，你可以不使用order by完成吗](#111-查找当前薪水to_date9999-01-01排名第二多的员工编号emp_no薪水salarylast_name以及first_name你可以不使用order-by完成吗)
  - [1.12. 查找员工编号emp_no为10001其自入职以来的薪水salary涨幅(总共涨了多少)growth(可能有多次涨薪，没有降薪)](#112-查找员工编号emp_no为10001其自入职以来的薪水salary涨幅总共涨了多少growth可能有多次涨薪没有降薪)
  - [1.13. 查找所有员工自入职以来的薪水涨幅情况，给出员工编号emp_no以及其对应的薪水涨幅growth，并按照growth进行升序](#113-查找所有员工自入职以来的薪水涨幅情况给出员工编号emp_no以及其对应的薪水涨幅growth并按照growth进行升序)
  - [1.14. 对所有员工的当前(to_date='9999-01-01')薪水按照salary进行按照1-N的排名，相同salary并列且按照emp_no升序排列](#114-对所有员工的当前to_date9999-01-01薪水按照salary进行按照1-n的排名相同salary并列且按照emp_no升序排列)
  - [1.15. 七张图入门SQL](#115-七张图入门sql)

## 1. SQL语句

### 1.1. 修改数据表名称，如将titles_test表名修改为titles_2017。



题目是sqlite3，必须要加to

```
alter table titles_test rename to titles_2017
```

如果是mysql，不用加to

```
alter table titles_test rename titles_2017
```


### 1.2. 插入数据，如果数据已经存在，请忽略



因为题目判定系统使用的是sqlite3，所以必须按sqlite3的写法来做，

```
insert or ignore into actor
values(3,'ED','CHASE','2006-02-15 12:34:33');
```

如果是mysql，那么把or去掉，像下面这样：

```
insert IGNORE into actor
values(3,'ED','CHASE','2006-02-15 12:34:33');
```


### 1.3. 对于employees表，在对first_name进行排名后，选出奇数排名对应的first_name

```
select e1.first_name 
from employees as e1 
where(
select count(*) from employees as e2 
where e1.first_name >= e2.first_name
)%2=1;
```

先排序，然后取出奇数列。如果 e1.first_name 是第一位，比如a，那 e2.first_name 只有1个，就是 e1.first_name 本身；如果 e1.first_name 排在第二位，比如吧，就有它和比它小的2个。

下面是打印出排序后的序号

```
SELECT e2.first_name, 
    (SELECT COUNT(*) FROM employees AS e3 
     WHERE e3.first_name <= e2.first_name) 
   AS rowid FROM employees AS e2
```





### 1.4. 三张表，film(film_id, title, description)，category(category_id, name)，film-category(film_id, category_id)，属于Action分类的所有电影对应的title,description

```
# 子查询方法
select f.title, f.description from film as f 
where f.film_id in 
( 
select fc.film_id 
from film_category as fc 
where fc.category_id in
(
select c.category_id 
from category as c 
where c.name = 'Action'
)
);


# 非子查询方法
select f.title, f.description 
from film as f 
inner join film_category as fc on fc.film_id = f.film_id 
inner join category as c on fc.category_id = c.category_id 
where c.name = 'action';


# 其他方法
select f.title, f.description 
from film as f, film_category as fc,category as c 
where f.film_id = fc.film_id 
and fc.category_id = c.category_id 
and c.name = 'ACTION';
```

### 1.5. 找出没有分类的电影id以及名称

```
# 解题思路是运用 LEFT JOIN 连接两表，用 IS NULL 语句限定条件
select f.title, f.description 
from film as f 
left join film_category as fc 
on fc.film_id = f.film_id 
where fc.category_id is Null;
```


### 1.6. 查找描述信息(film.description)中包含robot的电影对应的分类名称(category.name)以及电影数目(count(film.film_id))，而且还需要该分类包含电影总数量(count(film_category.category_id))>=5部

- 1、找到对应电影数量>=5的所有分类，建立成虚表cc
- 2、设定限制条件 f.description like '%robot%'
- 3、在表cc、f、fc、c中查找包括robot的电影对应的分类名称和对应的电影数目。
- 注意c.category_id = cc.category_id 是必要的。

```
select c.name, count(fc.film_id) 
from(
select category_id, count(film_id) 
from film_category as fc 
group by category_id 
having count(film_id) >=5  
) as cc,
film as f, category as c, film_category as fc
where f.film_id = fc.film_id 
and fc.category_id = c.category_id
and c.category_id = cc.category_id
and f.description like '%robot%';
```


### 1.7. 查找salary的累计和running_total。其中running_total为前N个当前( to_date = '9999-01-01')员工的salary累计和，其他以此类推。具体结果如下Demo展示。

```
emp_no	salary	running_total
10001	88958	88958
10002	72527	161485
10003	43311	204796
10004	74057	278853
```

本题的思路为复用 salaries 表进行子查询，最后以 s1.emp_no 排序输出求和结果。

- 1、输出的第三个字段，是由一个 SELECT 子查询构成。将子查询内复用的 salaries 表记为 s2，主查询的 salaries 表记为 s1，
- 当主查询的 s1.emp_no 确定时，对子查询中不大于 s1.emp_no 的 s2.emp_no 所对应的薪水求和
- 2、注意是对员工当前的薪水求和，所以在主查询和子查询内都要加限定条件 to_date = '9999-01-01'

```
select s1.emp_no, s1.salary, (
select count(s2.salary) 
from salaries as s2 
where s2.emp_no <= s1.emp_no 
and s2.to_date='9999-01-01'
)as running_total
from salaries as s1
where s1.to_date = '9999-01-01'
order by s1.emp_no;
```


### 1.8. 删除emp_no重复的记录，只保留最小的id对应的记录。



- 先用 GROUP BY 和 MIN() 选出每个 emp_no 分组中最小的 id
- 然后用 DELETE FROM ... WHERE ... NOT IN ... 语句删除 “非每个分组最小id对应的所有记录”

```
delete from titles_test 
where id not in (
select min(id) 
from titles_test 
group by emp_no
);
```

### 1.9. MYSQL top 报错

**top 语法适用于sqlserver或access，不适用于mysql。在mysql下，得用limit。比如 select * from test limit 3**




### 1.10. 查找薪水变动超过15次的员工号emp_no以及其对应的变动次数

```
select a.emp_no,count(*) t from salaries a inner join salaries b
on a.emp_no=b.emp_no and a.to_date = b.from_date
where a.salary < b.salary
group by a.emp_no
having t>15
```


### 1.11. 查找当前薪水(to_date='9999-01-01')排名第二多的员工编号emp_no、薪水salary、last_name以及first_name，你可以不使用order by完成吗

```
解法1 max 任意相同工资人数
select e.emp_no,s.salary,e.last_name,e.first_name
from
employees e
join 
salaries s on e.emp_no=s.emp_no 
and  s.to_date='9999-01-01'
and s.salary = (select max(salary)
                from salaries
                where salary<(select max(salary) 
                              from salaries 
                              where to_date='9999-01-01'
                             )
                        and to_date='9999-01-01'
                )

第二种 通用型可以求任意第几高，并且可以求多个形同工资
select e.emp_no,s.salary,e.last_name,e.first_name
from
employees e
join 
salaries s on e.emp_no=s.emp_no 
and  s.to_date='9999-01-01'
and s.salary = 
(
     select s1.salary
     from 
     salaries s1
     join
     salaries s2 on s1.salary<=s2.salary 
     and s1.to_date='9999-01-01' and s2.to_date='9999-01-01'
     group by s1.salary
     having count(distinct s2.salary)=2
 )
```


### 1.12. 查找员工编号emp_no为10001其自入职以来的薪水salary涨幅(总共涨了多少)growth(可能有多次涨薪，没有降薪)

1. 先分别找到emp_no=10001的员工的第一次工资记录与最后一次工资记录
2. 再将最后一次工资记录减去第一次工资记录得到入职以来salary的涨幅，最后用别名growth代替

```
SELECT ( 
(SELECT salary FROM salaries WHERE emp_no = 10001 ORDER BY to_date DESC LIMIT 1) -
(SELECT salary FROM salaries WHERE emp_no = 10001 ORDER BY to_date ASC LIMIT 1)
) AS growth
```


### 1.13. 查找所有员工自入职以来的薪水涨幅情况，给出员工编号emp_no以及其对应的薪水涨幅growth，并按照growth进行升序

```
select a.emp_no, (b.salary - c.salary) as growth
from
    employees as a
    inner join salaries as b
    on a.emp_no = b.emp_no and b.to_date = '9999-01-01'
    inner join salaries as c
    on a.emp_no = c.emp_no and a.hire_date = c.from_date
order by growth asc
```


### 1.14. 对所有员工的当前(to_date='9999-01-01')薪水按照salary进行按照1-N的排名，相同salary并列且按照emp_no升序排列

本题的主要思想是复用salaries表进行比较排名，具体思路如下：

1. 从两张相同的salaries表（分别为s1与s2）进行对比分析，先将两表限定条件设为to_date = '9999-01-01'，挑选出当前所有员工的薪水情况。
2. 本题的精髓在于 s1.salary <= s2.salary，意思是**在输出s1.salary的情况下，有多少个s2.salary大于等于s1.salary**，比如当s1.salary=94409时，有3个s2.salary（分别为94692,94409,94409）大于等于它，但由于94409重复，利用COUNT(DISTINCT s2.salary)去重可得工资为94409的rank等于2。其余排名以此类推。
3. 千万不要忘了GROUP BY s1.emp_no，否则输出的记录只有一条（可能是第一条或者最后一条，根据不同的数据库而定），因为用了合计函数COUNT()
4. 最后先以 s1.salary 逆序排列，再以 s1.emp_no 顺序排列输出结果



```
SELECT s1.emp_no, s1.salary, COUNT(DISTINCT s2.salary) AS rank
FROM salaries AS s1, salaries AS s2
WHERE s1.to_date = '9999-01-01'  AND s2.to_date = '9999-01-01' AND s1.salary <= s2.salary
GROUP BY s1.emp_no
ORDER BY s1.salary DESC, s1.emp_no ASC
```


### 1.15. 七张图入门SQL

![img](http://img.uwayfly.com/article_mike_20200720145805_c34d21fc8057.png)


![img](http://img.uwayfly.com/article_mike_20200720145821_f4936f2f31a6.png)


![img](http://img.uwayfly.com/article_mike_20200720145831_070a792a8142.png)


![img](http://img.uwayfly.com/article_mike_20200720145839_fcbd0a6052e3.png)


![img](http://img.uwayfly.com/article_mike_20200720145849_c8e066a9f4bb.png)



![img](http://img.uwayfly.com/article_mike_20200720145856_7d6bad210af0.png)



![img](http://img.uwayfly.com/article_mike_20200720145905_3f5b705ad8fa.png)


![img](http://img.uwayfly.com/article_mike_20200720180544_cbfa40405d70.png)