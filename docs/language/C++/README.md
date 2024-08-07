- [1. C++基础](#1-c基础)
  - [1.1. C++中的数据类型：](#11-c中的数据类型)
  - [1.2. c++ 较c 新添加了几个特性](#12-c-较c-新添加了几个特性)
    - [1.2.1. 判断是否为真:](#121-判断是否为真)
    - [1.2.2. 初始化方法：](#122-初始化方法)
    - [1.2.3. 随用随定义：](#123-随用随定义)
  - [1.3. C++的输入输出方式](#13-c的输入输出方式)
    - [1.3.1. I/O方式](#131-io方式)
    - [1.3.2. cout语法形式](#132-cout语法形式)
- [2. 命名空间](#2-命名空间)
- [3. VScode 编辑 C++](#3-vscode-编辑-c)
- [4. 函数里面定义数组为什么要加`*`](#4-函数里面定义数组为什么要加)
  - [4.1. 指针和引用的区别](#41-指针和引用的区别)
- [5. 函数特性](#5-函数特性)
- [6. 内存管理](#6-内存管理)
  - [6.1. 堆和栈](#61-堆和栈)
- [7. 类和对象](#7-类和对象)
  - [7.1. 字符串类型`string`](#71-字符串类型string)
- [8. 数据封装](#8-数据封装)
  - [8.1. 类外定义](#81-类外定义)
  - [8.2. 构造函数](#82-构造函数)
  - [8.3. 内存分区](#83-内存分区)
- [9. 初始化列表](#9-初始化列表)
  - [9.1. 拷贝构造函数](#91-拷贝构造函数)
  - [9.2. 析构函数](#92-析构函数)
  - [9.3. 对象数组](#93-对象数组)
  - [9.4. 对象成员](#94-对象成员)
  - [9.5. 深拷贝浅拷贝](#95-深拷贝浅拷贝)
- [10. 对象指针](#10-对象指针)
- [11. 对象指针](#11-对象指针)
  - [11.1. 对象成员指针](#111-对象成员指针)
  - [11.2. `this` 指针](#112-this-指针)
- [12. 常对象指针与常对象引用](#12-常对象指针与常对象引用)
- [13. 继承](#13-继承)
- [14. 隐藏](#14-隐藏)
- [15. 头文件双引号和尖括号的区别](#15-头文件双引号和尖括号的区别)
- [16. `isA`](#16-isa)
- [17. 多重继承与多继承](#17-多重继承与多继承)
- [18. 虚继承](#18-虚继承)
- [19. 虚函数](#19-虚函数)
- [20. 虚析构函数](#20-虚析构函数)
- [21. 虚函数与虚析构函数原理](#21-虚函数与虚析构函数原理)
- [22. 纯虚函数抽象类](#22-纯虚函数抽象类)
- [23. 接口类](#23-接口类)
- [24. `RTTI`](#24-rtti)
- [25. 异常处理](#25-异常处理)
- [26. 友元函数和友元类](#26-友元函数和友元类)
- [27. static](#27-static)
- [28. 运算符重载](#28-运算符重载)
  - [28.1. 一元运算符重载](#281-一元运算符重载)
  - [28.2. 二元运算符重载](#282-二元运算符重载)
- [29. 函数模板](#29-函数模板)
- [30. 类模板](#30-类模板)
- [31. 标准模板库](#31-标准模板库)


### 1. C++基础
- c语言是`c＋+`语言的子集
- c 语言是从c基础上发展而来的 
- c++是高级计算机语言 
- c语言面向过程，`c＋＋`语言支持面向过程＋支持面向对象
- c语言运行更高效（越底层的东西越高效）




#### 1.1. C++中的数据类型：
- 基本类型{整型，字符型，实型（`float/double`）}；
- 构造类型{数组类型，结构类型（`struct`），联合类型（`union`），枚举类型（`enum`）}；
- 指针类型；
- 空类型（`void`）；


#### 1.2. c++ 较c 新添加了几个特性
1. 新的数控类型，`bool`
2. 新的赋值方法，直接赋值，例如 `int x（1024）`;
3. 变量定义更加随便，随用随定义


##### 1.2.1. 判断是否为真:
1. C判断是否为真，用`if(flag==1)`
2. C++判断是否为真，直接用`if(flag)`，简洁


##### 1.2.2. 初始化方法：
1. C语言初始化方法：` int x = 1024`
2. C++提供两种初始化方法：赋值初始化 `int x = 1024`，直接初始化 `int x (1024)`


##### 1.2.3. 随用随定义：
C语言：

```c
int v1 =3
int v2 = 4

v1 = v1 + 2
v2 = v2 + v1
```

c++：

```c++
int v1 =3
v1 = v1 + 2

int v2 = 4
v2 = v2 + v1
```

#### 1.3. C++的输入输出方式

##### 1.3.1. I/O方式

1. C语言的I/O方式：`scanf`，`printf`
2. C++语言的I/O方式：`cin`，`cout`

##### 1.3.2. cout语法形式

```c++
cout<<X<<endl;（endl相当于C中的“\n”）
cout<<"x+y="<<x+y<<endl;
```

#####cin的语法形式
```c++
cin>>x;
cin>>x>>y;
```
#####C++相比C：
- 不用关注占位符（如`%d`、`%c`）
- 不用关注数据类型
- 不易出现问题


1. `otc`，`dec`。`hex`  分别对应8, 10，16进制
2. `boolalpha` 输出布尔值


### 2. 命名空间

空间名不能重复
```c
namespace A
```
「变量、函数定义」

使用：
- 变量 `cout << A::x << endl;`
- 函数 `A::f1()`
- 或者`using namespace std`

### 3. VScode 编辑 C++
VScode中如果程序里有`scanf()`等请求键盘输入数据的函数，此时无法从键盘输入数据，并且程序无法结束需要关闭重启vscode才能重新执行

- 解决办法是依次打开：文件>首选项>设置>用户设置>拓展>`Run Code Configuration`
- 找到  `Run In Terminal`  打上勾 这样运行的程序就会运行在vscode的集成控制台上
- 在工作区设置也有这个选项，但工作区设置只会对工作区生效


### 4. 函数里面定义数组为什么要加`*`
定义函数时候，形式参数是数组时候，加`*`是把数组的值由实际参数传给形式参数，不加`*`是把数组的地址由实际参数传给形式参数。


- `system(“pause”);`使用到的话需要加头文件`#include"stdio.h"`
- `cin`, `cout`要想正常使用的话需要加头文件`#include"iostream"`和命名空间`using namespace std;`


引用
- 引用就是指变量的一个别名（不能只有别名） 
- 引用必须初始化。


- `&`符号就是取地址符号, 含义只这么一个; 
- `*`符号就是创建一个指针, 或者做一次地址跳转;


在任何编程语言中, 其实一个变量都代表了一个内存上的地址.
- `int a = 10`, 给a分配一个内存逻辑地址`0x1001ff`, 这个地址存放了值`10`;
- `int &b = a`, 给b分配和a一样的逻辑地址`0x1001ff`. 因此`b`就是`a`的别名;


好了, 最难的来了. 
- `int a = 10;`   // 给`a`分配一个内存逻辑地址`0x100001`, 这个地址存放了值10;
- `int *p = &a;`  // 创建变量`p`, 给`p`分配地址`0x100002`, 这个地址存放的值是"`0x100001`"(`a`的逻辑地址值);
- `int *&q = p;`  // 创建变量`q`, 给`q`分配地址也是`0x100002`, 因此这个地址存放的值还是`a`的逻辑地址值;
- `*q = 20;`  // 访问存放在`q`变量地址下的值, 获得了`a`的地址值, 再访问一下`a`的地址值, 修改上面的内容为`20`;



指针：指针是一个变量，只不过这个变量存储的是一个地址，指向内存的一个存储单元；而引用跟原来的变量实质上是同一个东西，只不过是原变量的一个别名而已。




#### 4.1. 指针和引用的区别
- 首先，引用不可以为空，但指针可以为空。使用指针之前必须做判空操作，而引用就不必。
- 引用不可以改变指向，对一个对象"至死不渝"；但是指针可以改变指向，而指向其它对象。说明：虽然引用不可以改变指向，但是可以改变初始化对象的内容。
- 引用的大小是所指向的变量的大小，因为引用只是一个别名而已；指针是指针本身的大小，4个字节。

总之，它们的这些差别都可以归结为"指针指向一块内存，它的内容是所指内存的地址；而引用则是某块内存的别名，引用不改变指向。"


交换两个数：
```c++
void fun(int &a, int &b) 
{
  int c = 0;
  c = a;
  a = b;
  b = c;
}
```

`const`(控制变量是否可以变化)
```c
const int x=3;（则此时x为常量，不可进行再赋值）
```

`const`与指针类型
```c
const int *p=NULL;
int const *p=NULL;（两种写法完全等价，const都在*的左边）
```

```c
const int *const p=NULL;
int const *const p=NULL;(这两种写法也是完全等价的)
```
```c
int x=3； const int *p=&x； *p=4（错误，因为const指定的为*p，指针指向的数据为常量，指针本身不是）；
p=&y；（正确）
int x=3;  const int *const p=&x;  p=&y（错误，因为const指向的为p，只能为x的地址）
```
const与引用
```c
int x=3；const int &y=x； y=10（错误，y通过const限定只能为x的别名，值为3）
```


总结：
- `const int x=3；int *y=&x；`（这种写法是错误的因为`x`本身定义为`const`，在用一个可变的指针指向，那么就有用指针改变`x`值的风险，这是系统所不允许的）；
- `int x=3； const int *y=&x；`（正确，这样保证了指针对`x`只有可读性，而没有可写性）
- 大不可以包含小，小可以包含大，安全。



常量指针常量

- 常量指针常量：指向常量的指针常量，可以定义一个指向常量的指针常量，它必须在定义时初始化。常量指针常量定义`"const int* const pointer=&c"`告诉编译器，`pointer`和`*pointer`都是常量，他们都不能作为左值进行操作。
- 而就不存在所谓的"常量引用常量"，因为跟上面讲的一样引用变量就是引用常量。C++不区分变量的`const`引用和`const`变量的引用。程序决不能给引用本身重新赋值，使他指向另一个变量，因此引用总是`const`的。如果对引用应用关键字`const`，起作用就是使其目标称为`const`变量。即没有：`const double const & a=1；`只有`const double &a=1；`
- 总结：有一个规则可以很好的区分`const`是修饰指针，还是修饰指针指向的数据——画一条垂直线穿过指针声明的星号（`*`），如果`const`出现在线的左边，指针指向的数据为常量；如果`const`出现在右边，指针本身为常量。而引用本身与天俱来就是常量，即不可以改变指向。（`int const *…`和`const int *…`等价）




### 5. 函数特性

一、函数参数默认值
1. 有默认值参数值的参数必须在参数表的最右端 
2. 函数定义不写默认值，声明可写默认值（上面写默认值，下面不写）
3. 无实参则用默认值，否则实参覆盖默认值
4. 函数重载必须在同一个作用域内

二、函数重载
1. 定义：在相同作用域内 用同一函数名定义的多个函数 参数个数和参数类型不同
2. 思考：编译器如何识别重载的函数 (`getMax_int_int`和`getMax_double_double`)

三、内联函数
1. 关键字：`inline`，
2. 编译时将函数体代码和实参 代替 函数调用语句
3.
- 内联编译是建议性的，由编译器决定 
- 逻辑简单，调用频繁的函数建议使用内联 
- 递归函数 无法使用内联方式


总结
- 函数参数默认值 实参覆盖默认值。 
- 函数重载 名称相同 参数可辨。 
- 内联函数 效率高，由编译器决定是否使用


普通函数调用：调用->找到入口->执行调用->返回入口->调用结束
内联函数：省去了找到入口和返回入口的过程，省去函数调用的过程





### 6. 内存管理

1.申请内存：`int *p = new int;` 或者 `new int(20)` 圆括号表示赋值
  释放内存：`delete p; p=NULL`
2.申请块内存：`int *arr=new int[10];` 方括号表示申请块内存，也就是数据个数。使用：`p[0] = 10`
   释放:`delete []arr; arr = NULL`
3.申请内存需要判断是否成功，`if (p==NULL)` { //处理 }
释放内存需要设空指针, `p=NULL`
4.`new`与`delete`配套使用（不能与C语言的`malloc`和`free`混搭）


#### 6.1. 堆和栈
1. 栈：是由编译器在需要时自动分配，不需要时自动清除的变量存储区。通常存放局部变量、函数参数等。
2. 堆：是由`new`分配的内存块，由程序员释放（编译器不管），一般一个`new`与一个`delete`对应，一个`new[]`与一个`delete[]`对应。如果程序员没有释放掉，资源将由操作系统在程序结束后自动回收


### 7. 类和对象
类的限定符有三个：`private`,`protected`,`public`

class声明后面一生要加分号;

- 从栈中实例化 `Coordinate coor; coor.x=10; coor.y=20;` （取成员变量和方法都是用`.`方式）
- 栈中实例化之后内存自动清除。


1. 从堆中实例化 `Coordinate *p=new Coordinate();  p->x=100; p->y=200;`
1. `p->printX();p->printY()` （取成员变量和方法都是用`->`方式）
1. 堆中实例化不一定成功，所以需要判断一下：`if(p==NULL){ return 0;}`
1. 堆中实例化之后需要清除内存，即：`delete p；p=NULL;`



#### 7.1. 字符串类型`string`
字符串的操作繁琐，可以使用字符串类型：`string`(使用之前要引入`#include<string>`)
如：
```c
string name="zhang";
string hobby("football");
cout<<name<<hobby<<endl;
```

```c
string s1; // s1为空串
string s2（“ABC”）;// s2的初始值为ABC
string s3（s2）; // 将s2的字符赋给s3；
string s4（n，‘c’）; // s4赋n个c
```
常用API有`str.empty()`, `str.size()`, `s1+s2`,`s1==’A’`


`etline()`的原型是`istream& getline ( istream &is , string &str , char delim );`
- 其中 `istream &is` 表示一个输入流，譬如`cin`；
- `string&str`表示把从输入流读入的字符串存放在这个字符串中（可以自己随便命名，str什么的都可以）；
- `char delim`表示遇到这个字符停止读入，在不设置的情况下系统默认该字符为'\n'，也就是回车换行符（遇到回车停止读入）。

给大家举个例子：

```c
string line;
cout<<"please cin a line:"
getline（cin,line,'#');
cout<<endl<<"The line you give is:"line;
```

那么当我输入"`You are the #best!`" 的时候，输入流实际上只读入了"`You are the `"，`#`后面的并没有存放到`line`中（应该是在缓冲区里吧）。然后程序运行结果应该是这样的：
```c
 please cin a line:You are the #best!
 The line you give is:You are the 
```
而且这里把终止符设为`#`，你输入的时候就算输入几个回车换行也没关系，输入流照样会读入，譬如：
```c
please cin a line:You are the best!
// 这里输入了一个回车换行
Thank you!
#   // 终止读入
The line you give is:You are the best！
// 换行照样读入并且输出
Thank you!
```
以上就是`getline()`函数一个小小的实例了。





### 8. 数据封装
面向对象的基本思想：以谁做什么来表达程序的逻辑，以对象为中心，对象的所有行为都通过调用自己的函数来完成。体现在代码层面就是数据成员调用自己的函数以及通过函数来对自己进行操作.

封装的好处：
1. 可以在成员函数中做一些必要的限制
2. 有时候确实不允许用户改变数据成员

对数据的封装一般用`set`来对函数赋值 `get`函数用来读取数据成员




1. 类的写法一般是`public`写在前面，`private`写在后面
2. 建议定义私有成员时命名为 `m_`数据类型+成员名
    - 如：`string m_strName` 以便区分数据成员，知道数据成员是定义在类里面的
    - 形参是`_`+成员名，如：`void getName(string _name)`
3. 只读：初始化，只有`get`函数，不设置`set`函数。




#### 8.1. 类外定义

- 内联函数：`inline`，一般使用于函数逻辑简单
- 类内定义：是指将成员函数的定义放在`class`类内部的定义（`class`大括号内部）
- 两者的联系：类内定义会将简单的成员函数当做内联函数来用，但是不会出现`inline`关键字
- 类外定义：分为`同文件类外定义`和`分文件类外定义`。



类内定义的成员函数，编译器会将其优先编译为内联函数。对于复杂的成员函数，则编译为普通的函数。

类外定义的成员函数的格式： `返回类型 类名::函数名(参数列表)` ，如`Teacher::getName(string _name)`

分文件类外定义：
- 定义一个类名`.h`的头文件，用来保存类的定义；
- 定义一个类名`.cpp`的文件，用来保存类中成员函数的定义，定义之前要加上`#include "类名.h"`



#### 8.2. 构造函数
构造函数的规则和特点：
1. 构造函数在对象实例化时被自动调用（有且仅有一次）；
2. 构造函数与类同名；
3. 构造函数没有返回值（连 `void` 都不用写）；
4. 构造函数可以有多个重载形式（遵循重载规则，参数个数、类型、调用顺序不同等）；
5. 即使有多个构造函数，实例化对象时仅用到一个构造函数；
6. 用户没有定义构造函数时，编译器自动生成一个构造函数，如果用户定义了构造函数，则系统不会生成默认的构造函数。



#### 8.3. 内存分区
- 栈区：定义变量。内存由系统进行控制，释放和分配
- 堆区：关键字`new`，需要程序员自己管理释放
- 全局区：全局变量和静态变量
- 常量区：字符串和常量
- 代码区 ：存储逻辑代码的二进制


### 9. 初始化列表

默认构造函数，就是初始化的时候不用传参，如`Teacher t;` 其构造函数可能是`Teacher(){};` 也可能是`Teacher(string _name=”xiao”);`即有所有参数都有默认值


初始化列表格式：
- 格式是在构造函数后面加：加数据成员名字（赋值），注赋值只能用`（）`，不能用等号

初始化列表的特性：
- 初始化列表先于构造函数执行
- 初始化列表只能用于构造函数
- 初始化列表可以同时初始化多个数据成员


初始化列表的必要性：
- 如`const`类型成员，在构造函数中不能赋值，只能通过初始化列表。



#### 9.1. 拷贝构造函数


定义格式：`类名（const 类名&变量名）`，变量名可写可不写。
```c
class Student
{
    public:
        Student(){m_strName = "Jim";}
        Student(const Student &stu){}  // 拷贝构造函数在名称上一样，但是在参数设计上却不同，const +引用
    private:
        string m_strName;
}
```
- 如果没有自定义的拷贝构造函数，则系统自动生成一个默认的拷贝构造函数
- 当采用直接初始化或复制初始化实例化对象时，系统自动调用拷贝构造函数，即`Teacher t3 = t2; Teacher t4(t1)`
- 作为参数的实例也会调用一次拷贝构造函数
- 拷贝构造函数的参数是确定的，不能重载

#### 9.2. 析构函数


构造函数：
1. 出生；
2. 析构函数：死亡

对象的生命历程 
1. 申请内存
2. 初始化列表
3. 构造函数
4. 参与运算
5. 析构函数
6. 释放内存


析构函数 (  在对象销毁时，自动调用，归还系统资源   定义格式：`~类名（）`  )
- 如果没有自定义，系统自动生成
- 析构函数在对象销毁时自动调用
- 析构函数没有返回值、没有参数也不能重载

#### 9.3. 对象数组


栈中实例化一个对象数组：如`Coordinate coord[3]；`
堆中 `Coordinate *p=new Coordinate[3]；`



1. `p[0]`指向第一个元素；执行`p++`之后`p[0]`指向第2个了！！！
2. 释放内存时要注意指针 `p` 指回原来的位置。用`delete`释放数组内存时要注意此时的指针`*p`要指到该数组的第一个元素上。保证申请和释放的是同一段内存
3. 不论堆栈，新建一个长度为3的对象数组，销毁时，构造函数和析构函数会执行三次。
4. 销毁指针，释放对象数组的内存，用`delete []p`，因为如果用`delete p`的话，析构函数只会执行一次，会造成内存泄漏


#### 9.4. 对象成员

对象成员：一个对象中包含其他对象
如：
```c
class Line{
    public：
      Line（）；
    private：
      Coordinate m_coorA;
      Coordinate m_coorB;
}
```

当实例化这样一个对象时，会先实例化`m_coorA`，再实例化`m_coorB`，最后实例化`Line`
对象消亡时，会先销毁`Line`，再`m_coorB`,最后`m_coorA`
类比：生产汽车时，先生产好各种零件，然后组装；销毁汽车时，先拆开，再销毁各个零件。


对象成员需要外层对象传参进行构造时必须采用**初始化列表**的方式



如果坐标类有一个默认构造函数（不带参数），那么它就可以在实例化对象的时候不使用初始化列表，如果坐标类必须有参数传入，那么在实例化线段类的时候就必须要使用初始化列表的方式将相应的值传递给坐标类


原因：
因为初始化列表会比构造函数先执行，再因为`Coordinate`是`Line`的对象成员，会优先于`Line`执行构造函数，所以如果不把`Coordinate`的那两个对象放在初始化列表中进行初始化，将会导致`Coordinnate`的对象使用默认构造函数进行初始化，然后你又没有写默认的构造函数，所以会报错，不过如果你写了默认构造函数，会导致多出来两个对象



默认构造函数：无参构造函数，有参构造函数并且所有参数均进行默认这样的两种函数叫做默认构造函数。（切记，如果函数的参数没有全部进行默认则不叫默认构造函数。）
对象成员如果没有默认构造函数那么外部对象必须对对象成员进行初始化！



#### 9.5. 深拷贝浅拷贝

浅拷贝：
- 将对象内容简单拷贝，指针成员指向同一地址

深拷贝：
- 在堆中开辟一块新的地址，将原地址中的内容拷贝进去


- 如果数据成员里面不包含指针的话用浅拷贝即可
- 如果数据成员里面包含指针的话，那就需要用到深拷贝，即为该指针在堆上开辟一块内存，并且将另外一个对象的数据全部赋给这个对象的数据成员




深拷贝的拷贝构造函数：
```c
m_iCount = arr.m_iCount;
m_pArr =new int[m_iCount];

for(int i=0;i<m_iCount;i++)
{
	m_pArr[i] = arr.m_pArr[i];
}
```

浅拷贝的拷贝构造函数：
```c
m_iCount = arr.m_iCount;
m_pArr = arr.m_pArr;
```
其构造函数为：
```c
m_iCount = count;
m_pArr=new int[m_iCount];
```



### 10. 对象指针
### 11. 对象指针
1. 对象指针：`类名 * 指针名`  = `new 类名`

2. C语言的`malloc`与C++的`new`都具有申请新内存空间的作用，但是`new`会调用对象的构造函数，而`malloc`不会调用

3. C++在`new`时的初始化的规律可能为：对于有构造函数的类，不论有没有括号，都用构造函数进行初始化；如果没有构造函数，则不加括号的`new`只分配内存空间，不进行内存的初始化，而加了括号的`new`会在分配内存的同时初始化为`0`。



第一种(堆中实例化)：
```c
Coordinate *p1 = NULL; // 第一个点，指向NULL
p1 = new Coordinate; // 因为Coordinate是一个默认构造函数所以可以没有参数
Coordinate *p2 = new Coordinate();
p1->m_iX = 10; // 两种不同的赋值方法
p1->m_iY = 20;
(*p2).m_iX = 30;
(*p2).m_iY = 40;
delete p1;
p1 = NULL;
```

第二种（栈中实例化，p2指向p1）：
```c
Coordinate p1; // 从栈中实例化一个对象
Coordinate *p2 = &p1; // 让p2指向p1，运用了取地址的符号
// 然后就可以用p2来操作p1的数据成员和成员函数了
p2->m_iX = 10;
p2->m_iY = 20;
cout << p1.m_iX << endl; // 10
cout << p1.m_iY << endl; // 20
```


#### 11.1. 对象成员指针

- 对象成员：一个对象作为另外一个类的数据成员（类名 * 对象名）
- 对象成员指针：一个对象的指针作为另外一个类的数据成员（类名 *指针名）

1. 对象成员指针的定义： `类名 * 指针名` 是指针而不是对象
2. 指针在32位编译器下占4个基本内存单元
3. 若存在对象成员指针1，2……`sizeof（指针1，指针2……）`只计算各指针所占内存的总和，不计算对象成员所占内存
4. 对象成员指针如果在构造函数用 `new` 的方式从堆中申请内存实例化2个 `Coordinate` 对象，那这2个对象都是在堆中，而不在 `Line` 对象中，因为每个指针占 4 个内存单元，因此 `sizeof（Line）` 只占 `8` 个内存单元，销毁 `Line` 的时候，先销毁队中的内存，在释放 `Line` 本身的内存


初始化方式：
1. `Line::Line():m_pCoorA(NULL), m_pCoorB(NULL){}`

2. 
```c
Line::Line(){
	m_pCoorA = NULL;
	m_pCoorB = NULL;
}
```
3. 
  
```c
Line::Line(){
	m_pCoorA = new Coordinate(1, 3);
	m_pCoorB = new Coordinate(5, 6);
}
Line::~Line() {
  delete m_pCoorA;
  m_pCoorA = NULL;
  delete m_pCoorB;
  m_pCoorB = NULL;
}
```
#### 11.2. `this` 指针


- `this` 表示对象的地址，可以访问到自身对象的数据成员
- `this` 代表当前自身的对象，谁调用 `Array` 构造对象，然后 `This` 就代表那个对象取代那个对象，也就是  `Array arr1；`
- `Array arr1；arr1.setLen（5）`的时候，`{this -> len = len}`  中 `this` 就是代表了 `arr1` 对象，会取代 `this` ，而 `this` 其实是对象的地址，也就是指针，`{this -> len = len}` 就代表是 `{ arr1.len = len; }`,从而标记区别了数据成员和参数。
- 编译时编译器自动为每个成员函数的参数列表都添加一个`this` 指针




`this`的值是对象本身地址；`*this` 就是对象`arr1`
1. `Array ... return *this `
    - 相当于： `Array arrX = arr1;` `arrX`是一个新的对象。即返回的`this`指针为另一个临时对象
2. `Array& ... return *this `
    - 相当于： `Array & arrX = arr1;` 此时`arrX`是`arr1`的别名。
3. `Array* ... return this`
    - 相当于： `Array* arrX = this;` 此时`arrX`的值是地址，且是指向`arr1`的。用`->`访问或者`*p.` 访问



注意：
1. `this`指针无需用户定义，是编译器自动产生的。
2. 同一个类的两个对象的`this`指针指向不同位置的内存：对象各自的`this`指针指向各自对象的首地址，所以不同对象的`this`指针一定指向不同的内存地址
3. 当成员函数的参数或临时变量与数据成员同名时，可以使用`this`指针区分同名的数据成员。
4. `this`指针也是指针类型，所以在32位编译器下也占用4个基本的内存单元，即`sizeof(this) `的结果为4。


### 12. 常对象指针与常对象引用

1. `Coordinate * const pCoor = &coor1`: 指针是常量，这种方式定义的常指针“只能指向`coor1`，但可以调用`coor1`的不同的函数”；（拥有读写权限）
2. `const Coordinate *pCoor = &coor1`: 对象是常量，只能调用`coor1`的“常成员函数”。（只拥有读权限）



常指针和常引用都只能调用对象的常成员函数。

```c
const Coordinate coor(3, 5);
// 创建常指针p
const Coordinate *p = &coor;
// 创建常引用c
const Coordinate &c = coor;
```


### 13. 继承

实例化子类时，会先调用父类的构造函数，再调用子类自己的构造函数。
析构时，先调用自己析构的函数，再调用父类的析构函数。


`public`继承：
- 基类的`public`成员被继承到派生类的`public`位置，
- 基类的`protected`成员被继承到派生类的`protected`位置，
- 基类的`private`成员被继承到派生类的`private`的“不可见位置”，所以派生类的成员函数是不能访问这些`private`的成员的


```c
// 堆中实例化对象：
Worker *p = new Worker();
// 栈中实例化对象：
Worker worker;
```

- 类中成员函数可访问`protected`和`private`成员。
- 类的对象不能访问`protected`和`private`成员。
- 公有继承的派生类的成员函数可访问基类中的`protected`成员，不可访问基类中的`private`成员。



继承的几种方式
- 公有继承 `class A: public B`
- 保护继承：`class A: protected B`
- 私有继承： `class A: private B`

注意：

- 通过`public`继承的都是被继承为派生类中所对应的访问属性（`private`例外），
  - 如：基类`public`通过`public`继承为派生类中`public`；
  - 基类`protected`通过`public`继承为派生类中`protected`
  - 基类`private`通过`public`继承为无法访问。

- 通过`protected`继承的都是被继承为派生类中的`protected`访问属性（`private`例外），
  - 如：基类`public`通过通过`protected`继承为派生类中`protected`；
  - 基类`protected`通过`protected`继承为派生类中`protected`；
  - 基类`private`通过`protected`继承为无法访问。

- 通过`private`继承的都是被继承为派生类中的`private`访问属性（`private`例外），
  - 如：基类`public`通过通过`private`继承为派生类中`private`;
  - 基类`protected`通过`private`继承为派生类中`private`；
  - 基类`private`通过`private`继承为无法访问。


![继承](/imgs/c_plus_extend_public.png)
![继承](/imgs/c_plus_extend_protected.png)
![继承](/imgs/c_plus_extend_private.png)


私有继承后父类对象的`public`和`protected`成员被继承到子类的`private`下，类似于在子类中定义了一个父类的私有对象成员。这两种方式都被称为`has-a`。

### 14. 隐藏
父子关系，成员同名，隐藏

A类有`void ABC（）`，B类也有`void ABC（）`，B类公有继承A类，基类中的`ABC（）`成员函数就会被B类中的`ABC（）`成员函数隐藏，隐藏的特性体现在：当实例化B的对象的时候，使用该对象只能够直接的访问到子类B中的`ABC（）`成员函数，而无法访问父类中的`ABC（）`成员函数 从语法的角度来说，同名的数据成员也具有隐藏的特征
对象调用同名的成员函数：直接`soldier.play()；`调用的是自己的成员函数，如果要调用父类的成员函数，则需要加上父类的类名，`soldier.Person::play()`


子类和父类的重名函数无法形成重载，只能进行隐藏，必须加上`父类::调用`

### 15. 头文件双引号和尖括号的区别
`include`包含头文件时注意双引号`“”`和尖括号`<>`是不同的，编译器会搜索不同的路径
- 尖括号`<>`是引用C++自身文件库里的头文件，如`<iostream>`
- 双引号`“”`则是引用用户自己编写的头文件，如`“Person.h”`



### 16. `isA`


派生类的对象可以赋值给基类，而基类的对象不能赋值给派生类
```c++
Soldier s1;
Person p1 = s1;
Person *p2 = &s1; // 这三行是正确的
 
s1 = p1;
Soldier *s2 = &p1; // 这两行是错误的
```
对于作为函数参数时：

```c++
void fun(Person *p){...}
int main(){
    Person p1;
    Soldier s1;
    fun(&p1);
    fun(&s1); // 这两种都是正确的
}
```

用子类对象初始化父类对象时，从父类中继承下来的属性会被初始化，而子类中特有的属性则会被截断（不会赋值给父类）

父类的指针指向子类对象的时候  只能访问子类中父类原有的成员，而无法访问子类中独有的数据成员和成员函数



```c++
Person *p=new Soldier; // 用父类Person的指针指向堆中分配的子类Soldier的对象
delete p;
p=NULL; // 只执行父类的析构函数，而不执行子类的析构函数，可能导致内存泄露
```
【如何在这种情况下防止内存泄露？】

虚析构函数：当存在继承关系，且要用一个父类的指针指向堆中子类的对象，并希望用父类的指针释放这块内存时，可以使用。
```c++
class Person{
    Person();
    virtual~Person();  // 前面加关键字virtual即可，这个关键字可以被继承下去
}
// 在Soldier.h中，即使在~Soldier前面不写virtual，也相当于有了这个关键字（被继承下来了）
```


`void test1(Person p){p.play}`调用`test1`的时候，因为在`test1`中所定义的参数是一个对象P，所以传值的时候会先实例化临时对象P，通过临时对象P调用play这个函数，在`test1`执行完毕之后，p这个临时对象就会被销毁
如果函数的参数是基类的对象，那么基类的对象和派生类的对象，都可以作为实参传递进去，并且可以正常使用。
`void test2(Person &p)`  没有实例化临时对象，使用基类的引用也可以接收基类的对象以及派生类的对象
`void test3(Person *p)`的调用结果和`void test2(Person &p)`一样

### 17. 多重继承与多继承


- 多重继承，3个类即以上，A是B的父类，B是C的父类；
- 多继承，3个类即以上，一个类同时继承了多个类；
- 若未指明继承方式，则系统默认为`private`私有继承。


如果存在多继承.那么初始化子类的时候肯定先需要调用父类的析构函数.但是先调用哪个父类的析构函数.此顺序不取决于初始化列表,而是取决于你继承的顺序.比如

```c++
class A : public B, public C {
    A(b,c):C(c),B(b);
};
```

上面的例子,A先继承了B,再继承C.但是初始化列表中先初始化了C,再初始化B.但是B和C的执行顺序确实 `B - C - A `. 可见多继承的父类初始化顺序应该和继承顺序有关.



### 18. 虚继承


菱形继承：
```
       人
      / \
   工人  农民
     \   /
     农民工
```
使用虚(`virtual`)继承，防止"农民工"中有两个"人"的实例



虚继承和普通继承最大的不同是虚继承相当于在子类中有一个指向父类的指针，而在菱形继承时，就会继承一个指针。因为普通继承每一个函数或变量都是`xxx`的，但是虚继承这个指针并不是子类的一部分，只是有一个。当二代子类在继承子类时，两个指针重合，就省去了很多空间。

```c++
class A
{...};
class B1:virtual public A
{...};
class B2:virtual public A
{...};
class C:public B1,public B2
{...};
```
如果文件被定义了两次，例如`include .h`这种情况，
通过宏定义解决重定义 在原`.h`头文件中：

```c++
#ifndef PERSON_H
#define PERSON_H
...
#endif
```


没采用虚继承，此时要创建农民工的类，先调用`Farmer`的构造函数，又因为`Person`是`Farmer`的父类，所以最终先调用`Person`的构造函数，同理又由于`worker`也是农民工的父类，所以也要先调用`worker`的构造函数，而`person`又是`worker`的父类，故先调用`person`的构造函数，再调用`worker`的构造函数，最终调用农民工的构造函数（`Person->Farmer->Person->Worker->MigrantWorker`）。


使用虚继承时虽然不会重复调用最顶层父类的构造函数和析构函数，但参数只能使用最顶层父类默认值，而无法从子类中获得传入的值。



### 19. 虚函数

- 多态：指相同对象受到不同消息或不同对象收到相同消息时产生不同的动作。
  - 静态多态（早绑定）：在运行前，编译阶段就已确定要调用哪个函数，很早就把函数编译进去。（比如重载）
  - 动态多态（晚绑定）：不同对象，下达相同指令，产生不同动作。前提：以封装与继承为基础。至少要两个类，父类与子类，用三个类时，动态多态表现地会更明显。
- 实现多态的成员函数：用`virtual`修饰函数，使之成为虚函数。


动态多态和静态多态的区别（注意这些多态都出现在类里面，因为没有了继承就没有多态）：
静态多态(早绑定)：静态多态主要通过函数和运算符重载来实现，例如函数`void go（int a）{}`和`void go（）{}`这两个函数的名字一样，但是在编译的时候就可以根据`go（）`里面有无输入参数区分出到底执行哪个方法。

动态多态(晚绑定)：例如父类`father`有个方法名字叫`go（）{“父类的go”}；`
子类`son`有个方法也叫`go（）{“son的go”}；`
子类`daughter`有个方法也叫`go（）{“daughter的go”}；`
```c
father *p1=new son；
father *p2=new daughter；
```
然后当我们执行
```
p1->go（）；
p2->go（）;
```
输出的结果都只是父类的`go`；
如果想实现输出"`son`的`go`"和"`daughter`的`go`"，就需要在父类的`go（）`方法得前面加上关键字`virtual`变成。这样再输入`p1->go（）；p2->go（）;`就可以输出"`son`的`go`"和"`daughter`的`go`"




### 20. 虚析构函数

- 虚析构函数：目的就是解决用父类的指针调用子类对象时产生的一些内存泄漏问题，`delete` 指针，指针的类型是什么的，系统就会释放相应内存的空间。所以在父类的析构函数前加上“`virtual`”关键字，则在释放内存时，会同时释放掉子类对象的内存。
- 虚不是所有函数都能“虚的”：
  - 内联函数不能是虚函数，
  - 静态函数不能是虚函数，
  - 构造函数不能是虚函数，
  - 不是类的成员函数不能是虚函数，即普通函数不能是虚函数




`virtual`适用的以下情形：
- 虚继承，`class B：virtual public A` （菱形继承`A-B`,`C-D`）避免重复继承数据
- 虚方法，`virtual void fun()`  实现多态，不同子类实例化的父类调用相同方法结果不同
- 虚析构，`virtual ~A( )`  防止释放子类实例化的父类中子类内存泄漏的问题，最好析构前都加




### 21. 虚函数与虚析构函数原理

- 覆盖：父类和子类定义了同名虚函数，在子类的虚函数表中，子类的虚函数地址就会把原来的父类的虚函数地址给覆盖了。
- 隐藏：父类和子类出现了同名函数，父类的同名函数将进行隐藏。
- 重载是指同一类中两个同名函数，但是参数的类型和数量不同（静态多态）


虚析构函数原理：
- （前提：执行完子类的析构函数就会执行父类的析构函数。）
- 如果在父类中定义了虚析构函数，那么在父类的虚函数表中会有一个父类析构函数的函数指针；而子类的虚函数表也会有一个子类析构函数指针指向子类的析构函数。
- 此时若使用父类的指针指向子类对象，那么通过`delete`父类指针，可找到子类的虚函数表指针——虚函数表——析构函数——自动执行父类析构函数

注意：
- 对象的大小：类实例化的对象，数据成员占据的内存大小，成员函数不占据内存。（没有数据成员的对象会占用1个内存单元，证明自己的存在）
- 对象的地址：实例化的对象，所占内存的第一个存储单元的地址
- 对象成员地址：实例化对象有一个或多个数据成员，每个数据成员都有自己的地址，占一定的内存空间（数据类型不同，地址不同）
- 函数表指针：具有虚函数的类实例化的对象时，存储在内存中第一块的指针就是虚函数表的指针


注意：
- 虚函数表指针占据的是每个对象的前四个内存单元
- 有虚函数时，对象中首先存虚函数表指针，再存数据成员地址，没有虚函数时，首先存的是数据成员的地址。
- 有虚函数时，先使用指针 p 指向对象，访问的虚函数表指针，（`*p`）取得的是虚函数表地址，再使 p++ 就指向了数据成员，（`*p`）就能取得数据成员的值。


每个类只有一份虚函数表，所有该类的对象共用同一张虚函数表



### 22. 纯虚函数抽象类

- 虚函数：`virtual double calcArea(){return 0;}`
- 纯虚函数：`virtual double calcPerimeter() = 0;`
- 纯虚函数在虚函数表中直接写为`0`，包含纯虚函数的类，就是抽象类。
- 纯虚函数无法调用，所以抽象类无法实例化对象
- 抽象类的子类也有可能是抽象类。抽象类的子类只有把抽象类当中的所有纯虚函数都做了实现，子类才可以实例化对象。
- 抽象基类是本类族的公共接口，例如可通过抽象基类的指针访问到任何子类的虚函数，并对这些函数下达同一命令，从而实现多态性。
- 若是子类并没有对父类中的纯虚函数进行定义，则该子类仍然是抽象基类。



只有函数声明 没有函数定义的函数叫做纯虚函数，纯虚函数表示为虚函数后面加上`=0`



### 23. 接口类

- 含有纯虚函数的类是抽象类。
- 仅有纯虚函数的类是接口类：（没有数据成员，只有成员函数，且都是纯虚函数）。
- 接口类更多的是表达一个能力或者协议


继承后的子类的构造函数要用初始化列表初始化，因为初始化列表先于构造函数执行，并且父类构造函数先于子类构造函数执行：
```c++
FighterPlane::FighterPlane(string code ):Plane(code){
  // cout << " FighterPlane()" << endl;
}
```


- 用接口类做函数形参，可以限制传入参数的类型，只有拥有接口类定义的函数功能的对象才能作为实参
- `void flyMatch(Flyable *f1,Flyable *f2){f1->takeoff();f2->takeoff()}`
- 以上函数当传入参数为plane类或者Fighter类时，就是父类指针指向子类对象。


### 24. `RTTI`
`Run-Time Type Identification`
`RTTI`：运行时类型识别


`typeid(*obj).name()`打印出`obj`这个指针指向的实际的对象类型
对类型进行比对：`if{typeid(*obj)==typeid(Bird)}`


`dynamic_cast<  >转换类型`，`< >`中是要转化成为的类型，例如：`Bird *bird = dynamic_cast<Bird *>(obj)``;(obj)`转化为`Bird * 类型`

`dynamic_cast`用法的注意事项：
- 只能应用于指针和引用之间的转换，即`< >`中只能是某一类型的指针或者是某一类型的引用；
- 要转换的类型中，必须包含虚函数；
- 转换成功返回子类的地址，失败返回`NULL`

`typied`的注意事项：
- `type_id` 返回一个`type_info`对象的引用；
- 如果想通过基类的指针获得派生类的数据类型，基类必须带有虚函数；
- 只能获取对象的实际类型


之所以进行这个转换是因为使用父类`Flyable`指针通过虚函数实现机制我们可以动态的是实现同名的虚函数，但是对于子类`Bird`中的非虚函数（觅食函数），要想调用则必须是`Bird`，所以要进行强制类型转换。



### 25. 异常处理

- 异常：程序运行期出现的错误。
- 异常处理：对有可能发生异常的地方做出预见性的安排。
- 异常处理关键字`try...catch...`和`throw`就是将主逻辑放在`try`块里，异常处理逻辑放在`catch`里面。
- 基本思想：主逻辑与异常处理分离。好处看上去整齐，非常容易理解。
- 异常传播方向和调用关系 相反。
- `try` 和`catch`可以是一对一也可以是一对多。
- 常见的异常：数组下标越界，除数为0，内存不足。


多态和异常处理的联系：我们可以通过定义一个异常类，把异常类定义为一个接口类其中定义一些打印的方法，或者异常处理的方法，然后我们通过细分的子类来继承接口类当我们抛出这些子类的对象时都可以用父类来捕获。`throw new`加子类名捕获时用`catch`（父类名`+&e`）我们也可以通过子类对象去调用子类相应的虚函数。




- `catch`（引用）可以输出错误代码，`catch（int &e）{ cout << e << endl; }`
- 也可以 `throw` 一个类，然后就可以在 `catch` 中调用这个类的成员函数，如果继承了父类，还可以调用到父类的成员函数（方法是`[::]`来写是父类下的成员函数），通过对父类的成员函数加上 `virtual` 变成虚函数，在子类继承父类的时候，如果实例化父类类型的子类对象时，就可以调用到子类的成员函数。
- `catch` 中写上父类类型因为继承而存在 `isA` 的关系，就可以传入子类对象或者父类对象
- `try` 可以对应多条 `catch` 说的是一个错误出现的原因可能有多个



### 26. 友元函数和友元类

1，友元全局函数：
`friend void printXY（Coordinate &c);`
将函数printXY声明成类`coordinate`的友元，则在`printXY`可以直接访问`coordinate`的`private`的成员。
友元成员函数：
`friend void Circle::printXY(Coordinate &c);`
将类`Circle`的成员函数`printXY`声明称`Coordinate`类的友元,
2，友元类：
在类`Coordinate` 中写上
```c++
friend Circle;//应该在类外，前面先写上class Circle;
```
则可以在Circle类中声明一个`Coordinate`的对象，然后可以调用`Coordinate`类的任何成员。
3，友元注意事项
单向性，不可传递性，声明的形式及数量不受限制。

- 友元函数的参数列表必须是类的对象、引用或指针
- 友元函数的括号内一定要有东西
- 传入对象的引用，函数的声明和定义写法：`void display（Coordinate &coor）`




1. 必须在类的说明中说明友元函数，说明时以关键字`friend`开头，后跟友元函数的函数原型，友元函数的说明可以出现在类的任何地方，包括在`private`和`public`部分；
1. 注意友元函数不是类的成员函数，所以友元函数的实现和普通函数一样，在实现时不用"`::`"指示属于哪个类，只有成员函数才使用"::"作用域符号；
1. 友元函数不能直接访问类的成员，只能访问对象成员，
1. 友元函数可以访问对象的私有成员，但普通函数不行；
1. 调用友元函数时，在实际参数中需要指出要访问的对象，
1. 类与类之间的友元关系不能继承。
1. 一个类的成员函数也可以作为另一个类的友元，但必须先定义这个类。



友元函数：
```c++
void display(Coordinate coor); // 传对象
void display(Coordinate &coor); // 传引用
```
传引用 效率更高，因为传对象 会创建临时变量




注意：
- 友元关系不可传递（B是A朋友，C是B朋友，不代表C是A的朋友）；
- 友元关系具有单向性；（A是B的朋友，但B不是A的朋友）；
- 友元声明的形式及数量不受限制；(形式:可以既有友元函数又有友元类；数量上：(可以一个或多个友元函数或友元类)

友元只是封装的补充，破坏了封装性使私有数据暴漏给朋友，不得已而为之；



构造函数的执行可以分成两个阶段，初始化阶段和计算阶段，初始化阶段先于计算阶段。
所有类类型（`class type`）的成员都会在初始化阶段初始化，即使该成员没有出现在构造函数的初始化列表中
除了性能问题之外，有些时候合初始化列表是不可或缺的，以下几种情况时必须使用初始化列表：
1. 常量成员，因为常量只能初始化不能赋值，所以必须放在初始化列表里面
2. 引用类型，引用必须在定义的时候初始化，并且不能重新赋值，所以也要写在初始化列表里面
3. 没有默认构造函数的类类型，因为使用初始化列表可以不必调用默认构造函数来初始化，而是直接调用拷贝构造函数初始化

### 27. static
1. 静态数据成员和静态成员函数：两者都是存在在类中的，其存在与否与是否实例化对象无关，即使不实例化，也会在内存中存在。定义方法，在之前加上`static`即可。
2. 其访问方法：1.通过实例化对象来访问其值  2. 类名::数据成员/成员函数直接调用。
3. 初始化静态数据成员是：
    - 不需要再加`static`关键字  
    - 必须单独去初始化。不是随着对象的产生而产生，是随着类的产生而产生。  `int Tank::m_iCount = 0;`
4. 静态成员函数只能调用静态的数据成员，不能调用非静态的。普通成员函数可以调用静态和非静态的数据成员，不受影响。
5. 不依赖与对象的一个表现：当用`sizeof`计算时，是不包括静态的数据成员的。


从`this`指针谈静态成员函数：
1. 调用静态成员函数和静态数据成员时，并不与对象相关，只是与类相关
1. 使用静态成员函数，并不会传入一个隐形的`this`指针，并不知道调用的数据成员是哪个对象的数据成员。所以在静态的成员函数中无法调用非静态的数据成员
1. 可以在静态的成员函数中调用静态的数据成员

### 28. 运算符重载

#### 28.1. 一元运算符重载

-（负号）的重载:友元函数重载，成员函数重载。
成员函数重载：
```c++
class{Coordinate& operator-();}  
Coordinate & Coordinate::operator-(){
m_ix=-m_ix;
m_iy=-m_iy; 
return *this;} 
Coordinate coor1(3,5) -coor1;//coor1.operator-();
```
友元函数重载:
```c++
 class{friend Coordinate& operator-(Coordinate &coor);}
Coordinate& operator-(Coordinate &coor){coor.m_ix = -coor.m_ix; coor.m_iy=-coor.m_iy; return coor;} 
-coor1;//operator-(coor1);
```
++的前置重载：
```c++
class{ Coordinate& operator++();} 
Coordinate& Coordinate::operator++(){m_ix++;m_iy++; return *this;} 
++coor1;//coor1.operator++();
```
++的后置重载:
```c++
class{ Coordinate operator++(int);}
Coordinate operator++(int){ Coordinate old(*this); m_ix++;m_iy++; return old;}
coor1++;//coor1.operator++(0);
```

友元函数的重载，因为全局函数不像成员函数有隐式的this指针，因此必须主动给个形参，所以是以类的引用作为形参，再所以，返回值，必须是引用的别名，



#### 28.2. 二元运算符重载

索引运算符只能作为成员函数重载，因为友元函数重载的第一个形参可以是`this`指针也可以是其他的值，但是对于索引运算符来说，它的第一个形参必须是`this`指针。

`<<`、`>>`只能用做友元函数重载，因为，`<<`重载时的形参有两个参数，第一个必须是`ostream`对象，而成员函数重载时第一个形参是隐形的`this`指针，因此`<<`只能声明为友元函数重载。


（1）函数参数是引用，则改变的是传入对象的值
（2）函数参数是对象，则改变的是新对象的值，其中调用了拷贝构造函数

【`+`运算符】
成员函数重载：

```c++
class Coordinate{…Coordinate operator+(const Coordinate &coor);…}

Coordinate operator+(const Coordinate &coor)
{
    Coordinate temp(0,0);
    temp.m_iX=this->m_iX+coor.m_iX;
    temp.m_iY=this->m_iY+coor.m_iY;
    return temp;
}

int main (void)
{   ...
    coor3=coor1+coor2;//coor1.operator+(coor2)
    ...
}
```

友元函数重载：

```c++
class Coordinate{friend Coordinate operator+(const Coordinate &c1，const Coordinate &c2);…}

Coordinate operator+(const Coordinate &c1，const Coordinate &c2)
{
    Coordinate temp(0,0);
temp.m_iX = c1.m_iX + c2.m_iX;
temp.m_iY = c1.m_iY + c2.m_iY;
    return temp;
}

int main(void)
{   ……
    coor3=coor1+coor2;//operator+(coor1,coor2)
    ……
}
```

`<<`输出运算符重载

```c++
class Coordinate{ friend ostream &operator<<(ostream &out, Coordinate &c); }

ostream &operator<<(ostream &out, Coordinate &c){
  out << c.m_iX << "," <<  c.m_iY;
  return out;
};
```
使用：`cout << coor3 << endl;`

`[]`索引运算符重载
```c++
class Coordinate{ int operator[](int index); }

int Coordinate::operator[](int index){
  if(index == 0) {
    return m_iX;
  }
  return m_iY;
};
```
使用：`cout << coor3[1] << endl;`

### 29. 函数模板

1. 函数模板的关键字：`template class typename`（其中后两者相同，可以混用）

2. 函数模板：
  类型模板
```c++
template<class T>
T display(T a,T b )
{

}
```
调用的时候： `display(100,2);`自动判断//或者 `display<int,int>(100,2);`

变量作为参数
```c++
template<int size>
{
}
```
多参数模板
```c++
template<class A,calss B>
void display(A a, B b)
{}
{}
```
2. 定义出函数模板时，函数模板并不是相互重载的关系，因为在内存中只是将函数模板定义出来，并不能在内存中产生任何代码，只有在使用时才产生相应的函数代码，此时这些函数相互间才能称得上重载关系。


函数模板参数个数不能为0个，因为这样则没有必要使用函数模板。

### 30. 类模板

```c++
template<class T>
class MyArray{
public:
    void display();//若是类内定义则没什么特别的：void display(){...}
private:
    T *m_pArr;
};
//实现
template<class T>
void MyArry<T>::display(){
...
}
//使用
MyArray<int> arr;
arr.display();
```


【模板代码不能分离编译，必须都写在`.h`文件中】


### 31. 标准模板库
迭代器的声明与初始化方法：
```c++
vector vec;
vector<string>::iterator 迭代器名称 = vec.begin();
//则声明了一个迭代器，并让这个迭代器指向了向量vec的开始的元素，声明迭代器的时候  vector<string>::iterator   是迭代器的类型。
```
当要使用迭代器输出它指向的元素时必须用  `*迭代器名称`


`map` 是映射。
声明方法： `map<T1,T2>映射名称;` `T1`是`key`的类型，`T2`是`value`的类型

map的使用方法：
1. 先定义`pair`：   
```c++
pair<T1,T2>名称1（key1,value1）;
pair<T1,T2>名称2（key2,value2）;
```
2. 然后把`pair`插入映射： 
```c++
映射名称.insert(名称1);
映射名称.insert(名称2);
```
3. 映射的使用：  
```c++
映射名称[key1] ;  则输出value1
映射名称[key2] ;  则输出value2
```






