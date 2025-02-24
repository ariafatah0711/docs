---
sidebar_position: 5
---

# Environment Variables

## 1. Definisi dan Konsep Dasar
Environment variables (variabel lingkungan) adalah pasangan key-value yang digunakan oleh sistem operasi untuk menyimpan informasi konfigurasi yang dapat diakses oleh shell dan aplikasi. Environment variables berperan penting dalam mengonfigurasi sistem dan perilaku program tanpa perlu mengubah kode sumber.

Setiap proses dalam sistem operasi memiliki lingkungan sendiri yang berisi variabel lingkungan. Program dapat mengakses environment variables ini untuk mendapatkan informasi yang diperlukan, seperti direktori kerja, pengguna yang sedang login, atau konfigurasi sistem.

Perintah `env` digunakan untuk menampilkan semua environment variables yang tersedia dalam sesi saat ini.
```bash
env
```

## 2. Jenis-jenis Environment Variables
Berikut adalah beberapa environment variables yang umum digunakan:

### 2.1 Variabel Sistem Umum
- **PATH**: Menentukan daftar direktori tempat sistem mencari file eksekusi.
  ```bash
  echo $PATH
  ```
- **HOME**: Menunjukkan direktori home pengguna.
  ```bash
  echo $HOME
  ```
- **USER**: Menyimpan nama pengguna yang sedang login.
  ```bash
  echo $USER
  ```
- **SHELL**: Menunjukkan shell yang digunakan oleh pengguna.
  ```bash
  echo $SHELL
  ```
- **TERM**: Menentukan jenis terminal yang digunakan.
  ```bash
  echo $TERM
  ```
- **LANG**: Mengatur bahasa dan lokal sistem.
  ```bash
  echo $LANG
  ```
- **PWD**: Menunjukkan direktori kerja saat ini.
  ```bash
  echo $PWD
  ```

### 2.2 Variabel Khusus untuk Pengembangan
- **DATABASE_URL**: Menyimpan informasi koneksi ke database.
- **API_KEY**: Menyimpan kunci API untuk layanan eksternal.
- **LOG_LEVEL**: Mengatur level logging aplikasi.
- **NODE_ENV**: Menentukan mode aplikasi (development, production, testing).

## 3. Mengatur dan Mengubah Environment Variables
### 3.1 Menggunakan Perintah `export`
```bash
export VARIABEL_NAMA="nilai"
echo $VARIABEL_NAMA
```

### 3.2 Mengatur Secara Permanen
Tambahkan ke `.bashrc`, `.zshrc`, atau `.profile`:
```bash
echo 'export VARIABEL_NAMA="nilai"' >> ~/.bashrc
source ~/.bashrc
```

## 4. Mengakses Environment Variables
### 4.1 Dalam Shell
Gunakan `$VARIABEL_NAMA` untuk mengakses nilai variabel.
```bash
echo "Path saat ini: $PWD"
```

### 4.2 Dalam Script Shell
```bash
#!/bin/bash
echo "Pengguna saat ini: $USER"
```

## 5. Environment Variables dalam Konteks Pengembangan
### 5.1 Dalam Python
```python
import os
print(os.getenv("API_KEY"))
```

### 5.2 Dalam JavaScript (Node.js)
```javascript
console.log(process.env.API_KEY);
```

## 6. Praktik Terbaik
- Hindari menyimpan informasi sensitif langsung di environment variables.
- Gunakan file konfigurasi `.env` dengan library seperti `dotenv`.
- Gunakan manajemen environment variables yang aman, seperti `direnv` atau `systemd`.

Dengan memahami environment variables, Anda dapat mengelola konfigurasi sistem dan aplikasi dengan lebih fleksibel dan aman.