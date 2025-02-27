---
sidebar_position: 2
---

# firewall-cmd

## Pengenalan Firewall
firewall-cmd adalah alat baris perintah untuk mengelola firewall yang menggunakan firewalld di sistem berbasis Linux. Firewalld mendukung konfigurasi dinamis dan berbasis zona, memungkinkan pengaturan aturan firewall tanpa perlu me-restart layanan.

## Memeriksa Status dan Konfigurasi Firewall
```bash
sudo firewall-cmd --state  # Menampilkan status firewall
sudo firewall-cmd --reload  # Memuat ulang konfigurasi firewall
```

## Melihat dan Mengatur Zona
```bash
sudo firewall-cmd --get-active-zones  # Menampilkan zona aktif
sudo firewall-cmd --get-default-zone  # Menampilkan zona default
sudo firewall-cmd --set-default-zone=<zona>  # Mengubah zona default
sudo firewall-cmd --get-zones  # Melihat daftar zona yang tersedia
sudo firewall-cmd --list-all-zones  # Melihat semua zona dan konfigurasinya
sudo firewall-cmd --zone=<nama_zona> --list-all  # Melihat konfigurasi zona tertentu
```

## Manajemen Port dan Layanan
```bash
sudo firewall-cmd --permanent --add-port=<nomor_port>/<protokol>  # Membuka satu port
sudo firewall-cmd --permanent --add-port=<nomor_port_awal>-<nomor_port_akhir>/<protokol>  # Membuka rentang port
sudo firewall-cmd --permanent --add-port={80/tcp,443/tcp}  # Membuka beberapa port sekaligus
sudo firewall-cmd --permanent --remove-port=<nomor_port>/<protokol>  # Menutup port
sudo firewall-cmd --permanent --add-service=<nama_layanan>  # Membuka layanan
sudo firewall-cmd --permanent --remove-service=<nama_layanan>  # Menutup layanan
sudo firewall-cmd --list-ports  # Melihat daftar port yang dibuka
sudo firewall-cmd --list-services  # Melihat daftar layanan yang dibuka
sudo firewall-cmd --get-services  # Melihat daftar layanan yang tersedia untuk ditambahkan
```

## Manajemen Zona
```bash
sudo firewall-cmd --new-zone=<nama_zona> --permanent  # Membuat zona baru
sudo firewall-cmd --permanent --delete-zone=<nama_zona>  # Menghapus zona
sudo firewall-cmd --zone=<nama_zona> --add-port=<nomor_port>/<protokol> --permanent  # Menambahkan port ke zona
sudo firewall-cmd --zone=<nama_zona> --add-service=<nama_layanan> --permanent  # Menambahkan layanan ke zona
```

## Konfigurasi Akses dan Keamanan
```bash
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.10" port port="80" protocol="tcp" accept'  # Mengizinkan akses dari IP tertentu
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.10" drop'  # Memblokir alamat IP tertentu
```

## Mematikan Firewall
```bash
sudo systemctl stop firewalld  # Mematikan firewall sementara
sudo systemctl disable firewalld  # Menonaktifkan firewall agar tidak berjalan saat boot
```