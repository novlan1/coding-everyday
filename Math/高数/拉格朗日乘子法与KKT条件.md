- [1. 拉格朗日乘子法与KKT条件](#1-拉格朗日乘子法与kkt条件)
  - [1.1. 定义](#11-定义)
  - [1.2. 举例](#12-举例)
  - [1.3. 理解](#13-理解)
    - [1.3.1. 代数](#131-代数)
  - [1.4. 多等式约束下的极值](#14-多等式约束下的极值)
  - [1.5. 不等式约束下的极值](#15-不等式约束下的极值)
    - [1.5.1. 情况一](#151-情况一)
    - [1.5.2. 情况二](#152-情况二)
    - [1.5.3. 新增的条件](#153-新增的条件)
  - [1.6. KKT条件](#16-kkt条件)

## 1. 拉格朗日乘子法与KKT条件

### 1.1. 定义

**设给定二元函数z=ƒ(x,y)和附加条件φ(x,y)=0**，为寻找**z=ƒ(x,y)在附加条件下的极值点**，先做拉格朗日函数

![img](http://img.uwayfly.com/article_mike_20200617215548_cba2af3f3e2e.png)


，其中λ为参数。

**令F(x,y,λ)对x和y和λ的一阶偏导数等于零**，即

```
F'x=ƒ'x(x,y)+λφ'x(x,y)=0 
F'y=ƒ'y(x,y)+λφ'y(x,y)=0
F'λ=φ(x,y)=0
```

由上述方程组解出x,y及λ，如此求得的(x,y)，就是函数z=ƒ(x,y)在附加条件φ(x,y)=0下的**可能极值点**。

**若这样的点只有一个，由实际问题可直接确定此即所求的点**。



即：

![img](http://img.uwayfly.com/article_mike_20200615093610_5e1fdf31b4b4.png)




### 1.2. 举例

![img](http://img.uwayfly.com/article_mike_20200615093637_89169459a892.png)



解：

![img](http://img.uwayfly.com/article_mike_20200615093703_1fbff1262fcf.png)



### 1.3. 理解

要求方程x^2^y-3=0与原点的最小距离，问题被转化为了同心圆与x^2^y-3=0什么时候相切：

![img](http://img.uwayfly.com/article_mike_20200615102933_959f9d7830df.png)



**相切就是在极小值点有相同的切线**，只要能通过数学把相切这个条件表示出来，就可以得到解。

**我们把同心圆可以看作凸函数f(x,y)=x^2^+y^2^的等高线**：

![img](http://img.uwayfly.com/article_mike_20200615103002_4ee3bf993535.png)



**把方程x^2^y-3=0看作凸函数g(x,y)=x^2^y的等高线中的一条**：



![img](http://img.uwayfly.com/article_mike_20200615103138_71e312717aef.png)



这样f的等高线，同心圆，的法线就是**▽f**：

![img](http://img.uwayfly.com/article_mike_20200615103158_932bda1c3592.png)



g的等高线的其中一条，方程x^2^y-3=0，的法线就是**▽g**

**两者相切就意味着，在切点，两者法线平行**，也就是： **▽f+λ▽g=0**

![img](http://img.uwayfly.com/article_mike_20200615103557_f4cadcfa8ad8.png)


#### 1.3.1. 代数

上面的问题形式化后，用代数表示为（subject to的意思是服从于，约束于的意思）：

![img](http://img.uwayfly.com/article_mike_20200615103710_d53f22dcdb39.png)



只需解如下方程组：

![img](http://img.uwayfly.com/article_mike_20200615103746_deb77a5a7433.png)



### 1.4. 多等式约束下的极值

比如下图

![img](http://img.uwayfly.com/article_mike_20200615103849_7966ab855de6.png)



要求f被g1=0,g2=0约束后的极值，可以证明在极值点▽f必然在▽g1, ▽g2张成的空间中。 那么上面的问题形式化后就是：

![img](http://img.uwayfly.com/article_mike_20200615104026_2b3bc8608cfe.png)



只需解如下方程组：

![img](http://img.uwayfly.com/article_mike_20200615104043_cfba80693622.png)



更一般的，如果有n个约束等式：

![img](http://img.uwayfly.com/article_mike_20200615104109_ca8fbe8ded14.png)



只需解如下方程组：

![img](http://img.uwayfly.com/article_mike_20200615104135_410dcb86416b.png)





### 1.5. 不等式约束下的极值

比如，**我们要求刚才同心圆的最小值**：

![img](http://img.uwayfly.com/article_mike_20200615104307_a5fdc7fab448.png)



**那肯定就是原点啦，半径为0肯定就是最小值了**。

从代数上看就是要求：

![img](http://img.uwayfly.com/article_mike_20200615104441_5bf97a8dbff9.png)


解：

![img](http://img.uwayfly.com/article_mike_20200615104408_3474f360d838.png)



#### 1.5.1. 情况一

我们给它添加一个不等式约束，也就是求：

![img](http://img.uwayfly.com/article_mike_20200615104722_55c92d688cbd.png)



可以看到，**这个不等式约束实际上包含了原点**：

![img](http://img.uwayfly.com/article_mike_20200615104740_6b7e7f61f47b.png)



**所以这个约束等于没有**，依然求解：

![img](http://img.uwayfly.com/article_mike_20200615104408_3474f360d838.png)



#### 1.5.2. 情况二

换一个不等式约束：

![img](http://img.uwayfly.com/article_mike_20200615104853_70279788696a.png)



不等式约束如下图所示。

**因为同心圆是凸函数的等高线**，所以等高线的值是这么排列的。

所以，在不等式约束下，**最小值是在边缘相切的地方取得，和用等式h(x,y)=x+y=-2进行约束效果是一样的**：

![img](http://img.uwayfly.com/article_mike_20200615104935_1513609aea27.png)



因此可以通过解方程组求出答案：

![img](http://img.uwayfly.com/article_mike_20200615104952_2fb08a780c82.png)



#### 1.5.3. 新增的条件

仔细研究，不等式实际上带来了新的条件。

同心圆是凸函数的等高线，等高线的值如下排列，所以在相切处，**法线也就是▽f的方向如下**（法线也就是梯度，**指向增长最快的方向，也就是等高线的值变大的方向**）。

而**凸函数h(x,y)的法线▽h也一样指向h(x,y)增长的方向，这个方向正好和▽f相反**：

![img](http://img.uwayfly.com/article_mike_20200615105630_f1db6316f0d2.png)



因此： **▽f+μ▽h=0, μ>0 其中，μ>0 就表明▽f, ▽h方向相反**。因此刚才的方程组可以再增加一个条件：

![img](http://img.uwayfly.com/article_mike_20200615105648_f4ed7b315804.png)




### 1.6. KKT条件

因此，综合上面的所有情况，可以把求如下的极值：

![img](http://img.uwayfly.com/article_mike_20200615111021_2cd6c7c6e70d.png)





通过解下面这个方程组来得到答案：

![img](http://img.uwayfly.com/article_mike_20200615111028_c4958689a401.png)



这个方程组也就是所谓的**KKT条件**。进一步解释下方程组的各个项:：

![img](http://img.uwayfly.com/article_mike_20200615111008_f08b8ef918ef.png)