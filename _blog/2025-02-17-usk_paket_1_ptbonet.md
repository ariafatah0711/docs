# USK Paket 1 PT Bonet

## A. Topologi
![Diagram Jaringan](docs/images/Diagram%20Tanpa%20Judul.drawio.png)

### 1. Mikrotik
### 2. Proxmox

## B.  Konfigurasi Mikrotik
### 1. setup
#### a. Mengubah Identitas Router
![Mengubah Identity](docs/images/image-2.png)

#### b. Menambahkan IP DHCP-Client pada Ether1 untuk Akses Internet
![DHCP Client](docs/images/image.png)

#### c. Menetapkan IP Address pada Interface Ether2 dan Ether3
![IP Address](docs/images/image-1.png)

#### d. Verifikasi Koneksi ke Internet dan Server Proxmox Lokal
![Ping Test](docs/images/image-3.png)

#### e. Mengonfigurasi Firewall NAT untuk Akses Internet melalui Ether1 serta Bypass untuk Akses Klien ke VM Proxmox
![Firewall NAT](docs/images/image-4.png)

<!-- truncate -->

### 2. Hospot
#### a. Membuat Hotspot pada Interface Lokal (Ether3)
- Interface: ether3 (lokal) \
  ![Interface Lokal](docs/images/image-5.png)
- Address Lokal: 192.168.0.1/24 \
  ![Address Lokal](docs/images/image-23.png)
- Rentang Alamat IP Pool: 192.168.0.2-192.168.0.100 \
  ![alt text](docs/images/image-24.png)
- DNS Server: 192.168.0.1 (gateway) dan 8.8.8.8 untuk internet \
  ![alt text](docs/images/image-25.png)
- Nama Domain Hotspot: login.usk-tkj.net *(opsional)* \
  ![alt text](docs/images/image-26.png)
- Menonaktifkan Cookie Server pada Hotspot agar meningkatkan keamanan akses \
  ![Disable Cookie Server](docs/images/image-10.png)

#### b. Membuat Pengguna dengan Pengaturan Bandwidth dan Address List
- Membuat User Profile untuk kategori *staff* dan *guest*, dengan batasan bandwidth 5 Mbps untuk *staff* dan 2 Mbps untuk *guest*
  ![User Profile](docs/images/image-11.png)
- Menambahkan pengguna dengan profil yang telah dibuat
  ![alt text](docs/images/image-29.png)
- Verifikasi login serta pengujian bandwidth untuk pengguna *staff*
  <!-- ![Verifikasi Staff](docs/images/image-13.png) -->
  ![Test Bandwidth Staff](docs/images/image-14.png)
- Pengujian bandwidth juga dilakukan untuk pengguna *guest*
  ![Test Bandwidth Guest](docs/images/image-15.png)

### 3. firewall
#### a. Menambahkan Firewall untuk Membatasi Akses Guest ke Server Proxmox
- Membuat aturan firewall dengan *chain forward* serta *dst-address* menuju 10.1.10.0/24
  ![Firewall Rule](docs/images/image-16.png)
- Menambahkan *src-address-list* untuk mengidentifikasi pengguna *guest*
  ![Source Address List](docs/images/image-17.png)
- Mengatur aksi *drop* untuk memblokir akses pengguna *guest* ke server VM
  ![Drop Action](docs/images/image-18.png)
- Verifikasi bahwa pengguna *staff* masih bisa melakukan *ping* ke 8.8.8.8 dan 10.1.10.2
  ![Verifikasi Staff](docs/images/image-19.png)
- Verifikasi bahwa pengguna *guest* tidak dapat mengakses VM Proxmox
  ![Verifikasi Guest](docs/images/image-20.png)

### 4. konfigurasi dns
#### a. Menambahkan DNS Statis untuk Lookup ke VM1 dan VM2
- Mengaktifkan *allow remote request* serta menambahkan DNS Server untuk VM1
  ![Remote Request](docs/images/image-21.png)
- Menambahkan DNS statis untuk *usk-tkj.net*, *ftp.usk-tkj.net* ke VM1, serta *www.usk-tkj.net* ke VM2
  ![alt text](docs/images/image-28.png)