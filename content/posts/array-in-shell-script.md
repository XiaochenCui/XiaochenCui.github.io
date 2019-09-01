---
title: Arrays in bash
date: 2018-03-30 23:11:33
tags:
- shell script
---
Shell script 中的 array 一直是一个比较模糊的概念，在网上找到的相关文章也讲得不太详细。本文参考了多篇文章，以尽量详尽地讲解一下 bash 中的 array。
<!--more-->

# Array 基础语法

## Array 初始化

Array 有多种方式进行初始化：

- 使用 `array_name[xx]`
- 使用显式声明语句 `declare -a array_name`
- `array_name=( XXX YYY ZZZ ... )` （括号旁边的空格不是必需的）
- `array_name=([xx]=XXX [yy]=YYY ...)`

下面我们通过代码演示一下：

```bash
#!/bin/bash

# array_name[xx]
#
# Array members need not be consecutive or contiguous.
# Some members of the array can be left uninitialized.
# Gaps in the array are okay.

array_1[11]=24
array_1[15]=37

echo ${array_1[11]} # output 24
echo ${array_1[12]} # output blank (null variable)

# declare -a array_name
declare -a array2

# array_name=( XXX YYY ZZZ ... )
array_3=( zero one two three four )

echo ${array_3[0]} # output zero

# array_name=([xx]=XXX [yy]=YYY ...)
array_4=([17]=seventeen [24]=twenty-four)

echo ${array_4[17]} # output seventeen
```

下面举一个实际应用中初始化 array 的例子：

```bash
base64_charset=( {A..Z} {a..z} {0..9} + / = )
               #  Using extended brace expansion
               #+ to initialize the elements of the array.
               #  Excerpted from vladz's "base64.sh" script
               #+ in the "Contributed Scripts" appendix.
```

可以看到，用 `array=( element1 element2 ... elementN )` 这种方式初始化 array 非常方便

## 输出整个 array

- `echo ${array_name[@]}`

```bash
base64_charset=({A..Z} {a..z} {0..9} + / =)

echo ${base64_charset[@]}

# output:
#A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 + / =
```

## 取 array 中元素的值

在中括号中加数字或字符串索引可以取到 array 中某一元素的值：`${array_name[xx]}`

正常情况下，不要放置字符串索引，除非你精通 array

- 当索引为数字时，会返回相应的值（在那个索引的值被指定的情况下）
- 当索引为字符串且不是变量名时，无论那个字符串是什么，都会返回 array 中最后一个字符串索引对应元素的值
- 当索引为变量名时，其会被展开（不需要加 `$` 符号）

```bash
array_0=([far]=faraway [he]=hello [24]=kube [no]=love [17]=docker)

echo ${array_0[17]}     # docker
                        # Output corresponding value if key exist

echo ${array_0[far]}    # love
                        # Output last element's value whose key is string

far="hi"

echo ${array_0[far]}   # love

far=24

echo ${array_0[far]}   # kube
```

## Array 中的元素索引

- 整数索引从 0 开始
- 元素的整数索引不必是连续的，即元素之间可以有 gap

## 取 array 长度

- `{% raw %}${#array_name}{% endraw %}` array 中第一个元素的长度
- `{% raw %}${#array_name[*]}{% endraw %}` array 的长度
- `{% raw %}${#array_name[@]}{% endraw %}` array 的长度

```bash
array=( zero one two three four five )
# Element 0   1   2    3     4    5

echo ${#array}         #  4
                       #  Length of first element of array.
                       #  (Alternate notation)
echo ${#array[*]}      #  6
                       #  Number of elements in array.
echo ${#array[@]}      #  6
                       #  Number of elements in array.
```

## 取 array 中某一元素的长度

`{% raw %}${#array_name[n]}{% endraw %}`

```bash
array=( zero one two three four five )
# Element 0   1   2    3     4    5

echo ${#array[0]}      #  4
                       #  Length of first element of array.
echo ${#array[1]}      #  3
                       #  Length of second element of array.
                       #  Arrays in Bash have zero-based indexing.
 ```

## 对 array 进行切片

Array 对切片和 python 中的切片很像：

- `${array_name[@]:start}` 从 start 开始的所有元素（包含 start ）
- `${array_name[@]:start:end}` 从 start 到 end 的所有元素（包含 start，不包含 end ）

```
arrayZ=( one two three four five five )

echo ${arrayZ[@]:0}     # one two three four five five
#                ^        All elements.

echo ${arrayZ[@]:1}     # two three four five five
#                ^        All elements following element[0].

echo ${arrayZ[@]:1:2}   # two three
#                  ^      Only the two elements after element[0].

echo ${arrayZ[@]:1:4}   # two three four five
```

## 一切皆是 array

需要注意的是，即使我们并没有按照前面提到的几种方法将一个变量声明为 array, 我们仍然可以对其进行 array 相关的操作。
换句话来说：__所有变量都可以被看作 array__ 。

比如说，下面这个例子中的变量 `string` 其实也是一个 array（包含一个元素）：

```bash
string=abcABC123ABCabc
echo ${string[@]}               # abcABC123ABCabc
echo ${string[*]}               # abcABC123ABCabc
echo ${string[0]}               # abcABC123ABCabc
echo ${string[1]}               # No output!
                                # Why?
echo ${#string[@]}              # 1
                                # One element in the array.
                                # The string itself.
```

# Array 进阶语法

## 对 array 中的第一个元素切片

- `$(array_name:start)` 返回 array_name[0][start:] （包含 start ）
- `$(array_name:start:end)` 返回 array_name[0][start:end] （包含 start ，包含 end ）

示例：
```bash
array=( zero one two three four five )
# Element 0   1   2    3     4    5

echo ${array[0]}       #  zero
echo ${array:0}        #  zero
                       #  Parameter expansion of first element,
                       #+ starting at position # 0 (1st character).
echo ${array:1}        #  ero
                       #  Parameter expansion of first element,
                       #+ starting at position # 1 (2nd character).
echo ${array:1:2}      #  er
                       #  Parameter expansion of first element,
                       #+ starting at position # 1 (2nd character).
```

## 切除子字符串

`${array_name[scope][flag][pattern]}`

scope:
- `@` | `*`   表示对全部元素进行操作
- n 表示对只第 n 个元素进行操作

flag:
- `#` 最短匹配，从头部开始
- `##` 最长匹配，从头部开始
- `%` 最短匹配，从尾部开始
- `%%` 最长匹配，从尾部开始

pattern: 通配符，可以使用 * 匹配任意长度字符串

- `${array_name[@]#pattern}` 移除 pattern 的最短匹配（从字符串头部开始匹配）
- `${array_name[@]##pattern}` 移除 pattern 的最长匹配（从字符串头部开始匹配）
- `${array_name[@]*pattern}` 移除 pattern 的最短匹配（从字符串尾部开始匹配）
- `${array_name[@]**pattern}` 移除 pattern 的最长匹配（从字符串尾部开始匹配）

```bash
# Substring Removal

# Removes shortest match from front of string(s).
echo ${arrayZ[@]#f*r}   # one two three five five
#               ^       # Applied to all elements of the array.
                        # Matches "four" and removes it.

# Longest match from front of string(s)
echo ${arrayZ[@]##t*e}  # one two four five five
#               ^^      # Applied to all elements of the array.
                        # Matches "three" and removes it.

# Shortest match from back of string(s)
echo ${arrayZ[@]%h*e}   # one two t four five five
#               ^       # Applied to all elements of the array.
                        # Matches "hree" and removes it.

# Longest match from back of string(s)
echo ${arrayZ[@]%%t*e}  # one two four five five
#               ^^      # Applied to all elements of the array.
                        # Matches "three" and removes it.

echo ${arrayZ[1]#t*}    # one wo three five five
                        # Applied to second element of the array.
                        # Matches "t" and removes it.

echo ${arrayZ[1]##t*}    # one three five five
                        # Applied to second element of the array.
                        # Matches "two" and removes it.
```

# Array 演进史

在 bash-2.0 中，bash 增加了对于用整数作为数组索引的支持，且索引部分可以使用算术表达式：

> The shell now supports integer-indexed arrays of unlimited length, with a new compound assignment syntax and changes to the appropriate builtin commands (declare/typeset, read, readonly, etc.).  The array index may be an arithmetic expression.
>
> -- [bash release note][bash release note]

未完待续

# 参考

- [bash release note][bash release note]
- [Arrays][arrays]
- [How to read all lines of a file into a bash array | Peniwize's Weblog](https://peniwize.wordpress.com/2011/04/09/how-to-read-all-lines-of-a-file-into-a-bash-array/)
- [http://mywiki.wooledge.org/BashGuide/Arrays](http://mywiki.wooledge.org/BashGuide/Arrays)

[arrays]: http://tldp.org/LDP/abs/html/arrays.html
[bash release note]: http://tiswww.case.edu/php/chet/bash/NEWS
