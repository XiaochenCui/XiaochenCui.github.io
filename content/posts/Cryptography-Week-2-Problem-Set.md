---
title: Cryptography Week 2 - Problem Set
date: 2018-05-20 21:44:00
tags:
- cryptography
categories:
- Exercises of Cryptography
---
{% asset_img 1.png 700 %}
<!--more-->

{% raw %}
$2^{128}\approx3.4e+38$
{% endraw %}

{% asset_img 2.png 700 %}

{% asset_img 3.png 700 %}

{% asset_img 4.png 700 %}

{% raw %}
$$
	\begin{align*}
        m = 0^{64}:& \\
        &L_1 = 0^{32} R_1 \\
        &R_1 = 0^{32} \oplus F(k_1, 0^{32}) \\
        &L_2 = 0^{32} \oplus F(k_1, 0^{32}) \\
        &R_2 = 0^{32} \oplus F(k_2, 0^{32}\oplus F(k_1,0^{32})) \\
        m = 1^{32}0^{32}:& \\
        &L_1 = 0^{32} R_1 \\
        &R_1 = 1^{32} \oplus F(k_1, 0^{32}) \\
        &L_2 = 1^{32} \oplus F(k_1, 0^{32}) \\
        &R_2 = 0^{32} \oplus F(k_2, 1^{32}\oplus F(k_1,0^{32})) \\
	\end{align*}
$$
{% endraw %}
Therefore:
{% raw %}
$$
    \underset{m = 0^{64}}{L_2} \oplus \underset{m = 1^{32}0^{32}}{L_2} \equiv 1^{32}
$$
{% endraw %}

{% asset_img 5.png 700 %}

{% raw %}
$$
	\begin{align*}
        c' &= F(k, IV \oplus m_1) \\
        &= F(k, F(k, c_0) \oplus c_0 \oplus c_0) \\
        &= F(k, F(k, c_0) \oplus c_0 \oplus F(k, c_0)) \\
        &= F(k, c_0)
	\end{align*}
$$
{% endraw %}
Therefore:
{% raw %}
$$
    c_1 = c'_0
$$
{% endraw %}

{% asset_img 6.png 700 %}

{% asset_img 7.png 700 %}

{% asset_img 8.png 700 %}

{% asset_img 9.png 700 %}
