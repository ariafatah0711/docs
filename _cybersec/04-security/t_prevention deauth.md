# Prevention Deauthentication

Serangan deauthentication (deauth) adalah jenis serangan yang mengeksploitasi protokol manajemen Wi-Fi untuk memutuskan koneksi pengguna dengan mengirimkan paket deauthentication palsu. Untuk mencegah serangan ini, berikut adalah beberapa metode yang dapat diterapkan:

## 1. Mengaktifkan Protected Management Frames (PMF)
PMF adalah fitur keamanan yang melindungi frame manajemen dari serangan seperti deauth. 

- **MikroTik:**
  ```bash
  /interface wireless security-profiles set [find default=yes] management-protection=required
  ```
  *Pastikan perangkat klien mendukung PMF agar tetap dapat terhubung.*

- **Ubiquiti UniFi:**
  - Buka **UniFi Controller** → **Settings** → **Wireless Networks** → Pilih SSID yang ingin diamankan.
  - Di bagian **Advanced Options**, atur **PMF** ke `Optional` atau `Required`.

## 2. Menggunakan WPA3 atau WPA2-Enterprise
WPA3 memiliki proteksi tambahan terhadap serangan deauth.

- **MikroTik:**
  ```bash
  /interface wireless security-profiles set [find default=yes] authentication-types=wpa2-eap,wpa3-eap
  ```
  *Jika perangkat tidak mendukung WPA3, gunakan mode transisi dengan WPA2.*

- **UniFi:**
  - Masuk ke **UniFi Controller** → **Settings** → **Wireless Networks**.
  - Pilih **WPA3** atau **WPA2/WPA3 Transition Mode** untuk kompatibilitas perangkat lama.

## 3. Menonaktifkan Penyiaran SSID dan Menggunakan Pemfilteran MAC

Menonaktifkan SSID membuat jaringan tidak terlihat oleh perangkat biasa, meskipun masih bisa dideteksi oleh peretas berpengalaman.

- **MikroTik:**
  ```bash
  /interface wireless set [find default-name=wlan1] hide-ssid=yes
  ```
- **UniFi:**
  - Masuk ke **UniFi Controller** → **Settings** → **Wireless Networks**.
  - Centang **Hide SSID** untuk menyembunyikan SSID dari pemindaian.

Pemfilteran MAC dapat digunakan untuk membatasi perangkat yang dapat terhubung.

## 4. Menggunakan Dual-Band dan Load Balancing

Menggunakan SSID terpisah untuk 2.4 GHz dan 5 GHz dapat mengurangi dampak serangan jika salah satu jaringan mengalami deauth.

- **MikroTik:**
  ```bash
  /interface wireless set [find default-name=wlan1] frequency=2.4GHz ssid=SSID_2.4GHz
  /interface wireless set [find default-name=wlan2] frequency=5GHz ssid=SSID_5GHz
  ```

- **UniFi:**
  - Buat dua SSID terpisah untuk 2.4 GHz dan 5 GHz di **UniFi Controller**.
  - Aktifkan **Band Steering** untuk membantu perangkat memilih frekuensi terbaik.

## 5. Menggunakan IDS/IPS untuk Mendeteksi dan Memblokir Serangan
Sistem Intrusion Detection System (IDS) dan Intrusion Prevention System (IPS) dapat mendeteksi dan mencegah serangan deauth.

- **UniFi:**
  - Aktifkan **Threat Management** di **Settings** → **Firewall & Security**.

- **MikroTik:**
  - Gunakan fitur Wireless Intrusion Detection System (WIDS) untuk memonitor aktivitas mencurigakan.

## 6. Membatasi Jangkauan Sinyal dan Menggunakan AP dengan Anti-Jamming
Mengurangi daya pancar sinyal WiFi dapat mengurangi kemungkinan jaringan terdeteksi oleh penyerang.

- **MikroTik:**
  ```bash
  /interface wireless set [find default-name=wlan1] tx-power=15
  ```
- **UniFi:**
  - Masuk ke **UniFi Controller** → **Devices** → Pilih AP → **Config** → **Radio** → Atur **Transmit Power**.

## 7. Monitoring dan Logging Aktivitas Jaringan
Memonitor log jaringan dapat membantu mendeteksi percobaan serangan deauth.

- **MikroTik:**
  ```bash
  /system logging add topics=wireless action=memory
  ```

- **UniFi:**
  - Gunakan fitur **Insights** dan **Logs** di **UniFi Controller** untuk memantau anomali jaringan.

---

Dengan menerapkan metode di atas, risiko serangan deauth dapat diminimalisir secara signifikan, menjaga koneksi Wi-Fi tetap stabil dan aman dari gangguan pihak luar.