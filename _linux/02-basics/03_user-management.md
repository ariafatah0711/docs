---
sidebar_position: 3
---

# Manajemen Pengguna

## 1. Pengenalan
Manajemen pengguna di Linux sangat penting untuk mengontrol akses, hak istimewa, dan keamanan sistem. Linux menggunakan file sistem tertentu untuk menyimpan informasi pengguna, seperti `/etc/passwd`, `/etc/shadow`, dan `/etc/group`.

## 2. Jenis Pengguna di Linux
### 2.1. Pengguna Root
Root adalah pengguna dengan hak istimewa tertinggi di sistem Linux, dapat melakukan apa saja termasuk mengedit file sistem, menginstal perangkat lunak, dan mengubah konfigurasi sistem.

### 2.2. Pengguna Biasa
Pengguna biasa memiliki hak terbatas dan hanya dapat mengakses file serta menjalankan perintah yang diizinkan oleh administrator.

### 2.3. Pengguna Sistem
Pengguna sistem adalah akun yang dibuat secara otomatis oleh sistem untuk menjalankan layanan tertentu, seperti `www-data` untuk server web atau `mysql` untuk database.

## 3. Menambahkan Pengguna

### `adduser`
`adduser` adalah perintah yang lebih interaktif dan user-friendly untuk menambahkan pengguna.
```bash
sudo adduser nama_pengguna
```
Perintah ini akan meminta informasi tambahan seperti password, nama lengkap, dan informasi lainnya.

### `useradd`
`useradd` adalah perintah yang lebih minimalis dan tidak secara otomatis membuat direktori home pengguna kecuali dengan opsi `-m`.
```bash
sudo useradd -m nama_pengguna
```

#### Opsi tambahan pada `useradd`:
- `-m` : Membuat direktori home pengguna.
- `-d /path/home` : Menentukan direktori home pengguna.
- `-s /bin/bash` : Menentukan shell default pengguna.
- `-u UID` : Menentukan UID khusus untuk pengguna.
- `-g GID` : Menentukan grup utama pengguna.
- `-G grup1,grup2` : Menambahkan pengguna ke beberapa grup.

Untuk mengatur password setelahnya:
```bash
sudo passwd nama_pengguna
```

## 4. UID dan GID
- **UID (User ID):**
  - 0 : Root (superuser)
  - 1-999 : Pengguna sistem
  - 1000 ke atas : Pengguna biasa

- **GID (Group ID):**
  - Mirip dengan UID, tetapi untuk grup.
  - Grup root memiliki GID 0, sementara grup pengguna sistem biasanya memiliki GID di bawah 1000.

## 5. Menghapus Pengguna

### `deluser`
Untuk menghapus pengguna dan direktori home-nya:
```bash
sudo deluser --remove-home nama_pengguna
```

### `userdel`
Untuk menghapus pengguna tanpa menghapus direktori home:
```bash
sudo userdel nama_pengguna
```
Jika ingin menghapus pengguna beserta direktori home:
```bash
sudo userdel -r nama_pengguna
```

## 6. Mengubah Password
Mengubah password pengguna:
```bash
sudo passwd nama_pengguna
```
Untuk mengunci akun pengguna:
```bash
sudo passwd -l nama_pengguna
```
Untuk membuka kembali akun yang terkunci:
```bash
sudo passwd -u nama_pengguna
```

## 7. Manajemen Grup
Setiap pengguna di Linux terkait dengan satu atau lebih grup.

### Menambahkan Grup
```bash
sudo groupadd nama_grup
```

### Menambahkan Pengguna ke Grup
```bash
sudo usermod -aG nama_grup nama_pengguna
```

### Menghapus Pengguna dari Grup
```bash
sudo gpasswd -d nama_pengguna nama_grup
```

### Menghapus Grup
```bash
sudo groupdel nama_grup
```

## 8. File Konfigurasi Terkait Pengguna

### `/etc/passwd`
File ini menyimpan informasi dasar pengguna.
Format umum:
```
nama_pengguna:x:UID:GID:deskripsi:direktori_home:shell
```
- `x` menunjukkan bahwa password disimpan di `/etc/shadow`
- `UID` adalah User ID
- `GID` adalah Group ID
- `deskripsi` adalah informasi pengguna (opsional)
- `direktori_home` adalah lokasi home pengguna
- `shell` adalah shell default pengguna

### `/etc/shadow`
File ini menyimpan password pengguna dalam bentuk terenkripsi.
Format umum:
```
nama_pengguna:hashed_password:last_change:min:max:warn:inactive:expire
```
- `hashed_password`: Password yang telah dienkripsi
- `last_change`: Hari terakhir password diubah
- `min`: Minimal hari sebelum password bisa diubah
- `max`: Maksimal hari sebelum password harus diubah
- `warn`: Hari sebelum peringatan perubahan password diberikan
- `inactive`: Hari setelah masa tenggang berakhir sebelum akun dinonaktifkan
- `expire`: Hari akun akan kedaluwarsa

### `/etc/group`
File ini menyimpan informasi grup.
Format umum:
```
nama_grup:x:GID:anggota1,anggota2
```
- `x` menunjukkan bahwa password grup tidak digunakan
- `GID` adalah Group ID
- `anggota1, anggota2` adalah pengguna dalam grup

## 9. Grup Umum di Linux
- **root (GID 0)** : Grup superuser.
- **adm** : Memiliki akses ke log sistem.
- **sudo** : Grup untuk pengguna yang dapat menjalankan perintah sebagai root.
- **www-data** : Digunakan oleh server web seperti Apache dan Nginx.
- **nogroup** : Grup default untuk proses yang tidak memiliki grup khusus.
- **users** : Grup umum untuk pengguna biasa.

## 10. sudoers

### Pengertian sudoers
File `/etc/sudoers` adalah file konfigurasi yang mengontrol hak akses pengguna dalam menggunakan perintah `sudo`. File ini menentukan siapa yang bisa menjalankan perintah sebagai pengguna lain, termasuk root.

### Mengedit File sudoers dengan Aman
Untuk mengedit file sudoers, gunakan perintah berikut agar tidak merusak syntax:
```sh
sudo visudo
```
`visudo` memastikan bahwa tidak ada kesalahan sintaks yang dapat mengunci akses ke sudo.

### Memberikan Akses sudo ke Pengguna
Untuk memberikan akses sudo ke pengguna tertentu, tambahkan baris berikut dalam file `/etc/sudoers`:
```sh
username ALL=(ALL) ALL
```
Penjelasan:
- `username` = Nama pengguna yang diberi akses sudo.
- `ALL` = Bisa menjalankan perintah dari semua terminal.
- `(ALL)` = Bisa menjalankan perintah sebagai pengguna lain (termasuk root).
- `ALL` = Bisa menjalankan semua perintah.

### Menjalankan Perintah Tanpa Password
Agar pengguna bisa menjalankan perintah sudo tanpa memasukkan password:
```sh
username ALL=(ALL) NOPASSWD: ALL
```
Atau untuk perintah tertentu saja:
```sh
username ALL=(ALL) NOPASSWD: /path/to/command
```

### Memberikan Hak Akses sudo ke Grup
Untuk memberikan akses sudo ke seluruh anggota grup tertentu:
```sh
%groupname ALL=(ALL) ALL
```
Contoh untuk grup `developers`:
```sh
%developers ALL=(ALL) ALL
```

### Membatasi Penggunaan sudo untuk Perintah Tertentu
Untuk membatasi pengguna agar hanya bisa menjalankan perintah tertentu:
```sh
username ALL=(ALL) /usr/bin/systemctl, /usr/bin/reboot
```
Pengguna hanya dapat menjalankan `systemctl` dan `reboot` dengan sudo.

### Blokir Akses sudo ke Perintah Tertentu
Untuk melarang pengguna menjalankan perintah tertentu dengan sudo:
```sh
username ALL=(ALL) ALL, !/usr/bin/passwd, !/usr/bin/su
```
Pengguna bisa menjalankan semua perintah kecuali `passwd` dan `su`.

### Memeriksa Konfigurasi sudoers
Setelah mengedit sudoers, pastikan tidak ada kesalahan dengan perintah:
```sh
sudo visudo -c
```
Jika ada kesalahan sintaks, perbaiki sebelum menyimpan perubahan.

## 11. Mengecek Informasi Pengguna

### Mengecek Pengguna Saat Ini
```bash
echo $USER
```

### Mengecek Detail Pengguna
```bash
id nama_pengguna
```

### Mengecek Grup Pengguna
```bash
groups nama_pengguna
```

### Melihat Informasi dalam `/etc/passwd`
```bash
getent passwd nama_pengguna
```

### Melihat Informasi dalam `/etc/group`
```bash
getent group nama_grup
```

## 12. Menonaktifkan dan Menghapus Akun
Untuk menonaktifkan akun tanpa menghapusnya:
```bash
sudo usermod -L nama_pengguna
```

Untuk menghapus akun dan semua datanya:
```bash
sudo userdel -r nama_pengguna
```

## 13. Manajemen Waktu dan Keamanan Pengguna

### Mengecek Masa Berlaku Akun Pengguna
Untuk melihat informasi kedaluwarsa akun pengguna:
```sh
sudo chage -l username
```

### Mengatur Tanggal Kedaluwarsa Akun
Untuk mengatur akun agar kedaluwarsa pada tanggal tertentu:
```sh
sudo chage -E YYYY-MM-DD username
```
Contoh:
```sh
sudo chage -E 2025-12-31 user1
```
Akun `user1` akan dinonaktifkan pada 31 Desember 2025.

### Memaksa Pengguna Mengubah Password Secara Berkala
Mengatur agar pengguna harus mengganti password setiap 30 hari:
```sh
sudo chage -M 30 username
```

### Menentukan Minimal Hari Sebelum Password Bisa Diganti
Untuk mencegah pengguna mengganti password terlalu cepat:
```sh
sudo chage -m 5 username
```
Pengguna hanya bisa mengganti password minimal 5 hari setelah perubahan terakhir.

### Mengatur Masa Tenggang Setelah Kedaluwarsa
Untuk memberikan masa tenggang setelah password kedaluwarsa:
```sh
sudo chage -I 7 username
```
Pengguna memiliki 7 hari setelah kedaluwarsa sebelum akun dikunci.

### Memaksa Pengguna Mengubah Password Saat Login Berikutnya
```sh
sudo passwd -e username
```
Setelah login, pengguna akan diminta untuk membuat password baru.

### Mengatur Kompleksitas Password
Untuk memastikan password memenuhi standar keamanan:
1. Edit file `/etc/security/pwquality.conf` dan sesuaikan parameter berikut:
   ```sh
   minlen=8          # Minimal 8 karakter
   dcredit=-1        # Harus ada minimal 1 angka
   ucredit=-1        # Harus ada minimal 1 huruf besar
   lcredit=-1        # Harus ada minimal 1 huruf kecil
   ocredit=-1        # Harus ada minimal 1 karakter spesial
   ```
2. Simpan perubahan dan pastikan PAM menggunakan aturan ini dengan mengedit `/etc/pam.d/common-password`:
   ```sh
   password requisite pam_pwquality.so retry=3
   ```

### Mengunci dan Membuka Kunci Akun
- **Mengunci akun pengguna:**
  ```sh
  sudo passwd -l username
  ```
- **Membuka kunci akun pengguna:**
  ```sh
  sudo passwd -u username
  ```

## 14. Kesimpulan
Manajemen pengguna di Linux melibatkan berbagai perintah dan file sistem. Memahami konsep ini sangat penting untuk mengelola hak akses dan menjaga keamanan sistem.