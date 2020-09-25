const program = require('commander');
const chalk = require('chalk');
program.version('1.0.1'); // 程序的版本设置

program
    .option('-a, --absolute', 'this is absolute option') // 普通option
    .option('-b, --backend <dir>', 'this is backend option') // option 接收一个必填参数
    .option('-c, --callback <dir>', 'this is callback option', 'prod') // option 接收一个必填参数，如果不传会给一个默认值 prod
    .option('-d, --divide [env]', 'this is divide option') // option 接收一个选填参数
    .option('-e, --eval <num>', 'this is eval option', parseInt) // option 接收一个必填，并添加参数处理函数 parseInt 将字符串转为数字
    .option('-f, --found <num>', 'this is found option', function(num, baseNum) {
        return parseInt(num) + baseNum;
    }, 2) // option 接收一个必填参数，并添加参数处理函数，以及处理函数默认值
    .option('-g, --grace-template', 'this is graceTemplate option') // 连写长命令 取 对应属性值的时候 使用驼峰名取 program.graceTemplate
    .option('--no-happy', 'this is no happy option') // --no-[some] 类型的长命令。取对应的属性值。为no- 之后的名称 即 program.happy 。且当不设置任何参数时，使用该长命令获取的是 false， 不设置则反之为true 
    .option('-i', 'this is a I option') // 只有短命令是 获取对应的属性值 取的是 大写名称，program.I
    .parse(process.argv) 

console.log(program.opts());   
console.log(program.absolute);
console.log(program.backend);
console.log(program.callback);
console.log(program.divide);
console.log(program.eval);
console.log(program.graceTemplate);
console.log(program.happy);
console.log(program.I);
console.log(program.i);
program.on('option:verbose', (kiss) => {
    console.log('option:graceTemplate', kiss);
})

program
    .command('init <templateName> [envs...]') // 创建命令 <> 必填参数 [] 选填参数 ... 可接收多个
    .alias('i') // 命令取别名
    .description('this is a init command') // 命令的描述
    .option('-j, --jade', 'this is a jade option') // 该命令相关的选项配置 
    .action((templateName, envs, cmdObj) => {
        console.log(templateName);
        console.log(envs); // 如果有命令两个参数 第二个参数就是该变量。 如果没有第二个参数 且包含 option 选项配置的时候 第二个参数就是 command 本身
        console.log(cmdObj.opts()); // 如果有两个参数 且包含option  ，第三个参数就是command本身
    });

program
    .arguments('<cmd> [envs...]') // 匹配任意 命令 且, 命令即参数被当作参数传入 action
    .action((cmd, envs) => {
        console.log(cmd); // 命令
        console.log(envs); // 参数 
    }); // 当执行 已经注册的命令时 不会进入 arugments 通配命令中，只会执行对应的命令action
   
// git style command
program
    .command('install <templateName>', 'this is git style command') // 默认查找 当前目录的 相关文件 [当前文件名]-install exec-install.js 并执行
    .command('publish <name>', 'this is git style command', { excutableFile: 'execPublish' }) // 当提供配置选项的时候 会执行 excutableFile 指定的文件  
    // .command('default <name>', 'this is git style command', { isDefault: true }) // 当不传入命令的时候 或没有匹配到任意，命令时 会搜索 exec-defualt.js 并执行,

// 自定义监听已经注册的 option 选项    
program.on('option:eval', (eval) => {
    console.log('option:eval', eval);
})

program.on('option:graceTemplate', (graceTemplate) => {
    console.log('option:graceTemplate', graceTemplate);
})

const gitStyleCommands = [
    'install',
    'publish',
    'default',
]
// 自定义监听命令
program.on('command:*', (cmdObj) => {
    const [cmd, envs, command] = cmdObj;
    console.log(cmd, envs);
    if(gitStyleCommands.indexOf(cmd) === -1) {
        program.outputHelp();
        console.log(`${chalk.red('Unknown command')} ${chalk.yellow(cmd)}.`)
        process.exit(1);
    }
})

// 匹配空执行
if(!process.argv.slice(2).length) {
    program.help();
}

program.parse(process.argv);