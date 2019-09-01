---
title: Redis 学习资料（持续更新中）
date: 2018-04-30 23:11:04
tags:
- redis
---
本文将会整理一些对 Redis 使用者、学习者有用的资料

# Source Code

- [redis](https://github.com/antirez/redis)
- [redis-3.0-annotated](https://github.com/huangz1990/redis-3.0-annotated)
 带有详细注释的 Redis 3.0 代码
<!--more-->

# Books

- [Redis 实战](https://book.douban.com/subject/26612779/)
 可作为 Redis 初学者使用 Redis 的随身手册，对于常见的使用场景均有概括，可以帮助大家更好地利用 Redis 的各种特性构建出更快速、更稳定的应用程序
- [Redis 设计与实现](https://book.douban.com/subject/25900156/)
 本书基于 Redis 3.0 源码，对于 Redis 主要模块及数据结构均有细致的讲解，且这些模块到目前为止均没有大的变动（ziplist 除外）。总体来讲深入浅出，非常值得一看

# Archives

## Redlock

- [Distributed locks with Redis](https://redis.io/topics/distlock)
- [How to do distributed locking - Martin Kleppmann](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
- [Is Redlock safe? - antirez](http://antirez.com/news/101)
- [基于 Redis 的分布式锁到底安全吗（上）？](http://zhangtielei.com/posts/blog-redlock-reasoning.html)
- [基于 Redis 的分布式锁到底安全吗（下）？](http://zhangtielei.com/posts/blog-redlock-reasoning-part2.html)

## RESP(Redis Serialization Protocol)

- [Redis Protocol specification](https://redis.io/topics/protocol)
- [How to talk raw Redis](https://www.compose.com/articles/how-to-talk-raw-redis/)

## HyperLogLog

- [Redis new data structure: the HyperLogLog](http://antirez.com/news/75)
- [深度探索 Redis HyperLogLog 内部数据结构](https://zhuanlan.zhihu.com/p/43426875)
- [Sketch of the Day: HyperLogLog — Cornerstone of a Big Data Infrastructure
](https://research.neustar.biz/2012/10/25/sketch-of-the-day-hyperloglog-cornerstone-of-a-big-data-infrastructure/)
- [HyperLogLog: the analysis of a near-optimal cardinality estimation algorithm](http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf)
- [HyperLogLog in Practice: Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm](http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf)

## Persistence

- [Redis persistence demystified](http://oldblog.antirez.com/post/redis-persistence-demystified.html)

## RDB

- [Redis RDB Dump File Format](https://github.com/sripathikrishnan/redis-rdb-tools/wiki/Redis-RDB-Dump-File-Format)
- [Redis RDB Version History](https://github.com/sripathikrishnan/redis-rdb-tools/blob/master/docs/RDB_Version_History.textile)

## MessagePack

- [MessagePack: It's like JSON. but fast and small.](https://msgpack.org/)
- [Redis Lua scripting: several security vulnerabilities fixed](http://antirez.com/news/119)
- [antirez/lua-cmsgpack: A self contained Lua MessagePack C implementation.](https://github.com/antirez/lua-cmsgpack)

# Maillists

- [Redis DB](https://groups.google.com/forum/#!forum/redis-db)
- [redis-dev](https://groups.google.com/forum/#!forum/redis-dev)

# Twitter

- [@redisfeed](https://twitter.com/redisfeed)
- [@antirez](https://twitter.com/antirez)

待补充
