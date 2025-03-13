```bash
fping -a -g -q 10.1.10.0/16
nmap -v -sn 10.1.10.0/24 -T4 | grep -v "host down"
```