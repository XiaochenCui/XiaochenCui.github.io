---
title: "Context Switch - Function Calling"
date: 2021-11-11T16:12:30+08:00
---

# Function Calling

Although the function calling was not summarized into the category of context switch generally, it is still a great choice to learn function calling as a warm-up.

# A Warm Up Example

The function calling is the most commonly used context switch for programmers. It gives a promise which the changes to variable doing by the callee would not take effect of the caller (unless deliberately or the variables of callee and caller point to the same memory location).

Here is an example of function calling:

```c
#include <stdio.h>

void inner_function(int a) {
  a = 100;
  printf("value of a (inside the inner function): %d\n", a);
}

int main() {
  int a = 1;
  printf("value of a (original): %d\n", a);
  inner_function(a);
  printf("value of a (after inner function was called): %d\n", a);
}
```

And the result shows that the value of a of the caller has not been affected by the callee:

```
value of a (original): 1
value of a (inside the inner function): 100
value of a (after inner function was called): 1
```

So the `main()` and `inner_function()` here are two **context**, we can switch at will between them without affecting the variables of themselves.

# Function Calling in x86 Assembly

The `CS` and `IP` register are the foundation to achieve functions callings in x86, where CS (code segment register) stores the memory location of the code segment current executed, and IP (instruction pointer) stores the offset address within the code segment of the memory. Hence CS:IP is used to point to the location of the currently executed code in the memory (it's a physical address when using the intel 8086 cpu).

So the function calling and returning is basically playing around `CS` and `IP` registers, those procedures are thoughtfully packaged into several instructions in the 8086 cp: `call` and `ret/retf`.

The `call` command is used to jump to a function's entrypoint in the calling manner, it's equivalent to:

```
push CS
push IP
jmp <location>  # <location> is a register or an raw address
								# e.g:
								# jmp 2AE3:3
								# which makes CS=2AE3H, IP=0003H, cpu will read the next
								# instrction from 2AE33H
								# jmp ax
								# which means "replace the value of IP register with the
								# value from ax register"
```

The `ret` command provides the ability to return within the same code segment, it's equivalent to:

```
pop IP
```

 the `retf` command provides the ability to return to a different code segment by modifies both `CS` and `IP` register:

```
pop IP
pop CS
```

After we have call and ret instructions, there is a very important issue must be dealt with: the registers used by subroutine (callee) are very likely also used by the caller, which caused conflicts in the use of registers.

For all registers used by the subroutine, its value must be saved to the stack when the subroutine starts to execute, and then restored before the subroutine returns, in a reverse order.

e.g: (assuming the `CX` and `SI` registers are used by the function `foo`)

```
foo:
			push cx
			push si
			(execution...)
			pop si
			pop cx
```

# Calling conventions of C language

There are three major calling conventions that are used with the C language on 32-bit x86 processors: STDCALL, CDECL, and FASTCALL

editing...

# Reference

- [https://en.wikipedia.org/wiki/Context_switch](https://en.wikipedia.org/wiki/Context_switch)
- 《汇编语言第三版》- 王爽
- [https://www.geeksforgeeks.org/memory-segmentation-8086-microprocessor/](https://www.geeksforgeeks.org/memory-segmentation-8086-microprocessor/)
- [https://stackoverflow.com/questions/17777146/what-is-the-purpose-of-cs-and-ip-registers-in-intel-8086-assembly](https://stackoverflow.com/questions/17777146/what-is-the-purpose-of-cs-and-ip-registers-in-intel-8086-assembly)
- [https://en.wikibooks.org/wiki/X86_Disassembly/Calling_Conventions](https://en.wikibooks.org/wiki/X86_Disassembly/Calling_Conventions)
- [https://stackoverflow.com/questions/4265970/c-to-assembly-call-convention-32bit-vs-64bit](https://stackoverflow.com/questions/4265970/c-to-assembly-call-convention-32bit-vs-64bit)