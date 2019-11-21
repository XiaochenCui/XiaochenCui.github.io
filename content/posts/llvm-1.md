---
title: "Walk Throught LLVM - Build on CentOS"
date: 2019-10-25T11:29:21+08:00
---

# Hardware Requirements

- 60GB disk space at least
- 10GB memory at least

# Software Environment

## Install GCC 8

```bash
yum install centos-release-scl
yum install devtoolset-8-gcc devtoolset-8-gcc-c++
scl enable devtoolset-8 -- bash
gcc --version
```

## Install Clang/LLVM 5

```bash
yum install llvm-toolset-7
scl enable llvm-toolset-7 -- bash
clang --version
```

## Install Cmake

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.16.0-rc2/cmake-3.16.0-rc2-Linux-x86_64.tar.gz
tar -xzvf cmake-3.16.0-rc2-Linux-x86_64.tar.gz
ln -sf /share/cmake-3.16.0-rc2-Linux-x86_64/bin/cmake /usr/local/bin/
cmake --version
```

# Build

```bash
git clone --depth=1 https://github.com/llvm/llvm-project.git
cd llvm-project
mkdir build
cd build
cmake -DLLVM_ENABLE_PROJECTS=clang -G "Unix Makefiles" ../llvm
make
```

# Reference

- [Clang - Getting Started](https://clang.llvm.org/get_started.html)
