---
sidebar_position: 4
---

# prevention MNDP Attack

MNDP (Mikrotik Neighbor Discovery Protocol) merupakan protokol layer 2 dalam broadcast domain yang memungkinkan perangkat untuk menemukan perangkat lain yang juga mengaktifkan MNDP, CDP (Cisco Discovery Protocol), atau LLDP (Link Layer Discovery Protocol).

Informasi jaringan yang ditampilkan dari MNDP dapat mencakup identitas perangkat keras, MAC address, IP address, dan bahkan versi perangkat. Contoh sederhana adalah saat membuka WinBox untuk meremote router, bagian **Neighbors** akan menampilkan informasi seperti MAC address, identity, dan IP address dari router MikroTik.

![alt text](<images/prevention mndp/image.png>)

Ketika MNDP aktif, pengguna dalam satu layer 2 dengan router dapat dengan mudah menemukan router dan mengetahui beberapa informasi perangkat. Pada router MikroTik, perangkat yang menjalankan MNDP, LLDP, dan CDP dapat dilihat di menu **IP > Neighbors**.

### **MNDP Attack**

MNDP Attack adalah serangan yang dilakukan dengan cara melakukan **flood paket CDP** sehingga tabel **neighbors** pada router menjadi penuh. Selain itu, serangan ini juga dapat menyebabkan peningkatan beban pada CPU router, yang dapat mengganggu stabilitas jaringan.

#### **Simulasi MNDP Attack**

![alt text](<images/prevention mndp/image-1.png>)

Secara default, router MikroTik akan menampilkan semua perangkat yang terhubung di semua interface. Seorang hacker dapat memanfaatkan fitur ini untuk melakukan **flooding CDP**, yang mengakibatkan daftar perangkat di **IP > Neighbors** penuh dengan informasi yang tidak valid. Hal ini dapat menyebabkan kesulitan dalam manajemen jaringan serta memperlambat kinerja router.

![alt text](<images/prevention mndp/image-2.png>)

### **Cara Mengatasi MNDP Attack**

#### **1. Menonaktifkan CDP pada Discovery Setting**

![alt text](<images/prevention mndp/image-3.png>)

Langkah ini cukup sederhana, tetapi jika dilakukan, router tidak akan menampilkan informasi perangkat yang menggunakan protokol CDP, sehingga kurang efektif dalam beberapa kasus.

#### **2. Melakukan Filter atau Menentukan Interface yang Diizinkan untuk Broadcast**

Cara ini lebih efektif karena hanya **interface tertentu** yang diizinkan untuk menggunakan MNDP. Berikut langkah-langkahnya:

**Langkah 1: Membuat Interface List**

![alt text](<images/prevention mndp/image-4.png>)

1. Buka **Interfaces** di MikroTik.
2. Pilih **Interface List**.
3. Buat **list baru** untuk menyeleksi interface yang akan menjalankan MNDP.
4. Beri nama list sesuai keperluan, misalnya "Trusted_Interfaces".

**Langkah 2: Menambahkan Interface ke List**

![alt text](<images/prevention mndp/image-5.png>)

1. Klik tombol **+** pada **Interface List**.
2. Pilih **interface yang akan menjalankan MNDP** (misalnya, `ether1`).

![alt text](<images/prevention mndp/image-6.png>)

**Langkah 3: Mengkonfigurasi IP Neighbors**
1. Buka **IP > Neighbors > Discovery Settings**.
2. Atur **Discovery Interface** ke **interface list** yang telah dibuat sebelumnya.

![alt text](<images/prevention mndp/image-7.png>)

3. Pilih protokol yang akan diterima (MNDP, CDP, atau LLDP).

![alt text](<images/prevention mndp/image-8.png>)

Hasilnya, router hanya akan menerima informasi **neighbors** dari interface yang telah ditentukan dalam list. Ini akan membatasi potensi serangan MNDP flooding.

![alt text](<images/prevention mndp/image-9.png>)

### **Kesimpulan**

Serangan MNDP Attack dapat menyebabkan gangguan besar pada jaringan, terutama dengan membanjiri tabel neighbors dan membebani CPU router. Dengan menerapkan metode di atas, jaringan dapat lebih terlindungi dari serangan berbasis **MNDP flooding**. Pastikan untuk selalu memeriksa pengaturan keamanan jaringan agar router tetap berfungsi dengan optimal.

Bagaimana, cukup mudah bukan? Meskipun langkah-langkahnya sederhana, sering kali kita lupa untuk menerapkan pengamanan ini. Jadi, pastikan untuk mengamankan jaringan MikroTik dari MNDP Attack!

## **Referensi**
- [Mitigasi MNDP Attack](https://mikrotik.co.id/artikel/517/)