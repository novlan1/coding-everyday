## 阿里云服务器的Mysql连接不上

1. 登录mysql
```bash
mysql -u xxx -p xxx
```

2. 执行以下命令
```bash
USE mysql;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '数据库的密码' WITH GRANT OPTION;
```

3. 刷新立即生效，否则不起作用
```bash
FLUSH PRIVILEGES;
```
不要忘记在安全组里开端口

