- [1. mongoDB](#1-mongodb)
  - [1.1. mongoDB命令](#11-mongodb命令)
  - [1.2. Mongoose 命令](#12-mongoose-命令)

## 1. mongoDB

### 1.1. mongoDB命令

集合相当于数据表
```js
1. show dbs  // 显示所有数据库

2. use test   // 切换数据库，test是数据库名称

3. show collections   // 显示所有集合

4. db.users.find()  // users是集合名称

5. db.users.drop()   // 删除集合user

6. db     // 查看当前所在数据库

7. db.users.insert({"_id":"520","name":"xiaoming"})      // 创建表。键名称不加引号也能输入，最好加上；单引号双引号最后都会化为双引号。
```


### 1.2. Mongoose 命令

Mongoose 模型提供了 `find`, `findOne`, 和 `findById` 方法用于文档查询。

1. `Model.find`
```js
Model.find(query, fields, options, callback)// fields 和 options 都是可选参数
```
简单查询:
```js
Model.find({ 'csser.com': 5 }, function (err, docs) { // docs 是查询的结果数组 });
```

只查询指定键的结果:
```js
Model.find({}, ['first', 'last'], function (err, docs) { // docs 此时只包含文档的部分键值})
```


2. `Model.findOne`

与 `Model.find` 相同，但只返回单个文档

```js
Model.findOne({ age: 5}, function (err, doc){ // doc 是单个文档});
```


3. `Model.findById`


与 `findOne` 相同，但它接收文档的`_id` 作为参数，返回单个文档。`_id` 可以是字符串或 ObjectId 对象。
```js
Model.findById(obj._id, function (err, doc){ // doc 是单个文档});
```

