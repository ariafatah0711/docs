---
sidebar_position: 3
draft: true
---

# prevention dhcp mikrotik

**Oleh: Oki Reganoto**

Mencegah DHCP rogue di jaringan Mikrotik sangat penting untuk memastikan keamanan jaringan Anda. DHCP rogue adalah server DHCP tidak sah yang memberikan alamat IP ke perangkat dalam jaringan, seringkali dengan tujuan jahat. Berikut adalah beberapa langkah untuk mencegahnya di Mikrotik:

---

### **1. Gunakan DHCP Snooping**

Mikrotik memiliki fitur mirip DHCP snooping pada perangkat lain. Namun, implementasinya membutuhkan kombinasi firewall dan konfigurasi yang ketat.

#### **Langkah-langkah:**

1. Pastikan interface yang Anda gunakan hanya menerima paket DHCP dari server DHCP resmi.
2. Tambahkan filter pada interface untuk memblokir paket DHCP dari sumber tidak sah.

#### **Contoh Konfigurasi:**
```shell
/ip firewall filter
add chain=input action=accept protocol=udp src-port=68 dst-port=67 in-interface=<trusted_interface>
add chain=input action=drop protocol=udp src-port=68 dst-port=67
```

**Penjelasan:**
- Paket DHCP berasal dari port UDP 68 ke port UDP 67.
- Hanya DHCP dari interface tepercaya yang diizinkan.

---

### **2. Pisahkan VLAN untuk DHCP**

Jika jaringan Anda menggunakan VLAN, pastikan setiap VLAN memiliki server DHCP resminya sendiri. Dengan memisahkan VLAN, Anda bisa mengontrol lalu lintas DHCP dengan lebih mudah.

#### **Langkah-langkah:**

1. Buat VLAN untuk masing-masing segmen jaringan.
2. Konfigurasikan server DHCP pada masing-masing VLAN dan batasi aksesnya hanya pada VLAN tersebut.
3. Tambahkan firewall untuk memblokir DHCP server lain di VLAN yang tidak sah.

---

### **3. Gunakan Static IP di Jaringan Penting**

Pada jaringan tertentu, terutama yang kritis, Anda bisa menerapkan Static IP Address agar perangkat tidak bergantung pada DHCP.

#### **Langkah-langkah:**

1. Nonaktifkan fitur DHCP untuk jaringan tersebut.
2. Atur IP manual pada perangkat penting.

---

### **4. Monitor DHCP Traffic**

Pantau lalu lintas DHCP menggunakan alat monitoring atau fitur logging Mikrotik.

#### **Contoh Logging:**

Aktifkan logging untuk melihat siapa yang mengirim paket DHCP:
```shell
/system logging
add topics=dhcp action=memory
```

---

### **5. Blokir IP yang Dideteksi sebagai DHCP Rogue**

Jika Anda menemukan perangkat yang bertindak sebagai DHCP rogue, blokir perangkat tersebut dengan Firewall Address List.

#### **Contoh:**
```shell
/ip firewall address-list
add address=<IP_rogue> list=blocked-dhcp
/ip firewall filter
add chain=forward action=drop src-address-list=blocked-dhcp
```

---

### **6. Aktifkan ARP Reply Only**

Untuk memastikan perangkat hanya berkomunikasi dengan IP yang dikenal, aktifkan fitur ARP Reply Only.

#### **Langkah-langkah:**

1. Pergi ke **IP > ARP**.
2. Atur interface ke mode **reply-only**.

---

Dengan menerapkan langkah-langkah di atas, Anda dapat meningkatkan keamanan jaringan Mikrotik dan mencegah DHCP rogue yang dapat membahayakan sistem.

## **Referensi**
- [MENCEGAH DHCP ROGUE di MIKROTIK](https://www.reliasolusi.com/post/mencegah-dhcp-rogue-di-mikrotik)