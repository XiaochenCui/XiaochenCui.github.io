---
title: Closed Form Expression For Fibonacci Numbers 的证明
date: 2018-07-11 07:11:39
tags:
- sicp
- number theory
categories:
- Fun with number theory
---
# 概览

此题出自 SICP 第一章练习题 1.13

# 题目

Prove that $Fib(n)$ is the closest integer to $\phi^n/\sqrt5$, where $\phi=(1+\sqrt5)/2$. Hint: Let $\psi=(1-\sqrt5)/2$. Use induction and definition of the Fibonacci numbers (see section 1.2.2) to prove that $Fib(n)=(\phi^n-\psi^n)/\sqrt5$.
<!--more-->

# 证明

## $\phi$ 和 $\psi$ 的性质

由题目所设 $\phi=(1+\sqrt5)/2$ 易得：

{% raw %}
$$
    \begin{align*}
        \phi^2 = \phi+1 \\
        1/\phi + 1 = \phi \\
    \end{align*}
$$
{% endraw %}

由 $\psi=(1-\sqrt5)/2$ 易得：

{% raw %}
$$
    \begin{align*}
        \psi^2 = \psi + 1 \\
        1/\psi + 1 = \psi\\
    \end{align*}
$$
{% endraw %}

## 归纳证明法证明 $Fib(n)=(\phi^n-\psi^n)/\sqrt5$

$\text{for } n=0:$
{% raw %}
$$
    \begin{align*}
        (\phi^n-\psi^n)/\sqrt5 =& (\phi^0-\psi^0)/\sqrt5 \\
                               =& 0 \\
    \end{align*}
$$
{% endraw %}

$\text{for } n=1:$
{% raw %}
$$
    \begin{align*}
        (\phi^n-\psi^n)/\sqrt5 =& (\phi^1-\psi^1)/\sqrt5 \\
                               =& 1 \\
    \end{align*}
$$
{% endraw %}

$\text{for } n=2:$
{% raw %}
$$
    \begin{align*}
        (\phi^n-\psi^n)/\sqrt5 =& (\phi^2-\psi^2)/\sqrt5 \\
                               =& 1 \\
    \end{align*}
$$
{% endraw %}

现在开始采用归纳证明法

假设下列两个等式成立：

{% raw %}
$$
    \begin{align*}
        Fib(n)   =& (\phi^n-\psi^n)/\sqrt5 \\
        Fib(n-1) =& (\phi^{n-1}-\psi^{n-1})/\sqrt5 \\
    \end{align*}
$$
{% endraw %}

我们现在需要证明以下等式成立：

{% raw %}
$$
    \begin{align*}
        Fib(n+1) =& (\phi^{n+1}-\psi^{n+1})/\sqrt5 \\
    \end{align*}
$$
{% endraw %}

通过 Fibonacci 序列的性质与之前提到的 $\phi$ 和 $\psi$ 的性质，可给出如下的证明过程：

{% raw %}
$$
    \begin{align*}
        Fib(n+1) =& Fib(n) + Fib(n-1) \\
                 =& (\phi^n-\psi^n)/\sqrt5 + (\phi^{n-1}-\psi^{n-1})/\sqrt5 \\
                 =& ((\phi^n-\psi^n) + (\phi^{n-1}-\psi^{n-1}))/\sqrt5 \\
                 =& ((\phi^n+\phi^{n-1}) - (\psi^n+\psi^{n-1}))/\sqrt5 \\
                 =& (\phi^{n+1} * (\phi^{-1}+\phi^{-2}) - \psi^{n+1} * (\psi^{-1}+\psi^{-2})) / \sqrt5 \\
                 =& (\phi^{n+1} * \phi^{-1} * (1+\phi^{-1}) - \psi^{n+1} * \psi^{-1} * (1+\psi^{-1})) / \sqrt5 \\
                 =& (\phi^{n+1} * 1/\phi * (1+1/\phi) - \psi^{n+1} * 1/\psi * (1+1/\psi)) / \sqrt5 \\
                 =& (\phi^{n+1} * 1/\phi * \phi - \psi^{n+1} * 1/\psi * \psi) / \sqrt5 \\
                 =& (\phi^{n+1} - \psi^{n+1}) / \sqrt5 \\
    \end{align*}
$$
{% endraw %}

## 最后一步

我们首先简单转化一下之前证明过的等式：

{% raw %}
$$
    \begin{align*}
        Fib(n) =& (\phi^n-\psi^n)/\sqrt5 \\
        Fib(n) =& \phi^n/\sqrt5 - \psi^n/\sqrt5 \\
        \phi^n/\sqrt5 - Fib(n) =& \psi^n/\sqrt5 \\
    \end{align*}
$$
{% endraw %}

做以上变换是因为我们的目的是证明 $Fib(n)$ 和 $\phi^n/\sqrt5$ 之间的关系。现在我们需要做的就是证明这两者的差总是小于 $1/2$。即证明：

{% raw %}
$$
    \begin{align*}
        \psi^n/\sqrt5 \leq 1/2
    \end{align*}
$$
{% endraw %}

即证明：

{% raw %}
$$
    \begin{align*}
        \psi^n \leq \sqrt5/2
    \end{align*}
$$
{% endraw %}

由于 $\psi=(1-\sqrt5)/2$，我们可以计算求得：

{% raw %}
$$
    \begin{align*}
        \psi \approx -0.618304
    \end{align*}
$$
{% endraw %}

由于 $Fib(n)$ 总是整数且 $n \geq 0$，$|\psi| < 1$，可以得出：

{% raw %}
$$
    \begin{align*}
        \psi^n \leq 1
    \end{align*}
$$
{% endraw %}

同时：

{% raw %}
$$
    \begin{align*}
        \sqrt5/2 \approx 1.118
    \end{align*}
$$
{% endraw %}

因为 $\psi^n \leq 1$，且 $\sqrt5/2 > 1$，所以：

{% raw %}
$$
    \begin{align*}
        \psi^n < \sqrt5/2
    \end{align*}
$$
{% endraw %}

因此，$Fib(n)$ 是最接近 $\psi^n/\sqrt5$ 的整数。

完。

# 参考

- [Bill the Lizard](http://www.billthelizard.com/2009/12/sicp-exercise-113-fibonacci-and-golden.html)
- [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number#Closed-form_expression)
- [Binet's Formula - Art of Problem Solving](https://artofproblemsolving.com/wiki/index.php?title=Binet%27s_Formula)
