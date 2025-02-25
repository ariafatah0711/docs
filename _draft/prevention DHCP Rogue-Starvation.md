# Mencegah DHCP Starvation && DHCP Rogue di MikroTik

DHCP Starvation adalah serangan di mana seorang penyerang mengirim banyak permintaan DHCP untuk menghabiskan semua alamat IP yang tersedia di server DHCP, sehingga perangkat sah tidak bisa mendapatkan IP. Untuk mencegahnya di MikroTik, lakukan langkah-langkah berikut:

## 1. Gunakan Static Lease untuk Perangkat Penting
- Set perangkat penting (misalnya router lain, server, atau perangkat admin) agar mendapatkan IP statis berdasarkan MAC address.
- **Cara:**  
  1. **IP** → **DHCP Server** → **Leases**  
  2. Pilih perangkat yang ingin dikunci, lalu klik **Make Static**  
  3. Pastikan hanya perangkat yang sah bisa mendapatkan IP.  

## 2. Aktifkan DHCP Snooping (Firewall Layer 2)

## 3. Batasi Jumlah IP per MAC Address (Limit Lease per MAC)
- Membatasi berapa banyak IP yang bisa didapatkan oleh satu perangkat.
- **Cara:**  
  1. **IP** → **DHCP Server** → Pilih DHCP Server yang aktif  
  2. Masukkan nilai kecil pada **Lease Limit** (misalnya 2)  

## 4. Gunakan ARP Binding (Membatasi Perangkat yang Bisa Mendapatkan IP)
- Hanya perangkat dengan MAC yang terdaftar yang bisa mendapatkan IP.
- **Cara:**  
  1. **IP** → **DHCP Server** → **Leases**  
  2. Ubah semua entri ke **Make Static**  
  3. Buka **IP** → **ARP**, lalu ubah **Mode** ke **Reply-Only**  

## 5. Blokir MAC Address Mencurigakan
- Jika ada perangkat yang mencurigakan meminta terlalu banyak IP, blokir MAC-nya.
- **Cara:**  
  ```bash
  /interface bridge filter add chain=forward src-mac-address=XX:XX:XX:XX:XX:XX action=drop
  ```
  *(Ganti `XX:XX:XX:XX:XX:XX` dengan MAC Address penyerang)*

Dengan kombinasi metode ini, DHCP Starvation bisa dicegah di MikroTik. 🚀