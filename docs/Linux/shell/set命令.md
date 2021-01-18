## set命令

set命令用来修改 Shell 环境的运行参数，也就是可以定制环境。一共有十几个参数可以定制。

如果命令行下不带任何参数，直接运行set，会显示所有的环境变量和 Shell 函数。

### 基本用法

- `set -u`, `set -o nounset`, 遇到未定义的变量会退出
- `set -x`, `set -o xtrace`, 先输出执行的那一行命令
- `set -e`, `set -o errexit`, 脚本只要发生错误，就终止执行
- `set +e`，表示关闭`-e`选项，可用于暂时关闭，让命令失败的时候继续执行

- `set -o pipefail`
  - `set -e`不适用于管道命令, 如`foo | echo a`，即使`foo`未声明，`echo a`也会执行；

  - Bash 会把最后一个子命令的返回值，作为整个命令的返回值。只要最后一个子命令不失败，管道命令总是会执行成功，因此它后面命令依然会执行，`set -e`就失效了
  
  - `set -o pipefail`用来解决这种情况


### 连在一起使用
```bash
# 写法一
set -euxo pipefail

# 写法二
set -eux
set -o pipefail
```

另一种办法是在执行 Bash 脚本的时候，从命令行传入这些参数。

```bash
$ bash -euxo pipefail script.sh
```
