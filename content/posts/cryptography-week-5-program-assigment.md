---
title: Cryptography Week 5 - Programming Assignment
date: 2018-08-12 17:44:51
tags:
- cryptography
categories:
- Exercises of Cryptography
---
# 前言

这次我们的任务是求离散对数 (discrete log)，采用的方法是 meet in the middle

Meet in the middle 最令我们印象深刻的就是其在破解 3DES 时的表现，将暴力破解的时间复杂度减少到了 $2 ^ {56}$
<!--more-->

# 题目

{% asset_img pa.png %}

# 题解

需要注意的是，modular division 和一般除法不同，需要先求 modular inversion，然后再做 modular multiplication 得到 division

以下是代码题解：

```python
import gmpy2
from gmpy2 import (
    mpz,
    powmod,
    mul,
    invert,
)

B = 2 ** 20
p = mpz('13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084171')
g = mpz('11717829880366207009516117596335367088558084999998952205599979459063929499736583746670572176471460312928594829675428279466566527115212748467589894601965568')
h = mpz('3239475104050450443565264378728065788649097520952449527834792452971981976143292558073856937958553180532878928001494706097394108577585732452307673444020333')

hash_table = dict()
for x_1 in range(B + 1):
    key = mul(h, invert(powmod(g, x_1, p), p)) % p
    value = x_1
    hash_table[key] = value

base = powmod(g, B, p)
for x_0 in range(B + 1):
    target = powmod(base, x_0, p)
    if target in hash_table:
        break

x = x_0 * B + hash_table[target]
print('x: {}'.format(x))
```
