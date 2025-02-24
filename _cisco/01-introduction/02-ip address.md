---
sidebar_position: 2
---

# IP Address

## IPv4
IPv4 adalah versi IP address yang menggunakan 32-bit. Ia terdiri dari 4 kumpulan angka (octet) yang dipisahkan oleh titik.

### Kelas IPv4
- **Class A**: 0.0.0.0 – 127.255.255.255
- **Class B**: 128.0.0.0 – 191.255.255.255
- **Class C**: 192.0.0.0 – 223.255.255.255
- **Class D**: 224.0.0.0 – 239.255.255.255 (Digunakan untuk multicast)
- **Class E**: 240.0.0.0 – 255.255.255.255 (Digunakan untuk eksperimen)

### IP Loopback
IP loopback ditetapkan pada antarmuka loopback di perangkat jaringan dan tidak terhubung ke antarmuka fisik mana pun.
- **127.0.0.1**
- **localhost** (nama alternatif untuk 127.0.0.1)

### IP Private
IP private adalah jenis IP yang hanya bisa dikenali dan diakses dari jaringan lokal saja, serta tidak dapat diakses langsung melalui internet tanpa bantuan NAT pada router.
- **192.168.x.x**
- **172.16.x.x - 172.31.x.x**
- **10.x.x.x**

### IP Public
IP public adalah alamat IP yang digunakan dalam jaringan global internet dan alokasinya diatur oleh **IANA (Internet Assigned Numbers Authority)**. Untuk kawasan Asia Pasifik, pengelolaannya dilakukan oleh **APNIC (Asia-Pacific Network Information Centre)**.

Beberapa contoh IP public:
- **192.183.12.4**
- **213.131.42.123**
- **132.214.23.53**

### Link-Local Address
Jika perangkat mendapatkan alamat IP dari DHCP tetapi tidak menerima respons dari server DHCP, maka ia akan mendapatkan **Link-Local Address** (sebelumnya dikenal sebagai **APIPA - Automatic Private IP Addressing**) yang berada dalam rentang berikut:
- **169.254.0.0 - 169.254.255.255**

### Experimental IP
IP yang digunakan untuk keperluan eksperimen setelah kelas D.
- **240.0.0.0 - 255.255.255.255**
- Contoh: **240.2.6.255**

---

## IPv6
IPv6 adalah versi IP address yang menggunakan 128-bit. Ia terdiri dari delapan kumpulan angka dan huruf yang masing-masing merupakan representasi desimal dari 16 angka biner.

### Karakteristik IPv6
- Terdiri dari **8 oktet**
- Jika terdapat angka **0** di depan, maka dapat dihilangkan:
  - **0db2** → **db2**
  - **0002** → **2**
  - **0101** → **101**
- **::** digunakan untuk menggantikan satu atau lebih kelompok **0000** secara berurutan:
  - **0000:0000:0000:0000** → **::**
  - **2001:DB8:0000:1111:0000:0000:0000:0200** → **2001:DB8:0:1111::200**
  - **fe80:0000:0000:0000:0000:0000:0101:1111** → **fe80::101:1111**

---

## MAC Address
**MAC Address (Media Access Control Address)** adalah alamat unik yang digunakan sebagai identitas perangkat dalam jaringan. MAC Address bersifat **unik**, **permanen**, dan ditetapkan oleh **NIC (Network Interface Card)**.

### Struktur MAC Address
- Terdiri dari **12 karakter heksadesimal** (angka 0-9 dan huruf A-F)
- Dibagi menjadi **dua blok** dengan masing-masing **6 karakter**
- Dipisahkan dengan **titik dua (:)** atau **tanda hubung (-)**
  - Contoh: **00:1A:2B:3C:4D:5E** atau **00-1A-2B-3C-4D-5E**

### Fungsi MAC Address
- **Mengidentifikasi perangkat** dalam jaringan
- **Mengidentifikasi lokasi perangkat** dalam jaringan
- Digunakan dalam **ARP (Address Resolution Protocol)** untuk menerjemahkan IP Address menjadi MAC Address