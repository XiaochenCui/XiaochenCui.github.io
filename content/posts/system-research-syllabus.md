---
title: "System Research Syllabus"
date: 2019-10-08T13:56:32+08:00
draft: true
---

The knowledge involved in distributed database systems (DBMS or HTAP).

Comments and suggestions are welcomed.

# Why we need DBMS

- [A Relational Model of Data for Large Shared Data Banks](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)

# Database Architecture

- [Architecture of a Database System](http://db.cs.berkeley.edu/papers/fntdb07-architecture.pdf)
- [Column Stores vs Row Stores : How Different Are They Really](https://pdfs.semanticscholar.org/1024/da80d950b8d3142ace378324644a67aa2d72.pdf)
- [Socrates: The New SQL Server in the Cloud](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/socrates.pdf)
- [Large-scale Incremental Processing Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)

# BLOB Storage

- [f4: Facebook’s Warm BLOB Storage System](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-muralidhar.pdf)
    
# Data Structures

- B Tree    
    [B-Tree | Set 1 (Introduction) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/)  
    [B-Tree | Set 2 (Insert) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-1-insert-2/)  
    [B-Tree | Set 3 (Delete) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-3delete/)  
- B+ Tree   
    [Database File Indexing - B+ Tree (Introduction) - GeeksforGeeks](https://www.geeksforgeeks.org/database-file-indexing-b-tree-introduction/)
- R Tree    
    [Introduction to R-tree - GeeksforGeeks](https://www.geeksforgeeks.org/introduction-to-r-tree/)
- LSM Tree  
    [The Log-Structured Merge-Tree (LSM-Tree)](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
- SB Tree   
    [The SB-tree: An Index-Sequential Structure for High-Performance Sequential Access](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.55.9482&rep=rep1&type=pdf)
    
## Range Filter

- SuRF  
    [SuRF: Practical Range Query Filtering with Fast Succinct Tries](http://www.pdl.cmu.edu/PDL-FTP/Storage/surf_sigmod18.pdf)
    
# Consensus Algorithm

## Raft

- [Just say NO to Paxos Overhead: Replacing Consensus with Network Ordering](https://www.usenix.org/system/files/conference/osdi16/osdi16-li.pdf)

## Paxos

## Zab

- [Zab: High-performance broadcast for primary-backup systems](https://knowably-attachments.s3.amazonaws.com/u/55b69a1ce4b00ab397d67250/7c8734d3cf02154499a9b3161ef9f575/Zab_2011.pdf)
- [ZooKeeper’s atomic broadcast protocol: Theory and practice](http://www.tcs.hut.fi/Studies/T-79.5001/reports/2012-deSouzaMedeiros.pdf)
    
# Distrubuted Hash Table (DHT)

- Chord     
    [Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications](https://pdos.csail.mit.edu/papers/chord:sigcomm01/chord_sigcomm.pdf)  
    [分布式哈希表Chord - 知乎](https://zhuanlan.zhihu.com/p/53711866)
- Kademlia  
    [Kademlia协议 - 知乎](https://zhuanlan.zhihu.com/p/38425656)
    
# Distrubuted Storage System

- Atlas  
    [Atlas: Baidu’s Key-value Storage System for Cloud Data](http://ranger.uta.edu/~sjiang/pubs/papers/lai15-atlas.pdf)
- Past  
    [PAST: Persistent and Anonymous Storage in a Peer-to-Peer Networking Environment](https://www.microsoft.com/en-us/research/wp-content/uploads/2001/05/pastDruschel.pdf)
- OceanStore  
    [OceanStore: An Architecture for Global-Scale Persistent Storage](http://www.srhea.net/papers/asplos00.pdf)

# SQL Parser

- [Apache Calcite: A Foundational Framework for Optimized Query Processing Over Heterogeneous Data Sources](https://arxiv.org/pdf/1802.10233.pdf)

# Query Optimization

- [Access Path Selection in a Relational Database Management System](https://www2.cs.duke.edu/courses/compsci516/cps216/spring03/papers/selinger-etal-1979.pdf)
- [Statistical Profile Estimation in Database Systems](http://people.csail.mit.edu/tdanford/6830papers/mannino-stat-profile-estimation.pdf)
- [Building a Modern Database Using LLVM](https://llvm.org/devmtg/2013-11/slides/Wanderman-Milne-Cloudera.pdf)
- [Efficiently Compiling Efficient Query Plans for Modern Hardware](https://www.vldb.org/pvldb/vol4/p539-neumann.pdf)
- [EFFICIENCY IN THE COLUMBIA DATABASE QUERY OPTIMIZER](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/xu-columbia-thesis1998.pdf)

# Join Algorithm

- Nested Loop Join
    - Simple Nested Loops Join
        - tuple-at-a-time
        - page-at-a-time
    - Block Nested Loops Join
    - Index Nested Loops Join
- Sort-Merge Join
- Hash Join

# Lock & Transaction

- [Concurrency Control and Recovery](http://db.lcs.mit.edu/6.830/lectures/franklin97concurrency.pdf)
- [Unreliable Guide To Locking](http://kernelbook.sourceforge.net/kernel-locking.pdf)
- *Purchase Link:* [Transaction Processing: Concepts and Techniques](https://www.amazon.com/Transaction-Processing-Concepts-Techniques-Management/dp/1558601902)
- [Concurrency Control and Recovery in Database Systems](https://courses.cs.washington.edu/courses/cse551/09au/papers/CSE550BHG-Ch7.pdf)
- *Purchase Link:* [Theory of Database Concurrency Control (Principles of computer science series)](https://www.amazon.com/Database-Concurrency-Control-Principles-computer/dp/0881750271)
- *Purchase Link:* [Access path selection in a relational database management system](https://dl.acm.org/citation.cfm?doid=582095.582099)
- [The Benchmark Handbook: For Database and Transaction Processing Systems](https://jimgray.azurewebsites.net/BenchmarkHandbook/chapter1.pdf)

## Log

- Physical log
- Logical logging
- Physiological logging
- Write Ahead Logging (WAL)

## Deadlock Handling

- Deadlock avoidance
- Deadlock detection
    - Timeout
    - Wait-for graph
    
## Two-Phase Locking(2PL)

- [University of Waterloo CS 448 Database Systems - Two Phase Locking](https://www.cs.purdue.edu/homes/sunil/courses/cs448/Lecture_Files/TwoPhaseLocking.pdf)
- [DBMS | Concurrency Control Protocol | Two Phase Locking (2-PL)-I - GeeksforGeeks](https://www.geeksforgeeks.org/dbms-concurrency-control-protocols-two-phase-locking-2-pl/)

### Classification of 2PL

- Basic 2PL
- Strict 2PL
- Conservative 2PL
- Rigorous 2PL
    
## Isolation Level

- Read uncommited
- Read commited
- Repeatable read
- Serializale

## Concurrency Control

- Lock
- Optimistic concurrency control
- Multiversion concurrency control (MVCC)

# Optimistic Concurrency Control

- [On Optimistic Methods for Concurrency Control](https://www.eecs.harvard.edu/~htk/publication/1981-tods-kung-robinson.pdf)

# Recovery

## Write Ahead Logging (WAL)

- [ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging](https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf)

## Write Behind Logging

- [Write Behind Logging](http://www.vldb.org/pvldb/vol10/p337-arulraj.pdf)

## Others

- [Using Crash Hoare Logic for Certifying the FSCQ File System](https://pdos.csail.mit.edu/papers/fscq:sosp15.pdf)

# File Format

- [LanguageManual ORC - Apache Hive - Apache Software Foundation](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC)
- [Apache Parquet](https://parquet.apache.org/documentation/latest/)

# Tracing

- [Dapper, a Large-Scale Distributed Systems Tracing Infrastructure](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36356.pdf)

# Scheduling

- [Arachne: Core-Aware Thread Management](https://web.stanford.edu/~ouster/cgi-bin/papers/arachne_osdi2018_submit.pdf)

# Allocator

- [Mimalloc: Free List Sharding in Action](https://www.microsoft.com/en-us/research/uploads/prod/2019/06/mimalloc-tr-v1.pdf)

# GPU Programming

- *Purchase Link:* [Programming Massively Parallel Processors: A Hands-on Approach](https://www.amazon.com/Programming-Massively-Parallel-Processors-Hands/dp/0124159923)

# Concurrency Programming

- [Concurrency Freaks: Lock-Free and Wait-Free, definition and examples](http://concurrencyfreaks.blogspot.com/2013/05/lock-free-and-wait-free-definition-and.html)
- [OneFile: A Wait-free Persistent Transactional Memory](https://github.com/XiaochenCui/OneFile/blob/master/OneFile-2019.pdf)
- [Let's talk locks! - Speaker Deck](https://speakerdeck.com/kavya719/lets-talk-locks)
- [Basics of Futexes - Eli Bendersky's website](https://eli.thegreenplace.net/2018/basics-of-futexes/)

# PLT

- *Purchase Link:* [Types and Programming Languages (The MIT Press) 1st Edition](https://www.amazon.com/Types-Programming-Languages-MIT-Press/dp/0262162091)
- [Software Foundations](https://github.com/mietek/sf)

# Courese

- [CS 241: System Programming](http://cs241.cs.illinois.edu/)