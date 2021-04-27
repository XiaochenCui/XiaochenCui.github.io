---
title: "System Research Syllabus"
date: 2019-10-08T13:56:32+08:00
---

The knowledge involved in building large-scale system, covering everthing form architecture to algorithms, from macro to micro.

Comments and suggestions are welcomed.

(Content is being sorted out, a little bit confusing right now)

# Distributed Systems

- [Time, Clocks, and the Ordering of Events in a Distributed System](http://lamport.azurewebsites.net/pubs/time-clocks.pdf)
- [The End of an Architectural Era (It’s Time for a Complete Rewrite)](http://nms.csail.mit.edu/~stavros/pubs/hstore.pdf)

## Data Processing

- [Spark: Cluster Computing with Working Sets](https://www.usenix.org/legacy/events/hotcloud10/tech/full_papers/Zaharia.pdf)

## Stream Processing

- [Storm @Twitter](https://cs.brown.edu/courses/csci2270/archives/2015/papers/ss-storm.pdf)
- [Samza: Stateful Scalable Stream Processing at LinkedIn](http://www.vldb.org/pvldb/vol10/p1634-noghabi.pdf)
- [Drill](https://cwiki.apache.org/confluence/display/incubator/DrillProposal)

## SQL Workloads

- [Presto: SQL on Everything](https://prestosql.io/Presto_SQL_on_Everything.pdf)
- [Dremel: Interactive Analysis of Web-Scale Datasets](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36632.pdf)

## Distrubuted Storage System

- [Atlas: Baidu’s Key-value Storage System for Cloud Data](http://ranger.uta.edu/~sjiang/pubs/papers/lai15-atlas.pdf)
- [PAST: Persistent and Anonymous Storage in a Peer-to-Peer Networking Environment](https://www.microsoft.com/en-us/research/wp-content/uploads/2001/05/pastDruschel.pdf)
- [OceanStore: An Architecture for Global-Scale Persistent Storage](http://www.srhea.net/papers/asplos00.pdf)
- [Alluxio: A Virtual Distributed File System](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-29.pdf)

# Database

## Motivation

- [A Relational Model of Data for Large Shared Data Banks](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)

## Architecture

- [Architecture of a Database System](http://db.cs.berkeley.edu/papers/fntdb07-architecture.pdf)
- [Column Stores vs Row Stores : How Different Are They Really](https://pdfs.semanticscholar.org/1024/da80d950b8d3142ace378324644a67aa2d72.pdf)
- [Socrates: The New SQL Server in the Cloud](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/socrates.pdf)
- [Large-scale Incremental Processing Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)
- [Readings in Database Systems, 5th Edition](http://www.redbook.io/pdf/redbook-5th-edition.pdf)
- [Aria: A Fast and Practical Deterministic OLTP Database](http://www.vldb.org/pvldb/vol13/p2047-lu.pdf)
- ☑ [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf)
- [Alibaba Hologres: A Cloud-Native Service for Hybrid Serving/Analytical Processing](https://kai-zeng.github.io/papers/hologres.pdf)

## SQL Parser

- [Apache Calcite: A Foundational Framework for Optimized Query Processing Over Heterogeneous Data Sources](https://arxiv.org/pdf/1802.10233.pdf)

## Query Optimization

- [Access Path Selection in a Relational Database Management System](https://www2.cs.duke.edu/courses/compsci516/cps216/spring03/papers/selinger-etal-1979.pdf)
- [Statistical Profile Estimation in Database Systems](http://people.csail.mit.edu/tdanford/6830papers/mannino-stat-profile-estimation.pdf)
- [Building a Modern Database Using LLVM](https://llvm.org/devmtg/2013-11/slides/Wanderman-Milne-Cloudera.pdf)
- [Efficiently Compiling Efficient Query Plans for Modern Hardware](https://www.vldb.org/pvldb/vol4/p539-neumann.pdf)
- [EFFICIENCY IN THE COLUMBIA DATABASE QUERY OPTIMIZER](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/xu-columbia-thesis1998.pdf)
- [The Volcano Optimizer Generator: Extensibility and Efficient Search](https://cs.uwaterloo.ca/~david/cs848/volcano.pdf)
- [The Cascades Framework for Query Optimization](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/graefe-ieee1995.pdf)

## Join Algorithm

- Nested Loop Join
    - Simple Nested Loops Join
        - tuple-at-a-time
        - page-at-a-time
    - Block Nested Loops Join
    - Index Nested Loops Join
- Sort-Merge Join
- Hash Join

## Lock & Transaction

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

- ☑ [ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging](https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf)

## Write Behind Logging

- [Write Behind Logging](http://www.vldb.org/pvldb/vol10/p337-arulraj.pdf)

## Others

- [Using Crash Hoare Logic for Certifying the FSCQ File System](https://pdos.csail.mit.edu/papers/fscq:sosp15.pdf)

# Storage

- [TAO: Facebook’s Distributed Data Store for the Social Graph](https://www.usenix.org/system/files/conference/atc13/atc13-bronson.pdf)
- [Scaling Memcache at Facebook](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf)

## Local Storage
- [WiscKey: Separating Keys from Values in SSD-conscious Storage](https://www.usenix.org/system/files/conference/fast16/fast16-papers-lu.pdf)
- [Titan 的设计与实现 | PingCAP](https://pingcap.com/blog-cn/titan-design-and-implementation/)

## BLOB Storage

- ☑ [Finding a needle in Haystack: Facebook’s photo storage](https://www.usenix.org/legacy/event/osdi10/tech/full_papers/Beaver.pdf)
- ☑ [f4: Facebook’s Warm BLOB Storage System](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-muralidhar.pdf)

## Distributed File System

- [Ceph: A Scalable, High-Performance Distributed File System](https://www.ssrc.ucsc.edu/Papers/weil-osdi06.pdf)

## Time Series Storage

- ☑︎ [技术分享：Prometheus是怎么存储数据的](https://youtu.be/qB40kqhTyYM)
- [Gorilla: A Fast, Scalable, In-Memory Time Series Database](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf)

# Disk Error Correction

## Reed-Solomon

- [Reed–Solomon error correction - Wikipedia](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction)
- [POLYNOMIAL CODES OVER CERTAIN FINITE FIELDS](https://faculty.math.illinois.edu/~duursma/CT/RS-1960.pdf)

# Data Structures

- B Tree
  - ☑ [B-Tree | Set 1 (Introduction) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/)  
  - ☑ [B-Tree | Set 2 (Insert) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-1-insert-2/)  
  - ☑ [B-Tree | Set 3 (Delete) - GeeksforGeeks](https://www.geeksforgeeks.org/b-tree-set-3delete/)  

- B+ Tree
  - ☑ [Database File Indexing - B+ Tree (Introduction) - GeeksforGeeks](https://www.geeksforgeeks.org/database-file-indexing-b-tree-introduction/)
- R Tree
  - [Introduction to R-tree - GeeksforGeeks](https://www.geeksforgeeks.org/introduction-to-r-tree/)
- LSM Tree
  - [The Log-Structured Merge-Tree (LSM-Tree)](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
- SB Tree
  - [The SB-tree: An Index-Sequential Structure for High-Performance Sequential Access](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.55.9482&rep=rep1&type=pdf)

## Range Filter

- [SuRF: Practical Range Query Filtering with Fast Succinct Tries](http://www.pdl.cmu.edu/PDL-FTP/Storage/surf_sigmod18.pdf)

# Distributed Algorithm

## Course

- [MIT6.852J](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-852j-distributed-algorithms-fall-2009/)

## Eventual Consistency

- [Eventually Consistent](https://cs.brown.edu/courses/cs227/archives/2012/papers/weaker/p40-vogels.pdf)
- [Principles of Eventual Consistency](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/final-printversion-10-5-14.pdf)

## Consensus Algorithm

### Raft

- ☑ [In Search of an Understandable Consensus Algorithm (Extended Version)](https://raft.github.io/raft.pdf)
- [CONSENSUS: BRIDGING THEORY AND PRACTICE](https://web.stanford.edu/~ouster/cgi-bin/papers/OngaroPhD.pdf)
- [Just say NO to Paxos Overhead: Replacing Consensus with Network Ordering](https://www.usenix.org/system/files/conference/osdi16/osdi16-li.pdf)

### Paxos

### Zab

- [Zab: High-performance broadcast for primary-backup systems](https://knowably-attachments.s3.amazonaws.com/u/55b69a1ce4b00ab397d67250/7c8734d3cf02154499a9b3161ef9f575/Zab_2011.pdf)
- [ZooKeeper’s atomic broadcast protocol: Theory and practice](http://www.tcs.hut.fi/Studies/T-79.5001/reports/2012-deSouzaMedeiros.pdf)
    
## Distrubuted Hash Table (DHT)

- Chord     
    [Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications](https://pdos.csail.mit.edu/papers/chord:sigcomm01/chord_sigcomm.pdf)  
    [分布式哈希表Chord - 知乎](https://zhuanlan.zhihu.com/p/53711866)
- Kademlia  
    [Kademlia协议 - 知乎](https://zhuanlan.zhihu.com/p/38425656)
    
# File Format

- [LanguageManual ORC - Apache Hive - Apache Software Foundation](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC)
- [Apache Parquet](https://parquet.apache.org/documentation/latest/)

# Tracing

- [Dapper, a Large-Scale Distributed Systems Tracing Infrastructure](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36356.pdf)

# Scheduling

- [Arachne: Core-Aware Thread Management](https://web.stanford.edu/~ouster/cgi-bin/papers/arachne_osdi2018_submit.pdf)

## Scheduling Algorithm

- [Multilevel feedback queue - Wikipedia](https://en.wikipedia.org/wiki/Multilevel_feedback_queue)

# Allocator

- [Mimalloc: Free List Sharding in Action](https://www.microsoft.com/en-us/research/uploads/prod/2019/06/mimalloc-tr-v1.pdf)

# GPU Programming

- *Purchase Link:* [Programming Massively Parallel Processors: A Hands-on Approach](https://www.amazon.com/Programming-Massively-Parallel-Processors-Hands/dp/0124159923)

# Concurrency Programming

- ☑ [Concurrency Freaks: Lock-Free and Wait-Free, definition and examples](http://concurrencyfreaks.blogspot.com/2013/05/lock-free-and-wait-free-definition-and.html)
- [OneFile: A Wait-free Persistent Transactional Memory](https://github.com/XiaochenCui/OneFile/blob/master/OneFile-2019.pdf)
- [Let's talk locks! - Speaker Deck](https://speakerdeck.com/kavya719/lets-talk-locks)
- [Basics of Futexes - Eli Bendersky's website](https://eli.thegreenplace.net/2018/basics-of-futexes/)

# PLT

- *Purchase Link:* [Types and Programming Languages (The MIT Press) 1st Edition](https://www.amazon.com/Types-Programming-Languages-MIT-Press/dp/0262162091)
- [Software Foundations](https://github.com/mietek/sf)

# Course

## Distributed Systemes

- ☑ [MIT 6.824](https://pdos.csail.mit.edu/6.824/)
- [CS294-91 Distributed Computing](https://people.eecs.berkeley.edu/~alig/cs294-91/)
- [6.852: Distributed Algorithms - Massachusetts Institute of Technology - Spring 2008](http://courses.csail.mit.edu/6.852/08/)

## System Programming

### UICD CS 241: System Programming

- [homepage](http://cs241.cs.illinois.edu/)
- [course book](http://cs241.cs.illinois.edu/coursebook/)
- [assignments](http://cs241.cs.illinois.edu/assignments.html)
- [course video](https://classtranscribe.illinois.edu/home/offering/e740770d-e6fb-4ddb-86ca-a49a8dcc7d28)

## Database

- [CMU 15-445 / 645 :: Intro to Database Systems (Fall 2019)](https://15445.courses.cs.cmu.edu/fall2019/)
- ☑ [6.830 / 6.814: Database Systems - Data Systems Group @ MIT](http://db.lcs.mit.edu/6.830/)
- [CMU 15-721 :: Advanced Database Systems (Spring 2020)](https://15721.courses.cs.cmu.edu/spring2020/)

# Waiting For Classification

- [Wait-Free Synchronization](http://cs.brown.edu/~mph/Herlihy91/p124-herlihy.pdf)

# System Programming

- [cgroups](https://www.kernel.org/doc/Documentation/cgroup-v1/cgroups.txt)

## Memory Allocation

- ☑ [Dynamic Memory Allocation in C using malloc(), calloc(), free() and realloc() - GeeksforGeeks](https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/)
- [Writing a Memory Allocator – Dmitry Soshnikov](http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/)

# Compiler

## LLVM

- [The Architecture of Open Source Applications: LLVM](http://www.aosabook.org/en/llvm.html)
- [LLVM Language Reference Manual — LLVM 10 documentation](https://llvm.org/docs/LangRef.html)
- [LLVM’s Analysis and Transform Passes — LLVM 10 documentation](http://llvm.org/docs/Passes.html)
- ☑ [My First Language Frontend with LLVM Tutorial — LLVM 10 documentation](http://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html)

# Disk

## SSD

- ☑︎ [Write amplification - Wikipedia](https://en.wikipedia.org/wiki/Write_amplification)

# Others

- [Noria: dynamic, partially-stateful data-flow for high-performance web applications](https://pdos.csail.mit.edu/papers/noria:osdi18.pdf)

## Filter

- [Probabilistic Filters By Example: Cuckoo Filter and Bloom Filters](https://bdupras.github.io/filter-tutorial/)
- [Cuckoo Filter: Practically Better Than Bloom](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf)
- [Bloom Filters by Example](https://llimllib.github.io/bloomfilter-tutorial/)

# Golang

## GC

- [Golang’s Real-time GC in Theory and Practice - Making Pusher](https://making.pusher.com/golangs-real-time-gc-in-theory-and-practice/)
- [Go 1.5 concurrent garbage collector pacing - Google Docs](https://docs.google.com/document/d/1wmjrocXIWTr1JxU-3EQBI6BK6KgtiFArkG47XK73xIQ/edit#)