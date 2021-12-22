---
title: "System Research Syllabus"
date: 2019-10-08T13:56:32+08:00
---

The knowledge involved in building large-scale system, covering everthing form architecture to algorithms, from macro to micro.

Comments and suggestions are welcomed.

(Content is being sorted out, a little bit confusing right now)

☑︎ means read

⭐️ means recommend

# Distributed Systems

- [Time, Clocks, and the Ordering of Events in a Distributed System](http://lamport.azurewebsites.net/pubs/time-clocks.pdf)
- [The End of an Architectural Era (It’s Time for a Complete Rewrite)](http://nms.csail.mit.edu/~stavros/pubs/hstore.pdf)
- [Practical Uses of Synchronized Clocks in Distributed Systems](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.1089.5025&rep=rep1&type=pdf)
- [Information Storage in a Decentralized Computer System]()

## Data Processing

- [Spark: Cluster Computing with Working Sets](https://www.usenix.org/legacy/events/hotcloud10/tech/full_papers/Zaharia.pdf)

## Stream Processing

- [Storm @Twitter](https://cs.brown.edu/courses/csci2270/archives/2015/papers/ss-storm.pdf)
- [Samza: Stateful Scalable Stream Processing at LinkedIn](http://www.vldb.org/pvldb/vol10/p1634-noghabi.pdf)
- [Drill](https://cwiki.apache.org/confluence/display/incubator/DrillProposal)

## SQL Workloads

- [Presto: SQL on Everything](https://prestosql.io/Presto_SQL_on_Everything.pdf)
- [深入浅出Presto：PB级OLAP引擎](https://www.zhihu.com/column/c_1294277883771940864)
- [Dremel: Interactive Analysis of Web-Scale Datasets](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36632.pdf)

## Distributed Storage System

- [Atlas: Baidu’s Key-value Storage System for Cloud Data](http://ranger.uta.edu/~sjiang/pubs/papers/lai15-atlas.pdf)
- [PAST: Persistent and Anonymous Storage in a Peer-to-Peer Networking Environment](https://www.microsoft.com/en-us/research/wp-content/uploads/2001/05/pastDruschel.pdf)
- [OceanStore: An Architecture for Global-Scale Persistent Storage](http://www.srhea.net/papers/asplos00.pdf)
- [Alluxio: A Virtual Distributed File System](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-29.pdf)

## Distributed Computation

- [Ray: A Distributed Framework for Emerging AI Applications](https://arxiv.org/pdf/1712.05889.pdf)
- [Starling: A Scalable Query Engine on Cloud Functions](https://dl.acm.org/doi/pdf/10.1145/3318464.3380609)

# Database

## Motivation

- [A Relational Model of Data for Large Shared Data Banks](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)

## History

- ☑︎ [What Goes Around Comes Around](https://15721.courses.cs.cmu.edu/spring2020/papers/01-intro/whatgoesaround-stonebraker.pdf)
- ☑︎ [What’s Really New with NewSQL?](https://15721.courses.cs.cmu.edu/spring2020/papers/01-intro/pavlo-newsql-sigmodrec2016.pdf)

## Architecture

- [Architecture of a Database System](http://db.cs.berkeley.edu/papers/fntdb07-architecture.pdf)
- [Column Stores vs Row Stores : How Different Are They Really](https://pdfs.semanticscholar.org/1024/da80d950b8d3142ace378324644a67aa2d72.pdf)
- [Socrates: The New SQL Server in the Cloud](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/socrates.pdf)
- [Large-scale Incremental Processing Using Distributed Transactions and Notifications](http://notes.stephenholiday.com/Percolator.pdf)
- [Readings in Database Systems, 5th Edition](http://www.redbook.io/pdf/redbook-5th-edition.pdf)
- [Aria: A Fast and Practical Deterministic OLTP Database](http://www.vldb.org/pvldb/vol13/p2047-lu.pdf)
- ☑ [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf)
- [Alibaba Hologres: A Cloud-Native Service for Hybrid Serving/Analytical Processing](https://kai-zeng.github.io/papers/hologres.pdf)
- [LLAMA: A Cache/Storage Subsystem for Modern Hardware](http://www.vldb.org/pvldb/vol6/p877-levandoski.pdf)
- [POLARDB: InnoDB based shared-everything storage solution](https://www.percona.com/live/18/sites/default/files/slides/polardb_p18_slides.pdf)
- [FoundationDB: A Distributed Unbundled Transactional Key Value Store](https://www.foundationdb.org/files/fdb-paper.pdf)
- [POLARIS: The Distributed SQL Engine in Azure Synapse](http://www.vldb.org/pvldb/vol13/p3204-saborit.pdf)
- [The Snowflake Elastic Data Warehouse](http://info.snowflake.net/rs/252-RFO-227/images/Snowflake_SIGMOD.pdf)
- [Spanner: Google’s Globally-Distributed Database](http://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf)

## Greenplum

- ☑︎ [Greenplum: A Hybrid Database for Transactional and Analytical Workloads](https://arxiv.org/pdf/2103.11080.pdf)
- ☑︎ [Greenplum: A Hybrid Database for Transactional and Analytical Workloads (中文翻译)](https://zhuanlan.zhihu.com/p/388545190)

## PostgreSQL

- [THE DESIGN OF POSTGRES](https://dsf.berkeley.edu/papers/ERL-M85-95.pdf)
- [THE IMPLEMENTATION OF POSTGRES](https://dsf.berkeley.edu/papers/ERL-M90-34.pdf)
- [[ROWE87] The POSTGRES Data Model](https://dsf.berkeley.edu/papers/ERL-M87-13.pdf)
- [PostgreSQL Concurrency with MVCC | Heroku Dev Center](https://devcenter.heroku.com/articles/postgresql-concurrency)

## CockroachDB

- [Living Without Atomic Clocks](https://www.cockroachlabs.com/blog/living-without-atomic-clocks/)
- [CockroachDB's Consistency Model](https://www.cockroachlabs.com/blog/consistency-model/)
- ☑︎ [Life of a SQL Query](https://github.com/cockroachdb/cockroach/blob/94e48ae8f2/docs/tech-notes/life_of_a_query.md)
- ☑︎ [SQL query planning and optimizations](https://github.com/cockroachdb/cockroach/blob/c097a16427f65e9070991f062716d222ea5903fe/pkg/sql/opt/doc.go)
- [Index selection in CockroachDB](https://www.cockroachlabs.com/blog/index-selection-cockroachdb-2/)

## MVCC

- [An Empirical Evaluation of In-Memory Multi-Version Concurrency Control](https://15721.courses.cs.cmu.edu/spring2020/papers/03-mvcc1/wu-vldb2017.pdf)
- ☑︎ [PostgreSQL Concurrency with MVCC | Heroku Dev Center](https://devcenter.heroku.com/articles/postgresql-concurrency)
- ☑︎ [浅谈数据库并发控制 - 锁和 MVCC - 面向信仰编程](https://draveness.me/database-concurrency-control/)

## Column Storage
- [The Vertica Analytic Database: C-Store 7 Years Later](https://vldb.org/pvldb/vol5/p1790_andrewlamb_vldb2012.pdf)

## SQL Parser

- [Apache Calcite: A Foundational Framework for Optimized Query Processing Over Heterogeneous Data Sources](https://arxiv.org/pdf/1802.10233.pdf)

## SQL Test

- ☑︎ [TiDB SQL 兼容性测试工具简介（Compatibility testing tool profile）](https://www.youtube.com/watch?v=Hmu3F1Vafqc)

## Query Engine

### Push vs Pull

- ☑︎ [Query Engines: Push vs. Pull](http://justinjaffray.com/query-engines-push-vs.-pull/)
- ☑︎ [Push vs. Pull-Based Loop Fusion in Query Engines](https://arxiv.org/pdf/1610.09166.pdf)

## Query Optimization

- ☑︎ [Access Path Selection in a Relational Database Management System](https://www2.cs.duke.edu/courses/compsci516/cps216/spring03/papers/selinger-etal-1979.pdf)
- [Statistical Profile Estimation in Database Systems](http://people.csail.mit.edu/tdanford/6830papers/mannino-stat-profile-estimation.pdf)
- [Building a Modern Database Using LLVM](https://llvm.org/devmtg/2013-11/slides/Wanderman-Milne-Cloudera.pdf)
- [EFFICIENCY IN THE COLUMBIA DATABASE QUERY OPTIMIZER](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/xu-columbia-thesis1998.pdf)
- [The Volcano Optimizer Generator: Extensibility and Efficient Search](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.21.2197&rep=rep1&type=pdf)
- [Volcano-An Extensible and Parallel Query Evaluation System](https://paperhub.s3.amazonaws.com/dace52a42c07f7f8348b08dc2b186061.pdf)
- [The Cascades Framework for Query Optimization](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/graefe-ieee1995.pdf)
- [逻辑优化 | PingCAP Docs](https://docs.pingcap.com/zh/tidb/stable/sql-logical-optimization)
- ☑︎ [Cascades Optimizer - 知乎](https://zhuanlan.zhihu.com/p/73545345)
- ☑︎ [Cost-Based Optimizer | CockroachDB Docs](https://www.cockroachlabs.com/docs/stable/cost-based-optimizer.html)
- [Optimizing Data Shuffling in Data-Parallel Computation by Understanding User-Defined Functions](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final98.pdf)
- [Spotting Code Optimizations in Data-Parallel Pipelines through PeriSCOPE](https://www.usenix.org/system/files/conference/osdi12/osdi12-final-23.pdf)

## Query Compilation

- ☑︎ [查询编译综述 - 知乎](https://zhuanlan.zhihu.com/p/60965109)
- [Runtime Code Generation in Cloudera Impala](http://sites.computer.org/debull/A14mar/p31.pdf)
- [Generating code for holistic query evaluation](https://15721.courses.cs.cmu.edu/spring2017/papers/20-compilation/krikellas-icde2010.pdf)
- [Efficiently Compiling Efficient Query Plans for Modern Hardware](https://www.vldb.org/pvldb/vol4/p539-neumann.pdf)
- [Relaxed Operator Fusion for In-Memory Databases: Making Compilation, Vectorization, and Prefetching Work Together At Last](https://par.nsf.gov/servlets/purl/10066914)
- [How to Architect a Query Compiler, Revisited](https://www.cs.purdue.edu/homes/rompf/papers/tahboub-sigmod18.pdf)
- [Code generation for efficient query processing in managed runtimes](https://pdfs.semanticscholar.org/1eae/e91396ae428589a880abb780af1e88cea180.pdf?_ga=2.162570108.1979694222.1621214327-1782859694.1621214327)
- [Vectorization vs. Compilation in Query Execution](https://zhuanlan.zhihu.com/p/393961205)
- [Adaptive Execution of Compiled Queries](https://15721.courses.cs.cmu.edu/spring2018/papers/03-compilation/kohn-icde2018.pdf)

## Vectorization

- ☑︎ [Columnar Databases and Vectorization](https://www.infoq.com/articles/columnar-databases-and-vectorization/)
- ☑ [Everything You Always Wanted to Know About Compiled and Vectorized Queries But Were Afraid to Ask](https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf)
- ☑︎ [How We Built a Vectorized Execution Engine](https://www.cockroachlabs.com/blog/how-we-built-a-vectorized-execution-engine/)
- [Vectorizing the Merge Joiner in CockroachDB](https://www.cockroachlabs.com/blog/vectorizing-the-merge-joiner-in-cockroachdb/)
- [40x faster hash joiner with vectorized execution](https://www.cockroachlabs.com/blog/vectorized-hash-joiner/)

### SIMD

- ⭐️ [Intel® Intrinsics Guide](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)
- [Fast array reversal with SIMD! - DEV Community](https://dev.to/wunk/fast-array-reversal-with-simd-j3p)
- [x86 Assembly/SSE - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/X86_Assembly/SSE#SSE_Instruction_Set)
- [SSE Instructions - x86 Assembly Language Reference Manual](https://docs.oracle.com/cd/E26502_01/html/E28388/eojde.html)
- [c - SSE (SIMD): multiply vector by scalar - Stack Overflow](https://stackoverflow.com/questions/9079580/sse-simd-multiply-vector-by-scalar)

## Pipeline

- [Relaxed Operator Fusion for In-Memory Databases: Making Compilation, Vectorization, and Prefetching Work Together At Las](https://par.nsf.gov/servlets/purl/10066914)

## Peloton

- ☑︎ [Relaxed Operator Fusion for In-Memory Databases: Making Compilation, Vectorization, and Prefetching Work Together At Last](https://15721.courses.cs.cmu.edu/spring2018/papers/22-vectorization2/menon-vldb2017.pdf)
- [MonetDB/X100: Hyper-Pipelining Query Execution](http://cidrdb.org/cidr2005/papers/P19.pdf)

## Join Algorithm

- [Hash join in MySQL 8 | MySQL Server Blog](https://mysqlserverteam.com/hash-join-in-mysql-8/)
- [An Experimental Comparison of Thirteen Relational Equi-Joins in Main Memory](https://15721.courses.cs.cmu.edu/spring2020/papers/17-hashjoins/schuh-sigmod2016.pdf)
- [Multi-Core, Main-Memory Joins: Sort vs. Hash Revisited](https://15721.courses.cs.cmu.edu/spring2020/papers/18-sortmergejoins/p85-balkesen.pdf)
- [A Seven-Dimensional Analysis of Hashing Methods and its Implications on Query Processing](https://15721.courses.cs.cmu.edu/spring2020/papers/17-hashjoins/richter-vldb2015.pdf)
- [Design and Evaluation of Main Memory Hash Join Algorithms for Multi-core CPUs](https://15721.courses.cs.cmu.edu/spring2020/papers/17-hashjoins/p37-blanas.pdf)
- [Main-Memory Hash Joins on Multi-Core CPUs: Tuning to the Underlying Hardware](https://15721.courses.cs.cmu.edu/spring2020/papers/17-hashjoins/balkesen-icde2013.pdf)
- [Sort vs. Hash Revisited: Fast Join Implementation on Modern Multi-Core CPUs](https://15721.courses.cs.cmu.edu/spring2020/papers/18-sortmergejoins/kim-vldb2009.pdf)
- [Sort vs. Hash Revisited](https://15721.courses.cs.cmu.edu/spring2020/papers/18-sortmergejoins/graefe-tkde1994.pdf)
- [Massively Parallel Sort-Merge Joins in Main Memory Multi-Core Database Systems](https://15721.courses.cs.cmu.edu/spring2020/papers/18-sortmergejoins/p1064-albutiu.pdf)
- [A Practical Approach to Groupjoin and Nested Aggregates](https://vldb.org/pvldb/vol14/p2383-fent.pdf)
- [Fast and Effective Distribution-Key Recommendation for Amazon Redshift](http://www.vldb.org/pvldb/vol13/p2411-parchas.pdf)

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

### Optimistic Concurrency Control

- [On Optimistic Methods for Concurrency Control](https://www.eecs.harvard.edu/~htk/publication/1981-tods-kung-robinson.pdf)
- [Staring into the Abyss: An Evaluation of Concurrency Control with One Thousand Cores](https://www.vldb.org/pvldb/vol8/p209-yu.pdf)

## Recovery

### Write Ahead Logging (WAL)

- ☑ [ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging](https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf)

### Write Behind Logging

- [Write Behind Logging](http://www.vldb.org/pvldb/vol10/p337-arulraj.pdf)

## Key-Value Storage

- [SpanDB: A Fast, Cost-Effective LSM-tree Based KV Store on Hybrid Storage](https://www.usenix.org/system/files/fast21-chen-hao.pdf)

## Others

- [Using Crash Hoare Logic for Certifying the FSCQ File System](https://pdos.csail.mit.edu/papers/fscq:sosp15.pdf)
- [OLTP Through the Looking Glass, and What We Found There](http://nms.csail.mit.edu/~stavros/pubs/OLTP_sigmod08.pdf)

# Storage

## Colossus
- [Colossus under the hood: a peek into Google’s scalable storage system](https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system)
- [Building Large-Scale Internet Services](https://static.googleusercontent.com/media/research.google.com/en//people/jeff/SOCC2010-keynote-slides.pdf)

## Local Storage
- [WiscKey: Separating Keys from Values in SSD-conscious Storage](https://www.usenix.org/system/files/conference/fast16/fast16-papers-lu.pdf)
- [Titan 的设计与实现 | PingCAP](https://pingcap.com/blog-cn/titan-design-and-implementation/)

## BLOB Storage

- ☑ [Finding a needle in Haystack: Facebook’s photo storage](https://www.usenix.org/legacy/event/osdi10/tech/full_papers/Beaver.pdf)
- ☑ [f4: Facebook’s Warm BLOB Storage System](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-muralidhar.pdf)
- ☑︎ [[Paper Notes] Facebook Haystack and F4 - 纯纯的 Blog](https://blog.zhuangty.com/haystack-f4/)

## Distributed File System

- [Ceph: A Scalable, High-Performance Distributed File System](https://www.ssrc.ucsc.edu/Papers/weil-osdi06.pdf)

## Time Series Storage

- ☑︎ [技术分享：Prometheus是怎么存储数据的](https://youtu.be/qB40kqhTyYM)
- [Gorilla: A Fast, Scalable, In-Memory Time Series Database](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf)
## Others
- [TAO: Facebook’s Distributed Data Store for the Social Graph](https://www.usenix.org/system/files/conference/atc13/atc13-bronson.pdf)
- [Scaling Memcache at Facebook](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf)


# Disk Error Correction

## Reed-Solomon

- [Reed–Solomon error correction - Wikipedia](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction)
- [POLYNOMIAL CODES OVER CERTAIN FINITE FIELDS](https://faculty.math.illinois.edu/~duursma/CT/RS-1960.pdf)

# Data Structures

## LST-Tree

- ☑ [How do LSM Trees work?](https://yetanotherdevblog.com/lsm/)
- ☑ [LSM 存储引擎中 KV 分离的实现](https://www.skyzh.dev/posts/articles/2021-08-07-lsm-kv-separation-overview/)

## B-Tree
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

# Materialized View

- [Mesa: Geo-Replicated, Near Real-Time, Scalable Data Warehousing](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/42851.pdf)
- [Napa: Powering Scalable Data Warehousing with Robust Query Performance at Google](http://www.vldb.org/pvldb/vol14/p2986-sankaranarayanan.pdf)
- [[Paper Notes] Napa: Powering Scalable Data Warehousing with Robust Query Performance at Google - 纯纯的 Blog](https://blog.zhuangty.com/napa/)

# Distributed Algorithm

## Consistency

- [Consistency Models](https://jepsen.io/consistency)
- [Seeing is Believing: A Client-Centric Specification of Database Isolation](https://www.cs.cornell.edu/lorenzo/papers/Crooks17Seeing.pdf)

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
- [A Practical Wait-Free Simulation for Lock-Free Data Structures](http://cs.technion.ac.il/~erez/Papers/wf-simulation-full.pdf)

## Structured Concurrency

- [Notes on structured concurrency, or: Go statement considered harmful — njs blog](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/#nurseries-a-structured-replacement-for-go-statements)
- [代码杂谈：结构化并发](https://blog.crazyark.xyz/p/structured-concurrency/)

## Hazard Pointers

- [Lock-Free Data Structures with Hazard Pointers](https://erdani.org/publications/cuj-2004-12.pdf)
- [folly/Hazptr.h at master · facebook/folly](https://github.com/facebook/folly/blob/master/folly/synchronization/Hazptr.h)
- [P1121R3: Hazard Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1121r3.pdf)

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

### mit 6.033

- [mit 6.033](http://web.mit.edu/6.033/www/)

## Database

- [CMU 15-445 / 645 :: Intro to Database Systems (Fall 2019)](https://15445.courses.cs.cmu.edu/fall2019/)
- ☑ [6.830 / 6.814: Database Systems - Data Systems Group @ MIT](http://db.lcs.mit.edu/6.830/)
- [CMU 15-721 :: Advanced Database Systems (Spring 2020)](https://15721.courses.cs.cmu.edu/spring2020/)

## Operating Systems

- [6.S081 / Fall 2021](https://pdos.csail.mit.edu/6.828/2021/)
- [6.828 / Fall 2018](https://pdos.csail.mit.edu/6.828/2018/)

## Data Structures

- [Main | CS 61B Spring 2019](https://sp19.datastructur.es/)

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
- [Ribbon filter: practically smaller than Bloom and Xor](https://arxiv.org/pdf/2103.02515.pdf)

# Rust

## HKT && GAT && ACT

- [Generalizing over Generics in Rust (Part 1) - AKA Higher Kinded Types in Rust](https://rustyyato.github.io/type/system,type/families/2021/02/15/Type-Families-1.html)
- [Generalizing over Generics in Rust (Part 1.5): Mechanisms](https://rustyyato.github.io/type/system,type/families/2021/02/22/Type-Families-1_5.html)
- [Solving the Generalized Streaming Iterator Problem without GATs](http://lukaskalbertodt.github.io/2018/08/03/solving-the-generalized-streaming-iterator-problem-without-gats.html)
- [🔬 Tracking issue for generic associated types (GAT) · Issue #44265 · rust-lang/rust](https://github.com/rust-lang/rust/issues/44265)
- [Higher-Rank Trait Bounds - The Rustonomicon](https://doc.rust-lang.org/nomicon/hrtb.html)

## Closures

- [Closures: Magic Functions](https://rustyyato.github.io/rust/syntactic/sugar/2019/01/17/Closures-Magic-Functions.html)

## Ownership

- [GhostCell: Separating Permissions from Data in Rust](http://plv.mpi-sws.org/rustbelt/ghostcell/paper.pdf)

# Golang

- [High Performance Go Workshop](https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html)

## GC

- [Golang’s Real-time GC in Theory and Practice - Making Pusher](https://making.pusher.com/golangs-real-time-gc-in-theory-and-practice/)
- [Go 1.5 concurrent garbage collector pacing - Google Docs](https://docs.google.com/document/d/1wmjrocXIWTr1JxU-3EQBI6BK6KgtiFArkG47XK73xIQ/edit#)

# IEEE754

- [IEEE 754 - Wikipedia](https://en.wikipedia.org/wiki/IEEE_754)

# Computer Architecture

- [Build a Modern Computer from First Principles: From Nand to Tetris (Project-Centered Course) | Coursera](https://www.coursera.org/learn/build-a-computer)
- [NandGame - Build a computer from scratch.](https://nandgame.com/)
- [Branch prediction](https://danluu.com/branch-prediction/)
- [Data alignment and caches](https://danluu.com/3c-conflict/)

# TLA+

- [Introduction :: Learn TLA+](https://learntla.com/introduction/)

# Communication

- [END-TO-END ARGUMENTS IN SYSTEM DESIGN](http://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

# Lexical Analyser

- [book: flex & bison](https://web.iitd.ac.in/~sumeet/flex__bison.pdf)

# Type Theory

- [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf)

# Network

- [Exploiting a Natural Network Effect for Scalable, Fine-grained Clock Synchronization](https://www.usenix.org/system/files/conference/nsdi18/nsdi18-geng.pdf)