## nodemailer插件


NodeJS发送邮件

示例：

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', //QQ邮箱的服务器
  port: 465, //端口号
  secure: true, //465为true,其他为false
  auth: {
    user: '********@qq.com', // 自己的邮箱
    pass: '********', // 授权码,邮箱的授权码
  },
});

/**
 * 注册用户时发送邮箱
 */
const sendRegisterEmail = ({ userId, username, email, verifyKey }) => {
  const url = `${service_host}/register_success?id=${userId}&verify_key=${verifyKey}`;
  const params = {
    from: '导师推荐网<1576271227@qq.com>', // 收件人显示的发件人信息,xxxxxxx换成自己的qq
    to: email, // 目标邮箱号
    subject: '邮箱验证',
    html: `欢迎！${username}<br/><br/>感谢您在 <span style='font-weight: bold;'>导师推荐网</span> 的注册，请点击这里激活您的账号：<br/><a style="color:red" href="${url}">${url}</a><br/>祝您使用愉快，使用过程中您有任何问题请及时联系我们。`,
  };
 
  return sendMsg(params);
};
 
/**
 * 找回密码时发送校验码
 * @param {*} params
 */
const sendVerifyCode = ({ email, verifyCode }) => {
  const params = {
    from: '导师推荐网<1576271227@qq.com>', // 收件人显示的发件人信息,xxxxxxx换成自己的qq
    to: email, // 目标邮箱号
    subject: '找回密码',
    html: `邮箱验证码: ${verifyCode}`,
  };
  return sendMsg(params);
};
 
/**
 * 发送消息
 */
const sendMsg = (params) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(params, (err, data) => {
      transporter.close(); //发送完毕后关闭
      if (err) {
        resolve(err);
      }  else {
        resolve(0);
      }
    });
  });
};
```