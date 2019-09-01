---
title: Counting Change 问题的详细分析及解答
date: 2018-07-08 14:26:39
tags:
- sicp
- algorithm
- dynamic programming
---
# 概述

Counting change 问题来源于 SICP 第一章 1.2 节，书中给出了树形递归解法，并将迭代解法作为了课后练习。本文将会详细解答此题的迭代解法并给出运行时间的对比。
<!--more-->

# 题目

给了半美元、四分之一美元、10 美分、5 美分和 1 美分的硬币，将 1 美元换成零钱，一共有多少种不同方式？

# 消除递归

消除递归最通用的方法是使用辅助栈 (auxiliary stack)。简单来说就是将参数推入栈中，然后开始迭代，直到得到我们想要的结果。

具体到本题，我们将使用自底向上的动态规划 (dynamic programming) 来解决问题，同时因为我们身（天）经（天）百（刷）战（题），很容易在给出一般性的动态规划解法之后进行优化，将所需的栈空间压缩到 O(1)。

# 问题分析

设 $f(x, n)$ 为使用最小面值的 n 种硬币换 x 美分的方法总数。

我们从 $f(x, 1)$ 开始分析。此时 $n=1$，表示只使用 1 美分硬币换 x 美分。显然得出，$f(0, 1)=1$。同时（a 为最小面值硬币的面值）：

{% raw %}
$$
    \begin{align*}
        \underset{x>0}{f(x, 1)}=\left\{
                                    \begin{array}{ll}
                                        1, & \text{for } x \bmod a \equiv 0\\
                                        0, & \text{for } x \bmod a \neq 0\\
                                    \end{array}
                                \right.
    \end{align*}
$$
{% endraw %}

因为此题中最小面值的硬币面值为 1 美分，所以 $\underset{x>0}{f(x, 1)}=1$

接下来，我们开始推导到 n=2 时到情况，即使用面值最小的 2 种硬币换 x 美分。设 a 为面值第二小的硬币的面值（在此题中为 5）。则有：

{% raw %}
$$
    \begin{align*}
        f(x, 2)=\left\{
                    \begin{array}{ll}
                        f(x, 1)+f(x-a, 2), & \text{for } x > 0\\
                        1, & \text{for } x \equiv 0\\
                        0, & \text{for } x < 0\\
                    \end{array}
                \right.
    \end{align*}
$$
{% endraw %}

同理可给出一般性的方程：$f(x, n)=f(x, n-1)+f(x-a, n)$（其中 a 为 n 种硬币中最大面值硬币的面值）。

# 代码实现

## 实现

在这里我们给出 scheme 的实现，空间占用为 $O(n^2)$，时间复杂度为 $O(n^2)$

```scheme
(define (count-change amount)
  (cc amount 5))

(define (cc amount n)
  (cond ((< amount 0) 0)
        ((= n 1) 1)
        (else (+ (cc amount
                     (- n 1))
                 (cc (- amount (get-value n))
                     n)))))

(define (get-value n)
  (cond ((= n 1) 1)
        ((= n 2) 5)
        ((= n 3) 10)
        ((= n 4) 25)
        ((= n 5) 50)))
```

## 改进

简单改进一下，即可将空间占用降低至 $O(1)$，同时时间复杂度不变

```scheme
待填坑
```

# 与原有树形递归解法的比较

## 运行时间

我们在硬件相同、运行环境相同的情况下分别用这两种解法计算 (count-change 2000)

树形递归解法：

```bash
$ time racket -t chapter-1/count-change-tree-recusive.scm
11712101
racket -t chapter-1/count-change-tree-recusive.scm  74.17s user 0.25s system 99% cpu 1:14.45 total
```

迭代解法 (DP)：

```bash
$ time racket -t chapter-1/count-change-iteration.scm
11712101
racket -t chapter-1/count-change-iteration.scm  0.40s user 0.08s system 95% cpu 0.501 total
```

可以看到，在 x 为 2000 时，树形递归解法消耗的时间是迭代解法的 148 倍。且由于前者的时间复杂度为指数级别，随着 x 的增加，其消耗时间的增长速度会越来越快。

# 参考

- [SICP making change](https://stackoverflow.com/questions/1485022/sicp-making-change)
