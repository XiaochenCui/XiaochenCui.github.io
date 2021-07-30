---
title: "Networking Notes"
date: 2021-07-30T14:51:16+08:00
---

# NAT

## Summary of the types of NAT

**NAT vs PAT** – these terms define whether just the IP address portion of the packet, or the IP address and Port number are being translated

**Static vs Dynamic** – these terms define whether the post-translation attributes are explicitly defined by the administrator, or ephemerally determined by the router.

When combined, this provides four possible variations of Network Address Translation:

- **Static NAT** – Translation of just the IP address where the administrator explicitly defines the IP address after translation
- **Static PAT** – Translation of the IP address and Port, where the administrator explicitly defines the IP address and Port after translation
- **Dynamic PAT** – Translation of the IP address and Port, where the router determines the new IP address and Port after translation
- **Dynamic NAT** – Translation of just the IP address, where the router determines the new IP address after translation

## Policy NAT and Twice NAT

- **Policy NAT** - Translation that occurs based upon matching both the Source and Destination of traffic.
- **A Twice NAT** - Translation that involves translating both the Source and Destination of traffic.

# References
- [Network Address Translation (NAT) – Article Series – Practical Networking .net](https://www.practicalnetworking.net/series/nat/nat/)
