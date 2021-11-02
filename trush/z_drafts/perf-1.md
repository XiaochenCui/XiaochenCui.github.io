---
title: "Advanced Perf"
date: 2021-08-13T10:45:16+08:00
draft: true
---

# Perf Events Manual

| Event                          | Internal Name            | Official Explanation                                             | My Personal Understanding                                                             |
| ------------------------------ | ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| task-clock                     | PERF_COUNT_SW_TASK_CLOCK | This reports a clock count specific to the task that is running. | Task-clock is based only on the time spent on the profiled task.                      |
| cpu-clock                      | PERF_COUNT_SW_CPU_CLOCK  | This reports the CPU clock, a high-resolution per-CPU timer.     | In the current implementation, cpu-clock is equivalent to task-clock, just ignore it. |
| context-switches               |
| cpu-migrations                 |
| page-faults                    |
| cycles                         |
| stalled-cycles-frontend        |
| stalled-cycles-backend         |
| instructions                   |
| branches (branch-instructions) |
| branch-misses                  |
| cache-misses                   | PERF_COUNT_HW_CACHE_MISSES | Cache misses.  Usually this indicates Last Level Cache misses; this is intended to be used in conjunction with the PERF_COUNT_HW_CACHE_REFERENCES event to calculate cache miss rates. | |
| cache-references               | PERF_COUNT_HW_CACHE_REFERENCES | Cache accesses.  Usually this indicates Last Level Cache accesses but this may vary depending on your CPU.  This may include prefetches and coherency messages; again this depends on the design of your CPU. | |

## Reference

- [perf_event_open(2) - Linux manual page](https://man7.org/linux/man-pages/man2/perf_event_open.2.html)
- [scheduler - Linux perf events: cpu-clock and task-clock - what is the difference - Stack Overflow](https://stackoverflow.com/questions/23965363/linux-perf-events-cpu-clock-and-task-clock-what-is-the-difference)
- [LKML](https://lkml.org/lkml/2010/11/3/373)

# Using Perf on AMD

When doing perf on AMD platform, we found that some events are not counted/supported, such as:

- instructions
- branches (branch-instructions)
- branch-misses
- cache-misses
- cache-references

We start with

```bash
perf list --help
```

At section `RAW HARDWARE EVENT DESCRIPTOR`

```text
RAW HARDWARE EVENT DESCRIPTOR
       Even when an event is not available in a symbolic form within perf right now, it can be encoded in a per processor specific way.

       ...
```

...shows the following NOTE

```text
       For instance For x86 CPUs NNN represents the raw register encoding with the layout of IA32_PERFEVTSELx MSRs (see [Intel® 64 and IA-32
       Architectures Software Developer’s Manual Volume 3B: System Programming Guide] Figure 30-1 Layout of IA32_PERFEVTSELx MSRs) or AMD’s
       PerfEvtSeln (see [AMD64 Architecture Programmer’s Manual Volume 2: System Programming], Page 344, Figure 13-7 Performance Event-Select
       Register (PerfEvtSeln)).
```

...armed with that URL you end up in

[AMD Manual(the newer version)](https://usermanual.wiki/Pdf/24593AMD6420Architecture20Programmers20ManualVolume202System20Programming.776747700/html#pf187)

or

[AMD Manual(the older version)](http://developer.amd.com/wordpress/media/2012/10/24593_APM_v2.pdf)

We will look up at the newer version next.

And we found Table 13-6 in `Section 13.4.2 Events and Event Records`:

![table13-6](/images/perf-1/table13-6-1.png)
![table13-6](/images/perf-1/table13-6-2.png)

