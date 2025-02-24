---
sidebar_position: 9
---

# lainya

# Format DNS

Domain Name System (DNS) adalah sistem yang mengonversi nama domain menjadi alamat IP. Berikut beberapa jenis catatan DNS:

```
A - Alamat IPv4 perangkat akhir.
NS - Server nama otoritatif.
AAAA - Alamat IPv6 perangkat akhir (diucapkan quad-A).
MX - Catatan pertukaran email.
CNAME - Alias untuk domain lain.
TXT - Catatan teks yang bisa digunakan untuk verifikasi.
PTR - Catatan untuk reverse lookup dari IP ke nama domain.
SRV - Digunakan untuk menentukan lokasi layanan tertentu dalam domain.
```

# TCP Protokol

Transmission Control Protocol (TCP) adalah protokol komunikasi yang memungkinkan pengiriman data yang andal antara perangkat dalam jaringan.

## Jabat Tangan Tiga Arah (Three-Way Handshake)
Proses ini digunakan untuk membangun koneksi yang andal antara klien dan server.

```
syn => Client mengirim permintaan synchron ke server.
sync ack => Server merespons dengan synchronus dan acknowledge.
ack => Client mengonfirmasi koneksi.
```

## Jabat Tangan Dua Arah tapi 4 Proses (Four-Step Termination)
Ketika koneksi ditutup, proses ini digunakan untuk mengakhiri komunikasi dengan aman.

```
fin ack => Client mengirim sinyal untuk menyelesaikan koneksi.
ack => Server menerima permintaan untuk mengakhiri.
fin => Server mengakhiri koneksi.
ack => Client mengonfirmasi pemutusan koneksi.
```

# Enkapsulasi Data
Enkapsulasi data adalah proses menambahkan informasi tambahan ke dalam data untuk mendukung transmisi yang benar melalui jaringan.

- Menggunakan model OSI atau TCP/IP, transmisi data melalui berbagai lapisan dalam model tersebut.
- Enkapsulasi menambahkan informasi protokol ke data dalam bentuk header dan footer.
- Data dienkapsulasi mulai dari Application Layer hingga Physical Layer.

## Proses Enkapsulasi
1. **Application Layer**: Data dalam format aplikasi (HTTP, SMTP, FTP, dll.).
2. **Transport Layer**: Ditambahkan header TCP atau UDP untuk manajemen transmisi.
3. **Network Layer**: Ditambahkan alamat IP sumber dan tujuan.
4. **Data Link Layer**: Ditambahkan alamat MAC sumber dan tujuan.
5. **Physical Layer**: Data diubah menjadi sinyal listrik atau gelombang.

# ARP (Address Resolution Protocol)
ARP digunakan untuk memetakan alamat IP ke alamat fisik (MAC Address).

## Fungsionalitas
- Ketika perangkat ingin menghubungi perangkat lain dalam jaringan lokal, tetapi hanya memiliki alamat IP-nya, ARP digunakan untuk mendapatkan alamat MAC.
- ARP mengirimkan permintaan siaran ke semua perangkat di jaringan untuk mencari alamat MAC yang sesuai dengan IP tujuan.
- Perangkat dengan IP yang cocok merespons dengan alamat MAC-nya.

## Penggunaan Umum
- ARP digunakan dalam jaringan lokal untuk memungkinkan komunikasi antar perangkat dengan menerjemahkan alamat IP menjadi alamat MAC.

## Alur Protokol
1. Pengirim melakukan siaran (broadcast) permintaan ARP.
2. Perangkat tujuan mengirim respons dengan alamat MAC-nya.
3. Tabel ARP diperbarui untuk mempercepat proses di masa mendatang.

## Manajemen Tabel
- Tabel ARP disimpan dalam perangkat dan mencatat pasangan alamat IP dan MAC.

# RARP (Reverse Address Resolution Protocol)
RARP digunakan untuk memetakan alamat MAC ke alamat IP.

## Fungsionalitas
- Digunakan oleh perangkat yang hanya mengetahui alamat MAC-nya tetapi tidak mengetahui alamat IP.
- Perangkat mengirim permintaan RARP ke server.
- Server merespons dengan memberikan alamat IP.

## Penggunaan Umum
- Digunakan pada perangkat diskless (tanpa penyimpanan lokal) yang membutuhkan IP saat booting.
- Tidak lagi banyak digunakan karena digantikan oleh DHCP.

## Alur Protokol
1. Perangkat mengirim permintaan dengan alamat MAC.
2. Server RARP mencari alamat IP yang sesuai dan mengirimkannya kembali.

## Manajemen Tabel
- Tabel RARP dikelola oleh server RARP.

# Ringkasan
- **ARP** digunakan untuk mendapatkan alamat MAC berdasarkan IP.
- **RARP** digunakan untuk mendapatkan alamat IP berdasarkan MAC.
- **ARP** lebih umum digunakan di jaringan modern, sedangkan **RARP** jarang digunakan karena digantikan oleh DHCP.
- **Enkapsulasi data** memastikan transmisi informasi yang tepat melalui berbagai lapisan model jaringan.
- **TCP** menggunakan jabat tangan tiga arah untuk membangun koneksi yang andal dan jabat tangan dua arah untuk mengakhiri komunikasi.

Memahami protokol jaringan seperti TCP, ARP, dan RARP sangat penting dalam administrasi sistem dan keamanan jaringan.