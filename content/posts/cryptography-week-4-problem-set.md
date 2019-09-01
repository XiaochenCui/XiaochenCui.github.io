---
title: Cryptography Week 4 - Problem Set
date: 2018-06-28 20:23:36
tags:
- cryptography
categories:
- Exercises of Cryptography
---
{% asset_img 1.png 700 %}
我们可以从 [Padding oracle attack](https://en.wikipedia.org/wiki/Padding_oracle_attack) 中找到伪造密文的思路：
设：$1 \oplus x = 5$, IV 中的对应字节为 $y$
则：当 $y' = y \oplus x$ 时，$y \oplus 1 \equiv y' \oplus 5$
所以：将 $y$ 更改为 $y'$ 可使 message 中的相应字节变更为 5
<!--more-->

{% asset_img 2.png 700 %}
第二个选项中提供的加密系统由于不会输出 bottom，所以一定不提供 authenticated encryption
第三个选项中的加密系统只需保持 $c_1 \equiv c_2$，即可成功进行 chosen ciphertext attack

{% asset_img 3.png 700 %}
Dan Boneh 教授已经强调过无数次："Never implements encrypt method by yourself"

4 ~ 10 题都比较简单，在此不做讲解
{% asset_img 4.png 700 %}

{% asset_img 5.png 700 %}

{% asset_img 6.png 700 %}

{% asset_img 7.png 700 %}

{% asset_img 8.png 700 %}

{% asset_img 9.png 700 %}

{% asset_img 10.png 700 %}
