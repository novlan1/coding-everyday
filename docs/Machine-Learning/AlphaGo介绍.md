- [1. AlphaGo介绍](#1-alphago介绍)
  - [1.1. 两篇论文](#11-两篇论文)
  - [1.2. 深度策略网络 pσ : (Supervised Learning Policy Network)](#12-深度策略网络-pσ--supervised-learning-policy-network)
  - [1.3. 深度策略网络 pρ : (Reinforcement Learning Policy Network)](#13-深度策略网络-pρ--reinforcement-learning-policy-network)
  - [1.4. 深度策略网络pπ: (Rollout Policy Network)](#14-深度策略网络pπ-rollout-policy-network)
  - [1.5. 深度估值网络vθ: (Rollout Policy Network)](#15-深度估值网络vθ-rollout-policy-network)
  - [1.6. 下棋方法 -- 蒙特卡洛树搜索 （Monte Carlo Tree Search）：](#16-下棋方法----蒙特卡洛树搜索-monte-carlo-tree-search)
  - [1.7. AlphaGo Zero 的改进](#17-alphago-zero-的改进)


## 1. AlphaGo介绍

### 1.1. 两篇论文

1. David Silver et al., Mastering the Game of Go with Deep Neural Networks and Tree Search, Nature, 2015.
2. David Silver et al., Mastering the Game of Go without Human Knowledge,Nature, 2017.



三个深度策略网络 (Policy Networks),一个深度估值网络(Value Network)

![img](http://img.uwayfly.com/article_mike_20200606155459_f78b8aebe49f.png)


### 1.2. 深度策略网络 pσ : (Supervised Learning Policy Network)

- **输入：当前棋盘状态**。
- **输出：下一步的走法**。
- 训练数据： **KGS Go SERVER上的 三亿个样本**。
- 网络设置： 13层深度网络。
- 输入的特征如下图

![img](http://img.uwayfly.com/article_mike_20200606160023_850a11766fce.png)



- 结果：**57%正确率，3ms一步**

这里的正确率指，通过棋盘的状态预测下一步走棋，**判断是否和高手下的是否一致**。57%是很高的数字，因为上一次这样走、下一次还这样走的可能性比较低。

具体参数如下：

![img](http://img.uwayfly.com/article_mike_20200606155854_2d61da8e981f.png)



优化分析 ：

![img](http://img.uwayfly.com/article_mike_20200606160104_ea06efab911b.png)



棋盘特征：


![img](http://img.uwayfly.com/article_mike_20200606160151_94cf83f97332.png)




### 1.3. 深度策略网络 pρ : (Reinforcement Learning Policy Network)

1. **网络结构、输入输出与 pσ 完全一样**。
2. **一开始初始化网络参数ρ = σ**
3. 参数更新策略，**自己和自己下棋，不断下下去直到分出胜负**。

![img](http://img.uwayfly.com/article_mike_20200606160409_4c6a2764f1e2.png)



上式中， **pρ(at|st) 为在第t步走下一步at的概率**，当胜利时，Zt 等于1，否则 Zt 等于0。

强化学习训练策略：

![img](http://img.uwayfly.com/article_mike_20200606161021_bfa66eca11ff.png)

**对手是比他差一点，然后他提升一点，让他的对手也提升一点**。

训练细节和结果：


![img](http://img.uwayfly.com/article_mike_20200606160934_d8733986c86e.png)


### 1.4. 深度策略网络pπ: (Rollout Policy Network)

1. 输入特征比pσ 和 pρ少。

![img](http://img.uwayfly.com/article_mike_20200606160844_69a9d3004858.png)


2. 网络结构更简单。

换句话说，**这个网络以牺牲准确率换取速度。24.2%正确率，2um一步**。



### 1.5. 深度估值网络vθ: (Rollout Policy Network)

1. **输入：当前棋盘状态 （与 pσ输入一样），以及执黑或执白**。
2. **输出： 获胜的概率（一个0到1的数）**
3. 参数更新策略：

![img](http://img.uwayfly.com/article_mike_20200606161238_65b0904e215c.png)



用pρ来预测z



步骤：

![img](http://img.uwayfly.com/article_mike_20200606161343_eeb341e36bb1.png)







### 1.6. 下棋方法 -- 蒙特卡洛树搜索 （Monte Carlo Tree Search）：

**多次模拟未来棋局，然后选择在模拟中获胜次数最多的走法**

![img](http://img.uwayfly.com/article_mike_20200606161424_7a7e46cdc1d7.png)



蒙特卡洛树搜索 （Monte Carlo Tree Search）最终确定走棋。

![img](http://img.uwayfly.com/article_mike_20200606161514_db24d97892ba.png)


1. **一个是专家的意见，一个是真实的走法，兰姆达是其平衡因子**。
2. **除以N是赋予其随机性，就是不要陷入局部走法，给其他位置以一定的机会**



![img](http://img.uwayfly.com/article_mike_20200606163241_a9fd19c3b28b.png)



### 1.7. AlphaGo Zero 的改进

1. 完全不需要人类棋谱，**采用自己和自己下棋的方式学习**。
2. **将走棋网络和估值网络合并为一个网络**：

![img](http://img.uwayfly.com/article_mike_20200606161635_3d05d0c623ed.png)



![img](http://img.uwayfly.com/article_mike_20200606161654_f1a5e015f598.png)

**自学习过程和神经网络训练过程**


![img](http://img.uwayfly.com/article_mike_20200606161731_31b22c595598.png)

**标签π的生成**



![img](http://img.uwayfly.com/article_mike_20200606161822_5688fb191b98.png)

**目标函数**
