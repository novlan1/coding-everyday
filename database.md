# mongoDB

### mongoDB命令

集合相当于数据表

Ø show dbs  // 显示所有数据库

Ø use test   // 切换数据库，test是数据库名称

Ø show collections   // 显示所有集合

Ø db.users.find()  // users是集合名称

Ø db.users.drop()   // 删除集合user

Ø db     // 查看当前所在数据库

Ø db.users.insert({"_id":"520","name":"xiaoming"})      // 创建表。键名称不加引号也能输入，最好加上；单引号双引号最后都会化为双引号。

 

 

​                                   

​     

 

 

 

### Mongoose命令

Mongoose 模型提供了 find, findOne, 和 findById 方法用于文档查询。

 

\1. Model.find

Model.find(query, fields, options, callback)// fields 和 options 都是可选参数

 

简单查询:

Model.find({ 'csser.com': 5 }, function (err, docs) { // docs 是查询的结果数组 });

 

只查询指定键的结果:

Model.find({}, ['first', 'last'], function (err, docs) { // docs 此时只包含文档的部分键值})

 

\2. Model.findOne

 

与 Model.find 相同，但只返回单个文档

 

Model.findOne({ age: 5}, function (err, doc){ // doc 是单个文档});

 

\3. Model.findById

 

与 findOne 相同，但它接收文档的 _id 作为参数，返回单个文档。_id 可以是字符串或 ObjectId 对象。

Model.findById(obj._id, function (err, doc){ // doc 是单个文档});

 

 

 

 Redis

### Redis运行

1.服务

2.不以服务的方式运行（CMD启动）

 

Ø 进入CMD，进入redis的目录，执行如下命令

Ø redis-server redis.windows.conf，出现下图显示表示启动成功了

 

 

Ø redis-cli，进入redis环境

 

 

 

 

mac使用：

1.下载

\2. make

3.sudo make install

 

或者直接 brew install redis

 

然后就可以redis-server了，因为mac已经把redis-server放到了环境变量里，就不需要用 redis-server redis.conf

 

Ø redis配置文件中的密码： requirepass默认关闭，后面跟的就是它的密码

Ø 登录的时候： auth 密码

 

 

 

### Redis命令

set a 123

get a // 123

 

setex c 10 1 // 设置c的 值为1，10秒后过期

 

keys * // 查看存储的所有key

 

del a // 删除a这个key

 

 

 

### ioredis: nodejs操作redis的库

 

  

# MySQL

## *MySQL*最基本操作

mysql -uroot –p  连接mysql，-u和root之间不加空格也可以

 

show databases;

create database <数据库名>

drop database <数据库名>

use mydatabase;

desc <表名>;     查看指定表结构

 

 

drop table <表名>;    删除表

 

exit 或 quit（回车）   退出MySQL

 

set password for 用户名@localhost = password('新密码');   修改密码

 

## On Delete属性

On Delete属性，可能取值为：No Action, Cascade,Set Null, Restrict属性。

 

当取值为No Action或者Restrict时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除。

 

当取值为Cascade时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则也删除外键在子表（即包含外键的表）中的记录。

 

当取值为Set Null时，则当在父表（即外键的来源表）中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（不过这就要求该外键允许取null）。

 

## On update属性

当取值为No Action或者Restrict时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许更新。

 

当取值为Cascade时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则也更新外键在子表（即包含外键的表）中的记录。

 

当取值为Set Null时，则当在父表（即外键的来源表）中更新对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（不过这就要求该外键允许取null）。

 

## MySQL如何支持emoji表情？

mysql支持emoji表情，只需要将需要的字段由utf8_general_ci变为utf8m64_general_ci即可

原因：UTF-8编码有可能是两个、三个、四个字节。Emoji表情是4个字节，而Mysql的utf8编码最多3个字节，所以数据插不进去。

 

 

 

 