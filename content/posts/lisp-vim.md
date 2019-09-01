---
title: Vim Lisp Plugin 推荐
date: 2018-07-19 21:57:14
tags:
- vim
- lisp
---
使用 lisp 编程的时候括号是一个很让人头疼的问题，vim 自带的 [matchparen](https://github.com/vim/vim/blob/master/runtime/plugin/matchparen.vim) 可以起到一定的帮助，但是还是有两个小问题：

- 需要将光标移到括号上才能知道它对应的是哪个括号
- 频繁报错，很影响编码效率

在这里向大家推荐两个插件帮大家更舒服地编写 lisp
<!--more-->

# auto-pairs

[auto-pairs](https://github.com/jiangmiao/auto-pairs) 是一款非常实用的括号自动补全插件

# rainbow

[rainbow](https://github.com/luochen1990/rainbow) 可以给我们的括号着色，既美观又实用，可谓 lisp 神器

## 效果图：

{% asset_img rainbow.png %}

## rainbow 的配置

### 使 rainbow 默认开启

与其他常用的 plugin 不同，rainbow 默认是关闭的，我们可以通过配置使其自动开启：

```
let g:rainbow_active = 1
```

### 颜色

rainbow 默认配置的颜色辨识度不高，我为其配置了更有辨识度的配色方案：

```
let g:rainbow_conf = {
\    'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick'],
\    'ctermfgs': ['darkred', 'blue', 'yellow', 'cyan', 'magenta', 'brown'],
\}
```

### 只为特定类型的文件启用

由于 rainbow 会破坏 markdown 等文件编辑界面，在这里我们通过配置使其只为特定文件开启：

```
Plug 'luochen1990/rainbow', { 'for': 'scheme'  }
```

我使用的插件管理器是 [plug](https://github.com/junegunn/vim-plug)，由于目前只在编写 scheme 的需要写比较多的括号，所以只为 scheme 源代码文件开启彩虹配色
