---
title: 一些关于 Authenticated Encryption 的 paper
date: 2018-06-18 21:12:28
tags:
- cryptography
---
- [The Order of Encryption and Authentication for Protecting Communications, H.Krawczyk, Crypto 2001.](https://iacr.org/archive/crypto2001/21390309.pdf)
 比较了 encrypt-then-MAC 和 MAC-then-encrypt
- [Authenticated-Encryption with Associated-Data, P.Rogaway, Proc. of CCS 2002.](http://web.cs.ucdavis.edu/~rogaway/papers/ad.pdf)
 讨论了 OCB
 <!--more-->
- [Password Interception in a SSL/TLS Channel, B.Canvel, A.Hiltgen, S.Vaudenay, M.Vuagnoux, Crypto 2003.](https://www.iacr.org/cryptodb/archive/2003/CRYPTO/1069/1069.pdf)
 介绍了 padding oracle attack
- [Plaintext Recovery Attacks Against SSH, M.Albrecht, K.Paterson and G.Watson, IEEE S&P 2009.](http://www.isg.rhul.ac.uk/~kp/SandPfinal.pdf)
 介绍了 length attack
- [Problem areas for the IP security protocols, S.Bellovin, Usenix Security 1996.](https://www.cs.columbia.edu/~smb/papers/badesp.pdf)
 介绍了一些对于没有提供 integrity 而只是提供 CPA security 的协议的攻击方法，并借此告诉我们在加密中只提供 CPA security 是不安全的
