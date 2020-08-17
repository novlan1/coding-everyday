- [1. 起源](#1-起源)
- [2. JAVA中”单引号”，“双引号”区别：](#2-java中单引号双引号区别)
- [3. 三种注释形式](#3-三种注释形式)
- [4. `StringBuilder`](#4-stringbuilder)
- [5. `StringJoiner`](#5-stringjoiner)
- [6. 包装类型](#6-包装类型)
- [7. JavaBean](#7-javabean)
- [8. 枚举类型](#8-枚举类型)
- [9. 记录类](#9-记录类)
- [10. 二维码分类](#10-二维码分类)
  - [10.1. 二维码扫描结果](#101-二维码扫描结果)
- [11. intelliJ idea 使用try/catch 快捷提示](#11-intellij-idea-使用trycatch-快捷提示)
- [12. String是最基本的数据类型吗？](#12-string是最基本的数据类型吗)
- [13. `float f=3.4;`是否正确？](#13-float-f34是否正确)
- [14. `short s1 = 1; s1 = s1 + 1;`有错吗? `short s1 = 1; s1 += 1;` 有错吗？](#14-short-s1--1-s1--s1--1有错吗-short-s1--1-s1--1-有错吗)
- [15. & 和 && 的区别？](#15--和--的区别)
- [16. `Math.round(11.5)` 等于多少？`Math.round(-11.5)` 等于多少？](#16-mathround115-等于多少mathround-115-等于多少)
- [17. switch是否能作用在 byte 上，是否能作用在 long 上，是否能作用在 String 上？](#17-switch是否能作用在-byte-上是否能作用在-long-上是否能作用在-string-上)
- [18. 用最有效率的方法计算 2 乘以 8 ？](#18-用最有效率的方法计算-2-乘以-8-)
- [19. 数组有没有 `length()` 方法？ `String` 有没有 `length()` 方法？](#19-数组有没有-length-方法-string-有没有-length-方法)
- [20. 在Java中，如何跳出当前的多重嵌套循环？](#20-在java中如何跳出当前的多重嵌套循环)
- [21. 构造器（constructor）是否可被重写（override）？](#21-构造器constructor是否可被重写override)
- [22. 重载（Overload）和重写（Override）的区别。重载的方法能否根据返回类型进行区分？](#22-重载overload和重写override的区别重载的方法能否根据返回类型进行区分)
- [23. char 型变量中能不能存贮一个中文汉字，为什么？](#23-char-型变量中能不能存贮一个中文汉字为什么)
- [24. 抽象类（abstract class）和接口（interface）有什么异同？](#24-抽象类abstract-class和接口interface有什么异同)
- [25. 抽象的（abstract）方法是否可同时是静态的（static），是否可同时是本地方法（native），是否可同时被 synchronized 修饰？](#25-抽象的abstract方法是否可同时是静态的static是否可同时是本地方法native是否可同时被-synchronized-修饰)
- [26. 阐述静态变量和实例变量的区别](#26-阐述静态变量和实例变量的区别)
- [27. 如何实现对象克隆？](#27-如何实现对象克隆)
- [28. `String s = new String("xyz");`创建了几个字符串对象？](#28-string-s--new-stringxyz创建了几个字符串对象)
- [29. 接口是否可继承（extends）接口？抽象类是否可实现（implements）接口？抽象类是否可继承具体类（concrete class）？](#29-接口是否可继承extends接口抽象类是否可实现implements接口抽象类是否可继承具体类concrete-class)
- [30. Error和Exception有什么区别？](#30-error和exception有什么区别)
- [31. 运行时异常与受检异常有何异同？](#31-运行时异常与受检异常有何异同)
- [32. `try{}` 里有一个 `return` 语句，那么紧跟在这个 `try` 后的 `finally{}` 里的代码会不会被执行？](#32-try-里有一个-return-语句那么紧跟在这个-try-后的-finally-里的代码会不会被执行)
- [33. List、Set、Map是否继承自Collection接口？](#33-listsetmap是否继承自collection接口)
- [34. Thread类的 `sleep()` 方法和对象的 `wait()` 方法都可以让线程暂停执行，它们有什么区别？](#34-thread类的-sleep-方法和对象的-wait-方法都可以让线程暂停执行它们有什么区别)
- [35. 线程的 sleep() 方法和 yield() 方法有什么区别？](#35-线程的-sleep-方法和-yield-方法有什么区别)
- [36. 学习资料](#36-学习资料)

### 1. 起源
Java是由Sun Microsystems公司于1995年5月推出的Java面向对象程序设计语言和Java平台的总称。由`James Gosling`和同事们共同研发，并在1995年正式推出。

Java介于编译型语言和解释型语言之间。编译型语言如C、C++，代码是直接编译成机器码执行，但是不同的平台（x86、ARM等）CPU的指令集不同，因此，需要编译出每一种平台的对应机器码。解释型语言如Python、Ruby没有这个问题，可以由解释器直接加载源码然后运行，代价是运行效率太低。而Java是将代码编译成一种“字节码”，它类似于抽象的CPU指令，然后，针对不同平台编写虚拟机，不同平台的虚拟机负责加载字节码并执行，这样就实现了“一次编写，到处运行”的效果。当然，这是针对Java开发者而言。对于虚拟机，需要为每个平台分别开发。为了保证不同平台、不同公司开发的虚拟机都能正确执行Java字节码，SUN公司制定了一系列的Java虚拟机规范。从实践的角度看，JVM的兼容性做得非常好，低版本的Java字节码完全可以正常运行在高版本的JVM上。



随着Java的发展，SUN给Java又分出了三个不同版本：

- Java SE：Standard Edition
- Java EE：Enterprise Edition
- Java ME：Micro Edition


这三者之间有啥关系呢？
```
┌───────────────────────────┐
│Java EE                    │
│    ┌────────────────────┐ │
│    │Java SE             │ │
│    │    ┌─────────────┐ │ │
│    │    │   Java ME   │ │ │
│    │    └─────────────┘ │ │
│    └────────────────────┘ │
└───────────────────────────┘
```
简单来说，Java SE就是标准版，包含标准的JVM和标准库，而Java EE是企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。

JDK 和 JRE

- JDK：Java Development Kit
- JRE：Java Runtime Environment

简单地说，JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。

二者关系如下：
```
  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```

那JSR、JCP……又是啥？

- JSR规范：Java Specification Request
- JCP组织：Java Community Process

在`JAVA_HOME`的`bin`目录下找到很多可执行文件：

- java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；
- javac：这是Java的编译器，它用于把Java源码文件（以`.java`后缀结尾）编译为Java字节码文件（以`.class`后缀结尾）；
- jar：用于把一组`.class`文件打包成一个`.jar`文件，便于发布；
- javadoc：用于从Java源码中自动提取注释并生成文档；
- jdb：Java调试器，用于开发阶段的运行调试。



### 2. [JAVA中”单引号”，“双引号”区别：](https://www.cnblogs.com/lidar/p/7798933.html)

```
单引号引的数据 是char类型的——》单引号只能引一个字符（表示单个字符）
双引号引的数据 是String类型的——》而双引号可以引0个及其以上（引用字符串）


char类型的值用单引号引起来的单个字符
如: char a = 'b'

而java中的双引号 表示字符串 一个或多个字符
如 String c = "abc"
String d="a"
和char d=‘a’
```



Java源码本质上是一个文本文件，我们需要先用`javac`把`Hello.java`编译成字节码文件`Hello.class`，然后，用`java`命令执行这个字节码文件：Java源码本质上是一个文本文件，我们需要先用`javac`把`Hello.java`编译成字节码文件`Hello.class`，然后，用`java`命令执行这个字节码文件：

```ascii
┌──────────────────┐
│    Hello.java    │<─── source code
└──────────────────┘
          │ compile
          ▼
┌──────────────────┐
│   Hello.class    │<─── byte code
└──────────────────┘
          │ execute
          ▼
┌──────────────────┐
│    Run on JVM    │
└──────────────────┘
```



### 3. 三种注释形式

```java
/**
 * 可以用来自动创建文档的注释
 */
public class Hello {
    public static void main(String[] args) {
        // 向屏幕输出文本:
        System.out.println("Hello, world!");
        /* 多行注释开始
        注释内容
        注释结束 */
    }
} // class定义结束
```





### 4. `StringBuilder`

`StringBuilder`是可变对象，用来高效拼接字符串；

`StringBuilder`可以支持链式操作，实现链式操作的关键是返回实例本身；

`StringBuffer`是`StringBuilder`的线程安全版本，现在很少使用。



### 5. `StringJoiner`

用指定分隔符拼接字符串数组时，使用`StringJoiner`或者`String.join()`更方便；

用`StringJoiner`拼接字符串时，还可以额外附加一个“开头”和“结尾”。

### 6. 包装类型
```java
Integer n = 100; // 编译器自动使用Integer.valueOf(int)
int x = n; // 编译器自动使用Integer.intValue()
```
```java
int i = 100;
Integer n = Integer.valueOf(i);
int x = n.intValue();
```

把`int`变为`Integer`的赋值写法，称为自动装箱（Auto Boxing），反过来，把`Integer`变为`int`的赋值写法，称为自动拆箱（Auto Unboxing）。

1. Java核心库提供的包装类型可以把基本类型包装为`class`；
2. 自动装箱和自动拆箱都是在编译期完成的（JDK>=1.5）；
3. 装箱和拆箱会影响执行效率，且拆箱时可能发生`NullPointerException`；
4. 包装类型的比较必须使用`equals()`；
5. 整数和浮点数的包装类型都继承自`Number`；
6. 包装类型提供了大量实用方法。

### 7. JavaBean

1. JavaBean是一种符合命名规范的`class`，它通过`getter`和`setter`来定义属性；
2. 属性是一种通用的叫法，并非Java语法规定；
3. 可以利用IDE快速生成`getter`和`setter`；
4. 使用`Introspector.getBeanInfo()`可以获取属性列表。

### 8. 枚举类型

1. Java使用`enum`定义枚举类型，它被编译器编译为`final class Xxx extends Enum { … }`；
2. 通过`name()`获取常量定义的字符串，注意不要使用`toString()`；
3. 通过`ordinal()`返回常量定义的顺序（无实质意义）；
4. 可以为`enum`编写构造方法、字段和方法
5. `enum`的构造方法要声明为`private`，字段强烈建议声明为`final`；
6. `enum`适合用在`switch`语句中。

### 9. 记录类

从Java 14开始，提供新的`record`关键字，可以非常方便地定义Data Class：

- 使用`record`定义的是不变类；
- 可以编写Compact Constructor对参数进行验证；
- 可以定义静态方法。



### 10. 二维码分类

二维码依据码制的编码原理，通常分为三种：线性堆叠式二维码、矩阵式二维码、邮政码。 

线性堆叠式二维码：建立在一维条码基础上，按需要堆积成两行或多行。与一维码很类似。

 矩阵式二维码：（最常用）在一个矩阵空间通过黑、白像素在矩阵中的不同分布进行编码。在矩阵相应元素位置上，用点（方点、圆点或其它形状）的出现表示二进制“1”，点的不出现表示二进制的“0”。QR CODE 

邮政码：通过不同长度的条进行编码，主要用于邮件编码。



#### 10.1. 二维码扫描结果

1. 让扫出来的二维码，由文本变为可以跳转的链接，只需要在前面加个`http://`或者`https://`，不加的话识别的以为是文本。
2. 扫描出来的是名片，VCARD 规范



### 11. intelliJ idea 使用try/catch 快捷提示
选中代码行，然后按住`ctrl + alt + t`

### 12. String是最基本的数据类型吗？

不是，Java中的基本数据类型只有8个：`byte`、`short`、`int`、`long`、`float`、`double`、`char`、`boolean`；除了基本类型（primitive type），剩下的都是引用类型（reference type），Java 5以后引入的枚举类型也算是一种比较特殊的引用类型。

### 13. `float f=3.4;`是否正确？

不正确。3.4是双精度数，将双精度型（double）赋值给浮点型（float）属于下转型会造成精度损失，因此需要强制类型转换 `float f =(float)3.4;` 或者写成 `float f =3.4F;`。

### 14. `short s1 = 1; s1 = s1 + 1;`有错吗? `short s1 = 1; s1 += 1;` 有错吗？

对于 `short s1 = 1; s1 = s1 + 1;` 由于 1 是 int 类型，因此 `s1+1` 运算结果也是int 型，需要强制转换类型才能赋值给 short 型，编译不通过。

而 `short s1 = 1; s1 += 1;` 可以正确编译，因为 `s1+= 1;` 相当于 `s1 = (short)(s1 + 1);` 其中有隐含的强制类型转换。

### 15. & 和 && 的区别？

`&` 运算符有两种用法：按位与；逻辑与。`&&` 运算符是短路与运算。

逻辑与跟短路与的差别是非常巨大的，虽然二者都要求运算符左右两端的布尔值都是 `true` 整个表达式的值才是 `true` 。 `&&` 之所以称为短路运算是因为，如果 `&&` 左边的表达式的值是 `false` ，右边的表达式会被直接短路掉，不会进行运算。

> 逻辑或运算符 `|` 和短路或运算符 `||` 的差别也是如此。

### 16. `Math.round(11.5)` 等于多少？`Math.round(-11.5)` 等于多少？

`Math.round(11.5)` 的返回值是 `12` ，`Math.round(-11.5)` 的返回值是 `-11`。四舍五入的原理是在参数上加 `0.5` 然后进行下取整。

### 17. switch是否能作用在 byte 上，是否能作用在 long 上，是否能作用在 String 上？

在 Java 5 以前， `switch(expr)` 中， `expr` 只能是 `byte` 、`short`、`char`、`int`；从 Java 5 开始，Java 中引入了枚举类型，`expr` 也可以是 enum 类型；从 Java 7 开始， `expr` 还可以是字符串 `String` ，但是长整型 `long` 在目前所有的版本中都是不可以的。

### 18. 用最有效率的方法计算 2 乘以 8 ？

`2 << 3`（左移3位相当于乘以2的3次方，右移3位相当于除以2的3次方）。

### 19. 数组有没有 `length()` 方法？ `String` 有没有 `length()` 方法？

数组没有 `length()` 方法，有length的属性。String有 `length()` 方法。

### 20. 在Java中，如何跳出当前的多重嵌套循环？

在最外层循环前加一个标记如A，然后用break A;可以跳出多重循环。

### 21. 构造器（constructor）是否可被重写（override）？

构造器不能被继承，因此不能被重写，但可以被重载。

### 22. 重载（Overload）和重写（Override）的区别。重载的方法能否根据返回类型进行区分？

方法的重载和重写都是实现多态的方式，区别在于 **重载是编译时的多态性**，而 **重写是运行时的多态性**。

重载发生在一个类中，**同名的方法如果有不同的参数列表**（参数类型不同、参数个数不同或者二者都不同）则视为重载。

重写发生在子类与父类之间，重写要求子类被重写方法与父类被重写方法有相同的返回类型（或子类型），不能比父类被重写方法声明更多的异常（里氏代换原则）。

### 23. char 型变量中能不能存贮一个中文汉字，为什么？

char 类型可以存储一个中文汉字，因为 Java 中使用的编码是 Unicode （不选择任何特定的编码，直接使用字符在字符集中的编号，这是统一的唯一方法），**一个 char 类型占2个字节**，所以放一个中文是没问题的。

### 24. 抽象类（abstract class）和接口（interface）有什么异同？

- 抽象类和接口都不能够实例化，但可以定义抽象类和接口类型的引用。
- 一个类如果继承了某个抽象类或者实现了某个接口都需要对其中的抽象方法全部进行实现，否则该类仍然需要被声明为抽象类。
- 接口比抽象类更加抽象，因为抽象类中可以定义构造器，可以有抽象方法和具体方法，而接口中不能定义构造器而且其中的方法全部都是抽象方法。
- 抽象类中的成员可以是 `private`、默认、 protected 、public的，而接口中的成员全都是public的
- 抽象类中可以定义成员变量，而接口中定义的成员变量实际上都是常量
- 有抽象方法的类必须被声明为抽象类，而抽象类未必要有抽象方法

### 25. 抽象的（abstract）方法是否可同时是静态的（static），是否可同时是本地方法（native），是否可同时被 synchronized 修饰？

都不能。抽象方法需要子类重写，而静态的方法是无法被重写的，因此二者是矛盾的。

本地方法是由本地代码（如C代码）实现的方法，而抽象方法是没有实现的，也是矛盾的。

synchronized 和方法的实现细节有关，抽象方法不涉及实现细节，因此也是相互矛盾的。

### 26. 阐述静态变量和实例变量的区别

静态变量是被static修饰符修饰的变量，也称为类变量，它属于类，不属于类的任何一个对象，一个类不管创建多少个对象，静态变量在内存中有且仅有一个拷贝；实例变量必须依存于某一实例，需要先创建对象然后通过对象才能访问到它。静态变量可以实现让多个对象共享内存。

### 27. 如何实现对象克隆？

有两种方式：

1. 实现 `Cloneable` 接口并重写 Object 类中的 `clone()` 方法；
2. 实现 `Serializable` 接口，通过对象的序列化和反序列化实现克隆，可以实现真正的深度克隆。

### 28. `String s = new String("xyz");`创建了几个字符串对象？

两个对象，一个是常量池的 `"xyz"` ，一个是用 `new` 创建在堆上的对象。

### 29. 接口是否可继承（extends）接口？抽象类是否可实现（implements）接口？抽象类是否可继承具体类（concrete class）？

接口可以继承接口，而且支持多重继承。抽象类可以实现(implements)接口，抽象类可继承具体类也可以继承抽象类。

### 30. Error和Exception有什么区别？

Error表示系统级的错误和程序不必处理的异常，是恢复不是不可能但很困难的情况下的一种严重问题；比如内存溢出，不可能指望程序能处理这样的情况；Exception表示需要捕捉或者需要程序进行处理的异常，是一种设计或实现问题；也就是说，它表示如果程序运行正常，从不会发生的情况。

### 31. 运行时异常与受检异常有何异同？

运行时异常表示虚拟机的通常操作中可能遇到的异常，是一种常见运行错误，只要程序设计得没有问题通常就不会发生。

受检异常跟程序运行的上下文环境有关，即使程序设计无误，仍然可能因使用的问题而引发。

### 32. `try{}` 里有一个 `return` 语句，那么紧跟在这个 `try` 后的 `finally{}` 里的代码会不会被执行？

```
finally` 会执行，在方法返回调用者前执行。
```

### 33. List、Set、Map是否继承自Collection接口？

List、Set 是，Map 不是。Map是键值对映射容器，与List和Set有明显的区别

### 34. Thread类的 `sleep()` 方法和对象的 `wait()` 方法都可以让线程暂停执行，它们有什么区别？

`sleep()`方法是线程类（Thread）的静态方法，调用此方法会让当前线程暂停执行指定的时间，将执行机会（CPU）让给其他线程，但是对象的锁依然保持，因此休眠时间结束后会自动恢复。

`wait()`是Object类的方法，调用对象的 `wait()` 方法导致当前线程放弃对象的锁（线程暂停执行），进入对象的等待池（wait pool），只有调用对象的 `notify()` 方法（或 `notifyAll()` 方法）时才能唤醒等待池中的线程进入等锁池（lock pool），如果线程重新获得对象的锁就可以进入就绪状态。

### 35. 线程的 sleep() 方法和 yield() 方法有什么区别？

1. `sleep()`方法给其他线程运行机会时不考虑线程的优先级，因此会给低优先级的线程以运行的机会；`yield()`方法只会给相同优先级或更高优先级的线程以运行的机会；
2. 线程执行sleep()方法后转入阻塞（blocked）状态，而执行yield()方法后转入就绪（ready）状态；
3. `sleep()`方法声明抛出InterruptedException，而yield()方法没有声明任何异常；
4. `sleep()`方法比 yield() 方法（跟操作系统CPU调度相关）具有更好的可移植性。



### 36. 学习资料
1. https://hadyang.github.io/interview/
2. https://snailclimb.gitee.io/javaguide/#/
3. https://github.com/xbox1994/Java-Interview
4. https://github.com/AobingJava/JavaFamily