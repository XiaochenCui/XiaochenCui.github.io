---
title: "Simple DB In Rust - Started"
date: 2020-06-09T14:52:55+08:00
---

After spending a lot of time, I finally completed all the tasks of mit 6.830 ([source code](https://github.com/XiaochenCui/simple-db-hw)). Now we almost have a simple database that can perform a series of operations such as querying, storing, and deleting data. The transaction and index has been achieved. We also implemented write-ahead log to prevent data lose from system crash. 99% of the tests (including unit tests and integration tests) can be successfully passed.

After some pondering, I finally decided to start rewriting this database with rust ([source code](https://github.com/XiaochenCui/simple-db-rust)).

The biggest reason why I made this decision is because the original java code is too bloated and the structure is too complicated, so I need to pay great patience and time in the development and debugging process. Due to the language characteristics of java and the overall structure of the project, I often have to jump a dozen times to find a simple function call. Whenever integration tests fail, I start to sweat, because the code structure is really terrible. It also prevent me from having a clear understanding to the project structure and database architecture. This simple database is not simple at all, but rather complicated. 

After considering several common programming languages, I finally chose rust. I have used python and go for most of my career, but they are not suitable for this project. The problem with Python is its dynamic typing and poor performance. The problem with golang is that it is too crude, without generics and template metaprogramming. At the same time, golang's null pointers, goroutine leaks, and memory leaks often occurred. Python and golang also lack strong control of the bottom layer, which is also very important.

The rewriting project has started for a week. Since I am a rust newbie, I have encountered a lot of difficult problems and spent a lot of time on traits, boxes, and smart pointers. The compiling of the program has only a 5% chance of proceeding smoothly. But after I spent some time studying seriously, these problems were solved one by one. rust's ownership system also began to force me to seriously think about the structure of this project.

For now, the code size of the new project is also much lower than before. I hope that the final code size can be controlled within 5,000 lines of code (for comparison, the original project has nearly 20,000 lines of code). At the same time, I also hope that this new project will have a clearer architecture, a smaller memory footprint and a faster running speed. If possible, I also hope to use it for a complete tpc-c test.

