- [1. MySQL和SQLite的区别](#1-mysql和sqlite的区别)
  - [1.1. 前言](#11-前言)
  - [1.2. SQLite与MySQL的区别](#12-sqlite与mysql的区别)
    - [1.2.1. 架构差异 – SQLite与MySQL](#121-架构差异--sqlite与mysql)
    - [1.2.2. 数据类型支持 – SQLite与MySQL](#122-数据类型支持--sqlite与mysql)
    - [1.2.3. 存储和可移植性 – SQLite与MySQL](#123-存储和可移植性--sqlite与mysql)
    - [1.2.4. 多种访问和可伸缩性 – SQLite与MySQL](#124-多种访问和可伸缩性--sqlite与mysql)
    - [1.2.5. 安全性和易于安装 – SQLite与MySQL](#125-安全性和易于安装--sqlite与mysql)
    - [1.2.6. 优点和缺点 – SQLite与MySQL](#126-优点和缺点--sqlite与mysql)
  - [1.3. 参考资料](#13-参考资料)

## 1. MySQL和SQLite的区别

### 1.1. 前言
简单来说，**SQLITE功能简约，小型化，追求最大磁盘效率**；**MYSQL功能全面，综合化，追求最大并发效率**。

如果**只是单机上用的，数据量不是很大，需要方便移植或者需要频繁读/写磁盘文件的话，就用SQLite比较合适**；**如果是要满足多用户同时访问，或者是网站访问量比较大是使用MYSQL比较合适**。

下面详细介绍两者的区别和应用： SQLite是非凡的数据库，他可以进程在使用它的应用中。作为一个自包含、基于文件的数据库，SQLite提供了出色的工具集，可以处理所有类型的数据，没有什么限制，而且比起服务器运行的进程型服务器使用起来轻松许多。

一个应用使用SQLite时，它的功能直接被集成在其中，应用会直接访问包含数据的文件(即SQLite数据库),而不是通过一些端口(port, socket)来交互。感谢这种底层技术，这使SQLite变得非常快速和高效，并且十分强大。



### 1.2. SQLite与MySQL的区别

SQLite和MySQL都是开源的RDBMS

#### 1.2.1. 架构差异 – SQLite与MySQL

- SQLite是一个在公共领域中可用的开源项目

- MySQL是一个由Oracle拥有的开源项目

服务器方面

- **SQLite是一个无服务器的数据库，是自包含的。这也称为嵌入式数据库**，这意味着数据库引擎作为应用程序的一部分运行。

- 另一方面，MySQL需要运行服务器，MySQL将需要客户端和服务器架构通过网络进行交互。

#### 1.2.2. 数据类型支持 – SQLite与MySQL

SQLite支持以下数据类型：Blob，Integer，Null，Text，Real。

MySQL支持下面提到的数据类型：

Tinyint, Smallint, Mediumint, Int, Bigint, Double, Float, Real, Decimal, Double precision, Numeric, Timestamp, Date, Datetime, Char, Varchar, Year, Tinytext, Tinyblob, Blob, Text, MediumBlob, MediumText, Enum, Set, Longblob, Longtext.

MySQL在数据类型方面更加灵活。

#### 1.2.3. 存储和可移植性 – SQLite与MySQL

**SQLite库大小约为250 KB，而MySQL服务器大约为600 MB**。SQLite直接将信息存储在单个文件中，使其易于复制。不需要任何配置，并且可以使用最少的支持来完成该过程。

在复制或导出MySQL之前，您需要将其压缩为单个文件。对于较大的数据库，这将是一项耗时的活动。

#### 1.2.4. 多种访问和可伸缩性 – SQLite与MySQL

- **SQLite没有任何特定的用户管理功能，因此不适合多用户访问**。
- **MySQL有一个构造良好的用户管理系统**，可以处理多个用户并授予不同级别的权限。

SQLite适用于较小的数据库，随着数据库的增长，使用SQLite时内存需求也会变大。使用SQLite时，性能优化更加困难。相反，MySQL易于扩展，可以轻松处理更大的数据库。

#### 1.2.5. 安全性和易于安装 – SQLite与MySQL

- SQLite没有内置的身份验证机制，任何人都可以访问数据库文件。
- 但是，MySQL带有许多内置的安全功能。这包括使用用户名，密码和SSH进行身份验证。

SQLite不需要太多配置，易于设置。与SQLite相比，MySQL需要更多配置。

#### 1.2.6. 优点和缺点 – SQLite与MySQL



SQLite的优点：

- 基于文件，易于设置和使用
- 适合基础开发和测试
- 轻松携带
- 使用标准SQL语法进行微小更改
- 使用方便

SQLite的缺点：

- 缺乏用户管理和安全功能
- 不容易扩展
- 不适合大数据库
- 无法定制

MySQL的优点：

- 使用方便
- 提供了许多与数据库相关的功能
- 良好的安全功能
- 易于扩展，适用于大型数据库
- 提供良好的速度和性能
- 提供良好的用户管理和多种访问控制



MySQL的缺点：

- 需要一些技术专业知识来设置
- 与传统SQL相比，语法略有不同



### 1.3. 参考资料

https://www.simcf.cc/8814.html
