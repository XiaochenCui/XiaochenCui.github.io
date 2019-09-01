---
title: Cryptography Week 1 - Programming Assignment
date: 2018-03-26 23:07:34
tags:
- cryptography
categories:
- Exercises of Cryptography
---
在 Week1 的学习中，我们已经知道 Many Time Pad 是不安全的，现在我们来动手破解它。
<!--more-->

# 简要证明

{% asset_img 02-stream-v2-annotated.001.jpeg %}

# 题目

{% asset_img topic.png %}

# 破解思路

我们首先定义合法字符集为{英文字母，[,], [.], ["], [ ]}
由于所有密文都是用同一密钥加密的，所以对于密文 $c_1$, $c_2$:
{% raw %}
$$
	\begin{align*}
        result =& c_1 \oplus c_2 \oplus x (x 为合法字符）\\
        result =& m_1 \oplus key \oplus m_2 \oplus key \oplus x (m_1, m_2, k 均为密文 c_1, c_2 以及密钥串 key 在同一位置的值）\\
	\end{align*}
$$
{% endraw %}
排除意外碰撞，当且仅当 $m_1 \equiv x$ 或 $m_2 \equiv x$ 时，result 为合法字符

# 代码

```python
import binascii
from collections import defaultdict
import string


ciphertexts_hex = [
    "315c4eeaa8b5f8aaf9174145bf43e1784b8fa00dc71d885a804e5ee9fa40b16349c146fb778cdf2d3aff021dfff5b403b510d0d0455468aeb98622b137dae857553ccd8883a7bc37520e06e515d22c954eba5025b8cc57ee59418ce7dc6bc41556bdb36bbca3e8774301fbcaa3b83b220809560987815f65286764703de0f3d524400a19b159610b11ef3e",
    ...
    "32510ba9babebbbefd001547a810e67149caee11d945cd7fc81a05e9f85aac650e9052ba6a8cd8257bf14d13e6f0a803b54fde9e77472dbff89d71b57bddef121336cb85ccb8f3315f4b52e301d16e9f52f904",
]


# Transfer cipher to bytes
ciphertexts = list(map(binascii.unhexlify, ciphertexts_hex))

# Get character range
valid_character_range = (string.ascii_letters + ".,: ").encode("ascii")

# Target cipher is the cipher we want to crack
target_cipher = ciphertexts[-1]

# dic_list stores the probability distribution of letters at each position
dic_list = [defaultdict(int) for _ in range(len(target_cipher))]

for xored_cipher in ciphertexts[:10]:
    for character_index, character in enumerate(target_cipher):
        if character_index < len(xored_cipher):
            xored_character = xored_cipher[character_index]
            # Assume each letter in turn
            for word in valid_character_range:
                if character_index < len(xored_cipher):
                    # Derivation:
                    # xor = key ^ m1 ^ key ^ m2 ^ word
                    #     = m1 ^ m2 ^ word
                    # If m1 == word:
                    # then xor = m2 (xor is valid)
                    # or m2 == word:
                    # then xor = m1 (xor is valid)
                    xor = character ^ xored_character ^ word
                    if xor in valid_character_range:
                        m2 = chr(xor)
                        key = xored_character ^ xor
                        m1 = chr(character ^ key)
                        dic_list[character_index][m2] += 1


print(''.join([max(dic, key=dic.get) for dic in dic_list]))
```

运行得到的值为：
`The sicuet cesiage is: Wrzn using a stream cipher, tever use the key more than onye`

可以看到，并没有得到准确的原文，这里有两个因素：
- 合法字符集的范围可能不准确
- 我们并不能判断 $c_1 \equiv c_2 \equiv x$ 为 $m_1$ 还是 $m_2$

dic_list 中的每个 dict 都表示了相应位置每个合法字符的可能性，通过列出每个 dict 出现频次最高的 3 个字符，我们可以还原出原文：

> The secret message is: when using a stream cipher, never use the key more than once
