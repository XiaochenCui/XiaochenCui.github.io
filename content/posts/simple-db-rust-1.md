---
title: "Simple DB In Rust - Looking Back A Month Later"
date: 2020-07-09T17:20:59+08:00
---

Time flies, and one month has passed since the project started.

After this month of fighting with rust, I achieved the basic sequential scanning function. Now, it's time to summarize the work and think about how to advance the project completion faster and how to write better quality rust code.

首先，我犯了过早抽象的错误。由于我参考的simple-db-hw项目是用java编写的，它使用了大量的设计模式和OOP思想。这使得我一开始的代码充满了trait和lifetime。我也耗费了大量的时间在trait上面。实际上，抽象和封装只应该在合适的
