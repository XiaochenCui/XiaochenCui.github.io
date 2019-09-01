---
title: 一些关于 MAC 的 paper
date: 2018-06-09 14:41:14
tags:
- cryptography
---
- [J.Bloack, P.Rogaway: CBC MACs for Arbitray-Length Messages: The Three-Key Constructions. J.Cryptology 18(2):111-131 (2005)](http://web.cs.ucdavis.edu/~rogaway/papers/3k.pdf)
 讲了 CMAC 的基础构型：three key construction
- [K.Pietrzak: A Tight Bound for EMAC. ICALP (2) 2006: 168-179](https://pdfs.semanticscholar.org/0f8a/9d5bf4ef5a3863470f3faf38da2672f0fca1.pdf)
 证明了 CBC-MAC 的超集是 PRF
<!--more-->
- [J.Block, P.Rogaway: A Block-Cipher Mode of Operation for Parallelizable Message Authentication. EUROCRYPT 2002: 384-397](https://iacr.org/archive/eurocrypt2002/23320380/pmac.ps)
 讲了 PMAC 的构造
- [M.Bellare: New Proofs for NMAC and HMAC:Security Without Collision-Resistance. CRYPTO 2006:602-619](https://eprint.iacr.org/2006/043.pdf)
 谈论了 NMAC 和 HMAC 的安全性
- [Y.Dodis, K.Pietrazk, P.Puniya: A New Mode of Operation for Block Ciphers and Length-Preserving MACs. EUROCRYPT 2008: 198-219](https://www.iacr.org/archive/eurocrypt2008/49650197/49650197.pdf)
 这篇论文角度比较新奇，先假设 AES 并不是 PRG，而只是一个 regular unpredictable function，然后在这样的前提下成功地构建出了可用于 long message 的 MAC
