### 发布`npm`包

1. 注册一个`npm`账号
2. 开发一个`npm`包，必须`npm init`
3. `npm adduser`
4. `npm publish`
   
### 项目中应用npm包
``` 
npm install xxxx
```

### 更新`npm`包

如果之后修改过此包，需要修改`package.json`中的版本号字段`version`，使其大于当前版本，然后`npm publish`即可。

如果未更改版本号，会报错。

修改版本号后则成功:

`npm publish`


### 删除`npm`包
```
npm unpublish
npm unpublish --force
```
