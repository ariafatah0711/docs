---
draft: true
---

# Evil Twin Attack dengan ESP8266

## Persiapan

Sebelum memulai, pastikan Anda memiliki perangkat dan perangkat lunak berikut:

### Perangkat Keras

- ESP8266

### Perangkat Lunak yang Dibutuhkan

- **esptool**
- **Arduino IDE**

### Instalasi Driver

Pastikan driver untuk ESP8266 telah terinstal dengan benar. Unduh dan instal driver yang sesuai dengan perangkat Anda:

- **CH340/CH341 Drivers**: [Download](https://wch-ic.com/downloads/CH341SER_ZIP.html)
- **CP210x Drivers**: [Download](https://silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FTDI Drivers**: [Download](https://ftdichip.com/drivers/)

## Instalasi DeautherX

1. **Unduh dan Ekstrak DeautherX**
   - Unduh DeautherX dari sumber yang terpercaya.
   - Ekstrak file ZIP yang telah diunduh.

2. **Buka Proyek di Arduino IDE**
   - Masuk ke folder hasil ekstraksi.
   - Buka file `DeautherX.ino` menggunakan Arduino IDE.

3. **Tambahkan URL Board Manager**
   - Buka Arduino IDE.
   - Pergi ke **File > Preferences**.
   - Tambahkan URL berikut pada kolom *Additional Boards Manager URLs*:
     ```
     https://raw.githubusercontent.com/SpacehuhnTech/arduino/main/package_spacehuhn_index.json
     ```

4. **Instal Board ESP8266 Deauther**
   - Buka **Tools > Board > Boards Manager**.
   - Cari *Deauther* dan instal **Deauther ESP8266 Boards**.

5. **Pilih Board yang Tepat**
   - Pergi ke **Tools > Board**.
   - Pilih **Deauther ESP8266 Boards** *(bukan ESP8266 Modules!)*.

6. **Hubungkan ESP8266 ke Komputer**
   - Sambungkan ESP8266 ke komputer menggunakan kabel USB.
   - Pilih port yang sesuai di **Tools > Port**.

7. **(Opsional) Hapus Flash Sebelumnya**
   - Jika ingin menghapus pengaturan sebelumnya, pergi ke **Tools > Erase Flash > All Flash Contents**.

8. **Upload Firmware**
   - Tekan tombol **Upload** untuk mulai mem-flash firmware ke ESP8266.

## Penggunaan DeautherX

1. **Sambungkan ke Wi-Fi Deauther**
   - **SSID**: `DeautherX`
   - **Password**: `BlackTechX`
2. **Akses Antarmuka Web** di:
   ```
   192.168.4.1
   ```
3. **Navigasi Menu**:
   - **Scan**: Mendeteksi jaringan & perangkat.
   - **SSIDs**: Kelola SSID palsu.
   - **Attack**: Jalankan Deauth, Beacon Flood, atau Evil Twin.
   - **Settings**: Konfigurasi tambahan.

## Menjalankan Evil Twin Attack

1. **Pilih jaringan target** melalui **Scan**.
2. **Pilih metode serangan** di **Attack**:
   - **Deauth**: Memutuskan koneksi perangkat dari jaringan.
   - **Beacon Flood**: Menghasilkan banyak SSID palsu.
   - **Evil Twin**: Meniru SSID asli untuk mencuri kredensial.
3. **Klik Start** untuk memulai serangan.

## Pencegahan Evil Twin Attack

1. **Gunakan VPN** untuk mengenkripsi lalu lintas internet.
2. **Perhatikan HTTPS** dan hindari memasukkan kredensial di situs tanpa enkripsi.
3. **Nonaktifkan Auto-Connect Wi-Fi** agar perangkat tidak terhubung ke jaringan palsu.
4. **Gunakan Multi-Factor Authentication (MFA)** untuk meningkatkan keamanan akun.
5. **Periksa SSID dengan teliti** sebelum terhubung ke Wi-Fi publik.
6. **Gunakan SSID dengan dual-channel** untuk cadangan jika salah satu jaringan terkena serangan.

## Kesimpulan

Evil Twin Attack adalah ancaman berbahaya yang dapat mencuri data pengguna. Dengan menerapkan langkah pencegahan seperti VPN, HTTPS, MFA, dan menghindari auto-connect Wi-Fi, risiko dapat dikurangi secara signifikan.

---

### Referensi

1. [esp8266\_Deauther - GitHub](https://github.com/spacehuhntech/esp8266_deauther)
2. [DeautherX - GitHub](https://github.com/BlackTechX011/DeautherX)