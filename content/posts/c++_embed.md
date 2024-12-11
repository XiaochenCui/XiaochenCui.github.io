---
title: "Embed Files to C++ at Compile Time"
date: 2024-12-11T11:00:38-08:00
draft: true
---

This article will guide you through how to embed binary/text files to C++ as a char array, like the convenient `go:embed` command.

We will focus on C23 `#embed`, it is supported from GCC 15 and Clang 19. Note that this feature need new compiler but doesn’t need new standard, you don’t have to compile your code with `-std=c++23`, `-std=c++17` is enough.

For other approach of embedding, refers to:

- https://github.com/batterycenter/embed
- https://github.com/cyrilcode/embed-resource

# Embed Files To C++

### Step 1 - Install Clang 19 or Newer Version

```bash
# install clang 20 in ubuntu
wget https://apt.llvm.org/llvm.sh
chmod u+x llvm.sh
sudo ./llvm.sh 20
# or one line: wget -qO- https://apt.llvm.org/llvm.sh | bash -s -- 20

# verify
clang-20 --version
```

## Step 2 - Embed Files Easily

Create two files in a same directory:

`message.txt`:

```
hi, this is a message from message.txt
```

`demo.cc`:

```cpp
#include <iostream>

const char message[] = {
    #embed "message.txt"
    , '\0' // null terminator
};

int main() {
  std::string_view message_str(message);
  std::cout << "message_str: " << message_str << std::endl;
}
```

compile and run:

```bash
> clang++-20 demo.cc -std=c++17 -Wno-c23-extensions
> ./a.out
message_str: hi, this is a message from message.txt
```

Here are something to notice:

- Must type a new line after `#embed "message.txt"` (this is wrong: `#embed "message.txt", '\0'`).
- Must use c++ standard 17 or newer.
- (optional) Use `-Wno-c23-extensions` to suppress `warning: #embed is a Clang extension`.

# Embed Files To C++, in Bazel Project

### Step 1 - Embed the File in C++ Code

Embed the file using absolute or relative path. In this example, demo_plan.json is a file within the same folder with the source code:

```cpp
const char message[] = {
    #embed "demo_plan.json"
    , '\0' // null terminator
};
```

Full code:

https://github.com/small-db/small-db-v2/blob/bcfcbd9bd56020580ab20b07ac416fb48f026dad/src/query/query.cc#L118

### Step 2 - Create a Clang-20 Toolchain

Follow this tutorial to create a custom toolchain:

https://bazel.build/tutorials/ccp-toolchain-config

Then replace the compiler to `clang-20`. The full code is here:

- https://github.com/small-db/small-db-v2/tree/main/toolchain

Then register this toolchain in file MODULE.bazel:

```
# ================================================================================ #
# custom toolchain
# ================================================================================ #
bazel_dep(name = "platforms", version = "0.0.10")
register_toolchains(
    "//toolchain:xc_toolchain_clang20",
)
```

### Step 3 - Add Path

Add absolute path of the directory which contains the file we want embed to `create_cc_toolchain_config_info.cxx_builtin_include_directories`:

```
        cxx_builtin_include_directories=[
            "/usr/lib/llvm-20/lib/clang/20/include",
            "/usr/include",
            # note that we must use absolute path here since clang embeds the file using absolute path
            "/home/xiaochen/code/small-db-v2/src/query",
        ],
```

### Step 4 - Build / Run

Build the target:

```bash
bazel build <target-path>

# e.g: build target "//src/query:query" which embed a file
bazel build //src/query:query
```

### Refresh File Content

After change the content of the embed file, rebuild the target by remove its binary:

```bash
rm -rf bazel-bin/<package-path>
bazel build <target-path>

# e.g: remove the binary of package "//src/query"
rm -rf bazel-bin/src/query
bazel build //src/query:query
```

# References

- https://ubuntuhandbook.org/index.php/2023/09/how-to-install-clang-17-or-16-in-ubuntu-22-04-20-04/
- https://askubuntu.com/questions/1508260/how-do-i-install-clang-18-on-ubuntu
- https://bazel.build/tutorials/ccp-toolchain-config
- https://en.cppreference.com/w/c/preprocessor/embed
- https://en.cppreference.com/w/c/compiler_support/23
- https://bazel.build/rules/lib/toplevel/cc_common#create_cc_toolchain_config_info