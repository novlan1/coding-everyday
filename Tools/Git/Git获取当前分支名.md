`git` 获取当前分支名

```js
const execSync = require("child_process").execSync;
const axios = require("axios");

let toPublishList = ["dev", "master", "qa"];
let branch = execSync("git symbolic-ref --short -q HEAD", {
  encoding: "utf-8",
}).replace(/\n/, "");

if (toPublishList.indexOf(branch) != -1) {
  console.log("当前分支:", branch);
  axios(
    "http://localhost:3200/publish?cmd=publish&env=" +
      branch
  ).then((res) => {
    console.log(res.data);
  });
}

```