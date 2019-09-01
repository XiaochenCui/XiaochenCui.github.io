---
title: SICP 学习环境的搭建
date: 2018-07-07 19:11:23
tags:
- sicp
- scheme
- functional programming
---
> If art interprets our dream, the computer executes them in the guise of programs!
> -- Alan J. Perlis

# 前言

SICP 从 lisp 语法开始，为我们构成了一个包含计算机理论学科的闭环系统。今天开始我们要借助这本书更深入地理解程序的本质，
<!--more-->

在运行环境方面，有两种选择：[mit-scheme](https://www.gnu.org/software/mit-scheme/), [racket][racket]。其中 racket 提供图形化界面的 DrRacket 以及命令行界面 racket。笔者倾向于使用命令行界面的 racket 作为运行环境，并使用 vim 作为代码编辑器。接下来我将简单介绍一下这两种运行环境的安装及基本使用，并列出一些讲解进阶使用的文章供大家更舒服地编写 scheme。

# mit-scheme

## 安装

`brew install mit-scheme`

## 缺点

相比于 racket 的 REPL，mit-scheme 缺少了诸如自动补全、快速跳转之类的功能

# racket

## 安装

可以从 [racket][racket] 下载安装包进行安装，也可以直接通过命令行 `brew cask install racket` 安装完整的 racket 客户端。如果通过 `brew install racket` 安装，则仅会安装一个最精简的、不包括 DrRacket 的 racket 客户端。

## 加载 scheme 源文件

```
racket -f <file>  # 详见 racket -h
```

或在 REPL 中执行

```
> (load "example.scm")
```

# 拓展阅读

由于笔者还未做深入研究，在这里先列出一些链接。

- [Racket 常见问题](https://racket-zh.org/faq)

[racket]: https://racket-lang.org/
