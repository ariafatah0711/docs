---
sidebar_position: 4
---

# Permissions

## 1. Konsep Dasar Permissions
Permissions (hak akses) adalah mekanisme keamanan dalam sistem operasi Linux yang menentukan siapa yang dapat membaca, menulis, atau mengeksekusi suatu file atau direktori.

### Jenis Permissions:
- **Read (r)**: Hak untuk membaca isi file atau melihat isi direktori.
- **Write (w)**: Hak untuk mengubah isi file atau menambah/menghapus isi direktori.
- **Execute (x)**: Hak untuk mengeksekusi file (jika berupa program/script) atau mengakses direktori.

### Kategori Pengguna:
- **User (u)**: Pemilik file.
- **Group (g)**: Grup pengguna yang memiliki hak akses terhadap file.
- **Others (o)**: Semua pengguna lain yang tidak termasuk dalam kategori user atau group.

## 2. Representasi Oktal dan Simbolik
Permissions dapat direpresentasikan dalam dua format:

- **Format Simbolik**: Menggunakan kombinasi `r`, `w`, dan `x`, misalnya `rwxr-xr--`.
- **Format Oktal**: Menggunakan angka untuk merepresentasikan kombinasi permissions, misalnya `755`.

| Permission | Simbolik | Oktal |
|------------|----------|-------|
| rwxr-xr--  | Owner: rwx, Group: r-x, Others: r-- | 755 |
| rw-r--r--  | Owner: rw-, Group: r--, Others: r-- | 644 |

### Contoh Konversi
```
rwxr-xr-- = 755
rw-r--r-- = 644
```

## 3. Perintah `chmod`
Digunakan untuk mengubah permissions file atau direktori.

### Contoh Penggunaan:
- Mengatur permissions menggunakan format oktal:
  ```bash
  chmod 755 file.txt
  ```
- Menambahkan hak eksekusi ke pemilik file:
  ```bash
  chmod u+x file.txt
  ```
- Menghapus hak tulis dari grup:
  ```bash
  chmod g-w file.txt
  ```

## 4. Perintah `chown`
Digunakan untuk mengubah kepemilikan file atau direktori.

### Contoh Penggunaan:
- Mengubah pemilik file:
  ```bash
  chown user file.txt
  ```
- Mengubah pemilik dan grup:
  ```bash
  chown user:group file.txt
  ```

## 5. Perintah `chgrp`
Digunakan untuk mengubah grup pemilik file atau direktori.

### Contoh Penggunaan:
- Mengubah grup pemilik:
  ```bash
  chgrp group file.txt
  ```

## 6. SUID, SGID, dan Sticky Bit

### **SUID (Set User ID)**
Jika diterapkan pada file eksekusi, pengguna yang menjalankan file akan mendapatkan hak akses seperti pemilik file.
- Contoh:
  ```bash
  chmod u+s program
  ```

### **SGID (Set Group ID)**
Jika diterapkan pada file, pengguna yang menjalankan file akan mendapatkan hak akses grup file tersebut.
- Contoh:
  ```bash
  chmod g+s program
  ```

### **Sticky Bit**
Mencegah pengguna lain menghapus file di dalam direktori bersama kecuali mereka adalah pemilik file.
- Contoh:
  ```bash
  chmod +t /shared_folder
  ```

## 7. UMASK
UMASK (User File Creation Mask) menentukan izin default saat file atau direktori baru dibuat dengan mengurangi hak akses default.

- **Nilai default permissions:**
  ```bash
  File:  666 (rw-rw-rw-)
  Direktori: 777 (rwxrwxrwx)
  ```
  Jika umask bernilai `022`, maka:
  ```bash
  File baru: 666 - 022 = 644 (rw-r--r--)
  Direktori baru: 777 - 022 = 755 (rwxr-xr-x)
  ```
- Melihat nilai umask:
  ```bash
  umask
  ```
- Mengubah nilai umask:
  ```bash
  umask 027
  ```
  Hasil:
  ```bash
  File baru: 640 (rw-r-----)
  Direktori baru: 750 (rwxr-x---)
  ```
- Nilai umask dapat disimpan secara permanen di `~/.bashrc` atau `~/.profile`.

## 8. ACL (Access Control Lists)
ACL memungkinkan pengaturan permissions yang lebih fleksibel dibanding chmod.

- Menambahkan ACL untuk user tertentu:
  ```bash
  setfacl -m u:user:rwx file.txt
  ```
- Melihat ACL suatu file:
  ```bash
  getfacl file.txt
  ```

## 9. Contoh Studi Kasus
### **1. Pengaturan Permissions untuk Web Server**
Untuk memastikan keamanan direktori web server:
```bash
chmod -R 755 /var/www/html
chown -R www-data:www-data /var/www/html
```

### **2. Pengaturan Shared Folder**
Untuk direktori yang digunakan bersama oleh grup tertentu:
```bash
chmod 770 /shared_folder
chgrp team /shared_folder
chmod g+s /shared_folder
```

Dengan memahami konsep permissions ini, Anda dapat mengelola keamanan file dan direktori dengan lebih baik di sistem Linux.