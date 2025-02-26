---
sidebar_position: 4
---

# Terminal Basics

Dokumen ini menjelaskan dasar-dasar penggunaan terminal pada sistem operasi berbasis Unix/Linux. Materi mencakup navigasi file system, manipulasi file, manajemen proses, redirection, dan pembuatan skrip Bash.

---

## 1. Pengenalan Terminal

Terminal adalah antarmuka baris perintah yang memungkinkan pengguna berinteraksi dengan sistem operasi melalui perintah teks. Shell adalah program yang membaca perintah dan meneruskannya ke sistem operasi.

**Contoh Shell:**  
- Bash (Bourne Again Shell)  
- Zsh (Z Shell)

---

## 2. Navigasi File System

### 2.1 Menampilkan Direktori Aktif
- **`pwd`**  
  Menampilkan path direktori kerja saat ini.
  ```bash
  $ pwd
  /home/username
  ```

### 2.2 Melihat Isi Direktori
- **`ls`**  
  Menampilkan daftar file dan direktori.
  ```bash
  $ ls
  Documents  Downloads  Music  Pictures
  ```
  **Opsi tambahan:**
  - `-l`: format daftar yang lebih detail
  - `-a`: termasuk file tersembunyi

### 2.3 Berpindah Direktori
- **`cd`**  
  Mengubah direktori kerja.
  ```bash
  $ cd Documents
  ```

---

## 3. Manipulasi File dan Direktori

### 3.1 Membuat File dan Direktori
- **`touch`**  
  Membuat file kosong.
  ```bash
  $ touch file.txt
  ```
- **`mkdir`**  
  Membuat direktori baru.
  ```bash
  $ mkdir project
  ```

### 3.2 Menyalin, Memindahkan, dan Menghapus
- **`cp`**  
  Menyalin file atau direktori.
  ```bash
  $ cp file.txt backup.txt
  ```
- **`mv`**  
  Memindahkan atau mengganti nama file/direktori.
  ```bash
  $ mv file.txt Documents/file.txt
  ```
- **`rm`**  
  Menghapus file.
  ```bash
  $ rm file.txt
  ```
- **`rmdir`**  
  Menghapus direktori yang kosong.
  ```bash
  $ rmdir empty_folder
  ```
- **`rm -r`**  
  Menghapus direktori beserta isinya (gunakan dengan hati-hati).
  ```bash
  $ rm -r project
  ```

---

## 4. Manajemen File Permissions

### 4.1 Mengubah Permissions
- **`chmod`**  
  Mengatur izin akses file/direktori.
  ```bash
  $ chmod 755 script.sh
  ```
  Angka tersebut merupakan representasi permission (read, write, execute).

### 4.2 Mengubah Kepemilikan
- **`chown`**  
  Mengganti pemilik file/direktori.
  ```bash
  $ sudo chown username:group file.txt
  ```

---

## 5. Redirection dan Pipes

### 5.1 Redirection
- **`>`**  
  Menulis output ke file (mengganti isi file).
  ```bash
  $ echo "Hello World" > output.txt
  ```
- **`>>`**  
  Menambahkan output ke file.
  ```bash
  $ echo "Baris tambahan" >> output.txt
  ```
- **`<`**  
  Membaca input dari file.
  ```bash
  $ sort < unsorted.txt
  ```

### 5.2 Pipes
- **`|`**  
  Mengirim output dari satu perintah sebagai input ke perintah lain.
  ```bash
  $ ls -l | grep ".txt"
  ```

---

## 6. Manajemen Proses

### 6.1 Melihat Proses
- **`ps`**  
  Menampilkan daftar proses yang berjalan.
  ```bash
  $ ps aux
  ```
- **`top`**  
  Menampilkan proses secara real-time.
  ```bash
  $ top
  ```

### 6.2 Menghentikan Proses
- **`kill`**  
  Mengirim sinyal untuk menghentikan proses.
  ```bash
  $ kill 1234
  ```
- **`kill -9`**  
  Memaksa penghentian proses.
  ```bash
  $ kill -9 1234
  ```

---

## 7. Pencarian File dan Konten

### 7.1 Mencari File
- **`find`**  
  Mencari file atau direktori berdasarkan kriteria.
  ```bash
  $ find /home/username -name "file.txt"
  ```

### 7.2 Mencari Konten di Dalam File
- **`grep`**  
  Mencari pola atau kata dalam file.
  ```bash
  $ grep "keyword" file.txt
  ```

---

## 8. Pembuatan Skrip Bash Dasar

### 8.1 Membuat Skrip
Buat file dengan ekstensi `.sh` dan tambahkan shebang di baris pertama.
```bash
#!/bin/bash
# Skrip sederhana
echo "Hello, World!"
```

### 8.2 Menjalankan Skrip
Beri hak akses eksekusi dan jalankan skrip.
```bash
$ chmod +x script.sh
$ ./script.sh
```

---

## 9. Tips dan Trik

- **History Command:**
  Gunakan `history` untuk melihat perintah yang telah dijalankan.
  ```bash
  $ history
  ```
- **Auto-Completion:**
  Gunakan tombol `Tab` untuk auto-complete nama file/direktori atau perintah.
- **Shortcut Keyboard:**
  - `Ctrl + C`: Menghentikan proses yang berjalan
  - `Ctrl + D`: Keluar dari terminal
  - `Ctrl + L`: Membersihkan layar terminal

---

## 10. Kesimpulan

Terminal adalah alat yang sangat powerful untuk mengelola sistem operasi dengan efisien. Dengan memahami perintah dasar dan konsep manajemen file, proses, serta scripting, pengguna dapat meningkatkan produktivitas dan mengotomasi banyak tugas.

Dokumentasi ini merupakan dasar yang baik untuk memulai eksplorasi lebih lanjut dalam dunia command line dan scripting. Selamat bereksperimen dan belajar!
