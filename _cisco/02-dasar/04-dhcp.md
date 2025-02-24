---
sidebar_position: 4
---

# DHCP Server

## Pengenalan
Dynamic Host Configuration Protocol (DHCP) adalah protokol jaringan yang digunakan untuk memberikan konfigurasi IP secara otomatis kepada perangkat yang terhubung ke jaringan. Dengan menggunakan DHCP, administrator jaringan tidak perlu memberikan IP secara manual, sehingga dapat mengurangi risiko kesalahan konfigurasi dan meningkatkan efisiensi pengelolaan jaringan.

DHCP bekerja dengan menggunakan model client-server, di mana server DHCP bertugas untuk mendistribusikan alamat IP serta informasi jaringan lainnya kepada client yang memintanya. Protokol ini beroperasi menggunakan port berikut:
- **Port 67** untuk komunikasi server DHCP.
- **Port 68** untuk komunikasi client DHCP.

## Tahapan Kerja DHCP
Proses pemberian IP address oleh server DHCP kepada client terdiri dari beberapa tahapan berikut:

### 1. DHCP Discover
- Client yang baru saja terhubung ke jaringan akan mengirimkan pesan **DHCP DISCOVER** sebagai permintaan untuk mendapatkan alamat IP.
- Pesan ini dikirim dalam bentuk **broadcast** ke alamat **255.255.255.255** sehingga dapat diterima oleh semua perangkat dalam subnet tersebut.
- Tujuan utama dari tahap ini adalah mencari server DHCP yang tersedia dalam jaringan.

### 2. DHCP Offer
- Setelah menerima permintaan **DHCP DISCOVER**, server DHCP akan merespons dengan mengirimkan **DHCP OFFER** kepada client.
- Paket **DHCP OFFER** berisi informasi seperti:
  - **ID Client**
  - **Alamat IP yang ditawarkan**
  - **Subnet mask**
  - **Durasi sewa alamat IP (lease time)**
  - **Alamat IP server DHCP**
- Client akan memilih salah satu tawaran yang diberikan oleh server DHCP.

### 3. DHCP Request
- Setelah menerima beberapa tawaran dari server DHCP, client akan memilih salah satu alamat IP dan mengirimkan **DHCP REQUEST** sebagai konfirmasi kepada server DHCP yang dipilih.
- Isi pesan **DHCP REQUEST** antara lain:
  - Permintaan untuk menggunakan alamat IP tertentu
  - Informasi mengenai server DHCP yang dipilih
  - Parameter tambahan seperti gateway dan DNS

### 4. DHCP Acknowledge
- Server DHCP akan menanggapi permintaan client dengan mengirimkan **DHCP ACKNOWLEDGE (DHCP ACK)**.
- Pesan ini berisi informasi akhir yang mencakup:
  - **Alamat IP yang diberikan**
  - **Subnet mask**
  - **Default gateway**
  - **DNS Server**
  - **Durasi sewa alamat IP**
- Setelah client menerima **DHCP ACK**, konfigurasi jaringan pada client dianggap selesai dan client dapat mulai menggunakan jaringan.
- Server akan mencatat bahwa alamat IP tersebut telah diberikan kepada client dalam database DHCP.

## Konfigurasi DHCP Server
Untuk mengkonfigurasi DHCP server pada perangkat router, berikut langkah-langkahnya:

### 1. Konfigurasi Interface pada Router
Sebelum mengaktifkan DHCP, pastikan interface yang akan digunakan untuk memberikan alamat IP telah dikonfigurasi dengan benar.
```bash
(c)# interface gigabitEthernet 0/1
(c)# ip address 192.168.1.1 255.255.255.0
(c)# no shutdown
```

### 2. Membuat DHCP Pool
Langkah selanjutnya adalah membuat DHCP pool yang berisi informasi mengenai jaringan yang akan diberikan kepada client.
```bash
(c)# ip dhcp pool DHCP-Network
(c)# default-router 192.168.1.1  # Default gateway yang diterima oleh client
(c)# network 192.168.1.0 255.255.255.0  # Rentang alamat IP yang digunakan
(c)# dns-server 8.8.8.8  # DNS server yang akan digunakan oleh client
```

### 3. Mengatur Rentang IP yang Tidak Diberikan ke Client
Kadang-kadang, ada beberapa alamat IP dalam subnet yang ingin kita kecualikan dari distribusi DHCP, misalnya untuk server atau perangkat jaringan lain.
```bash
(c)# ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

### 4. Memeriksa Status DHCP
Setelah konfigurasi selesai, kita bisa memverifikasi status DHCP dengan perintah berikut:
```bash
(c)# show ip dhcp binding  # Menampilkan daftar alamat IP yang telah diberikan ke client
(c)# show ip dhcp pool  # Melihat status DHCP pool
```

## Konfigurasi DHCP Client
Agar client dapat menerima alamat IP secara otomatis dari server DHCP, lakukan langkah berikut:
1. **Pastikan client dikonfigurasi untuk mendapatkan IP secara otomatis.**
2. **Periksa apakah client telah menerima alamat IP dengan benar.**

Setelah client berhasil mendapatkan alamat IP dari server DHCP, berikut adalah contoh hasil konfigurasi IP yang diterima oleh client:
- **IP Address:** 192.168.1.2
- **Subnet Mask:** 255.255.255.0
- **Default Gateway:** 192.168.1.1
- **DNS Server:** 8.8.8.8

## Kesimpulan
Dengan menggunakan DHCP, administrator jaringan dapat mengelola alamat IP dengan lebih efisien dan mengurangi pekerjaan manual dalam mengatur konfigurasi jaringan. DHCP memungkinkan perangkat untuk mendapatkan alamat IP secara otomatis, menghindari konflik IP, serta menyediakan konfigurasi jaringan tambahan seperti gateway dan DNS tanpa perlu intervensi manual.

Protokol DHCP sangat berguna dalam jaringan skala kecil hingga besar, baik dalam lingkungan perusahaan, sekolah, atau bahkan jaringan rumah. Dengan memahami cara kerja dan konfigurasinya, kita dapat mengoptimalkan jaringan agar lebih mudah dikelola dan lebih efisien.