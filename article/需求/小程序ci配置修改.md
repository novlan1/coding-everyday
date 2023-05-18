- 是否新增
- 是否仅修改qq小程序

```ts
// 新增
if (!originBranch) {
// 该分支已经有配置了
  if (rainbowConfig.robotMap[branch]) {
    res.send({ r: -1, msg: '该分支已经存在robot配置，如需修改，请在原机器人上配置' });
    return;
  }

  setWxRobot();
  setQQRobot();
} else {
  // 修改

  // 分支相同，说明是仅修改qq配置
  if (originBranch === branch) {
    if (originUseMpQQ === useMpQQ) {
      res.send({ r: -1, msg: '配置相同，无需修改' });
      return;
    }
    setQQRobot();
  } else {
    if (rainbowConfig.robotMap[branch]) {
      res.send({ r: -1, msg: '该分支已经存在robot配置，如需修改，请在原机器人上配置' });
      return;
    }
    setWxRobot();
    setQQRobot();
    delete rainbowConfig.robotMap[originBranch];
    delete rainbowConfig.qqRobotMap[originBranch];
  }
}
```


一个感想是，把逻辑理清了，代码才能写清楚。

