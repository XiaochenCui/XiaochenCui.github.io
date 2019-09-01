---
title: Cryptography Week 5 - Problem Set
date: 2018-08-12 13:42:10
tags:
- cryptography
categories:
- Exercises of Cryptography
---
# Overview

本章的主要内容是密钥交换 (key exchange) 和数论 (number theory)

密钥交换部分先后讲了 TTP (Trusted third parties), Merkle Puzzle 和 Diffie-Hellman protocol

数论部分的核心概念是 Modular arithmetic，并由此展开 Fermat's theorem, Euler's theorem 等定理，同时辅以 order, generator 等概念来做 Modular arithmetic
<!--more-->

# Exercise explanation

{% asset_img 1.png 700 %}
此题比较简单，要注意两点：
1. 密钥不能以明文形式发送，所以发送的应该是 ticket 而不是 key
1. 三者所持有的密钥应该相同

{% asset_img 2.png 700 %}
1 和 4 两个选项需要求解离散对数，是正确选项

{% asset_img 3.png 700 %}

{% asset_img 4.png 700 %}
由于 pk 是公开的，所以对 ciphertext 加 MAC 不能防止 MIMA

{% asset_img 5.png 700 %}
本题应使用 Extended Euclidean Algorithm

{% asset_img 6.png 700 %}
求解 Modular inversion 同样可以用 Extended Euclidean Algorithm

{% asset_img 7.png 700 %}
使用 Euler's theorem

{% asset_img 8.png 700 %}
使用 Fermat's theorem

{% asset_img 9.png 700 %}
使用 Fermat's theorem

{% asset_img 10.png 700 %}

{% asset_img 11.png 700 %}

{% asset_img 12.png 700 %}

{% asset_img 13.png 700 %}

{% asset_img 14.png 700 %}

{% asset_img 15.png 700 %}
