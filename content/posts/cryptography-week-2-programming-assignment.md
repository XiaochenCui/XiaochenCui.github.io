---
title: Cryptography Week 2 - Programming Assignment
date: 2018-06-05 09:33:29
tags:
- cryptography
categories:
- Exercises of Cryptography
---
这次我们的任务是实现 CBC 和 CTR，要求用 AES 做为 PRF，所以我们只需要使用 AES 的加密算法。
<!--more-->

{% asset_img  pa.png%}

在这里我们仅贴出核心代码，完整代码在：https://github.com/XiaochenCui/cryptography-homework

# CBC (Cipher Block Chaining)

```python
def encrypt(msg, key, iv):
    cipher = AES.new(key, AES.MODE_ECB)
    cipher_block = iv
    ciphertext = iv
    for msg_block in msg_block_generator(msg, padding=True):
        cipher_block = cipher.encrypt(xor(cipher_block, msg_block))
        ciphertext += cipher_block
    return ciphertext


def decrypt(cipher_text, key):
    cipher = AES.new(key, AES.MODE_ECB)
    iv, cipher_text = cipher_text[:16], cipher_text[16:]
    msg = b''
    for cipher_block in cipher_block_generator(cipher_text):
        msg_block = xor(cipher.decrypt(cipher_block), iv)
        iv = cipher_block
        msg += msg_block
    if msg[-16:] == b'\x16' * 16:
        return msg[:-16]
    pad_bytes = msg[-1]
    reminder = len(msg) - pad_bytes
    if msg[reminder:] == bytes([pad_bytes]) * pad_bytes:
        return msg[:reminder]
    else:
        print('Cipher_text is invalid')
```

# CTR (Counter mode)

```python
def encrypt(msg, key, iv):
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = b''
    for i, msg_block in enumerate(msg_block_generator(msg, padding=False)):
        cipher_block = cipher.encrypt(byte.add(iv, i))
        cipher_block = byte.xor(msg_block, cipher_block)
        ciphertext += cipher_block
    return ciphertext


def decrypt(cipher_text, key):
    iv, cipher_text = cipher_text[:16], cipher_text[16:]
    cipher = AES.new(key, AES.MODE_ECB)
    msg = b''
    for i, cipher_block in enumerate(cipher_block_generator(cipher_text)):
        iv_encrypted = cipher.encrypt(byte.add(iv, i))
        msg_block = byte.xor(cipher_block, iv_encrypted)
        msg += msg_block
    return msg
```
