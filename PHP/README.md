- [1. 特殊类型：空类型、资源](#1-特殊类型空类型资源)
- [2. 系统常量](#2-系统常量)
- [3. 常量取值](#3-常量取值)
- [4. 错误控制运算符](#4-错误控制运算符)
- [5. 函数](#5-函数)
  - [5.1. 局部变量、全局变量](#51-局部变量全局变量)
  - [5.2. 局部变量=>动态变量与静态变量的区别](#52-局部变量动态变量与静态变量的区别)
  - [5.3. 传值、传引用](#53-传值传引用)
  - [5.4. 可变函数](#54-可变函数)
- [6. PHP中的语言结构详解](#6-php中的语言结构详解)
- [7. 回调函数](#7-回调函数)
  - [7.1. 匿名函数](#71-匿名函数)
- [8. php 字符串](#8-php-字符串)
  - [8.1. 字符串相关类型转换](#81-字符串相关类型转换)
  - [8.2. 自动类型转换](#82-自动类型转换)
  - [8.3. 强制转换](#83-强制转换)
    - [8.3.1. 临时转换](#831-临时转换)
    - [8.3.2. 永久转换](#832-永久转换)
  - [8.4. 时间日期](#84-时间日期)
- [9. 引用变量](#9-引用变量)
- [10. 常量及数据类型](#10-常量及数据类型)
  - [10.1. PHP中字符串可以使用哪三种定义方法以及各自的区别是什么？](#101-php中字符串可以使用哪三种定义方法以及各自的区别是什么)
  - [10.2. 三大数据类型（标量、复合、特殊）](#102-三大数据类型标量复合特殊)
- [11. 并发](#11-并发)
  - [11.1. 防盗链](#111-防盗链)


### 1. 特殊类型：空类型、资源
`NULL`（`NULL`）：NULL是空类型，对大小写不敏感，`NULL`类型只有一个取值，表示一个变量没有值。
1. 当被赋值为`NULL`
2. 或者尚未被赋值
3. 或者被`unset()`

这三种情况下变量被认为为`NULL`。


### 2. 系统常量

系统常量是PHP已经定义好的常量，我们可以直接拿来使用，常见的系统常量有：
1. `__FILE__`: **php程序文件名**。它可以帮助我们获取当前文件在服务器的物理位置。
2. `__LINE__`: **PHP程序文件行数**。它可以告诉我们，当前代码在第几行。
3. `PHP_VERSION`: **当前解析器的版本号**。它可以告诉我们当前PHP解析器的版本号，我们可以提前知道我们的PHP代码是否可被该PHP解析器解析。
4. `PHP_OS`：**执行当前PHP版本的操作系统名称**。它可以告诉我们服务器所用的操作系统名称，我们可以根据该操作系统优化我们的代码




### 3. 常量取值
```php
$area = constant($p)*$r*$r;
```


### 4. 错误控制运算符
PHP中提供了一个错误控制运算符“`@`”，对于一些可能会在运行过程中出错的表达式时，我们不希望出错的时候给客户显示错误信息，这样对用户不友好。于是，可以将@放置在一个PHP表达式之前，该表达式可能产生的任何错误信息都被忽略掉；
如果激活了`track_error`（这个玩意在`php.ini`中设置）特性，表达式所产生的任何错误信息都被存放在变量`$php_errormsg`中，此变量在每次出错时都会被覆盖，所以如果想用它的话必须尽早检查。

需要注意的是：
1. 错误控制前缀“`@`”不会屏蔽解析错误的信息
2. 不能把它放在函数或类的定义之前
3. 也不能用于条件结构例如`if`和`foreach`

```php
$conn = @mysql_connect("localhost","username","password");
```


### 5. 函数
- `mt_rand(m,n)`：取`m,n`之间的随机数（包括两个限值）；
- `strlen()`: 获得字符串的长度；
- `strtolower()`: 字符串字母大写转小写；
- `strtoupper()`: 字符串字母小写转大写。

注意：
1. 函数名称不区分大小写
2. 函数不能重名，不能重载
3. 可以先调用，再定义，因为运行程序时，先将函数载入到内存中。
4. 函数默认返回`NULL`
5. 函数可以返回任意类型，包括资源、类
6. 必选参数必须在可选参数之前



检测函数名称是否存在的函数：
1. `function_exists($funcName)`: 如果存在返回`True`
2. `var_dump(function_exists('test1'));`


#### 5.1. 局部变量、全局变量
1. 局部变量：函数体内声明的变量，分为动态变量、静态变量。
2. 全局变量：函数体外声明的、函数体内通过`global`关键字声明的

#### 5.2. 局部变量=>动态变量与静态变量的区别
1. 动态变量在函数执行完之后立即被释放；
2. 静态变量，由关键字`static`申明，当第一次调用函数的时候相当于初始化静态变量，当函数执行完毕之后静态变量并没有被释放而是保存在静态内存中，当再次调用函数的时候首先静态内存中取出变量的值接着执行！

```php
global $m=4; // 报错

// 应该：
global $m;
$m = 4;
```

#### 5.3. 传值、传引用
1. 传值：就是在函数体内所做的更改不会影响这个变量；
2. 传引用：就是在函数体内所做的更改会直接改变这个变量；
3. 传引用的方式就是在函数的参数前面加一个`&`符号


```php
function test7($t){ // &$t就是传引用了
	$t +=10;
	var_dump($t);
}

$t = 2;

test7($t); // 12

var_dump($t); // 2
```
注意：
- 只有变量才能当做引用被传递，也就是`test7(4)`报错！


#### 5.4. 可变函数	
1. 可变函数：将函数名赋值给字符串类型的变量（等量代换）
2. `get_defined_functions()` - 得到已定义的所有函数
3. 可变函数不能用于`echo`，`print`，`unset()`，`require`以及类似的语言结构，需要自己封装实现。


### 6. PHP中的语言结构详解
1. 什么是语言结构 
     - 语言结构：就是**PHP语言的关键词**，语言语法的一部分；它不可以被用户定义或者添加到语言扩展或者库中；它可以有也可以没有变量和返回值。 
2. 语言结构执行速度快的原因 
    - 函数都要先被PHP解析器（Zend引擎）分解成语言结构，所以，函数比语言结构慢


```php
$funcName = 'md5';
echo $funcName('king');
echo '<br/>';
echo md5('king');

function test8(){
	echo 'ke bian han shu';
}

test8();
echo '<br/>';
$funcName='test8';
$funcName();

print_r(get_defined_functions());
```


### 7. 回调函数

回调函数就是在调用函数的时候将另外一个函数的名称作为参数传递进去，并在函数体内执行；

```php
function test8(){
	echo 'ke bian han shu';
}

function huidiao($funcName){
	echo 'doing'.'<br/>';
	$funcName();
}

huidiao('test8');

function add($a,$b){
	return $a+$b;
}

echo call_user_func_array('add', array(1,2));
echo call_user_func('add', 1,2);
```
#### 7.1. 匿名函数 

1. 没有函数的名的函数，通常是通过回调函数方式来使用；
2. 可以不需要定义，直接的使用时定义结构

```php
$func1 = function(){
	return 'hahaha';
};
echo $func1();// 匿名函数

$func = create_function('', 'echo " heihei";');
$func();

call_user_func(function($username){echo "hello {$username}";},'king');

create_function('参数',"函数体";);注意格式，不能丢了后面的分号
```


### 8. php 字符串
**双引号解析变量，而单引号不解析变量**。所以单引号效率高。

```php
$yang='guo';
echo '$yang';    //$yang
echo "$yang";     // guo
```

当内容和定界符冲突时，使用转义符

```php
$text = 'hello I\' am you father ';
echo $text;
```

双引号能解析所有的转义符，单引号只能解析`\\`和`\’`两个转义符

```php
echo "1\t2\r3\n\$434";
```

花括号拼接变量，不要加空格

```php
echo "我的名字是$text s",'<br>';
echo "我的名字是{$text}s, '<br>";
echo "我的名字是${text}s";
```

花括号当中括号一样使用，增删改查，每次只能改一个字符。

```php
echo $str[mt_rand(0, strlen($str)-1)];  //  随机数
$str='abcdefg';
echo $str{0};
$str[1]='m1'; // 只有m有用
```

`heardoc` `nowdoc`语法结构大致相同，通过`<<<`标识名称开始 然后编写内容 最后标识名称结束 需要注意：顶格写 
不同点：`heardoc`可以解析变量和转义字符，`nowdoc`不可以。

```php
$str = <<<EOF
adfafa'yang'
EOF;  // 行首
echo $str;

nowdoc =>   $str = <<<’EOF’ // 标识符单引号包起来，不能省略。
```

#### 8.1. 字符串相关类型转换

#### 8.2. 自动类型转换
- 数值型->数值本身
- 布尔类型`true->1`
- 布尔类型`false`->空字符串
- `null`->空字符串
- 数组->`array`，并且报一个`notice`的错误
- 资源->`Resource id`，数字
- 对象->不能直接转换成字符串，致命错误

```php
echo true;// 1
echo 'a',false,'b';     //ab
echo 'c',null,'d';    //cd
$arr=array(1,2,3);   // echo 数组报错，不管是不是空数组
echo $arr;
```

#### 8.3. 强制转换
##### 8.3.1. 临时转换
两种格式：
1. `(string) `
2. `strval()`

```php
$var=123;
$res=(string)$var;
```

```php
var_dump(strval($var));
```

注意： 对象不能转换为字符串

##### 8.3.2. 永久转换
1. `settype()`设置永久转换类型
2. `gettype()`得到变量的类型


```php
settype($var,$type);
gettype($str);
```


```php
$var = '1.2';
$var = true;

$res=(string)$var;
$res1 = strval($var);
var_dump($res);

$str = true;
settype($str, 'string');
echo gettype($str);
```

取合法数字，如果不是以合法数字开始，转换为0

```php
echo 1 + '2king';  // 3
echo 1.3 + '3bd';  // 4.3
echo 3 + 'true';  // 3
echo 3 + '2e2'; // 203
```

字符串与布尔：空、`0`、`0.0`、`false`、`null`转换为假，其他为真
```php
$str = 0; // false
$str = 0.0; // false
$str = null; // false
$str = array(); //false
$str = '';  // false
$str = ' '; // true  // 中间有空格
$str = '0';  //false 
$str = '0.0'; // true
$str = 'false'; // true

if($str){
	echo 'true';
}else{
	echo 'false';
}
```

- `trim($str);`去掉两端的空白
- `ltrim($str);`去掉左端的空白
- `rtrim($str);`去掉右端的空白
- `strip_tags（$a,'<a>'）` 过滤其他`html`字符，超链接留下
- `strip_tags（$a）` 过滤变量中`html`字符 
- `strtoupper()`、`strtolower()`， 字符串转换为大写或小写 


字符串查找： 
- `strpos($string,$search)`:返回字符串首次出现的位置，区分大小写 
- `stripos($string,$search)`:忽略大小写去查找

- `strcmp('A','B')`比较两个字符串的大小，区分大小写
- `strcasecmp('a','B')`比较两个字符串的大小，不区分大小写


- `ord()`得到指定字符的ASCII值
- `chr()`根据ASCII值返回指定字符
- `substr($name,2,5)`截取字符串


#### 8.4. 时间日期
时区设置
1. 永久设置

```php
date.timezone ="PRC"
phpinfo();
```


2. 只针对当前脚本
```php
echo date_default_timezone_get();
date_default_timezone_set('PRC');
```

3. 运行时生效
```php
ini_set('date.timezone','Asia/shanghai');
echo ini_get('date.timezone');
```

常见API：

```php
echo date('Y-m-d H:i:s'); // 2019-03-21 18:52:25
echo time();  // 1553166610
echo date('Y-m-d',time()+7*24*3600); // 一周后 // 将时间戳转为日期
echo date('Y-m-d',time()-7*24*3600); // 一周前
echo mktime(0,0,0,8,12,2016); // 将日期转为时间戳 h,i,s,n,j,Y

echo strtotime('now');
echo date('Y-m-d H:i:s', strtotime('+1 days'));
echo date('Y-m-d H:i:s', strtotime('+5 months'));   //2019-08-21 19:24:10
echo date('Y-m-d H:i:s', strtotime('+3 weeks 2 days 3 years 4 months'));  // 2022-08-13 19:24:10
```

计算年龄：
```php
$birth = mktime(0,0,0,6,24,1990);
$time = time();

$age = floor(($time-$birth)/(24*3600*365));
echo $age;
```

1. `microtime` 获得微秒数 计算程序执行时间参数代表以浮点数形式 
2. `getdate` 以数组方式返回当前时间有效信息。 
3. `checkdate` 检查时间合法性

```php
$start = microtime(true);

for($i=0;$i<1000;$i++){
	$arr[]=$i;
}
$end = microtime(true);
echo round($end - $start, 4); // 保留四位小数

print_r (getdate());
print_r(gettimeofday());
var_dump(checkdate(9,12,2302));
```


### 9. 引用变量
概念：
- 在PHP中引用意味着用不同的名字访问同一个变量内容。

定义方式：
- 使用`&`符号

PHP引用变量的原理
- `COW` `copy on write`  对`$a`或者`$b`有修改才会进行`copy`
- 引用就是永远都会指向同一个空间，没有`COW`了


注意：
- `unset`只会取消引用，不会销毁空间。
- `foreach`：数组中最后一个元素的`$value`引用在`foreach`循环之后仍会保留，建议使用`unset()`将其销毁。
  - 在第一次循环的时候，`$val`就被定义成了指向`$data['0']`的一个引用变量，而`foreach`的特殊机制在下次循环的时候保留了这个变量与内存地址


### 10. 常量及数据类型
#### 10.1. PHP中字符串可以使用哪三种定义方法以及各自的区别是什么？
定义方式：单引号、双引号、`heredoc/newdoc`

区别：
单引号：
1. 单引号不能解析变量 
2. 单引号不能解析转义字符，只能解析**单引号和反斜线本身**
3. 变量和变量、变量和字符串、字符串和字符串之间可以用`.`连接
4. 单引号效率高于双引号

双引号：
1. 双引号可以解析变量，变量可以使用特殊字符和`{}`包含
2. 双引号可以解析所有转义字符
3. 也可以使用`.`来连接

 
`Heredoc`类似于双引号
 
`Newdoc`类似于单引号
两者都用来处理大文本。
 
#### 10.2. 三大数据类型（标量、复合、特殊）
1. 标量：浮点、整型、布尔、字符串
2. 复合：数组、对象
3. 特殊：`null` 、`resource`（资源）

浮点类型不能运用到比较运算中(不能用于相等判断)
 
布尔类型`false`的7种情况：
1. `0`，整型0
2. `0.0`，浮点0.0
3. `''`，空字符串
4. `’0’`，0字符串
5. `false`，布尔`false`
6. `array()`，空数组
7. `NULL`


 
超全局数组：
 
1. `$_GLOBALS`包括了后面所有的内容
2. `$_REQUEST`包含了`get`、`post`、`cookie`，尽量少用，安全性偏低
 

常量：
1. 定义：`const` `define`
2. `const` 更快，是语言结构，`define`是函数
3. `define`不能用于类常量的定义，`const`可以。
4. 常量一经定义，不能被修改，不能被删除。


`==`和`===`的区别？
- 和JS一样

`false++`还是`false`
`NULL++`会变成1

### 11. 并发

高并发，通常指并发访问，也就是某个时间点，有多少个访问同时到来。

- `QPS`：`requests per second` **每秒钟请求或查询的数量**，每秒钟响应`http`请求数
- 刷新只能叫一个`PV`，点击其他页面`PV`增加
- `PV`: `Page View`
- `UV`: `Unique Visitor`
- `UV`类似于`IP`


#### 11.1. 防盗链
 
- 盗链是指在自己的页面上展示一些并不在自己服务器上的内容。比如百度图片、音乐。
- 流量大但PV小，可能存在盗链

防盗链：
- `referer`或者签名