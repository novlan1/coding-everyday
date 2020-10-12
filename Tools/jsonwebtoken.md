## jsonwebtoken插件

一个生成`json web token`的工具


```js
const jwt = require("jsonwebtoken");
const secretKey = "secret";
const expiresIn = 60 * 60 * 24 * 1; // 单位为秒

function generateToken() {
  const token = jwt.sign(
    {
      uid: 889898,
      scope: 9,
    },
    secretKey,
    {
      expiresIn,
    }
  );
  return token;
}
```
验证token，需要捕获错误
```js
function verifyToken(token) {
  try {
    var decode = jwt.verify(token, secretKey);
    // { uid: 889898, scope: 9, iat: 1602473422, exp: 1602559822 }
    console.log(decode);
    return true;
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      console.log('token 已过期')
    } else {
      console.log('token 无效')
    }
    return false;
  }
}
```

