---
draft: true
---

# prevention wep

## Kenapa WEP Sangat Rentan?
WEP (Wired Equivalent Privacy) menggunakan IVs (Initialization Vectors) yang dapat ditangkap dengan mudah dan dipecahkan menggunakan *aircrack-ng*. Serangan seperti *ARP replay*, *fake authentication*, dan *chopchop attack* memungkinkan peretas mendapatkan kunci WEP dalam hitungan menit.

### **Solusi utama: Jangan gunakan WEP!** Ganti ke WPA2 atau WPA3 untuk keamanan yang lebih baik.

---

## Gunakan Authentication Tambahan (MAC Filtering & RADIUS Server)
### **1. Aktifkan MAC Filtering**
Membatasi perangkat yang bisa terhubung dengan jaringan.

#### **Contoh Setting MAC Filtering di MikroTik:**
```bash
/interface wireless access-list add mac-address=XX:XX:XX:XX:XX:XX action=reject
```

### **2. Gunakan RADIUS Server (WPA2-Enterprise)**
- Menyediakan autentikasi yang lebih aman.
- Memisahkan otentikasi dari enkripsi jaringan.
- Mencegah akses tidak sah dari perangkat yang tidak terdaftar.

---

## Matikan SSID Broadcasting (Hidden SSID)
- Membantu menyembunyikan jaringan dari pemindaian umum (*airodump-ng*).
- Namun, ini bukan perlindungan utama karena tetap bisa terdeteksi dengan *sniffing*.

#### **Konfigurasi di MikroTik:**
```bash
/interface wireless set wlan1 hide-ssid=yes
```

---

## Blokir Serangan ARP Replay & Fake Authentication
### **1. Gunakan Firewall untuk Memfilter Paket ARP Mencurigakan**
Mengaktifkan Dynamic ARP Inspection (DAI) pada router dapat membantu mencegah spoofing.

### **2. Blokir Serangan ARP Spoofing di MikroTik**
```bash
/ip firewall filter add chain=input protocol=arp src-mac-address=!XX:XX:XX:XX:XX:XX action=drop
```

---

## **Kesimpulan**
Cara utama menangkal serangan terhadap WEP:
✅ **Ganti ke WPA2/WPA3** *(Solusi terbaik!)*  
✅ **Blokir ARP spoofing & fake authentication dengan firewall**  
✅ **Gunakan MAC filtering & RADIUS untuk autentikasi lebih ketat**  
✅ **Monitor jaringan dengan Kismet, Wireshark, atau IDS seperti Snort**  

> **Jika masih menggunakan WEP, risikonya tetap tinggi, jadi paling aman adalah segera upgrade ke WPA2 atau WPA3!**

---

## **Referensi**
- [IEEE 802.11 Standard](https://standards.ieee.org/)
- Fluhrer, S., Mantin, I., & Shamir, A. (2001). "Weaknesses in the Key Scheduling Algorithm of RC4". *Springer-Verlag.*
- Borisov, N., Goldberg, I., & Wagner, D. (2001). "Intercepting Mobile Communications: The Insecurity of 802.11". *ACM International Conference on Mobile Computing and Networking.*
- [National Institute of Standards and Technology (NIST)](https://csrc.nist.gov/)
- [Aircrack-ng Documentation](https://www.aircrack-ng.org/)