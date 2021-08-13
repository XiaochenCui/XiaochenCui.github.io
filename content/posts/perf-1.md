---
title: "Advanced Perf"
date: 2021-08-13T10:45:16+08:00
---

# Perf Events Manual
| Event | Internal Name | Official Explanation | My Personal Understanding |
| --- | --- | --- | --- |
| task-clock | PERF_COUNT_SW_TASK_CLOCK | This reports a clock count specific to the task that is running. | Task-clock is based only on the time spent on the profiled task. |
| cpu-clock | PERF_COUNT_SW_CPU_CLOCK | This reports the CPU clock, a high-resolution per-CPU timer. | In the current implementation, cpu-clock is equivalent to task-clock, just ignore it |

## Reference

- [perf_event_open(2) - Linux manual page](https://man7.org/linux/man-pages/man2/perf_event_open.2.html)

# Using Perf on AMD

When doing perf on AMD platform, we found that some events are not counted/supported, such as:

- instructions
- branches (branch-instructions)
- branch-misses
- cache-misses
- cache-references

