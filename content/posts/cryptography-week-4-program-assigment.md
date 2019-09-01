---
title: Cryptography Week 4 - Programming Assignment
date: 2018-06-28 20:54:02
tags:
- cryptography
categories:
- Exercises of Cryptography
---
这次我们的目标是利用 [Padding oracle attack](https://en.wikipedia.org/wiki/Padding_oracle_attack) 破解加密过的消息，padding oracle attack 的原理相对来讲比较简单，但是在具体的编程破解过程中需要注意几个问题：

- 发送 chosen ciphertext 的间隔时间不能太短，不然会收到 500 响应
- 在第一个字节被成功 decrypt 之后，可根据 padding 格式跳过一些字节，节省一些时间
<!--more-->
- 当一个 block 被完全 decrypt 之后，需要将 ciphertext 的最后一个 block 丢弃，使当前 decrypt 的 message block 被服务器认为是最后一个 message block，这样才能利用 padding oracle
- 除以上几点外还有一些 trival 的小坑需要留心，在此不做赘述

{% asset_img pp.png %}

最终代码：[github](https://github.com/XiaochenCui/cryptography-homework/blob/master/week_4/padding_oracle.py)
