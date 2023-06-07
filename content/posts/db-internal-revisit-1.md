---
title: "Database Internal Revisit"
date: 2023-06-07T08:57:10+08:00
draft: true
---

- Q: Why do we need a buffer pool? What happens if we don't have a buffer pool?

  A: We need a buffer pool to store the data that is frequently accessed by the user. If we don't have a buffer pool, we need to read the data from the disk every time the user requests it. The database will be dead slow.