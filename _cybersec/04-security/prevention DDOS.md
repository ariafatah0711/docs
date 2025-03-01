---
sidebar_position: 1
---

# prevention ddos mikrotik

Memberikan keamanan kepada Router adalah salah satu kewajiban yang harus dilakukan oleh admin jaringan. Selain konfigurasi dan troubleshooting, admin jaringan juga wajib mengamankan perangkat jaringan seperti Router dan Server.

Sebelum menghubungkan Router ke Internet, langkah awal yang dapat dilakukan adalah:
- Mengganti username dan password default.
- Menutup layanan yang tidak terpakai.
- Menonaktifkan Neighbor Discovery.

### Proteksi dari Serangan DDOS
DDOS (Distributed Denial of Service) adalah serangan yang membanjiri lalu lintas jaringan sehingga menyebabkan penggunaan resource yang tinggi. Untuk menghindari serangan DDOS, berikut adalah langkah-langkah konfigurasi pada Router Mikrotik.

#### **Konfigurasi Firewall Filter**

1. **Membuat rule firewall filter untuk memblokir IP penyerang**
```shell
/ip firewall filter
add chain=forward connection-state=new src-address-list=ddoser dst-address-list=ddosed action=drop
```

2. **Menangkap semua koneksi "new" dan membuat chain baru "detect-ddos"**
```shell
/ip firewall filter
add chain=forward connection-state=new action=jump jump-target=detect-ddos
```

3. **Menentukan batas koneksi per detik dan mengembalikan rule jika memenuhi kriteria**
```shell
/ip firewall filter
add chain=detect-ddos dst-limit=32,32,src-and-dst-addresses/1s action=return
add chain=detect-ddos src-address=192.168.0.1 action=return
```

4. **Menambahkan alamat IP ke dalam address list jika melebihi batas yang telah ditentukan**
```shell
/ip firewall filter
add chain=detect-ddos action=add-dst-to-address-list address-list=ddosed address-list-timeout=10m
add chain=detect-ddos action=add-src-to-address-list address-list=ddoser address-list-timeout=10m
```

### **Kesimpulan**
Dengan konfigurasi di atas, ketika terdapat paket "new" yang melebihi 32 paket per detik, maka alamat IP penyerang akan masuk ke dalam address list "ddoser" dan alamat IP target masuk ke dalam address list "ddosed". Setelah terdeteksi, firewall akan memblokir IP penyerang secara otomatis untuk mencegah serangan lebih lanjut. Dengan demikian, server dan perangkat jaringan lainnya dapat lebih aman dari serangan DDOS.

Konfigurasi ini membantu mengamankan infrastruktur jaringan dengan memfilter lalu lintas berbahaya dan menjaga kestabilan layanan.