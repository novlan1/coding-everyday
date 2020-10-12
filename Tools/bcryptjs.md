## bcryptjs插件

`Bcrypt`是单向`Hash`加密算法，类似`Pbkdf2`算法 不可反向破解生成明文。

比MD5、SHA1等加密算法更难破解。

### Bcrypt是怎么加密的？

`Bcrypt`有四个变量：

1. `saltRounds`: 正数，代表`hash`杂凑次数，数值越高越安全，默认10次。
2. `myPassword`: 明文密码字符串。
3. `salt`: 盐，一个128`bits`随机字符串，22字符
4. `myHash`: 经过明文密码`password`和盐`salt`进行`hash`，个人的理解是默认10次下 ，循环加盐hash10次，得到`myHash`

每次明文字符串`myPassword`过来，就通过10次循环加盐`salt`加密后得到`myHash`, 然后拼接`BCrypt`版本号+`salt`盐+`myHash`等到最终的`bcrypt`密码 ，存入数据库中。

这样同一个密码，每次登录都可以根据自省业务需要生成不同的`myHash`, `myHash`中包含了版本和`salt`，存入数据库。

### 那如果黑客使用彩虹表进行`hash`碰撞呢?
有文章指出`bcrypt`一个密码出来的时间比较长，需要0.3秒，而MD5只需要一微秒（百万分之一秒），一个40秒可以穷举得到明文的MD5，在`bcrypt`需要12年，时间成本太高。

### 那他是如何验证密码的？
在下次校验时，从`myHash`中取出`salt`，`salt`跟`password`进行`hash`；得到的结果跟保存在`DB`中的`hash`进行比对。



生成hash：
```js
function getHash(val) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(val, salt);
  // Store hash in your password DB.
  return hash
},
```

校验密码：
```js
function verifyHash(plainPwd, user) {
  const correct = bcrypt.compareSync(plainPwd, user.password);
  return corrent // true or false
}
```




