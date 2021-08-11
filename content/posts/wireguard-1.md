---
title: "Play With Wireguard - Build A LAN AND USE "
date: 2021-08-11T12:10:10+08:00
draft: true
---

# Reference
- https://gist.github.com/nealfennimore/92d571db63404e7ddfba660646ceaf0d
- https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/


wg genkey | tee privatekey | wg pubkey > publickey

注意：把 eth0 改成合适的 interface

# ---------- Server Config ----------
[Interface]
Address = 10.10.29.1/24 # IPV4 CIDR 
Address = fd86:ea04:1111::1/64 # IPV6 CIDR 
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE; ip6tables -A FORWARD -i wg0 -j ACCEPT; ip6tables -t nat -A POSTROUTING -o eth0 -j MASQUERADE # Add forwarding when VPN is started
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE; ip6tables -D FORWARD -i wg0 -j ACCEPT; ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE # Remove forwarding when VPN is shutdown
PrivateKey = iDg3Af6OLJoIIbc+5Q1wHEkvl5xIYIPZFm9vtvDXGHI= # Put server private key here
ListenPort = 51429 # Port server should be listening on

[Peer]
PublicKey = Gn17wwlfCUMzV1cZKoYwnACtp0HxhfdClsWcUU5jtzQ= # Client public key
AllowedIPs = 10.10.29.2/32, fd86:ea04:1111::2/128 # IPs client can connect as

🍔  wg cat privatekey
iDg3Af6OLJoIIbc+5Q1wHEkvl5xIYIPZFm9vtvDXGHI=
🍚  wg cat publickey
4nvzryIn8EFPkxuttHRIsGgLLyJ1qpppCz6Wv0D0Jzc=

# ---------- Client Config ----------
[Interface]
Address = 10.10.29.2/32 # IPV4 address client is allowed to connect as
Address = fd86:ea04:1111::2/128 # IPV6 address client is allowed to connect as
PrivateKey = AFZmxNzMxLcAxScfelZsBLA/YJZxdliscEwHPn1emHM= # Client private key goes here
DNS = 1.1.1.1 # DNS client should use for resolution (Cloudflare here)

[Peer]
PublicKey = 4nvzryIn8EFPkxuttHRIsGgLLyJ1qpppCz6Wv0D0Jzc= # Server public key
Endpoint = 35.221.95.176:51429 # Where the server is at + the listening port
AllowedIPs = 0.0.0.0/0, ::/0 # Forward all traffic to server

🍚  wg cat privatekey
AFZmxNzMxLcAxScfelZsBLA/YJZxdliscEwHPn1emHM=
🍚  wg cat publickey
Gn17wwlfCUMzV1cZKoYwnACtp0HxhfdClsWcUU5jtzQ=


sysctl --system # read values from all system directories

allow ips:
0.0.0.0/0, ::/0

blocked ips:
58.247.126.58, 0.0.0.0/8, 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.168.0.0/16, 240.0.0.0/4, fc00::/7, fe80::/10

result:
AllowedIPs = 1.0.0.0/8, 2.0.0.0/7, 4.0.0.0/6, 8.0.0.0/7, 11.0.0.0/8, 12.0.0.0/6, 16.0.0.0/4, 32.0.0.0/4, 48.0.0.0/5, 56.0.0.0/7, 58.0.0.0/9, 58.128.0.0/10, 58.192.0.0/11, 58.224.0.0/12, 58.240.0.0/14, 58.244.0.0/15, 58.246.0.0/16, 58.247.0.0/18, 58.247.64.0/19, 58.247.96.0/20, 58.247.112.0/21, 58.247.120.0/22, 58.247.124.0/23, 58.247.126.0/27, 58.247.126.32/28, 58.247.126.48/29, 58.247.126.56/31, 58.247.126.59/32, 58.247.126.60/30, 58.247.126.64/26, 58.247.126.128/25, 58.247.127.0/24, 58.247.128.0/17, 58.248.0.0/13, 59.0.0.0/8, 60.0.0.0/6, 64.0.0.0/3, 96.0.0.0/4, 112.0.0.0/5, 120.0.0.0/6, 124.0.0.0/7, 126.0.0.0/8, 128.0.0.0/3, 160.0.0.0/5, 168.0.0.0/8, 169.0.0.0/9, 169.128.0.0/10, 169.192.0.0/11, 169.224.0.0/12, 169.240.0.0/13, 169.248.0.0/14, 169.252.0.0/15, 169.255.0.0/16, 170.0.0.0/7, 172.0.0.0/12, 172.32.0.0/11, 172.64.0.0/10, 172.128.0.0/9, 173.0.0.0/8, 174.0.0.0/7, 176.0.0.0/4, 192.0.0.0/9, 192.128.0.0/11, 192.160.0.0/13, 192.169.0.0/16, 192.170.0.0/15, 192.172.0.0/14, 192.176.0.0/12, 192.192.0.0/10, 193.0.0.0/8, 194.0.0.0/7, 196.0.0.0/6, 200.0.0.0/5, 208.0.0.0/4, 224.0.0.0/4, ::/1, 8000::/2, c000::/3, e000::/4, f000::/5, f800::/6, fe00::/9, fec0::/10, ff00::/8