---
sidebar_position: 2
---

# Remote Access

## I. SSH (Secure Shell)

### 1. Konsep Dasar SSH

Secure Shell (SSH) adalah protokol jaringan yang digunakan untuk mengakses dan mengelola perangkat secara remote dengan cara yang aman. SSH menggantikan protokol lama seperti Telnet yang mengirimkan data dalam bentuk teks biasa tanpa enkripsi. Dengan SSH, semua komunikasi dienkripsi untuk mencegah serangan seperti penyadapan dan man-in-the-middle (MITM).

Perbedaan utama antara SSH dan Telnet:
- **Keamanan**: SSH mengenkripsi data, sementara Telnet mengirimkan data dalam bentuk teks biasa.
- **Otentikasi**: SSH menggunakan metode otentikasi yang lebih aman, termasuk password hashing dan SSH key.

### 2. Instalasi dan Konfigurasi SSH

#### a. Instalasi SSH Server dan Client

- **Linux (Debian/Ubuntu)**:
  ```sh
  sudo apt update
  sudo apt install openssh-server openssh-client
  ```
- **CentOS/RHEL**:
  ```sh
  sudo yum install openssh-server openssh-clients
  ```
- **Windows**:
  - Menggunakan OpenSSH bawaan Windows 10+:
    ```powershell
    Add-WindowsFeature -Name OpenSSH-Server
    ```
  - Menggunakan PuTTY sebagai klien SSH: [Download](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
  - Menggunakan Termius sebagai alternatif SSH client dengan UI modern.

#### b. Konfigurasi `sshd_config`

File utama konfigurasi SSH server adalah `/etc/ssh/sshd_config`. Beberapa opsi penting:
- **Port**: Mengubah port default (22) untuk keamanan tambahan.
  ```sh
  Port 2222
  ```
- **ListenAddress**: Menentukan alamat IP yang digunakan untuk mendengarkan koneksi.
  ```sh
  ListenAddress 192.168.1.1
  ```
- **PasswordAuthentication**: Menonaktifkan login menggunakan password.
  ```sh
  PasswordAuthentication no
  ```
- **PermitRootLogin**: Mencegah login langsung sebagai root.
  ```sh
  PermitRootLogin no
  ```
- **AllowUsers**: Membatasi user yang bisa login via SSH.
  ```sh
  AllowUsers user1 user2
  ```
- **Konfigurasi SFTP di `sshd_config`**:
  ```sh
  Subsystem sftp internal-sftp

  Match User sftpuser
      ChrootDirectory /var/sftp
      ForceCommand internal-sftp
      X11Forwarding no
      AllowTcpForwarding no
  ```
Restart layanan SSH setelah mengubah konfigurasi:
```sh
sudo systemctl restart sshd
```

### 3. Penggunaan SSH

- **Login ke Server**:
  ```sh
  ssh user@host
  ssh user@host -p 2222  # Jika menggunakan port khusus
  ```

- **Menjalankan Perintah Remote**:
  ```sh
  ssh user@host "ls -lah"
  ```

- **Menggunakan SSH dengan Forwarding X11** (untuk aplikasi GUI):
  ```sh
  ssh -X user@host
  ```

- **Membuat Tunnel SSH (Port Forwarding)**:
  - **Local Port Forwarding** (Meneruskan port lokal ke server):
    ```sh
    ssh -L [local_port]:[remote_host]:[remote_port] user@host
    ```
    Contoh:
    ```sh
    ssh -L 8080:localhost:80 user@host
    ```
    Artinya, akses `localhost:8080` di mesin lokal akan diarahkan ke `localhost:80` di server.

  - **Remote Port Forwarding** (Meneruskan port dari server ke mesin lokal):
    ```sh
    ssh -R [remote_port]:[local_host]:[local_port] user@host
    ```
    Contoh:
    ```sh
    ssh -R 8080:localhost:80 user@host
    ```
    Artinya, akses `localhost:8080` di server akan diarahkan ke `localhost:80` di mesin lokal.

  - **Dynamic Port Forwarding (SOCKS Proxy)**:
    ```sh
    ssh -D [local_socks_port] user@host
    ```
    Contoh:
    ```sh
    ssh -D 1080 user@host
    ```
    Ini akan membuat SOCKS proxy pada `localhost:1080`, yang bisa digunakan oleh aplikasi untuk mengarahkan trafik internet melalui server SSH.

- **Menjalankan SSH dengan Shell Tertentu**:
  ```sh
  ssh -t user@host /bin/bash  # Menggunakan Bash
  ssh -t user@host /bin/sh    # Menggunakan SH
  ssh -t user@host /bin/zsh   # Menggunakan Zsh
  ```

- **Menjalankan SSH dalam Mode Debugging**:
  ```sh
  ssh -v user@host  # Mode verbose
  ssh -vvv user@host  # Mode debug lebih detail
  ```

### 4. SSH Keygen

SSH Key adalah metode autentikasi yang lebih aman dibandingkan password. Terdiri dari:
- **Private Key**: Kunci rahasia yang hanya boleh disimpan oleh pemilik.
- **Public Key**: Kunci yang dibagikan ke server untuk autentikasi.

- **Membuat Kunci SSH**:
  ```sh
  ssh-keygen -t rsa -b 4096
  ```
  Ini akan menghasilkan dua file:
  - `~/.ssh/id_rsa` (Private Key)
  - `~/.ssh/id_rsa.pub` (Public Key)

- **Mengatur Permission File Sebelum Digunakan**:
  ```sh
  chmod 600 ~/.ssh/id_rsa
  chmod 644 ~/.ssh/id_rsa.pub
  chmod 700 ~/.ssh/
  ```

- **Menyalin Public Key ke Server**:
  ```sh
  ssh-copy-id user@host
  ```
  Atau menggunakan `scp` untuk menyalin secara manual:
  ```sh
  scp ~/.ssh/id_rsa.pub user@host:~/.ssh/authorized_keys
  ```
  Pastikan permission file diatur dengan benar:
  ```sh
  chmod 600 ~/.ssh/authorized_keys
  ```

- **Menggunakan Private Key untuk Login**:
  ```sh
  ssh user@host
  ```
  Jika Private Key disimpan di lokasi khusus:
  ```sh
  ssh -i /path/to/private_key user@host
  ```
  Pastikan permission file Private Key diatur dengan benar sebelum digunakan:
  ```sh
  chmod 600 /path/to/private_key
  ```

### 5. Hardening SSH

- **Menonaktifkan PasswordAuthentication**
- **Menggunakan Firewall untuk membatasi akses**
- **Membatasi User yang bisa login**
- **Menggunakan Fail2Ban untuk mencegah brute-force**

## II. SCP (Secure Copy Protocol)

- **Mengunggah File**:
  ```sh
  scp file.txt user@host:/path/to/destination
  ```
- **Mengunduh File**:
  ```sh
  scp user@host:/path/to/file.txt .
  ```
- **Menyalin Direktori Secara Rekursif**:
  ```sh
  scp -r folder/ user@host:/remote/folder
  ```

## III. SFTP (Secure File Transfer Protocol)

- **Menghubungkan ke Server**:
  ```sh
  sftp user@host
  ```
- **Perintah Dasar SFTP**:
  - `ls`: Melihat isi direktori
  - `get file.txt`: Mengunduh file
  - `put file.txt`: Mengunggah file

## IV. Rsync

- **Konsep Dasar**:
  Rsync singkatan dari Remote Sync, yaitu alat sinkronisasi file dan direktori baik secara lokal maupun remote.
  ```sh
  rsync -a dir1/ dir2
  rsync -az sumber tujuan
  rsync -av --delete sumber tujuan
  rsync -a --exclude=*.log sumber tujuan
  rsync -a --exclude=*.log --include=user.log,access.log sumber tujuan
  ```
- **Sinkronisasi ke Remote Server**:
  ```sh
  rsync -a ~/dir1 user@remotesystem:direktoritujuan
  rsync -a ~/dir1 user@host:~/
  rsync -azP sumber tujuan
  ```

## V. SSHpass

- **Login SSH dengan Password Otomatis** (Kurang direkomendasikan):
  ```sh
  sshpass -p 'password' ssh user@host
  ```

**Peringatan:** SSHpass tidak disarankan karena menyimpan password dalam bentuk teks biasa. Disarankan menggunakan SSH key sebagai alternatif.

## VI. Perbandingan SSH dan Telnet

| Fitur | SSH | Telnet |
|---|---|---|
| Keamanan | Enkripsi kuat | Tidak dienkripsi |
| Otentikasi | Mendukung SSH key | Hanya password |
| Digunakan untuk | Remote access aman | Debugging jaringan |

SSH adalah pilihan utama untuk remote access yang aman, sedangkan Telnet hanya digunakan dalam lingkungan yang tidak sensitif terhadap keamanan.

---

Catatan ini mencakup berbagai aspek penting dalam penggunaan SSH dan protokol terkait untuk remote access. Dengan mengikuti panduan ini, Anda dapat mengelola server secara aman dan efisien.