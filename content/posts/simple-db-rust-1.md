---
title: "Simple DB In Rust - Looking Back A Month Later"
date: 2020-07-09T17:20:59+08:00
---

Time flies, and one month has passed since the project started.

After this month of fighting with rust, I achieved the basic sequential scanning function. Now, it's time to summarize the work and think about how to advance the project completion faster and how to write better quality rust code.

First, I made the mistake of premature abstraction. Since the simple-db-hw project I refer to is written in java, it uses a lot of design patterns and OOP ideas. This made my initial code full of traits and lifetime. I also spend a lot of time on the trait. In fact, abstraction and encapsulation should only be introduced at the right time. Premature application design patterns will instead mess up the program and greatly increase the difficulty of development. The most important thing about the program in the prototype stage is to advance it quickly and try it quickly.

The lack of thinking about ownership is also a mistake, it leads to repeated refactoring and debugging. When we start to write programs with rust, we should think in the rust way, including full consideration of ownership and consideration of borrow checker. Rather than simply translating code from other languages into rust code.

For now, the skeleton of the database has been set up. Including buffer pool, catalog and heap page implement. There are three integration test for sequential scan function.

In the next few days, I will pause to evaluate and improve the existing code.
