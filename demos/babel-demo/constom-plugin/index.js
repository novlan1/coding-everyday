const babel = require("@babel/core");


const result = babel.transform("const result = 1 + 2 + 1 + 1;",{
  plugins:[
    require("./custom_plugin.js")
  ]
});

console.log(result.code); // const result = 5;
