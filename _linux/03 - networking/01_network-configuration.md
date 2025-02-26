---
sidebar_position: 1
---

# Konfigurasi Jaringan

## 1. IP Address

### IPv4 dan IPv6
IP Address adalah alamat unik yang digunakan untuk mengidentifikasi perangkat dalam jaringan.

#### **IPv4**
- Menggunakan format 32-bit (contoh: `192.168.1.1`).
- Dibatasi hingga 4,3 miliar alamat.
- Ditulis dalam notasi desimal dengan titik pemisah.
- Dibagi menjadi kelas A, B, C, D, dan E.
- Menggunakan subnet mask untuk menentukan network dan host ID.

#### **IPv6**
- Menggunakan format 128-bit (contoh: `2001:db8::ff00:42:8329`).
- Mendukung jumlah alamat yang jauh lebih besar.
- Ditulis dalam notasi heksadesimal dengan tanda `:` sebagai pemisah.
- Mendukung autokonfigurasi dan lebih aman dibandingkan IPv4.

### **Subnetting dan CIDR**
- **Subnetting** membagi jaringan menjadi sub-jaringan yang lebih kecil guna efisiensi IP Address.
- **CIDR (Classless Inter-Domain Routing)** menggantikan sistem kelas IP dan menggunakan notasi seperti `/24` untuk menunjukkan jumlah bit subnet.

| Notasi CIDR | Jumlah Host |
|------------|------------|
| /8         | 16,777,216 |
| /16        | 65,536     |
| /24        | 256        |

### **Konfigurasi IP Address**
#### **Linux** (Ubuntu/Debian)
```sh
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip route add default via 192.168.1.1
```
Untuk konfigurasi permanen, edit file:
```sh
sudo nano /etc/network/interfaces
```
Tambahkan:
```sh
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
```
Kemudian restart layanan jaringan:
```sh
sudo systemctl restart networking
```

#### **Konfigurasi Network Interface**
- **Melihat Interface yang Tersedia**
```sh
ip link show
ifconfig -a
```
- **Mengaktifkan dan Menonaktifkan Interface**
```sh
sudo ip link set eth0 up
sudo ip link set eth0 down
```
- **Melihat Wi-Fi Interface dan Jaringan yang Terdeteksi**
```sh
iwconfig  # Untuk melihat informasi Wi-Fi
nmcli device wifi list  # Untuk melihat jaringan Wi-Fi yang tersedia
```

#### **Linux (Menggunakan nmcli & nmtui)**
```sh
nmcli device status  # Menampilkan status perangkat jaringan
nmcli connection show  # Menampilkan daftar koneksi yang tersedia
nmtui  # Antarmuka grafis berbasis teks untuk konfigurasi jaringan
```
#### **Windows** (CMD)
```sh
netsh interface ip set address "Ethernet" static 192.168.1.100 255.255.255.0 192.168.1.1
```
#### **Perintah Umum untuk Mengecek IP**
```sh
ifconfig  # Menampilkan informasi semua interface jaringan (Linux/macOS)
ip a  # Alternatif untuk melihat informasi IP dan interface (Linux)
ipconfig  # Menampilkan konfigurasi IP di Windows
```

## 2. Routing
Routing adalah proses mengarahkan paket dari satu jaringan ke jaringan lain.

### **Jenis Routing**
- **Statis**: Dikonfigurasi secara manual oleh administrator.
- **Dinamis**: Menggunakan protokol routing seperti RIP, OSPF, dan BGP untuk menentukan jalur terbaik secara otomatis.

### **Protokol Routing**
- **RIP (Routing Information Protocol)** – Menggunakan algoritma distance-vector, membatasi hop hingga 15.
- **OSPF (Open Shortest Path First)** – Menggunakan algoritma link-state, lebih cepat dan efisien dibanding RIP.
- **BGP (Border Gateway Protocol)** – Digunakan di internet untuk routing antar-AS (Autonomous System).

### **Konfigurasi Routing**
#### **Linux** (Menambahkan rute statis)
```sh
sudo ip route add 192.168.2.0/24 via 192.168.1.1
```
#### **Menambahkan Route Secara Permanen**
```sh
sudo nano /etc/network/interfaces
```
Tambahkan:
```sh
up ip route add 192.168.2.0/24 via 192.168.1.1
```
#### **Masquerading / NAT**
```sh
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

## 3. DHCP Server

### **Instalasi DHCP Server di Linux**
```sh
sudo apt update
sudo apt install isc-dhcp-server
```

### **Konfigurasi DHCP Server**
Edit file konfigurasi:
```sh
sudo nano /etc/dhcp/dhcpd.conf
```
Tambahkan:
```sh
default-lease-time 600;
max-lease-time 7200;
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 8.8.8.8;
}
```
Restart layanan DHCP:
```sh
sudo systemctl restart isc-dhcp-server
```

## 4. Firewall
Firewall digunakan untuk memfilter lalu lintas jaringan.
- **iptables (Linux)**:
```sh
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
- **Windows Firewall**:
```sh
netsh advfirewall firewall add rule name="Allow SSH" dir=in action=allow protocol=TCP localport=22
```

## 5. Troubleshooting Jaringan

### **Tes Koneksi**
- **Ping**
```sh
ping 8.8.8.8
```
- **Traceroute**
```sh
traceroute google.com  # Linux/macOS
tracert google.com  # Windows
```
- **Cek DNS**
```sh
dig google.com
nslookup google.com
```
- **Cek ARP**
```sh
arp -a
```
- **Cek Rute**
```sh
ip route show
```

Dokumentasi ini mencakup dasar-dasar konfigurasi jaringan, keamanan, dan troubleshooting. Semoga bermanfaat!