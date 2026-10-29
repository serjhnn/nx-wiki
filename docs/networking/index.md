# Networking

How computers exchange data: from signals on a wire or radio channel up to the applications that use them.

## Layers

Networking is organised in layers. Each layer uses the services of the one below and offers services to the one above.

| OSI layer | TCP/IP model | Unit of data | Examples |
|---|---|---|---|
| 7 Application | Application | message | HTTP, DNS, SSH |
| 6 Presentation | Application | message | TLS, encodings |
| 5 Session | Application | message | |
| 4 Transport | Transport | segment / datagram | TCP, UDP, QUIC |
| 3 Network | Internet | packet | IPv4, IPv6, ICMP |
| 2 Data link | Link | frame | Ethernet, Wi-Fi (MAC + LLC) |
| 1 Physical | Link | bits | copper, fibre, radio |

## Pages

- [MAC layer](mac-layer.md): addressing, frames and how devices share a medium
