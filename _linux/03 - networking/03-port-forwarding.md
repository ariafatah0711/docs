---
sidebar_position: 3
---

# Port Forwarding

## Konsep Dasar Port Forwarding

### Apa Itu Port Forwarding?
Port forwarding adalah teknik yang digunakan untuk mengarahkan lalu lintas jaringan dari satu port di suatu perangkat ke port lain di perangkat lain. Ini memungkinkan layanan atau aplikasi yang berjalan di dalam jaringan lokal untuk dapat diakses dari jaringan eksternal, seperti internet.

### Mengapa Kita Membutuhkan Port Forwarding?
- **Mengakses layanan lokal dari internet** (misalnya, server web atau database di dalam jaringan lokal).
- **Meningkatkan keamanan** dengan membatasi akses ke layanan hanya melalui port tertentu.
- **Menggunakan VPN atau tunneling** untuk mengamankan komunikasi data.

### Analogi Sederhana
Bayangkan sebuah perusahaan dengan banyak departemen di dalamnya. Jika seseorang dari luar ingin menghubungi bagian IT, mereka tidak bisa langsung masuk ke ruangan IT. Sebagai gantinya, mereka harus berbicara dengan resepsionis terlebih dahulu, yang kemudian meneruskan panggilan ke bagian IT. Dalam hal ini:
- **Perusahaan** adalah jaringan lokal.
- **Resepsionis** adalah router atau server yang menangani port forwarding.
- **Departemen IT** adalah layanan yang ingin diakses.

### Perbedaan antara Port Forwarding Lokal dan Jarak Jauh
- **Lokal**: Mengalihkan lalu lintas dari perangkat lokal ke perangkat lain di jaringan yang sama.
- **Jarak Jauh**: Mengalihkan lalu lintas dari perangkat luar ke dalam jaringan lokal melalui internet.

## Port Forwarding with SSH

### 1. SSH Local Port Forwarding (-L)
#### Cara Kerja
Local port forwarding memungkinkan kita meneruskan koneksi dari komputer lokal ke komputer lain melalui server SSH.

#### Contoh Penggunaan
Misalkan ada layanan web yang hanya bisa diakses dari dalam jaringan lokal di port 80, tetapi kita ingin mengaksesnya dari komputer kita sendiri.

#### Perintah SSH
```sh
ssh -L 8080:localhost:80 user@remote_server
```
Perintah ini mengalihkan lalu lintas dari **localhost:8080** ke **remote_server:80**.

### 2. SSH Remote Port Forwarding (-R)
#### Cara Kerja
Remote port forwarding memungkinkan layanan di komputer lokal tersedia di server jarak jauh.

#### Contoh Penggunaan
Kita ingin mengakses komputer lokal dari internet dengan menghubungkannya ke server publik.

#### Perintah SSH
```sh
ssh -R 8080:localhost:80 user@remote_server
```
Perintah ini mengarahkan lalu lintas dari **remote_server:8080** ke **localhost:80**.

### 3. SSH Dynamic Port Forwarding (-D)
#### Cara Kerja
Dynamic port forwarding memungkinkan kita menggunakan server SSH sebagai proxy SOCKS untuk mengakses internet dengan lebih aman.

#### Contoh Penggunaan
Menggunakan SSH sebagai proxy untuk browsing internet secara aman melalui server remote.

#### Perintah SSH
```sh
ssh -D 1080 user@remote_server
```
Setelah menjalankan perintah ini, kita bisa mengatur browser untuk menggunakan **SOCKS proxy di localhost:1080**.

## Port Forwarding with Netsh (Windows)
Windows menyediakan alat bawaan **netsh** untuk melakukan port forwarding.

### Contoh Perintah netsh untuk Port Forwarding di Windows
Membuka port forwarding dari port 8080 ke 80 di localhost:
```sh
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=80 connectaddress=127.0.0.1
```

Melihat daftar aturan yang dibuat:
```sh
netsh interface portproxy show all
```

Menghapus aturan port forwarding:
```sh
netsh interface portproxy delete v4tov4 listenport=8080 listenaddress=0.0.0.0
```

### Konfigurasi Firewall
```sh
# Menambahkan aturan firewall untuk mengizinkan port tertentu
netsh advfirewall firewall add rule name="Allow Port 8081" protocol=TCP dir=in localport=8081 action=allow

# Menambahkan aturan firewall untuk rentang port
netsh advfirewall firewall add rule name="Allow Port Range 8081-8090" protocol=TCP dir=in localport=8081-8090 action=allow

# Menampilkan semua aturan firewall
netsh advfirewall firewall show rule name=all
```

## Port Forwarding dengan Aplikasi Lain
Beberapa aplikasi lain yang dapat digunakan untuk port forwarding:
- **[ngrok](https://ngrok.com/)**: Membuat tunnel dari localhost ke internet dengan mudah.
- **[frp (Fast Reverse Proxy)](https://github.com/fatedier/frp)**: Alternatif yang lebih fleksibel dan dapat dikonfigurasi untuk forwarding yang lebih kompleks.
- **[rinetd](https://www.boutell.com/rinetd/)**: Alat sederhana untuk melakukan port forwarding statis.
- **[Pinggy](https://pinggy.io/)**
- **[LocalXpose](https://localxpose.io/)**
- **[Localtunnel](https://theboroer.github.io/localtunnel-www/)**
- **[Zrok](https://zrok.io/)**
- **[localhost.run](https://localhost.run/)**
- **[serveo](https://serveo.net/)**
- **[Tailscale](https://tailscale.com/)**
- **[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)**
- **[Pagekite](https://pagekite.net/)**
- **[Playit.gg](https://playit.gg/)**

### Cloudflare Tunnel
Cloudflare Tunnel memungkinkan akses ke layanan lokal tanpa harus membuka port di firewall.

#### Instalasi dan Konfigurasi
```sh
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/
```

Login ke Cloudflare:
```sh
cloudflared tunnel login
```

Membuat tunnel baru:
```sh
cloudflared tunnel create my-tunnel
```

Menjalankan tunnel untuk mengarahkan localhost ke internet:
```sh
cloudflared tunnel route dns my-tunnel mysite.example.com
cloudflared tunnel run my-tunnel
```

### Pinggy
Pinggy adalah alternatif sederhana untuk membuat tunnel ke internet.
```sh
curl -sL https://pinggy.io/install.sh | sh
pinggy http 5000
```

### Konfigurasi Lanjutan ngrok
#### 1. Menjalankan ngrok dengan token
```sh
ngrok authtoken YOUR_AUTH_TOKEN
```

#### 2. Menjalankan ngrok dengan konfigurasi
Buat file konfigurasi di `~/.ngrok2/ngrok.yml`:
```yaml
authtoken: YOUR_AUTH_TOKEN
tunnels:
  web:
    proto: http
    addr: 5000
  ssh:
    proto: tcp
    addr: 22
```
Menjalankan ngrok dengan konfigurasi:
```sh
ngrok start --all
```

### Contoh Penggunaan ngrok
Misalnya, kita memiliki aplikasi web yang berjalan di localhost:5000 dan ingin membagikannya ke internet.
```sh
ngrok http 5000
```
Ini akan menghasilkan URL publik yang bisa digunakan untuk mengakses aplikasi lokal dari mana saja.

## Studi Kasus
### 1. Mengakses Web Server Lokal dari Internet dengan SSH Port Forwarding
- Gunakan remote port forwarding: `ssh -R 8080:localhost:80 user@remote_server`
- Akses layanan di **http://remote_server:8080**

### 2. Membuat Tunnel SSH untuk Mengakses Database Lokal
- Jika database MySQL berjalan di **localhost:3306**, gunakan perintah:
```sh
ssh -L 3307:localhost:3306 user@remote_server
```
- Koneksi ke database bisa dilakukan dengan `mysql -h 127.0.0.1 -P 3307 -u user -p`

### 3. Menggunakan ngrok untuk Membuat Public URL untuk Aplikasi Web Lokal
- Jalankan aplikasi di **localhost:3000**.
- Gunakan `ngrok http 3000`.
- Dapatkan URL publik seperti **https://abc123.ngrok.io**.

## Catatan Tambahan
### Tips dan Trik
- Gunakan port yang tidak umum untuk menghindari konflik.
- Pastikan firewall mengizinkan lalu lintas melalui port yang diforward.
- Periksa dengan `netstat -tulnp` atau `ss -tulnp` untuk melihat port yang terbuka.

### Pertimbangan Keamanan
- Gunakan autentikasi yang kuat (SSH key, VPN, dll.).
- Batasi IP yang bisa mengakses forwarded port.
- Hindari forwarding layanan sensitif tanpa enkripsi tambahan.

Dengan memahami dan menerapkan konsep port forwarding ini, kita bisa mengakses dan mengamankan layanan jaringan dengan lebih fleksibel dan efisien.