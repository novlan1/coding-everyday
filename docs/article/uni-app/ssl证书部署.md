参考：https://blog.csdn.net/weixin_45012003/article/details/106979238


现在很简单，申请免费证书后，可以自动部署，就是上传`per.key`和`per.pem`到远程服务器上，然后修改`nginx`配置。

填写内容：

- 证书路径：`/etc/nginx/cert/uwayfly.2025.1.pem`
- 私钥路径：`/etc/nginx/cert/uwayfly.2025.1.key`


上传命令：

```bash
server=1.1.1.1
scp -r ./* root@$server:/etc/nginx/cert
```

证书、密钥地址输入：

```
/etc/nginx/cert/uwayfly.com.2025.key
/etc/nginx/cert/uwayfly.com.2025.perm
```

不要忘了修改 `nginx` 配置！

```bash
#请填写绑定证书的域名
server_name cloud.tencent.com; 
#请填写证书文件的相对路径或绝对路径
ssl_certificate cloud.tencent.com_bundle.crt; 
#请填写私钥文件的相对路径或绝对路径
ssl_certificate_key cloud.tencent.com.key; 

# ssl_certificate   cert/uwayfly.2021.pem;
# ssl_certificate_key  cert/uwayfly.2021.key
```

然后重启服务：

```bash
nginx -s reload
```
