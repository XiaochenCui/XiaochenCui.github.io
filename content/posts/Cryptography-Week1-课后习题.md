---
title: Cryptography Week 1 - Problem Set
date: 2018-01-27 14:17:56
tags:
- cryptography
categories:
- Exercises of Cryptography
---
{% asset_img 1.png 700 %}

先压缩再加密，效率更高。压缩的过程相当于丢掉了一部分冗余信息，使得总信息量减少，从而减少了加密的工作量。

<!--more-->

{% asset_img 2.png %}

- 选项 1 不对，因为 G'(k) 可预测 (predictable)
- 选项 2 正确
- 选项 3 正确
- 选项 4 正确（相当于对 G(k) 取非）
- 选项 5 不正确，最后一位可预测
- 选项 6 不正确，因为其总是生成相同的 key

{% asset_img 3.png %}

计算过程：

{% raw %}
$$
	\begin{align*}
		Adv_{PRG}(A,G) &= \left|\underset{r\leftarrow{\{0,1\}^n}}{Pr(A(r)}=1) - \underset{k\leftarrow{K}}{Pr(A(G'(k))}=1)\right|\\
		&= \left|\underset{r\leftarrow{\{0,1\}^n}}{Pr(LSB(r)}=1) - \underset{k\leftarrow{K}}{Pr(LSB(G(k_1)\wedge G(k_2))}=1)\right|\\
		&= \left|\frac{1}{2} - \frac{1}{4}\right|\\
		&= \frac{1}{4}
	\end{align*}
$$
{% endraw %}

{% asset_img 4.png %}

{% asset_img 5.png %}

此题应该选第一个选项

{% asset_img 6.png %}

{% asset_img 7.png %}

{% asset_img 8.png %}

{% asset_img 9.png %}

{% asset_img 10.png %}
