---
title: Cryptography Week 3 - Programming Assignment
date: 2018-06-12 07:44:36
tags:
- cryptography
categories:
- Exercises of Cryptography
---
本周的任务是实现对大文件的分块哈希，使得浏览器可以在仅收到一部分文件的时候进行 MAC 校验（假设初始 MAC 已通过可信赖的途径分发给浏览器）
<!--more-->

{% asset_img pa.png %}

代码如下：

```python
import binascii
from Crypto.Hash import SHA256


def file_block_generator(content):
    block_count, reminder = divmod(len(content), 1024)
    for block_index in range(block_count + 1)[::-1]:
        start = block_index * 1024
        end = 1024 * (block_index + 1)
        if end > len(content):
            end = len(content)
        block = content[start:end]
        yield block


def blocked_hash(content):
    h = None
    for block in file_block_generator(content):
        if h:
            block = block + h
        h = SHA256.new()
        h.update(block)
        h = h.digest()
    return h


if __name__ == '__main__':
    import sys
    f = open(sys.argv[1], 'rb')
    h = blocked_hash(f.read())
    print(binascii.hexlify(h))
```

由于本题比较简单，在此不做过多讲解
