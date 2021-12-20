---
title: "Context Switch - Preface & Outline"
date: 2021-11-05T11:43:00+08:00
---

## Preface

I will write a series of posts about the context switch. Aiming to answer these questions:

- What is a context switch?
- When we need to switch context?
- What's a process / thread / coroutine(user-space thread)?
- Applicable scenarios for each option.
- Digging into some coroutine libraries, the pros and cons of each.
    - boost coroutine
    - marl
    - co
    - libtask
    - bthread
    - goroutine
    - libuv
    - libco
    - libaco
    - boos::fiber
- Why X uses coroutine? (e.g: gateway, crawler)
- Why X not use coroutine? (e.g: mysql)
- Why linux (and other os) doesn't have coroutine built-in?
- why system call is slow/expensive?

## Outline

There are 3 articles published currently:

- [Context Switch - Function Calling](/posts/context-switch-function-calling/)
- [Context Switch - A Coroutine Library Back to 1999](/posts/context-switch-coroutine-1999/)
- [Context Switch - libtask by Russ Cox](/posts/context-switch-libtask/)

