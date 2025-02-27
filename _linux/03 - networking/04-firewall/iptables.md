---
sidebar_position: 1
---

# iptables

**Konsep Firewall pada Sistem Operasi Linux: iptables**

## 1. Pengertian iptables
iptables adalah firewall berbasis aturan untuk sistem Linux yang menggunakan tabel berisi rantai aturan guna mengontrol lalu lintas jaringan.

## 2. Tabel dalam iptables
- **filter**: Default, digunakan untuk menyaring lalu lintas.
- **nat**: Digunakan untuk Network Address Translation (NAT), mengubah alamat sumber atau tujuan paket.
- **mangle**: Digunakan untuk memodifikasi header paket.
- **raw**: Digunakan untuk aturan sebelum pelacakan koneksi.
- **security**: Digunakan untuk menandai paket dengan label SELinux.

## 3. Rantai dalam iptables
- **INPUT**: Mengontrol lalu lintas masuk ke sistem.
- **OUTPUT**: Mengontrol lalu lintas keluar dari sistem.
- **FORWARD**: Mengontrol lalu lintas yang diteruskan antar antarmuka jaringan.
- **PREROUTING**: Digunakan untuk memproses paket sebelum routing.
- **POSTROUTING**: Digunakan untuk memproses paket setelah routing.

## 4. Konfigurasi iptables

### a. Contoh Aturan Dasar
```bash
# Mengizinkan SSH (port 22)
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Mengizinkan HTTP (port 80) dan HTTPS (port 443)
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT

# Menolak semua koneksi kecuali yang diizinkan
iptables -A INPUT -j DROP

# Mengizinkan akses keluar dari sistem
iptables -A OUTPUT -j ACCEPT
```

### b. Konfigurasi NAT
```bash
# SNAT: Mengubah alamat sumber dari paket keluar ke IP tertentu
iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source 203.0.113.1

# Masquerading: NAT dinamis jika IP publik berubah
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# DNAT: Mengubah alamat tujuan paket masuk ke server internal
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.10:80
```

### c. Konfigurasi Mangle
```bash
# Mengurangi nilai TTL paket yang masuk
iptables -t mangle -A PREROUTING -i eth0 -j TTL --ttl-set 64

# Menandai paket dengan ID tertentu untuk QoS atau routing khusus
iptables -t mangle -A PREROUTING -p tcp --dport 22 -j MARK --set-mark 1

# Drop paket dengan flag tertentu untuk mencegah serangan XMAS scan
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL ALL -j DROP
```

## 5. Melihat Aturan yang Aktif
```bash
iptables -L -v -n
iptables -t nat -L -v -n
iptables -t mangle -L -v -n
iptables -S  # Menampilkan semua aturan dalam format yang dapat dieksekusi ulang
```

## 6. Menghapus Aturan di iptables

### a. Menghapus Aturan Tertentu
```bash
iptables -D INPUT -p tcp --dport 22 -j ACCEPT  # Menghapus aturan spesifik
iptables -D INPUT 1  # Menghapus aturan berdasarkan nomor baris
```

### b. Menghapus Semua Aturan dalam Rantai
```bash
iptables -F  # Menghapus semua aturan dalam semua tabel
iptables -t nat -F  # Menghapus semua aturan dalam tabel NAT
iptables -t mangle -F  # Menghapus semua aturan dalam tabel MANGLE
```

### c. Menghapus Semua Aturan dan Kebijakan Default
```bash
iptables -F
iptables -X
iptables -Z
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT
```

## 7. Opsi Tambahan dalam iptables

| Opsi | Keterangan |
|------|------------|
| `-A` | Menambahkan aturan ke rantai |
| `-D` | Menghapus aturan tertentu |
| `-F` | Menghapus semua aturan dalam rantai |
| `-L` | Melihat aturan yang sedang berjalan |
| `-S` | Menampilkan aturan dalam format yang dapat dieksekusi ulang |
| `-X` | Menghapus rantai yang dibuat pengguna |
| `-Z` | Mengatur ulang penghitung paket dan byte |
| `-P` | Mengubah kebijakan default rantai |
| `-t` | Menentukan tabel yang digunakan (filter, nat, mangle, raw, security) |

iptables memberikan kontrol mendalam atas lalu lintas jaringan dan sangat penting bagi administrator sistem dan keamanan jaringan.