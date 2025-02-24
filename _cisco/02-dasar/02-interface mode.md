---
sidebar_position: 2
---

# Pengenalan

## Interface
Interface merupakan antarmuka jaringan atau perangkat yang memungkinkan mereka untuk saling berkomunikasi dan bekerja pada layer 1 dari model OSI.

## Default Gateway
Default gateway meneruskan subnet lokal ke perangkat di subnet lain. Dengan kata lain, gateway default menghubungkan jaringan lokal ke internet atau jaringan lain.

### Contoh Default Gateway:
- 192.168.1.1
- 192.168.1.254

> **Catatan:** Default gateway tidak boleh memiliki IP address yang sama dengan perangkat lain dalam jaringan.

---

# Konfigurasi

## Interface
Interface digunakan untuk menghubungkan perangkat dengan router melalui port yang tersedia.

### Contoh Konfigurasi Interface:
- **PC 0** : `fa 0/0`
- **Router** : `fa 0/1`

### Menambahkan IP Address ke Interface
```cisco
(c)# interface fastEthernet <port>
(c)# ip address <ip_address> <subnet_mask>
(c)# no shutdown
```

### Mengelompokkan IP Address pada Interface Range
```cisco
(c)# interface range fastEthernet <start_port> - <end_port>
(c)# ip address <ip_address> <subnet_mask>
(c)# no shutdown
```

### Menonaktifkan Interface
```cisco
(c)# shutdown
```

### Mengaktifkan Kembali Interface
```cisco
(c)# no shutdown
```

### Menampilkan Informasi Interface yang Terhubung
```cisco
# show ip interface brief
```

---

## Mengatur IP Address PC
### Format Konfigurasi:
- **IP Address**: `<ip_address>`
- **Subnet Mask**: `<subnet_mask>`
- **Default Gateway**: `<ip_interface_router>`

### Contoh Konfigurasi:
#### PC 0:
- **IP Address**: `192.168.1.1`
- **Subnet Mask**: `255.255.255.0`
- **Default Gateway**: `192.168.1.254`

#### Router:
- **fa 0/0**: `192.168.1.254`

---

# Kesimpulan

## Jaringan
- Dalam jaringan, perangkat hanya bisa berkomunikasi dengan perangkat yang berada di jaringan yang sama.
- Perangkat hanya dapat mengirim lalu lintas langsung ke alamat IP yang berada dalam jaringan yang sama.

### Contoh Kasus:
#### Tiga Perangkat dalam Jaringan:
- **A** = `192.168.1.1/24`
- **B** = `192.168.1.2/24`
- **C** = `192.168.2.1/24`

- Perangkat **A** dapat berkomunikasi dengan perangkat **B** karena mereka berada dalam jaringan yang sama.
- Perangkat **A** dan **B** tidak dapat berkomunikasi dengan perangkat **C** yang memiliki IP `192.168.2.1` karena mereka berada dalam jaringan yang berbeda.

## Default Gateway
- Default gateway adalah alamat IP router yang digunakan oleh perangkat untuk mengirim lalu lintas ke jaringan luar.
- Setiap perangkat dalam jaringan harus dikonfigurasikan dengan default gateway yang benar untuk berkomunikasi dengan jaringan lain.

### Contoh:
Jika kita memiliki komputer dengan **IP 192.168.1.10** yang terhubung ke router dengan antarmuka **192.168.1.254**, maka router ini berfungsi sebagai **default gateway** untuk komputer tersebut.

- **Router memungkinkan perangkat dari satu jaringan untuk berkomunikasi dengan perangkat di jaringan lain.**
- **Pastikan perangkat terhubung ke router dengan benar dan mengatur default gateway dengan benar agar komunikasi antar jaringan berfungsi.**

### Contoh Pengaturan Jaringan dengan Router:
Jika kita memiliki **dua jaringan** yaitu `192.168.1.x` dan `192.168.2.x`, kita dapat menggunakan router untuk menghubungkan keduanya.

- **Antarmuka router 1**: `192.168.1.1` atau `192.168.1.254`
- **Antarmuka router 2**: `192.168.2.1` atau `192.168.2.254`

> Dengan konfigurasi ini, router memungkinkan perangkat dari kedua jaringan untuk saling berkomunikasi.

---

# Tambahan Konfigurasi Router

## Mengatur Routing Statis
```cisco
(c)# ip route <destination_network> <subnet_mask> <next_hop>
```
### Contoh:
```cisco
(c)# ip route 192.168.2.0 255.255.255.0 192.168.1.254
```

## Mengaktifkan DHCP Server di Router
```cisco
(c)# ip dhcp pool <nama_pool>
(c)# network <ip_network> <subnet_mask>
(c)# default-router <ip_router>
(c)# dns-server <ip_dns>
```
### Contoh:
```cisco
(c)# ip dhcp pool LAN
(c)# network 192.168.1.0 255.255.255.0
(c)# default-router 192.168.1.254
(c)# dns-server 8.8.8.8
```

## Menampilkan Konfigurasi DHCP
```cisco
# show ip dhcp binding
```

## Menampilkan Routing Table
```cisco
# show ip route
```

Dengan konfigurasi ini, jaringan dapat diatur dengan lebih optimal dan fleksibel sesuai kebutuhan.
