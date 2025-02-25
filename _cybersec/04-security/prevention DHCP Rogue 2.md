# DHCP Snooping pada MikroTik

## **Pendahuluan**
Dynamic Host Configuration Protocol (DHCP) adalah fitur pada RouterOS MikroTik yang terdiri dari dua bagian utama, yaitu **DHCP Server** dan **DHCP Client**. DHCP Server berfungsi untuk mendistribusikan konfigurasi jaringan ke client secara otomatis, termasuk **IP Address, Netmask, Gateway, DNS**, dan lain-lain. Penggunaan DHCP bertujuan agar administrator tidak perlu melakukan pengaturan jaringan secara manual pada setiap client.

Salah satu ancaman keamanan yang dapat terjadi dalam jaringan yang menggunakan DHCP adalah **Rogue DHCP Server**. Rogue DHCP Server merupakan DHCP Server yang tidak sah dan memberikan konfigurasi IP yang salah kepada client, sehingga dapat digunakan untuk serangan seperti **Man-in-the-Middle (MitM)**.

Sejak **RouterOS versi 6.43**, MikroTik telah menyediakan fitur **DHCP Snooping** untuk mencegah DHCP Rogue dalam jaringan.

---

## **Apa itu DHCP Snooping?**
DHCP Snooping adalah fitur keamanan Layer 2 yang digunakan untuk **membatasi DHCP Server yang tidak sah**, sehingga hanya DHCP Server yang dipercaya yang dapat memberikan konfigurasi IP kepada client.

Dalam DHCP Snooping, kita dapat menentukan port pada bridge yang bersifat:
- **Trusted** → Hanya port ini yang diperbolehkan meneruskan paket DHCP dari DHCP Server asli.
- **Untrusted** → Jika terdapat DHCP Server pada port ini, maka paket DHCP yang dikirim akan diabaikan.

Selain itu, DHCP Snooping juga mendukung **DHCP Option 82**, yang memberikan informasi tambahan (Agent Circuit ID dan Agent Remote ID) untuk mengidentifikasi perangkat dan client DHCP dalam jaringan.

---

## **Topologi Simulasi**
Simulasi akan menggunakan **2 router** dan **1 perangkat switch**:
- **Router 1** → Sebagai DHCP Server asli (terhubung ke switch pada port `ether2`)
- **Router 2** → Sebagai Rogue DHCP Server (terhubung ke switch pada port acak)
- **Switch MikroTik** → Semua port masuk ke dalam interface bridge

Konfigurasi jaringan yang digunakan:
- **DHCP Server asli** → **192.168.99.0/24**
- **Rogue DHCP Server** → **192.168.100.0/24**

Jika DHCP Snooping **tidak diaktifkan**, maka client dapat menerima konfigurasi IP secara **random** dari DHCP Server asli atau Rogue DHCP Server.

---

## **Langkah Konfigurasi DHCP Snooping**

1. **Tandai port yang terhubung ke DHCP Server asli sebagai Trusted**
   - Masuk ke **menu Bridge-Port**
   - Klik dua kali pada port `ether2` yang terhubung ke DHCP Server asli
   - Centang **Trusted**
   - Klik **Apply** lalu **OK**

2. **Aktifkan DHCP Snooping dan DHCP Option 82**
   - Masuk ke **menu Bridge** → **Tab Bridge**
   - Pilih interface bridge yang digunakan
   - Centang **DHCP Snooping** dan **Add DHCP Option 82**
   - Klik **Apply** lalu **OK**
   
   Atau bisa langsung menggunakan perintah di Terminal:
   ```bash
   /interface bridge set [find where name="bridge"] dhcp-snooping=yes add-dhcp-option82=yes
   ```

---

## **Pengujian DHCP Snooping**

1. **Pastikan client mendapatkan IP dari DHCP Server asli**
   - Pada Windows, gunakan perintah berikut di **Command Prompt**:
     ```powershell
     ipconfig /release
     ipconfig /renew
     ```
   - Pastikan client mendapatkan IP dari **192.168.99.0/24**

2. **Coba jalankan Rogue DHCP Server pada port selain `ether2`**
   - Jika DHCP Snooping berjalan dengan benar, client **tidak akan menerima IP dari DHCP Rogue**

---

## **Kesimpulan**
DHCP Snooping adalah fitur keamanan yang sangat berguna untuk **mencegah DHCP Rogue** dalam jaringan. Dengan mengaktifkan DHCP Snooping dan mengatur port yang **Trusted dan Untrusted**, administrator dapat memastikan bahwa client hanya akan mendapatkan konfigurasi IP dari DHCP Server yang sah.

Dengan menerapkan metode ini, jaringan akan lebih aman dari serangan **Man-in-the-Middle** dan penyalahgunaan DHCP Server.

---

## **Referensi**
- [Pencegahan DHCP Rogue dengan Bridge Filter](https://citraweb.com/artikel_lihat.php?id=252)
- Dokumentasi MikroTik: [DHCP Snooping](https://help.mikrotik.com/docs/display/ROS/DHCP+Snooping)