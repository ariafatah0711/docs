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

### 2. Hotspot
#### a. Membuat Hotspot pada Interface Lokal (Ether3)
1. Interface: `ether3` (lokal) \
   ![Interface Lokal](docs/images/image-5.png)
2. Address Lokal: `192.168.0.1/24` \
   ![Address Lokal](docs/images/image-23.png)
3. Rentang Alamat IP Pool: `192.168.0.2-192.168.0.100` \
   ![IP Pool](docs/images/image-24.png)
4. DNS Server: `192.168.0.1` (gateway) dan `8.8.8.8` untuk internet
   ![DNS Server](docs/images/image-25.png)
5. Nama Domain Hotspot: `login.usk-tkj.net` *(opsional)*
   ![Nama Domain](docs/images/image-26.png)
6. Menonaktifkan *Cookie Server* pada Hotspot untuk meningkatkan keamanan akses.
   ![Disable Cookie Server](docs/images/image-10.png)

#### b. Membuat Pengguna dengan Pengaturan Bandwidth dan Address List
1. Membuat *User Profile* untuk kategori *staff* dan *guest*, dengan batasan bandwidth `5 Mbps` untuk *staff* dan `2 Mbps` untuk *guest*.
   ![User Profile](docs/images/image-11.png)
2. Menambahkan pengguna dengan profil yang telah dibuat.
   ![Tambah Pengguna](docs/images/image-29.png)
3. Verifikasi login serta pengujian bandwidth untuk pengguna *staff*.
   ![Test Bandwidth Staff](docs/images/image-14.png)
4. Pengujian bandwidth juga dilakukan untuk pengguna *guest*.
   ![Test Bandwidth Guest](docs/images/image-15.png)

### 3. Firewall
#### a. Menambahkan Firewall untuk Membatasi Akses Guest ke Server Proxmox
1. Membuat aturan firewall dengan *chain forward* serta *dst-address* menuju `10.1.10.0/24`.
   ![Firewall Rule](docs/images/image-16.png)
2. Menambahkan *src-address-list* untuk mengidentifikasi pengguna *guest*.
   ![Source Address List](docs/images/image-17.png)
3. Mengatur aksi *drop* untuk memblokir akses pengguna *guest* ke server VM.
   ![Drop Action](docs/images/image-18.png)
4. Verifikasi bahwa pengguna *staff* masih bisa melakukan *ping* ke `8.8.8.8` dan `10.1.10.2`.
   ![Verifikasi Staff](docs/images/image-19.png)
5. Verifikasi bahwa pengguna *guest* tidak dapat mengakses VM Proxmox.
   ![Verifikasi Guest](docs/images/image-20.png)
6. Jika dalam soal hanya diminta untuk memblokir akses ke router, tambahkan aturan firewall dengan protocol seperti FTP (`21`) dan SSH (`22`), atau sesuai dengan ketentuan soal.
   ![Protocol Restriction](docs/images/image-30.png)

### 4. Konfigurasi DNS
#### a. Menambahkan DNS Statis untuk Lookup ke VM1 dan VM2
1. **Mengaktifkan Allow Remote Request**
   - Mengaktifkan opsi *Allow Remote Request* untuk memungkinkan permintaan DNS dari klien eksternal.
   - Menambahkan konfigurasi DNS Server untuk VM1.
   ![Allow Remote Request](docs/images/image-21.png)
2. **Menambahkan DNS Statis**
   - Menambahkan entri DNS statis untuk domain berikut:
     - `usk-tkj.net` → Mengarah ke VM1
     - `ftp.usk-tkj.net` → Mengarah ke VM1
     - `www.usk-tkj.net` → Mengarah ke VM2
   ![Konfigurasi DNS Statis](docs/images/image-28.png)

### 5. Konfigurasi VM
#### a. Setup Hostname dan IP
- Di sini saya menggunakan VM 201 dan VM 202.  
  ![Konfigurasi VM](docs/images/image-31.png)
- Setelah itu, saya mengubah hostname untuk server 1 dan server 2 dengan nama `serv1` dan `serv2` menggunakan `nmtui` atau `hostnamectl`.  
  ```bash
  # Menggunakan nmtui
  nmtui

  # Menggunakan hostnamectl
  hostnamectl set-hostname serv1  # Untuk VM1
  hostnamectl set-hostname serv2  # Untuk VM2
  ```
- Selanjutnya, saya mengubah alamat IP sebagai berikut:
  - **VM1 (201)**: 10.1.10.106/24, dengan gateway 10.1.10.105, dan DNS server 10.1.10.105.  
    ![Konfigurasi IP VM1](docs/images/image-32.png)
  - **VM2 (202)**: 10.1.10.107/24, dengan gateway 10.1.10.105, dan DNS server 10.1.10.105.  
    ![Konfigurasi IP VM2](docs/images/image-33.png)

## C. Konfigurasi vm proxmox
### 1. setup vm, dan repository
#### a. Mematikan Repository Online
Buka file konfigurasi repository:
```bash
vi /etc/rhsm/rhsm.conf
```
Ubah baris berikut:
```ini
manage_repos = 1
```
Menjadi:
```ini
manage_repos = 0
```
![alt text](docs/images/image-34.png)
#### b. Setup Repository Lokal
Buka atau buat file repository lokal:
```bash
vi /etc/yum.repos.d/local.repo
```
Tambahkan konfigurasi berikut:
```ini
[BaseOS]
name=BaseOS
baseurl=http://10.1.10.115/rhel9.4/BaseOS
gpgcheck=0
enabled=1

[AppStream]
name=AppStream
baseurl=http://10.1.10.115/rhel9.4/AppStream
gpgcheck=0
enabled=1
```
![alt text](docs/images/image-35.png)
#### c. Verifikasi Repository
Pastikan repository sudah dapat digunakan dengan menjalankan perintah berikut:
```bash
yum repolist
```
![alt text](docs/images/image-36.png)
Lakukan langkah ini di kedua VM.

### 2. konfigurasi ssh-key
Konfigurasi SSH Key dan PuTTYgen untuk Remote Access menggunakan OpenSSH dan PuTTY, serta Konfigurasi FTP Server
#### a. Membuat SSH Key
1. **Generate SSH Key dari VM 1**
   ```bash
   ssh-keygen
   # Tekan Enter untuk melanjutkan tanpa mengubah konfigurasi default
   ```
2. **Menyalin SSH Key ke VM 1 dan VM 2 menggunakan `ssh-copy-id`**
   ```bash
   ssh-copy-id root@10.1.10.106
   ssh-copy-id root@10.1.10.107
   ```
   ![Salin SSH Key](docs/images/image-37.png)
3. **Mengunduh Private Key (`id_rsa`) dari VM 1 menggunakan `scp` atau FileZilla**
   ```bash
   scp root@10.1.10.106:/root/.ssh/id_rsa .
   ```
   ![Download Private Key](docs/images/image-38.png)
4. **Membuat Kunci PPK untuk PuTTY menggunakan PuTTYgen**
   - Buka PuTTYgen
   - Pilih menu **Conversions > Import Key**
   - Pilih file `id_rsa` yang telah diunduh
   ![Konversi Key](docs/images/image-39.png)
5. **Generate dan Simpan Private Key dalam Format PPK**
   - Klik **Save private key**
   ![Generate Key](docs/images/image-40.png)
   - Simpan file dengan format `.ppk`
   ![Simpan Private Key](docs/images/image-41.png)
6. **Hasil Akhir: Dua Kunci Private untuk OpenSSH dan PuTTY**
   - **`id_rsa`** → Digunakan untuk koneksi dengan OpenSSH
   - **`id_rsa.ppk`** → Digunakan untuk koneksi dengan PuTTY
   ![Dua Private Key](docs/images/image-42.png)

### 3. konfigurasi ftp server
#### a. Membuat FTP Server pada VM 1 dan Mengunggah Private Key
1. **Instalasi Paket**
  Jalankan perintah berikut untuk menginstal paket yang diperlukan:
  ```bash
  yum install vsftpd ftp -y
  ```
2. **Konfigurasi FTP Server**
  Edit file konfigurasi `vsftpd` dengan perintah:
  ```bash
  vi /etc/vsftpd/vsftpd.conf
  ```
  Kemudian ubah opsi `allow_anon_upload` menjadi `YES`.
  ![Konfigurasi FTP](docs/images/image-43.png)
  Tambahkan konfigurasi berikut di bagian bawah file untuk mengaktifkan mode passive:
  ```ini
  pasv_enable=YES
  pasv_min_port=10000
  pasv_max_port=10100
  ```
3. **Menjalankan dan Mengaktifkan vsftpd** \
  Setelah konfigurasi selesai, jalankan perintah berikut untuk mengaktifkan dan memulai layanan `vsftpd`:
  ```bash
  systemctl enable --now vsftpd
  ```
4. **Mengatur Firewall** \
  Agar koneksi ke FTP server dapat dilakukan, tambahkan aturan firewall untuk membuka port yang dibutuhkan:
  ```bash
  firewall-cmd --add-port={21/tcp,22/tcp,10000-10100/tcp} --permanent
  firewall-cmd --reload
  ```
5. **Mengakses FTP Server** \
  Setelah konfigurasi selesai, coba akses FTP server menggunakan FileZilla atau File Explorer dengan membuka alamat:
  ```bash
  ftp://<IP-Server>
  ```
  ![Akses FTP](docs/images/image-44.png) \
6. **Mengunggah Private Key dengan SCP** \
  Untuk mengunggah private key ke FTP server dengan lebih mudah, gunakan perintah SCP:
  ```bash
  scp id_rsa putty_key.ppk root@10.1.10.106:/var/ftp
  ```
  ![Upload dengan SCP](docs/images/image-45.png)
  Setelah selesai, file private key akan tersedia di direktori `/var/ftp` pada FTP server.

### 4. Pengujian Login SSH
#### a. Menggunakan OpenSSH
- Gunakan opsi `-i id_rsa` saat melakukan SSH:
  ```bash
  ssh -i id_rsa user@hostname
  ```
  ![Login SSH dengan OpenSSH](docs/images/image-46.png)
#### b. Menggunakan PuTTY
1. Tambahkan kunci SSH pada PuTTY.
2. Masuk ke **SSH > Auth > Credentials**. \
   ![Pengaturan SSH di PuTTY](docs/images/image-47.png)
3. Unggah kunci **PPK**. \
   ![Upload Key PPK](docs/images/image-48.png)
4. buka menu sessions dan masukan ip vm 1 atau vm 2
   ![Login SSH di PuTTY](docs/images/image-49.png)
5. Coba login melalui sesi PuTTY, seharusnya dapat masuk tanpa memasukkan password.
   ![Berhasil Login](docs/images/image-50.png)

### 3. konfigurasi web server
#### a. buat container vm dengan podman
- installasi package
  ```bash
  yum install podman haproxy -y
  ```
- pull nginx
  ```bash
  podman pull nginx
  ```
- buat file index.html untuk web1 dan web2
  ```bash
  cd /home/skills99/
  mkdir -p web1 web2
  echo "web 1" > web1/index.html
  echo "web 2" > web2/index.html
  ```
- buat container web1 dan web 2
  ```bash
  podman run -itd --name web1 -p 8001:80 -v ./web1:/usr/share/share/nginx/html:Z nginx
  podman run -itd --name web2 -p 8002:80 -v ./web2:/usr/share/share/nginx/html:Z nginx
  ```