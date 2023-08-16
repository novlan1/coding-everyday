# 输入下面命令来测试
# sh article/cheetsheets/test-default.sh



unset test_var
echo 测试 - 符号：如果变量未定义，使用提供的值
echo 未初始化变量处理结果："${test_var-DEFAULT_VALUE}"
echo 变量值："$test_var"
test_var=NEW_VALUE
echo 已初始化便令处理结果："${test_var-DEFAULT_VALUE}"
echo 变量值："$test_var"

echo =====================================

unset test_var
echo 测试 + 符号：如果变量已定义，使用提供的值
echo 未初始化变量处理结果："${test_var+DEFAULT_VALUE}"
echo 变量值："$test_var"
test_var=NEW_VALUE
echo 已初始化便令处理结果："${test_var+DEFAULT_VALUE}"
echo 变量值："$test_var"

echo =====================================

unset test_var
echo 测试 = 符号：如果变量未定义，使用提供的值，同时使用这个值为变量赋值
echo 未初始化变量处理结果："${test_var=DEFAULT_VALUE}"
echo 变量值："$test_var"
test_var=NEW_VALUE
echo 已初始化便令处理结果："${test_var=DEFAULT_VALUE}"
echo 变量值："$test_var"

echo =====================================

unset test_var
echo 测试 ? 符号：变量未定义时，显示问号后面内容作为错误信息
echo 未初始化变量处理结果："${test_var?DEFAULT_VALUE}"
echo 变量值："$test_var"
test_var=NEW_VALUE
echo 已初始化便令处理结果："${test_var?DEFAULT_VALUE}"
echo 变量值："$test_var"
