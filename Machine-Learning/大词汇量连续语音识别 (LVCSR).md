- [1. 大词汇量连续语音识别 (LVCSR)](#1-大词汇量连续语音识别-lvcsr)
  - [1.1. LVCSR概述](#11-lvcsr概述)
  - [1.2. 每一个HMM模型所表达的“单词”是什么？](#12-每一个hmm模型所表达的单词是什么)
  - [1.3. 如何对声音文件做时间轴的划分并搜索最佳“单词”组合？](#13-如何对声音文件做时间轴的划分并搜索最佳单词组合)
  - [1.4. VITERBI搜索的一种： Two-Level Dynamic Programming](#14-viterbi搜索的一种-two-level-dynamic-programming)
  - [1.5. 如何构造语言模型？](#15-如何构造语言模型)
  - [1.6. 结合深度网络模型的语音识别](#16-结合深度网络模型的语音识别)
    - [1.6.1. DNN-HMM 与 GMM-HMM对比](#161-dnn-hmm-与-gmm-hmm对比)
    - [1.6.2. DNN-HMM 理论推导](#162-dnn-hmm-理论推导)

## 1. 大词汇量连续语音识别 (LVCSR)

### 1.1. LVCSR概述

大词汇量连续语音识别 （Large-scale Vocabulary Continuous Speech Recognition, LVCSR）

- 问题1. **每一个HMM模型所表达的“单词”是什么？**
- 问题2. 在识别流程中**如何对测试声音文件做时间轴的划分**，使每一个分段（SEGMENT）对应一个“单词”？
- 问题3. **如何搜索最佳的“单词”组合？**
- 问题4. **如何构造语言模型 (Language Model)?**



**大词汇量，就是想说什么就说什么**。
**连续语音，就是想怎么说就怎么说，想说多长就说多长**。



### 1.2. 每一个HMM模型所表达的“单词”是什么？

![img](http://img.uwayfly.com/article_mike_20200609150239_d15a0e092ca4.png)

三连音（Triphone）示意图



英语中有效的Triphone个数大致在55000左右（过多，需要简化！）

三连音，就是about、above这种建的是同一个模型。

**不仅单词内要建模，单词间也要建模**。也就是把所有的三连音穷举一遍。

![img](http://img.uwayfly.com/article_mike_20200609150501_de7405877aec.png)

上图为多个Triphone 合并（Tying）



**每个三连音模型是5个状态，silence=>三连音=>silence**

多个triphone联合的训练，降低了triphone的数量。同时在单个triphone里，也把共同的状态联合起来增加它的数据。

![img](http://img.uwayfly.com/article_mike_20200609150706_49c82fdb76a0.png)



**为了建模的方便，把相似的合到了一起，比如wiy和riy**。**识别的时候是根据上下文拆开。**

![img](http://img.uwayfly.com/article_mike_20200609150730_8b9c1a9b508d.png)

上图为多个Triphone 联合训练（Tying）



**语言模型：猜上下文的词，比如说了一个“我”，接下来说啥**。

**汉语中Triphone个数：音节内270多个，音节间3800多个**，这是包含声调后的结果 。这就意味着，**汉语构造声学模型比英语更容易**。





### 1.3. 如何对声音文件做时间轴的划分并搜索最佳“单词”组合？

**这是一个搜索问题，搜索就是在由语句构成的空间中，寻找最优句子的过程**，也就是利用已掌握的声学知识、语音学知识、语言模型及语法语义知识等，在状态（指词组、词、HMM的状态）空间中找到最优的状态序列。

搜索方法有很多种，这里归纳如下：

1. VITERBI搜索 （有多种形式）
2. A*搜索
3. 随机搜索

语音：

![img](http://img.uwayfly.com/article_mike_20200609151120_1d3fc2b0a56a.png)


**待求变量：L, 所有t, 所有w。**


### 1.4. VITERBI搜索的一种： Two-Level Dynamic Programming



![img](http://img.uwayfly.com/article_mike_20200609151433_aa0962287c24.png)



**英语里V有10000个左右**

**起始位置是0、终止于e、有*l*个单词的最佳匹配**，等于，**终止于b-1、有*l-1*个单词，加上，b到e、有1个单词**

***l*有上界，就是固定时间内说的triphone数量有限**。

![img](http://img.uwayfly.com/article_mike_20200609151611_bb8a71b24f19.png)



### 1.5. 如何构造语言模型？

**定义 （N-gram）: 一个单词出现的概率，只与它前面的N个单词相关。**

P(w1, w2, w3, … , wn)=P(w1)P(w2|w1)P(w3|w1w2)P(w4|w1w2w3)…P(wn|w1w2…wn-1)



（1）在1-gram模型下

P(w1, w2, w3, … , wn)=P(w1)P(w2|w1)P(w3|w1w2)P(w4|w1w2w3)…P(wn|w1w2…wn-1)

≈P(w1)P(w2|w1)P(w3|w2)P(w4|w3)…P(wn|wn-1)

（2）在2-gram模型下：

P(w1, w2, w3, … , wn)=P(w1)P(w2|w1)P(w3|w1w2)P(w4|w1w2w3)…P(wn|w1w2…wn-1)

≈P(w1)P(w2|w1)P(w3|w1w2)P(w4|w2w3)…P(wn|wn-2wn-1)

（3）在3-gram模型下：

P(w1, w2, w3, … , wn)=P(w1)P(w2|w1)P(w3|w1w2)P(w4|w1w2w3)…P(wn|w1w2…wn-1)

≈P(w1)P(w2|w1)P(w3|w1w2)P(w4|w1w2w3)…P(wn|wn-3wn-2wn-1)



**在N-Gram 中， N越大，模型越复杂，对训练样本需求越多**。当然，样本足够情况下，**N越大，训练后效果会更好**。因此需要选一个合适的N来平衡准确度与样本数量要求。



**一般来说，英语N=3, 汉语N=4**。

**N-gram用文本训练就可以**，不需要用语音。




### 1.6. 结合深度网络模型的语音识别



![img](http://img.uwayfly.com/article_mike_20200609153401_20b3d5307a14.png)

**DNN-HMM模型框架**



#### 1.6.1. DNN-HMM 与 GMM-HMM对比



假设输入语音为{x_1,x_2,…,x_T}，且HMM有N个状态。

1. GMM-HMM (Gaussian Mixture Models-Hidden Markov Models) 是用**GMM**来模拟概率密度函数**p(xt|si),** 其中i=1,2,…,N。

2. DNN-HMM (Deep Neural Networks-Hidden Markov Models ) 是用**DNN**来模拟概率密度函数**p(si|xt)**，其中i=1,2,…,N

GMM-HMM模拟的是bjo



#### 1.6.2. DNN-HMM 理论推导



![img](http://img.uwayfly.com/article_mike_20200609153634_6ec8884fc1df.png)



由于p(xt)对不同的HMM模型都不变，在识别过程中可以忽略，因此我们可以简化如下：



![img](http://img.uwayfly.com/article_mike_20200609153706_06992e35bcd5.png)



在识别中，某段语音属于某个“单词”w 是这样判断的：



![img](http://img.uwayfly.com/article_mike_20200609153754_6b60a73bed8c.png)



其中p(w)表示某个“单词”w 出现的先验概率，可以通过统计获得。而

![img](http://img.uwayfly.com/article_mike_20200609153826_b3a25e0148d7.png)



最终决策过程：

![img](http://img.uwayfly.com/article_mike_20200609153925_e0dcda035bff.png)



问题：**如何获得π(q0), aq<sub>t−1</sub>q<sub>t</sub>, p(qt)和p(qt|xt)?**

回答：首先训练一个GMM-HMM模型，**由GMM-HMM模型获得π(q0), aqt−1qt**。 通过**GMM-HMM预测每个xt的标签qt，统计获得p(qt)**。最后用深度网络获得p(qt|xt)。

> Dong Yu and Li Deng, Automatic Speech Recognition: A Deep Learning Approach, Springer, 2014. (Chapter 6)



![img](http://img.uwayfly.com/article_mike_20200609154406_e8f11c098cfa.png)

上图为算法流程



实验结果 （9层神经网络，用自编码器初始化）

![img](http://img.uwayfly.com/article_mike_20200609154517_703e9e9f98cf.png)



![img](http://img.uwayfly.com/article_mike_20200609154529_305244c7537e.png)