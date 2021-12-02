---
title: "Context Switch - libtask by Russ Cox"
date: 2021-12-02T16:57:10+08:00
---

# Intro

[libtask](https://swtch.com/libtask/) is a coroutine library that has cooperative scheduler and `channel` built-in. The `channel` is a multi-sender multi-receiver structure that could be used for synchronization and data transferring between coroutines.

We will use "task" to refer to "coroutine" in the following for coherency.

# Internal

## overview of running procedure

![libtask-switch.drawio.png](/images/context-switch-libtask/libtask-switch.drawio.png)

There are 4 exclusive states for any task given:

- running
- suspended, put in the task queue
- suspended, put in a channel's sender queue or receiver queue
- terminated

The program exit in 2 situations:

- no running task, no suspended task → exit normally
- no running task, having suspended task → exit with some task "stalled"

## basic data structures

![libtask-data structures.drawio.png](/images/context-switch-libtask/libtask-data_structures.drawio.png)

## global variables & states

- `Tasklist taskrunqueue`: a double-linked queue contains all tasks which are waiting-for-execute, the task was added to queue via append-to-tail, never inserted directly into the middle of the queue
- `Context taskschedcontext`: act as a breakpoint in the procedure of context switch
- `Task *taskrunning`: the task running currently
- `int taskcount`: total number of tasks not exited (running + suspended)

## a simple send

code:

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <task.h>

Channel *c;

void task_2(void *arg)
{
    printf("task_2 start\n");
    unsigned long v = chanrecvul(c);
    printf("received: %lu\n", v);
}

void taskmain(int argc, char **argv)
{
    c = chancreate(sizeof(unsigned long), 3);
    taskcreate(task_2, c, 32768);
    unsigned long v = 12345;
    printf("going to send number: %lu\n", v);
    chansendul(c, v);
    printf("send success: %lu\n", v);
}
```

output:

```
🍚  build git:(master) ✗ ./bin/chan_1
run 1 ()
going to send number: 12345
send success: 12345
back in scheduler
run 2 ()
task_2 start
received: 12345
back in scheduler
```

illustration of procedure:

![libtask-chan-1.drawio.png](/images/context-switch-libtask/libtask-chan-1.drawio.png)

## sending multiple values without any receiver

code:

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <task.h>

Channel *c;

void taskmain(int argc, char **argv)
{
    c = chancreate(sizeof(unsigned long), 3);
    for (unsigned long i = 0; i < 10; i++)
    {
        printf("going to send number: %lu\n", i);
        chansendul(c, i);
        printf("send success: %lu\n", i);
    }
    printf("taskmain end\n");
}
```

output:

```
🍚  build git:(master) ✗ ./bin/chan_1
run 1 ()
going to send number: 0
send success: 0
going to send number: 1
send success: 1
going to send number: 2
send success: 2
going to send number: 3
back in scheduler
no runnable tasks! 1 tasks stalled
```

illustration of procedure:

![libtask-chan-2.drawio.png](/images/context-switch-libtask/libtask-chan-2.drawio.png)

## sending multiple values to a receiver

code:

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <task.h>

Channel *c;

void task_2(void *arg)
{
    printf("task_2 start\n");
    for (int i = 0; i < 10; i++)
    {
        unsigned long v = chanrecvul(c);
        printf("received: %lu\n", v);
    }
    printf("task_2 end\n");
}

void taskmain(int argc, char **argv)
{
    c = chancreate(sizeof(unsigned long), 3);
    taskcreate(task_2, c, 32768);
    for (unsigned long i = 0; i < 10; i++)
    {
        printf("going to send number: %lu\n", i);
        chansendul(c, i);
        printf("send success: %lu\n", i);
    }
    printf("taskmain end\n");
}
```

output:

```
🍚  build git:(master) ✗ ./bin/chan_3
run 1 ()
going to send number: 0
send success: 0
going to send number: 1
send success: 1
going to send number: 2
send success: 2
going to send number: 3
back in scheduler
run 2 ()
task_2 start
received: 0
received: 1
received: 2
received: 3
back in scheduler
run 1 (taskmain)
send success: 3
going to send number: 4
send success: 4
going to send number: 5
send success: 5
going to send number: 6
send success: 6
going to send number: 7
send success: 7
going to send number: 8
back in scheduler
run 2 ()
received: 4
received: 5
received: 6
received: 7
received: 8
back in scheduler
run 1 (taskmain)
send success: 8
going to send number: 9
send success: 9
taskmain end
back in scheduler
run 2 ()
received: 9
task_2 end
back in scheduler
```

illustration of procedure:

![libtask-chan-3.drawio.png](/images/context-switch-libtask/libtask-chan-3.drawio.png)

# pondering

- **How context switching was achieved in `libtask`?**
    
     [setcontext](https://linux.die.net/man/2/setcontext), [getcontext](https://linux.die.net/man/2/getcontext)
    
- **What mechanism the scheduler of `libtask` use to determine which coroutine should be executed next?**
    
    Run the task at the head of the `taskrunqueue`.
    
- **What is the timing of context switching between coroutines? Via cooperative or preemptive?**
    
    Cooperative. A task voluntarily relinquished its control when it cannot move on at this moment. Specifically, there are the following situations:
    
    - transferring control actively by calling `taskswitch()`
    - send to a channel which is already filled
    - receive from an empty channel
- **How a channel maintaining its senders and receivers?**
    
    Via `Alt` struct, which includes all pieces of information of a send/receive action:
    
    - Task that perform this action
    - Action
    - Value
    - Target channel
- **If a task makes a send action to a channel with many receivers waiting on it, which receiver would be chosen to receive the element and go back to the task queue? Why?**
    
    A random receiver would be chosen because all receivers are considered to have equal opportunity.
    
- **If a task makes a receive action to a channel with many senders blocked, which sender would be chosen to put the element to buffer succeed and go back to the task queue? Why?**
    
    A random sender would be chosen because all senders are considered to have equal opportunity.
    

# reference

- [fcntl(2) - Linux manual page](https://man7.org/linux/man-pages/man2/fcntl.2.html)
- [https://swtch.com/libtask/](https://swtch.com/libtask/)
- [https://github.com/theanarkh/read-libtask-code](https://github.com/theanarkh/read-libtask-code)
- [https://github.com/XiaochenCui/libtask](https://github.com/XiaochenCui/libtask)
