- [1. Sequelize](#1-sequelize)
  - [1.1. 连接池](#11-连接池)
  - [1.2. 常用 API](#12-常用-api)
  - [1.3. Sequelize 实现事务](#13-sequelize-实现事务)
  - [1.4. `allowedMethods`](#14-allowedmethods)
  - [1.5. 注意事项](#15-注意事项)
  - [1.6. 模糊匹配](#16-模糊匹配)
  - [1.7. 排除字段](#17-排除字段)

### 1. Sequelize

使用`wamp`，安装`mysql`简单，并且可以用`phpmyadmin`可视化数据库

在koa中用`sequelize`管理数据库，必须`npm install mysql2`，以及`npm install sequelize`

`sequelize`中事务 `transaction` 须和`where`同级


#### 1.1. 连接池

- 如果池中有空闲连接可用，返回该连接。
- 如果池中连接都已用完，创建一个新连接添加到池中。
- 如果池中连接已达到最大连接数，请求进入等待队列直到有空闲连接可用。

sequelize连接池，默认最小是0，最大是5。

- `idle` 参数是指闲置的连接超过多少毫秒被释放。
- `acquire` 参数是指在建立连接出错的时候，在抛出错误之前，池子会尝试建立连接的最大时间，重新连接成功就不抛出错误，不行才再抛。

#### 1.2. 常用 API
```
// 只选择相应属性
Model.findAll( {
  attributes: [ 'foo', 'bar' ]
} );

// 除开某些属性
Model.findAll( {
  attributes: { exclude: [ 'baz' ] }
} );
```
```js
freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
```
Mysql分组查询，如求三种类别图书的点赞数目
```js
Favor.findAll({
  where: {
    art_id: {
      [Op.in]: ids
    }
   },
   group: ['art_id'],
   attributes: ['art_id', [Sequelize.fn('COUNT','*'), 'count']]
})
```
求数目总和是count，求字段总和如分数用sum，第二个参数是字段名称

#### 1.3. Sequelize 实现事务
```js
return db.transaction(async t => {
  await Favor.create({
    art_id,
    type,
    uid
  }, { transaction: t })
  const art = await Art.getData(art_id, type)
  await art.increment('fav_nums', { by: 1, transaction: t })
})
```

大写的`Favor`是表，小写的`favor`是表里的一条记录

#### 1.4. `allowedMethods`
`.allowedMethods`处理的业务是当所有路由中间件执行完成之后，若`ctx.status`为空或者404的时候，丰富`response`对象的`header`头。

如果只监听了 / 路由的 POST 方法，在浏览器中使用 GET 方法访问路由，koa 会自动设置一些 Header 并返回访问该路由的方法不被允许




#### 1.5. 注意事项
1. 用户`id`不能通过参数传递，非常危险，应该通过`token`
2. 避免循环查询数据库的方法是用`in`，即把查询的字段放到数组里。不可以用for循环，for循环不可控。
3. 越主要的函数就应该越简洁，复杂逻辑要拆分。
4. A文件导入B文件，B文件导入A文件，即循环导入，会导致一个文件为`undefined`，不好排查，一个解决方法是**在函数或类内部导入**
5. Model 中禁止使用构造函数

#### 1.6. 模糊匹配
`%key%`，`mysql`不会使用索引，速度慢，而`key%`会使用索引，即用后面的百分号

#### 1.7. 排除字段
- 对象里面有`toJSON`方法的话，序列化结果就是`toJSON`函数返回的对象，可以用它来过滤字段。
- 在Model的原型链上添加`toJSON`方法，就不用每建立一个模型实例就手动添加`toJSON`方法了。并且添加`exclude`数组，可以简便的排除。
- 有个缺陷是只能用于`findOne`，如果是`findAll`需要在模型实例上，如`Comment.propotype.exclude = [‘id’]`进行排除。